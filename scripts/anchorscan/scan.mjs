#!/usr/bin/env node
// AnchorScan headless batch runner. Fuelled by YOUR Claude subscription via the
// `claude` CLI in headless mode (claude -p), run under your own account.
//
//   node scan.mjs "Dusit Beach Resort Guam, Tumon" --source google
//   node scan.mjs --batch leads.csv
//   node scan.mjs "Some Cafe" --source manual --file reviews.txt
//
// For each business it: fetches reviews (read-only), asks Claude to diagnose them
// into a typed report, then writes reports/anchorscan/<slug>.json and .md.
//
// SUBSCRIPTION vs API KEY:
//   This runner shells out to the `claude` CLI, so it draws from the plan you are
//   logged into (your Max subscription, in the current paused-billing state). That
//   is fine for YOUR OWN diagnosis and prospecting work. The moment AnchorScan is
//   resold or run on behalf of a paying client, switch that surface to an Anthropic
//   API key (ANTHROPIC_API_KEY) under the Commercial Terms. Never point a client-
//   facing service at your subscription.
//
// Default model is Sonnet (cheap, plenty for diagnosis). Watch spend: with
// --output-format json the CLI reports total_cost_usd per run.

import { readFile, writeFile, mkdir } from "node:fs/promises"
import { spawn } from "node:child_process"
import path from "node:path"
import { fileURLToPath } from "node:url"
import { fetchReviews } from "./fetch-reviews.mjs"
import { renderMarkdown } from "./render.mjs"

const HERE = path.dirname(fileURLToPath(import.meta.url))

function slugify(s) {
  return (
    String(s || "business")
      .toLowerCase()
      .normalize("NFKD")
      .replace(/[^\w\s-]/g, "")
      .trim()
      .replace(/\s+/g, "-")
      .replace(/-+/g, "-")
      .slice(0, 60) || "business"
  )
}

function today() {
  return new Date().toISOString().slice(0, 10)
}

function buildPrompt(method, schema, fetched) {
  const b = fetched.business
  const head = [
    `BUSINESS: ${b.name}`,
    `LOCATION: ${b.location || "(unknown)"}`,
    b.rating != null ? `AGGREGATE RATING: ${b.rating} (${b.ratingCount ?? "?"} ratings)` : null,
    `REVIEWS SUPPLIED: ${fetched.reviews.length}`,
  ]
    .filter(Boolean)
    .join("\n")
  const body = fetched.reviews
    .map((r, i) => {
      const stars = r.rating != null ? `${r.rating}/5` : "no rating"
      const when = r.publishedAt ? ` | ${r.publishedAt}` : ""
      return `[${i + 1}] (${stars}${when}) ${r.author}\n${r.text}`
    })
    .join("\n\n")
  return (
    method +
    "\n\n---\n\nJSON schema the output must match:\n" +
    JSON.stringify(schema) +
    "\n\n---\n\n" +
    head +
    "\n\nREVIEWS:\n" +
    body +
    "\n\nReturn ONLY the JSON object, nothing before or after."
  )
}

// Run the claude CLI in headless mode, feeding the prompt on stdin.
function runClaude(prompt, model) {
  return new Promise((resolve, reject) => {
    const args = ["-p", "--output-format", "json"]
    if (model) args.push("--model", model)
    const cmd = process.platform === "win32" ? "claude.cmd" : "claude"
    const child = spawn(cmd, args, { stdio: ["pipe", "pipe", "pipe"], shell: process.platform === "win32" })
    let out = ""
    let err = ""
    child.stdout.on("data", (d) => (out += d))
    child.stderr.on("data", (d) => (err += d))
    child.on("error", (e) =>
      reject(new Error(`Could not launch the claude CLI (${e.message}). Install Claude Code and log in first.`))
    )
    child.on("close", (code) => {
      if (code !== 0) return reject(new Error(`claude exited ${code}: ${err.slice(0, 400)}`))
      resolve(out)
    })
    child.stdin.write(prompt)
    child.stdin.end()
  })
}

function extractReport(cliStdout) {
  // claude --output-format json returns an envelope: { type:"result", result:"<text>", total_cost_usd, ... }
  let envelope
  try {
    envelope = JSON.parse(cliStdout)
  } catch {
    envelope = null
  }
  const text = envelope && typeof envelope.result === "string" ? envelope.result : cliStdout
  const cost = envelope && typeof envelope.total_cost_usd === "number" ? envelope.total_cost_usd : null
  const cleaned = text.trim().replace(/^```(?:json)?\s*|\s*```$/g, "")
  // Grab the outermost JSON object.
  const start = cleaned.indexOf("{")
  const end = cleaned.lastIndexOf("}")
  const jsonStr = start !== -1 && end !== -1 ? cleaned.slice(start, end + 1) : cleaned
  return { report: JSON.parse(jsonStr), cost }
}

async function scanOne({ query, location, source, file, model, outDir }) {
  const method = await readFile(path.join(HERE, "diagnose.md"), "utf8")
  const schema = JSON.parse(await readFile(path.join(HERE, "report.schema.json"), "utf8"))

  const fetched = await fetchReviews({ query, location, source, file })
  if (!fetched.reviews.length) throw new Error(`No reviews found for "${query}" via ${source || "google"}.`)

  const prompt = buildPrompt(method, schema, fetched)
  const cliOut = await runClaude(prompt, model)
  const { report, cost } = extractReport(cliOut)

  // Fill fields we already know from the fetch so the model never has to guess them.
  report.businessName = report.businessName || fetched.business.name
  report.location = report.location || fetched.business.location
  report.reviewsRead = fetched.reviews.length
  if (report.rating == null) report.rating = fetched.business.rating ?? null

  const slug = `${slugify(report.businessName)}-${today()}`
  await mkdir(outDir, { recursive: true })
  await writeFile(path.join(outDir, `${slug}.json`), JSON.stringify(report, null, 2), "utf8")
  await writeFile(path.join(outDir, `${slug}.md`), renderMarkdown(report), "utf8")
  return { slug, cost, business: report.businessName, reviews: fetched.reviews.length }
}

function parseCsv(text) {
  const lines = text.split(/\r?\n/).filter((l) => l.trim())
  const headers = lines.shift().split(",").map((h) => h.trim())
  return lines.map((line) => {
    const cols = line.split(",")
    const row = {}
    headers.forEach((h, i) => (row[h] = (cols[i] || "").trim()))
    return row
  })
}

function parseArgs(argv) {
  const pos = []
  const out = { outDir: path.join(process.cwd(), "reports", "anchorscan"), model: "sonnet" }
  for (let i = 0; i < argv.length; i++) {
    const a = argv[i]
    if (a === "--batch") out.batch = argv[++i]
    else if (a === "--source" || a === "-s") out.source = argv[++i]
    else if (a === "--location" || a === "-l") out.location = argv[++i]
    else if (a === "--file" || a === "-f") out.file = argv[++i]
    else if (a === "--model" || a === "-m") out.model = argv[++i]
    else if (a === "--out" || a === "-o") out.outDir = argv[++i]
    else pos.push(a)
  }
  out.query = pos.join(" ").trim()
  return out
}

async function main() {
  const args = parseArgs(process.argv.slice(2))

  if (args.batch) {
    const rows = parseCsv(await readFile(args.batch, "utf8"))
    console.log(`AnchorScan batch: ${rows.length} businesses\n`)
    for (const row of rows) {
      const q = row.place_id || row.name
      try {
        const r = await scanOne({
          query: q,
          location: row.location,
          source: row.source || args.source,
          model: args.model,
          outDir: args.outDir,
        })
        console.log(`  ok   ${r.business}  (${r.reviews} reviews${r.cost != null ? `, $${r.cost.toFixed(4)}` : ""}) -> ${r.slug}.md`)
      } catch (e) {
        console.log(`  skip ${q}  (${e.message})`)
      }
    }
    return
  }

  if (!args.query) {
    console.error('Usage: node scan.mjs "Business, City" [--source google|serpapi|outscraper|manual] [--file reviews.txt]')
    console.error("       node scan.mjs --batch leads.csv")
    process.exit(1)
  }

  const r = await scanOne(args)
  console.log(`AnchorScan done: ${r.business} (${r.reviews} reviews${r.cost != null ? `, $${r.cost.toFixed(4)}` : ""})`)
  console.log(`  ${path.join(args.outDir, r.slug + ".md")}`)
}

main().catch((e) => {
  console.error("AnchorScan failed:", e.message)
  process.exit(1)
})
