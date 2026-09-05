// Renders the full Anchor report: what we read, what it costs them, what we
// would do, what it costs, and what it has to beat.
//
// This is the artifact NORTH_STAR.md rung 3 asks for. Every row must carry its
// source, so the report is built from exactly two inputs and nothing else:
//
//   1. A published AnchorScan read (evidence from their public reviews)
//   2. Their own survey answers (evidence from them)
//
// If a section has no evidence behind it, the section says so instead of
// filling the space.

import { buildRoiReport, type ServiceFinding } from "./calculate"
import type { Answers } from "./survey"

export type ScanRead = {
  business: string
  location?: string
  rating?: number
  reviewCount?: number
  generatedAt: string
  source?: string
  summary: string
  observations: { title: string; detail: string; evidence?: string }[]
  questions?: string[]
  focus?: string
}

export type ReportInput = {
  read?: ScanRead
  answers: Answers
  /** Set only when a human has checked every row. Gates the send. */
  humanChecked?: boolean
  preparedBy?: string
  preparedOn?: string
}

const money = (v: number) =>
  `$${v.toLocaleString("en-US", { maximumFractionDigits: 2 })}`

function findingBlock(f: ServiceFinding): string[] {
  const L: string[] = []
  const setup = f.monthlySetup ? ` plus ${money(f.monthlySetup)} one-time setup` : ""
  L.push(`### ${f.service}`)
  L.push("")
  L.push(`**The problem:** ${f.problem}`)
  L.push("")
  if (f.costOfProblem.length) {
    L.push("**What it is costing you today, from your own answers:**")
    L.push("")
    for (const c of f.costOfProblem) {
      L.push(`- ${c.label}: ${c.formula}`)
      if (c.note) L.push(`  - ${c.note}`)
    }
    L.push("")
  } else {
    L.push("_You did not answer the questions this would be calculated from, so no figure is shown here rather than an estimated one._")
    L.push("")
  }
  L.push(`**What it costs:** ${money(f.monthlyRecurring)} per month${setup}.`)
  L.push("")
  if (f.breakEven) {
    L.push(`**What it has to beat:** ${f.breakEven.formula}`)
    if (f.breakEven.note) {
      L.push("")
      L.push(`_${f.breakEven.note}_`)
    }
    L.push("")
  }
  return L
}

export function renderReport(input: ReportInput): string {
  const { read, answers } = input
  const roi = buildRoiReport(answers)
  const L: string[] = []

  const name = read?.business ?? "your business"
  L.push(`# What your customers and your numbers say about ${name}`)
  L.push("")

  const meta = [
    read?.location,
    input.preparedOn,
    read?.reviewCount != null ? `${read.reviewCount} reviews read` : null,
    read?.rating != null ? `${read.rating}/5` : null,
  ].filter(Boolean)
  if (meta.length) {
    L.push(meta.join("  ·  "))
    L.push("")
  }
  L.push(`Prepared by ${input.preparedBy ?? "Adam Pangelinan, Anchor Marianas"}.`)
  L.push("")

  if (!input.humanChecked) {
    L.push("> DRAFT. Not checked by a human yet. Do not send.")
    L.push("")
  }

  // 1. The evidence we read
  if (read) {
    L.push("## 1. What we read")
    L.push("")
    L.push(read.summary)
    L.push("")
    read.observations.forEach((o, i) => {
      L.push(`**${i + 1}. ${o.title}**`)
      L.push("")
      L.push(o.detail)
      if (o.evidence) {
        L.push("")
        L.push(`> ${o.evidence}`)
      }
      L.push("")
    })
    if (read.source) {
      L.push(`_Source: ${read.source}. Every line above is quoted from your own public reviews._`)
      L.push("")
    }
  } else {
    L.push("## 1. What we read")
    L.push("")
    L.push("_No review scan has been run for this business yet, so this section is empty rather than filled with assumptions._")
    L.push("")
  }

  // 2. What it costs, from their own numbers
  L.push("## 2. What it is costing you")
  L.push("")
  L.push(
    "Every number in this section comes from an answer you gave us about your own business. We do not use industry averages, and we do not estimate what we have not measured."
  )
  L.push("")

  if (roi.recommended.length === 0 && roi.outOfBudget.length === 0) {
    L.push("_Not enough answers yet to calculate anything honestly._")
    L.push("")
  }

  for (const f of roi.recommended) L.push(...findingBlock(f))

  // 3. What we would not sell them
  if (roi.notApplicable.length || roi.outOfBudget.length) {
    L.push("## 3. What we would not sell you")
    L.push("")
    for (const f of roi.notApplicable) {
      L.push(`- **${f.service}:** ${f.notApplicableReason}`)
    }
    for (const f of roi.outOfBudget) {
      L.push(
        `- **${f.service}:** ${money(f.monthlyRecurring)} per month is above the budget you told us, so we are not proposing it.`
      )
    }
    L.push("")
  }

  // 4. Open questions
  if (read?.questions?.length) {
    L.push("## 4. Questions worth answering")
    L.push("")
    for (const q of read.questions) L.push(`- ${q}`)
    L.push("")
  }

  // 5. Honest gaps
  if (roi.missingInputs.length) {
    L.push("## 5. What we could not calculate")
    L.push("")
    L.push(
      `These were not answered, so anything that depended on them is absent above rather than estimated: ${roi.missingInputs.join(", ")}.`
    )
    L.push("")
  }

  L.push("---")
  L.push("")
  if (read?.focus) {
    L.push(`**Where we would start:** ${read.focus}`)
    L.push("")
  }
  L.push("If the numbers above look wrong, tell us and we will correct them. If they look right, the next step is a 15-minute call to scope the smallest version.")
  L.push("")
  L.push("_Diagnostic only. No outcome is guaranteed. Anchor has not measured how much any of these services improve these numbers, which is why this report states what each one has to beat rather than what it will deliver._")

  return L.join("\n")
}
