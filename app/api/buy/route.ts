import { type NextRequest, NextResponse } from "next/server"
import { type BuyReport, analyzeReviews } from "@/lib/buy/analyze"
import { PlaceNotFound, fetchPlace, recordLead } from "@/lib/buy/fetch-place"
import {
	BoundedTtlCache,
	acquireAiRequest,
	aiErrorResponse,
	readBoundedJson,
	stableRequestKey,
} from "@/lib/server/ai-endpoint"

// Each report runs one paid Apify scrape (capped per run in fetch-place), so the
// route shares the site's fail-closed switch, per-visitor and daily limits.
export const maxDuration = 300

const reportCache = new BoundedTtlCache<BuyReport>(200, 1000 * 60 * 60 * 24 * 7)
const inFlight = new Map<string, Promise<BuyReport>>()
const EMAIL = /^[^\s@]{1,64}@[^\s@]{1,200}\.[a-z]{2,24}$/i

function clean(value: unknown, max: number) {
	return typeof value === "string" ? value.replace(/\s+/g, " ").trim().slice(0, max) : ""
}

export async function POST(req: NextRequest) {
	try {
		const body = (await readBoundedJson(req)) as Record<string, unknown>
		const business = clean(body.business, 120)
		const city = clean(body.city, 60)
		const email = clean(body.email, 254)

		if (business.length < 2) {
			return NextResponse.json({ error: "Enter the business name." }, { status: 400 })
		}
		if (city.length < 2) {
			return NextResponse.json({ error: "Enter the city." }, { status: 400 })
		}
		if (!EMAIL.test(email)) {
			return NextResponse.json({ error: "Enter a valid email so we can follow up." }, { status: 400 })
		}

		const key = stableRequestKey([business.toLowerCase(), city.toLowerCase(), "buy-v1"])
		const cached = reportCache.get(key)
		if (cached) {
			void recordLead({ email, business, city, matched: cached.place.name })
			return NextResponse.json(cached)
		}
		const running = inFlight.get(key)
		if (running) return NextResponse.json(await running)

		if (!process.env.APIFY_API_TOKEN) {
			return NextResponse.json(
				{ error: "Reports are not available right now. Please try again later." },
				{ status: 503 },
			)
		}

		const release = acquireAiRequest(req, "buy")
		const work = (async () => {
			const { place, reviews } = await fetchPlace(business, city)
			const report = analyzeReviews(place, reviews)
			reportCache.set(key, report)
			return report
		})()
		inFlight.set(key, work)
		try {
			const report = await work
			void recordLead({ email, business, city, matched: report.place.name })
			return NextResponse.json(report)
		} finally {
			inFlight.delete(key)
			release()
		}
	} catch (err) {
		if (err instanceof PlaceNotFound) {
			return NextResponse.json({ error: err.message }, { status: 404 })
		}
		const safe = aiErrorResponse(err)
		if (safe) return NextResponse.json(safe.body, safe)
		console.error("Buy report error:", err)
		return NextResponse.json(
			{ error: "The report failed. Please try again in a moment." },
			{ status: 500 },
		)
	}
}
