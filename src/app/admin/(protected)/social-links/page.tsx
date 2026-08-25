import { SocialLinksManager } from "@/components/admin/SocialLinksManager";
import { getSocialLinks } from "@/lib/repositories";

export default async function AdminSocialLinksPage() {
  const socials = await getSocialLinks();

  return (
    <div>
      <p className="text-sm font-semibold uppercase tracking-[0.22em] text-[#60a5fa]">
        Social
      </p>
      <h2 className="mt-2 text-3xl font-semibold text-[#f8fafc]">Manajemen Social Link</h2>
      <SocialLinksManager initialSocials={socials} />
    </div>
  );
}
