"use client";

import { useEffect, useState, type JSX } from "react";

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
      { rootMargin: "0px 0px -20% 0px" },
    );
    observer.observe(finalCta);
    return () => observer.disconnect();
  }, []);

  const desktopVisible = visible && !finalInView;

  return (
    <>
      {/* Mobile bottom bar */}
      <div
        className={`lg:hidden fixed inset-x-0 bottom-0 z-50 transition-transform duration-300 ${
          visible ? "translate-y-0" : "translate-y-full"
        }`}
      >
        <div className="bg-white border-t border-[var(--color-border)] shadow-[0_-6px_24px_-8px_rgba(15,64,52,0.3)] px-3 py-2.5 pb-[max(0.625rem,env(safe-area-inset-bottom))]">
          <a href="#hero" className="btn-primary w-full py-3" aria-label="Book my carpet cleaning">
            Book Now
          </a>
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
          href="#hero"
          className="btn-primary rounded-full px-7 py-3.5 shadow-[0_12px_32px_-8px_rgba(15,64,52,0.5)]"
          aria-label="Book my carpet cleaning"
        >
          Book My Carpet Cleaning
        </a>
      </div>
    </>
  );
}
