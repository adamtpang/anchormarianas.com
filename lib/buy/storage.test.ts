import assert from "node:assert/strict"
import { test } from "node:test"
import { createSampleTargets } from "./sample"
import { parseDesk, serializeDesk } from "./storage"

test("a missing desk is fresh and a corrupt desk is left unread", () => {
  assert.deepEqual(parseDesk(null), { ok: true, targets: [], fresh: true })
  const bad = parseDesk("{")
  assert.equal(bad.ok, false)
  const unknown = parseDesk(JSON.stringify({ version: 2, targets: [] }))
  assert.equal(unknown.ok, false)
})

test("round-trips saved targets and drops a broken row", () => {
  const targets = createSampleTargets("2026-10-31")
  const loaded = parseDesk(serializeDesk(targets))
  assert.equal(loaded.ok, true)
  if (!loaded.ok) return
  assert.equal(loaded.fresh, false)
  assert.equal(loaded.targets.length, targets.length)
  assert.equal(loaded.targets[0]?.calls[0]?.outcome, "talked")

  const mixed = parseDesk(JSON.stringify({ version: 1, targets: [targets[0], { name: 12 }] }))
  assert.equal(mixed.ok, true)
  if (!mixed.ok) return
  assert.equal(mixed.targets.length, 1)
})
