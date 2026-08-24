import path from "node:path"

const disallowedDiagnosticClaim =
  /(?:[$£€¥]\s*\d|\b(?:usd|dollars?|roi|return on investment|percent(?:age)?|recommend(?:ation|ed|ing)?|suggest(?:ion|ed|ing)?|you should|should (?:build|buy|install|implement|use)|ai receptionist|review responder|anchor marianas)\b|\d+(?:\.\d+)?\s*%)/i

const text = (value, field) => {
  if (typeof value !== "string" || !value.trim()) {
    throw new Error(`${field} must be non-empty text.`)
  }
  const result = value.trim()
  if (disallowedDiagnosticClaim.test(result)) {
    throw new Error(`${field} contains a prescriptive or unsupported claim.`)
  }
  return result
}

export function validateDiagnosticDraft(value) {
  if (!value || typeof value !== "object" || Array.isArray(value)) {
    throw new Error("Claude did not return a report object.")
  }

  if (
    !Array.isArray(value.observations) ||
    value.observations.length < 3 ||
    value.observations.length > 4
  ) {
    throw new Error("observations must contain 3 or 4 items.")
  }
  if (
    !Array.isArray(value.questions) ||
    value.questions.length < 3 ||
    value.questions.length > 5
  ) {
    throw new Error("questions must contain 3 to 5 items.")
  }

  return {
    summary: text(value.summary ?? value.businessSummary, "summary"),
    observations: value.observations.map((observation, index) => {
      if (!observation || typeof observation !== "object") {
        throw new Error(`observations[${index}] must be an object.`)
      }
      return {
        title: text(observation.title, `observations[${index}].title`),
        detail: text(observation.detail, `observations[${index}].detail`),
        evidence: text(observation.evidence, `observations[${index}].evidence`),
      }
    }),
    questions: value.questions.map((question, index) =>
      text(question, `questions[${index}]`)
    ),
    focus: text(value.focus, "focus"),
  }
}

export function buildTrustedPublishedRead(draft, fetched, slug, generatedAt) {
  const diagnostic = validateDiagnosticDraft(draft)
  const business = text(fetched?.business?.name, "fetched business name")
  const reviews = Array.isArray(fetched?.reviews) ? fetched.reviews : []
  if (!reviews.length) throw new Error("Fetched evidence contains no reviews.")

  return {
    slug,
    business,
    location:
      typeof fetched.business.location === "string"
        ? fetched.business.location.trim()
        : "",
    generatedAt,
    source: `Google Maps reviews via ${fetched.business.source || "manual source"}, read on ${generatedAt}`,
    rating:
      typeof fetched.business.rating === "number"
        ? fetched.business.rating
        : null,
    reviewsRead: reviews.length,
    totalReviewCount:
      typeof fetched.business.ratingCount === "number"
        ? fetched.business.ratingCount
        : null,
    ...diagnostic,
  }
}

export function safePublishedReadPath(outDir, slug) {
  if (!/^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(slug)) {
    throw new Error("Generated slug is not safe.")
  }
  const root = path.resolve(outDir)
  const file = path.resolve(root, `${slug}.json`)
  if (path.dirname(file) !== root) {
    throw new Error("Published report path escaped the output directory.")
  }
  return file
}
