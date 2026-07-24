import { getFeaturedProjects } from "@/content/projects";
import { ProjectCard } from "@/components/projects/project-card";
import { LinkButton } from "@/components/ui/button";
import { Reveal } from "@/components/ui/reveal";

export function FeaturedProjects() {
  const featured = getFeaturedProjects();

  return (
    <section className="mx-auto max-w-6xl px-4 py-12 md:py-20">
      <Reveal className="text-center">
        <p className="text-sm font-medium uppercase tracking-wider text-[var(--gold)]">Work</p>
        <h2 className="mt-2 font-display text-3xl font-semibold md:text-4xl">Featured Projects</h2>
      </Reveal>

      <div className="mt-10 grid gap-6 sm:grid-cols-2">
        {featured.map((project, i) => (
          <Reveal key={project.slug} delay={i * 0.1}>
            <ProjectCard project={project} />
          </Reveal>
        ))}
      </div>

      <Reveal className="mt-10 text-center">
        <LinkButton href="/projects" variant="outline">
          View All Projects
        </LinkButton>
      </Reveal>
    </section>
  );
}
