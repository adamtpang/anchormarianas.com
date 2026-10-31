// Server-side passcode gate for /buy. The secret stays in the process environment.
// Client components must not import this module.

export const BUY_COOKIE = "anchor_buy_session"
export const BUY_SESSION_MS = 7 * 24 * 60 * 60 * 1000

type Env = Record<string, string | undefined>

const encoder = new TextEncoder()

function encode(value: string): ArrayBuffer {
  const bytes = encoder.encode(value)
  return bytes.buffer.slice(bytes.byteOffset, bytes.byteOffset + bytes.byteLength) as ArrayBuffer
}

function toBase64Url(bytes: ArrayBuffer): string {
  let binary = ""
  const view = new Uint8Array(bytes)
  for (const byte of view) binary += String.fromCharCode(byte)
  return btoa(binary).replace(/\+/g, "-").replace(/\//g, "_").replace(/=/g, "")
}

async function hmac(secret: string, message: string): Promise<string> {
  const key = await crypto.subtle.importKey(
    "raw",
    encode(secret),
    { name: "HMAC", hash: "SHA-256" },
    false,
    ["sign"],
  )
  const signature = await crypto.subtle.sign("HMAC", key, encode(message))
  return toBase64Url(signature)
}

async function sha256(value: string): Promise<Uint8Array> {
  return new Uint8Array(await crypto.subtle.digest("SHA-256", encode(value)))
}

function safeEqual(left: Uint8Array, right: Uint8Array): boolean {
  const length = Math.max(left.length, right.length)
  let diff = left.length ^ right.length
  for (let index = 0; index < length; index += 1) {
    diff |= (left[index] ?? 0) ^ (right[index] ?? 0)
  }
  return diff === 0
}

function safeEqualText(left: string, right: string): boolean {
  return safeEqual(encoder.encode(left), encoder.encode(right))
}

export function readBuyPasscode(env: Env = process.env): string | null {
  const value = env.BUY_PASSCODE
  if (typeof value !== "string" || value.trim() === "") return null
  return value
}

export function isDeskPath(pathname: string): boolean {
  return pathname === "/buy" || pathname.startsWith("/buy/")
}

export function safeBuyNext(value: unknown): string {
  if (typeof value !== "string") return "/buy"
  if (!/^\/buy(\/[A-Za-z0-9._~-]*)*$/.test(value)) return "/buy"
  if (value.includes("..")) return "/buy"
  return value
}

export async function passcodeMatches(input: string, secret: string | null): Promise<boolean> {
  if (!secret) return false
  const left = await sha256(input)
  const right = await sha256(secret)
  return safeEqual(left, right)
}

export async function createBuySession(secret: string, now = Date.now()): Promise<string> {
  const expires = now + BUY_SESSION_MS
  const payload = `v1.${expires}`
  const mac = await hmac(secret, payload)
  return `${payload}.${mac}`
}

export async function verifyBuySession(token: string, secret: string, now = Date.now()): Promise<boolean> {
  const parts = token.split(".")
  if (parts.length !== 3) return false
  const [version, expiresText, mac] = parts
  if (version !== "v1" || !/^\d+$/.test(expiresText) || !mac) return false
  const expires = Number(expiresText)
  if (expires <= now || expires > now + BUY_SESSION_MS + 60_000) return false
  const expected = await hmac(secret, `${version}.${expiresText}`)
  return safeEqualText(expected, mac)
}

export type BuyGateDecision = "allow" | "closed" | "deny"

export async function buyGateDecision(
  cookie: string | undefined,
  env: Env = process.env,
  now = Date.now(),
): Promise<BuyGateDecision> {
  const secret = readBuyPasscode(env)
  if (!secret) return "closed"
  if (!cookie || !(await verifyBuySession(cookie, secret, now))) return "deny"
  return "allow"
}

export function buySessionCookie(token: string, secure: boolean): string {
  const parts = [
    `${BUY_COOKIE}=${token}`,
    "HttpOnly",
    "SameSite=Lax",
    "Path=/buy",
    `Max-Age=${Math.floor(BUY_SESSION_MS / 1000)}`,
  ]
  if (secure) parts.push("Secure")
  return parts.join("; ")
}

export function clearBuyCookie(secure: boolean): string {
  const parts = [`${BUY_COOKIE}=`, "HttpOnly", "SameSite=Lax", "Path=/buy", "Max-Age=0"]
  if (secure) parts.push("Secure")
  return parts.join("; ")
}

export function requestOrigin(request: Request): string {
  const host = (request.headers.get("x-forwarded-host") || request.headers.get("host") || new URL(request.url).host)
    .split(",")[0]
    ?.trim()
  const proto = request.headers.get("x-forwarded-proto")?.split(",")[0]?.trim() || new URL(request.url).protocol.replace(":", "")
  return `${proto}://${host}`
}

export function requestIsSecure(request: Request): boolean {
  const forwarded = request.headers.get("x-forwarded-proto")?.split(",")[0]?.trim()
  if (forwarded) return forwarded === "https"
  return new URL(request.url).protocol === "https:"
}

export function isSameOriginPost(request: Request): boolean {
  const forwarded = request.headers.get("x-forwarded-host") || request.headers.get("host")
  const expectedHost = (forwarded || new URL(request.url).host).split(",")[0]?.trim() || ""
  const candidate = request.headers.get("origin") || request.headers.get("referer")
  if (!candidate || !expectedHost) return false
  try {
    return new URL(candidate).host === expectedHost
  } catch {
    return false
  }
}

export type UnlockResult =
  | { type: "closed" }
  | { type: "invalid"; next: string }
  | { type: "logout"; cookie: string }
  | { type: "ok"; next: string; cookie: string }

export async function handleUnlock(input: {
  action: string
  passcode: string
  next: unknown
  secret: string | null
  secure: boolean
  now?: number
}): Promise<UnlockResult> {
  const next = safeBuyNext(input.next)
  if (input.action === "logout") {
    return { type: "logout", cookie: clearBuyCookie(input.secure) }
  }
  if (!input.secret) return { type: "closed" }
  if (!(await passcodeMatches(input.passcode, input.secret))) {
    return { type: "invalid", next }
  }
  const token = await createBuySession(input.secret, input.now)
  return { type: "ok", next, cookie: buySessionCookie(token, input.secure) }
}
