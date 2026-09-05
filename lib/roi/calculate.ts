// ROI arithmetic for the Anchor survey.
//
// Design rule that keeps this inside the repository's honesty constraints:
// we never project a saving. Projecting requires an improvement rate ("AI cuts
// no-shows by 30%") that Anchor has not measured, and inventing one is exactly
// what NORTH_STAR.md forbids.
//
// Instead we compute two things, both pure arithmetic on the operator's own
// answers:
//
//   1. Cost of the problem today. Their numbers, multiplied out.
//   2. Break-even. How much the service must recover to pay for itself.
//
// The operator then decides whether that break-even is plausible. That is an
// honest sale and a harder one to argue with, because every figure is theirs.

import type { Answers } from "./survey"

export type Figure = {
  label: string
  /** null means we could not compute it honestly. Never a guess. */
  value: number | null
  unit: "usd-per-month" | "usd-per-year" | "hours-per-month" | "count-per-month"
  /** Exact input ids this came from, so any number can be traced back. */
  derivedFrom: string[]
  /** Plain-language arithmetic, shown to the operator. */
  formula: string
  /** Set when value is null, or when a real caveat applies. */
  note?: string
}

export type ServiceFinding = {
  slug: string
  service: string
  /** The problem named in the operator's own terms. */
  problem: string
  monthlySetup: number
  monthlyRecurring: number
  costOfProblem: Figure[]
  breakEven: Figure | null
  withinBudget: boolean | null
  /** True when the survey shows this service does not apply to them. */
  notApplicable: boolean
  notApplicableReason?: string
}

const n = (a: Answers, id: string): number | null => {
  const v = a[id]
  return typeof v === "number" && Number.isFinite(v) ? v : null
}

const round = (v: number, dp = 2) => Math.round(v * 10 ** dp) / 10 ** dp

// The whole point of this report is that the operator can check the arithmetic
// themselves. So any figure we DISPLAY must be the figure we then MULTIPLY. If
// we show "17.3 no-shows" and quietly multiply by 17.3333, the line reads
// "17.3 x $150 = $2,600" and does not add up on a napkin, which costs more
// trust than the rounding error costs accuracy.
const shown = (v: number, dp = 1) => round(v, dp)

function budgetCheck(a: Answers, monthly: number): boolean | null {
  const b = n(a, "monthlyBudget")
  if (b === null) return null
  return monthly <= b
}

/** AI Review Responder, $150/mo. Time is the whole value, so if they do not
 *  currently reply there is no time to save and we must say so. */
export function reviewResponder(a: Answers): ServiceFinding {
  const recurring = 150
  const reviews = n(a, "reviewsPerMonth")
  const minutes = n(a, "minutesPerReply")
  const rate = n(a, "hourlyValue")

  const figures: Figure[] = []
  let notApplicable = false
  let notApplicableReason: string | undefined

  if (reviews !== null && reviews === 0) {
    notApplicable = true
    notApplicableReason =
      "No reviews are coming in, so there is nothing to reply to yet. Getting reviews is the earlier problem."
  }

  if (!notApplicable && minutes !== null && minutes === 0) {
    // They do not reply at all. There is no time saving. Saying otherwise
    // would be inventing a benefit.
    figures.push({
      label: "Time spent replying today",
      value: 0,
      unit: "hours-per-month",
      derivedFrom: ["minutesPerReply"],
      formula: "You told us you do not reply to reviews today, so there is no time to save.",
      note:
        "The case for this service is not time saved, it is that unanswered reviews are visible to everyone comparing you. That effect is real but Anchor has not measured it, so no number is claimed here.",
    })
  }

  if (!notApplicable && reviews !== null && minutes !== null && minutes > 0) {
    const hours = shown((reviews * minutes) / 60)
    figures.push({
      label: "Time spent replying today",
      value: hours,
      unit: "hours-per-month",
      derivedFrom: ["reviewsPerMonth", "minutesPerReply"],
      formula: `${reviews} reviews x ${minutes} min = ${hours} hours per month`,
    })
    if (rate !== null) {
      const cost = hours * rate
      figures.push({
        label: "What that time costs you",
        value: round(cost),
        unit: "usd-per-month",
        derivedFrom: ["reviewsPerMonth", "minutesPerReply", "hourlyValue"],
        formula: `${hours} hours x $${rate} = $${round(cost)} per month`,
      })
    }
  }

  const costFigure = figures.find((f) => f.unit === "usd-per-month" && f.value !== null)
  const breakEven: Figure | null =
    costFigure && costFigure.value !== null
      ? {
          label: "Break-even",
          value: round(recurring - costFigure.value),
          unit: "usd-per-month",
          derivedFrom: ["reviewsPerMonth", "minutesPerReply", "hourlyValue"],
          formula: `$${recurring} cost minus $${costFigure.value} of your time = $${round(recurring - costFigure.value)} per month`,
          note:
            costFigure.value >= recurring
              ? "Your own time already costs more than the service. It pays for itself on time alone."
              : "This does not pay for itself on time alone. Any further case has to come from reviews you win, which Anchor has not measured.",
        }
      : null

  return {
    slug: "ai-review-responder",
    service: "AI Review Responder",
    problem: "Reviews go unanswered, or answering them eats your week.",
    monthlySetup: 0,
    monthlyRecurring: recurring,
    costOfProblem: figures,
    breakEven,
    withinBudget: budgetCheck(a, recurring),
    notApplicable,
    notApplicableReason,
  }
}

/** AI Appointment Reminders, $300 setup + $200/mo. Break-even framing, because
 *  the improvement rate is unmeasured. */
export function appointmentReminders(a: Answers): ServiceFinding {
  const setup = 300
  const recurring = 200
  const appts = n(a, "appointmentsPerWeek")
  const noShow = n(a, "noShowPercent")
  const value = n(a, "appointmentValue")

  const figures: Figure[] = []
  let notApplicable = false
  let notApplicableReason: string | undefined

  if (noShow !== null && noShow === 0) {
    notApplicable = true
    notApplicableReason =
      "You told us nobody no-shows. There is no leak here to close, so we would not sell you this."
  }

  if (!notApplicable && appts !== null && noShow !== null) {
    const missedPerMonth = shown((appts * 52 / 12) * (noShow / 100))
    figures.push({
      label: "No-shows per month",
      value: missedPerMonth,
      unit: "count-per-month",
      derivedFrom: ["appointmentsPerWeek", "noShowPercent"],
      formula: `${appts} per week x 52 / 12 x ${noShow}% = ${missedPerMonth} per month`,
    })
    if (value !== null) {
      const lost = missedPerMonth * value
      figures.push({
        label: "Revenue walking out the door",
        value: round(lost),
        unit: "usd-per-month",
        derivedFrom: ["appointmentsPerWeek", "noShowPercent", "appointmentValue"],
        formula: `${missedPerMonth} no-shows x $${value} = $${round(lost)} per month`,
      })
    }
  }

  let breakEven: Figure | null = null
  if (!notApplicable && value !== null && value > 0) {
    const needed = recurring / value
    breakEven = {
      label: "Break-even",
      value: round(needed, 2),
      unit: "count-per-month",
      derivedFrom: ["appointmentValue"],
      formula: `$${recurring} per month / $${value} per appointment = ${round(needed, 2)} recovered appointments per month`,
      note:
        "Anchor has not measured how many no-shows reminders recover, so no percentage is claimed. This is the number it has to beat for you to be ahead.",
    }
  }

  return {
    slug: "ai-appointment-reminders",
    service: "AI Appointment Reminders",
    problem: "Booked customers do not turn up, and the slot cannot be resold.",
    monthlySetup: setup,
    monthlyRecurring: recurring,
    costOfProblem: figures,
    breakEven,
    withinBudget: budgetCheck(a, recurring),
    notApplicable,
    notApplicableReason,
  }
}

/** AI Reception Pilot, $5,000 setup + $500/mo. */
export function receptionPilot(a: Answers): ServiceFinding {
  const setup = 5000
  const recurring = 500
  const missed = n(a, "missedCallsPerWeek")
  const conv = n(a, "callToCustomerPercent")
  const value = n(a, "customerValue")

  const figures: Figure[] = []
  let notApplicable = false
  let notApplicableReason: string | undefined

  if (missed !== null && missed === 0) {
    notApplicable = true
    notApplicableReason =
      "You answer every call. There is nothing here for us to fix."
  }

  if (!notApplicable && missed !== null && conv !== null) {
    const lostCustomers = shown((missed * 52 / 12) * (conv / 100))
    figures.push({
      label: "Customers lost to unanswered calls, per month",
      value: lostCustomers,
      unit: "count-per-month",
      derivedFrom: ["missedCallsPerWeek", "callToCustomerPercent"],
      formula: `${missed} missed per week x 52 / 12 x ${conv}% = ${lostCustomers} per month`,
    })
    if (value !== null) {
      const lost = lostCustomers * value
      figures.push({
        label: "What those calls were worth",
        value: round(lost),
        unit: "usd-per-month",
        derivedFrom: ["missedCallsPerWeek", "callToCustomerPercent", "customerValue"],
        formula: `${lostCustomers} customers x $${value} = $${round(lost)} per month`,
      })
    }
  }

  let breakEven: Figure | null = null
  if (!notApplicable && value !== null && value > 0) {
    const needed = recurring / value
    breakEven = {
      label: "Break-even, ongoing",
      value: round(needed, 2),
      unit: "count-per-month",
      derivedFrom: ["customerValue"],
      formula: `$${recurring} per month / $${value} per customer = ${round(needed, 2)} recovered customers per month`,
      note: `The $${setup} setup is separate and is recovered by roughly ${round(setup / value, 1)} customers, one time.`,
    }
  }

  return {
    slug: "ai-reception-pilot",
    service: "AI Reception Pilot",
    problem: "Calls go unanswered and the caller phones the next business.",
    monthlySetup: setup,
    monthlyRecurring: recurring,
    costOfProblem: figures,
    breakEven,
    withinBudget: budgetCheck(a, recurring),
    notApplicable,
    notApplicableReason,
  }
}

export type RoiReport = {
  findings: ServiceFinding[]
  /** Ordered best-fit first: applicable, in budget, largest quantified problem. */
  recommended: ServiceFinding[]
  outOfBudget: ServiceFinding[]
  notApplicable: ServiceFinding[]
  /** Inputs the operator did not give us, so figures that needed them are absent. */
  missingInputs: string[]
}

export function buildRoiReport(a: Answers): RoiReport {
  const findings = [reviewResponder(a), appointmentReminders(a), receptionPilot(a)]

  const quantifiedCost = (f: ServiceFinding) => {
    const usd = f.costOfProblem.find((x) => x.unit === "usd-per-month" && x.value !== null)
    return usd?.value ?? -1
  }

  const applicable = findings.filter((f) => !f.notApplicable)
  const recommended = applicable
    .filter((f) => f.withinBudget !== false)
    .sort((x, y) => quantifiedCost(y) - quantifiedCost(x))
  const outOfBudget = applicable.filter((f) => f.withinBudget === false)
  const notApplicable = findings.filter((f) => f.notApplicable)

  const missingInputs = [
    "hourlyValue",
    "reviewsPerMonth",
    "minutesPerReply",
    "appointmentsPerWeek",
    "noShowPercent",
    "appointmentValue",
    "missedCallsPerWeek",
    "callToCustomerPercent",
    "customerValue",
    "monthlyBudget",
  ].filter((id) => n(a, id) === null)

  return { findings, recommended, outOfBudget, notApplicable, missingInputs }
}
