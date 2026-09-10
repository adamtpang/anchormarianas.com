"use client"

import Link from "next/link"
import { MobileNav } from "@/components/mobile-nav"
import { ThemeToggle } from "@/components/theme-toggle"
import { Button } from "@/components/ui/button"

const nav = [
  { href: "/services", label: "Services" },
  { href: "/pricing", label: "Pricing" },
  { href: "/work", label: "Work" },
  { href: "/about", label: "About" },
  { href: "/scan", label: "AnchorScan" },
]

export function Header() {
  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/70 backdrop-blur-xl">
      <div className="journey-wrap">
        <div className="flex h-20 items-center justify-between">
          <Link href="/" className="flex items-center gap-2 group">
            <span className="font-sans font-bold text-xl tracking-tight group-hover:text-accent transition-colors">
              Anchor Marianas
            </span>
          </Link>

          <nav aria-label="Main navigation" className="hidden md:flex items-center gap-7 text-sm">
            {nav.map((n) => (
              <Link
                key={n.href}
                href={n.href}
                className="inline-flex min-h-11 items-center text-muted-foreground transition-colors hover:text-foreground"
              >
                {n.label}
              </Link>
            ))}
            <ThemeToggle />
            <Button asChild size="sm" className="rounded-md px-4">
              <Link href="/contact">Start a project &rarr;</Link>
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
