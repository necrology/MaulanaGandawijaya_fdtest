import { ProfileForm } from "@/components/admin/ProfileForm";
import { getProfile } from "@/lib/repositories";

export default async function AdminProfilePage() {
  const profile = await getProfile();

  return (
    <div>
      <p className="text-sm font-semibold uppercase tracking-[0.22em] text-[#60a5fa]">
        Profile
      </p>
      <h2 className="mt-2 text-3xl font-semibold text-[#f8fafc]">Manajemen Profile</h2>
      <ProfileForm profile={profile} />
    </div>
  );
}
