import type { Metadata } from "next";
import Image from "next/image";
import { Mail, MapPin, Phone } from "lucide-react";
import { Card } from "@/components/ui/Card";
import { SectionTitle } from "@/components/ui/SectionTitle";
import { getExperiences, getProfile } from "@/lib/repositories";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "About",
  description:
    "Profil profesional, fokus kerja, pengalaman, dan informasi kontak Maulana Ganda Wijaya.",
  alternates: { canonical: "/about" },
};

export default async function AboutPage() {
  const [profile, experiences] = await Promise.all([
    getProfile(),
    getExperiences(),
  ]);

  return (
    <section className="relative mx-auto max-w-7xl px-4 py-10 md:px-8 md:py-14">
      <SectionTitle
        eyebrow="About"
        title="Profil Singkat dan Cara Kerja"
        description="Gambaran pengalaman, fokus kerja, dan informasi dasar untuk kolaborasi profesional."
      />

      <Card className="grid gap-6 border-blue-300/20 md:grid-cols-[190px_1fr] md:items-start md:p-6">
        <div className="mx-auto w-full max-w-[190px]">
          <div className="relative aspect-[4/5] overflow-hidden rounded-2xl border border-white/10 bg-[#020617]">
            <Image
              src={profile.profile_image_path ?? "/uploads/profile-placeholder.svg"}
              alt={profile.full_name}
              fill
              className="object-cover"
              sizes="190px"
              priority
            />
          </div>
        </div>

        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.24em] text-blue-300">
            Professional summary
          </p>
          <h2 className="mt-2 text-2xl font-semibold text-white md:text-3xl">
            {profile.job_title}
          </h2>
          <p className="mt-4 whitespace-pre-line leading-7 text-slate-300">
            {profile.about_detail}
          </p>

          <div className="mt-5 grid gap-3 text-sm text-slate-300 sm:grid-cols-2 lg:grid-cols-3">
            <a
              href={`mailto:${profile.email}`}
              className="flex items-center gap-3 rounded-xl border border-blue-300/15 bg-blue-500/[0.05] px-3 py-3 transition hover:border-blue-300/35 hover:text-white"
            >
              <Mail className="h-4 w-4 shrink-0 text-sky-300" />
              <span className="truncate">{profile.email}</span>
            </a>
            {profile.phone ? (
              <a
                href={`tel:${profile.phone.replace(/[^+\d]/g, "")}`}
                className="flex items-center gap-3 rounded-xl border border-blue-300/15 bg-blue-500/[0.05] px-3 py-3 transition hover:border-blue-300/35 hover:text-white"
              >
                <Phone className="h-4 w-4 shrink-0 text-sky-300" />
                {profile.phone}
              </a>
            ) : null}
            {profile.location ? (
              <p className="flex items-center gap-3 rounded-xl border border-blue-300/15 bg-blue-500/[0.05] px-3 py-3">
                <MapPin className="h-4 w-4 shrink-0 text-sky-300" />
                {profile.location}
              </p>
            ) : null}
          </div>
        </div>
      </Card>

      <div className="mt-5 grid gap-4 md:grid-cols-3">
        <Card>
          <p className="text-3xl font-semibold text-blue-200">
            {experiences.length}
          </p>
          <p className="mt-1 text-sm text-slate-400">Pengalaman tercatat</p>
        </Card>
        <Card>
          <p className="text-3xl font-semibold text-white">End-to-end</p>
          <p className="mt-1 text-sm text-slate-400">
            Dari kebutuhan sampai rilis
          </p>
        </Card>
        <Card>
          <p className="text-3xl font-semibold text-white">Terstruktur</p>
          <p className="mt-1 text-sm text-slate-400">
            Komunikasi dan dokumentasi jelas
          </p>
        </Card>
      </div>
    </section>
  );
}
