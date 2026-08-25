import assert from "node:assert/strict"
import { mkdtemp, mkdir, readFile, writeFile } from "node:fs/promises"
import os from "node:os"
import path from "node:path"
import test from "node:test"
import { buildDataFoundation } from "./build.mjs"
import {
  businessBaseId,
  businessMatchKeys,
  normalizedBusinessName,
  verticalForCategory,
} from "./model.mjs"
import { extractApifyDatasets } from "./recover-apify-transcript.mjs"

function transcriptEvents() {
  const toolUseId = "toolu_fixture"
  return [
    {
      type: "assistant",
      timestamp: "2026-07-09T04:44:00.000Z",
      message: {
        role: "assistant",
        content: [{
          type: "tool_use",
          id: toolUseId,
          name: "mcp__Apify__get-dataset-items",
          input: {
            datasetId: "dataset_fixture",
            fields: "title,totalScore,reviewsCount,stars,text,publishedAtDate,responseFromOwnerText,address",
            limit: 10,
          },
        }],
      },
    },
    {
      type: "user",
      timestamp: "2026-07-09T04:44:02.000Z",
      message: {
        role: "user",
        content: [{
          type: "tool_result",
          tool_use_id: toolUseId,
          content: JSON.stringify({
            datasetId: "dataset_fixture",
            items: [{
              title: "Fixture Dental Guam",
              totalScore: 4.8,
              reviewsCount: 25,
              stars: 2,
              text: "Calls went unanswered twice.",
              publishedAtDate: "2026-07-01T00:00:00.000Z",
              responseFromOwnerText: null,
              address: "Tamuning, Guam",
            }],
          }),
        }],
      },
    },
  ]
}

test("normalizes identity and assigns stable verticals", () => {
  assert.equal(normalizedBusinessName("Fixture Dental Guam, LLC"), "fixture dental guam")
  assert.equal(businessBaseId("Fixture Dental Guam, LLC"), "guam:fixture-dental-guam")
  assert.equal(normalizedBusinessName("嵯峨野"), "嵯峨野")
  assert.match(businessBaseId("嵯峨野"), /^guam:business-[a-f0-9]{12}$/)
  assert.deepEqual(businessMatchKeys("Fixture Dental Guam"), ["fixture dental guam", "fixture dental"])
  assert.equal(verticalForCategory("orthodontist"), "Dental")
  assert.equal(verticalForCategory("HVAC contractor"), "Trades & Home Services")
  assert.equal(verticalForCategory("Ace of Fades"), "Beauty & Salons")
  assert.equal(verticalForCategory("Nail Luxe mani & pedi bar"), "Beauty & Salons")
  assert.equal(verticalForCategory("Code 1 Law Enforcement Store"), "Retail")
  assert.equal(verticalForCategory("Public Defender Service Corporation"), "Other")
})

test("recovers Apify review rows from a Claude transcript", async () => {
  const directory = await mkdtemp(path.join(os.tmpdir(), "anchor-transcript-"))
  const transcript = path.join(directory, "session.jsonl")
  await writeFile(transcript, `${transcriptEvents().map((event) => JSON.stringify(event)).join("\n")}\n`)
  const datasets = await extractApifyDatasets(transcript)
  assert.equal(datasets.length, 1)
  assert.equal(datasets[0].datasetId, "dataset_fixture")
  assert.equal(datasets[0].items.length, 1)
  assert.equal(datasets[0].items[0].text, "Calls went unanswered twice.")
  assert.equal(datasets[0].transcriptLine, 2)
})

test("builds separate canonical business, review, and diagnostic grains", async () => {
  const directory = await mkdtemp(path.join(os.tmpdir(), "anchor-foundation-"))
  const leads = path.join(directory, "leads.json")
  const transcript = path.join(directory, "session.jsonl")
  const reads = path.join(directory, "reads")
  const output = path.join(directory, "private-output")
  await mkdir(reads)
  await writeFile(leads, JSON.stringify([{
    name: "Fixture Dental",
    category: "dentist",
    village: "Tamuning",
    phone: "(671) 555-0100",
    website: "",
    budget: "High",
    authority: "Owner",
    need: "High",
    timeline: "TBD",
    sources: "guamphonebook.com",
    priority: 100,
    tier: "HOT",
  }]))
  await writeFile(transcript, `${transcriptEvents().map((event) => JSON.stringify(event)).join("\n")}\n`)
  await writeFile(path.join(reads, "fixture-dental-guam.json"), JSON.stringify({
    slug: "fixture-dental-guam",
    business: "Fixture Dental",
    rating: 4.8,
    reviewCount: 25,
    source: "Google Maps reviews, read on 2026-07-09",
    summary: "A derived diagnostic.",
    observations: [{ title: "Calls", detail: "A review mentions an unanswered call." }],
    questions: ["How often are calls missed?"],
  }))

  const result = await buildDataFoundation({ leads, transcript, reads, output }, new Date("2026-08-25T00:00:00.000Z"))
  assert.equal(result.businesses.length, 1)
  assert.equal(result.reviews.length, 1)
  assert.equal(result.diagnostics.length, 1)
  assert.equal(result.reviews[0].evidenceClass, "customer_review")
  assert.equal(result.reviews[0].source.reviewPlatform, "google-maps")
  assert.equal(result.reviews[0].source.retrievalProvider, "apify")
  assert.equal(result.diagnostics[0].evidenceClass, "derived_diagnostic")
  assert.equal(result.businesses[0].legacySignals.evidenceClass, "heuristic")
  assert.equal(result.businesses[0].listing.rating, 4.8)
  assert.equal(result.businesses[0].classification.basis, "source-category")

  const manifest = JSON.parse(await readFile(path.join(output, "manifest.json"), "utf8"))
  assert.equal(manifest.outputs.businesses, 1)
  assert.equal(manifest.outputs.leadBusinesses, 1)
  assert.equal(manifest.outputs.reviews, 1)
  const leadReport = await readFile(path.join(output, "reports", "legacy-leads-by-vertical.md"), "utf8")
  assert.match(leadReport, /1 source leads by vertical/i)
  const quality = await readFile(path.join(output, "reports", "data-quality.md"), "utf8")
  assert.match(quality, /fresh review evidence is absent/i)
})
