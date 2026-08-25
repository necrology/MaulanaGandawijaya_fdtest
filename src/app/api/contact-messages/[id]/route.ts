import { execute } from "@/lib/db";
import { handleError, ok, requireAdmin } from "@/lib/http";

type Context = {
  params: Promise<{ id: string }>;
};

export async function PATCH(request: Request, context: Context) {
  const guard = await requireAdmin();
  if (guard) {
    return guard;
  }

  try {
    const { id } = await context.params;
    const body = (await request.json()) as Record<string, unknown>;
    await execute("UPDATE contact_messages SET is_read = ? WHERE id = ?", [
      Boolean(body.is_read),
      Number(id),
    ]);

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
  await execute("DELETE FROM contact_messages WHERE id = ?", [Number(id)]);
  return ok(true);
}
