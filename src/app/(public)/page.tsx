import type { Metadata } from "next";
import { Download, Mail } from "lucide-react";
import { ProjectCard } from "@/components/ProjectCard";
import { SkillMeter } from "@/components/SkillMeter";
import { ButtonLink } from "@/components/ui/Button";
import { SectionTitle } from "@/components/ui/SectionTitle";
import {
  getExperiences,
  getProfile,
  getProjects,
  getSkillCategoriesWithSkills,
} from "@/lib/repositories";
import { siteConfig } from "@/lib/site";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Portfolio",
  description: siteConfig.description,
  alternates: { canonical: "/" },
};

export default async function HomePage() {
  const [profile, allProjects, categories, experiences] = await Promise.all([
    getProfile(),
    getProjects(),
    getSkillCategoriesWithSkills(),
    getExperiences(),
  ]);
  const topSkills = categories.flatMap((category) => category.skills).slice(0, 6);
  const featuredProjects = allProjects.filter((project) => project.featured);
  const selectedProjects = (
    featuredProjects.length > 0 ? featuredProjects : allProjects
  ).slice(0, 6);

  return (
    <>
      <section className="studio-grain relative overflow-hidden border-b border-white/10">
        <div
          aria-hidden="true"
          className="absolute -left-32 top-24 h-80 w-80 rounded-full bg-blue-600/15 blur-3xl"
        />
        <div
          aria-hidden="true"
          className="absolute -right-28 bottom-10 h-96 w-96 rounded-full bg-sky-400/10 blur-3xl"
        />
        <div className="relative mx-auto grid min-h-[calc(100svh-72px)] max-w-7xl gap-8 px-4 py-14 md:grid-cols-[0.12fr_1fr] md:px-8 md:py-16">
          <div className="hidden md:block">
            <p className="vertical-label text-xs font-semibold uppercase tracking-[0.3em] text-blue-300/80">
              Portfolio / Selected practice
            </p>
          </div>

          <div className="flex max-w-5xl flex-col justify-center">
            <p className="mb-6 flex w-fit items-center gap-3 rounded-full border border-blue-300/20 bg-blue-500/[0.08] px-4 py-2 text-xs font-semibold uppercase tracking-[0.2em] text-blue-200 backdrop-blur">
              <span className="h-2 w-2 rounded-full bg-sky-300 shadow-[0_0_16px_rgba(125,211,252,0.9)]" />
              <span>Independent professional portfolio</span>
            </p>
            <h1 className="gradient-text max-w-5xl text-5xl font-semibold leading-[0.96] tracking-[-0.04em] md:text-7xl lg:text-8xl">
              {profile.full_name}
            </h1>
            <p className="mt-5 text-xl font-medium text-blue-200 md:text-2xl">
              {profile.job_title}
            </p>
            <p className="mt-6 max-w-3xl text-base leading-8 text-slate-300 md:text-lg">
              {profile.short_bio}
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <ButtonLink
                href={siteConfig.portfolioPdfPath}
                download="Maulana-Ganda-Wijaya-Portfolio-2026.pdf"
              >
                <Download className="h-4 w-4" />
                Download Portfolio
              </ButtonLink>
              <ButtonLink href="/contact" variant="ghost">
                <Mail className="h-4 w-4" />
                Contact
              </ButtonLink>
            </div>

            <div className="mt-6 grid max-w-2xl grid-cols-3 overflow-hidden rounded-2xl border border-white/15 bg-white/[0.06] text-center shadow-[0_18px_55px_rgba(2,6,23,0.3)] backdrop-blur-xl">
              <div className="border-r border-white/10 p-4">
                <p className="text-2xl font-semibold text-white">
                  {allProjects.length}
                </p>
                <p className="text-xs text-slate-400">Projects</p>
              </div>
              <div className="border-r border-white/10 p-4">
                <p className="text-2xl font-semibold text-blue-200">
                  {topSkills.length}+
                </p>
                <p className="text-xs text-slate-400">Skills</p>
              </div>
              <div className="p-4">
                <p className="text-2xl font-semibold text-white">
                  {experiences.length}
                </p>
                <p className="text-xs text-slate-400">Experience</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="relative mx-auto max-w-7xl px-4 py-16 md:px-8 md:py-20">
        <SectionTitle
          eyebrow="Selected Projects"
          title="Projects yang Disusun dengan Rapi"
          description="Project pilihan yang menunjukkan cara saya mengolah kebutuhan, tampilan, struktur data, keamanan, dan pengalaman pengguna."
        />
        <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
          {selectedProjects.map((project) => (
            <ProjectCard key={project.id} project={project} />
          ))}
        </div>
      </section>

      <section className="relative overflow-hidden border-y border-white/10 bg-[linear-gradient(135deg,rgba(7,17,31,0.94),rgba(8,33,72,0.82),rgba(2,6,23,0.96))] py-16 md:py-20">
        <div
          aria-hidden="true"
          className="absolute left-1/2 top-0 h-64 w-[44rem] -translate-x-1/2 rounded-full bg-blue-500/10 blur-3xl"
        />
        <div className="relative mx-auto max-w-7xl px-4 md:px-8">
          <SectionTitle
            eyebrow="Capabilities"
            title="Kemampuan Utama"
            description="Area kerja yang sering saya gunakan untuk membangun solusi digital yang jelas, stabil, aman, dan mudah dikembangkan."
          />
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {topSkills.map((skill) => (
              <SkillMeter key={skill.id} skill={skill} />
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
