#!/usr/bin/env node
// Roll the 1,067 leads up into verticals and rank them by a BANT beachhead score.
// beachhead = avg priority x reachability weight x volume weight.
// The point: which vertical to attack first.

import { readFile, writeFile } from "node:fs/promises"
import path from "node:path"
import { fileURLToPath } from "node:url"

const HERE = path.dirname(fileURLToPath(import.meta.url))
const NUM = { High: 3, Med: 2, Low: 1, Owner: 3, Chain: 1, Gov: 0 }

// granular category -> vertical bucket
const MAP = [
  [/dentist|dental|orthodont/, "Dental"],
  [/doctor|clinic|medical|hospital|eye|optic|physical|chiro|derma|pediat|health|nursing|obgyn|counsel/, "Healthcare"],
  [/veterin|pet groom|animal/, "Veterinary & Pet"],
  [/restaurant|cafe|coffee|fast.?food|food.?court|diner|bakery|bake|bar\b|pub|grill|bbq|sushi|ramen|pizza|burger|deli|snack|ice.?cream|steak|catering|izakaya|dessert|juice|bubble|donut|nightclub/, "Food & Drink"],
  [/beauty|hair|barber|nail|salon|spa|lash|skin|massage/, "Beauty & Salons"],
  [/contractor|construction|air.?condition|hvac|electric|plumb|roof|carpent|weld|concrete|mason|tile|floor|glass|window|fence|pool|solar|appliance repair|locksmith|paint|handyman|landscap|lawn|pest|clean|janitor|drilling|mechanical|generator|water heater|septic|excavat|sign|security|cctv|tree/, "Trades & Home Services"],
  [/car|auto|tire|motorcycle|boat|vehicle|oil change|body shop/, "Auto"],
  [/insurance|law|lawyer|attorney|account|tax|bookkeep|real estate|realty|financial|advisor|bank|credit union|marketing|web design|it service|print|consult|surveyor|architect|engineer/, "Professional Services"],
  [/hotel|motel|resort|guest_house|guesthouse|hostel|apartment|lodging/, "Hospitality & Lodging"],
  [/gym|fitness|sports|golf|marina|yoga|martial|dive/, "Fitness & Leisure"],
  [/fuel|gas station/, "Fuel"],
  [/attraction|tour|travel|wedding|photograph|event/, "Tourism & Events"],
  [/supermarket|grocer|convenience|department|clothes|shoe|jewel|gift|souvenir|electronic|furniture|hardware|book|florist|flower|pharmac|thrift|store|shop|market|optician/, "Retail"],
  [/child|daycare|kindergarten|driving school|language|education|school/, "Education & Childcare"],
]
const vertical = (cat) => {
  const c = (cat || "").toLowerCase()
  for (const [re, v] of MAP) if (re.test(c)) return v
  return "Other"
}

const all = JSON.parse(await readFile(path.join(HERE, "guam-leads.json"), "utf8"))
const groups = {}
for (const r of all) {
  const v = vertical(r.category)
  ;(groups[v] ||= []).push(r)
}

const rows = Object.entries(groups).map(([v, rs]) => {
  const n = rs.length
  const reach = rs.filter((r) => r.phone).length / n
  const avgScore = rs.reduce((s, r) => s + r.priority, 0) / n
  const avgBud = rs.reduce((s, r) => s + NUM[r.budget], 0) / n
  const avgNeed = rs.reduce((s, r) => s + NUM[r.need], 0) / n
  const hot = rs.filter((r) => r.tier === "HOT").length
  const beachhead = avgScore * (0.5 + 0.5 * reach) * Math.sqrt(n)
  return { v, n, reachPct: Math.round(reach * 100), hot, avgScore: Math.round(avgScore), avgBud: avgBud.toFixed(1), avgNeed: avgNeed.toFixed(1), beachhead: Math.round(beachhead) }
})
rows.sort((a, b) => b.beachhead - a.beachhead)

const L = []
L.push("# Guam verticals, ranked by BANT beachhead score")
L.push("beachhead = avg priority x reachability x sqrt(volume). Higher = attack first.")
L.push("")
L.push("rank | vertical | leads | HOT | phone% | budget | need | avgScore | beachhead")
L.push("---- | -------- | ----- | --- | ------ | ------ | ---- | -------- | ---------")
rows.forEach((r, i) =>
  L.push(`${String(i + 1).padStart(2)} | ${r.v} | ${r.n} | ${r.hot} | ${r.reachPct}% | ${r.avgBud} | ${r.avgNeed} | ${r.avgScore} | ${r.beachhead}`)
)
const out = L.join("\n")
console.log(out)
await writeFile(path.join(HERE, "guam-leads-verticals.md"), out + "\n", "utf8")
