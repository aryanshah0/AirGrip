# DES findings: senior B2B web designer
(Saved by the coordinator from the reviewer's returned report; the reviewer could not write files. SHOTS = attack/shots/, DES = attack/des/.)

Summary: The visual system is coherent, restrained, and more distinctive and premium than every named competitor. The "drawing sheet" concept works and should stay. Weak points: templates of the same kind that drifted apart (gland datasheets, accessory size sections, heading scale), a handful of drawings that look like placeholders, legacy photos at five sizes, forms with three field styles. P1 0 · P2 7 · P3 16.

## Verdict on the drawing-sheet concept: keep it (Big change: no)
- Distinctive vs generic competitors: Paloma (DES/comp/paloma-home.png) and VAP (DES/comp/vijaya-home.png; vijayaautoproducts now serves "VAP Precision") corporate blue + stock/part hero; Vaishnavi blue tile slider with badges; Geissel full-bleed drone video; Rajhans stock hero with green swoosh; Jakap building hero, icon tiles, grey paragraphs; its products page (DES/comp/jakap-prod.png) currently serves gambling spam. AirGrip is the only one with its own visual language; nothing stock.
- Reads as competence because the drawings are correct: home hero checked to scale (~11.3 px/mm; 38 mm length, 8 mm collar, Ø22 knurl, M20, Ø13 bore agree; AF 24 hex = 27.7 across corners matches the collar). Quality route card and 404 "DRG NO." block show it with wit and restraint.
- Limit is warmth and proof of capacity (only two real production photos: building exterior on Home+Contact, CNC close-up on About). Photo shoot fixes that; meanwhile DES-01 and DES-05.
- Where it tips into "technical crap" it is local: near-empty two-column size tables (DES-03), placeholder-looking drawings (DES-05).

## P1
None. All 34 routes render cleanly at 1440 and 390, no overflow, no text under 12 px.

## P2

### DES-01 Legacy photos placed ad hoc: five sizes, some pages none, the main-business page none, one photo repeated
- Where: 154×115 non-enlargeable thumbnails under the hero drawing (pressure screw, clamping-jaw, strain-relief, lock nuts, stop plugs, earth tags, conduit); 198×148 on thread adapters; 138×103 inside conduit size section (same 09-Brass-Male-Bush.webp as the hero thumbnail); 310×232 in the "we make" band (fittings, inserts); 422×422 squares in "Examples" on fasteners (two on textured foam, "Nuts" on white). No photo on turned components (main business), forged, terminals, stamping.
- Evidence: SHOTS clamping-jaw/special-fasteners/conduit/turned 1440; native gland/accessory photo sizes 297–556 px; unused 1400×1000 turned-parts photo site/public/img/02-Product-We-Manufactur.webp (preview DES/ph/02-Product-We-Manufactur.png).
- Why it matters: mixed sizes look like leftovers; 154 px thumbnails show nothing and can't be opened; core-business page shows no real part.
- Competitor: Geissel https://www.geissel.com/product/metallic-cable-glands (DES/comp/geissel-prod.png, -prod-2.png) large photo + 3-item gallery (nickel, brass, drawing); JACOB product page photo + drawing gallery (DES/comp/jacob-prod.png); Paloma products page leads with real part photos.
- Fix: one "photo plate" rule. Option A (recommended): hero drawing frame gets a two-item switch Drawing | Photo; photo at frame size with the same 1 px ink frame; separate thumbnails go. Option B: one thumbnail size everywhere + lightbox. Either way: remove duplicate male-bush photo from conduit size section; one background treatment for fasteners examples; add a turned-parts photo to turned components. Ask the owner: are the parts in 02-Product-We-Manufactur.webp and Brass-Precision-turned-Parts-2.webp AirGrip's own (call sheet "photo origin")? Don't use 04-Measuring-and-Testing-Facility…webp (appears to show a German customer drawing).
- Scope: template (group, gland, accessory) · Effort: M · Big change: no

### DES-02 Heading scale not a rule: H2 at 44, 28 or 24 px by page, not section type
- Where (computed, DES/audit-1440.json): "Sizes and part codes" 44 px on pressure screw, clamping-jaw, strain-relief, conduit but 24 px on lock nuts, stop plugs, earth tags. Turned components uses 44 px heads; fittings, forged, inserts, terminals, fasteners, stamping only 24 px. Capabilities all 28 px. Quality mixes 44/24; About 28/44/24.
- Why it matters: most visible "not one system" signal between sibling pages; fittings looks lesser than turned.
- Fix: two levels by layout: full-width section (head left, intro right) 44 px; rail section (head in left column) 24 px; page-end CTA titles 28 px. Same section same layout on siblings ("Sizes and part codes" always level 1; "Buying … from AirGrip" FAQs level 2). Capabilities: move to level 1 or document its 28 px long-read style.
- Scope: site-wide · Effort: S–M · Big change: no

### DES-03 Accessory "Sizes and part codes": three layouts; the common one is a narrow two-column table with half the width empty
- Where: lock nuts, stop plugs, earth tags at 1440: 24 px rail head, 360–410 px table (Part code + Add, Thread), thread right-aligned far from the code, ~55 % blank. Conduit: 44 px head, two tables side by side. Thread adapters: 44 px head + pickers. Glands: 44 px head, key drawing, full-width table.
- Evidence: SHOTS stop-plugs-1440 (table ends x≈770 of 1380); earth-tags, lock-nuts, conduit 1440.
- Why it matters: where the datasheet concept looks unfinished; one section in three layouts across eight datasheets.
- Competitor: Geissel gland table full width with dimensions, pack qty, ref. no., "Enquire now" per row (DES/comp/geissel-prod-2.png).
- Fix: gland-page layout on all accessory pages (44 px head, hero drawing reused small as key on the left, table right); until dimensions arrive show PG and metric side by side (as conduit does) instead of a toggle; left-align the thread column next to the code.
- Scope: template (lock nuts, stop plugs, earth tags; align conduit and adapters heads) · Effort: M · Big change: no

### DES-04 The three gland datasheets are three templates; no gland or accessory page ends with a CTA band
- Where: pressure screw only has sticky sub-tabs (Sizes · Material & compliance · Questions), three-column Material & compliance (composition table, compliance, options), FAQ. Clamping-jaw and strain-relief: no tabs, one-column kv Material & compliance, no FAQ, a "Used with" row pressure screw lacks. All 3 gland + 6 accessory pages end without a closing CTA box; every group, chart, Industries, About page has one.
- Evidence: pressure-screw vs clamping-jaw/strain-relief 1440; last-H2 list per page in DES/audit-1440.json.
- Why it matters: sibling datasheets compared side by side; missing CTA breaks the rhythm; quote bar only appears after + Add.
- Fix: one gland sequence: Hero → Sizes → Material & compliance (pressure screw's composition table as left column) → Questions → Used with → CTA box ("Need a size or finish that isn't listed?" + "Request a quote", from the gland hub). Sub-tabs on all three gland pages (recommended) or none. Accessory pages get the same closing CTA. FAQ wording for clamping-jaw/strain-relief to copy/owner.
- Scope: template (9 pages) · Effort: S–M · Big change: no

### DES-05 A few drawings look like placeholders; drawings reused where they don't depict the thing
- Where: Special fasteners hero: plain stud of three rectangles with one "M8" callout in an empty 736 px frame (also weakest home thumbnail, DES/home-list.png). Forged hero: three hatched L/flat strips, no body outline, hex, ports or parting line (reads as a sheet-metal tee). Fittings hero: straight adaptor while photo/list show tees and elbows. Stamping hero: earthtag.svg = the earth-tags hero, and repeated as the first Related card on the same page. Cards for non-product pages: "Capabilities" shows a valve spindle; "Brass grade equivalents" a flanged bush. turned.svg on Home, Products, Capabilities and five Related rows. On clamping-jaw, stop plugs, lock nuts the drawing sits in the top 60 % of the frame.
- Evidence: fasteners, forged, fittings, stamping 1440; DES/drawings.txt.
- Why it matters: drawings stand in for photos until the shoot; weak/repeated ones undercut the premium set.
- Competitor: JACOB Perfect cable gland page (each product its own drawing) https://www.jacob-gmbh.de/en/products/cable-entry-systems/cable-glands/cable-glands-made-of-plastic/perfect-cable-glands/perfect-cable-gland-500xx-pazzzz (DES/comp/jacob-prod.png).
- Fix (lineart.py style): redraw four heroes: fasteners (hex bolt + stud, thread runout, chamfers, AF callout); forged (forged tee in half-section, hex flats, three threaded ports, draft, parting line); fittings (elbow or tee); stamping (stamped terminal/contact strip). Non-product cards text-only or a fitting diagram (thread profile for chart cards). Related rows avoid the page's own hero drawing. Centre drawings vertically in frames.
- Scope: 4 drawings + Related rule · Effort: M · Big change: no

### DES-06 Forms use three input styles and two submit colours
- Where: RFQ has 50 px boxed mono input (Catalogue items), 38 px boxed 14 px inputs (Parts and quantities rows), 34 px underline fields in title-block cells (Requirements, Your details). Home quick quote and Contact use 50 px boxed. Final send button brass on Home and RFQ, ink on Contact.
- Evidence: SHOTS rfq/contact/home 1440 + measured field metrics.
- Fix: keep title-block cells (house signature, §13); render Catalogue items and Parts rows as cells too; every final send button brass (quote bar "Review & send" already brass).
- Scope: RFQ and Contact · Effort: S · Big change: no

### DES-07 The cable-gland hub doesn't show the two gland types
- Where: /products/brass-cable-glands/: one shared gland.svg next to a two-row text table; gland-cj.svg, gland-sr.svg and photos only on the datasheets.
- Competitor: Geissel metallic cable glands page; Hummel "Unsere Produktlinien" (DES/comp/hummel-home.png): each family with its own picture.
- Fix: two equal cards, each with its own drawing, name, one-line "how the cable is held", sizes, code, link; keep the comparison table below or fold it in.
- Scope: one page · Effort: S · Big change: no

## P3 (post-launch list)
- Archivo ampersand odd at nav size/headings (DES/amp-3x.png): "and" in nav/headings or another & glyph.
- Logo is an auto-traced SVG; "QUALITY · ASSURED · QUANTITY" micro-text illegible at 81 px (DES/logo-2x.png); ask owner for vector original.
- Mobile menu is a dropdown panel; content visible under it, WhatsApp float overlaps (DES/st-mnav.png); full-height sheet.
- Paper-to-paper section seams leave 160–192 px gaps (stop plugs hero → sizes; turned Related → CTA).
- Products overview row 2: "Electrical terminals & connectors" title wraps; descriptions start at different heights.
- "Used with" subtitles mix mono codes (lock nuts) and sans descriptions (others).
- About people cards big boxes with one line; "How we work" right column orphan.
- PG chart hero has caption, button, STANDARD row; metric/BSP/NPT don't.
- Resources hub cards have no drawings though thread profiles exist.
- Fittings "we make" band: list ends ~150 px above photo bottom.
- Metric and BSP chart tables: four columns stretched over 1320 px.
- Phone: footer ~1,100 px long; collapse link groups.
- Phone: pressure-screw table stacks code and + Add in one cell (~80 px rows) and scrolls sideways.
- Home and Contact use the same building photo; About CNC photo would show production on Home.
- Hover states differ (rows brass wash, cards underlined title); document it.
- Mega menu text only; small drawings optional.

## Checked and fine
Type system consistent (Archivo Expanded display, Archivo text, IBM Plex Mono data; H1 85/64/52 by page type; ≤ ~75 chars/line). 96 px section rhythm. Restrained palette, sound contrast. Primary buttons 48 px/16 px everywhere. Visible 2 px focus outline. Short transitions, reduced motion handled. Quote bar, header badge, mega menu, breadcrumbs, tables, accordions consistent. Drawings meeting the bar: home hero, turned "Typical parts" sheet, gland and accessory drawings, thread profiles, Quality route card, 404. Phone 390: no overflow, no text < 12 px, RFQ title block collapses well. Cookie banner: equal-weight choices.

## Coverage and limits
All 34 routes at 1440 and 390 (shared shots + own crops). Headless DOM audits on every route (heading sizes, buttons, line length, padding, form fields, photo inventory with native sizes, drawing usage, overflow, small text). Live states: mega menu, mobile menu, hover, focus, quote bar both widths. Competitor homes: Paloma, Jakap, Geissel, Rajhans, Vaishnavi, VAP, JACOB, Hummel, Lapp; product pages: Geissel metallic glands, Paloma products, Vaishnavi glands, JACOB Perfect, Jakap (compromised). Lapp redirects to country picker; JACOB behind cookie modal. Not checked: Safari/iOS, 768/1024, print, copy/SEO/forms/a11y beyond focus, privacy content, old site.

## Outside my scope
None.
