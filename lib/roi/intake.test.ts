import { test } from "node:test"
import assert from "node:assert/strict"
import {
	emptyIntake,
	intakeEstimate,
	intakeSummary,
	parseDraft,
} from "./intake"

test("estimates preserve full precision until the final currency rounding", () => {
	assert.equal(
		intakeEstimate({
			...emptyIntake,
			workflow: "reviews",
			answers: { reviewsPerMonth: 1, minutesPerReply: 1, hourlyValue: 500 },
		})?.value,
		8.33,
	)
	assert.equal(
		intakeEstimate({
			...emptyIntake,
			workflow: "appointments",
			answers: {
				appointmentsPerWeek: 1,
				noShowPercent: 10,
				appointmentValue: 1000,
			},
		})?.value,
		433.33,
	)
	assert.equal(
		intakeEstimate({
			...emptyIntake,
			workflow: "calls",
			answers: {
				missedCallsPerWeek: 1,
				callToCustomerPercent: 10,
				customerValue: 1000,
			},
		})?.value,
		433.33,
	)
})

test("unknown and invalid inputs cannot generate an estimate", () => {
	assert.equal(
		intakeEstimate({
			...emptyIntake,
			workflow: "appointments",
			answers: {
				appointmentsPerWeek: 40,
				noShowPercent: 250,
				appointmentValue: 150,
			},
		}),
		null,
	)
	assert.equal(
		intakeEstimate({
			...emptyIntake,
			workflow: "calls",
			answers: { missedCallsPerWeek: 10 },
		}),
		null,
	)
})
test("zero remains an explicit answer and uncertainty travels with the export", () => {
	const d = {
		...emptyIntake,
		workflow: "calls" as const,
		answers: {
			missedCallsPerWeek: 0,
			callToCustomerPercent: 30,
			customerValue: 200,
		},
	}
	assert.equal(intakeEstimate(d)?.value, 0)
	assert.match(intakeSummary(d), /Scenario only/)
	assert.match(intakeSummary(d), /has not been sent/)
})
test("a selected workflow never exports unrelated stale answers", () => {
	const summary = intakeSummary({
		...emptyIntake,
		workflow: "other",
		answers: { customerValue: 888888 },
	})
	assert.doesNotMatch(summary, /888888/)
})
test("draft restoration rejects corruption, inherited workflow names and invalid numeric values", () => {
	assert.equal(parseDraft("broken"), null)
	assert.equal(
		parseDraft(
			JSON.stringify({
				version: 1,
				intake: { ...emptyIntake, workflow: "toString" },
			}),
		),
		null,
	)
	const restored = parseDraft(
		JSON.stringify({
			version: 1,
			intake: {
				...emptyIntake,
				answers: { noShowPercent: 250, monthlyBudget: 0, injected: 500 },
			},
		}),
	)
	assert.deepEqual(restored?.answers, { monthlyBudget: 0 })
})
