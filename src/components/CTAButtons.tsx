import type { JSX } from "react";
import { Icon } from "./Icons";
import { BUSINESS_NAME, PHONE_DISPLAY, PHONE_HREF, PRIMARY_CTA, FORM_ANCHOR } from "./Brand";

interface CTAButtonsProps {
  /** Anchor the primary button scrolls to. Defaults to the hero form. */
  bookHref?: string;
  bookLabel?: string;
  align?: "start" | "center";
  className?: string;
}

export function CTAButtons({
  bookHref = FORM_ANCHOR,
  bookLabel = PRIMARY_CTA,
  align = "start",
  className = "",
}: CTAButtonsProps): JSX.Element {
  return (
    <div
      className={`flex flex-col sm:flex-row gap-3 ${
        align === "center"
          ? "sm:justify-center items-stretch sm:items-center"
          : "items-stretch sm:items-center"
      } ${className}`}
    >
      <a
        href={bookHref}
        className="btn-primary"
        aria-label={`${bookLabel} — go to the inspection request form`}
      >
        {bookLabel}
        <Icon name="arrowRight" size={18} />
      </a>
      <a
        href={PHONE_HREF}
        className="btn-secondary"
        aria-label={`Call ${BUSINESS_NAME} at ${PHONE_DISPLAY}`}
      >
        <Icon name="phone" size={18} className="text-[var(--color-secondary)]" />
        Call {PHONE_DISPLAY}
      </a>
    </div>
  );
}
