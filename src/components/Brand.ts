// ─── Single source of truth for Tubro Carpet Cleaning LP ───
// Customer: ca2738cf-5ecb-47eb-befb-fe9986875404
// Single-page local-service-offer LP. Conversion goal: form fill + phone call.

export const BUSINESS_NAME = "Tubro Carpet Cleaning";
export const SHORT_NAME = "Tubro";
export const TAGLINE =
  "Professional carpet cleaning across South King & Pierce County, WA.";

// ─── Mega tracking / lead-routing (REAL IDs — use verbatim) ───
export const CUSTOMER_ID = "ca2738cf-5ecb-47eb-befb-fe9986875404";
export const SITE_ID = "7aa5c15d-552c-4a5d-b493-218c50187349";
export const SITE_KEY = "fhhxzfmttzay45ct";
export const SOURCE_PROVIDER = "tubro-carpet-cleaning-landing";
export const GTM_ID = "GTM-N34WRWFW";

// ─── Contact ───
// Display the CTM tracking number everywhere; CTM (t.js) dynamically swaps it.
export const PHONE_DISPLAY = "(253) 499-1028";
export const PHONE_HREF = "tel:+12534991028";
export const EMAIL = "info@tubrocarpetcleaning.com";
export const EMAIL_HREF = "mailto:info@tubrocarpetcleaning.com";
export const ADDRESS = "Ravensdale, WA";
export const HOURS = "Mon–Fri 8am–5pm";
export const ESTABLISHED = "2010";

// ─── The offer ───
export const OFFER_PRICE = "$259";
export const OFFER_ROOMS = "5 Rooms";
export const OFFER_EXTRA = "Additional rooms $45 each";
export const RATING = "4.9";
export const REVIEW_COUNT = "230+";

// ─── Logos ───
export const LOGO_DARK = "/images/logo.png"; // dark logo, white header
export const LOGO_WHITE = "/images/logo-white.png"; // white logo, deep-green footer

// ─── Services (5) ─────────────────────────────────────────────
export type ServiceIcon =
  | "carpet"
  | "commercial"
  | "upholstery"
  | "tile"
  | "pressure";

export interface Service {
  slug: string;
  name: string;
  icon: ServiceIcon;
  image?: string;
  imageAlt?: string;
  badge?: string;
  copy: string;
  featured?: boolean;
}

export const SERVICES: Service[] = [
  {
    slug: "residential-carpet",
    name: "Residential Carpet Cleaning",
    icon: "carpet",
    image: "/images/residential-carpet.jpg",
    imageAlt: "Freshly cleaned plush living-room carpet in a bright home",
    badge: "Most requested",
    featured: true,
    copy: "Our core service. We use truck-mounted hot water extraction to lift ground-in dirt, allergens, and pet traffic from the fibers your family lives on every day. Every job starts with an eco-friendly pre-treatment and finishes dry in 6–12 hours — perfect for homes with kids and pets.",
  },
  {
    slug: "commercial-carpet",
    name: "Commercial Carpet Cleaning",
    icon: "commercial",
    image: "/images/commercial-carpet.jpg",
    imageAlt: "Tubro service van parked outside a commercial building",
    copy: "Offices, retail, and rentals across South King & Pierce County. We schedule around your hours, protect high-traffic lanes, and keep entryways and common areas presentable for customers and staff — with quick dry times that get you back to business fast.",
  },
  {
    slug: "upholstery",
    name: "Upholstery Cleaning",
    icon: "upholstery",
    image: "/images/upholstery.jpg",
    imageAlt: "Clean upholstered sofa in a comfortable living room",
    badge: "15% off",
    copy: "Sofas, sectionals, recliners, and dining chairs cleaned with fabric-safe, non-toxic solutions. We refresh the pieces your family uses most, gently lifting body oils, spills, and odors — safe for kids and pets. Ask about 15% off upholstery when you book.",
  },
  {
    slug: "tile-hard-surface",
    name: "Tile & Hard Surface Cleaning",
    icon: "tile",
    copy: "Tile, grout, and hard-surface floors that mops can't reach. Our deep-cleaning process pulls built-up grime out of grout lines and restores the finish on kitchens, bathrooms, and entryways — leaving hard floors visibly brighter without harsh chemicals.",
  },
  {
    slug: "pressure-washing",
    name: "Pressure Washing",
    icon: "pressure",
    image: "/images/pressure-washing.jpg",
    imageAlt: "Pressure washing a residential driveway",
    copy: "Driveways, walkways, patios, and siding cleaned from the outside in. We blast away moss, mildew, and years of buildup to bring back your home's curb appeal — the same trusted, transparent-pricing crew that cleans your carpets.",
  },
];

// ─── Why Tubro — differentiators ───
export type DiffIcon = "certified" | "quickdry" | "eco" | "pricing";
export interface Differentiator {
  icon: DiffIcon;
  title: string;
  copy: string;
  proof: string;
  image?: string;
  imageAlt?: string;
}

export const DIFFERENTIATORS: Differentiator[] = [
  {
    icon: "certified",
    title: "IICRC-certified technicians",
    copy: "Every technician is trained and certified to the industry's cleaning and restoration standard — no rotating crews of subcontractors. You get a professional who knows how to treat your specific carpet and fabric the right way.",
    proof: "IICRC certified · Licensed, bonded & insured",
    image: "/images/owner.jpeg",
    imageAlt: "Tubro Carpet Cleaning owner and technician",
  },
  {
    icon: "quickdry",
    title: "Dry in 6–12 hours, not 1–2 days",
    copy: "Our truck-mounted extraction and high-powered fans pull far more moisture from the fibers, so you're back on your carpets the same day. Most competitors leave carpets damp for 24–48 hours.",
    proof: "6–12 hr dry time vs. 24–48 hr industry standard",
    image: "/images/hero-carpet.jpg",
    imageAlt: "Technician cleaning a plush carpet in a bright modern home",
  },
  {
    icon: "eco",
    title: "Eco-friendly, safe for kids & pets",
    copy: "We clean with non-toxic, biodegradable products that are tough on stains but gentle on the people and pets who live in your home. No harsh chemical smell left behind — just clean carpet.",
    proof: "Non-toxic, biodegradable pre-treatment on every job",
    image: "/images/pet-safe.jpg",
    imageAlt: "Family- and pet-safe clean carpet in a home",
  },
  {
    icon: "pricing",
    title: "Upfront, transparent pricing",
    copy: "The price we quote is the price you pay. Our 5-room special is $259, additional rooms are $45 each, and we tell you exactly how rooms are measured before we start. No surprise add-ons, no pressure, no upsells.",
    proof: "$259 for 5 rooms · additional rooms $45 each · no hidden fees",
    image: "/images/commercial-van.png",
    imageAlt: "Tubro Carpet Cleaning service van",
  },
];

// ─── How it works ───
export interface Step {
  n: number;
  title: string;
  copy: string;
}
export const STEPS: Step[] = [
  {
    n: 1,
    title: "Request your quote",
    copy: "Fill out the form or call us. Tell us your city and what you need cleaned — you'll get straight, upfront pricing.",
  },
  {
    n: 2,
    title: "We confirm & schedule",
    copy: "We call back fast to lock in a time that works for you, often same or next day. No waiting around all day.",
  },
  {
    n: 3,
    title: "Certified tech cleans",
    copy: "An IICRC-certified technician deep-cleans with eco-friendly products — and your carpets are dry in 6–12 hours.",
  },
];

// ─── Testimonials — real named Google reviews ───
export interface Testimonial {
  name: string;
  location?: string;
  quote: string;
  stars: number;
}
export const TESTIMONIALS: Testimonial[] = [
  {
    name: "Lindsey E.",
    quote:
      "This is the second time I have used them to clean my carpets. I tried a different company in between that people said I should try. I had the worst experience and went back to Tubro. They did an amazing job on my carpets. They were professional and didn't try to gouge me on price. I am really impressed by the whole experience. Thank you.",
    stars: 5,
  },
  {
    name: "Richard N.",
    quote:
      "We had pet stains that Charles completely removed. His prices are much better than the big advertising companies. Don't hesitate in using him.",
    stars: 5,
  },
  {
    name: "Johnny W.",
    quote:
      "GREAT customer service! I appreciated the communication. They texted each time they were on their way (for the estimate and actual cleaning). Appreciate the care they took to keep the floors dry (with towels) and wore shoe coverings. Very nice technicians and even though they offered additional services, I never felt any upsell pressure. HIGHLY RECOMMEND.",
    stars: 5,
  },
  {
    name: "Wendi M.",
    quote:
      "This is my 3rd time using Tubro and the ONLY carpet company I would recommend! Johnny arrived on time, and did miracles on my carpet! Thank you.",
    stars: 5,
  },
  {
    name: "Sandy M.",
    quote:
      "The employees were courteous & efficient. We had them clean our hardwoods today and carpet about 2 weeks ago. We babysat our daughter's 2 cats for 2 months. Between her cats and our cat they did a lot of spraying to mark territory. Tubro brought in a UV light to find the areas that needed to be treated. They also educated us about the process ahead of time. Great job. Cat urine odor is gone.",
    stars: 5,
  },
  {
    name: "Jennifer S.",
    quote:
      "Great options for scheduling. Very good customer service. They were on time and did a great job. The corners of the walls were protected. When the carpets were clean, they backed out wiping wet areas down. They also were able to get out some very tough stains and save money in carpet replacement. I would highly recommend them!",
    stars: 5,
  },
];

// ─── Service area (19 real cities — NO Seattle) ───
export const SERVICE_CITIES: string[] = [
  "Auburn",
  "Bellevue",
  "Black Diamond",
  "Bonney Lake",
  "Buckley",
  "Covington",
  "Enumclaw",
  "Fairwood",
  "Issaquah",
  "Kent",
  "Maple Valley",
  "Newcastle",
  "North Bend",
  "Ravensdale",
  "Renton",
  "Sammamish",
  "Snoqualmie",
  "Sumner",
  "Tacoma",
];

// ─── FAQ ───
export interface FaqItem {
  q: string;
  a: string;
}
export const FAQS: FaqItem[] = [
  {
    q: "How often should I have my carpets cleaned?",
    a: "For most homes we recommend a professional cleaning every 6 to 12 months. Homes with kids, pets, or heavy foot traffic benefit from the shorter end of that range to keep allergens and wear down.",
  },
  {
    q: "What carpet cleaning method do you use?",
    a: "We use hot water extraction — often called steam cleaning. It's the method most carpet manufacturers recommend because it flushes dirt and allergens deep in the fibers, then extracts the water and grime for a genuinely deep clean.",
  },
  {
    q: "Are your products safe for kids and pets?",
    a: "Yes. We clean with non-toxic, biodegradable, eco-friendly products that are safe for children and pets. There's no harsh chemical residue or lingering smell left behind — just clean carpet.",
  },
  {
    q: "How long does it take for carpets to dry?",
    a: "Most carpets are dry within 6 to 12 hours, versus the 24 to 48 hours common with other companies. Our truck-mounted equipment and high-powered fans pull far more moisture out during the cleaning.",
  },
  {
    q: "How does your pricing work — are there hidden fees?",
    a: "Pricing is upfront and transparent. Our 5-room special is $259 and additional rooms are $45 each. Areas over 150 sq ft count as two rooms, and we explain exactly how rooms are measured before we start. No surprise add-ons.",
  },
  {
    q: "Do you back your work?",
    a: "Yes — every job is covered by our 100% satisfaction guarantee. Our IICRC-certified, licensed, bonded, and insured technicians take care of your home, and we stand behind the results.",
  },
];

// ─── Form option lists ───
export interface Option {
  value: string;
  label: string;
}

export const HEARD_ABOUT_US_OPTIONS: Option[] = [
  { value: "", label: "Select an option…" },
  { value: "google_search", label: "Google Search" },
  { value: "google_maps", label: "Google Maps" },
  { value: "referral", label: "Referral" },
  { value: "social_media", label: "Social Media" },
  { value: "other", label: "Other" },
];

// City select: 19 real service cities + explicit out-of-area option.
export const OUT_OF_AREA_CITY = "Other / not listed";
export const CITY_OPTIONS: Option[] = [
  { value: "", label: "Select your city…" },
  ...SERVICE_CITIES.map((c) => ({ value: c, label: c })),
  { value: OUT_OF_AREA_CITY, label: OUT_OF_AREA_CITY },
];

// Cleaning-type select: four in-scope services + out-of-scope catch-all.
export const OUT_OF_SCOPE_CLEANING = "Other";
export const QUALIFYING_CLEANING_TYPES: string[] = [
  "Carpet cleaning",
  "Upholstery",
  "Tile and hard surfaces",
  "Pressure washing",
];
export const CLEANING_TYPE_OPTIONS: Option[] = [
  { value: "", label: "Select a service…" },
  ...QUALIFYING_CLEANING_TYPES.map((c) => ({ value: c, label: c })),
  { value: OUT_OF_SCOPE_CLEANING, label: "Other / not sure" },
];

// ─── Qualification ───
// QUALIFIED only when city is one of the 19 real service cities AND
// cleaning_type is one of the four in-scope services. All leads still submit;
// disqualified leads are tagged with a reason and do NOT fire qualified_lead.
export interface QualificationResult {
  qualified: boolean;
  reason: string;
}

export function leadIsQualified(args: {
  city: string;
  cleaningType: string;
}): QualificationResult {
  const outOfArea = !SERVICE_CITIES.includes(args.city);
  const outOfScope = !QUALIFYING_CLEANING_TYPES.includes(args.cleaningType);
  const reasons: string[] = [];
  if (outOfArea) reasons.push("out_of_area");
  if (outOfScope) reasons.push("out_of_scope_service");
  return { qualified: reasons.length === 0, reason: reasons.join(",") };
}
