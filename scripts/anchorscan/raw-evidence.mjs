import { readFile } from "node:fs/promises"
import path from "node:path"
import {
  businessLocationMatches,
  businessNameMatchScore,
} from "./fetch-reviews.mjs"

export const RAW_SCHEMA_VERSION = 1
export const RAW_FRESHNESS_MS = 1000 * 60 * 60 * 24 * 30

export async function rawEvidence(file, now = Date.now()) {
  const value = JSON.parse(await readFile(path.resolve(file), "utf8"))
  const fetchedAt = Date.parse(value?.fetchedAt)
  if (
    value?.schemaVersion !== RAW_SCHEMA_VERSION ||
    value?.status !== "complete" ||
    !value.business ||
    !Array.isArray(value.reviews) ||
    !value.reviews.length ||
    !Number.isFinite(fetchedAt) ||
    now - fetchedAt < 0 ||
    now - fetchedAt > RAW_FRESHNESS_MS
  ) {
    throw new Error(
      "Raw evidence is incomplete, stale, or uses an unsupported schema."
    )
  }

  const expectedName = value.lead?.name || value.requested?.name
  if (
    !expectedName ||
    businessNameMatchScore(expectedName, value.business.name) < 0.8
  ) {
    throw new Error("Raw evidence business identity does not match its lead.")
  }
  if (
    value.requested?.location &&
    !businessLocationMatches(
      value.requested.location,
      value.business.location
    )
  ) {
    throw new Error("Raw evidence location does not match its request.")
  }

  return {
    fetched: { business: value.business, reviews: value.reviews },
    slug: value.lead?.slug,
  }
}
