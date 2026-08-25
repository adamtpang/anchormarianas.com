#!/usr/bin/env node

import { createHash } from "node:crypto"
import { createReadStream } from "node:fs"
import { mkdir, readFile, readdir, rename, writeFile } from "node:fs/promises"
import path from "node:path"
import { fileURLToPath, pathToFileURL } from "node:url"
import {
  businessBaseId,
  businessMatchKeys,
  canonicalBusinessFromLead,
  cleanText,
  countPresent,
  normalizedBusinessName,
  reviewRecord,
  slugify,
} from "./model.mjs"
import {
  extractApifyDatasets,
  writeRecoveredDatasets,
} from "./recover-apify-transcript.mjs"

const HERE = path.dirname(fileURLToPath(import.meta.url))
const ROOT = path.resolve(HERE, "..", "..")
const FRESH_REVIEW_DAYS = 30

function parseArgs(argv) {
  const values = {}
  const allowed = new Set(["--leads", "--transcript", "--reads", "--output"])
  for (let index = 0; index < argv.length; index += 1) {
    const flag = argv[index]
    if (!allowed.has(flag)) throw new Error(`Unknown option: ${flag}`)
    const value = argv[index + 1]
    if (!value || value.startsWith("--")) throw new Error(`${flag} needs a value.`)
    values[flag.slice(2)] = path.resolve(value)
    index += 1
  }
  for (const key of ["leads", "transcript", "reads", "output"]) {
    if (!values[key]) throw new Error(`--${key} is required.`)
  }
  const relativeOutput = path.relative(ROOT, values.output)
  if (!relativeOutput.startsWith("..") && !path.isAbsolute(relativeOutput)) {
    throw new Error("Private data output must be outside the public repository.")
  }
  return values
}

async function atomicWrite(file, contents) {
  await mkdir(path.dirname(file), { recursive: true })
  const temporary = `${file}.${process.pid}.tmp`
  await writeFile(temporary, contents, "utf8")
  await rename(temporary, file)
}

async function writeJson(file, value) {
  await atomicWrite(file, `${JSON.stringify(value, null, 2)}\n`)
}

async function writeJsonl(file, rows) {
  await atomicWrite(file, `${rows.map((row) => JSON.stringify(row)).join("\n")}\n`)
}

async function hashFile(file) {
  const hash = createHash("sha256")
  for await (const chunk of createReadStream(file)) hash.update(chunk)
  return hash.digest("hex")
}

function uniqueBusinessIds(leads) {
  const baseCounts = new Map()
  for (const lead of leads) {
    const base = businessBaseId(lead.name)
    baseCounts.set(base, (baseCounts.get(base) || 0) + 1)
  }
  const used = new Set()
  return leads.map((lead, index) => {
    const base = businessBaseId(lead.name)
    let candidate = base
    if ((baseCounts.get(base) || 0) > 1) {
      const location = slugify(lead.village)
      candidate = `${base}:${location || index + 1}`
    }
    let unique = candidate
    let suffix = 2
    while (used.has(unique)) {
      unique = `${candidate}:${suffix}`
      suffix += 1
    }
    used.add(unique)
    return unique
  })
}

function indexBusinesses(businesses) {
  const byName = new Map()
  for (const business of businesses) {
    for (const key of businessMatchKeys(business.identity.name)) {
      const values = byName.get(key) || []
      values.push(business)
      byName.set(key, values)
    }
  }
  return byName
}

function findBusiness(name, businesses, byName) {
  const keys = businessMatchKeys(name)
  for (let index = 0; index < keys.length; index += 1) {
    const exact = byName.get(keys[index]) || []
    if (exact.length === 1) {
      return {
        business: exact[0],
        method: index === 0 ? "normalized-name" : "geography-normalized-name",
        confidence: index === 0 ? 1 : 0.95,
      }
    }
  }

  const key = normalizedBusinessName(name)
  const wantedTokens = new Set(key.split(" ").filter(Boolean))
  const candidates = businesses.filter((business) => {
    const candidateTokens = new Set(business.identity.normalizedName.split(" ").filter(Boolean))
    const intersection = [...wantedTokens].filter((token) => candidateTokens.has(token)).length
    const denominator = Math.max(wantedTokens.size, candidateTokens.size)
    return denominator > 0 && intersection / denominator >= 0.8
  })
  if (candidates.length === 1) return { business: candidates[0], method: "token-overlap", confidence: 0.8 }
  return null
}

function createEvidenceOnlyBusiness(name, category = "other") {
  const businessId = businessBaseId(name)
  return canonicalBusinessFromLead(
    {
      name,
      category,
      village: "",
      phone: "",
      website: "",
      sources: "",
      budget: "",
      authority: "",
      need: "",
      timeline: "",
      priority: null,
      tier: "",
    },
    businessId
  )
}

function ensureBusiness(name, businesses, byName) {
  const match = findBusiness(name, businesses, byName)
  if (match) return match
  let business = createEvidenceOnlyBusiness(name)
  const usedIds = new Set(businesses.map((item) => item.businessId))
  let candidate = business.businessId
  let suffix = 2
  while (usedIds.has(candidate)) {
    candidate = `${business.businessId}:${suffix}`
    suffix += 1
  }
  business = { ...business, businessId: candidate }
  businesses.push(business)
  for (const key of businessMatchKeys(business.identity.name)) {
    const values = byName.get(key) || []
    values.push(business)
    byName.set(key, values)
  }
  return { business, method: "evidence-only-record", confidence: 0.6 }
}

function mergeDatasetListing(business, dataset, item) {
  const alias = cleanText(item.title)
  if (alias && alias !== business.identity.name && !business.identity.aliases.includes(alias)) {
    business.identity.aliases.push(alias)
  }
  business.location.address ||= cleanText(item.address) || null
  business.listing.rating ??= Number.isFinite(Number(item.totalScore)) ? Number(item.totalScore) : null
  business.listing.reviewCount ??= Number.isFinite(Number(item.reviewsCount)) ? Number(item.reviewsCount) : null
  business.listing.observedAt ||= dataset.collectedAt
  business.provenance.push({
    provider: "apify",
    locator: dataset.datasetId,
    evidenceClass: "customer_review_dataset",
    observedAt: dataset.collectedAt,
    transcriptLine: dataset.transcriptLine,
  })
}

async function loadPublishedReads(directory) {
  const files = (await readdir(directory)).filter((file) => file.endsWith(".json")).sort()
  const reads = []
  for (const file of files) {
    try {
      const value = JSON.parse(await readFile(path.join(directory, file), "utf8"))
      reads.push({ file, value })
    } catch {
      reads.push({ file, value: null })
    }
  }
  return reads
}

function dateFromSource(source) {
  const match = cleanText(source).match(/\b(20\d{2}-\d{2}-\d{2})\b/)
  return match ? `${match[1]}T00:00:00.000Z` : null
}

function csvValue(value) {
  return `"${String(value ?? "").replace(/"/g, '""')}"`
}

function verticalRows(businesses, reviews, diagnostics) {
  const groups = new Map()
  for (const business of businesses) {
    const vertical = business.classification.vertical
    const values = groups.get(vertical) || []
    values.push(business)
    groups.set(vertical, values)
  }
  const reviewsByBusiness = new Map()
  for (const review of reviews) {
    const values = reviewsByBusiness.get(review.businessId) || []
    values.push(review)
    reviewsByBusiness.set(review.businessId, values)
  }
  const diagnosticsByBusiness = new Map()
  for (const diagnostic of diagnostics) diagnosticsByBusiness.set(diagnostic.businessId, diagnostic)

  return [...groups.entries()].map(([vertical, rows]) => {
    const reviewBusinessCount = rows.filter((row) => reviewsByBusiness.has(row.businessId)).length
    const reviewRows = rows.reduce((sum, row) => sum + (reviewsByBusiness.get(row.businessId)?.length || 0), 0)
    const textReviewRows = rows.reduce(
      (sum, row) => sum + (reviewsByBusiness.get(row.businessId)?.filter((review) => review.text)?.length || 0),
      0
    )
    return {
      vertical,
      businesses: rows.length,
      hotLeads: rows.filter((row) => row.legacySignals.tier === "HOT").length,
      phoneCoveragePct: Math.round((countPresent(rows, (row) => row.contact.phone) / rows.length) * 100),
      websiteCoveragePct: Math.round((countPresent(rows, (row) => row.contact.website) / rows.length) * 100),
      placeIdCoveragePct: Math.round((countPresent(rows, (row) => row.externalIds.googlePlaceId) / rows.length) * 100),
      listingRatingCoveragePct: Math.round((countPresent(rows, (row) => row.listing.rating) / rows.length) * 100),
      reviewBusinesses: reviewBusinessCount,
      reviewCoveragePct: Math.round((reviewBusinessCount / rows.length) * 1000) / 10,
      reviewRows,
      textReviewRows,
      derivedDiagnostics: rows.filter((row) => diagnosticsByBusiness.has(row.businessId)).length,
    }
  }).sort((a, b) => b.businesses - a.businesses || a.vertical.localeCompare(b.vertical))
}

function duplicateIdentityGroups(businesses) {
  const groups = new Map()
  for (const business of businesses) {
    const key = business.identity.normalizedName
    const values = groups.get(key) || []
    values.push(business)
    groups.set(key, values)
  }
  return [...groups.entries()]
    .filter(([, rows]) => rows.length > 1)
    .map(([normalizedName, rows]) => ({
      normalizedName,
      count: rows.length,
      resolutionStatus: "needs-place-id-or-human-qa",
      records: rows.map((row) => ({
        businessId: row.businessId,
        name: row.identity.name,
        village: row.location.village,
        phone: row.contact.phone,
        website: row.contact.website,
      })),
    }))
    .sort((a, b) => b.count - a.count || a.normalizedName.localeCompare(b.normalizedName))
}

function verticalMarkdown(
  rows,
  {
    title = "Guam businesses by vertical",
    description = "Facts and evidence coverage only. HOT status is a legacy heuristic, not owner-confirmed demand.",
  } = {}
) {
  const lines = [
    `# ${title}`,
    "",
    description,
    "",
    "| Vertical | Businesses | HOT | Phone | Website | Place ID | Rating | Review businesses | Review rows | Derived reads |",
    "| --- | ---: | ---: | ---: | ---: | ---: | ---: | ---: | ---: | ---: |",
  ]
  for (const row of rows) {
    lines.push(`| ${row.vertical} | ${row.businesses} | ${row.hotLeads} | ${row.phoneCoveragePct}% | ${row.websiteCoveragePct}% | ${row.placeIdCoveragePct}% | ${row.listingRatingCoveragePct}% | ${row.reviewBusinesses} (${row.reviewCoveragePct}%) | ${row.reviewRows} | ${row.derivedDiagnostics} |`)
  }
  return `${lines.join("\n")}\n`
}

function qualityMarkdown({ businesses, reviews, diagnostics, verticals, duplicateGroups, datasets, generatedAt }) {
  const freshCutoff = Date.parse(generatedAt) - FRESH_REVIEW_DAYS * 24 * 60 * 60 * 1000
  const freshReviews = reviews.filter((review) => Number.isFinite(Date.parse(review.collectedAt)) && Date.parse(review.collectedAt) >= freshCutoff)
  const rawReviewBusinesses = new Set(reviews.map((review) => review.businessId)).size
  const textReviews = reviews.filter((review) => review.text).length
  const lines = [
    "# Anchor Marianas data-quality report",
    "",
    `Generated ${generatedAt}. Canonical grain: one provisional business entity per row and one customer review per row.`,
    "",
    "## Dataset summary",
    "",
    `- Canonical businesses: ${businesses.length}`,
    `- Recovered Apify datasets: ${datasets.length}`,
    `- Recovered review rows: ${reviews.length} (${textReviews} with text)` ,
    `- Businesses with raw review rows: ${rawReviewBusinesses}`,
    `- Derived Anchor read summaries: ${diagnostics.length}`,
    `- Fresh review rows within ${FRESH_REVIEW_DAYS} days: ${freshReviews.length}`,
    `- Suspected duplicate identity groups awaiting resolution: ${duplicateGroups.length}`,
    "",
    "## Findings",
    "",
    `1. **Critical, high confidence: fresh review evidence is absent.** ${freshReviews.length} rows pass the ${FRESH_REVIEW_DAYS}-day freshness window. Pattern recognition cannot support a current market claim yet.`,
    `2. **Critical, high confidence: raw review coverage is ${rawReviewBusinesses}/${businesses.length} businesses.** The recovered corpus is useful for validating the schema, not for ranking Guam-wide problems.`,
    `3. **High, high confidence: Google Place ID coverage is ${countPresent(businesses, (row) => row.externalIds.googlePlaceId)}/${businesses.length}.** Without stable listing IDs, name-based joins can collide or select the wrong branch.`,
    `4. **High, high confidence: ${duplicateGroups.length} same-name identity groups remain unresolved.** They may be true duplicates or separate branches. They are flagged, not auto-merged, until Place IDs or human QA distinguish them.`,
    `5. **High, high confidence: ${countPresent(businesses, (row) => row.listing.rating)}/${businesses.length} businesses have a sourced rating and review count.** The 1,067-record lead list is directory metadata, not a Google Maps market snapshot.`,
    `6. **Medium, high confidence: contact and location fields are sparse.** Missing phone: ${businesses.length - countPresent(businesses, (row) => row.contact.phone)}. Missing website: ${businesses.length - countPresent(businesses, (row) => row.contact.website)}. Missing village: ${businesses.length - countPresent(businesses, (row) => row.location.village)}.`,
    "7. **Medium, high confidence: budget, authority, need, priority, and HOT/WARM/COLD are heuristics.** They may guide research order but cannot be cited as owner budget, urgency, or willingness to buy.",
    "8. **Medium, high confidence: five published reads are derived summaries.** They preserve useful hypotheses but cannot replace raw review-level provenance in a new report.",
    "",
    "## Minimum useful remediation",
    "",
    "1. Recover or re-fetch Google Place IDs and current listing metadata for every canonical business.",
    "2. Fetch review text in priority waves, beginning with the verticals that combine reachable businesses, review volume, and plausible implementation value.",
    "3. Store every raw review with review platform, retrieval provider, dataset, collection time, business ID, and content hash.",
    "4. Require each problem pattern to cite review IDs and report both review count and distinct-business count.",
    "5. Keep market-rate evidence in a separate service-rate table with dated source URLs. Never infer a market rate from review sentiment.",
    "",
    "## Coverage target before Guam-wide pattern claims",
    "",
    "- At least 95% Google Place ID coverage for the chosen vertical.",
    "- Current rating and review-count metadata for at least 90% of businesses in that vertical.",
    "- At least 20 text reviews per business where available, with a documented cap and retrieval date.",
    "- At least 10 businesses with review text before calling a pattern vertical-level, and at least 3 distinct businesses supporting each published pattern.",
    "- Human identity and evidence QA before report generation or outreach.",
    "",
    "## Vertical coverage",
    "",
    verticalMarkdown(verticals).split("\n").slice(4).join("\n").trim(),
    "",
  ]
  return `${lines.join("\n")}\n`
}

export async function buildDataFoundation(args, now = new Date()) {
  const generatedAt = now.toISOString()
  const leads = JSON.parse(await readFile(args.leads, "utf8"))
  if (!Array.isArray(leads) || !leads.length) throw new Error("Lead input must be a non-empty JSON array.")

  const ids = uniqueBusinessIds(leads)
  const businesses = leads.map((lead, index) => canonicalBusinessFromLead(lead, ids[index]))
  const leadBusinessIds = new Set(businesses.map((business) => business.businessId))
  const byName = indexBusinesses(businesses)
  const datasets = await extractApifyDatasets(args.transcript)
  if (!datasets.length) throw new Error("No recoverable Apify review datasets were found in the transcript.")
  const rawDirectory = path.join(args.output, "raw", "apify")
  await writeRecoveredDatasets(datasets, rawDirectory)

  const reviews = []
  const entityMatches = []
  for (const dataset of datasets) {
    const first = dataset.items[0]
    if (!first?.title) continue
    const match = ensureBusiness(first.title, businesses, byName)
    entityMatches.push({
      sourceName: first.title,
      businessId: match.business.businessId,
      method: match.method,
      confidence: match.confidence,
      datasetId: dataset.datasetId,
    })
    mergeDatasetListing(match.business, dataset, first)
    dataset.items.forEach((item, itemIndex) => {
      reviews.push(reviewRecord({ dataset, item, businessId: match.business.businessId, itemIndex }))
    })
  }

  const publishedReads = await loadPublishedReads(args.reads)
  const diagnostics = []
  for (const { file, value } of publishedReads) {
    if (!value?.business) continue
    const match = ensureBusiness(value.business, businesses, byName)
    match.business.listing.rating ??= Number.isFinite(Number(value.rating)) ? Number(value.rating) : null
    match.business.listing.reviewCount ??= Number.isFinite(Number(value.reviewCount)) ? Number(value.reviewCount) : null
    const observedAt = dateFromSource(value.source)
    match.business.listing.observedAt ||= observedAt
    match.business.provenance.push({
      provider: "anchor-published-read",
      locator: file,
      evidenceClass: "derived_diagnostic",
      observedAt,
    })
    diagnostics.push({
      schemaVersion: 1,
      diagnosticId: `diagnostic:${slugify(value.slug || value.business)}`,
      businessId: match.business.businessId,
      evidenceClass: "derived_diagnostic",
      sourceFile: file,
      sourceDescription: cleanText(value.source) || null,
      observedAt,
      summary: cleanText(value.summary) || null,
      observations: Array.isArray(value.observations) ? value.observations : [],
      questions: Array.isArray(value.questions) ? value.questions : [],
      warning: "Derived summary. Do not treat as raw review text or a current owner-confirmed problem.",
    })
  }

  businesses.sort((a, b) => a.businessId.localeCompare(b.businessId))
  reviews.sort((a, b) => a.businessId.localeCompare(b.businessId) || String(a.publishedAt).localeCompare(String(b.publishedAt)))
  diagnostics.sort((a, b) => a.businessId.localeCompare(b.businessId))
  const verticals = verticalRows(businesses, reviews, diagnostics)
  const leadBusinesses = businesses.filter((business) => leadBusinessIds.has(business.businessId))
  const leadVerticals = verticalRows(leadBusinesses, reviews, diagnostics)
  const duplicateGroups = duplicateIdentityGroups(businesses)

  const canonicalDirectory = path.join(args.output, "canonical")
  const reportDirectory = path.join(args.output, "reports")
  await writeJsonl(path.join(canonicalDirectory, "businesses.jsonl"), businesses)
  await writeJsonl(path.join(canonicalDirectory, "reviews.jsonl"), reviews)
  await writeJsonl(path.join(canonicalDirectory, "diagnostics.jsonl"), diagnostics)
  await writeJson(path.join(canonicalDirectory, "entity-matches.json"), entityMatches)
  await writeJson(path.join(canonicalDirectory, "suspected-duplicate-identities.json"), duplicateGroups)
  await atomicWrite(path.join(reportDirectory, "businesses-by-vertical.md"), verticalMarkdown(verticals))
  await atomicWrite(
    path.join(reportDirectory, "businesses-by-vertical.csv"),
    `${Object.keys(verticals[0]).join(",")}\n${verticals.map((row) => Object.values(row).map(csvValue).join(",")).join("\n")}\n`
  )
  await atomicWrite(
    path.join(reportDirectory, "legacy-leads-by-vertical.md"),
    verticalMarkdown(leadVerticals, {
      title: `${leadBusinesses.length.toLocaleString("en-US")} source leads by vertical`,
      description: "The exact legacy lead set, standardized into common verticals. Review-backed businesses missing from this source are excluded. HOT status is a heuristic, not owner-confirmed demand.",
    })
  )
  await atomicWrite(
    path.join(reportDirectory, "legacy-leads-by-vertical.csv"),
    `${Object.keys(leadVerticals[0]).join(",")}\n${leadVerticals.map((row) => Object.values(row).map(csvValue).join(",")).join("\n")}\n`
  )
  await atomicWrite(
    path.join(reportDirectory, "data-quality.md"),
    qualityMarkdown({ businesses, reviews, diagnostics, verticals, duplicateGroups, datasets, generatedAt })
  )

  const manifest = {
    schemaVersion: 1,
    generatedAt,
    privateOutput: path.resolve(args.output),
    sources: {
      leads: { path: args.leads, sha256: await hashFile(args.leads), records: leads.length },
      transcript: { path: args.transcript, sha256: await hashFile(args.transcript), recoveredDatasets: datasets.length },
      publishedReads: { path: args.reads, files: publishedReads.length },
    },
    outputs: {
      businesses: businesses.length,
      leadBusinesses: leadBusinesses.length,
      reviews: reviews.length,
      textReviews: reviews.filter((review) => review.text).length,
      diagnostics: diagnostics.length,
      verticals: verticals.length,
      suspectedDuplicateIdentityGroups: duplicateGroups.length,
    },
    evidenceRules: {
      rawReviewsAreDistinctFromDerivedDiagnostics: true,
      legacyCommercialSignalsAreHeuristics: true,
      minimumFreshReviewDays: FRESH_REVIEW_DAYS,
      patternClaimsRequireReviewIds: true,
      marketRatesRequireDatedSourceUrls: true,
    },
  }
  await writeJson(path.join(args.output, "manifest.json"), manifest)
  return { manifest, businesses, reviews, diagnostics, verticals, leadVerticals, duplicateGroups, datasets }
}

async function main() {
  const args = parseArgs(process.argv.slice(2))
  const result = await buildDataFoundation(args)
  console.log(`Canonical businesses: ${result.businesses.length}`)
  console.log(`Recovered review rows: ${result.reviews.length}`)
  console.log(`Derived diagnostics: ${result.diagnostics.length}`)
  console.log(`Private output: ${args.output}`)
}

if (import.meta.url === pathToFileURL(process.argv[1] || "").href) {
  main().catch((error) => {
    console.error(error.message)
    process.exitCode = 1
  })
}
