# Attack round: merged findings for approval (2026-11-15)

Six independent reviewers attacked the built site (brief: `BRIEF.md`; full reports: `des.md`, `bin.md`, `bde.md`,
`cpy.md`, `seo.md`, `qa.md`). This list merges and de-duplicates them, ranked by the agreed bar (HANDOFF §6c).
Every P1 below was re-checked by the coordinator on the built site. IDs in brackets point to the reviewer reports.

**Verdict across the panel:** no reviewer asks for a big change. The designer's verdict on the drawing-sheet concept is
**keep it**: the drawings are correct to scale, which a purchase engineer recognises, and no named competitor has a
visual language of its own. The copy is judged the strongest part of the site, and the technical SEO base beats every
named competitor. The weak spots are a few unconfirmed promises, the words on the money pages (SEO), templates of the
same kind that drifted apart, and small friction for Indian phone users.

## 0. Launch blockers outside the website (need you / Ketan / Hostinger)
- **airgrip.co.in doesn't resolve** (NXDOMAIN) and **airgrip.in has no working DNS** (SERVFAIL): both domains are
  registered to 2027-02-16 at Netandhost but point to Hostinger's parking nameservers with no records (checked with
  `dig` and `whois`). The old site is offline (last archived 2026-07-12), and **mail to sales@airgrip.in is very likely
  not arriving**. It is the only address on the site and the address every form sends to. Fix in hPanel (DNS zone /
  email for airgrip.in), then send a test mail. [SEO, coordinator]

## P1: fix before lock
| # | Finding | Fix (short) | Source |
|---|---|---|---|
| 1 | **Contact form stays on screen, filled in, after "Message sent"** (a buyer may send twice). `.ct__r form {display:grid}` overrides `hidden`. The flow test checked only the confirmation. | `[hidden]{display:none}` for the form; add the check to the flow test. | BIN, confirmed |
| 2 | **Home promises "get a price within two working days"**; Ketan confirmed a *reply* in two working days. | "Send a drawing. We reply within two working days." + lead "…You get a price, MOQ and lead time, or our questions on the drawing…" | CPY-01 |
| 3 | **Unconfirmed specifics on pages**: Industries "sensor bodies", "motors, junction boxes and lighting", "Valve components and connectors"; gland "seal inserts on request"; RFQ/thank-you/buyer email "we sign it and **send an upload link**" (nothing delivers an upload link; Ketan only confirmed "we sign your NDA"). | Sourced wording only (exact text in cpy.md CPY-02); NDA: "Send us your NDA (email it to sales@airgrip.in). We sign and return it, then you reply to that email with your drawings." Ask Ketan the rest. | CPY-02, BDE-04 (raised to P1 by the "nothing unconfirmed" rule) |
| 4 | **"Germany / EU 05:00–14:00 CET"** is wrong for GMT and EET countries. | "Germany and Central Europe 05:00–14:00 CET". | CPY-03 |
| 5 | **The main money page leaves out what buyers type**: the turned-components title/H1 have no "manufacturer", "Jamnagar", "India"; "precision" appears nowhere on the site. Same pattern on glands, forged, fasteners, stamping titles. | New titles/H1/lead as in seo.md SEO-01. | SEO-01 |
| 6 | **No page for "brass electrical parts"**, the largest Jamnagar product query family (estimate). | Retitle the terminals page "Brass Electrical Parts: Terminals, Neutral Links & Connectors" + short "Other electrical parts" section. URL stays. | SEO-02 |
| 7 | **Home and About compete** for "brass components manufacturer in Jamnagar". | Home: "Brass Components Manufacturer in Jamnagar, India \| AirGrip"; About: "About AirGrip: Since 1988 at GIDC Dared, Jamnagar". | SEO-03 |

QA found no P1. (It missed #1; the India-buyer reviewer caught it.)

## P2: fix before lock
**A. Templates that drifted apart (designer + copy)**
- A1 Gland datasheets are three different templates; no gland/accessory page ends with a CTA box. → One gland sequence (Hero → Sizes → Material & compliance → Questions → Used with → CTA), sub-tabs on all three, CTA on all 9 pages. [DES-04]
- A2 Accessory "Sizes and part codes" has three layouts; lock nuts / stop plugs / earth tags show a narrow two-column table with ~55 % of the width empty. → Gland-page layout with the drawing as key; PG and metric side by side. [DES-03]
- A3 Missing dimensions shown three ways, and the table note reads like code. → One plain note (exact text in CPY-09); pressure-screw metric table gets the same columns as its PG table. [CPY-09]
- A4 Heading scale by page, not by section type (H2 44 / 28 / 24 px). → Two levels by layout (44 full-width, 24 rail). [DES-02]
- A5 Gland hub: pressure screw filed under "Gland accessories" (Ketan: listed with the glands), and the two gland types have no picture of their own. → Two gland cards with their own drawings; pressure screw as a row in the gland table. [CPY-08, DES-07]
- A6 Forms: three field styles on the RFQ, brass vs ink submit buttons. → All RFQ inputs as title-block cells; every send button brass. [DES-06]

**B. Words and consistency (copy)**
- B1 Ranges, units, inch sizes and hours written several ways; the home strip separates figures from units. → One rule + exact replacements. [CPY-04]
- B2 "adaptor" vs "adapter" → "adapter". [CPY-05]
- B3 CW511L called both "lead-free" and "low-lead" → "low-lead DZR CW511L", "lead-free CW724R". [CPY-06]
- B4 "CNC turning centres" vs "CNC lathes" (no live tooling) → "CNC lathes". [CPY-07]
- B5 Gland types described so both promise the same ("traction relief" = strain relief). → New one-liners. [CPY-10]
- B6 Shop-floor shorthand ("SPMs", "Ni · Sn · Zn", "Patrol inspection", "unless drawn"). → Plain words. [CPY-11]
- B7 RFQ microcopy (file rows, formats list, "Finish (drawings)", reference wording, quick-form link). [CPY-12]
- B8 Same thing named differently (stop-plug eyebrow codes, "Technical data" vs "Resources", "Request for quote", "Not in the list?"). [CPY-13]

**C. Indian buyer friction**
- C1 Calling takes 2–3 taps on phones; no number in the header below 1360 px; RFQ aside has no phone. → "Call" button in the phone header, number from 1100 px, phone row on RFQ. Jakap and Vaishnavi do it. [BIN-01]
- C2 Home quick quote and Contact have no phone field; the quick quote rejects JPG/PNG that the full RFQ accepts. [BIN-02]
- C3 No downloadable company profile for vendor registration (planned in REQUIREMENTS §10, never made). → 2-page profile PDF from confirmed facts, linked from About, Quality, Exports. [BIN-04]

**D. Export buyer**
- D1 Compliance thin and all "on request"; RoHS line gives no expiry; REACH row doesn't name lead on two gland pages. → Name lead in REACH rows on all gland pages; list REACH / RoHS 6(c) / conflict minerals / Cr(VI) with status on Exports; RoHS expiry date only after checking the Official Journal. Ask Ketan for signed statements. [BDE-01]
- D2 "±0.05" headline with three hand instruments reads weaker than Paloma ("±0.005 mm", CMM). → Interim: "Fits tighter than ±0.05 mm: send the drawing; the quote says whether we can hold them." Ask Ketan the tightest routine tolerance and instruments. [BDE-02]

**E. Search (SEO)**
- E1 ~80 legacy .html URLs (2009–2021) return 404. → Add to the 301 map (list in SEO-04). [SEO-04]
- E2 [also QA-14] JavaScript served uncompressed (`text/javascript` missing from DEFLATE); the first-visit cookie banner becomes a late LCP (lab 2.4–2.9 s on 9 pages at 390 px). → Add `text/javascript`; show the banner before hydration. [SEO-05]
- E3 [also QA-13] Font swap shifts the pressure-screw page (lab CLS 0.22 at 390). → Metric-matched fallback font. [SEO-06]
- E4 Site not tied to the Google Business Profile (generic map search, no `sameAs`/`geo`, name in three forms). → Needs the profile link from Ketan. [SEO-07]
- E5 Germany/EU export targeting weak (Bharti has /export/germany/). → One English page "Brass components supplier for Germany & the EU" from confirmed facts. **Your choice: now or after launch.** [SEO-08]

**G. Forms and keyboard (QA; all in states the existing tests never reach)**
- G1 The sticky quote bar covers the focused "+ Add" button, and "Review & send" has no visible focus ring (WCAG 2.4.11 / 2.4.7). → Scroll padding + light focus ring on the bar. [QA-01]
- G2 "✓ Added" button's screen-reader name ("Remove … from quote") doesn't contain the visible word (WCAG 2.5.3, Level A). → Name contains "Added"; axe scan with a filled list added to the tests. [QA-02]
- G3 When the server refuses a request, the buyer is told "try again", which can't work: an email with an umlaut (jürgen.müller@…, Germany!), more than ~128 MB in total, or the hourly limit. → Accept Unicode emails on the server; specific messages per refusal; size/count checks in the browser. [QA-03]
- G4 A 21st drawing is dropped silently (PHP's 20-file limit): sales gets 20, the thank-you page lists 21. → Refuse it on its own row in the form; the server reports any missing file in the email. [QA-04]
- G5 Header keyboard order: the opened mega menu is reached only after 8 other links; Escape doesn't close the mobile menu. → Panel after the Products button; Escape closes the mobile menu. [QA-05]
- G6 With browser storage blocked, "+ Add" says "✓ Added" but the quote form arrives empty, with no explanation. → One-line notice; codes carried in the "Review & send" link. [QA-06]

**F. Imagery**
- F1 Legacy photos at five sizes; 154 px thumbnails can't be enlarged; turned components (main business) has none. **Your choice:** A) Drawing | Photo switch in the hero frame (designer's pick, like Geissel) or B) one thumbnail size + lightbox. [DES-01]
- F2 Four drawings look like placeholders (fasteners, forged, fittings, stamping reuses earth tag); non-product cards show unrelated parts. → Redraw four in the same style; related cards avoid the page's own drawing. [DES-05]

## New questions for Ketan (added to the call sheet; the site uses safe interim wording until answered)
1. Glands: unarmoured cable only? Any single/double-compression glands for armoured (SWA) cable? [BIN-03]
2. How should drawings reach us after an NDA is signed (reply by email, or an upload service)? [BDE-04]
3. Tightest diameter tolerance held routinely on CNC; which measuring instruments are in-house (CMM, projector, roughness, coating thickness)? [BDE-02, BIN-06]
4. Will AirGrip sign REACH Art. 33 and RoHS statements as PDFs we can link? Can it fill a conflict-minerals report (CMRT) for tin plating? [BDE-01]
5. Quote validity, and how brass/copper price changes are handled in annual orders. [BDE-03]
6. Google Business Profile public link, the exact name/address/phone on it, and the pin. [SEO-07]
7. Typical parts per industry (to replace the unconfirmed list), and whether "seal inserts" are sold as spares. [CPY-02]
8. Are the parts in the photos `02-Product-We-Manufactur.webp` and `Brass-Precision-turned-Parts-2.webp` AirGrip's own? [DES-01]
9. GST and PAN on request, and "completed supplier questionnaire": OK to say? [CPY-02]
10. Sea transit time to Hamburg / Rotterdam; HS codes. [SEO-08, SEO-P3-09]

## Post-launch list (P3)
All P3s are in the reviewer reports; about 90 one-liners. They go to `docs/SITE-LOCK.md` at the lock.

## Off-site (not website work, after launch)
IndiaMART / TradeIndia profiles (Indian generic searches are dominated by directories); Europages / wlw.de / Kompass;
Google Business Profile (photos, hours, reviews, website); LinkedIn; Search Console at launch. [SEO]
