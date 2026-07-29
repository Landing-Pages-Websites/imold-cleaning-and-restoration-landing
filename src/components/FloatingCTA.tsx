"use client";

import { useEffect, useState, type JSX } from "react";
import { Icon } from "./Icons";
import {
  BUSINESS_NAME,
  PHONE_DISPLAY,
  PHONE_HREF,
  FORM_ANCHOR,
} from "./Brand";

const HERO_SCROLL_THRESHOLD = 640;

export function FloatingCTA(): JSX.Element {
  const [visible, setVisible] = useState(false);
  const [finalInView, setFinalInView] = useState(false);

  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > HERO_SCROLL_THRESHOLD);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const finalCta = document.getElementById("final-cta");
    if (!finalCta) return;
    const observer = new IntersectionObserver(
      ([entry]) => setFinalInView(entry.isIntersecting),
      { rootMargin: "0px 0px -20% 0px" }
    );
    observer.observe(finalCta);
    return () => observer.disconnect();
  }, []);

  const desktopVisible = visible && !finalInView;

  return (
    <>
      {/* Mobile bottom bar — Call + Free Inspection */}
      <div
        className={`lg:hidden fixed inset-x-0 bottom-0 z-50 transition-transform duration-300 ${
          visible ? "translate-y-0" : "translate-y-full"
        }`}
      >
        <div className="bg-[var(--color-surface)] border-t border-[var(--color-hairline)] shadow-[0_-8px_30px_-8px_rgba(0,0,0,0.7)] px-3 py-2.5 pb-[max(0.625rem,env(safe-area-inset-bottom))]">
          <div className="flex gap-2.5">
            <a
              href={PHONE_HREF}
              className="btn-secondary flex-1 py-3"
              aria-label={`Call ${BUSINESS_NAME} at ${PHONE_DISPLAY}`}
            >
              <Icon name="phone" size={18} className="text-[var(--color-secondary)]" />
              Call
            </a>
            <a
              href={FORM_ANCHOR}
              className="btn-primary flex-1 py-3"
              aria-label="Get my free inspection"
            >
              Free Inspection
            </a>
          </div>
        </div>
      </div>

      {/* Desktop floating pill */}
      <div
        className={`hidden lg:flex fixed bottom-6 right-6 z-50 transition-all duration-300 ${
          desktopVisible
            ? "translate-y-0 opacity-100"
            : "translate-y-4 opacity-0 pointer-events-none"
        }`}
      >
        <a
          href={FORM_ANCHOR}
          className="btn-primary rounded-full px-7 py-3.5 shadow-[0_16px_40px_-10px_rgba(78,168,207,0.7)]"
          aria-label="Get my free inspection"
        >
          Get My Free Inspection
        </a>
      </div>
    </>
  );
}
