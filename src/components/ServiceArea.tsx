import type { JSX } from "react";
import { SectionHeading } from "./SectionHeading";
import { CTAButtons } from "./CTAButtons";
import { Icon } from "./Icons";
import { SERVICE_CITIES } from "./Brand";

export function ServiceArea(): JSX.Element {
  return (
    <section id="service-area" className="bg-[var(--color-soft)] py-16 sm:py-20 lg:py-24">
      <div className="max-w-[1200px] mx-auto px-5 lg:px-8">
        <SectionHeading
          eyebrow="Where we clean"
          title="Proudly serving South King &amp; Pierce County"
          subtitle="Locally owned and based in Ravensdale — we clean carpets across the communities we call home."
        />

        <div className="mt-10 flex flex-wrap justify-center gap-2.5">
          {SERVICE_CITIES.map((city) => (
            <span
              key={city}
              className="chip bg-white ring-1 ring-[var(--color-border)] text-[var(--color-secondary)] px-4 py-2 shadow-sm"
            >
              <Icon name="mapPin" size={15} className="text-[var(--color-primary)]" />
              {city}
            </span>
          ))}
        </div>

        <p className="mt-8 text-center text-[var(--color-text-muted)]">
          Don&apos;t see your city? Give us a call — we may still be able to help.
        </p>

        <div className="mt-8 flex justify-center">
          <CTAButtons bookLabel="Book My Carpet Cleaning" align="center" />
        </div>
      </div>
    </section>
  );
}
