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

export const metadata: Metadata = {
  title: "Adam Pang — Musician. Philosopher. Builder.",
  description:
    "I diagnose your biggest operational bottleneck, then build you a working AI cure in 5 days. AI Build Sprints by Adam Pang.",
  metadataBase: new URL("https://anchormarianas.com"),
  keywords: [
    "Adam Pang",
    "AI Build Sprints",
    "AI consultant",
    "Guam",
    "Anchor Marianas",
  ],
  authors: [{ name: "Adam Tomas Pangelinan" }],
  creator: "Adam Pang",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://anchormarianas.com",
    title: "Adam Pang — Musician. Philosopher. Builder.",
    description:
      "I diagnose your biggest operational bottleneck, then build you a working AI cure in 5 days.",
    siteName: "Adam Pang",
  },
  twitter: {
    card: "summary_large_image",
    title: "Adam Pang — Musician. Philosopher. Builder.",
    description:
      "I diagnose your biggest operational bottleneck, then build you a working AI cure in 5 days.",
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
