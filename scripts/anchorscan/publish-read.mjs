#!/usr/bin/env node
// Generate a published read using YOUR Claude subscription, not API credits.
//
//   node scripts/anchorscan/publish-read.mjs "Quality Plumbing Guam"
//   node scripts/anchorscan/publish-read.mjs "J Nail, Harmon Guam" --source apify
//
// How this stays free and within the rules: the report is generated HERE, on
// your machine, by shelling out to the `claude` CLI under your own login. The
// website never calls Anthropic. It only serves the JSON this writes into
// content/reads/, as a static page at /scan/<slug>.
//
// That is the whole trick. Your own automation under your own account is
// sanctioned. A hosted endpoint answering strangers with your subscription is
// not, which is why /api/scan needs API credits and this does not.

import { readFile, writeFile, mkdir } from "node:fs/promises"
import { spawn } from "node:child_process"
import path from "node:path"
import { fileURLToPath } from "node:url"
import { fetchReviews } from "./fetch-reviews.mjs"

const HERE = path.dirname(fileURLToPath(import.meta.url))
const ROOT = path.resolve(HERE, "..", "..")
const OUT_DIR = path.join(ROOT, "content", "reads")

const SCHEMA = {
  slug: "kebab-case-business-name",
  business: "string",
  location: "string",
  generatedAt: "YYYY-MM-DD",
  source: "string, where the data came from",
  rating: 0,
  reviewCount: 0,
  summary: "1 to 2 sentences, plain, what this business looks like from its reviews",
  observations: [{ title: "3 to 6 words", detail: "2 to 3 sentences", evidence: "1 sentence tied to real reviews" }],
  questions: ["a genuinely diagnostic question"],
  focus: "1 to 2 sentences, framed as a question, never a pitch",
}

function slugify(s) {
  return String(s).toLowerCase().normalize("NFKD").replace(/[^\w\s-]/g, "").trim().replace(/\s+/g, "-").slice(0, 60)
}

function runClaude(prompt) {
  return new Promise((resolve, reject) => {
    const cmd = process.platform === "win32" ? "claude.cmd" : "claude"
    const child = spawn(cmd, ["-p", "--output-format", "json", "--model", "sonnet"], {
      stdio: ["pipe", "pipe", "pipe"],
      shell: process.platform === "win32",
    })
    let out = "", err = ""
    child.stdout.on("data", (d) => (out += d))
    child.stderr.on("data", (d) => (err += d))
    child.on("error", (e) => reject(new Error(`Could not launch the claude CLI (${e.message}). Install Claude Code and log in.`)))
    child.on("close", (code) => (code === 0 ? resolve(out) : reject(new Error(`claude exited ${code}: ${err.slice(0, 300)}`))))
    child.stdin.write(prompt)
    child.stdin.end()
  })
}

function extractJson(cliOut) {
  let envelope
  try { envelope = JSON.parse(cliOut) } catch { envelope = null }
  const text = envelope && typeof envelope.result === "string" ? envelope.result : cliOut
  const cleaned = text.trim().replace(/^```(?:json)?\s*|\s*```$/g, "")
  const s = cleaned.indexOf("{"), e = cleaned.lastIndexOf("}")
  return JSON.parse(s !== -1 && e !== -1 ? cleaned.slice(s, e + 1) : cleaned)
}

// Load keys from the repo .env if they are not already in the environment, so
// nothing has to be exported before running this.
async function loadEnv() {
  let env = ""
  try {
    env = await readFile(path.join(ROOT, ".env"), "utf8")
  } catch {
    return
  }
  for (const name of ["APIFY_API_TOKEN", "SERPAPI_API_KEY", "OUTSCRAPER_API_KEY", "GOOGLE_PLACES_API_KEY"]) {
    if (process.env[name]) continue
    const m = env.match(new RegExp(`^${name}=(.+)$`, "m"))
    if (m) process.env[name] = m[1].trim().replace(/^["']|["']$/g, "")
  }
}

const SOURCE_HELP = `
Options, cheapest first:

  1. Paste the reviews yourself (always works, no key, no quota):
       node scripts/anchorscan/publish-read.mjs "Business Name" --source manual --file reviews.txt
     where reviews.txt holds one review per blank-line-separated block.

  2. SerpAPI free tier, 250 searches a month, no card required:
       put SERPAPI_API_KEY in .env, then add --source serpapi

  3. Apify, only if the monthly usage cap is not already exceeded:
       put APIFY_API_TOKEN in .env, then add --source apify
`

async function main() {
  await loadEnv()
  const args = process.argv.slice(2)
  const query = args
    .filter((a, i) => !a.startsWith("--") && !String(args[i - 1] || "").startsWith("--"))
    .join(" ")
    .trim()
  const sourceIdx = args.indexOf("--source")
  const source = sourceIdx !== -1 ? args[sourceIdx + 1] : "apify"
  const fileIdx = args.indexOf("--file")
  const file = fileIdx !== -1 ? args[fileIdx + 1] : undefined
  if (!query) {
    console.error('Usage: node publish-read.mjs "Business Name, Guam" [--source apify|google|serpapi|manual] [--file reviews.txt]')
    process.exit(1)
  }

  console.log(`Fetching reviews for "${query}" via ${source}...`)
  let fetched
  try {
    fetched = await fetchReviews({ query, source, file })
  } catch (e) {
    console.error(`\nReview fetch failed: ${e.message}`)
    console.error(SOURCE_HELP)
    process.exit(1)
  }
  if (!fetched.reviews.length) {
    console.error(`\nNo reviews found for "${query}".`)
    console.error(SOURCE_HELP)
    process.exit(1)
  }
  console.log(`  ${fetched.reviews.length} reviews.`)

  const method = await readFile(path.join(HERE, "diagnose.md"), "utf8")
  const reviewBlock = fetched.reviews
    .map((r, i) => `[${i + 1}] (${r.rating ?? "no rating"}) ${r.author}\n${r.text}`)
    .join("\n\n")

  const prompt = [
    method,
    "\n---\n",
    "Return ONLY JSON matching this shape (3 to 4 observations, 3 to 5 questions):",
    JSON.stringify(SCHEMA),
    "\n---\n",
    `BUSINESS: ${fetched.business.name}`,
    `LOCATION: ${fetched.business.location || "Guam"}`,
    fetched.business.rating != null ? `RATING: ${fetched.business.rating} (${fetched.business.ratingCount ?? "?"} reviews)` : "",
    `SLUG: ${slugify(fetched.business.name)}`,
    `GENERATED: ${new Date().toISOString().slice(0, 10)}`,
    `\nREVIEWS:\n${reviewBlock}`,
    "\nReturn only the JSON object.",
  ].filter(Boolean).join("\n")

  console.log("Generating the read on your Claude subscription...")
  const read = extractJson(await runClaude(prompt))

  read.slug = read.slug || slugify(fetched.business.name)
  read.generatedAt = read.generatedAt || new Date().toISOString().slice(0, 10)
  read.source = read.source || `Google Maps reviews, read on ${read.generatedAt}`
  if (read.rating == null) read.rating = fetched.business.rating ?? null
  if (read.reviewCount == null) read.reviewCount = fetched.business.ratingCount ?? fetched.reviews.length

  await mkdir(OUT_DIR, { recursive: true })
  const outFile = path.join(OUT_DIR, `${read.slug}.json`)
  await writeFile(outFile, JSON.stringify(read, null, 2) + "\n", "utf8")

  console.log(`\nWrote ${path.relative(ROOT, outFile)}`)
  console.log(`Publishes at: https://anchormarianas.com/scan/${read.slug}`)
  console.log("Commit and push to make it live. No API credits used.")
}

main().catch((e) => {
  console.error("publish-read failed:", e.message)
  process.exit(1)
})
