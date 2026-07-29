import Image from "next/image";
import type { JSX } from "react";
import { LeadForm } from "./LeadForm";
import { CTAButtons } from "./CTAButtons";
import { Icon, Stars } from "./Icons";
import { OFFER_PRICE, OFFER_EXTRA, RATING, REVIEW_COUNT } from "./Brand";

const TRUST_POINTS = [
  { icon: "shieldCheck" as const, label: "IICRC Certified" },
  { icon: "clock" as const, label: "Dry in 6–12 hours" },
  { icon: "leaf" as const, label: "Safe for kids & pets" },
];

export function Hero(): JSX.Element {
  return (
    <section id="hero" className="relative overflow-hidden bg-[var(--color-secondary)]">
      {/* Background carpet photo + legibility overlay */}
      <div className="absolute inset-0" aria-hidden="true">
        <Image
          src="/images/hero-carpet.jpg"
          alt=""
          fill
          priority
          sizes="100vw"
          className="object-cover opacity-25"
        />
        <div className="absolute inset-0 bg-gradient-to-br from-[var(--color-secondary)] via-[var(--color-secondary)]/90 to-[#0b322a]/85" />
      </div>

      <div className="relative max-w-[1200px] mx-auto px-5 lg:px-8 py-10 sm:py-16 lg:py-20">
        <div className="grid lg:grid-cols-[1.05fr_0.95fr] gap-8 lg:gap-12 items-center">
          {/* ── Left: value prop + offer + trust ── */}
          <div className="text-white">
            <div className="inline-flex items-center gap-2 rounded-full bg-white/10 ring-1 ring-white/20 px-3 py-1.5 text-sm font-semibold">
              <Stars size={16} />
              <span>
                {RATING} stars · {REVIEW_COUNT} Google reviews
              </span>
            </div>

            <h1 className="mt-5 text-[clamp(2.25rem,5vw,3.75rem)] font-extrabold leading-[1.05] text-white">
              Professional Carpet Cleaning Across South King &amp; Pierce County
            </h1>

            <p className="mt-4 text-lg text-white/85 max-w-xl leading-relaxed">
              Get 5 rooms professionally cleaned for{" "}
              <span className="font-bold text-white">{OFFER_PRICE}</span> —{" "}
              {OFFER_EXTRA.toLowerCase()}. IICRC-certified technicians, eco-friendly
              products, and carpets dry in 6–12 hours.
            </p>

            {/* Offer chip */}
            <div className="mt-6 inline-flex items-stretch rounded-xl overflow-hidden bg-white shadow-lg">
              <div className="bg-[var(--color-accent)] px-4 flex items-center">
                <Icon name="tag" size={26} className="text-[#1A1A1A]" />
              </div>
              <div className="px-4 py-2.5 pr-5">
                <div className="text-xs font-bold uppercase tracking-wide text-[var(--color-text-muted)]">
                  5-Room Special
                </div>
                <div className="text-2xl font-extrabold text-[var(--color-secondary)] leading-none">
                  {OFFER_PRICE}
                  <span className="ml-2 text-sm font-semibold text-[var(--color-text-muted)]">
                    {OFFER_EXTRA}
                  </span>
                </div>
              </div>
            </div>

            {/* Trust row */}
            <ul className="mt-6 flex flex-wrap gap-x-5 gap-y-2">
              {TRUST_POINTS.map((t) => (
                <li
                  key={t.label}
                  className="flex items-center gap-2 text-sm font-medium text-white/90"
                >
                  <Icon name={t.icon} size={18} className="text-[var(--color-teal)]" />
                  {t.label}
                </li>
              ))}
            </ul>

            <div className="mt-7 hidden sm:block">
              <CTAButtons tone="light" bookLabel="Book My Carpet Cleaning" />
            </div>
          </div>

          {/* ── Right: lead form ── */}
          <div className="lg:pl-4">
            <LeadForm
              variant="hero"
              formId="hero"
              headline="Book Your Cleaning"
              subhead="Tell us where you are and what you need — we'll call to confirm, often same or next day."
            />
          </div>
        </div>
      </div>
    </section>
  );
}
