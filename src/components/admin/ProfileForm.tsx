"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { Save } from "lucide-react";
import { UploadInput } from "@/components/admin/UploadInput";
import {
  adminGridClass,
  inputClass,
  labelClass,
  textareaClass,
} from "@/components/admin/formStyles";
import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import type { Profile } from "@/types/portfolio";

type ApiResponse<T> = {
  data?: T;
  error?: string;
};

export function ProfileForm({ profile }: { profile: Profile }) {
  const router = useRouter();
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function submit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setMessage("");
    setError("");
    setLoading(true);

    const response = await fetch("/api/profile", {
      method: "PUT",
      body: new FormData(event.currentTarget),
    });
    const result = (await response.json()) as ApiResponse<Profile>;
    setLoading(false);

    if (!response.ok) {
      setError(result.error ?? "Profile gagal disimpan.");
      return;
    }

    setMessage("Profile berhasil disimpan.");
    router.refresh();
  }

  return (
    <div className={adminGridClass}>
      <Card>
          <div className="relative aspect-square overflow-hidden rounded-sm border border-[#1e3a5f]">
          <Image
            src={profile.profile_image_path ?? "/uploads/profile-placeholder.svg"}
            alt={profile.full_name}
            fill
            className="object-cover"
            sizes="420px"
          />
        </div>
        <div className="mt-4 rounded-sm border border-[#1e3a5f] bg-[#020617] p-4">
          <p className="text-sm text-[#94a3b8]">CV saat ini</p>
          <a
            href={profile.cv_path ?? "/uploads/cv-placeholder.pdf"}
            target="_blank"
            className="mt-1 block break-all text-sm text-[#38bdf8] hover:text-[#60a5fa]"
          >
            {profile.cv_path ?? "Belum ada CV"}
          </a>
        </div>
      </Card>

      <Card>
        <form onSubmit={submit} className="grid gap-4">
          <div className="grid gap-4 md:grid-cols-2">
            <label className={labelClass}>
              Nama Lengkap
              <input
                name="full_name"
                required
                defaultValue={profile.full_name}
                className={inputClass}
              />
            </label>
            <label className={labelClass}>
              Job Title
              <input
                name="job_title"
                required
                defaultValue={profile.job_title}
                className={inputClass}
              />
            </label>
          </div>

          <label className={labelClass}>
            Bio Singkat
            <textarea
              name="short_bio"
              required
              rows={3}
              defaultValue={profile.short_bio}
              className={textareaClass}
            />
          </label>

          <label className={labelClass}>
            About Detail
            <textarea
              name="about_detail"
              required
              rows={8}
              defaultValue={profile.about_detail}
              className={textareaClass}
            />
          </label>

          <div className="grid gap-4 md:grid-cols-3">
            <label className={labelClass}>
              Email
              <input
                name="email"
                type="email"
                required
                defaultValue={profile.email}
                className={inputClass}
              />
            </label>
            <label className={labelClass}>
              Phone
              <input name="phone" defaultValue={profile.phone ?? ""} className={inputClass} />
            </label>
            <label className={labelClass}>
              Location
              <input
                name="location"
                defaultValue={profile.location ?? ""}
                className={inputClass}
              />
            </label>
          </div>

          <div className="grid gap-4 md:grid-cols-2">
            <UploadInput label="Upload Foto Profile" name="profile_image" accept="image/*" />
            <UploadInput label="Upload CV PDF" name="cv_file" accept="application/pdf" />
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

          <Button type="submit" disabled={loading} className="w-full md:w-fit">
            <Save className="h-4 w-4" />
            {loading ? "Menyimpan..." : "Simpan Profile"}
          </Button>
        </form>
      </Card>
    </div>
  );
}
