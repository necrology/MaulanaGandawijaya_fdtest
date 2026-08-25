import type { Metadata } from "next";
import { Mail, MapPin, Phone } from "lucide-react";
import { ContactForm } from "@/components/ContactForm";
import { Icon } from "@/components/Icon";
import { Card } from "@/components/ui/Card";
import { SectionTitle } from "@/components/ui/SectionTitle";
import { getProfile, getSocialLinks } from "@/lib/repositories";
import { siteConfig } from "@/lib/site";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Contact",
  description:
    "Hubungi Maulana Ganda Wijaya untuk pekerjaan, kolaborasi, pengembangan aplikasi, atau application security.",
  alternates: { canonical: "/contact" },
};

export default async function ContactPage() {
  const [profile, socials] = await Promise.all([
    getProfile(),
    getSocialLinks({ activeOnly: true }),
  ]);
  const whatsappUrl =
    socials.find(
      (social) => social.platform.toLowerCase() === "whatsapp",
    )?.url ?? siteConfig.whatsappUrl;

  return (
    <section className="relative mx-auto max-w-7xl px-4 py-10 md:px-8 md:py-14">
      <SectionTitle
        eyebrow="Contact"
        title="Mari Mulai Percakapan"
        description="Untuk peluang pekerjaan, kolaborasi, kebutuhan website, aplikasi mobile, atau diskusi application security."
      />
      <div className="grid gap-8 lg:grid-cols-[0.75fr_1.25fr]">
        <div className="space-y-5">
          <Card>
            <h3 className="text-xl font-semibold text-white">Kontak Langsung</h3>
            <div className="mt-5 space-y-4 text-sm text-slate-300">
              <a
                href={`mailto:${profile.email}`}
                className="flex items-center gap-3 transition hover:text-white"
              >
                <Mail className="h-4 w-4 text-sky-300" />
                {profile.email}
              </a>
              {profile.phone ? (
                <a
                  href={`tel:${profile.phone.replace(/[^+\d]/g, "")}`}
                  className="flex items-center gap-3 transition hover:text-white"
                >
                  <Phone className="h-4 w-4 text-sky-300" />
                  {profile.phone}
                </a>
              ) : null}
              {profile.location ? (
                <p className="flex items-center gap-3">
                  <MapPin className="h-4 w-4 text-sky-300" />
                  {profile.location}
                </p>
              ) : null}
            </div>
          </Card>

          <Card>
            <h3 className="text-xl font-semibold text-white">Social Media</h3>
            <div className="mt-5 grid gap-3">
              {socials.map((social) => (
                <a
                  key={social.id}
                  href={social.url}
                  target={social.url.startsWith("http") ? "_blank" : undefined}
                  rel={social.url.startsWith("http") ? "noreferrer" : undefined}
                  className="flex items-center gap-3 rounded-xl border border-blue-300/15 bg-blue-500/[0.05] px-4 py-3 text-sm text-slate-300 transition duration-300 hover:-translate-y-0.5 hover:border-blue-300/35 hover:bg-blue-500/10 hover:text-white"
                >
                  <Icon name={social.icon} className="h-4 w-4 text-sky-300" />
                  {social.platform}
                </a>
              ))}
            </div>
          </Card>
        </div>

        <Card>
          <ContactForm ownerWhatsAppUrl={whatsappUrl} />
        </Card>
      </div>
    </section>
  );
}
