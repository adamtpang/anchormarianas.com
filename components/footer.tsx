import Link from "next/link"
import { Mail, Github, Twitter } from "lucide-react"
import siteConfig from "@/content/site.json"

export function Footer() {
  return (
    <footer className="border-t border-border/40 bg-background">
      <div className="max-w-5xl mx-auto px-6 py-10">
        <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-6">
          <div>
            <div className="font-display text-xl">Anchor Marianas</div>
            <p className="text-sm text-muted-foreground mt-1 max-w-sm">
              We find the knot, then ship the smallest AI piece that unties it.
            </p>
            <p className="text-xs text-muted-foreground/80 mt-3">
              Operated by{" "}
              <Link href="/about" className="underline underline-offset-4 hover:text-foreground">
                Adam Pangelinan
              </Link>
              . Proof-of-value work with{" "}
              <Link href="/work" className="underline underline-offset-4 hover:text-foreground">
                International Distributors, Inc.
              </Link>

            </p>
          </div>

          <div className="flex flex-wrap items-center gap-5 text-sm">
            <Link
              href="/work"
              className="inline-flex min-h-6 items-center text-foreground/90 transition-colors hover:text-accent"
            >
              Work
            </Link>
            <Link
              href="/about"
              className="inline-flex min-h-6 items-center text-foreground/90 transition-colors hover:text-accent"
            >
              About
            </Link>
            <a
              href={siteConfig.socials.x}
              target="_blank"
              rel="noopener noreferrer"
              className="flex min-h-6 items-center gap-2 text-foreground/90 transition-colors hover:text-accent"
              aria-label="X"
            >
              <Twitter className="w-4 h-4" /> X
            </a>
            <a
              href={siteConfig.socials.github}
              target="_blank"
              rel="noopener noreferrer"
              className="flex min-h-6 items-center gap-2 text-foreground/90 transition-colors hover:text-accent"
              aria-label="GitHub"
            >
              <Github className="w-4 h-4" /> GitHub
            </a>
            <a
              href={`mailto:${siteConfig.email}`}
              className="flex min-h-6 items-center gap-2 text-foreground/90 transition-colors hover:text-accent"
            >
              <Mail className="w-4 h-4" /> {siteConfig.email}
            </a>
          </div>
        </div>

        <div className="mt-8 border-t border-border/40 pt-6 flex flex-wrap items-center gap-x-5 gap-y-2 text-xs text-muted-foreground">
          <span>{siteConfig.legalName}</span>
          <Link
            href="/privacy"
            className="inline-flex min-h-6 items-center transition-colors hover:text-foreground"
          >
            Privacy
          </Link>
          <Link
            href="/terms"
            className="inline-flex min-h-6 items-center transition-colors hover:text-foreground"
          >
            Terms
          </Link>
        </div>
      </div>
    </footer>
  )
}
