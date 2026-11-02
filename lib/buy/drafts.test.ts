import assert from "node:assert/strict"
import { test } from "node:test"
import { ownerConversationCount } from "./conversations"
import { buildDrafts } from "./drafts"
import { createSampleTargets } from "./sample"
import { parseDesk, serializeDesk } from "./storage"

test("drafts are copy text only and name the fake firm", () => {
  const target = createSampleTargets("2026-10-31")[0]
  assert.ok(target)
  const drafts = buildDrafts(target)
  assert.deepEqual(drafts.map((draft) => draft.label), ["Call opener", "Voicemail", "Letter"])
  for (const draft of drafts) {
    assert.match(draft.text, /Sample Bookkeeping Co \(FAKE\)/)
    assert.equal(draft.text.includes("mailto:"), false)
    assert.equal(/sms:|mailto:/i.test(draft.text), false)
  }
  assert.match(drafts[0]?.text || "", /Pat Example/)
})

test("backup restore keeps call logs and the owner conversation flag", () => {
  const targets = createSampleTargets("2026-10-31").map((target, index) =>
    index === 0 ? { ...target, spokeWithOwner: true } : target,
  )
  const raw = serializeDesk(targets)
  const loaded = parseDesk(raw)
  assert.equal(loaded.ok, true)
  if (!loaded.ok) return
  assert.equal(loaded.targets[0]?.calls[0]?.outcome, "talked")
  assert.equal(loaded.targets[0]?.spokeWithOwner, true)
  assert.equal(loaded.targets[0]?.charterDate, "2004-06-01")
  assert.equal(ownerConversationCount(loaded.targets), 1)
  const legacy = parseDesk(JSON.stringify({
    version: 1,
    targets: [{ ...targets[1], spokeWithOwner: undefined, zip: undefined, calls: [{ ...targets[1]?.calls[0], spokeWithOwner: undefined }] }],
  }))
  assert.equal(legacy.ok, true)
  if (!legacy.ok) return
  assert.equal(legacy.targets[0]?.spokeWithOwner, false)
  assert.equal(legacy.targets[0]?.calls[0]?.spokeWithOwner, false)
  assert.equal(ownerConversationCount(legacy.targets), 0)
})
