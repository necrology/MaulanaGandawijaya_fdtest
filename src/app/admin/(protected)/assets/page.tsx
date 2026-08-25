import { AssetsManager } from "@/components/admin/AssetsManager";
import { getAssets } from "@/lib/repositories";

export default async function AdminAssetsPage() {
  const assets = await getAssets();

  return (
    <div>
      <p className="text-sm font-semibold uppercase tracking-[0.22em] text-[#60a5fa]">
        Assets
      </p>
      <h2 className="mt-2 text-3xl font-semibold text-[#f8fafc]">Manajemen Asset Upload</h2>
      <AssetsManager initialAssets={assets} />
    </div>
  );
}
