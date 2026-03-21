"use client"

import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { Menu } from "lucide-react"
import siteConfig from "@/content/site.json"

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
            <Link href="/" className="text-lg font-bold" onClick={() => setOpen(false)}>
              Anchor
            </Link>
          </div>

          <div className="mt-auto pt-8 space-y-3">
            <Button className="w-full" asChild>
              <a href={siteConfig.calendly} target="_blank" rel="noopener noreferrer" onClick={() => setOpen(false)}>
                Book a Call
              </a>
            </Button>
            <Button className="w-full" variant="outline" asChild>
              <a href={siteConfig.whatsappLink} target="_blank" rel="noopener noreferrer" onClick={() => setOpen(false)}>
                WhatsApp
              </a>
            </Button>
            <div className="text-sm text-muted-foreground space-y-2 pt-2">
              <a href={`mailto:${siteConfig.email}`} className="block hover:text-foreground">{siteConfig.email}</a>
              <a href={`tel:${siteConfig.phone}`} className="block hover:text-foreground">{siteConfig.phoneDisplay}</a>
            </div>
          </div>
        </div>
      </SheetContent>
    </Sheet>
  )
}
