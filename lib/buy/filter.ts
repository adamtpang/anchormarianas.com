import { parseAgeRange } from "./age"
import { fitScore } from "./fit"
import {
  type Status,
  type Successor,
  type Target,
  STATUSES,
  localToday,
  parseMoney,
  parseYears,
} from "./model"

export type TargetSort =
  | "name-asc"
  | "name-desc"
  | "city"
  | "revenue-desc"
  | "profit-desc"
  | "years-desc"
  | "age-desc"
  | "status"
  | "updated-desc"
  | "fit-desc"

export type TargetFilters = {
  query: string
  industry: string
  location: string
  revenueMin: string
  revenueMax: string
  profitMin: string
  profitMax: string
  ageMin: string
  ageMax: string
  successor: "" | Successor
  yearsMin: string
  yearsMax: string
  status: "" | Status
  sort: TargetSort
}

export const DEFAULT_FILTERS: TargetFilters = {
  query: "",
  industry: "",
  location: "",
  revenueMin: "",
  revenueMax: "",
  profitMin: "",
  profitMax: "",
  ageMin: "",
  ageMax: "",
  successor: "",
  yearsMin: "",
  yearsMax: "",
  status: "",
  sort: "name-asc",
}

export const SORT_OPTIONS: { value: TargetSort; label: string }[] = [
  { value: "name-asc", label: "Name, A to Z" },
  { value: "name-desc", label: "Name, Z to A" },
  { value: "city", label: "City" },
  { value: "revenue-desc", label: "Revenue, high to low" },
  { value: "profit-desc", label: "Profit, high to low" },
  { value: "years-desc", label: "Years in business" },
  { value: "age-desc", label: "Owner age, oldest first" },
  { value: "status", label: "Status, pipeline order" },
  { value: "updated-desc", label: "Recently updated" },
  { value: "fit-desc", label: "Fit score, high to low" },
]

type Bound = number | null

function numericBound(value: string): Bound | "invalid" {
  return parseMoney(value)
}

function inRange(value: number | null, min: Bound, max: Bound): boolean {
  if (min == null && max == null) return true
  if (value == null) return false
  if (min != null && value < min) return false
  if (max != null && value > max) return false
  return true
}

function ageMatches(target: Target, minText: string, maxText: string): boolean | "invalid" {
  const min = numericBound(minText)
  const max = numericBound(maxText)
  if (min === "invalid" || max === "invalid") return "invalid"
  if (min == null && max == null) return true
  const age = parseAgeRange(target.ownerAge)
  if (!age) return false
  const low = min ?? 0
  const high = max ?? 200
  return age.max >= low && age.min <= high
}

function compareNumbers(left: number | null, right: number | null, direction: "asc" | "desc"): number {
  if (left == null && right == null) return 0
  if (left == null) return 1
  if (right == null) return -1
  return direction === "asc" ? left - right : right - left
}

function compareTargets(left: Target, right: Target, sort: TargetSort): number {
  const byName = left.name.localeCompare(right.name) || left.id.localeCompare(right.id)
  if (sort === "name-asc") return byName
  if (sort === "name-desc") return right.name.localeCompare(left.name) || left.id.localeCompare(right.id)
  if (sort === "city") return left.city.localeCompare(right.city) || byName
  if (sort === "revenue-desc") return compareNumbers(left.revenue, right.revenue, "desc") || byName
  if (sort === "profit-desc") return compareNumbers(left.profit, right.profit, "desc") || byName
  if (sort === "years-desc") return compareNumbers(left.yearsInBusiness, right.yearsInBusiness, "desc") || byName
  if (sort === "age-desc") {
    const leftAge = parseAgeRange(left.ownerAge)?.max ?? null
    const rightAge = parseAgeRange(right.ownerAge)?.max ?? null
    return compareNumbers(leftAge, rightAge, "desc") || byName
  }
  if (sort === "status") {
    return STATUSES.indexOf(left.status) - STATUSES.indexOf(right.status) || byName
  }
  if (sort === "fit-desc") {
    const today = localToday()
    return fitScore(right, today).score - fitScore(left, today).score || byName
  }
  return right.updatedAt.localeCompare(left.updatedAt) || byName
}

export function applyFilters(
  targets: Target[],
  filters: TargetFilters,
): { targets: Target[]; problems: string[] } {
  const problems: string[] = []
  const revenueMin = numericBound(filters.revenueMin)
  const revenueMax = numericBound(filters.revenueMax)
  const profitMin = numericBound(filters.profitMin)
  const profitMax = numericBound(filters.profitMax)
  const yearsMin = parseYears(filters.yearsMin)
  const yearsMax = parseYears(filters.yearsMax)
  if (revenueMin === "invalid" || revenueMax === "invalid") problems.push("Revenue filters must be numbers.")
  if (profitMin === "invalid" || profitMax === "invalid") problems.push("Profit filters must be numbers.")
  if (yearsMin === "invalid" || yearsMax === "invalid") problems.push("Years filters must be whole numbers.")

  const query = filters.query.trim().toLowerCase()
  const location = filters.location.trim().toLowerCase()
  const filtered = targets.filter((target) => {
    if (query && !`${target.name} ${target.ownerName}`.toLowerCase().includes(query)) return false
    if (filters.industry && target.industry !== filters.industry) return false
    if (location && !target.city.toLowerCase().includes(location)) return false
    if (filters.successor && target.successor !== filters.successor) return false
    if (filters.status && target.status !== filters.status) return false
    if (revenueMin === "invalid" || revenueMax === "invalid") return false
    if (profitMin === "invalid" || profitMax === "invalid") return false
    if (yearsMin === "invalid" || yearsMax === "invalid") return false
    if (!inRange(target.revenue, revenueMin, revenueMax)) return false
    if (!inRange(target.profit, profitMin, profitMax)) return false
    if (!inRange(target.yearsInBusiness, yearsMin, yearsMax)) return false
    const age = ageMatches(target, filters.ageMin, filters.ageMax)
    if (age === "invalid") return false
    return age
  })

  const ageMin = numericBound(filters.ageMin)
  const ageMax = numericBound(filters.ageMax)
  if (ageMin === "invalid" || ageMax === "invalid") problems.push("Owner age filters must be numbers.")

  return {
    problems,
    targets: [...filtered].sort((left, right) => compareTargets(left, right, filters.sort)),
  }
}

export function industryOptions(targets: Target[]): string[] {
  const found = new Set<string>(targets.map((target) => target.industry).filter(Boolean))
  return [...found].sort((left, right) => left.localeCompare(right))
}
