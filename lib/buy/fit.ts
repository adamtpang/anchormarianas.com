// Fit score v0. Change the numbers here. The desk does not learn weights.

import { hasCpaOrEa } from "./credentials"
import { type Target, telHref } from "./model"
import { isInRadius, NEW_BRAUNFELS_ZIPS } from "./radius"

export type FitRules = {
  minTenureYears: number
  minPreparers: number
  maxPreparers: number
  zips: readonly string[]
}

export const DEFAULT_FIT_RULES: FitRules = {
  minTenureYears: 15,
  minPreparers: 2,
  maxPreparers: 10,
  zips: NEW_BRAUNFELS_ZIPS,
}

export type FitResult = {
  score: number
  max: number
  reason: string
}

export function tenureYears(target: Target, today: string): number | null {
  if (/^\d{4}-\d{2}-\d{2}$/.test(target.charterDate) && /^\d{4}-\d{2}-\d{2}$/.test(today)) {
    const start = Date.parse(`${target.charterDate}T00:00:00Z`)
    const end = Date.parse(`${today}T00:00:00Z`)
    if (Number.isFinite(start) && Number.isFinite(end) && end >= start) {
      return Math.floor((end - start) / (365.25 * 24 * 60 * 60 * 1000))
    }
  }
  return target.yearsInBusiness
}

export function fitScore(target: Target, today: string, rules: FitRules = DEFAULT_FIT_RULES): FitResult {
  const hits: string[] = []
  const gaps: string[] = []
  const tenure = tenureYears(target, today)
  if (tenure != null && tenure >= rules.minTenureYears) hits.push(`${tenure} years from charter or years in business`)
  else gaps.push(`tenure under ${rules.minTenureYears} years`)

  if (target.preparerCount != null && target.preparerCount >= rules.minPreparers && target.preparerCount <= rules.maxPreparers) {
    hits.push(`${target.preparerCount} preparers`)
  } else gaps.push(`preparer count outside ${rules.minPreparers} to ${rules.maxPreparers}`)

  if (hasCpaOrEa(target.credentials)) hits.push("CPA or EA present")
  else gaps.push("no CPA or EA on the record")

  if (target.licensedCpaFirm === "yes") gaps.push("licensed CPA firm")
  else hits.push(target.licensedCpaFirm === "no" ? "not a licensed CPA firm" : "licensed CPA firm unknown")

  if (telHref(target.phone)) hits.push("has a phone")
  else gaps.push("no phone")

  if (isInRadius(target.zip, rules.zips)) hits.push("inside the radius")
  else gaps.push("outside the radius")

  const reason = gaps.length === 0
    ? `${hits.join(", ")}.`
    : `${hits.join(", ") || "No rules met"}. Gaps: ${gaps.join(", ")}.`
  return { score: hits.length, max: hits.length + gaps.length, reason }
}
