import type { Metadata } from "next";
import { buildMetadata, jsonLdScript, faqJsonLd, breadcrumbJsonLd } from "@/lib/seo";
import { services, otherServices } from "@/content/services";
import { faqs } from "@/content/faqs";
import { GlassPanel } from "@/components/ui/glass-panel";
import { LinkButton } from "@/components/ui/button";
import { Reveal } from "@/components/ui/reveal";

export const metadata: Metadata = buildMetadata({
  title: "Services: Shopify Development & Custom Websites",
  description: "Shopify theme development, custom website builds, performance optimization, and SEO. See how I can help your store.",
  path: "/services",
});

export default function ServicesPage() {
  const jsonLd = [
    faqJsonLd(faqs),
    breadcrumbJsonLd([{ name: "Home", path: "/" }, { name: "Services", path: "/services" }]),
  ];

  return (
    <div className="mx-auto max-w-5xl px-4 py-10 md:py-16">
      {jsonLd.map((data, i) => (
        <script key={i} type="application/ld+json" dangerouslySetInnerHTML={{ __html: jsonLdScript(data) }} />
      ))}

      <Reveal className="text-center">
        <p className="text-sm font-medium uppercase tracking-wider text-[var(--gold)]">Services</p>
        <h1 className="mt-2 font-display text-4xl font-semibold md:text-5xl">How I Can Help</h1>
        <p className="mx-auto mt-4 max-w-xl text-[var(--fg-muted)]">
          From full Shopify rebuilds to focused performance fixes, here's what I offer.
        </p>
      </Reveal>

      <div className="mt-8 md:mt-14 grid gap-6 md:grid-cols-2">
        {services.map((service, i) => (
          <Reveal key={service.slug} delay={i * 0.1}>
            <GlassPanel className="h-full p-8">
              <h2 className="font-display text-2xl font-semibold">{service.title}</h2>
              <p className="mt-3 text-[var(--fg-muted)]">{service.summary}</p>
              <ul className="mt-5 space-y-2 text-sm text-[var(--fg-muted)]">
                {service.features.slice(0, 4).map((f) => (
                  <li key={f}>• {f}</li>
                ))}
              </ul>
              <div className="mt-6">
                <LinkButton href={`/services/${service.slug}`} variant="outline" size="sm">
                  Learn More
                </LinkButton>
              </div>
            </GlassPanel>
          </Reveal>
        ))}
      </div>

      <Reveal delay={0.2} className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {otherServices.map((service) => (
          <GlassPanel key={service.title} className="p-6">
            <h3 className="font-medium">{service.title}</h3>
            <p className="mt-2 text-sm text-[var(--fg-muted)]">{service.summary}</p>
          </GlassPanel>
        ))}
      </Reveal>

      <div id="faq" className="mt-24 scroll-mt-28">
        <Reveal className="text-center">
          <p className="text-sm font-medium uppercase tracking-wider text-[var(--gold)]">FAQ</p>
          <h2 className="mt-2 font-display text-3xl font-semibold">Frequently Asked Questions</h2>
        </Reveal>

        <div className="mx-auto mt-10 max-w-3xl space-y-3">
          {faqs.map((faq) => (
            <details key={faq.question} className="glass group rounded-[var(--radius-md)] p-5">
              <summary className="cursor-pointer list-none font-medium marker:content-none">
                {faq.question}
              </summary>
              <p className="mt-3 text-sm text-[var(--fg-muted)]">{faq.answer}</p>
            </details>
          ))}
        </div>

        <Reveal className="mt-10 text-center">
          <p className="text-[var(--fg-muted)]">Don't see your answer above?</p>
          <div className="mt-4">
            <LinkButton href="/contact">Ask Me Anything</LinkButton>
          </div>
        </Reveal>
      </div>
    </div>
  );
}
