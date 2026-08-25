import Link from "next/link";
import type { AnchorHTMLAttributes, ButtonHTMLAttributes, ReactNode } from "react";
import { cn } from "@/lib/cn";

type Variant = "primary" | "secondary" | "ghost" | "danger";

const variants: Record<Variant, string> = {
  primary:
    "border-blue-300/40 bg-gradient-to-r from-blue-700 via-blue-600 to-sky-500 text-white shadow-[0_12px_32px_rgba(37,99,235,0.28)] hover:-translate-y-0.5 hover:from-blue-600 hover:via-blue-500 hover:to-sky-400 hover:shadow-[0_16px_38px_rgba(37,99,235,0.38)]",
  secondary:
    "border-blue-300/25 bg-blue-500/10 text-blue-100 hover:-translate-y-0.5 hover:border-blue-300/45 hover:bg-blue-500/20",
  ghost:
    "border-white/15 bg-white/[0.04] text-white hover:-translate-y-0.5 hover:border-blue-300/40 hover:bg-blue-500/10",
  danger:
    "border-red-400/30 bg-red-500/10 text-red-200 hover:border-red-300/50 hover:bg-red-500/20",
};

const base =
  "inline-flex min-h-11 items-center justify-center gap-2 rounded-xl border px-4 py-2 text-sm font-semibold transition duration-300 disabled:pointer-events-none disabled:opacity-50";

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: Variant;
};

export function Button({
  className,
  variant = "primary",
  type = "button",
  ...props
}: ButtonProps) {
  return (
    <button
      type={type}
      className={cn(base, variants[variant], className)}
      {...props}
    />
  );
}

type ButtonLinkProps = AnchorHTMLAttributes<HTMLAnchorElement> & {
  href: string;
  variant?: Variant;
  children: ReactNode;
};

export function ButtonLink({
  href,
  className,
  variant = "primary",
  children,
  ...props
}: ButtonLinkProps) {
  const isExternal = href.startsWith("http") || href.startsWith("mailto:");

  if (isExternal) {
    return (
      <a
        href={href}
        className={cn(base, variants[variant], className)}
        target={href.startsWith("http") ? "_blank" : undefined}
        rel={href.startsWith("http") ? "noreferrer" : undefined}
        {...props}
      >
        {children}
      </a>
    );
  }

  return (
    <Link
      href={href}
      className={cn(base, variants[variant], className)}
      {...props}
    >
      {children}
    </Link>
  );
}
