# QA / accessibility findings
(Saved by the coordinator from the reviewer's returned report; the reviewer could not write files. Screenshots and scripts in the session scratchpad attack/qa/.)

Summary: every main buyer flow works, and all three suites pass (44 flows, axe on 34 pages, 120 server checks). Problems sit where the tests don't look: the sticky quote bar breaks keyboard focus; the form sender's limits (20 files, total size, non-ASCII email) aren't checked in the browser, so a buyer loses a drawing silently or gets a misleading "try again"; "✓ Added" fails WCAG 2.5.3; header keyboard order; blocked storage fails silently. Pages are light and fast on an emulated mid-range phone. P1 0 · P2 6 · P3 14.

## P2

### QA-01 Sticky quote bar hides keyboard focus; its "Review & send" button has no visible focus ring
- Where: all 8 pages with "+ Add" once the list has ≥ 1 item; 1440 and 390.
- Evidence: Tab through stop-plugs sizes with 1 item: focused "+ Add" PG 16 at y 852–884, bar y 840–900 → fully covered (WCAG 2.2 AA 2.4.11). qa/focus-hidden-by-quotebar-1440.png, -390.png. Tab walk of all 8 pages: 2–9 covered stops per page, incl. footer links at 390. "Review & send" outline rgb(21,24,30) on bar rgb(21,24,30) (1:1, fails 2.4.7): qa/qbar-button-focused-1440.png vs -unfocused-1440.png. Suite's axe runs with an empty list.
- Fix: body.has-qbar { scroll-padding-bottom: 76px }; .qbar :focus-visible { outline-color: var(--brass-on-dark) } (or the existing .dark rule).
- Scope: quote bar, 8 pages · Effort: S

### QA-02 "✓ Added": accessible name doesn't contain the visible word (WCAG 2.5.3, Level A)
- Evidence: axe with an item in the list: label-content-name-mismatch (serious). Visible "✓ Added", name "Remove Stop plug PG 7 from quote" (src/components/AddQ.tsx).
- Fix: "Add Stop plug PG 7 to quote" / "Added: Stop plug PG 7 (press to remove)"; add an axe scan with a non-empty list to a11y-check.mjs.
- Scope: component (8 pages + pair picker) · Effort: S

### QA-03 Server rejections tell the buyer to "try again", which can never work
- Where: /rfq/, home quick quote, /contact/ (src/lib/forms.ts: any non-OK → "Could not send just now. Please try again…"; public/api/form.php).
- Evidence (real Apache + PHP, curl): umlaut email (jürgen.müller@example.de, info@müller-gmbh.de) passes the browser EMAIL_RE but the server answers 400 {"error":"email"} (FILTER_VALIDATE_EMAIL without Unicode flag); 8 × 19 MB (152 MB) exceeds post_max_size → 413 {"error":"too large"} although each file meets "max 20 MB each" (7 × 19 MB went through as links); rate limit 429 (10/hour/IP) → same "try again".
- Fix: (1) browser checks what the server enforces (total size matching the server, ≤ 20 files); for email accept Unicode on the server (FILTER_FLAG_EMAIL_UNICODE + idn_to_ascii for the domain). (2) map server errors: email → "Check your email address"; too large → size message; too many requests → "Please wait an hour or email sales@airgrip.in". (3) generic "try again" only for 5xx/network.
- Scope: 3 forms + form.php · Effort: S–M

### QA-04 More than 20 drawings: the 21st and later are lost silently
- Evidence: 21 small PDFs to the real sender → 200 {"ok":true}; log "RFQ-26-QATST2 sent 20 file(s)"; email has 20 attachments, no "Not received" line. PHP max_file_uploads = 20 drops extras before form.php runs, so its own "more than 20 files" branch never runs. Browser accepts 21; thank-you lists 21 as sent.
- Fix: files after the 20th get their own row "Not sent: at most 20 drawings per request. Send the rest in a second request or by email."; client sends file_count, form.php adds "Not received" lines for any difference; 21-file case in sender checks.
- Scope: RFQ form + form.php · Effort: S

### QA-05 Header keyboard order: mega menu reached only after 8 other links; Escape doesn't close the mobile menu
- Evidence (real key presses; qa/scripts/kb-header.mjs, mnav.mjs): Tab to Products + Enter opens the panel; next 8 Tabs go to Capabilities … "Request a quote" while the panel covers the page; 9th reaches "Made to your drawing". Panel sits after the header's right-hand block in the DOM (Layout.tsx) (WCAG 2.4.3). Mobile menu: Escape does nothing; tabbing past the last item goes into hidden page content; menu stays open while page scrolls. No skip link (10 Tab stops before content).
- Fix: render the mega panel right after the Products button (or move focus into it when opened by keyboard), close when focus leaves; mobile menu closes on Escape (focus back to Menu) and when focus leaves; optional skip link.
- Scope: Layout (site-wide) · Effort: S

### QA-06 Storage blocked: "+ Add" shows "✓ Added" and a count, but the quote form arrives empty with no explanation
- Evidence (qa/scripts/blocked.mjs, storage throwing SecurityError as Chrome with all cookies blocked): on stop plugs "✓ Added", header count 1; on /rfq/ the list is empty and nothing is said; cookie banner reopens on every page. Private windows unaffected (from code; private Safari not run).
- Fix: when saving fails (catch in write() in src/lib/basket.ts) show one line on the quote bar and /rfq/: "Your browser blocks site storage, so the quote list can't follow you to the quote form. Type the part codes on the quote form instead." Optional: carry codes in the "Review & send" link (/rfq/?codes=…).
- Scope: quote list + /rfq/ · Effort: S

## P3 (post-launch list)
- QA-07 Floating WhatsApp button stays focusable while faded over the footer (.wa.away {opacity:0}); add visibility:hidden.
- QA-08 Removing a quote line or drawing row (×) sends focus to the top; move it to the next row.
- QA-09 Typing a listed code with a finish (AG-SP-PG07-ZN when AG-SP-PG07 is listed) overwrites the first line's finish and quantities instead of adding a second-finish line.
- QA-10 Back after a successful send restores the cached form with the old reference; reset it on page restore.
- QA-11 RFQ error summary scrolled into view but focus goes to the first invalid field, often off-screen; focus the summary.
- QA-12 Drawing rows held back by NDA dimmed to 1.9:1 / 2.9:1 contrast.
- QA-13 Font-swap CLS 0.22 on pressure screw at 390 (same as SEO-06).
- QA-14 JS uncompressed on Apache (same as SEO-05); add a compression check to server-check.mjs.
- QA-15 server-check.mjs doesn't check the host's PHP upload limits (upload_max_filesize ≥ 20 MB, post_max_size, max_file_uploads); PHP default is 2M.
- QA-16 Footer "Cookie settings" is a link (#cookies, no target) acting as a button; make it a <button>.
- QA-17 Header quote count reads "Request a quote 1"; add hidden " items in your quote".
- QA-18 First-visit cookie banner at 320×568 covers 76 % of the screen; compact phone layout.
- QA-19 RFQ email doesn't say which product page the buyer came from; pass the datasheet path (Geissel pre-fills from the product link).
- QA-20 1 px horizontal overflow on conduit-gland-parts at 320 px.

## Checked and fine
Suites: flow-check 44/44, a11y-check 0 violations on 34 pages, server-check 120/120. No overflow and no console errors at 1440, 1024, 960, 768, 720, 640, 390, 320 (except QA-20). In-page links land below the sticky header; all internal links and anchors resolve (except QA-16); tel:, wa.me, mailto: correct. Mega menu opens on click, closes on outside click/Escape with focus returned; tabs and switches work with arrows; pair picker valid pairs only (Chrome). Quote form: double click + Enter sends once; typed codes; + another finish; leave-and-return restores fields; wrong type and > 20 MB rejected per row; NDA; failed send keeps everything, retry keeps the reference; thank-you survives reload; Back gives a working form. Drag and drop works. Quick quote and contact flows work (topics map). Real sender: 7 × 19 MB as links; o'brien@ accepted. 404, thank-you, /x/index.html → 301, /rfq → /rfq/. Reduced motion handled. Speed on emulated mid-range Android (CPU ×4, 150 ms, 1.6 Mbit/s, empty cache, 14 pages on Apache): FCP 0.6–0.7 s; LCP ≤ 0.8 s (About 2.4 s, photo); TBT 0 ms; weight 410–620 kB; CLS ≤ 0.03 at 390 except QA-13, ≤ 0.08 at 1440; JS gz 77 kB shared + 2–9 kB per page. iOS Safari simulator (iPhone 16e, iOS 18.6): /rfq/ and thread adapters render (qa/ios-*.png).

## Coverage and limits
Suites + own headless-Chrome scripts on preview :4173 and Apache+PHP :8443 with real key, mouse and drag events (widths, Tab walk of all 34 pages at 1440 and 390 with a filled list, focus-ring contrast, axe in 10 states, form edge cases, blocked storage, anchors, links, CLS and speed). Real sender requests: 21 files, 7 × 19 MB, 8 × 19 MB, three contact emails (RFQ-26-QATST2–4 in the container log). Focus-ring contrast walk cut short (home and stop plugs complete). Not checked: desktop Safari (automation off), iOS simulator interactions, real phones, real screen reader, forced colours, Firefox, drop outside the zone, real Hostinger PHP limits, GA4. Competitor RFQ/contact flows: none better (Paloma, Jakap (spam), Geissel product pre-fill, Rajhans, Vaishnavi, Vijaya, JACOB, Hummel); AirGrip's upload, NDA, quote list and failed-send handling ahead of all.

## Outside my scope
None. (Note by coordinator: QA did not catch the contact form staying visible after sending; that came from the BIN reviewer and is confirmed.)
