import assert from "node:assert/strict"
import { test } from "node:test"
import { createSampleTargets } from "./sample"
import { fitScore } from "./fit"

const today = "2026-10-31"

test("fit score v0 explains tenure, size, credential, firm flag, phone, and radius", () => {
  const targets = createSampleTargets(today)
  const bookkeeping = targets.find((target) => target.id === "sample-bookkeeping")
  const tax = targets.find((target) => target.id === "sample-tax-desk")
  const insurance = targets.find((target) => target.id === "sample-insurance")
  assert.ok(bookkeeping && tax && insurance)
  const best = fitScore(bookkeeping, today)
  assert.equal(best.score, 6)
  assert.equal(best.max, 6)
  assert.match(best.reason, /CPA or EA/)
  assert.equal(best.reason.includes("Gaps:"), false)
  const partial = fitScore(tax, today)
  assert.equal(partial.score, 4)
  assert.match(partial.reason, /Gaps:/)
  assert.match(partial.reason, /preparer count/)
  const firm = fitScore(insurance, today)
  assert.match(firm.reason, /licensed CPA firm/)
  assert.equal(firm.reason.includes("\n"), false)
})
