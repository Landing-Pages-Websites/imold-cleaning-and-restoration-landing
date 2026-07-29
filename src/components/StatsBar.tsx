import Image from "next/image";
import type { JSX } from "react";
import { Icon, Stars } from "./Icons";
import { RATING, REVIEW_COUNT, ESTABLISHED } from "./Brand";

interface TrustItem {
  icon?: "shieldCheck" | "badgeCheck" | "clock";
  title: string;
  sub: string;
}

const ITEMS: TrustItem[] = [
  { icon: "shieldCheck", title: "IICRC Certified", sub: "Trained technicians" },
  { icon: "badgeCheck", title: "Licensed, Bonded & Insured", sub: "Fully covered work" },
  { icon: "shieldCheck", title: "100% Satisfaction Guarantee", sub: "We stand behind it" },
  { icon: "clock", title: `Serving since ${ESTABLISHED}`, sub: "Local & established" },
];

export function StatsBar(): JSX.Element {
  return (
    <section
      id="trust-bar"
      aria-label="Trust and credentials"
      className="bg-white border-b border-[var(--color-border)]"
    >
      <div className="max-w-[1200px] mx-auto px-5 lg:px-8 py-5 sm:py-6">
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-x-6 gap-y-5 items-center divide-y md:divide-y-0 lg:divide-x divide-[var(--color-border)]">
          {/* Rating + IICRC badge */}
          <div className="flex items-center gap-3 lg:pr-6">
            <Image
              src="/images/iicrc-badge.png"
              alt="IICRC certified"
              width={52}
              height={52}
              className="h-12 w-auto shrink-0"
            />
            <div>
              <div className="flex items-center gap-1.5">
                <Stars size={16} />
                <span className="font-extrabold text-[var(--color-secondary)]">
                  {RATING}
                </span>
              </div>
              <div className="text-xs text-[var(--color-text-muted)]">
                {REVIEW_COUNT} Google reviews
              </div>
            </div>
          </div>

          {ITEMS.map((item) => (
            <div key={item.title} className="flex items-center gap-2.5 lg:px-6 pt-4 md:pt-0">
              {item.icon && (
                <span className="shrink-0 text-[var(--color-primary)]">
                  <Icon name={item.icon} size={26} />
                </span>
              )}
              <div>
                <div className="text-sm font-bold text-[var(--color-secondary)] leading-tight">
                  {item.title}
                </div>
                <div className="text-xs text-[var(--color-text-muted)]">{item.sub}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
