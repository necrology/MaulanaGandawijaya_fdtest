import { execute } from "@/lib/db";
import { fail, handleError, ok, requireAdmin } from "@/lib/http";
import { getProjectById } from "@/lib/repositories";
import { saveUploadedFile } from "@/lib/upload";
import {
  formBoolean,
  formNullableString,
  formNumber,
  formString,
  parseStringArray,
  slugify,
} from "@/lib/utils";

type Context = {
  params: Promise<{ id: string }>;
};

export async function GET(_request: Request, context: Context) {
  const { id } = await context.params;
  const project = await getProjectById(Number(id));

  if (!project) {
    return fail("Project tidak ditemukan.", 404);
  }

  return ok(project);
}

export async function PUT(request: Request, context: Context) {
  const guard = await requireAdmin();
  if (guard) {
    return guard;
  }

  try {
    const { id } = await context.params;
    const projectId = Number(id);
    const formData = await request.formData();
    const title = formString(formData, "title");
    const slug = formString(formData, "slug") || slugify(title);
    const shortDescription = formString(formData, "short_description");
    const detailDescription = formString(formData, "detail_description");

    if (!title || !slug || !shortDescription || !detailDescription) {
      throw new Error("Judul, slug, deskripsi singkat, dan detail wajib diisi.");
    }

    await execute(
      `UPDATE projects SET
        title = ?,
        slug = ?,
        short_description = ?,
        detail_description = ?,
        tech_stack = ?,
        demo_link = ?,
        github_link = ?,
        featured = ?,
        sort_order = ?
       WHERE id = ?`,
      [
        title,
        slug,
        shortDescription,
        detailDescription,
        JSON.stringify(parseStringArray(formString(formData, "tech_stack"))),
        formNullableString(formData, "demo_link"),
        formNullableString(formData, "github_link"),
        formBoolean(formData, "featured"),
        formNumber(formData, "sort_order"),
        projectId,
      ],
    );

    const thumbnailValue = formData.get("thumbnail");
    const thumbnail = thumbnailValue instanceof File ? thumbnailValue : null;
    const savedThumbnail = await saveUploadedFile(thumbnail, "project", {
      type: "project",
      id: projectId,
    });

    if (savedThumbnail) {
      await execute("UPDATE projects SET thumbnail_asset_id = ? WHERE id = ?", [
        savedThumbnail.id,
        projectId,
      ]);
    }

    const images = formData
      .getAll("project_images")
      .filter((value): value is File => value instanceof File && value.size > 0);

    for (const [index, image] of images.entries()) {
      const asset = await saveUploadedFile(image, "project", {
        type: "project",
        id: projectId,
      });
      if (asset) {
        await execute(
          `INSERT INTO project_images (project_id, asset_id, sort_order)
           VALUES (?, ?, ?)`,
          [projectId, asset.id, index + 100],
        );
      }
    }

    return ok(await getProjectById(projectId));
  } catch (error) {
    return handleError(error);
  }
}

export async function DELETE(_request: Request, context: Context) {
  const guard = await requireAdmin();
  if (guard) {
    return guard;
  }

  const { id } = await context.params;
  await execute("DELETE FROM projects WHERE id = ?", [Number(id)]);
  return ok(true);
}
