"use client";

import { useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { LogIn } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { inputClass, labelClass } from "@/components/admin/formStyles";

export function LoginForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function submit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError("");
    setLoading(true);

    const formData = new FormData(event.currentTarget);
    const response = await fetch("/api/auth/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        email: formData.get("email"),
        password: formData.get("password"),
      }),
    });
    const result = (await response.json()) as { error?: string };
    setLoading(false);

    if (!response.ok) {
      setError(result.error ?? "Login gagal.");
      return;
    }

    router.push(searchParams.get("from") ?? "/admin/dashboard");
    router.refresh();
  }

  return (
    <form onSubmit={submit} className="mt-6 grid gap-4">
      <label className={labelClass}>
        Email
        <input
          name="email"
          type="email"
          required
          defaultValue="admin@portfolio.test"
          className={inputClass}
        />
      </label>
      <label className={labelClass}>
        Password
        <input
          name="password"
          type="password"
          required
          defaultValue="admin12345"
          className={inputClass}
        />
      </label>
      {error ? (
        <p className="rounded-xl border border-red-400/25 bg-red-500/10 px-4 py-3 text-sm text-red-200">
          {error}
        </p>
      ) : null}
      <Button type="submit" disabled={loading} className="w-full">
        <LogIn className="h-4 w-4" />
        {loading ? "Masuk..." : "Login"}
      </Button>
      <p className="text-xs leading-5 text-[#64748b]">
        Default: admin@portfolio.test / admin12345. Ganti password hash di database
        setelah setup lokal selesai.
      </p>
    </form>
  );
}
