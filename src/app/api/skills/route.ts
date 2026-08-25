import { execute } from "@/lib/db";
import { handleError, ok, requireAdmin } from "@/lib/http";
import { getSkills } from "@/lib/repositories";

export async function GET() {
  return ok(await getSkills());
}

export async function POST(request: Request) {
  const guard = await requireAdmin();
  if (guard) {
    return guard;
  }

  try {
    const body = (await request.json()) as Record<string, unknown>;
    const name = String(body.name ?? "").trim();

    if (!name || !body.category_id) {
      throw new Error("Nama skill dan kategori wajib diisi.");
    }

    await execute(
      `INSERT INTO skills (category_id, name, icon, level, sort_order)
       VALUES (?, ?, ?, ?, ?)`,
      [
        Number(body.category_id),
        name,
        String(body.icon ?? "").trim() || null,
        Number(body.level ?? 50),
        Number(body.sort_order ?? 0),
      ],
    );

    return ok(await getSkills(), 201);
  } catch (error) {
    return handleError(error);
  }
}
