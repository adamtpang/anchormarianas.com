import Anthropic from "@anthropic-ai/sdk"
import { NextRequest, NextResponse } from "next/server"

const client = new Anthropic({ apiKey: process.env.ANTHROPIC_API_KEY })

// The /build scoper turns a plain-language project description into a scoped
// proposal: deliverables, phases, an HONEST hours-and-price RANGE, assumptions,
// and open questions. It NEVER produces a binding fixed price. The estimate is
// AI-drafted, and every response says the final scope and price are confirmed
// with Adam on a short call. That human step is deliberate: pricing is judgment,
// not a formula a stranger can lock in.
const systemPrompt = `You are the Anchor Marianas project scoper. A visitor describes what they want built, and you return a clear, honest scoped proposal. Anchor is a one-person AI engineering studio run by Adam, who builds AI tools and web apps for small businesses.

Your job: turn their description into deliverables, a phased plan, and an honest estimate RANGE. You never give a single binding number. The final scope and price are always confirmed with Adam on a short call.

Pricing anchors (calibrate to these, do not state them as line items):
- A single marketing landing page is about $497 and roughly 5 days.
- A first working MVP web app (one core workflow, auth, database, deploy) is about $1,997 and roughly 5 days.
- Larger custom builds: estimate hours as a low-to-high range and price at a blended $150 to $250 per hour.
- Always give a RANGE, never false precision. If the ask matches the landing or MVP shape above, anchor to those numbers.

Respond ONLY with valid JSON in this exact shape:
{
  "projectName": "string (a short name for the project, 2 to 5 words)",
  "summary": "string (1 to 2 sentences restating what they want in plain terms)",
  "deliverables": [
    { "title": "string (3 to 6 words)", "detail": "string (1 sentence, concrete)" }
  ],
  "phases": [
    { "name": "string (e.g. 'Week 1: core build')", "focus": "string (1 sentence)" }
  ],
  "estimate": {
    "hoursLow": 0,
    "hoursHigh": 0,
    "priceLow": "string (e.g. '$1,500')",
    "priceHigh": "string (e.g. '$3,000')",
    "timeline": "string (e.g. '2 to 3 weeks')"
  },
  "assumptions": [ "string (an explicit assumption the estimate rests on)" ],
  "openQuestions": [ "string (a question that would change the scope or price)" ]
}

Rules:
- ONLY return JSON, nothing before or after.
- deliverables: 3 to 6, concrete and specific to their description.
- phases: 2 to 4, in plain language.
- estimate: hoursLow/hoursHigh are integers; priceLow/priceHigh are calibrated to the anchors above and consistent with the hours. Always a real range where high is meaningfully above low.
- assumptions: 3 to 5. These are what the estimate depends on (for example, they provide copy and brand, no custom integrations, one round of revisions). Be honest so the number is defensible.
- openQuestions: 2 to 4. The things a 15-minute call would settle.
- If the description is too vague to scope, keep the estimate wide, put the missing info in openQuestions, and say so in the summary.
- Voice: direct, plain, builder to client. No corporate-speak. No em dashes (use periods, commas, colons, parentheses). No emoji. No exclamation marks.`

export async function POST(req: NextRequest) {
  try {
    const body = await req.json()
    const { description, budget, timeline } = body as {
      description?: string
      budget?: string
      timeline?: string
    }

    if (!description || typeof description !== "string" || description.trim().length < 8) {
      return NextResponse.json(
        { error: "Describe what you want built (a sentence or two is plenty)." },
        { status: 400 }
      )
    }

    if (!process.env.ANTHROPIC_API_KEY) {
      return NextResponse.json(
        { error: "Scoping service not configured. Please try again later." },
        { status: 503 }
      )
    }

    const userMessage = [
      `Project description:\n${description.trim()}`,
      budget ? `Their budget: ${budget}` : "",
      timeline ? `Their timeline: ${timeline}` : "",
    ]
      .filter(Boolean)
      .join("\n\n")

    const message = await client.messages.create({
      model: "claude-opus-4-5",
      max_tokens: 1800,
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
      console.error("Build scope JSON parse failed:", rawText.slice(0, 200))
      return NextResponse.json(
        { error: "Scoping produced an unexpected result. Please try again." },
        { status: 500 }
      )
    }

    if (
      !result.projectName ||
      !Array.isArray(result.deliverables) ||
      result.deliverables.length === 0 ||
      !result.estimate
    ) {
      return NextResponse.json(
        { error: "Scoping produced an incomplete result. Please try again." },
        { status: 500 }
      )
    }

    return NextResponse.json(result)
  } catch (err) {
    console.error("Build scope error:", err)
    return NextResponse.json(
      { error: "Scoping failed. Please try again in a moment." },
      { status: 500 }
    )
  }
}
