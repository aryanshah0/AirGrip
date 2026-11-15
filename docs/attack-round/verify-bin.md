# Verification round: India buyer (BIN)
(Saved by the coordinator from the reviewer's returned report. Evidence: session scratchpad attack/bin/v/.)

**Verdict: lockable from my scope.** No regressions, no new P1 or P2. Checked the current build at 320–1440 px with headless Chrome.

## Status
- BIN-01 calling on a phone: **fixed.** Call button (tel:, 59×40 px) visible above the open cookie banner at 390 (one tap); WhatsApp shows after the banner; number in the header at 560–1100 and ≥ 1180 px; RFQ aside has Phone / WhatsApp. Gap 1101–1179 px (P3).
- BIN-02 short forms: **fixed.** Optional Phone / WhatsApp on quick quote and contact, sent and accepted by the server; quick quote accepted a JPG.
- BIN-03 armoured / unarmoured: **not fixed, waiting on Ketan** (call sheet 31). Nothing is claimed either way; accepted as interim.
- BIN-04 company profile: **fixed.** PDF served (336 KB, 2 A4 pages), linked from About, Quality, Exports; every fact matches the confirmed facts.
- Contact form visible after sending (P1): **fixed.**

## Journeys re-walked (no regressions)
Turned part RFQ at 390 (PDF, 20,000/240,000, phone, India) → thank-you with reference, file, quantities; quick quote at 1440 with JPG, phone, "2,40,000" sent. Glands + lock nuts at 390: + Add names, AG-CJ-PG09 / AG-CJ-M20 / AG-LN-PG09 added, side-by-side lock-nut sizes, no overflow, RFQ and thank-you list all three. Vendor qualification: PDF, visit link preselects audit, contact with phone sent. Phone landing: header (Call, Quote with count, Menu) fits at 390, 360, 320.

## New P3 (post-launch)
- 320 px with items in the quote list: Menu button runs to the screen edge.
- 1101–1179 px: no phone number in the header.
- Profile PDF: "team of 50+ people" sits under "MACHINES 66"; give the team its own item.
- Profile PDF footer lists PDF/DWG/DXF/STEP/IGES but not JPG/PNG; its NDA line is the older short wording.

## Not checked
Real Android phone, real email delivery, tappable links inside the PDF.
