import { BANT, SURVEY, validateAnswers, type Answers } from "./survey"

export const workflows = {
	reviews: {
		label: "Replying to reviews",
		ids: ["hourlyValue", "reviewsPerMonth", "minutesPerReply"],
	},
	appointments: {
		label: "Missed appointments",
		ids: ["appointmentsPerWeek", "noShowPercent", "appointmentValue"],
	},
	calls: {
		label: "Unanswered calls",
		ids: ["missedCallsPerWeek", "callToCustomerPercent", "customerValue"],
	},
	other: { label: "Something else", ids: [] },
} as const
export type Workflow = keyof typeof workflows
export type Intake = {
	business: string
	website: string
	problem: string
	timing: string
	workflow: Workflow
	answers: Answers
}
export const emptyIntake: Intake = {
	business: "",
	website: "",
	problem: "",
	timing: "Exploring",
	workflow: "other",
	answers: {},
}
export const questionSet = [...SURVEY, ...BANT]
export const questionsFor = (workflow: Workflow) =>
	questionSet.filter(
		(q) =>
			q.id === "monthlyBudget" ||
			(workflows[workflow].ids as readonly string[]).includes(q.id),
	)
export type Estimate = {
	label: string
	value: number
	unit: string
	formula: string
	limitation: string
}
const round = (n: number) => Math.round(n * 100) / 100

/** Descriptive estimates only. No inferred recovery rate, product recommendation, or ROI. */
export function intakeEstimate(intake: Intake): Estimate | null {
	const ids = workflows[intake.workflow].ids as readonly string[]
	if (!ids.length) return null
	const issues = validateAnswers(intake.answers)
	if (ids.some((id) => issues.some((issue) => issue.id === id))) return null
	const a = intake.answers
	if (intake.workflow === "reviews") {
		const hours = round((a.reviewsPerMonth * a.minutesPerReply) / 60)
		return {
			label: "Monthly value of reply time",
			value: round(
				((a.reviewsPerMonth * a.minutesPerReply) / 60) * a.hourlyValue,
			),
			unit: "USD / month",
			formula: `${a.reviewsPerMonth} reviews × ${a.minutesPerReply} minutes ÷ 60 ≈ ${hours} hours. Multiply by $${a.hourlyValue}/hour before rounding.`,
			limitation:
				"This values your current time at the rate you entered. It is not a cash expense or a promise that all of that time can be saved.",
		}
	}
	if (intake.workflow === "appointments") {
		const count = round(
			(((a.appointmentsPerWeek * 52) / 12) * a.noShowPercent) / 100,
		)
		return {
			label: "Revenue associated with no-shows",
			value: round(
				((((a.appointmentsPerWeek * 52) / 12) * a.noShowPercent) / 100) *
					a.appointmentValue,
			),
			unit: "USD / month",
			formula: `${a.appointmentsPerWeek} appointments/week × 52 ÷ 12 × ${a.noShowPercent}% ≈ ${count} no-shows/month. Multiply by $${a.appointmentValue}/appointment before rounding.`,
			limitation:
				"This assumes missed slots are not resold and no cancellation revenue is collected. It is gross revenue exposure, not lost profit or recoverable revenue.",
		}
	}
	const count = round(
		(((a.missedCallsPerWeek * 52) / 12) * a.callToCustomerPercent) / 100,
	)
	return {
		label: "Possible first-job revenue",
		value: round(
			((((a.missedCallsPerWeek * 52) / 12) * a.callToCustomerPercent) / 100) *
				a.customerValue,
		),
		unit: "USD / month",
		formula: `${a.missedCallsPerWeek} missed calls/week × 52 ÷ 12 × ${a.callToCustomerPercent}% ≈ ${count} possible customers/month. Multiply by $${a.customerValue}/first job before rounding.`,
		limitation:
			"Scenario only: assumes missed calls convert like answered calls and callers do not reconnect. Duplicate calls and existing customers can overstate it. This is not measured lost revenue or profit.",
	}
}

export function intakeSummary(intake: Intake): string {
	const estimate = intakeEstimate(intake)
	return [
		"Anchor Marianas | Business brief",
		"",
		`Business: ${intake.business.trim() || "Not provided"}`,
		`Website: ${intake.website.trim() || "Not provided"}`,
		`Focus: ${workflows[intake.workflow].label}`,
		`Timing: ${intake.timing}`,
		"",
		"What needs to change:",
		intake.problem.trim() || "Not provided",
		"",
		"Owner-provided numbers:",
		...questionsFor(intake.workflow).map((q) => {
			const invalid = validateAnswers(intake.answers).some(
				(issue) => issue.id === q.id,
			)
			return `${q.prompt} ${invalid ? "Unknown or invalid" : `${intake.answers[q.id]} (${q.unit})`}`
		}),
		"",
		...(estimate
			? [
					`${estimate.label}: $${estimate.value.toLocaleString("en-US")} ${estimate.unit}`,
					estimate.formula,
					estimate.limitation,
				]
			: ["No estimate: the relevant numbers are not complete."]),
		"",
		"No price, ROI, savings, or implementation result is promised. Review the existing tools and confirm the problem before choosing work.",
		"This brief has not been sent to Anchor. Share it yourself if you want a review.",
	].join("\n")
}

/** Accept only our versioned, bounded draft. Unknown keys never enter the form. */
export function parseDraft(raw: string): Intake | null {
	try {
		const d = JSON.parse(raw)
		if (d.version !== 1 || !d.intake || typeof d.intake !== "object")
			return null
		const x = d.intake
		if (!Object.prototype.hasOwnProperty.call(workflows, x.workflow))
			return null
		if (
			![x.business, x.website, x.problem, x.timing].every(
				(v) => typeof v === "string",
			)
		)
			return null
		if (
			x.business.length > 120 ||
			x.website.length > 300 ||
			x.problem.length > 1500 ||
			x.timing.length > 80
		)
			return null
		const answers: Answers = {}
		for (const q of questionSet) {
			const value = x.answers?.[q.id]
			if (
				typeof value === "number" &&
				Number.isFinite(value) &&
				value >= q.min &&
				value <= q.max
			)
				answers[q.id] = value
		}
		return {
			business: x.business,
			website: x.website,
			problem: x.problem,
			timing: x.timing,
			workflow: x.workflow,
			answers,
		}
	} catch {
		return null
	}
}
