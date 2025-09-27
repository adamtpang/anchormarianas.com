"use client"

import { useState } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { Menu } from "lucide-react"
import { cn } from "@/lib/utils"

const navigation = [
  { name: "About", href: "/about" },
  { name: "Essays", href: "/essays" },
  { name: "Projects", href: "/projects" },
  { name: "Stream", href: "/stream" },
  { name: "Start Here", href: "/start-here" },
  { name: "Work With Me", href: "/work-with-me" },
  { name: "Now", href: "/now" },
  { name: "Support", href: "/support" },
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
              Adam Pang
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
              <Link href="/newsletter" className="hover:text-accent transition-colors" onClick={() => setOpen(false)}>
                Newsletter
              </Link>
              <Link
                href="https://twitter.com/adampang"
                className="hover:text-accent transition-colors"
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => setOpen(false)}
              >
                Twitter
              </Link>
              <Link
                href="mailto:hello@adampang.com"
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