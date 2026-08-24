import assert from "node:assert/strict"
import path from "node:path"
import test from "node:test"
import {
  buildTrustedPublishedRead,
  safePublishedReadPath,
  validateDiagnosticDraft,
} from "./report-validation.mjs"

const draft = {
  slug: "../../package",
  business: "Wrong name",
  summary: "The reviews show a phone-first business.",
  observations: [
    { title: "Calls matter", detail: "Calls recur.", evidence: "Two reviews mention calls." },
    { title: "Waits recur", detail: "Waits recur.", evidence: "Two reviews mention waits." },
    { title: "Replies vary", detail: "Replies vary.", evidence: "Some reviews have replies." },
  ],
  questions: ["Who answers?", "How often?", "What happens next?"],
  focus: "How often does the phone process break down?",
}

test("uses only fetched identity and counts in a published read", () => {
  const read = buildTrustedPublishedRead(
    { ...draft, rating: 1, reviewCount: 999 },
    {
      business: {
        name: "Trusted Clinic",
        location: "Guam",
        rating: 4.7,
        ratingCount: 100,
        source: "serpapi",
      },
      reviews: [{ text: "A" }, { text: "B" }],
    },
    "trusted-clinic-guam",
    "2026-08-24"
  )

  assert.equal(read.slug, "trusted-clinic-guam")
  assert.equal(read.business, "Trusted Clinic")
  assert.equal(read.rating, 4.7)
  assert.equal(read.reviewsRead, 2)
  assert.equal(read.totalReviewCount, 100)
  assert.equal("reviewCount" in read, false)
})

test("rejects traversal slugs and prescriptive model output", () => {
  assert.throws(
    () => safePublishedReadPath(path.join("content", "reads"), "../../package"),
    /safe/
  )
  assert.throws(
    () => validateDiagnosticDraft({ ...draft, focus: "You should build a bot." }),
    /prescriptive/
  )
})
