import assert from "node:assert/strict"
import test from "node:test"
import {
  fetchPublicSiteText,
  isPublicAddress,
  readableSiteText,
  validatePublicUrl,
} from "./safe-site-fetch"

test("rejects loopback, private, metadata, reserved, credentials, and custom ports", () => {
  for (const address of [
    "127.0.0.1",
    "10.0.0.1",
    "172.16.0.1",
    "192.168.1.1",
    "169.254.169.254",
    "100.64.0.1",
    "192.0.2.1",
    "::1",
    "fc00::1",
    "fe80::1",
  ]) {
    assert.equal(isPublicAddress(address), false, address)
  }
  assert.equal(isPublicAddress("8.8.8.8"), true)
  assert.throws(() => validatePublicUrl("http://user:pass@example.com"), /credentials/)
  assert.throws(() => validatePublicUrl("https://example.com:8443"), /ports/)
  assert.throws(() => validatePublicUrl("http://localhost"), /Local/)
})

test("revalidates every redirect before making the next request", async () => {
  let requestCount = 0
  await assert.rejects(
    () =>
      fetchPublicSiteText("https://example.com", {
        lookup: async (hostname) =>
          hostname === "example.com"
            ? [{ address: "8.8.8.8", family: 4 }]
            : [{ address: "127.0.0.1", family: 4 }],
        request: async () => {
          requestCount += 1
          return {
            status: 302,
            contentType: "text/html",
            location: "http://internal.example/secret",
            body: "",
          }
        },
      }),
    /private or reserved/
  )
  assert.equal(requestCount, 1)
})

test("returns bounded readable text for a public HTML response", async () => {
  const html = await fetchPublicSiteText("https://example.com/path", {
    lookup: async () => [{ address: "8.8.8.8", family: 4 }],
    request: async () => ({
      status: 200,
      contentType: "text/html; charset=utf-8",
      body: "<style>no</style><main>Hello &amp; welcome</main>",
    }),
  })
  assert.equal(readableSiteText(html), "Hello & welcome")
})
