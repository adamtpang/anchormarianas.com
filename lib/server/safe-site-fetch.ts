import dns from "node:dns/promises"
import http from "node:http"
import https from "node:https"
import { BlockList, isIP } from "node:net"

type ResolvedAddress = { address: string; family: 4 | 6 }
type SiteResponse = {
  status: number
  contentType: string
  location?: string
  body: string
}

type SafeSiteFetchOptions = {
  maxBytes?: number
  maxRedirects?: number
  timeoutMs?: number
  lookup?: (hostname: string) => Promise<ResolvedAddress[]>
  request?: (
    url: URL,
    addresses: ResolvedAddress[],
    maxBytes: number,
    timeoutMs: number
  ) => Promise<SiteResponse>
}

const blockedAddresses = new BlockList()
const globalIpv6Addresses = new BlockList()

// Public website IPv6 addresses are globally routable unicast addresses.
// Reject transition, compatibility, local, documentation, and reserved spaces
// instead of trying to enumerate only the private ranges.
globalIpv6Addresses.addSubnet("2000::", 3, "ipv6")

for (const [network, prefix] of [
  ["0.0.0.0", 8],
  ["10.0.0.0", 8],
  ["100.64.0.0", 10],
  ["127.0.0.0", 8],
  ["169.254.0.0", 16],
  ["172.16.0.0", 12],
  ["192.0.0.0", 24],
  ["192.0.2.0", 24],
  ["192.31.196.0", 24],
  ["192.52.193.0", 24],
  ["192.88.99.0", 24],
  ["192.168.0.0", 16],
  ["192.175.48.0", 24],
  ["198.18.0.0", 15],
  ["198.51.100.0", 24],
  ["203.0.113.0", 24],
  ["224.0.0.0", 4],
  ["240.0.0.0", 4],
] as const) {
  blockedAddresses.addSubnet(network, prefix, "ipv4")
}

for (const [network, prefix] of [
  ["::", 128],
  ["::1", 128],
  ["2001::", 23],
  ["64:ff9b::", 96],
  ["64:ff9b:1::", 48],
  ["100::", 64],
  ["2001:db8::", 32],
  ["2001:10::", 28],
  ["2002::", 16],
  ["3fff::", 20],
  ["fc00::", 7],
  ["fec0::", 10],
  ["fe80::", 10],
  ["ff00::", 8],
] as const) {
  blockedAddresses.addSubnet(network, prefix, "ipv6")
}

export function isPublicAddress(address: string) {
  const family = isIP(address)
  if (family === 4) return !blockedAddresses.check(address, "ipv4")
  if (family === 6) {
    return (
      globalIpv6Addresses.check(address, "ipv6") &&
      !blockedAddresses.check(address, "ipv6")
    )
  }
  return false
}

export function validatePublicUrl(input: string) {
  if (input.length > 2048) throw new Error("URL is too long.")

  const url = new URL(input)
  if (!['http:', 'https:'].includes(url.protocol)) {
    throw new Error("Only HTTP and HTTPS URLs are allowed.")
  }
  if (url.username || url.password) {
    throw new Error("URLs with embedded credentials are not allowed.")
  }
  if (
    (url.protocol === "http:" && url.port && url.port !== "80") ||
    (url.protocol === "https:" && url.port && url.port !== "443")
  ) {
    throw new Error("Non-standard ports are not allowed.")
  }

  const hostname = url.hostname.replace(/^\[|\]$/g, "").toLowerCase()
  if (
    hostname === "localhost" ||
    hostname.endsWith(".localhost") ||
    hostname.endsWith(".local") ||
    hostname.endsWith(".internal")
  ) {
    throw new Error("Local and private hosts are not allowed.")
  }
  if (isIP(hostname) && !isPublicAddress(hostname)) {
    throw new Error("Private and reserved addresses are not allowed.")
  }

  url.hash = ""
  return url
}

async function lookupPublicHost(hostname: string): Promise<ResolvedAddress[]> {
  const records = await dns.lookup(hostname, { all: true, verbatim: true })
  if (!records.length || records.some((record) => !isPublicAddress(record.address))) {
    throw new Error("Host resolves to a private or reserved address.")
  }
  return records.map((record) => ({
    address: record.address,
    family: record.family as 4 | 6,
  }))
}

function requestSite(
  url: URL,
  addresses: ResolvedAddress[],
  maxBytes: number,
  timeoutMs: number
): Promise<SiteResponse> {
  return new Promise((resolve, reject) => {
    const transport = url.protocol === "https:" ? https : http
    let settled = false
    let timer: NodeJS.Timeout | undefined

    const finish = (error: Error | null, response?: SiteResponse) => {
      if (settled) return
      settled = true
      if (timer) clearTimeout(timer)
      if (error) reject(error)
      else if (response) resolve(response)
    }

    const req = transport.request(
      url,
      {
        method: "GET",
        headers: {
          Accept: "text/html,application/xhtml+xml,text/plain;q=0.8",
          "User-Agent":
            "AnchorScan/1.0 (+https://anchormarianas.com/scan) AI diagnostic bot",
        },
        lookup: (_hostname, _options, callback) => {
          const chosen = addresses[0]
          callback(null, chosen.address, chosen.family)
        },
      },
      (res) => {
        const status = res.statusCode ?? 0
        const contentType = String(res.headers["content-type"] ?? "")
        const location = Array.isArray(res.headers.location)
          ? res.headers.location[0]
          : res.headers.location

        if (status >= 300 && status < 400) {
          res.resume()
          finish(null, { status, contentType, location, body: "" })
          return
        }

        if (
          status < 200 ||
          status >= 300 ||
          !/^(?:text\/(?:html|plain)|application\/xhtml\+xml)\b/i.test(contentType)
        ) {
          res.resume()
          finish(null, { status, contentType, body: "" })
          return
        }

        const chunks: Buffer[] = []
        let bytes = 0
        res.on("data", (value: Buffer | string) => {
          const chunk = Buffer.isBuffer(value) ? value : Buffer.from(value)
          const remaining = maxBytes - bytes
          if (remaining > 0) {
            const kept = chunk.subarray(0, remaining)
            chunks.push(kept)
            bytes += kept.length
          }
          if (bytes >= maxBytes) {
            finish(null, {
              status,
              contentType,
              body: Buffer.concat(chunks).toString("utf8"),
            })
            res.destroy()
          }
        })
        res.on("end", () =>
          finish(null, {
            status,
            contentType,
            body: Buffer.concat(chunks).toString("utf8"),
          })
        )
        res.on("error", (error) => finish(error))
      }
    )

    timer = setTimeout(
      () => req.destroy(new Error("Website fetch timed out.")),
      timeoutMs
    )
    req.on("error", (error) => finish(error))
    req.end()
  })
}

export async function fetchPublicSiteText(
  input: string,
  {
    maxBytes = 64 * 1024,
    maxRedirects = 3,
    timeoutMs = 8000,
    lookup = lookupPublicHost,
    request = requestSite,
  }: SafeSiteFetchOptions = {}
) {
  let url = validatePublicUrl(input)

  for (let redirect = 0; redirect <= maxRedirects; redirect += 1) {
    const addresses = await lookup(url.hostname)
    if (!addresses.length || addresses.some((entry) => !isPublicAddress(entry.address))) {
      throw new Error("Host resolves to a private or reserved address.")
    }

    const response = await request(url, addresses, maxBytes, timeoutMs)
    if (response.status < 300 || response.status >= 400) return response.body
    if (!response.location || redirect === maxRedirects) {
      throw new Error("Website redirected too many times.")
    }
    url = validatePublicUrl(new URL(response.location, url).href)
  }

  return ""
}

export function readableSiteText(html: string) {
  return html
    .replace(/<script[^>]*>[\s\S]*?<\/script>/gi, "")
    .replace(/<style[^>]*>[\s\S]*?<\/style>/gi, "")
    .replace(/<[^>]+>/g, " ")
    .replace(/&nbsp;/g, " ")
    .replace(/&amp;/g, "&")
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">")
    .replace(/&quot;/g, '"')
    .replace(/&#39;/g, "'")
    .replace(/\s{2,}/g, " ")
    .trim()
    .slice(0, 6000)
}
