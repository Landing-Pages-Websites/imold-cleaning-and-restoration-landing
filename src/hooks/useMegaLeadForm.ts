"use client";

import { useEffect, useCallback, useRef, useState } from "react";
import {
  EMAIL_ERROR,
  PHONE_ERROR,
  isValidEmail,
  isValidPhone,
  normalizeEmail,
  phoneDigits,
} from "@/lib/fields";
import { resolveLeadSource } from "@/lib/leadSource";

const ENDPOINT = "https://analytics.gomega.ai/submission/submit";

const STORAGE_KEYS = {
  VISITOR_ID: "_mega_vid",
  SESSION_ID: "_mega_sid",
  ATTRIBUTION: "_mega_attr",
};

interface Attribution {
  utm_source: string | null;
  utm_medium: string | null;
  utm_campaign: string | null;
  utm_term: string | null;
  utm_content: string | null;
  gclid: string | null;
  gbraid: string | null;
  wbraid: string | null;
  fbclid: string | null;
  fbp: string | null;
  fbc: string | null;
}

interface LeadFormConfig {
  siteId: string;
  customerId: string;
  sourceProvider: string;
  pagePath?: string;
}

type Status = "idle" | "submitting" | "success" | "error";

interface SubmissionResponse {
  ok: true;
  id?: string;
}

interface FormState {
  status: Status;
  errorMessage: string;
}

const generateId = (prefix: string): string => {
  if (typeof crypto !== "undefined" && crypto.randomUUID) {
    return `${prefix}_${crypto.randomUUID()}`;
  }
  return `${prefix}_${"xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g, (c) => {
    const r = (Math.random() * 16) | 0;
    const v = c === "x" ? r : (r & 0x3) | 0x8;
    return v.toString(16);
  })}`;
};

const getCookie = (name: string): string | null => {
  if (typeof document === "undefined") return null;
  const value = `; ${document.cookie}`;
  const parts = value.split(`; ${name}=`);
  if (parts.length === 2) {
    return parts.pop()?.split(";").shift() || null;
  }
  return null;
};

const getVisitorId = (): string => {
  if (typeof localStorage === "undefined") return generateId("vis");
  let visitorId = localStorage.getItem(STORAGE_KEYS.VISITOR_ID);
  if (!visitorId) {
    visitorId = generateId("vis");
    localStorage.setItem(STORAGE_KEYS.VISITOR_ID, visitorId);
  }
  return visitorId;
};

const getSessionId = (): string => {
  if (typeof sessionStorage === "undefined") return generateId("sess");
  let sessionId = sessionStorage.getItem(STORAGE_KEYS.SESSION_ID);
  if (!sessionId) {
    sessionId = generateId("sess");
    sessionStorage.setItem(STORAGE_KEYS.SESSION_ID, sessionId);
  }
  return sessionId;
};

const captureAttribution = (): Attribution => {
  if (typeof window === "undefined") {
    return {
      utm_source: null, utm_medium: null, utm_campaign: null,
      utm_term: null, utm_content: null, gclid: null,
      gbraid: null, wbraid: null, fbclid: null, fbp: null, fbc: null,
    };
  }
  const url = new URL(window.location.href);
  const params = url.searchParams;
  const attribution: Attribution = {
    utm_source: params.get("utm_source"),
    utm_medium: params.get("utm_medium"),
    utm_campaign: params.get("utm_campaign"),
    utm_term: params.get("utm_term"),
    utm_content: params.get("utm_content"),
    gclid: params.get("gclid"),
    gbraid: params.get("gbraid"),
    wbraid: params.get("wbraid"),
    fbclid: params.get("fbclid"),
    fbp: getCookie("_fbp"),
    fbc: getCookie("_fbc"),
  };
  if (attribution.fbclid && !attribution.fbc) {
    attribution.fbc = `fb.1.${Date.now()}.${attribution.fbclid}`;
  }
  return attribution;
};

const initAttribution = (): Attribution => {
  if (typeof window === "undefined" || typeof localStorage === "undefined") {
    return captureAttribution();
  }
  const trackingParams = ["utm_source", "gclid", "fbclid", "gbraid", "wbraid"];
  const url = new URL(window.location.href);
  const hasTrackingParams = trackingParams.some((p) => url.searchParams.has(p));
  if (hasTrackingParams) {
    const attribution = captureAttribution();
    localStorage.setItem(STORAGE_KEYS.ATTRIBUTION, JSON.stringify(attribution));
    return attribution;
  }
  const stored = localStorage.getItem(STORAGE_KEYS.ATTRIBUTION);
  if (stored) {
    try {
      return JSON.parse(stored) as Attribution;
    } catch {
      // fall through
    }
  }
  const attribution = captureAttribution();
  localStorage.setItem(STORAGE_KEYS.ATTRIBUTION, JSON.stringify(attribution));
  return attribution;
};

const REQUIRED_FIELDS_ERROR = "First name and email are required";
const UNCONFIRMED_ERROR = "Submission not confirmed by server";
const INVALID_RESPONSE_ERROR = "Invalid server response";

/** Validates with the canonical field rules and returns a normalized copy. */
const validateLeadData = (formData: Record<string, unknown>): Record<string, unknown> => {
  if (!formData.firstName || !formData.email) throw new Error(REQUIRED_FIELDS_ERROR);
  const phone = String(formData.phone ?? "");
  if (!isValidPhone(phone)) throw new Error(PHONE_ERROR);
  if (!isValidEmail(formData.email)) throw new Error(EMAIL_ERROR);
  return { ...formData, phone: phoneDigits(phone), email: normalizeEmail(String(formData.email)) };
};

const buildPayload = (config: LeadFormConfig, formData: Record<string, unknown>) => {
  const attribution = initAttribution();
  return {
    customer_id: config.customerId,
    site_id: config.siteId,
    source_provider: config.sourceProvider,
    form_data: { ...formData, ...resolveLeadSource(attribution, document.referrer) },
    url: window.location.href,
    referrer_url: document.referrer || null,
    session_id: getSessionId(),
    visitor_id: getVisitorId(),
    utm_source: attribution.utm_source,
    utm_medium: attribution.utm_medium,
    utm_campaign: attribution.utm_campaign,
    utm_term: attribution.utm_term,
    utm_content: attribution.utm_content,
    gclid: attribution.gclid,
    gbraid: attribution.gbraid,
    wbraid: attribution.wbraid,
    fbclid: attribution.fbclid,
    fbp: attribution.fbp,
    fbc: attribution.fbc,
  };
};

const isAccepted = (body: unknown): body is SubmissionResponse =>
  typeof body === "object" && body !== null && (body as { ok?: unknown }).ok === true;

/** Resolves only when the server confirms the lead: HTTP success AND body `ok === true`. */
const postLead = async (payload: ReturnType<typeof buildPayload>): Promise<SubmissionResponse> => {
  const response = await fetch(ENDPOINT, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });
  if (!response.ok) throw new Error(`Submission failed: ${response.status}`);
  let body: unknown;
  try {
    body = await response.json();
  } catch {
    throw new Error(INVALID_RESPONSE_ERROR);
  }
  if (!isAccepted(body)) throw new Error(UNCONFIRMED_ERROR);
  return body;
};

const dispatchSubmitEvent = (formData: Record<string, unknown>, pagePath?: string): void => {
  try {
    window.dispatchEvent(
      new CustomEvent("mega:form_submit", {
        detail: { form_data: formData, page_path: pagePath || window.location.pathname },
      })
    );
  } catch {
    // A tracking integration must never turn an accepted lead into a failure.
  }
};

interface UseMegaLeadFormReturn extends FormState {
  submitLead: (formData: Record<string, unknown>) => Promise<SubmissionResponse>;
  reset: () => void;
}

export function useMegaLeadForm(config: LeadFormConfig): UseMegaLeadFormReturn {
  const isInitialized = useRef(false);
  const [state, setState] = useState<FormState>({ status: "idle", errorMessage: "" });

  useEffect(() => {
    if (!isInitialized.current) {
      initAttribution();
      isInitialized.current = true;
    }
  }, []);

  /** Throws on validation, HTTP, network or unconfirmed-body failure; returns the accepted body. */
  const submitLead = useCallback(
    async (formData: Record<string, unknown>): Promise<SubmissionResponse> => {
      setState({ status: "submitting", errorMessage: "" });
      try {
        const leadData = validateLeadData(formData);
        const accepted = await postLead(buildPayload(config, leadData));
        dispatchSubmitEvent(leadData, config.pagePath);
        setState({ status: "success", errorMessage: "" });
        return accepted;
      } catch (error) {
        const message = error instanceof Error ? error.message : "Something went wrong. Please try again.";
        setState({ status: "error", errorMessage: message });
        throw error instanceof Error ? error : new Error(message);
      }
    },
    [config]
  );

  const reset = useCallback(() => {
    setState({ status: "idle", errorMessage: "" });
  }, []);

  return { ...state, submitLead, reset };
}
