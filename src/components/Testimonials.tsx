import type { JSX } from "react";
import { SectionHeading } from "./SectionHeading";
import { Reveal } from "./Reveal";
import { Stars } from "./Icons";
import { TESTIMONIALS, RATING, REVIEW_COUNT, type Testimonial } from "./Brand";

function initials(name: string): string {
  return name
    .split(" ")
    .map((p) => p[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();
}

function Card({ t, index }: { t: Testimonial; index: number }): JSX.Element {
  return (
    <Reveal delay={(index % 3) * 70} className="h-full">
      <figure className="h-full flex flex-col rounded-2xl bg-white ring-1 ring-[var(--color-border)] p-6 shadow-[0_4px_16px_rgba(15,64,52,0.06)]">
        <Stars count={t.stars} size={18} />
        <blockquote className="mt-3 text-[var(--color-text)] leading-relaxed flex-1">
          “{t.quote}”
        </blockquote>
        <figcaption className="mt-5 flex items-center gap-3 border-t border-[var(--color-border)] pt-4">
          <span className="grid place-items-center h-10 w-10 rounded-full bg-[var(--color-primary)]/12 text-[var(--color-primary-dark)] font-bold text-sm">
            {initials(t.name)}
          </span>
          <div>
            <div className="font-bold text-[var(--color-secondary)] text-sm">
              {t.name}
            </div>
            <div className="text-xs text-[var(--color-text-muted)]">
              Verified Google review
            </div>
          </div>
        </figcaption>
      </figure>
    </Reveal>
  );
}

export function Testimonials(): JSX.Element {
  return (
    <section id="testimonials" className="bg-white py-16 sm:py-20 lg:py-24">
      <div className="max-w-[1200px] mx-auto px-5 lg:px-8">
        <SectionHeading
          eyebrow="Reviews"
          title={`${RATING} stars from ${REVIEW_COUNT} Google reviews`}
          subtitle="Real reviews from South King & Pierce County neighbors who trust us with their homes."
        />

        <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {TESTIMONIALS.map((t, i) => (
            <Card key={t.name} t={t} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}
