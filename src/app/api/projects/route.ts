import { execute } from "@/lib/db";
import { handleError, ok, requireAdmin } from "@/lib/http";
import { getProjectById, getProjects } from "@/lib/repositories";
import { saveUploadedFile } from "@/lib/upload";
import {
  formBoolean,
  formNullableString,
  formNumber,
  formString,
  parseStringArray,
  slugify,
} from "@/lib/utils";

export async function GET() {
  return ok(await getProjects());
}

export async function POST(request: Request) {
  const guard = await requireAdmin();
  if (guard) {
    return guard;
  }

  try {
    const formData = await request.formData();
    const title = formString(formData, "title");
    const slug = formString(formData, "slug") || slugify(title);
    const shortDescription = formString(formData, "short_description");
    const detailDescription = formString(formData, "detail_description");
    const techStack = JSON.stringify(parseStringArray(formString(formData, "tech_stack")));

    if (!title || !slug || !shortDescription || !detailDescription) {
      throw new Error("Judul, slug, deskripsi singkat, dan detail wajib diisi.");
    }

    const result = await execute(
      `INSERT INTO projects
        (title, slug, short_description, detail_description, tech_stack, demo_link,
         github_link, featured, sort_order)
       VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)`,
      [
        title,
        slug,
        shortDescription,
        detailDescription,
        techStack,
        formNullableString(formData, "demo_link"),
        formNullableString(formData, "github_link"),
        formBoolean(formData, "featured"),
        formNumber(formData, "sort_order"),
      ],
    );

    const projectId = result.insertId;
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
          "INSERT INTO project_images (project_id, asset_id, sort_order) VALUES (?, ?, ?)",
          [projectId, asset.id, index + 1],
        );
      }
    }

    return ok(await getProjectById(projectId), 201);
  } catch (error) {
    return handleError(error);
  }
}
