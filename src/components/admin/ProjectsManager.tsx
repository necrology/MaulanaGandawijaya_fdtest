"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { Edit, Plus, Save, Trash2, X } from "lucide-react";
import { UploadInput } from "@/components/admin/UploadInput";
import {
  adminGridClass,
  inputClass,
  labelClass,
  textareaClass,
} from "@/components/admin/formStyles";
import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import type { Project } from "@/types/portfolio";

type ApiResponse<T> = {
  data?: T;
  error?: string;
};

const emptyProject: Partial<Project> = {
  title: "",
  slug: "",
  short_description: "",
  detail_description: "",
  tech_stack: [],
  demo_link: "",
  github_link: "",
  featured: false,
  sort_order: 0,
};

export function ProjectsManager({
  initialProjects,
}: {
  initialProjects: Project[];
}) {
  const router = useRouter();
  const [projects, setProjects] = useState(initialProjects);
  const [selected, setSelected] = useState<Partial<Project>>(emptyProject);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function refreshProjects() {
    const response = await fetch("/api/projects");
    const result = (await response.json()) as ApiResponse<Project[]>;
    if (result.data) {
      setProjects(result.data);
    }
    router.refresh();
  }

  async function submit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setMessage("");
    setError("");
    setLoading(true);

    const formData = new FormData(event.currentTarget);
    if (!formData.get("featured")) {
      formData.set("featured", "false");
    }

    const isEdit = Boolean(selected.id);
    const response = await fetch(isEdit ? `/api/projects/${selected.id}` : "/api/projects", {
      method: isEdit ? "PUT" : "POST",
      body: formData,
    });
    const result = (await response.json()) as ApiResponse<Project>;
    setLoading(false);

    if (!response.ok) {
      setError(result.error ?? "Project gagal disimpan.");
      return;
    }

    setMessage(isEdit ? "Project berhasil diperbarui." : "Project berhasil dibuat.");
    setSelected(emptyProject);
    await refreshProjects();
  }

  async function removeProject(id: number) {
    if (!confirm("Hapus project ini?")) {
      return;
    }

    await fetch(`/api/projects/${id}`, { method: "DELETE" });
    if (selected.id === id) {
      setSelected(emptyProject);
    }
    await refreshProjects();
  }

  async function removeImage(imageId: number) {
    if (!confirm("Hapus foto project ini?")) {
      return;
    }

    await fetch(`/api/project-images/${imageId}`, { method: "DELETE" });
    await refreshProjects();
  }

  return (
    <div className={adminGridClass}>
      <Card>
        <div className="mb-4 flex items-center justify-between gap-3">
          <h3 className="text-xl font-semibold text-[#f8fafc]">Daftar Project</h3>
          <Button variant="ghost" onClick={() => setSelected(emptyProject)}>
            <Plus className="h-4 w-4" />
            Baru
          </Button>
        </div>
        <div className="space-y-3">
          {projects.map((project) => (
            <div
              key={project.id}
              className="rounded-sm border border-[#1e3a5f] bg-[#020617] p-4"
            >
              <div className="flex gap-4">
                <div className="relative h-20 w-28 shrink-0 overflow-hidden rounded-sm border border-[#1e3a5f]">
                  <Image
                    src={project.thumbnail_path ?? "/uploads/project-placeholder.svg"}
                    alt={project.title}
                    fill
                    className="object-cover"
                    sizes="112px"
                  />
                </div>
                <div className="min-w-0 flex-1">
                  <p className="truncate font-semibold text-[#f8fafc]">{project.title}</p>
                  <p className="mt-1 line-clamp-2 text-sm text-[#94a3b8]">
                    {project.short_description}
                  </p>
                  <div className="mt-3 flex flex-wrap gap-2">
                    <Button variant="ghost" onClick={() => setSelected(project)}>
                      <Edit className="h-4 w-4" />
                      Edit
                    </Button>
                    <Button variant="danger" onClick={() => removeProject(project.id)}>
                      <Trash2 className="h-4 w-4" />
                      Hapus
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </Card>

      <Card>
        <form key={selected.id ?? "new"} onSubmit={submit} className="grid gap-4">
          <div className="flex items-center justify-between gap-4">
            <h3 className="text-xl font-semibold text-[#f8fafc]">
              {selected.id ? "Edit Project" : "Tambah Project"}
            </h3>
            {selected.id ? (
              <Button variant="ghost" onClick={() => setSelected(emptyProject)}>
                <X className="h-4 w-4" />
                Batal
              </Button>
            ) : null}
          </div>

          <div className="grid gap-4 md:grid-cols-2">
            <label className={labelClass}>
              Judul
              <input
                name="title"
                required
                defaultValue={selected.title ?? ""}
                className={inputClass}
              />
            </label>
            <label className={labelClass}>
              Slug
              <input name="slug" defaultValue={selected.slug ?? ""} className={inputClass} />
            </label>
          </div>

          <label className={labelClass}>
            Deskripsi Singkat
            <textarea
              name="short_description"
              required
              rows={3}
              defaultValue={selected.short_description ?? ""}
              className={textareaClass}
            />
          </label>

          <label className={labelClass}>
            Detail Project
            <textarea
              name="detail_description"
              required
              rows={7}
              defaultValue={selected.detail_description ?? ""}
              className={textareaClass}
            />
          </label>

          <label className={labelClass}>
            Tech Stack
            <input
              name="tech_stack"
              placeholder="Next.js, TypeScript, MySQL"
              defaultValue={selected.tech_stack?.join(", ") ?? ""}
              className={inputClass}
            />
          </label>

          <div className="grid gap-4 md:grid-cols-2">
            <label className={labelClass}>
              Link Demo
              <input
                name="demo_link"
                defaultValue={selected.demo_link ?? ""}
                className={inputClass}
              />
            </label>
            <label className={labelClass}>
              Link GitHub
              <input
                name="github_link"
                defaultValue={selected.github_link ?? ""}
                className={inputClass}
              />
            </label>
          </div>

          <div className="grid gap-4 md:grid-cols-2">
            <label className={labelClass}>
              Urutan
              <input
                name="sort_order"
                type="number"
                defaultValue={selected.sort_order ?? 0}
                className={inputClass}
              />
            </label>
            <label className="mt-8 flex items-center gap-3 text-sm font-medium text-[#f8fafc]">
              <input
                name="featured"
                type="checkbox"
                defaultChecked={Boolean(selected.featured)}
                className="h-4 w-4 rounded-sm border-[#1e3a5f] bg-[#0f172a]"
              />
              Featured
            </label>
          </div>

          <div className="grid gap-4 md:grid-cols-2">
            <UploadInput label="Thumbnail Project" name="thumbnail" accept="image/*" />
            <UploadInput
              label="Foto Project"
              name="project_images"
              accept="image/*"
              multiple
              help="Bisa upload banyak foto sekaligus."
            />
          </div>

          {selected.images && selected.images.length > 0 ? (
            <div>
              <p className="mb-3 text-sm font-medium text-[#f8fafc]">Foto Project</p>
              <div className="grid gap-3 md:grid-cols-3">
                {selected.images.map((image) => (
                  <div key={image.id} className="relative overflow-hidden rounded-sm border border-[#1e3a5f]">
                    <div className="relative aspect-[16/10]">
                      <Image src={image.path} alt={image.original_name} fill className="object-cover" sizes="180px" />
                    </div>
                    <button
                      type="button"
                      onClick={() => removeImage(image.id)}
                      className="absolute right-2 top-2 rounded-lg bg-red-500 px-2 py-1 text-xs font-semibold text-white transition hover:bg-red-400"
                    >
                      Hapus
                    </button>
                  </div>
                ))}
              </div>
            </div>
          ) : null}

          {message ? (
            <p className="rounded-xl border border-blue-300/25 bg-blue-500/10 px-4 py-3 text-sm text-blue-100">
              {message}
            </p>
          ) : null}
          {error ? (
            <p className="rounded-xl border border-red-400/25 bg-red-500/10 px-4 py-3 text-sm text-red-200">
              {error}
            </p>
          ) : null}

          <Button type="submit" disabled={loading} className="w-full md:w-fit">
            <Save className="h-4 w-4" />
            {loading ? "Menyimpan..." : "Simpan Project"}
          </Button>
        </form>
      </Card>
    </div>
  );
}
