import { ok, requireAdmin } from "@/lib/http";
import { getAssets } from "@/lib/repositories";

export async function GET() {
  const guard = await requireAdmin();
  if (guard) {
    return guard;
  }

  return ok(await getAssets());
}
