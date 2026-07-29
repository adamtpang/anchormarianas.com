#!/usr/bin/env node
// Rank Guam verticals as ICPs for AI teaching + paid implementation.
// Different question than the outreach beachhead score: not "who can I reach"
// but "who has AI-absorbable work, can pay for it, decides fast, and lets one
// build be resold across the whole vertical".
//
//   node icp-index.mjs

import { readFile, writeFile } from "node:fs/promises"
import path from "node:path"
import { fileURLToPath } from "node:url"

const HERE = path.dirname(fileURLToPath(import.meta.url))

// Per-vertical judgment inputs, 1 to 5. Documented reasoning, not vibes.
// absorb  = share of daily work that is repetitive language/knowledge work AI can take
// pay     = ability to pay a real implementation price
// decide  = owner-operator decides fast (5) vs committee/corporate (1)
// reuse   = one build resells across the vertical with light edits
// teach   = staff do knowledge work, so paid training/workshops land (vs done-for-you only)
const JUDGMENT = {
  Dental: { absorb: 5, pay: 5, decide: 5, reuse: 5, teach: 4,
    why: "Booking, reminders, recalls, no-show chasing, insurance FAQ. Near-identical across every practice." },
  "Professional Services": { absorb: 5, pay: 5, decide: 4, reuse: 4, teach: 5,
    why: "Law, accounting, insurance, real estate. Intake, drafting, quotes, document Q and A. Staff are knowledge workers who will sit through training." },
  Healthcare: { absorb: 5, pay: 5, decide: 3, reuse: 4, teach: 4,
    why: "Same admin load as dental, bigger budgets, but clinics have more approval layers." },
  "Trades & Home Services": { absorb: 4, pay: 4, decide: 5, reuse: 5, teach: 2,
    why: "Missed calls are lost jobs. Owner answers the phone and decides on the spot. Wants it done, not taught." },
  "Hospitality & Lodging": { absorb: 5, pay: 5, decide: 2, reuse: 3, teach: 3,
    why: "Concierge, booking, multilingual guest questions. Highest value per deal, slowest to reach and approve." },
  "Beauty & Salons": { absorb: 4, pay: 2, decide: 5, reuse: 5, teach: 2,
    why: "Booking friction and unanswered reviews are visible from outside. Small budgets, fast decisions." },
  "Food & Drink": { absorb: 3, pay: 2, decide: 4, reuse: 4, teach: 2,
    why: "Reviews and order questions. Thin margins, high volume, mostly a low-ticket recurring play." },
  Auto: { absorb: 3, pay: 3, decide: 4, reuse: 4, teach: 2,
    why: "Quotes and service scheduling. Middle on every axis." },
  "Tourism & Events": { absorb: 4, pay: 3, decide: 4, reuse: 3, teach: 3,
    why: "Itinerary questions and multilingual inquiries. Seasonal budgets." },
  "Fitness & Leisure": { absorb: 3, pay: 2, decide: 4, reuse: 4, teach: 2,
    why: "Membership questions and scheduling. Low ticket." },
  Retail: { absorb: 2, pay: 2, decide: 4, reuse: 3, teach: 2,
    why: "Inventory and hours questions. Least AI-absorbable of the reachable groups." },
  "Veterinary & Pet": { absorb: 4, pay: 4, decide: 5, reuse: 4, teach: 3,
    why: "Same shape as dental, but only a handful of practices on island." },
  "Education & Childcare": { absorb: 3, pay: 2, decide: 3, reuse: 3, teach: 4,
    why: "Enrollment questions. Tiny sample in the data." },
  Fuel: { absorb: 1, pay: 2, decide: 2, reuse: 2, teach: 1,
    why: "Almost no addressable knowledge work. Corporate-owned." },
  Other: { absorb: 3, pay: 3, decide: 3, reuse: 2, teach: 3,
    why: "Mixed bag, not a coherent ICP." },
}

// Same vertical mapping as verticals.mjs so counts line up.
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
for (const r of all) (groups[vertical(r.category)] ||= []).push(r)

const rows = Object.entries(groups).map(([v, rs]) => {
  const j = JUDGMENT[v] || JUDGMENT.Other
  const n = rs.length
  const reachable = rs.filter((r) => r.phone).length
  const reachPct = Math.round((reachable / n) * 100)
  // Fit is what makes them a good client. Access is whether you can start.
  const fit = j.absorb * 3 + j.pay * 3 + j.decide * 2 + j.reuse * 2 // max 50
  const access = Math.min(reachable, 40) / 40 // saturates: 40 reachable is plenty of runway
  const icp = Math.round(fit * (0.55 + 0.45 * access))
  const model = j.teach >= 4 ? "Teach + implement" : "Implement for them"
  return { v, n, reachable, reachPct, ...j, fit, icp, model }
})
rows.sort((a, b) => b.icp - a.icp)

const L = []
L.push("# Guam ICP index: teaching AI and implementing for a price")
L.push("")
L.push("Different question than the outreach ranking. Not who is easiest to reach, but who has AI-absorbable work, can pay for it, decides fast, and lets one build be resold across the vertical.")
L.push("")
L.push("Score = (absorb x3 + pay x3 + decide x2 + reuse x2) scaled by how many reachable leads exist. Judgment inputs 1 to 5, reasoning on every row.")
L.push("")
L.push("| # | vertical | ICP | leads | reachable | absorb | pay | decide | reuse | sell as |")
L.push("|---|---|---|---|---|---|---|---|---|---|")
rows.forEach((r, i) =>
  L.push(`| ${i + 1} | ${r.v} | **${r.icp}** | ${r.n} | ${r.reachable} (${r.reachPct}%) | ${r.absorb} | ${r.pay} | ${r.decide} | ${r.reuse} | ${r.model} |`)
)
L.push("")
L.push("## Why each ranks where it does")
rows.forEach((r) => L.push(`- **${r.v}** (${r.icp}): ${r.why}`))
L.push("")
L.push("## How to read it")
L.push("- **absorb**: share of their daily work that is repetitive language work AI can take.")
L.push("- **pay**: ability to pay a real implementation price, not just a $150/mo add-on.")
L.push("- **decide**: owner decides on the spot (5) vs layers of approval (1).")
L.push("- **reuse**: one build resells across the vertical with light edits. This is the compounding axis.")
L.push("- **sell as**: verticals whose staff do knowledge work will buy training. Trades and salons want it done for them, not taught.")

const out = L.join("\n") + "\n"
await writeFile(path.join(HERE, "guam-icp-index.md"), out, "utf8")
console.log(out)
