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
  title: "Anchor: The AI layer of your business.",
  description:
    "Anchor builds AI products and services for businesses entering the AI age. From Guam, near the deepest place on Earth. We ship.",
  metadataBase: new URL("https://anchormarianas.com"),
  keywords: [
    "AI agency",
    "AI engineering",
    "AI products",
    "AI services",
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
    title: "Anchor: The AI layer of your business.",
    description:
      "AI products and services for businesses entering the AI age. We ship.",
    siteName: "Anchor",
  },
  twitter: {
    card: "summary_large_image",
    title: "Anchor: The AI layer of your business.",
    description:
      "AI products and services for businesses entering the AI age. We ship.",
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
