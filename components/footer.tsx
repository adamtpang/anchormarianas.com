import { Mail, Github, Twitter } from "lucide-react"
import siteConfig from "@/content/site.json"

export function Footer() {
  return (
    <footer className="border-t border-border/40 bg-background">
      <div className="max-w-5xl mx-auto px-6 py-10">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-6">
          <div>
            <div className="font-display text-xl">Adam Pang</div>
            <p className="text-sm text-muted-foreground mt-1">
              Musician. Philosopher. Builder. Guam.
            </p>
          </div>

          <div className="flex items-center gap-5 text-sm">
            <a
              href={siteConfig.socials.x}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 text-foreground/90 hover:text-accent transition-colors"
              aria-label="X"
            >
              <Twitter className="w-4 h-4" /> X
            </a>
            <a
              href={siteConfig.socials.github}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 text-foreground/90 hover:text-accent transition-colors"
              aria-label="GitHub"
            >
              <Github className="w-4 h-4" /> GitHub
            </a>
            <a
              href={`mailto:${siteConfig.email}`}
              className="flex items-center gap-2 text-foreground/90 hover:text-accent transition-colors"
            >
              <Mail className="w-4 h-4" /> {siteConfig.email}
            </a>
          </div>
        </div>
      </div>
    </footer>
  )
}
