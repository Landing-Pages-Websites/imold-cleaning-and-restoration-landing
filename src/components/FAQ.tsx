"use client";

import { useState, useId, type JSX } from "react";
import { SectionHeading } from "./SectionHeading";
import { Icon } from "./Icons";
import { FAQS } from "./Brand";

function Item({
  q,
  a,
  open,
  onToggle,
  idBase,
}: {
  q: string;
  a: string;
  open: boolean;
  onToggle: () => void;
  idBase: string;
}): JSX.Element {
  return (
    <div className="rounded-xl bg-white ring-1 ring-[var(--color-border)] overflow-hidden">
      <h3>
        <button
          type="button"
          onClick={onToggle}
          aria-expanded={open}
          aria-controls={`${idBase}-panel`}
          id={`${idBase}-btn`}
          className="w-full flex items-center justify-between gap-4 text-left px-5 sm:px-6 py-4 font-bold text-[var(--color-secondary)] hover:bg-[var(--color-soft)] transition"
        >
          <span>{q}</span>
          <span
            className={`shrink-0 text-[var(--color-primary-dark)] transition-transform duration-200 ${
              open ? "rotate-180" : ""
            }`}
          >
            <Icon name="chevronDown" size={22} />
          </span>
        </button>
      </h3>
      <div
        id={`${idBase}-panel`}
        role="region"
        aria-labelledby={`${idBase}-btn`}
        hidden={!open}
        className="px-5 sm:px-6 pb-5 text-[var(--color-text-muted)] leading-relaxed"
      >
        {a}
      </div>
    </div>
  );
}

export function FAQ(): JSX.Element {
  const [openIdx, setOpenIdx] = useState<number>(0);
  const uid = useId();

  return (
    <section id="faq" className="bg-white py-16 sm:py-20 lg:py-24">
      <div className="max-w-3xl mx-auto px-5 lg:px-8">
        <SectionHeading
          eyebrow="FAQ"
          title="Questions, answered"
          subtitle="The things South King & Pierce County homeowners ask us most before they book."
        />

        <div className="mt-10 space-y-3">
          {FAQS.map((item, i) => (
            <Item
              key={item.q}
              q={item.q}
              a={item.a}
              open={openIdx === i}
              onToggle={() => setOpenIdx((cur) => (cur === i ? -1 : i))}
              idBase={`${uid}-${i}`}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
