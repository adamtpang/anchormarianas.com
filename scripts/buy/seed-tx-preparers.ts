import { execFile } from "node:child_process"
import { mkdir, readFile, rm, writeFile } from "node:fs/promises"
import path from "node:path"
import { promisify } from "node:util"
import { parseCsv } from "../../lib/buy/csv"
import { NEW_BRAUNFELS_ZIPS } from "../../lib/buy/radius"
import {
  COMPTROLLER_SOURCE,
  type ComptrollerRow,
  type PtinRow,
  PTIN_ZIP_URL,
  countSeed,
  excludeChains,
  firmsToCsv,
  groupPreparers,
  joinComptroller,
} from "./seed-logic"

const execFileAsync = promisify(execFile)
const OUTPUT = path.join("data", "private", "tx-preparers.csv")
const PAGE = 20000

function arg(name: string): string | null {
  const index = process.argv.indexOf(name)
  if (index === -1) return null
  return process.argv[index + 1] || null
}

function today(): string {
  return new Date().toISOString().slice(0, 10)
}

function cell(row: Record<string, string>, key: string): string {
  return (row[key] || "").trim()
}

async function readPtin(csvPath: string): Promise<{ rows: PtinRow[]; total: number }> {
  const text = new TextDecoder("windows-1252").decode(await readFile(csvPath))
  const table = parseCsv(text)
  const header = (table.rows[0] || []).map((value) => value.trim())
  const index = new Map(header.map((name, position) => [name, position]))
  const at = (row: string[], key: string) => {
    const position = index.get(key)
    return position == null ? "" : (row[position] || "").trim()
  }
  const rows: PtinRow[] = []
  for (const row of table.rows.slice(1)) {
    if (row.every((value) => value.trim() === "")) continue
    rows.push({
      firstName: at(row, "First_NAME"),
      lastName: at(row, "LAST_NAME"),
      dba: at(row, "DBA"),
      city: at(row, "BUS_ADDR_CITY"),
      zip: at(row, "BUS_ADDR_ZIP"),
      phone: at(row, "BUS_PHNE_NBR"),
      website: at(row, "WEBSITE"),
      profession: at(row, "PROFESSION"),
    })
  }
  return { rows, total: rows.length }
}

async function comptrollerPage(zip: string, offset: number): Promise<ComptrollerRow[]> {
  const url = new URL("https://data.texas.gov/resource/9cir-efmm.json")
  url.searchParams.set("$select", "taxpayer_name,taxpayer_zip,sos_charter_date,sos_status_code,right_to_transact_business_code,secretary_of_state_sos_or_coa_file_number")
  url.searchParams.set("$where", `taxpayer_zip like '${zip}%'`)
  url.searchParams.set("$limit", String(PAGE))
  url.searchParams.set("$offset", String(offset))
  const response = await fetch(url)
  if (!response.ok) throw new Error(`Comptroller request failed (${response.status})`)
  const body = (await response.json()) as Record<string, string>[]
  return body.map((row) => ({
    name: cell(row, "taxpayer_name"),
    zip: cell(row, "taxpayer_zip"),
    charterDate: cell(row, "sos_charter_date"),
    sosFile: cell(row, "secretary_of_state_sos_or_coa_file_number"),
    statusCode: cell(row, "sos_status_code"),
    rightToTransact: cell(row, "right_to_transact_business_code"),
  }))
}

async function loadComptroller(zips: readonly string[]): Promise<ComptrollerRow[]> {
  const rows: ComptrollerRow[] = []
  for (const zip of zips) {
    let offset = 0
    for (;;) {
      const page = await comptrollerPage(zip, offset)
      rows.push(...page)
      if (page.length < PAGE) break
      offset += PAGE
    }
  }
  return rows
}

async function main() {
  const outPath = arg("--out") || OUTPUT
  const countsOnly = process.argv.includes("--counts-only")
  const tmp = path.join("/tmp", `ptin-tx-${process.pid}`)
  await mkdir(tmp, { recursive: true })
  const zipPath = path.join(tmp, "foia-texas-extract.zip")
  const response = await fetch(PTIN_ZIP_URL)
  if (!response.ok) throw new Error(`IRS download failed (${response.status})`)
  await writeFile(zipPath, Buffer.from(await response.arrayBuffer()))
  await execFileAsync("unzip", ["-o", zipPath, "-d", tmp])
  const ptin = await readPtin(path.join(tmp, "foia-texas-extract.csv"))
  await rm(tmp, { recursive: true, force: true })

  const grouped = groupPreparers(ptin.rows, NEW_BRAUNFELS_ZIPS)
  let comptrollerRows = 0
  let joined = grouped
  try {
    const entities = await loadComptroller(NEW_BRAUNFELS_ZIPS)
    comptrollerRows = entities.length
    joined = joinComptroller(grouped, entities, today())
  } catch (error) {
    const message = error instanceof Error ? error.message : "Comptroller request failed"
    console.log(`comptroller_error ${message}`)
  }
  const { kept, excluded } = excludeChains(joined)
  const counts = countSeed(kept)
  console.log(`ptin_rows ${ptin.total}`)
  console.log(`zip_rows ${grouped.reduce((sum, firm) => sum + firm.preparerCount, 0)}`)
  console.log(`zip_list ${NEW_BRAUNFELS_ZIPS.join(",")}`)
  console.log(`business_groups ${grouped.length}`)
  console.log(`chains_excluded ${excluded}`)
  console.log(`comptroller_rows ${comptrollerRows}`)
  console.log(`comptroller_source ${COMPTROLLER_SOURCE}`)
  console.log(`output_rows ${counts.outputRows}`)
  console.log(`with_phone ${counts.withPhone}`)
  console.log(`with_cpa_or_ea ${counts.withCpaOrEa}`)
  console.log(`with_charter_date ${counts.withCharterDate}`)
  console.log(`duplicate_name_phone ${counts.duplicateKeys}`)
  if (countsOnly) return
  await mkdir(path.dirname(outPath), { recursive: true })
  await writeFile(outPath, firmsToCsv(kept, new Date().toISOString()))
  console.log(`wrote ${outPath}`)
}

main().catch((error) => {
  console.error(error instanceof Error ? error.message : "Seed failed")
  process.exit(1)
})
