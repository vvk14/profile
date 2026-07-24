import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { buildMetadata, jsonLdScript, breadcrumbJsonLd } from "@/lib/seo";
import { services } from "@/content/services";
import { GlassPanel } from "@/components/ui/glass-panel";
import { LinkButton } from "@/components/ui/button";
import { Reveal } from "@/components/ui/reveal";

const service = services.find((s) => s.slug === "custom-websites");

export const metadata: Metadata = buildMetadata({
  title: "Custom Website Development",
  description: service?.summary ?? "",
  path: "/services/custom-websites",
});

export default function CustomWebsitesPage() {
  if (!service) notFound();
  const jsonLd = breadcrumbJsonLd([
    { name: "Home", path: "/" },
    { name: "Services", path: "/services" },
    { name: service.title, path: "/services/custom-websites" },
  ]);

  return (
    <div className="mx-auto max-w-5xl px-4 py-10 md:py-16">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: jsonLdScript(jsonLd) }} />

      <Reveal>
        <p className="text-sm font-medium uppercase tracking-wider text-[var(--gold)]">Service</p>
        <h1 className="mt-2 font-display text-4xl font-semibold md:text-5xl">{service.title}</h1>
        <p className="mt-4 max-w-2xl text-[var(--fg-muted)]">{service.summary}</p>
      </Reveal>

      <div className="mt-8 md:mt-14 grid gap-10 md:grid-cols-2">
        <Reveal>
          <h2 className="font-display text-xl font-semibold">What's Included</h2>
          <ul className="mt-4 space-y-2 text-[var(--fg-muted)]">
            {service.features.map((f) => (
              <li key={f} className="flex gap-2">
                <span className="text-[var(--gold)]">✓</span> {f}
              </li>
            ))}
          </ul>
        </Reveal>
        <Reveal delay={0.1}>
          <h2 className="font-display text-xl font-semibold">My Process</h2>
          <ol className="mt-4 space-y-3 text-[var(--fg-muted)]">
            {service.process.map((step, i) => (
              <li key={step} className="flex gap-3">
                <span className="font-display font-semibold text-[var(--gold)]">{i + 1}.</span> {step}
              </li>
            ))}
          </ol>
        </Reveal>
      </div>

      <Reveal delay={0.15} className="mt-10 md:mt-16">
        <GlassPanel className="hero-gradient p-8 text-center">
          <h2 className="font-display text-2xl font-semibold">Have a custom build in mind?</h2>
          <div className="mt-6">
            <LinkButton href="/contact">Get a Quote</LinkButton>
          </div>
        </GlassPanel>
      </Reveal>
    </div>
  );
}
