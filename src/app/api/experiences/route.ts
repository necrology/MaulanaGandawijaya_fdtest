import { execute } from "@/lib/db";
import { handleError, ok, requireAdmin } from "@/lib/http";
import { getExperiences } from "@/lib/repositories";
import { parseStringArray } from "@/lib/utils";

export async function GET() {
  return ok(await getExperiences());
}

export async function POST(request: Request) {
  const guard = await requireAdmin();
  if (guard) {
    return guard;
  }

  try {
    const body = (await request.json()) as Record<string, unknown>;
    const company = String(body.company ?? "").trim();
    const position = String(body.position ?? "").trim();
    const startDate = String(body.start_date ?? "").trim();
    const description = String(body.description ?? "").trim();

    if (!company || !position || !startDate || !description) {
      throw new Error("Company, position, start date, dan deskripsi wajib diisi.");
    }

    await execute(
      `INSERT INTO experiences
        (company, position, start_date, end_date, is_current, description, tech_stack, sort_order)
       VALUES (?, ?, ?, ?, ?, ?, ?, ?)`,
      [
        company,
        position,
        startDate,
        String(body.end_date ?? "").trim() || null,
        Boolean(body.is_current),
        description,
        JSON.stringify(parseStringArray(body.tech_stack)),
        Number(body.sort_order ?? 0),
      ],
    );

    return ok(await getExperiences(), 201);
  } catch (error) {
    return handleError(error);
  }
}
