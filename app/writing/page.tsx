export const metadata = {
  title: "Writing — Adam Pang",
  description: "Essays by Adam Pang. Coming soon.",
}

export default function WritingPage() {
  return (
    <div className="bg-white text-neutral-900">
      <section className="mx-auto max-w-3xl px-6 pt-24 pb-32 sm:pt-32">
        <p className="mb-6 text-xs font-medium uppercase tracking-[0.2em] text-neutral-500">
          Writing
        </p>
        <h1 className="text-balance text-4xl font-semibold leading-[1.05] tracking-tight sm:text-5xl">
          Essays coming soon.
        </h1>
        <p className="mt-6 max-w-xl text-lg leading-relaxed text-neutral-600">
          Short pieces on agency, attention, building, and the Pacific. Check back.
        </p>
      </section>
    </div>
  )
}
