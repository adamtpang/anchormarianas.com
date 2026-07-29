import Anthropic from "@anthropic-ai/sdk"
import { NextRequest, NextResponse } from "next/server"

const client = new Anthropic({ apiKey: process.env.ANTHROPIC_API_KEY })

// Simple in-memory cache (resets on cold starts, fine for the V1 funnel).
const auditCache = new Map<string, { ts: number; result: unknown }>()
const CACHE_TTL = 1000 * 60 * 60 * 24 // 24 hours

function cacheKey(input: string) {
  try {
    const u = new URL(input)
    return "url:" + u.hostname.replace(/^www\./, "")
  } catch {
    return "desc:" + input.trim().toLowerCase().slice(0, 120)
  }
}

function asUrl(input: string): URL | null {
  const candidate = /^https?:\/\//i.test(input) ? input : `https://${input}`
  try {
    const u = new URL(candidate)
    // Only treat it as a URL if it has a dot in the host (a real domain).
    if (["http:", "https:"].includes(u.protocol) && u.hostname.includes(".")) {
      return u
    }
  } catch {
    // fall through
  }
  return null
}

async function fetchSiteContent(url: string): Promise<string> {
  try {
    const controller = new AbortController()
    const timeout = setTimeout(() => controller.abort(), 8000)
    const res = await fetch(url, {
      signal: controller.signal,
      headers: {
        "User-Agent":
          "AnchorScan/1.0 (+https://anchormarianas.com/audit) AI opportunity audit bot",
        Accept: "text/html,application/xhtml+xml",
      },
    })
    clearTimeout(timeout)
    const html = await res.text()
    return html
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
      .slice(0, 6000)
  } catch {
    return ""
  }
}

// The AI Opportunity Audit SCORES where AI saves time and money. Unlike the
// diagnostic /scan, it is allowed to rank and score opportunities, because the
// whole point is a clear starting map. It still never invents dollar figures,
// hours, or percentages. Quantification is the PAID audit's job, which is what
// makes the free score convert.
const systemPrompt = `You are AnchorScan, the AI Opportunity Audit built by Anchor Marianas LLC, a productized AI engineering studio. You read a business, from its website or a short description, and produce a scored map of where AI can save the owner time and money.

Your reader is an SMB owner or a founder who knows they should use AI but does not know where to start. Give them a clear, ranked starting point, in plain language.

Your job here is to SURFACE and SCORE opportunities, not to quantify them in dollars. You name where AI fits, how large the opportunity looks relative to their business, and how hard it would be. Exact numbers, ROI, and a build plan are what the paid audit adds later. That gap is intentional.

Respond ONLY with valid JSON in this exact shape:
{
  "businessName": "string (inferred business name, 1 to 4 words)",
  "summary": "string (1 to 2 sentences: what they do and the single biggest AI opportunity, plainly)",
  "score": 0,
  "scoreLabel": "string (3 to 6 words describing the score band, for example 'High, mostly quick wins')",
  "opportunities": [
    {
      "title": "string (3 to 7 words naming the workflow, for example 'Answering repeat customer questions')",
      "detail": "string (2 to 3 sentences: the manual work today and where AI fits, specific to this business)",
      "lever": "time",
      "effort": "low",
      "impact": "high",
      "evidence": "string (1 sentence: what in the site or description points to this)"
    }
  ],
  "quickWin": "string (1 sentence: the single fastest, lowest-effort place to start)",
  "auditAdds": "string (1 to 2 sentences: what the paid AI Opportunity Audit adds beyond this free read, namely exact time and cost numbers, a prioritized roadmap, and a scoped first build)"
}

Rules:
- ONLY return JSON, nothing before or after.
- score is an integer 0 to 100: an AI Opportunity Score, how much accessible AI-addressable opportunity you see across their operations. Calibrate it honestly. A lean, already-digital business scores lower than a manual, paperwork-heavy one. It is a directional indicator, never a dollar figure or a guarantee.
- opportunities: exactly 3 to 5, ranked most valuable first, specific to this business, never generic.
- lever is one of: "time", "money", "both". effort is one of: "low", "medium", "high". impact is one of: "high", "medium", "low". These qualitative labels are the ONLY sizing you give.
- NEVER invent or estimate dollar values, ROI, hours saved, or percentages anywhere. Say plainly in auditAdds that quantification is the paid audit's job.
- Voice: direct, plain, operator to operator. No corporate-speak. No em dashes (use periods, commas, colons, parentheses). No emoji. No exclamation marks.
- If you only have a short description and no site content, work from the description and keep claims cautious.`

export async function POST(req: NextRequest) {
  try {
    const body = await req.json()
    const { input, context } = body as { input?: string; context?: string }

    if (!input || typeof input !== "string" || !input.trim()) {
      return NextResponse.json(
        { error: "Enter your website or a short description to run the audit." },
        { status: 400 }
      )
    }
    const trimmed = input.trim()

    if (!process.env.ANTHROPIC_API_KEY) {
      return NextResponse.json(
        { error: "Audit service not configured. Please try again later." },
        { status: 503 }
      )
    }

    const key = cacheKey(trimmed)
    const cached = auditCache.get(key)
    if (cached && Date.now() - cached.ts < CACHE_TTL) {
      return NextResponse.json(cached.result)
    }

    const url = asUrl(trimmed)
    let userMessage: string
    if (url) {
      const siteContent = await fetchSiteContent(url.href)
      userMessage = [
        `Business URL: ${url.href}`,
        context ? `Additional context: ${context}` : "",
        siteContent
          ? `\nSite content (extracted text):\n${siteContent}`
          : "\n(Site content unavailable. Work from the URL and domain, and keep claims cautious.)",
      ]
        .filter(Boolean)
        .join("\n")
    } else {
      userMessage = [
        "The business described itself as follows (no website given):",
        trimmed,
        context ? `Additional context: ${context}` : "",
      ]
        .filter(Boolean)
        .join("\n")
    }

    const message = await client.messages.create({
      model: "claude-opus-4-5",
      max_tokens: 1600,
      system: systemPrompt,
      messages: [{ role: "user", content: userMessage }],
    })

    const rawText =
      message.content[0].type === "text" ? message.content[0].text.trim() : ""

    let result: Record<string, unknown>
    try {
      const jsonStr = rawText.replace(/^```json\s*/i, "").replace(/```\s*$/, "")
      result = JSON.parse(jsonStr)
    } catch {
      console.error("Audit JSON parse failed:", rawText.slice(0, 200))
      return NextResponse.json(
        { error: "Audit produced an unexpected result. Please try again." },
        { status: 500 }
      )
    }

    if (
      !result.businessName ||
      !Array.isArray(result.opportunities) ||
      result.opportunities.length === 0
    ) {
      return NextResponse.json(
        { error: "Audit produced an incomplete result. Please try again." },
        { status: 500 }
      )
    }

    // Clamp the score to a sane 0 to 100 integer.
    const rawScore = Number(result.score)
    result.score = Number.isFinite(rawScore)
      ? Math.max(0, Math.min(100, Math.round(rawScore)))
      : 50

    auditCache.set(key, { ts: Date.now(), result })
    return NextResponse.json(result)
  } catch (err) {
    console.error("Audit error:", err)
    return NextResponse.json(
      { error: "Audit failed. Please try again in a moment." },
      { status: 500 }
    )
  }
}
