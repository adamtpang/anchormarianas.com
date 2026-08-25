#!/usr/bin/env node
// AnchorScan reviews fetcher. Swappable Google Maps reviews source.
//
//   node fetch-reviews.mjs "Dusit Beach Resort Guam, Tumon" --source google
//   node fetch-reviews.mjs "Dusit Beach Resort Guam" --source serpapi
//   node fetch-reviews.mjs ChIJ.... --source serpapi
//   node fetch-reviews.mjs "Some Cafe" --source manual --file reviews.txt
//   node fetch-reviews.mjs "Quality Plumbing Guam" --source apify
//
// Prints { business, reviews } as JSON to stdout. Keys come from env:
//   GOOGLE_PLACES_API_KEY   (google, default; ~5 reviews, reliable, cannot paginate)
//   SERPAPI_API_KEY         (serpapi; name lookup costs one extra search; direct Place ID also works)
//   OUTSCRAPER_API_KEY      (outscraper; query by name, first 500 records free)
//   APIFY_API_TOKEN         (apify; query by name, deep review history, pay per run)
// No key needed for --source manual.
//
// This is a read-only data fetcher. It never writes to any system.

import { readFile } from "node:fs/promises"

const PLACES = "https://places.googleapis.com/v1"
const REVIEW_SOURCES = new Set(["google", "serpapi", "outscraper", "apify", "manual"])
const IDENTITY_STOP_WORDS = new Set(["guam", "llc", "inc", "corp", "corporation", "pc", "ltd"])

function identityTokens(value) {
  return String(value || "")
    .normalize("NFKD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/\bp[\s._-]*c\b/gi, " pc ")
    .toLowerCase()
    .match(/[a-z0-9]+/g)
    ?.filter((token) => !IDENTITY_STOP_WORDS.has(token)) ?? []
}

export function businessNameMatchScore(expected, actual) {
  const left = [...new Set(identityTokens(expected))]
  const right = [...new Set(identityTokens(actual))]
  if (!left.length || !right.length) return 0
  const intersection = left.filter((token) => right.includes(token)).length
  return intersection / Math.max(left.length, right.length)
}

export function locationMatchScore(expected, actual) {
  if (!expected) return 1
  const left = identityTokens(expected)
  const right = identityTokens(actual)
  if (!left.length) return /\bguam\b/i.test(actual || "") ? 1 : 0
  return left.some((token) => right.includes(token)) ? 1 : 0
}

export function businessLocationMatches(expected, actual) {
  return locationMatchScore(expected, actual) > 0
}

export function selectSerpapiCandidate(candidates, expected) {
  const ranked = candidates
    .filter((candidate) => candidate?.place_id && candidate?.title)
    .map((candidate) => {
      const nameScore = businessNameMatchScore(expected.name, candidate.title)
      const locationScore = locationMatchScore(expected.location, candidate.address)
      return {
        candidate,
        nameScore,
        locationScore,
        score: nameScore * 0.9 + locationScore * 0.1,
      }
    })
    .filter(
      (entry) =>
        entry.nameScore >= 0.8 &&
        entry.locationScore > 0 &&
        entry.score >= 0.8
    )
    .sort((a, b) => b.score - a.score)

  if (!ranked.length) return null
  if (
    ranked[1] &&
    ranked[1].candidate.place_id !== ranked[0].candidate.place_id &&
    ranked[0].score - ranked[1].score < 0.1
  ) {
    throw new Error(`SerpAPI returned ambiguous matches for "${expected.name}". Use a direct Google Place ID.`)
  }
  return { ...ranked[0].candidate, matchScore: ranked[0].score }
}

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
  return data.places?.[0] ? data.places[0].id : null
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

// Resolve a business name to a Google place_id using SerpAPI's own maps
// search, so SerpAPI works standalone without a Google Places key. Costs one
// extra search against the SerpAPI quota (free tier is 250/month), so a full
// name-to-reviews run is 2 searches per business.
export async function serpapiFindPlace(
  key,
  query,
  expected = { name: query, location: "" }
) {
  const url = `https://serpapi.com/search.json?engine=google_maps&type=search&q=${encodeURIComponent(query)}&api_key=${encodeURIComponent(key)}`
  const res = await fetch(url, { signal: AbortSignal.timeout(30000) })
  if (!res.ok) throw new Error(`SerpAPI maps search ${res.status}: ${(await res.text()).slice(0, 200)}`)
  const data = await res.json()
  const candidates = [
    ...(data.place_results ? [data.place_results] : []),
    ...(Array.isArray(data.local_results) ? data.local_results : []),
  ]
  const hit = selectSerpapiCandidate(candidates, expected)
  if (!hit?.place_id) return null
  return {
    placeId: hit.place_id,
    name: hit.title || query,
    address: hit.address || "",
    rating: hit.rating ?? null,
    ratingCount: hit.reviews ?? null,
    matchScore: hit.matchScore,
  }
}

async function fetchSerpapi(input) {
  const key = process.env.SERPAPI_API_KEY
  if (!key) throw new Error("SERPAPI_API_KEY not set.")
  const c = classify(input.query)
  let placeId = c.kind === "placeId" ? c.value : null
  let found = null
  if (!placeId) {
    const q = input.location ? `${input.query} ${input.location}` : input.query
    found = await serpapiFindPlace(key, q, {
      name: input.query,
      location: input.location || "",
    })
    if (!found) throw new Error(`SerpAPI could not find "${input.query}" on Google Maps.`)
    placeId = found.placeId
  }
  const url = `https://serpapi.com/search.json?engine=google_maps_reviews&place_id=${encodeURIComponent(placeId)}&api_key=${encodeURIComponent(key)}`
  const res = await fetch(url, { signal: AbortSignal.timeout(30000) })
  if (!res.ok) throw new Error(`SerpAPI ${res.status}: ${(await res.text()).slice(0, 300)}`)
  const data = await res.json()
  if (
    found &&
    data.place_info?.title &&
    businessNameMatchScore(found.name, data.place_info.title) < 0.8
  ) {
    throw new Error("SerpAPI review results did not match the selected business.")
  }
  const reviews = (data.reviews || [])
    .filter((r) => r.snippet)
    .map((r) => ({ author: r.user?.name || "Google reviewer", rating: r.rating ?? null, text: String(r.snippet).trim(), publishedAt: r.date || null }))
  return {
    business: {
      name: data.place_info?.title || found?.name || input.query,
      location: data.place_info?.address || found?.address || input.location || "",
      placeId,
      rating: data.place_info?.rating ?? found?.rating ?? null,
      ratingCount: data.place_info?.reviews ?? found?.ratingCount ?? null,
      source: "serpapi",
      matchScore: found?.matchScore ?? null,
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
  const place = data.data?.[0] || {}
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

// Apify: compass/google-maps-reviews-scraper via the run-sync API. Query by
// business name (+ optional location). Deep review history, billed per run.
async function fetchApify(input) {
  const token = process.env.APIFY_API_TOKEN
  if (!token) throw new Error("APIFY_API_TOKEN not set.")
  const q = input.location ? `${input.query} ${input.location}` : input.query
  const max = Number(input.maxReviews) || 30
  const url = `https://api.apify.com/v2/acts/compass~google-maps-reviews-scraper/run-sync-get-dataset-items?token=${encodeURIComponent(token)}`
  const res = await fetch(url, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ searchStringsArray: [q], maxReviews: max, language: "en", reviewsSort: "newest" }),
    signal: AbortSignal.timeout(180000),
  })
  if (!res.ok) throw new Error(`Apify ${res.status}: ${(await res.text()).slice(0, 300)}`)
  const items = await res.json()
  const list = Array.isArray(items) ? items : []
  const first = list[0] || {}
  const reviews = list
    .filter((r) => r.text)
    .map((r) => ({
      author: r.name || "Google reviewer",
      rating: r.stars ?? null,
      text: String(r.text).trim(),
      publishedAt: r.publishedAtDate || r.publishAt || null,
    }))
  return {
    business: {
      name: first.title || input.query,
      location: first.address || input.location || "",
      placeId: first.placeId || null,
      rating: first.totalScore ?? null,
      ratingCount: first.reviewsCount ?? null,
      source: "apify",
    },
    reviews,
  }
}

export async function fetchReviews(input) {
  const source = input.source || "google"
  if (!REVIEW_SOURCES.has(source)) {
    throw new Error(`Unknown review source: ${source}`)
  }
  let result
  if (source === "serpapi") result = await fetchSerpapi(input)
  else if (source === "outscraper") result = await fetchOutscraper(input)
  else if (source === "apify") result = await fetchApify(input)
  else if (source === "manual") result = await fetchManual(input)
  else result = await fetchGoogle(input)
  return {
    ...result,
    requested: {
      name: input.query,
      location: input.location || "",
      source,
    },
  }
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
    process.stdout.write(`${JSON.stringify(result, null, 2)}\n`)
  } catch (e) {
    console.error("fetch-reviews failed:", e.message)
    process.exit(1)
  }
}
