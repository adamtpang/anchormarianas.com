import assert from "node:assert/strict"
import { test } from "node:test"

import { type Place, type Review, analyzeReviews, excerpt, excerptAround, nameMatchScore } from "./analyze"

const place: Place = {
  name: "Donut Spot",
  address: "1 Main St, Austin, TX",
  category: "Donut shop",
  rating: 4.2,
  reviewCount: 120,
  url: "https://maps.google.com/?cid=1",
}
const now = new Date("2026-10-29T00:00:00Z")
const r = (stars: number, publishedAt: string, text = "", ownerReply = ""): Review => ({
  stars,
  text,
  publishedAt,
  ownerReply,
})

test("counts low stars, reply rate, and the recent versus earlier trend", () => {
  const report = analyzeReviews(
    place,
    [
      r(5, "2023-03-01T00:00:00Z", "great", "Thanks!"),
      r(5, "2023-06-01T00:00:00Z"),
      r(2, "2026-05-01T00:00:00Z", "Staff was rude"),
      r(1, "2026-08-01T00:00:00Z", "Cold donuts and rude cashier"),
    ],
    now,
  )
  assert.equal(report.analyzed, 4)
  assert.deepEqual(report.lowStar, { count: 2, share: 50 })
  assert.equal(report.replyRate, 25)
  assert.equal(report.trend.earlierAvg, null, "two reviews is too few to average")
  assert.equal(report.trend.recentAvg, null)
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

test("owner replies that say they recently took over lead the ownership signals", () => {
  const report = analyzeReviews(
    place,
    [
      r(5, "2025-02-01T00:00:00Z", "Love it", "We just recently took over and plan to keep the recipes."),
      r(3, "2024-12-25T00:00:00Z", "Few choices", "We're the new owners, and since taking over we added more."),
      r(5, "2026-01-01T00:00:00Z", "Great", "Thank you!"),
    ],
    now,
  )
  assert.deepEqual(
    report.ownershipSignals.map((s) => [s.date, s.source]),
    [
      ["2025-02", "owner reply"],
      ["2024-12", "owner reply"],
    ],
  )
  assert.match(report.questions[0], /change of owner/)
})

test("three 1 or 2-star reviews inside two days are flagged as a burst", () => {
  const report = analyzeReviews(
    place,
    [
      r(1, "2025-12-11T22:27:00Z"),
      r(1, "2025-12-11T23:37:00Z"),
      r(1, "2025-12-12T00:16:00Z"),
      r(1, "2025-12-20T00:00:00Z"),
      r(2, "2023-01-01T00:00:00Z"),
    ],
    now,
  )
  assert.deepEqual(report.bursts, [{ date: "2025-12-11", count: 3 }])
  assert.ok(report.questions.some((q) => q.includes("within two days around 2025-12-11")))
})

test("excerptAround keeps the matched phrase in view", () => {
  const text = `${"Thanks for the kind words. ".repeat(10)}We recently took over the shop and kept the recipes.`
  const cut = excerptAround(text, /took over/)
  assert.ok(cut.includes("took over"))
  assert.ok(cut.startsWith("..."))
})

test("staff departures and moved bookings are their own themes", () => {
  const report = analyzeReviews(
    place,
    [
      r(2, "2026-10-01T00:00:00Z", "Kayla was the best and now that she is gone I won't come back. I forgot to cancel my membership."),
      r(1, "2026-09-01T00:00:00Z", "They wanted to push my appointment 30 minutes while I sat in the lobby."),
      r(1, "2026-05-01T00:00:00Z", "Tried to call, no one picked up."),
      r(1, "2025-03-01T00:00:00Z", "I was overcharged and asked for a refund."),
    ],
    now,
  )
  const keys = report.themes.map((t) => t.key)
  assert.ok(keys.includes("staff"))
  assert.ok(keys.includes("booking"))
  assert.ok(keys.includes("contact"))
  assert.ok(keys.includes("billing"))
  assert.ok(!keys.includes("orders"), "forgetting to cancel a membership is not a wrong order")
})

test("averages under five reviews are not shown", () => {
  const report = analyzeReviews(place, [r(5, "2026-09-01T00:00:00Z"), r(1, "2018-01-01T00:00:00Z")], now)
  assert.equal(report.trend.recentAvg, null)
  assert.equal(report.trend.earlierAvg, null)
})

test("a branch name produces a check-the-address note", () => {
  const chain = analyzeReviews({ ...place, name: "Sugaring NYC Organic Waxing - Cedar Park" }, [], now)
  assert.match(chain.branchNote ?? "", /one location of a business with more than one/)
  assert.equal(analyzeReviews(place, [], now).branchNote, null)
})

test("trend compares the last 18 months with earlier once each has five reviews", () => {
  const earlier = [1, 2, 3, 4, 5].map((d) => r(5, `2023-0${d}-01T00:00:00Z`))
  const recent = [1, 2, 3, 4, 5].map((d) => r(d % 2 ? 4 : 3, `2026-0${d}-01T00:00:00Z`))
  const report = analyzeReviews(place, [...earlier, ...recent], now)
  assert.equal(report.trend.earlierAvg, 5)
  assert.equal(report.trend.recentAvg, 3.6)
})

test("a staff no-show is a booking problem, not a wrong order", () => {
  const report = analyzeReviews(
    place,
    [r(1, "2026-08-01T00:00:00Z", "Locked building, no one showed up and no one could contact me about missing my appointment.")],
    now,
  )
  const keys = report.themes.map((t) => t.key)
  assert.ok(keys.includes("booking"))
  assert.ok(!keys.includes("orders"))
})
