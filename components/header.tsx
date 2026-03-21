"use client"

import Link from "next/link"
import siteConfig from "@/content/site.json"
import { MobileNav } from "@/components/mobile-nav"

export function Header() {
  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-white/80 backdrop-blur-xl">
      <div className="max-w-5xl mx-auto px-6">
        <div className="flex h-14 items-center justify-between">
          <Link href="/" className="text-lg font-bold text-foreground">
            Anchor
          </Link>

          <div className="hidden md:flex items-center gap-6">
            <a
              href={siteConfig.calendly}
              target="_blank"
              rel="noopener noreferrer"
              className="text-sm font-semibold bg-foreground text-white px-4 py-2 rounded-lg hover:bg-foreground/90 transition-colors"
            >
              Book a Call
            </a>
          </div>

          <MobileNav />
        </div>
      </div>
    </header>
  )
}
