import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "AnchorScan — Free AI Diagnostic for Your Business | Anchor",
  description:
    "Paste your URL. Get your top 3 AI workflow opportunities ranked by dollar impact. Free, instant, no account required.",
  openGraph: {
    title: "AnchorScan — Free AI Diagnostic for Your Business",
    description:
      "Paste your URL. Get your top 3 AI workflow opportunities ranked by dollar impact. Free, instant, no account required.",
    url: "https://anchormarianas.com/scan",
  },
}

export default function ScanLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>
}
