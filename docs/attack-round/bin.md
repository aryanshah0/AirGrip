# BIN findings: Indian OEM purchase engineer
(Saved by the coordinator from the reviewer's returned report; the reviewer could not write files. Paths relative to attack/bin/.)

Summary: For an Indian buyer the site passes the 10-second test on home and every product page (what they make, main ranges, documents, how to get a price). Indian buying terms (GST invoice, MSME/Udyam, road delivery, payment in the quote, free samples, vendor-registration papers) are stated, which no named competitor does. All four journeys work end to end on the local mock, desktop and phone. Remaining friction: no one-tap call on phones, short forms without phone field and photo upload, gland pages silent on cable type, nothing to download for vendor registration. P1 0 · P2 4 · P3 10.

## P1
None in my scope.

## P2

### BIN-01 Calling takes 2–3 taps on a phone; no number in the header on laptops under 1360 px
- Where: site-wide header (Layout.tsx; tokens.css:141 hides .hdr__tel at ≤1360 px); /rfq/ aside; first visit at 390 px.
- Evidence: 390 px header has only "Quote" and "Menu"; number only in Menu → Call (2 taps) or footer (home-390-top.png, j4-menu-open-390.png). First visit from Google at 390 on /products/brass-turned-components/: cookie banner covers lower half and WhatsApp button is hidden while the banner is open (body.has-consent .wa {visibility:hidden}); tel links in viewport 0 (j4-first-visit-turned-390.png); 3 taps to call. 1280 px laptop: no phone in header (home-1280-top.png). /rfq/ hides WhatsApp (no-wa) and the aside lists email but no phone.
- Why it matters: Indian buyers who find a supplier on the phone call/WhatsApp first. Contact page does it well (j4-contact-390.png) but only once there.
- Competitor: jakap.com tap-to-call "+91 288 2730173" in phone header (comp/jakap-390.png); vaishnavi.us tel link in phone header (comp/vaishnavi-390.png).
- Fix: compact "Call" button (tel:, icon + "Call") in header ≤559 px between Quote and Menu; show .hdr__tel from 1100 px instead of 1360; add "Phone / WhatsApp +91 93166 15007 · WhatsApp" row to RFQ aside under Email; optional: keep WhatsApp visible while banner open.
- Scope: header (all pages) + /rfq/ · Effort: S · Big change: no

### BIN-02 Home quick quote and Contact form have no phone field; quick form refuses photos the full RFQ accepts
- Where: / quick form (desktop/tablet), /contact/ form vs /rfq/.
- Evidence: /rfq/ has optional "Phone / WhatsApp"; quick form (Name, Company, Work email, Country, Drawing, Qty) and Contact (Name, Company, Work email, Topic, Message) have none; sent Contact as an audit request (/contact/?topic=visit) with no way to leave a number. QuickQuote.tsx:16 allows only pdf,dwg,dxf,step,stp,igs,iges and accept hides JPG/PNG; full RFQ accepts .jpg,.png "photos of samples" (RfqForm.tsx:214). JPG on home form → "Not sent: .jpg files are not accepted".
- Why it matters: Indian purchase engineers expect a call-back on mobile and often send phone photos of drawings/samples; Shree Shah can't call back on audit/visit requests.
- Competitor: n/a (inconsistency between AirGrip's own forms).
- Fix: optional "Phone / WhatsApp" field (type=tel, autocomplete=tel) on quick form and Contact, in the payload (privacy policy already lists phone); use the shared DRAWING_TYPES list (add jpg, jpeg, png) and same accept string in the quick form.
- Scope: 2 components · Effort: S · Big change: no

### BIN-03 Gland pages never say which cable the glands are for (armoured or unarmoured)
- Where: /products/brass-cable-glands/, clamping-jaw, strain-relief (spec block, "Buying the standard range").
- Evidence: spec rows give thread, material, finish, EPDM, IP54, not Ex/ATEX, but no cable type. "Unarmoured" only on conduit parts (male bushes); "flexible cables" only on strain-relief. Indian buyers buy brass glands as single/double compression for armoured (SWA) cable (BW/CW/A2); Jamnagar IndiaMART listings use these terms (dir.indiamart.com/jamnagar/double-compression-cable-gland.html).
- Why it matters: a panel builder with armoured cable can't tell if these fit: sends an unfillable RFQ or leaves.
- Competitor: vaishnavi.us/cable-glands-and-accessories/ lists "A2, CW, BW" and "Indoor and outdoor application for armoured cable … Most suitable for SWA, plastic of rubber (Elastomer) sheathed cables."
- Fix: ask the owner: "Are the clamping-jaw and strain-relief glands for unarmoured (non-SWA) cable only? Do you make single- or double-compression glands for armoured cable: yes, no, or to order?" Then add a spec row on hub + both gland pages, e.g. "Cable: Unarmoured round cable (PVC, rubber, flexible); not for armoured (SWA) cable". If no armoured glands: hub line "Double-compression glands for armoured cable: not in our range."
- Scope: 3 pages (products.tsx) · Effort: S · Big change: no

### BIN-04 Nothing to download for vendor registration: no company profile, everything "on request"
- Where: /about/, /quality/ ("Certificate: Copy on request", "Request a document set"), /exports/ ("Vendor registration: GST, PAN, MSME certificate and bank details sent on request"), /resources/ ("Documents on request").
- Evidence: no PDF on the site (site/public has none). REQUIREMENTS §10 planned "Claude produces the company profile PDF … in v1 … after the site text is final"; never made.
- Why it matters: an Indian vendor-registration file starts with a company profile PDF forwarded to QA and management; the facts are confirmed.
- Competitor: rajhans.com company profile PDF ("Explore Now") and "Downloads" menu; vaishnavi.us links ISO 9001:2015 certificate and RoHS PDF from the header.
- Fix: make the planned 2-page company profile PDF from confirmed facts only (1988, address, processes, ranges, 66 machines by type, team, ISO 9001:2015, MSME/Udyam, document list, India and export terms, Shree Shah); link from About, Quality "Running a supplier approval?", Exports "Vendor registration". Add the ISO certificate PDF when it arrives (owed, not part of this finding).
- Scope: 3 pages + 1 file · Effort: M · Big change: no

## P3 (post-launch list)
- BIN-05 MSME/Udyam, GST invoice, vendor-registration facts only on /exports/; add "MSME (Udyam) registered" to About fact strip and footer next to ISO.
- BIN-06 Quality instruments list only thread gauges, plain gauges, micrometers, yet the page promises coating thickness per lot and a plating thickness report; ask owner (call sheet 23).
- BIN-07 Contact "Open in Google Maps" is an area search, not the plant pin; use the Business Profile link once collected; add airport/travel time (call sheet 21).
- BIN-08 WhatsApp link opens an empty chat; prefill "Enquiry from airgrip.co.in: ".
- BIN-09 RFQ "Incoterm" select uses export language; rename "Delivery terms", put "Delivered to my plant (India)" and "Ex-works Jamnagar" first.
- BIN-10 RFQ/thank-you say "price, MOQ and lead time"; add "price basis (GST, freight) and payment terms".
- BIN-11 Accept .xlsx/.csv BOM, or say "email your BOM to sales@airgrip.in".
- BIN-12 After a catalogue-only request, thank-you still talks about "the drawing" and offers "Send another drawing"; neutral wording.
- BIN-13 Monthly capacity not stated (jakap: "25 Million + Parts"); ask owner if "up to about 5 lakh pieces a month" may be published.
- BIN-14 Capabilities machine park "Presses 3 — —"; owed (call sheet follow-up 4/12).

## Checked and fine
Home 10-second test at 1440, 1280, 390. Journey 1: turned-components page; full RFQ at 390 with PDF, 20000/240000, phone, India → thank-you with RFQ-26-C4264K, email, file+quantities; quick form at 1440 with "2,40,000" accepted; PHP buyer copy matches thank-you promise. Journey 2: PG/Metric tabs at 390, no overflow, + Add correct codes, quote bar/count update; lock-nut Standard/EMC switch and tabs; RFQ thank-you listed AG-CJ-PG09-N and AG-LN-PG09-N lines. Journey 3: machine park 66, team, ISO, document table, NABL, 8D, outside lab, named contact, visit link preselects audit, India terms. Journey 4: Contact at 390 has Call and WhatsApp at top. Facts vs REQUIREMENTS §11–12 and CLAIMS: no wrong fact; "two working days" consistent. Benchmark: AirGrip alone has drawing-upload RFQ with NDA, part codes + size tables + quote list, per-batch document table, India terms, machine counts, named contact, visit offer. Paloma has no inquiry form; Vijaya shows no phone/address on home; Jakap no street address. No excess info.

## Coverage and limits
Visible text of all 34 routes at 1440 (text/*.txt); supplied screenshots + own at 390, 1280, 1440; four forms sent on the local mock; competitor home pages, Vaishnavi gland page, one web search. Not checked: real Android, autofill, real email delivery, thread-chart/grade accuracy, competitor sub-pages beyond those named. Note: palomaturnedparts.com is Bangalore, not Jamnagar.

## Outside my scope (P1)
- Contact form stays on screen, still filled, after "Message sent": .ct__r form { display: grid } (pages/css/Contact.css:17) overrides [hidden]; #cform hidden=true but display=grid. Buyer may send twice. Evidence j3-contact-sent-390.png.
