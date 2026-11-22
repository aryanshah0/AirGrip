# Brief: independent UI/UX review of airgrip.co.in, and how to make it better

You are reviewing a live B2B website with fresh eyes. Another session built it and has already reviewed it, so its
opinions are deliberately left out of this brief. Form your own judgement first.

## What the site is
- **AirGrip**: a brass parts maker in Jamnagar, India, founded 1988.
  - Its main business is **brass turned components made to customer drawings**, plus forgings, fittings, moulding
    inserts, electrical terminals, special fasteners and stampings.
  - It also sells a **standard range of brass cable glands and accessories**, with part codes.
- **Audience** (B2B only): purchase engineers, buyers and supplier-quality auditors, in **India first**, then Germany,
  the EU, the UK and the US.
- Buyers use phones (often in India) and desktops (export buyers, auditors), so **both count equally**.
- **The site's job** is to answer "Can they make my part? Can I trust them? How do I get a price?" and to turn visits
  into quote requests.
- **Live:** https://airgrip.co.in. Code: `site/` (React 19 + Vite, pre-rendered).

## What the owner asked for (the yardstick)
- **Must not look AI-generated or template-made.** It should be unique and distinctive, and consistent everywhere.
- Polished enough to show prospective clients as a portfolio piece.
- Factual B2B copy: no fluff, and never "family-run".
- Useful before decorative: data a buyer needs, with nothing padded.

## Your task
1. **Review every page at 1440 px and 390 px, full height.** Cover:
   - visual identity: is it distinctive or generic, and does it look AI-made anywhere?
   - consistency;
   - layout and rhythm;
   - typography;
   - hierarchy;
   - mobile usability;
   - the buyer journey to a quote request;
   - trust signals;
   - how well the design sells the products.
2. **Benchmark** against competitors where it settles a question:
   - Jamnagar and Indian makers: palomaturnedparts.com, jakap.com, rajhans.com, vaishnavi.us, vijayaautoproducts.com,
     geissel.com;
   - gland catalogues: lapp.com, hummel.com, jacob-gmbh.de;
   - any best-in-class B2B manufacturer site you would point to.
3. **Rate the site honestly** (an overall score plus one per area), with evidence: page, section, screenshot.
4. **Propose improvements**, ranked by impact on quote requests and trust, each with an effort estimate.
   - Separate what can be done now from what needs real photos or data from the owner.
5. **Don't change code until the user has approved the list.**
   - After approval, keep the existing design language and components unless the user agrees to change them.
   - Test before deploying.

## Facts and fixed decisions (don't re-open these)
- **Facts:** `docs/CLAIMS.md`, `docs/REQUIREMENTS.md` §11–§13 (owner answers). Nothing unconfirmed goes on a page.
  - Open owner questions are in `docs/CALL-SHEET-KETAN.md`. Gland clamping ranges, the ISO certificate details and the
    photo shoot are pending.
- **Photos:** real product and plant photos are not available yet. A photo shoot is planned
  (`docs/PHOTO-SHOT-LIST.md`). Line drawings stand in for now.
- **Out of scope:**
  - no other languages until the English site succeeds;
  - no Bing;
  - brasscomponent.com is the owner's matter: don't touch or propose anything about it;
  - no Product structured data (there are no prices or reviews).
- **Email:** sales@airgrip.in can't receive mail yet. Form requests are saved on the server; that's known and accepted.

## Don't read before forming your view
`docs/UX-REVIEW-2026-11-22.md`, `docs/DESIGN-LOCK.md`, `docs/FINAL-STATUS.md`, `docs/attack-round/`. They hold
earlier reviewers' conclusions. You may compare against them **after** writing your own findings.

## Tools in the repo
- Build and preview:
  ```
  cd site && npm run build && npm run preview -- --port 4173
  ```
- Checks:
  - `node tools/flow-check.mjs` runs 53 buyer flows;
  - `node tools/a11y-check.mjs` runs an accessibility scan (axe);
  - `node tools/visual-check.mjs <new> <reference>` compares two versions of every page.
- Deploy: `bash scripts/deploy.sh` (build, checks, backup, upload, live checks). Deploy only after the user approves.
- Headless Chrome helper for screenshots: `tools/cdp.mjs`.
