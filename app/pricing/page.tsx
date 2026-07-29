import Link from "next/link"
import menu from "@/content/menu.json"

export const metadata = {
  title: "Pricing — every problem has a price | Anchor Marianas",
  description:
    "The scan finds the problems, this menu prices them. Fixed-price AI fixes for small businesses: audit, websites, AI receptionist, review responder, and more.",
}

const buyBtn =
  "inline-flex items-center justify-center rounded-full bg-accent px-6 py-3 text-[0.95rem] font-semibold text-accent-foreground transition hover:opacity-90 focus:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-background"

const callBtn =
  "inline-flex items-center justify-center rounded-full border border-border px-6 py-3 text-[0.95rem] font-semibold text-foreground transition hover:border-accent hover:text-accent focus:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-background"

export default function PricingPage() {
  return (
    <div>
      {/* Hero */}
      <section className="depth-veil">
        <div className="mx-auto max-w-3xl px-6 pt-24 pb-14 sm:pt-32 sm:pb-16">
          <p className="t-coord mb-6">Anchor Marianas · pricing</p>
          <h1 className="t-hero-serif">
            Every problem has a{" "}
            <span className="font-display-italic text-accent">price.</span>
          </h1>
          <p className="t-body-lg mt-6 max-w-xl text-muted-foreground">
            {menu.subtitle}
          </p>
        </div>
      </section>

      {/* Free front door */}
      <section className="border-t border-border">
        <div className="mx-auto max-w-3xl px-6 py-12">
          <div className="flex flex-col gap-4 rounded-2xl border border-accent/30 bg-accent/5 p-7 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <p className="text-sm text-muted-foreground">{menu.free.problem}</p>
              <h2 className="mt-1 text-xl font-semibold tracking-tight">
                {menu.free.name} · <span className="text-accent">{menu.free.price}</span>
              </h2>
            </div>
            <Link href={menu.free.href} className={buyBtn}>
              {menu.free.cta} &rarr;
            </Link>
          </div>
        </div>
      </section>

      {/* Groups */}
      {menu.groups.map((group) => (
        <section key={group.group} className="border-t border-border/40">
          <div className="mx-auto max-w-3xl px-6 py-14 sm:py-16">
            <p className="t-eyebrow mb-8">{group.group}</p>
            <div className="grid gap-4">
              {group.items.map((item) => (
                <div
                  key={item.name}
                  className="flex flex-col gap-4 rounded-2xl border border-border bg-card p-7 transition-colors hover:border-accent sm:flex-row sm:items-center sm:justify-between"
                >
                  <div className="max-w-md">
                    <p className="text-base font-semibold leading-snug">
                      &ldquo;{item.problem}&rdquo;
                    </p>
                    <p className="mt-2 text-sm text-muted-foreground">
                      {item.name} &middot; {item.note}
                    </p>
                  </div>
                  <div className="flex flex-col items-start gap-3 sm:items-end">
                    <div className="font-display text-3xl tracking-tight">
                      {item.price}
                    </div>
                    {item.live ? (
                      <a
                        href={item.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        className={buyBtn}
                      >
                        Get it &rarr;
                      </a>
                    ) : (
                      <a
                        href={item.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        className={callBtn}
                      >
                        Start it
                      </a>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      ))}

      {/* Close */}
      <section className="border-t border-border/40 bg-muted/20">
        <div className="mx-auto max-w-3xl px-6 py-14 text-center">
          <p className="t-body-lg text-muted-foreground">
            Prices are fixed, no quotes, no scoping drag. Not sure which problem is
            yours?
          </p>
          <div className="mt-6">
            <Link href="/audit" className={buyBtn}>
              Run the free scan first &rarr;
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
}
