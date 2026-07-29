import type { JSX } from "react";
import { Icon } from "./Icons";
import { CTAButtons } from "./CTAButtons";
import { Reveal } from "./Reveal";
import { OFFER_PRICE } from "./Brand";

const INCLUDES = [
  "5 rooms professionally cleaned with hot water extraction",
  "Eco-friendly pre-treatment, safe for kids & pets",
  "Setup, equipment, and cleanup — all included",
  "Additional rooms just $45 each",
];

export function OfferCallout(): JSX.Element {
  return (
    <section
      id="offer-special"
      className="relative overflow-hidden bg-[var(--color-secondary)] py-16 sm:py-20"
    >
      <div className="relative max-w-[1000px] mx-auto px-5 lg:px-8">
        <Reveal>
          <div className="rounded-3xl bg-white overflow-hidden shadow-[0_30px_80px_-30px_rgba(0,0,0,0.5)]">
            {/* orange accent bar */}
            <div className="h-2 bg-[var(--color-accent)]" aria-hidden="true" />
            <div className="grid lg:grid-cols-[0.9fr_1.1fr]">
              {/* Price panel */}
              <div className="bg-[var(--color-accent-soft)] p-8 sm:p-10 flex flex-col justify-center border-b lg:border-b-0 lg:border-r border-[var(--color-border)]">
                <span className="chip bg-[var(--color-accent)] text-[#1A1A1A] px-3 py-1 w-fit">
                  <Icon name="tag" size={15} /> Limited-time special
                </span>
                <div className="mt-4 text-sm font-bold uppercase tracking-wide text-[var(--color-text-muted)]">
                  5 Rooms Cleaned
                </div>
                <div className="text-6xl sm:text-7xl font-extrabold text-[var(--color-secondary)] leading-none">
                  {OFFER_PRICE}
                </div>
                <p className="mt-3 text-sm text-[var(--color-text-muted)] leading-relaxed">
                  Additional rooms $45 each. Areas over 150 sq ft count as two
                  rooms. We explain exactly how rooms are measured before we
                  start — no hidden fees.
                </p>
              </div>

              {/* Details + CTA */}
              <div className="p-8 sm:p-10">
                <h2 className="text-[clamp(1.6rem,3vw,2.25rem)] font-extrabold text-[var(--color-secondary)] leading-tight">
                  Transparent pricing, start to finish
                </h2>
                <ul className="mt-5 space-y-3">
                  {INCLUDES.map((item) => (
                    <li key={item} className="flex items-start gap-2.5">
                      <Icon
                        name="check"
                        size={20}
                        strokeWidth={2.5}
                        className="mt-0.5 text-[var(--color-primary-dark)] shrink-0"
                      />
                      <span className="text-[var(--color-text)]">{item}</span>
                    </li>
                  ))}
                </ul>
                <div className="mt-7">
                  <CTAButtons bookLabel="Claim the $259 Special" />
                </div>
              </div>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
