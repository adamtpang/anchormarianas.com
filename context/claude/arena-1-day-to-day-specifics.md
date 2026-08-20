# Arena #1 day-to-day specifics: what the Guam procurement-capture week actually is

Written 2026-08-13. Purpose: Adam gave a fast "nah" veto on arena #1 (Guam/Pacific
life-critical procurement capture partner, `ARENA_MAP_2026-08-03.md`), but a
life-interview surfaced that the veto wasn't informed: he didn't actually know what
the work would look like day to day. This file answers that directly: a real-world
check on whether the opportunity is live or stale, then a concrete Monday-through-
Sunday narrative of the seven-day test from `ARENA_MAP_2026-08-03.md` / `LIFE_GAME.md`
Level 2 preview. Research and drafting only: no outreach happened while writing this.

## Part 1: is the opportunity actually live right now, or stale/exaggerated?

Checked directly against the arena map's own cited sources plus fresh searches,
2026-08-13.

**Live right now, verified by direct fetch of gmha.org/procurement/:**

- **RFP 008-2026: Security Services.** Issued 8/8/2026. Due 4:00 PM ChST,
  Friday 8/28/2026: **15 days from today, clears the seven-day test's 14-day bar.**
- **RFP 007-2026: Dietary Services.** Same issue date (8/8/2026), same due date
  (8/28/2026).
- Both posted five days ago. This matters more than either RFP individually: GMHA's
  procurement office is actively cycling new solicitations right now, not sitting on
  a stale page. A ledger-builder checking gmha.org/procurement/ today finds fresh
  rows, not historical ones.

**Still open or recently active, from the arena map's original citations:**

- **RFP-CDLO-26-003: Professional Consulting Services for Guam Infrastructure Risk
  Management**, Community Defense Liaison Office, Office of the Governor. Package
  available starting 7/2/2026. This is the exact notice the arena map cited
  (`notices.guam.gov/notice_detail/9240`); it is a real, current, named solicitation
  with a real single point of contact (Joaquin Taitague, joaquin.taitague@guam.gov),
  not an invented example.
- GMHA's own procurement page shows a running FY26 cadence behind it: RFP 006-2026
  (skilled nursing facility lease, closed 8/6), IFB 005-2026, RFP 005-2026, RFP
  001-2026 (Revenue Cycle Management, a healthcare-ops category buyer, not just
  clinical), IFB 001-2026. Five to eight solicitations in under a year from one
  agency alone is a real cadence, not a one-off.

**One direct data point already in hand, from a prior session (2026-08-05):** a
narrower version of exactly this test, the "silver generation" eldercare sub-lane,
was already run for real. See
`C:\Users\adamp\ObsidianVault\projects\silver-generation-guam-ledger.md`: **20
verified ledger entries**, reached honestly in one day across three research passes,
with real named contracts, named contractors (Genesis Tech Corp $402,000, Pacific-Green
Integrated Technology $98,300), named agency contacts (chad.palomo@dphss.guam.gov),
and a live 28-hour-window RFP caught in real time (GMHA RFP 006-2026). Step 2 (select
three) and step 3 (name ten qualified delivery firms, all Hawaii-based, across
SNF/LTC, hospice, senior housing, and renovation) were also completed the same day.
This is direct proof that step 1 of the seven-day test is achievable in a single
sitting: not a hypothesis, an outcome that already happened once, in a narrower
adjacent lane.

**One friction point, honestly noted:** a direct `WebFetch` of
`notices.guam.gov/notices?topic_id=62` returned HTTP 403 (bot-blocked) during this
research pass. `gmha.org/procurement/` fetched cleanly. This means the real Monday
workflow is a human browsing notices.guam.gov in an actual browser tab, plus
`go.opengovguam.com` (a third-party aggregator that mirrors GovGuam bids/RFPs/tenders
by agency, including GHURA) as a second lens: not a script that quietly scrapes it.

**Verdict: not stale, not exaggerated.** The category is actively producing new
solicitations on a roughly monthly cadence from GMHA alone, the specific notice the
arena map cited is still traceable to a real named contact, and the exact seven-day
methodology was already run once, successfully, eight days before this check.

## Part 2: what a real week actually looks like

This follows the seven-day test verbatim from `ARENA_MAP_2026-08-03.md`: build a
ledger of 20 live Guam contracts, select three, name ten qualified delivery firms,
hold three vendor-side problem interviews, win one paid-scope request. The buyer
type per the arena map: mainland/international firms in disaster risk, healthcare
operations, cybersecurity, emergency response, and infrastructure that can deliver
but lack Guam context and a local capture partner.

### Day 1 (Monday): build the ledger. This is a desk day, not a phone day.

Morning: open three tabs: `notices.guam.gov` (browsed live, since it blocks
scripted fetches), `gmha.org/procurement/`, and `go.opengovguam.com` (filtered by
agency: GHURA, GPA, Port Authority, GovGuam general). Also check `sam.gov` filtered
to Guam-located federal awards, since disaster-risk and infrastructure work often
routes through federal contract vehicles even when performed locally.

Work is literal row-by-row logging: for each open solicitation, record agency,
category (disaster risk / healthcare ops / cyber / emergency response /
infrastructure), notice number, deadline, and source URL, exactly like the eldercare
ledger's format (`silver-generation-guam-ledger.md`). Target is 20 entries by end of
day. The 2026-08-05 run shows this is realistic in a single sitting when the search
is systematic rather than opportunistic; most entries came from agency procurement
pages and federal press releases, not cold luck.

By evening: 20 rows exist, each with a real source link. No calls made yet.

### Day 2 (Tuesday): select three, name the firms.

Morning: from the 20, pick three that clear "funded, clear buyer, deadline at least
14 days out": same honest-selection method the eldercare ledger used (it flagged
plainly when a pick didn't fully clear the bar rather than forcing it). Given the
current live set, RFP 008-2026 (Security Services, due 8/28) and RFP-CDLO-26-003
(Infrastructure Risk Management) are both real current candidates for this pass.

Afternoon: for each of the three, name ten qualified mainland or Hawaii-based firms
that could plausibly deliver but likely lack a Guam presence. The method that
already worked: search "[category] government contractor Hawaii" or "[category]
firm island/rural/territory experience," then verify each candidate has no visible
Guam office or listed local partner on their own site. For security services this
means firms with federal/military-adjacent physical-security contracts and Pacific
or island experience; for infrastructure risk management, disaster-recovery and
resilience consulting firms with prior FEMA or territorial-government work. This is
research, not outreach: nobody gets contacted today.

### Day 3 (Wednesday): set up the three problem interviews.

This is the logistical hinge of the week. "Vendor-side budget owner" concretely
means: whoever at each named firm owns business development or capture for
new-market entry: titles like VP of Business Development, Director of Capture,
Director of Government Contracts, or (at smaller firms) the owner/principal
directly. Not the buyer-side agency, and not a generic "info@" inbox.

Logistics: LinkedIn to identify the named person at each of three target firms (not
all ten: three is the test's actual bar), a short, honest opening exactly like the
one already drafted in `call-script-hapi-icon-builders.md`: "researching the
[category] market and drawing comparisons to a live Guam opportunity... not selling
anything, just trying to understand the real operational picture", sent as a
LinkedIn message or a cold email requesting 10-15 minutes. Given a five-day work
week, interviews realistically land Thursday or Friday, or slip into the following
Monday if a contact takes a day or two to respond: the test's seven days should be
read as seven working days of effort, not a guarantee all three calls happen inside
one calendar week.

### Day 4 (Thursday): first interviews, if scheduled; otherwise more outreach.

Interview questions follow the pattern already proven in the HAPI/ICON script:
what's hardest about their current market, where do things actually go wrong, have
they looked at island/territory expansion and what stops them, and what would they
build or fix first if solving their own biggest unmet need today. The close is
always the same, low-pressure ask: would they take a follow-up call if a real Guam
opportunity firms up. That is the actual goal of day 4 and 5: not a hire, not a
sale, keeping a door open with three real named people.

### Day 5 (Friday): remaining interviews, log everything.

Whatever is learned goes into `context/claude/decisions-log.md` under that date:
real pain points named, whether Guam/island expansion interest is real or
nonexistent, whether each firm would take a follow-up. This is not busywork: it is
literally what determines whether step 5 (one paid-scope request) is reachable at
all, and from which firm.

### Day 6-7 (weekend or slip days): close the loop, or don't force it.

Step 5, "win one written request for a paid scope or local teaming conversation," is
not fully in Adam's control: it depends on a real firm's real interest, surfaced
in days 4-5. If a firm shows genuine interest, the ask is direct: would they want a
priced local capture or subcontract scope. If none do inside the seven days, the
honest outcome (matching how the eldercare ledger handled its own gaps) is naming
which firms are worth a second-round follow-up rather than manufacturing a false
close.

## What this week is not

No software gets built. No product gets pitched. The entire week is desk research
plus three honest, low-pressure conversations with named people at real firms. The
closest thing to a "sale" in the whole week is asking whether someone wants a
follow-up call. This is closer to the shape of the eldercare ledger work already
done once (research-heavy, conversation-light, evidence-first) than to a
traditional sales week: worth weighing directly against whether that rhythm is
work Adam actually wants, separate from whether the market itself is real.

## Sources checked this session (2026-08-13)

- [GMHA Procurement](https://www.gmha.org/procurement/): fetched directly,
  confirms RFP 008-2026 and RFP 007-2026 currently open, due 8/28/2026.
- [Government of Guam Public Notices Portal, RFP-CDLO-26-003 detail](https://notices.guam.gov/notice_detail/9240)
  : cited in `ARENA_MAP_2026-08-03.md`, re-confirmed still live via search.
- [Government of Guam Public Notices Portal, notices list](https://notices.guam.gov/notices?topic_id=62)
  : blocked scripted fetch (403); accessible in a real browser.
- [Open GovGuam: Bids, RFPs, and more](https://go.opengovguam.com/bids/bids_list_ghura/ghura)
  : third-party aggregator of GovGuam procurement by agency, useful second source
  for Day 1's ledger build.
- `C:\Users\adamp\ObsidianVault\projects\silver-generation-guam-ledger.md`: the
  already-completed proof that this exact methodology produces a real 20-entry
  ledger in one day.
- `C:\Users\adamp\Aether\anchormarianas.com\context\claude\call-script-hapi-icon-builders.md`
  : the existing, already-drafted template for a vendor-side problem interview
  opening and question set, reused directly in Part 2 above.
