# AirGrip — SEO plan (v0.3, owned by Claude)

v0.3 (content review 2): accessories merged into 5 pages nested under the gland hub; capability sub-pages dropped from v1; home targets "brass components manufacturer"; guides after launch.

Priority: **India first**, then Germany/EU, UK and US. English only.
Keyword choices below are based on buyer search intent and the terms B2B buyers actually use. Search volumes are **not yet measured**.
After launch, validate them with Google Search Console (actual queries) and Keyword Planner, then adjust titles.

## 1. Principles
1. **One search intent per URL.** No two pages compete for the same query.
2. **Hub → category → item.** Every page sits 3 clicks or fewer from home, with breadcrumbs and BreadcrumbList schema.
3. **Content that ranks in B2B is specific:** dimensions, standards, tolerances, grades, part codes. Datasheet tables are rendered as real HTML text, never images.
4. **Location in titles** for India-first queries ("Jamnagar", "India"). Standards in titles for international queries ("DIN 40430", "CW614N").
5. **Technical resources** (thread charts, grade equivalents) earn links and long-tail traffic. They link back to product pages.

## 2. Keyword map (titles ≤ 60 chars where possible)
| URL | Primary query | Secondary | `<title>` |
|---|---|---|---|
| `/` | brass components manufacturer India | brass components Jamnagar, contract manufacturer brass, AirGrip | Brass Components Manufacturer in India \| AirGrip, Jamnagar (home names both offers; the turned-components page owns "brass turned components manufacturer") |
| `/products/` | brass components manufacturer | brass parts supplier India | Brass Components & Cable Glands \| Products \| AirGrip |
| `/products/brass-turned-components/` | brass turned components / CNC turned brass parts | brass turned parts manufacturer Jamnagar, precision turned parts India | Brass Turned Components Manufacturer \| CNC Turned Brass Parts |
| `/products/brass-cable-glands/` | brass cable glands manufacturer | PG cable gland, metric cable gland brass | Brass Cable Glands, PG & Metric \| Manufacturer India \| AirGrip |
| `/products/brass-cable-glands/pressure-screw/` | brass pressure screw cable gland | cable gland pressure screw PG, dome cap nut | Brass Pressure Screws for Cable Glands, PG & Metric \| AirGrip |
| `…/clamping-jaw-cable-gland/` · `…/strain-relief-cable-gland/` | clamping jaw / strain relief cable gland | brass strain relief gland PG | (same pattern) |
| accessories (content review 2): 5 item pages nested under `/products/brass-cable-glands/<item>/`: `lock-nuts/`, `stop-plugs/`, `earth-tags/`, `thread-adapters/` (reducers, enlargers, adapters), `conduit-gland-parts/` (male bush, conduit nut). Dome cap nut is a spare-part row on the gland pages | cable gland lock nut, EMC lock nut, stop plug / blanking plug, earth tag, cable gland reducer / adapter / enlarger, conduit gland male bush | Brass Cable Gland Lock Nuts, PG & Metric \| AirGrip (same pattern per item) |
| `/products/brass-fittings/` | custom brass fittings manufacturer | BSP brass fittings, NPT brass fittings, DZR fittings | Custom Brass Fittings, BSP & NPT \| Manufacturer India |
| `/products/brass-forged-components/` | brass forging manufacturer India | hot forged brass parts, forged brass components | Brass Forged Components, 25 g–1 kg \| AirGrip Jamnagar |
| `/products/brass-moulding-inserts/` | brass inserts for plastic moulding | brass threaded inserts, knurled inserts | Brass Moulding Inserts for Plastics \| AirGrip |
| `/products/brass-electrical-terminals/` | brass terminal blocks manufacturer | brass neutral link, earth link, connectors | Brass Electrical Terminals & Connectors \| AirGrip |
| `/products/special-fasteners/` | brass special fasteners | custom brass screws, studs | Special Brass Fasteners to Drawing \| AirGrip |
| `/products/metal-stamping-parts/` | brass stamping parts manufacturer | earth tag, stamped brass terminals | Brass Stamping Parts \| AirGrip Jamnagar |
| `/capabilities/` | brass machining capabilities | CNC turning brass, cam automat parts | Brass Machining Capabilities: CNC Turning, Forging, Plating |
| ~~`/capabilities/cnc-turning/`, `/capabilities/brass-forging/`, `/capabilities/materials-and-tolerances/`~~ | dropped from v1: those intents are served by `/capabilities/` (#processes, #range), `/products/brass-forged-components/` and `/resources/brass-grade-equivalents/`, so no thin pages compete with them | | |
| `/quality/` | ISO 9001 brass component supplier | PPAP brass parts, traceability | Quality: ISO 9001:2015, Inspection & Traceability \| AirGrip |
| `/industries/` | brass components for electrical / plumbing / HVAC | (each sector) | Industries Served: Electrical, Plumbing, HVAC… |
| `/exports/` | brass components exporter India | brass parts supplier Germany / UK / USA | Brass Components Exporter from India \| AirGrip |
| `/resources/pg-thread-chart/` | PG thread chart | PG thread dimensions, DIN 40430 | PG Thread Chart (DIN 40430): Sizes, Pitch, Core Ø |
| `/resources/metric-cable-gland-thread-chart/` | metric cable gland thread sizes | EN 60423 thread chart | (same pattern) |
| `/resources/bsp-thread-chart/` | BSP thread chart | G thread dimensions ISO 228-1 | (same pattern) |
| `/resources/npt-thread-chart/` | NPT thread chart | NPT dimensions mm | (same pattern) |
| `/resources/brass-grade-equivalents/` | CW614N equivalent | CZ121 equivalent, C38500 vs CW614N | Brass Grade Equivalents: CW614N, CZ121, C38500, IS 319 |
| `/about/` | AirGrip Jamnagar | brass manufacturer since 1988 | About AirGrip: Brass Component Manufacturer since 1988 |
| `/rfq/` | (conversion page) | | Request a Quote: Send Your Drawing \| AirGrip |
| `/contact/` | AirGrip contact Jamnagar | GIDC Dared brass | Contact AirGrip, Jamnagar: Phone, WhatsApp, Email |

## 3. Technical SEO (build requirements)
- **Pre-rendered HTML** for every route (static generation). No content that only appears after JavaScript runs.
- Unique `<title>` and meta description per page. Self-referencing canonical. `hreflang` is not needed (English only).
- **Schema (JSON-LD):** `Organization` (logo, sameAs, subOrganization: group companies) · `LocalBusiness`/`Manufacturer`-style
  data (address, geo, phone, openingHours Sa–Th 09:30–18:30) · `Product` on item pages (name, sku = part code, material, brand) ·
  `BreadcrumbList` on every page · `FAQPage` where a visible FAQ exists · `Dataset` or a `Table` description on thread charts.
- **Status 2026-11-22:** `Product` markup deliberately **not** added: Google's product snippets need `offers` (price),
  `review` or `aggregateRating`, and AirGrip publishes none, so the markup would earn nothing and only show up as
  invalid items in Search Console. Revisit if prices or reviews are ever published. Photos ≥ 1200 px have 800 px
  copies (`src/lib/img.ts`, srcset); share images per page (`tools/make-og.mjs`).
- `sitemap.xml` (auto-generated) and `robots.txt`. Custom 404 page with search and links.
- **Core Web Vitals:** LCP < 2.0 s, CLS < 0.05, INP < 200 ms. Self-hosted subset woff2 fonts with preload. AVIF/WebP with `srcset`.
  No layout shift from fonts (`size-adjust` fallback).
- Images: descriptive file names and alt text (e.g. `brass-pressure-screw-pg9.webp`).
- Internal links: every product page links to its thread chart and grade page; every resource links to the products that use it.
- Open Graph and Twitter cards (1200×630 image per template: drawing plus title).
- Analytics: GA4 with Consent Mode v2. Events: `rfq_submit`, `basket_add`, `pdf_download`, `whatsapp_click`, `tel_click`, `mailto_click`.

## 4. Local & off-site (India-first)
- **Google Business Profile** for "AirGrip, GIDC Dared, Jamnagar" (category: *Brass product manufacturer*). Add photos from the shoot,
  hours Sat–Thu, the website and the RFQ link. Ask existing Indian customers for reviews.
- Consistent NAP (name, address, phone) everywhere: website, GBP, IndiaMART/TradeIndia (if used), LinkedIn, Facebook.
- LinkedIn company page, kept current.
- Export directories later: Europages / Kompass (Germany/EU).

## 5. 301 redirect map (old → new)
| Old URL | New URL |
|---|---|
| `/` | `/` |
| `/about-us/` · `/why-us/` · `/plant/` · `/career/` | `/about/` |
| `/market-we-serve-2/` | `/industries/` |
| `/market-we-serve/` | `/exports/` |
| `/processing-material-range-and-accuracy/` | `/capabilities/#range` (served as `/capabilities/`) |
| `/process-we-do-2/` · `/process-we-do/` · `/packaging/` | `/capabilities/` |
| `/quality-control/` · `/quality-assurance/` | `/quality/` |
| `/cnc-turned-components-2/` | `/products/brass-turned-components/` |
| `/cable-gland/` | `/products/brass-cable-glands/` |
| `/cable-gland-with-clamping-jaws/` | `/products/brass-cable-glands/clamping-jaw-cable-gland/` |
| `/kompakt-cable-gland/` | `/products/brass-cable-glands/pressure-screw/` |
| `/favorit-cable-gland/` | `/products/brass-cable-glands/strain-relief-cable-gland/` |
| `/cable-gland-adapters/` | `/products/brass-cable-glands/thread-adapters/` |
| `/cable-gland-enlargers/` | `/products/brass-cable-glands/thread-adapters/` |
| `/cable-gland-reducers/` | `/products/brass-cable-glands/thread-adapters/` |
| `/cable-gland-lock-nuts-cable-gland-locking-nuts/` | `/products/brass-cable-glands/lock-nuts/` |
| `/stop-plug-blank-plug-stooping-plug-blanking-plug/` | `/products/brass-cable-glands/stop-plugs/` |
| `/male-bush-conduit-gland-male-bush/` | `/products/brass-cable-glands/conduit-gland-parts/` |
| `/conduit-gland-parts/` | `/products/brass-cable-glands/conduit-gland-parts/` |
| `/earthing-tag/` | `/products/brass-cable-glands/earth-tags/` |
| `/custom-brass-fittings/` | `/products/brass-fittings/` |
| `/special-fasteners/` | `/products/special-fasteners/` |
| `/brass-injection-molding-inserts/` | `/products/brass-moulding-inserts/` |
| `/custom-metal-stamping-parts/` | `/products/metal-stamping-parts/` |
| `/electrical-terminal-blocks-connectors/` | `/products/brass-electrical-terminals/` |
| `/brass-forged-machined-components/` | `/products/brass-forged-components/` |
| `/technical-library/` | `/resources/` |
| `/enquiry/` | `/rfq/` |
| `/contact/` | `/contact/` |
| Old WordPress paths (`/wp-content/uploads/…` images, `/?p=…`, `/feed/`) | 410 Gone, or a 301 to the matching new image where one exists |

## 6. Content roadmap (after launch; guides are not in v1)
**Live 2026-11-22** (`src/data/guides.tsx`, template `src/templates/GuidePage.tsx`, TechArticle + FAQPage data):
`/resources/guides/cable-gland-selection/`, `/resources/guides/bsp-vs-npt/`, `/resources/guides/cw614n-vs-cw617n/`,
`/resources/guides/lead-free-dzr-brass/`. Topics chosen from Google autocomplete demand (2026-11-22): "cable gland size
chart / how to select cable gland size / pg vs metric", "bsp vs npt (difference, compatibility)", "cw614n vs cw617n",
"lead free brass grade / dzr brass meaning / cw511l". The RFQ guide was dropped (no search demand). Next: add AirGrip's
clamping ranges to the gland guide when Ketan's size table arrives; then decide further guides from Search Console queries.
Baseline ranks (2026-11-22, Google India, pws=0): #1 for "airgrip" and "airgrip jamnagar"; not on page 1 for
"brass turned components manufacturer india", "brass components manufacturer jamnagar", "brass cable glands manufacturer
india", "brass cable gland manufacturer jamnagar", "brass electrical terminals manufacturer jamnagar", "brass moulding
inserts manufacturer", "pg thread chart", "brass components supplier india" (from Germany). IndiaMART is #1 on four of them;
Jamnagar searches show a map pack (Google Business Profile needed).

1. Buyer guides: *Choosing a brass grade for turned parts* · *Cable gland selection: PG vs metric, IP ratings* ·
   *How to send an RFQ for turned parts (what we need)* · *Lead-free brass: CW511L vs CW724R*.
2. A PG ↔ metric adapter guide (the metric, BSP and NPT charts already exist in v1).
3. Case notes (anonymised) once customers approve them.

## 7. Measurement
- Search Console: queries, CTR per page, index coverage. Monthly review.
- GA4 conversions: RFQ submissions, quote-list usage, WhatsApp and phone clicks.
- Targets for the first 6 months (to agree): top-10 rankings for "PG thread chart", "brass turned components manufacturer Jamnagar"
  and "brass cable gland PG" (JACOB product names are no longer targeted). RFQ volume above the old site's baseline.
