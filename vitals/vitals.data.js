// vitals.data.js — Anchor Marianas company OS.
// Populated 2026-07 from the repo + strategy work. Every field is optional.
// PRIVACY: finance numbers below are PLACEHOLDERS. Replace with your real cash
// and burn before trusting the runway readout. This file is gitignored.
// Update by opening a Claude session in this repo and saying "interview me",
// "log this week", "set MRR to N", "check off <milestone>", or "add a decision".

window.VITALS = {
  company: "Anchor Marianas",
  tagline: "The AI layer of your business. We ship.",
  mission: "Bring practical AI to Marianas SMBs so they are not left behind by the AI wave.",
  problem: "Guam and Marianas small businesses run on manual, repetitive work. They lose customers to missed calls, unanswered reviews, and no real web presence, and they cannot tell good AI vendors from snake oil.",
  northStar: "Recurring revenue from AI services (MRR). Winning = a durable book of Guam SMBs paying every month.",

  // The knowledge base IS the codebase. Linked relative to /vitals as ../<file>.
  knowledgeBase: [
    { file: "content/site.json", desc: "Company facts, offer, contact (source of truth)" },
    { file: "context/cofounder/business-brief.md", desc: "Business brief (Cofounder lane)" },
    { file: "context/claude/decisions-log.md", desc: "Technical + strategy decisions (Claude lane)" },
    { file: "context/claude/implementation-notes.md", desc: "Stack, deployment, AnchorScan notes" },
    { file: "app/api/scan/route.ts", desc: "AnchorScan diagnostic (live tool)" },
  ],

  // PLACEHOLDER finances. Replace income (monthly), expenses (monthly burn),
  // savings (cash on hand) with your real numbers. Runway is computed from these.
  finances: { income: 0, expenses: 0, savings: 0 },

  // Inputs you control. value = what is, target = what should be, next = the one
  // action to close the gap. key = which history field charts it.
  metrics: [
    { label: "Paying AI clients", value: 0, target: 3, hint: "first goal: 3", key: "clients", next: "Send today's outbound to Guam hospitality + trades" },
    { label: "MRR ($/mo)", value: 0, target: 297, hint: "target = cover tooling (durable break-even)", key: "mrr", next: "Close 1 Website Care at the $50 founding rate" },
    { label: "Outbound touches / week", value: 0, target: 100, hint: "Hormozi volume rule, manual + DNC-clean", key: "outbound", next: "Text 20 owners by hand, 8am-9pm Guam" },
    { label: "Free sites + scans shipped", value: 0, hint: "cumulative", key: "assets", next: "Build 5 real one-page sites + scans today" },
  ],

  charts: [
    { label: "MRR growth", key: "mrr", color: "var(--amber)" },
    { label: "Cash on hand", key: "savings", color: "var(--green)" },
  ],

  streak: 0,
  history: [], // Claude appends weekly: { t: "Jul 4", mrr: 0, clients: 0, savings: 0, outbound: 0, assets: 0 }

  goals: [
    { text: "First 3 paying AI clients", done: false },
    { text: "AI Reception Pilot live for 1 Guam hospitality client", done: false },
    { text: "Recurring base covers tooling cost (durable break-even)", done: false },
  ],

  products: [
    { name: "AnchorScan (reviews + site diagnostic)", status: "Live" },
    { name: "AI Reception Pilot ($5K + $500/mo, 7-day)", status: "Building" },
    { name: "Free site + scan foot-in-the-door (Guam GTM)", status: "Next" },
    { name: "Website Care $50-75/mo + Review Responder $150/mo", status: "Next" },
    { name: "Poor Adam's Almanack / Holdings", status: "Later" },
  ],

  // Gated roadmap. Check items off (done: true) to level up.
  roadmap: [
    { stage: "0 · Foundation", items: [
      { label: "AnchorScan shipped diagnostic (PR #21)", done: true },
      { label: "Design-system skill + type scale shipped (PR #20)", done: true },
      { label: "Deployment + CI settled (existing Vercel on main)", done: true },
      { label: "Confirm Stripe/Delaware entity so you can take money", done: false },
    ] },
    { stage: "1 · First dollar", items: [
      { label: "Build slug-based multi-tenant site template", done: false },
      { label: "Ship 10 free sites + scans to real Guam targets", done: false },
      { label: "First Website Care client ($50/mo founding)", done: false },
      { label: "First paying AI client", done: false },
    ] },
    { stage: "2 · Durable", items: [
      { label: "MRR covers tooling cost (GHL $297/mo)", done: false },
      { label: "First AI Reception Pilot close ($5K + $500/mo)", done: false },
      { label: "3 paying AI clients", done: false },
    ] },
  ],

  org: [
    { fn: "Build / engineering", now: "Adam", next: "Delivery bench (Leon Shimizu bootcamp juniors)" },
    { fn: "Sales / outbound", now: "Adam", next: "First revshare sales partner" },
    { fn: "Delivery capacity", now: "Adam", next: "Co-delivery partner (test one joint deal first)" },
  ],

  // Capture the WHY so it is never lost.
  decisions: [
    { date: "2026-06-02", decision: "AnchorScan is diagnostic, not prescriptive", why: "Demand-led discovery. Surface patterns + questions, no invented dollar figures. Matches Cofounder's call.", revisit: "If diagnostic-only underconverts to discovery calls" },
    { date: "2026-06-01", decision: "Deployment of record = existing Vercel anchormarianas.com on main", why: "Adam: use the existing one. Dropped the cofounder.co / anchor-bbb827 migration.", revisit: "If Cofounder stands up a managed project worth migrating to" },
    { date: "2026-06", decision: "Lead the AI-services push with the AI Reception Pilot wedge", why: "Highest-EV underserved play for Pacific hospitality (leaderboard score 208).", revisit: "After 10 discovery calls if a different pain converts better" },
    { date: "2026-06", decision: "Guam GTM = free site + free scan foot-in-the-door, upsell to AI", why: "Kerner model fused with AnchorScan. Recurring base + AI upsell, honest and local. Geographic moat.", revisit: "If manual outbound cannot fill the pipeline" },
    { date: "2026-06", decision: "Pursue Leon Shimizu low-stakes (coffee, then one revshare deal)", why: "Fills Anchor's capacity + social-proof gaps, but he is a direct competitor today.", revisit: "After one successful joint deal, consider a formal structure" },
  ],
};
