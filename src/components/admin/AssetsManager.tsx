"use client";

import Image from "next/image";
import { useState } from "react";
import { Upload, Trash2 } from "lucide-react";
import { UploadInput } from "@/components/admin/UploadInput";
import { inputClass, labelClass } from "@/components/admin/formStyles";
import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import type { Asset, AssetCategory } from "@/types/portfolio";

type ApiResponse<T> = {
  data?: T;
  error?: string;
};

const categories: AssetCategory[] = ["general", "profile", "cv", "project", "skill"];

export function AssetsManager({ initialAssets }: { initialAssets: Asset[] }) {
  const [assets, setAssets] = useState(initialAssets);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  async function refresh() {
    const response = await fetch("/api/assets");
    const result = (await response.json()) as ApiResponse<Asset[]>;
    if (result.data) {
      setAssets(result.data);
    }
  }

  async function submit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setMessage("");
    setError("");
    const response = await fetch("/api/assets/upload", {
      method: "POST",
      body: new FormData(event.currentTarget),
    });
    const result = (await response.json()) as ApiResponse<Asset>;

    if (!response.ok) {
      setError(result.error ?? "Upload asset gagal.");
      return;
    }

    event.currentTarget.reset();
    setMessage("Asset berhasil diupload.");
    await refresh();
  }

  async function remove(id: number) {
    if (!confirm("Hapus asset ini? Relasi profile/project yang memakai asset ini akan dikosongkan.")) {
      return;
    }
    await fetch(`/api/assets/${id}`, { method: "DELETE" });
    await refresh();
  }

  return (
    <div className="mt-8 grid gap-6 xl:grid-cols-[0.7fr_1.3fr]">
      <Card>
        <form onSubmit={submit} className="grid gap-4">
          <h3 className="text-xl font-semibold text-[#f8fafc]">Upload Asset Manual</h3>
          <UploadInput label="File" name="file" />
          <label className={labelClass}>
            Kategori
            <select name="category" defaultValue="general" className={inputClass}>
              {categories.map((category) => (
                <option key={category} value={category}>
                  {category}
                </option>
              ))}
            </select>
          </label>
          {message ? <p className="rounded-lg border border-emerald-300/30 bg-emerald-500/10 px-4 py-3 text-sm text-emerald-100">{message}</p> : null}
          {error ? <p className="rounded-lg border border-rose-300/30 bg-rose-500/10 px-4 py-3 text-sm text-rose-100">{error}</p> : null}
          <Button type="submit" className="w-full">
            <Upload className="h-4 w-4" />
            Upload
          </Button>
        </form>
      </Card>

      <div className="grid gap-4 md:grid-cols-2">
        {assets.map((asset) => (
          <Card key={asset.id}>
            {asset.mime_type.startsWith("image/") ? (
              <div className="relative mb-4 aspect-[16/10] overflow-hidden rounded-sm border border-[#1e3a5f]">
                <Image src={asset.path} alt={asset.original_name} fill className="object-cover" sizes="360px" />
              </div>
            ) : null}
            <p className="font-semibold text-[#f8fafc]">{asset.original_name}</p>
            <a href={asset.path} target="_blank" className="mt-1 block break-all text-sm text-[#38bdf8]" rel="noreferrer">
              {asset.path}
            </a>
            <div className="mt-3 grid gap-1 text-xs text-[#94a3b8]">
              <span>Mime: {asset.mime_type}</span>
              <span>Size: {(asset.size / 1024).toFixed(1)} KB</span>
              <span>Category: {asset.category}</span>
              <span>
                Relation: {asset.related_type ?? "-"} #{asset.related_id ?? "-"}
              </span>
            </div>
            <Button variant="danger" className="mt-4" onClick={() => remove(asset.id)}>
              <Trash2 className="h-4 w-4" />
              Hapus Asset
            </Button>
          </Card>
        ))}
      </div>
    </div>
  );
}
