#!/usr/bin/env node
// Deploy Anchor's dental phone-coverage agent to Retell.
//
// Default is a dry run: prints the exact payloads and calls nothing.
//   node scripts/retell/deploy.mjs
//   node scripts/retell/deploy.mjs --apply                 creates the LLM and agent (no charge until calls happen)
//   node scripts/retell/deploy.mjs --apply --no-sms        same, without the text tool (before SMS registration is approved)
//   node scripts/retell/deploy.mjs --apply --buy-number --area-code 415 --accept-number-cost
//                                                         also buys a US number bound to the agent (a monthly charge)
//
// Reads RETELL_API_KEY from the environment or a gitignored .env / .env.local. The key is never printed.
// Uses the synthetic TEST_PRACTICE only. Real practices get their own config after a signed BAA.

import { existsSync, mkdirSync, readFileSync, writeFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
import { TEST_PRACTICE, buildAgentPayload, buildLlmPayload } from "./config.mjs";

const ROOT = join(dirname(fileURLToPath(import.meta.url)), "..", "..");
const STATE_FILE = join(ROOT, "context", "claude", "retell-state.json");
const API = "https://api.retellai.com";

const args = new Set(process.argv.slice(2));
const flag = (name) => args.has(name);
const valueOf = (name) => {
  const list = process.argv.slice(2);
  const index = list.indexOf(name);
  return index >= 0 ? list[index + 1] : undefined;
};

function readKey() {
  if (process.env.RETELL_API_KEY) return process.env.RETELL_API_KEY;
  for (const file of [".env.local", ".env"]) {
    const path = join(ROOT, file);
    if (!existsSync(path)) continue;
    const match = readFileSync(path, "utf8").match(/^RETELL_API_KEY=(.+)$/m);
    if (match) return match[1].trim().replace(/^["']|["']$/g, "");
  }
  return null;
}

async function call(key, path, body) {
  const response = await fetch(`${API}${path}`, {
    method: "POST",
    headers: { Authorization: `Bearer ${key}`, "Content-Type": "application/json" },
    body: JSON.stringify(body),
  });
  const text = await response.text();
  if (!response.ok) throw new Error(`${path} failed with HTTP ${response.status}: ${text.slice(0, 500)}`);
  return JSON.parse(text);
}

async function main() {
  const includeSms = !flag("--no-sms");
  const llmPayload = buildLlmPayload(TEST_PRACTICE, { includeSms });

  if (!flag("--apply")) {
    console.log("DRY RUN. Nothing was sent to Retell.\n");
    console.log("create-retell-llm payload:\n" + JSON.stringify(llmPayload, null, 2));
    console.log("\ncreate-agent payload:\n" + JSON.stringify(buildAgentPayload("<llm_id>", TEST_PRACTICE), null, 2));
    console.log("\nRun with --apply to create them.");
    return;
  }

  const buyNumber = flag("--buy-number");
  const areaCode = Number(valueOf("--area-code"));
  if (buyNumber && !flag("--accept-number-cost")) {
    throw new Error("Buying a number adds a monthly charge. Re-run with --accept-number-cost to confirm.");
  }
  if (buyNumber && !(areaCode >= 200 && areaCode <= 999)) {
    throw new Error("--buy-number needs --area-code with a 3-digit US area code.");
  }

  const key = readKey();
  if (!key) throw new Error("No RETELL_API_KEY found in the environment, .env.local or .env.");

  const llm = await call(key, "/create-retell-llm", llmPayload);
  console.log(`Created LLM ${llm.llm_id}`);
  const agent = await call(key, "/create-agent", buildAgentPayload(llm.llm_id, TEST_PRACTICE));
  console.log(`Created agent ${agent.agent_id}`);

  const state = {
    createdAt: new Date().toISOString(),
    practice: TEST_PRACTICE.practiceName,
    llmId: llm.llm_id,
    agentId: agent.agent_id,
    smsTool: includeSms,
  };

  if (buyNumber) {
    const number = await call(key, "/create-phone-number", {
      area_code: areaCode,
      nickname: `Anchor test: ${TEST_PRACTICE.practiceName}`,
      inbound_agents: [{ agent_id: agent.agent_id, weight: 1 }],
    });
    state.phoneNumber = number.phone_number;
    console.log(`Bought ${number.phone_number_pretty || number.phone_number} and bound it to the agent`);
  }

  mkdirSync(dirname(STATE_FILE), { recursive: true });
  writeFileSync(STATE_FILE, JSON.stringify(state, null, 2));
  console.log(`Saved ids to ${STATE_FILE}`);
}

main().catch((error) => {
  console.error(error.message);
  process.exit(1);
});
