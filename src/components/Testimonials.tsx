import Image from "next/image";
import type { JSX } from "react";
import { SectionHeading } from "./SectionHeading";
import { CTAButtons } from "./CTAButtons";
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
      <figure className="h-full flex flex-col rounded-2xl bg-[var(--color-surface)] ring-1 ring-[var(--color-hairline)] p-6 shadow-[0_20px_50px_-30px_rgba(0,0,0,0.8)]">
        <Stars count={t.stars} size={18} />
        <blockquote className="mt-3 text-white/90 leading-relaxed flex-1">
          “{t.quote}”
        </blockquote>
        <figcaption className="mt-5 flex items-center gap-3 border-t border-[var(--color-hairline)] pt-4">
          <span className="grid place-items-center h-10 w-10 rounded-full bg-[var(--color-secondary)]/15 text-[var(--color-secondary)] font-bold text-sm">
            {initials(t.name)}
          </span>
          <div>
            <div className="font-bold text-white text-sm">{t.name}</div>
            <div className="text-xs text-[var(--color-text-muted)]">
              {t.platform}
            </div>
          </div>
        </figcaption>
      </figure>
    </Reveal>
  );
}

export function Testimonials(): JSX.Element {
  return (
    <section
      id="reviews"
      className="bg-[var(--color-surface)] py-16 sm:py-20 lg:py-24"
    >
      <div className="max-w-[1200px] mx-auto px-5 lg:px-8">
        <SectionHeading
          eyebrow="Reviews"
          title={`Rated ${RATING} across ${REVIEW_COUNT} five-star reviews`}
          subtitle="Real reviews from Southwest Florida homeowners who trusted us with their water and mold emergencies."
        />

        <div className="mt-8 flex justify-center">
          <span className="inline-flex items-center gap-2.5 rounded-full bg-[var(--color-primary)] ring-1 ring-[var(--color-hairline)] px-4 py-2">
            <Image
              src="/images/googlelogo.svg"
              alt="Google"
              width={20}
              height={20}
              className="h-5 w-5"
            />
            <Stars size={16} />
            <span className="text-sm font-semibold text-white">
              {RATING} · {REVIEW_COUNT} reviews
            </span>
          </span>
        </div>

        <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {TESTIMONIALS.map((t, i) => (
            <Card key={t.name} t={t} index={i} />
          ))}
        </div>

        <div className="mt-12 flex justify-center">
          <CTAButtons align="center" />
        </div>
      </div>
    </section>
  );
}
