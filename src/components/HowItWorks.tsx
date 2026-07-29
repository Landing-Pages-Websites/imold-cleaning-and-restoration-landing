import type { JSX } from "react";
import { SectionHeading } from "./SectionHeading";
import { CTAButtons } from "./CTAButtons";
import { Reveal } from "./Reveal";
import { STEPS } from "./Brand";

export function HowItWorks(): JSX.Element {
  return (
    <section id="how-it-works" className="bg-[var(--color-soft)] py-16 sm:py-20 lg:py-24">
      <div className="max-w-[1200px] mx-auto px-5 lg:px-8">
        <SectionHeading
          eyebrow="How it works"
          title="Booked, cleaned, and dry — fast"
          subtitle="Three simple steps from your first call to carpets that look and feel new again."
        />

        <ol className="mt-12 grid gap-6 md:grid-cols-3">
          {STEPS.map((step, i) => (
            <Reveal key={step.n} delay={i * 80} className="h-full">
              <li className="relative h-full rounded-2xl bg-white ring-1 ring-[var(--color-border)] p-7 shadow-[0_4px_16px_rgba(15,64,52,0.06)]">
                <div className="flex items-center gap-4">
                  <span className="grid place-items-center h-12 w-12 rounded-full bg-[var(--color-primary-dark)] text-white text-xl font-extrabold shrink-0">
                    {step.n}
                  </span>
                  <h3 className="text-lg font-bold text-[var(--color-secondary)]">
                    {step.title}
                  </h3>
                </div>
                <p className="mt-4 text-[var(--color-text-muted)] leading-relaxed">
                  {step.copy}
                </p>
              </li>
            </Reveal>
          ))}
        </ol>

        <div className="mt-12 flex justify-center">
          <CTAButtons bookLabel="Book My Carpet Cleaning" align="center" />
        </div>
      </div>
    </section>
  );
}
