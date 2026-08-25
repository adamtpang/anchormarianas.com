import assert from "node:assert/strict"
import test from "node:test"
import { parseDiagnosticResult } from "./diagnostic"

const valid = {
  businessName: "Example Clinic",
  businessSummary: "A local clinic with phone-first scheduling.",
  observations: [
    { title: "Phone first", detail: "Calls appear central.", evidence: "The header lists a phone number." },
    { title: "Manual intake", detail: "The form is general.", evidence: "The site has one contact form." },
    { title: "Thin proof", detail: "Few testimonials appear.", evidence: "One testimonial is visible." },
  ],
  questions: ["Who answers calls?", "How often are calls missed?", "What happens after the form?"],
  focus: "How often does the phone-first flow break down?",
}

test("accepts and trims the complete diagnostic shape", () => {
  const result = parseDiagnosticResult({
    ...valid,
    businessName: "  Example Clinic  ",
  })

  assert.equal(result?.businessName, "Example Clinic")
  assert.equal(result?.observations.length, 3)
})

test("strips prescriptive fields outside the diagnostic contract", () => {
  const result = parseDiagnosticResult({
    ...valid,
    recommendations: ["Buy a chatbot"],
    annualDollarImpact: 50000,
  })

  assert.ok(result)
  assert.equal("recommendations" in result, false)
  assert.equal("annualDollarImpact" in result, false)
})

test("rejects missing, short, or malformed arrays", () => {
  assert.equal(parseDiagnosticResult(null), null)
  assert.equal(parseDiagnosticResult({ ...valid, observations: [] }), null)
  assert.equal(parseDiagnosticResult({ ...valid, questions: ["Only one"] }), null)
  assert.equal(
    parseDiagnosticResult({
      ...valid,
      observations: [{ title: "Missing fields" }, ...valid.observations.slice(1)],
    }),
    null
  )
})

test("rejects prescriptive, financial, and percentage claims inside valid fields", () => {
  for (const focus of [
    "You should build an AI receptionist.",
    "This could return $5,000 per month.",
    "We recommend a 20% improvement target.",
  ]) {
    assert.equal(parseDiagnosticResult({ ...valid, focus }), null)
  }
})

test("rejects malformed or blank questions", () => {
  assert.equal(
    parseDiagnosticResult({ ...valid, questions: ["Who answers calls?", " ", "What happens next?"] }),
    null
  )
  assert.equal(
    parseDiagnosticResult({ ...valid, questions: ["Who answers calls?", 42, "What happens next?"] }),
    null
  )
})
