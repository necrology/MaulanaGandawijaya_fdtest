type SectionTitleProps = {
  eyebrow?: string;
  title: string;
  description?: string;
};

export function SectionTitle({ eyebrow, title, description }: SectionTitleProps) {
  return (
    <div className="mb-7 max-w-4xl">
      {eyebrow ? (
        <p className="mb-3 flex items-center gap-3 text-xs font-semibold uppercase tracking-[0.24em] text-blue-300">
          <span className="h-2 w-2 rounded-full bg-sky-400 shadow-[0_0_18px_rgba(56,189,248,0.9)]" />
          <span>{eyebrow}</span>
        </p>
      ) : null}
      <h2 className="gradient-text text-3xl font-semibold leading-tight md:text-5xl">
        {title}
      </h2>
      {description ? (
        <p className="mt-4 text-base leading-7 text-slate-300 md:text-lg">
          {description}
        </p>
      ) : null}
    </div>
  );
}
