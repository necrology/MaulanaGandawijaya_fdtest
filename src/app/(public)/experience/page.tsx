import type { Metadata } from "next";
import { CalendarDays } from "lucide-react";
import { Card } from "@/components/ui/Card";
import { SectionTitle } from "@/components/ui/SectionTitle";
import { getExperiences } from "@/lib/repositories";
import { formatDisplayMonthYear } from "@/lib/utils";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Experience",
  description:
    "Riwayat kerja dan pengalaman kolaborasi profesional Maulana Ganda Wijaya.",
  alternates: { canonical: "/experience" },
};

export default async function ExperiencePage() {
  const experiences = await getExperiences();

  return (
    <section className="relative mx-auto max-w-5xl px-4 py-10 md:px-8 md:py-14">
      <SectionTitle
        eyebrow="Experience"
        title="Riwayat Kerja dan Kolaborasi"
        description="Pengalaman yang menampilkan peran, tanggung jawab, proses kerja, dan teknologi yang digunakan."
      />
      <div className="space-y-5">
        {experiences.map((experience) => (
          <Card key={experience.id} className="border-blue-300/20">
            <div className="flex flex-col gap-4 md:flex-row md:items-start md:justify-between">
              <div>
                <p className="text-sm font-semibold text-blue-300">
                  {experience.company}
                </p>
                <h3 className="mt-1 text-2xl font-semibold text-white">
                  {experience.position}
                </h3>
              </div>
              <p className="flex items-center gap-2 rounded-full border border-blue-300/15 bg-blue-500/[0.06] px-3 py-2 text-sm text-slate-300">
                <CalendarDays className="h-4 w-4 text-sky-300" />
                {formatDisplayMonthYear(experience.start_date)} -{" "}
                {experience.is_current
                  ? "Present"
                  : formatDisplayMonthYear(experience.end_date)}
              </p>
            </div>
            <p className="mt-5 whitespace-pre-line leading-8 text-slate-300">
              {experience.description}
            </p>
            <div className="mt-5 flex flex-wrap gap-2">
              {experience.tech_stack.map((tech) => (
                <span
                  key={tech}
                  className="rounded-full border border-blue-300/15 bg-blue-500/[0.06] px-3 py-1 text-sm text-slate-300"
                >
                  {tech}
                </span>
              ))}
            </div>
          </Card>
        ))}
      </div>
    </section>
  );
}
