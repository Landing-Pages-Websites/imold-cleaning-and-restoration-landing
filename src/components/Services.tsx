import Image from "next/image";
import type { JSX } from "react";
import { SectionHeading } from "./SectionHeading";
import { CTAButtons } from "./CTAButtons";
import { Reveal } from "./Reveal";
import { Icon, type IconName } from "./Icons";
import { SERVICES, type Service } from "./Brand";

const SERVICE_ICON: Record<Service["icon"], IconName> = {
  water: "droplets",
  mold: "wind",
  fire: "flame",
};

function ServiceCard({
  service,
  index,
}: {
  service: Service;
  index: number;
}): JSX.Element {
  const iconName = SERVICE_ICON[service.icon];
  return (
    <Reveal delay={index * 80} className="h-full">
      <article className="group h-full flex flex-col overflow-hidden rounded-2xl bg-[var(--color-surface)] ring-1 ring-[var(--color-hairline)] shadow-[0_20px_50px_-30px_rgba(0,0,0,0.8)] transition-transform duration-300 hover:-translate-y-1">
        {/* Media */}
        <div className="relative h-48 overflow-hidden">
          <Image
            src={service.image}
            alt={service.imageAlt}
            fill
            sizes="(max-width: 768px) 100vw, 33vw"
            className="object-cover transition-transform duration-500 group-hover:scale-[1.05]"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[var(--color-surface)] via-[var(--color-surface)]/20 to-transparent" />
          {service.badge && (
            <span className="absolute top-3 left-3 chip bg-[var(--color-accent)] text-[#06131d] px-3 py-1.5 shadow-lg">
              {service.badge}
            </span>
          )}
          <span className="absolute -bottom-5 left-6 grid place-items-center h-12 w-12 rounded-xl bg-[var(--color-secondary)] text-[#06131d] shadow-lg ring-4 ring-[var(--color-surface)]">
            <Icon name={iconName} size={24} />
          </span>
        </div>

        <div className="flex flex-1 flex-col p-6 pt-8">
          <h3 className="text-xl font-bold text-white leading-snug">
            {service.name}
          </h3>
          <p className="mt-3 text-[0.95rem] text-[var(--color-text-muted)] leading-relaxed">
            {service.copy}
          </p>
          <ul className="mt-5 space-y-2.5 border-t border-[var(--color-hairline)] pt-5">
            {service.bullets.map((b) => (
              <li key={b} className="flex items-start gap-2.5 text-sm text-white/90">
                <Icon
                  name="check"
                  size={18}
                  strokeWidth={2.5}
                  className="mt-0.5 text-[var(--color-accent)] shrink-0"
                />
                {b}
              </li>
            ))}
          </ul>
        </div>
      </article>
    </Reveal>
  );
}

export function Services(): JSX.Element {
  return (
    <section id="services" className="bg-[var(--color-primary)] py-16 sm:py-20 lg:py-24">
      <div className="max-w-[1200px] mx-auto px-5 lg:px-8">
        <SectionHeading
          eyebrow="What we do"
          title="One licensed team for every kind of damage"
          subtitle="Water, mold, or fire — we handle the emergency, remediate the problem, and rebuild what's damaged, all under one roof."
        />

        <div className="mt-14 grid gap-6 md:grid-cols-3">
          {SERVICES.map((service, i) => (
            <ServiceCard key={service.slug} service={service} index={i} />
          ))}
        </div>

        <div className="mt-12 flex justify-center">
          <CTAButtons align="center" />
        </div>
      </div>
    </section>
  );
}
