#!/usr/bin/env node

import { createReadStream } from "node:fs"
import { mkdir, rename, writeFile } from "node:fs/promises"
import path from "node:path"
import readline from "node:readline"
import { fileURLToPath, pathToFileURL } from "node:url"
import { cleanText, slugify } from "./model.mjs"

const HERE = path.dirname(fileURLToPath(import.meta.url))

function messageContents(event) {
  const content = event?.message?.content
  return Array.isArray(content) ? content : content ? [content] : []
}

export async function extractApifyDatasets(transcriptFile) {
  const uses = new Map()
  const datasets = []
  const input = createReadStream(transcriptFile, { encoding: "utf8" })
  const lines = readline.createInterface({ input, crlfDelay: Number.POSITIVE_INFINITY })
  let lineNumber = 0

  for await (const line of lines) {
    lineNumber += 1
    if (!line.includes("mcp__Apify__get-dataset-items") && !line.includes("tool_result")) continue

    let event
    try {
      event = JSON.parse(line)
    } catch {
      continue
    }

    for (const block of messageContents(event)) {
      if (block?.type === "tool_use" && block?.name === "mcp__Apify__get-dataset-items") {
        uses.set(block.id, {
          datasetId: cleanText(block.input?.datasetId),
          requestedFields: cleanText(block.input?.fields).split(",").filter(Boolean),
          requestedLimit: Number(block.input?.limit) || null,
          toolUseLine: lineNumber,
        })
      }

      if (block?.type !== "tool_result" || !uses.has(block.tool_use_id)) continue
      const use = uses.get(block.tool_use_id)
      let payload
      try {
        payload = JSON.parse(String(block.content))
      } catch {
        continue
      }
      const items = Array.isArray(payload?.items) ? payload.items : []
      if (!items.length) continue
      datasets.push({
        schemaVersion: 1,
        provider: "apify",
        actor: "compass/google-maps-reviews-scraper",
        datasetId: cleanText(payload.datasetId) || use.datasetId,
        collectedAt: event.timestamp || null,
        recoveredFrom: path.resolve(transcriptFile),
        transcriptLine: lineNumber,
        requestedFields: use.requestedFields,
        requestedLimit: use.requestedLimit,
        itemCount: items.length,
        items: items.map((item) => ({
          title: cleanText(item.title),
          totalScore: Number.isFinite(Number(item.totalScore)) ? Number(item.totalScore) : null,
          reviewsCount: Number.isFinite(Number(item.reviewsCount)) ? Number(item.reviewsCount) : null,
          stars: Number.isFinite(Number(item.stars)) ? Number(item.stars) : null,
          text: cleanText(item.text) || null,
          publishedAtDate: cleanText(item.publishedAtDate) || null,
          responseFromOwnerText: cleanText(item.responseFromOwnerText) || null,
          address: cleanText(item.address) || null,
        })),
      })
    }
  }

  return datasets
}

async function atomicWrite(file, contents) {
  await mkdir(path.dirname(file), { recursive: true })
  const temporary = `${file}.${process.pid}.tmp`
  await writeFile(temporary, contents, "utf8")
  await rename(temporary, file)
}

export async function writeRecoveredDatasets(datasets, outputDirectory) {
  const files = []
  for (const dataset of datasets) {
    const title = dataset.items[0]?.title || dataset.datasetId
    const file = path.join(
      outputDirectory,
      `${slugify(title)}-${dataset.datasetId}.json`
    )
    await atomicWrite(file, `${JSON.stringify(dataset, null, 2)}\n`)
    files.push(file)
  }
  return files
}

function parseArgs(argv) {
  const values = {}
  for (let index = 0; index < argv.length; index += 1) {
    const flag = argv[index]
    if (!["--transcript", "--output"].includes(flag)) throw new Error(`Unknown option: ${flag}`)
    const value = argv[index + 1]
    if (!value || value.startsWith("--")) throw new Error(`${flag} needs a value.`)
    values[flag.slice(2)] = value
    index += 1
  }
  if (!values.transcript || !values.output) {
    throw new Error("Usage: recover-apify-transcript.mjs --transcript <session.jsonl> --output <private-directory>")
  }
  return values
}

async function main() {
  const args = parseArgs(process.argv.slice(2))
  const datasets = await extractApifyDatasets(path.resolve(args.transcript))
  if (!datasets.length) throw new Error("No recoverable Apify dataset-item results were found.")
  const files = await writeRecoveredDatasets(datasets, path.resolve(args.output))
  console.log(`Recovered ${datasets.length} Apify datasets and ${datasets.reduce((sum, dataset) => sum + dataset.itemCount, 0)} review rows.`)
  for (const file of files) console.log(file)
}

if (import.meta.url === pathToFileURL(process.argv[1] || "").href) {
  main().catch((error) => {
    console.error(error.message)
    process.exitCode = 1
  })
}

export const RECOVERY_SCRIPT_DIRECTORY = HERE
