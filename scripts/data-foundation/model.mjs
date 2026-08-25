import { createHash } from "node:crypto"

export const DATA_SCHEMA_VERSION = 1

export const VERTICAL_RULES = [
  [/dentist|dental|orthodont/, "Dental"],
  [/doctor|clinic|medical|hospital|eye|optic|physical|chiro|derma|pediat|health|nursing|obgyn|counsel/, "Healthcare"],
  [/veterin|pet groom|animal/, "Veterinary & Pet"],
  [/beauty|hair|barber|fade|nail|salon|spa|lash|skin|massage/, "Beauty & Salons"],
  [/restaurant|cafe|coffee|fast.?food|food.?court|diner|bakery|bake|\bbar\b|\bpub\b|grill|bbq|sushi|ramen|pizza|burger|deli|snack|ice.?cream|steak|catering|izakaya|dessert|juice|bubble|donut|nightclub/, "Food & Drink"],
  [/contractor|construction|air.?condition|hvac|electric|plumb|roof|carpent|weld|concrete|mason|tile|floor|glass|window|fence|pool|solar|appliance repair|locksmith|paint|handyman|landscap|lawn|pest|clean|janitor|drilling|mechanical|generator|water heater|septic|excavat|sign|security|cctv|tree/, "Trades & Home Services"],
  [/car|auto|tire|motorcycle|boat|vehicle|oil change|body shop/, "Auto"],
  [/supermarket|grocer|convenience|department|clothes|shoe|jewel|gift|souvenir|electronic|furniture|hardware|book|florist|flower|pharmac|thrift|store|shop|market\b|optician/, "Retail"],
  [/insurance|law|lawyer|attorney|account|tax|bookkeep|real estate|realty|financial|advisor|bank|credit union|marketing|web design|it service|print|consult|surveyor|architect|engineer/, "Professional Services"],
  [/hotel|motel|resort|guest.?house|hostel|apartment|lodging/, "Hospitality & Lodging"],
  [/gym|fitness|sports|golf|marina|yoga|martial|dive/, "Fitness & Leisure"],
  [/fuel|gas station/, "Fuel"],
  [/attraction|tour|travel|wedding|photograph|event/, "Tourism & Events"],
  [/child|daycare|kindergarten|driving school|language|education|school/, "Education & Childcare"],
]

export function cleanText(value) {
  return String(value ?? "").replace(/\s+/g, " ").trim()
}

export function slugify(value) {
  return cleanText(value)
    .normalize("NFKD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
    .replace(/&/g, " and ")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "")
}

export function normalizedBusinessName(value) {
  return cleanText(value)
    .normalize("NFKD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
    .replace(/&/g, " and ")
    .replace(/[^\p{L}\p{N} ]+/gu, " ")
    .replace(/\b(llc|incorporated|inc|corp|corporation|company|co|pc|p c)\b/g, " ")
    .replace(/\s+/g, " ")
    .trim()
}

export function businessMatchKeys(value) {
  const normalized = normalizedBusinessName(value)
  const withoutGeography = normalized
    .replace(/^guam\s+/, "")
    .replace(/\s+guam$/, "")
    .trim()
  return [...new Set([normalized, withoutGeography].filter(Boolean))]
}

export function verticalForCategory(category) {
  const value = cleanText(category).toLowerCase()
  for (const [pattern, vertical] of VERTICAL_RULES) {
    if (pattern.test(value)) return vertical
  }
  return "Other"
}

export function sha256(value) {
  return createHash("sha256").update(value).digest("hex")
}

export function contentId(prefix, value, length = 24) {
  return `${prefix}:${sha256(value).slice(0, length)}`
}

function sourceProvider(value) {
  const source = cleanText(value).toLowerCase()
  if (source === "osm") return "openstreetmap"
  if (source.includes("yelp")) return "yelp"
  if (source.includes("guamphonebook")) return "guamphonebook"
  if (source.includes("eguamdirectory")) return "eguamdirectory"
  if (source.includes("guam chamber")) return "guam-chamber"
  if (source.includes("hafaguam")) return "hafaguam"
  if (source.includes("opendi")) return "opendi"
  return "directory"
}

export function legacySources(value) {
  const raw = cleanText(value)
  if (!raw) return []
  return raw.split("+").map((locator) => ({
    provider: sourceProvider(locator),
    locator: cleanText(locator),
    evidenceClass: "business_listing",
  }))
}

export function canonicalBusinessFromLead(lead, businessId) {
  const name = cleanText(lead.name)
  const category = cleanText(lead.category) || "other"
  const categoryVertical = verticalForCategory(category)
  const nameVertical = verticalForCategory(name)
  const inferFromName = categoryVertical === "Other" && nameVertical !== "Other"
  return {
    schemaVersion: DATA_SCHEMA_VERSION,
    businessId,
    identity: {
      name,
      normalizedName: normalizedBusinessName(name),
      aliases: [],
    },
    classification: {
      category,
      vertical: inferFromName ? nameVertical : categoryVertical,
      basis: inferFromName ? "business-name" : "source-category",
    },
    location: {
      address: null,
      village: cleanText(lead.village) || null,
      postalCode: null,
      countryCode: "GU",
      latitude: null,
      longitude: null,
    },
    contact: {
      phone: cleanText(lead.phone) || null,
      website: cleanText(lead.website) || null,
    },
    externalIds: {
      googlePlaceId: null,
    },
    listing: {
      googleMapsUrl: null,
      rating: null,
      reviewCount: null,
      permanentlyClosed: null,
      temporarilyClosed: null,
      observedAt: null,
    },
    provenance: legacySources(lead.sources),
    legacySignals: {
      budget: cleanText(lead.budget) || null,
      authority: cleanText(lead.authority) || null,
      need: cleanText(lead.need) || null,
      timeline: cleanText(lead.timeline) || null,
      priority: Number.isFinite(Number(lead.priority)) ? Number(lead.priority) : null,
      tier: cleanText(lead.tier) || null,
      evidenceClass: "heuristic",
      warning: "Legacy category and presence heuristics, not owner-confirmed facts.",
    },
  }
}

export function reviewRecord({ dataset, item, businessId, itemIndex }) {
  const title = cleanText(item.title)
  const text = cleanText(item.text) || null
  const publishedAt = cleanText(item.publishedAtDate) || null
  const rating = Number.isFinite(Number(item.stars)) ? Number(item.stars) : null
  const fingerprint = [dataset.datasetId, title, publishedAt, rating, text, itemIndex].join("|")
  return {
    schemaVersion: DATA_SCHEMA_VERSION,
    reviewId: contentId("review", fingerprint),
    businessId,
    evidenceClass: "customer_review",
    rating,
    text,
    publishedAt,
    ownerResponseText: cleanText(item.responseFromOwnerText) || null,
    collectedAt: dataset.collectedAt,
    source: {
      provider: "apify",
      datasetId: dataset.datasetId,
      actor: "compass/google-maps-reviews-scraper",
      recoveredFrom: "claude-transcript",
      transcriptLine: dataset.transcriptLine,
    },
  }
}

export function businessBaseId(name) {
  const normalized = normalizedBusinessName(name)
  const slug = slugify(normalized)
  return `guam:${slug || `business-${sha256(normalized).slice(0, 12)}`}`
}

export function countPresent(rows, getter) {
  return rows.filter((row) => {
    const value = getter(row)
    return value !== null && value !== undefined && cleanText(value) !== ""
  }).length
}
