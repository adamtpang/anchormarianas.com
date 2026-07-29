import type { Metadata } from "next"

const title = "AI Opportunity Audit: score where AI saves you time and money | Anchor"
const description =
  "Enter your website or a sentence. Get a free AI Opportunity Score and a ranked map of where AI pays off in your business. The paid audit turns it into a plan and a build."

export const metadata: Metadata = {
  title,
  description,
  openGraph: {
    title: "AI Opportunity Audit | Anchor Marianas",
    description,
    url: "https://anchormarianas.com/audit",
  },
}

export default function AuditLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>
}
