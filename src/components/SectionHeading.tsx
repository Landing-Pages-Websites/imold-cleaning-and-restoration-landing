import type { JSX, ReactNode } from "react";

interface SectionHeadingProps {
  eyebrow?: string;
  title: ReactNode;
  subtitle?: ReactNode;
  align?: "start" | "center";
  tone?: "dark" | "light";
}

export function SectionHeading({
  eyebrow,
  title,
  subtitle,
  align = "center",
  tone = "dark",
}: SectionHeadingProps): JSX.Element {
  const isLight = tone === "light";
  return (
    <div
      className={`${align === "center" ? "text-center mx-auto" : "text-left"} max-w-2xl ${
        align === "center" ? "" : ""
      }`}
    >
      {eyebrow && (
        <span
          className={`inline-block text-xs font-bold uppercase tracking-[0.14em] ${
            isLight ? "text-[var(--color-teal)]" : "text-[var(--color-primary-dark)]"
          }`}
        >
          {eyebrow}
        </span>
      )}
      <h2
        className={`mt-2 text-[clamp(1.9rem,3.5vw,2.75rem)] font-extrabold leading-[1.1] ${
          isLight ? "text-white" : "text-[var(--color-secondary)]"
        }`}
      >
        {title}
      </h2>
      {subtitle && (
        <p
          className={`mt-3.5 text-lg leading-relaxed ${
            isLight ? "text-white/85" : "text-[var(--color-text-muted)]"
          } ${align === "center" ? "mx-auto" : ""}`}
        >
          {subtitle}
        </p>
      )}
    </div>
  );
}
