export type DiagnosticObservation = {
  title: string
  detail: string
  evidence: string
}

export type DiagnosticResult = {
  businessName: string
  businessSummary: string
  observations: DiagnosticObservation[]
  questions: string[]
  focus: string
}

const text = (value: unknown) =>
  typeof value === "string" && value.trim() ? value.trim() : null

const disallowedDiagnosticClaim =
  /(?:[$£€¥]\s*\d|\b(?:usd|dollars?|roi|return on investment|percent(?:age)?|recommend(?:ation|ed|ing)?|suggest(?:ion|ed|ing)?|you should|should (?:build|buy|install|implement|use)|ai receptionist|review responder|anchor marianas)\b|\d+(?:\.\d+)?\s*%)/i

function isDiagnosticText(value: string) {
  return !disallowedDiagnosticClaim.test(value)
}

export function parseDiagnosticResult(value: unknown): DiagnosticResult | null {
  if (!value || typeof value !== "object" || Array.isArray(value)) return null

  const raw = value as Record<string, unknown>
  const businessName = text(raw.businessName)
  const businessSummary = text(raw.businessSummary)
  const focus = text(raw.focus)

  if (
    !businessName ||
    !businessSummary ||
    !focus ||
    !Array.isArray(raw.observations) ||
    raw.observations.length < 3 ||
    raw.observations.length > 4 ||
    !Array.isArray(raw.questions) ||
    raw.questions.length < 3 ||
    raw.questions.length > 5
  ) {
    return null
  }

  const observations = raw.observations.flatMap((value) => {
    if (!value || typeof value !== "object" || Array.isArray(value)) return []
    const observation = value as Record<string, unknown>
    const title = text(observation.title)
    const detail = text(observation.detail)
    const evidence = text(observation.evidence)
    return title && detail && evidence ? [{ title, detail, evidence }] : []
  })
  const questions = raw.questions.flatMap((value) => {
    const question = text(value)
    return question ? [question] : []
  })

  if (
    observations.length !== raw.observations.length ||
    questions.length !== raw.questions.length ||
    ![
      businessName,
      businessSummary,
      focus,
      ...questions,
      ...observations.flatMap((observation) => [
        observation.title,
        observation.detail,
        observation.evidence,
      ]),
    ].every(isDiagnosticText)
  ) {
    return null
  }

  return {
    businessName,
    businessSummary,
    observations,
    questions,
    focus,
  }
}
