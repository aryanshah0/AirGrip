// One place for the company facts, URLs and switches used by the shared layout, forms and <head>.

export const SITE = {
  origin: "https://airgrip.co.in",
  name: "AirGrip",
  legalGroup: "Air Grip Group of Companies",
  phone: "+91 93166 15007",
  phoneHref: "tel:+919316615007",
  whatsapp: "https://wa.me/919316615007",
  email: "sales@airgrip.in",
  address: {
    street: "Plot No. 3966 & 3967, Road No. U, GIDC Phase-III, Dared",
    city: "Jamnagar",
    postalCode: "361004",
    region: "Gujarat",
    country: "IN",
  },
  hours: "Sat–Thu 09:30–18:30 IST",
  founded: "1988",
};

/**
 * Switches that are filled in before launch (see docs/BUILD.md).
 *  - VITE_GA_ID: GA4 measurement ID. Empty = no analytics script at all.
 *  - VITE_FORM_ENDPOINT: URL the quote and contact forms POST to (multipart). Default: /api/form.php, the PHP
 *    sender shipped in public/api/ (the dev and preview servers answer it with a local mock instead).
 *    "none" (the dev copy on GitHub Pages): nothing is sent; the form goes straight to its thank-you step.
 */
export const CONFIG = {
  gaId: (import.meta.env.VITE_GA_ID as string | undefined) || "",
  formEndpoint: (import.meta.env.VITE_FORM_ENDPOINT as string | undefined) || (import.meta.env.DEV ? "/api/form" : "/api/form.php"),
};

// Paths used by the shared layout (pages link with plain URLs generated from the design).
export const P = {
  home: "/",
  products: "/products/",
  category: "/products/brass-turned-components/",
  fittings: "/products/brass-fittings/",
  forged: "/products/brass-forged-components/",
  inserts: "/products/brass-moulding-inserts/",
  terminals: "/products/brass-electrical-terminals/",
  fasteners: "/products/special-fasteners/",
  stamping: "/products/metal-stamping-parts/",
  glands: "/products/brass-cable-glands/",
  clampingJaw: "/products/brass-cable-glands/clamping-jaw-cable-gland/",
  strainRelief: "/products/brass-cable-glands/strain-relief-cable-gland/",
  pressureScrew: "/products/brass-cable-glands/pressure-screw/",
  lockNuts: "/products/brass-cable-glands/lock-nuts/",
  adapters: "/products/brass-cable-glands/thread-adapters/",
  stopPlugs: "/products/brass-cable-glands/stop-plugs/",
  earthTags: "/products/brass-cable-glands/earth-tags/",
  conduit: "/products/brass-cable-glands/conduit-gland-parts/",
  capabilities: "/capabilities/",
  quality: "/quality/",
  industries: "/industries/",
  about: "/about/",
  exports: "/exports/",
  germany: "/exports/germany-eu/",
  contact: "/contact/",
  rfq: "/rfq/",
  thanks: "/rfq/thank-you/",
  resources: "/resources/",
  pg: "/resources/pg-thread-chart/",
  metric: "/resources/metric-cable-gland-thread-chart/",
  bsp: "/resources/bsp-thread-chart/",
  npt: "/resources/npt-thread-chart/",
  grades: "/resources/brass-grade-equivalents/",
  guideGrades: "/resources/guides/cw614n-vs-cw617n/",
  guideLeadFree: "/resources/guides/lead-free-dzr-brass/",
  guideBspNpt: "/resources/guides/bsp-vs-npt/",
  guideGlands: "/resources/guides/cable-gland-selection/",
  guideCert: "/resources/guides/en-10204-3-1-certificate/",
  privacy: "/privacy-policy/",
};
