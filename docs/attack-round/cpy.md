# CPY findings: B2B copy editor
(Saved by the coordinator from the reviewer's returned report; the reviewer could not write files. Supporting files in attack/cpy/: text/*.txt, extract.py, run/states.mjs, run/*.png, shots/*.png.)

Summary: The copy is the strongest part of the site: factual, short, written for a buyer, far ahead of every named competitor (most lean on slogans). Almost every claim traces to REQUIREMENTS §9–§13 or CLAIMS.md. Problems: a few promises/specifics beyond the sources, and inconsistency in how the same thing is written (ranges, inch sizes, adapter/adaptor, lead-free/low-lead, machine names, missing-dimension treatment, where the pressure screw belongs). P1 3 · P2 10 · P3 22. No big changes.

## P1

### CPY-01 Home quote band promises a *price* in two working days; the owner confirmed a *reply*
- Where: / quote band H2 (1440, 390).
- Evidence: "Send a drawing, get a price within two working days". REQUIREMENTS §11 "Reply promise: Within two working days"; §12 "2-working-day reply"; COPY-STYLE "within two working days". Thank-you page: "You'll get price, MOQ and lead time by email, or questions if anything on the drawing needs clarifying."
- Why it matters: commitment the owner didn't make; a buyer who gets questions on day 2 catches an overpromise on first contact.
- Competitor: rajhans.com "we will be in contact with you in 24-48 hours"; geissel.com no time.
- Fix: H2 → "Send a drawing. We reply within two working days." Lead → "Include the quantity per order and per year. You get a price, MOQ and lead time, or our questions on the drawing. If a small design change would make the part cheaper to make, the quote says so."
- Scope: one page · Effort: S · Big change: no

### CPY-02 Specifics shown as fact that no source confirms
- Where: /industries/ "What we supply" column; "Spare parts" row on clamping-jaw and strain-relief pages; "Pressure screws & spares" tile on /products/brass-cable-glands/.
- Evidence: CLAIMS.md "typical parts per sector CLAUDE, to confirm"; §12 confirms only six sector names. Automotive "Battery terminal fasteners, sensor bodies and connector parts"; Electrical "Cable entry, sealing and earthing for control panels, motors, junction boxes and lighting"; HVAC "Valve components and connectors". "Sensor", "motor", "lighting", "junction" appear in no doc nor old site. "Dome cap nuts and seal inserts on request": "seal inserts" unsourced (only dome cap nut, §10).
- Why it matters: site rule "nothing unconfirmed on any page" (§13).
- Fix (ask owner; until then sourced wording): Electrical → "Cable glands and accessories for panels and enclosures; terminal blocks, connectors, earth blocks and neutral links for MCB, RCD and switchgear makers." Automotive → "Battery-terminal fasteners and kits, and forged and turned parts to drawing. ISO 9001:2015 (not IATF 16949); PPAP Level 3 on request." HVAC → ask owner; fallback "Turned and forged parts to drawing." Hydraulics & pneumatics "Connectors and adaptors for air and fluid lines." → "Hydraulic and pneumatic fittings, turned or forged." Spare parts row → "Dome cap nuts on request". Lower risk, ask owner: Exports "GST, PAN, MSME certificate and bank details sent on request" (GST, PAN not in docs); Quality "a completed supplier questionnaire".
- Scope: 4 pages · Effort: S · Big change: no

### CPY-03 "Germany / EU 05:00–14:00 CET" is wrong for a third of the EU
- Where: /contact/ Hours: "Germany / EU 05:00–14:00 CET · UK 04:00–13:00 GMT (one hour later in summer in both)". Ireland, Portugal on GMT/WET; Finland, Baltics, Greece, Romania, Bulgaria, Cyprus on EET.
- Fix: → "Germany and Central Europe 05:00–14:00 CET".
- Scope: one page · Effort: S · Big change: no

## P2

### CPY-04 Ranges, units, inch sizes and hours written several ways
- Evidence: "Ø5 – 100 mm" (turned spec) / "5 – 100 mm" (capabilities) vs "Ø5–100 mm"; home "25 g–1.0 kg" vs "25 g – 1.0 kg" (6 pages); "PG 7 – PG 48" (hub table, PG chart, Resources) vs "PG 7–48"; Resources "M12 – M63 × 1.5" vs title "M12–M63×1.5"; BSP chart "G 1 1/4" vs selectors "G 1¼" (one dropdown mixes "G 3/8" with "G 1¼"); hub "3/8 – 1½"", datasheets "3/8–1½"", NPT page "3/8 to 1½ inch"; pressure screw "57.0 – 59.0 %" vs Grades "57.0–59.0"; pressure screw "M12–M80 metric" names no standard while PG names DIN 40430; Contact "Saturday – Thursday, 09:30–18:30 IST" vs footer "Sat–Thu 09:30–18:30 IST"; home Ranges strip separates figures from units ("Ø5–100" over "mm bar diameter"; "±0.05" over "diameter tolerance, mm"; shots/home-proof.png).
- Why it matters: number formatting is the first test of care on a precision-parts site.
- Fix: one rule in COPY-STYLE (unspaced en dash when unit appears once; spaced when both ends carry a unit/prefix; × unspaced; inch sizes "1 1/4" everywhere). Replacements: "Ø5 – 100 mm" → "Ø5–100 mm"; "5 – 100 mm" → "Ø5–100 mm"; "25 g–1.0 kg" → "25 g – 1.0 kg"; "PG 7 – PG 48" → "PG 7–48"; "M12 – M63 × 1.5" → "M12×1.5 – M63×1.5"; "G 1¼ / G 1½ / 1¼ NPT / 1½ NPT" → "G 1 1/4 / G 1 1/2 / 1 1/4 NPT / 1 1/2 NPT"; "BSP and NPT 3/8–1½"" → "BSP and NPT 3/8 to 1 1/2 inch"; "57.0 – 59.0 %" → "57.0–59.0 %"; "M12–M80 metric" → "M12–M80 (EN 60423)"; "Saturday – Thursday, 09:30–18:30 IST" → "Sat–Thu, 09:30–18:30 IST"; home strip "Ø5–100 / mm bar diameter" → "Ø5–100 mm / bar diameter", "±0.05 / diameter tolerance, mm" → "±0.05 mm / all processes" (§9).
- Scope: site-wide · Effort: S

### CPY-05 "adaptor" and "adapter" both used
- "adaptor" ×5 vs "adapter" on 20+ pages, URL /thread-adapters/, code AG-AD: /products/ alt "Drawing of a brass thread adaptor"; Fittings "Pipe fittings: adaptors, nipples…" and "Straight connectors, adaptors, nipples and hose barbs"; Industries "Fittings, adaptors and valve parts", "Connectors and adaptors for air and fluid lines". Hummel and Lapp use "adapter". Fix: all → "adapter(s)". Scope: 3 pages · S

### CPY-06 CW511L called "lead-free" on some pages, "low-lead" on others
- Lead-free: Capabilities "lead-free CW511L, CW724R and DZR CW602N on request"; Pressure screw "Lead-free grades (CW511L, CW724R) on request". Low-lead: Turned grades "Low-lead, DZR"; Grades "Low-lead DZR"; RFQ "Low-lead / lead-free · CW511L / CW724R". Grades table: CW511L Pb ≤ 0.2 % (low-lead).
- Fix: Capabilities → "Materials: CW614N and CW617N as standard; on request low-lead DZR CW511L, lead-free CW724R and DZR CW602N." Pressure screw → "Low-lead (CW511L) and lead-free (CW724R) grades on request." Scope: 2 pages · S

### CPY-07 "CNC turning centres" on Capabilities, "CNC lathes" elsewhere
- Capabilities "66 machines: 12 CNC turning centres…" + row "CNC turning centres"; elsewhere "CNC lathes". "Turning centre" implies driven tools; §12 "No live tooling"; same row says "cross-holes and flats in a second operation". Fix: → "12 CNC lathes", "CNC lathes". Scope: one page · S

### CPY-08 Pressure screw filed under "Gland accessories" on the hub
- Hub accessory grid has "Pressure screws & spares" tile under "Fitting, adapting, closing and earthing cable entries" (shots/glands-table-1440.png). §11 "pressure screw only (gland component) … Listed with the glands"; mega menu lists it under glands.
- Fix: remove tile; add row to the gland type table "Pressure screw | Gland component that compresses the seal, supplied on its own | PG 7–48 · M12–M80 | AG-PS"; replace "Pressure screws, the gland component that compresses the seal, have their own datasheet…" with "Spare dome cap nuts on request." Scope: one page · S

### CPY-09 Missing dimensions shown three ways; explanation reads like code
- Clamping-jaw/strain-relief metric tables: columns of "—"; pressure-screw metric table: one "Dimensions" column of "—"; stop plug, earth tag, conduit, lock nut: no dimension columns + "Dimensions with your quote." Gland note: "Dimensions for reference; the drawing supplied with your quote governs. — = dimensions with your quote · cable clamping ranges with your quote · finish suffix -N · -NI · -SN · -ZN · thread data: PG chart, metric chart."
- Fix: pressure-screw metric table gets the same AF/L/GL/D columns as its PG table; one note on every gland table: "Values are for reference; the dimensioned drawing sent with your quote governs. Sizes marked — and cable clamping ranges come with that drawing. Finish suffix: -N natural, -NI nickel, -SN tin, -ZN zinc. Thread data: PG chart, metric chart." Accessory tables: "Dimensions come with your quote, on a dimensioned drawing." Scope: 9 datasheets · S

### CPY-10 The two gland types are described in a way that doesn't help a buyer choose
- Hub: "Clamping jaws grip the cable (traction relief)" vs "Bending protection at the entry: strain and traction relief for flexible cables", under "Choose by how the cable must be held". "Traction relief" = Zugentlastung = strain relief, so both seem to promise the same.
- Fix: hub clamping-jaw → "Clamping jaws grip the cable centrally and hold it against pull-out"; hub strain-relief → "Holds the cable against pull-out and protects flexible cables from bending at the entry"; clamping-jaw lead → "A brass cable gland whose clamping jaws grip the cable centrally and hold it against pull-out."; strain-relief lead → "A brass cable gland for flexible cables: it holds the cable against pull-out and protects it from bending where it enters." Scope: 3 pages · S

### CPY-11 Shop-floor shorthand
- Home "CNC, automats, SPMs, drills, presses" → "CNC lathes, cam automats, special-purpose machines, drilling machines, presses"; About "incl. 21 SPMs built in-house" → "incl. 21 special-purpose machines built in-house"; Home "Ni · Sn · Zn / in our plant; Ag, Cr on request" → "Nickel · tin · zinc / in our plant; silver and chrome on request"; About "Plating / In-house" → "In our plant"; Quality "Patrol inspection" → "In-process inspection"; "ISO 2768-m unless drawn" (Turned, Capabilities) → "ISO 2768-m unless the drawing states otherwise". Scope: 4 pages · S

### CPY-12 RFQ form microcopy
- Every file row "0.0 MB · drawing no. and rev. from the file" → size only + hint above list "Add quantities per drawing. We take the drawing number and revision from the file."; sidebar "Formats: PDF, DWG, DXF, STEP, IGES" → "PDF, DWG, DXF, STEP, IGES; JPG or PNG photos of samples"; "Finish (drawings)" → "Finish for drawn parts"; "Catalogue items · 2 from your quote list" (typed codes) → "Catalogue items · 2"; "the RFQ reference from our reply" → "the reference shown after you send this form"; quick form "Full form: material, finish, volumes, several drawings" → "Full form: material, finish, part codes, quantities per drawing". Scope: 2 forms · S

### CPY-13 Names and labels for the same thing vary
- Stop plugs eyebrow "Gland accessories · AG-SP" → "… · AG-SP · AG-SH"; mega menu "Technical data" vs nav "Resources" vs H1 "Technical resources" → mega heading "Resources"; home eyebrow "Request for quote" → "Request a quote"; inserts related card "Special brass fasteners" → "Special fasteners"; /products/ "Not in the list?" vs mega "Not listed?" → "Not listed?". Scope: 5 pages · S

## P3 (post-launch list)
- Home repeats "since 1988 / Jamnagar" four times; drop the section eyebrow.
- "Made to your drawing or sample." repeats on 7 group pages.
- "Less material and fewer operations than bar" repeated on 4 pages.
- About H2 "How we work" → "Who we are"; Ketan card "Founded AirGrip in 1988." repeats the line above.
- Lock nuts "Other sizes and conversions on request" → "Other sizes on request".
- Earth tags lead and Process row both "Stamped from brass strip".
- Reducers: "without re-machining the enclosure" twice.
- 404 "This page isn't on the drawing" → "Page not found".
- Home "… plastic moulding · industries" dangling link → "… plastic moulding. All industries →".
- "near net shape" (Fittings) vs "near-net".
- Lock nut meta "natural or nickel, tin, zinc plated" → fixed finish wording.
- Clamping-jaw/strain-relief metas share a template and omit EPDM, IP54, sizes.
- Inserts meta is a keyword list; rewrite as a sentence.
- Products chip for Special fasteners "M · UNC/UNF" omits BA, BSW.
- Hub "lock nuts, stop plugs and adapters also come in BSP and NPT": reducers and enlargers do too.
- Gland spec label "Ingress" → "IP rating".
- Finish row reads as if silver/chrome are in-house; ask owner (follow-up 11/26); if outsourced, list under Quality "Outside processes".
- RoHS 6(c) renewal (EU) 2025/2364 expiring 30 June 2027 per secondary sources; verify on EUR-Lex; consider stating expiry.
- Metric chart lead "… and many turned parts": general turned parts default to coarse pitch; drop.
- Pressure screw "Options: Threads: PG or metric" redundant.
- Hero title block has 11 drawing fields that decorate rather than inform (visual call for the designer).
- Contact error "Please tick to agree" vs RFQ "Please tick to agree to the privacy terms"; use the longer form.

## Checked and fine
Tone vs competitors (Paloma, Vaishnavi, VAP, Rajhans, Geissel use slogans; Jakap closest; AirGrip hero beats all; no "world-class/solutions/seamless/family-run"). All facts vs §9–§13 and CLAIMS match (company, quality, machining, plating, glands, commercial, industries, contact, reply promise only on the four allowed pages). Old-site sourcing confirmed (drawing-or-sample, inserts Ø5–38 and types, terminals from M2, male bush unarmoured, packing list, design-for-cost). Charts spot-checked correct (PG, NPT all rows, several BSP, all nine grades). British spelling consistent; NDA wording consistent. Form messages specific; thank-you and buyer email match; cookie banner accurate.

## Coverage and limits
All 34 routes from dist HTML (title, meta, OG, alt, aria, header, menus, footer, banner, placeholders, options). Crops at 1440 of home, About, gland hub, pressure screw, RFQ, quote bar; 390 gland hub only. Form states in headless Chrome (RFQ empty submit, bad+good file, typed codes, NDA, full submit, thank-you; Contact empty submit; home quick form bad file; + Add and quote bar; cookie banner); all message strings in form components and PHP email read. Competitor homepages fetched (paloma, jakap, geissel, rajhans, vaishnavi, vijaya, JACOB) + Hummel HSK-M page; Lapp not fetched. Not checked: 390 rendering of every page, privacy as legal copy, PDFs (none), email in a real client, live old site (used exported markdown).

## Outside my scope
None at P1. Note for QA: a typed nonsense code ("AG-XX-FOO") is accepted silently as a catalogue line with finish N.
