import { fail, ok } from "@/lib/http";
import { getProjectBySlug } from "@/lib/repositories";

type Context = {
  params: Promise<{ slug: string }>;
};

export async function GET(_request: Request, context: Context) {
  const { slug } = await context.params;
  const project = await getProjectBySlug(slug);

  if (!project) {
    return fail("Project tidak ditemukan.", 404);
  }

  return ok(project);
}
