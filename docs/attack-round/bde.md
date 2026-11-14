# BDE findings: German strategic purchaser / supplier-quality engineer (export)
(Saved by the coordinator from the reviewer's returned report; the reviewer could not write files.)

Summary: I would send an RFQ. The quote flow works end to end at 1440 and 390 px (PDF and STEP sent with quantities per file, ZIP rejected on its own row with the reason, "NDA first" sends no files). The site already states what an EU auditor asks for: EN 10204 3.1, CoC, 8D, NABL calibration, PPAP Level 3, heat traceability, not Ex/ATEX, RoHS 6(c) basis. What ranks AirGrip below alternatives is mostly owed facts. P1 0 · P2 4 · P3 12.

## P1
None in my scope.

## P2

### BDE-01 Compliance info is "on request" only, and the RoHS line omits the 30 June 2027 deadline; EU gland makers publish it
- Where: /exports/ "Compliance" row ("REACH statement on request"); /quality/ documents table ("REACH / SCIP statement · On request"); gland and accessory pages ("RoHS: Leaded brass is covered by Annex III exemption 6(c)"); /resources/ ("CoC · REACH Documents on request"). No conflict-minerals line anywhere; no Cr(VI) statement although zinc plating is offered on every gland page.
- Evidence: quotes above; shots/exports-1440.png (Compliance row).
- Why it matters: compliance won't release a new part without a REACH Art. 33 statement (lead > 0.1 % in CW614N), a RoHS statement, and a CMRT (tin plating makes tin a conflict mineral). RoHS exemption 6(c) expires 30 June 2027 (Directive (EU) 2025/2364, per TÜV Rheinland summary); a 2027 frame order needs that date and the lead-free route. "On request" for everything reads as inexperienced.
- Competitor: JACOB download centre https://www.jacob-gmbh.de/en/downloadcenter/reach (REACH statement PDF June 2026, SCIP listing; "contained in our products at more than 0.1 percent by mass" … "up to 4% is permitted in brass products … deadline until June 30, 2027"). Hummel dated 2026-03 declarations for RoHS, REACH, conflict minerals, drinking water, e.g. https://www.hummel.com/fileadmin/user_upload/hummel_com/HUMMEL-AG/Downloads/2026-03_Conflict-Minerals_EN.pdf. Paloma, Jakap, Geissel publish none (chance to beat Indian peers).
- Fix: (1) RoHS row on gland/accessory pages: "Leaded brass (CW614N, ≤ 3.5 % Pb) is covered by RoHS Annex III exemption 6(c), currently valid until 30 June 2027. Lead-free CW724R or low-lead CW511L on request." (2) REACH row: "Contains lead (CAS 7439-92-1, REACH candidate list) above 0.1 % w/w. REACH Article 33 statement on request." Make all gland pages match the pressure-screw page. (3) /exports/ Compliance row: list REACH, RoHS 6(c), conflict minerals, Cr(VI), each with status. (4) Ask the owner: will you sign REACH Art. 33 and RoHS statements as PDFs we can link? Can you complete a CMRT for tin plating? Is zinc passivation Cr(VI)-free (call sheet follow-up 10)?
- Scope: gland + 5 accessory pages, /exports/, /quality/ · Effort: S copy + owner documents · Big change: no

### BDE-02 "±0.05" precision headline and three hand instruments rank AirGrip below a named Jamnagar competitor
- Where: home proof band "Tolerance ±0.05 diameter tolerance, mm"; /products/brass-turned-components/ "±0.05 mm, run-out 0.05"; /capabilities/ range table; /quality/ instruments (thread gauges, plug and ring gauges, micrometers only).
- Why it matters: buyers pre-qualify on the capability line. A part with an H7 bore or h8 shaft (Ø10 h8 = 22 µm band) falls outside ±0.05 checked with micrometers; that drawing goes elsewhere. Doesn't stop ISO 2768-m RFQs; does stop parts with fits.
- Competitor: Paloma https://palomaturnedparts.com/infrastructure.php — "up to ±0.005 mm or ± 5microns and even less"; Jamnagar plant "Mitutoyo … Height Master, Roundness testing, Contour measurement & Surface roughness tester"; Bangalore "Carl Zeiss … CMM".
- Fix: ask the owner the tightest diameter tolerance routinely held on CNC (is ±0.05 standard or limit?) and which instruments they own (call sheet follow-up 6 / item 23). Option A (if true, recommended): "±0.05 mm standard · ±0.0x mm on CNC". Option B (if ±0.05 is the limit): keep it and add "Fits tighter than ±0.05 mm: send the drawing; the quote says whether we can hold them." Either way list every instrument owned on /quality/.
- Scope: home, turned components, capabilities, quality · Effort: S once answered · Big change: no

### BDE-03 No price basis for brass (metal clause, quote validity); JACOB publishes its surcharge method
- Where: /exports/ "Price per Incoterm, MOQ and lead time"; "Payment & currency: Agreed per order in the quote". No "surcharge", "LME", "metal price", "validity" on any page.
- Why it matters: brass ~60 % copper, price moves monthly. For annual frame orders (form asks qty per year) the buyer needs fixed vs indexed, validity, metal reference. German suppliers quote brass base price + Metallzuschlag (MS 58). Without a basis: risk premium or extra questions.
- Competitor: JACOB "Calculation table Metal Surcharge (MTZ)" https://www.jacob-gmbh.de/en/downloadcenter/translate-to-en-messingzuschlag-1
- Fix: ask the owner quote validity and how metal price changes are handled; then one "Price basis" row on /exports/ ("Quotes valid [N] days; annual orders tied to [reference]"). No figure until the owner gives it.
- Scope: /exports/ + one line on RFQ page · Effort: S · Big change: no

### BDE-04 The NDA path promises an "upload link" the owner never confirmed and nothing delivers
- Where: /rfq/ NDA note "we sign it and send an upload link"; /rfq/thank-you/ NDA row same sentence; buyer-copy email site/public/api/form.php line 207.
- Evidence: reproduced at 1440, nda=yes, no files, thank-you shows the sentence: bde/shots/rfq-thanks-1440-nda.png. docs/QUESTIONS-FOR-KETAN.md C14 lists "send our NDA, then an upload link once signed (current design)" as the old option; REQUIREMENTS §11/§12 record only "we sign the buyer's NDA". PHP has no upload endpoint; file.php only serves files already sent.
- Why it matters: German buyers nearly always require an NDA before drawings leave, so most German RFQs take this path; the first contact would break a written promise in the trust step.
- Competitor: n/a (no competitor has an NDA path; AirGrip's is better if true).
- Fix: ask the owner how drawings come in after the NDA. Until then, in all three places: "Send us your NDA (email it to sales@airgrip.in). We sign and return it, then you reply to that email with your drawings." Add an upload link only once the owner names a service.
- Scope: RFQ, thank-you, buyer-copy email · Effort: S · Big change: no

## P3 (post-launch list)
- P3-01 /exports/: label "Incoterms 2020"; ask owner about FCA and DAP (EXW impractical from India: seller clears export customs).
- P3-02 /exports/: indicative sea transit time to Europe (Mundra → Hamburg); ask owner.
- P3-03 /exports/: say whether quotes can be in EUR; ask owner.
- P3-04 RFQ quantity fields free text: "5.000" arrives as "5.000 / order"; strip separators or echo "= 5000 pcs".
- P3-05 RFQ upload rejects .zip; accept it or say so in the hint.
- P3-06 form.php filename cleaning without Unicode flag: "Gehäusestutzen" → "Geh_usestutzen".
- P3-07 /quality/: control plan issued at OP 10 but missing from "Documents you receive"; add "(ISIR / EMPB, VDA Vol. 2)" after "Initial sample inspection report".
- P3-08 /contact/: "Germany / EU … CET" → "Germany / Central Europe"; /exports/ "Mon–Thu mornings" understates overlap (08:00–14:00 CET).
- P3-09 Gland pages: "IP54" → "IP54 (EN 60529)".
- P3-10 /privacy-policy/ §4: drawings not passed to third parties without consent, deleted on request if no order follows (for legal review).
- P3-11 /capabilities/ packing: EU pallets need ISPM 15; ask owner.
- P3-12 REACH row on clamping-jaw and strain-relief pages doesn't name lead, unlike pressure screw (covered by BDE-01).

## Checked and fine
RFQ at 1440 and 390 (all fields reach the request incl. material, finish, tolerance, plating µm, dates, Incoterm, destination, notes, PPAP/REACH ticks, files; thank-you shows reference, copy-to, files; no console errors). NDA path (upload disabled, files held, part names sent; server drops files when NDA ticked). Time zones (IST/CET/CEST/GMT/BST, Friday closed). Standards names all correct (EN 10204 3.1, ISO 2768-m, EN 12164, DIN 40430 all ten rows, EN 60423, ISO 261, ISO 228-1, ISO 7-1, ASME B1.20.1, ASME B1.1, BS 57/84, NABL); PG→metric table and grade Cu/Pb limits correct. Honest scope statements (not IATF, not Ex/ATEX, approvals belong to finished product, no RoHS badge). Commercial basics consistent across pages. Units and dates consistent.

## Coverage and limits
Read extracted text of all 33 routes at 127.0.0.1:4173; viewed /rfq/ and /exports/ at 1440 plus own run screenshots in bde/shots/. Test script bde/rfqtest.mjs (headless Chrome, request captured by wrapping fetch). Code read: form.php, file.php, config.php, QuickQuote.tsx, ThanksDetails.tsx. Not tested: home quick quote send, contact form, real mail delivery, Safari. Competitors checked live: geissel.com, palomaturnedparts.com, jakap.com, rajhans.com, vaishnavi.us, vijayaautoproducts.com, JACOB download centre; Hummel PDFs via search only; Lapp not opened. RoHS 6(c) expiry from TÜV Rheinland summary, not the Official Journal. CW602N on EU drinking-water positive list (EU 2024/367) not verified.
Owed facts that most decide an EU buyer's ranking (prioritise Ketan's answers): ISO certificate; legal entity and form; QC person (audit contact is the Marketing Director); instruments; gland EN 62444 status, temperature range, clamping ranges; pieces per pack; M80 pitch; metric through-holes; Cr(VI)-free passivation; certificate of origin and HS codes.

## Outside my scope
None.
