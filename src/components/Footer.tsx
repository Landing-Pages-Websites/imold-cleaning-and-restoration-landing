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
  YEARS_IN_BUSINESS,
  LICENSE_MOLD_NO,
  LICENSE_GC_NO,
} from "./Brand";

export function Footer(): JSX.Element {
  return (
    <footer className="bg-[#081722] text-white border-t border-[var(--color-hairline)]">
      <div className="max-w-[1200px] mx-auto px-5 lg:px-8 py-14">
        <div className="grid gap-10 md:grid-cols-2 lg:grid-cols-3">
          {/* Brand */}
          <div className="lg:col-span-2">
            <Image
              src={LOGO_WHITE}
              alt={BUSINESS_NAME}
              width={200}
              height={90}
              className="h-12 w-auto"
            />
            <p className="mt-4 text-white/70 leading-relaxed max-w-md">
              24/7 water damage restoration, mold remediation, and fire damage
              restoration across Southwest Florida — locally owned for{" "}
              {YEARS_IN_BUSINESS} years and licensed from the first call all the
              way through the rebuild.
            </p>
            <div className="mt-5 flex flex-wrap gap-2">
              <span className="chip bg-white/10 ring-1 ring-white/15 px-3 py-1.5 text-white">
                <Icon name="award" size={15} /> Mold Remediator {LICENSE_MOLD_NO}
              </span>
              <span className="chip bg-white/10 ring-1 ring-white/15 px-3 py-1.5 text-white">
                <Icon name="award" size={15} /> General Contractor {LICENSE_GC_NO}
              </span>
              <span className="chip bg-white/10 ring-1 ring-white/15 px-3 py-1.5 text-white">
                <Icon name="shieldCheck" size={15} /> IICRC-certified
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
                  <Icon
                    name="phone"
                    size={18}
                    className="text-[var(--color-secondary)] shrink-0"
                  />
                  {PHONE_DISPLAY}
                </a>
              </li>
              <li>
                <a
                  href={EMAIL_HREF}
                  className="flex items-center gap-2.5 text-white/85 hover:text-white transition break-all"
                >
                  <Icon
                    name="fileText"
                    size={18}
                    className="text-[var(--color-secondary)] shrink-0"
                  />
                  {EMAIL}
                </a>
              </li>
              <li className="flex items-center gap-2.5 text-white/70">
                <Icon
                  name="mapPin"
                  size={18}
                  className="text-[var(--color-secondary)] shrink-0"
                />
                {ADDRESS} · Serving Southwest Florida
              </li>
              <li className="flex items-center gap-2.5 text-white/70">
                <Icon
                  name="clock"
                  size={18}
                  className="text-[var(--color-secondary)] shrink-0"
                />
                {HOURS}
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-12 pt-6 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-3 text-sm text-white/55">
          <p>
            © 2026 {BUSINESS_NAME}. All rights reserved.
          </p>
          <p>
            Licensed &amp; insured · Mold Remediator {LICENSE_MOLD_NO} · GC{" "}
            {LICENSE_GC_NO}
          </p>
        </div>
      </div>
    </footer>
  );
}
