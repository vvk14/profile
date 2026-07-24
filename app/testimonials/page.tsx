import type { Metadata } from "next";
import { Star } from "lucide-react";
import { buildMetadata, jsonLdScript, reviewsJsonLd } from "@/lib/seo";
import { getApprovedReviews } from "@/lib/reviews";
import { GlassPanel } from "@/components/ui/glass-panel";
import { LinkButton } from "@/components/ui/button";
import { Reveal } from "@/components/ui/reveal";

export const metadata: Metadata = buildMetadata({
  title: "Testimonials: What Clients Say",
  description: "Reviews and testimonials from clients who've worked with VVKDEV on Shopify and custom website projects.",
  path: "/testimonials",
});

export default async function TestimonialsPage() {
  const reviews = await getApprovedReviews();
  const jsonLd = reviewsJsonLd(reviews);

  return (
    <div className="mx-auto max-w-5xl px-4 py-10 md:py-16">
      {jsonLd && (
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: jsonLdScript(jsonLd) }} />
      )}

      <Reveal className="text-center">
        <p className="text-sm font-medium uppercase tracking-wider text-[var(--gold)]">Social Proof</p>
        <h1 className="mt-2 font-display text-4xl font-semibold md:text-5xl">Client Testimonials</h1>
      </Reveal>

      <div className="mt-8 md:mt-14 grid gap-6 md:grid-cols-2">
        {reviews.map((review, i) => (
          <Reveal key={`${review.name}-${i}`} delay={(i % 4) * 0.08}>
            <GlassPanel className="h-full p-6">
              <div className="flex gap-0.5 text-[var(--gold)]">
                {Array.from({ length: review.rating }).map((_, idx) => (
                  <Star key={idx} size={14} fill="currentColor" />
                ))}
              </div>
              <p className="mt-4 text-sm text-[var(--fg-muted)]">&ldquo;{review.message}&rdquo;</p>
              <div className="mt-5">
                <p className="text-sm font-medium">{review.name}</p>
                {review.company && <p className="text-xs text-[var(--fg-muted)]">{review.company}</p>}
              </div>
            </GlassPanel>
          </Reveal>
        ))}
      </div>

      <Reveal delay={0.2} className="mt-10 md:mt-16 text-center">
        <p className="text-[var(--fg-muted)]">Worked with me on a project?</p>
        <div className="mt-4">
          <LinkButton href="/reviews/submit">Leave a Review</LinkButton>
        </div>
      </Reveal>
    </div>
  );
}
