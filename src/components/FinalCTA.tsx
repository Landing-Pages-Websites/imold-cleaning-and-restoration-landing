import type { JSX } from "react";
import { LeadForm } from "./LeadForm";
import { Icon, Stars } from "./Icons";
import { PHONE_DISPLAY, PHONE_HREF, OFFER_PRICE, RATING, REVIEW_COUNT } from "./Brand";

const REASSURANCE = [
  "IICRC-certified, licensed, bonded & insured",
  "100% satisfaction guarantee",
  "Upfront pricing — no hidden fees",
  "Dry in 6–12 hours, safe for kids & pets",
];

export function FinalCTA(): JSX.Element {
  return (
    <section
      id="final-cta"
      className="relative overflow-hidden bg-[var(--color-secondary)] py-16 sm:py-20 lg:py-24"
    >
      <div className="relative max-w-[1200px] mx-auto px-5 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-10 lg:gap-14 items-center">
          {/* Copy */}
          <div className="text-white">
            <div className="inline-flex items-center gap-2 rounded-full bg-white/10 ring-1 ring-white/20 px-3 py-1.5 text-sm font-semibold">
              <Stars size={16} />
              {RATING} stars · {REVIEW_COUNT} Google reviews
            </div>
            <h2 className="mt-5 text-[clamp(2rem,4vw,3rem)] font-extrabold leading-[1.08] text-white">
              Ready to bring your carpets back to life?
            </h2>
            <p className="mt-4 text-lg text-white/85 leading-relaxed max-w-xl">
              Book the {OFFER_PRICE} 5-room special today. Our certified local crew
              handles the rest — backed by our 100% satisfaction guarantee.
            </p>

            <ul className="mt-6 space-y-2.5">
              {REASSURANCE.map((r) => (
                <li key={r} className="flex items-center gap-2.5 text-white/90">
                  <Icon
                    name="check"
                    size={20}
                    strokeWidth={2.5}
                    className="text-[var(--color-teal)] shrink-0"
                  />
                  {r}
                </li>
              ))}
            </ul>

            <a
              href={PHONE_HREF}
              className="btn-outline-light mt-8"
              aria-label={`Call Tubro Carpet Cleaning at ${PHONE_DISPLAY}`}
            >
              <Icon name="phone" size={18} />
              Prefer to call? {PHONE_DISPLAY}
            </a>
          </div>

          {/* Form */}
          <div>
            <LeadForm
              variant="band"
              formId="final-cta"
              headline="Book My Carpet Cleaning"
              subhead="Get your upfront quote — most bookings confirmed same or next day."
            />
          </div>
        </div>
      </div>
    </section>
  );
}
