import Image from "next/image";
import type { JSX } from "react";
import { Icon } from "./Icons";
import {
  BUSINESS_NAME,
  LOGO_WHITE,
  PHONE_DISPLAY,
  PHONE_HREF,
  EMAIL,
  EMAIL_HREF,
  ADDRESS,
  HOURS,
  ESTABLISHED,
} from "./Brand";

export function Footer(): JSX.Element {
  return (
    <footer className="bg-[var(--color-secondary)] text-white">
      <div className="max-w-[1200px] mx-auto px-5 lg:px-8 py-14">
        <div className="grid gap-10 md:grid-cols-2 lg:grid-cols-3">
          {/* Brand */}
          <div className="lg:col-span-2">
            <Image
              src={LOGO_WHITE}
              alt={BUSINESS_NAME}
              width={220}
              height={64}
              className="h-11 w-auto"
            />
            <p className="mt-4 text-white/75 leading-relaxed max-w-sm">
              Professional, IICRC-certified carpet, upholstery, tile, and pressure
              washing across South King &amp; Pierce County — locally owned and
              trusted since {ESTABLISHED}.
            </p>
            <div className="mt-5 flex flex-wrap gap-2">
              <span className="chip bg-white/10 ring-1 ring-white/15 px-3 py-1.5 text-white">
                <Icon name="shieldCheck" size={15} /> IICRC Certified
              </span>
              <span className="chip bg-white/10 ring-1 ring-white/15 px-3 py-1.5 text-white">
                <Icon name="badgeCheck" size={15} /> Licensed, Bonded &amp; Insured
              </span>
            </div>
          </div>

          {/* Contact */}
          <div>
            <h3 className="font-bold text-white">Get in touch</h3>
            <ul className="mt-4 space-y-3">
              <li>
                <a
                  href={PHONE_HREF}
                  className="flex items-center gap-2.5 text-white/85 hover:text-white transition"
                  aria-label={`Call ${BUSINESS_NAME} at ${PHONE_DISPLAY}`}
                >
                  <Icon name="phone" size={18} className="text-[var(--color-teal)] shrink-0" />
                  {PHONE_DISPLAY}
                </a>
              </li>
              <li>
                <a
                  href={EMAIL_HREF}
                  className="flex items-center gap-2.5 text-white/85 hover:text-white transition break-all"
                >
                  <Icon name="check" size={18} className="text-[var(--color-teal)] shrink-0" />
                  {EMAIL}
                </a>
              </li>
              <li className="flex items-center gap-2.5 text-white/75">
                <Icon name="mapPin" size={18} className="text-[var(--color-teal)] shrink-0" />
                {ADDRESS}
              </li>
              <li className="flex items-center gap-2.5 text-white/75">
                <Icon name="clock" size={18} className="text-[var(--color-teal)] shrink-0" />
                {HOURS}
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-12 pt-6 border-t border-white/15 flex flex-col sm:flex-row items-center justify-between gap-3 text-sm text-white/60">
          <p>
            © {ESTABLISHED}–2026 {BUSINESS_NAME}. All rights reserved.
          </p>
          <p>Serving South King &amp; Pierce County, WA. Backed by our 100% satisfaction guarantee.</p>
        </div>
      </div>
    </footer>
  );
}
