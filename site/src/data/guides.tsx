// Buyer guides under /resources/guides/ (SEO plan §6, written 2026-11-22). Page layout: src/templates/GuidePage.tsx.
// Rules as for every page: AirGrip facts only from docs/CLAIMS.md; general engineering data from the standards named
// in each guide and from mill datasheets; where sources disagree, no exact figure is given.
import type { ReactNode } from "react";
import { M, type Card, type FaqItem } from "../components/blocks";
import { P } from "../site";

export interface GuideSection { id: string; h2: string; sub?: string; body: ReactNode }
export interface Guide {
  crumb: string; eyebrow: string; h1: string; lead: string; updated: string;
  short: ReactNode[]; sections: GuideSection[]; faq: FaqItem[]; related: Card[];
  cta: [h2: string, p: string, href: string, label: string];
}

const L = ({ href, children }: { href: string; children: ReactNode }) => <a className="link" href={href}>{children}</a>;
/** Table; wide ones turn into cards on phones (stack-m), compact ones (flat) stay a table. */
const T = ({ head, rows, kinds = "", flat = false }: { head: string[]; rows: ReactNode[][]; kinds?: string; flat?: boolean }) => (
  <div className="tbl"><table className={flat ? "spec" : "spec stack-m"}>
    <thead><tr>{head.map((h, i) => <th key={h} className={i === 0 ? "stick" : kinds[i] === "n" ? "n" : undefined}>{h}</th>)}</tr></thead>
    <tbody>{rows.map((r, j) => <tr key={j}>{r.map((v, i) => <td key={i} className={i === 0 ? "stick" : kinds[i] === "n" ? "n" : undefined} data-l={head[i]}>{v}</td>)}</tr>)}</tbody>
  </table></div>
);
const card = (href: string, txt: string, name: string, sub: string): Card => ({ href, img: "", txt, name, sub });

export const G = {
  grades: "/resources/guides/cw614n-vs-cw617n/",
  leadFree: "/resources/guides/lead-free-dzr-brass/",
  bspNpt: "/resources/guides/bsp-vs-npt/",
  glands: "/resources/guides/cable-gland-selection/",
};

export const GUIDES = {
  grades: {
    crumb: "CW614N vs CW617N", eyebrow: "Guide · EN 12164 · EN 12165", h1: "CW614N vs CW617N brass", updated: "2026-11-22",
    lead: "Both are leaded two-phase brasses with 57–59 % copper. What separates them is lead: CW614N carries more, for free cutting; CW617N carries less, for hot forging. This is how to choose the one for your drawing.",
    short: [
      <><b>CW614N</b> (CuZn39Pb3), <M>2.5–3.5 %</M> lead: the free-cutting reference grade. Short, broken chips and fast cycles. The usual choice for parts turned from bar.</>,
      <><b>CW617N</b> (CuZn40Pb2), <M>1.6–2.5 %</M> lead: the usual forging grade. Hot-forges well and still machines well. For forged bodies, fittings and valve parts.</>,
      <>Same copper range, <M>57.0–59.0 %</M>. Neither is a drinking-water grade on its own: see <L href={G.leadFree}>lead-free and DZR brass</L>.</>,
    ],
    sections: [
      { id: "composition", h2: "Composition side by side", sub: "Limits in % by weight. Zinc is the remainder.", body: <>
        <T flat head={["Element", "CW614N", "CW617N"]} kinds="snn" rows={[
          ["Copper (Cu)", <M>57.0–59.0</M>, <M>57.0–59.0</M>], ["Lead (Pb)", <M>2.5–3.5</M>, <M>1.6–2.5</M>],
          ["Aluminium (Al)", <M>≤ 0.05</M>, <M>≤ 0.05</M>], ["Iron (Fe)", <M>≤ 0.3</M>, <M>≤ 0.3</M>],
          ["Nickel (Ni)", <M>≤ 0.3</M>, <M>≤ 0.3</M>], ["Tin (Sn)", <M>≤ 0.3</M>, <M>≤ 0.3</M>],
          ["Zinc (Zn)", "Remainder", "Remainder"],
        ]} />
        <p className="tbl-note">Rod to EN 12164, forging stock to EN 12165. Check the edition your drawing calls up; the 3.1 certificate shows the actual heat analysis.</p>
      </> },
      { id: "machining", h2: "Machining", body: <>
        <p>Lead does not dissolve in brass. It sits as fine particles that break the chip as it forms, so the chip comes off short. That is why <M>CW614N</M>, with the most lead, is the reference against which mills rate the machinability of other copper alloys.</p>
        <p><M>CW617N</M> machines well too, but with less lead the chips are a little longer. For high-volume parts turned complete from bar on cam automats or CNC lathes (pins, bushes, terminals, inserts, gland bodies) <M>CW614N</M> usually gives the shortest cycle and the best finish.</p>
      </> },
      { id: "forging", h2: "Forging", body: <>
        <p>Both grades contain the β phase that makes brass easy to hot-work, and both can be hot-forged. <M>CW617N</M> is the grade most often used for hot forging and is supplied as forging stock to EN 12165. Mill datasheets give hot-working ranges of roughly <M>650–750 °C</M>; follow the supplier's figure for the bar you buy.</p>
        <p>Neither grade is meant for cold forming. Parts that are crimped, bent, cold-headed or deep-drawn need a lead-free α brass such as <M>CW508L</M> (CuZn37).</p>
      </> },
      { id: "choose", h2: "Which grade for which part", body: <>
        <T head={["Part", "Usual grade", "Why"]} rows={[
          ["Turned from bar: pins, bushes, spacers, terminals, inserts, gland bodies", <M>CW614N</M>, "Shortest chips, fastest cycle"],
          ["Hot-forged: fitting and valve bodies, tees, manifolds", <M>CW617N</M>, "Forging stock grade; machined after forging"],
          ["Crimped, bent or cold-headed", <M>CW508L</M>, "Ductile α brass for cold forming"],
          ["In contact with drinking water", "DZR or lead-free grade", <L href={G.leadFree}>Lead-free and DZR brass</L>],
        ]} />
        <p>Strength depends on the material condition as well as on the grade. Rod conditions are written as <M>R360</M>, <M>R430</M> and so on, where the number is the minimum tensile strength in MPa (EN 1173). If strength matters, put the condition on the drawing next to the grade.</p>
      </> },
      { id: "equivalents", h2: "Equivalents", sub: "Nearest equivalents, not exact matches.", body: <>
        <T head={["EN number", "EN designation", "BS", "UNS", "IS", "JIS"]} rows={[
          [<M>CW614N</M>, <M>CuZn39Pb3</M>, <M>CZ121Pb3</M>, <M>C38500</M>, <M>IS 319 Type I</M>, <M>C3604</M>],
          [<M>CW617N</M>, <M>CuZn40Pb2</M>, <M>CZ122</M>, <M>C37700</M>, "—", <M>C3771</M>],
        ]} />
        <p className="tbl-note">Compositions overlap but are not identical; always check the specification your drawing calls up. More grades: <L href={P.grades}>brass grade equivalents</L>.</p>
      </> },
      { id: "compliance", h2: "Lead, RoHS and REACH", body: <>
        <p><b>RoHS.</b> Both grades exceed the 0.1 % lead limit and rely on exemption 6(c), which allows up to 4 % lead in copper alloys. The exemption is currently valid until 30 June 2027 (Delegated Directive (EU) 2025/2364). If your product must not depend on it, use a lead-free grade such as <M>CW724R</M>.</p>
        <p><b>REACH.</b> Lead is a substance of very high concern. Above 0.1 % by weight in an article, the supplier must pass on Article 33 information. We provide that statement on request.</p>
      </> },
      { id: "drawing", h2: "Writing it on the drawing", body: <>
        <p>A clear material callout saves a round of questions at quotation:</p>
        <p className="mono">Material: CW614N (CuZn39Pb3) to EN 12164, R430<br />Certificate: EN 10204 3.1</p>
        <p>We run <M>CW614N</M> and <M>CW617N</M> as standard, and low-lead DZR <M>CW511L</M>, lead-free <M>CW724R</M> and DZR <M>CW602N</M> on request. An EN 10204 3.1 certificate comes with every batch.</p>
      </> },
    ],
    faq: [
      ["Is CW614N the same as CZ121?", <>Nearly. <M>CZ121Pb3</M> is the old British designation closest to <M>CW614N</M> (CuZn39Pb3); the EN number replaced it. Check the composition limits if your drawing calls up the old standard.</>],
      ["Can CW614N be forged?", <>Yes. It hot-works well and is forged for some parts, but most forgers use <M>CW617N</M>, the usual forging-stock grade.</>],
      ["Which is stronger, CW614N or CW617N?", <>The material condition matters more than the grade. Specify a condition such as <M>R430</M> (at least 430 MPa tensile strength) and check that EN 12164 lists it for the grade and bar diameter you need.</>],
      ["Is CW617N suitable for drinking water?", <>Not by default. It contains up to 2.5 % lead and is not dezincification-resistant. Parts for drinking water need a grade accepted for that use: see <L href={G.leadFree}>lead-free and DZR brass</L>.</>],
      ["What is the JIS equivalent of CW614N?", <>The nearest is <M>C3604</M>, free-cutting brass to JIS H 3250. The copper and lead ranges overlap but are not identical.</>],
    ],
    related: [
      card(P.grades, "EN · BS · UNS · IS", "Brass grade equivalents", "CW614N · CW617N · DZR"),
      card(G.leadFree, "CW511L · CW724R", "Lead-free and DZR brass", "Guide"),
      card(P.category, "CW614N", "Brass turned components", "Ø5–100 mm, ±0.05 mm"),
      card(P.forged, "CW617N", "Forged brass components", "25 g – 1.0 kg"),
    ],
    cta: ["Have a drawing?", "Send it with the grade you need; we confirm the grade and certificate with the quote.", P.rfq, "Request a quote"],
  },

  leadFree: {
    crumb: "Lead-free and DZR brass", eyebrow: "Guide · CW511L · CW724R · CW602N", h1: "Lead-free and DZR brass", updated: "2026-11-22",
    lead: "Standard free-cutting brass contains up to 3.5 % lead, and in some waters it loses zinc. Two families of grades deal with this: dezincification-resistant (DZR) brass, and low-lead or lead-free brass. Some grades are both.",
    short: [
      <><b>DZR</b> means the brass resists dezincification, the leaching of zinc that leaves fittings porous. It says nothing about lead.</>,
      <><b>CW602N</b> (CuZn36Pb2As): DZR, still leaded and free-cutting. <b>CW511L</b> (CuZn38As): DZR and low-lead, <M>≤ 0.2 %</M> Pb.</>,
      <><b>CW724R</b> (CuZn21Si3P): lead-free silicon brass, <M>≤ 0.10 %</M> Pb, high strength, more copper and so more costly.</>,
      <>Choose by the rules of the market and the medium first, then by machining cost.</>,
    ],
    sections: [
      { id: "dezincification", h2: "What dezincification is", body: <>
        <p>In some waters, zinc is drawn out of the brass and leaves a porous, weak copper layer behind. Fittings start to weep, threads lose strength, and white deposits appear on the outside. The zinc-rich β phase is attacked first, so ordinary two-phase free-cutting brass such as <M>CW614N</M> is the most exposed.</p>
        <p>DZR grades combine a higher copper content with a small arsenic addition (<M>0.02–0.15 %</M>) and are often heat-treated after forging so that the structure resists the attack. Resistance is shown with the accelerated test in <M>ISO 6509-1</M>, which measures the depth of dezincification; the acceptance depth comes from the product standard or your specification.</p>
      </> },
      { id: "grades", h2: "The grades", sub: "Limits in % by weight. Zinc is the remainder.", body: <>
        <T head={["Grade", "Designation", "Cu", "Pb", "Other", "DZR", "Low-lead"]} rows={[
          [<M>CW602N</M>, <M>CuZn36Pb2As</M>, <M>61.0–63.0</M>, <M>1.7–2.8</M>, <>As <M>0.02–0.15</M></>, "Yes", "No"],
          [<M>CW511L</M>, <M>CuZn38As</M>, <M>61.5–63.5</M>, <M>≤ 0.2</M>, <>As <M>0.02–0.15</M></>, "Yes", "Yes"],
          [<M>CW724R</M>, <M>CuZn21Si3P</M>, <M>75.0–77.0</M>, <M>≤ 0.10</M>, <>Si <M>2.7–3.5</M>, P <M>0.02–0.10</M></>, "Depends on condition", "Yes"],
          [<M>CW614N</M>, <M>CuZn39Pb3</M>, <M>57.0–59.0</M>, <M>2.5–3.5</M>, "—", "No", "No"],
        ]} />
        <p className="tbl-note"><M>CW614N</M> for comparison. For <M>CW724R</M>, mills state dezincification resistance for defined conditions (some forging stock needs heat treatment after forging); call up the DZR test if you need it. Nearest equivalents: <L href={P.grades}>brass grade equivalents</L>.</p>
      </> },
      { id: "rules", h2: "The rules behind them", body: <>
        <p><b>Drinking water, EU.</b> Materials in contact with drinking water fall under Directive (EU) 2020/2184. Its European positive list of metallic compositions (Implementing Decision (EU) 2024/367) applies from 31 December 2026. National schemes, such as the common composition list of the 4MS countries, have been the reference until then. Ask your certification body which compositions it accepts for your product type.</p>
        <p><b>Drinking water, USA.</b> Since 2014 the Safe Drinking Water Act allows a weighted average of at most 0.25 % lead on wetted surfaces of pipes, fittings and fixtures. Products are usually certified to NSF/ANSI 372.</p>
        <p><b>Electrical and electronic equipment, EU.</b> RoHS limits lead to 0.1 % by weight unless an exemption applies. Leaded brass uses exemption 6(c) (up to 4 % lead in copper alloys), currently valid until 30 June 2027. <M>CW724R</M>, with at most 0.10 % lead, meets the limit without it. <M>CW511L</M> allows up to 0.2 %, so check the heat analysis on the 3.1 certificate if you rely on it for RoHS.</p>
      </> },
      { id: "machining", h2: "Machining and cost", body: <>
        <p>Without lead to break the chip, lead-free and low-lead grades form longer chips. They machine on the same cam automats and CNC lathes, with chip-breaking tool geometry, adjusted speeds and usually longer cycle times than <M>CW614N</M>. <M>CW724R</M> is also stronger, which is useful for thin walls but harder on tools.</p>
        <p>Metal cost follows copper content: <M>CW724R</M> has about 76 % copper against 58 % in <M>CW614N</M>. Expect a higher piece price for lead-free parts, mostly from material and cycle time.</p>
      </> },
      { id: "choose", h2: "Which grade for which use", body: <>
        <T head={["Use", "Grades to consider"]} rows={[
          ["Drinking-water fittings, Europe", <>A composition accepted for your product type; confirm with your certification body before ordering</>],
          ["Drinking-water fittings, USA", <>Lead-free to the 0.25 % weighted-average rule, e.g. <M>CW724R</M> (nearest UNS <M>C69300</M>)</>],
          ["Water that attacks brass (soft, high-chloride), heating and marine", <>DZR: <M>CW602N</M> or <M>CW511L</M></>],
          ["Electrical parts that must not rely on RoHS 6(c)", <><M>CW724R</M></>],
          ["Everything else", <><M>CW614N</M> or <M>CW617N</M>: see <L href={G.grades}>CW614N vs CW617N</L></>],
        ]} />
        <p>We run low-lead DZR <M>CW511L</M>, lead-free <M>CW724R</M> and DZR <M>CW602N</M> on request. Put the grade and standard on your drawing; the EN 10204 3.1 certificate that comes with every batch shows the heat analysis.</p>
      </> },
    ],
    faq: [
      ["Is DZR brass lead-free?", <>Not necessarily. <M>CW602N</M> is DZR but contains <M>1.7–2.8 %</M> lead. DZR is about corrosion; lead-free is about lead content. <M>CW511L</M> is both DZR and low-lead.</>],
      ["What is CW511L?", <>CuZn38As: a brass with <M>61.5–63.5 %</M> copper, an arsenic addition for dezincification resistance and at most <M>0.2 %</M> lead. Used for drinking-water fittings and parts for lead-restricted markets.</>],
      ["Is CW724R the same as C69300?", <>They are the nearest equivalents: both are silicon brasses with about 75 % copper and very low lead. Check the limits of the specification your drawing calls up.</>],
      ["Can lead-free brass be machined on normal machines?", <>Yes, on the same automats and CNC lathes, with chip-breaking tools and adjusted speeds. Cycle times are usually longer than with <M>CW614N</M>.</>],
      ["Which test shows that brass is DZR?", <>The accelerated dezincification test in <M>ISO 6509-1</M>. It measures the depth of attack; the acceptable depth is set by the product standard or by your specification.</>],
    ],
    related: [
      card(G.grades, "CW614N · CW617N", "CW614N vs CW617N", "Guide"),
      card(P.grades, "EN · BS · UNS · IS", "Brass grade equivalents", "Composition and use"),
      card(P.fittings, "BSP · NPT", "Brass fittings", "Forged or turned, to drawing"),
      card(P.category, "Ø5–100 mm", "Brass turned components", "Any grade on request"),
    ],
    cta: ["Need a lead-free or DZR part?", "Send the drawing with the grade and the standard; we confirm material and certificate with the quote.", P.rfq, "Request a quote"],
  },

  bspNpt: {
    crumb: "BSP vs NPT threads", eyebrow: "Guide · ISO 228-1 · ISO 7-1 · ASME B1.20.1", h1: "BSP vs NPT threads", updated: "2026-11-22",
    lead: "Both are inch-sized pipe threads with nearly the same outside diameters, which is why they get mixed up. They differ in flank angle, in pitch for most sizes and in how they seal, so a BSP part and an NPT part should not be joined directly.",
    short: [
      <><b>BSP</b>: <M>55°</M> Whitworth form, rounded crests and roots. Parallel (G, ISO 228-1) or taper (R, Rc, Rp, ISO 7-1).</>,
      <><b>NPT</b>: <M>60°</M> form, flat crests and roots, always tapered <M>1:16</M> (ASME B1.20.1). Seals on the thread with sealant.</>,
      <>Threads per inch match only at <M>1/2</M> and <M>3/4</M> inch (<M>14</M> TPI). Even there the angles differ and the joint leaks.</>,
      <>To connect the two, use an adapter or change one part.</>,
    ],
    sections: [
      { id: "profiles", h2: "The two profiles", body: <>
        <div className="gpair">
          <figure><div className="frame"><img src="/img/la/prof-bsp.svg" alt="BSP thread profile: 55 degree flank angle, rounded crests and roots" style={{ width: "100%", height: "auto" }} /></div><figcaption>BSP · <M>55°</M>, rounded</figcaption></figure>
          <figure><div className="frame"><img src="/img/la/prof-npt.svg" alt="NPT thread profile: 60 degree flank angle, flat crests and roots, 1:16 taper" style={{ width: "100%", height: "auto" }} /></div><figcaption>NPT · <M>60°</M>, flat, taper <M>1:16</M></figcaption></figure>
        </div>
        <T head={["", "BSP", "NPT"]} rows={[
          ["Flank angle", <M>55°</M>, <M>60°</M>],
          ["Crests and roots", "Rounded", "Flat"],
          ["Standards", <>ISO 228-1 (G, parallel) · ISO 7-1 (R, Rc, Rp)</>, "ASME B1.20.1"],
          ["Taper", <>G parallel; R and Rc taper <M>1:16</M></>, <>Always <M>1:16</M> on diameter</>],
          ["Where it seals", "G: on a washer, O-ring or face. R: on the thread, with sealant", "On the thread, with sealant or tape"],
          ["Written as", <M>G 1/2 · R 1/2 · Rc 1/2 · Rp 1/2</M>, <M>1/2-14 NPT</M>],
          ["Mainly used in", "Europe, UK, India, Asia, Australia", "USA and Canada"],
        ]} />
      </> },
      { id: "by-size", h2: "Size by size", sub: "Threads per inch and outside diameters in mm.", body: <>
        <T head={["Size", "BSP TPI", "NPT TPI", "BSP major Ø", "NPT pipe OD", "Same pitch?"]} kinds="snnnnt" rows={[
          ["1/8", "28", "27", "9.728", "10.29", "No"], ["1/4", "19", "18", "13.157", "13.72", "No"], ["3/8", "19", "18", "16.662", "17.14", "No"],
          ["1/2", "14", "14", "20.955", "21.34", "Yes, angle differs"], ["3/4", "14", "14", "26.441", "26.67", "Yes, angle differs"],
          ["1", "11", "11.5", "33.249", "33.40", "No"], ["1 1/4", "11", "11.5", "41.910", "42.16", "No"],
          ["1 1/2", "11", "11.5", "47.803", "48.26", "No"], ["2", "11", "11.5", "59.614", "60.32", "No"],
        ]} />
        <p className="tbl-note">BSP major Ø to ISO 228-1; NPT pipe OD to ASME B1.20.1 (converted from inch). Full data: <L href={P.bsp}>BSP thread chart</L> · <L href={P.npt}>NPT thread chart</L>.</p>
      </> },
      { id: "mixing", h2: "Why they don't mix", body: <>
        <ol>
          <li><b>Different pitch</b> in most sizes: the threads drift out of step after one or two turns and bind or cross-thread.</li>
          <li><b>Different angle</b> at <M>1/2</M> and <M>3/4</M> inch: the parts screw together, but the <M>55°</M> and <M>60°</M> flanks touch only along a line and leave a spiral gap. Sealant may hold for a while; the joint is not reliable under pressure.</li>
          <li><b>Parallel against taper</b>: a tapered male in a parallel G female seals, if at all, on the first threads only. BSP sealing joints pair R (taper male) with Rc or Rp.</li>
        </ol>
      </> },
      { id: "identify", h2: "How to tell which one you have", body: <>
        <ol>
          <li><b>Count the threads per inch</b> with a thread gauge. Try a <M>55°</M> Whitworth gauge and a <M>60°</M> gauge: the one that sits without light showing gives the angle.</li>
          <li><b>Measure the outside diameter</b> of a male thread with calipers and compare it with the table above.</li>
          <li><b>Check for taper</b>: measure the diameter at the first and the fourth full thread. If it grows, the thread is tapered (NPT, or BSP R).</li>
          <li><b>Look at the seat</b>: a flat face or a groove for a washer or O-ring suggests BSP parallel (G).</li>
        </ol>
      </> },
      { id: "joining", h2: "Connecting BSP and NPT", body: <>
        <p>Use an adapter with the right thread at each end, or make one of the parts in the other thread. For cable entries we make lock nuts, stop plugs and reducers in BSP and NPT, <M>3/8</M> to <M>1 1/2</M> inch, and thread adapters from NPT to metric. Brass fittings are made to your drawing in BSP or NPT.</p>
      </> },
    ],
    faq: [
      ["Will a 1/2 inch BSP thread fit a 1/2 inch NPT thread?", <>It will usually screw in, because both have <M>14</M> threads per inch, but it will not seal reliably: the flank angles are <M>55°</M> and <M>60°</M>, which leaves a spiral leak path.</>],
      ["What do G, R, Rc and Rp mean?", <><M>G</M>: BSP parallel thread that does not seal on the thread (ISO 228-1). <M>R</M>: BSP taper male. <M>Rc</M>: BSP taper female. <M>Rp</M>: BSP parallel female made to pair with an R male (ISO 7-1).</>],
      ["Is BSPT the same as NPT?", <>No. Both taper at <M>1:16</M>, but BSPT has a <M>55°</M> rounded profile and NPT a <M>60°</M> flat one, and the pitch differs in most sizes.</>],
      ["Do NPT threads need sealant?", <>Yes. Standard NPT seals with thread sealant or PTFE tape. NPTF (dryseal, ASME B1.20.3) is made to seal metal to metal without it.</>],
      ["What is the thread angle of BSP?", <><M>55°</M>, the Whitworth form, with rounded crests and roots.</>],
    ],
    related: [
      card(P.bsp, "ISO 228-1", "BSP thread chart", "G 1/8 – G 5"),
      card(P.npt, "ASME B1.20.1", "NPT thread chart", "1/8 – 2 inch"),
      card(P.fittings, "BSP · NPT", "Brass fittings", "Forged or turned, to drawing"),
      card(P.adapters, "NPT → M", "Reducers and adapters", "For cable entries"),
    ],
    cta: ["Need BSP or NPT parts?", "Fittings to drawing and gland accessories in BSP and NPT. Send a drawing or part codes.", P.rfq, "Request a quote"],
  },

  glands: {
    crumb: "Cable gland selection", eyebrow: "Guide · EN 60423 · DIN 40430 · IEC 60529", h1: "How to select a cable gland", updated: "2026-11-22",
    lead: "A cable gland has to fit three things: the entry in the enclosure, the outside diameter of the cable and the conditions where it is installed. Work through them in that order and the size and type follow.",
    short: [
      <><b>Thread</b>: match the enclosure. Metric <M>M×1.5</M> on new equipment, PG on older equipment, NPT in North America.</>,
      <><b>Hole</b>: for a clearance hole, take the size from the table (<M>M20</M> → <M>20.5 mm</M>).</>,
      <><b>Cable</b>: measure the outside diameter of the sheath. It must fall inside the gland's clamping range, ideally not at either end.</>,
      <><b>Sealing</b>: choose the IP code the location needs (IEC 60529). <b>Hazardous areas</b> need certified Ex glands.</>,
    ],
    sections: [
      { id: "thread", h2: "1. The entry thread", body: <>
        <T head={["System", "Standard", "Pitch", "Where you find it"]} rows={[
          ["Metric", "EN 60423", <M>1.5 mm</M>, "New enclosures and machines, Europe and most export equipment"],
          ["PG", "DIN 40430", <M>1.270–1.588 mm</M>, "Older German and European equipment, replacement parts"],
          ["NPT", "ASME B1.20.1", <>taper <M>1:16</M></>, "Equipment for the USA and Canada"],
        ]} />
        <p>PG and metric are not interchangeable even where the diameters are close: <M>PG 13.5</M> is <M>20.4 mm</M> across with an <M>80°</M> thread, <M>M20×1.5</M> is <M>20.0 mm</M> with a <M>60°</M> thread. The usual metric replacement for each PG size is on the <L href={`${P.pg}#pg-to-metric`}>PG thread chart</L>.</p>
      </> },
      { id: "hole", h2: "2. The hole", sub: "Clearance holes for glands held with a lock nut.", body: <>
        <div className="gpair gpair--keep">
          <T flat head={["Metric", "Hole Ø"]} kinds="sn" rows={[["M12×1.5", "12.5"], ["M16×1.5", "16.5"], ["M20×1.5", "20.5"], ["M25×1.5", "25.5"], ["M32×1.5", "32.5"], ["M40×1.5", "40.5"], ["M50×1.5", "50.5"], ["M63×1.5", "63.5"]]} />
          <T flat head={["PG", "Hole Ø"]} kinds="sn" rows={[["PG 7", "12.7"], ["PG 9", "15.4"], ["PG 11", "18.8"], ["PG 13.5", "20.7"], ["PG 16", "22.8"], ["PG 21", "28.6"], ["PG 29", "37.4"], ["PG 36", "47.5"], ["PG 42", "54.5"], ["PG 48", "59.8"]]} />
        </div>
        <p className="tbl-note">Metric holes as tabulated in EN 50262 (tolerance +0.2 / −0.4 mm); PG holes from the <L href={P.pg}>PG thread chart</L>. Values in mm. Check the gland maker's installation data for the final size.</p>
        <p>In a clearance hole the gland is held by a <L href={P.lockNuts}>lock nut</L> on the inside. In a wall thick enough to tap, the thread is cut into the wall instead (tap drill for metric: <M>d − 1.5</M>, see the <L href={P.metric}>metric thread chart</L>) and no lock nut is needed. Either way, the entry thread must be long enough for the wall plus the lock nut.</p>
      </> },
      { id: "cable", h2: "3. The cable", body: <>
        <p>Gland size follows the <b>outside diameter of the cable sheath</b>, not the conductor cross-section: two <M>4 mm²</M> cables from different makers can differ by several millimetres. Measure the sheath with calipers at two or three points and in two directions, because cables are rarely perfectly round.</p>
        <p>Pick the gland whose clamping range covers that diameter with some margin at both ends. A cable at the very bottom of the range may not seal or hold; one at the top makes assembly hard and can damage the sheath.</p>
        <p>Armoured cable needs a gland that terminates the armour; that is a different gland type. For flexible cable that moves near the entry, a <L href={P.strainRelief}>strain-relief gland</L> protects it from bending at the gland. A <L href={P.clampingJaw}>clamping-jaw gland</L> grips the cable centrally and holds it against pull-out. Send us the cable's outside diameter with your enquiry and we propose the size.</p>
      </> },
      { id: "ip", h2: "4. The IP rating", sub: "IEC 60529: first digit solids, second digit water.", body: <>
        <T flat head={["Code", "Dust", "Water"]} rows={[
          [<M>IP54</M>, "Dust-protected", "Splashing water from any direction"],
          [<M>IP65</M>, "Dust-tight", "Water jets"],
          [<M>IP66</M>, "Dust-tight", "Powerful water jets"],
          [<M>IP67</M>, "Dust-tight", "Temporary immersion (up to 1 m, 30 minutes)"],
          [<M>IP68</M>, "Dust-tight", "Continuous immersion, under conditions stated by the maker"],
        ]} />
        <p>The rating applies to the assembled joint: gland, seal, cable within the clamping range, and the seal between gland and enclosure. Our brass glands have an EPDM seal and are rated <M>IP54</M>. Where a location needs <M>IP66</M> or <M>IP68</M>, specify a gland tested to that code.</p>
      </> },
      { id: "material", h2: "5. Material and approvals", body: <>
        <p><b>Brass</b> is strong, machines to accurate threads and conducts, so the gland can be bonded to earth with an <L href={P.earthTags}>earth tag</L>. It is used natural, or nickel-plated for a harder-wearing, corrosion-resistant surface. <b>Plastic</b> glands are lighter and cheaper for light-duty uses; <b>stainless steel</b> is chosen for food, chemical and marine environments.</p>
        <p><b>Hazardous areas</b> (Ex, ATEX, IECEx) need glands certified for the zone and protection type. Our glands are not certified for hazardous areas.</p>
        <p><b>Lead.</b> Our glands are made from <M>CW614N</M> brass under RoHS exemption 6(c), valid until 30 June 2027; lead-free <M>CW724R</M> is available on request. See <L href={G.leadFree}>lead-free and DZR brass</L>.</p>
      </> },
      { id: "accessories", h2: "Accessories you may need", body: <>
        <ul className="bullets">
          <li><span><L href={P.lockNuts}>Lock nuts</L> hold the gland in a clearance hole.</span></li>
          <li><span><L href={P.earthTags}>Earth tags</L> bond a metal gland to the earth conductor.</span></li>
          <li><span><L href={P.adapters}>Reducers, enlargers and adapters</L> join an entry and a gland of different size or thread system, such as PG to metric.</span></li>
          <li><span><L href={P.stopPlugs}>Stop plugs</L> close unused entries.</span></li>
        </ul>
      </> },
    ],
    faq: [
      ["What size hole is needed for an M20 cable gland?", <><M>20.5 mm</M> for a clearance hole with a lock nut (EN 50262 table, tolerance +0.2 / −0.4 mm). For a tapped wall, drill <M>18.5 mm</M> and tap <M>M20×1.5</M>.</>],
      ["How do I measure a cable for a gland?", <>Measure the outside diameter of the sheath with calipers at two or three points and in two directions, then choose a gland whose clamping range covers that diameter with margin at both ends.</>],
      ["Is PG 13.5 the same as M20?", <>No. <M>PG 13.5</M> is <M>20.4 mm</M> across with an <M>80°</M> thread and <M>1.411 mm</M> pitch; <M>M20×1.5</M> is <M>20.0 mm</M> with a <M>60°</M> thread. <M>M20×1.5</M> is the usual replacement; an adapter joins the two.</>],
      ["What does IP68 mean for a cable gland?", <>Dust-tight and protected against continuous immersion in water, under depth and time conditions stated by the gland maker (IEC 60529). It applies only with the cable inside the clamping range and the entry seal fitted.</>],
      ["Do I need a lock nut?", <>Yes, in a clearance hole. In a tapped wall the gland screws into the wall and a lock nut is not needed.</>],
      ["Are brass cable glands suitable for hazardous areas?", <>Only glands certified for the zone (Ex, ATEX or IECEx). Ours are not certified for hazardous areas.</>],
    ],
    related: [
      card(P.glands, "PG · Metric", "Brass cable glands", "Glands and accessories"),
      card(P.pg, "DIN 40430", "PG thread chart", "With PG → metric"),
      card(P.metric, "EN 60423", "Metric thread chart", "M12–M63×1.5"),
      card(P.adapters, "PG → M", "Reducers and adapters", "Join different entries"),
    ],
    cta: ["Need glands or accessories?", "Tell us the entry thread and the cable outside diameter; we propose the size and send a quote.", P.rfq, "Request a quote"],
  },
} satisfies Record<string, Guide>;
