import {
  type CallLog,
  type Sources,
  type Target,
  SOURCE_FIELDS,
  isOutcome,
  isStatus,
  isSuccessor,
} from "./model"

export type DeskLoad =
  | { ok: true; targets: Target[]; fresh: boolean }
  | { ok: false; message: string }

function isRecord(value: unknown): value is Record<string, unknown> {
  return Boolean(value) && typeof value === "object" && !Array.isArray(value)
}

function text(value: unknown, max: number): string | null {
  if (typeof value !== "string") return null
  return value.trim().slice(0, max)
}

function money(value: unknown): number | null | "bad" {
  if (value == null) return null
  if (typeof value !== "number" || !Number.isFinite(value) || value < 0 || value > 1_000_000_000_000) return "bad"
  return Math.round(value)
}

function sanitizeCall(value: unknown): CallLog | null {
  if (!isRecord(value)) return null
  const id = text(value.id, 80)
  const date = text(value.date, 10)
  const outcome = text(value.outcome, 40)
  const notes = text(value.notes, 4000)
  const followUp = text(value.followUp, 10)
  if (!id || !date || !outcome || notes == null || followUp == null) return null
  if (!/^\d{4}-\d{2}-\d{2}$/.test(date)) return null
  if (followUp && !/^\d{4}-\d{2}-\d{2}$/.test(followUp)) return null
  if (!isOutcome(outcome)) return null
  return { id, date, outcome, notes, followUp }
}

function sanitizeSources(value: unknown): Sources | null {
  if (value == null) return {}
  if (!isRecord(value)) return null
  const sources: Sources = {}
  for (const field of SOURCE_FIELDS) {
    const url = value[field]
    if (url == null || url === "") continue
    if (typeof url !== "string" || url.length > 500) return null
    sources[field] = url
  }
  return sources
}

export function sanitizeTarget(value: unknown): Target | null {
  if (!isRecord(value)) return null
  const id = text(value.id, 80)
  const name = text(value.name, 160)
  const industry = text(value.industry, 80)
  const city = text(value.city, 80)
  const website = text(value.website, 500)
  const phone = text(value.phone, 40)
  const ownerName = text(value.ownerName, 120)
  const ownerAge = text(value.ownerAge, 20)
  const successor = text(value.successor, 20)
  const notes = text(value.notes, 4000)
  const status = text(value.status, 20)
  const createdAt = text(value.createdAt, 40)
  const updatedAt = text(value.updatedAt, 40)
  const revenue = money(value.revenue)
  const profit = money(value.profit)
  const years = money(value.yearsInBusiness)
  if (!id || !name || industry == null || city == null || website == null || phone == null) return null
  if (ownerName == null || ownerAge == null || !successor || notes == null || !status) return null
  if (!createdAt || !updatedAt) return null
  if (!isSuccessor(successor) || !isStatus(status)) return null
  if (revenue === "bad" || profit === "bad" || years === "bad") return null
  if (years != null && years > 300) return null
  const sources = sanitizeSources(value.sources)
  if (!sources) return null
  if (!Array.isArray(value.calls)) return null
  const calls = value.calls.map(sanitizeCall).filter((call): call is CallLog => Boolean(call))
  return {
    id,
    name,
    industry,
    city,
    website,
    phone,
    revenue,
    profit,
    yearsInBusiness: years,
    ownerName,
    ownerAge,
    successor,
    sources,
    notes,
    status,
    calls,
    sample: value.sample === true,
    createdAt,
    updatedAt,
  }
}

export function parseDesk(raw: string | null): DeskLoad {
  if (raw == null || raw.trim() === "") return { ok: true, targets: [], fresh: true }
  let data: unknown
  try {
    data = JSON.parse(raw)
  } catch {
    return { ok: false, message: "The saved desk on this device could not be read. It has not been overwritten." }
  }
  if (!isRecord(data) || data.version !== 1 || !Array.isArray(data.targets)) {
    return { ok: false, message: "The saved desk on this device is in an unknown format. It has not been overwritten." }
  }
  const targets = data.targets.map(sanitizeTarget).filter((target): target is Target => Boolean(target))
  return { ok: true, targets, fresh: false }
}

export function serializeDesk(targets: Target[]): string {
  return JSON.stringify({ version: 1, targets })
}
