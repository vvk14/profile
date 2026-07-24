import type { Metadata } from "next";
import { buildMetadata } from "@/lib/seo";
import { siteConfig } from "@/lib/site";

export const metadata: Metadata = buildMetadata({
  title: "Terms of Service",
  description: "Terms of service for engaging vvkdev.in for freelance Shopify and web development work.",
  path: "/terms",
  noIndex: true,
});

export default function TermsPage() {
  return (
    <div className="mx-auto max-w-2xl px-4 py-10 md:py-16">
      <h1 className="font-display text-3xl font-semibold">Terms of Service</h1>
      <p className="mt-2 text-sm text-[var(--fg-muted)]">Last updated: {new Date().getFullYear()}</p>

      <div className="mt-8 space-y-6 text-[var(--fg-muted)]">
        <section>
          <h2 className="font-display text-lg font-semibold text-[var(--fg)]">Engagement</h2>
          <p className="mt-2">
            Project scope, timeline, and pricing are agreed upon in writing before work begins. A custom proposal is
            provided after an initial consultation.
          </p>
        </section>
        <section>
          <h2 className="font-display text-lg font-semibold text-[var(--fg)]">Payment</h2>
          <p className="mt-2">
            Projects typically require 50% upfront with the balance due on completion; larger projects are broken
            into milestones. All projects include 30 days of free post-launch support.
          </p>
        </section>
        <section>
          <h2 className="font-display text-lg font-semibold text-[var(--fg)]">Revisions</h2>
          <p className="mt-2">
            Reasonable revisions within the agreed scope are included. Work outside the original scope is quoted
            separately before starting.
          </p>
        </section>
        <section>
          <h2 className="font-display text-lg font-semibold text-[var(--fg)]">Ownership</h2>
          <p className="mt-2">
            Upon final payment, all delivered code and assets become the client's property, excluding any
            third-party licenses (fonts, stock imagery, paid apps).
          </p>
        </section>
        <section>
          <h2 className="font-display text-lg font-semibold text-[var(--fg)]">Contact</h2>
          <p className="mt-2">
            Questions? Email{" "}
            <a href={`mailto:${siteConfig.email}`} className="text-[var(--gold)] underline">
              {siteConfig.email}
            </a>
            .
          </p>
        </section>
      </div>
    </div>
  );
}
