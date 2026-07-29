"use client";

import Image from "next/image";
import { useEffect, useState, type JSX } from "react";
import { Icon } from "./Icons";
import { BUSINESS_NAME, LOGO_DARK, PHONE_DISPLAY, PHONE_HREF } from "./Brand";

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
      className={`sticky top-0 z-50 bg-white transition-shadow ${
        scrolled
          ? "shadow-[0_2px_16px_-6px_rgba(15,64,52,0.25)] border-b border-[var(--color-border)]"
          : "border-b border-transparent"
      }`}
    >
      <div className="max-w-[1200px] mx-auto px-5 lg:px-8 h-16 sm:h-[4.5rem] flex items-center justify-between gap-4">
        <a
          href="#hero"
          aria-label={`${BUSINESS_NAME} — home`}
          className="flex items-center shrink-0"
        >
          <Image
            src={LOGO_DARK}
            alt={BUSINESS_NAME}
            width={220}
            height={64}
            className="h-8 sm:h-12 w-auto"
            priority
          />
        </a>

        <div className="flex items-center gap-2 sm:gap-3">
          <a
            href={PHONE_HREF}
            className="btn-secondary py-2.5 px-4 text-sm sm:text-base"
            aria-label={`Call ${BUSINESS_NAME} at ${PHONE_DISPLAY}`}
          >
            <Icon name="phone" size={18} className="text-[var(--color-primary)]" />
            <span className="hidden sm:inline">{PHONE_DISPLAY}</span>
            <span className="sm:hidden">Call</span>
          </a>
          <a href="#hero" className="btn-primary py-2.5 px-4 text-sm sm:text-base">
            Book Now
          </a>
        </div>
      </div>
    </header>
  );
}
