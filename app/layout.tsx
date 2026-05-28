import type React from "react"
import type { Metadata } from "next"
import { Inter, Instrument_Serif, Geist_Mono } from "next/font/google"
import "./globals.css"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { ThemeProvider } from "@/components/theme-provider"
import { PostHogProvider } from "./providers"

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
})

const instrumentSerif = Instrument_Serif({
  subsets: ["latin"],
  weight: "400",
  style: ["normal", "italic"],
  variable: "--font-instrument-serif",
  display: "swap",
})

const geistMono = Geist_Mono({
  subsets: ["latin"],
  variable: "--font-geist-mono",
  display: "swap",
})

const title = "Anchor Marianas — 5-day AI builds for founders, creators, and operators"
const description =
  "Sit with us for 30 minutes. We find the knot in your work and ship the AI piece that unties it in 5 days."

export const metadata: Metadata = {
  title,
  description,
  metadataBase: new URL("https://anchormarianas.com"),
  keywords: [
    "Anchor Marianas",
    "AI build sprint",
    "AI for founders",
    "AI for creators",
    "AI for operators",
    "5-day AI build",
  ],
  authors: [{ name: "Anchor Marianas" }],
  creator: "Anchor Marianas",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://anchormarianas.com",
    title,
    description,
    siteName: "Anchor Marianas",
  },
  twitter: {
    card: "summary_large_image",
    title,
    description,
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
    <html
      lang="en"
      className={`${inter.variable} ${instrumentSerif.variable} ${geistMono.variable}`}
      suppressHydrationWarning
    >
      <body
        className="font-sans antialiased min-h-screen bg-background text-foreground"
        suppressHydrationWarning
      >
        <PostHogProvider>
          <ThemeProvider
            attribute="class"
            defaultTheme="dark"
            enableSystem
            disableTransitionOnChange
          >
            <div className="relative flex min-h-screen flex-col">
              <Header />
              <main className="flex-1">{children}</main>
              <Footer />
            </div>
          </ThemeProvider>
        </PostHogProvider>
      </body>
    </html>
  )
}
