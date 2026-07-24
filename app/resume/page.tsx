import type { Metadata } from "next";
import { buildMetadata } from "@/lib/seo";
import { experience, education } from "@/content/experience";
import { skillGroups } from "@/content/skills";
import { siteConfig } from "@/lib/site";
import { LinkButton } from "@/components/ui/button";
import { GlassPanel } from "@/components/ui/glass-panel";
import { Reveal } from "@/components/ui/reveal";
import { Download } from "lucide-react";

export const metadata: Metadata = buildMetadata({
  title: "Resume — Vivek Patel",
  description: "Resume and downloadable CV for Vivek Patel, Shopify Frontend Developer.",
  path: "/resume",
});

export default function ResumePage() {
  return (
    <div className="mx-auto max-w-4xl px-4 py-10 md:py-16">
      <Reveal className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <p className="text-sm font-medium uppercase tracking-wider text-[var(--gold)]">Resume</p>
          <h1 className="mt-2 font-display text-4xl font-semibold">{siteConfig.fullName}</h1>
          <p className="mt-2 text-[var(--fg-muted)]">{siteConfig.role}</p>
        </div>
        <LinkButton href="/cv/Vivek_CV.pdf">
          <Download size={16} /> Download PDF
        </LinkButton>
      </Reveal>

      <Reveal delay={0.1} className="mt-8 md:mt-14">
        <h2 className="font-display text-xl font-semibold">Experience</h2>
        <div className="mt-6 space-y-6">
          {experience.map((job) => (
            <GlassPanel key={job.company} className="p-6">
              <div className="flex flex-wrap items-center justify-between gap-2">
                <h3 className="font-medium">{job.role} — {job.company}</h3>
                <span className="text-sm text-[var(--fg-muted)]">{job.period}</span>
              </div>
              <ul className="mt-3 list-disc space-y-1 pl-5 text-sm text-[var(--fg-muted)]">
                {job.points.slice(0, 4).map((p) => (
                  <li key={p}>{p}</li>
                ))}
              </ul>
            </GlassPanel>
          ))}
        </div>
      </Reveal>

      <Reveal delay={0.15} className="mt-8 md:mt-14">
        <h2 className="font-display text-xl font-semibold">Skills</h2>
        <div className="mt-6 flex flex-wrap gap-2">
          {skillGroups.flatMap((g) => g.items).map((skill) => (
            <span key={skill} className="rounded-full bg-[var(--bg-elevated)] px-3 py-1 text-sm text-[var(--fg-muted)]">
              {skill}
            </span>
          ))}
        </div>
      </Reveal>

      <Reveal delay={0.2} className="mt-8 md:mt-14">
        <h2 className="font-display text-xl font-semibold">Education & Training</h2>
        <div className="mt-6 space-y-4">
          {education.map((item) => (
            <div key={item.title} className="flex flex-wrap items-center justify-between gap-2 border-b border-[var(--border)] pb-4">
              <div>
                <p className="font-medium">{item.title}</p>
                <p className="text-sm text-[var(--fg-muted)]">{item.org}</p>
              </div>
              <span className="text-sm text-[var(--fg-muted)]">{item.period}</span>
            </div>
          ))}
        </div>
      </Reveal>
    </div>
  );
}
