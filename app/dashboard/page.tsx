import Link from "next/link"

export const metadata = {
  title: "Dashboard — Adam Pang",
  description: "Private founder KPIs.",
  robots: { index: false, follow: false },
}

type Search = { searchParams: Promise<{ key?: string }> }

const cards: { label: string; value: string; hint?: string }[] = [
  { label: "Revenue this month", value: "$0", hint: "TODO: wire to Stripe" },
  { label: "Revenue trailing 30d", value: "$0", hint: "TODO: wire to Stripe" },
  { label: "Discovery calls this week", value: "0", hint: "TODO: wire to Cal.com" },
  { label: "Sprints in progress", value: "0", hint: "TODO" },
  { label: "Sprints delivered", value: "0", hint: "TODO" },
  { label: "Refunds issued", value: "0", hint: "TODO: wire to Stripe" },
  { label: "Inbound replies awaiting response", value: "0", hint: "TODO: wire to inbox" },
  { label: "Last X post date", value: "—", hint: "TODO: wire to X API" },
]

export default async function DashboardPage({ searchParams }: Search) {
  const { key } = await searchParams
  const expected = process.env.DASHBOARD_KEY

  if (!expected || key !== expected) {
    return (
      <div className="bg-white text-neutral-900">
        <section className="mx-auto max-w-md px-6 pt-32 pb-32">
          <h1 className="text-2xl font-semibold tracking-tight">Locked</h1>
          <p className="mt-4 text-neutral-600">
            Append <code className="rounded bg-neutral-100 px-1.5 py-0.5 text-sm">?key=...</code> to access.
          </p>
          <p className="mt-6 text-sm text-neutral-500">
            <Link href="/" className="underline underline-offset-4">← home</Link>
          </p>
        </section>
      </div>
    )
  }

  return (
    <div className="bg-white text-neutral-900">
      <section className="mx-auto max-w-5xl px-6 pt-16 pb-24 sm:pt-24">
        <div className="flex items-baseline justify-between">
          <h1 className="text-3xl font-semibold tracking-tight sm:text-4xl">Founder dashboard</h1>
          <p className="text-xs uppercase tracking-[0.2em] text-neutral-500">private</p>
        </div>
        <p className="mt-3 text-neutral-600">
          Skeleton view. Data wiring pending.
        </p>

        <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {cards.map((c) => (
            <div key={c.label} className="rounded-2xl border border-neutral-200 p-5 bg-white">
              <div className="text-xs uppercase tracking-[0.15em] text-neutral-500">{c.label}</div>
              <div className="mt-3 text-3xl font-semibold tracking-tight">{c.value}</div>
              {c.hint ? <div className="mt-2 text-xs text-neutral-400">{c.hint}</div> : null}
            </div>
          ))}
        </div>
      </section>
    </div>
  )
}
