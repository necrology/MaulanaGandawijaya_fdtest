import type { Metadata } from "next";
import { ProjectCard } from "@/components/ProjectCard";
import { SectionTitle } from "@/components/ui/SectionTitle";
import { getProjects } from "@/lib/repositories";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Projects",
  description:
    "Kumpulan project web, mobile, enterprise system, healthcare, dan application security Maulana Ganda Wijaya.",
  alternates: { canonical: "/projects" },
};

export default async function ProjectsPage() {
  const projects = await getProjects();

  return (
    <section className="relative mx-auto max-w-7xl px-4 py-10 md:px-8 md:py-14">
      <SectionTitle
        eyebrow="Projects"
        title="Project Portfolio"
        description="Catatan project yang pernah dikerjakan, mulai dari kebutuhan, hasil visual, sampai detail implementasi."
      />
      <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
        {projects.map((project) => (
          <ProjectCard key={project.id} project={project} />
        ))}
      </div>
    </section>
  );
}
