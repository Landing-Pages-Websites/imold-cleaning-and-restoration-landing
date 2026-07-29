"use client";

import { useId, useRef, useState, type JSX } from "react";
import { useMegaLeadForm } from "@/hooks/useMegaLeadForm";
import { Icon } from "./Icons";
import {
  CUSTOMER_ID,
  SITE_ID,
  SOURCE_PROVIDER,
  PHONE_DISPLAY,
  PHONE_HREF,
  HEARD_ABOUT_US_OPTIONS,
  CITY_OPTIONS,
  CLEANING_TYPE_OPTIONS,
  leadIsQualified,
} from "./Brand";

interface LeadFormProps {
  variant?: "hero" | "band";
  formId: string;
  headline?: string;
  subhead?: string;
  submitLabel?: string;
}

interface FormData {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  heardAboutUs: string;
  city: string;
  cleaningType: string;
}

const initial: FormData = {
  firstName: "",
  lastName: "",
  email: "",
  phone: "",
  heardAboutUs: "",
  city: "",
  cleaningType: "",
};

type FieldKey = keyof FormData;
type FieldErrors = Partial<Record<FieldKey, string>>;

declare global {
  interface Window {
    dataLayer?: Record<string, unknown>[];
    MegaTag?: {
      trackEvent?: (
        eventName: string,
        eventData?: Record<string, unknown>
      ) => void;
      [k: string]: unknown;
    };
  }
}

const EMAIL_RE = /^[A-Za-z0-9._%+\-]+@[A-Za-z0-9.\-]+\.[A-Za-z]{2,}$/;

function validateField(key: FieldKey, value: string): string | undefined {
  switch (key) {
    case "firstName":
      return value.trim() ? undefined : "Please enter your first name.";
    case "lastName":
      return value.trim() ? undefined : "Please enter your last name.";
    case "email": {
      const v = value.trim();
      if (!v) return "Please enter your email address.";
      if (!EMAIL_RE.test(v)) return "Please enter a valid email address.";
      return undefined;
    }
    case "phone": {
      const digits = value.replace(/\D/g, "");
      if (!digits) return "Please enter your phone number.";
      if (digits.length !== 10) return "Phone must be a 10-digit number.";
      return undefined;
    }
    case "city":
      return value ? undefined : "Please select your city.";
    case "cleaningType":
      return value ? undefined : "Please select a service.";
    case "heardAboutUs":
      return undefined; // optional
  }
}

function validateAll(data: FormData): FieldErrors {
  const errors: FieldErrors = {};
  (Object.keys(data) as FieldKey[]).forEach((k) => {
    const err = validateField(k, data[k]);
    if (err) errors[k] = err;
  });
  return errors;
}

function formatPhone(raw: string): string {
  const d = raw.replace(/\D/g, "").slice(0, 10);
  if (d.length === 0) return "";
  if (d.length < 4) return `(${d}`;
  if (d.length < 7) return `(${d.slice(0, 3)}) ${d.slice(3)}`;
  return `(${d.slice(0, 3)}) ${d.slice(3, 6)}-${d.slice(6)}`;
}

const REQUIRED_ORDER: FieldKey[] = [
  "firstName",
  "lastName",
  "email",
  "phone",
  "city",
  "cleaningType",
];

export function LeadForm({
  variant = "hero",
  formId,
  headline,
  subhead,
  submitLabel = "Book My Carpet Cleaning",
}: LeadFormProps): JSX.Element {
  const { status, errorMessage, submitLead } = useMegaLeadForm({
    customerId: CUSTOMER_ID,
    siteId: SITE_ID,
    sourceProvider: SOURCE_PROVIDER,
    pagePath: "/",
  });

  const fid = useId();
  const id = (k: string) => `${k}-${fid}`;
  const errId = (k: string) => `${k}-${fid}-err`;

  const fieldRefs = useRef<Partial<Record<FieldKey, HTMLElement | null>>>({});
  const [data, setData] = useState<FormData>(initial);
  const [submitted, setSubmitted] = useState(false);
  const [errors, setErrors] = useState<FieldErrors>({});
  const [touched, setTouched] = useState<Partial<Record<FieldKey, boolean>>>({});
  const inFlightRef = useRef(false);

  const submitting = status === "submitting";
  const success = status === "success" || submitted;

  const update = <K extends FieldKey>(k: K, v: FormData[K]) => {
    setData((d) => ({ ...d, [k]: v }));
    setErrors((prev) => {
      if (!prev[k]) return prev;
      if (validateField(k, String(v))) return prev;
      const next = { ...prev };
      delete next[k];
      return next;
    });
  };

  const markTouched = (k: FieldKey, value: string) => {
    setTouched((t) => ({ ...t, [k]: true }));
    setErrors((prev) => {
      const next = { ...prev };
      const err = validateField(k, value);
      if (err) next[k] = err;
      else delete next[k];
      return next;
    });
  };

  const fireTracking = (payload: {
    firstName: string;
    lastName: string;
    email: string;
    phone: string;
    heardAboutUs: string;
    heardAboutUsLabel: string;
    city: string;
    cleaningType: string;
    cleaningTypeLabel: string;
    qualified: boolean;
    reason: string;
  }) => {
    if (typeof window === "undefined") return;
    const shared = {
      element: `form-${formId}`,
      firstName: payload.firstName,
      lastName: payload.lastName,
      email: payload.email,
      phone: payload.phone,
      heardAboutUs: payload.heardAboutUs,
      heardAboutUsLabel: payload.heardAboutUsLabel,
      city: payload.city,
      cleaningType: payload.cleaningType,
      cleaningTypeLabel: payload.cleaningTypeLabel,
      qualified: payload.qualified ? "yes" : "no",
      disqualification_reason: payload.reason,
    };

    // 1. MegaTag optimizer event — fires for EVERY submit, BEFORE dataLayer.
    if (window.MegaTag?.trackEvent) {
      try {
        window.MegaTag.trackEvent("form_submit", shared);
        if (payload.qualified) {
          window.MegaTag.trackEvent("qualified_lead", shared);
        }
      } catch {
        /* silent */
      }
    }

    // 2. GTM dataLayer — form_submission (workspace floor) + form_submit (task spec).
    window.dataLayer = window.dataLayer || [];
    const dlBase = {
      form_id: formId,
      qualified: payload.qualified ? "yes" : "no",
      disqualification_reason: payload.reason,
    };
    window.dataLayer.push({ event: "form_submission", ...dlBase });
    window.dataLayer.push({ event: "form_submit", ...dlBase });
    if (payload.qualified) {
      window.dataLayer.push({ event: "qualified_lead", form_id: formId });
    }
  };

  const handleClick = async () => {
    if (submitting || success || inFlightRef.current) return;
    const allErrors = validateAll(data);
    if (Object.keys(allErrors).length > 0) {
      setErrors(allErrors);
      setTouched(
        Object.fromEntries(
          (Object.keys(data) as FieldKey[]).map((k) => [k, true])
        )
      );
      const firstBad = REQUIRED_ORDER.find((k) => allErrors[k]);
      if (firstBad) fieldRefs.current[firstBad]?.focus();
      return;
    }
    inFlightRef.current = true;

    const firstName = data.firstName.trim();
    const lastName = data.lastName.trim();
    const email = data.email.trim();
    const phone = data.phone.replace(/\D/g, "");
    const { city, cleaningType } = data;
    const heardAboutUs = data.heardAboutUs;
    const heardAboutUsLabel =
      HEARD_ABOUT_US_OPTIONS.find((o) => o.value === heardAboutUs)?.label ?? "";
    const cleaningTypeLabel =
      CLEANING_TYPE_OPTIONS.find((o) => o.value === cleaningType)?.label ??
      cleaningType;

    const { qualified, reason } = leadIsQualified({ city, cleaningType });

    try {
      // ALL leads submit (qualified or not). Hook requires firstName + email.
      await submitLead({
        firstName,
        lastName,
        email,
        phone,
        heardAboutUs,
        heardAboutUsLabel,
        city,
        cleaningType,
        cleaningTypeLabel,
        qualified: qualified ? "yes" : "no",
        disqualification_reason: reason,
      });

      fireTracking({
        firstName,
        lastName,
        email,
        phone,
        heardAboutUs,
        heardAboutUsLabel,
        city,
        cleaningType,
        cleaningTypeLabel,
        qualified,
        reason,
      });

      setSubmitted(true);
    } finally {
      inFlightRef.current = false;
    }
  };

  const showErr = (k: FieldKey) => Boolean(touched[k] && errors[k]);
  const inputCls = (k: FieldKey) =>
    `lp-input ${showErr(k) ? "lp-input-error" : ""}`;

  const shellCls =
    variant === "hero"
      ? "bg-white shadow-[0_20px_60px_-20px_rgba(15,64,52,0.35)] ring-1 ring-[var(--color-border)]"
      : "bg-white shadow-[0_12px_40px_-16px_rgba(15,64,52,0.4)] ring-1 ring-[var(--color-border)]";

  if (success) {
    const wasQualified = leadIsQualified({
      city: data.city,
      cleaningType: data.cleaningType,
    }).qualified;
    return (
      <div className={`rounded-2xl p-8 sm:p-10 ${shellCls}`}>
        <div className="flex flex-col items-center text-center">
          <div className="w-16 h-16 rounded-full bg-[var(--color-primary)]/12 text-[var(--color-primary-dark)] flex items-center justify-center mb-4">
            <Icon name="check" size={34} strokeWidth={2.5} />
          </div>
          <h3 className="text-2xl font-extrabold text-[var(--color-secondary)] mb-2">
            Thanks{data.firstName ? `, ${data.firstName}` : ""}!
          </h3>
          <p className="text-[var(--color-text-muted)] max-w-sm">
            {wasQualified
              ? "We've got your request. A Tubro team member will call you shortly to confirm your details and lock in a time — often same or next day."
              : "We've got your request and someone from our team will reach out. If your area or service falls outside what we cover, we'll point you in the right direction."}{" "}
            Prefer to talk now? Call{" "}
            <a
              className="font-semibold text-[var(--color-link)] underline"
              href={PHONE_HREF}
            >
              {PHONE_DISPLAY}
            </a>
            .
          </p>
        </div>
      </div>
    );
  }

  return (
    <form
      onSubmit={(e) => e.preventDefault()}
      noValidate
      className={`rounded-2xl p-6 sm:p-7 ${shellCls}`}
      aria-describedby={
        status === "error" && errorMessage ? errId("form") : undefined
      }
    >
      {(headline || subhead) && (
        <div className="mb-5">
          {headline && (
            <h3 className="text-xl sm:text-2xl font-extrabold text-[var(--color-secondary)] leading-tight">
              {headline}
            </h3>
          )}
          {subhead && (
            <p className="mt-1.5 text-sm text-[var(--color-text-muted)]">
              {subhead}
            </p>
          )}
        </div>
      )}

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <TextField
          label="First name"
          k="firstName"
          type="text"
          autoComplete="given-name"
          value={data.firstName}
          error={showErr("firstName") ? errors.firstName : undefined}
          disabled={submitting}
          id={id("firstName")}
          errId={errId("firstName")}
          inputCls={inputCls("firstName")}
          onChange={(v) => update("firstName", v)}
          onBlur={(v) => markTouched("firstName", v)}
          refCb={(el) => (fieldRefs.current.firstName = el)}
        />
        <TextField
          label="Last name"
          k="lastName"
          type="text"
          autoComplete="family-name"
          value={data.lastName}
          error={showErr("lastName") ? errors.lastName : undefined}
          disabled={submitting}
          id={id("lastName")}
          errId={errId("lastName")}
          inputCls={inputCls("lastName")}
          onChange={(v) => update("lastName", v)}
          onBlur={(v) => markTouched("lastName", v)}
          refCb={(el) => (fieldRefs.current.lastName = el)}
        />
      </div>

      <div className="mt-4">
        <TextField
          label="Email"
          k="email"
          type="email"
          autoComplete="email"
          pattern="[A-Za-z0-9._%+\-]+@[A-Za-z0-9.\-]+\.[A-Za-z]{2,}"
          value={data.email}
          error={showErr("email") ? errors.email : undefined}
          disabled={submitting}
          id={id("email")}
          errId={errId("email")}
          inputCls={inputCls("email")}
          onChange={(v) => update("email", v)}
          onBlur={(v) => markTouched("email", v)}
          refCb={(el) => (fieldRefs.current.email = el)}
        />
      </div>

      <div className="mt-4">
        <TextField
          label="Phone"
          k="phone"
          type="tel"
          inputMode="numeric"
          autoComplete="tel"
          placeholder="(253) 499-1028"
          value={data.phone}
          error={showErr("phone") ? errors.phone : undefined}
          disabled={submitting}
          id={id("phone")}
          errId={errId("phone")}
          inputCls={inputCls("phone")}
          onChange={(v) => update("phone", formatPhone(v))}
          onBlur={(v) => markTouched("phone", v)}
          refCb={(el) => (fieldRefs.current.phone = el)}
        />
      </div>

      <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 gap-4">
        <SelectField
          label="Your city"
          k="city"
          required
          options={CITY_OPTIONS}
          value={data.city}
          error={showErr("city") ? errors.city : undefined}
          disabled={submitting}
          id={id("city")}
          errId={errId("city")}
          inputCls={inputCls("city")}
          onChange={(v) => {
            update("city", v);
            markTouched("city", v);
          }}
          refCb={(el) => (fieldRefs.current.city = el)}
        />
        <SelectField
          label="Service needed"
          k="cleaningType"
          required
          options={CLEANING_TYPE_OPTIONS}
          value={data.cleaningType}
          error={showErr("cleaningType") ? errors.cleaningType : undefined}
          disabled={submitting}
          id={id("cleaningType")}
          errId={errId("cleaningType")}
          inputCls={inputCls("cleaningType")}
          onChange={(v) => {
            update("cleaningType", v);
            markTouched("cleaningType", v);
          }}
          refCb={(el) => (fieldRefs.current.cleaningType = el)}
        />
      </div>

      <div className="mt-4">
        <SelectField
          label="How did you hear about us?"
          k="heardAboutUs"
          optional
          options={HEARD_ABOUT_US_OPTIONS}
          value={data.heardAboutUs}
          disabled={submitting}
          id={id("heardAboutUs")}
          errId={errId("heardAboutUs")}
          inputCls={inputCls("heardAboutUs")}
          onChange={(v) => update("heardAboutUs", v)}
          refCb={(el) => (fieldRefs.current.heardAboutUs = el)}
        />
      </div>

      {errorMessage && status === "error" && (
        <div
          id={errId("form")}
          role="alert"
          aria-live="assertive"
          className="mt-4 text-sm font-medium text-[var(--color-error)]"
        >
          {errorMessage}
        </div>
      )}

      <button
        type="button"
        onClick={handleClick}
        disabled={submitting || success}
        className="btn-primary w-full mt-5 py-3.5 text-base"
      >
        {submitting ? "Sending…" : submitLabel}
      </button>

      <p className="mt-3 flex items-center justify-center gap-1.5 text-xs text-[var(--color-text-muted)] text-center">
        <Icon name="shieldCheck" size={15} className="text-[var(--color-primary)]" />
        Upfront pricing. No spam — we never share your info.
      </p>
    </form>
  );
}

// ─── Field subcomponents ───
interface BaseFieldProps {
  label: string;
  k: string;
  value: string;
  error?: string;
  disabled?: boolean;
  id: string;
  errId: string;
  inputCls: string;
  onChange: (v: string) => void;
  refCb: (el: HTMLElement | null) => void;
}

interface TextFieldProps extends BaseFieldProps {
  type: "text" | "email" | "tel";
  autoComplete?: string;
  inputMode?: "numeric" | "text";
  pattern?: string;
  placeholder?: string;
  onBlur: (v: string) => void;
}

function TextField(props: TextFieldProps): JSX.Element {
  const {
    label,
    value,
    error,
    disabled,
    id,
    errId,
    inputCls,
    onChange,
    onBlur,
    refCb,
    type,
    autoComplete,
    inputMode,
    pattern,
    placeholder,
  } = props;
  return (
    <div>
      <label htmlFor={id} className="lp-label">
        {label} <span className="text-[var(--color-error)]">*</span>
      </label>
      <input
        ref={(el) => refCb(el)}
        id={id}
        name={props.k}
        type={type}
        autoComplete={autoComplete}
        inputMode={inputMode}
        pattern={pattern}
        placeholder={placeholder}
        className={inputCls}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        onBlur={(e) => onBlur(e.target.value)}
        disabled={disabled}
        aria-invalid={error ? true : undefined}
        aria-describedby={error ? errId : undefined}
      />
      {error && (
        <p id={errId} role="alert" aria-live="polite" className="lp-field-error">
          {error}
        </p>
      )}
    </div>
  );
}

interface SelectFieldProps extends BaseFieldProps {
  options: { value: string; label: string }[];
  required?: boolean;
  optional?: boolean;
}

function SelectField(props: SelectFieldProps): JSX.Element {
  const {
    label,
    k,
    value,
    error,
    disabled,
    id,
    errId,
    inputCls,
    onChange,
    refCb,
    options,
    required,
    optional,
  } = props;
  return (
    <div>
      <label htmlFor={id} className="lp-label">
        {label}{" "}
        {required && <span className="text-[var(--color-error)]">*</span>}
        {optional && (
          <span className="font-normal text-[var(--color-text-muted)]">
            (optional)
          </span>
        )}
      </label>
      <div className="relative">
        <select
          ref={(el) => refCb(el)}
          id={id}
          name={k}
          disabled={disabled}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className={`${inputCls} appearance-none pr-10 ${
            !value ? "text-[var(--color-text-muted)]" : ""
          }`}
          aria-invalid={error ? true : undefined}
          aria-describedby={error ? errId : undefined}
        >
          {options.map((opt) => (
            <option
              key={opt.value || "blank"}
              value={opt.value}
              disabled={opt.value === ""}
            >
              {opt.label}
            </option>
          ))}
        </select>
        <span className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-3 text-[var(--color-text-muted)]">
          <Icon name="chevronDown" size={18} />
        </span>
      </div>
      {error && (
        <p id={errId} role="alert" aria-live="polite" className="lp-field-error">
          {error}
        </p>
      )}
    </div>
  );
}
