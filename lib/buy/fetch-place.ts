// Finds exactly one Google Maps listing and its reviews through Apify.
//
// Guards learned from the first manual run, where a loose search matched a
// Walmart in Virginia: one place per search, a name check, a city check, and a
// hard spend cap on every run. If the listing found is not clearly the one the
// buyer typed, nothing is analyzed.

import { type Place, type Review, nameMatchScore } from "./analyze"

const APIFY = "https://api.apify.com/v2"
export const MAX_REVIEWS = 150
// Apify refuses a per-run cap below $0.50 for this actor; a 150-review run costs well under it.
export const MAX_RUN_USD = 0.5

export class PlaceNotFound extends Error {}

type ApifyReview = {
	stars?: number | null
	text?: string | null
	publishedAtDate?: string | null
	responseFromOwnerText?: string | null
}
type ApifyPlace = {
	title?: string
	address?: string | null
	categoryName?: string | null
	totalScore?: number | null
	reviewsCount?: number | null
	url?: string
	permanentlyClosed?: boolean
	reviews?: ApifyReview[]
}

export function toPlaceAndReviews(item: ApifyPlace): { place: Place; reviews: Review[] } {
	return {
		place: {
			name: item.title || "Unknown business",
			address: item.address || "",
			category: item.categoryName || "",
			rating: typeof item.totalScore === "number" ? item.totalScore : null,
			reviewCount: typeof item.reviewsCount === "number" ? item.reviewsCount : null,
			url: item.url || "",
		},
		reviews: (item.reviews || []).map((r) => ({
			stars: typeof r.stars === "number" ? r.stars : null,
			text: r.text || "",
			publishedAt: r.publishedAtDate || null,
			ownerReply: Boolean(r.responseFromOwnerText),
		})),
	}
}

/** Reject anything that is not clearly the business the buyer asked about. */
export function assertSameBusiness(wantedName: string, wantedCity: string, place: Place) {
	if (nameMatchScore(wantedName, place.name) < 0.5) {
		throw new PlaceNotFound(
			`The closest Google listing was "${place.name}", which does not look like "${wantedName}". Try the exact name on Google Maps.`,
		)
	}
	const city = wantedCity.trim().toLowerCase()
	if (city && place.address && !place.address.toLowerCase().includes(city)) {
		throw new PlaceNotFound(
			`Found "${place.name}" at ${place.address}, which is not in ${wantedCity}. Check the city.`,
		)
	}
}

export async function fetchPlace(
	name: string,
	city: string,
	{ token = process.env.APIFY_API_TOKEN, fetchFn = fetch } = {},
): Promise<{ place: Place; reviews: Review[] }> {
	if (!token) throw new Error("APIFY_API_TOKEN is not set")
	const url = `${APIFY}/acts/compass~crawler-google-places/run-sync-get-dataset-items?token=${encodeURIComponent(token)}&maxTotalChargeUsd=${MAX_RUN_USD}&timeout=240`
	const res = await fetchFn(url, {
		method: "POST",
		headers: { "Content-Type": "application/json" },
		body: JSON.stringify({
			searchStringsArray: [`${name} ${city}`],
			maxCrawledPlacesPerSearch: 1,
			language: "en",
			maxReviews: MAX_REVIEWS,
			reviewsSort: "newest",
			scrapeReviewsPersonalData: false,
			maxImages: 0,
		}),
	})
	if (!res.ok) throw new Error(`Review service returned ${res.status}`)
	const items = (await res.json()) as ApifyPlace[]
	const item = Array.isArray(items) ? items.find((i) => i?.title) : undefined
	if (!item) throw new PlaceNotFound(`No Google listing found for "${name}" in ${city}.`)
	const result = toPlaceAndReviews(item)
	assertSameBusiness(name, city, result.place)
	return result
}

/** Appends a lead to a named Apify dataset. Failures never block the report. */
export async function recordLead(
	lead: { email: string; business: string; city: string; matched: string },
	{ token = process.env.APIFY_API_TOKEN, fetchFn = fetch } = {},
): Promise<boolean> {
	if (!token) return false
	try {
		const ds = await fetchFn(`${APIFY}/datasets?name=anchor-buy-leads&token=${encodeURIComponent(token)}`, {
			method: "POST",
		})
		if (!ds.ok) return false
		const { data } = (await ds.json()) as { data?: { id?: string } }
		if (!data?.id) return false
		const push = await fetchFn(`${APIFY}/datasets/${data.id}/items?token=${encodeURIComponent(token)}`, {
			method: "POST",
			headers: { "Content-Type": "application/json" },
			body: JSON.stringify([{ ...lead, at: new Date().toISOString() }]),
		})
		return push.ok
	} catch {
		return false
	}
}
