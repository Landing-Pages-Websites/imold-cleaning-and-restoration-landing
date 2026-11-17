// Human-readable lead source, added to form_data so the lead alert email and the
// lead record show where the lead came from (Meta, Google Ads, organic, direct...).

export interface SourceSignals {
  utm_source: string | null;
  utm_medium: string | null;
  utm_campaign: string | null;
  gclid: string | null;
  gbraid: string | null;
  wbraid: string | null;
  fbclid: string | null;
}

export interface LeadSourceFields {
  leadSource: string;
  leadCampaign: string;
}

const META_SOURCES = new Set(["facebook", "fb", "instagram", "ig", "meta"]);
const GOOGLE_SOURCES = new Set(["google", "googleads", "google_ads", "adwords"]);
const SEARCH_ENGINES = ["google.", "bing.", "yahoo.", "duckduckgo.", "ecosia."];
const PMAX_PATTERN = /pmax|performance[\s_-]*max/i;

const lower = (value: string | null): string => (value ?? "").trim().toLowerCase();

const googleLabel = (campaign: string | null): string =>
  PMAX_PATTERN.test(campaign ?? "") ? "Google Ads (PMAX)" : "Google Ads";

const referrerLabel = (referrer: string): string => {
  let host: string;
  try {
    host = new URL(referrer).hostname.replace(/^www\./, "");
  } catch {
    return "Direct";
  }
  if (host.endsWith("imold.us")) return "Direct";
  if (SEARCH_ENGINES.some((engine) => host.includes(engine))) return "Organic search";
  if (/facebook\.|instagram\.|fb\.me/.test(host)) return "Meta (organic)";
  return `Referral (${host})`;
};

/** Paid click IDs win, then UTM source, then the referrer; nothing at all is Direct. */
export function resolveLeadSource(signals: SourceSignals, referrer: string): LeadSourceFields {
  const source = lower(signals.utm_source);
  const leadCampaign = signals.utm_campaign ?? "";
  if (signals.fbclid || META_SOURCES.has(source)) return { leadSource: "Meta Ads", leadCampaign };
  if (signals.gclid || signals.gbraid || signals.wbraid || GOOGLE_SOURCES.has(source)) {
    return { leadSource: googleLabel(signals.utm_campaign), leadCampaign };
  }
  if (source) {
    const medium = lower(signals.utm_medium);
    return { leadSource: medium ? `${signals.utm_source} / ${medium}` : String(signals.utm_source), leadCampaign };
  }
  return { leadSource: referrer ? referrerLabel(referrer) : "Direct", leadCampaign };
}
