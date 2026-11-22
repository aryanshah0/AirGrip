# Design lock: v1.2 (2026-11-14)

v1.2: final sign-off round by three fresh reviewers (senior UI/UX designer, B2B buyer, content checker), every page on desktop and phone. All three: approved after fixes; every P1 and P2 applied or explained in `docs/FINAL-STATUS.md`. Rule from v1.2 on: nothing unconfirmed appears on a page; open items live only in `docs/CALL-SHEET-KETAN.md`. The cookie-consent banner is now part of the design (the build connects it to GA4 Consent Mode v2).

## v1.1 (2026-11-14)
v1.1: all of Ketan's answers from the call applied (REQUIREMENTS §11–§12), then a final two-reviewer round (facts and completeness; visual polish). All P1 and P2 findings applied. The one deferred P2 is giving the clamping-jaw and strain-relief pages the pressure screw's dimension-key drawing; that waits for the production drawings (about a month). Every remaining marker has an owner in REQUIREMENTS §12 and the call sheet.

## v1.0 (2026-11-13)

The design, page set and text of the new airgrip.co.in are **locked**. This file records what was locked, how the
final review was run, and the only ways the design may change from here.

## What is locked
- Design system (tokens, type, grid, components), all 35 page designs (desktop and phone), sitemap and navigation.
- Text, under the rules in `docs/COPY-STYLE.md`.
- Part drawings (`design/tools/lineart.py`), part-code scheme, quote flow.

## How it may change from here (nothing else reopens it)
1. **Owner answers** (`docs/QUESTIONS-FOR-KETAN.md`): fill or remove TBC slots and wording marked to confirm. This is content, not redesign.
2. **The user's review notes**: one pass, applied once.
3. **Real defects**: broken link, layout or function, wrong fact. Fixed without discussion.
Everything else goes to the post-launch list below.

## Final adversarial review (4 reviewers, every screen, desktop and phone)
Scope: what each screen shows, how it shows it, facts, text, photos, diagrams. Severity agreed beforehand: P1 must fix,
P2 should fix, P3 post-launch. All four verdicts: **lockable after P1 + P2 fixes**. All P1 and P2 findings were checked
against the files and applied, except those listed under "Build requirements" (behaviour that belongs to the React build).

Applied (summary):
- **Facts:**
  - Unconfirmed costs, stamping and fitting ranges, process claims, RoHS and lab locations are flagged.
  - Gland data held back consistently: Favorit M16–M25 and Clamping-jaw PG 29.
  - The PG→metric table now gives both options where a PG size falls between metric sizes.
  - Grade labels corrected: CW509L is low-lead; CW724R Pb ≤ 0.10.
  - "Any pair" removed from the thread adapters; "Ireland" removed from regions; the industries note reworded.
- **Diagrams:**
  - Redrawn: terminal (bore and tapped holes), stud (instead of a held-back screw), stop plug (slotted dome), male bush (hex flange), dome cap nut, earth tag ("for M20").
  - Quality route card: the M20 thread is drawn, and the plated state keeps its hatching.
  - Kompakt key: AF moved to an end view.
- **Photos:** stock-looking fastener photos removed, forging photo caption corrected, single-photo galleries fixed on phone, photo-shoot IDs corrected per product.
- **Function:**
  - Quote form keeps finish and quantities, handles off-scheme codes, Enter adds a code, NDA keeps files, drawings come first when the list is empty, and the thank-you page lists what was sent.
  - Contact form validates and confirms sending; topics are preselected from links.
  - The lock-nut EMC toggle now updates the visible codes.
  - The adapter picker only offers valid pairs.
- **Text and structure:**
  - Quality: documents and instruments are tables with a "where" column; the gauging wording is correct for taper threads; carton-label contents have one home (Quality OP 80).
  - Ordering & shipping no longer repeats lead times, Incoterms or compliance.
  - Industries is a single column, marked to confirm. About has no duplicate contact details.
  - Metas are corrected. The launch guard also checks meta descriptions.
- **Owner questions added:** C15–C21 (accessory sizes and pairs, earth-tag strip grade, stop-plug head, terminal process, document costs, metric through-hole, privacy representative).

## Build requirements (React phase, not design changes) — status 2026-11-14, see docs/BUILD.md
- Done: quote list allows one part code in several finishes (D10).
- Done: file checks, 20 MB limit and allowed types, rejected per row with a message (D11).
- Done: cookie-consent banner with a "Cookie settings" link in the footer; GA4 Consent Mode v2 (switched on by the GA4 ID).
- Done: thread-pair picker renders only valid options (works in Safari).
- Done (2026-11-15): form delivery by PHP on the Hostinger hosting to sales@airgrip.in, with the buyer copy (`site/public/api/form.php`, docs/BUILD.md). Needs the mailbox website@airgrip.co.in on the hosting.
- Accepted 2026-11-15 after the independent build review: the dimension key folds on phones on all three gland pages; the adapter picker leaves out entry threads with no valid partner; the home quick quote names the chosen files.
- Done: `design/tools/check_launch.py` runs on the pre-rendered HTML in every build and in CI (GitHub Actions); the build fails until it reports zero.

## Post-launch list (P3, deliberately not done now)
- Nozzle caption "AF hex" without a value; insert drawing dimension placement and missing M4 callout.
- Neutral icons for Capabilities and Grades "related" cards; product-card spec-line wording alignment (inserts, terminals).
- Contact/exports time-zone wording (CET/CEST, GMT/BST); a few within-page repeats on Quality, About, Capabilities.
- NPT mm rounding (17.15, 60.33); BSP G 5/8 hole decimals; "Drop drawings here" wording on phones; decoded names for typed codes; mobile-nav Escape key and aria-current.
- Lock nuts breadcrumb and "used with" links; glands hub CTA lead; Clamping-jaw and Favorit sub-nav and FAQ parity with Kompakt.
- Accessory drawings keep illustrative numbers (captioned "Illustrative drawing, not to size").
- From the build review (2026-11-15, P3): mega menu links come after the rest of the header in keyboard order, and the menu stays open when focus leaves it; focus after choosing a cookie option; LocalBusiness `geo`; per-template share images; titles over 60 characters (12 pages) and "manufacturer" in the turned-components title; more internal links from accessory pages to thread charts and grades; decide whether old `/wp-content/uploads/` files (PDFs, images) with backlinks should 301 instead of 410.
- From the v1.2 sign-off (P3): "Used with" caption pattern; one CTA label on made-to-drawing pages; RFQ thank-you copy for catalogue-only requests; terminals "Where they are used" band; catalogue items without sample approval in the order flow; packing and labelling options for the whole standard range; home machines tile wording; "samples free" on the RFQ page; About export figure repeated; Contact names Shree Shah twice.
- **Done 2026-11-22:** titles ≤ 60 characters on every page; per-page share images (`tools/make-og.mjs`); LocalBusiness
  `geo`/`hasMap` + Organization `sameAs`; focus returns after a cookie choice; accessory thread standards link to the
  charts, lead-free notes to the guide; footer links the buyer guides; NPT 3/8 and 2 inch pipe OD rounded half-up
  (17.15, 60.33); Contact names Shree Shah once; About export figure no longer repeated; unused images removed and
  photos given descriptive file names. Already done earlier: mega-menu keyboard order and close on focus leave,
  mobile-nav Escape, aria-current. Checked and left: the 3 pages with lab CLS 0.06–0.09 measure ≈0 on repeat runs.
