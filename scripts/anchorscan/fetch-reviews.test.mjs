import assert from "node:assert/strict"
import fs from "node:fs/promises"
import os from "node:os"
import path from "node:path"
import test from "node:test"
import {
  businessNameMatchScore,
  fetchReviews,
  selectSerpapiCandidate,
  serpapiFindPlace,
} from "./fetch-reviews.mjs"

const jsonResponse = (value, status = 200) =>
  new Response(JSON.stringify(value), {
    status,
    headers: { "Content-Type": "application/json" },
  })

test("resolves both SerpAPI place response shapes", async (t) => {
  const fetchMock = t.mock.method(globalThis, "fetch", async () =>
    jsonResponse({
      place_results: {
        place_id: "ChIJprimary123",
        title: "Primary",
        address: "Guam",
        rating: 4.8,
        reviews: 12,
      },
    })
  )
  assert.equal((await serpapiFindPlace("key", "Primary Guam"))?.placeId, "ChIJprimary123")

  fetchMock.mock.mockImplementation(async () =>
    jsonResponse({ local_results: [{ place_id: "ChIJlocal123", title: "Local" }] })
  )
  assert.equal((await serpapiFindPlace("key", "Local Guam"))?.placeId, "ChIJlocal123")
})

test("returns null for no place and throws on provider failure", async (t) => {
  const fetchMock = t.mock.method(globalThis, "fetch", async () =>
    jsonResponse({ local_results: [] })
  )
  assert.equal(await serpapiFindPlace("key", "Missing Guam"), null)

  fetchMock.mock.mockImplementation(async () => jsonResponse({ error: "down" }, 503))
  await assert.rejects(() => serpapiFindPlace("key", "Missing Guam"), /503/)
})

test("rejects weak or ambiguous SerpAPI identity matches", () => {
  assert.equal(businessNameMatchScore("Hafa Adai Dental PC", "Hafa Adai Dental P.C."), 1)
  assert.equal(
    selectSerpapiCandidate(
      [{ place_id: "wrong", title: "Different Clinic", address: "Guam" }],
      { name: "Hafa Adai Dental", location: "Guam" }
    ),
    null
  )
  assert.throws(
    () =>
      selectSerpapiCandidate(
        [
          { place_id: "one", title: "Resolved Clinic", address: "Guam" },
          { place_id: "two", title: "Resolved Clinic", address: "Guam" },
        ],
        { name: "Resolved Clinic", location: "Guam" }
      ),
    /ambiguous/
  )
  assert.equal(
    selectSerpapiCandidate(
      [
        {
          place_id: "off-island",
          title: "Resolved Clinic",
          address: "Honolulu, Hawaii",
        },
      ],
      { name: "Resolved Clinic", location: "Guam" }
    ),
    null
  )
})

test("requires the SerpAPI key before any request", async () => {
  const previous = process.env.SERPAPI_API_KEY
  delete process.env.SERPAPI_API_KEY
  try {
    await assert.rejects(
      () => fetchReviews({ query: "Business Guam", source: "serpapi" }),
      /SERPAPI_API_KEY not set/
    )
  } finally {
    if (previous === undefined) delete process.env.SERPAPI_API_KEY
    else process.env.SERPAPI_API_KEY = previous
  }
})

test("uses a direct Place ID and normalizes review metadata", async (t) => {
  const previous = process.env.SERPAPI_API_KEY
  process.env.SERPAPI_API_KEY = "test-key"
  const fetchMock = t.mock.method(globalThis, "fetch", async () =>
    jsonResponse({
      place_info: { title: "Clinic", address: "Guam", rating: 4.5, reviews: 2 },
      reviews: [
        { user: { name: "A" }, rating: 5, snippet: "Helpful", date: "today" },
        { user: { name: "B" }, rating: 1, snippet: "" },
      ],
    })
  )
  try {
    const result = await fetchReviews({ query: "ChIJ12345678", source: "serpapi" })
    assert.equal(fetchMock.mock.callCount(), 1)
    assert.equal(result.business.name, "Clinic")
    assert.equal(result.reviews.length, 1)
    assert.equal(result.reviews[0].author, "A")
  } finally {
    if (previous === undefined) delete process.env.SERPAPI_API_KEY
    else process.env.SERPAPI_API_KEY = previous
  }
})

test("name lookup feeds verified provider metadata into the review result", async (t) => {
  const previous = process.env.SERPAPI_API_KEY
  process.env.SERPAPI_API_KEY = "test-key"
  let call = 0
  t.mock.method(globalThis, "fetch", async () => {
    call += 1
    return call === 1
      ? jsonResponse({
          local_results: [
            {
              place_id: "ChIJresolved123",
              title: "Resolved Clinic",
              address: "Tamuning, Guam",
              rating: 4.7,
              reviews: 20,
            },
          ],
        })
      : jsonResponse({ reviews: [{ rating: 5, snippet: "Great" }] })
  })
  try {
    const result = await fetchReviews({
      query: "Resolved Clinic",
      location: "Guam",
      source: "serpapi",
    })
    assert.equal(result.business.placeId, "ChIJresolved123")
    assert.equal(result.business.name, "Resolved Clinic")
    assert.equal(result.business.ratingCount, 20)
  } finally {
    if (previous === undefined) delete process.env.SERPAPI_API_KEY
    else process.env.SERPAPI_API_KEY = previous
  }
})

test("rejects review metadata that disagrees with the selected SerpAPI place", async (t) => {
  const previous = process.env.SERPAPI_API_KEY
  process.env.SERPAPI_API_KEY = "test-key"
  let call = 0
  t.mock.method(globalThis, "fetch", async () => {
    call += 1
    return call === 1
      ? jsonResponse({
          local_results: [
            {
              place_id: "ChIJresolved123",
              title: "Resolved Clinic",
              address: "Guam",
            },
          ],
        })
      : jsonResponse({
          place_info: { title: "Unrelated Restaurant" },
          reviews: [{ rating: 5, snippet: "Great" }],
        })
  })
  try {
    await assert.rejects(
      () =>
        fetchReviews({
          query: "Resolved Clinic",
          location: "Guam",
          source: "serpapi",
        }),
      /did not match/
    )
  } finally {
    if (previous === undefined) delete process.env.SERPAPI_API_KEY
    else process.env.SERPAPI_API_KEY = previous
  }
})

test("normalizes Google Places text search and details", async (t) => {
  const previous = process.env.GOOGLE_PLACES_API_KEY
  process.env.GOOGLE_PLACES_API_KEY = "test-key"
  let call = 0
  t.mock.method(globalThis, "fetch", async () => {
    call += 1
    return call === 1
      ? jsonResponse({ places: [{ id: "places/google123" }] })
      : jsonResponse({
          id: "places/google123",
          displayName: { text: "Google Clinic" },
          formattedAddress: "Tamuning, Guam",
          rating: 4.6,
          userRatingCount: 2,
          reviews: [
            {
              authorAttribution: { displayName: "Reviewer" },
              rating: 5,
              text: { text: " Helpful " },
              publishTime: "2026-08-01",
            },
            { rating: 1, text: { text: "" } },
          ],
        })
  })
  try {
    const result = await fetchReviews({
      query: "Google Clinic",
      location: "Guam",
      source: "google",
    })
    assert.equal(call, 2)
    assert.equal(result.business.name, "Google Clinic")
    assert.equal(result.reviews.length, 1)
    assert.equal(result.reviews[0].text, "Helpful")
  } finally {
    if (previous === undefined) delete process.env.GOOGLE_PLACES_API_KEY
    else process.env.GOOGLE_PLACES_API_KEY = previous
  }
})

test("normalizes Outscraper review payloads", async (t) => {
  const previous = process.env.OUTSCRAPER_API_KEY
  process.env.OUTSCRAPER_API_KEY = "test-key"
  t.mock.method(globalThis, "fetch", async () =>
    jsonResponse({
      data: [
        {
          name: "Outscraper Clinic",
          full_address: "Guam",
          place_id: "out123",
          rating: 4.3,
          reviews: 1,
          reviews_data: [
            {
              author_title: "Reviewer",
              review_rating: 4,
              review_text: "Useful",
              review_datetime_utc: "2026-08-01",
            },
          ],
        },
      ],
    })
  )
  try {
    const result = await fetchReviews({ query: "Clinic", source: "outscraper" })
    assert.equal(result.business.name, "Outscraper Clinic")
    assert.equal(result.reviews[0].rating, 4)
  } finally {
    if (previous === undefined) delete process.env.OUTSCRAPER_API_KEY
    else process.env.OUTSCRAPER_API_KEY = previous
  }
})

test("normalizes Apify items and ignores rows without review text", async (t) => {
  const previous = process.env.APIFY_API_TOKEN
  process.env.APIFY_API_TOKEN = "test-key"
  t.mock.method(globalThis, "fetch", async () =>
    jsonResponse([
      {
        title: "Apify Clinic",
        address: "Guam",
        placeId: "apify123",
        totalScore: 4.9,
        reviewsCount: 2,
        name: "Reviewer",
        stars: 5,
        text: "Excellent",
        publishedAtDate: "2026-08-01",
      },
      { title: "Apify Clinic", stars: 1, text: "" },
    ])
  )
  try {
    const result = await fetchReviews({ query: "Clinic", source: "apify" })
    assert.equal(result.business.name, "Apify Clinic")
    assert.equal(result.reviews.length, 1)
  } finally {
    if (previous === undefined) delete process.env.APIFY_API_TOKEN
    else process.env.APIFY_API_TOKEN = previous
  }
})

test("parses manual review blocks without any provider key", async (t) => {
  const dir = await fs.mkdtemp(path.join(os.tmpdir(), "anchorscan-manual-"))
  const file = path.join(dir, "reviews.txt")
  await fs.writeFile(file, "5 stars Great service\n\nNo rating but helpful")
  t.after(() => fs.rm(dir, { recursive: true, force: true }))

  const result = await fetchReviews({
    query: "Manual Clinic",
    location: "Guam",
    source: "manual",
    file,
  })
  assert.equal(result.reviews.length, 2)
  assert.equal(result.reviews[0].rating, 5)
  assert.equal(result.reviews[1].rating, null)
})

test("rejects missing provider keys and unknown sources", async () => {
  const keys = [
    "GOOGLE_PLACES_API_KEY",
    "OUTSCRAPER_API_KEY",
    "APIFY_API_TOKEN",
  ]
  const previous = Object.fromEntries(keys.map((key) => [key, process.env[key]]))
  keys.forEach((key) => {
    delete process.env[key]
  })
  try {
    await assert.rejects(() => fetchReviews({ query: "X", source: "google" }), /GOOGLE_PLACES_API_KEY/)
    await assert.rejects(() => fetchReviews({ query: "X", source: "outscraper" }), /OUTSCRAPER_API_KEY/)
    await assert.rejects(() => fetchReviews({ query: "X", source: "apify" }), /APIFY_API_TOKEN/)
    await assert.rejects(() => fetchReviews({ query: "X", source: "unknown" }), /Unknown review source/)
  } finally {
    keys.forEach((key) => {
      if (previous[key] === undefined) delete process.env[key]
      else process.env[key] = previous[key]
    })
  }
})
