import Link from "next/link"
import siteConfig from "@/content/site.json"

export const metadata = {
  title: "Privacy policy - Anchor Marianas",
  description:
    "How Anchor Marianas LLC collects, uses, and protects your information when you use anchormarianas.com.",
}

const EFFECTIVE_DATE = "13 July 2026"

export default function PrivacyPage() {
  return (
    <div className="bg-background text-foreground">
      <section className="mx-auto max-w-2xl px-6 pt-20 pb-12 sm:pt-28">
        <p className="mb-6 text-xs font-medium uppercase tracking-[0.2em] text-muted-foreground">
          Legal
        </p>
        <h1 className="text-balance text-4xl font-semibold leading-[1.1] tracking-tight sm:text-5xl">
          Privacy policy
        </h1>
        <p className="mt-6 text-sm text-muted-foreground">
          Effective {EFFECTIVE_DATE}
        </p>
      </section>

      <section className="mx-auto max-w-2xl px-6 pb-24 space-y-8 text-base leading-relaxed text-foreground/90">
        <p>
          This privacy policy explains how {siteConfig.legalName}
          (&ldquo;Anchor Marianas,&rdquo; &ldquo;we,&rdquo; &ldquo;us,&rdquo; or
          &ldquo;our&rdquo;) collects, uses, and shares information when you use
          the website at anchormarianas.com and our services. By using the site,
          you agree to this policy.
        </p>

        <div className="border-t border-border pt-8">
          <h2 className="text-sm font-semibold uppercase tracking-[0.2em] text-muted-foreground">
            1. Information we collect
          </h2>
          <p className="mt-4">
            We collect information you give us directly, such as your name,
            email address, phone number, business details, and the content of
            messages you send us. When you run a scan, we collect the business
            web address or details you submit. We also collect limited technical
            and usage information automatically, such as your device type,
            browser, pages viewed, and general location, through analytics.
          </p>
        </div>

        <div className="border-t border-border pt-8">
          <h2 className="text-sm font-semibold uppercase tracking-[0.2em] text-muted-foreground">
            2. How we use information
          </h2>
          <p className="mt-4">
            We use your information to provide and improve our services, run the
            scan and deliver its results, respond to your enquiries, process
            payments, send you information you asked for, and keep the site
            secure. We may use aggregated or anonymised data to understand how
            the site is used.
          </p>
        </div>

        <div className="border-t border-border pt-8">
          <h2 className="text-sm font-semibold uppercase tracking-[0.2em] text-muted-foreground">
            3. Payments
          </h2>
          <p className="mt-4">
            Payments are processed by Stripe. When you pay, your card details are
            collected and handled by Stripe under its own terms and privacy
            policy. We do not store your full card number. We receive limited
            confirmation details such as the amount, the item, and whether the
            payment succeeded.
          </p>
        </div>

        <div className="border-t border-border pt-8">
          <h2 className="text-sm font-semibold uppercase tracking-[0.2em] text-muted-foreground">
            4. Analytics and cookies
          </h2>
          <p className="mt-4">
            We use privacy conscious analytics tools, including PostHog and
            Vercel Analytics, to understand traffic and improve the site. These
            tools may set cookies or use similar technologies and may collect
            usage data such as pages visited and events. You can control cookies
            through your browser settings.
          </p>
        </div>

        <div className="border-t border-border pt-8">
          <h2 className="text-sm font-semibold uppercase tracking-[0.2em] text-muted-foreground">
            5. How we share information
          </h2>
          <p className="mt-4">
            We do not sell your personal information. We share it only with
            service providers who help us run the business, such as our payment
            processor, hosting provider, and analytics tools, and only as needed
            to provide the services. We may also share information if required by
            law or to protect our rights, or as part of a business transfer.
          </p>
        </div>

        <div className="border-t border-border pt-8">
          <h2 className="text-sm font-semibold uppercase tracking-[0.2em] text-muted-foreground">
            6. Data retention
          </h2>
          <p className="mt-4">
            We keep personal information for as long as needed to provide the
            services, meet legal and accounting requirements, and resolve
            disputes. When we no longer need it, we delete or anonymise it.
          </p>
        </div>

        <div className="border-t border-border pt-8">
          <h2 className="text-sm font-semibold uppercase tracking-[0.2em] text-muted-foreground">
            7. Your choices and rights
          </h2>
          <p className="mt-4">
            You can ask us to access, correct, or delete the personal
            information we hold about you, and you can opt out of marketing
            emails at any time. Depending on where you live, you may have
            additional rights under local law. To make a request, email us using
            the contact details below and we will respond within a reasonable
            time.
          </p>
        </div>

        <div className="border-t border-border pt-8">
          <h2 className="text-sm font-semibold uppercase tracking-[0.2em] text-muted-foreground">
            8. Children
          </h2>
          <p className="mt-4">
            The site and services are intended for businesses and adults. We do
            not knowingly collect personal information from children. If you
            believe a child has given us information, contact us and we will
            delete it.
          </p>
        </div>

        <div className="border-t border-border pt-8">
          <h2 className="text-sm font-semibold uppercase tracking-[0.2em] text-muted-foreground">
            9. International users
          </h2>
          <p className="mt-4">
            We are based in Guam, United States, and process information there
            and with providers in other countries. If you use the site from
            outside the United States, you understand that your information may
            be transferred to and processed in the United States and other
            locations.
          </p>
        </div>

        <div className="border-t border-border pt-8">
          <h2 className="text-sm font-semibold uppercase tracking-[0.2em] text-muted-foreground">
            10. Changes to this policy
          </h2>
          <p className="mt-4">
            We may update this policy from time to time. When we do, we will
            change the effective date above. Your continued use of the site
            after an update means you accept the revised policy.
          </p>
        </div>

        <div className="border-t border-border pt-8">
          <h2 className="text-sm font-semibold uppercase tracking-[0.2em] text-muted-foreground">
            11. Contact
          </h2>
          <p className="mt-4">
            Questions about this policy or your information can go to{" "}
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
            href="/terms"
            className="underline underline-offset-4 hover:text-foreground"
          >
            terms of service
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
