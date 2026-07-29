import Link from "next/link"
import siteConfig from "@/content/site.json"
import servicesData from "@/content/services.json"
import { CheckoutButton } from "@/components/checkout-button"

const bookUrl = siteConfig.discoveryCal

const offerSlugs = ["landing-page-5-day", "mvp-5-day"]
const offers = servicesData.filter((s) => offerSlugs.includes(s.slug))

export const metadata = {
  title: "Web design in Guam, live in 5 days | Anchor Marianas",
  description:
    "Website designer and web developer in Barrigada, Guam. $497 landing page or $1,997 web app, live in 5 days, refund if late. Built IDI Guam's site. Working with Hilton.",
  keywords: [
    "web design Guam",
    "website designer Guam",
    "Guam web developer",
    "web design Barrigada",
    "Guam website builder",
    "Anchor Marianas",
  ],
  alternates: {
    canonical: "https://anchormarianas.com/guam",
  },
}

const scanBtn =
  "inline-flex items-center justify-center rounded-full bg-accent px-7 py-3.5 text-[0.95rem] font-semibold text-accent-foreground transition hover:opacity-90 focus:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-background"

const buyBtn =
  "mt-8 inline-flex items-center justify-center rounded-full bg-foreground px-6 py-3 text-[0.95rem] font-semibold text-background transition hover:opacity-90 focus:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-background"

const quietLink =
  "underline underline-offset-4 decoration-border transition hover:text-foreground hover:decoration-foreground"

const faqs = [
  {
    q: "How much does web design in Guam cost?",
    a: "At Anchor Marianas, a one-page site is $497 flat and a working web app is $1,997 flat. No quotes, no scoping drag. If we miss the 5-day deadline, you get a refund.",
  },
  {
    q: "How long does a website designer in Guam take to build a site?",
    a: "Five days from payment to live. That covers copy, design, build, and deploy, with your booking or checkout link wired in. Late means refunded.",
  },
  {
    q: "Can a Guam web developer build a full web app, not just a landing page?",
    a: "Yes. The $1,997 build ships one core workflow end to end: auth, database, and deploy included, with the source code handed over.",
  },
  {
    q: "Why hire a local Guam web designer instead of an overseas agency?",
    a: "Same timezone, same island. We meet in person, we know what Guam customers search for, and we answer while your business is open. We built IDI Guam's site and work with Hilton.",
  },
]

const whyLocal = [
  {
    n: "01",
    title: "Same timezone, same island",
    body: "We answer on Chamorro Standard Time, while your business is open. No overnight emails to an agency eight timezones away.",
  },
  {
    n: "02",
    title: "We know the market",
    body: "Guam customers search for hours, menus, booking, and directions before they visit. We build sites that answer those questions fast, for locals and for visitors.",
  },
  {
    n: "03",
    title: "You can find us",
    body: "Anchor Marianas LLC is based in Barrigada. We sit across the table from you, walk through the build, and hand over the keys in person if you want.",
  },
]

const localBusinessJsonLd = {
  "@context": "https://schema.org",
  "@type": "LocalBusiness",
  "@id": "https://anchormarianas.com/guam#business",
  name: siteConfig.legalName,
  alternateName: "Anchor Marianas",
  url: "https://anchormarianas.com/guam",
  description:
    "Web design studio in Barrigada, Guam. Landing pages and web apps, live in 5 days, flat price, refund if late.",
  email: siteConfig.email,
  telephone: siteConfig.phone,
  founder: {
    "@type": "Person",
    name: siteConfig.founder,
  },
  address: {
    "@type": "PostalAddress",
    addressLocality: "Barrigada",
    addressRegion: "GU",
    addressCountry: "US",
  },
  geo: {
    "@type": "GeoCoordinates",
    latitude: 13.4709,
    longitude: 144.8021,
  },
  areaServed: {
    "@type": "Place",
    name: "Guam",
  },
  priceRange: "$497 to $1,997",
  sameAs: [
    siteConfig.socials.x,
    siteConfig.socials.github,
    siteConfig.socials.linkedin,
  ],
}

const faqJsonLd = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: faqs.map((f) => ({
    "@type": "Question",
    name: f.q,
    acceptedAnswer: {
      "@type": "Answer",
      text: f.a,
    },
  })),
}

export default function GuamPage() {
  return (
    <div>
      <script
        type="application/ld+json"
        // biome-ignore lint/security/noDangerouslySetInnerHtml: static JSON-LD for SEO
        dangerouslySetInnerHTML={{ __html: JSON.stringify(localBusinessJsonLd) }}
      />
      <script
        type="application/ld+json"
        // biome-ignore lint/security/noDangerouslySetInnerHtml: static JSON-LD for SEO
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
      />

      {/* Hero */}
      <section className="depth-veil">
        <div className="mx-auto max-w-3xl px-6 pt-28 pb-20 sm:pt-40 sm:pb-28">
          <p className="t-coord">Anchor Marianas &middot; Barrigada, Guam &middot; 13&deg;28&prime;N 144&deg;48&prime;E</p>

          <h1 className="t-hero-serif mt-8">
            Web design in Guam,{" "}
            <span className="font-display-italic text-accent">live in 5 days.</span>
          </h1>

          <p className="t-body-lg mt-7 max-w-lg text-muted-foreground">
            One flat price, one deadline, refund if we miss it. We build the
            site, wire in your booking or checkout link, and hand you the keys.
          </p>

          <div className="mt-10 flex flex-wrap items-center gap-x-6 gap-y-4">
            <Link href="/scan" className={scanBtn}>
              Run the free site scan &rarr;
            </Link>
            <a href={bookUrl} className={`text-[0.95rem] text-muted-foreground ${quietLink}`}>
              or book a call
            </a>
          </div>
        </div>
      </section>

      {/* Who */}
      <section className="border-t border-border">
        <div className="mx-auto max-w-3xl px-6 py-20 sm:py-24">
          <p className="t-eyebrow">Who you&rsquo;re hiring</p>
          <h2 className="font-display mt-8 text-3xl leading-tight tracking-tight sm:text-4xl">
            A website designer based on Guam, not a faceless agency.
          </h2>
          <p className="t-body-lg mt-6 max-w-xl text-muted-foreground">
            Anchor Marianas LLC is a one-person web design studio in Barrigada,
            operated by Adam Pang. We built IDI Guam&rsquo;s site, and we work
            with Guam businesses including{" "}
            <span className="font-display text-foreground">Hilton</span>. One
            build at a time, with full attention.
          </p>
        </div>
      </section>

      {/* Offers */}
      <section className="border-t border-border">
        <div className="mx-auto max-w-3xl px-6 py-20 sm:py-24">
          <p className="t-eyebrow">Two builds &middot; flat price &middot; live in 5 days</p>

          <div className="mt-8 grid gap-4 sm:grid-cols-2">
            {offers.map((o) => {
              const plan = o.slug === "mvp-5-day" ? "mvp" : "landing"
              return (
                <div
                  key={o.slug}
                  className="flex flex-col rounded-2xl border border-border bg-card p-7 transition-colors duration-200 hover:border-accent"
                >
                  <h3 className="t-h3">{o.name}</h3>
                  <p className="font-display mt-5 text-5xl leading-none tracking-tight">
                    {o.price}
                  </p>
                  <p className="t-small mt-4 text-muted-foreground">{o.tagline}</p>
                  <CheckoutButton
                    href={o.ctaUrl}
                    plan={plan}
                    price={o.price}
                    className={buyBtn}
                  >
                    {o.ctaLabel} &rarr;
                  </CheckoutButton>
                </div>
              )
            })}
          </div>

          <p className="t-small mt-6 text-muted-foreground">
            If the build is late, you get a refund. After launch, add the
            $500/mo care plan: updates, edits, and hosting handled. Prefer to
            talk first?{" "}
            <a href={bookUrl} className={quietLink}>
              Book a call
            </a>
            .
          </p>
        </div>
      </section>

      {/* Why local matters */}
      <section className="border-t border-border bg-muted/20">
        <div className="mx-auto max-w-3xl px-6 py-20 sm:py-24">
          <p className="t-eyebrow">Why local matters</p>
          <div className="mt-8 grid gap-10">
            {whyLocal.map((item) => (
              <div key={item.n} className="border-t border-border/60 pt-6 first:border-t-0 first:pt-0">
                <p className="t-coord">{item.n}</p>
                <h3 className="t-h3 mt-3">{item.title}</h3>
                <p className="t-small mt-3 max-w-xl text-muted-foreground">{item.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Scan closer */}
      <section className="border-t border-border">
        <div className="mx-auto max-w-3xl px-6 py-20 sm:py-24">
          <h2 className="font-display text-3xl leading-tight tracking-tight sm:text-4xl">
            Not sure what your current site is costing you?
          </h2>
          <p className="t-body-lg mt-4 max-w-md text-muted-foreground">
            The free scan reads your Google reviews and your site, then shows
            what is quietly costing you customers. One minute, no signup.
          </p>
          <Link
            href="/scan"
            className="mt-8 inline-flex items-center gap-2 text-[0.95rem] font-semibold text-accent transition hover:opacity-80"
          >
            Run it on your business &rarr;
          </Link>
        </div>
      </section>

      {/* FAQ */}
      <section className="border-t border-border">
        <div className="mx-auto max-w-3xl px-6 py-20 sm:py-24">
          <p className="t-eyebrow">Questions</p>
          <div className="mt-8 grid gap-10">
            {faqs.map((f) => (
              <div key={f.q} className="border-t border-border/60 pt-6 first:border-t-0 first:pt-0">
                <h3 className="t-h3">{f.q}</h3>
                <p className="t-small mt-3 max-w-xl text-muted-foreground">{f.a}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Book closer */}
      <section className="border-t border-border bg-muted/20">
        <div className="mx-auto max-w-3xl px-6 py-20 text-center sm:py-24">
          <p className="t-body-lg text-muted-foreground">
            Bring your current site, or just the idea. 20 minutes, free.
          </p>
          <div className="mt-6">
            <a href={bookUrl} className={scanBtn}>
              Book a call &rarr;
            </a>
          </div>
        </div>
      </section>
    </div>
  )
}
