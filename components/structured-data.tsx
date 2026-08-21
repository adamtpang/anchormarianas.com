import siteConfig from "@/content/site.json"

// Server component that emits Organization/WebSite JSON-LD for SEO.
// Rendered once site-wide from the root layout.
const SITE_URL = "https://anchormarianas.com"

const structuredData = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": ["Organization", "ProfessionalService"],
      "@id": `${SITE_URL}/#business`,
      name: siteConfig.companyName,
      legalName: siteConfig.legalName,
      url: SITE_URL,
      description: siteConfig.elevator,
      email: siteConfig.email,
      telephone: siteConfig.phone,
      areaServed: { "@type": "Place", name: "Guam" },
      priceRange: "$",
      founder: { "@id": `${SITE_URL}/#founder` },
      sameAs: [
        siteConfig.socials.x,
        siteConfig.socials.github,
        siteConfig.socials.linkedin,
      ],
    },
    {
      "@type": "Person",
      "@id": `${SITE_URL}/#founder`,
      name: siteConfig.founder,
      sameAs: [siteConfig.socials.linkedin, siteConfig.socials.x],
    },
    {
      "@type": "WebSite",
      "@id": `${SITE_URL}/#website`,
      url: SITE_URL,
      name: siteConfig.companyName,
      publisher: { "@id": `${SITE_URL}/#business` },
      author: { "@id": `${SITE_URL}/#founder` },
    },
  ],
}

export function StructuredData() {
  return (
    <script
      type="application/ld+json"
      // biome-ignore lint/security/noDangerouslySetInnerHtml: JSON-LD is a controlled, static object.
      dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
    />
  )
}
