import { SkillsManager } from "@/components/admin/SkillsManager";
import { getSkillCategoriesWithSkills } from "@/lib/repositories";

export default async function AdminSkillsPage() {
  const categories = await getSkillCategoriesWithSkills();

  return (
    <div>
      <p className="text-sm font-semibold uppercase tracking-[0.22em] text-[#60a5fa]">
        Skills
      </p>
      <h2 className="mt-2 text-3xl font-semibold text-[#f8fafc]">Manajemen Skill</h2>
      <SkillsManager initialCategories={categories} />
    </div>
  );
}
