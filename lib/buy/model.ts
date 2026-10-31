// Types for the private acquisition desk. Real owner records never belong in this file.

export const STATUSES = ["New", "Contacted", "Talking", "Interested", "NDA", "LOI", "Passed"] as const
export type Status = (typeof STATUSES)[number]

export const OUTCOMES = ["no answer", "voicemail", "talked", "not selling", "interested", "follow up"] as const
export type Outcome = (typeof OUTCOMES)[number]

export const SUCCESSORS = ["yes", "no", "unknown"] as const
export type Successor = (typeof SUCCESSORS)[number]

export const STARTER_INDUSTRIES = [
  "Texas bookkeeping and tax firms",
  "Commercial insurance agencies",
  "B2B distributors",
] as const

export const SOURCE_FIELDS = [
  "name",
  "industry",
  "city",
  "website",
  "phone",
  "revenue",
  "profit",
  "yearsInBusiness",
  "ownerName",
  "ownerAge",
  "successor",
] as const
export type SourceField = (typeof SOURCE_FIELDS)[number]

export type Sources = Partial<Record<SourceField, string>>

export type CallLog = {
  id: string
  date: string
  outcome: Outcome
  notes: string
  followUp: string
}

export type Target = {
  id: string
  name: string
  industry: string
  city: string
  website: string
  phone: string
  revenue: number | null
  profit: number | null
  yearsInBusiness: number | null
  ownerName: string
  ownerAge: string
  successor: Successor
  sources: Sources
  notes: string
  status: Status
  calls: CallLog[]
  sample: boolean
  createdAt: string
  updatedAt: string
}

export const STORAGE_KEY = "anchor-buy-desk-v1"

export function localToday(now = new Date()): string {
  const year = now.getFullYear()
  const month = String(now.getMonth() + 1).padStart(2, "0")
  const day = String(now.getDate()).padStart(2, "0")
  return `${year}-${month}-${day}`
}

export function shiftDate(today: string, offset: number): string {
  const [year, month, day] = today.split("-").map(Number)
  const date = new Date(year, (month || 1) - 1, day || 1)
  date.setDate(date.getDate() + offset)
  return localToday(date)
}

export function newId(): string {
  return crypto.randomUUID()
}

export function isStatus(value: string): value is Status {
  return (STATUSES as readonly string[]).includes(value)
}

export function isOutcome(value: string): value is Outcome {
  return (OUTCOMES as readonly string[]).includes(value)
}

export function isSuccessor(value: string): value is Successor {
  return (SUCCESSORS as readonly string[]).includes(value)
}

export function statusFromText(value: string): Status | null {
  const key = value.trim().toLowerCase()
  if (!key) return "New"
  return STATUSES.find((status) => status.toLowerCase() === key) ?? null
}

export function successorFromText(value: string): Successor | null {
  const key = value.trim().toLowerCase()
  if (!key) return "unknown"
  return SUCCESSORS.find((item) => item === key) ?? null
}

export function parseMoney(value: string): number | null | "invalid" {
  const trimmed = value.trim()
  if (!trimmed) return null
  const cleaned = trimmed.replace(/[$,\s]/g, "")
  if (!/^\d+(\.\d+)?$/.test(cleaned)) return "invalid"
  const amount = Number(cleaned)
  if (!Number.isFinite(amount) || amount > 1_000_000_000_000) return "invalid"
  return Math.round(amount)
}

export function parseYears(value: string): number | null | "invalid" {
  const trimmed = value.trim()
  if (!trimmed) return null
  if (!/^\d{1,3}$/.test(trimmed)) return "invalid"
  const years = Number(trimmed)
  if (years > 300) return "invalid"
  return years
}

export function cleanHttpUrl(value: string): string | null | "invalid" {
  const trimmed = value.trim()
  if (!trimmed) return ""
  if (trimmed.length > 500) return "invalid"
  try {
    const url = new URL(trimmed)
    if (url.protocol !== "http:" && url.protocol !== "https:") return "invalid"
    return trimmed
  } catch {
    return "invalid"
  }
}

export function formatMoney(value: number | null): string {
  if (value == null) return "Not set"
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    maximumFractionDigits: 0,
  }).format(value)
}

export function telHref(phone: string): string | null {
  const compact = phone.replace(/[^\d+]/g, "")
  const digits = compact.replace(/\D/g, "")
  if (digits.length < 7) return null
  return `tel:${compact}`
}

export function clip(value: string, max: number): string {
  return value.trim().slice(0, max)
}
