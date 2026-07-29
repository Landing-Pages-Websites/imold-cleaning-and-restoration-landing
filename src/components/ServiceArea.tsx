import type { JSX } from "react";
import { SectionHeading } from "./SectionHeading";
import { CTAButtons } from "./CTAButtons";
import { Reveal } from "./Reveal";
import { Icon } from "./Icons";
import { SERVICE_COUNTIES, SERVICE_CITIES } from "./Brand";

export function ServiceArea(): JSX.Element {
  return (
    <section
      id="service-area"
      className="bg-[var(--color-primary)] py-16 sm:py-20 lg:py-24"
    >
      <div className="max-w-[1200px] mx-auto px-5 lg:px-8">
        <SectionHeading
          eyebrow="Where we work"
          title="Proudly serving Southwest Florida"
          subtitle="Locally owned and based in Fort Myers — we respond across five counties, plus Apollo Beach and Sun City Center."
        />

        <Reveal className="mt-12">
          <div className="grid gap-3 sm:grid-cols-3 lg:grid-cols-5">
            {SERVICE_COUNTIES.map((county) => (
              <div
                key={county}
                className="flex items-center gap-2.5 rounded-xl bg-[var(--color-surface)] ring-1 ring-[var(--color-hairline)] px-4 py-3.5"
              >
                <Icon
                  name="mapPin"
                  size={20}
                  className="text-[var(--color-secondary)] shrink-0"
                />
                <span className="font-bold text-white text-sm">{county}</span>
              </div>
            ))}
          </div>
        </Reveal>

        <div className="mt-6 flex flex-wrap justify-center gap-2.5">
          {SERVICE_CITIES.map((city) => (
            <span
              key={city}
              className="chip bg-[var(--color-surface)] ring-1 ring-[var(--color-hairline)] text-white/90 px-3.5 py-1.5"
            >
              {city}
            </span>
          ))}
        </div>

        <p className="mt-8 text-center text-[var(--color-text-muted)]">
          Don&apos;t see your community? Give us a call — we may still be able to
          help.
        </p>

        <div className="mt-8 flex justify-center">
          <CTAButtons align="center" />
        </div>
      </div>
    </section>
  );
}
