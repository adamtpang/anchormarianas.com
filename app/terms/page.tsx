import Link from "next/link"
import siteConfig from "@/content/site.json"

export const metadata = {
  title: "Terms of service - Anchor Marianas",
  description:
    "The terms that govern your use of anchormarianas.com and the services provided by Anchor Marianas LLC.",
}

const EFFECTIVE_DATE = "13 July 2026"

export default function TermsPage() {
  return (
    <div className="bg-background text-foreground">
      <section className="mx-auto max-w-2xl px-6 pt-20 pb-12 sm:pt-28">
        <p className="mb-6 text-xs font-medium uppercase tracking-[0.2em] text-muted-foreground">
          Legal
        </p>
        <h1 className="text-balance text-4xl font-semibold leading-[1.1] tracking-tight sm:text-5xl">
          Terms of service
        </h1>
        <p className="mt-6 text-sm text-muted-foreground">
          Effective {EFFECTIVE_DATE}
        </p>
      </section>

      <section className="mx-auto max-w-2xl px-6 pb-24 space-y-8 text-base leading-relaxed text-foreground/90">
        <p>
          These terms of service (the &ldquo;terms&rdquo;) govern your access to
          and use of the website at anchormarianas.com and any services provided
          by {siteConfig.legalName} (&ldquo;Anchor Marianas,&rdquo;
          &ldquo;we,&rdquo; &ldquo;us,&rdquo; or &ldquo;our&rdquo;). By using
          this site, requesting a scan, or purchasing a service, you agree to
          these terms. If you do not agree, please do not use the site or the
          services.
        </p>

        <div className="border-t border-border pt-8">
          <h2 className="text-sm font-semibold uppercase tracking-[0.2em] text-muted-foreground">
            1. Who we are
          </h2>
          <p className="mt-4">
            Anchor Marianas is the trade name of {siteConfig.legalName}, a
            limited liability company based in Guam, United States. You can reach
            us at{" "}
            <a
              href={`mailto:${siteConfig.email}`}
              className="underline underline-offset-4 hover:text-foreground"
            >
              {siteConfig.email}
            </a>
            .
          </p>
        </div>

        <div className="border-t border-border pt-8">
          <h2 className="text-sm font-semibold uppercase tracking-[0.2em] text-muted-foreground">
            2. Services
          </h2>
          <p className="mt-4">
            We provide productized software and AI engineering services,
            including landing pages, web applications, AI automations, and
            related consulting. The specific scope, deliverables, timeline, and
            price for any engagement are set out in the offer you purchase or in
            a separate written statement of work. Anything not expressly included
            in that scope is out of scope.
          </p>
        </div>

        <div className="border-t border-border pt-8">
          <h2 className="text-sm font-semibold uppercase tracking-[0.2em] text-muted-foreground">
            3. Fees and payment
          </h2>
          <p className="mt-4">
            Prices are shown on the site and are in United States dollars unless
            stated otherwise. Payments are processed by our third party payment
            provider, Stripe. We do not store your full card details. By
            submitting a payment you authorise the charge and confirm that you
            are permitted to use the payment method. Recurring plans continue
            until you cancel in line with the plan terms.
          </p>
        </div>

        <div className="border-t border-border pt-8">
          <h2 className="text-sm font-semibold uppercase tracking-[0.2em] text-muted-foreground">
            4. Refunds
          </h2>
          <p className="mt-4">
            Any refund or satisfaction guarantee that applies to a specific
            service is described in that service&rsquo;s offer. Where a guarantee
            is offered, it applies on the terms stated there. Outside of a stated
            guarantee, fees for work already performed are non-refundable. If you
            think something is wrong with a charge, contact us and we will work
            with you in good faith.
          </p>
        </div>

        <div className="border-t border-border pt-8">
          <h2 className="text-sm font-semibold uppercase tracking-[0.2em] text-muted-foreground">
            5. Your responsibilities
          </h2>
          <p className="mt-4">
            You agree to provide accurate information, to supply the access,
            content, and approvals we need to do the work, and to use the site
            and services lawfully. You are responsible for the content and data
            you give us and for ensuring you have the rights to it.
          </p>
        </div>

        <div className="border-t border-border pt-8">
          <h2 className="text-sm font-semibold uppercase tracking-[0.2em] text-muted-foreground">
            6. Deliverables and intellectual property
          </h2>
          <p className="mt-4">
            Unless your statement of work says otherwise, once you have paid in
            full for an engagement, you own the final deliverables we create
            specifically for you. We keep ownership of our pre-existing tools,
            templates, and know-how, and we may reuse general skills and
            techniques on other projects. We may describe the work at a high
            level as a portfolio reference unless you ask us in writing not to.
          </p>
        </div>

        <div className="border-t border-border pt-8">
          <h2 className="text-sm font-semibold uppercase tracking-[0.2em] text-muted-foreground">
            7. Warranties and disclaimers
          </h2>
          <p className="mt-4">
            The site and any free tools, including the scan, are provided on an
            &ldquo;as is&rdquo; and &ldquo;as available&rdquo; basis without
            warranties of any kind, to the fullest extent permitted by law. We do
            not guarantee any particular business result, ranking, or revenue
            outcome. Paid engagements are delivered with reasonable skill and
            care as set out in the relevant scope.
          </p>
        </div>

        <div className="border-t border-border pt-8">
          <h2 className="text-sm font-semibold uppercase tracking-[0.2em] text-muted-foreground">
            8. Limitation of liability
          </h2>
          <p className="mt-4">
            To the fullest extent permitted by law, Anchor Marianas is not liable
            for any indirect, incidental, special, or consequential loss, or for
            lost profits, revenue, or data. Our total liability arising out of or
            related to the services is limited to the amount you paid us for the
            engagement that gave rise to the claim in the three months before the
            claim arose.
          </p>
        </div>

        <div className="border-t border-border pt-8">
          <h2 className="text-sm font-semibold uppercase tracking-[0.2em] text-muted-foreground">
            9. Termination
          </h2>
          <p className="mt-4">
            Either party may end an engagement in line with the terms of the
            relevant scope. We may suspend or end your access to the site or
            services if you breach these terms. Sections that by their nature
            should survive termination, such as payment, intellectual property,
            disclaimers, and liability, will survive.
          </p>
        </div>

        <div className="border-t border-border pt-8">
          <h2 className="text-sm font-semibold uppercase tracking-[0.2em] text-muted-foreground">
            10. Governing law
          </h2>
          <p className="mt-4">
            These terms are governed by the laws of the Territory of Guam and the
            United States, without regard to conflict of law rules. The courts
            located in Guam will have jurisdiction over any dispute, unless
            applicable law requires otherwise.
          </p>
        </div>

        <div className="border-t border-border pt-8">
          <h2 className="text-sm font-semibold uppercase tracking-[0.2em] text-muted-foreground">
            11. Changes to these terms
          </h2>
          <p className="mt-4">
            We may update these terms from time to time. When we do, we will
            change the effective date above. Your continued use of the site or
            services after an update means you accept the revised terms.
          </p>
        </div>

        <div className="border-t border-border pt-8">
          <h2 className="text-sm font-semibold uppercase tracking-[0.2em] text-muted-foreground">
            12. Contact
          </h2>
          <p className="mt-4">
            Questions about these terms can go to{" "}
            <a
              href={`mailto:${siteConfig.email}`}
              className="underline underline-offset-4 hover:text-foreground"
            >
              {siteConfig.email}
            </a>
            .
          </p>
        </div>

        <p className="border-t border-border pt-8 text-sm text-muted-foreground">
          See also our{" "}
          <Link
            href="/privacy"
            className="underline underline-offset-4 hover:text-foreground"
          >
            privacy policy
          </Link>
          .
        </p>

        <p className="text-sm text-muted-foreground">
          <Link
            href="/"
            className="underline underline-offset-4 hover:text-foreground"
          >
            Back to anchormarianas.com
          </Link>
        </p>
      </section>
    </div>
  )
}
