import assert from "node:assert/strict"
import { test } from "node:test"
import { callQueue, suggestedStatus } from "./queue"
import { createSampleTargets } from "./sample"

const today = "2026-10-31"
const targets = createSampleTargets(today)

test("orders the roll-call and keeps a due-today view", () => {
  const due = callQueue(targets, today, true).map((target) => target.name)
  assert.deepEqual(due, [
    "Sample Bookkeeping Co (FAKE)",
    "Sample Tax Desk (FAKE)",
    "Sample Insurance Agency (FAKE)",
  ])
  const open = callQueue(targets, today, false).map((target) => target.name)
  assert.deepEqual(open, [
    "Sample Bookkeeping Co (FAKE)",
    "Sample Tax Desk (FAKE)",
    "Sample Insurance Agency (FAKE)",
    "Sample Distributor Co (FAKE)",
  ])
  assert.equal(open.includes("Sample Payroll Shop (FAKE)"), false)
})

test("suggests a pipeline stage from the call outcome", () => {
  assert.equal(suggestedStatus("New", "no answer"), "Contacted")
  assert.equal(suggestedStatus("New", "voicemail"), "Contacted")
  assert.equal(suggestedStatus("Contacted", "talked"), "Talking")
  assert.equal(suggestedStatus("Talking", "interested"), "Interested")
  assert.equal(suggestedStatus("Interested", "not selling"), "Passed")
  assert.equal(suggestedStatus("NDA", "talked"), "NDA")
  assert.equal(suggestedStatus("LOI", "follow up"), "LOI")
})
