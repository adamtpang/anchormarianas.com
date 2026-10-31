import { createSampleTargets } from "./sample"
import {
  type SourceField,
  type Sources,
  type Target,
  clip,
  cleanHttpUrl,
  newId,
  parseMoney,
  parseYears,
  statusFromText,
  successorFromText,
} from "./model"

export const CSV_COLUMNS = [
  "name",
  "industry",
  "city",
  "website",
  "phone",
  "revenue",
  "profit",
  "years_in_business",
  "owner_name",
  "owner_age",
  "successor",
  "status",
  "notes",
  "source_name",
  "source_industry",
  "source_city",
  "source_website",
  "source_phone",
  "source_revenue",
  "source_profit",
  "source_years_in_business",
  "source_owner_name",
  "source_owner_age",
  "source_successor",
] as const

export type CsvColumn = (typeof CSV_COLUMNS)[number]

export const CSV_COLUMN_HELP: { name: CsvColumn; required: boolean; detail: string }[] = [
  { name: "name", required: true, detail: "Business name." },
  { name: "industry", required: false, detail: "Industry. Starter lists use the three industries named on the target page." },
  { name: "city", required: false, detail: "City or metro." },
  { name: "website", required: false, detail: "https URL, or blank." },
  { name: "phone", required: false, detail: "Phone number. The desk only dials when you tap the link." },
  { name: "revenue", required: false, detail: "Estimated revenue in dollars. Digits, or a $ amount with commas." },
  { name: "profit", required: false, detail: "Estimated profit (SDE or EBITDA) in dollars." },
  { name: "years_in_business", required: false, detail: "Whole number of years." },
  { name: "owner_name", required: false, detail: "Owner name." },
  { name: "owner_age", required: false, detail: "Age, a range such as 60-65, or 60+." },
  { name: "successor", required: false, detail: "yes, no, or unknown. Blank becomes unknown." },
  { name: "status", required: false, detail: "New, Contacted, Talking, Interested, NDA, LOI, or Passed. Blank becomes New." },
  { name: "notes", required: false, detail: "Free notes. Quotes are allowed." },
  { name: "source_name", required: false, detail: "Source URL for the business name." },
  { name: "source_industry", required: false, detail: "Source URL for industry." },
  { name: "source_city", required: false, detail: "Source URL for city." },
  { name: "source_website", required: false, detail: "Source URL for the website." },
  { name: "source_phone", required: false, detail: "Source URL for the phone number." },
  { name: "source_revenue", required: false, detail: "Source URL for revenue." },
  { name: "source_profit", required: false, detail: "Source URL for profit." },
  { name: "source_years_in_business", required: false, detail: "Source URL for years in business." },
  { name: "source_owner_name", required: false, detail: "Source URL for the owner name." },
  { name: "source_owner_age", required: false, detail: "Source URL for owner age." },
  { name: "source_successor", required: false, detail: "Source URL for the successor answer." },
]

const SOURCE_COLUMN: Partial<Record<CsvColumn, SourceField>> = {
  source_name: "name",
  source_industry: "industry",
  source_city: "city",
  source_website: "website",
  source_phone: "phone",
  source_revenue: "revenue",
  source_profit: "profit",
  source_years_in_business: "yearsInBusiness",
  source_owner_name: "ownerName",
  source_owner_age: "ownerAge",
  source_successor: "successor",
}

export type ParsedCsv = {
  rows: string[][]
  startLines: number[]
}

export function parseCsv(text: string): ParsedCsv {
  const input = text.replace(/^\uFEFF/, "").replace(/\r\n/g, "\n").replace(/\r/g, "\n")
  const rows: string[][] = []
  const startLines: number[] = []
  let row: string[] = []
  let cell = ""
  let quoted = false
  let line = 1
  let rowStart = 1
  for (let index = 0; index < input.length; index += 1) {
    const char = input[index]
    if (quoted) {
      if (char === '"') {
        if (input[index + 1] === '"') {
          cell += '"'
          index += 1
          continue
        }
        quoted = false
        continue
      }
      if (char === "\n") line += 1
      cell += char
      continue
    }
    if (char === '"') {
      quoted = true
      continue
    }
    if (char === ",") {
      row.push(cell)
      cell = ""
      continue
    }
    if (char === "\n") {
      row.push(cell)
      rows.push(row)
      startLines.push(rowStart)
      row = []
      cell = ""
      line += 1
      rowStart = line
      continue
    }
    cell += char
  }
  if (cell.length > 0 || row.length > 0) {
    row.push(cell)
    rows.push(row)
    startLines.push(rowStart)
  }
  return { rows, startLines }
}

function headerIndex(header: string[]): Map<string, number> | string {
  const index = new Map<string, number>()
  header.forEach((name, position) => {
    const key = name.trim().toLowerCase().replace(/\s+/g, "_")
    if (!key) return
    if (index.has(key)) return
    index.set(key, position)
  })
  if (!index.has("name")) return "The first row needs a name column."
  return index
}

function cellAt(row: string[], index: Map<string, number>, column: string): string {
  const position = index.get(column)
  if (position == null) return ""
  return row[position] ?? ""
}

export type CsvError = { line: number; message: string }

export type CsvImport = { targets: Target[]; errors: CsvError[] }

const IMPORT_LIMIT = 500

export function importTargetsCsv(text: string, now = new Date().toISOString()): CsvImport {
  const parsed = parseCsv(text)
  const errors: CsvError[] = []
  if (parsed.rows.length === 0) return { targets: [], errors: [{ line: 1, message: "The file is empty." }] }
  const header = headerIndex(parsed.rows[0] ?? [])
  if (typeof header === "string") return { targets: [], errors: [{ line: 1, message: header }] }

  const targets: Target[] = []
  for (let rowIndex = 1; rowIndex < parsed.rows.length; rowIndex += 1) {
    if (targets.length >= IMPORT_LIMIT) {
      errors.push({ line: parsed.startLines[rowIndex] ?? rowIndex + 1, message: `Only the first ${IMPORT_LIMIT} targets are imported.` })
      break
    }
    const row = parsed.rows[rowIndex] ?? []
    const line = parsed.startLines[rowIndex] ?? rowIndex + 1
    if (row.every((value) => value.trim() === "")) continue
    const name = clip(cellAt(row, header, "name"), 160)
    if (!name) {
      errors.push({ line, message: "Name is required." })
      continue
    }
    const website = cleanHttpUrl(cellAt(row, header, "website"))
    if (website === "invalid") {
      errors.push({ line, message: "Website must be an http or https URL." })
      continue
    }
    const revenue = parseMoney(cellAt(row, header, "revenue"))
    const profit = parseMoney(cellAt(row, header, "profit"))
    const years = parseYears(cellAt(row, header, "years_in_business"))
    if (revenue === "invalid" || profit === "invalid" || years === "invalid") {
      errors.push({ line, message: "Revenue, profit, and years must be numbers or blank." })
      continue
    }
    const successor = successorFromText(cellAt(row, header, "successor"))
    if (!successor) {
      errors.push({ line, message: "Successor must be yes, no, unknown, or blank." })
      continue
    }
    const status = statusFromText(cellAt(row, header, "status"))
    if (!status) {
      errors.push({ line, message: "Status must be New, Contacted, Talking, Interested, NDA, LOI, Passed, or blank." })
      continue
    }
    const sources: Sources = {}
    let sourceError = ""
    for (const [column, field] of Object.entries(SOURCE_COLUMN) as [CsvColumn, SourceField][]) {
      const url = cleanHttpUrl(cellAt(row, header, column))
      if (url === "invalid") {
        sourceError = `${column} must be an http or https URL.`
        break
      }
      if (url) sources[field] = url
    }
    if (sourceError) {
      errors.push({ line, message: sourceError })
      continue
    }
    targets.push({
      id: newId(),
      name,
      industry: clip(cellAt(row, header, "industry"), 80),
      city: clip(cellAt(row, header, "city"), 80),
      website: website ?? "",
      phone: clip(cellAt(row, header, "phone"), 40),
      revenue,
      profit,
      yearsInBusiness: years,
      ownerName: clip(cellAt(row, header, "owner_name"), 120),
      ownerAge: clip(cellAt(row, header, "owner_age"), 20),
      successor,
      sources,
      notes: clip(cellAt(row, header, "notes"), 4000),
      status,
      calls: [],
      sample: false,
      createdAt: now,
      updatedAt: now,
    })
  }
  return { targets, errors }
}

function csvCell(value: string): string {
  if (/[",\n\r]/.test(value)) return `"${value.replace(/"/g, '""')}"`
  return value
}

function sourceValue(target: Target, field: SourceField): string {
  return target.sources[field] ?? ""
}

export function exportTargetsCsv(targets: Target[]): string {
  const lines = [CSV_COLUMNS.join(",")]
  for (const target of targets) {
    const values: Record<CsvColumn, string> = {
      name: target.name,
      industry: target.industry,
      city: target.city,
      website: target.website,
      phone: target.phone,
      revenue: target.revenue == null ? "" : String(target.revenue),
      profit: target.profit == null ? "" : String(target.profit),
      years_in_business: target.yearsInBusiness == null ? "" : String(target.yearsInBusiness),
      owner_name: target.ownerName,
      owner_age: target.ownerAge,
      successor: target.successor,
      status: target.status,
      notes: target.notes,
      source_name: sourceValue(target, "name"),
      source_industry: sourceValue(target, "industry"),
      source_city: sourceValue(target, "city"),
      source_website: sourceValue(target, "website"),
      source_phone: sourceValue(target, "phone"),
      source_revenue: sourceValue(target, "revenue"),
      source_profit: sourceValue(target, "profit"),
      source_years_in_business: sourceValue(target, "yearsInBusiness"),
      source_owner_name: sourceValue(target, "ownerName"),
      source_owner_age: sourceValue(target, "ownerAge"),
      source_successor: sourceValue(target, "successor"),
    }
    lines.push(CSV_COLUMNS.map((column) => csvCell(values[column])).join(","))
  }
  return `${lines.join("\n")}\n`
}

export function sampleTargetsCsv(): string {
  return exportTargetsCsv(createSampleTargets("2026-01-01"))
}
