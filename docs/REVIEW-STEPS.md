# How to review the AirGrip design: step by step

Allow about 90–120 minutes. Start the preview with `! open http://127.0.0.1:5174/review.html`.
For each step, write your notes as **page → section → change** (e.g. "Home → Products → rename 'Moulding inserts' to 'Brass inserts'").
Markers on the pages: dashed **TBC** = data AirGrip must supply · dotted underline = wording to confirm ·
striped **Review note** = internal note (removed at launch) · hatched box "shot A1/B6" = photo to take · line drawings = interim
images until the photo shoot.

## Step 1: First impression (5 min, desktop)
Open **Home** and scroll once without reading closely.
- Does it look like a serious, specialised engineering supplier, not a generic template?
- Is it clear within 10 seconds what AirGrip makes and how to ask for a price?
- Anything that feels too busy, too empty, or off-brand (colours, logo, typography)?

## Step 2: Read the home page properly (10 min)
Check each of the 6 sections: hero · product groups · ranges and tolerances · quality and traceability (route card) · plant · request for quote.
- Is every fact correct? (Cross-check `docs/CLAIMS.md` if unsure.)
- Is anything AirGrip offers missing from the home page?
- Is the wording how AirGrip would describe itself to a buyer?

## Step 3: Follow a buyer's journey (10 min)
1. Header **Products** → **Pressure screws** → add two sizes (**+ Add**) → watch the bar at the bottom.
2. **Products** → **Lock nuts** → switch to **EMC** → add a size.
3. Click **Review & send** → on the quote form, choose a finish per line, type a part code, attach any file, submit.
4. Check the **thank-you page**.
- Was anything confusing or missing for a real buyer?

## Step 4: Product pages (15 min)
**Products** overview → **Brass turned components** → the 6 other groups (fittings, forged, inserts, terminals, fasteners, stamping) → **Cable-gland hub** → **Pressure screws**, **Clamping-jaw**, **Strain-relief** → **Lock nuts** and the 8 other accessories (all linked from the hub and from review.html).
- Are the right things on the right page, with nothing missing from the old site and nothing padded?
- Do the templates have the right sections for *every* group they will be reused for?
- Read `QUESTIONS-FOR-KETAN.md` section 0 (JACOB names) before judging the gland pages.

## Step 5: Company and trust pages (15 min)
**Capabilities** · **Quality** · **Industries** · **About** · **Ordering & shipping**
- Do they show what an auditor or purchasing manager expects?
- Is anything from the old site missing that should be there?

## Step 6: Resources, contact, legal (5 min)
**Resources** · **PG, metric, BSP, NPT charts** · **Grade equivalents** · **Contact** · **Privacy policy** · **404**

## Step 7: Phone check (10 min)
Open the same pages on your phone (same Wi-Fi: replace `127.0.0.1` with this Mac's local IP), or narrow the browser window.
- Menu, quote bar, tables, forms: anything awkward to tap or read?

## Step 8: Send your changes
Send the notes from steps 1–7 in one message. Then we go through the open questions (multiple choice), apply everything, and move to implementation.

## After approval: implementation and shipping (preview)
1. Convert the design to the React app: Vite + React, every route pre-rendered to static HTML for SEO; design tokens and components reused.
2. Content from the approved design, with TBCs filled from Ketan's answers (unanswered items hidden).
3. SEO build: metadata, schema, sitemap.xml, robots.txt, 301 redirects for all 35 old URLs (`docs/SEO-PLAN.md`).
4. Forms: RFQ and contact delivery (Hostinger PHP mail or a form service), file upload limits, spam protection.
5. Analytics: GA4 with Consent Mode v2, cookie banner, Search Console.
6. QA: Lighthouse/Core Web Vitals, accessibility, cross-browser, mobile.
7. Deploy to Hostinger (airgrip.co.in), then GitHub repo `aryanshah0/AirGrip`, then a launch checklist and post-launch monitoring.
