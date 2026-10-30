import assert from "node:assert/strict"
import { test } from "node:test"

import { type Place, type Review, analyzeReviews, excerpt, nameMatchScore } from "./analyze"

const place: Place = {
  name: "Donut Spot",
  address: "1 Main St, Austin, TX",
  category: "Donut shop",
  rating: 4.2,
  reviewCount: 120,
  url: "https://maps.google.com/?cid=1",
}
const now = new Date("2026-10-29T00:00:00Z")
const r = (stars: number, publishedAt: string, text = "", ownerReply = false): Review => ({
  stars,
  text,
  publishedAt,
  ownerReply,
})

test("counts low stars, reply rate, and the recent versus earlier trend", () => {
  const report = analyzeReviews(
    place,
    [
      r(5, "2023-03-01T00:00:00Z", "great", true),
      r(5, "2023-06-01T00:00:00Z"),
      r(2, "2026-05-01T00:00:00Z", "Staff was rude"),
      r(1, "2026-08-01T00:00:00Z", "Cold donuts and rude cashier"),
    ],
    now,
  )
  assert.equal(report.analyzed, 4)
  assert.deepEqual(report.lowStar, { count: 2, share: 50 })
  assert.equal(report.replyRate, 25)
  assert.equal(report.trend.earlierAvg, 5)
  assert.equal(report.trend.recentAvg, 1.5)
  assert.deepEqual(
    report.years.map((y) => [y.year, y.reviews, y.avgStars, y.lowShare]),
    [
      ["2023", 2, 5, 0],
      ["2026", 2, 1.5, 100],
    ],
  )
})

test("themes come only from 3-star-or-lower reviews, newest example first", () => {
  const report = analyzeReviews(
    place,
    [
      r(5, "2026-01-01T00:00:00Z", "Not rude at all, lovely"),
      r(2, "2026-02-01T00:00:00Z", "Rude staff"),
      r(1, "2026-09-01T00:00:00Z", "So rude"),
    ],
    now,
  )
  const service = report.themes.find((t) => t.key === "service")
  assert.ok(service)
  assert.equal(service.count, 2)
  assert.equal(service.examples[0].date, "2026-09")
  assert.ok(report.questions.some((q) => q.includes("monthly sales")))
})

test("flags ownership-change mentions and asks about them first", () => {
  const report = analyzeReviews(place, [r(3, "2026-04-01T00:00:00Z", "Under new management and it shows")], now)
  assert.equal(report.ownershipSignals.length, 1)
  assert.match(report.questions[0], /change of owner/)
})

test("warns when the listing has too few reviews to read a pattern", () => {
  const report = analyzeReviews({ ...place, reviewCount: 12 }, [], now)
  assert.ok(report.limits.some((l) => l.includes("Under 30 reviews")))
  assert.equal(report.trend.recentAvg, null)
})

test("excerpt trims on a word boundary and strips line breaks", () => {
  assert.equal(excerpt("a<br>b"), "a b")
  const long = "word ".repeat(80)
  const cut = excerpt(long, 100)
  assert.ok(cut.length <= 103)
  assert.ok(cut.endsWith("..."))
})

test("nameMatchScore ignores filler words and punctuation", () => {
  assert.equal(nameMatchScore("The Donut Spot LLC", "Donut Spot"), 1)
  assert.equal(nameMatchScore("Lucky Lime", "Walmart Supercenter"), 0)
  assert.equal(nameMatchScore("Joe's Pizza & Wings", "Joe's Pizza"), 2 / 3)
})
