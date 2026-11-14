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
| `node tools/flow-check.mjs [site]` | 44 buyer flows end to end, incl. failed sends and retry (`npm run preview` answers the form with a mock). `BROWSER=safari` runs them in real Safari (Safari > Settings > Developer > Allow remote automation) |
| `node tools/a11y-check.mjs` | axe-core WCAG 2.2 A/AA scan of every page, desktop and phone |
| `node tools/server-check.mjs [https://airgrip.co.in]` | the deployed server: https, www, 33 old-URL 301s, 410s, 404, headers, caching, every sitemap URL, PHP runs. Sends no form, safe on the live site |
| `node scripts/check-dist.mjs --launch` | launch gate: also fails without the form sender |

## Form sending (decided 2026-11-15: PHP on the Hostinger hosting, to sales@airgrip.in)
`site/public/api/` is copied into the build as `/api/`:
- `form.php` receives the three forms (`form` = `rfq`, `rfq-quick`, `contact`; fields; drawings as `files[]`) and
  emails them to sales@airgrip.in (Reply-To = the buyer) with the drawings attached. Quote requests also send the
  buyer a copy quoting the reference (the thank-you page promises it); the contact form promises no copy, so none.
  It checks everything again on the server: required fields, email, consent, reference format, file type and 20 MB,
  at most 20 files, NDA requests carry no files, only forms from airgrip.co.in, 10 requests per hour per visitor,
  no line breaks in mail headers.
- Drawings over 15 MB in total are not attached (mail servers refuse ~20–25 MB messages): they are saved outside
  `public_html` and the email carries download links (`file.php`, random 32-character token), deleted after 60 days.
- `config.php`: recipient, sending mailbox (`website@airgrip.co.in`, **must be created in hPanel > Emails**), allowed
  sites, limits. A test subdomain must be added to `origins` there.
- Requests, a log (`log.txt`: time, form, reference, result) and saved drawings live in `airgrip-forms/` next to
  `public_html` (never web-readable).
- Tested on Apache 2.4 + PHP 8.1 (Docker) with mail captured: 19 sender checks (attachments byte-identical, links,
  rejections, header injection, rate limit) and all 44 browser flows posting to the real script.
- `VITE_FORM_ENDPOINT` can still point the site at another endpoint (e.g. a form service); default `/api/form.php`.

## Analytics switch (`site/.env.production`, not committed)
```
VITE_GA_ID=G-XXXXXXXXXX     # GA4; empty = no analytics at all
```
- **GA4:** the old site's Google Site Kit used property 336239038, measurement ID `G-BLFBKNQ02D` (an older stream
  "airgrip.co.in - GA4", `G-LY6PM6QR5B`, also appears). Reusing the property keeps the traffic history; Ketan must
  confirm who owns that Google account. Consent Mode v2 is wired: nothing loads until a visitor accepts analytics.
  Events: `rfq_submit`, `contact_submit`, `basket_add`, `tel_click`, `mailto_click`, `whatsapp_click`, `pdf_download`.

## Deploy (Hostinger, once the plan is known)
1. In hPanel: create the mailbox `website@airgrip.co.in` (the forms send from it). PHP 8.1 or newer.
2. `cd site && npm ci && npm run build && node scripts/check-dist.mjs --launch`
3. Upload the **contents** of `site/dist/` (including the hidden `.htaccess` files and `api/`) to `public_html/`.
4. `node tools/server-check.mjs https://airgrip.co.in` must pass.
5. Send one real quote request with a small drawing and one contact message; check both arrive at sales@airgrip.in
   and the buyer copy arrives (also check its spam folder: if it lands there, add SPF/DKIM for airgrip.co.in in hPanel).
6. Search Console: add the property, submit `https://airgrip.co.in/sitemap.xml`.

## Where the build deliberately differs from the design files
- **Real behaviour instead of mock-ups:** forms send to the endpoint; the thank-you page shows the reference that was
  sent with the request (the design showed a random number). References look like `RFQ-26-K7M3QX` (6 characters, so
  two buyers never share one) and stay the same when a buyer retries after a failed send. If the browser blocks
  storage, the page says "In the copy we emailed you" instead of showing a made-up number.
- **Failed send** (not designed): everything typed and attached stays, a red message right above Send says
  "Could not send … try again, or email sales@airgrip.in", and Send works again. Back after a successful send gives a
  working form (not one stuck on "Sending…").
- **Home quick quote without a drawing:** the thank-you page lists "Your contact details" and the quantities (the
  design's fallback text "A note describing the part" was wrong for this form).
- **Quote form:** part names typed in "Parts and quantities" stay visible and are sent even after a code or drawing is
  added; a re-attached drawing gets back the quantities entered before leaving the page.
- **Accessibility:** the head/EMC switches work with arrow keys; tables wider than the phone screen can be scrolled
  with the keyboard. `/…/index.html` addresses redirect to the page (they showed the 404 page).
- **Structured data:** no `Product` markup (Google requires a price, review or rating for it, which we don't
  publish); FAQPage is now found on every page with a visible FAQ.
- **Quote list (DESIGN-LOCK build requirement D10):** a part code can be quoted in several finishes ("+ another finish").
- **Drawing checks (D11):** wrong type or > 20 MB is rejected on its own row with the reason, and is not sent.
- **Thread-pair picker:** only valid pairs are rendered (chosen so it should also work in Safari, which ignores
  hidden `<option>`s; not yet tested in Safari); entry threads with no valid partner are
  left out (e.g. M12 for reducers), so a buyer cannot land on an impossible pair.
- **Dimension key on phones:** collapsed on all three gland pages (the design did this on the pressure-screw page only).
- **Cookie banner** connects to GA4 Consent Mode v2. **Fonts** are self-hosted subsets (same families as the design).
- **Home quick quote:** shows the chosen file names in the drop zone.
- The scroll-spy in in-page navigation only follows `#section` links (a link to the quote form in the same strip had
  broken it).

## Verified on 2026-11-15
- Two independent reviews (code; site against the design as a buyer): no P1. Their P2s are fixed (above); P3s are on
  the post-launch list in DESIGN-LOCK.md. Both recommended keeping the three changes below the "deliberately differs" list.
- 44 browser flows pass on the preview server and on Apache + PHP; 19 form-sender checks; 120 server checks on Apache
  (redirects, 410, 404, headers, caching, PHP); axe: no WCAG A/AA violations on any page, desktop and phone.
- Every page vs the design: same text except the intended differences; pixels identical at 1440 except the thank-you
  reference; at 390 the folded dimension key (2 gland pages), the adapter list, and < 0.15 % text anti-aliasing on 4
  pages. Found and fixed on the way: the self-hosted font allowed weights up to 900 while the design loads 400–700,
  so extra-bold text was heavier than the design.
- iOS Safari (iPhone 16e simulator, iOS 18.6): the site loads and renders. Real Safari flows: see below.

## Verified on 2026-11-14
- 34 pages pre-rendered; dist check: links, anchors, images, H1, title, description, canonical, JSON-LD all OK.
- Launch guard: clean. Every page's visible text equals the locked design (except the two intended differences above).
- Pixel comparison with the design at 1440 and 390 px: layout identical (remaining < 1 % differences are lazy-image /
  animation timing in the capture).
- No console errors or React hydration warnings; no horizontal overflow at 390 px.
- 37 flow checks pass: cookie banner, mega menu, mobile nav, + Add, head and EMC switches, pair picker, quote form
  (second finish, typed codes, file checks, validation, send, thank-you), NDA path, contact form, home quick quote.

## Still open (blocks launch)
See `docs/FINAL-STATUS.md` and `docs/CALL-SHEET-KETAN.md`: Ketan's gland drawings and data, ISO certificate copy,
privacy legal advice, plus the Hostinger plan and login, the GA4 owner, and the `website@airgrip.co.in` mailbox
(call sheet 27–29). Not yet tested: real Safari flows (needs "Allow remote automation"), real phones (Ketan: Android +
Windows; Aryan: iPhone), and the real Hostinger server (`tools/server-check.mjs` once deployed).
