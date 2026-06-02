import Anthropic from "@anthropic-ai/sdk"
import { NextRequest, NextResponse } from "next/server"

const client = new Anthropic({ apiKey: process.env.ANTHROPIC_API_KEY })

// Rate-limit: simple in-memory store (resets on cold starts, good enough for MVP)
const scanCache = new Map<string, { ts: number; result: unknown }>()
const CACHE_TTL = 1000 * 60 * 60 * 24 // 24 hours

function cacheKey(url: string) {
  try {
    const u = new URL(url)
    return u.hostname.replace(/^www\./, "")
  } catch {
    return url
  }
}

async function fetchSiteContent(url: string): Promise<string> {
  try {
    const controller = new AbortController()
    const timeout = setTimeout(() => controller.abort(), 8000)

    const res = await fetch(url, {
      signal: controller.signal,
      headers: {
        "User-Agent":
          "AnchorScan/1.0 (+https://anchormarianas.com/scan) AI diagnostic bot",
        Accept: "text/html,application/xhtml+xml",
      },
    })
    clearTimeout(timeout)

    const html = await res.text()

    // Strip tags, collapse whitespace, keep readable text
    const text = html
      .replace(/<script[^>]*>[\s\S]*?<\/script>/gi, "")
      .replace(/<style[^>]*>[\s\S]*?<\/style>/gi, "")
      .replace(/<[^>]+>/g, " ")
      .replace(/&nbsp;/g, " ")
      .replace(/&amp;/g, "&")
      .replace(/&lt;/g, "<")
      .replace(/&gt;/g, ">")
      .replace(/&quot;/g, '"')
      .replace(/&#39;/g, "'")
      .replace(/\s{2,}/g, " ")
      .trim()
      .slice(0, 6000) // Keep first 6K chars to stay within context budget

    return text
  } catch {
    return "" // Don't fail if fetch is blocked; AI will work from URL alone
  }
}

// AnchorScan is DIAGNOSTIC, not prescriptive. It surfaces what it notices about
// how a business operates plus the questions worth answering on a call. It does
// not pitch solutions, invent dollar figures, or tell the owner what to build.
// (Demand-led discovery: diagnose first, choose cures later.)
const systemPrompt = `You are AnchorScan, a diagnostic tool built by Anchor Marianas LLC, a productized AI engineering studio in Guam.

Your job is diagnostic, not prescriptive. You read a business website and surface what you NOTICE about how they operate, plus the QUESTIONS an operator would want answered before suggesting anything. You do not pitch solutions, you do not invent dollar figures, and you do not tell them what to build. The point is to start an honest conversation, not to close a sale. The call is the work.

You think like an operator who has shipped AI into small businesses, so your observations are specific and grounded in evidence from the site, never generic.

Output format. Respond ONLY with valid JSON in this exact shape:
{
  "businessName": "string (inferred business name, 1 to 4 words)",
  "businessSummary": "string (1 to 2 sentences: what they do, who they serve, how they appear to operate, based on the site)",
  "observations": [
    {
      "title": "string (3 to 7 word label for the pattern you noticed)",
      "detail": "string (2 to 3 sentences describing the operational pattern or friction you observed, specific to this business)",
      "evidence": "string (1 sentence naming what on the site led you to this, for example a phone-first contact section, no online booking, a manual quote-request form)"
    }
  ],
  "questions": [
    "string (a specific question the owner should be able to answer, the kind a 15-minute call would dig into. Diagnostic, not leading toward a product.)"
  ],
  "focus": "string (1 to 2 sentences naming the single area most worth a conversation, framed as a hypothesis or question, NOT as a recommendation to build something)"
}

Rules:
- ONLY return JSON, nothing before or after.
- Be specific to this business. Reference their product or service type, customer type, or industry.
- observations: exactly 3 or 4. Each must cite real evidence from the site in the evidence field. If the site is too thin to support a point, say so plainly rather than inventing.
- questions: exactly 3 to 5. They must be genuinely diagnostic (how often, how many, who handles it, what happens when), not rhetorical setups for a pitch.
- NEVER invent or estimate dollar values, ROI, hours saved, or percentages. This tool surfaces patterns and questions only.
- Do NOT recommend specific products or builds, and do NOT mention the AI Reception Pilot. The focus field is a question, not a prescription.
- Voice: direct, plain, operator to operator. No corporate-speak. No em dashes anywhere (use periods, commas, colons, or parentheses). No emoji. No exclamation marks.
- If site content is unavailable, infer cautiously from the domain and URL, and say in businessSummary that the read is limited.`

export async function POST(req: NextRequest) {
  try {
    const body = await req.json()
    const { url, context } = body as { url?: string; context?: string }

    if (!url || typeof url !== "string") {
      return NextResponse.json({ error: "URL is required." }, { status: 400 })
    }

    // Validate URL
    let parsedUrl: URL
    try {
      parsedUrl = new URL(url)
      if (!["http:", "https:"].includes(parsedUrl.protocol)) {
        throw new Error("Invalid protocol")
      }
    } catch {
      return NextResponse.json(
        { error: "Please enter a valid URL (e.g. https://yourbusiness.com)." },
        { status: 400 }
      )
    }

    const key = cacheKey(url)
    const cached = scanCache.get(key)
    if (cached && Date.now() - cached.ts < CACHE_TTL) {
      return NextResponse.json(cached.result)
    }

    if (!process.env.ANTHROPIC_API_KEY) {
      return NextResponse.json(
        { error: "Scan service not configured. Please try again later." },
        { status: 503 }
      )
    }

    // Fetch site content
    const siteContent = await fetchSiteContent(parsedUrl.href)

    const userMessage = [
      `Business URL: ${parsedUrl.href}`,
      context ? `Additional context: ${context}` : "",
      siteContent
        ? `\nSite content (extracted text):\n${siteContent}`
        : "\n(Site content unavailable. Analyze from URL and domain only, and note the read is limited.)",
    ]
      .filter(Boolean)
      .join("\n")

    const message = await client.messages.create({
      model: "claude-opus-4-5",
      max_tokens: 1400,
      system: systemPrompt,
      messages: [{ role: "user", content: userMessage }],
    })

    const rawText =
      message.content[0].type === "text" ? message.content[0].text.trim() : ""

    let result
    try {
      // Handle potential markdown code fences
      const jsonStr = rawText.replace(/^```json\s*/i, "").replace(/```\s*$/, "")
      result = JSON.parse(jsonStr)
    } catch {
      console.error("JSON parse failed:", rawText.slice(0, 200))
      return NextResponse.json(
        { error: "Scan produced an unexpected result. Please try again." },
        { status: 500 }
      )
    }

    // Basic validation (diagnostic shape)
    if (
      !result.businessName ||
      !Array.isArray(result.observations) ||
      result.observations.length === 0
    ) {
      return NextResponse.json(
        { error: "Scan produced an incomplete result. Please try again." },
        { status: 500 }
      )
    }
    if (!Array.isArray(result.questions)) {
      result.questions = []
    }

    // Cache it
    scanCache.set(key, { ts: Date.now(), result })

    return NextResponse.json(result)
  } catch (err) {
    console.error("Scan error:", err)
    return NextResponse.json(
      { error: "Scan failed. Please try again in a moment." },
      { status: 500 }
    )
  }
}
