import Image from "next/image";
import type { JSX } from "react";
import { Icon, Stars, type IconName } from "./Icons";
import {
  RATING,
  REVIEW_COUNT,
  YEARS_IN_BUSINESS,
  PROJECTS_PER_YEAR,
} from "./Brand";

interface TrustItem {
  icon: IconName;
  title: string;
  sub: string;
}

const ITEMS: TrustItem[] = [
  {
    icon: "clock",
    title: `${YEARS_IN_BUSINESS} years`,
    sub: "Locally owned, not a franchise",
  },
  {
    icon: "award",
    title: "Dual state-licensed",
    sub: "Mold Remediator & General Contractor",
  },
  {
    icon: "shieldCheck",
    title: "IICRC-certified",
    sub: "Water damage & mold remediation",
  },
  {
    icon: "truck",
    title: `${PROJECTS_PER_YEAR} projects`,
    sub: "Completed every year",
  },
];

export function StatsBar(): JSX.Element {
  return (
    <section
      id="trust-bar"
      aria-label="Trust and credentials"
      className="bg-[var(--color-surface)] border-y border-[var(--color-hairline)]"
    >
      <div className="max-w-[1200px] mx-auto px-5 lg:px-8 py-5 sm:py-6">
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-x-6 gap-y-5 items-center lg:divide-x divide-[var(--color-hairline)]">
          {/* Google rating */}
          <div className="flex items-center gap-3 lg:pr-6 col-span-2 md:col-span-1">
            <Image
              src="/images/googlelogo.svg"
              alt="Google"
              width={26}
              height={26}
              className="h-6 w-6 shrink-0"
            />
            <div>
              <div className="flex items-center gap-1.5">
                <Stars size={15} />
                <span className="font-extrabold text-white">{RATING}</span>
              </div>
              <div className="text-xs text-[var(--color-text-muted)]">
                {REVIEW_COUNT} five-star reviews
              </div>
            </div>
          </div>

          {ITEMS.map((item) => (
            <div key={item.title} className="flex items-center gap-2.5 lg:px-6">
              <span className="shrink-0 text-[var(--color-secondary)]">
                <Icon name={item.icon} size={26} />
              </span>
              <div>
                <div className="text-sm font-bold text-white leading-tight">
                  {item.title}
                </div>
                <div className="text-xs text-[var(--color-text-muted)] leading-tight">
                  {item.sub}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
