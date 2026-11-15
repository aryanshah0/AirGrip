# SEO findings: SEO specialist (India + Germany B2B)
(Saved by the coordinator from the reviewer's returned report; the reviewer could not write files. Evidence in the session scratchpad attack/seo/work/: audit.txt, cwv*.txt, suggest-in.txt, suggest-de.txt, cdx-all.txt, bharti-*.txt, comp/.)

Summary: The technical base beats every named competitor (pre-rendered HTML, unique titles/descriptions, self-canonicals, clean sitemap/robots, BreadcrumbList everywhere, working 301/410/404, lab LCP < 1 s on most pages). The weak points are words: money pages omit what Indian buyers type ("manufacturer", "Jamnagar", "precision", "electrical parts"), and home and About compete for the top local query. Then: legacy redirects, uncompressed JS, one font-swap CLS, Business Profile ties, Germany/EU targeting. P1 3 · P2 5 · P3 15. All volumes/difficulty are **estimates** from Google autocomplete (IP-located, 2026-11-15) and public results; no Search Console / Keyword Planner. Web search was US-based, not google.co.in.

Context (coordinator verified 2026-11-15 with dig/whois): airgrip.co.in → NXDOMAIN, airgrip.in → SERVFAIL; both registered to 2027-02-16 (Netandhost) with Hostinger parking nameservers (ns1-4.dns-parking.com / aurora+nebula.dns-parking.com) and no records. Old site offline (last Wayback capture 2026-07-12); mail to sales@airgrip.in likely not delivered.

## Keyword map (current)
| URL | Target (primary · secondary) | Status |
|---|---|---|
| / | brass components manufacturer in jamnagar / india · brass parts manufacturer jamnagar | OK, competes with /about/ (SEO-03) |
| /products/ | hub · brass parts supplier India | fine |
| /products/brass-turned-components/ | brass turned components manufacturer (india/jamnagar) · brass precision turned components, brass cnc turned parts | weak (SEO-01) |
| /products/brass-electrical-terminals/ | brass electrical parts manufacturer (jamnagar) · brass terminal block, neutral link | gap (SEO-02) |
| /products/brass-fittings/ | brass fittings manufacturers in jamnagar · BSP/NPT | good |
| /products/brass-forged-components/ | brass forging manufacturers in jamnagar | OK; title 82 chars truncated |
| /products/brass-moulding-inserts/ | brass inserts manufacturer · for plastic/injection molding | good |
| /products/special-fasteners/ | brass fasteners manufacturers in jamnagar | no "manufacturer" (SEO-01) |
| /products/metal-stamping-parts/ | brass stamping parts manufacturer | OK |
| /products/brass-cable-glands/ | brass PG cable gland, brass cable gland manufacturer | good (Indian generic "brass cable gland" = double-compression, which AirGrip doesn't make, so the PG/metric qualifier is right) |
| 3 gland + 5 accessory pages | type-specific queries | good; depth limited by owed dimensions |
| /capabilities/, /quality/ | support/trust | fine |
| /industries/ | no real query | P3 |
| /exports/ | brass components exporter India · buyers in europe | Germany/EU weak (SEO-08) |
| charts | pg thread chart etc. | good; metric thin (P3) |
| /about/ | brand | competes with home (SEO-03) |
Gaps: brass electrical parts (SEO-02); "<product> hsn code" (P3, owner fact); gland size chart pdf (owed); Germany/EU sourcing (SEO-08). Cannibalisation: only home vs About.

## P1

### SEO-01 Main money page (and several product pages) omits "manufacturer", "Jamnagar/India", "precision"
- Where: /products/brass-turned-components/; same pattern in titles of glands, forged, fasteners, stamping, terminals (src/routes.ts).
- Evidence: title "Brass Turned Components to Drawing, Ø5–100 mm ±0.05 | AirGrip"; H1 "Brass turned components"; "manufacturer" 0× on the page, "precision" 0× on the whole site, "Jamnagar" once (footer). Autocomplete "brass turned parts" → "…manufacturer", "brass turned components manufacturers in india", "brass cnc turned parts", "brass precision turned parts"; "brass components manufacturer" → "…in jamnagar"; every family → "…manufacturers in jamnagar" (suggest-in.txt). Screenshot attack/seo/airgrip-turned-top-1440.png.
- Why: title and H1 are the strongest on-page signals; Google likely ranks the home page instead.
- Competitor: Geissel H1 "Advanced Cable Glands & Precision Turned Parts"; bhartibrass.com "Brass CNC Turned Parts Manufacturer in India" (added: appears in every turned/inserts/electrical search).
- Fix: Turned title "Brass Turned Components Manufacturer, Jamnagar, India | AirGrip" (63); H1 "Brass turned components, made to drawing"; lead "Precision CNC and cam-automat turned brass parts, made in Jamnagar, India, from brass bar to your drawing: …". Glands "Brass Cable Glands Manufacturer, Jamnagar: PG & Metric | AirGrip" (64). Forged "Brass Forging Manufacturer, Jamnagar: Forged Brass Parts | AirGrip" (66). Fasteners "Brass Fasteners Manufacturer: Special Screws, Bolts, Studs | AirGrip" (68). Stamping "Brass Stamping Parts Manufacturer: Brass, Copper, Steel | AirGrip" (65). Specs stay in the meta description.
- Scope: 8 product pages (+ turned H1/lead) · Effort: S · Big change: no

### SEO-02 No page targets "brass electrical parts", Jamnagar's biggest product-family query
- Where: /products/brass-electrical-terminals/; "electrical parts" appears once on the site (a Capabilities cell).
- Evidence: autocomplete "brass electrical parts" → 10 commercial completions (manufacturers in jamnagar, supplier, exporter, manufacturers in india, buyers in india, hsn code…); "brass parts manufacturer" → "brass electrical parts manufacturers in jamnagar". bhartibrass.com/products/brass-electrical-components/ ranks (~885 words, Product + FAQ schema); AirGrip terminals page 251 words. Old site 2009 URL /Brass-Electrical-Wiring-Accessories.html.
- Fix: title "Brass Electrical Parts: Terminals, Neutral Links & Connectors | AirGrip" (71); H1 "Brass electrical parts: terminals, neutral links & connectors"; short section "Other electrical parts we make" linking earth tags, electrical stampings, cable glands; keep URL.
- Scope: one page · Effort: S · Big change: no

### SEO-03 Home and About compete for "brass components manufacturer in jamnagar"
- Evidence: home "Brass Components Manufacturer in India | AirGrip, Jamnagar"; About "About AirGrip: Brass Component Manufacturer in Jamnagar since 1988" (exact top completion), description repeats it.
- Fix: home "Brass Components Manufacturer in Jamnagar, India | AirGrip" (58); About "About AirGrip: Since 1988 at GIDC Dared, Jamnagar" (49), description about history, people, group companies without "manufacturer in Jamnagar".
- Scope: two pages · Effort: S · Big change: no

## P2

### SEO-04 ~80 legacy URLs (2009–2021) missing from the 301 map → 404
- Where: MAP in site/scripts/prerender.mjs.
- Evidence: Wayback CDX (cdx-all.txt): ~45 /products/*.html + ~35 root *.html; /products/brass-turned-parts.html captured 104× 2012-06…2021-12. On :8443 /products/brass-turned-parts.html and /Brass-Fittings.html → 404. /cnc-turned-components-blog/ (WP, 2023-12) unmapped. All 33 WordPress slugs mapped correctly.
- Why: 12+ years of links (directories, TradeIndia); backlink counts unknown → P2.
- Fix: add to MAP (exact case):
  - Turned: products/brass-turned-parts.html, Brass-Turned-Parts-Components.html, cnc-turned-components-blog/
  - Fittings: products/brass-fittings.html, Brass-Fittings.html
  - Forged: products/brass-forgings-parts.html, Brass-Forgings-Forged-Parts-Components.html
  - Inserts: products/brass-inserts.html, products/threaded-inserts.html, products/ppr-inserts.html, products/cpvc-upvc-inserts.html, Brass-Moulding-Inserts.html
  - Terminals: products/brass-terminal-blocks.html, products/neutral-links.html, products/brass-electrical-connectors.html, Brass-Terminal-Blocks-Connectors-Neutral-Links.html, Brass-Electrical-Wiring-Accessories.html, Brass-Electrical-Wiring-Accessories-Image-Gallery.html
  - Fasteners: products/fasteners.html, Fasteners.html, products/{machine-screws,hex-bolts,hex-nuts,studs-customized-fasteners,washers,wood-screws,sheet-metal-screws,brass-anchor,automotive-battery-fasteners}.html
  - Stamping: products/metal-stamping-parts.html, Metal-Stamping-Parts.html
  - Glands hub: products/brass-cable-glands-accessories.html, products/hutmutter-nut.html
  - Clamping-jaw: products/cable-gland-clamping-jaw.html, Cable-Gland-With-Clamping-Jaw.html
  - Pressure screw: products/kompakt-cable-gland.html, Kompakt-Gland.html
  - Strain-relief: products/favorit-cable-gland.html, Favorit-Gland.html
  - Lock nuts: products/brass-lock-nut.html, products/emc-lock-nut.html, Lock-Nut.html, Emc-Lock-Nut.html
  - Thread adapters: products/{reducer,enlarger,hex-adapter,round-adapter}.html, Reducer.html, Enlarger.html, Hex-Adapter.html, Round-Adapter.html
  - Stop plugs: products/stop-plug.html, Stop-Plug.html
  - Conduit parts: products/brass-male-bush.html, products/conduit-gland-nut.html, Male-Bush.html, Conduit-Gland.html
  - Earth tags: products/earthing-tag.html
  - Grades: brass-specification-equivalents.html, matrial.html
  - Resources: thread-tables.html, techincal-library.html
  - About: about-us.html, about.html, why_airgrip.html, competitive-edge.html, career.html
  - Capabilities: facilities.html, design.html
  - Quality: quality.html, iso.htm
  - Exports: global-exports.html
  - Industries: industry-we-serve.html
  - Contact: contact-us.html
  - RFQ: enquiry.html
  - Products hub: products.html, Gas-Connection-Components-Parts.html, Quick-Connect-Disconnect-Couplings.html
  - Home: index.php, sitemap.html, news-and-update.html
- Scope: .htaccess · Effort: S · Big change: no

### SEO-05 JS bundle served uncompressed; first-visit cookie banner becomes a late LCP (lab 2.4–2.9 s at 390)
- Evidence: curl -skI -H 'Accept-Encoding: gzip, br' https://127.0.0.1:8443/assets/index-*.js → Content-Type text/javascript, no Content-Encoding, 251,080 B (CSS is gzipped). DEFLATE list has application/javascript, not text/javascript; gzipped 76,675 B (−69 %). Banner pre-rendered hidden, shown after hydration. Lab 390 px (1.6 Mbps, 150 ms, 4× CPU, first visit): LCP = banner text on /rfq/ 2.63 s, earth-tags 2.76, clamping-jaw 2.89, strain-relief 2.83, stop-plugs 2.76, conduit 2.77, /resources/ 2.44; /about/ photo 2.42; others 0.6–1.0 s (cwv*.txt). Lab data; Hostinger LiteSpeed may compress JS anyway: check after deploy.
- Fix: (1) add text/javascript to the DEFLATE line in prerender.mjs (verify live with curl -I); (2) tiny inline <head> script that un-hides .consent when localStorage['ag-consent'] is empty. Both recommended; (1) alone saves ~0.8 s at this throttle (estimate).
- Scope: site-wide · Effort: S · Big change: no

### SEO-06 Font swap shifts the pressure-screw page by CLS 0.22 at 390 px
- Cause: Archivo with font-display:swap but no metric-matched fallback @font-face (SEO-PLAN §3 required size-adjust fallback). CLS 0.2198 at ~1.83 s in four runs: breadcrumb LI "Pressure screws" wraps differently in fallback font, DIV.prod moves 29 px. With woff2 blocked CLS = 0. Other pages 0–0.03.
- Fix: "Archivo Fallback" @font-face (local Arial with size-adjust, ascent-override, descent-override) after Archivo in --font-sans; optionally no-wrap the last breadcrumb at ≤ 480 px.
- Scope: site-wide CSS · Effort: S · Big change: no

### SEO-07 Site not tied to the Google Business Profile
- Evidence: Contact map link is an area search (https://www.google.com/maps/search/?api=1&query=GIDC+Phase+3+Dared+Jamnagar+361004); JSON-LD lacks sameAs, hasMap, geo; image is the SVG logo. Name in three forms ("AirGrip", "AIR GRIP GROUP OF COMPANIES" on logo, "Air Grip Group of Companies Plot # 3966, G.I.D.C., Phase - 3, Dared" in old map embed); old site one plot vs now "3966 & 3967, Road No. U"; old numbers +91 79900 38395, +91 94264 65801 likely on old listings.
- Why: "<product> manufacturer in jamnagar" shows a map pack ranked from the Business Profile.
- Competitor: bhartibrass.com GeoCoordinates + PostalAddress JSON-LD on every page.
- Fix: ask owner for (a) public profile share link, (b) exact name/address/phone on the profile, (c) pin coordinates. Link Contact map to it; add sameAs (profile, LinkedIn), hasMap, geo, alternateName ["Air Grip", "Air Grip Group of Companies"]; update the profile to +91 93166 15007 and the new site; one address string everywhere.
- Scope: Contact + JSON-LD · Effort: S once the link arrives · Big change: no

### SEO-08 Germany/EU export targeting is weak
- Evidence: Germany once on /exports/ (table cell); H1 reads as logistics. Autocomplete "brass turned components buyers in europe". bhartibrass.com /export/germany/ ("Brass Components Exporter to Germany | Bharti Enterprise", FAQ schema) + /export/eu/, /uk/, /usa/, /uae/. Geissel EN + DE. .co.in is geotargeted to India, so export queries need explicit on-page signals.
- Fix: one English page /exports/germany-eu/ (no per-country clones), title "Brass Components Supplier for Germany & the EU | AirGrip, India" (63), only confirmed facts (EN CW grades, DIN 40430 / EN 60423, EN 10204 3.1 + CoC every batch, REACH statement on request, RoHS as material fact, PPAP L3 on request, we sign your NDA, EXW/FOB/CIF via Mundra or Nhava Sheva, Mon–Thu morning CET overlap, 2-working-day reply). Ask owner: sea transit to Hamburg/Rotterdam; EU customers describable by sector. /exports/ H1 → "Exporting brass parts from India: ordering & shipping". German pages stay out (settled); note: an English site won't rank for "Messing Drehteile Hersteller" / "Kabelverschraubung Messing".
- Scope: one new page + one H1 · Effort: M · Big change: no

## P3 (post-launch list)
- P3-01 15 meta descriptions > 160 chars (home 219, terminals 222), ~20 titles > 60; key words first, low impact.
- P3-02 Sitemap lastmod = build date everywhere; use real date or drop.
- P3-03 Hidden banner <h2>Cookies on this site</h2> in every page's heading outline.
- P3-04 Add WebSite JSON-LD (site name); plant photo as LocalBusiness image after the shoot.
- P3-05 No Product JSON-LD (no rich result without price/reviews); optional.
- P3-06 FAQPage no longer earns rich results for commercial sites (2023); harmless.
- P3-07 Grades page has no in-body link to a product page; lock nuts, stop plugs, earth tags, conduit, terminals, stamping, fasteners don't link their thread chart.
- P3-08 Metric chart thin (~128 words), stops at M63 while range goes to M80, no clearance-hole column (owed).
- P3-09 "<product> hsn code" searches; ask owner for HS/HSN (follow-up 16), one row per product page.
- P3-10 "pg thread chart pdf", "brass cable gland size chart pdf" complete strongly; print/PDF versions.
- P3-11 /industries/ title "Brass Components for Electrical, Automotive, Plumbing & HVAC | AirGrip".
- P3-12 Inserts: use "injection molding" (US) once.
- P3-13 favicon.svg is a 67 KB logo copy (26 KB gz); small favicon.
- P3-14 /wp-content/uploads/* → 410; old photos could 301 to /img/ for Google Images.
- P3-15 One og.png for all pages; per-template share images were planned.

## Off-site recommendations (not site findings)
- Indian directories dominate generic searches (IndiaMART, TradeIndia, GlobalLinker, plus bhartibrass.com); none of the six named competitors appear. AirGrip had a TradeIndia listing ("AIRGRIP GROUP OF COMPANIES", Seller-375331): claim/refresh with new name/address/phone, link to product pages.
- Germany/EU: Europages, wlw.de, Kompass in English → SEO-08 page; ask owner about export promotion council directory.
- Google Business Profile: photos, website, RFQ link, Sat–Thu hours, reviews.
- LinkedIn into sameAs once URL arrives.
- At launch: Search Console via DNS, submit sitemap, request indexing of home + categories, watch 404s.

## Competitors' ranking
Weak on-page SEO (Paloma "Paloma Turning Co. Pvt Ltd", no H1/schema; Jakap "Home - Jakap"; VAP no H1/description; Rajhans brand title, extrusions business; Vaishnavi decent title + Organization; Geissel strong H1, EN/DE, 100+ years). They rank on domain age, links, directories. AirGrip's on-page beats all six; gap is off-site authority, and the domain is offline. JACOB, Lapp, Hummel (+ Pflitsch, Weidmüller, RS) win generic export accessory queries with per-size datasheets; AirGrip can't compete until gland dimensions arrive; PG chart page can (gewinde-normen.de, Hummel rank today).

## Checked and fine
Pre-rendered content; 32 indexable pages with unique titles/descriptions, absolute self-canonicals; thank-you and 404 noindex,follow and out of sitemap; sitemap = canonicals; robots fine. Redirects on local Apache (http→https, www→bare, trailing slash, index.html→folder; 33 WP slugs; /wp-*, /feed/, ?p= → 410; unknown → custom 404). JSON-LD parses everywhere; BreadcrumbList on inner pages; Organization/LocalBusiness hours correct; FAQPage only with visible FAQ. NAP consistent across footer, Contact, JSON-LD. Every page within 2 clicks; descriptive anchors. Alt text correct. Low near-duplication. Lab LCP 0.6–1.0 s on 16/25 pages at 390, ~0.25 s at 1440; 2–3 small render-blocking CSS (~10 KB gz); font preloaded; desktop CLS ≤ 0.01. lang="en-IN", no hreflang (correct).

## Coverage and limits
All routes from site/dist (audit.mjs → audit.txt); status codes on Apache+PHP :8443; CWV headless at 390 (25 routes, throttled, first visit) and 1440 (7) — lab data, not field; INP not measured. Keywords: autocomplete only (gl=de looked like India, IP-located). US search engine, no local packs. Old URLs: Wayback CDX (838 captures) + old sitemap on :8080; no backlink data. Not checked: Business Profile, Search Console/GA, real devices, Safari, German SERPs, competitor backlinks.

## Outside my scope (P1)
- airgrip.in (sales@airgrip.in, the form recipient) MX → SERVFAIL; mail may be bouncing. Verify before launch. (Coordinator confirmed SERVFAIL and parking nameservers on 2026-11-15.)
