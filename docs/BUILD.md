# Building and launching airgrip.co.in

The live site is `site/`: React 19 + Vite 8 + TypeScript. Every page is pre-rendered to static HTML, so it runs on any
Hostinger plan, and React only adds the interactive parts. Pages are generated from the locked design (`design/`).

## How it fits together
```
design/*.html  --(site/tools/convert.py)-->  site/src/pages/*.tsx      one component per page, same markup as the design
design/partials.js  ------------------------>  site/src/components/Layout.tsx   header, mega menu, footer, quote bar
                                               site/src/components/*    + Add, family switches, pair picker, forms, cookie banner
npm run build  ->  site/dist/   one index.html per URL, sitemap.xml, robots.txt, .htaccess (301 map, 404, caching)
```
- **Changing a page:** change the design (`design/tools/build_pages.py` for generated pages, or the HTML), then
  `cd site && npm run convert && npm run build`. Do not edit `site/src/pages/*.tsx` by hand: they are regenerated.
- **Forms, quote list, header:** `site/src/components/` (hand-written; the converter leaves them alone).
- **URLs:** `site/tools/convert.py` (`ROUTES`), following `docs/SEO-PLAN.md`.

## Commands (in `site/`)
| Command | What it does |
|---|---|
| `npm install` | once |
| `npm run dev` | dev server on http://127.0.0.1:5175 (forms answer from a local mock) |
| `npm run build` | type-check, client build, pre-render, launch guard, dist check; fails on any problem |
| `npm run preview` | serves `dist/` on http://127.0.0.1:4173 (forms answer from the same local mock) |
| `node tools/browser-check.mjs [site] [design] [--pixels]` | every page vs the design: text, console errors, 390 px overflow, pixel diff |
| `node tools/flow-check.mjs` | 37 buyer flows end to end (needs a build with `VITE_FORM_ENDPOINT=/api/form` + preview) |
| `node scripts/check-dist.mjs --launch` | launch gate: also fails without a form endpoint |

## Switches before launch (`site/.env.production`, not committed)
```
VITE_FORM_ENDPOINT=https://airgrip.co.in/api/form.php   # where the quote and contact forms POST (multipart)
VITE_GA_ID=G-XXXXXXXXXX                                  # GA4; empty = no analytics at all
```
- **Form endpoint** (decision pending): receives `form` (`rfq`, `rfq-quick`, `contact`), the fields, and drawings as
  `files[]` (each ≤ 20 MB, PDF/DWG/DXF/STEP/IGES/JPG/PNG; checked in the browser too). It must email sales@airgrip.in
  and answer HTTP 200. It must also email the buyer a copy (the thank-you page says "Copy sent to <their email>"),
  quoting the `ref` field. Options: a small PHP script on Hostinger (sends through a Hostinger mailbox), or a paid form
  service. The site is built for either; only the URL changes.
- **GA4:** the old site's Google Site Kit used property 336239038, measurement ID `G-BLFBKNQ02D` (an older stream
  "airgrip.co.in - GA4", `G-LY6PM6QR5B`, also appears). Reusing the property keeps the traffic history; Ketan must
  confirm who owns that Google account. Consent Mode v2 is wired: nothing loads until a visitor accepts analytics.
  Events: `rfq_submit`, `contact_submit`, `basket_add`, `tel_click`, `mailto_click`, `whatsapp_click`, `pdf_download`.

## Deploy (Hostinger, once the plan is known)
1. `cd site && npm ci && npm run build && node scripts/check-dist.mjs --launch`
2. Upload the **contents** of `site/dist/` (including the hidden `.htaccess` files) to `public_html/`.
3. Check: https on, `www` → bare domain, an old URL (e.g. `/about-us/`) answers 301, `/nothing` shows the 404 page.
4. Search Console: add the property, submit `https://airgrip.co.in/sitemap.xml`.

## Where the build deliberately differs from the design files
- **Real behaviour instead of mock-ups:** forms send to the endpoint; the thank-you page shows the reference that was
  sent with the request (the design showed a random number).
- **Quote list (DESIGN-LOCK build requirement D10):** a part code can be quoted in several finishes ("+ another finish").
- **Drawing checks (D11):** wrong type or > 20 MB is rejected on its own row with the reason, and is not sent.
- **Thread-pair picker:** only valid pairs are rendered (works in Safari); entry threads with no valid partner are
  left out (e.g. M12 for reducers), so a buyer cannot land on an impossible pair.
- **Dimension key on phones:** collapsed on all three gland pages (the design did this on the pressure-screw page only).
- **Cookie banner** connects to GA4 Consent Mode v2. **Fonts** are self-hosted subsets (same families as the design).
- **Home quick quote:** shows the chosen file names in the drop zone.
- The scroll-spy in in-page navigation only follows `#section` links (a link to the quote form in the same strip had
  broken it).

## Verified on 2026-11-14 (build of this commit)
- 34 pages pre-rendered; dist check: links, anchors, images, H1, title, description, canonical, JSON-LD all OK.
- Launch guard: clean. Every page's visible text equals the locked design (except the two intended differences above).
- Pixel comparison with the design at 1440 and 390 px: layout identical (remaining < 1 % differences are lazy-image /
  animation timing in the capture).
- No console errors or React hydration warnings; no horizontal overflow at 390 px.
- 37 flow checks pass: cookie banner, mega menu, mobile nav, + Add, head and EMC switches, pair picker, quote form
  (second finish, typed codes, file checks, validation, send, thank-you), NDA path, contact form, home quick quote.

## Still open (blocks launch)
See `docs/FINAL-STATUS.md` and `docs/CALL-SHEET-KETAN.md`: Ketan's gland drawings and data, ISO certificate copy,
privacy legal advice, plus the Hostinger plan, GA4 owner and form sending (call sheet 27–29).
