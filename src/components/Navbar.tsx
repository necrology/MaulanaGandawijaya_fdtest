"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { MessageCircle } from "lucide-react";
import { cn } from "@/lib/cn";
import type { Profile } from "@/types/portfolio";

const links = [
  { href: "/", label: "Home" },
  { href: "/about", label: "About" },
  { href: "/skills", label: "Skills" },
  { href: "/projects", label: "Projects" },
  { href: "/experience", label: "Experience" },
];

function isCurrentPath(pathname: string, href: string) {
  return href === "/" ? pathname === href : pathname.startsWith(href);
}

export function Navbar({ profile }: { profile: Profile }) {
  const pathname = usePathname();

  const navigationLinks = links.map((link) => (
    <Link
      key={link.href}
      href={link.href}
      aria-current={isCurrentPath(pathname, link.href) ? "page" : undefined}
      className={cn(
        "min-w-0 rounded-xl border px-0.5 py-2 text-center text-[10px] transition duration-300 sm:px-2 sm:text-xs md:shrink-0 md:px-3 md:text-sm",
        isCurrentPath(pathname, link.href)
          ? "border-white/90 bg-white text-blue-700 shadow-[0_8px_24px_rgba(2,6,23,0.16)] ring-2 ring-blue-400/20 md:font-semibold"
          : "border-transparent text-slate-300 hover:border-white/10 hover:bg-white/[0.05] hover:text-white",
      )}
    >
      {link.label}
    </Link>
  ));

  return (
    <header className="sticky top-0 z-40 border-b border-white/10 bg-[#020617]/80 shadow-[0_10px_40px_rgba(2,6,23,0.35)] backdrop-blur-2xl">
      <nav
        aria-label="Navigasi utama"
        className="mx-auto max-w-7xl px-3 py-3 sm:px-4 md:px-8"
      >
        <div className="flex items-center gap-2 sm:gap-3">
          <Link href="/" className="group flex min-w-0 items-center gap-2.5 text-white sm:gap-3">
            <span className="relative h-10 w-10 shrink-0 overflow-hidden rounded-full border-2 border-blue-300/50 bg-blue-950 shadow-[0_8px_28px_rgba(37,99,235,0.38)] transition duration-300 group-hover:scale-105 group-hover:border-sky-300 sm:h-11 sm:w-11">
              <Image
                src={profile.profile_image_path ?? "/uploads/profile-placeholder.svg"}
                alt=""
                fill
                sizes="44px"
                className="object-cover transition duration-500 group-hover:scale-110"
                priority
              />
              <span className="pointer-events-none absolute inset-0 rounded-full ring-1 ring-inset ring-white/25" />
            </span>
            <span className="min-w-0">
              <span className="block truncate text-xs font-semibold text-white sm:text-sm">
                {profile.full_name}
              </span>
              <span className="block truncate text-[10px] text-slate-400 sm:text-xs">
                Professional Portfolio
              </span>
            </span>
          </Link>

          <div className="ml-auto hidden items-center gap-2 md:flex">
            {navigationLinks}
            <Link
              href="/contact"
              aria-label="Hubungi Maulana Ganda Wijaya"
              title="Contact"
              className={cn(
                "ml-1 flex h-11 w-11 shrink-0 items-center justify-center rounded-xl border transition duration-300 hover:-translate-y-0.5",
                pathname.startsWith("/contact")
                  ? "border-white/90 bg-white text-blue-700 shadow-[0_10px_28px_rgba(2,6,23,0.2)] ring-2 ring-blue-400/25"
                  : "border-white/10 bg-white/[0.04] text-blue-100 hover:border-blue-300/40 hover:bg-blue-500/15",
              )}
            >
              <MessageCircle className="h-5 w-5" aria-hidden="true" />
            </Link>
          </div>

          <Link
            href="/contact"
            aria-label="Hubungi Maulana Ganda Wijaya"
            title="Contact"
            className={cn(
              "ml-auto flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border transition duration-300 sm:h-11 sm:w-11 md:hidden",
              pathname.startsWith("/contact")
                ? "border-white/90 bg-white text-blue-700 shadow-[0_10px_28px_rgba(2,6,23,0.2)] ring-2 ring-blue-400/25"
                : "border-white/10 bg-white/[0.04] text-blue-100 hover:border-blue-300/40 hover:bg-blue-500/15",
            )}
          >
            <MessageCircle className="h-5 w-5" aria-hidden="true" />
          </Link>
        </div>

        <div className="mt-2 grid grid-cols-5 gap-1 rounded-2xl border border-white/10 bg-white/[0.03] p-1 md:hidden">
          {navigationLinks}
        </div>
      </nav>
    </header>
  );
}
