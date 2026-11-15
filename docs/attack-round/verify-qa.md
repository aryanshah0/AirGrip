# Verification round: QA / accessibility (QA)
(Saved by the coordinator from the reviewer's returned report. Evidence: session scratchpad attack/qa/v2/, scripts attack/qa/scripts/.)

**Verdict: lockable.** All six P2s and the contact-form bug fixed; suites pass (52 flows, axe 0 on 35 pages, 283 server
checks); no regression, no new P1/P2.

- QA-01 fixed: real-key tab walk of all 8 quote-list pages at 1440/1024/768/390/320 with a filled list, no stop under the bar; brass focus ring on "Review & send".
- QA-02 fixed: "Added: X (press to remove from quote)"; axe with filled list, mega menu open, phone menu open: no mismatch.
- QA-03 fixed: umlaut local part and IDN domain accepted by the real sender (Reply-To IDN punycode; non-ASCII local part → sales + note); 152 MB → 413 on the server but the form refuses the file that would pass 100 MB first; specific messages per refusal; "try again" only for 5xx.
- QA-04 fixed: 21st file refused on its row; real sender with 21 files lists the dropped file under "Not received".
- QA-05 fixed: skip link first; Products → panel → Shift+Tab back → past the end to Capabilities; Escape closes panel and phone menu with focus returned; Call button at 390/320.
- QA-06 fixed: blocked storage notice, /rfq/?codes=… lists the codes, sending works.
- Contact form hidden after sending at 390 and 1440.
- New parts checked: first-visit banner on all 35 pages at five widths (once, no hydration errors), Drawing | Photo switch on 10 pages, lock-nut / stop-plug switches on the side-by-side grids (32/32 codes switch), no console errors.

New P3: at 390 on pressure screw and strain-relief the sticky sub-nav half-covers the first "+ Add" when tabbed to (2.4.11 minimum still passes); add the sub-nav to scroll-padding-top.
Limits: no real 429 triggered (faked), no real Safari or phones.
