import { ExperiencesManager } from "@/components/admin/ExperiencesManager";
import { getExperiences } from "@/lib/repositories";

export default async function AdminExperiencePage() {
  const experiences = await getExperiences();

  return (
    <div>
      <p className="text-sm font-semibold uppercase tracking-[0.22em] text-[#60a5fa]">
        Experience
      </p>
      <h2 className="mt-2 text-3xl font-semibold text-[#f8fafc]">Manajemen Experience</h2>
      <ExperiencesManager initialExperiences={experiences} />
    </div>
  );
}
