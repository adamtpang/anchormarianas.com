import type React from "react"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
})

export const metadata: Metadata = {
  title: "Anchor | AI Engineering Agency",
  description: "AI engineers who build what you need. Tell us your problem, we scope it, price it, build it, deliver it.",
  metadataBase: new URL("https://anchormarianas.com"),
  keywords: ["AI agency", "AI engineering", "software development", "vibe coding", "web development"],
  authors: [{ name: "Adam Tomas Pangelinan" }],
  creator: "Anchor Marianas LLC",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://anchormarianas.com",
    title: "Anchor | AI Engineering Agency",
    description: "AI engineers who build what you need. Fast, transparent, delivered.",
    siteName: "Anchor",
  },
  twitter: {
    card: "summary_large_image",
    title: "Anchor | AI Engineering Agency",
    description: "AI engineers who build what you need.",
    creator: "@adamtpang",
  },
  robots: { index: true, follow: true },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className={inter.variable} suppressHydrationWarning>
      <body className="font-sans antialiased min-h-screen bg-white text-foreground" suppressHydrationWarning>
        <div className="relative flex min-h-screen flex-col">
          <Header />
          <main className="flex-1">{children}</main>
          <Footer />
        </div>
      </body>
    </html>
  )
}
