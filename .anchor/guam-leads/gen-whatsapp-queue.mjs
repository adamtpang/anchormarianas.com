import { readFile, writeFile } from "node:fs/promises"

// Build the WhatsApp-first send queue from the trades list.
// Adam is off-island: copy must NOT claim "here on Guam". He is FROM Guam.
// Likely-mobile Guam prefixes get priority (landlines rarely have WhatsApp).

const MOBILE = /^\(671\) (48[2-9]|68[6-9]|77[0-9]|78[7-9]|789|79[0-9]|898|92[0-9]|98[0-9]|55[0-9])/
const t = JSON.parse(await readFile(new URL("./_trades.json", import.meta.url), "utf8"))
const wa = (p) => "https://wa.me/" + String(p).replace(/\D/g, "").replace(/^1?/, "1")

const scored = t.map((r) => ({ ...r, mobileLikely: MOBILE.test(r.phone) }))
const queue = [...scored.filter((r) => r.mobileLikely), ...scored.filter((r) => !r.mobileLikely)]

const msg = (name) =>
  `Hi, this is Adam Pangelinan, from Guam. I help island trades get found and stop losing jobs. Quick one: ${name} has no website on your Google listing, and that usually means lost calls when people compare shops. I do a free read on where a business is leaking customers. Want me to run one for ${name}?`

const L = []
L.push(`# WhatsApp send queue · trades · ${queue.length} leads (mobile-likely first)`)
L.push("")
L.push("Adam is OFF-ISLAND: copy says FROM Guam, never 'here on Guam'. WhatsApp works fine over Wi-Fi from anywhere.")
L.push("")
L.push("Rules: DNC-scrub first · 8am-9pm GUAM time (check the offset from where you are) · one-by-one · 5-10 per day max (cold bursts get WhatsApp accounts flagged) · honor any stop · if a number has no WhatsApp account, log it as landline and move on (it becomes a call-later lead).")
L.push("")
L.push("## Queue")
L.push("| # | business | type | phone | mobile? | open chat |")
L.push("|---|---|---|---|---|---|")
queue.forEach((r, i) =>
  L.push(`| ${i + 1} | ${r.name} | ${r.category} | ${r.phone} | ${r.mobileLikely ? "likely" : "landline?"} | ${wa(r.phone)} |`)
)
L.push("")
L.push("## The message (swap the name)")
L.push("> " + msg("[BUSINESS]"))
L.push("")
L.push("## First five, ready to paste")
queue.slice(0, 5).forEach((r, i) => {
  L.push(`### ${i + 1}. ${r.name} · ${wa(r.phone)}`)
  L.push("> " + msg(r.name))
  L.push("")
})
L.push("## Log")
L.push("| business | sent | reply | booked | note |")
L.push("|---|---|---|---|---|")
queue.slice(0, 10).forEach((r) => L.push(`| ${r.name} | | | | |`))

await writeFile(new URL("./whatsapp-queue.md", import.meta.url), L.join("\n") + "\n")
const m = queue.filter((r) => r.mobileLikely).length
console.log(`wrote whatsapp-queue.md · ${queue.length} leads · ${m} mobile-likely first`)
console.log("top 5:", queue.slice(0, 5).map((r) => `${r.name} ${r.phone}`).join(" | "))
