#!/usr/bin/env node
// Guam mega leads list builder. Reads every shard in ./shards, normalizes
// (OSM format or flat directory records), dedupes, cleans, BANT-scores, and
// writes guam-leads.csv + guam-leads.json + guam-leads-summary.md.
//
//   node build.mjs
//
// Honest: it only labels what the data shows. No invented phones or reviews.
// Budget/Authority/Need are heuristics from category + presence signals.
// Timeline is always TBD (it is discovered on a call, not from a directory).

import { readdir, readFile, writeFile, mkdir } from "node:fs/promises"
import path from "node:path"
import { fileURLToPath } from "node:url"

const HERE = path.dirname(fileURLToPath(import.meta.url))
const SHARDS = path.join(HERE, "shards")

// ---- category → normalized type + budget tier + AI-fit ----
const HIGH_BUDGET = /hotel|resort|motel|guest_house|hostel|hospital|clinic|dental|dentist|doctor|medical|health|bank|credit union|insurance|law|lawyer|attorney|real estate|realty|dealer|dealership|contractor|construction|jewel|optic|funeral|marina|golf|college|university|veterin|pharmac|supermarket|department_store|electrical|hvac|plumb|roofing/i
const LOW_BUDGET = /food truck|kiosk|convenience|ice_cream|ice cream|snack|craft|stall|vend/i
const AI_FIT = /restaurant|cafe|coffee|bar|pub|fast_food|food|hair|barber|nail|beauty|salon|spa|clinic|dental|dentist|doctor|veterin|hotel|resort|gym|fitness|plumb|hvac|air condition|electric|contractor|auto|car_repair|repair|tour|dive|clean|landscap|pest/i
const CHAIN = /mcdonald|subway|7[- ]?eleven|kfc|pizza hut|domino|wendy|taco bell|starbucks|burger king|jamba|dunkin|ross|payless|kmart|home depot|napa|jollibee|shirley| palace|circle k|chevron|76 |mobil|shell/i
const GOV = /department of|dept of|government|public health|public school|guam power|guam waterworks|university of guam|bureau of|office of the|federal|municipal|mayor'?s office/i

function budgetTier(cat, name) {
  const s = `${cat} ${name}`
  if (LOW_BUDGET.test(s)) return "Low"
  if (HIGH_BUDGET.test(s)) return "High"
  return "Med"
}
function authority(name) {
  if (GOV.test(name)) return "Gov"
  if (CHAIN.test(name)) return "Chain"
  return "Owner"
}
function needLevel(cat, name, hasWebsite) {
  const fit = AI_FIT.test(`${cat} ${name}`)
  if (!hasWebsite && fit) return "High"
  if (!hasWebsite || fit) return "Med"
  return "Low"
}
const NUM = { High: 3, Med: 2, Low: 1, Owner: 3, Chain: 1, Gov: 0 }

function priority(rec) {
  // Reachability, budget, and need weigh equally; authority is a light tiebreak.
  // A real phone is what separates a HOT (call-it-now) lead from a WARM one.
  const need = NUM[rec.need]
  const bud = NUM[rec.budget]
  const auth = NUM[rec.authority]
  const reach = rec.phone ? 3 : 0
  const raw = reach * 3 + bud * 3 + need * 3 + auth // max = 9+9+9+3 = 30
  return Math.round((raw / 30) * 100)
}

function dec(s) {
  return String(s || "")
    .replace(/&amp;/g, "&")
    .replace(/&#0?39;|&#x27;|&apos;/g, "'")
    .replace(/&quot;/g, '"')
    .replace(/&#0?38;/g, "&")
}
function cleanName(n) {
  return dec(n).replace(/\s+/g, " ").trim()
}
function normKey(n) {
  return cleanName(n)
    .toLowerCase()
    .replace(/["'’.,&()]/g, "")
    .replace(/\b(the|inc|llc|ltd|corp|co|guam|restaurant|store|shop|company)\b/g, "")
    .replace(/\s+/g, " ")
    .trim()
}
function cleanPhone(p) {
  if (!p) return ""
  const d = String(p).replace(/\D/g, "").replace(/^1/, "")
  return d.length === 10 ? `(${d.slice(0, 3)}) ${d.slice(3, 6)}-${d.slice(6)}` : String(p).trim()
}

function fromOsm(json) {
  return (json.elements || [])
    .filter((e) => e.tags && e.tags.name)
    .map((e) => {
      const t = e.tags
      const cat = t.shop || t.amenity || t.office || t.craft || t.tourism || t.leisure || t.healthcare || "other"
      return {
        name: cleanName(t.name),
        category: String(cat).replace(/_/g, " "),
        phone: cleanPhone(t.phone || t["contact:phone"]),
        website: t.website || t["contact:website"] || "",
        village: t["addr:city"] || t["addr:suburb"] || "",
        source: "osm",
      }
    })
}
function fromFlat(arr, src) {
  return (Array.isArray(arr) ? arr : []).filter((r) => r && r.name).map((r) => ({
    name: cleanName(r.name),
    category: dec(r.category || "other").toLowerCase(),
    phone: cleanPhone(r.phone),
    website: r.website || "",
    village: r.village || "",
    source: src || r.source || "directory",
  }))
}

async function loadShards() {
  let files = []
  try {
    files = (await readdir(SHARDS)).filter((f) => f.endsWith(".json"))
  } catch {
    return []
  }
  const recs = []
  for (const f of files) {
    const raw = JSON.parse(await readFile(path.join(SHARDS, f), "utf8"))
    if (raw && Array.isArray(raw.elements)) recs.push(...fromOsm(raw))
    else if (Array.isArray(raw)) recs.push(...fromFlat(raw, f.replace(".json", "")))
    else if (raw && Array.isArray(raw.records)) recs.push(...fromFlat(raw.records, raw.source || f.replace(".json", "")))
    else if (raw && Array.isArray(raw.results)) for (const r of raw.results) recs.push(...fromFlat(r.records, r.source))
  }
  return recs
}

function dedupe(recs) {
  const map = new Map()
  for (const r of recs) {
    const key = normKey(r.name) + "|" + (r.village || "").toLowerCase()
    const prev = map.get(key)
    if (!prev) {
      map.set(key, { ...r, sources: new Set([r.source]) })
    } else {
      prev.phone = prev.phone || r.phone
      prev.website = prev.website || r.website
      prev.village = prev.village || r.village
      if (r.category && r.category !== "other") prev.category = prev.category === "other" ? r.category : prev.category
      prev.sources.add(r.source)
    }
  }
  return [...map.values()].filter((r) => normKey(r.name).length > 1)
}

function score(recs) {
  return recs
    .map((r) => {
      const hasSite = !!r.website
      const rec = {
        name: r.name,
        category: r.category,
        village: r.village,
        phone: r.phone,
        website: r.website,
        budget: budgetTier(r.category, r.name),
        authority: authority(r.name),
        need: needLevel(r.category, r.name, hasSite),
        timeline: "TBD",
        sources: [...r.sources].join("+"),
      }
      rec.priority = priority(rec)
      rec.tier = rec.priority >= 75 ? "HOT" : rec.priority >= 55 ? "WARM" : "COLD"
      return rec
    })
    .sort((a, b) => b.priority - a.priority)
}

function toCsv(recs) {
  const cols = ["priority", "tier", "name", "category", "village", "phone", "website", "budget", "authority", "need", "timeline", "sources"]
  const esc = (v) => `"${String(v ?? "").replace(/"/g, '""')}"`
  return [cols.join(","), ...recs.map((r) => cols.map((c) => esc(r[c])).join(","))].join("\n")
}

function summary(recs, rawCount) {
  const by = (key) => {
    const m = {}
    recs.forEach((r) => (m[r[key]] = (m[r[key]] || 0) + 1))
    return Object.entries(m).sort((a, b) => b[1] - a[1])
  }
  const tiers = by("tier")
  const cats = by("category").slice(0, 12)
  const vills = by("village").filter(([k]) => k).slice(0, 10)
  const noSite = recs.filter((r) => !r.website).length
  const hasPhone = recs.filter((r) => r.phone).length
  const L = []
  L.push("# Guam mega leads list")
  L.push(`Built from ${rawCount} raw records across free sources (OSM + directories), deduped to **${recs.length}** unique businesses. No Apify, no paid data.`)
  L.push("")
  L.push("## BANT priority tiers")
  tiers.forEach(([t, n]) => L.push(`- ${t}: ${n}`))
  L.push("")
  L.push(`## Reachability & need`)
  L.push(`- With a phone number: ${hasPhone}`)
  L.push(`- No website (a website + digital-presence need): ${noSite}`)
  L.push("")
  L.push("## Top categories")
  cats.forEach(([c, n]) => L.push(`- ${c}: ${n}`))
  L.push("")
  L.push("## Top villages")
  vills.forEach(([v, n]) => L.push(`- ${v}: ${n}`))
  L.push("")
  L.push("## Top 15 HOT leads (work these first)")
  recs.filter((r) => r.tier === "HOT").slice(0, 15).forEach((r) =>
    L.push(`- ${r.priority} · ${r.name} (${r.category}${r.village ? ", " + r.village : ""}) ${r.phone || "no phone"} · need ${r.need} · budget ${r.budget}`)
  )
  L.push("")
  L.push("_BANT: Budget and Authority and Need are heuristics from category and presence signals. Timeline is always TBD, it comes from the call. Verify a phone before dialing; never claim a phone is broken unless you called it._")
  return L.join("\n")
}

async function main() {
  const raw = await loadShards()
  if (!raw.length) {
    console.error("No shards found in ./shards. Add osm.json or directory shards first.")
    process.exit(1)
  }
  const deduped = dedupe(raw)
  const scored = score(deduped)
  await mkdir(HERE, { recursive: true })
  await writeFile(path.join(HERE, "guam-leads.json"), JSON.stringify(scored, null, 2), "utf8")
  await writeFile(path.join(HERE, "guam-leads.csv"), toCsv(scored), "utf8")
  await writeFile(path.join(HERE, "guam-leads-summary.md"), summary(scored, raw.length), "utf8")
  const t = scored.reduce((m, r) => ((m[r.tier] = (m[r.tier] || 0) + 1), m), {})
  console.log(`raw ${raw.length} -> deduped ${scored.length} | HOT ${t.HOT || 0} WARM ${t.WARM || 0} COLD ${t.COLD || 0}`)
  console.log(`phone ${scored.filter((r) => r.phone).length} | no-website ${scored.filter((r) => !r.website).length}`)
  console.log("wrote guam-leads.csv, guam-leads.json, guam-leads-summary.md")
}

main().catch((e) => {
  console.error("build failed:", e.message)
  process.exit(1)
})
