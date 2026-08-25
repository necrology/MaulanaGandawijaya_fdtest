import { execute } from "@/lib/db";
import { handleError, ok, requireAdmin } from "@/lib/http";
import { getSocialLinks } from "@/lib/repositories";

export async function GET() {
  return ok(await getSocialLinks());
}

export async function POST(request: Request) {
  const guard = await requireAdmin();
  if (guard) {
    return guard;
  }

  try {
    const body = (await request.json()) as Record<string, unknown>;
    const platform = String(body.platform ?? "").trim();
    const url = String(body.url ?? "").trim();

    if (!platform || !url) {
      throw new Error("Platform dan URL wajib diisi.");
    }

    await execute(
      `INSERT INTO social_links (platform, url, icon, sort_order, is_active)
       VALUES (?, ?, ?, ?, ?)`,
      [
        platform,
        url,
        String(body.icon ?? "").trim() || null,
        Number(body.sort_order ?? 0),
        Boolean(body.is_active ?? true),
      ],
    );

    return ok(await getSocialLinks(), 201);
  } catch (error) {
    return handleError(error);
  }
}
