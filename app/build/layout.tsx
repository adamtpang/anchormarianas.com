import type { Metadata } from "next"

const title = "Build with me: describe your project, get a plan and price | Anchor"
const description =
  "Tell Anchor what you want built. Get a scoped plan, an honest price range, and a timeline in a minute, then confirm it on a 15-minute call and start."

export const metadata: Metadata = {
  title,
  description,
  openGraph: {
    title: "Build with me | Anchor Marianas",
    description,
    url: "https://anchormarianas.com/build",
  },
}

export default function BuildLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>
}
