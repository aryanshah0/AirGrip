# AirGrip website — Requirements (v0.2, draft)

Status: **requirements phase**. Next phases: design (with an adversarial senior-designer review), then a fresh build.
Last updated: 2026-11-13

## 1. Goal
A new airgrip.co.in that presents AirGrip as a credible contract manufacturer of **brass turned components**
(plus the related ranges) to **B2B buyers**: procurement, sourcing and engineering teams at OEMs and Tier-1/2 suppliers.
The site exists to win RFQs, and it must look polished, distinctive and industry-standard, with the strongest SEO we can give it.

## 2. Decisions
| Topic | Decision |
|---|---|
| Brand name | **AirGrip** everywhere. Full name used once: "Air Grip Group of Companies". |
| Logo | `../aigrip.svg` (auto-traced, 2 colours: charcoal #2A2928, blue #1A4D9A). Needs a viewBox and optimisation, plus a compact header lockup. The logo does **not** drive the design system and may be redesigned later, so it is a swappable component. |
| Colours | Own palette for the site, not taken from the logo. |
| Visual direction | **Engineered precision**: light, warm drafting-paper neutrals, graphite ink, a brass accent used sparingly, drawing-style hairlines, spec-sheet tables, strict grid. Light theme only. |
| Motion | Subtle everywhere, plus **one signature moment**: a homepage "bar-to-part" process line drawn as engineering line art. |
| Design system | One fixed system (tokens, type, grid, components) agreed **before** the build. No generic "AI template" look. |
| Design review | Claude designs, a senior-designer critic agent attacks it, Claude revises, and the user approves. |
| Product scope | **All 8 groups** from the old site, redone. |
| Product pages | **Hybrid**: custom groups get capability pages. Cable glands and accessories get datasheet pages with size and thread tables (AirGrip has the data). |
| Enquiries | **RFQ form with drawing upload** (PDF/DWG/DXF/STEP/IGES) plus a contact form plus a WhatsApp button. |
| SEO priority | **India first**, then Germany and other export markets. |
| SEO content | Resources hub (grades, thread charts, buyer guides). No blog in v1. |
| Language | English only, built so other languages can be added later. |
| Copy | Claude writes all copy, the user reviews it, and every claim that needs checking is flagged. |
| Trust proof | ISO 9001:2015 certificate and hard numbers (placeholders until supplied). No client logos or testimonials. |
| Downloads | Company profile PDF and product catalogue PDF (Claude designs them). |
| Photos | Best existing photos cleaned up, plus labelled placeholders, plus a shot list for a professional shoot. Copied stock industry photos are dropped. |
| Analytics | GA4 with Consent Mode v2, cookie banner, Search Console, RFQ conversion events, Privacy Policy. |
| Tech | React, every route pre-rendered to static HTML (works on any Hostinger plan). |
| Careers | **Not needed.** The old `/career/` URL redirects to `/about/`. |
| Group companies | Mentioned **only on the About page** (short "The AirGrip Group" block) and in Organization schema. Not in the header or footer. |
| Leadership | Ketan Shah and Shree Shah on the About page. |
| Hosting / deploy | Decide at the end. Repo: github.com/aryanshah0/AirGrip (empty). |

## 3. Company facts
| Fact | Value | Status |
|---|---|---|
| Phone / WhatsApp | +91 93166 15007 | confirmed (WhatsApp number to confirm) |
| Email (shown + RFQ recipient) | sales@airgrip.in | confirmed |
| Address | Plot No. 3966 & 3967, Road No. U, GIDC Phase-III, Dared, Jamnagar 361004, Gujarat, India | confirmed |
| Founded | 1988 ("Since 1988") | from old site |
| Quality system | ISO 9001:2015 (certificate no., body, expiry: placeholder) | confirmed version |
| RoHS | RoHS compliant | from old site, confirm |
| Plant | 40,000 sq ft shed, 18,000 sq ft covered, room to expand | from old site, confirm |
| Export share | 25% of turnover | from old site, confirm |
| Export countries | 41 listed on old site (old headline wrongly said "11") | confirm |
| Machining range | Ø 5–100 mm, length up to 100 mm, ±0.05 mm, run-out ±0.05 mm | from old site |
| Forging range | 25 g – 1.0 kg; shot-blasted / natural / bright yellow | from old site |
| Stamping | thickness ±0.05 mm, diameter ±0.02 mm | from old site |
| Documentation | PPAP Level 3, material test reports, in-process and final inspection reports, batch traceability | from old site |
| Machine counts, monthly capacity, headcount | **placeholder** | user to supply later |
| Google Business Profile, LinkedIn, Facebook | **placeholder** | user to supply / create |
| Group companies | Asian Brass Technocrats · AirGrip International · Devi Metals · Copper Alloy Component Solutions · AirGrip Industrie | confirmed |

## 4. Sitemap (SEO-led)
Rules: one search intent per page, short keyword slugs, hub → category → item, breadcrumbs everywhere,
and no thin or duplicate pages.

| URL | Primary search intent (India first) | Replaces old |
|---|---|---|
| `/` | brass components manufacturer India / Jamnagar (brand; names both offers) | `/` |
| `/products/` | brass components manufacturer (hub) | — |
| `/products/brass-turned-components/` | brass turned parts, CNC turned components | `/cnc-turned-components-2/` |
| `/products/brass-cable-glands/` | brass cable gland manufacturer | `/cable-gland/` |
| ↳ `/clamping-jaw-cable-gland/`, `/kompakt-cable-gland/`, `/favorit-cable-gland/` | model-specific | 3 old pages |
| `/products/brass-cable-glands/#accessories` | (accessory hub merged into the gland hub, v0.3.1) | — |
| ↳ `/lock-nuts/` (brass + EMC), `/stop-plugs/`, `/earth-tags/`, `/thread-adapters/` (reducers, enlargers and adapters, one from→to table), `/conduit-gland-parts/` (male bush + conduit gland nut) | item-specific (5 pages, merged in content review 2; split again once each has dimensions). Dome cap nut = spare-part row on the gland pages | 9 old pages (old URLs 301 to the merged page) |
| `/products/brass-fittings/` | custom brass fittings manufacturer | `/custom-brass-fittings/` |
| `/products/brass-forged-components/` | brass forged and machined components | `/brass-forged-machined-components/` |
| `/products/brass-moulding-inserts/` | brass inserts for plastic moulding | `/brass-injection-molding-inserts/` |
| `/products/brass-electrical-terminals/` | brass terminal blocks and connectors | `/electrical-terminal-blocks-connectors/` |
| `/products/special-fasteners/` | custom / special fasteners | `/special-fasteners/` |
| `/products/metal-stamping-parts/` | metal stamping parts | `/custom-metal-stamping-parts/` |
| `/capabilities/` | brass machining capabilities: process overview, machine park, packaging and dispatch | `/process-we-do-2/`, `/process-we-do/`, `/packaging/` |
| ~~capability sub-pages~~ | dropped from v1 (content review 2): forging is served by `/products/brass-forged-components/`, CNC turning by `/products/brass-turned-components/`, materials and tolerances by `/capabilities/#range` and `/resources/brass-grade-equivalents/` | `/processing-material-range-and-accuracy/` → `/capabilities/#range` |
| `/quality/` | ISO 9001:2015, inspection lab, PPAP, traceability | `/quality-control/`, `/quality-assurance/` |
| `/industries/` | industries served: one table, confirmed sectors only; footer link, not in the header nav | `/market-we-serve-2/` |
| `/exports/` | brass components exporter (Germany, EU, UK, US…) | `/market-we-serve/` |
| `/resources/` | technical resources hub | `/technical-library/` |
| `/resources/brass-grade-equivalents/` | CZ121 / CW614N / C38500 equivalents | part of technical library |
| `/resources/pg-thread-chart/` | PG thread chart (DIN 40430) | ″ |
| `/resources/metric-cable-gland-thread-chart/` | M thread for cable glands (EN 60423) | ″ |
| `/resources/bsp-thread-chart/` | BSP / G thread chart (ISO 228-1) | ″ |
| `/resources/npt-thread-chart/` | NPT chart (ANSI B1.20.1). Old data incomplete, fill from the standard | ″ |
| `/resources/guides/…` | **after launch** (not v1): choosing a brass grade, cable gland selection, how to send an RFQ | — |
| `/resources/#downloads` | company profile, catalogue, ISO certificate, RoHS declaration; each shown only once the file exists | — |
| `/about/` | company profile, leadership, facility, the AirGrip Group | `/about-us/`, `/why-us/`, `/plant/`, `/career/` |
| `/rfq/` | request a quote (conversion page) | `/enquiry/` |
| `/contact/` | contact AirGrip Jamnagar | `/contact/` |
| `/privacy-policy/` | — | — |
| `/rfq/thank-you/` | noindex (conversion tracking) | — |

All 35 old URLs get 301 redirects to the URLs above.

## 5. Technical SEO baseline
- Pre-rendered HTML for every route. Unique title and meta description per page. Canonical tags. Open Graph and Twitter cards.
- Schema: Organization (with subOrganization for group companies), LocalBusiness (Jamnagar address, geo, hours), Product (catalogue items), BreadcrumbList, and FAQPage only where a real FAQ exists.
- `sitemap.xml`, `robots.txt`, 301 map, custom 404.
- Core Web Vitals targets: LCP < 2.0 s, CLS < 0.05, INP < 200 ms on mid-range mobile over 4G. Responsive AVIF/WebP images, self-hosted subset fonts.
- Accessibility: WCAG 2.2 AA.
- Google Business Profile set up or claimed (India-first local SEO).

## 6. More decisions (round 5)
- **Exports page:** show **regions** (Europe · UK · North America · Middle East · Africa · Asia-Pacific), highlight key markets (Germany, UK, France, USA, Canada) and give a total count. No full country list, and Iran / Russia are not named.
- **Leadership:** Ketan Shah, Founder & Managing Director. Shree Shah, Marketing Director.
- **WhatsApp:** same number, +91 93166 15007.

## 7. Cable gland data (extracted from old site, needs checking)
| Item | Data on old site | Problem |
|---|---|---|
| Clamping-jaw gland | Full table PG7–PG48 and M12–M63: thread, A/F, A/C, total length, thread length, hole | Every metric row is identical to a PG row (M25 = PG21, M63 = PG48). PG21 and PG29 hole are both 17.5. Looks copy-pasted. |
| Kompakt gland | Same columns | PG7, PG36–48, M12, M40–63 empty. Metric rows copy PG rows. |
| Favorit gland | Same columns plus one extra column | PG7, PG42–48, M12, M40–63 empty. |
| 9 accessories | Size lists only (PG / M / BSP / NPT) | No dimensions. |
| All glands | Material CuZn39Pb3 / IS 319 composition | **No cable clamping range, IP rating, seal material or plating options.** |

Plan: build datasheet tables from this data, with missing or suspect cells shown as "on request" (not invented).
The user confirms or corrects the numbers from AirGrip's drawings before launch.

## 8. Closing decisions
- `sales@airgrip.in` email on the `airgrip.co.in` site is intended. No domain change.
- Leadership portraits: placeholders, added to the photo-shoot shot list.
- **Claude owns SEO** end to end: sitemap, keywords, metadata, schema, redirects and the technical audit. The sitemap in section 4 is approved on that basis.
- Approach: deliver v1, then improve in iterations.

**Requirements: CLOSED (v1.0, 2026-11-13).** Next: design phase.

## 9. Facts confirmed during design (2026-11-13)
- **Rod is bought from outside mills.** AirGrip does **not** cast or extrude in-house. No "cast/extrude our own rod" claim
  anywhere. Old-site "Raw Material Casting / Extrusion" steps are not used. The process story starts at **incoming rod verification**
  (spectro check plus material test report).
- **Plating offered:** nickel, tin, zinc.
- **RFQ reply time:** within 1 working day (confirmed, can be shown).
- **MOQ:** depends on part size and process (no fixed figure shown).
- **Typical lead times:** samples 2–3 weeks, production 4–6 weeks (shown as "typical").
- **Incoterms:** EXW Jamnagar, FOB, CIF / CFR.
- **NDA:** signed on request before drawings are shared. RFQ form has an "NDA required" tick box.
- **Tolerance claim:** ±0.05 mm (all processes). The example drawing must not show tighter fits.
- **Lead-free / DZR brass** (CW511L, CW724R, CW602N): available on request.
- **Certification:** ISO 9001:2015 only (**no IATF 16949**). PPAP Level 3 offered on request. Automotive is not the lead story.
- **Export ports:** Mundra, Nhava Sheva (JNPT), plus air freight for urgent shipments and samples.
- **Office hours:** Saturday–Thursday, 09:30–18:30 IST (Friday weekly off). Show the CET equivalent.
- **Named buyer contact:** Shree Shah, Marketing Director (photo placeholder).
- **Part codes (APPROVED scheme):** `AG-[family]-[thread+size]-[finish]`. Finish: N natural · NI nickel · SN tin · ZN zinc.
  Thread: PG09, M20, G12 (BSP 1/2"), N12 (NPT 1/2"). Families: KG Kompakt · FG Favorit · CJ Clamping-jaw · LN Lock nut ·
  LE EMC lock nut · RD Reducer · AD Adapter · EN Enlarger · SP Stop plug · MB Male bush · CN Conduit gland nut · DN Dome cap nut ·
  ET Earth tag. Examples: AG-KG-PG09-N, AG-LN-M20-NI, AG-RD-PG16M20-N.
- **Gland IP rating and seal material:** unknown, so shown as TBC (must be filled before launch).
- **Export claims approved:** "Exported to 40+ countries" and "25 % of output exported".
- **Threads cut:** PG, Metric, BSP, BSPT (R/Rc), NPT, UNC/UNF, plus special or customer threads to drawing.
- **Autonomous scope (user away):** full design revision, all page templates (desktop and mobile), critic round 2, fixes,
  then stop at a review page. No implementation.
- **Design process:** the full design (every page template, desktop and mobile) is finished and reviewed by the user page by page
  **before** any implementation starts.
- **Volumes:** "runs from a few thousand pieces to millions a year" confirmed accurate.
- **Spectro (in-house vs lab), CNC live tooling, cam-automat bar range:** TBC.
- **Plating (Ni/Sn/Zn): in-house.** One wording everywhere: "plated in our plant".
- **SPMs / fixtures built in-house:** TBC.
- **Exports page:** regions plus key markets plus "40+ countries" only. No long country list.
- **Stamping tolerance:** dropped. **±0.05 mm is the only tolerance claim, for all processes.**
- **Old gland table "HOLE" column:** meaning TBC (cable bore or panel hole). Kompakt AC values are geometrically impossible
  (AC < 1.155 × AF), so the whole PG table is shown as "being re-verified".
- **Part-code token for PG 13.5:** `PG13` (e.g. AG-KG-PG13-N).
- **EN 10204 3.1 mill certificates:** TBC.
- **Legal name, GSTIN, IEC:** shown in the footer and on Contact. The user will supply them (placeholders for now).
- **Expandable space:** old site says 6,000 sq ft ground plus 18,000 sq ft first floor, i.e. 24,000 sq ft expandable.
- **Wording rule (user):** no "family-run" or similar sentimental terms. Describe AirGrip by facts (founded 1988, plant size, processes, quality system).

## 10. Content review 2 decisions (2026-11-13)
Yardstick: each page shows what its buyer needs, benchmarked against competitors; the old site is a source of facts, not a checklist (docs/CONTENT-REVIEW-2.md).
- **Accessories:** 5 pages: lock nuts · stop plugs · earth tags · reducers, enlargers & adapters (from→to table) · conduit gland parts (male bush + conduit nut). Dome cap nut = spare-part row on the gland pages.
- **Home:** router plus one proof band; 4 sections (hero · product groups · proof · quote). Detail lives on Capabilities, Quality and About.
- **Industries:** trimmed to sectors AirGrip confirms, one table; footer link, removed from the header nav.
- **Unconfirmed old-site lists** (e.g. sweat/welding fittings, wood and Phillips screws, non-brass stampings, BA/BSW threads): shown **core only**; the rest goes to Ketan as questions and returns only if confirmed.
- **Gland names:** keep Kompakt, Favorit and clamping-jaw in the design for now, with the JACOB review note; rename only if Ketan says so.
- **"+ Add" on gland and accessory size tables** stays, with the note "size list being confirmed"; at launch only confirmed sizes keep the button.
- **Launch policy:** launch waits until **all priority-A questions are answered**. A items are not hidden to launch early.
- **Guides:** after launch, not v1.
- **One home per fact:** ranges → Capabilities #range; grade table → Grades page; route card and batch documents → Quality; lead time / MOQ / NDA FAQ → Ordering & shipping; Shree Shah card → RFQ and Contact only.
- **Downloads:** free direct downloads, no email gate; tracked with the GA4 `pdf_download` event.
- **PDFs:** Claude produces the company profile PDF and the cable-gland catalogue PDF in v1 from the same content source, after the site text is final; the catalogue only after the gland data is confirmed.
- **Form delivery** (PHP mail on Hostinger vs a form service): decided at build time.
- **Hostinger plan:** unknown; check what is purchased on the account before deployment planning.

## 11. Owner answers via the user (2026-11-14)
| Topic | Decision |
|---|---|
| Gland names | Generic names; JACOB names not used. Kompakt → **Brass pressure screw** (AG-PS), Favorit → **Strain-relief cable gland** (AG-SR), Clamping-jaw stays (AG-CJ). |
| Kompakt | A **pressure screw only** (gland component), not a complete gland: no seal / IP / EN 62444 rows. Listed with the glands. |
| Inch part codes | Approved: G38, G12, G34, G1, G114, G112; NPT the same with N. |
| Turning range | Ø5–100 mm everywhere (fittings included). |
| General tolerance | ISO 2768-m unless the drawing says otherwise. |
| Route card | Control plan at contract review and full first-off approval: both true. |
| Reply promise | **Within two working days** (Sat–Thu, IST) everywhere. |
| NDA | AirGrip signs the buyer's NDA before drawings are shared. |
| Audit / quality contact | Shree Shah. |
| Document costs | No cost column on the site; agreed in the quote. |
| Privacy, EU/UK representative | Legal advice before launch. |
| Payment terms | "Agreed per order in the quote", including invoice currency. |
| Mill certificates | EN 10204 3.1 available with every batch. |
| REACH / SCIP | Statement on request. |

## 12. Ketan's answers on the call (2026-11-14, relayed by the user)
| Topic | Answer |
|---|---|
| Gland names | Generic names confirmed (clamping-jaw gland, strain-relief gland, pressure screw). |
| Ex-Kompakt | Only the nut part: pressure screw (gland component). |
| Whose range | AirGrip's own range (not made for JACOB). |
| Gland sizes | PG 7–48 and **M12–M80**, all types. |
| Seal / IP | **EPDM seal, IP54**. |
| HOLE column | Cable passage (inner hole). |
| Size table with cable ranges + production drawings | Will send; about a month. |
| Accessory sizes | Same range as the glands; conversions (reducers/adapters) on request. |
| Pressure screw vs dome cap nut | Different parts. |
| Hazardous areas / custom glands | Not Ex/ATEX certified; no glands to customer drawings (standard range only). |
| Volume | Under 5 lakh pieces a month. |
| Machines | 12 CNC, 20 automats, 21 SPM (built in-house), 10 drilling, 3 presses (66). No live tooling. |
| Team | 50–150 people. |
| Stamping | Regular line; brass, copper, steel. |
| Screws and bolts | Made in-house: add back to Special fasteners. |
| Drawing review | Website says "our team reviews every drawing". |
| Legal name / IDs | Invoices as AirGrip; GSTIN and IEC **not shown** on the site. |
| ISO 9001 | Will send a copy (number, body, expiry from it). |
| Certificate of Conformity | With every batch. |
| Ketan bio / photo | Later. |
| Group companies | Names only. |
| Deepak Shah | No longer with AirGrip. |
| LinkedIn / Google Maps | Both exist (URL and login owner to collect). |
| Confirmed as on the site | Ø5–100 mm, ±0.05 mm, ISO 2768-m; control plan + first-off; 2-working-day reply; Shree Shah quotes + audits; we sign buyer's NDA; payment per order; 3.1 certs; REACH on request; Ni/Sn/Zn in-house; samples 2–3 wks, production 4–6 wks; ~25 % exports, 40+ countries. |
| Industries | Electrical & switchgear, automotive, plumbing & sanitary, HVAC & refrigeration, hydraulics & pneumatics, plastic moulding / pipes. Others removed. |
| Stock | Made to order. |
| Samples | Free; buyer pays courier. |
| India | Road transport; MSME/Udyam registered. |
| Photos | Real customer parts may be shown (no names); photo shoot later. |
| Lab tests | Outside lab (composition and strength). |
| Calibration | NABL-accredited, yearly. |
| Complaints | 8D report within 5 days. |
| PPM / on-time delivery | Not published. |
| Plating | Ni, Sn, Zn **plus silver and chrome**. |
| Brass grades | CuZn39Pb3 / CW614N, CW617N, IS 319. |
| Threads / forging | BA and BSW threads yes; hot forging only (no cold forging). |
| Old phones / email | Not used; only +91 93166 15007 and sales@airgrip.in. |
| Stop plugs | Slotted dome and hex heads. |
| Terminals | Cut from extruded profile, then machined. |
| Final inspection | Sample-based (plan/AQL not given). |

Added by the final fact review (each open marker on the pages now has an owner): pressure-screw thread internal or external; whether the 3 presses are forging or stamping presses (and forging-press count); history milestones; plant-visit details (airport, safety rules); which instruments are in-house vs lab (hardness, coating, roughness, vision), profile projector/CMM, taper step gauges; O-ring option on stop plugs/adapters; EMC lock-nut design; fitting types flare/air-brake/sweat/welding (C6); origin of current photos (C3); terminal rating 6–300 A; conduit-nut and earth-tag function wording; FCA/CPT for air samples and certificate of origin; M80 pitch.
Still to collect from Ketan: size table with cable ranges + drawings (≈1 month), ISO certificate copy, bio and photo, LinkedIn URL and Google profile login, plating thickness ranges, earth-tag strip grade, metric through-hole values, pieces per pack, existing privacy policy / terms (if any). Legal advice on the EU/UK representative still pending.

## 13. Final review decisions (2026-11-14, while the user was away)
- Part codes: stop plugs carry the head type in the family token, like lock nuts (AG-LN / AG-LE): **AG-SP** slotted dome, **AG-SH** hex head.
- Rule for the locked design: nothing unconfirmed is shown on a page. Items still owed by Ketan are listed in docs/CALL-SHEET-KETAN.md and docs/FINAL-STATUS.md; held-back dimension cells show "—" with the footnote "dimensions with your quote".
- RoHS: stated only as the material fact (leaded brass is covered by Annex III exemption 6(c)); no "RoHS compliant" badge until AirGrip signs a declaration.
- The RFQ form keeps its title-block field style with boxed line items (house signature), as an intentional design choice.
