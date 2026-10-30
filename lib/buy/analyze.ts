// Buyer diligence from public Google reviews.
//
// Everything here is counting, not judging. Every number traces to review rows,
// every quote is a real excerpt, and nothing is projected or estimated. The
// report states what customers said and leaves the conclusion to the buyer.

export type Review = {
	stars: number | null
	text: string
	publishedAt: string | null
	ownerReply: boolean
}

export type Place = {
	name: string
	address: string
	category: string
	rating: number | null
	reviewCount: number | null
	url: string
}

export type Theme = {
	key: string
	label: string
	count: number
	recentCount: number
	examples: { stars: number; date: string; excerpt: string }[]
}

export type YearRow = { year: string; reviews: number; avgStars: number; lowShare: number }

export type BuyReport = {
	place: Place
	analyzed: number
	generatedAt: string
	years: YearRow[]
	trend: { recentAvg: number | null; earlierAvg: number | null; recentLabel: string }
	lowStar: { count: number; share: number }
	replyRate: number
	ownershipSignals: { date: string; excerpt: string }[]
	themes: Theme[]
	questions: string[]
	limits: string[]
}

const THEMES: { key: string; label: string; pattern: RegExp; question: string }[] = [
	{
		key: "quality",
		label: "Quality of the product or work",
		pattern: /\b(cold|stale|bland|dry|burnt|overcooked|undercooked|raw|salty|tasteless|soggy|greasy|nasty|gross|disgusting|terrible food|bad food|worse|poor quality|went downhill|gone downhill|not the same|isn'?t the same|used to be|(been|tastes?|are|is) different|egg ?shells?)\b/i,
		question: "Has anything changed in recipes, suppliers, or who does the core work in the last two years?",
	},
	{
		key: "service",
		label: "Rude or inattentive staff",
		pattern: /\b(rude|unfriendly|attitude|ignored|disrespect|unprofessional|yelled|condescending|didn'?t care|dismissive)\b/i,
		question: "Who are the customer-facing staff, how long have they been there, and will they stay after the sale?",
	},
	{
		key: "wait",
		label: "Slow service or long waits",
		pattern: /\b(slow|waited|wait(ing)? (for )?\d+|took (forever|too long)|over an hour|\d+ ?min(ute)?s? (late|wait)|long wait|still waiting)\b/i,
		question: "What are typical wait or turnaround times at peak hours, and how many staff cover them?",
	},
	{
		key: "price",
		label: "Price or value",
		pattern: /\b(overpriced|expensive|pricey|rip ?off|not worth|small portion|tiny portion|too much money|price gouging)\b/i,
		question: "When were prices last raised, and did volume change afterward?",
	},
	{
		key: "clean",
		label: "Cleanliness or smell",
		pattern: /\b(dirty|filthy|smell|smelled|stink|roach|cockroach|bug|hair in|mold|unsanitary|gross bathroom)\b/i,
		question: "Can you see the last three years of health inspection reports?",
	},
	{
		key: "orders",
		label: "Wrong or missing orders",
		pattern: /\b(wrong order|got (it|my order) wrong|missing|forgot|never (came|arrived|showed)|messed up|incorrect order)\b/i,
		question: "How are orders taken and tracked, and what share are online or delivery?",
	},
	{
		key: "contact",
		label: "Phone, hours, or info problems",
		pattern: /\b(no one answer|nobody answer|didn'?t answer|don'?t answer|never answer|hung up|closed early|closed when|hours (are )?wrong|said (they were )?open|told (me |us )?(they|we|it) (were|was) closed|voicemail)\b/i,
		question: "Are the posted hours accurate, and who answers the phone and messages today?",
	},
	{
		key: "billing",
		label: "Billing or refund disputes",
		pattern: /\b(overcharg|charged (me )?twice|double charg|refund|hidden fee|extra charge|scam)\b/i,
		question: "How many refunds or chargebacks were there in the last year?",
	},
]

const QUESTION_FOR: Record<string, string> = Object.fromEntries(THEMES.map((t) => [t.key, t.question]))

const OWNERSHIP =/\b(new owners?|new management|under new|taken over|took over|changed (hands|owners|ownership)|sold (it|the (business|place|restaurant|shop))|previous owner|old owner|bought (it|the place))\b/i

const round1 = (n: number) => Math.round(n * 10) / 10
const pct = (a: number, b: number) => (b ? Math.round((100 * a) / b) : 0)

export function excerpt(text: string, max = 180): string {
	const clean = text.replace(/<br\s*\/?>/gi, " ").replace(/\s+/g, " ").trim()
	if (clean.length <= max) return clean
	const cut = clean.slice(0, max)
	return `${cut.slice(0, cut.lastIndexOf(" ") > 60 ? cut.lastIndexOf(" ") : max)}...`
}

function dateOf(r: Review) {
	return (r.publishedAt || "").slice(0, 10)
}

export function analyzeReviews(
	place: Place,
	reviews: Review[],
	now: Date = new Date(),
): BuyReport {
	const rated = reviews.filter((r) => typeof r.stars === "number")
	const recentCutoff = new Date(now)
	recentCutoff.setUTCMonth(recentCutoff.getUTCMonth() - 18)
	const cutoff = recentCutoff.toISOString().slice(0, 10)
	const isRecent = (r: Review) => dateOf(r) >= cutoff

	const byYear = new Map<string, Review[]>()
	for (const r of rated) {
		const y = dateOf(r).slice(0, 4)
		if (!y) continue
		byYear.set(y, [...(byYear.get(y) || []), r])
	}
	const years: YearRow[] = [...byYear.entries()]
		.sort(([a], [b]) => a.localeCompare(b))
		.map(([year, rs]) => ({
			year,
			reviews: rs.length,
			avgStars: round1(rs.reduce((s, r) => s + (r.stars as number), 0) / rs.length),
			lowShare: pct(rs.filter((r) => (r.stars as number) <= 3).length, rs.length),
		}))

	const avg = (rs: Review[]) =>
		rs.length ? round1(rs.reduce((s, r) => s + (r.stars as number), 0) / rs.length) : null
	const recent = rated.filter(isRecent)
	const earlier = rated.filter((r) => !isRecent(r))

	const low = rated.filter((r) => (r.stars as number) <= 3)
	const lowWithText = low.filter((r) => r.text.trim().length > 0)

	const themes: Theme[] = THEMES.map((t) => {
		const hits = lowWithText.filter((r) => t.pattern.test(r.text))
		const ordered = [...hits].sort((a, b) => dateOf(b).localeCompare(dateOf(a)))
		return {
			key: t.key,
			label: t.label,
			count: hits.length,
			recentCount: hits.filter(isRecent).length,
			examples: ordered.slice(0, 2).map((r) => ({
				stars: r.stars as number,
				date: dateOf(r).slice(0, 7),
				excerpt: excerpt(r.text),
			})),
		}
	})
		.filter((t) => t.count > 0)
		.sort((a, b) => b.recentCount - a.recentCount || b.count - a.count)

	const ownershipSignals = reviews
		.filter((r) => OWNERSHIP.test(r.text))
		.sort((a, b) => dateOf(b).localeCompare(dateOf(a)))
		.slice(0, 4)
		.map((r) => ({ date: dateOf(r).slice(0, 7), excerpt: excerpt(r.text, 200) }))

	const questions = [
		...(ownershipSignals.length
			? ["Reviews mention a change of owner or management. When did it happen, and what are sales before and after?"]
			: []),
		...themes.slice(0, 4).map((t) => QUESTION_FOR[t.key]),
	]
	if (questions.length < 3) {
		questions.push("Can you share monthly sales for the last 24 months, so the review trend can be compared with revenue?")
	}

	const limits = [
		`Based on ${reviews.length} Google reviews (${rated.length} with a star rating) out of ${place.reviewCount ?? "an unknown number of"} on the listing.`,
		"Reviews are customer opinions, not verified facts. Use them to decide what to ask, not as a verdict.",
	]
	if ((place.reviewCount ?? 0) < 30) limits.push("Under 30 reviews: too few to read a reliable pattern.")

	return {
		place,
		analyzed: reviews.length,
		generatedAt: now.toISOString(),
		years,
		trend: { recentAvg: avg(recent), earlierAvg: avg(earlier), recentLabel: "last 18 months" },
		lowStar: { count: low.length, share: pct(low.length, rated.length) },
		replyRate: pct(reviews.filter((r) => r.ownerReply).length, reviews.length),
		ownershipSignals,
		themes,
		questions: questions.slice(0, 5),
		limits,
	}
}

/** Word-overlap score between the name a buyer typed and the listing found. */
export function nameMatchScore(wanted: string, found: string): number {
	const words = (s: string) =>
		new Set(
			s
				.toLowerCase()
				.replace(/&/g, " and ")
				.replace(/[^a-z0-9]+/g, " ")
				.split(" ")
				.filter((w) => w.length > 1 && !["the", "and", "of", "llc", "inc", "co"].includes(w)),
		)
	const a = words(wanted)
	const b = words(found)
	if (!a.size || !b.size) return 0
	let shared = 0
	for (const w of a) if (b.has(w)) shared++
	return shared / a.size
}
