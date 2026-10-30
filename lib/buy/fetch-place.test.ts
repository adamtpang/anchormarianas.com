import assert from "node:assert/strict"
import { test } from "node:test"

import { PlaceNotFound, fetchPlace, recordLead } from "./fetch-place"

type Call = { url: string; init?: RequestInit }

function fakeFetch(responses: unknown[], calls: Call[] = []) {
  const fn = async (url: string | URL | Request, init?: RequestInit) => {
    calls.push({ url: String(url), init })
    const body = responses.shift()
    if (body instanceof Response) return body
    return new Response(JSON.stringify(body), { status: 200 })
  }
  return fn as typeof fetch
}

const item = {
  title: "Donut Spot",
  address: "1 Main St, Austin, TX 78701",
  categoryName: "Donut shop",
  totalScore: 4.4,
  reviewsCount: 300,
  url: "https://maps.google.com/?cid=1",
  reviews: [
    { stars: 1, text: "Rude", publishedAtDate: "2026-08-01T00:00:00Z", responseFromOwnerText: "Sorry" },
    { stars: 5, text: null, publishedAtDate: "2025-01-01T00:00:00Z" },
  ],
}

test("fetchPlace sends one capped search and maps the listing", async () => {
  const calls: Call[] = []
  const { place, reviews } = await fetchPlace("Donut Spot", "Austin", {
    token: "t",
    fetchFn: fakeFetch([[item]], calls),
  })
  assert.equal(place.name, "Donut Spot")
  assert.equal(reviews.length, 2)
  assert.equal(reviews[0].ownerReply, "Sorry")
  assert.equal(reviews[1].text, "")
  assert.match(calls[0].url, /maxTotalChargeUsd=0\.5/)
  const input = JSON.parse(String(calls[0].init?.body))
  assert.equal(input.maxCrawledPlacesPerSearch, 1)
  assert.deepEqual(input.searchStringsArray, ["Donut Spot Austin"])
})

test("fetchPlace rejects a listing with a different name", async () => {
  await assert.rejects(
    fetchPlace("Lucky Lime", "Austin", { token: "t", fetchFn: fakeFetch([[{ ...item, title: "Walmart" }]]) }),
    PlaceNotFound,
  )
})

test("fetchPlace rejects a listing in another city", async () => {
  await assert.rejects(
    fetchPlace("Donut Spot", "Houston", { token: "t", fetchFn: fakeFetch([[item]]) }),
    PlaceNotFound,
  )
})

test("fetchPlace reports no listing and provider failures", async () => {
  await assert.rejects(fetchPlace("Donut Spot", "Austin", { token: "t", fetchFn: fakeFetch([[]]) }), PlaceNotFound)
  await assert.rejects(
    fetchPlace("Donut Spot", "Austin", { token: "t", fetchFn: fakeFetch([new Response("", { status: 402 })]) }),
    /402/,
  )
  await assert.rejects(fetchPlace("Donut Spot", "Austin", { token: "" }), /APIFY_API_TOKEN/)
})

test("recordLead pushes to the named dataset and never throws", async () => {
  const calls: Call[] = []
  const ok = await recordLead(
    { email: "a@b.co", business: "Donut Spot", city: "Austin", matched: "Donut Spot" },
    { token: "t", fetchFn: fakeFetch([{ data: { id: "ds1" } }, {}], calls) },
  )
  assert.equal(ok, true)
  assert.match(calls[1].url, /datasets\/ds1\/items/)

  const failing = (async () => {
    throw new Error("network")
  }) as typeof fetch
  assert.equal(await recordLead({ email: "a@b.co", business: "x", city: "y", matched: "x" }, { token: "t", fetchFn: failing }), false)
  assert.equal(await recordLead({ email: "a@b.co", business: "x", city: "y", matched: "x" }, { token: "" }), false)
})
