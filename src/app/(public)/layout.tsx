import { Footer } from "@/components/Footer";
import { Navbar } from "@/components/Navbar";
import { getProfile, getSocialLinks } from "@/lib/repositories";

export const dynamic = "force-dynamic";

export default async function PublicLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  const [profile, socials] = await Promise.all([
    getProfile(),
    getSocialLinks({ activeOnly: true }),
  ]);

  return (
    <div className="site-shell min-h-screen overflow-x-hidden text-[#f8fafc]">
      <Navbar profile={profile} />
      <main className="relative">{children}</main>
      <Footer profile={profile} socials={socials} />
    </div>
  );
}
