"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import {
  BarChart3,
  BriefcaseBusiness,
  FolderKanban,
  Image,
  LogOut,
  MessageSquare,
  Share2,
  Sparkles,
  UserRound,
} from "lucide-react";
import { cn } from "@/lib/cn";

const links = [
  { href: "/admin/dashboard", label: "Dashboard", icon: BarChart3 },
  { href: "/admin/profile", label: "Profile", icon: UserRound },
  { href: "/admin/projects", label: "Projects", icon: FolderKanban },
  { href: "/admin/skills", label: "Skills", icon: Sparkles },
  { href: "/admin/experience", label: "Experience", icon: BriefcaseBusiness },
  { href: "/admin/social-links", label: "Social Links", icon: Share2 },
  { href: "/admin/messages", label: "Messages", icon: MessageSquare },
  { href: "/admin/assets", label: "Assets", icon: Image },
];

export function AdminSidebar() {
  const pathname = usePathname();
  const router = useRouter();

  async function logout() {
    await fetch("/api/auth/logout", { method: "POST" });
    router.push("/admin/login");
    router.refresh();
  }

  return (
    <aside className="border-b border-white/10 bg-[linear-gradient(180deg,rgba(7,17,31,0.98),rgba(4,16,38,0.96))] p-4 backdrop-blur-xl md:sticky md:top-0 md:h-screen md:w-72 md:border-b-0 md:border-r">
      <div className="mb-6">
        <p className="text-xs font-semibold uppercase tracking-[0.24em] text-blue-300">
          Admin CMS
        </p>
        <h1 className="mt-2 text-xl font-semibold text-white">Portfolio Panel</h1>
      </div>

      <nav className="grid gap-2">
        {links.map((link) => {
          const Icon = link.icon;
          const active = pathname === link.href;

          return (
            <Link
              key={link.href}
              href={link.href}
              className={cn(
                "flex items-center gap-3 rounded-xl border px-3 py-2.5 text-sm transition duration-300",
                active
                  ? "border-blue-300/30 bg-gradient-to-r from-blue-600/25 to-sky-400/10 text-blue-100"
                  : "border-transparent text-slate-400 hover:border-white/10 hover:bg-white/[0.05] hover:text-white",
              )}
            >
              <Icon className="h-4 w-4" aria-hidden="true" />
              {link.label}
            </Link>
          );
        })}
      </nav>

      <button
        type="button"
        onClick={logout}
        className="mt-6 flex w-full items-center gap-3 rounded-xl border border-white/10 px-3 py-2.5 text-sm text-slate-400 transition hover:border-red-400/30 hover:bg-red-500/10 hover:text-red-200"
      >
        <LogOut className="h-4 w-4" aria-hidden="true" />
        Logout
      </button>
    </aside>
  );
}
