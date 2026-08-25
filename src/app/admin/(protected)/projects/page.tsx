import { ProjectsManager } from "@/components/admin/ProjectsManager";
import { getProjects } from "@/lib/repositories";

export default async function AdminProjectsPage() {
  const projects = await getProjects();

  return (
    <div>
      <p className="text-sm font-semibold uppercase tracking-[0.22em] text-[#60a5fa]">
        Projects
      </p>
      <h2 className="mt-2 text-3xl font-semibold text-[#f8fafc]">Manajemen Project</h2>
      <ProjectsManager initialProjects={projects} />
    </div>
  );
}
