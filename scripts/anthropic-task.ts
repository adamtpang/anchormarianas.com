#!/usr/bin/env tsx
/**
 * Anthropic Task CLI
 *
 * A lightweight wrapper that posts inference tasks to the local
 * /api/anthropic endpoint (or a configurable remote URL) so Cofounder
 * agents can route heavy tasks through the user's own Anthropic API key.
 *
 * Usage:
 *   npx tsx scripts/anthropic-task.ts "Write a React component that..."
 *   npx tsx scripts/anthropic-task.ts --file task.json
 *   npx tsx scripts/anthropic-task.ts --file task.json --base-url https://anchormarianas.com/api/anthropic
 */

import fs from "node:fs"

interface TaskPayload {
  messages: Array<{ role: "user" | "assistant"; content: string }>
  model?: string
  max_tokens?: number
  temperature?: number
  system?: string
  stream?: boolean
}

interface ProxyResponse {
  text: string
  model: string
  usage?: {
    input_tokens: number
    output_tokens: number
  }
}

const BASE_URL =
  process.env.ANTHROPIC_PROXY_BASE_URL || "http://localhost:3000/api/anthropic"

function parseArgs(): { prompt?: string; file?: string; baseUrl: string } {
  const args = process.argv.slice(2)
  let prompt: string | undefined
  let file: string | undefined
  let baseUrl = BASE_URL

  for (let i = 0; i < args.length; i++) {
    const arg = args[i]
    if (arg === "--file" || arg === "-f") {
      file = args[++i]
    } else if (arg === "--base-url" || arg === "-u") {
      baseUrl = args[++i]
    } else if (!arg.startsWith("-")) {
      prompt = arg
    }
  }

  if (!prompt && !file) {
    console.error(
      "Usage: npx tsx scripts/anthropic-task.ts <prompt> [--base-url <url>]\n" +
        "       npx tsx scripts/anthropic-task.ts --file <path.json> [--base-url <url>]\n\n" +
        "Environment: ANTHROPIC_PROXY_BASE_URL overrides the default localhost URL."
    )
    process.exit(1)
  }

  return { prompt, file, baseUrl }
}

function buildPayload(prompt: string): TaskPayload {
  return {
    messages: [{ role: "user", content: prompt }],
    model: "claude-3-5-sonnet-20241022",
    max_tokens: 4096,
    temperature: 0.7,
    stream: false,
  }
}

function loadPayload(filePath: string): TaskPayload {
  const raw = fs.readFileSync(filePath, "utf-8")
  const parsed = JSON.parse(raw) as TaskPayload

  if (!Array.isArray(parsed.messages) || parsed.messages.length === 0) {
    throw new Error("JSON file must contain a messages array with at least one message.")
  }

  return {
    ...parsed,
    stream: false,
  }
}

async function main() {
  const { prompt, file, baseUrl } = parseArgs()

  const payload = file ? loadPayload(file) : buildPayload(prompt!)

  console.error(`→ POST ${baseUrl}`)
  console.error(`  model: ${payload.model ?? "default"}`)
  console.error(`  messages: ${payload.messages.length}`)
  console.error("")

  const res = await fetch(baseUrl, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  })

  if (!res.ok) {
    const body = await res.text()
    console.error(`\nError ${res.status}: ${body}`)
    process.exit(1)
  }

  const data = (await res.json()) as ProxyResponse

  if (data.text) {
    console.log(data.text)
  } else {
    console.error("Unexpected response:", data)
    process.exit(1)
  }

  if (data.usage) {
    console.error(
      `\n[Tokens: ${data.usage.input_tokens} in / ${data.usage.output_tokens} out]`
    )
  }
}

main().catch((err) => {
  console.error("\nTask failed:", err instanceof Error ? err.message : String(err))
  process.exit(1)
})
