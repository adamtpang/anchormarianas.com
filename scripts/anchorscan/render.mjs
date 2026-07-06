#!/usr/bin/env node
// Render an AnchorScan report JSON to a branded Markdown diagnostic.
//   node render.mjs reports/anchorscan/dusit-2026-07-05.json
// Prints Markdown to stdout. Import { renderMarkdown } to reuse.

import { readFile } from "node:fs/promises"

const CONTACT = {
  founder: "Adam Pangelinan",
  company: "Anchor Marianas",
  email: "adam@anchormarianas.com",
  booking: process.env.DISCOVERY_CALL_URL || "https://cal.com/adampang/discovery",
}

export function renderMarkdown(r, date = new Date().toISOString().slice(0, 10)) {
  const L = []
  L.push(`# AnchorScan: ${r.businessName}`)
  L.push("")
  const meta = [r.location || null, date, `${r.reviewsRead ?? 0} reviews read`, r.rating != null ? `${r.rating}/5` : null]
    .filter(Boolean)
    .join("  ·  ")
  L.push(meta)
  L.push("")
  L.push(`Prepared by ${CONTACT.founder}, ${CONTACT.company}.`)
  L.push("")
  L.push("## The short version")
  L.push("")
  L.push(r.businessSummary || "")
  L.push("")
  L.push("## What we noticed")
  L.push("")
  ;(r.observations || []).forEach((o, i) => {
    L.push(`**${i + 1}. ${o.title}**`)
    L.push("")
    L.push(o.detail || "")
    if (o.evidence) L.push(`> "${o.evidence}"`)
    L.push("")
  })
  L.push("## Questions worth answering")
  L.push("")
  ;(r.questions || []).forEach((q) => L.push(`- ${q}`))
  L.push("")
  if (r.focus) {
    L.push("## Where we would start")
    L.push("")
    L.push(r.focus)
    L.push("")
  }
  L.push("---")
  L.push("")
  L.push(`Want to talk it through? Book a free 15-minute call: ${CONTACT.booking}`)
  L.push("")
  L.push(`${CONTACT.founder}  ·  ${CONTACT.email}`)
  L.push("")
  L.push("_Generated from this business's public Google reviews. Diagnostic only, not a guarantee._")
  return L.join("\n")
}

const isMain = process.argv[1]?.endsWith("render.mjs")
if (isMain) {
  const file = process.argv[2]
  if (!file) {
    console.error("Usage: node render.mjs <report.json>")
    process.exit(1)
  }
  const r = JSON.parse(await readFile(file, "utf8"))
  process.stdout.write(renderMarkdown(r) + "\n")
}
