import type { Metadata } from "next";
import { buildMetadata } from "@/lib/seo";
import { projects } from "@/content/projects";
import { ProjectCard } from "@/components/projects/project-card";

export const metadata: Metadata = buildMetadata({
  title: "Case Studies — In-Depth Shopify Project Breakdowns",
  description: "Detailed case studies covering problem, solution, performance, and SEO results for Shopify projects.",
  path: "/case-studies",
});

export default function CaseStudiesPage() {
  return (
    <section className="mx-auto max-w-6xl px-4 py-10 md:py-16">
      <div className="mb-8 text-center md:mb-12">
        <p className="text-sm font-medium uppercase tracking-wider text-[var(--gold)]">Deep Dives</p>
        <h1 className="mt-2 font-display text-4xl font-semibold md:text-5xl">Case Studies</h1>
        <p className="mx-auto mt-4 max-w-xl text-[var(--fg-muted)]">
          The full story behind each build — problem, solution, and measurable results.
        </p>
      </div>
      <div className="grid gap-6 sm:grid-cols-2">
        {projects.map((project) => (
          <ProjectCard key={project.slug} project={project} />
        ))}
      </div>
    </section>
  );
}
