import type { HTMLAttributes } from "react";
import { cn } from "@/lib/cn";

export function Card({ className, ...props }: HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={cn(
        "rounded-2xl border border-blue-300/15 bg-[linear-gradient(145deg,rgba(15,23,42,0.94),rgba(7,17,31,0.9))] p-5 shadow-[0_24px_80px_rgba(2,6,23,0.45)] backdrop-blur-xl",
        className,
      )}
      {...props}
    />
  );
}
