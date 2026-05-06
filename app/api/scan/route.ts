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

const systemPrompt = `You are AnchorScan, an AI diagnostic tool built by Anchor Marianas LLC — a productized AI engineering studio based in Guam. 

Your job: analyze a business website and identify its top 3 most impactful AI workflow opportunities. You are direct, specific, and never generic. You think like an operator who has actually shipped AI into SMBs, not like a consultant pitching a deck.

Output format — respond ONLY with valid JSON matching this exact shape:
{
  "businessName": "string (inferred business name, 1-4 words)",
  "businessSummary": "string (1-2 sentence description of what they do, who they serve, how they operate, based on site content)",
  "opportunities": [
    {
      "title": "string (3-7 word opportunity name)",
      "workflow": "string (2-3 sentence description of exactly what would be built and how it fits this specific business)",
      "impact": "string (1 sentence explaining the source of the dollar impact — e.g. missed calls, staff hours, conversion rate)",
      "annualValue": "string (dollar amount range like '18,000–35,000' or single estimate like '24,000' — no $ sign, just the number string)",
      "category": "reception" | "sales" | "operations" | "marketing" | "support"
    }
  ],
  "topRecommendation": "string (1-2 sentences recommending which opportunity to tackle first and why, based on fastest ROI or easiest win — be direct, not generic)",
  "readyForReception": boolean (true if this business clearly handles inbound calls/bookings/inquiries and would benefit from an AI receptionist)
}

Rules:
- ONLY return JSON, nothing else before or after
- Be specific to this business — mention their product/service type, customer type, or industry when relevant
- Annual values should be realistic for an SMB (not $5M, not $200 — think $8K–$150K range)
- Rank opportunities by realistic dollar impact (highest first)
- If the URL is a hotel, dive op, restaurant, medical office, or service business that handles phone calls: mark readyForReception: true
- If site content is unavailable, use the domain and URL structure to make reasonable inferences`

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
        : "\n(Site content unavailable — analyze from URL and domain only)",
    ]
      .filter(Boolean)
      .join("\n")

    const message = await client.messages.create({
      model: "claude-opus-4-5",
      max_tokens: 1200,
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

    // Basic validation
    if (
      !result.businessName ||
      !Array.isArray(result.opportunities) ||
      result.opportunities.length === 0
    ) {
      return NextResponse.json(
        { error: "Scan produced an incomplete result. Please try again." },
        { status: 500 }
      )
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
