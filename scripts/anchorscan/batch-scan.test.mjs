import assert from "node:assert/strict"
import fs from "node:fs/promises"
import os from "node:os"
import path from "node:path"
import test from "node:test"
import { assertBatchOutcome, main, parseArgs } from "./batch-scan.mjs"

async function fixture(t, leads) {
  const root = await fs.mkdtemp(path.join(os.tmpdir(), "anchorscan-batch-"))
  const leadsFile = path.join(root, "leads.json")
  const readsDir = path.join(root, "reads")
  const rawDir = path.join(root, "raw")
  await fs.writeFile(leadsFile, JSON.stringify(leads))
  await fs.mkdir(readsDir)
  t.after(() => fs.rm(root, { recursive: true, force: true }))
  return { leadsFile, readsDir, rawDir, log: () => {} }
}

test("uses safe defaults and accepts explicit filters", () => {
  assert.deepEqual(parseArgs([]), {
    limit: 10,
    source: "serpapi",
    tier: null,
    category: null,
    dryRun: false,
    minReviews: 5,
    leads: null,
  })
  assert.deepEqual(
    parseArgs([
      "--limit",
      "25",
      "--source",
      "google",
      "--tier",
      "HOT",
      "--category",
      "dentist",
      "--min-reviews",
      "0",
      "--leads",
      "private.json",
      "--dry-run",
    ]),
    {
      limit: 25,
      source: "google",
      tier: "HOT",
      category: "dentist",
      dryRun: true,
      minReviews: 0,
      leads: "private.json",
    }
  )
})

test("rejects quota-dangerous numeric arguments and unknown options", () => {
  for (const args of [
    ["--limit", "-1"],
    ["--limit", "0"],
    ["--limit", "126"],
    ["--limit", "nope"],
    ["--limit"],
    ["--min-reviews", "-1"],
    ["--source"],
    ["--leads"],
    ["--unknown"],
  ]) {
    assert.throws(() => parseArgs(args))
  }
})

test("rejects sources the batch runner cannot execute", () => {
  assert.throws(() => parseArgs(["--source", "manual"]))
  assert.throws(() => parseArgs(["--source", "typo"]))
})

test("fails batches with no publishable evidence and accepts real success", () => {
  assert.throws(() =>
    assertBatchOutcome(
      [{ name: "A" }],
      [],
      [{ name: "A", kind: "error", reason: "network" }]
    )
  )
  assert.doesNotThrow(() =>
    assertBatchOutcome([{ name: "A" }], [{ name: "A" }], [])
  )
  assert.throws(() =>
    assertBatchOutcome(
      [{ name: "A" }],
      [],
      [{ name: "A", kind: "thin", reason: "only 2 reviews" }]
    )
  )
})

test("dry-run filters leads without fetching or writing", async (t) => {
  const files = await fixture(t, [
    { name: "Hot Dental", tier: "HOT", category: "dentist", village: "Tamuning" },
    { name: "Cold Salon", tier: "COLD", category: "salon", village: "Hagatna" },
  ])
  let calls = 0
  const result = await main(["--tier", "HOT", "--limit", "2", "--dry-run"], {
    ...files,
    fetchReviewsFn: async () => {
      calls += 1
    },
  })

  assert.equal(result.batch.length, 1)
  assert.equal(calls, 0)
  await assert.rejects(() => fs.access(files.rawDir))
})

test("writes successful raw evidence and reports mixed thin or failed leads", async (t) => {
  const files = await fixture(t, [
    { name: "Strong Dental", tier: "HOT", category: "dentist", village: "Tamuning" },
    { name: "Thin Dental", tier: "HOT", category: "dentist", village: "Hagatna" },
    { name: "Broken Dental", tier: "HOT", category: "dentist", village: "Dededo" },
  ])
  const result = await main(["--limit", "3", "--source", "google"], {
    ...files,
    fetchReviewsFn: async ({ query }) => {
      if (query === "Broken Dental") throw new Error("provider down")
      const count = query === "Thin Dental" ? 2 : 6
      return {
        business: { name: query, rating: query === "Strong Dental" ? 4.1 : 5 },
        reviews: Array.from({ length: count }, (_, index) => ({ text: `Review ${index}` })),
      }
    },
  })

  assert.equal(result.done.length, 1)
  assert.deepEqual(
    result.skipped.map((item) => item.kind).sort(),
    ["error", "thin"]
  )
  const raw = JSON.parse(
    await fs.readFile(path.join(files.rawDir, "strong-dental-guam.json"), "utf8")
  )
  assert.equal(raw.schemaVersion, 1)
  assert.equal(raw.status, "complete")
  assert.ok(Date.parse(raw.fetchedAt))
  assert.equal(raw.reviews.length, 6)
  const thin = JSON.parse(
    await fs.readFile(path.join(files.rawDir, "thin-dental-guam.json"), "utf8")
  )
  assert.equal(thin.status, "thin")
  assert.equal(thin.reviews.length, 2)
})

test("fails when every provider request errors", async (t) => {
  const files = await fixture(t, [
    { name: "A", tier: "HOT", category: "dentist" },
    { name: "B", tier: "HOT", category: "dentist" },
  ])

  await assert.rejects(
    () =>
      main(["--limit", "2", "--source", "google"], {
        ...files,
        fetchReviewsFn: async () => {
          throw new Error("provider down")
        },
      }),
    /No publishable raw reports/
  )
})

test("does not reburn quota for valid raw or published records", async (t) => {
  const files = await fixture(t, [
    { id: "raw", name: "Raw Dental", tier: "HOT", category: "dentist" },
    { id: "published", name: "Published Dental", tier: "HOT", category: "dentist" },
    { id: "invalid", name: "Invalid Dental", tier: "HOT", category: "dentist" },
  ])
  await fs.mkdir(files.rawDir)
  await fs.writeFile(
    path.join(files.rawDir, "raw-dental-guam.json"),
    JSON.stringify({
      schemaVersion: 1,
      status: "complete",
      fetchedAt: new Date().toISOString(),
      lead: { id: "raw" },
      requested: { name: "Raw Dental" },
      business: { name: "Raw Dental" },
      reviews: Array.from({ length: 5 }, () => ({ text: "Review" })),
    })
  )
  await fs.writeFile(
    path.join(files.readsDir, "published-dental-guam.json"),
    JSON.stringify({
      slug: "published-dental-guam",
      business: "Published Dental",
      summary: "Summary",
      observations: [{}, {}, {}],
      questions: ["One", "Two", "Three"],
    })
  )
  await fs.writeFile(
    path.join(files.rawDir, "invalid-dental-guam.json"),
    JSON.stringify({})
  )
  let calls = 0
  const result = await main(["--limit", "2", "--source", "google", "--dry-run"], {
    ...files,
    fetchReviewsFn: async () => {
      calls += 1
    },
  })

  assert.equal(result.batch.length, 1)
  assert.equal(result.batch[0].name, "Invalid Dental")
  assert.equal(calls, 0)
})

test("fails fast on duplicate slugs unless the private lead file disambiguates them", async (t) => {
  const files = await fixture(t, [
    { id: "one", name: "Same Dental", category: "dentist" },
    { id: "two", name: "Same Dental", category: "dentist" },
  ])
  await assert.rejects(
    () => main(["--dry-run"], files),
    /slug collision/
  )
})

test("refuses a concurrent batch lock before making provider calls", async (t) => {
  const files = await fixture(t, [
    { id: "one", name: "Locked Dental", category: "dentist" },
  ])
  await fs.mkdir(files.rawDir)
  await fs.writeFile(path.join(files.rawDir, ".batch.lock"), "other process")
  let calls = 0
  await assert.rejects(
    () =>
      main([], {
        ...files,
        fetchReviewsFn: async () => {
          calls += 1
        },
      }),
    /Another batch owns/
  )
  assert.equal(calls, 0)
})
