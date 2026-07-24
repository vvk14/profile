import type { Metadata } from "next";
import Image from "next/image";
import { buildMetadata, jsonLdScript, breadcrumbJsonLd } from "@/lib/seo";
import { experience, education } from "@/content/experience";
import { skillGroups } from "@/content/skills";
import { siteConfig } from "@/lib/site";
import { LinkButton } from "@/components/ui/button";
import { GlassPanel } from "@/components/ui/glass-panel";
import { Reveal } from "@/components/ui/reveal";

export const metadata: Metadata = buildMetadata({
  title: "About — Vivek Patel, Shopify Developer",
  description: "3+ years building high-performance Shopify storefronts. Learn about my background, skills, and experience.",
  path: "/about",
});

export default function AboutPage() {
  const jsonLd = breadcrumbJsonLd([{ name: "Home", path: "/" }, { name: "About", path: "/about" }]);

  return (
    <div className="mx-auto max-w-5xl px-4 py-10 md:py-16">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: jsonLdScript(jsonLd) }} />

      <Reveal className="grid gap-10 md:grid-cols-[220px_1fr] md:items-center">
        <div className="relative mx-auto size-40 overflow-hidden rounded-full border border-[var(--border)] md:size-52">
          <Image src="/images/vvk-dev-logo.png" alt={siteConfig.fullName} fill className="object-cover" />
        </div>
        <div>
          <p className="text-sm font-medium uppercase tracking-wider text-[var(--gold)]">About Me</p>
          <h1 className="mt-2 font-display text-3xl font-semibold md:text-4xl">
            Hi, I'm {siteConfig.fullName} — I build Shopify storefronts for a living.
          </h1>
          <p className="mt-4 text-[var(--fg-muted)]">{siteConfig.description}</p>
          <div className="mt-6">
            <LinkButton href="/contact">Work With Me</LinkButton>
          </div>
        </div>
      </Reveal>

      <Reveal delay={0.1} className="mt-10 md:mt-20">
        <h2 className="font-display text-2xl font-semibold">Experience</h2>
        <div className="mt-8 space-y-8">
          {experience.map((job) => (
            <GlassPanel key={job.company} className="p-6">
              <div className="flex flex-wrap items-center justify-between gap-2">
                <h3 className="font-display text-lg font-semibold">{job.role}</h3>
                <span className="text-sm text-[var(--fg-muted)]">{job.period}</span>
              </div>
              <p className="text-sm text-[var(--gold)]">{job.company}</p>
              <ul className="mt-4 list-disc space-y-1.5 pl-5 text-sm text-[var(--fg-muted)]">
                {job.points.map((point) => (
                  <li key={point}>{point}</li>
                ))}
              </ul>
            </GlassPanel>
          ))}
        </div>
      </Reveal>

      <Reveal delay={0.15} className="mt-10 md:mt-20">
        <h2 className="font-display text-2xl font-semibold">Skills</h2>
        <div className="mt-8 grid gap-6 sm:grid-cols-2">
          {skillGroups.map((group) => (
            <GlassPanel key={group.category} className="p-6">
              <h3 className="font-medium">{group.category}</h3>
              <div className="mt-3 flex flex-wrap gap-2">
                {group.items.map((item) => (
                  <span key={item} className="rounded-full bg-[var(--bg-elevated)] px-3 py-1 text-xs text-[var(--fg-muted)]">
                    {item}
                  </span>
                ))}
              </div>
            </GlassPanel>
          ))}
        </div>
      </Reveal>

      <Reveal delay={0.2} className="mt-10 md:mt-20">
        <h2 className="font-display text-2xl font-semibold">Education & Training</h2>
        <div className="mt-8 space-y-4">
          {education.map((item) => (
            <GlassPanel key={item.title} className="p-6">
              <div className="flex flex-wrap items-center justify-between gap-2">
                <h3 className="font-medium">{item.title}</h3>
                <span className="text-sm text-[var(--fg-muted)]">{item.period}</span>
              </div>
              <p className="text-sm text-[var(--gold)]">{item.org}</p>
              <p className="mt-2 text-sm text-[var(--fg-muted)]">{item.detail}</p>
            </GlassPanel>
          ))}
        </div>
      </Reveal>
    </div>
  );
}
