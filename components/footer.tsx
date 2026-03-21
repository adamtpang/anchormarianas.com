import { Mail, Phone, MessageCircle } from "lucide-react"
import siteConfig from "@/content/site.json"

export function Footer() {
  return (
    <footer className="border-t border-border/40 bg-white">
      <div className="max-w-5xl mx-auto px-6 py-8">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div>
            <div className="font-bold">Anchor</div>
            <p className="text-sm text-muted-foreground">{siteConfig.legalName} &middot; Delaware, USA</p>
          </div>
          <div className="flex flex-wrap gap-4 text-sm text-muted-foreground">
            <a href={`mailto:${siteConfig.email}`} className="hover:text-foreground transition-colors flex items-center gap-1">
              <Mail className="w-3.5 h-3.5" />
              Email
            </a>
            <a href={siteConfig.whatsappLink} target="_blank" rel="noopener noreferrer" className="hover:text-foreground transition-colors flex items-center gap-1">
              <MessageCircle className="w-3.5 h-3.5" />
              WhatsApp
            </a>
            <a href={`tel:${siteConfig.phone}`} className="hover:text-foreground transition-colors flex items-center gap-1">
              <Phone className="w-3.5 h-3.5" />
              Call
            </a>
          </div>
        </div>
      </div>
    </footer>
  )
}
