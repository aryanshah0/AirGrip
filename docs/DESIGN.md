# AirGrip — Design direction & system (v0.3)

## 1. Competitor study (2026-11-13, desktop 1440 px)

| Site | What works | What to avoid |
|---|---|---|
| geissel.com | Real factory video, EN/DE switch, Downloads menu, "Since 1919", WhatsApp | Centred serif headline over drone video, generic dark photo bands |
| jakap.com | **Hard numbers** (1,75,000 sq ft · 25 M parts · 3,000 t), "35+ years" badge, a clear vertical-integration story | Its headline is literally **"Bar to Box"**, so our process story must look and read differently. Solar-panel stock video has nothing to do with the product |
| palomaturnedparts.com | Hero shows a real machined part on neutral ground; DE/FR links | 2010-era template, clip-art "vision & mission" people, all-caps blue nav bar |
| rajhans.com | **Tools** and **Downloads** in the main nav, alloy pages (technical SEO), clean nav | Generic green-on-photo hero, content fades in so late that sections look empty |
| vaishnavi.us | Product grid straight away, ISO and RoHS badges next to the logo, "Request a Quote" in the nav | Watermarked photos, dense justified text, clip-art icon tiles |
| vijayaautoproducts.com (VAP) | Short nav | Stock CNC slider, three-blue-tile "100 % on time" claims, near-empty home |
| old airgrip.co.in | Real building photo | Red text over photo, slider, outdated claims, typos |

**What they all share (so we avoid it):** corporate blue everywhere; full-bleed photo or video hero with a centred
headline and one button; sliders; stock icon tiles; counters that fade in; vague claims ("highest quality", "100 % on time").

**What nobody does (our opening):**
1. Nobody shows **tolerances and ranges up front**, and they're the first thing a buyer filters on.
2. Nobody uses the visual language buyers work in every day: the **engineering drawing**.
3. Nobody shows **traceability** the way buyers audit it: heat number to inspection records to carton label.
4. Nobody has a serious **RFQ with drawing upload**.

## 2. Concept: "The drawing sheet"
The site reads like a well-made engineering drawing and a clean spec sheet: precise, calm, measured.
The brass parts are the only warm colour. Decoration is never arbitrary. Every line is a centreline, a dimension, a hatch or a
title block, borrowed from technical drawing conventions (ISO 128 line types, ISO 129 dimensioning).

Signature moment: the **route card**, one example batch traced from OP 10 (contract review) to OP 80 (labelled carton),
with a sticky section drawing that changes state. (The v0.1 "melt to part" idea was dropped: AirGrip buys rod from mills.)

## 3. Design system (tokens live in `site/src/styles/tokens.css`)
- **Colour:** warm drafting-paper neutrals plus graphite ink plus one brass accent. **No corporate blue.** A deep "blueprint
  ink" (#0F1B2D) is used only for the one dark band (RFQ) and the footer.
  Brass #B8862F is decorative and large-text only. Brass text uses #7E5A19 (AA on paper and sheet).
- **Type:** *Archivo* (variable width and weight: semi-expanded for display, normal for text) plus *IBM Plex Mono* for
  specs, labels, dimensions and numbers. No Inter, Poppins or Space Grotesk (the default-template fonts). Self-hosted, subset.
- **Scale:** major third (1.25), 16 px base, fluid display sizes with clamp().
- **Grid:** 12 columns, 1320 px max, 24 px gutter. Margins: 16 / 32 / 48 px.
- **Space:** 4-pt base: 4 8 12 16 24 32 48 64 96 128.
- **Shape:** 0–2 px radii, 1 px hairlines, square buttons. No pills, no soft shadows, no glassmorphism.
- **Icons:** custom 1.5 px line icons drawn in the same drafting style. No icon library, no emoji.
- **Motion:** line-draw on first view (≤ 900 ms), 150 ms hovers, all of it off under `prefers-reduced-motion`.
- **Photography:** parts on a single neutral sweep, consistent 4:3 crops, centreline and crosshair overlays allowed. People and
  plant shots in natural light. Old thermocol-background photos are allowed only until the shoot replaces them, and are marked.

## 3b. Revision v0.2 (after critic round 1, 2026-11-13)
Scores in round 1: Distinctiveness 6 · B2B credibility 5 · Polish 6 · Signature 4 · Datasheet 4 · Mobile 5. Changes:
- **Signature replaced.** No "melt to part" (AirGrip buys rod from mills, so the in-house casting claim was false). New signature is the
  **route card**: one heat number travels OP 10 → OP 80. A sticky section drawing on the left changes state (rod → turned part →
  plated → carton) while a real route-card table scrolls normally on the right. **No scroll-jacking.** Readings are labelled as example values.
- **Drawing correctness:** ISO 128/129 conventions, ISO 7200 title block, first-angle projection symbol, tolerances never tighter than
  the claimed ±0.05 mm, DIN 40430 for PG (not "EN"), EN 62444 / EN 60529 on the gland pages.
- **Less template:** no "§" numbering, no right-hand meta labels, varied section openings. The hero headline spans the full width
  above an asymmetric split (not 50/50).
- **Type:** Archivo display at wdth 125 (clearly wide) vs text at wdth 100 vs condensed wdth 82 for labels and table heads.
  Mono only for things a drawing would letter: dimensions, tolerances, standards, codes.
- **Colour:** deeper sheet #ECEAE2, stronger rules #CFCDC3 / #9E9C92, input borders ≥3:1, ink-3 #5F656E. One warm graphite dark
  #17191D for the RFQ band only. Footer on paper (the logo stays legible). Brass gets larger deliberate surfaces (hatch, active route row, submit).
- **Header:** solid, no blur. **Products mega-menu.**
- **Product index:** BOM rows with small honest thumbnails (no enlarged legacy photos).
- **"Working with us"** facts table (MOQ, lead times, Incoterms, ports, NDA, documents, hours) above the RFQ.
- **RFQ = title-block form** plus a **quote basket** (datasheet rows have "+ RFQ").
- **Datasheet:** drawing as the hero, photo as a thumbnail, clamping-range column, sticky first column on mobile, proposed part codes.
- **Mobile:** dedicated simplified hero drawing, 2-column spec strip, no stacked giant SVGs.

## 3c. Revision v0.3 (after critic round 2)
Round-2 scores: Distinctiveness 7 · B2B 5.5 · Polish 6 · Signature 6 · Datasheet 5 · RFQ 6 · Mobile 4.5 · System 6.
- Technical corrections: Kompakt PG table held as "being re-verified" (AC < 1.155·AF impossible). PG profile redrawn at a true 80°.
  Route card made consistent: Rev. B throughout, hex bar AF 24 for an AF 24 part, OP 30 not required, GO/NO-GO with n.
- **Line-art placeholder system:** generated half-section drawings replace enlarged legacy photos and empty grey boxes until the shoot.
- Mobile table pattern: wrapping sticky first column, min-width table, scroll cue, and the primary action inside the sticky cell.
- Section openings varied: `.open` (no rule) on at most 2–3 sections per page, plus the side-head pattern elsewhere.
  Eyebrows that repeat the h2 are removed, and so are the decorative 01–09 numbers.
- Mono only for codes, threads, dimensions and standards. Archivo width stops: 82 · 100 · 112 · 125.
- Quote flow naming: row button "+ Add" (aria-label "Add <item> to quote") → count badge on the header "Request a quote" button
  (hidden at 0) → sticky "n items in your quote · Review & send" bar → RFQ form, with catalogue items inside the form (finish and quantities per line).
- New templates: Resources hub, Cable-gland hub, Accessory datasheet (sizes only), Exports, RFQ thank-you, 404.
- Claims matrix: plating in-house (confirmed). SPMs TBC. Stamping ±0.02 dropped. Exports by region only.

## 3d. Revision v0.3.1 (after critic round 3)
Round-3 scores: Distinctiveness 7 · B2B 6.5 · Polish 6 · Signature 6.5 · Datasheet 6 · RFQ 5.5 · Mobile 5.5 · System 6.
- Drawings: shoulder and edge lines in every view half. Ø only on round segments, AF only in end views, thread callouts on leaders.
  Hero Ø22 ±0.05 moved to the plain body (knurl noted separately). Route-card OP 70 keeps the plated state. Title-block collisions fixed.
- Line-art: a real two-view gland, varied part shapes, and `img/la/t/` lettering-free thumbnails for use under 220 px. "Not to a common scale".
- RFQ: per-line finish (writes the code suffix) and quantities. Incoterm and date always shown. Drawing-only fields hide for catalogue-only requests.
- Review notes (`.rnote`, striped) are mockup-only and separate from production copy. CAD links are not offered on unverified rows.
- Gland hub: one figure plus a comparison table (no triplicate cards). Accessory hub merged into the gland hub (`#accessories`).
- Lock nuts: Standard/EMC switch, 42 px chips. Exports: Incoterm responsibility matrix. Mobile specificity bugs fixed.

## 4. Banned patterns (the critic checks these)
Gradients as decoration · blobs · glass cards · three identical icon cards in a row · centred hero over stock video ·
count-up counters · carousels · "Welcome to…" · vague superlatives · emoji · rounded pill buttons · drop shadows on
everything · random accent colours · lorem ipsum · stock "handshake" or "globe" images · fake testimonials.
