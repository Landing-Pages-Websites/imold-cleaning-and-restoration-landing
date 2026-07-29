import Image from "next/image";
import type { JSX } from "react";
import { SectionHeading } from "./SectionHeading";
import { CTAButtons } from "./CTAButtons";
import { Reveal } from "./Reveal";
import { Icon, type IconName } from "./Icons";
import { DIFFERENTIATORS, type Differentiator } from "./Brand";

const DIFF_ICON: Record<Differentiator["icon"], IconName> = {
  certified: "shieldCheck",
  quickdry: "clock",
  eco: "leaf",
  pricing: "tag",
};

function Row({ diff, index }: { diff: Differentiator; index: number }): JSX.Element {
  const reversed = index % 2 === 1;
  return (
    <Reveal>
      <div className="grid lg:grid-cols-2 gap-8 lg:gap-14 items-center">
        {/* Media */}
        <div className={`${reversed ? "lg:order-2" : ""}`}>
          <div className="relative aspect-[4/3] rounded-2xl overflow-hidden ring-1 ring-[var(--color-border)] shadow-[0_16px_44px_-20px_rgba(15,64,52,0.4)] bg-[var(--color-soft)]">
            {diff.image ? (
              <Image
                src={diff.image}
                alt={diff.imageAlt ?? diff.title}
                fill
                sizes="(max-width: 1024px) 100vw, 50vw"
                className="object-cover"
              />
            ) : (
              <div className="absolute inset-0 grid place-items-center bg-gradient-to-br from-[var(--color-primary)] to-[var(--color-secondary)]">
                <Icon name={DIFF_ICON[diff.icon]} size={72} className="text-white/90" />
              </div>
            )}
          </div>
        </div>

        {/* Copy */}
        <div className={`${reversed ? "lg:order-1" : ""}`}>
          <span className="grid place-items-center h-12 w-12 rounded-xl bg-[var(--color-primary)]/10 text-[var(--color-primary-dark)]">
            <Icon name={DIFF_ICON[diff.icon]} size={26} />
          </span>
          <h3 className="mt-4 text-2xl font-extrabold text-[var(--color-secondary)] leading-tight">
            {diff.title}
          </h3>
          <p className="mt-3 text-[1.0625rem] text-[var(--color-text-muted)] leading-relaxed">
            {diff.copy}
          </p>
          <div className="mt-4 inline-flex items-start gap-2 rounded-lg bg-[var(--color-teal-soft)] px-3.5 py-2.5">
            <Icon name="check" size={18} className="mt-0.5 text-[var(--color-secondary)] shrink-0" strokeWidth={2.5} />
            <span className="text-sm font-semibold text-[var(--color-secondary)]">
              {diff.proof}
            </span>
          </div>
        </div>
      </div>
    </Reveal>
  );
}

export function WhyUs(): JSX.Element {
  return (
    <section id="why-tubro" className="bg-white py-16 sm:py-20 lg:py-24">
      <div className="max-w-[1200px] mx-auto px-5 lg:px-8">
        <SectionHeading
          eyebrow="Why Tubro"
          title="The difference you'll feel underfoot"
          subtitle="Anyone can quote a low price. Here's what you actually get when the certified, local crew shows up."
        />

        <div className="mt-14 space-y-16 lg:space-y-20">
          {DIFFERENTIATORS.map((diff, i) => (
            <Row key={diff.title} diff={diff} index={i} />
          ))}
        </div>

        <div className="mt-14 flex justify-center">
          <CTAButtons bookLabel="Book A Cleaning Today" align="center" />
        </div>
      </div>
    </section>
  );
}
