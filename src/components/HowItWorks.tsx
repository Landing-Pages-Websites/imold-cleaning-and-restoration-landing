import type { JSX } from "react";
import { SectionHeading } from "./SectionHeading";
import { CTAButtons } from "./CTAButtons";
import { Reveal } from "./Reveal";
import { Icon, type IconName } from "./Icons";
import { STEPS, type Step } from "./Brand";

const STEP_ICON: Record<Step["icon"], IconName> = {
  call: "phone",
  inspect: "clipboardCheck",
  restore: "droplets",
  rebuild: "home",
};

export function HowItWorks(): JSX.Element {
  return (
    <section
      id="how-it-works"
      className="bg-[var(--color-surface)] py-16 sm:py-20 lg:py-24"
    >
      <div className="max-w-[1200px] mx-auto px-5 lg:px-8">
        <SectionHeading
          eyebrow="How it works"
          title="From emergency call to finished rebuild"
          subtitle="Four clear steps — with one licensed team and one point of contact the whole way through."
        />

        <ol className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {STEPS.map((step, i) => (
            <Reveal key={step.n} delay={i * 80} className="h-full">
              <li className="relative h-full rounded-2xl bg-[var(--color-primary)] ring-1 ring-[var(--color-hairline)] p-6">
                <div className="flex items-center justify-between">
                  <span className="grid place-items-center h-12 w-12 rounded-xl bg-[var(--color-secondary)]/15 text-[var(--color-secondary)]">
                    <Icon name={STEP_ICON[step.icon]} size={24} />
                  </span>
                  <span
                    className="font-display text-4xl font-extrabold text-[var(--color-warm)]/20"
                    aria-hidden="true"
                  >
                    {String(step.n).padStart(2, "0")}
                  </span>
                </div>
                <h3 className="mt-5 text-lg font-bold text-white">
                  {step.title}
                </h3>
                <p className="mt-2.5 text-sm text-[var(--color-text-muted)] leading-relaxed">
                  {step.copy}
                </p>
              </li>
            </Reveal>
          ))}
        </ol>

        <div className="mt-12 flex justify-center">
          <CTAButtons align="center" />
        </div>
      </div>
    </section>
  );
}
