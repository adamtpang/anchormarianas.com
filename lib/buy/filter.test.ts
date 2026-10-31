import assert from "node:assert/strict"
import { test } from "node:test"
import { parseAgeRange } from "./age"
import { applyFilters, DEFAULT_FILTERS } from "./filter"
import { createSampleTargets } from "./sample"

const today = "2026-10-31"
const targets = createSampleTargets(today)

function names(filters: Partial<typeof DEFAULT_FILTERS>) {
  return applyFilters(targets, { ...DEFAULT_FILTERS, ...filters }).targets.map((target) => target.name)
}

test("filters industry, location, successor, status, years, and name", () => {
  assert.deepEqual(names({ industry: "Commercial insurance agencies" }), ["Sample Insurance Agency (FAKE)"])
  assert.deepEqual(names({ location: "dallas" }), ["Sample Tax Desk (FAKE)"])
  assert.deepEqual(names({ successor: "yes" }), ["Sample Insurance Agency (FAKE)"])
  assert.deepEqual(names({ successor: "no" }), ["Sample Bookkeeping Co (FAKE)", "Sample Distributor Co (FAKE)"])
  assert.deepEqual(names({ status: "Passed" }), ["Sample Payroll Shop (FAKE)"])
  assert.deepEqual(names({ yearsMin: "20" }), ["Sample Bookkeeping Co (FAKE)", "Sample Insurance Agency (FAKE)"])
  assert.deepEqual(names({ yearsMax: "10" }), ["Sample Payroll Shop (FAKE)"])
  assert.deepEqual(names({ query: "pat" }), ["Sample Bookkeeping Co (FAKE)"])
  assert.deepEqual(names({ query: "PLACEHOLDER" }), ["Sample Distributor Co (FAKE)"])
  assert.deepEqual(names({ industry: "Texas bookkeeping and tax firms", location: "Austin" }), [
    "Sample Bookkeeping Co (FAKE)",
  ])
})

test("filters revenue, profit, and owner age, including ranges", () => {
  assert.deepEqual(names({ revenueMin: "1000000", revenueMax: "3000000" }), [
    "Sample Bookkeeping Co (FAKE)",
    "Sample Insurance Agency (FAKE)",
  ])
  assert.deepEqual(names({ profitMin: "400000" }), ["Sample Distributor Co (FAKE)", "Sample Insurance Agency (FAKE)"])
  assert.deepEqual(names({ ageMin: "60", ageMax: "70" }), [
    "Sample Bookkeeping Co (FAKE)",
    "Sample Payroll Shop (FAKE)",
    "Sample Tax Desk (FAKE)",
  ])
  assert.deepEqual(names({ ageMin: "71" }), ["Sample Insurance Agency (FAKE)"])
  assert.deepEqual(parseAgeRange("60+"), { min: 60, max: 120 })
  assert.deepEqual(parseAgeRange("60 - 65"), { min: 60, max: 65 })
  assert.equal(parseAgeRange("about sixty"), null)
})

test("sorts by revenue, age, and status, and rejects a bad number", () => {
  assert.deepEqual(names({ sort: "revenue-desc" }), [
    "Sample Distributor Co (FAKE)",
    "Sample Insurance Agency (FAKE)",
    "Sample Bookkeeping Co (FAKE)",
    "Sample Tax Desk (FAKE)",
    "Sample Payroll Shop (FAKE)",
  ])
  assert.deepEqual(names({ sort: "age-desc" }), [
    "Sample Insurance Agency (FAKE)",
    "Sample Bookkeeping Co (FAKE)",
    "Sample Tax Desk (FAKE)",
    "Sample Payroll Shop (FAKE)",
    "Sample Distributor Co (FAKE)",
  ])
  assert.equal(names({ sort: "status" })[0], "Sample Insurance Agency (FAKE)")
  const invalid = applyFilters(targets, { ...DEFAULT_FILTERS, revenueMin: "abc" })
  assert.deepEqual(invalid.targets, [])
  assert.match(invalid.problems.join(" "), /Revenue/)
})

test("sample rows stay labeled as fiction", () => {
  for (const target of targets) {
    assert.equal(target.sample, true)
    assert.match(target.name, /\(FAKE\)/)
    assert.match(target.phone, /555/)
    assert.match(target.website, /example\.com/)
  }
})
