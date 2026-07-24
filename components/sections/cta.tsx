import { LinkButton } from "@/components/ui/button";
import { Reveal } from "@/components/ui/reveal";
import { GlassPanel } from "@/components/ui/glass-panel";

export function Cta() {
  return (
    <section className="mx-auto max-w-5xl px-4 py-12 md:py-20">
      <Reveal>
        <GlassPanel className="hero-gradient overflow-hidden px-6 py-10 text-center md:px-16 md:py-16">
          <h2 className="font-display text-3xl font-semibold md:text-4xl">
            Let's build something <span className="text-gradient-gold">great</span>
          </h2>
          <p className="mx-auto mt-4 max-w-lg text-[var(--fg-muted)]">
            Whether it's a full Shopify rebuild or a focused performance audit, I'd love to hear about your project.
          </p>
          <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
            <LinkButton href="/contact">Get in Touch</LinkButton>
            <LinkButton href="/resume" variant="outline">
              View Resume
            </LinkButton>
          </div>
        </GlassPanel>
      </Reveal>
    </section>
  );
}
