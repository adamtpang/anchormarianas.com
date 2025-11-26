import Link from "next/link"
import { Mail, Twitter, Github, ExternalLink } from "lucide-react"
import siteConfig from "@/content/site.json"

export function Footer() {
  return (
    <footer className="border-t border-border/40 bg-muted/30">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center space-x-4 text-sm text-muted-foreground">
            <Link
              href={siteConfig.personalSite}
              className="hover:text-accent transition-colors flex items-center gap-1"
              target="_blank"
              rel="noopener noreferrer"
            >
              <ExternalLink className="h-4 w-4" />
              Adam Pang
            </Link>
            <Link
              href={siteConfig.socials.github}
              className="hover:text-accent transition-colors flex items-center gap-1"
              target="_blank"
              rel="noopener noreferrer"
            >
              <Github className="h-4 w-4" />
              GitHub
            </Link>
            <Link
              href={siteConfig.socials.x}
              className="hover:text-accent transition-colors flex items-center gap-1"
              target="_blank"
              rel="noopener noreferrer"
            >
              <Twitter className="h-4 w-4" />
              Twitter
            </Link>
            <Link
              href={`mailto:${siteConfig.email}`}
              className="hover:text-accent transition-colors flex items-center gap-1"
            >
              <Mail className="h-4 w-4" />
              {siteConfig.email}
            </Link>
          </div>

          <div className="text-sm text-muted-foreground">© 2025 {siteConfig.studioName}</div>
        </div>
      </div>
    </footer>
  )
}