"use client";

import { useState } from "react";
import { Edit, Plus, Save, Trash2, X } from "lucide-react";
import {
  adminGridClass,
  inputClass,
  labelClass,
  textareaClass,
} from "@/components/admin/formStyles";
import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import type { Experience } from "@/types/portfolio";

type ApiResponse<T> = {
  data?: T;
  error?: string;
};

const emptyExperience: Partial<Experience> = {
  company: "",
  position: "",
  start_date: "",
  end_date: "",
  is_current: false,
  description: "",
  tech_stack: [],
  sort_order: 0,
};

export function ExperiencesManager({
  initialExperiences,
}: {
  initialExperiences: Experience[];
}) {
  const [experiences, setExperiences] = useState(initialExperiences);
  const [selected, setSelected] = useState<Partial<Experience>>(emptyExperience);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  async function refresh() {
    const response = await fetch("/api/experiences");
    const result = (await response.json()) as ApiResponse<Experience[]>;
    if (result.data) {
      setExperiences(result.data);
    }
  }

  async function submit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setMessage("");
    setError("");
    const formData = new FormData(event.currentTarget);
    const payload = {
      company: formData.get("company"),
      position: formData.get("position"),
      start_date: formData.get("start_date"),
      end_date: formData.get("end_date"),
      is_current: formData.get("is_current") === "on",
      description: formData.get("description"),
      tech_stack: String(formData.get("tech_stack") ?? "")
        .split(",")
        .map((item) => item.trim())
        .filter(Boolean),
      sort_order: Number(formData.get("sort_order") ?? 0),
    };
    const isEdit = Boolean(selected.id);
    const response = await fetch(
      isEdit ? `/api/experiences/${selected.id}` : "/api/experiences",
      {
        method: isEdit ? "PUT" : "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      },
    );
    const result = (await response.json()) as ApiResponse<unknown>;

    if (!response.ok) {
      setError(result.error ?? "Experience gagal disimpan.");
      return;
    }

    setMessage("Experience berhasil disimpan.");
    setSelected(emptyExperience);
    await refresh();
  }

  async function remove(id: number) {
    if (!confirm("Hapus experience ini?")) {
      return;
    }
    await fetch(`/api/experiences/${id}`, { method: "DELETE" });
    await refresh();
  }

  return (
    <div className={adminGridClass}>
      <Card>
        <div className="mb-4 flex items-center justify-between gap-3">
          <h3 className="text-xl font-semibold text-[#f8fafc]">Daftar Experience</h3>
          <Button variant="ghost" onClick={() => setSelected(emptyExperience)}>
            <Plus className="h-4 w-4" />
            Baru
          </Button>
        </div>
        <div className="space-y-3">
          {experiences.map((experience) => (
            <div key={experience.id} className="rounded-sm border border-[#1e3a5f] bg-[#020617] p-4">
              <p className="font-semibold text-[#f8fafc]">{experience.position}</p>
              <p className="text-sm text-[#60a5fa]">{experience.company}</p>
              <p className="mt-1 text-sm text-[#94a3b8]">
                {experience.start_date} - {experience.is_current ? "Present" : experience.end_date}
              </p>
              <div className="mt-3 flex flex-wrap gap-2">
                <Button variant="ghost" onClick={() => setSelected(experience)}>
                  <Edit className="h-4 w-4" />
                  Edit
                </Button>
                <Button variant="danger" onClick={() => remove(experience.id)}>
                  <Trash2 className="h-4 w-4" />
                  Hapus
                </Button>
              </div>
            </div>
          ))}
        </div>
      </Card>

      <Card>
        <form key={selected.id ?? "new"} onSubmit={submit} className="grid gap-4">
          <div className="flex items-center justify-between gap-4">
            <h3 className="text-xl font-semibold text-[#f8fafc]">
              {selected.id ? "Edit Experience" : "Tambah Experience"}
            </h3>
            {selected.id ? (
              <Button variant="ghost" onClick={() => setSelected(emptyExperience)}>
                <X className="h-4 w-4" />
              </Button>
            ) : null}
          </div>
          <div className="grid gap-4 md:grid-cols-2">
            <label className={labelClass}>
              Company
              <input name="company" required defaultValue={selected.company ?? ""} className={inputClass} />
            </label>
            <label className={labelClass}>
              Position
              <input name="position" required defaultValue={selected.position ?? ""} className={inputClass} />
            </label>
            <label className={labelClass}>
              Start Date
              <input name="start_date" type="date" required defaultValue={selected.start_date ?? ""} className={inputClass} />
            </label>
            <label className={labelClass}>
              End Date
              <input name="end_date" type="date" defaultValue={selected.end_date ?? ""} className={inputClass} />
            </label>
          </div>
          <label className="flex items-center gap-3 text-sm font-medium text-[#f8fafc]">
            <input name="is_current" type="checkbox" defaultChecked={Boolean(selected.is_current)} />
            Masih bekerja di sini
          </label>
          <label className={labelClass}>
            Description
            <textarea name="description" required rows={6} defaultValue={selected.description ?? ""} className={textareaClass} />
          </label>
          <label className={labelClass}>
            Tech Stack
            <input name="tech_stack" defaultValue={selected.tech_stack?.join(", ") ?? ""} className={inputClass} />
          </label>
          <label className={labelClass}>
            Urutan
            <input name="sort_order" type="number" defaultValue={selected.sort_order ?? 0} className={inputClass} />
          </label>
          {message ? <p className="rounded-xl border border-blue-300/25 bg-blue-500/10 px-4 py-3 text-sm text-blue-100">{message}</p> : null}
          {error ? <p className="rounded-xl border border-red-400/25 bg-red-500/10 px-4 py-3 text-sm text-red-200">{error}</p> : null}
          <Button type="submit" className="w-full md:w-fit">
            <Save className="h-4 w-4" />
            Simpan Experience
          </Button>
        </form>
      </Card>
    </div>
  );
}
