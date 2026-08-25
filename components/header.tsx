"use client"

import Link from "next/link"
import siteConfig from "@/content/site.json"
import { MobileNav } from "@/components/mobile-nav"
import { ThemeToggle } from "@/components/theme-toggle"
import { Button } from "@/components/ui/button"

const bookUrl = siteConfig.discoveryCal

const nav = [
  { href: "/scan", label: "Scan" },
  { href: "/pricing", label: "Services" },
  { href: "/work", label: "Work" },
  { href: "/about", label: "About" },
]

export function Header() {
  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/70 backdrop-blur-xl">
      <div className="max-w-5xl mx-auto px-6">
        <div className="flex h-14 items-center justify-between">
          <Link href="/" className="flex items-center gap-2 group">
            <span className="font-display text-xl tracking-tight group-hover:text-accent transition-colors">
              Anchor Marianas
            </span>
          </Link>

          <nav className="hidden md:flex items-center gap-7 text-sm">
            {nav.map((n) => (
              <Link
                key={n.href}
                href={n.href}
                className="inline-flex min-h-8 items-center text-muted-foreground transition-colors hover:text-foreground"
              >
                {n.label}
              </Link>
            ))}
            <ThemeToggle />
            <Button asChild size="sm" className="rounded-full px-4">
              <a href={bookUrl}>Untangling call &rarr;</a>
            </Button>
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
