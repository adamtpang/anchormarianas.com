import { readFile, writeFile } from "node:fs/promises"

const t = JSON.parse(await readFile(new URL("./_trades.json", import.meta.url), "utf8"))
const wa = (p) => "https://wa.me/" + String(p).replace(/\D/g, "").replace(/^1?/, "1")

const L = []
L.push(`# Trades campaign · Guam · ${t.length} HOT reachable leads`)
L.push("Vertical #1 (highest reachable-quality: 92% have phones, high budget, high need). Booking link: https://cal.com/adamtpang")
L.push("")
L.push("Before sending: DNC-scrub each number at donotcall.gov, send one-by-one by hand, 8am-9pm Guam, confirm it reaches the owner.")
L.push("")
L.push("## The DM (paste, swap in their name)")
L.push("> Hi, I am Adam, a real person here on Guam, not a bot. I run a small studio called Anchor. I help Guam trades get found and stop losing jobs: a simple website if you do not have one, replying to your Google reviews so you rank higher, and catching the calls you miss. Want a free read on [BUSINESS]? No pitch. https://cal.com/adamtpang")
L.push("")
L.push("_Personalized review findings (like the salon DMs) need a review source. Apify is capped now, so use this template today, or raise the Apify limit or use the SerpAPI free tier to arm per-lead findings later._")
L.push("")
L.push("## The list (work top-down)")
L.push("| # | business | type | village | phone | open chat |")
L.push("|---|---|---|---|---|---|")
t.forEach((r, i) => L.push(`| ${i + 1} | ${r.name} | ${r.category} | ${r.village || "?"} | ${r.phone} | ${wa(r.phone)} |`))
L.push("")
L.push("## Log")
L.push("| business | sent | reply | booked |")
L.push("|---|---|---|---|")
t.slice(0, 10).forEach((r) => L.push(`| ${r.name} | | | |`))

await writeFile(new URL("./trades-campaign.md", import.meta.url), L.join("\n") + "\n")
console.log(`wrote trades-campaign.md (${t.length} leads)`)
console.log("top 3:", t.slice(0, 3).map((r) => r.name + " -> " + wa(r.phone)).join(" | "))
