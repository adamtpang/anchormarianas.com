import assert from "node:assert/strict"
import { readFileSync } from "node:fs"
import { test } from "node:test"
import { exportTargetsCsv, importTargetsCsv, sampleTargetsCsv } from "./csv"
import { createSampleTargets } from "./sample"

const NOW = "2026-10-31T00:00:00.000Z"

test("parses quotes, escapes, CRLF, a BOM, money, and source URLs", () => {
  const csv = `\uFEFFname,industry,city,website,phone,revenue,profit,years_in_business,owner_name,owner_age,successor,status,notes,source_revenue\r\n"Sample Books, Inc (FAKE)",Texas bookkeeping and tax firms,"Austin, TX",https://example.com/sample-books,(555) 010-0199,"$1,200,000",280000,22,Pat Example,60-65,NO,talking,"He said ""not yet"".",https://example.com/sources/revenue\r\n`
  const result = importTargetsCsv(csv, NOW)
  assert.deepEqual(result.errors, [])
  assert.equal(result.targets.length, 1)
  const row = result.targets[0]
  assert.equal(row?.name, "Sample Books, Inc (FAKE)")
  assert.equal(row?.city, "Austin, TX")
  assert.equal(row?.revenue, 1_200_000)
  assert.equal(row?.profit, 280_000)
  assert.equal(row?.yearsInBusiness, 22)
  assert.equal(row?.successor, "no")
  assert.equal(row?.status, "Talking")
  assert.equal(row?.notes, 'He said "not yet".')
  assert.equal(row?.sources.revenue, "https://example.com/sources/revenue")
  assert.equal(row?.sample, false)
  assert.equal(row?.calls.length, 0)
})

test("blank status and successor get the safe defaults", () => {
  const result = importTargetsCsv("name,status,successor\nSample Blank Co (FAKE),,\n", NOW)
  assert.deepEqual(result.errors, [])
  assert.equal(result.targets[0]?.status, "New")
  assert.equal(result.targets[0]?.successor, "unknown")
})

test("reports empty files, missing columns, and bad cells with line numbers", () => {
  assert.deepEqual(importTargetsCsv("", NOW).errors, [{ line: 1, message: "The file is empty." }])
  assert.equal(importTargetsCsv("industry\nTax\n", NOW).errors[0]?.message, "The first row needs a name column.")

  const bad = importTargetsCsv(
    [
      "name,website,revenue,successor,status,source_phone",
      ",https://example.com,10,yes,New,",
      "Sample Bad Url (FAKE),javascript:alert(1),10,yes,New,",
      "Sample Bad Money (FAKE),https://example.com,abc,yes,New,",
      "Sample Bad Status (FAKE),https://example.com,10,maybe,Owned,",
      "Sample Bad Source (FAKE),https://example.com,10,yes,New,notaurl",
    ].join("\n"),
    NOW,
  )
  assert.equal(bad.targets.length, 0)
  assert.deepEqual(
    bad.errors.map((error) => error.line),
    [2, 3, 4, 5, 6],
  )
  assert.match(bad.errors[0]?.message ?? "", /Name/)
  assert.match(bad.errors[1]?.message ?? "", /Website/)
  assert.match(bad.errors[2]?.message ?? "", /numbers/)
  assert.match(bad.errors[3]?.message ?? "", /Successor/)
  assert.match(bad.errors[4]?.message ?? "", /source_phone/)
})

test("round-trips export and skips call logs", () => {
  const original = createSampleTargets("2026-10-31")
  const exported = exportTargetsCsv(original)
  const imported = importTargetsCsv(exported, NOW)
  assert.deepEqual(imported.errors, [])
  assert.equal(imported.targets.length, original.length)
  imported.targets.forEach((target, index) => {
    const source = original[index]
    assert.equal(target.name, source?.name)
    assert.equal(target.revenue, source?.revenue)
    assert.equal(target.notes, source?.notes)
    assert.equal(target.calls.length, 0)
    assert.equal(target.sample, false)
  })
  assert.match(exported, /Fictional sample row, not a real business/)
})

test("the committed sample file matches the generator and is obviously fake", () => {
  const file = readFileSync(new URL("../../content/buy/sample-targets.csv", import.meta.url), "utf8")
  assert.equal(file, sampleTargetsCsv())
  const imported = importTargetsCsv(file, NOW)
  assert.deepEqual(imported.errors, [])
  assert.ok(imported.targets.length >= 4)
  for (const target of imported.targets) {
    assert.match(target.name, /\(FAKE\)/)
    assert.match(target.phone, /555/)
    assert.match(target.website, /^https:\/\/example\.com\//)
  }
})
