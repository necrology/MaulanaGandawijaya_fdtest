import { Suspense } from "react";
import { LoginForm } from "@/components/admin/LoginForm";

export default function AdminLoginPage() {
  return (
    <main className="tech-grid flex min-h-screen items-center justify-center px-4 py-12 text-white">
      <div className="w-full max-w-md rounded-2xl border border-blue-300/20 bg-[linear-gradient(145deg,rgba(15,23,42,0.96),rgba(8,28,61,0.9))] p-7 shadow-[0_30px_100px_rgba(2,6,23,0.6)] backdrop-blur-xl">
        <p className="text-sm font-semibold uppercase tracking-[0.24em] text-blue-300">
          Admin Login
        </p>
        <h1 className="gradient-text mt-3 text-3xl font-semibold">Portfolio CMS</h1>
        <p className="mt-2 text-sm leading-6 text-slate-300">
          Masuk untuk mengelola profile, project, skill, pengalaman, asset, dan pesan masuk.
        </p>
        <Suspense>
          <LoginForm />
        </Suspense>
      </div>
    </main>
  );
}
