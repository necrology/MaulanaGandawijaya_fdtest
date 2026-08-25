import { fail, ok } from "@/lib/http";
import { getAdminSession } from "@/lib/auth";

export async function GET() {
  const admin = await getAdminSession();

  if (!admin) {
    return fail("Unauthorized", 401);
  }

  return ok(admin);
}
