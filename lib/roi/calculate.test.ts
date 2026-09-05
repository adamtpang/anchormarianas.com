import assert from "node:assert/strict"
import { test } from "node:test"

import {
  appointmentReminders,
  buildRoiReport,
  receptionPilot,
  reviewResponder,
} from "./calculate"
import { validateAnswers } from "./survey"

const full = {
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

test("review responder computes time and cost from the operator's own numbers", () => {
  const f = reviewResponder(full)
  const hours = f.costOfProblem.find((x) => x.unit === "hours-per-month")
  const cost = f.costOfProblem.find((x) => x.unit === "usd-per-month")
  // 20 reviews x 6 min = 120 min = 2 hours
  assert.equal(hours?.value, 2)
  // 2 hours x $25 = $50
  assert.equal(cost?.value, 50)
  assert.deepEqual(cost?.derivedFrom, [
    "reviewsPerMonth",
    "minutesPerReply",
    "hourlyValue",
  ])
})

test("a business that does not reply gets no invented time saving", () => {
  const f = reviewResponder({ ...full, minutesPerReply: 0 })
  const hours = f.costOfProblem.find((x) => x.unit === "hours-per-month")
  assert.equal(hours?.value, 0)
  assert.match(String(hours?.note), /has not measured/)
  // and no dollar figure is fabricated to fill the gap
  assert.equal(
    f.costOfProblem.find((x) => x.unit === "usd-per-month"),
    undefined
  )
})

test("no reviews at all means the service is marked not applicable", () => {
  const f = reviewResponder({ ...full, reviewsPerMonth: 0 })
  assert.equal(f.notApplicable, true)
  assert.match(String(f.notApplicableReason), /nothing to reply to/)
})

test("appointment reminders quantifies the leak and states break-even without a rate", () => {
  const f = appointmentReminders(full)
  const count = f.costOfProblem.find((x) => x.unit === "count-per-month")
  const usd = f.costOfProblem.find((x) => x.unit === "usd-per-month")
  // 40/wk x 52/12 x 10% = 17.3 per month
  assert.equal(count?.value, 17.3)
  assert.equal(usd?.value, 2595)
  // $200 / $150 = 1.33 appointments to break even, no improvement rate assumed
  assert.equal(f.breakEven?.value, 1.33)
  assert.match(String(f.breakEven?.note), /has not measured/)
})

test("zero no-shows means we decline to sell reminders", () => {
  const f = appointmentReminders({ ...full, noShowPercent: 0 })
  assert.equal(f.notApplicable, true)
  assert.match(String(f.notApplicableReason), /would not sell you this/)
})

test("reception pilot separates the one-time setup from ongoing break-even", () => {
  const f = receptionPilot(full)
  // $500 / $400 = 1.25 customers per month
  assert.equal(f.breakEven?.value, 1.25)
  // $5000 / $400 = 12.5 customers, one time
  assert.match(String(f.breakEven?.note), /12\.5 customers/)
})

test("budget gates what gets recommended, it does not get pitched anyway", () => {
  const report = buildRoiReport(full)
  // budget is $300/mo, so the $500/mo pilot is out of budget
  assert.ok(report.outOfBudget.some((f) => f.slug === "ai-reception-pilot"))
  assert.ok(!report.recommended.some((f) => f.slug === "ai-reception-pilot"))
})

test("recommendations are ordered by the largest quantified problem", () => {
  const report = buildRoiReport(full)
  // reminders ($2,595/mo leak) outrank review replies ($50/mo of time)
  assert.equal(report.recommended[0].slug, "ai-appointment-reminders")
})

test("missing answers are reported, never filled in", () => {
  const partial = { hourlyValue: 30, reviewsPerMonth: 10, minutesPerReply: 5 }
  const report = buildRoiReport(partial)
  assert.ok(report.missingInputs.includes("customerValue"))
  assert.ok(report.missingInputs.includes("monthlyBudget"))
  // reception pilot had no inputs, so it computed no dollar figure at all
  const pilot = report.findings.find((f) => f.slug === "ai-reception-pilot")
  assert.equal(pilot?.breakEven, null)
  assert.equal(pilot?.costOfProblem.length, 0)
})

test("every computed figure carries the inputs it came from", () => {
  const report = buildRoiReport(full)
  for (const f of report.findings) {
    for (const fig of f.costOfProblem) {
      assert.ok(fig.derivedFrom.length > 0, `${fig.label} has no provenance`)
      assert.ok(fig.formula.length > 0, `${fig.label} has no formula`)
    }
  }
})

test("validation flags bad answers instead of clamping them", () => {
  const issues = validateAnswers({ ...full, noShowPercent: 250 })
  const bad = issues.find((i) => i.id === "noShowPercent")
  assert.equal(bad?.reason, "out-of-range")
})
