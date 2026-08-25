import { execute } from "@/lib/db";
import { ok, requireAdmin, handleError } from "@/lib/http";
import { slugify } from "@/lib/utils";

type Context = {
  params: Promise<{ id: string }>;
};

export async function PUT(request: Request, context: Context) {
  const guard = await requireAdmin();
  if (guard) {
    return guard;
  }

  try {
    const { id } = await context.params;
    const body = (await request.json()) as Record<string, unknown>;
    const name = String(body.name ?? "").trim();
    const slug = String(body.slug ?? "").trim() || slugify(name);

    if (!name || !slug) {
      throw new Error("Nama kategori wajib diisi.");
    }

    await execute(
      "UPDATE skill_categories SET name = ?, slug = ?, sort_order = ? WHERE id = ?",
      [name, slug, Number(body.sort_order ?? 0), Number(id)],
    );

    return ok(true);
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
  await execute("DELETE FROM skill_categories WHERE id = ?", [Number(id)]);
  return ok(true);
}
