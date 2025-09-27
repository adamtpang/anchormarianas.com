import Link from "next/link"
import { Mail, Twitter } from "lucide-react"

export function Footer() {
  return (
    <footer className="border-t border-border/40 bg-muted/30">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center space-x-4 text-sm text-muted-foreground">
            <Link href="/newsletter" className="hover:text-accent transition-colors">
              Newsletter
            </Link>
            <Link
              href="https://twitter.com/adampang"
              className="hover:text-accent transition-colors flex items-center gap-1"
              target="_blank"
              rel="noopener noreferrer"
            >
              <Twitter className="h-4 w-4" />
              Twitter
            </Link>
            <Link
              href="https://warpcast.com/adampang"
              className="hover:text-accent transition-colors"
              target="_blank"
              rel="noopener noreferrer"
            >
              Farcaster
            </Link>
            <Link
              href="mailto:hello@adampang.com"
              className="hover:text-accent transition-colors flex items-center gap-1"
            >
              <Mail className="h-4 w-4" />
              Email
            </Link>
          </div>

          <div className="text-sm text-muted-foreground">© 2025 Adam Pang</div>
        </div>
      </div>
    </footer>
  )
}