#!/usr/bin/env node
// AnchorScan deep audit. Given a business, pull its Google Maps data via Apify
// (website, phone, hours, reviews + owner-response rate), detect problems, and
// map each to a fixed-price Anchor menu item. "Every problem has a price."
//
// Deterministic and honest: it flags only what the listing data shows, and it
// never invents dollar impact. The $1,500 audit is where quantification happens.
//
//   node deep-audit.mjs "Quality Plumbing Guam"
//   node deep-audit.mjs "J Nail" --location "Harmon Guam"
//
// Needs APIFY_API_TOKEN in env or the repo .env. Read-only.

import { readFile } from "node:fs/promises"

const MENU = {
  landing: { name: "5-day landing page", price: "$497", live: true },
  responder: { name: "AI Review Responder", price: "$150/mo", live: false },
  reception: { name: "AI Receptionist", price: "$5,000 + $500/mo", live: false },
  audit: { name: "AI Opportunity Audit", price: "$1,500", live: true },
}

async function fetchPlace(query, token) {
  const url = `https://api.apify.com/v2/acts/compass~crawler-google-places/run-sync-get-dataset-items?token=${encodeURIComponent(token)}`
  const res = await fetch(url, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      searchStringsArray: [query],
      maxCrawledPlaces: 1,
      maxReviews: 20,
      reviewsSort: "newest",
      language: "en",
    }),
    signal: AbortSignal.timeout(180000),
  })
  if (!res.ok) throw new Error(`Apify ${res.status}: ${(await res.text()).slice(0, 300)}`)
  const items = await res.json()
  return Array.isArray(items) && items[0] ? items[0] : null
}

export function analyze(place) {
  const reviews = Array.isArray(place.reviews) ? place.reviews : []
  const replied = reviews.filter((r) => r.responseFromOwnerText)
  const responseRate = reviews.length ? replied.length / reviews.length : 0
  const blob = reviews
    .filter((r) => r.text)
    .map((r) => String(r.text).toLowerCase())
    .join(" ")
  const hits = (re) => re.test(blob)

  const signals = {
    name: place.title || place.name || "the business",
    website: place.website || null,
    phone: place.phone || place.phoneUnformatted || null,
    rating: place.totalScore ?? null,
    reviewCount: place.reviewsCount ?? reviews.length,
    responseRate,
    missedCallLang: hits(/missed call|no answer|couldn'?t reach|never picked up|didn'?t answer|call back/),
    bookingLang: hits(/walk[- ]?in|appointment|booking|reservation|fully booked|no online/),
  }

  const problems = []
  if (!signals.website) {
    problems.push({ problem: "No website found on your Google listing.", item: MENU.landing })
  }
  if (signals.reviewCount >= 5 && responseRate < 0.3) {
    problems.push({
      problem: `Most of your reviews have no reply (about ${Math.round(responseRate * 100)}% answered). Google quietly rewards replying to each one.`,
      item: MENU.responder,
    })
  }
  if (signals.missedCallLang) {
    problems.push({ problem: "Customers mention calls that went unanswered.", item: MENU.reception })
  }
  if (signals.bookingLang) {
    problems.push({ problem: "Reviews show walk-in versus appointment confusion.", item: MENU.reception })
  }
  return { signals, problems }
}

export function toMarkdown({ signals, problems }, query) {
  const pct = Math.round(signals.responseRate * 100)
  const L = []
  L.push(`# AnchorScan deep audit: ${signals.name}`)
  L.push("")
  L.push(`${query} · ${signals.rating ?? "?"} stars · ${signals.reviewCount} reviews · ${pct}% of reviews answered`)
  L.push("")
  L.push("## What we found on your Google listing")
  L.push(`- Website: ${signals.website || "none listed"}`)
  L.push(`- Phone: ${signals.phone || "none listed"} (verify it still reaches you on the call)`)
  L.push("")
  L.push("## Problems, and what each costs to solve")
  if (!problems.length) {
    L.push(`- No obvious gaps from the listing alone. The AI Opportunity Audit (${MENU.audit.price}) goes deeper into operations.`)
  } else {
    const seen = new Set()
    for (const p of problems) {
      if (seen.has(p.item.name)) continue
      seen.add(p.item.name)
      const tag = p.item.live ? "one-tap checkout" : "book to start"
      L.push(`- **${p.problem}** -> ${p.item.name} · ${p.item.price} (${tag})`)
    }
  }
  L.push("")
  L.push(`Want the full read and the numbers? The AI Opportunity Audit (${MENU.audit.price}) quantifies each of these and builds the plan.`)
  L.push("")
  L.push("_Diagnostic only. No invented figures. Never claim the phone is broken unless you dialed it._")
  return L.join("\n")
}

async function resolveToken() {
  if (process.env.APIFY_API_TOKEN) return process.env.APIFY_API_TOKEN
  try {
    const env = await readFile(new URL("../../.env", import.meta.url), "utf8")
    const m = env.match(/^APIFY_API_TOKEN=(.+)$/m)
    if (m) return m[1].trim().replace(/^["']|["']$/g, "")
  } catch {
    // no .env; token must come from the environment
  }
  return null
}

function parseArgs(argv) {
  const pos = []
  const out = {}
  for (let i = 0; i < argv.length; i++) {
    if (argv[i] === "--location" || argv[i] === "-l") out.location = argv[++i]
    else pos.push(argv[i])
  }
  out.query = pos.join(" ").trim()
  return out
}

const isMain = process.argv[1]?.endsWith("deep-audit.mjs")
if (isMain) {
  const args = parseArgs(process.argv.slice(2))
  if (!args.query) {
    console.error('Usage: node deep-audit.mjs "Business Name Guam" [--location "Area"]')
    process.exit(1)
  }
  const token = await resolveToken()
  if (!token) {
    console.error("APIFY_API_TOKEN not set (env or repo .env).")
    process.exit(1)
  }
  const query = args.location ? `${args.query} ${args.location}` : args.query
  try {
    const place = await fetchPlace(query, token)
    if (!place) throw new Error(`No place found for "${query}".`)
    process.stdout.write(toMarkdown(analyze(place), query) + "\n")
  } catch (e) {
    console.error("deep-audit failed:", e.message)
    process.exit(1)
  }
}
