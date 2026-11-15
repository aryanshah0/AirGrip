# Attack round: what was fixed (2026-11-15)

User approval: "start fixing everything apart from the hostinger related work". Choices taken as recommended: photos =
Drawing | Photo switch in the hero frame (1A); Germany/EU page built now (2A). Commits ae2ee79 … 5b21212 on `main`.
Built site: http://127.0.0.1:4173 (preview) and https://127.0.0.1:8443 (Apache + PHP, real form sender).

## P1
| # | Finding | Fix | Where |
|---|---|---|---|
| 1 | Contact form stayed on screen after sending | `[hidden] { display: none !important }` site-wide (an author `display` rule overrode the browser's `[hidden]`); flow test checks the form is gone | tokens.css, flow-check |
| 2 | Home promised a price in two working days | H2 "Send a drawing. We reply within two working days." + lead "You get a price, MOQ and lead time, or our questions on the drawing." | Home |
| 3 | Unconfirmed specifics | Industries rows rewritten from confirmed facts; "seal inserts" removed (gland pages, hub); NDA wording "Send us your NDA by email … We sign and return it; then reply to that email with your drawings." on RFQ, thank-you page and buyer email | Industries, GlandPage, Glands, RfqForm, ThanksDetails, form.php |
| 4 | "Germany / EU … CET" | "Germany and Central Europe 05:00–14:00 CET"; hours "Sat–Thu, 09:30–18:30 IST" | Contact |
| 5 | Money-page titles/H1 | Titles with Manufacturer / Jamnagar / India for turned, glands, forged, fasteners, stamping; turned H1 "Brass turned components, made to drawing", lead starts "Precision CNC and cam-automat turned brass parts, made in Jamnagar, India" | routes.ts, TurnedComponents |
| 6 | No page for "brass electrical parts" | Terminals page: title "Brass Electrical Parts: Terminals, Neutral Links & Connectors", H1 "Brass electrical parts: terminals, neutral links & connectors", new "Other electrical parts we make" section; URL unchanged | routes.ts, products.tsx, GroupPage |
| 7 | Home vs About cannibalisation | Home "Brass Components Manufacturer in Jamnagar, India \| AirGrip"; About "About AirGrip: Founded 1988 in Jamnagar, Gujarat" (SEO's "Since 1988 at GIDC Dared" not used: the plant's address history isn't confirmed) | routes.ts |

## P2
- **A1** Gland pages: clamping-jaw, strain-relief and pressure screw now share one template (hero → sub-tabs → sizes →
  material & compliance → questions → used with + quote box). Gland FAQs only from confirmed facts (no glands to
  drawing, not Ex/ATEX, spare dome cap nuts; pressure screw ≠ dome cap nut). Pressure-screw metric table has the
  AF/L/GL/D columns. Accessory pages end with a quote box.
- **A2** Accessories: lock nuts moved onto the accessory template; size sections use the gland layout (drawing as key on
  the left, every thread system side by side, thread column left-aligned); no tabs on accessory pages.
- **A3** One plain table note on gland pages ("Values are for reference; the dimensioned drawing sent with your quote
  governs. Sizes marked — … come with that drawing. Finish suffix: -N natural, -NI nickel, -SN tin, -ZN zinc …").
- **A4** Heading scale: the CSS was already layout-based (full-width 44 px, side column 24 px); sibling pages now use
  the same layouts (all "Sizes and part codes" full width). Turned components keeps full-width sections as the main
  business page; Capabilities keeps its long-read 28 px level. Documented, not changed further.
- **A5** Gland hub: three cards (clamping-jaw, strain-relief, pressure screw) with their own drawings; pressure screw no
  longer filed under accessories.
- **A6** Quote form: catalogue-code field and quantity rows use the title-block underline style; Contact send button brass.
- **B1–B8** Copy: number/range rule (also added to COPY-STYLE.md); adapter everywhere; CW511L low-lead DZR / CW724R
  lead-free; CNC lathes; plain words (special-purpose machines, nickel · tin · zinc, in-process inspection, "unless
  the drawing states otherwise", "In our plant"); RFQ microcopy (file rows, formats incl. JPG/PNG, "Finish for drawn
  parts", reference wording, quick-form link); gland type one-liners; stop-plug eyebrow AG-SP · AG-SH; mega menu
  "Resources"; "Request a quote"; "Not listed?"; "Special fasteners".
- **C1** Phone header: "Call" button ≤ 559 px; number shown wherever it fits (hidden only 1101–1179 px); RFQ aside
  lists phone and WhatsApp.
- **C2** Phone / WhatsApp field on home quick quote and contact form (server accepts it); quick quote accepts JPG/PNG.
- **C3** Company profile PDF (2 pages, confirmed facts only) at /downloads/airgrip-company-profile.pdf, linked from
  About, Quality and Exports.
- **D1** RoHS/REACH wording unified on all gland pages and Exports (lead > 0.1 %, Article 33 statement on request,
  lead-free CW724R). Not added (need Ketan): RoHS 6(c) expiry date (not verified in the Official Journal), conflict
  minerals, Cr(VI)-free passivation, signed declarations (call sheet 34).
- **D2** "Fits tighter than ±0.05 mm: send the drawing; the quote says whether we can hold them." on turned components
  and Capabilities (interim until call sheet 33).
- **E1** 81 legacy URLs → 301 (114 redirects in total); `?p=` still 410.
- **E2** `text/javascript` compressed; first-visit cookie banner shown by a tiny inline script before the app loads.
- **E3** Metric-matched "Archivo Fallback" (Arial, size-adjust 98.7 %, ascent 89.2 %, descent 21.3 %).
- **E4** Google Business Profile tie-in: **not done**, needs the public profile link and exact NAP from Ketan (call
  sheet 36).
- **E5** /exports/germany-eu/ "Brass components for buyers in Germany and the EU", confirmed facts only, linked from
  Exports.
- **F1** Drawing | Photo switch in the hero frame on product-group, gland and accessory pages (replaces thumbnails and
  the odd-sized photo slots and the fasteners "Examples" gallery); turned components gets 02-Product-We-Manufactur.webp;
  conduit parts no longer shows the male-bush photo twice.
- **F2** Redrawn: fasteners (hex bolt, end view AF 13), forged (forged tee: hex body, three ports, draft, PL),
  fittings (elbow in section), stamping (stamped contact; no longer the earth tag). Related cards for Capabilities and
  the grades chart show a short fact instead of an unrelated part. Not done: re-centring drawings in their frames.
- **G1** Quote bar: `scroll-padding-bottom` so focus never sits under it; its button has the on-dark focus ring.
- **G2** "+ Add" name "Add X to quote" / "Added: X (press to remove from quote)"; axe also runs with a filled list.
- **G3** Server: non-ASCII email domains accepted (IDN → ASCII; non-ASCII local part accepted, not used as Reply-To).
  Client: specific messages for `email`, `too large`, `too many requests`; "try again" only for 5xx/network.
- **G4** 20 files / 100 MB per request checked in the form (refused on their own row); browser sends `file_count`;
  the server lists files PHP dropped under "Not received" (verified with 21 files on Apache + PHP).
- **G5** Tab from the open Products menu goes into its panel, Shift+Tab back, Tab past the end continues to the next
  header link; focus leaving closes it; Escape closes the phone menu (focus back to Menu); skip link.
- **G6** Storage blocked: notice in the quote bar; "Review & send" carries the codes (`/rfq/?codes=…`).

## Tests after the fixes
52 flows (new: contact form hidden, refusal message, 21st file, header keys, side-by-side sizes, Drawing | Photo),
axe 0 violations on 35 pages + filled quote list, 283 server checks on Apache + PHP (114 old URLs), real sender:
21 files and a non-ASCII address.
