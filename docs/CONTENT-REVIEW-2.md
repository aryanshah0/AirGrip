# Content review 2: right info, right amount, right place (2026-11-13)

Yardstick: what each buyer needs on each page, benchmarked against competitors. The old site is a source of facts only.
Three independent reviewers (product pages · home/trust/conversion · whole-site structure); every finding below was checked against the files.

## A. Owner-of-the-site decisions (asked as multiple choice)
1. Accessory pages: merge reducers + adapters + enlargers; merge male bush + conduit nuts; dome nut becomes a spare-part row.
2. Home: one proof band instead of ranges table + route card + plant (home routes, other pages hold the detail).
3. Industries: trim to confirmed sectors, move from header to footer.
4. Unconfirmed old-site lists (fittings types, fastener types, stamping materials): show only core items until confirmed, or show everything marked "confirm".

## B. Changes that need no decision (will be applied)
**Remove what was copied blindly or over-claims**
- Clamping-jaw / Favorit: drop the rod-size columns (same rule as Kompakt); cut "dust, water and oil" from applications (IP and seal are TBC).
- Category: flag "ISO 2768-m unless drawn" for confirmation (new, unsourced claim).
- Products cards: match the group pages (no "heat-staked", "pins and sockets", "gas", "stamping TBC").
- Group FAQs whose only answer is a TBC chip: removed (they become owner questions).
- Stamping tolerance: ±0.05 mm on punched/formed features, not "thickness".
- Quality: instrument list cut to instruments that control a characteristic (no lenses, vernier, surface plate); "People" row removed; "Improvement" row kept only with what is confirmed.
- Ordering & shipping: Incoterms responsibility table replaced by one line (EXW Jamnagar · FOB/CFR/CIF via Mundra or Nhava Sheva · air for samples).
- Male bush "seals on the outer sheath" and earth tag "can't become live": marked to confirm.
- Fittings "Ø5–75 mm": removed (contradicts the Ø5–100 mm range).

**Add what buyers need even though the old site never had it**
- Group pages rebuilt on the turned-components model: fixed key-fact rows (size range, tolerance, threads, material, finish, documents, volumes), typical parts, one "how it's made" block, links to Capabilities, Quality, the right thread chart and grades.
- Glands hub: "Buying the standard range" block (stock or made to order, packing unit, lead time, catalogue PDF, CAD on request, hazardous-area statement). Gland and accessory pages link to their thread charts.
- Capabilities: one machine-park table (type · qty · bar range · live tooling) instead of scattered "qty TBC" chips; process photo slots from the shot list.
- Quality: audit contact and ISO certificate link.
- Downloads section on Resources (profile, catalogue, ISO certificate, RoHS declaration), shown at launch only for files that exist.
- RFQ: destination port/city, first delivery wanted; lead-free moved into the material choice.
- Contact: legal name, GSTIN, IEC slots (per REQUIREMENTS).
- Privacy: controller, legal basis, processors, transfer of EU/UK data to India, file retention, complaint right, DPDP grievance contact.
- NPT chart: pitch diameter E0, hand-tight L1 and effective thread length L2 (ASME B1.20.1). Grades: nominal Cu/Pb/Zn; "Ask" cells blank until confirmed. BSP: add G 1/8.

**One home per fact**
| Block | Single home | Elsewhere |
|---|---|---|
| Ranges and tolerances | Capabilities #range | one spec row + link |
| Grade table | Grades page | one line + link (category, Kompakt) |
| Route card | Quality | one-line teaser on home |
| Batch documents | Quality #documents | Ordering & shipping lists shipping papers only |
| Lead time / MOQ / NDA FAQ | Ordering & shipping | product pages keep product-specific FAQs only |
| Design for cost | Capabilities | one line elsewhere |
| Shree Shah card | RFQ, Contact (bio on About) | removed from home and Ordering & shipping |

**Consistency**
- One group statement everywhere: seven groups made to drawing + brass cable glands and accessories (home currently says "nine").
- Part codes padded as approved: PG07/PG09 (clamping-jaw and Favorit currently use PG7).
- One order of groups in mega menu, mobile nav, footer, home and products; footer gets "Request a quote"; "Brass cable glands" everywhere.
- Names: "Moulding inserts", "Electrical terminals & connectors", "Brass turned components" used identically everywhere.
- Home title/H1 target "brass components manufacturer India" and name both offers; category owns "brass turned components".
- Docs: remove the dead redirect target `/capabilities/materials-and-tolerances/` (SEO-PLAN §5, REQUIREMENTS §4); fix the photo shot list (no foundry/extrusion/ingot shots: rod is bought); decide guides in v1 vs later.

## C. New owner questions (added to QUESTIONS-FOR-KETAN.md as C1–C10)
Kompakt vs dome nut the same part? · how screws/bolts are made (turned / cold-headed / traded) · photo origin (own parts or stock) · stamping a real line? · general tolerance standard · capacity figures if exact counts aren't ready · confirmed industries · inspection equipment (profile projector / CMM) · audit contact · ISO certificate public or on request · Friday and the 1-day reply.

## D. Final sign-off (2026-11-13)
- **Senior designer:** approved with 7 must-fixes, all applied:
  - mega-menu chart links
  - single legacy photo no longer enlarged
  - "+ Add" alignment
  - thread-pair picker alignment and valid defaults
  - exports band rhythm
  - conduit tables side by side
  - spare-parts thumbnail
- **Industry panel** (sourcing engineer, supplier-quality manager, gland distributor): approved with 7 must-fixes, all applied:
  - NDA tick disables drawing upload, and the wording is flagged (C14)
  - a typed part code carries its finish
  - unknown part codes are flagged on their quote line
  - identical gland fact rows on all three gland pages
  - cable Ø column on every gland size table
  - "Full range" and "same accessories" flagged
  - reducers, enlargers and adapters quoted by thread pair
  - unsourced route-card and capabilities lines flagged (C13)
  - rename consequences added to Q2
- **Left for implementation** (recorded, not blocking):
  - WhatsApp button placement over the hero
  - quote bar focusable while hidden
  - sub-nav highlight at top of page
  - capabilities card padding on phone
  - chart cards on fittings get thread-profile art
  - lock-nut EMC code display
  - dome-nut code once C1 and B7 are answered
