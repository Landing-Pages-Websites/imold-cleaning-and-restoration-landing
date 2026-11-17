"use client";

import { useId, useRef, useState, type JSX, type KeyboardEvent } from "react";
import { useMegaLeadForm } from "@/hooks/useMegaLeadForm";
import {
  EMAIL_ERROR,
  EMAIL_MAX_LENGTH,
  EMAIL_PATTERN,
  PHONE_ERROR,
  PHONE_PATTERN,
  formatPhone,
  isValidEmail,
  isValidPhone,
  normalizeEmail,
  phoneDigits,
} from "@/lib/fields";
import { Icon } from "./Icons";
import {
  CUSTOMER_ID,
  SITE_ID,
  SOURCE_PROVIDER,
  PHONE_DISPLAY,
  PHONE_HREF,
  OWNER_AUTHORIZED_OPTIONS,
  leadIsQualified,
  type Option,
} from "./Brand";

interface LeadFormProps {
  variant?: "hero" | "band";
  formId: string;
  headline?: string;
  subhead?: string;
  submitLabel?: string;
}

// React state uses camelCase keys. The submitted form_data keeps the existing
// single legacy keys (firstName, lastName, propertyAddress, ownerOrAuthorized);
// email, phone and the two new questions match their DOM names exactly. One key
// per field — no duplicate aliases.
interface FormData {
  firstName: string;
  lastName: string;
  propertyAddress: string;
  email: string;
  phone: string;
  ownerOrAuthorized: string; // "" | "yes" | "no"
  visibleMold: string; // "" | "yes" | "no"
  visibleWaterDamage: string; // "" | "yes" | "no"
}

type FieldKey = keyof FormData;

// DOM `name` attributes use the snake_case lead-form spec keys.
const NAME_ATTR: Record<FieldKey, string> = {
  firstName: "first_name",
  lastName: "last_name",
  propertyAddress: "property_address",
  email: "email",
  phone: "phone",
  ownerOrAuthorized: "owner_or_authorized",
  visibleMold: "visible_mold",
  visibleWaterDamage: "visible_water_damage",
};

const initial: FormData = {
  firstName: "",
  lastName: "",
  propertyAddress: "",
  email: "",
  phone: "",
  ownerOrAuthorized: "",
  visibleMold: "",
  visibleWaterDamage: "",
};

const YES_NO_OPTIONS: Option[] = [
  { value: "", label: "Select one…" },
  { value: "yes", label: "Yes" },
  { value: "no", label: "No" },
];

const TEXT_MAX_LENGTH = 200;
// Side-by-side select cells (lg+): label/control/error share subgrid rows so both
// controls line up even when only one label wraps.
const PAIRED_SELECT_CLS =
  "lg:row-span-3 lg:grid lg:grid-rows-subgrid lg:[&>label]:self-end";

const isDeclaredOption = (options: Option[], value: string): boolean =>
  value !== "" && options.some((opt) => opt.value === value);

const textError = (value: string, emptyMessage: string): string | undefined => {
  const v = value.trim();
  if (!v) return emptyMessage;
  if (v.length > TEXT_MAX_LENGTH) return `Please keep this under ${TEXT_MAX_LENGTH} characters.`;
  return undefined;
};

type FieldErrors = Partial<Record<FieldKey, string>>;

declare global {
  interface Window {
    dataLayer?: Record<string, unknown>[];
    fbq?: (...args: unknown[]) => void;
    MegaTag?: {
      trackEvent?: (
        eventName: string,
        eventData?: { elementId: string; formData: Record<string, string> }
      ) => void;
      [k: string]: unknown;
    };
  }
}

// The single validator (landing-page-forms §4c): canonical email/phone rules
// from lib/fields, declared options for selects, trimmed 1–200 chars for text.
function validateField(key: FieldKey, value: string): string | undefined {
  switch (key) {
    case "firstName":
      return textError(value, "Please enter your first name.");
    case "lastName":
      return textError(value, "Please enter your last name.");
    case "propertyAddress":
      return textError(value, "Please enter the property address.");
    case "email":
      if (!value.trim()) return "Please enter your email address.";
      return isValidEmail(value) ? undefined : EMAIL_ERROR;
    case "phone":
      if (!value.trim()) return "Please enter your phone number.";
      return isValidPhone(value) ? undefined : PHONE_ERROR;
    case "ownerOrAuthorized":
      return isDeclaredOption(OWNER_AUTHORIZED_OPTIONS, value) ? undefined : "Please select an option.";
    case "visibleMold":
    case "visibleWaterDamage":
      return isDeclaredOption(YES_NO_OPTIONS, value) ? undefined : "Please select an option.";
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

/** The lead form_data: one normalized key per control plus qualification metadata. */
function buildLeadData(data: FormData): Record<string, string> {
  const { qualified, reason } = leadIsQualified({ ownerOrAuthorized: data.ownerOrAuthorized });
  return {
    firstName: data.firstName.trim(),
    lastName: data.lastName.trim(),
    propertyAddress: data.propertyAddress.trim(),
    email: normalizeEmail(data.email),
    phone: phoneDigits(data.phone),
    ownerOrAuthorized: data.ownerOrAuthorized,
    visible_mold: data.visibleMold,
    visible_water_damage: data.visibleWaterDamage,
    qualified: qualified ? "yes" : "no",
    disqualification_reason: reason,
  };
}

/** Each tracking destination is isolated: one throwing tracker never blocks the others. */
function safely(send: () => void): void {
  try {
    send();
  } catch {
    // Tracking failures must not undo an accepted lead.
  }
}

/** Fires the existing success-path events. Runs only after the server accepted the lead. */
function fireTracking(formId: string, leadData: Record<string, string>): void {
  const qualified = leadData.qualified === "yes";
  const envelope = { elementId: `form-${formId}`, formData: leadData };
  const dlBase = { form_id: formId, qualified: leadData.qualified, disqualification_reason: leadData.disqualification_reason };

  // 1. MegaTag optimizer event — every accepted lead, BEFORE dataLayer.
  safely(() => window.MegaTag?.trackEvent?.("form_submit", envelope));
  if (qualified) safely(() => window.MegaTag?.trackEvent?.("qualified_lead", envelope));

  // 2. GTM dataLayer — form_submission (workspace floor) + form_submit (task spec).
  window.dataLayer = window.dataLayer || [];
  const dataLayer = window.dataLayer;
  safely(() => dataLayer.push({ event: "form_submission", ...dlBase }));
  safely(() => dataLayer.push({ event: "form_submit", ...dlBase }));
  if (qualified) safely(() => dataLayer.push({ event: "qualified_lead", form_id: formId }));

  // 3. Meta Pixel Lead event.
  safely(() => window.fbq?.("track", "Lead", { content_name: formId, qualified }));
}

/** Enter keys that keep their native meaning (landing-page-forms §6). */
const NATIVE_ENTER_TAGS = new Set(["TEXTAREA", "SELECT", "BUTTON", "A"]);

const REQUIRED_ORDER: FieldKey[] = [
  "firstName",
  "lastName",
  "propertyAddress",
  "email",
  "phone",
  "ownerOrAuthorized",
  "visibleMold",
  "visibleWaterDamage",
];

export function LeadForm({
  variant = "hero",
  formId,
  headline,
  subhead,
  submitLabel = "Get My Free Inspection",
}: LeadFormProps): JSX.Element {
  const { status, submitLead } = useMegaLeadForm({
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
  const submitFailed = status === "error";

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

  // §7: synchronous latch, response-gated success. The latch stays set after an
  // accepted lead (one lead per page view) and is released on any failure.
  const performSubmit = async (): Promise<void> => {
    if (inFlightRef.current || submitted) return;
    inFlightRef.current = true;
    const leadData = buildLeadData(data);
    const accepted = await submitLead(leadData).then(
      (result) => result?.ok === true,
      () => false
    );
    if (!accepted) {
      // Fail closed: keep the form and its values; the inline alert offers retry or a call.
      inFlightRef.current = false;
      return;
    }
    setSubmitted(true);
    fireTracking(formId, leadData);
  };

  // §6: validate first, then send directly. Never dispatches a native submit.
  const handleClick = (): void => {
    if (inFlightRef.current) return;
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
    void performSubmit();
  };

  // Stops implicit submission on keydown, before a native submit (and the
  // optimizer's capture listener) can see it.
  const handleKeyDown = (e: KeyboardEvent<HTMLFormElement>): void => {
    if (e.key !== "Enter" || e.nativeEvent.isComposing) return;
    if (NATIVE_ENTER_TAGS.has((e.target as HTMLElement).tagName)) return;
    e.preventDefault();
    handleClick();
  };

  const showErr = (k: FieldKey) => Boolean(touched[k] && errors[k]);
  const inputCls = (k: FieldKey) =>
    `lp-input ${showErr(k) ? "lp-input-error" : ""}`;

  const shellCls =
    "bg-white shadow-[0_24px_70px_-24px_rgba(0,0,0,0.6)] ring-1 ring-black/5";

  if (submitted) {
    const wasQualified = leadIsQualified({
      ownerOrAuthorized: data.ownerOrAuthorized,
    }).qualified;
    return (
      <div className={`relative overflow-hidden rounded-2xl ${shellCls}`}>
        <div className="h-1.5 bg-[var(--color-accent)]" aria-hidden="true" />
        <div className="p-8 sm:p-10">
          <div className="flex flex-col items-center text-center">
            <div className="w-16 h-16 rounded-full bg-[var(--color-accent)]/15 text-[var(--color-success)] flex items-center justify-center mb-4">
              <Icon name="check" size={34} strokeWidth={2.5} />
            </div>
            <h3 className="text-2xl font-extrabold text-[var(--color-ink)] mb-2">
              Thanks{data.firstName ? `, ${data.firstName}` : ""}!
            </h3>
            <p className="text-[var(--color-ink-muted)] max-w-sm">
              {wasQualified
                ? "We've got your request and a local iMold team member will reach out shortly to schedule your free inspection. For an active emergency, call us now and we'll respond right away."
                : "We've got your request and someone from our team will reach out. For anything urgent, the fastest way to reach us is by phone."}{" "}
              Call{" "}
              <a
                className="font-semibold text-[#0e5d7d] underline"
                href={PHONE_HREF}
              >
                {PHONE_DISPLAY}
              </a>
              .
            </p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <form
      onKeyDown={handleKeyDown}
      onSubmit={(e) => {
        // Backstop only: a native submit has already reached capture listeners.
        e.preventDefault();
        handleClick();
      }}
      noValidate
      className={`relative overflow-hidden rounded-2xl ${shellCls}`}
      aria-describedby={submitFailed ? errId("form") : undefined}
    >
      <div className="h-1.5 bg-[var(--color-accent)]" aria-hidden="true" />
      <div className="p-6 sm:p-7">
        {(headline || subhead) && (
          <div className="mb-5">
            {headline && (
              <h3 className="text-xl sm:text-2xl font-extrabold text-[var(--color-ink)] leading-tight">
                {headline}
              </h3>
            )}
            {subhead && (
              <p className="mt-1.5 text-sm text-[var(--color-ink-muted)]">
                {subhead}
              </p>
            )}
          </div>
        )}

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <TextField
            label="First name"
            k="firstName"
            name={NAME_ATTR.firstName}
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
            name={NAME_ATTR.lastName}
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
            label="Property address"
            k="propertyAddress"
            name={NAME_ATTR.propertyAddress}
            type="text"
            autoComplete="street-address"
            placeholder="Street, city, ZIP"
            value={data.propertyAddress}
            error={showErr("propertyAddress") ? errors.propertyAddress : undefined}
            disabled={submitting}
            id={id("propertyAddress")}
            errId={errId("propertyAddress")}
            inputCls={inputCls("propertyAddress")}
            onChange={(v) => update("propertyAddress", v)}
            onBlur={(v) => markTouched("propertyAddress", v)}
            refCb={(el) => (fieldRefs.current.propertyAddress = el)}
          />
        </div>

        <div className="mt-4">
          <TextField
            label="Email"
            k="email"
            name={NAME_ATTR.email}
            type="email"
            autoComplete="email"
            inputMode="email"
            pattern={EMAIL_PATTERN}
            maxLength={EMAIL_MAX_LENGTH}
            spellCheck={false}
            autoCapitalize="none"
            title={EMAIL_ERROR}
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
            name={NAME_ATTR.phone}
            type="tel"
            inputMode="numeric"
            autoComplete="tel-national"
            pattern={PHONE_PATTERN}
            title={PHONE_ERROR}
            placeholder="(239) 326-0357"
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

        <div className="mt-4">
          <SelectField
            label="Are you the property owner or an authorized representative?"
            k="ownerOrAuthorized"
            name={NAME_ATTR.ownerOrAuthorized}
            required
            options={OWNER_AUTHORIZED_OPTIONS}
            value={data.ownerOrAuthorized}
            error={
              showErr("ownerOrAuthorized") ? errors.ownerOrAuthorized : undefined
            }
            disabled={submitting}
            id={id("ownerOrAuthorized")}
            errId={errId("ownerOrAuthorized")}
            inputCls={inputCls("ownerOrAuthorized")}
            onChange={(v) => {
              update("ownerOrAuthorized", v);
              markTouched("ownerOrAuthorized", v);
            }}
            refCb={(el) => (fieldRefs.current.ownerOrAuthorized = el)}
          />
        </div>

        <div className="mt-4 grid grid-cols-1 lg:grid-cols-2 gap-4 lg:gap-y-0">
          <SelectField
            label="Do you see visible mold growth?"
            className={PAIRED_SELECT_CLS}
            k="visibleMold"
            name={NAME_ATTR.visibleMold}
            required
            options={YES_NO_OPTIONS}
            value={data.visibleMold}
            error={showErr("visibleMold") ? errors.visibleMold : undefined}
            disabled={submitting}
            id={id("visibleMold")}
            errId={errId("visibleMold")}
            inputCls={inputCls("visibleMold")}
            onChange={(v) => {
              update("visibleMold", v);
              markTouched("visibleMold", v);
            }}
            refCb={(el) => (fieldRefs.current.visibleMold = el)}
          />
          <SelectField
            label="Do you see visible water damage?"
            className={PAIRED_SELECT_CLS}
            k="visibleWaterDamage"
            name={NAME_ATTR.visibleWaterDamage}
            required
            options={YES_NO_OPTIONS}
            value={data.visibleWaterDamage}
            error={
              showErr("visibleWaterDamage") ? errors.visibleWaterDamage : undefined
            }
            disabled={submitting}
            id={id("visibleWaterDamage")}
            errId={errId("visibleWaterDamage")}
            inputCls={inputCls("visibleWaterDamage")}
            onChange={(v) => {
              update("visibleWaterDamage", v);
              markTouched("visibleWaterDamage", v);
            }}
            refCb={(el) => (fieldRefs.current.visibleWaterDamage = el)}
          />
        </div>

        {submitFailed && (
          <div
            id={errId("form")}
            role="alert"
            aria-live="assertive"
            className="mt-4 text-sm font-medium text-[var(--color-error)]"
          >
            Your request didn&apos;t go through. Please try again, or call{" "}
            <a className="font-semibold underline whitespace-nowrap" href={PHONE_HREF}>
              {PHONE_DISPLAY}
            </a>
            .
          </div>
        )}

        <button
          type="button"
          onClick={handleClick}
          disabled={submitting || submitted}
          className="btn-primary w-full mt-5 py-3.5 text-base"
        >
          {submitting ? "Sending…" : submitLabel}
        </button>

        <p className="mt-3 flex items-center justify-center gap-1.5 text-xs text-[var(--color-ink-muted)] text-center">
          <Icon name="shieldCheck" size={15} className="text-[var(--color-accent)]" />
          Free inspection. No spam — we never share your information.
        </p>
      </div>
    </form>
  );
}

// ─── Field subcomponents ───
interface BaseFieldProps {
  label: string;
  k: string;
  name: string;
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
  inputMode?: "numeric" | "text" | "email";
  pattern?: string;
  placeholder?: string;
  maxLength?: number;
  spellCheck?: boolean;
  autoCapitalize?: string;
  title?: string;
  onBlur: (v: string) => void;
}

function TextField(props: TextFieldProps): JSX.Element {
  const {
    label,
    name,
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
    maxLength,
    spellCheck,
    autoCapitalize,
    title,
  } = props;
  return (
    <div>
      <label htmlFor={id} className="lp-label">
        {label} <span className="text-[var(--color-error)]">*</span>
      </label>
      <input
        ref={(el) => refCb(el)}
        id={id}
        name={name}
        type={type}
        autoComplete={autoComplete}
        inputMode={inputMode}
        pattern={pattern}
        placeholder={placeholder}
        maxLength={maxLength}
        spellCheck={spellCheck}
        autoCapitalize={autoCapitalize}
        title={title}
        required
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
  className?: string;
}

function SelectField(props: SelectFieldProps): JSX.Element {
  const {
    label,
    name,
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
    className,
  } = props;
  return (
    <div className={className}>
      <label htmlFor={id} className="lp-label">
        {label}{" "}
        {required && <span className="text-[var(--color-error)]">*</span>}
      </label>
      <div className="relative">
        <select
          ref={(el) => refCb(el)}
          id={id}
          name={name}
          required={required}
          disabled={disabled}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className={`${inputCls} appearance-none pr-10 ${
            !value ? "text-[var(--color-ink-muted)]" : ""
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
        <span className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-3 text-[var(--color-ink-muted)]">
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
