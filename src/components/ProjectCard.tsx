import Image from "next/image";
import Link from "next/link";
import { ExternalLink, GitBranch } from "lucide-react";
import { ButtonLink } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import type { Project } from "@/types/portfolio";

export function ProjectCard({ project }: { project: Project }) {
  return (
    <Card className="group flex h-full flex-col overflow-hidden p-0 transition duration-300 hover:-translate-y-1 hover:border-blue-300/35 hover:shadow-[0_28px_90px_rgba(15,64,155,0.2)]">
      <Link
        href={`/projects/${project.slug}`}
        className="relative block aspect-[16/10] overflow-hidden"
      >
        <Image
          src={project.thumbnail_path ?? "/uploads/project-placeholder.svg"}
          alt={project.title}
          fill
          className="object-cover transition duration-700 group-hover:scale-105"
          sizes="(min-width: 1024px) 33vw, (min-width: 768px) 50vw, 100vw"
        />
        <span className="absolute inset-0 bg-gradient-to-t from-[#020617]/80 via-transparent to-transparent" />
      </Link>
      <div className="flex flex-1 flex-col p-5">
        <div className="mb-3 flex flex-wrap gap-2">
          {project.tech_stack.slice(0, 4).map((tech) => (
            <span
              key={tech}
              className="rounded-full border border-blue-300/15 bg-blue-500/[0.06] px-2.5 py-1 text-xs text-slate-300"
            >
              {tech}
            </span>
          ))}
        </div>
        <h3 className="text-xl font-semibold text-white transition group-hover:text-blue-200">
          {project.title}
        </h3>
        <p className="mt-3 flex-1 text-sm leading-6 text-slate-400">
          {project.short_description}
        </p>
        <div className="mt-5 flex flex-wrap gap-2">
          <ButtonLink href={`/projects/${project.slug}`} variant="primary">
            Detail
          </ButtonLink>
          {project.demo_link ? (
            <ButtonLink href={project.demo_link} variant="ghost">
              <ExternalLink className="h-4 w-4" />
              Demo
            </ButtonLink>
          ) : null}
          {project.github_link ? (
            <ButtonLink href={project.github_link} variant="ghost">
              <GitBranch className="h-4 w-4" />
              GitHub
            </ButtonLink>
          ) : null}
        </div>
      </div>
    </Card>
  );
}
