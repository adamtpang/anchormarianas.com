// The AI readiness survey.
//
// Every question exists to produce ONE number that a later ROI figure is
// computed from. If a question does not feed an arithmetic result, it does not
// belong here, it belongs in the diagnostic conversation.
//
// The governing constraint, from NORTH_STAR.md and the /scan system prompt:
// Anchor never invents ROI, savings, hours, or percentages. This module does
// not break that rule. It computes arithmetic on numbers the operator supplied
// about their own business. "You told us 6 hours a week" is evidence. "AI saves
// businesses 20 hours a month" is not, and never appears here.

export type Unit =
  | "count-per-week"
  | "count-per-month"
  | "minutes"
  | "percent"
  | "usd"
  | "usd-per-hour"

export type SurveyQuestion = {
  id: string
  /** Asked in the operator's language, about their business, not about AI. */
  prompt: string
  unit: Unit
  /** Which service models consume this answer. */
  feeds: string[]
  /** Why we are asking, shown to the operator. Builds trust, prevents padding. */
  why: string
  /** Sanity bounds. Answers outside these are flagged, never silently clamped. */
  min: number
  max: number
}

export const SURVEY: SurveyQuestion[] = [
  {
    id: "hourlyValue",
    prompt:
      "What would you pay someone per hour to take admin work off your plate?",
    unit: "usd-per-hour",
    feeds: ["ai-review-responder", "ai-reception-pilot", "ai-appointment-reminders"],
    why: "Every hour figure below is converted to money at this rate, the one you set.",
    min: 5,
    max: 500,
  },
  {
    id: "reviewsPerMonth",
    prompt: "Roughly how many Google reviews do you get in a month?",
    unit: "count-per-month",
    feeds: ["ai-review-responder"],
    why: "Sets how much replying actually costs you in time.",
    min: 0,
    max: 2000,
  },
  {
    id: "minutesPerReply",
    prompt: "When you reply to a review, how many minutes does it take you?",
    unit: "minutes",
    feeds: ["ai-review-responder"],
    why: "Your number, not an industry average.",
    min: 0,
    max: 120,
  },
  {
    id: "appointmentsPerWeek",
    prompt: "How many appointments or jobs do you book in a normal week?",
    unit: "count-per-week",
    feeds: ["ai-appointment-reminders"],
    why: "The base that no-shows are measured against.",
    min: 0,
    max: 5000,
  },
  {
    id: "noShowPercent",
    prompt: "Out of every 100 booked, how many do not show up?",
    unit: "percent",
    feeds: ["ai-appointment-reminders"],
    why: "This is the leak we would be trying to close.",
    min: 0,
    max: 100,
  },
  {
    id: "appointmentValue",
    prompt: "What is an average appointment or job worth to you in revenue?",
    unit: "usd",
    feeds: ["ai-appointment-reminders"],
    why: "Turns a missed slot into a dollar figure you recognise.",
    min: 0,
    max: 100000,
  },
  {
    id: "missedCallsPerWeek",
    prompt:
      "In a normal week, how many calls come in that nobody is able to answer?",
    unit: "count-per-week",
    feeds: ["ai-reception-pilot"],
    why: "Only you know this. We cannot see it from outside.",
    min: 0,
    max: 5000,
  },
  {
    id: "callToCustomerPercent",
    prompt: "Out of every 100 calls you do answer, how many become a customer?",
    unit: "percent",
    feeds: ["ai-reception-pilot"],
    why: "Applied to missed calls, this is what those calls were worth.",
    min: 0,
    max: 100,
  },
  {
    id: "customerValue",
    prompt: "What is a new customer worth to you, first job or first year?",
    unit: "usd",
    feeds: ["ai-reception-pilot"],
    why: "Your number decides whether any of this is worth doing.",
    min: 0,
    max: 1000000,
  },
]

export const BANT: SurveyQuestion[] = [
  {
    id: "monthlyBudget",
    prompt:
      "If something here clearly paid for itself, what could you spend on it monthly without asking anyone?",
    unit: "usd",
    feeds: ["*"],
    why: "Stops us proposing something you were never going to buy.",
    min: 0,
    max: 100000,
  },
]

export type Answers = Record<string, number>

export type AnswerIssue = {
  id: string
  reason: "missing" | "out-of-range" | "not-a-number"
  detail: string
}

/** Validate answers without ever repairing them. A bad answer blocks the
 *  figure it feeds, it does not get quietly replaced with a guess. */
export function validateAnswers(
  answers: Answers,
  questions: SurveyQuestion[] = [...SURVEY, ...BANT]
): AnswerIssue[] {
  const issues: AnswerIssue[] = []
  for (const q of questions) {
    const raw = answers[q.id]
    if (raw === undefined || raw === null) {
      issues.push({ id: q.id, reason: "missing", detail: `${q.id} was not answered` })
      continue
    }
    if (typeof raw !== "number" || !Number.isFinite(raw)) {
      issues.push({ id: q.id, reason: "not-a-number", detail: `${q.id} is not a finite number` })
      continue
    }
    if (raw < q.min || raw > q.max) {
      issues.push({
        id: q.id,
        reason: "out-of-range",
        detail: `${q.id} = ${raw} is outside the expected ${q.min} to ${q.max}`,
      })
    }
  }
  return issues
}
