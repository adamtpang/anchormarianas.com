import assert from "node:assert/strict"
import { test } from "node:test"
import { NEW_BRAUNFELS_ZIPS } from "../../lib/buy/radius"
import { importTargetsCsv } from "../../lib/buy/csv"
import { countSeed, excludeChains, firmsToCsv, groupPreparers, joinComptroller, type PtinRow } from "./seed-logic"

const row = (extra: Partial<PtinRow>): PtinRow => ({
  firstName: "Pat",
  lastName: "Example",
  dba: "Sample Books LLC (FAKE)",
  city: "New Braunfels",
  zip: "78130-1234",
  phone: "5550100101",
  website: "example.com/sample-books",
  profession: "",
  ...extra,
})

test("groups fake preparers, joins a charter date, and drops a chain", () => {
  const grouped = groupPreparers(
    [
      row({ profession: "CPA" }),
      row({ firstName: "Sam", lastName: "Sample", profession: "EA", phone: "5550100101" }),
      row({ dba: "", firstName: "Casey", lastName: "Fiction", zip: "78155", phone: "5550100102", profession: "" }),
      row({ dba: "H&R Block (FAKE)", firstName: "Alex", lastName: "Nobody", phone: "5550100199" }),
      row({ dba: "Far Away Sample (FAKE)", zip: "99999", phone: "5550100188" }),
    ],
    NEW_BRAUNFELS_ZIPS,
  )
  const sample = grouped.find((firm) => firm.name.includes("Sample Books"))
  assert.equal(sample?.preparerCount, 2)
  assert.equal(sample?.credentials.includes("CPA"), true)
  assert.equal(sample?.credentials.includes("EA"), true)
  assert.equal(sample?.website, "https://example.com/sample-books")
  assert.equal(grouped.some((firm) => firm.zip === "99999"), false)

  const joined = joinComptroller(
    grouped,
    [{
      name: "Sample Books (FAKE)",
      zip: "78130",
      charterDate: "2001-04-02T00:00:00.000",
      sosFile: "0000000000",
      statusCode: "A",
      rightToTransact: "A",
    }],
    "2026-10-31",
  )
  const matched = joined.find((firm) => firm.name.includes("Sample Books"))
  assert.equal(matched?.charterDate, "2001-04-02")
  assert.equal(matched?.yearsInBusiness, 25)
  const { kept, excluded } = excludeChains(joined)
  assert.equal(excluded, 1)
  assert.equal(kept.some((firm) => /block/i.test(firm.name)), false)
  const csv = firmsToCsv(kept, "2026-10-31T00:00:00.000Z")
  const imported = importTargetsCsv(csv, "2026-10-31T00:00:00.000Z")
  assert.equal(imported.errors.length, 0)
  assert.equal(imported.targets.length, kept.length)
  assert.match(imported.targets[0]?.sources.name || "", /irs\.gov/)
  const counts = countSeed(kept)
  assert.equal(counts.outputRows, kept.length)
  assert.equal(counts.withCharterDate, 1)
})
