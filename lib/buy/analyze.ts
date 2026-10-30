// Buyer diligence from public Google reviews.
//
// Everything here is counting, not judging. Every number traces to review rows,
// every quote is a real excerpt, and nothing is projected or estimated. The
// report states what customers said and leaves the conclusion to the buyer.

export type Review = {
	stars: number | null
	text: string
	publishedAt: string | null
	/** The owner's reply text, or "" when there is none. */
	ownerReply: string
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
	branchNote: string | null
	analyzed: number
	generatedAt: string
	years: YearRow[]
	trend: { recentAvg: number | null; earlierAvg: number | null; recentLabel: string }
	lowStar: { count: number; share: number }
	replyRate: number
	ownershipSignals: { date: string; excerpt: string; source: "owner reply" | "customer" }[]
	bursts: { date: string; count: number }[]
	themes: Theme[]
	questions: string[]
	limits: string[]
}

const THEMES: { key: string; label: string; pattern: RegExp; question: string }[] = [
	{
		key: "quality",
		label: "Quality of the product or work",
		pattern: /\b(cold|stale|bland|dry|burnt|overcooked|undercooked|raw|salty|tasteless|soggy|greasy|nasty|gross|disgusting|terrible food|bad food|worse|poor quality|went downhill|gone downhill|not the same|isn'?t the same|used to be|(been|tastes?|are|is) different|egg ?shells?|(did not|didn'?t) meet|not as (good|thorough)|sloppy|missed spots|hair left)\b/i,
		question: "Has anything changed in recipes, suppliers, or who does the core work in the last two years?",
	},
	{
		key: "staff",
		label: "Staff leaving or turnover",
		pattern: /\b(no longer (there|works?|with|employed)|now that (she|he|they)(['’]s| is| are) gone|(she|he|they) (left|quit)|turnover|keeps? changing staff|short[- ]?staffed|understaffed|new staff every)\b/i,
		question: "Which staff do customers ask for by name, and are they staying after the sale?",
	},
	{
		key: "booking",
		label: "Bookings moved, cancelled, or lost",
		pattern: /\b(reschedul\w*|cancell?ed (my|our) (appointment|booking|reservation)|push(ed)? (back )?my appointment|no[- ]show|(no one|nobody) (showed|was there) (up )?for my|(no one|nobody) showed up|missed my appointment|missing my appointment|double[- ]booked|gave (away )?my (appointment|spot|slot))\b/i,
		question: "How are appointments booked and confirmed, and how often are they moved or missed?",
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
		pattern: /\b(dirty(?! (martini|chai|rice|fries|horchata|soda|coke|dr\.? pepper))|filthy|smell(s|ed)? (so )?(bad|terrible|awful|horrible|gross|funny|off|rank)|smell(s|ed)?\W+(like )?(\w+ ){0,3}(urine|sewage|pee|garbage|trash|mold|spoiled|chemical\w*)|smells like that|(bad|foul|strange) (smell|odor)|stink\w*|health codes?|code violations?|condemned|roach|cockroach|bug|hair in|mold|unsanitary|gross bathroom|cleanliness|unclean|not clean|wasn'?t cleaned)\b/i,
		question: "Can you see the last three years of health inspection reports?",
	},
	{
		key: "orders",
		label: "Wrong or missing orders",
		pattern: /\b(wrong order|got (it|my order) wrong|missing (items?|from my order|my (order|food|drink|item|sauce|side)s?)|forgot (my|our|the|to (add|include|give))|never (came|arrived|showed)|messed up|incorrect order)\b/i,
		question: "How are orders taken and tracked, and what share are online or delivery?",
	},
	{
		key: "contact",
		label: "Phone, hours, or info problems",
		pattern: /\b(no one answer|nobody answer|didn'?t answer|don'?t answer|never answer|hung up|(no one|nobody|didn'?t|never) pick(ed|s)? up|never called (me )?back|closed early|closed when|hours (are )?wrong|said (they were )?open|told (me |us )?(they|we|it) (were|was) closed|voicemail)\b/i,
		question: "Are the posted hours accurate, and who answers the phone and messages today?",
	},
	{
		key: "billing",
		label: "Billing or refund disputes",
		pattern: /\b(overcharg\w*|charged (me )?twice|double[- ]charg\w*|refund|hidden fee|extra charge|scam)\b/i,
		question: "How many refunds or chargebacks were there in the last year?",
	},
]

const QUESTION_FOR: Record<string, string> = Object.fromEntries(THEMES.map((t) => [t.key, t.question]))

const OWNERSHIP = /\b(since taking over|new owners?|new management|under new|taken over|took over|changed (hands|owners|ownership)|sold (it|the (business|place|restaurant|shop))|previous owner|old owner|bought (it|the place))\b/i

const round1 = (n: number) => Math.round(n * 10) / 10
const pct = (a: number, b: number) => (b ? Math.round((100 * a) / b) : 0)

export function excerpt(text: string, max = 180): string {
	const clean = text.replace(/<br\s*\/?>/gi, " ").replace(/\s+/g, " ").trim()
	if (clean.length <= max) return clean
	const cut = clean.slice(0, max)
	return `${cut.slice(0, cut.lastIndexOf(" ") > 60 ? cut.lastIndexOf(" ") : max)}...`
}

const RECENTLY = /\b(recently|just)\b/i
const BRANCH = /\s[-–|·]\s|\sat\s|\(.+\)/i

/** An excerpt that keeps the matched phrase in view, trimmed to whole words. */
export function excerptAround(text: string, pattern: RegExp, max = 200): string {
	const clean = text.replace(/<br\s*\/?>/gi, " ").replace(/\s+/g, " ").trim()
	const at = clean.search(pattern)
	if (at < 0 || clean.length <= max) return excerpt(clean, max)
	const start = Math.max(0, at - 60)
	const from = start === 0 ? 0 : clean.indexOf(" ", start) + 1
	return `${from > 0 ? "..." : ""}${excerpt(clean.slice(from), max)}`
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

	// Under five reviews a period average swings on one person, so it is not shown.
	const avg = (rs: Review[]) =>
		rs.length >= 5 ? round1(rs.reduce((s, r) => s + (r.stars as number), 0) / rs.length) : null
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
				excerpt: excerptAround(r.text, t.pattern, 180),
			})),
		}
	})
		.filter((t) => t.count > 0)
		.sort((a, b) => b.recentCount - a.recentCount || b.count - a.count)

	// Google does not date owner replies here, and new owners often answer old
	// reviews, so a reply's date is only the date of the review it answers.
	// Replies saying "recently" or "just" took over sit near the handover, so
	// they lead; customer mentions show what changed, so the newest lead.
	const ownerSaid = reviews
		.filter((r) => OWNERSHIP.test(r.ownerReply))
		.sort(
			(a, b) =>
				Number(RECENTLY.test(b.ownerReply)) - Number(RECENTLY.test(a.ownerReply)) ||
				dateOf(a).localeCompare(dateOf(b)),
		)
		.slice(0, 2)
		.map((r) => ({ date: dateOf(r).slice(0, 7), excerpt: excerptAround(r.ownerReply, OWNERSHIP), source: "owner reply" as const }))
	const customersSaid = reviews
		.filter((r) => OWNERSHIP.test(r.text))
		.sort((a, b) => dateOf(b).localeCompare(dateOf(a)))
		.slice(0, 2)
		.map((r) => ({ date: dateOf(r).slice(0, 7), excerpt: excerptAround(r.text, OWNERSHIP), source: "customer" as const }))
	const ownershipSignals = [...ownerSaid, ...customersSaid]
	const bursts = findBursts(rated)

	const questions = [
		...(ownershipSignals.length
			? ["Reviews mention a change of owner or management. When did it happen, and what are sales before and after?"]
			: []),
		...bursts.map(
			(b) => `${b.count} reviews of 1 or 2 stars landed within two days around ${b.date}. What happened then?`,
		),
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
	// Room Service Vintage changed owners in 2025 and no review said so.
	if (!ownershipSignals.length) {
		limits.push(
			"No review or owner reply here mentions a change of owner. Customers often do not notice one, so ask the seller how long they have owned it.",
		)
	}

	// Chains share a name, so the first match can be the wrong branch.
	const branchNote = BRANCH.test(place.name)
		? `Google lists this as "${place.name}", one location of a business with more than one. Check that ${place.address} is the location for sale. If not, add the street or neighborhood to the name and run it again.`
		: null

	return {
		place,
		branchNote,
		analyzed: reviews.length,
		generatedAt: now.toISOString(),
		years,
		trend: { recentAvg: avg(recent), earlierAvg: avg(earlier), recentLabel: "last 18 months" },
		lowStar: { count: low.length, share: pct(low.length, rated.length) },
		replyRate: pct(reviews.filter((r) => r.ownerReply.trim()).length, reviews.length),
		ownershipSignals,
		bursts,
		themes,
		questions: questions.slice(0, 5),
		limits,
	}
}

const BURST_WINDOW_MS = 2 * 24 * 60 * 60 * 1000

/** Three or more 1 and 2-star reviews inside two days: one bad event, or a pile-on. */
export function findBursts(reviews: Review[]): { date: string; count: number }[] {
	const times = reviews
		.filter((r) => (r.stars as number) <= 2 && r.publishedAt)
		.map((r) => Date.parse(r.publishedAt as string))
		.filter((t) => !Number.isNaN(t))
		.sort((a, b) => a - b)
	const bursts: { date: string; count: number }[] = []
	let i = 0
	while (i < times.length) {
		let j = i
		while (j + 1 < times.length && times[j + 1] - times[i] <= BURST_WINDOW_MS) j++
		if (j - i + 1 >= 3) {
			bursts.push({ date: new Date(times[i]).toISOString().slice(0, 10), count: j - i + 1 })
			i = j + 1
		} else {
			i++
		}
	}
	return bursts
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
