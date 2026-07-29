"use client";

import Image from "next/image";
import { useEffect, useState, type JSX } from "react";
import { Icon } from "./Icons";
import {
  BUSINESS_NAME,
  LOGO_WHITE,
  PHONE_DISPLAY,
  PHONE_HREF,
  PRIMARY_CTA,
  FORM_ANCHOR,
} from "./Brand";

export function Header(): JSX.Element {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={`sticky top-0 z-50 transition-colors duration-300 ${
        scrolled
          ? "bg-[var(--color-primary)]/95 backdrop-blur border-b border-[var(--color-hairline)] shadow-[0_8px_30px_-12px_rgba(0,0,0,0.6)]"
          : "bg-[var(--color-primary)] border-b border-transparent"
      }`}
    >
      <div className="max-w-[1200px] mx-auto px-5 lg:px-8 h-16 sm:h-[4.75rem] flex items-center justify-between gap-4">
        <a
          href="#hero"
          aria-label={`${BUSINESS_NAME} — home`}
          className="flex items-center shrink-0"
        >
          <Image
            src={LOGO_WHITE}
            alt={BUSINESS_NAME}
            width={200}
            height={90}
            className="h-9 sm:h-11 w-auto"
            priority
          />
        </a>

        <div className="flex items-center gap-2 sm:gap-3">
          <span className="hidden md:inline-flex items-center gap-1.5 text-sm font-semibold text-white/90">
            <span className="relative flex h-2 w-2" aria-hidden="true">
              <span className="absolute inline-flex h-full w-full rounded-full bg-[var(--color-accent)] opacity-70 motion-safe:animate-ping" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-[var(--color-accent)]" />
            </span>
            24/7 Emergency Service
          </span>
          <a
            href={PHONE_HREF}
            className="btn-secondary py-2.5 px-3.5 text-sm sm:text-base"
            aria-label={`Call ${BUSINESS_NAME} at ${PHONE_DISPLAY}`}
          >
            <Icon name="phone" size={18} className="text-[var(--color-secondary)]" />
            <span className="hidden sm:inline">{PHONE_DISPLAY}</span>
            <span className="sm:hidden">Call</span>
          </a>
          <a
            href={FORM_ANCHOR}
            className="hidden sm:inline-flex btn-primary py-2.5 px-4 text-sm sm:text-base"
          >
            {PRIMARY_CTA}
          </a>
        </div>
      </div>
    </header>
  );
}
