import { Mail, Phone, MessageCircle, Github, Twitter, Linkedin } from "lucide-react"
import siteConfig from "@/content/site.json"

export function Footer() {
  return (
    <footer className="border-t border-border/40 bg-background">
      <div className="max-w-5xl mx-auto px-6 py-10">
        <div className="grid sm:grid-cols-3 gap-8 sm:gap-6">
          <div>
            <div className="font-display text-2xl">Anchor</div>
            <div className="text-[10px] uppercase tracking-[0.25em] font-mono-anchor text-muted-foreground mt-1">
              we ship · 35,876 ft
            </div>
            <p className="text-sm text-muted-foreground mt-4 leading-relaxed">
              {siteConfig.legalName} · Delaware, USA<br />
              Built from Guam.
            </p>
          </div>

          <div className="text-sm space-y-2">
            <div className="text-muted-foreground uppercase tracking-wider text-xs mb-3">
              Site
            </div>
            <a href="/#apps" className="block text-foreground/90 hover:text-accent transition-colors">Apps</a>
            <a href="/#clients" className="block text-foreground/90 hover:text-accent transition-colors">Clients</a>
            <a href="/#come-aboard" className="block text-foreground/90 hover:text-accent transition-colors">Come aboard</a>
            <a href={siteConfig.calendly} target="_blank" rel="noopener noreferrer" className="block text-foreground/90 hover:text-accent transition-colors">Book a call</a>
          </div>

          <div className="text-sm space-y-2">
            <div className="text-muted-foreground uppercase tracking-wider text-xs mb-3">
              Reach us
            </div>
            <a
              href={`mailto:${siteConfig.email}`}
              className="flex items-center gap-2 text-foreground/90 hover:text-accent transition-colors"
            >
              <Mail className="w-3.5 h-3.5" /> {siteConfig.email}
            </a>
            <a
              href={siteConfig.whatsappLink}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 text-foreground/90 hover:text-accent transition-colors"
            >
              <MessageCircle className="w-3.5 h-3.5" /> WhatsApp
            </a>
            <a
              href={`tel:${siteConfig.phone}`}
              className="flex items-center gap-2 text-foreground/90 hover:text-accent transition-colors"
            >
              <Phone className="w-3.5 h-3.5" /> {siteConfig.phoneDisplay}
            </a>
            <div className="flex items-center gap-3 pt-2">
              <a href={siteConfig.socials.x} target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:text-foreground" aria-label="X">
                <Twitter className="w-4 h-4" />
              </a>
              <a href={siteConfig.socials.github} target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:text-foreground" aria-label="GitHub">
                <Github className="w-4 h-4" />
              </a>
              <a href={siteConfig.socials.linkedin} target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:text-foreground" aria-label="LinkedIn">
                <Linkedin className="w-4 h-4" />
              </a>
            </div>
          </div>
        </div>
        <div className="mt-10 pt-6 border-t border-border/30 text-center text-xs text-muted-foreground">
          Built by <a href="https://adampang.com" className="hover:text-accent transition-colors underline">Adam Pangelinan</a>
          {' · '}<a href="https://sellsniper.com" className="hover:text-accent transition-colors underline">More projects in the Aether</a>
        </div>
      </div>
    </footer>
  )
}
