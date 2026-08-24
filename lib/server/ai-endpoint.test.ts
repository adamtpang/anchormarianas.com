import assert from "node:assert/strict"
import test from "node:test"
import {
  AiEndpointError,
  BoundedTtlCache,
  assertPublicAiEnabled,
  readBoundedJson,
  stableRequestKey,
} from "./ai-endpoint"

test("fails closed in every hosted environment unless explicitly enabled", () => {
  const environment = process.env as Record<string, string | undefined>
  const originalVercelEnv = process.env.VERCEL_ENV
  const originalNodeEnv = process.env.NODE_ENV
  const originalEnabled = process.env.AI_PUBLIC_ENDPOINTS_ENABLED

  try {
    delete environment.AI_PUBLIC_ENDPOINTS_ENABLED
    environment.NODE_ENV = "development"
    delete environment.VERCEL_ENV
    assert.doesNotThrow(() => assertPublicAiEnabled())

    environment.VERCEL_ENV = "preview"
    assert.throws(
      () => assertPublicAiEnabled(),
      (error) => error instanceof AiEndpointError && error.status === 503
    )

    environment.VERCEL_ENV = "development"
    assert.throws(
      () => assertPublicAiEnabled(),
      (error) => error instanceof AiEndpointError && error.status === 503
    )

    delete environment.VERCEL_ENV
    environment.NODE_ENV = "production"
    assert.throws(
      () => assertPublicAiEnabled(),
      (error) => error instanceof AiEndpointError && error.status === 503
    )

    environment.AI_PUBLIC_ENDPOINTS_ENABLED = "true"
    assert.doesNotThrow(() => assertPublicAiEnabled())
  } finally {
    if (originalVercelEnv === undefined) delete environment.VERCEL_ENV
    else environment.VERCEL_ENV = originalVercelEnv
    if (originalNodeEnv === undefined) delete environment.NODE_ENV
    else environment.NODE_ENV = originalNodeEnv
    if (originalEnabled === undefined)
      delete environment.AI_PUBLIC_ENDPOINTS_ENABLED
    else environment.AI_PUBLIC_ENDPOINTS_ENABLED = originalEnabled
  }
})

test("reads valid bounded JSON and rejects oversized or malformed bodies", async () => {
  const valid = new Request("https://example.com", {
    method: "POST",
    body: JSON.stringify({ ok: true }),
  })
  assert.deepEqual(await readBoundedJson(valid), { ok: true })

  const oversized = new Request("https://example.com", {
    method: "POST",
    body: JSON.stringify({ value: "x".repeat(100) }),
  })
  await assert.rejects(
    () => readBoundedJson(oversized, 20),
    (error) => error instanceof AiEndpointError && error.status === 413
  )

  const malformed = new Request("https://example.com", {
    method: "POST",
    body: "not-json",
  })
  await assert.rejects(
    () => readBoundedJson(malformed),
    (error) => error instanceof AiEndpointError && error.status === 400
  )
})

test("bounds the TTL cache and separates request keys by every input", () => {
  const cache = new BoundedTtlCache<number>(2, 1000)
  cache.set("a", 1)
  cache.set("b", 2)
  cache.set("c", 3)
  assert.equal(cache.get("a"), undefined)
  assert.equal(cache.get("b"), 2)
  assert.notEqual(
    stableRequestKey(["https://example.com/a", "one", "v1"]),
    stableRequestKey(["https://example.com/b", "one", "v1"])
  )
  assert.notEqual(
    stableRequestKey(["https://example.com/a", "one", "v1"]),
    stableRequestKey(["https://example.com/a", "two", "v1"])
  )
})
