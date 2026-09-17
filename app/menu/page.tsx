import Link from "next/link"
import { ArrowRight } from "lucide-react"
import menu from "@/content/menu.json"
import problems from "@/content/menu-problems.json"

export const metadata = {
  title: "The AI menu | Anchor Marianas",
  description:
    "Every problem has a price. The AI services Anchor Marianas offers Guam businesses, grouped by the problems that show up in real Google reviews.",
  alternates: { canonical: "/menu" },
}

type Item = {
  problem: string
  name: string
  price: string
  cadence: string
  href: string
  live: boolean
  note: string
}

const items: Item[] = menu.groups.flatMap((g) => g.items)

function byName(name: string): Item {
  const found = items.find((i) => i.name === name)
  if (!found) throw new Error(`menu-problems.json names "${name}" but menu.json has no such item`)
  return found
}

function ctaLabel(item: Item) {
  if (item.href.startsWith("https://buy.stripe.com")) return "Buy now"
  if (item.href.startsWith("https://wa.me")) return "WhatsApp Adam"
  return "Book a call"
}

export default function MenuPage() {
  return (
    <div className="agency-page">
      <section className="agency-shell agency-heading">
        <h1>{menu.tagline}</h1>
        <p className="agency-lead">{menu.subtitle}</p>
        <p className="agency-small">{problems.intro}</p>
      </section>

      <section className="agency-shell agency-section agency-section-short">
        <article className="agency-card agency-package">
          <h3>{menu.free.problem}</h3>
          <p>{menu.free.name}</p>
          <div className="agency-price">{menu.free.price}</div>
          <Link href={menu.free.href} className="agency-button">
            {menu.free.cta} <ArrowRight size={16} aria-hidden />
          </Link>
        </article>
      </section>

      {problems.groups.map((group) => (
        <section className="agency-shell agency-section" key={group.problem}>
          <div className="agency-section-heading">
            <h2>{group.problem}</h2>
            <p className="agency-lead">{group.evidence}</p>
          </div>
          <div className="agency-grid">
            {group.items.map(byName).map((item) => (
              <article className="agency-card agency-package" key={item.name}>
                <h3>{item.name}</h3>
                <p>{item.note}</p>
                <div className="agency-price">{item.price}</div>
                <p className="agency-small">{item.cadence}</p>
                <a
                  href={item.href}
                  className="agency-button"
                  target={item.href.startsWith("http") ? "_blank" : undefined}
                  rel={item.href.startsWith("http") ? "noopener noreferrer" : undefined}
                >
                  {ctaLabel(item)} <ArrowRight size={16} aria-hidden />
                </a>
                {!item.live && (
                  <p className="agency-small">Not self-serve yet. Scoped on a call first.</p>
                )}
              </article>
            ))}
          </div>
        </section>
      ))}

      <section className="agency-shell agency-section">
        <p className="agency-small">
          Prices in USD. Monthly items cancel any month. Delivery offers are governed by our{" "}
          <Link href="/terms">terms</Link>.
        </p>
      </section>
    </div>
  )
}
