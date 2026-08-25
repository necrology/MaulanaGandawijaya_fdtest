import { execute } from "@/lib/db";
import { fail, handleError, ok, requireAdmin } from "@/lib/http";
import { getProjectImages } from "@/lib/repositories";
import { saveUploadedFile } from "@/lib/upload";

type Context = {
  params: Promise<{ id: string }>;
};

export async function GET(_request: Request, context: Context) {
  const { id } = await context.params;
  return ok(await getProjectImages(Number(id)));
}

export async function POST(request: Request, context: Context) {
  const guard = await requireAdmin();
  if (guard) {
    return guard;
  }

  try {
    const { id } = await context.params;
    const projectId = Number(id);
    const formData = await request.formData();
    const images = formData
      .getAll("images")
      .filter((value): value is File => value instanceof File && value.size > 0);

    if (images.length === 0) {
      return fail("Pilih minimal satu gambar.", 400);
    }

    for (const [index, image] of images.entries()) {
      const asset = await saveUploadedFile(image, "project", {
        type: "project",
        id: projectId,
      });
      if (asset) {
        await execute(
          "INSERT INTO project_images (project_id, asset_id, sort_order) VALUES (?, ?, ?)",
          [projectId, asset.id, index + 1],
        );
      }
    }

    return ok(await getProjectImages(projectId), 201);
  } catch (error) {
    return handleError(error);
  }
}
