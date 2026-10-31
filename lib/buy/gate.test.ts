import assert from "node:assert/strict"
import { test } from "node:test"
import { POST } from "../../app/api/buy-gate/route"
import {
  BUY_COOKIE,
  buyGateDecision,
  buySessionCookie,
  clearBuyCookie,
  createBuySession,
  handleUnlock,
  isDeskPath,
  isSameOriginPost,
  passcodeMatches,
  readBuyPasscode,
  safeBuyNext,
  verifyBuySession,
} from "./gate"

const SECRET = "desk-test-passcode"
const NOW = Date.parse("2026-10-31T12:00:00Z")

test("fails closed when the passcode is unset, blank, or whitespace", async () => {
  for (const env of [{}, { BUY_PASSCODE: "" }, { BUY_PASSCODE: "   " }, { BUY_PASSCODE: undefined }]) {
    assert.equal(readBuyPasscode(env), null)
    const session = await createBuySession(SECRET, NOW)
    assert.equal(await buyGateDecision(session, env, NOW), "closed")
    assert.equal(await buyGateDecision(undefined, env, NOW), "closed")
  }
})

test("denies a missing, expired, tampered, or wrong-secret cookie", async () => {
  const env = { BUY_PASSCODE: SECRET }
  assert.equal(await buyGateDecision(undefined, env, NOW), "deny")
  assert.equal(await buyGateDecision("not-a-session", env, NOW), "deny")

  const session = await createBuySession(SECRET, NOW)
  assert.equal(await buyGateDecision(session, env, NOW), "allow")
  assert.equal(await buyGateDecision(session, env, NOW + 8 * 24 * 60 * 60 * 1000), "deny")
  assert.equal(await buyGateDecision(session, { BUY_PASSCODE: "other-secret" }, NOW), "deny")

  const tampered = `${session.slice(0, -1)}${session.endsWith("a") ? "b" : "a"}`
  assert.equal(await verifyBuySession(tampered, SECRET, NOW), false)
  assert.equal(await passcodeMatches("wrong", SECRET), false)
  assert.equal(await passcodeMatches(SECRET, SECRET), true)
  assert.equal(await passcodeMatches(SECRET, null), false)
})

test("unlock cookie is httpOnly, path-scoped, and does not contain the passcode", async () => {
  const closed = await handleUnlock({
    action: "unlock",
    passcode: SECRET,
    next: "/buy/queue",
    secret: null,
    secure: true,
    now: NOW,
  })
  assert.equal(closed.type, "closed")

  const invalid = await handleUnlock({
    action: "unlock",
    passcode: "nope",
    next: "https://evil.example/buy",
    secret: SECRET,
    secure: true,
    now: NOW,
  })
  assert.deepEqual(invalid, { type: "invalid", next: "/buy" })

  const ok = await handleUnlock({
    action: "unlock",
    passcode: SECRET,
    next: "/buy/queue",
    secret: SECRET,
    secure: true,
    now: NOW,
  })
  assert.equal(ok.type, "ok")
  if (ok.type !== "ok") return
  assert.equal(ok.next, "/buy/queue")
  assert.match(ok.cookie, new RegExp(`^${BUY_COOKIE}=`))
  assert.match(ok.cookie, /HttpOnly/)
  assert.match(ok.cookie, /SameSite=Lax/)
  assert.match(ok.cookie, /Path=\/buy/)
  assert.match(ok.cookie, /Secure/)
  assert.equal(ok.cookie.includes(SECRET), false)
  assert.equal(await buyGateDecision(ok.cookie.split(";")[0]?.split("=")[1], { BUY_PASSCODE: SECRET }, NOW), "allow")

  const logout = await handleUnlock({
    action: "logout",
    passcode: "",
    next: "/buy",
    secret: SECRET,
    secure: false,
    now: NOW,
  })
  assert.equal(logout.type, "logout")
  if (logout.type !== "logout") return
  assert.match(logout.cookie, /Max-Age=0/)
  assert.doesNotMatch(logout.cookie, /Secure/)
  assert.equal(clearBuyCookie(true).includes("Secure"), true)
  assert.match(buySessionCookie("token", false), /Path=\/buy/)
})

test("next paths stay inside the desk", () => {
  assert.equal(safeBuyNext("/buy"), "/buy")
  assert.equal(safeBuyNext("/buy/queue"), "/buy/queue")
  assert.equal(safeBuyNext("/buy/targets/sample-bookkeeping"), "/buy/targets/sample-bookkeeping")
  assert.equal(safeBuyNext("/check"), "/buy")
  assert.equal(safeBuyNext("/buyer-report"), "/buy")
  assert.equal(safeBuyNext("/buy-gate"), "/buy")
  assert.equal(safeBuyNext("//evil.example/buy"), "/buy")
  assert.equal(safeBuyNext("https://evil.example/buy"), "/buy")
  assert.equal(safeBuyNext("/buy/../check"), "/buy")
  assert.equal(safeBuyNext("/buy?x=1"), "/buy")
  assert.equal(isDeskPath("/buy"), true)
  assert.equal(isDeskPath("/buy/queue"), true)
  assert.equal(isDeskPath("/buy-gate"), false)
  assert.equal(isDeskPath("/check"), false)
  assert.equal(isDeskPath("/api/buy"), false)
})

test("the unlock route fails closed and never echoes the passcode", async () => {
  const environment = process.env as Record<string, string | undefined>
  const previous = environment.BUY_PASSCODE
  const post = (body: Record<string, string>, origin = "http://127.0.0.1:3000") =>
    POST(
      new Request("http://127.0.0.1:3000/api/buy-gate", {
        method: "POST",
        headers: { origin, "content-type": "application/x-www-form-urlencoded" },
        body: new URLSearchParams(body),
      }),
    )
  try {
    delete environment.BUY_PASSCODE
    const closed = await post({ passcode: SECRET, next: "/buy/queue" })
    assert.equal(closed.status, 303)
    assert.match(closed.headers.get("location") || "", /\/buy-gate\?closed=1/)
    assert.equal(closed.headers.get("set-cookie"), null)

    const foreign = await post({ passcode: SECRET }, "https://evil.example")
    assert.equal(foreign.status, 403)

    environment.BUY_PASSCODE = SECRET
    const rejected = await post({ passcode: "wrong", next: "/buy/queue" })
    assert.equal(rejected.status, 303)
    assert.match(rejected.headers.get("location") || "", /error=1/)
    assert.equal(rejected.headers.get("set-cookie"), null)

    const accepted = await post({ passcode: SECRET, next: "/buy/queue" })
    assert.equal(accepted.status, 303)
    assert.match(accepted.headers.get("location") || "", /\/buy\/queue$/)
    const cookie = accepted.headers.get("set-cookie") || ""
    assert.match(cookie, /HttpOnly/)
    assert.equal(cookie.includes(SECRET), false)
  } finally {
    if (previous === undefined) delete environment.BUY_PASSCODE
    else environment.BUY_PASSCODE = previous
  }
})

test("cross-origin unlock posts are rejected by the origin check", () => {
  const url = "https://anchormarianas.com/api/buy-gate"
  const ok = new Request(url, { method: "POST", headers: { origin: "https://anchormarianas.com" } })
  const bad = new Request(url, { method: "POST", headers: { origin: "https://evil.example" } })
  const missing = new Request(url, { method: "POST" })
  assert.equal(isSameOriginPost(ok), true)
  assert.equal(isSameOriginPost(bad), false)
  assert.equal(isSameOriginPost(missing), false)
  const loopback = new Request("http://localhost:3456/api/buy-gate", {
    method: "POST",
    headers: { origin: "http://127.0.0.1:3456", host: "127.0.0.1:3456" },
  })
  assert.equal(isSameOriginPost(loopback), true)
})
