import { Icon } from "@/components/Icon";
import type { Skill } from "@/types/portfolio";

export function SkillMeter({ skill }: { skill: Skill }) {
  return (
    <div className="rounded-2xl border border-blue-300/15 bg-[linear-gradient(145deg,rgba(15,23,42,0.88),rgba(9,23,50,0.78))] p-4 shadow-[0_18px_55px_rgba(2,6,23,0.28)] transition duration-300 hover:border-blue-300/30 hover:bg-blue-950/40">
      <div className="flex items-center justify-between gap-4">
        <div className="flex min-w-0 items-center gap-3">
          <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl border border-blue-200/20 bg-gradient-to-br from-blue-600/30 to-sky-400/10 text-sky-300 shadow-[inset_0_1px_0_rgba(255,255,255,0.08)]">
            <Icon name={skill.icon} className="h-5 w-5" />
          </span>
          <p className="truncate font-semibold text-white">{skill.name}</p>
        </div>
        <span className="text-sm font-semibold text-blue-200">{skill.level}%</span>
      </div>
      <div className="mt-4 h-2 overflow-hidden rounded-full bg-blue-950/80">
        <div
          className="h-full rounded-full bg-gradient-to-r from-blue-700 via-blue-500 to-sky-300 shadow-[0_0_18px_rgba(56,189,248,0.42)]"
          style={{ width: `${Math.min(100, Math.max(0, skill.level))}%` }}
        />
      </div>
    </div>
  );
}
