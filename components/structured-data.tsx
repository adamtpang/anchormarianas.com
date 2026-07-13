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
      description:
        "Productized AI engineering for small and medium businesses. We read what your customers already tell you in your reviews, then build the fix. Fixed price, live in days.",
      email: siteConfig.email,
      telephone: siteConfig.phone,
      founder: {
        "@type": "Person",
        name: siteConfig.founder,
      },
      address: {
        "@type": "PostalAddress",
        addressRegion: "Guam",
        addressCountry: "GU",
      },
      geo: {
        "@type": "GeoCoordinates",
        latitude: 13.4443,
        longitude: 144.7937,
      },
      areaServed: [
        { "@type": "Place", name: "Guam" },
        { "@type": "Place", name: "Asia Pacific" },
      ],
      sameAs: [
        siteConfig.socials.x,
        siteConfig.socials.github,
        siteConfig.socials.linkedin,
      ],
    },
    {
      "@type": "Service",
      "@id": `${SITE_URL}/#landing-page-build`,
      name: "Landing page in 5 days",
      serviceType: "Web design and development",
      description:
        "One page that sells one thing. Copy, design, build, and deploy, live in 5 days.",
      provider: { "@id": `${SITE_URL}/#business` },
      areaServed: { "@type": "Place", name: "Worldwide" },
    },
    {
      "@type": "Service",
      "@id": `${SITE_URL}/#mvp-build`,
      name: "MVP web app in 5 days",
      serviceType: "Software development",
      description:
        "One core workflow built end to end, with auth, database, and deploy included. Live in 5 days.",
      provider: { "@id": `${SITE_URL}/#business` },
      areaServed: { "@type": "Place", name: "Worldwide" },
    },
    {
      "@type": "Service",
      "@id": `${SITE_URL}/#ai-reception-pilot`,
      name: "AI Reception Pilot",
      serviceType: "AI automation",
      description:
        "A 24/7 AI receptionist on your existing number, configured for your top questions, booking flow, and escalation rules. Live in 7 days.",
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
