import type { JSX } from "react";
import { Icon } from "./Icons";
import { PHONE_DISPLAY, PHONE_HREF } from "./Brand";

interface CTAButtonsProps {
  /** Anchor the primary button scrolls to. Defaults to the hero form. */
  bookHref?: string;
  bookLabel?: string;
  /** "light" = for use on the deep-green band (light-outline call button). */
  tone?: "default" | "light";
  align?: "start" | "center";
  className?: string;
}

export function CTAButtons({
  bookHref = "#hero",
  bookLabel = "Book My Carpet Cleaning",
  tone = "default",
  align = "start",
  className = "",
}: CTAButtonsProps): JSX.Element {
  return (
    <div
      className={`flex flex-col sm:flex-row gap-3 ${
        align === "center" ? "sm:justify-center items-stretch sm:items-center" : "items-stretch sm:items-center"
      } ${className}`}
    >
      <a
        href={bookHref}
        className="btn-primary"
        aria-label={`${bookLabel} — go to booking form`}
      >
        {bookLabel}
        <Icon name="arrowRight" size={18} />
      </a>
      <a
        href={PHONE_HREF}
        className={tone === "light" ? "btn-outline-light" : "btn-secondary"}
        aria-label={`Call Tubro Carpet Cleaning at ${PHONE_DISPLAY}`}
      >
        <Icon name="phone" size={18} />
        {PHONE_DISPLAY}
      </a>
    </div>
  );
}
