import Link from "next/link";
import Image from "next/image";
import type { Project } from "@/content/projects";
import { SpotlightCard } from "@/components/ui/spotlight-card";
import { Badge } from "@/components/ui/badge";

export function ProjectCard({ project }: { project: Project }) {
  return (
    <Link href={`/projects/${project.slug}`} className="group block">
      <SpotlightCard className="overflow-hidden transition-transform duration-300 group-hover:-translate-y-1">
        <div className="relative aspect-[16/10] overflow-hidden">
          <Image
            src={project.coverImage}
            alt={project.title}
            fill
            sizes="(max-width: 768px) 100vw, 50vw"
            className="object-cover transition-transform duration-500 group-hover:scale-105"
          />
          <div className="absolute left-3 top-3">
            <Badge>{project.category}</Badge>
          </div>
        </div>
        <div className="relative p-6">
          <p className="text-xs text-[var(--fg-muted)]">{project.client}</p>
          <h3 className="mt-1 font-display text-xl font-semibold group-hover:text-[var(--gold)]">
            {project.title}
          </h3>
          <p className="mt-2 line-clamp-2 text-sm text-[var(--fg-muted)]">{project.summary}</p>
          <div className="mt-4 flex flex-wrap gap-2">
            {project.techStack.slice(0, 4).map((tech) => (
              <span key={tech} className="rounded-full bg-[var(--bg-elevated)] px-2.5 py-1 text-xs text-[var(--fg-muted)]">
                {tech}
              </span>
            ))}
          </div>
        </div>
      </SpotlightCard>
    </Link>
  );
}
