import { NextResponse, type NextRequest } from "next/server"
import { BUY_COOKIE, buyGateDecision, isDeskPath } from "@/lib/buy/gate"

// Next 15.5 still executes middleware.ts, which this repo's entrypoint check rejects.
// This file is the request boundary once the app is on the Next.js proxy convention.
// app/buy/layout.tsx enforces the same decision on every render, so a missing proxy
// still fails closed.

const PRIVATE_HEADERS: Record<string, string> = {
  "X-Robots-Tag": "noindex, nofollow",
  "Cache-Control": "private, no-store",
}

function withPrivateHeaders(response: NextResponse) {
  for (const [key, value] of Object.entries(PRIVATE_HEADERS)) response.headers.set(key, value)
  return response
}

export async function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl
  if (!isDeskPath(pathname)) return NextResponse.next()

  const decision = await buyGateDecision(request.cookies.get(BUY_COOKIE)?.value)
  if (decision === "allow") return withPrivateHeaders(NextResponse.next())

  const url = request.nextUrl.clone()
  url.pathname = "/buy-gate"
  url.search = ""
  url.searchParams.set("next", pathname)
  return withPrivateHeaders(NextResponse.rewrite(url))
}

export const config = {
  matcher: ["/buy", "/buy/:path*"],
}
