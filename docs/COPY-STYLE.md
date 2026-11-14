# Copy style: locked rules for all site text (2026-11-13)

Final text pass done; the wording is locked together with the design. After this, text changes come only from
Ketan's answers (facts), Shree/Ketan's read of Home and About (voice), or real buyer feedback.

## Voice
- Factual B2B English for engineers and buyers in India and Europe. Short sentences; numbers, standards and grades over adjectives.
- British spelling (moulding, colour, centre). "We" for AirGrip in running text; "AirGrip" in leads and legal text.
- No marketing filler: no "world-class", "solutions", "seamless", "plainly", "under one roof". No "family-run".
- Claim only what is in docs/CLAIMS.md. Anything unconfirmed is a TBC chip, a .vfy underline or a review note, never plain text.

## Fixed wordings (use exactly)
- Plating: "plated in our plant". Finish rows: "Natural, or plated in our plant: nickel, tin or zinc; silver or chrome on request" (or "nickel or tin; …" where zinc isn't offered). Gland and accessory pages: nickel, tin or zinc only.
- Tolerance: "±0.05 mm". Volumes: "From a few thousand pieces to millions a year".
- Reply promise "within two working days" (decision 2026-11-14) appears **only** in: home quote band, RFQ form footer, thank-you page, Ordering & shipping figures strip. Elsewhere link to the RFQ instead.
- Terms (MOQ, lead times, NDA, delivery) live on Ordering & shipping; product pages link there and keep only product-specific questions.

## Headings
- H1 patterns: groups "Brass …" ("Brass fittings", "Forged brass components", "Brass moulding inserts"); glands "[Name] brass cable gland" (pressure screws: "Brass pressure screws for cable glands"); accessories "Brass … for cable glands"; charts "[System] thread chart" with the standard as the eyebrow above.
- The lead never repeats the H1's opening words.
- Section headings say what the section answers ("Which machine makes your part", "Buying brass fittings from AirGrip"), not generic labels, except "Related", "Examples", "Sizes and part codes".
- Reference pages (Capabilities sections, chart pages) may use plain labels such as "Processes", "Machine park", "Threads": they are looked up, not read in order.
- Navigation labels may be shorter than H1s (menu "Moulding inserts", H1 "Brass moulding inserts").

## Never visible to buyers
- References to the old site ("previous catalogue/site/datasheet/Technical Library"), question numbers, photo-shoot notes, "size list being confirmed". These belong in review notes only.
- Guard: `python3 design/tools/check_launch.py` lists every review note, TBC, .vfy, photo placeholder, old-site reference and question number. The build must report zero before launch.
