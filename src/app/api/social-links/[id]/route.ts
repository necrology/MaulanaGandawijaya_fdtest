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
    const platform = String(body.platform ?? "").trim();
    const url = String(body.url ?? "").trim();

    if (!platform || !url) {
      throw new Error("Platform dan URL wajib diisi.");
    }

    await execute(
      `UPDATE social_links
       SET platform = ?, url = ?, icon = ?, sort_order = ?, is_active = ?
       WHERE id = ?`,
      [
        platform,
        url,
        String(body.icon ?? "").trim() || null,
        Number(body.sort_order ?? 0),
        Boolean(body.is_active),
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
  await execute("DELETE FROM social_links WHERE id = ?", [Number(id)]);
  return ok(true);
}
