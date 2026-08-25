import Image from "next/image";
import Link from "next/link";
import { ArrowDown, ExternalLink } from "lucide-react";
import { Icon } from "@/components/Icon";
import { siteConfig } from "@/lib/site";
import type { Profile, SocialLink } from "@/types/portfolio";

function socialByPlatform(socials: SocialLink[], platform: string) {
  return socials.find(
    (social) => social.platform.toLowerCase() === platform.toLowerCase(),
  );
}

export function Footer({
  profile,
  socials,
}: {
  profile: Profile;
  socials: SocialLink[];
}) {
  const whatsapp =
    socialByPlatform(socials, "WhatsApp")?.url ?? siteConfig.whatsappUrl;
  const email = socialByPlatform(socials, "Email")?.url ?? `mailto:${profile.email}`;
  const github = socialByPlatform(socials, "GitHub")?.url ?? siteConfig.githubUrl;
  const directActions = [
    {
      label: "WhatsApp",
      detail: "Mulai percakapan langsung",
      href: whatsapp,
      icon: "MessageCircle",
    },
    {
      label: "Email",
      detail: profile.email,
      href: email,
      icon: "Mail",
    },
    {
      label: "GitHub",
      detail: "Lihat source dan eksperimen",
      href: github,
      icon: "Github",
    },
  ];

  return (
    <footer className="relative overflow-hidden border-t border-white/10 bg-[linear-gradient(135deg,rgba(2,6,23,0.99),rgba(8,28,61,0.97))]">
      <div
        aria-hidden="true"
        className="absolute -right-24 top-10 h-72 w-72 rounded-full bg-blue-500/10 blur-3xl"
      />
      <div className="relative mx-auto max-w-7xl px-4 pt-10 md:px-8 md:pt-14">
        <section className="rounded-[2rem] border border-blue-300/20 bg-[linear-gradient(145deg,rgba(15,23,42,0.96),rgba(7,32,72,0.9))] p-6 shadow-[0_28px_90px_rgba(2,6,23,0.42)] md:p-8">
          <div className="grid gap-5 lg:grid-cols-[1fr_auto] lg:items-center">
            <div>
              <p className="inline-flex items-center rounded-full border border-blue-300/30 bg-blue-600 px-4 py-2 text-xs font-semibold uppercase tracking-[0.2em] text-white shadow-[0_10px_30px_rgba(37,99,235,0.28)]">
                Collaboration
              </p>
              <h2 className="mt-4 max-w-3xl text-2xl font-semibold text-white md:text-4xl">
                Punya project, tantangan teknis, atau peluang kolaborasi?
              </h2>
              <p className="mt-3 max-w-2xl leading-7 text-slate-300">
                Pilih kanal yang paling nyaman. Saya terbuka untuk diskusi pekerjaan,
                pengembangan aplikasi, dan application security.
              </p>
            </div>
            <span className="flex h-14 w-14 items-center justify-center rounded-2xl border border-blue-300/20 bg-blue-500/10 text-sky-200 lg:justify-self-end">
              <ArrowDown className="h-6 w-6" aria-hidden="true" />
            </span>
          </div>

          <div className="mt-7 grid gap-3 md:grid-cols-3">
            {directActions.map((action) => {
              return (
                <a
                  key={action.label}
                  href={action.href}
                  target={action.href.startsWith("http") ? "_blank" : undefined}
                  rel={action.href.startsWith("http") ? "noreferrer" : undefined}
                  className="group flex items-center gap-4 rounded-2xl border border-white/70 bg-white px-4 py-4 text-slate-800 shadow-[0_14px_36px_rgba(2,6,23,0.2)] transition duration-300 hover:-translate-y-1 hover:border-sky-200 hover:bg-blue-50"
                >
                  <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-blue-600 text-white">
                    <Icon name={action.icon} className="h-5 w-5" />
                  </span>
                  <span className="min-w-0 flex-1">
                    <span className="block font-semibold">{action.label}</span>
                    <span className="block truncate text-xs text-slate-500">
                      {action.detail}
                    </span>
                  </span>
                  <ExternalLink className="h-4 w-4 text-slate-400 transition group-hover:text-blue-600" aria-hidden="true" />
                </a>
              );
            })}
          </div>
        </section>
      </div>

      <div className="relative mx-auto flex max-w-7xl flex-col gap-6 px-4 py-8 md:flex-row md:items-center md:justify-between md:px-8">
        <div className="flex items-center gap-3">
          <span className="relative h-10 w-10 overflow-hidden rounded-xl border border-blue-300/30">
            <Image
              src={profile.profile_image_path ?? "/uploads/profile-placeholder.svg"}
              alt=""
              fill
              sizes="40px"
              className="object-cover"
            />
          </span>
          <div>
            <p className="font-semibold text-white">{profile.full_name}</p>
            <p className="mt-1 text-sm text-slate-400">
              Portfolio project, pengalaman, dan kolaborasi profesional.
            </p>
          </div>
        </div>
        <div className="flex flex-wrap items-center gap-2">
          {socials.map((social) => (
            <Link
              key={social.id}
              href={social.url}
              className="flex h-11 w-11 items-center justify-center rounded-xl border border-white/10 bg-white/[0.04] text-slate-300 transition duration-300 hover:-translate-y-1 hover:border-blue-300/40 hover:bg-blue-500/15 hover:text-blue-200"
              target={social.url.startsWith("http") ? "_blank" : undefined}
              rel={social.url.startsWith("http") ? "noreferrer" : undefined}
              title={social.platform}
            >
              <Icon name={social.icon} className="h-4 w-4" />
            </Link>
          ))}
        </div>
      </div>
    </footer>
  );
}
