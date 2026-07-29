import type { JSX } from "react";
import { SectionHeading } from "./SectionHeading";
import { CTAButtons } from "./CTAButtons";
import { Reveal } from "./Reveal";
import { Icon, type IconName } from "./Icons";
import { DIFFERENTIATORS, type Differentiator } from "./Brand";

const DIFF_ICON: Record<Differentiator["icon"], IconName> = {
  local: "mapPin",
  licensed: "award",
  insurance: "fileText",
  rebuild: "home",
};

function Card({
  diff,
  index,
}: {
  diff: Differentiator;
  index: number;
}): JSX.Element {
  return (
    <Reveal delay={(index % 2) * 80} className="h-full">
      <article className="h-full flex flex-col rounded-2xl bg-[var(--color-surface)] ring-1 ring-[var(--color-hairline)] p-7 shadow-[0_20px_50px_-30px_rgba(0,0,0,0.8)]">
        <span className="grid place-items-center h-12 w-12 rounded-xl bg-[var(--color-secondary)]/15 text-[var(--color-secondary)]">
          <Icon name={DIFF_ICON[diff.icon]} size={26} />
        </span>
        <h3 className="mt-4 text-xl font-bold text-white leading-snug">
          {diff.title}
        </h3>
        <p className="mt-3 text-[var(--color-text-muted)] leading-relaxed flex-1">
          {diff.copy}
        </p>
        <div className="mt-5 inline-flex items-start gap-2 rounded-lg bg-[var(--color-accent)]/12 ring-1 ring-[var(--color-accent)]/25 px-3.5 py-2.5">
          <Icon
            name="check"
            size={18}
            strokeWidth={2.5}
            className="mt-0.5 text-[var(--color-accent)] shrink-0"
          />
          <span className="text-sm font-semibold text-white">{diff.proof}</span>
        </div>
      </article>
    </Reveal>
  );
}

export function WhyUs(): JSX.Element {
  return (
    <section
      id="why-imold"
      className="bg-[var(--color-primary)] py-16 sm:py-20 lg:py-24 border-t border-[var(--color-hairline)]"
    >
      <div className="max-w-[1200px] mx-auto px-5 lg:px-8">
        <SectionHeading
          eyebrow="Why iMold"
          title="The local team that beats the franchises"
          subtitle="Anyone can show up after a storm. Here's what you get when a licensed, locally owned team handles your home."
        />

        <div className="mt-14 grid gap-6 sm:grid-cols-2">
          {DIFFERENTIATORS.map((diff, i) => (
            <Card key={diff.title} diff={diff} index={i} />
          ))}
        </div>

        <div className="mt-12 flex justify-center">
          <CTAButtons align="center" />
        </div>
      </div>
    </section>
  );
}
