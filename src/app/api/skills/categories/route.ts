import { execute, query } from "@/lib/db";
import { handleError, ok, requireAdmin } from "@/lib/http";
import { slugify } from "@/lib/utils";
import type { SkillCategory } from "@/types/portfolio";

export async function GET() {
  return ok(
    await query<SkillCategory>(
      "SELECT * FROM skill_categories ORDER BY sort_order ASC, name ASC",
    ),
  );
}

export async function POST(request: Request) {
  const guard = await requireAdmin();
  if (guard) {
    return guard;
  }

  try {
    const body = (await request.json()) as Record<string, unknown>;
    const name = String(body.name ?? "").trim();
    const slug = String(body.slug ?? "").trim() || slugify(name);

    if (!name || !slug) {
      throw new Error("Nama kategori wajib diisi.");
    }

    await execute(
      "INSERT INTO skill_categories (name, slug, sort_order) VALUES (?, ?, ?)",
      [name, slug, Number(body.sort_order ?? 0)],
    );

    return GET();
  } catch (error) {
    return handleError(error);
  }
}
