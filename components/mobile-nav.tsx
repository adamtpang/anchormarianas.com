"use client"

import { useState } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { Menu } from "lucide-react"
import { cn } from "@/lib/utils"
import siteConfig from "@/content/site.json"

const navigation = [
  { name: "Apps", href: "/#products" },
  { name: "Services", href: "/#services" },
  { name: "About", href: "/about" },
  { name: "Contact", href: "/contact" },
]

export function MobileNav() {
  const [open, setOpen] = useState(false)
  const pathname = usePathname()

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger asChild>
        <Button variant="ghost" size="sm" className="md:hidden h-9 w-9 px-0">
          <Menu className="h-5 w-5" />
          <span className="sr-only">Toggle menu</span>
        </Button>
      </SheetTrigger>
      <SheetContent side="right" className="w-80">
        <div className="flex flex-col h-full">
          <div className="flex items-center justify-between py-4">
            <Link href="/" className="text-xl font-semibold text-foreground" onClick={() => setOpen(false)}>
              {siteConfig.studioName}
            </Link>
          </div>

          <nav className="flex flex-col space-y-4 mt-8">
            {navigation.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                onClick={() => setOpen(false)}
                className={cn(
                  "text-lg font-medium transition-colors hover:text-accent py-2",
                  pathname === item.href ? "text-accent" : "text-muted-foreground",
                )}
              >
                {item.name}
              </Link>
            ))}
          </nav>

          <div className="mt-auto pt-8">
            <div className="flex flex-col space-y-4 text-sm text-muted-foreground">
              <Button asChild className="w-full mb-4">
                <Link href="/quote" onClick={() => setOpen(false)}>
                  Get Quote
                </Link>
              </Button>
              <Link
                href={siteConfig.socials.x}
                className="hover:text-accent transition-colors"
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => setOpen(false)}
              >
                Twitter
              </Link>
              <Link
                href={`mailto:${siteConfig.email}`}
                className="hover:text-accent transition-colors"
                onClick={() => setOpen(false)}
              >
                Email
              </Link>
            </div>
          </div>
        </div>
      </SheetContent>
    </Sheet>
  )
}