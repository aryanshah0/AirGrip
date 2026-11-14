# Handoff: the "attack the built site" exercise (written 2026-11-15)

Read this first in a new session, then `docs/REQUIREMENTS.md` (§9–§13), `docs/BUILD.md`, `docs/CLAIMS.md`,
`docs/CALL-SHEET-KETAN.md`. This file holds what the earlier sessions learned that is NOT obvious from the code.

## 1. The project in one paragraph
AirGrip (Air Grip Group of Companies, Jamnagar, Gujarat, since 1988) makes **brass turned components to customer
drawings** (its main business), plus forged parts, fittings, moulding inserts, electrical terminals, special fasteners,
metal stamping, and a **standard range of brass cable glands and accessories**. The new airgrip.co.in replaces an old
WordPress site. Audience: **B2B only** (buyers, purchase engineers, quality/supplier-audit people). Search priority:
**India first, then Germany and other export markets**. The site's job is to win new contract customers: "can they make
my part, can I trust them, how do I get a price". The user (Aryan, a developer, not an SEO or brass expert) owns the
project; Ketan Shah (Founder & MD) answers facts; Shree Shah (Marketing Director) is the buyer contact.

## 2. The user's words that set the bar (verbatim where it matters)
- First message: a UI/UX website "for showcasing brass related products which we sell right now to clients based on
  contracts directly from our factory in Jamnagar … best SEO and UI UX possible … main stakeholders B2B people only …
  the main thing sold under the name of AirGrip is Manufacturing of brass turned components."
- Old site: "should not be limited to old website rather adversarially should have all the necessary info in the
  right amount and placements – not copying everything blindly." The old site is a **source of facts, not a checklist**.
- "Unique (not AI slop), polished and B2B scoped with right verbiages, diagrams, photos."
- Each screen: "shows what all needs to show, nothing short nor too much extra info."
- This exercise (2026-11-15): adversarially question "each and every" thing **on the built site** (not the design
  files): every word, route, position, style, size, verbiage, diagram, photo. "I don't want a generic looking website
  … something [for a] business looking to make some deals with AirGrip, it shouldn't be some random technical crap but
  rather look polished, and very consistent in everything." Then attack SEO "so the site appears top on Google for new
  clients." Done "with 100% honesty and focus" so the result is good enough that **the user can win clients for
  building similar websites** (it is a portfolio piece too).
- "No 'family-run'" wording. "Bro don't overdo" (no gold-plating, no needless tooling). "Thoda contextual puchh"
  (ask questions with context, in plain language, with options).

## 3. How to work with this user
- Ask freely, **all questions in one batch up front**, each self-contained, with options and a recommendation. Before
  asking, check the docs (and old transcripts in `~/.claude/projects/-Users-aryanshah-Desktop-AirGrip-Code/*.jsonl`):
  the user gets rightly annoyed when asked for something already given (e.g. the competitor list below).
- Be honest about what was and wasn't verified. Never claim "100 %". Say what was tested, how, and what was not.
- Nothing unconfirmed on any page. Unknowns go to `docs/CALL-SHEET-KETAN.md`, never "TBC" on the site.
- Commit and push to `main` on github.com/aryanshah0/AirGrip (public repo, user's choice). Deploying to Hostinger
  needs the user's go-ahead and details (pending, see §7).

## 4. References (the user gave these on day one; they are in `docs/DESIGN.md` §1 with notes)
- Competitors: palomaturnedparts.com and jakap.com (Jamnagar), geissel.com, rajhans.com, vaishnavi.us,
  vijayaautoproducts.com. Cable-gland catalogue references: JACOB, Lapp, Hummel.
- Old site: running locally at http://localhost:8080 (Docker `airgrip-local`); exports in `../reference/old-site-reference/`.
- Earlier finding (DESIGN.md §1): competitors all use corporate blue, full-bleed photo heroes, sliders, stock icon
  tiles, vague claims. Nobody shows tolerances/ranges up front, the engineering-drawing language, traceability, or a
  serious RFQ with drawing upload. The site's concept is "the drawing sheet". This exercise may challenge the concept
  itself if the evidence says it reads as "technical crap" rather than "a supplier I want to deal with".

## 5. Decisions for this exercise (user, 2026-11-15)
1. **The built site is the source of truth.** `design/` is frozen as history. The old design lock (DESIGN-LOCK.md,
   COPY-STYLE "final text round") no longer limits changes: copy, structure and routes may change on evidence.
2. **First step: rebuild the generated pages as shared components.** Today `site/tools/convert.py` turns design HTML
   into `site/src/pages/*.tsx` (34 pages, 20+ near-identical product pages). Replace it with real page templates fed by
   one product data file, so one fix applies everywhere. Prove parity with the existing tests before changing anything.
3. **Competitors:** use the list in §4, add others where justified (say why).
4. **SEO data:** no access to Search Console, GA4 or Keyword Planner (Ketan owns the accounts; the user has no access).
   Work from public search results, competitor pages and Google autocomplete; label every estimate as an estimate.
5. **Photos:** launch with the line drawings (`design/tools/lineart.py` style). They must look deliberate and premium,
   not like placeholders. The photo shoot comes later (`docs/PHOTO-SHOT-LIST.md`).

## 6a. Who reviews (user, 2026-11-15: "senior designer and right parties are used appropriately")
Each reviewer is an independent agent with a fresh context, briefed only with this file, the facts docs and the
built site (never with the previous reviewer's conclusions). Each one gets one clear scope:
| Reviewer | Questions everything about |
|---|---|
| Senior B2B web designer (industrial / manufacturing brands) | Visual system and consistency: type, spacing, sizing, colour, grid, components, diagrams, imagery, motion; desktop and phone; does it look premium and distinctive or generic/template-like? |
| Procurement buyer, India (OEM purchase engineer) | Can I tell in 10 s what they make, whether they can make my part, whether I can trust them, how I get a price? Missing or excessive info, page by page. |
| Procurement / supplier-quality buyer, Germany (export) | Same, plus audit, compliance, terms, language and units an EU buyer expects; anything that would stop an RFQ. |
| B2B copy editor | Every word: clarity, tone (business, not "technical crap" and not marketing fluff), consistency of terms and part names, claims vs docs/CLAIMS.md. |
| SEO specialist (India + Germany B2B) | Keyword map per page, titles, descriptions, H1s, URLs, internal links, structured data, content depth vs the pages that rank today, local SEO, Core Web Vitals. |
| QA / accessibility engineer | Every interaction and state on every page, keyboard, forms, errors, Safari/iOS, speed; runs the test suite. |
Competitor benchmarking (§4) is part of every reviewer's brief, not a separate opinion.

## 6b. Finish line: one locked, deployment-ready site
The user wants this to END with a locked site that needs no further review or test passes. To make that possible
(earlier rounds kept finding new things because the bar moved), agree with the user at the start and then stick to:
1. **Severity bar, fixed before the attack:** P1 = wrong fact, broken function, or something that would make a
   buyer leave / not send an RFQ, or would hurt ranking; P2 = clearly visible inconsistency or weakness a competitor
   does better; P3 = taste or polish → post-launch list, not fixed now.
2. **One full attack round** by the panel above → ranked findings with evidence → user approves → all P1 and P2 fixed.
3. **One verification round** by the same reviewers, scoped strictly to: were the fixes done right, did anything
   regress. New P3s go to the post-launch list. Only a new P1 reopens anything.
4. **Lock** when the verification round finds zero P1 and zero P2 and the whole test suite passes (flows in Chrome and
   real Safari, accessibility, server checks on the local Apache + PHP, visual check at 1440 and 390 px). Record the
   lock in a new `docs/SITE-LOCK.md` (what was reviewed, by whom, results, the post-launch list).
5. After the lock, only Ketan's facts, real defects found on the live site, or buyer feedback change the site. The
   next step is deployment to Hostinger (needs the user's details and go-ahead), then `tools/server-check.mjs` on
   the live domain and one real test request.

## 6. Suggested shape of the exercise (agree it with the user at the start)
0. Shared components + data file; all tests green; visual parity.
1. Attack round (UI/UX and SEO together), page by page and element by element, at 1440 and 390 px, against the
   competitors and the old site, by the panel in §6a. Evidence = screenshots and quotes. Rank by the bar in §6b.
2. Present ranked findings with options; the user approves; fix all P1 and P2.
3. Verification round (§6b.3), full test suite, then lock (§6b.4) → ready for deployment.

## 7. State on 2026-11-15 (commit 4ddc4c3)
- Stack: React 19 + Vite 8, every route pre-rendered; PHP form sender in `site/public/api/` (to sales@airgrip.in,
  buyer copy, large drawings as 60-day links). Details and commands: `docs/BUILD.md`.
- Tests (all green): `tools/flow-check.mjs` (44 buyer flows; `BROWSER=safari` once Safari > Settings > Developer >
  "Allow remote automation" is on — **not yet enabled**), `tools/a11y-check.mjs` (axe, 0 violations),
  `tools/server-check.mjs` (120 checks), `tools/browser-check.mjs` (pages vs design; becomes obsolete once the design is
  frozen; replace with a before/after visual check of the site itself).
- Local servers: preview `npm run preview` → :4173; design `python3 -m http.server 5174` in `design/`; Apache + PHP
  test container `ag-apache` → https://127.0.0.1:8443 (self-signed; mail captured in the session scratchpad).
- Pending on others: Hostinger plan + login (user brings details), mailbox website@airgrip.co.in, GA4 owner (call
  sheet 27–29); Ketan's gland data and drawings (~1 month), ISO certificate copy, privacy legal advice.
- Post-launch (P3) list: `docs/DESIGN-LOCK.md`, bottom.
