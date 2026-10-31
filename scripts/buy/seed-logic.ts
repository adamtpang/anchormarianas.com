import { isChainName } from "../../lib/buy/chains"
import { mergeCredentials } from "../../lib/buy/credentials"
import { exportTargetsCsv } from "../../lib/buy/csv"
import { dedupeKey, normalizeName, normalizePhone } from "../../lib/buy/dedupe"
import { cleanHttpUrl, newId, type Target } from "../../lib/buy/model"
import { isInRadius, zip5 } from "../../lib/buy/radius"

export const PTIN_SOURCE = "https://www.irs.gov/tax-professionals/ptin-information-and-the-freedom-of-information-act"
export const COMPTROLLER_SOURCE = "https://data.texas.gov/dataset/Active-Franchise-Taxpayers/9cir-efmm"
export const PTIN_ZIP_URL = "https://www.irs.gov/pub/foia/foia-texas-extract.zip"

export type PtinRow = {
  firstName: string
  lastName: string
  dba: string
  city: string
  zip: string
  phone: string
  website: string
  profession: string
}

export type ComptrollerRow = {
  name: string
  zip: string
  charterDate: string
  sosFile: string
  statusCode: string
  rightToTransact: string
}

export type FirmSeed = {
  name: string
  city: string
  zip: string
  phone: string
  website: string
  preparerCount: number
  credentials: string
  ownerName: string
  charterDate: string
  yearsInBusiness: number | null
  notes: string
  chain: boolean
}

function personName(row: PtinRow): string {
  return [row.firstName, row.lastName].filter(Boolean).join(" ").trim()
}

function websiteUrl(value: string): string {
  const trimmed = value.trim()
  if (!trimmed) return ""
  const withProtocol = /^https?:\/\//i.test(trimmed) ? trimmed : `https://${trimmed}`
  const cleaned = cleanHttpUrl(withProtocol)
  return cleaned === "invalid" ? "" : cleaned || ""
}

function mostCommon(values: string[]): string {
  const counts = new Map<string, number>()
  for (const value of values) {
    if (!value) continue
    counts.set(value, (counts.get(value) || 0) + 1)
  }
  let best = ""
  let bestCount = 0
  for (const [value, count] of counts) {
    if (count > bestCount) {
      best = value
      bestCount = count
    }
  }
  return best
}

export function yearsBetween(charterDate: string, today: string): number | null {
  if (!/^\d{4}-\d{2}-\d{2}$/.test(charterDate) || !/^\d{4}-\d{2}-\d{2}$/.test(today)) return null
  const start = Date.parse(`${charterDate}T00:00:00Z`)
  const end = Date.parse(`${today}T00:00:00Z`)
  if (!Number.isFinite(start) || !Number.isFinite(end) || end < start) return null
  return Math.floor((end - start) / (365.25 * 24 * 60 * 60 * 1000))
}

export function groupPreparers(rows: PtinRow[], zips: readonly string[]): FirmSeed[] {
  const groups = new Map<string, PtinRow[]>()
  for (const row of rows) {
    const zip = zip5(row.zip)
    if (!isInRadius(zip, zips)) continue
    const business = row.dba.trim()
    const person = personName(row)
    const name = business || person
    if (!name) continue
    const key = business
      ? `${normalizeName(business)}|${zip}`
      : `${normalizeName(person)}|${zip}|${normalizePhone(row.phone)}`
    const list = groups.get(key) || []
    list.push({ ...row, zip })
    groups.set(key, list)
  }
  const firms: FirmSeed[] = []
  for (const list of groups.values()) {
    const named = list.find((row) => row.dba.trim())
    const name = (named?.dba || personName(list[0] || { firstName: "", lastName: "", dba: "", city: "", zip: "", phone: "", website: "", profession: "" })).trim()
    if (!name) continue
    const zip = list[0]?.zip || ""
    const ownerName = list.length === 1 ? personName(list[0] || { firstName: "", lastName: "", dba: "", city: "", zip: "", phone: "", website: "", profession: "" }) : ""
    firms.push({
      name,
      city: mostCommon(list.map((row) => row.city.trim())),
      zip,
      phone: mostCommon(list.map((row) => row.phone.trim())),
      website: websiteUrl(mostCommon(list.map((row) => row.website.trim()))),
      preparerCount: list.length,
      credentials: mergeCredentials(list.map((row) => row.profession)),
      ownerName,
      charterDate: "",
      yearsInBusiness: null,
      notes: "Imported from the IRS PTIN FOIA Texas file.",
      chain: isChainName(name),
    })
  }
  return firms
}

function charterDay(value: string): string {
  const day = value.trim().slice(0, 10)
  return /^\d{4}-\d{2}-\d{2}$/.test(day) ? day : ""
}

export function joinComptroller(firms: FirmSeed[], entities: ComptrollerRow[], today: string): FirmSeed[] {
  const index = new Map<string, ComptrollerRow[]>()
  for (const entity of entities) {
    const key = `${normalizeName(entity.name)}|${zip5(entity.zip)}`
    const list = index.get(key) || []
    list.push(entity)
    index.set(key, list)
  }
  return firms.map((firm) => {
    const matches = index.get(`${normalizeName(firm.name)}|${zip5(firm.zip)}`) || []
    const match = [...matches].sort((left, right) => charterDay(left.charterDate).localeCompare(charterDay(right.charterDate)))[0]
    if (!match || !charterDay(match.charterDate)) return firm
    const charterDate = charterDay(match.charterDate)
    const detail = [
      "Comptroller match.",
      `Charter date ${charterDate}.`,
      match.sosFile ? `SOS file ${match.sosFile}.` : "",
      match.statusCode ? `SOS status ${match.statusCode}.` : "",
      match.rightToTransact ? `Right to transact ${match.rightToTransact}.` : "",
    ].filter(Boolean).join(" ")
    return {
      ...firm,
      charterDate,
      yearsInBusiness: yearsBetween(charterDate, today),
      notes: `${firm.notes} ${detail}`,
    }
  })
}

export function excludeChains(firms: FirmSeed[]): { kept: FirmSeed[]; excluded: number } {
  const kept = firms.filter((firm) => !firm.chain)
  return { kept, excluded: firms.length - kept.length }
}

function firmTarget(firm: FirmSeed, now: string): Target {
  return {
    id: newId(),
    name: firm.name,
    industry: "Texas bookkeeping and tax firms",
    city: firm.city,
    website: firm.website,
    phone: firm.phone,
    revenue: null,
    profit: null,
    yearsInBusiness: firm.yearsInBusiness,
    ownerName: firm.ownerName,
    ownerAge: "",
    successor: "unknown",
    sources: {
      name: PTIN_SOURCE,
      city: PTIN_SOURCE,
      phone: firm.phone ? PTIN_SOURCE : undefined,
      website: firm.website ? PTIN_SOURCE : undefined,
      yearsInBusiness: firm.charterDate ? COMPTROLLER_SOURCE : undefined,
    },
    notes: firm.notes,
    status: "New",
    calls: [],
    sample: false,
    zip: firm.zip,
    charterDate: firm.charterDate,
    preparerCount: firm.preparerCount,
    credentials: firm.credentials,
    licensedCpaFirm: "unknown",
    spokeWithOwner: false,
    createdAt: now,
    updatedAt: now,
  }
}

export function firmsToCsv(firms: FirmSeed[], now: string): string {
  return exportTargetsCsv(firms.map((firm) => firmTarget(firm, now)))
}

export function countSeed(firms: FirmSeed[]): {
  outputRows: number
  withPhone: number
  withCpaOrEa: number
  withCharterDate: number
  duplicateKeys: number
} {
  const keys = new Set<string>()
  let duplicateKeys = 0
  let withPhone = 0
  let withCpaOrEa = 0
  let withCharterDate = 0
  for (const firm of firms) {
    const key = dedupeKey(firm.name, firm.phone)
    if (keys.has(key)) duplicateKeys += 1
    keys.add(key)
    if (normalizePhone(firm.phone).length >= 7) withPhone += 1
    if (/\b(CPA|EA)\b/.test(firm.credentials)) withCpaOrEa += 1
    if (firm.charterDate) withCharterDate += 1
  }
  return { outputRows: firms.length, withPhone, withCpaOrEa, withCharterDate, duplicateKeys }
}
