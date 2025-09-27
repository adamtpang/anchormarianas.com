import type React from "react"
import type { Metadata } from "next"
import { Inter, JetBrains_Mono } from "next/font/google"
import "./globals.css"
import { ThemeProvider } from "@/components/theme-provider"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { ScrollToTop } from "@/components/scroll-to-top"

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
  title: "Adam Pang - Building code, music & philosophy",
  description: "Personal site of Adam Pang - developer, creator, and thinker at Network School.",
  keywords: ["developer", "philosophy", "music", "code", "essays", "projects"],
  authors: [{ name: "Adam Pang" }],
  creator: "Adam Pang",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://adampang.com",
    title: "Adam Pang",
    description: "Building code, music & philosophy at Network School.",
    siteName: "Adam Pang",
  },
  twitter: {
    card: "summary_large_image",
    title: "Adam Pang",
    description: "Building code, music & philosophy at Network School.",
    creator: "@adampang",
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
      <body className="font-sans antialiased min-h-screen bg-background text-foreground" suppressHydrationWarning>
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem disableTransitionOnChange>
          <div className="relative flex min-h-screen flex-col">
            <Header />
            <main className="flex-1">{children}</main>
            <Footer />
            <ScrollToTop />
          </div>
        </ThemeProvider>
      </body>
    </html>
  )
}