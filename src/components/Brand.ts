// ─── Single source of truth for iMold Cleaning and Restoration LP ───
// Customer: cf7dd252-90f0-4465-b338-d4b2c0b4d8e7
// Single-page emergency-restoration LP. Conversion goal: phone calls + form fills
// for water damage restoration & mold remediation across Southwest Florida.

export const BUSINESS_NAME = "iMold Cleaning and Restoration";
export const SHORT_NAME = "iMold";
export const TAGLINE =
  "24/7 water damage restoration & mold remediation across Southwest Florida.";

// ─── Mega tracking / lead-routing (REAL IDs — use verbatim) ───
// customerId MUST be CUSTOMER_ID (not SITE_ID) or submissions 401.
export const CUSTOMER_ID = "cf7dd252-90f0-4465-b338-d4b2c0b4d8e7";
export const SITE_ID = "0e2fe4b2-4011-4791-8aed-152b9047ad31";
export const SITE_KEY = "hdjubmvvlc3ujw6k";
export const SOURCE_PROVIDER = "imold-cleaning-and-restoration-landing";
export const GTM_ID = "GTM-57XX8DZ8";
export const META_PIXEL_ID = "646520244571270";

// ─── Contact ───
// Customer-facing phone, displayed everywhere; the CTM loader (t.js) remains installed.
export const PHONE_DISPLAY = "(239) 326-0357";
export const PHONE_HREF = "tel:+12393260357";
export const EMAIL = "frontoffice@imold.us";
export const EMAIL_HREF = "mailto:frontoffice@imold.us";
export const ADDRESS = "Fort Myers, FL";
export const HOURS = "24/7 Emergency Service";
export const YEARS_IN_BUSINESS = "28";

// ─── Trust / social proof ───
export const RATING = "4.9";
export const REVIEW_COUNT = "1,200+";
export const PROJECTS_PER_YEAR = "700+";

// ─── Credentials (verified from the live site) ───
export const LICENSE_MOLD_NO = "MRSR2170"; // State Certified Mold Remediator
export const LICENSE_GC_NO = "CGC1540205"; // State Certified General Contractor

// ─── Primary / secondary CTA copy ───
export const PRIMARY_CTA = "Get My Free Inspection";
export const FORM_ANCHOR = "#lead-form";

// ─── Logos ───
export const LOGO_WHITE = "/images/imold-logo-white.svg"; // for dark navy header/footer
export const LOGO_DARK = "/images/imold-logo.svg"; // for light surfaces

// ─── Services (3 core lines) ─────────────────────────────────
export type ServiceIcon = "water" | "mold" | "fire";

export interface Service {
  slug: string;
  name: string;
  icon: ServiceIcon;
  image: string;
  imageAlt: string;
  badge?: string;
  copy: string;
  bullets: string[];
}

export const SERVICES: Service[] = [
  {
    slug: "water-damage-restoration",
    name: "Water Damage Restoration",
    icon: "water",
    image: "/images/water-damage.jpg",
    imageAlt:
      "iMold technician placing a professional air mover on a water-damaged hardwood floor",
    badge: "24/7 response",
    copy: "Burst pipes, roof leaks, storm flooding, and appliance failures don't wait — and neither do we. Our IICRC-certified crews respond around the clock to extract standing water, dry your walls and floors with professional equipment, and stop the damage from spreading before it becomes mold.",
    bullets: [
      "24/7 emergency water extraction",
      "Structural drying & moisture mapping",
      "Insurance documentation handled for you",
    ],
  },
  {
    slug: "mold-remediation",
    name: "Mold Remediation",
    icon: "mold",
    image: "/images/hs1.webp",
    imageAlt:
      "iMold technician in full protective gear safely treating mold inside a home",
    badge: "Free inspection",
    copy: "If you can see or smell mold, we'll find where it's coming from and take care of it the right way. As a state-licensed Mold Remediator, we contain the affected area, safely remove the mold, and treat what's left — so your home feels clean and comfortable again. It all starts with a free visual mold inspection.",
    bullets: [
      "Free visual mold inspection",
      "Licensed containment & safe removal",
      "Full remediation, start to finish",
    ],
  },
  {
    slug: "fire-damage-restoration",
    name: "Fire Damage Restoration",
    icon: "fire",
    image: "/images/fire-damage.jpg",
    imageAlt:
      "iMold technician cleaning smoke and soot from a wall during fire damage restoration",
    copy: "After a fire, smoke and soot keep causing damage long after the flames are out. We clean and deodorize soot-damaged surfaces, restore what can be saved, and rebuild what can't — all under one roof as your licensed General Contractor. One company takes it from cleanup through full reconstruction.",
    bullets: [
      "Soot & smoke cleanup and odor removal",
      "Contents cleaning & careful pack-out",
      "Full rebuild by a licensed General Contractor",
    ],
  },
];

// ─── Why iMold — differentiators ───
export type DiffIcon = "local" | "licensed" | "insurance" | "rebuild";
export interface Differentiator {
  icon: DiffIcon;
  title: string;
  copy: string;
  proof: string;
}

export const DIFFERENTIATORS: Differentiator[] = [
  {
    icon: "local",
    title: "Locally owned for 28 years — not a franchise",
    copy: "We're your neighbors in Southwest Florida, not an out-of-town storm-chaser or a national franchise. For 28 years the same local team has answered the phone, shown up, and stood behind the work — with more than 1,200 five-star reviews to show for it.",
    proof: "Locally owned · 28 years · 1,200+ five-star reviews",
  },
  {
    icon: "licensed",
    title: "Dual state-licensed and IICRC-certified",
    copy: "We hold both a State Mold Remediator license and a State General Contractor license, and our technicians are IICRC-certified. That combination is rare — and it means the people diagnosing the problem are the same qualified pros who put your home back together.",
    proof: `Mold Remediator ${LICENSE_MOLD_NO} · GC ${LICENSE_GC_NO} · IICRC-certified`,
  },
  {
    icon: "insurance",
    title: "We handle the insurance paperwork",
    copy: "Filing a claim is stressful. We document the damage thoroughly, communicate directly with your insurance company, and provide the reports and photos adjusters need — so your claim moves faster and you're not left doing the paperwork alone.",
    proof: "Full documentation & direct adjuster communication",
  },
  {
    icon: "rebuild",
    title: "One company, from first call through rebuild",
    copy: "Because we're also a licensed General Contractor, we don't hand you off after the cleanup. We take your home all the way back — drywall, flooring, paint, and finish work — so you work with one trusted team from the emergency to the final walkthrough.",
    proof: "Restoration through full reconstruction, in-house",
  },
];

// ─── How it works ───
export type StepIcon = "call" | "inspect" | "restore" | "rebuild";
export interface Step {
  n: number;
  icon: StepIcon;
  title: string;
  copy: string;
}
export const STEPS: Step[] = [
  {
    n: 1,
    icon: "call",
    title: "Call us anytime",
    copy: "Reach our local team 24/7 or request your free inspection online. We'll get the essential details and get help moving right away.",
  },
  {
    n: 2,
    icon: "inspect",
    title: "Free on-site inspection",
    copy: "We come to you for a free visual inspection and give you a clear, written estimate — no obligation and no pressure.",
  },
  {
    n: 3,
    icon: "restore",
    title: "We restore & remediate",
    copy: "Our IICRC-certified crews contain the damage, extract water or remove mold, and dry and treat your home with professional-grade equipment.",
  },
  {
    n: 4,
    icon: "rebuild",
    title: "We rebuild it back",
    copy: "As your licensed General Contractor, we handle the repairs and reconstruction — and the insurance paperwork — until your home is whole again.",
  },
];

// ─── Offers strip ───
export type OfferIcon = "inspection" | "financing" | "discount";
export interface Offer {
  icon: OfferIcon;
  title: string;
  copy: string;
}
export const OFFERS: Offer[] = [
  {
    icon: "inspection",
    title: "Free inspections & estimates",
    copy: "Free visual mold inspections and free written estimates, always. Know exactly what you need and what it costs before you commit to anything.",
  },
  {
    icon: "financing",
    title: "Monthly payment plans",
    copy: "Restoration shouldn't have to wait on the budget. Ask about our monthly payment plans and flexible financing to get the work done now.",
  },
  {
    icon: "discount",
    title: "10% off for those who serve",
    copy: "A 10% discount for veterans, teachers, and first responders — our thank-you for everything you do for our community.",
  },
];

// ─── Testimonials — real, verbatim named reviews ───
export interface Testimonial {
  name: string;
  platform: string;
  quote: string;
  stars: number;
}
export const TESTIMONIALS: Testimonial[] = [
  {
    name: "Robert E.",
    platform: "Facebook review",
    quote:
      "They were fully transparent with me, charged fairly with no surprises, kept me advised of the required work and progress, and assisted with insurance claims.",
    stars: 5,
  },
  {
    name: "Crystal W.",
    platform: "Yelp review",
    quote:
      "iMold was fantastic to work with as they handled the mold removal and water damage remediation.",
    stars: 5,
  },
  {
    name: "Mike O.",
    platform: "Google review",
    quote:
      "Shane and Julian were the team that came to perform the remediation. They provided us with daily reports and pictures of what was completed each day.",
    stars: 5,
  },
  {
    name: "Tom B.",
    platform: "Google review",
    quote:
      "Their team of technicians — Jordan, Zach, and Tyler — were on time every day and kept us well-informed of their daily progress.",
    stars: 5,
  },
  {
    name: "Angelina A.",
    platform: "Yelp review",
    quote:
      "Brian and the guys were fast and professional, and they walked us through each step they made.",
    stars: 5,
  },
  {
    name: "Sandra C.",
    platform: "Yelp review",
    quote:
      "They were always prompt and considerate, listened to my needs, and did a good job with the demo and clean-up!",
    stars: 5,
  },
];

// ─── Service area (5 counties + Apollo Beach / Sun City Center) ───
export const SERVICE_COUNTIES: string[] = [
  "Lee County",
  "Collier County",
  "Charlotte County",
  "Sarasota County",
  "Manatee County",
];

// Representative communities we serve (confirmed cities + required towns).
export const SERVICE_CITIES: string[] = [
  "Fort Myers",
  "Cape Coral",
  "Estero",
  "Naples",
  "Sarasota",
  "Venice",
  "Apollo Beach",
  "Sun City Center",
];

// ─── FAQ ───
export interface FaqItem {
  q: string;
  a: string;
}
export const FAQS: FaqItem[] = [
  {
    q: "Do you really offer a free inspection?",
    a: "Yes. We provide a free visual mold inspection and a free written estimate before any work begins. There's no obligation — you'll know exactly what we recommend and what it will cost.",
  },
  {
    q: "Do you work with my insurance company?",
    a: "We do. We document the damage in detail, communicate directly with your insurance company, and provide the photos and reports adjusters need to process your claim — so you're not left navigating the paperwork alone.",
  },
  {
    q: "How quickly can you respond?",
    a: "We offer 24/7 emergency service and respond immediately to water and mold emergencies across Southwest Florida. Water damage spreads quickly, so the sooner you call, the more of your home we can save.",
  },
  {
    q: "Are you licensed and certified?",
    a: `Yes. We're a State-Licensed Mold Remediator (${LICENSE_MOLD_NO}) and a State-Licensed General Contractor (${LICENSE_GC_NO}), and our technicians are IICRC-certified in water damage and mold remediation.`,
  },
  {
    q: "Can you repair the damage, not just clean it up?",
    a: "Yes — and that's what sets us apart. Because we're also a licensed General Contractor, we handle everything from emergency cleanup through full reconstruction: drywall, flooring, paint, and finish work. One company, start to finish.",
  },
  {
    q: "What does it cost, and do you offer financing?",
    a: "Every situation is different, which is why we start with a free inspection and a clear written estimate. We offer monthly payment plans to keep the work manageable, plus a 10% discount for veterans, teachers, and first responders.",
  },
  {
    q: "Which areas do you serve?",
    a: "We serve Lee, Collier, Charlotte, Sarasota, and Manatee counties, along with Apollo Beach and Sun City Center. If you're nearby, give us a call — we may still be able to help.",
  },
];

// ─── Form option lists ───
export interface Option {
  value: string;
  label: string;
}

// Qualifier: Are you the property owner or an authorized representative?
export const OWNER_AUTHORIZED_OPTIONS: Option[] = [
  { value: "", label: "Select one…" },
  { value: "yes", label: "Yes" },
  { value: "no", label: "No" },
];

// ─── Qualification ───
// QUALIFIED only when the lead is the property owner or an authorized rep.
// "No" DISQUALIFIES. All leads still submit; disqualified leads are tagged with
// a reason and do NOT fire the qualified_lead event.
export interface QualificationResult {
  qualified: boolean;
  reason: string;
}

export function leadIsQualified(args: {
  ownerOrAuthorized: string;
}): QualificationResult {
  const authorized = args.ownerOrAuthorized === "yes";
  return {
    qualified: authorized,
    reason: authorized ? "" : "not_owner_or_authorized",
  };
}
