import type React from "react"
import type { Metadata } from "next"
import { Inter, JetBrains_Mono } from "next/font/google"
import "./globals.css"
import { Header } from "@/components/header"
import { OceanFooter } from "@/components/ocean-footer"

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
})

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-jetbrains-mono",
  display: "swap",
})

export const metadata: Metadata = {
  title: "anchormarianas.com",
  description: "We build internet products. We deliver for clients.",
  metadataBase: new URL("https://anchormarianas.com"),
  keywords: ["web development", "studio", "startup", "products", "services", "apps"],
  authors: [{ name: "Adam Pangelinan" }],
  creator: "AnchorMarianas",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://anchormarianas.com",
    title: "AnchorMarianas",
    description: "We build internet products. We deliver for clients.",
    siteName: "AnchorMarianas",
    images: [{ url: "/og.jpg", width: 1200, height: 630 }],
  },
  twitter: {
    card: "summary_large_image",
    title: "AnchorMarianas",
    description: "We build internet products. We deliver for clients.",
    creator: "@adamtpang",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className={`${inter.variable} ${jetbrainsMono.variable}`} suppressHydrationWarning>
      <body className="font-sans antialiased min-h-screen bg-white text-foreground" suppressHydrationWarning>
        <div className="relative flex min-h-screen flex-col">
          <Header />
          <main className="flex-1 bg-white">{children}</main>
          <OceanFooter />
        </div>
      </body>
    </html>
  )
}