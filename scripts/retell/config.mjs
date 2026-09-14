// Retell agent configuration for Anchor's dental phone-coverage service.
// Built against Retell API spec revisions 2026-08-01 (LLM) and 2026-08-12 (agent).
// Guardrails here implement Anchor's HIPAA policy P5 (minimum necessary).
// Never put real patient data in this file or its tests.

export const RETENTION_DAYS = 30;

/** Synthetic practice used for test-number builds. Not a real business. */
export const TEST_PRACTICE = {
  practiceName: "Test Harbor Dental",
  location: "Tamuning, Guam",
  officeHours: "Monday to Friday, 8 AM to 5 PM",
  callbackPromise: "the next business morning",
  emergencyLine: "911",
};

const REQUIRED_FIELDS = ["practiceName", "location", "officeHours", "callbackPromise", "emergencyLine"];

export function validatePractice(practice) {
  const missing = REQUIRED_FIELDS.filter((key) => !practice?.[key] || !String(practice[key]).trim());
  if (missing.length) throw new Error(`Practice is missing: ${missing.join(", ")}`);
  return practice;
}

export function buildPrompt(practice) {
  validatePractice(practice);
  return `You answer calls for ${practice.practiceName}, a dental office in ${practice.location}, when the front desk cannot pick up. You are an automated assistant, and you say so if asked.

Office hours: ${practice.officeHours}.

Your only job: take a short message so the office can call the person back ${practice.callbackPromise}.

Collect only these, one at a time, in plain friendly language:
1. The caller's first and last name.
2. The best number to call back. If they say the number they are calling from is fine, accept that.
3. In a few words, the general reason for the call: for example a new patient appointment, a cleaning, a question about a bill, or tooth pain.
4. Whether morning or afternoon is better for a callback.

Then read back the name, number and callback time to confirm, and tell them the office will call ${practice.callbackPromise}.

If a confirmation text tool is available, ask: "Is it okay if I text that number a short confirmation?" Send it only if they say yes, and never to a number other than the confirmed callback number.

Strict rules:
- Never confirm or deny whether someone is a patient of this office, even if they ask directly. Say you can pass their question to the team.
- Never look up, read back, confirm, change or cancel an existing appointment. Take a message instead.
- Never ask for date of birth, insurance details, Social Security numbers, card numbers, medical history, or medications. If the caller starts giving these, politely say the team will collect what they need when they call back.
- Never give dental or medical advice, diagnoses, prices, or insurance answers.
- If the caller describes severe swelling, trouble breathing or swallowing, uncontrolled bleeding, or an injury to the face or jaw, tell them to call ${practice.emergencyLine} or go to the nearest emergency room now, then still take their message.
- Do not mention other patients, staff schedules, or anything about the office beyond its hours.
- Keep the call under three minutes. Be warm, brief and clear.`;
}

export function buildSmsText() {
  // Policy P5: no health, treatment or payment details. Practice name and callback only.
  return "Thanks for calling {{practice_name}}. We got your message and will call you back {{callback_promise}}. Reply STOP to opt out.";
}

export function buildLlmPayload(practice, { includeSms = true } = {}) {
  validatePractice(practice);
  const tools = [
    {
      type: "end_call",
      name: "end_call",
      description: "End the call after the message is confirmed, or if the caller asks to hang up.",
    },
  ];
  if (includeSms) {
    tools.push({
      type: "send_sms",
      name: "send_message_confirmation",
      description:
        "After the caller has confirmed their name, callback number and callback time, send one confirmation text to the caller. Send it once per call, and only if the caller agreed to receive a text.",
      speak_during_execution: true,
      execution_message_type: "static_text",
      execution_message_description: "I'm sending you a quick text to confirm.",
      sms_content: { type: "predefined", text: buildSmsText() },
    });
  }
  return {
    model: "gpt-4.1",
    model_temperature: 0,
    general_prompt: buildPrompt(practice),
    general_tools: tools,
    begin_message: `Thanks for calling ${practice.practiceName}. The front desk can't come to the phone right now, but I can take a message so they can call you back. May I have your name?`,
    default_dynamic_variables: {
      practice_name: practice.practiceName,
      callback_promise: practice.callbackPromise,
    },
  };
}

export function buildAgentPayload(llmId, practice) {
  validatePractice(practice);
  if (!llmId) throw new Error("llmId is required");
  return {
    agent_name: `Anchor phone coverage: ${practice.practiceName}`,
    response_engine: { type: "retell-llm", llm_id: llmId },
    voice_id: "retell-Cimo",
    language: "en-US",
    // Policy P8: keep call data only as long as the practice needs it, then auto-delete.
    data_storage_setting: "everything",
    data_storage_retention_days: RETENTION_DAYS,
    // No webhook: patient data must not leave Retell (policy P2).
    post_call_analysis_data: [
      { type: "string", name: "caller_name", description: "The caller's first and last name as they gave it." },
      { type: "string", name: "callback_number", description: "The callback number the caller confirmed." },
      {
        type: "string",
        name: "reason_for_call",
        description: "The general reason for the call in five words or fewer. No clinical detail.",
      },
      { type: "string", name: "callback_time", description: "Morning or afternoon, as the caller preferred." },
      {
        type: "boolean",
        name: "emergency_advice_given",
        description: "True if the agent told the caller to call emergency services or go to the emergency room.",
      },
    ],
  };
}
