import { Reveal } from "@/components/ui/reveal";

const steps = [
  { title: "Discovery", detail: "Understand your brand, catalog, and conversion goals before writing a line of code." },
  { title: "Design Handoff", detail: "Turn Figma files into pixel-accurate, schema-driven Liquid sections." },
  { title: "Build", detail: "Modular, reusable, merchant-editable components built for Shopify OS 2.0." },
  { title: "Optimize & QA", detail: "Core Web Vitals, SEO, and cross-device testing before anything ships." },
  { title: "Launch & Support", detail: "Go live with confidence, backed by 30 days of free post-launch support." },
];

export function Process() {
  return (
    <section className="mx-auto max-w-5xl px-4 py-12 md:py-20">
      <Reveal className="text-center">
        <p className="text-sm font-medium uppercase tracking-wider text-[var(--gold)]">Process</p>
        <h2 className="mt-2 font-display text-3xl font-semibold md:text-4xl">How We'll Work Together</h2>
      </Reveal>

      <div className="mt-8 md:mt-14 grid gap-8 md:grid-cols-5">
        {steps.map((step, i) => (
          <Reveal key={step.title} delay={i * 0.08} className="relative">
            <div className="flex size-9 items-center justify-center rounded-full border border-[var(--gold)] font-display text-sm font-semibold text-[var(--gold)]">
              {i + 1}
            </div>
            <h3 className="mt-4 font-medium">{step.title}</h3>
            <p className="mt-2 text-sm text-[var(--fg-muted)]">{step.detail}</p>
          </Reveal>
        ))}
      </div>
    </section>
  );
}
