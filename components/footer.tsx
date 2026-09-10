import Link from "next/link"
import site from "@/content/site.json"

export function Footer() {
  return <footer className="border-t border-border bg-background"><div className="journey-wrap py-8 flex flex-wrap items-center justify-between gap-6"><Link href="/" className="font-semibold">Anchor Marianas</Link><nav aria-label="Footer" className="flex flex-wrap items-center gap-x-5 text-sm text-muted-foreground"><Link href="/about">About</Link><a href={`mailto:${site.email}`}>Contact</a><Link href="/privacy">Privacy</Link><Link href="/terms">Terms</Link></nav></div></footer>
}
