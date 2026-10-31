import assert from "node:assert/strict"
import { readdirSync, readFileSync, statSync } from "node:fs"
import path from "node:path"
import { test } from "node:test"
import robots from "../../app/robots"
import sitemap from "../../app/sitemap"

function walk(dir: string): string[] {
  const files: string[] = []
  for (const entry of readdirSync(dir)) {
    if (entry === "node_modules" || entry === ".next" || entry === ".git") continue
    const full = path.join(dir, entry)
    const info = statSync(full)
    if (info.isDirectory()) files.push(...walk(full))
    else if (/\.(tsx?|jsx?|md|example)$/.test(entry) || entry === ".env.example") files.push(full)
  }
  return files
}

test("the private desk is out of the sitemap and disallowed for crawlers", () => {
  const urls = sitemap().map((entry) => new URL(entry.url).pathname)
  assert.equal(urls.includes("/buy"), false)
  assert.equal(urls.some((url) => url === "/buy" || url.startsWith("/buy/")), false)
  assert.equal(urls.includes("/check"), true)
  const rules = robots().rules
  const list = Array.isArray(rules) ? rules : [rules]
  for (const rule of list) {
    const disallow = Array.isArray(rule.disallow) ? rule.disallow : [rule.disallow]
    assert.ok(disallow.includes("/buy"))
    assert.ok(disallow.includes("/buy-gate"))
  }
})

test("the passcode is read only in the server gate module", () => {
  const root = path.join(process.cwd())
  const offenders: string[] = []
  for (const file of walk(root)) {
    if (file.endsWith(`${path.sep}lib${path.sep}buy${path.sep}gate.ts`)) continue
    if (file.endsWith(`${path.sep}lib${path.sep}buy${path.sep}visibility.test.ts`)) continue
    const source = readFileSync(file, "utf8")
    if (source.includes("process.env.BUY_PASSCODE") || source.includes('env.BUY_PASSCODE')) {
      offenders.push(path.relative(root, file))
    }
    if (source.includes('"use client"') && (source.includes("lib/buy/gate") || source.includes("BUY_PASSCODE="))) {
      offenders.push(path.relative(root, file))
    }
  }
  assert.deepEqual(offenders, [])
})
