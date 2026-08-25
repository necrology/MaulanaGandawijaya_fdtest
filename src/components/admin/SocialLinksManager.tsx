"use client";

import { useState } from "react";
import { Edit, Plus, Save, Trash2, X } from "lucide-react";
import { adminGridClass, inputClass, labelClass } from "@/components/admin/formStyles";
import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import type { SocialLink } from "@/types/portfolio";

type ApiResponse<T> = {
  data?: T;
  error?: string;
};

const emptySocial: Partial<SocialLink> = {
  platform: "",
  url: "",
  icon: "",
  sort_order: 0,
  is_active: true,
};

export function SocialLinksManager({
  initialSocials,
}: {
  initialSocials: SocialLink[];
}) {
  const [socials, setSocials] = useState(initialSocials);
  const [selected, setSelected] = useState<Partial<SocialLink>>(emptySocial);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  async function refresh() {
    const response = await fetch("/api/social-links");
    const result = (await response.json()) as ApiResponse<SocialLink[]>;
    if (result.data) {
      setSocials(result.data);
    }
  }

  async function submit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setMessage("");
    setError("");
    const formData = new FormData(event.currentTarget);
    const payload = {
      platform: formData.get("platform"),
      url: formData.get("url"),
      icon: formData.get("icon"),
      sort_order: Number(formData.get("sort_order") ?? 0),
      is_active: formData.get("is_active") === "on",
    };
    const isEdit = Boolean(selected.id);
    const response = await fetch(
      isEdit ? `/api/social-links/${selected.id}` : "/api/social-links",
      {
        method: isEdit ? "PUT" : "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      },
    );
    const result = (await response.json()) as ApiResponse<unknown>;

    if (!response.ok) {
      setError(result.error ?? "Social link gagal disimpan.");
      return;
    }

    setMessage("Social link berhasil disimpan.");
    setSelected(emptySocial);
    await refresh();
  }

  async function remove(id: number) {
    if (!confirm("Hapus social link ini?")) {
      return;
    }
    await fetch(`/api/social-links/${id}`, { method: "DELETE" });
    await refresh();
  }

  return (
    <div className={adminGridClass}>
      <Card>
        <div className="mb-4 flex items-center justify-between gap-3">
          <h3 className="text-xl font-semibold text-[#f8fafc]">Daftar Social Link</h3>
          <Button variant="ghost" onClick={() => setSelected(emptySocial)}>
            <Plus className="h-4 w-4" />
            Baru
          </Button>
        </div>
        <div className="space-y-3">
          {socials.map((social) => (
            <div key={social.id} className="rounded-sm border border-[#1e3a5f] bg-[#020617] p-4">
              <p className="font-semibold text-[#f8fafc]">{social.platform}</p>
              <a href={social.url} className="break-all text-sm text-[#38bdf8]" target="_blank" rel="noreferrer">
                {social.url}
              </a>
              <p className="mt-1 text-sm text-[#94a3b8]">
                {social.is_active ? "Aktif" : "Nonaktif"} - icon: {social.icon ?? "-"}
              </p>
              <div className="mt-3 flex flex-wrap gap-2">
                <Button variant="ghost" onClick={() => setSelected(social)}>
                  <Edit className="h-4 w-4" />
                  Edit
                </Button>
                <Button variant="danger" onClick={() => remove(social.id)}>
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
              {selected.id ? "Edit Social Link" : "Tambah Social Link"}
            </h3>
            {selected.id ? (
              <Button variant="ghost" onClick={() => setSelected(emptySocial)}>
                <X className="h-4 w-4" />
              </Button>
            ) : null}
          </div>
          <label className={labelClass}>
            Platform
            <input name="platform" required defaultValue={selected.platform ?? ""} className={inputClass} />
          </label>
          <label className={labelClass}>
            URL
            <input name="url" required defaultValue={selected.url ?? ""} className={inputClass} />
          </label>
          <div className="grid gap-4 md:grid-cols-2">
            <label className={labelClass}>
              Icon Lucide
              <input name="icon" defaultValue={selected.icon ?? ""} className={inputClass} />
            </label>
            <label className={labelClass}>
              Urutan
              <input name="sort_order" type="number" defaultValue={selected.sort_order ?? 0} className={inputClass} />
            </label>
          </div>
          <label className="flex items-center gap-3 text-sm font-medium text-[#f8fafc]">
            <input name="is_active" type="checkbox" defaultChecked={selected.is_active ?? true} />
            Aktif
          </label>
          {message ? <p className="rounded-xl border border-blue-300/25 bg-blue-500/10 px-4 py-3 text-sm text-blue-100">{message}</p> : null}
          {error ? <p className="rounded-xl border border-red-400/25 bg-red-500/10 px-4 py-3 text-sm text-red-200">{error}</p> : null}
          <Button type="submit" className="w-full md:w-fit">
            <Save className="h-4 w-4" />
            Simpan Social Link
          </Button>
        </form>
      </Card>
    </div>
  );
}
