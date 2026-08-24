import assert from "node:assert/strict"
import fs from "node:fs"
import os from "node:os"
import path from "node:path"
import test from "node:test"
import { parseReadCard, publishedReads } from "./published-reads"

test("builds a card from an observation and falls back to the summary", () => {
  assert.deepEqual(
    parseReadCard({
      slug: "alpha-guam",
      business: "Alpha",
      rating: 4.2,
      observations: [{ title: "Observed pattern" }],
      summary: "Fallback",
    }),
    {
      slug: "alpha-guam",
      business: "Alpha",
      rating: 4.2,
      reviewCount: undefined,
      headline: "Observed pattern",
    }
  )
  assert.equal(
    parseReadCard({ slug: "beta", business: "Beta", summary: "Fallback" })
      ?.headline,
    "Fallback"
  )
})

test("rejects records without the fields required by the proof wall", () => {
  assert.equal(parseReadCard(null), null)
  assert.equal(parseReadCard({ business: "Missing slug", summary: "x" }), null)
  assert.equal(parseReadCard({ slug: "missing-headline", business: "X" }), null)
})

test("skips one malformed file without hiding valid proof cards", () => {
  const dir = fs.mkdtempSync(path.join(os.tmpdir(), "anchorscan-reads-"))
  try {
    fs.writeFileSync(
      path.join(dir, "high.json"),
      JSON.stringify({ slug: "high", business: "High", rating: 4.9, summary: "High" })
    )
    fs.writeFileSync(
      path.join(dir, "low.json"),
      JSON.stringify({ slug: "low", business: "Low", rating: 3.1, summary: "Low" })
    )
    fs.writeFileSync(path.join(dir, "broken.json"), "{")

    assert.deepEqual(
      publishedReads(dir).map((read) => read.slug),
      ["low", "high"]
    )
  } finally {
    fs.rmSync(dir, { recursive: true, force: true })
  }
})

test("returns an empty proof wall when the directory is unavailable", () => {
  assert.deepEqual(publishedReads(path.join(os.tmpdir(), "missing-anchor-reads")), [])
})
