import { Star } from "lucide-react";
import { getApprovedReviews } from "@/lib/reviews";
import { Reveal } from "@/components/ui/reveal";
import { GlassPanel } from "@/components/ui/glass-panel";
import { LinkButton } from "@/components/ui/button";

export async function TestimonialsSection() {
  const reviews = (await getApprovedReviews()).slice(0, 3);
  if (reviews.length === 0) return null;

  return (
    <section className="mx-auto max-w-6xl px-4 py-12 md:py-20">
      <Reveal className="text-center">
        <p className="text-sm font-medium uppercase tracking-wider text-[var(--gold)]">Social Proof</p>
        <h2 className="mt-2 font-display text-3xl font-semibold md:text-4xl">What Clients Say</h2>
      </Reveal>

      <div className="mt-10 grid gap-6 md:grid-cols-3">
        {reviews.map((review, i) => (
          <Reveal key={`${review.name}-${i}`} delay={i * 0.1}>
            <GlassPanel className="h-full p-6">
              <div className="flex gap-0.5 text-[var(--gold)]">
                {Array.from({ length: review.rating }).map((_, idx) => (
                  <Star key={idx} size={14} fill="currentColor" />
                ))}
              </div>
              <p className="mt-4 text-sm text-[var(--fg-muted)]">&ldquo;{review.message}&rdquo;</p>
              <div className="mt-5">
                <p className="text-sm font-medium">{review.name}</p>
                <p className="text-xs text-[var(--fg-muted)]">{review.company}</p>
              </div>
            </GlassPanel>
          </Reveal>
        ))}
      </div>

      <Reveal className="mt-10 flex justify-center gap-4">
        <LinkButton href="/testimonials" variant="outline">
          Read All Testimonials
        </LinkButton>
      </Reveal>
    </section>
  );
}
