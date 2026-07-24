import type { Metadata } from "next";
import { buildMetadata } from "@/lib/seo";
import { ReviewForm } from "@/components/forms/review-form";
import { GlassPanel } from "@/components/ui/glass-panel";
import { Reveal } from "@/components/ui/reveal";

export const metadata: Metadata = buildMetadata({
  title: "Leave a Review",
  description: "Share your experience working with VVKDEV on your Shopify or web development project.",
  path: "/reviews/submit",
  noIndex: true,
});

export default function SubmitReviewPage() {
  return (
    <div className="mx-auto max-w-xl px-4 py-10 md:py-16">
      <Reveal className="text-center">
        <p className="text-sm font-medium uppercase tracking-wider text-[var(--gold)]">Feedback</p>
        <h1 className="mt-2 font-display text-3xl font-semibold md:text-4xl">Leave a Review</h1>
        <p className="mt-4 text-[var(--fg-muted)]">
          Worked with me on a project? I'd love to hear about your experience. Reviews are checked before appearing
          publicly on the site.
        </p>
      </Reveal>

      <Reveal delay={0.1} className="mt-10">
        <GlassPanel className="p-6 md:p-8">
          <ReviewForm />
        </GlassPanel>
      </Reveal>
    </div>
  );
}
