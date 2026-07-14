import Anthropic from "@anthropic-ai/sdk"
import type { MessageParam } from "@anthropic-ai/sdk/resources/messages.mjs"
import { NextRequest } from "next/server"

export const runtime = "edge"

const DEFAULT_MODEL = "claude-3-5-sonnet-20241022"
const DEFAULT_MAX_TOKENS = 4096
const DEFAULT_TEMPERATURE = 0.7

export interface AnthropicProxyRequest {
  messages: MessageParam[]
  model?: string
  max_tokens?: number
  temperature?: number
  system?: string
  stream?: boolean
}

export interface AnthropicProxyResponse {
  text: string
  model: string
  usage?: {
    input_tokens: number
    output_tokens: number
  }
}

function validateBody(body: unknown): AnthropicProxyRequest {
  if (!body || typeof body !== "object") {
    throw new Error("Request body must be a JSON object.")
  }

  const b = body as Record<string, unknown>

  if (!Array.isArray(b.messages) || b.messages.length === 0) {
    throw new Error("messages is required and must be a non-empty array.")
  }

  for (const msg of b.messages) {
    if (!msg || typeof msg !== "object" || !("role" in msg) || !("content" in msg)) {
      throw new Error("Each message must have a role and content.")
    }
  }

  return {
    messages: b.messages as MessageParam[],
    model: typeof b.model === "string" ? b.model : DEFAULT_MODEL,
    max_tokens: typeof b.max_tokens === "number" ? b.max_tokens : DEFAULT_MAX_TOKENS,
    temperature: typeof b.temperature === "number" ? b.temperature : DEFAULT_TEMPERATURE,
    system: typeof b.system === "string" ? b.system : undefined,
    stream: typeof b.stream === "boolean" ? b.stream : false,
  }
}

function getApiKey(): string {
  const key = process.env.ANTHROPIC_API_KEY
  if (!key) {
    throw new Error("ANTHROPIC_API_KEY is not configured.")
  }
  return key
}

async function handleStreaming(
  req: AnthropicProxyRequest
): Promise<Response> {
  const apiKey = getApiKey()
  const client = new Anthropic({ apiKey })

  const stream = await client.messages.create({
    model: req.model ?? DEFAULT_MODEL,
    max_tokens: req.max_tokens ?? DEFAULT_MAX_TOKENS,
    temperature: req.temperature ?? DEFAULT_TEMPERATURE,
    system: req.system,
    messages: req.messages,
    stream: true,
  })

  const encoder = new TextEncoder()

  const readable = new ReadableStream({
    async start(controller) {
      try {
        for await (const event of stream) {
          if (event.type === "content_block_delta" && event.delta.type === "text_delta") {
            const chunk = event.delta.text
            const data = JSON.stringify({ chunk })
            controller.enqueue(encoder.encode(`data: ${data}\n\n`))
          }
        }
        controller.enqueue(encoder.encode("data: [DONE]\n\n"))
        controller.close()
      } catch (err) {
        const error = err instanceof Error ? err.message : String(err)
        const data = JSON.stringify({ error })
        controller.enqueue(encoder.encode(`data: ${data}\n\n`))
        controller.close()
      }
    },
  })

  return new Response(readable, {
    headers: {
      "Content-Type": "text/event-stream",
      "Cache-Control": "no-cache",
      "Connection": "keep-alive",
    },
  })
}

async function handleNonStreaming(
  req: AnthropicProxyRequest
): Promise<Response> {
  const apiKey = getApiKey()
  const client = new Anthropic({ apiKey })

  const message = await client.messages.create({
    model: req.model ?? DEFAULT_MODEL,
    max_tokens: req.max_tokens ?? DEFAULT_MAX_TOKENS,
    temperature: req.temperature ?? DEFAULT_TEMPERATURE,
    system: req.system,
    messages: req.messages,
  })

  const text =
    message.content[0]?.type === "text" ? message.content[0].text : ""

  const response: AnthropicProxyResponse = {
    text,
    model: message.model,
    usage: {
      input_tokens: message.usage.input_tokens,
      output_tokens: message.usage.output_tokens,
    },
  }

  return Response.json(response)
}

export async function POST(req: NextRequest): Promise<Response> {
  try {
    const body = await req.json()
    const validated = validateBody(body)

    if (validated.stream) {
      return await handleStreaming(validated)
    }

    return await handleNonStreaming(validated)
  } catch (err) {
    const message = err instanceof Error ? err.message : "Proxy request failed."
    console.error("Anthropic proxy error:", err)
    return Response.json({ error: message }, { status: 500 })
  }
}

export async function GET(): Promise<Response> {
  return Response.json({
    status: "Anthropic proxy is running.",
    endpoint: "POST /api/anthropic",
    defaultModel: DEFAULT_MODEL,
    streaming: "Supported. Set stream: true in the request body.",
    docs: "https://docs.anthropic.com/en/api/messages",
  })
}
