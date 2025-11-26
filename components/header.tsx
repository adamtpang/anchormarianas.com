"use client"

import Link from "next/link"
import Image from "next/image"
import { usePathname } from "next/navigation"
import { cn } from "@/lib/utils"
import siteConfig from "@/content/site.json"

const navigation = [
  { name: "Apps", href: "/#products" },
  { name: "Services", href: "/#services" },
  { name: "Team", href: "/#team" },
]

export function Header() {
  const pathname = usePathname()

  return (
    <header className="sticky top-0 z-50 w-full border-b border-white/10 bg-gradient-to-r from-[#001a33] via-[#002147] to-[#001a33] backdrop-blur">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          <div className="flex items-center">
            <Link href="/" className="text-xl font-semibold text-white hover:text-blue-200 transition-colors flex items-center gap-3">
              <Image
                src="/logo.png"
                alt="AnchorMarianas"
                width={32}
                height={32}
                className="w-8 h-8"
              />
              {siteConfig.studioName}
            </Link>
          </div>

          <nav className="hidden md:flex items-center space-x-8">
            {navigation.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className={cn(
                  "text-sm font-medium transition-colors relative group",
                  pathname === item.href ? "text-white" : "text-blue-200 hover:text-white",
                )}
              >
                {item.name}
                <span className={cn(
                  "absolute -bottom-1 left-0 h-0.5 bg-blue-400 transition-all duration-300",
                  pathname === item.href ? "w-full" : "w-0 group-hover:w-full"
                )} />
              </Link>
            ))}
          </nav>

          <div className="flex items-center space-x-4">
            {/* Personal site link moved to team section */}
          </div>
        </div>
      </div>
    </header>
  )
}
