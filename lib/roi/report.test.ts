import assert from "node:assert/strict"
import { test } from "node:test"

import { renderReport, type ScanRead } from "./report"

const read: ScanRead = {
  business: "Luxury Nails Guam",
  location: "Tamuning, Guam",
  rating: 3.9,
  reviewCount: 135,
  generatedAt: "2026-07-09",
  source: "Google Maps reviews, read on 2026-07-09",
  summary: "A salon with real fans and an owner who already replies.",
  observations: [
    {
      title: "One complaint keeps repeating",
      detail: "Walk-in versus appointment confusion recurs across the reviews.",
      evidence: "Multiple reviews describe being turned away as fully booked.",
    },
  ],
  questions: ["What does a customer see about walk-ins before they drive over?"],
  focus: "Stop the complaint being generated rather than replying to it well.",
}

const answers = {
  hourlyValue: 25,
  reviewsPerMonth: 20,
  minutesPerReply: 6,
  appointmentsPerWeek: 40,
  noShowPercent: 10,
  appointmentValue: 150,
  missedCallsPerWeek: 15,
  callToCustomerPercent: 30,
  customerValue: 400,
  monthlyBudget: 300,
}

test("an unchecked report is stamped as a draft that must not be sent", () => {
  const md = renderReport({ read, answers })
  assert.match(md, /DRAFT\. Not checked by a human yet\. Do not send\./)
})

test("a human-checked report drops the draft stamp", () => {
  const md = renderReport({ read, answers, humanChecked: true })
  assert.doesNotMatch(md, /Do not send/)
})

test("the evidence section quotes the scan, not a paraphrase", () => {
  const md = renderReport({ read, answers, humanChecked: true })
  assert.match(md, /Multiple reviews describe being turned away as fully booked\./)
  assert.match(md, /Google Maps reviews, read on 2026-07-09/)
})

test("figures show their arithmetic so the operator can check it", () => {
  const md = renderReport({ read, answers, humanChecked: true })
  assert.match(md, /40 per week x 52 \/ 12 x 10% = 17\.3 per month/)
  assert.match(md, /17\.3 no-shows x \$150 = \$2595 per month/)
})

test("the report states what a service must beat, never what it will deliver", () => {
  const md = renderReport({ read, answers, humanChecked: true })
  assert.match(md, /What it has to beat/)
  assert.match(md, /has not measured/)
})

test("services above the stated budget are declined in writing", () => {
  const md = renderReport({ read, answers, humanChecked: true })
  assert.match(md, /What we would not sell you/)
  assert.match(md, /AI Reception Pilot[\s\S]*above the budget you told us/)
})

test("a missing scan leaves the section empty rather than inventing findings", () => {
  const md = renderReport({ answers, humanChecked: true })
  assert.match(md, /No review scan has been run/)
  assert.doesNotMatch(md, /Multiple reviews describe/)
})

test("unanswered questions are listed as uncalculated, not filled in", () => {
  const md = renderReport({
    read,
    answers: { hourlyValue: 25, reviewsPerMonth: 20, minutesPerReply: 6 },
    humanChecked: true,
  })
  assert.match(md, /What we could not calculate/)
  assert.match(md, /customerValue/)
})

test("the closing disclaimer refuses to guarantee an outcome", () => {
  const md = renderReport({ read, answers, humanChecked: true })
  assert.match(md, /No outcome is guaranteed/)
})
