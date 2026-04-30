"use client"

import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { Menu } from "lucide-react"
import siteConfig from "@/content/site.json"

const nav = [
  { href: "/#problems", label: "Problems" },
  { href: "/#services", label: "Services" },
  { href: "/#team", label: "Team" },
  { href: "/careers", label: "Careers" },
]

export function MobileNav() {
  const [open, setOpen] = useState(false)

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger asChild>
        <Button variant="ghost" size="sm" className="md:hidden h-9 w-9 px-0">
          <Menu className="h-5 w-5" />
          <span className="sr-only">Menu</span>
        </Button>
      </SheetTrigger>
      <SheetContent side="right" className="w-72">
        <div className="flex flex-col h-full">
          <div className="py-4">
            <Link
              href="/"
              className="font-display text-2xl"
              onClick={() => setOpen(false)}
            >
              Anchor
            </Link>
            <div className="text-[10px] uppercase tracking-[0.25em] font-mono-anchor text-muted-foreground mt-1">
              we ship.
            </div>
          </div>

          <nav className="flex flex-col gap-1 mt-6">
            {nav.map((n) => (
              <Link
                key={n.href}
                href={n.href}
                onClick={() => setOpen(false)}
                className="py-2 text-base font-medium hover:text-accent transition-colors"
              >
                {n.label}
              </Link>
            ))}
          </nav>

          <div className="mt-auto pt-8 space-y-3">
            <Button className="w-full" asChild>
              <a
                href={siteConfig.calendly}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => setOpen(false)}
              >
                Book a Call
              </a>
            </Button>
            <Button className="w-full" variant="outline" asChild>
              <a
                href={siteConfig.whatsappLink}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => setOpen(false)}
              >
                WhatsApp
              </a>
            </Button>
            <div className="text-sm text-muted-foreground space-y-2 pt-2">
              <a
                href={`mailto:${siteConfig.email}`}
                className="block hover:text-foreground"
              >
                {siteConfig.email}
              </a>
              <a
                href={`tel:${siteConfig.phone}`}
                className="block hover:text-foreground"
              >
                {siteConfig.phoneDisplay}
              </a>
            </div>
          </div>
        </div>
      </SheetContent>
    </Sheet>
  )
}
