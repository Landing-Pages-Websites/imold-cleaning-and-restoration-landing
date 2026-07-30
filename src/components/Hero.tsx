import Image from "next/image";
import type { JSX } from "react";
import { LeadForm } from "./LeadForm";
import { CTAButtons } from "./CTAButtons";
import { Icon, Stars } from "./Icons";
import { RATING, REVIEW_COUNT } from "./Brand";

const TRUST_POINTS = [
  { icon: "clock" as const, label: "24/7 emergency response" },
  { icon: "search" as const, label: "Free visual inspections" },
  { icon: "fileText" as const, label: "Insurance paperwork handled" },
  { icon: "award" as const, label: "Licensed & IICRC-certified" },
];

export function Hero(): JSX.Element {
  return (
    <section
      id="hero"
      className="relative overflow-hidden bg-[var(--color-primary)]"
    >
      {/* Background: warm golden-hour SWFL home + friendly technician.
          Layered scrims keep the copy legible on the left while the warm
          image reads bright toward the right/behind the form. */}
      <div className="absolute inset-0" aria-hidden="true">
        <Image
          src="/images/hero-home-warm.jpg"
          alt=""
          fill
          priority
          sizes="100vw"
          className="object-cover object-[62%_center] opacity-65"
        />
        {/* Left-to-right navy scrim — strong where the copy lives, clearing to the
            right. Kept heavier on mobile (stacked, full-width copy) and lighter on
            desktop so the warm image reads behind/around the form. */}
        <div className="absolute inset-0 bg-gradient-to-r from-[var(--color-primary)] via-[var(--color-primary)]/80 to-[var(--color-primary)]/45 lg:to-[var(--color-primary)]/25" />
        {/* Bottom + top grounding so the section blends into the page and passes AA */}
        <div className="absolute inset-0 bg-gradient-to-t from-[var(--color-primary)] via-[var(--color-primary)]/35 to-[var(--color-primary)]/45" />
        {/* Warm golden glow — keeps the hero from reading cold navy */}
        <div className="absolute inset-0 bg-[radial-gradient(80%_60%_at_78%_18%,var(--color-warm-soft),transparent_62%)]" />
      </div>

      <div className="relative max-w-[1200px] mx-auto px-5 lg:px-8 py-10 sm:py-16 lg:py-20">
        <div className="grid lg:grid-cols-[1.05fr_0.95fr] gap-8 lg:gap-12 items-center">
          {/* ── Left: value prop + trust ── */}
          <div className="text-white">
            <div className="flex flex-wrap items-center gap-2.5">
              <div className="inline-flex items-center gap-2.5 rounded-full bg-white/10 ring-1 ring-white/15 px-3.5 py-1.5 text-sm font-semibold">
                <Stars size={16} />
                <span>
                  {RATING} · {REVIEW_COUNT} five-star Google reviews
                </span>
              </div>
              <div className="inline-flex items-center gap-2 rounded-full bg-[var(--color-warm-soft)] ring-1 ring-[var(--color-warm)]/45 px-3.5 py-1.5 text-sm font-semibold">
                <span className="relative flex h-2 w-2">
                  <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[var(--color-warm)] opacity-75 motion-reduce:hidden" />
                  <span className="relative inline-flex h-2 w-2 rounded-full bg-[var(--color-warm)]" />
                </span>
                <span className="text-[var(--color-warm)]">
                  24/7 Emergency Service
                </span>
              </div>
            </div>

            <h1 className="mt-5 text-[clamp(2.35rem,5vw,3.9rem)] font-extrabold leading-[1.03] text-white">
              Water &amp; mold emergencies,{" "}
              <span className="text-[var(--color-secondary)]">handled</span> —
              24/7.
            </h1>

            <p className="mt-5 text-lg text-white/90 max-w-xl leading-relaxed">
              When water or mold hits your home, iMold responds immediately with
              a free visual inspection, a clear estimate, and one state-licensed
              local team that stays with you from cleanup all the way through the
              rebuild.
            </p>

            {/* Risk-reversal highlight */}
            <div className="mt-6 inline-flex items-center gap-3 rounded-xl bg-[var(--color-accent)]/15 ring-1 ring-[var(--color-accent)]/40 px-4 py-2.5">
              <Icon
                name="shieldCheck"
                size={22}
                className="text-[var(--color-accent)] shrink-0"
              />
              <span className="text-sm sm:text-base font-semibold text-white">
                Free visual inspection &amp; written estimate — no obligation
              </span>
            </div>

            {/* Trust grid */}
            <ul className="mt-7 grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-3">
              {TRUST_POINTS.map((t) => (
                <li
                  key={t.label}
                  className="flex items-center gap-2.5 text-sm font-medium text-white/90"
                >
                  <span className="grid place-items-center h-8 w-8 rounded-lg bg-white/10 text-[var(--color-secondary)] shrink-0">
                    <Icon name={t.icon} size={18} />
                  </span>
                  {t.label}
                </li>
              ))}
            </ul>

            <div className="mt-8">
              <CTAButtons />
            </div>
          </div>

          {/* ── Right: lead form ── */}
          <div id="lead-form" className="lg:pl-4 scroll-mt-24">
            <LeadForm
              variant="hero"
              formId="hero"
              headline="Get your free inspection"
              subhead="Tell us about the damage and we'll reach out right away. For an active emergency, call us — we respond 24/7."
            />
          </div>
        </div>
      </div>
    </section>
  );
}
