import Image from "next/image";
import type { JSX } from "react";
import { LeadForm } from "./LeadForm";
import { Icon, Stars } from "./Icons";
import {
  PHONE_DISPLAY,
  PHONE_HREF,
  BUSINESS_NAME,
  RATING,
  REVIEW_COUNT,
} from "./Brand";

const REASSURANCE = [
  "Free visual inspection & written estimate",
  "24/7 emergency response, 7 days a week",
  "We handle the insurance paperwork",
  "Licensed, IICRC-certified & locally owned 28 years",
];

export function FinalCTA(): JSX.Element {
  return (
    <section
      id="final-cta"
      className="relative overflow-hidden bg-[var(--color-primary)] py-16 sm:py-20 lg:py-24 border-t border-[var(--color-hairline)]"
    >
      {/* faint contextual texture */}
      <div className="absolute inset-0" aria-hidden="true">
        <Image
          src="/images/cta-mold.webp"
          alt=""
          fill
          sizes="100vw"
          className="object-cover opacity-[0.08]"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-[var(--color-primary)] via-[var(--color-primary)]/95 to-[var(--color-primary)]/85" />
      </div>

      <div className="relative max-w-[1200px] mx-auto px-5 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-10 lg:gap-14 items-center">
          {/* Copy */}
          <div className="text-white">
            <div className="inline-flex items-center gap-2.5 rounded-full bg-white/10 ring-1 ring-white/15 px-3.5 py-1.5 text-sm font-semibold">
              <Stars size={16} />
              {RATING} · {REVIEW_COUNT} five-star reviews
            </div>
            <h2 className="mt-5 text-[clamp(2rem,4vw,3rem)] font-extrabold leading-[1.06] text-white">
              Talk to a local restoration expert now
            </h2>
            <p className="mt-4 text-lg text-white/80 leading-relaxed max-w-xl">
              Water and mold don&apos;t wait, and neither should you. Request your
              free inspection, or call our team any time — day or night — and
              we&apos;ll respond right away.
            </p>

            <ul className="mt-6 space-y-2.5">
              {REASSURANCE.map((r) => (
                <li key={r} className="flex items-center gap-2.5 text-white/90">
                  <Icon
                    name="check"
                    size={20}
                    strokeWidth={2.5}
                    className="text-[var(--color-accent)] shrink-0"
                  />
                  {r}
                </li>
              ))}
            </ul>

            <a
              href={PHONE_HREF}
              className="btn-secondary mt-8"
              aria-label={`Call ${BUSINESS_NAME} at ${PHONE_DISPLAY}`}
            >
              <Icon name="phone" size={18} className="text-[var(--color-secondary)]" />
              Call {PHONE_DISPLAY} — we&apos;re here 24/7
            </a>
          </div>

          {/* Form */}
          <div>
            <LeadForm
              variant="band"
              formId="final-cta"
              headline="Get my free inspection"
              subhead="Send us the details and a local team member will reach out right away."
            />
          </div>
        </div>
      </div>
    </section>
  );
}
