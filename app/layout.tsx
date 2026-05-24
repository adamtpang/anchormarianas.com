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
  title: "Anchor Marianas: Free Anchor Scan for Guam businesses",
  description:
    "Turn public customer reviews into one practical AI-assisted workflow in 7 days. Free Anchor Scan diagnostics and $750 Review-to-Revenue Sprint for Guam and Pacific businesses.",
  metadataBase: new URL("https://anchormarianas.com"),
  keywords: [
    "Anchor Scan",
    "Google Maps review analysis",
    "Guam AI workflows",
    "customer review diagnostics",
    "software development",
    "Guam",
    "Pacific",
  ],
  authors: [{ name: "Adam Tomas Pangelinan" }],
  creator: "Anchor Marianas LLC",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://anchormarianas.com",
    title: "Anchor Marianas: Free Anchor Scan for Guam businesses",
    description:
      "Free customer review diagnostics and a $750 Review-to-Revenue Sprint for Guam and Pacific businesses.",
    siteName: "Anchor",
  },
  twitter: {
    card: "summary_large_image",
    title: "Anchor Marianas: Free Anchor Scan for Guam businesses",
    description:
      "Free customer review diagnostics and a $750 Review-to-Revenue Sprint for Guam and Pacific businesses.",
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
