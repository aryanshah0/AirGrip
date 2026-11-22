# Independent UI/UX review of airgrip.co.in (2026-11-22, fresh session)

Brief: `docs/UX-FRESH-REVIEW-BRIEF.md`. I reviewed all 41 live pages at 1440 px and 390 px, full height. I also checked
phone states in a real 390 × 844 viewport: first visit with the cookie banner, the menu, and the quote bar after
"+ Add". I measured type sizes and contrast on key pages and ran `tools/a11y-check.mjs` on the live site (no WCAG A/AA
violations on 40 pages). I compared the site with the 9 competitor sites in the brief.
I formed my view before reading the earlier reviews, then checked it against them (see the end of this file).
Evidence screenshots are in `docs/fresh-review/`.

## Scores (out of 10)

| Area | Score | Evidence |
|---|---|---|
| **Overall** | **7.0** | Clear, distinctive, honest and useful. It is held back by thin proof: no real photos by default, no certificate, no people. |
| Visual identity | 8 | Engineering drawings with title blocks as the imagery, the Quality route card, the extended display face, mono numbers and a brass accent. No competitor looks like this (`home-1440.jpg`, `quality-1440.jpg`). Weakest element: the logo (below). |
| Consistency | 9 | One template system across 41 pages. The same spec-sheet rows, CTA box, related cards and footer everywhere. |
| Layout and rhythm | 6.5 | Most sections use one frame: title on the left, label/value rows on the right, on alternating cream and beige bands. Text-heavy pages (About, Ordering & shipping, Germany & EU) become walls of rows. Group pages vary in depth: turned components has a 6-part gallery, the other 6 groups have one drawing and a text list (`category-1440.jpg` vs `inserts-1440.jpg`). |
| Typography | 7.5 | Strong display type and good use of mono for values. Desktop body copy is mostly 14–15 px (measured), small for long reading at 1440 px. On phones the home headline takes 4 lines and most of the first screen. |
| Hierarchy | 7.5 | Each page has one clear title and CTA. Eyebrow labels and section intros are well ordered. |
| Mobile usability | 8 | Header with Call / Quote / Menu, sticky quote bar with a count, floating WhatsApp button, tables that become cards. Against that: the cookie banner covers 42 % of the first screen (`phone-first-screen-menu-basket.jpg`, panel 1), footers run about 1,000 px on every page, and the quote form is about 2,600 px long. |
| Buyer journey to a quote | 8 | A CTA on every page, a quick form on Home, "+ Add" with a quote basket for catalogue parts, an NDA checkbox, a thank-you page with the reference and next steps. The full form asks a lot before the contact fields (`rfq-390.jpg`). |
| Trust signals | 5 | The only real photo shown by default is the plant exterior. ISO 9001 shows "Copy on request" with no number or certifying body. The people cards are nearly empty, there are no customer or sector examples, and the instrument list has 3 rows. The About photo is captioned "CNC lathe", but its origin is open (call sheet C3) and the tool post looks like a conventional lathe. |
| Selling the products | 5.5 | The drawings explain shape but don't sell. Glands are a catalogue product, and catalogue buyers expect product photos, clamping ranges and a datasheet. Here the existing photos sit behind a "Photo" switch, the size tables have no clamping range, and accessory tables list only code and thread. |

### Does it look AI-made or template-made?
Mostly no. The drawing system and the route card are the opposite of generic. A designer would still spot four
repeated scaffolds:
1. A gold uppercase eyebrow over almost every H2, with an intro paragraph on the right.
2. The same outlined CTA box at the end of every page ("Not listed?", "Need a size…?").
3. "Related" tiles that are empty boxes with mono text ("EN · BS · UNS · IS", "66 machines", "PG · Metric"). They read
   as missing images (`guide-glands-1440.jpg`, bottom right).
4. Every section in the same title-left / rows-right frame.

None of these is bad alone. Together they make long pages feel stamped out.

The logo is the one element that looks dated: blue, a gear in a triangle, and "GROUP OF COMPANIES" too small to read
at header size. It doesn't belong to the cream, black and brass palette.

## Benchmark (what it settled)
- **Indian makers** (Paloma, Jakap, Rajhans, Vaishnavi, VAP): template-made. They use stock CNC renders, icon cards
  and, at Paloma, a sticky-note "vision" block. AirGrip is clearly ahead on distinctiveness, clarity and data
  (`bench-*.jpg`).
- **Where they beat AirGrip, every time on proof:**
  - real part photos on every category tile (Vaishnavi);
  - scale numbers up front (Jakap: 1,75,000 sq ft, 25 million parts; Rajhans: employees, area, turnover);
  - certificate badges (Jakap);
  - a team photo (Paloma);
  - a factory video as the home hero (Geissel).
- **Gland catalogues** (Hummel, JACOB): clean product photos of the glands. Size tables built around the cable
  clamping range, with datasheet downloads, are the norm on gland catalogues. That is general knowledge; I didn't open a
  JACOB or Hummel product page in this review.
- **Conclusion:** the design doesn't need to change direction. The gap is proof, and most of it is owner-dependent.

## Proposed improvements, ranked by impact on quote requests and trust

Effort: **S** ≤ 2 h · **M** half a day to 1 day · **L** more than 1 day (each includes build, flow, a11y and visual
checks). All keep the existing design language and components.

### A. Can be done now

| # | Change | Why (evidence) | Effort |
|---|---|---|---|
| 1 | **Compact cookie banner on phones.** A bottom bar of about 25 % height, the same three choices, with "Essential only" and "Accept analytics" kept equally prominent (FINAL-STATUS rule). | Covers 42 % of the first screen on every first visit, including the hero CTA, which sits at about 600 px. India-first traffic is mostly phones. | S |
| 2 | **About page proves the company.** Lead with the confirmed plant photo instead of the lathe photo of unknown origin. Add the address with the Google Maps link and a "visit the plant" block. Bring the confirmed facts that sit elsewhere into one place: 66 machines by type, processes on one site, NABL calibration, 8D within 5 days, CoC every batch. Load the hero image eagerly (it is `loading="lazy"` today). | Auditors read About first, and today it is mostly empty cards (`about-1440.jpg`). | M |
| 3 | **Shorter-feeling quote form.** Fold "Requirements" (8 optional fields) into a closed "Technical details (optional)" section, so the order is drawings → items → your details → send. Say "Choose files" instead of "Drop drawings here" on touch devices (already on the P3 list). | The form is about 2,600 px on a phone, and the required contact fields come after 8 optional ones (`rfq-390.jpg`). | M |
| 4 | **Gland hub states the selection facts first.** Hero spec list: PG 7–48 · M12–M80, EPDM seal, IP54, not Ex, made to order (all owner-confirmed, now buried in a lower band). | A gland buyer decides in the first screen (`glands-1440.jpg`). | S |
| 5 | **Typical-parts drawing galleries on the 6 other group pages** (fittings, forged, inserts, terminals, fasteners, stamping), 3–6 representative shapes each, from `lineart.py`. Shapes only of types the page already lists, captioned "representative shapes" as on the turned page. | Today those pages are one drawing plus a text list. Parity with the turned page and more to look at without inventing claims. | L |
| 6 | **Replace text-only "Related" tiles** with drawings that already exist (PG/BSP/NPT thread profiles, product drawings), or a deliberate text-card style for Capabilities and Grades. | They read as missing images (on the P3 list as "neutral icons"). | S |
| 7 | **Desktop reading size.** Paragraphs and label/value rows at 16 px from 1024 px up (today 14–15 px). | Export buyers and auditors read on desktop; most body words are 14–15 px. | M (small CSS change, visual check of all pages) |
| 8 | **Shorter phone footer.** Fold the four link groups into disclosures on phones; keep address, phone and email open. | Saves about 600–800 px on every phone page. | S |
| 9 | **Less row-monotony on Ordering & shipping and Germany & EU.** Merge adjacent row bands, keep the "From quote to delivery" steps as the visual anchor, and drop one band colour change per page. | These pages are almost all label/value rows. | M |
| 10 | **Home hero (desktop): fill the empty left column** under the buttons, for example with the 4 stats or the ISO/3.1 line enlarged. | About 200 px of empty space beside the drawing at 1440 (`home-1440.jpg`). | S |

My recommended "now" set is **1–4 and 6**: about one and a half days. Items 5, 7 and 9 are worth doing, but they are
bigger. Item 8 and item 10 are polish.

### B. Needs photos or data from the owner (in order of value)

| # | What's needed | What it unlocks | Effort after it arrives |
|---|---|---|---|
| 1 | **Photo shoot** (`docs/PHOTO-SHOT-LIST.md`): glands and accessories first, then the turned-parts range, plant interior and people. | Photo-first gland and accessory pages, photo thumbnails on Home and Products, a real About page. The biggest single gain in trust and selling. | L |
| 2 | **Origin of the existing photos** (call sheet C3 / 38). | If they are AirGrip's own, I recommend showing the photo by default on the gland and accessory pages only. That reopens the earlier "Drawing first" choice. My reason: catalogue buyers recognise parts by look, and a real photo beats a drawing even at this quality (`existing-photos.jpg`). Made-to-drawing pages keep the drawing first. | S |
| 3 | **Gland clamping ranges and dimensions** (≈ a month, per Ketan). | Complete size tables, plus a one-page datasheet PDF per gland type (the usual catalogue norm). | M |
| 4 | **ISO 9001 certificate scan** (number, body, expiry). | A certificate card with a PDF link on Quality, linked from the Home trust line. "Copy on request" currently reads as a hedge. | S |
| 5 | **Ketan's bio and photo, Shree Shah's photo.** | Real people cards on About and Contact. | S |
| 6 | **Proof of scale**: plant area (item 24), in-house instruments (item 23), press types (item 12). | A facts band like Jakap's and Rajhans', and a credible instrument list. | S |
| 7 | **Anonymised customer examples** (sector, part, volume, years supplied). | The strongest missing B2B trust element. | M |
| 8 | **Logo refresh** (owner's choice). | A header that matches the site. | outside this site's work |
| 9 | **LinkedIn URL; fix the old phone number on the Google Business Profile.** | Footer link, and later the 4.4★ rating as a trust line. | S |

## Known and accepted (mentioned once, not proposed)
The NDA route ("send us your NDA by email") and direct emails both depend on sales@airgrip.in, which can't receive
mail yet. Form requests are safe on the server; NDA emails are not. This is already your and Ketan's decision.

## Compared with the earlier reviews (read after writing the above)
- **Overlap:**
  - `UX-REVIEW-2026-11-22.md` was mainly a facts and content review. It reached the same owner items: clamping ranges,
    ISO details, instruments, press types, Ketan's bio and photos.
  - The text-only related tiles and the "Drop drawings here" wording are on the DESIGN-LOCK P3 list, not yet done.
- **New here:** the mobile cookie banner, the About page structure and its unverified photo, the quote form length,
  the gland hub hero, parity between group pages, desktop body size, the phone footer, row monotony, and the logo.
- **Reopens an earlier choice:** only B2, showing photos first on gland and accessory pages. It needs your yes and
  confirmation of where the photos come from.
- **Not proposed** (already decided): other languages, Bing, brasscomponent.com, Product schema, an interim inbox.

## Status (2026-11-22, implemented in the build session)
- Done and deployed:
  - **A1:** first-visit cookie banner on phones is now a bottom bar at about 20 % of the screen, with two equal
    buttons; the per-category switches open from "Cookie settings".
  - **A3:** the 8 optional fields are folded under "Technical details (optional)"; Notes stays visible; touch devices
    read "Choose drawing files".
  - **A4:** the gland hub hero lists sizes, EPDM/IP54 and "not for Ex areas".
  - **A6:** guide related cards show the linked page's drawing; the remaining text cards are drawn as a sheet with a
    title block.
  - **A2 (part):** About photo description no longer claims a CNC lathe (origin open, C3) and the photo loads
    immediately.
- Corrected in A2:
  - About already had a "Visit the plant" block.
  - Facts are not repeated from Quality; About already links to it.
- Open for a second round: A5, A7, A8, A9, A10. B items wait on the owner. B8 (logo) only as a thought for Ketan.
- Not committed: `docs/fresh-review/bench-*.jpg` (competitor screenshots stay out of the public repo).
