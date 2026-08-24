import assert from "node:assert/strict"
import fs from "node:fs/promises"
import os from "node:os"
import path from "node:path"
import test from "node:test"
import { rawEvidence } from "./raw-evidence.mjs"

async function writeRaw(t, overrides = {}) {
  const dir = await fs.mkdtemp(path.join(os.tmpdir(), "anchorscan-raw-"))
  const file = path.join(dir, "raw.json")
  const value = {
    schemaVersion: 1,
    status: "complete",
    fetchedAt: "2026-08-24T00:00:00.000Z",
    lead: { name: "Trusted Clinic", slug: "trusted-clinic-guam" },
    requested: {
      name: "Trusted Clinic",
      location: "Tamuning, Guam",
      source: "serpapi",
    },
    business: { name: "Trusted Clinic", location: "Tamuning, Guam" },
    reviews: [{ text: "Useful review" }],
    ...overrides,
  }
  await fs.writeFile(file, JSON.stringify(value))
  t.after(() => fs.rm(dir, { recursive: true, force: true }))
  return file
}

test("accepts current schema-matched raw evidence", async (t) => {
  const file = await writeRaw(t)
  const result = await rawEvidence(file, Date.parse("2026-08-24T01:00:00Z"))
  assert.equal(result.fetched.business.name, "Trusted Clinic")
  assert.equal(result.slug, "trusted-clinic-guam")
})

test("rejects stale, unsupported, or wrong-location raw evidence", async (t) => {
  const stale = await writeRaw(t, {
    fetchedAt: "2026-07-01T00:00:00.000Z",
  })
  await assert.rejects(
    () => rawEvidence(stale, Date.parse("2026-08-24T01:00:00Z")),
    /stale/
  )

  const unsupported = await writeRaw(t, { schemaVersion: 99 })
  await assert.rejects(
    () => rawEvidence(unsupported, Date.parse("2026-08-24T01:00:00Z")),
    /unsupported schema/
  )

  const wrongLocation = await writeRaw(t, {
    business: { name: "Trusted Clinic", location: "Honolulu, Hawaii" },
  })
  await assert.rejects(
    () => rawEvidence(wrongLocation, Date.parse("2026-08-24T01:00:00Z")),
    /location/
  )
})
