import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { notFound } from "next/navigation";
import { projects, getProjectBySlug, getRelatedProjects } from "@/content/projects";
import { buildMetadata, jsonLdScript, projectJsonLd, breadcrumbJsonLd } from "@/lib/seo";
import { siteConfig } from "@/lib/site";
import { Badge } from "@/components/ui/badge";
import { LinkButton } from "@/components/ui/button";
import { ProjectGallery } from "@/components/projects/project-gallery";
import { BeforeAfterSlider } from "@/components/projects/before-after-slider";
import { ProjectCard } from "@/components/projects/project-card";

export async function generateStaticParams() {
  return projects.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const project = getProjectBySlug(slug);
  if (!project) return {};

  return buildMetadata({
    title: `${project.title} — Case Study`,
    description: project.summary,
    path: `/projects/${project.slug}`,
    image: `${siteConfig.url}${project.coverImage}`,
  });
}

export default async function ProjectPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const project = getProjectBySlug(slug);
  if (!project) notFound();

  const related = getRelatedProjects(project.slug);
  const jsonLd = [
    projectJsonLd(project),
    breadcrumbJsonLd([
      { name: "Home", path: "/" },
      { name: "Projects", path: "/projects" },
      { name: project.title, path: `/projects/${project.slug}` },
    ]),
  ];

  return (
    <article className="mx-auto max-w-5xl px-4 py-10 md:py-16">
      {jsonLd.map((data, i) => (
        <script key={i} type="application/ld+json" dangerouslySetInnerHTML={{ __html: jsonLdScript(data) }} />
      ))}

      <nav aria-label="Breadcrumb" className="text-sm text-[var(--fg-muted)]">
        <Link href="/projects" className="hover:text-[var(--gold)]">Projects</Link> / {project.title}
      </nav>

      <header className="mt-6">
        <Badge>{project.category}</Badge>
        <h1 className="mt-3 font-display text-3xl font-semibold md:text-5xl">{project.title}</h1>
        <p className="mt-3 text-[var(--fg-muted)]">
          {project.client} · {project.period}
        </p>
      </header>

      <div className="relative mt-10 aspect-[16/9] overflow-hidden rounded-[var(--radius-lg)]">
        <Image src={project.coverImage} alt={project.title} fill sizes="100vw" className="object-cover" priority />
      </div>

      <div className="mt-10 flex flex-wrap gap-2">
        {project.techStack.map((tech) => (
          <span key={tech} className="rounded-full bg-[var(--bg-elevated)] px-3 py-1 text-sm text-[var(--fg-muted)]">
            {tech}
          </span>
        ))}
      </div>

      <div className="mt-12 grid gap-10 md:grid-cols-2">
        <div>
          <h2 className="font-display text-xl font-semibold">The Problem</h2>
          <p className="mt-3 text-[var(--fg-muted)]">{project.problem}</p>
        </div>
        <div>
          <h2 className="font-display text-xl font-semibold">The Solution</h2>
          <p className="mt-3 text-[var(--fg-muted)]">{project.solution}</p>
        </div>
      </div>

      {project.beforeImage && project.afterImage && (
        <div className="mt-12">
          <h2 className="font-display text-xl font-semibold">Before / After</h2>
          <div className="mt-5">
            <BeforeAfterSlider before={project.beforeImage} after={project.afterImage} alt={project.title} />
          </div>
        </div>
      )}

      {project.performance.length > 0 && (
        <div className="mt-12">
          <h2 className="font-display text-xl font-semibold">Performance Improvements</h2>
          <div className="mt-5 grid gap-4 sm:grid-cols-2">
            {project.performance.map((p) => (
              <div key={p.label} className="glass rounded-[var(--radius-md)] p-5">
                <p className="text-xs uppercase tracking-wider text-[var(--fg-muted)]">{p.label}</p>
                <div className="mt-2 flex items-center gap-2 text-sm">
                  <span className="text-[var(--fg-muted)] line-through">{p.before}</span>
                  <span className="text-[var(--gold)]">→</span>
                  <span className="font-medium">{p.after}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {project.seoResults.length > 0 && (
        <div className="mt-12">
          <h2 className="font-display text-xl font-semibold">SEO Improvements</h2>
          <ul className="mt-4 list-disc space-y-2 pl-5 text-[var(--fg-muted)]">
            {project.seoResults.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        </div>
      )}

      {project.results.length > 0 && (
        <div className="mt-12 grid grid-cols-3 gap-4 rounded-[var(--radius-lg)] border border-[var(--border)] p-8 text-center">
          {project.results.map((r) => (
            <div key={r.label}>
              <p className="font-display text-2xl font-semibold text-[var(--gold)]">{r.value}</p>
              <p className="mt-1 text-xs text-[var(--fg-muted)]">{r.label}</p>
            </div>
          ))}
        </div>
      )}

      {project.gallery.length > 1 && (
        <div className="mt-12">
          <h2 className="font-display text-xl font-semibold">Gallery</h2>
          <div className="mt-5">
            <ProjectGallery images={project.gallery} title={project.title} />
          </div>
        </div>
      )}

      <div className="mt-8 md:mt-14 flex flex-wrap gap-4">
        <LinkButton href="/contact">Start a Similar Project</LinkButton>
        <LinkButton href="/projects" variant="outline">Back to Projects</LinkButton>
      </div>

      {related.length > 0 && (
        <div className="mt-10 md:mt-20">
          <h2 className="font-display text-2xl font-semibold">Related Projects</h2>
          <div className="mt-6 grid gap-6 sm:grid-cols-2">
            {related.map((p) => (
              <ProjectCard key={p.slug} project={p} />
            ))}
          </div>
        </div>
      )}
    </article>
  );
}
