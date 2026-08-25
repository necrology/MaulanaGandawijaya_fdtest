import { execute } from "@/lib/db";
import { handleError, ok, requireAdmin } from "@/lib/http";

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

    if (!name || !body.category_id) {
      throw new Error("Nama skill dan kategori wajib diisi.");
    }

    await execute(
      `UPDATE skills
       SET category_id = ?, name = ?, icon = ?, level = ?, sort_order = ?
       WHERE id = ?`,
      [
        Number(body.category_id),
        name,
        String(body.icon ?? "").trim() || null,
        Number(body.level ?? 50),
        Number(body.sort_order ?? 0),
        Number(id),
      ],
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
  await execute("DELETE FROM skills WHERE id = ?", [Number(id)]);
  return ok(true);
}
