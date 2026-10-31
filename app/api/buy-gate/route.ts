import { NextResponse } from "next/server"
import { handleUnlock, isSameOriginPost, readBuyPasscode, requestIsSecure, requestOrigin } from "@/lib/buy/gate"

export const dynamic = "force-dynamic"

const WINDOW_MS = 15 * 60 * 1000
const LIMIT = 8
const failures = new Map<string, { count: number; resetAt: number }>()

function clientKey(request: Request) {
  return (request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() || "unknown").slice(0, 80)
}

function limited(request: Request, now: number) {
  const bucket = failures.get(clientKey(request))
  if (!bucket || bucket.resetAt <= now) return false
  return bucket.count >= LIMIT
}

function recordFailure(request: Request, now: number) {
  const key = clientKey(request)
  const bucket = failures.get(key)
  if (!bucket || bucket.resetAt <= now) {
    failures.set(key, { count: 1, resetAt: now + WINDOW_MS })
    return
  }
  bucket.count += 1
}

function clearFailures(request: Request) {
  failures.delete(clientKey(request))
}

async function readInput(request: Request) {
  const contentType = request.headers.get("content-type") || ""
  if (contentType.includes("application/json")) {
    const body = (await request.json()) as Record<string, unknown>
    return {
      action: typeof body.action === "string" ? body.action : "unlock",
      passcode: typeof body.passcode === "string" ? body.passcode : "",
      next: typeof body.next === "string" ? body.next : "/buy",
    }
  }
  const form = await request.formData()
  return {
    action: String(form.get("action") ?? "unlock"),
    passcode: String(form.get("passcode") ?? ""),
    next: String(form.get("next") ?? "/buy"),
  }
}

export async function POST(request: Request) {
  if (!isSameOriginPost(request)) {
    return NextResponse.json({ error: "Forbidden." }, { status: 403 })
  }
  const length = Number(request.headers.get("content-length") || "0")
  if (Number.isFinite(length) && length > 8000) {
    return NextResponse.json({ error: "Too large." }, { status: 413 })
  }

  let input: { action: string; passcode: string; next: string }
  try {
    input = await readInput(request)
  } catch {
    return NextResponse.json({ error: "Bad request." }, { status: 400 })
  }

  const now = Date.now()
  if (input.action !== "logout" && limited(request, now)) {
    return NextResponse.json({ error: "Too many attempts. Try again later." }, { status: 429 })
  }

  const result = await handleUnlock({
    action: input.action,
    passcode: input.passcode,
    next: input.next,
    secret: readBuyPasscode(),
    secure: requestIsSecure(request),
    now,
  })

  const origin = requestOrigin(request)
  if (result.type === "closed") {
    return NextResponse.redirect(new URL("/buy-gate?closed=1", origin), 303)
  }
  if (result.type === "invalid") {
    recordFailure(request, now)
    const url = new URL("/buy-gate", origin)
    url.searchParams.set("error", "1")
    url.searchParams.set("next", result.next)
    return NextResponse.redirect(url, 303)
  }

  const destination = result.type === "logout" ? "/buy-gate" : result.next
  const response = NextResponse.redirect(new URL(destination, origin), 303)
  response.headers.append("Set-Cookie", result.cookie)
  response.headers.set("Cache-Control", "no-store")
  if (result.type === "ok") clearFailures(request)
  return response
}
