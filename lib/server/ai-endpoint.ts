import { createHash } from "node:crypto"

export class AiEndpointError extends Error {
  constructor(
    message: string,
    readonly status: number,
    readonly retryAfter?: number
  ) {
    super(message)
  }
}

type Counter = { count: number; resetAt: number }

const perIpCounters = new Map<string, Counter>()
const dailyCounters = new Map<string, Counter>()
const activeRequests = new Map<string, number>()

const HOUR = 60 * 60 * 1000
const DAY = 24 * HOUR
const PER_IP_HOURLY_LIMIT = 3
const GLOBAL_DAILY_LIMIT = 100
const GLOBAL_CONCURRENCY_LIMIT = 2
const MAX_TRACKED_COUNTERS = 5000

function trimExpiredCounters(store: Map<string, Counter>, now: number) {
  if (store.size < MAX_TRACKED_COUNTERS) return
  for (const [key, counter] of store) {
    if (counter.resetAt <= now) store.delete(key)
  }
  while (store.size >= MAX_TRACKED_COUNTERS) {
    const first = store.keys().next().value
    if (typeof first !== "string") break
    store.delete(first)
  }
}

function consumeCounter(
  store: Map<string, Counter>,
  key: string,
  limit: number,
  windowMs: number,
  now: number
) {
  trimExpiredCounters(store, now)
  const existing = store.get(key)
  const counter =
    existing && existing.resetAt > now
      ? existing
      : { count: 0, resetAt: now + windowMs }
  counter.count += 1
  store.set(key, counter)
  if (counter.count > limit) {
    throw new AiEndpointError(
      "Too many requests. Please try again later.",
      429,
      Math.max(1, Math.ceil((counter.resetAt - now) / 1000))
    )
  }
}

function clientIdentifier(request: Request) {
  const forwarded = request.headers.get("x-forwarded-for")?.split(",")[0]?.trim()
  const direct = request.headers.get("x-real-ip")?.trim()
  const value = (forwarded || direct || "unknown").slice(0, 128)
  return createHash("sha256").update(value).digest("hex").slice(0, 24)
}

export function assertPublicAiEnabled() {
  if (process.env.AI_PUBLIC_ENDPOINTS_ENABLED !== "true") {
    throw new AiEndpointError(
      "This AI service is temporarily unavailable.",
      503,
      300
    )
  }
}

export function acquireAiRequest(request: Request, endpoint: string) {
  assertPublicAiEnabled()

  const now = Date.now()
  consumeCounter(
    perIpCounters,
    `${endpoint}:${clientIdentifier(request)}`,
    PER_IP_HOURLY_LIMIT,
    HOUR,
    now
  )
  consumeCounter(
    dailyCounters,
    endpoint,
    GLOBAL_DAILY_LIMIT,
    DAY,
    now
  )

  const active = activeRequests.get(endpoint) ?? 0
  if (active >= GLOBAL_CONCURRENCY_LIMIT) {
    throw new AiEndpointError(
      "The scan queue is full. Please try again shortly.",
      429,
      30
    )
  }
  activeRequests.set(endpoint, active + 1)

  let released = false
  return () => {
    if (released) return
    released = true
    const remaining = (activeRequests.get(endpoint) ?? 1) - 1
    if (remaining > 0) activeRequests.set(endpoint, remaining)
    else activeRequests.delete(endpoint)
  }
}

export async function readBoundedJson(
  request: Request,
  maxBytes = 16 * 1024
): Promise<unknown> {
  const declared = Number(request.headers.get("content-length"))
  if (Number.isFinite(declared) && declared > maxBytes) {
    throw new AiEndpointError("Request body is too large.", 413)
  }

  if (!request.body) return {}
  const reader = request.body.getReader()
  const decoder = new TextDecoder()
  let bytes = 0
  let text = ""

  while (true) {
    const { done, value } = await reader.read()
    if (done) break
    bytes += value.byteLength
    if (bytes > maxBytes) {
      await reader.cancel()
      throw new AiEndpointError("Request body is too large.", 413)
    }
    text += decoder.decode(value, { stream: true })
  }
  text += decoder.decode()

  try {
    return text ? JSON.parse(text) : {}
  } catch {
    throw new AiEndpointError("Request body must be valid JSON.", 400)
  }
}

export class BoundedTtlCache<T> {
  private readonly values = new Map<string, { expiresAt: number; value: T }>()

  constructor(
    private readonly maxEntries: number,
    private readonly ttlMs: number
  ) {}

  get(key: string) {
    const entry = this.values.get(key)
    if (!entry) return undefined
    if (entry.expiresAt <= Date.now()) {
      this.values.delete(key)
      return undefined
    }
    this.values.delete(key)
    this.values.set(key, entry)
    return entry.value
  }

  set(key: string, value: T) {
    this.values.delete(key)
    while (this.values.size >= this.maxEntries) {
      const oldest = this.values.keys().next().value
      if (typeof oldest !== "string") break
      this.values.delete(oldest)
    }
    this.values.set(key, { expiresAt: Date.now() + this.ttlMs, value })
  }
}

export function stableRequestKey(parts: string[]) {
  return createHash("sha256").update(parts.join("\u0000")).digest("hex")
}

export function aiErrorResponse(error: unknown) {
  if (!(error instanceof AiEndpointError)) return null
  return {
    body: { error: error.message },
    status: error.status,
    headers: error.retryAfter
      ? { "Retry-After": String(error.retryAfter) }
      : undefined,
  }
}
