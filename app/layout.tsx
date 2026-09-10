import type React from "react"
import type { Metadata } from "next"
import { Inter, Geist_Mono } from "next/font/google"
import "./globals.css"
import "./design-system.css"
import { MotionPreferences } from "@/components/motion-preferences"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { ThemeProvider } from "@/components/theme-provider"
import { StructuredData } from "@/components/structured-data"
import { PostHogProvider } from "./providers"

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
})


const geistMono = Geist_Mono({
  subsets: ["latin"],
  variable: "--font-geist-mono",
  display: "swap",
})

const title = "Anchor Marianas | Websites & Webapps for Businesses"
const description =
  "Websites and webapps for businesses. Clear scope, fixed-price packages and direct support from Anchor Marianas. Based in Guam, working remotely."

export const metadata: Metadata = {
  title,
  description,
  metadataBase: new URL("https://anchormarianas.com"),
  keywords: [
    "Anchor Marianas",
    "Anchor Scan",
    "Guam business",
    "Google reviews analysis",
    "AI for Guam businesses",
    "customer review diagnostic",
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
  alternates: {
    canonical: "/",
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html
      lang="en"
      className={`${inter.variable} ${geistMono.variable}`}
      suppressHydrationWarning
    >
      <body
        className="font-sans antialiased min-h-screen bg-background text-foreground"
        suppressHydrationWarning
      >
        <StructuredData />
        <PostHogProvider>
          <ThemeProvider
            attribute="class"
            defaultTheme="light"
            enableSystem
            disableTransitionOnChange
          >
            <MotionPreferences><div className="relative flex min-h-screen flex-col">
              <a href="#main-content" className="fixed top-0 left-2 z-[60] -translate-y-full bg-background p-4 focus:translate-y-0">Skip to content</a>
              <Header />
              <main id="main-content" tabIndex={-1} className="flex-1">{children}</main>
              <Footer />
            </div>
          </MotionPreferences></ThemeProvider>
        </PostHogProvider>
      </body>
    </html>
  )
}
