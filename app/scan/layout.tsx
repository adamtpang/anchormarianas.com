import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "AnchorScan: free AI diagnostic for your business | Anchor",
  description:
    "Paste your URL. We surface the operational patterns worth a conversation and the questions worth answering. Free, no account, no pitch.",
  openGraph: {
    title: "AnchorScan: free AI diagnostic for your business",
    description:
      "Paste your URL. We surface the operational patterns worth a conversation and the questions worth answering. Free, no account, no pitch.",
    url: "https://anchormarianas.com/scan",
  },
}

export default function ScanLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>
}
