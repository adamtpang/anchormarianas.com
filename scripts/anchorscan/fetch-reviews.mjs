#!/usr/bin/env node
// AnchorScan reviews fetcher. Swappable Google Maps reviews source.
//
//   node fetch-reviews.mjs "Dusit Beach Resort Guam, Tumon" --source google
//   node fetch-reviews.mjs ChIJ....  --source serpapi
//   node fetch-reviews.mjs "Some Cafe" --source manual --file reviews.txt
//
// Prints { business, reviews } as JSON to stdout. Keys come from env:
//   GOOGLE_PLACES_API_KEY   (google, default; ~5 reviews, reliable, cannot paginate)
//   SERPAPI_API_KEY         (serpapi; needs a Place ID; paginated, paid)
//   OUTSCRAPER_API_KEY      (outscraper; query by name, first 500 records free)
// No key needed for --source manual.
//
// This is a read-only data fetcher. It never writes to any system.

import { readFile } from "node:fs/promises"

const PLACES = "https://places.googleapis.com/v1"

function classify(q) {
  const s = String(q || "").trim()
  if (/^https?:\/\//i.test(s) || /maps\.app\.goo\.gl|google\.[a-z.]+\/maps/i.test(s)) return { kind: "url", value: s }
  if (!/\s/.test(s) && !s.includes(".") && /^(ChIJ|GhIJ|Ei|Eg|Ek)[A-Za-z0-9_-]{8,}$/.test(s)) return { kind: "placeId", value: s }
  return { kind: "text", value: s }
}

async function googleTextSearch(key, textQuery) {
  const res = await fetch(`${PLACES}/places:searchText`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "X-Goog-Api-Key": key,
      "X-Goog-FieldMask": "places.id,places.displayName,places.formattedAddress",
    },
    body: JSON.stringify({ textQuery, maxResultCount: 1 }),
    signal: AbortSignal.timeout(15000),
  })
  if (!res.ok) throw new Error(`Places text search ${res.status}: ${(await res.text()).slice(0, 300)}`)
  const data = await res.json()
  return data.places && data.places[0] ? data.places[0].id : null
}

async function googleDetails(key, placeId) {
  const res = await fetch(`${PLACES}/places/${encodeURIComponent(placeId)}`, {
    headers: {
      "X-Goog-Api-Key": key,
      "X-Goog-FieldMask": "id,displayName,formattedAddress,rating,userRatingCount,googleMapsUri,reviews",
    },
    signal: AbortSignal.timeout(15000),
  })
  if (!res.ok) throw new Error(`Places details ${res.status}: ${(await res.text()).slice(0, 300)}`)
  const d = await res.json()
  const reviews = (d.reviews || [])
    .map((r) => ({
      author: r.authorAttribution?.displayName || "Google reviewer",
      rating: typeof r.rating === "number" ? r.rating : null,
      text: (r.text?.text || r.originalText?.text || "").trim(),
      publishedAt: r.publishTime || r.relativePublishTimeDescription || null,
    }))
    .filter((r) => r.text)
  return {
    business: {
      name: d.displayName?.text || "Unknown",
      location: d.formattedAddress || "",
      placeId: d.id,
      rating: d.rating ?? null,
      ratingCount: d.userRatingCount ?? null,
      source: "google-places",
    },
    reviews,
  }
}

async function fetchGoogle(input) {
  const key = process.env.GOOGLE_PLACES_API_KEY
  if (!key) throw new Error("GOOGLE_PLACES_API_KEY not set. Use --source serpapi/outscraper/manual, or set the key.")
  const c = classify(input.query)
  let placeId = c.kind === "placeId" ? c.value : null
  if (!placeId) {
    const tq = input.location ? `${input.query} ${input.location}` : input.query
    placeId = await googleTextSearch(key, tq)
  }
  if (!placeId) throw new Error(`Could not find "${input.query}" on Google Maps.`)
  return googleDetails(key, placeId)
}

async function fetchSerpapi(input) {
  const key = process.env.SERPAPI_API_KEY
  if (!key) throw new Error("SERPAPI_API_KEY not set.")
  const c = classify(input.query)
  if (c.kind !== "placeId") throw new Error("SerpAPI reviews need a Place ID. Resolve it first (e.g. run --source google) or pass the Place ID.")
  const url = `https://serpapi.com/search.json?engine=google_maps_reviews&place_id=${encodeURIComponent(c.value)}&api_key=${encodeURIComponent(key)}`
  const res = await fetch(url, { signal: AbortSignal.timeout(30000) })
  if (!res.ok) throw new Error(`SerpAPI ${res.status}: ${(await res.text()).slice(0, 300)}`)
  const data = await res.json()
  const reviews = (data.reviews || [])
    .filter((r) => r.snippet)
    .map((r) => ({ author: r.user?.name || "Google reviewer", rating: r.rating ?? null, text: String(r.snippet).trim(), publishedAt: r.date || null }))
  return {
    business: {
      name: data.place_info?.title || input.query,
      location: data.place_info?.address || input.location || "",
      placeId: c.value,
      rating: data.place_info?.rating ?? null,
      ratingCount: data.place_info?.reviews ?? null,
      source: "serpapi",
    },
    reviews,
  }
}

async function fetchOutscraper(input) {
  const key = process.env.OUTSCRAPER_API_KEY
  if (!key) throw new Error("OUTSCRAPER_API_KEY not set.")
  const q = input.location ? `${input.query} ${input.location}` : input.query
  const url = `https://api.outscraper.cloud/maps/reviews-v3?query=${encodeURIComponent(q)}&reviewsLimit=50&limit=1&async=false`
  const res = await fetch(url, { headers: { "X-API-KEY": key }, signal: AbortSignal.timeout(120000) })
  if (!res.ok) throw new Error(`Outscraper ${res.status}: ${(await res.text()).slice(0, 300)}`)
  const data = await res.json()
  const place = (data.data && data.data[0]) || {}
  const reviews = (place.reviews_data || [])
    .filter((r) => r.review_text)
    .map((r) => ({ author: r.author_title || "Google reviewer", rating: r.review_rating ?? null, text: String(r.review_text).trim(), publishedAt: r.review_datetime_utc || null }))
  return {
    business: {
      name: place.name || input.query,
      location: place.full_address || input.location || "",
      placeId: place.place_id || null,
      rating: place.rating ?? null,
      ratingCount: place.reviews ?? null,
      source: "outscraper",
    },
    reviews,
  }
}

async function fetchManual(input) {
  if (!input.file) throw new Error("--source manual needs --file <path> with one review per blank-line-separated block.")
  const raw = await readFile(input.file, "utf8")
  const reviews = raw
    .split(/\n\s*\n+/)
    .map((b) => b.trim())
    .filter(Boolean)
    .map((b) => {
      const m = b.match(/(\d(?:\.\d)?)\s*(?:\/\s*5|stars?|★)/i)
      return { author: "Pasted review", rating: m ? parseFloat(m[1]) : null, text: b, publishedAt: null }
    })
  return {
    business: { name: input.query, location: input.location || "", placeId: null, rating: null, ratingCount: null, source: "manual" },
    reviews,
  }
}

export async function fetchReviews(input) {
  const source = input.source || "google"
  if (source === "serpapi") return fetchSerpapi(input)
  if (source === "outscraper") return fetchOutscraper(input)
  if (source === "manual") return fetchManual(input)
  return fetchGoogle(input)
}

// ---- CLI ----
function parseArgs(argv) {
  const pos = []
  const out = {}
  for (let i = 0; i < argv.length; i++) {
    const a = argv[i]
    if (a === "--source" || a === "-s") out.source = argv[++i]
    else if (a === "--location" || a === "-l") out.location = argv[++i]
    else if (a === "--file" || a === "-f") out.file = argv[++i]
    else pos.push(a)
  }
  out.query = pos.join(" ").trim()
  return out
}

const isMain = import.meta.url === `file://${process.argv[1]}` || process.argv[1]?.endsWith("fetch-reviews.mjs")
if (isMain) {
  const args = parseArgs(process.argv.slice(2))
  if (!args.query) {
    console.error('Usage: node fetch-reviews.mjs "Business Name, City" --source google|serpapi|outscraper|manual [--location "City"] [--file reviews.txt]')
    process.exit(1)
  }
  try {
    const result = await fetchReviews(args)
    process.stdout.write(JSON.stringify(result, null, 2) + "\n")
  } catch (e) {
    console.error("fetch-reviews failed:", e.message)
    process.exit(1)
  }
}
