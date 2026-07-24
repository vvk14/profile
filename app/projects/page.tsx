import type { Metadata } from "next";
import { buildMetadata } from "@/lib/seo";
import { projects } from "@/content/projects";
import { ProjectCard } from "@/components/projects/project-card";

export const metadata: Metadata = buildMetadata({
  title: "Projects — Shopify & Custom Website Work",
  description: "Selected Shopify storefront builds and custom website projects, with results and technical breakdowns.",
  path: "/projects",
});

export default function ProjectsPage() {
  return (
    <section className="mx-auto max-w-6xl px-4 py-10 md:py-16">
      <div className="mb-8 text-center md:mb-12">
        <p className="text-sm font-medium uppercase tracking-wider text-[var(--gold)]">Work</p>
        <h1 className="mt-2 font-display text-4xl font-semibold md:text-5xl">Selected Projects</h1>
        <p className="mx-auto mt-4 max-w-xl text-[var(--fg-muted)]">
          Shopify storefronts and custom builds, with real technical and business outcomes.
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
