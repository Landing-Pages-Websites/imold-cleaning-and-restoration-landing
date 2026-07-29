import type { JSX } from "react";
import { SectionHeading } from "./SectionHeading";
import { CTAButtons } from "./CTAButtons";
import { Reveal } from "./Reveal";
import { Icon, type IconName } from "./Icons";
import { OFFERS, type Offer } from "./Brand";

const OFFER_ICON: Record<Offer["icon"], IconName> = {
  inspection: "gift",
  financing: "creditCard",
  discount: "heart",
};

export function OfferCallout(): JSX.Element {
  return (
    <section
      id="offers"
      className="bg-[var(--color-primary)] py-16 sm:py-20 lg:py-24 border-t border-[var(--color-hairline)]"
    >
      <div className="max-w-[1200px] mx-auto px-5 lg:px-8">
        <SectionHeading
          eyebrow="Made easier"
          title="We take the cost stress off your plate"
          subtitle="Emergencies are stressful enough. These are the ways we make getting your home back more affordable and less overwhelming."
        />

        <div className="mt-14 grid gap-6 md:grid-cols-3">
          {OFFERS.map((offer, i) => {
            const featured = i === 0;
            return (
              <Reveal key={offer.title} delay={i * 80} className="h-full">
                <article
                  className={`h-full flex flex-col rounded-2xl p-7 shadow-[0_20px_50px_-30px_rgba(0,0,0,0.8)] ${
                    featured
                      ? "bg-[var(--color-accent)]/12 ring-1 ring-[var(--color-accent)]/40"
                      : "bg-[var(--color-surface)] ring-1 ring-[var(--color-hairline)]"
                  }`}
                >
                  <span
                    className={`grid place-items-center h-12 w-12 rounded-xl ${
                      featured
                        ? "bg-[var(--color-accent)] text-[#06131d]"
                        : "bg-[var(--color-secondary)]/15 text-[var(--color-secondary)]"
                    }`}
                  >
                    <Icon name={OFFER_ICON[offer.icon]} size={24} />
                  </span>
                  <h3 className="mt-4 text-lg font-bold text-white leading-snug">
                    {offer.title}
                  </h3>
                  <p className="mt-2.5 text-[var(--color-text-muted)] leading-relaxed flex-1">
                    {offer.copy}
                  </p>
                </article>
              </Reveal>
            );
          })}
        </div>

        <div className="mt-12 flex justify-center">
          <CTAButtons align="center" />
        </div>
      </div>
    </section>
  );
}
