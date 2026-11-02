import { isChainName } from "./chains"
import type { Target } from "./model"

export function normalizeName(value: string): string {
  return value
    .toLowerCase()
    .replace(/&/g, " and ")
    .replace(/[^a-z0-9]+/g, " ")
    .replace(/\b(llc|l l c|inc|incorporated|pllc|p l l c|pc|p c|pa|ltd|limited|company)\b/g, " ")
    .replace(/\s+/g, " ")
    .trim()
}

export function normalizePhone(value: string): string {
  const digits = value.replace(/\D/g, "")
  if (digits.length === 11 && digits.startsWith("1")) return digits.slice(1)
  return digits
}

export function dedupeKey(name: string, phone: string): string {
  return `${normalizeName(name)}|${normalizePhone(phone)}`
}

export type ImportPrep = {
  targets: Target[]
  skippedChains: number
  skippedDuplicates: number
}

export function prepareImport(existing: Target[], incoming: Target[], chains?: readonly string[]): ImportPrep {
  const seen = new Set(existing.map((target) => dedupeKey(target.name, target.phone)))
  const targets: Target[] = []
  let skippedChains = 0
  let skippedDuplicates = 0
  for (const target of incoming) {
    if (isChainName(target.name, chains)) {
      skippedChains += 1
      continue
    }
    const key = dedupeKey(target.name, target.phone)
    if (seen.has(key)) {
      skippedDuplicates += 1
      continue
    }
    seen.add(key)
    targets.push(target)
  }
  return { targets, skippedChains, skippedDuplicates }
}
