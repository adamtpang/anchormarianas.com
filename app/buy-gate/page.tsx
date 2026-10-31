import type { Metadata } from "next"
import { cookies } from "next/headers"
import { redirect } from "next/navigation"
import { BuyGatePanel } from "@/components/buy/gate-panel"
import { BUY_COOKIE, buyGateDecision, safeBuyNext } from "@/lib/buy/gate"

export const dynamic = "force-dynamic"

export const metadata: Metadata = {
  title: "Buy desk | Anchor Marianas",
  description: "Private desk.",
  robots: { index: false, follow: false, nocache: true, googleBot: { index: false, follow: false, noimageindex: true } },
}

export default async function BuyGatePage({
  searchParams,
}: {
  searchParams: Promise<{ error?: string; next?: string; closed?: string }>
}) {
  const params = await searchParams
  const nextPath = safeBuyNext(params.next)
  const jar = await cookies()
  const decision = await buyGateDecision(jar.get(BUY_COOKIE)?.value)
  if (decision === "allow") redirect(nextPath)
  return (
    <div className="agency-page">
      <BuyGatePanel closed={decision === "closed"} invalid={params.error === "1" && decision !== "closed"} nextPath={nextPath} />
    </div>
  )
}
