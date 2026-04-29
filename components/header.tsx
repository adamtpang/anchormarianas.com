"use client"

import Link from "next/link"
import siteConfig from "@/content/site.json"
import { MobileNav } from "@/components/mobile-nav"
import { ThemeToggle } from "@/components/theme-toggle"

const nav = [
  { href: "/#services", label: "Services" },
  { href: "/#products", label: "Products" },
  { href: "/#clients", label: "Clients" },
  { href: "/careers", label: "Careers" },
]

export function Header() {
  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/70 backdrop-blur-xl">
      <div className="max-w-5xl mx-auto px-6">
        <div className="flex h-14 items-center justify-between">
          <Link href="/" className="flex items-center gap-2 group">
            <span className="font-display text-xl tracking-tight group-hover:text-accent transition-colors">
              Anchor
            </span>
            <span className="hidden sm:inline-flex items-center text-[10px] uppercase tracking-[0.25em] font-mono-anchor text-muted-foreground">
              we&nbsp;ship.
            </span>
          </Link>

          <nav className="hidden md:flex items-center gap-7 text-sm">
            {nav.map((n) => (
              <Link
                key={n.href}
                href={n.href}
                className="text-muted-foreground hover:text-foreground transition-colors"
              >
                {n.label}
              </Link>
            ))}
            <ThemeToggle />
            <a
              href={siteConfig.calendly}
              target="_blank"
              rel="noopener noreferrer"
              className="font-semibold bg-foreground text-background px-4 py-2 rounded-lg hover:bg-foreground/90 transition-colors"
            >
              Book a Call
            </a>
          </nav>

          <div className="flex items-center gap-1 md:hidden">
            <ThemeToggle />
            <MobileNav />
          </div>
        </div>
      </div>
    </header>
  )
}
