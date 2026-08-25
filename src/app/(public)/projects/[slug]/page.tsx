import type { Metadata } from "next";
import Image from "next/image";
import { notFound, permanentRedirect } from "next/navigation";
import { ExternalLink, GitBranch } from "lucide-react";
import { ButtonLink } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { getProjectBySlug } from "@/lib/repositories";

export const dynamic = "force-dynamic";

type PageProps = {
  params: Promise<{ slug: string }>;
};

function redirectLegacyProjectSlug(slug: string) {
  if (slug === "rsud-otista-mobile-sipantest") {
    permanentRedirect("/projects/rsud-otista-mobile-sipantes");
  }
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  redirectLegacyProjectSlug(slug);
  const project = await getProjectBySlug(slug);

  if (!project) {
    return { title: "Project tidak ditemukan" };
  }

  const image = project.thumbnail_path ?? "/opengraph-image";

  return {
    title: project.title,
    description: project.short_description,
    alternates: { canonical: `/projects/${project.slug}` },
    openGraph: {
      title: project.title,
      description: project.short_description,
      url: `/projects/${project.slug}`,
      type: "article",
      images: [{ url: image, alt: project.title }],
    },
    twitter: {
      card: "summary_large_image",
      title: project.title,
      description: project.short_description,
      images: [image],
    },
  };
}

export default async function ProjectDetailPage({ params }: PageProps) {
  const { slug } = await params;
  redirectLegacyProjectSlug(slug);
  const project = await getProjectBySlug(slug);

  if (!project) {
    notFound();
  }

  const gallery =
    project.images && project.images.length > 0
      ? project.images
      : [
          {
            id: 0,
            project_id: project.id,
            asset_id: 0,
            caption: project.title,
            sort_order: 0,
            path: project.thumbnail_path ?? "/uploads/project-placeholder.svg",
            original_name: project.title,
          },
        ];

  return (
    <article className="relative mx-auto max-w-7xl px-4 py-10 md:px-8 md:py-14">
      <div className="grid gap-8 lg:grid-cols-[1.1fr_0.9fr]">
        <div className="flex flex-col justify-center">
          <p className="mb-3 text-xs font-semibold uppercase tracking-[0.24em] text-blue-300">
            Project Detail
          </p>
          <h1 className="gradient-text text-4xl font-semibold leading-tight tracking-[-0.03em] md:text-6xl">
            {project.title}
          </h1>
          <p className="mt-5 text-lg leading-8 text-slate-300">
            {project.short_description}
          </p>
          {project.demo_link || project.github_link ? (
            <div className="mt-7 flex flex-wrap gap-3">
              {project.demo_link ? (
                <ButtonLink href={project.demo_link}>
                  <ExternalLink className="h-4 w-4" />
                  Live Demo
                </ButtonLink>
              ) : null}
              {project.github_link ? (
                <ButtonLink href={project.github_link} variant="ghost">
                  <GitBranch className="h-4 w-4" />
                  Source Code
                </ButtonLink>
              ) : null}
            </div>
          ) : null}
        </div>
        <Card className="border-blue-300/25 p-3">
          <div className="relative aspect-[16/10] overflow-hidden rounded-2xl border border-white/10 bg-[#020617]">
            <Image
              src={project.thumbnail_path ?? "/uploads/project-placeholder.svg"}
              alt={project.title}
              fill
              className="object-contain"
              sizes="(min-width: 1024px) 520px, 100vw"
              priority
            />
          </div>
          <div className="mt-5 flex flex-wrap gap-2">
            {project.tech_stack.map((tech) => (
              <span
                key={tech}
                className="rounded-full border border-blue-300/15 bg-blue-500/[0.06] px-3 py-1 text-sm text-slate-300"
              >
                {tech}
              </span>
            ))}
          </div>
        </Card>
      </div>

      <section className="mt-10 grid gap-8 lg:grid-cols-[0.8fr_1.2fr]">
        <Card>
          <h2 className="text-2xl font-semibold text-white">Detail Project</h2>
          <p className="mt-4 whitespace-pre-line leading-8 text-slate-300">
            {project.detail_description}
          </p>
        </Card>
        <div className="grid gap-4 md:grid-cols-2">
          {gallery.map((image) => (
            <figure
              key={image.id}
              className="overflow-hidden rounded-2xl border border-blue-300/15 bg-[#0f172a] shadow-[0_18px_55px_rgba(2,6,23,0.35)]"
            >
              <div className="relative aspect-[16/10] bg-[#020617]">
                <Image
                  src={image.path}
                  alt={image.caption ?? project.title}
                  fill
                  className="object-contain transition duration-500 hover:scale-[1.01]"
                  sizes="(min-width: 1024px) 360px, 100vw"
                />
              </div>
              {image.caption ? (
                <figcaption className="border-t border-white/10 px-4 py-3 text-sm text-slate-400">
                  {image.caption}
                </figcaption>
              ) : null}
            </figure>
          ))}
        </div>
      </section>
    </article>
  );
}
