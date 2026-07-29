import Image from "next/image";
import type { JSX } from "react";
import { SectionHeading } from "./SectionHeading";
import { CTAButtons } from "./CTAButtons";
import { Reveal } from "./Reveal";
import { Icon, type IconName } from "./Icons";
import { SERVICES, type Service } from "./Brand";

const SERVICE_ICON: Record<Service["icon"], IconName> = {
  carpet: "home",
  commercial: "truck",
  upholstery: "sofa",
  tile: "grid",
  pressure: "droplets",
};

function ServiceCard({ service, index }: { service: Service; index: number }): JSX.Element {
  const iconName = SERVICE_ICON[service.icon];
  return (
    <Reveal delay={index * 60} className="h-full">
      <article className="group h-full flex flex-col overflow-hidden rounded-2xl bg-white ring-1 ring-[var(--color-border)] shadow-[0_4px_16px_rgba(15,64,52,0.06)] hover:shadow-[0_16px_40px_-16px_rgba(15,64,52,0.28)] transition-shadow">
        {/* Media / icon header */}
        <div className="relative h-44 bg-[var(--color-soft)] overflow-hidden">
          {service.image ? (
            <Image
              src={service.image}
              alt={service.imageAlt ?? service.name}
              fill
              sizes="(max-width: 768px) 100vw, 33vw"
              className="object-cover transition-transform duration-500 group-hover:scale-[1.04]"
            />
          ) : (
            <div className="absolute inset-0 flex items-center justify-center bg-gradient-to-br from-[var(--color-primary)] to-[var(--color-secondary)]">
              <Icon name={iconName} size={56} className="text-white/90" />
            </div>
          )}
          {service.badge && (
            <span className="absolute top-3 left-3 chip bg-[var(--color-accent)] text-[#1A1A1A] px-3 py-1 shadow">
              {service.badge}
            </span>
          )}
        </div>

        <div className="flex flex-1 flex-col p-6">
          <div className="flex items-center gap-2.5">
            <span className="grid place-items-center h-10 w-10 rounded-lg bg-[var(--color-primary)]/10 text-[var(--color-primary-dark)] shrink-0">
              <Icon name={iconName} size={22} />
            </span>
            <h3 className="text-lg font-bold text-[var(--color-secondary)] leading-snug">
              {service.name}
            </h3>
          </div>
          <p className="mt-3 text-[0.95rem] text-[var(--color-text-muted)] leading-relaxed flex-1">
            {service.copy}
          </p>
          <a
            href="#hero"
            className="mt-5 inline-flex items-center gap-1.5 font-bold text-[var(--color-primary-dark)] hover:text-[var(--color-secondary)] transition"
          >
            Book {service.icon === "commercial" ? "commercial cleaning" : "this service"}
            <Icon name="arrowRight" size={17} />
          </a>
        </div>
      </article>
    </Reveal>
  );
}

export function Services(): JSX.Element {
  return (
    <section id="services" className="bg-[var(--color-soft)] py-16 sm:py-20 lg:py-24">
      <div className="max-w-[1200px] mx-auto px-5 lg:px-8">
        <SectionHeading
          eyebrow="What we clean"
          title="Five services, one trusted local crew"
          subtitle="From the carpets your family lives on to commercial floors and exterior surfaces — all with upfront pricing and IICRC-certified technicians."
        />

        <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {SERVICES.map((service, i) => (
            <ServiceCard key={service.slug} service={service} index={i} />
          ))}
          {/* CTA cell fills the 6th grid slot on lg */}
          <Reveal
            delay={SERVICES.length * 60}
            className="h-full"
          >
            <div className="h-full flex flex-col justify-center rounded-2xl bg-[var(--color-secondary)] text-white p-7">
              <h3 className="text-xl font-bold leading-snug">
                Not sure which service you need?
              </h3>
              <p className="mt-2 text-white/80 text-[0.95rem] leading-relaxed">
                Tell us about your space and we&apos;ll recommend the right clean — with a
                straight, upfront price. No pressure, no upsells.
              </p>
              <div className="mt-5">
                <CTAButtons tone="light" bookLabel="Book Carpet Cleaning" />
              </div>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
