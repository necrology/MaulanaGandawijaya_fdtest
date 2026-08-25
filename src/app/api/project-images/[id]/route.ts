import { execute, queryOne } from "@/lib/db";
import { fail, ok, requireAdmin } from "@/lib/http";
import { deleteUploadedFile } from "@/lib/upload";

type Context = {
  params: Promise<{ id: string }>;
};

type ImageAssetRow = {
  asset_id: number;
  path: string;
};

export async function DELETE(_request: Request, context: Context) {
  const guard = await requireAdmin();
  if (guard) {
    return guard;
  }

  const { id } = await context.params;
  const image = await queryOne<ImageAssetRow>(
    `SELECT pi.asset_id, a.path
     FROM project_images pi
     INNER JOIN assets a ON a.id = pi.asset_id
     WHERE pi.id = ?
     LIMIT 1`,
    [Number(id)],
  );

  if (!image) {
    return fail("Gambar project tidak ditemukan.", 404);
  }

  await execute("DELETE FROM project_images WHERE id = ?", [Number(id)]);
  await execute("DELETE FROM assets WHERE id = ?", [image.asset_id]);
  await deleteUploadedFile(image.path);

  return ok(true);
}
