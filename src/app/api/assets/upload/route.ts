import { fail, handleError, ok, requireAdmin } from "@/lib/http";
import { saveUploadedFile } from "@/lib/upload";
import type { AssetCategory } from "@/types/portfolio";

export async function POST(request: Request) {
  const guard = await requireAdmin();
  if (guard) {
    return guard;
  }

  try {
    const formData = await request.formData();
    const fileValue = formData.get("file");
    const file = fileValue instanceof File ? fileValue : null;
    const category = String(formData.get("category") ?? "general") as AssetCategory;

    if (!file) {
      return fail("File wajib dipilih.", 400);
    }

    const asset = await saveUploadedFile(file, category);
    return ok(asset, 201);
  } catch (error) {
    return handleError(error);
  }
}
