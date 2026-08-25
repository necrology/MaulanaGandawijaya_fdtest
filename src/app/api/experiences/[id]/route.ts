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
    const company = String(body.company ?? "").trim();
    const position = String(body.position ?? "").trim();
    const startDate = String(body.start_date ?? "").trim();
    const description = String(body.description ?? "").trim();

    if (!company || !position || !startDate || !description) {
      throw new Error("Company, position, start date, dan deskripsi wajib diisi.");
    }

    await execute(
      `UPDATE experiences SET
        company = ?,
        position = ?,
        start_date = ?,
        end_date = ?,
        is_current = ?,
        description = ?,
        tech_stack = ?,
        sort_order = ?
       WHERE id = ?`,
      [
        company,
        position,
        startDate,
        String(body.end_date ?? "").trim() || null,
        Boolean(body.is_current),
        description,
        JSON.stringify(
          Array.isArray(body.tech_stack)
            ? body.tech_stack
            : String(body.tech_stack ?? "")
                .split(",")
                .map((item) => item.trim())
                .filter(Boolean),
        ),
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
  await execute("DELETE FROM experiences WHERE id = ?", [Number(id)]);
  return ok(true);
}
