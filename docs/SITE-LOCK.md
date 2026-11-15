# Site lock: airgrip.co.in (2026-11-15)

**Status: LOCKED.** The built site in `site/` (commit on `main` that adds this file) is the version to deploy. It needs
no further review or test rounds. Per HANDOFF §6b.5, only these change it from now on: facts from Ketan, real defects
found on the live site, and buyer feedback.

## What was done, by whom
Process and severity bar agreed with the owner before the attack (HANDOFF §6a–§6c). One attack round, then fixes for
every approved P1/P2, then one verification round by the same reviewers. All reports are in `docs/attack-round/`.

| Reviewer (independent agent, same brief) | Attack round | Verification round |
|---|---|---|
| Senior B2B web designer | 0 P1 · 7 P2 · 16 P3 (`des.md`) | lockable after 2 follow-up fixes (`verify-des.md`) |
| OEM purchase engineer, India | 0 · 4 · 10, + 1 P1 outside scope (`bin.md`) | lockable (`verify-bin.md`) |
| Purchaser / supplier quality, Germany | 0 · 4 · 12 (`bde.md`) | lockable after follow-up fixes (`verify-bde.md`) |
| B2B copy editor | 3 · 10 · 22 (`cpy.md`) | lockable after 5 text fixes (`verify-cpy.md`) |
| SEO specialist, India + Germany | 3 · 5 · 15 (`seo.md`) | lockable after the layout-shift fix (`verify-seo.md`) |
| QA / accessibility engineer | 0 · 6 · 14 (`qa.md`) | lockable (`verify-qa.md`) |

Merged list approved by the owner ("start fixing everything apart from the hostinger related work"):
`attack-round/FINDINGS.md`. Fix log: `attack-round/FIXES.md`. Choices taken as recommended: Drawing | Photo switch,
and a Germany & EU page built before launch.

Before the attack, the 34 generated pages were rebuilt as four templates plus one product data file
(`site/src/data/products.tsx`). Parity was proven against the previous build: identical HTML, CSS, text and pixels.

## Results
- **7 P1s fixed:**
  - the contact form now hides after sending;
  - the home page promises a reply, not a price;
  - unconfirmed claims removed (Industries parts, seal inserts, the NDA upload link);
  - the time-zone line corrected;
  - money-page titles, H1 and lead rewritten;
  - a page now targets "brass electrical parts";
  - home and About no longer compete for one query.
- **All approved P2s fixed**, except the ones below that wait on the owner.
- **Verification-round regressions found and fixed:**
  - lock nuts had lost its RoHS / EN 10204 line;
  - the profile PDF repeated the price promise;
  - the Photo view upscaled small photos;
  - conduit parts had not been converted to the side-by-side sizes;
  - the layout shift on font swap: the first fallback was too narrow for headings, and the early cookie banner reflowed;
  - RoHS 6(c) now carries its expiry date: "currently valid until 30 June 2027 (Delegated Directive (EU) 2025/2364)",
    checked against TÜV Rheinland, SGS, JACOB and Lapp, because EUR-Lex refuses automated fetches.
- **Waiting on the owner** (interim wording claims nothing):
  - Google Business Profile tie-in (call sheet 36);
  - armoured / unarmoured cable for the glands (31);
  - tightest tolerance and the instruments owned (33);
  - signed REACH / RoHS statements, CMRT and Cr(VI) (34);
  - quote validity and metal price basis (35).

## Tests at the lock
- `tools/flow-check.mjs`: **52 buyer flows pass in Chrome and in real Safari on the Mac** (`BROWSER=safari`, run
  2026-11-15 after the lock). In Safari, the wrong-type file and the 21 files are put on the file input as a drag-and-drop
  would: safaridriver can only pick files the input's `accept` list allows, as a buyer's file picker does. New in this round:
  - the contact form is hidden after sending;
  - server refusal messages;
  - the 21st drawing;
  - header keyboard order and Escape;
  - side-by-side size grids;
  - the Drawing | Photo switch.
- `tools/a11y-check.mjs`: **axe, 0 WCAG 2.2 A/AA violations** on all 35 pages, desktop and phone, plus a datasheet with a
  filled quote list.
- `tools/server-check.mjs` on Apache 2.4 + PHP 8.1 (Docker) with the real form sender: **283 checks pass**, covering:
  - https and www;
  - 114 old-URL 301s;
  - 410s and the 404 page;
  - headers and caching;
  - every sitemap URL;
  - PHP runs.

  Real requests through the sender:
  - 21 files: 20 attached, and the missing one is reported in the email;
  - umlaut and IDN email addresses;
  - 152 MB: refused by the server, and the form stops it first;
  - the NDA path;
  - buyer copies sent.
- **Speed (lab, headless Chrome, not field data):**
  - CLS ≤ 0.046 on every page in a 21-page warm-connection sequence at 1440 and 390 (SEO re-measure: capabilities 0, was 0.195),
    thanks to metric-matched fallback faces for text and for the wide headings.
  - Phone LCP is 0.6–1.7 s (product and chart pages about 0.6 s); About is 2.1 s (a photo). It was 2.4–3.1 s before.
  - JavaScript is gzipped: first load at 1440 is about 260–285 KB.
- **Visual:** 1440 and 390 px captures of every page reviewed by the designer and the buyer reviewers. QA also checked
  1024, 768 and 320.

## Not tested (honest limits)
- **Real phones** (Ketan: Android + Windows; Aryan: iPhone), Firefox, and real screen readers (VoiceOver / NVDA).
  Names and roles were checked with axe and by reading the page structure.
- **The real Hostinger server:** PHP upload limits (`upload_max_filesize` ≥ 20M, `post_max_size` ≥ 128M,
  `max_file_uploads` ≥ 20), JS compression, and real mail delivery including SPF/DKIM. Run `tools/server-check.mjs
  https://airgrip.co.in` and send one real quote request after the upload.

## Must happen before go-live (owners outside the website)
1. **Hostinger DNS and email (urgent).** Both airgrip.co.in and airgrip.in point to Hostinger parking nameservers with
   no records: the old site is offline and **mail to sales@airgrip.in is very likely not arriving** (call sheet 30).
   Someone with the hPanel login sets up DNS and email, and creates the mailbox `website@airgrip.co.in` that the forms
   send from.
2. The upload to Hostinger and the checks after it (`docs/BUILD.md` › Deploy).
3. Already agreed to follow after go-live: Ketan's gland size table and drawings, the ISO certificate details, and legal
   advice on the privacy page (HANDOFF §6c.4). Open questions are on `docs/CALL-SHEET-KETAN.md` (items 1–40).

## Post-launch list (P3)
Every P3 from both rounds is in the reviewer reports (`docs/attack-round/*.md`, sections "P3" / "New P3"), about 100
one-liners, plus the older list at the bottom of `docs/DESIGN-LOCK.md`. These are the ones most worth doing first:
- **Phone:**
  - at 320 px the header Menu button touches the screen edge;
  - lock nuts is about 6,600 px long at 390 (thread tabs on phones only?);
  - on pressure screw and strain-relief at 390, the sticky sub-nav half-covers the first "+ Add" when it gets focus.
- **Consistency:**
  - the accessory quote box says "size or conversion" (conversion only fits the adapters page);
  - fasteners says "Photos" where other pages say "Photo";
  - the Photo view keeps the drawing caption;
  - the gland hub cards use different drawing scales;
  - the BSP/NPT "+ Add" buttons zig-zag;
  - text cards sit on paper while drawing cards are white;
  - drawings are not centred in their frames.
- **Copy:**
  - the 20-file / 100 MB per request limits are missing from the upload hints;
  - "M12–M80 to EN 60423": M80 is not an EN 60423 size;
  - the profile PDF has "team" under the machines figure, no JPG/PNG in its footer, and no issue date;
  - the NPT chart reads "1/8 – 2"".
- **SEO:**
  - the /exports/ H1 retitle;
  - more links to the Germany & EU page (footer or menu);
  - meta descriptions over 160 characters;
  - `WebSite` JSON-LD;
  - sitemap `lastmod` dates;
  - HS codes once Ketan sends them.
- **Off-site, after go-live:** Google Business Profile, IndiaMART / TradeIndia, Europages / wlw.de / Kompass, and Search
  Console with the sitemap submitted.

## After the lock
- Change a product, gland, accessory or chart page in `site/src/data/products.tsx`; other pages in `site/src/pages/`.
- Then run `npm run build`, `tools/flow-check.mjs`, `tools/a11y-check.mjs` and (on the server) `tools/server-check.mjs`.
  Use `tools/visual-check.mjs <new> <reference> --pixels` to see exactly what changed.
- Regenerate the company profile with `node tools/make-profile.mjs` after any fact in it changes.
