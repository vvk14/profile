import type { Metadata } from "next";
import { buildMetadata } from "@/lib/seo";
import { siteConfig } from "@/lib/site";

export const metadata: Metadata = buildMetadata({
  title: "Privacy Policy",
  description: "Privacy policy for vvkdev.in covering data collection via contact and review forms.",
  path: "/privacy-policy",
  noIndex: true,
});

export default function PrivacyPolicyPage() {
  return (
    <div className="mx-auto max-w-2xl px-4 py-10 md:py-16">
      <h1 className="font-display text-3xl font-semibold">Privacy Policy</h1>
      <p className="mt-2 text-sm text-[var(--fg-muted)]">Last updated: {new Date().getFullYear()}</p>

      <div className="mt-8 space-y-6 text-[var(--fg-muted)]">
        <p>
          This policy explains what information {siteConfig.name} collects through this website and how it's used.
        </p>
        <section>
          <h2 className="font-display text-lg font-semibold text-[var(--fg)]">Information We Collect</h2>
          <p className="mt-2">
            When you submit the contact form or a review, we collect your name, email, and any additional details you
            provide (phone, company, project details, message, or photo). This data is stored in a private Google
            Sheet accessible only to {siteConfig.fullName}.
          </p>
        </section>
        <section>
          <h2 className="font-display text-lg font-semibold text-[var(--fg)]">How We Use It</h2>
          <p className="mt-2">
            Submitted information is used solely to respond to your inquiry or to review and, if approved, publish
            your testimonial. We never sell or share your data with third parties.
          </p>
        </section>
        <section>
          <h2 className="font-display text-lg font-semibold text-[var(--fg)]">Reviews</h2>
          <p className="mt-2">
            Reviews are held in a "Pending" state and only appear publicly after manual approval. Rejected reviews
            are never published.
          </p>
        </section>
        <section>
          <h2 className="font-display text-lg font-semibold text-[var(--fg)]">Contact</h2>
          <p className="mt-2">
            Questions about this policy? Email{" "}
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
