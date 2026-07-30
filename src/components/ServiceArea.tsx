import Image from "next/image";
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
          tone="warm"
        />

        <Reveal className="mt-12">
          <figure className="group relative overflow-hidden rounded-3xl ring-1 ring-[var(--color-warm)]/25 shadow-[0_30px_70px_-40px_rgba(0,0,0,0.85)]">
            <div className="relative aspect-[16/7] w-full">
              <Image
                src="/images/swfl-aerial.jpg"
                alt="Golden-hour aerial view of a Southwest Florida coastal waterway neighborhood lined with palms"
                fill
                sizes="(max-width: 1200px) 100vw, 1136px"
                className="object-cover object-center transition-transform duration-500 ease-out group-hover:scale-[1.03] motion-reduce:transform-none"
              />
              {/* Navy scrim so the caption stays legible over the bright image */}
              <div className="absolute inset-0 bg-gradient-to-t from-[var(--color-primary)] via-[var(--color-primary)]/10 to-transparent" />
              {/* Warm inner edge to tie into the accent system */}
              <div className="pointer-events-none absolute inset-0 rounded-3xl ring-1 ring-inset ring-[var(--color-warm-soft)]" />
            </div>
            <figcaption className="absolute bottom-4 left-4 sm:bottom-5 sm:left-5 inline-flex items-center gap-2.5 rounded-full bg-[var(--color-primary)]/80 backdrop-blur ring-1 ring-[var(--color-warm)]/40 px-4 py-2">
              <Icon
                name="mapPin"
                size={18}
                className="text-[var(--color-warm)] shrink-0"
              />
              <span className="text-sm font-semibold text-white">
                Based in Fort Myers · serving all of Southwest Florida
              </span>
            </figcaption>
          </figure>
        </Reveal>

        <Reveal className="mt-8">
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
