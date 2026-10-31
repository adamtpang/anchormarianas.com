import type { Metadata } from "next"
import type { ReactNode } from "react"
import { cookies } from "next/headers"
import { BuyGatePanel } from "@/components/buy/gate-panel"
import { BuyProvider } from "@/components/buy/provider"
import { BuyShell } from "@/components/buy/shell"
import { BUY_COOKIE, buyGateDecision } from "@/lib/buy/gate"

export const dynamic = "force-dynamic"

export const metadata: Metadata = {
  title: "Buy desk | Anchor Marianas",
  description: "Private desk.",
  robots: { index: false, follow: false, nocache: true, googleBot: { index: false, follow: false, noimageindex: true } },
}

export default async function BuyLayout({ children }: { children: ReactNode }) {
  const jar = await cookies()
  const decision = await buyGateDecision(jar.get(BUY_COOKIE)?.value)
  if (decision !== "allow") {
    return (
      <div className="agency-page">
        <BuyGatePanel closed={decision === "closed"} invalid={false} nextPath="/buy" />
      </div>
    )
  }
  return (
    <div className="agency-page">
      <BuyProvider>
        <BuyShell>{children}</BuyShell>
      </BuyProvider>
    </div>
  )
}
