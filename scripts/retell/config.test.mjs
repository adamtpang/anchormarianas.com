import assert from "node:assert/strict";
import { test } from "node:test";
import {
  RETENTION_DAYS,
  TEST_PRACTICE,
  buildAgentPayload,
  buildLlmPayload,
  buildPrompt,
  buildSmsText,
  validatePractice,
} from "./config.mjs";

test("prompt carries every HIPAA minimum-necessary guardrail", () => {
  const prompt = buildPrompt(TEST_PRACTICE);
  for (const rule of [
    "Never confirm or deny whether someone is a patient",
    "Never look up, read back, confirm, change or cancel an existing appointment",
    "Never ask for date of birth, insurance details",
    "Never give dental or medical advice",
    "call 911 or go to the nearest emergency room",
    "automated assistant",
    "Is it okay if I text that number",
  ]) {
    assert.ok(prompt.includes(rule), `missing guardrail: ${rule}`);
  }
});

test("confirmation text has no health, treatment or payment words and supports opt-out", () => {
  const sms = buildSmsText().toLowerCase();
  for (const banned of ["appointment", "tooth", "teeth", "pain", "treatment", "insurance", "bill", "payment", "dental", "cleaning"]) {
    assert.ok(!sms.includes(banned), `SMS must not mention "${banned}"`);
  }
  assert.ok(sms.includes("reply stop"));
});

test("LLM payload matches the Retell schema shape", () => {
  const payload = buildLlmPayload(TEST_PRACTICE);
  assert.equal(payload.model_temperature, 0);
  const sms = payload.general_tools.find((tool) => tool.type === "send_sms");
  assert.ok(sms, "send_sms tool present");
  assert.equal(sms.sms_content.type, "predefined");
  assert.match(sms.name, /^[A-Za-z0-9_-]{1,64}$/);
  assert.ok(payload.general_tools.some((tool) => tool.type === "end_call"));
  assert.equal(payload.default_dynamic_variables.practice_name, TEST_PRACTICE.practiceName);
});

test("SMS tool can be left out before texting registration is approved", () => {
  const payload = buildLlmPayload(TEST_PRACTICE, { includeSms: false });
  assert.ok(!payload.general_tools.some((tool) => tool.type === "send_sms"));
});

test("agent payload auto-deletes data and sends nothing outside Retell", () => {
  const agent = buildAgentPayload("llm_test", TEST_PRACTICE);
  assert.equal(agent.data_storage_retention_days, RETENTION_DAYS);
  assert.ok(RETENTION_DAYS >= 1 && RETENTION_DAYS <= 730);
  assert.equal(agent.webhook_url, undefined);
  assert.deepEqual(agent.response_engine, { type: "retell-llm", llm_id: "llm_test" });
  assert.ok(agent.voice_id);
});

test("incomplete practice config is rejected", () => {
  assert.throws(() => validatePractice({ practiceName: "X" }), /missing/);
  assert.throws(() => buildAgentPayload("", TEST_PRACTICE), /llmId/);
});
