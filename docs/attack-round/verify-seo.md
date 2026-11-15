# Verification round: SEO (SEO)
(Saved by the coordinator from the reviewer's returned report. Evidence: session scratchpad attack/seo/work/ cwv-verify-*.txt, clsd*.mjs.)

**Verdict: not lockable** because of a desktop CLS regression from the new fallback font (pressure screw, forged,
fasteners, inserts 0.11 at 1440, lab). Fixed by the coordinator: fallback font removed (it was narrower than Archivo's
wide headings), last breadcrumb pinned on phones (the original 390 px cause), and the early cookie banner now waits
for the fonts (its reflow was the other shift). Lab CLS after: 1440 px 0.000–0.037 (= pre-attack build), 390 px
0.000–0.026; phone LCP 0.6–1.7 s (pre-attack 2.8–3.1 s).

- SEO-01, 02, 03 fixed (About title differs from the proposal but removes the overlap: acceptable).
- SEO-04 fixed: 117 rules, 14 spot-checks 301 to the right page; ?p= and /wp-content/ 410; unknown 404.
- SEO-05 fixed: JS gzipped; mobile LCP 0.59–0.72 s on 16/17 pages; first load at 1440 ~260–285 KB (was ~450).
- SEO-06 fixed at 390 (0.22 → 0.026), but caused the desktop regression above.
- SEO-07 not fixed (known, owner link, call sheet 36).
- SEO-08 fixed: /exports/germany-eu/ ~580 words, Breadcrumb + FAQ schema, in sitemap, no overlap with /exports/.

New P3: /exports/ H1 retitle not applied; Germany & EU page linked only from /exports/ (add a footer or menu link); Android has no Arial (moot now the fallback is removed); old www legacy URLs take 2 hops.
Checked, no regression: canonicals, sitemap (33 URLs), JSON-LD incl. gland FAQ schema, robots, 404/410, HTML gzip.
