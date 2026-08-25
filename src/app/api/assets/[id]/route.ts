import { fail, ok, requireAdmin } from "@/lib/http";
import { deleteAssetById } from "@/lib/repositories";
import { deleteUploadedFile } from "@/lib/upload";

type Context = {
  params: Promise<{ id: string }>;
};

export async function DELETE(_request: Request, context: Context) {
  const guard = await requireAdmin();
  if (guard) {
    return guard;
  }

  const { id } = await context.params;
  const asset = await deleteAssetById(Number(id));

  if (!asset) {
    return fail("Asset tidak ditemukan.", 404);
  }

  await deleteUploadedFile(asset.path);
  return ok(true);
}
