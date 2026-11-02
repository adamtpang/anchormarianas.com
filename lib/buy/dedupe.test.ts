import assert from "node:assert/strict"
import { test } from "node:test"
import { isChainName } from "./chains"
import { dedupeKey, prepareImport } from "./dedupe"
import { importTargetsCsv } from "./csv"
import { createSampleTargets } from "./sample"

test("chains and duplicate name plus phone are skipped, including a 1000 row file", () => {
  assert.equal(isChainName("H&R Block #214 (FAKE)"), true)
  assert.equal(isChainName("Jackson Hewitt Tax Service"), true)
  assert.equal(isChainName("Liberty Tax"), true)
  assert.equal(isChainName("Sample Bookkeeping Co (FAKE)"), false)
  assert.equal(dedupeKey("Sample Books, LLC (FAKE)", "(555) 010-0199"), dedupeKey("sample books (FAKE)", "5550100199"))

  const existing = createSampleTargets("2026-10-31")
  const incoming = importTargetsCsv(
    [
      "name,phone,city",
      "Sample Bookkeeping Co (FAKE),(555) 010-0101,Austin",
      "Liberty Tax (FAKE),(555) 010-0198,Austin",
      "Sample New Desk (FAKE),(555) 010-0197,Kyle",
    ].join("\n"),
    "2026-10-31T00:00:00.000Z",
  )
  assert.equal(incoming.errors.length, 0)
  const prepared = prepareImport(existing, incoming.targets)
  assert.equal(prepared.skippedDuplicates, 1)
  assert.equal(prepared.skippedChains, 1)
  assert.deepEqual(prepared.targets.map((target) => target.name), ["Sample New Desk (FAKE)"])

  const lines = ["name,phone"]
  for (let index = 0; index < 1000; index += 1) {
    lines.push(`Sample Firm ${index} (FAKE),(555) 010-${String(index).padStart(4, "0")}`)
  }
  const bulk = importTargetsCsv(lines.join("\n"), "2026-10-31T00:00:00.000Z")
  assert.equal(bulk.errors.length, 0)
  assert.equal(bulk.targets.length, 1000)
  assert.match(bulk.targets[0]?.name || "", /\(FAKE\)/)
})
