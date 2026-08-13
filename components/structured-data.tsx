import siteConfig from "@/content/site.json"

// Server component that emits LocalBusiness + Service JSON-LD for SEO.
// Rendered once site-wide from the root layout.
const SITE_URL = "https://anchormarianas.com"

const structuredData = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "ProfessionalService",
      "@id": `${SITE_URL}/#business`,
      name: siteConfig.companyName,
      legalName: siteConfig.legalName,
      url: SITE_URL,
      areaServed: { "@type": "Place", name: "Guam" },
      priceRange: "$",
    },
    {
      "@type": "Service",
      name: "AI Opportunity Audit and Build",
      provider: { "@id": `${SITE_URL}/#business` },
      areaServed: { "@type": "Place", name: "Guam" },
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
