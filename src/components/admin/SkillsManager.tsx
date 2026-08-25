"use client";

import { useMemo, useState } from "react";
import { Edit, Plus, Save, Trash2, X } from "lucide-react";
import {
  adminGridClass,
  inputClass,
  labelClass,
} from "@/components/admin/formStyles";
import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import type {
  Skill,
  SkillCategory,
  SkillCategoryWithSkills,
} from "@/types/portfolio";

type ApiResponse<T> = {
  data?: T;
  error?: string;
};

const emptyCategory: Partial<SkillCategory> = {
  name: "",
  slug: "",
  sort_order: 0,
};

const emptySkill: Partial<Skill> = {
  name: "",
  icon: "",
  level: 70,
  sort_order: 0,
};

export function SkillsManager({
  initialCategories,
}: {
  initialCategories: SkillCategoryWithSkills[];
}) {
  const [categories, setCategories] = useState(initialCategories);
  const [selectedCategory, setSelectedCategory] =
    useState<Partial<SkillCategory>>(emptyCategory);
  const [selectedSkill, setSelectedSkill] = useState<Partial<Skill>>(emptySkill);
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");

  const allSkills = useMemo(
    () => categories.flatMap((category) => category.skills),
    [categories],
  );

  async function refresh() {
    const [categoryResponse, skillResponse] = await Promise.all([
      fetch("/api/skills/categories"),
      fetch("/api/skills"),
    ]);
    const categoryResult =
      (await categoryResponse.json()) as ApiResponse<SkillCategory[]>;
    const skillResult = (await skillResponse.json()) as ApiResponse<Skill[]>;
    const nextCategories =
      categoryResult.data?.map((category) => ({
        ...category,
        skills:
          skillResult.data?.filter((skill) => skill.category_id === category.id) ?? [],
      })) ?? [];
    setCategories(nextCategories);
  }

  async function submitCategory(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError("");
    setMessage("");
    const formData = new FormData(event.currentTarget);
    const payload = {
      name: formData.get("name"),
      slug: formData.get("slug"),
      sort_order: Number(formData.get("sort_order") ?? 0),
    };
    const isEdit = Boolean(selectedCategory.id);
    const response = await fetch(
      isEdit ? `/api/skills/categories/${selectedCategory.id}` : "/api/skills/categories",
      {
        method: isEdit ? "PUT" : "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      },
    );
    const result = (await response.json()) as ApiResponse<unknown>;

    if (!response.ok) {
      setError(result.error ?? "Kategori gagal disimpan.");
      return;
    }

    setMessage("Kategori skill berhasil disimpan.");
    setSelectedCategory(emptyCategory);
    await refresh();
  }

  async function submitSkill(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError("");
    setMessage("");
    const formData = new FormData(event.currentTarget);
    const payload = {
      category_id: Number(formData.get("category_id") ?? 0),
      name: formData.get("name"),
      icon: formData.get("icon"),
      level: Number(formData.get("level") ?? 50),
      sort_order: Number(formData.get("sort_order") ?? 0),
    };
    const isEdit = Boolean(selectedSkill.id);
    const response = await fetch(isEdit ? `/api/skills/${selectedSkill.id}` : "/api/skills", {
      method: isEdit ? "PUT" : "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });
    const result = (await response.json()) as ApiResponse<unknown>;

    if (!response.ok) {
      setError(result.error ?? "Skill gagal disimpan.");
      return;
    }

    setMessage("Skill berhasil disimpan.");
    setSelectedSkill(emptySkill);
    await refresh();
  }

  async function removeCategory(id: number) {
    if (!confirm("Hapus kategori dan semua skill di dalamnya?")) {
      return;
    }
    await fetch(`/api/skills/categories/${id}`, { method: "DELETE" });
    await refresh();
  }

  async function removeSkill(id: number) {
    if (!confirm("Hapus skill ini?")) {
      return;
    }
    await fetch(`/api/skills/${id}`, { method: "DELETE" });
    await refresh();
  }

  return (
    <div className={adminGridClass}>
      <div className="space-y-6">
        <Card>
          <div className="mb-4 flex items-center justify-between gap-3">
            <h3 className="text-xl font-semibold text-[#f8fafc]">Kategori Skill</h3>
            <Button variant="ghost" onClick={() => setSelectedCategory(emptyCategory)}>
              <Plus className="h-4 w-4" />
              Baru
            </Button>
          </div>
          <div className="space-y-3">
            {categories.map((category) => (
              <div
                key={category.id}
                className="rounded-sm border border-[#1e3a5f] bg-[#020617] p-4"
              >
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <p className="font-semibold text-[#f8fafc]">{category.name}</p>
                    <p className="text-sm text-[#60a5fa]">{category.slug}</p>
                    <p className="mt-1 text-sm text-[#94a3b8]">
                      {category.skills.length} skill
                    </p>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    <Button variant="ghost" onClick={() => setSelectedCategory(category)}>
                      <Edit className="h-4 w-4" />
                    </Button>
                    <Button variant="danger" onClick={() => removeCategory(category.id)}>
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </Card>

        <Card>
          <h3 className="text-xl font-semibold text-[#f8fafc]">Daftar Skill</h3>
          <div className="mt-4 space-y-3">
            {allSkills.map((skill) => (
              <div
                key={skill.id}
                className="flex items-center justify-between gap-4 rounded-sm border border-[#1e3a5f] bg-[#020617] p-4"
              >
                <div>
                  <p className="font-semibold text-[#f8fafc]">{skill.name}</p>
                  <p className="text-sm text-[#94a3b8]">
                    {skill.category_name} - {skill.level}%
                  </p>
                </div>
                <div className="flex gap-2">
                  <Button variant="ghost" onClick={() => setSelectedSkill(skill)}>
                    <Edit className="h-4 w-4" />
                  </Button>
                  <Button variant="danger" onClick={() => removeSkill(skill.id)}>
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </Card>
      </div>

      <div className="space-y-6">
        <Card>
          <form
            key={selectedCategory.id ?? "category-new"}
            onSubmit={submitCategory}
            className="grid gap-4"
          >
            <div className="flex items-center justify-between gap-4">
              <h3 className="text-xl font-semibold text-[#f8fafc]">
                {selectedCategory.id ? "Edit Kategori" : "Tambah Kategori"}
              </h3>
              {selectedCategory.id ? (
                <Button variant="ghost" onClick={() => setSelectedCategory(emptyCategory)}>
                  <X className="h-4 w-4" />
                </Button>
              ) : null}
            </div>
            <div className="grid gap-4 md:grid-cols-3">
              <label className={labelClass}>
                Nama
                <input
                  name="name"
                  required
                  defaultValue={selectedCategory.name ?? ""}
                  className={inputClass}
                />
              </label>
              <label className={labelClass}>
                Slug
                <input name="slug" defaultValue={selectedCategory.slug ?? ""} className={inputClass} />
              </label>
              <label className={labelClass}>
                Urutan
                <input
                  name="sort_order"
                  type="number"
                  defaultValue={selectedCategory.sort_order ?? 0}
                  className={inputClass}
                />
              </label>
            </div>
            <Button type="submit" className="w-full md:w-fit">
              <Save className="h-4 w-4" />
              Simpan Kategori
            </Button>
          </form>
        </Card>

        <Card>
          <form
            key={selectedSkill.id ?? "skill-new"}
            onSubmit={submitSkill}
            className="grid gap-4"
          >
            <div className="flex items-center justify-between gap-4">
              <h3 className="text-xl font-semibold text-[#f8fafc]">
                {selectedSkill.id ? "Edit Skill" : "Tambah Skill"}
              </h3>
              {selectedSkill.id ? (
                <Button variant="ghost" onClick={() => setSelectedSkill(emptySkill)}>
                  <X className="h-4 w-4" />
                </Button>
              ) : null}
            </div>
            <div className="grid gap-4 md:grid-cols-2">
              <label className={labelClass}>
                Kategori
                <select
                  name="category_id"
                  required
                  defaultValue={selectedSkill.category_id ?? categories[0]?.id ?? ""}
                  className={inputClass}
                >
                  {categories.map((category) => (
                    <option key={category.id} value={category.id}>
                      {category.name}
                    </option>
                  ))}
                </select>
              </label>
              <label className={labelClass}>
                Nama Skill
                <input
                  name="name"
                  required
                  defaultValue={selectedSkill.name ?? ""}
                  className={inputClass}
                />
              </label>
              <label className={labelClass}>
                Icon Lucide
                <input
                  name="icon"
                  placeholder="Code2, Database, Server"
                  defaultValue={selectedSkill.icon ?? ""}
                  className={inputClass}
                />
              </label>
              <label className={labelClass}>
                Level
                <input
                  name="level"
                  type="number"
                  min="0"
                  max="100"
                  defaultValue={selectedSkill.level ?? 70}
                  className={inputClass}
                />
              </label>
              <label className={labelClass}>
                Urutan
                <input
                  name="sort_order"
                  type="number"
                  defaultValue={selectedSkill.sort_order ?? 0}
                  className={inputClass}
                />
              </label>
            </div>
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
            <Button type="submit" className="w-full md:w-fit">
              <Save className="h-4 w-4" />
              Simpan Skill
            </Button>
          </form>
        </Card>
      </div>
    </div>
  );
}
