import type { Metadata } from "next";
import { SkillMeter } from "@/components/SkillMeter";
import { Card } from "@/components/ui/Card";
import { SectionTitle } from "@/components/ui/SectionTitle";
import { getSkillCategoriesWithSkills } from "@/lib/repositories";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Skills",
  description:
    "Keahlian frontend, backend, mobile, database, infrastructure, dan application security Maulana Ganda Wijaya.",
  alternates: { canonical: "/skills" },
};

export default async function SkillsPage() {
  const categories = await getSkillCategoriesWithSkills();

  return (
    <section className="relative mx-auto max-w-7xl px-4 py-10 md:px-8 md:py-14">
      <SectionTitle
        eyebrow="Capabilities"
        title="Keahlian Berdasarkan Area"
        description="Kemampuan yang dikelompokkan agar mudah melihat fokus kerja dan kedalaman pengalaman."
      />
      <div className="grid gap-6">
        {categories.map((category) => (
          <Card key={category.id} className="border-blue-300/20">
            <div className="mb-5 flex items-end justify-between gap-4">
              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.2em] text-blue-300">{category.slug}</p>
                <h3 className="text-2xl font-semibold text-white">{category.name}</h3>
              </div>
              <span className="rounded-full border border-blue-300/15 bg-blue-500/[0.06] px-3 py-1 text-sm text-slate-300">
                {category.skills.length} skill
              </span>
            </div>
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
              {category.skills.map((skill) => (
                <SkillMeter key={skill.id} skill={skill} />
              ))}
            </div>
          </Card>
        ))}
      </div>
    </section>
  );
}
