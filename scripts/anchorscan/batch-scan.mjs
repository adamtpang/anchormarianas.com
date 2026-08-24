#!/usr/bin/env node
// Batch AnchorScan runner. Walks the Guam leads list, fetches real reviews for
// each business, and writes one raw reviews file per business for the diagnosis
// step to consume.
//
//   node scripts/anchorscan/batch-scan.mjs --limit 20 --category dentist
//   node scripts/anchorscan/batch-scan.mjs --tier HOT --limit 50 --dry-run
//
// Honest by construction:
//   - Never invents a business, a rating, or a review. If the source returns
//     nothing, the business is skipped and logged as skipped, not padded.
//   - Skips businesses already scanned (content/reads/<slug>.json exists) so
//     re-runs do not burn quota on work already done.
//   - Respects a hard --limit because every source is metered. SerpAPI's free
//     tier is 250 searches a month and a name-to-reviews run costs 2 of them,
//     so the real free ceiling is about 125 businesses a month.

import { access, mkdir, open, readFile, rename, rm, writeFile } from "node:fs/promises"
import path from "node:path"
import { fileURLToPath } from "node:url"
import { businessNameMatchScore, fetchReviews } from "./fetch-reviews.mjs"
import { publishedReadSlug } from "./slugify.mjs"

const HERE = path.dirname(fileURLToPath(import.meta.url))
const ROOT = path.resolve(HERE, "..", "..")
const LEADS = path.join(ROOT, ".anchor", "guam-leads", "guam-leads.json")
const READS = path.join(ROOT, "content", "reads")
const RAW = path.join(ROOT, ".anchor", "scan-raw")
const MAX_BATCH_SIZE = 125
const RAW_SCHEMA_VERSION = 1
const RAW_FRESHNESS_MS = 1000 * 60 * 60 * 24 * 30
const BATCH_SOURCES = new Set(["google", "serpapi", "outscraper", "apify"])

async function exists(p) {
  try {
    await access(p)
    return true
  } catch {
    return false
  }
}

async function hasCurrentReviewFile(file, lead, now = Date.now()) {
  try {
    const value = JSON.parse(await readFile(file, "utf8"))
    const fetchedAt = Date.parse(value?.fetchedAt)
    return Boolean(
      value?.schemaVersion === RAW_SCHEMA_VERSION &&
        ["complete", "thin"].includes(value?.status) &&
        value?.lead?.id === lead.id &&
        value?.requested?.name === lead.name &&
        value?.business?.name &&
        businessNameMatchScore(lead.name, value.business.name) >= 0.8 &&
        Array.isArray(value.reviews) &&
        Number.isFinite(fetchedAt) &&
        now - fetchedAt <= RAW_FRESHNESS_MS
    )
  } catch {
    return false
  }
}

async function acquireBatchLock(rawDir) {
  const file = path.join(rawDir, ".batch.lock")
  let handle
  try {
    handle = await open(file, "wx")
    await handle.writeFile(`${process.pid} ${new Date().toISOString()}\n`)
  } catch (error) {
    if (error?.code === "EEXIST") {
      throw new Error(`Another batch owns ${file}. Remove a stale lock only after confirming no batch is running.`)
    }
    throw error
  }
  return async () => {
    await handle.close()
    await rm(file, { force: true })
  }
}

async function hasValidPublishedRead(file, slug) {
  try {
    const value = JSON.parse(await readFile(file, "utf8"))
    return Boolean(
      value?.slug === slug &&
        typeof value?.business === "string" &&
        typeof value?.summary === "string" &&
        Array.isArray(value?.observations) &&
        value.observations.length >= 3 &&
        Array.isArray(value?.questions) &&
        value.questions.length >= 3
    )
  } catch {
    return false
  }
}

async function atomicWrite(file, contents) {
  const temp = `${file}.${process.pid}.${Date.now()}.tmp`
  await writeFile(temp, contents, { encoding: "utf8", flag: "wx" })
  try {
    await rename(temp, file)
  } finally {
    await rm(temp, { force: true })
  }
}

function boundedInteger(value, flag, min, max) {
  const parsed = Number(value)
  if (!Number.isInteger(parsed) || parsed < min || parsed > max) {
    throw new Error(`${flag} must be an integer from ${min} to ${max}.`)
  }
  return parsed
}

function optionValue(argv, index, flag) {
  const value = argv[index]
  if (!value || value.startsWith("--")) {
    throw new Error(`${flag} needs a value.`)
  }
  return value
}

export function parseArgs(argv) {
  const out = { limit: 10, source: "serpapi", tier: null, category: null, dryRun: false, minReviews: 5, leads: null }
  for (let i = 0; i < argv.length; i++) {
    const a = argv[i]
    if (a === "--limit") out.limit = boundedInteger(argv[++i], "--limit", 1, MAX_BATCH_SIZE)
    else if (a === "--source") out.source = optionValue(argv, ++i, "--source")
    else if (a === "--tier") out.tier = optionValue(argv, ++i, "--tier")
    else if (a === "--category") out.category = optionValue(argv, ++i, "--category")
    else if (a === "--min-reviews") out.minReviews = boundedInteger(argv[++i], "--min-reviews", 0, 10000)
    else if (a === "--leads") out.leads = optionValue(argv, ++i, "--leads")
    else if (a === "--dry-run") out.dryRun = true
    else throw new Error(`Unknown option: ${a}`)
  }
  if (!BATCH_SOURCES.has(out.source)) {
    throw new Error(`--source must be one of: ${[...BATCH_SOURCES].join(", ")}.`)
  }
  return out
}

export function assertBatchOutcome(batch, done, skipped) {
  if (batch.length > 0 && done.length === 0) {
    const kinds = [...new Set(skipped.map((item) => item.kind))].join(" and ")
    throw new Error(`No publishable raw reports were written (${kinds || "no result"}).`)
  }
}

export async function main(
  argv = process.argv.slice(2),
  {
    fetchReviewsFn = fetchReviews,
    leadsFile = LEADS,
    readsDir = READS,
    rawDir = RAW,
    log = console.log,
  } = {}
) {
  const args = parseArgs(argv)

  const selectedLeadsFile = args.leads ? path.resolve(args.leads) : leadsFile
  let leads
  try {
    leads = JSON.parse(await readFile(selectedLeadsFile, "utf8"))
  } catch (error) {
    if (error?.code === "ENOENT") {
      throw new Error(`Lead file not found. Pass --leads <private-leads.json> (looked for ${selectedLeadsFile}).`)
    }
    throw error
  }
  if (!Array.isArray(leads)) throw new Error("Lead file must contain a JSON array.")
  let queue = leads
  if (args.tier) queue = queue.filter((l) => l.tier === args.tier)
  if (args.category) queue = queue.filter((l) => (l.category || "").includes(args.category))

  const seenSlugs = new Map()
  for (const lead of queue) {
    const slug = lead.slug ? publishedReadSlug(lead.slug) : publishedReadSlug(lead.name, "Guam")
    const existing = seenSlugs.get(slug)
    if (existing) {
      throw new Error(`Lead slug collision: "${existing}" and "${lead.name}" both map to ${slug}. Add unique slug fields.`)
    }
    seenSlugs.set(slug, lead.name)
  }

  // Skip anything already published or recently checked, so re-runs never re-burn quota.
  const fresh = []
  for (const l of queue) {
    const slug = l.slug ? publishedReadSlug(l.slug) : publishedReadSlug(l.name, "Guam")
    const publishedFile = path.join(readsDir, `${slug}.json`)
    const rawFile = path.join(rawDir, `${slug}.json`)
    if ((await exists(publishedFile)) && (await hasValidPublishedRead(publishedFile, slug))) continue
    if (await hasCurrentReviewFile(rawFile, l)) continue
    fresh.push({ ...l, slug })
  }

  const batch = fresh.slice(0, args.limit)

  log(`leads ${leads.length} | after filters ${queue.length} | not yet scanned ${fresh.length}`)
  log(`this run: ${batch.length} (limit ${args.limit}, source ${args.source})`)
  if (args.source === "serpapi") {
    log(`serpapi cost estimate: ~${batch.length * 2} searches (2 per business: find place, then reviews)`)
  }

  if (args.dryRun) {
    batch.forEach((b) => {
      log(`  would scan: ${b.name} (${b.category}${b.village ? `, ${b.village}` : ""})`)
    })
    log("\ndry run, nothing fetched.")
    return { batch, done: [], skipped: [] }
  }

  await mkdir(rawDir, { recursive: true })
  const releaseLock = await acquireBatchLock(rawDir)

  try {
    const done = []
    const skipped = []
    for (const [i, b] of batch.entries()) {
    const label = `[${i + 1}/${batch.length}] ${b.name}`
    try {
      const result = await fetchReviewsFn({
        query: b.name,
        location: b.village ? `${b.village}, Guam` : "Guam",
        source: args.source,
      })
      if (businessNameMatchScore(b.name, result.business?.name) < 0.8) {
        throw new Error(
          `Provider returned "${result.business?.name || "unknown"}", which does not match the requested business.`
        )
      }
      const count = result.reviews?.length ?? 0
      const status = count < args.minReviews ? "thin" : "complete"
      await atomicWrite(
        path.join(rawDir, `${b.slug}.json`),
        `${JSON.stringify(
          {
            schemaVersion: RAW_SCHEMA_VERSION,
            status,
            fetchedAt: new Date().toISOString(),
            minimumRequired: args.minReviews,
            lead: b,
            requested: result.requested || {
              name: b.name,
              location: b.village ? `${b.village}, Guam` : "Guam",
              source: args.source,
            },
            business: result.business,
            reviews: result.reviews,
          },
          null,
          2
        )}\n`
      )
      if (status === "thin") {
        log(`${label} -> skipped, only ${count} reviews (min ${args.minReviews}); checkpoint saved`)
        skipped.push({ name: b.name, kind: "thin", reason: `only ${count} reviews` })
        continue
      }
      log(`${label} -> ${count} reviews, ${result.business.rating ?? "?"} stars`)
      done.push({ name: b.name, slug: b.slug, reviews: count, rating: result.business.rating })
    } catch (e) {
      log(`${label} -> FAILED: ${e.message}`)
      skipped.push({ name: b.name, kind: "error", reason: e.message })
    }
  }

  log(`\nfetched ${done.length}, skipped ${skipped.length}`)
  log("raw reviews written to .anchor/scan-raw/")
  log("next: publish saved evidence with node scripts/anchorscan/publish-read.mjs --raw <file>")

  if (done.length) {
    const worst = [...done].filter((d) => d.rating != null).sort((a, b) => a.rating - b.rating).slice(0, 10)
    if (worst.length) {
      log("\nworst-rated first (best diagnostic candidates):")
      worst.forEach((d) => {
        log(`  ${d.rating} stars, ${d.reviews} reviews  ${d.name}`)
      })
    }
    }

    assertBatchOutcome(batch, done, skipped)
    return { batch, done, skipped }
  } finally {
    await releaseLock()
  }
}

const isMain = process.argv[1]?.endsWith("batch-scan.mjs")
if (isMain) {
  main().catch((e) => {
    console.error("batch-scan failed:", e.message)
    process.exit(1)
  })
}
