import fs from "node:fs"
import path from "node:path"

export type ReadCard = {
  slug: string
  business: string
  rating?: number
  reviewCount?: number
  headline: string
}

export function parseReadCard(value: unknown): ReadCard | null {
  if (!value || typeof value !== "object") return null

  const read = value as Record<string, unknown>
  const observations = Array.isArray(read.observations) ? read.observations : []
  const firstObservation = observations[0]
  const observationTitle =
    firstObservation && typeof firstObservation === "object"
      ? (firstObservation as Record<string, unknown>).title
      : undefined
  const headline =
    typeof observationTitle === "string"
      ? observationTitle
      : typeof read.summary === "string"
        ? read.summary
        : null

  if (
    typeof read.slug !== "string" ||
    typeof read.business !== "string" ||
    !headline
  ) {
    return null
  }

  return {
    slug: read.slug,
    business: read.business,
    rating: typeof read.rating === "number" ? read.rating : undefined,
    reviewCount:
      typeof read.totalReviewCount === "number"
        ? read.totalReviewCount
        : typeof read.reviewCount === "number"
          ? read.reviewCount
          : undefined,
    headline,
  }
}

export function publishedReads(
  dir = path.join(process.cwd(), "content", "reads")
): ReadCard[] {
  try {
    return fs
      .readdirSync(dir)
      .filter((file) => file.endsWith(".json"))
      .flatMap((file) => {
        try {
          const parsed = JSON.parse(
            fs.readFileSync(path.join(dir, file), "utf8")
          )
          const card = parseReadCard(parsed)
          if (!card) throw new Error("missing required read fields")
          return [card]
        } catch (error) {
          const message = error instanceof Error ? error.message : String(error)
          console.warn(`Skipping invalid published read ${file}: ${message}`)
          return []
        }
      })
      .sort((a, b) => (a.rating ?? 5) - (b.rating ?? 5))
  } catch (error) {
    const message = error instanceof Error ? error.message : String(error)
    console.warn(`Published reads unavailable: ${message}`)
    return []
  }
}
