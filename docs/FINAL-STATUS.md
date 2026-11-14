# Final status: design v1.2 (2026-11-14)

The design is locked at v1.2 and ready for the React build. Preview for Ketan: https://aryanshah0.github.io/AirGrip/

## How it was reviewed
Three independent reviewers who had not seen the site went through all 34 pages on desktop (1440 / 1280) and phone (390), on a fixed P1 / P2 / P3 scale. Decisions already taken were listed up front so that they were not raised again.
- **Senior UI/UX designer:** every screen and interaction: mega menu, mobile nav, quote flow from + Add to the thanks page, cookie banner, stop-plug head switch, lock-nut EMC switch.
- **B2B buyer (20 years buying brass parts and glands):** four journeys: a design engineer with a drawing, an electrical distributor, an EU supplier-quality auditor, an Indian OEM purchaser.
- **Content checker:** all visible text, titles, metas, alt text, form messages and partials, checked against REQUIREMENTS §11–§13, CLAIMS and COPY-STYLE.

All three verdicts: **approved after fixes**. Every P1 and P2 was checked against the files and either fixed or handled as listed below.

Checks after the fixes:
- 35 pages structurally sound: links, anchors, images, one H1, tag balance, table columns, script syntax.
- Launch guard clean.
- No horizontal overflow at 390 px on any page.

## Fixed in this final round
**Facts (nothing unconfirmed on a page):**
- Fittings: the pressure / leak-test claims are removed (row, paragraph, lead, meta). Whether AirGrip owns a test rig is unconfirmed (call sheet 23, 25).
- About: plant area (40,000 / 18,000 sq ft) and "room to expand" removed; they came from the old site and were never confirmed (call sheet 24). The tile is replaced by "Plating: in-house, nickel, tin, zinc", which Ketan confirmed.
- About: history sentence reduced to what is confirmed (founded 1988, led by Ketan Shah). The photo alt text now describes the photo, without claiming it is AirGrip's shop.
- "Threads gauged GO / NO-GO" now says "parallel threads" on Category and Capabilities. Taper gauges are unconfirmed.
- Glands: "IP54 to EN 60529" is now "IP54" (no test report yet). "Drawings & CAD" is now "Drawings" (CAD is not offered).
- The full name "Air Grip Group of Companies" is used once only (About), not in every logo alt and the footer.

**Consistency and text:**
- Stop plugs show both codes, AG-SP · AG-SH, on Glands and Lock nuts.
- Lock nuts: "lead-free on request", like the other accessories.
- Earth-tag lead no longer repeats the H1.
- Fasteners FAQ answers "Yes".
- Category: third cost-suggestion line removed.
- Products: "Not in the list?" line reworded to include stamping.
- WRAS / DVGW / NSF wording matches between Fittings and Industries.
- Privacy page meta description added.
- One consent error wording on the RFQ form.
- Thread adapters: "Dimensions with your quote", like the other accessory pages.

**Design and interaction:**
- Stop-plug head switch: shows the selected head, labelled "Head" and on its own line, apart from the thread tabs. This was the designer's P1.
- Cookie banner: "Essential only" and "Accept analytics" are equally prominent. Focus goes to the banner, not to Accept.
- The hidden quote bar can no longer be reached with the keyboard.
- Part codes never break across lines.
- Code + thread size tables keep "+ Add" on the same line as the code on phone (rows half as tall). The tables are narrower on desktop, and the button has a fixed width, so the table no longer jumps when a size is added.
- Phone sub-nav (Category, Capabilities) fades at the right edge to show that it scrolls.
- Mega menu heading "Thread charts" is now "Technical data", because it also lists brass grades.

## Deliberately not changed, and why
- **RFQ form style.** Title-block fields with boxed line items are the house signature (REQUIREMENTS §13).
- **Terminal drawing.** It is correct ISO 128: a bored block in section, with hatched walls either side of the bore.
- **Quality "Outside processes"** lists only the lab tests. Whether silver and chrome plating is done in-house or by a partner is open (call sheet 11, 26). The site already says only "silver or chrome on request" and never claims it is done in-house. Once Ketan answers, either add the partner to the list or leave it as is.
- **Fit dimensions on stop plugs, earth tags, adapters and conduit parts.** They come with Ketan's drawing package (about a month). Until then every accessory page says "Dimensions with your quote".
- **Gland and pressure-screw size tables** show reference PG dimensions from the old site, labelled "for reference; the drawing supplied with your quote governs", with "—" where a value is held back. Replace them with Ketan's drawings before launch.
- **P3s left for after launch:**
  - "Used with" captions mix codes and descriptions.
  - CTA heading and button wording differ on the made-to-drawing pages.
  - The RFQ thank-you copy talks about drawings even for catalogue-only requests.
  - The terminals "Where they are used" band holds one row.
  - The exports order flow mentions sample approval for catalogue items.
  - The pressure-screw page has packing details that the gland pages lack.
  - The home "66 machines" figure includes drilling machines.
  - "Samples free" is not repeated on the RFQ page.
  - About repeats the export figure in the strip and the side list.
  - Contact names Shree Shah twice.
  - These are added to the post-launch list in DESIGN-LOCK.md.

## Still needed from Ketan before launch
The full list with context is in `docs/CALL-SHEET-KETAN.md` ("Follow-up list" items 1–9 and 10–26). Launch gates:
1. Gland size table with cable clamping ranges, plus production drawings for glands, pressure screws and accessories (about a month). These fill the "—" cells and the accessory fit dimensions.
2. ISO 9001 certificate copy (number, body, scope, expiry) for the Quality card.
3. M80 pitch, seal temperature range, IP54 test report, EN 62444.
4. Legal advice on the EU / UK privacy representative.

Can be added after launch, as each answer arrives:
- Ketan's bio and photo.
- LinkedIn URL and Google listing.
- Presses split and tonnage; automat bar range.
- Plant area; pressure-test rig.
- Silver / chrome in-house or partner.
- Instruments owned.
- AQL; RoHS declaration; HS codes and certificate of origin.
- Pack quantities.
- Photo shoot.

## Next step (needs your go-ahead)
The React build (Vite, pre-rendered routes, Hostinger), following `docs/DESIGN-LOCK.md` "Build requirements". Nothing has been pushed to `main`. The GitHub repo's default branch is still `gh-pages` for the preview; switch it back to `main` when the build starts.
