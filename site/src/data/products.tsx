// Product content: the single source for the product-group, cable-gland, gland-accessory and chart pages.
// The page templates in src/templates/ turn each entry into a page; change a fact or a sentence here.
// Typography: " · " separators are written with a no-break space before the dot (&nbsp;· or  · ) so a line
// never starts with "·".
import type { ReactNode } from "react";
import type { Card, FaqItem, KvRow, SizeRow } from "../components/blocks";
import { Code, M } from "../components/blocks";
import { P } from "../site";

// ---------------------------------------------------------------------------------------------------------------
// Threads used by gland and accessory size tables and by the reducer / enlarger / adapter picker.
// od = outside Ø in mm: DIN 40430 (PG), EN 60423 nominal (M), ISO 228-1 major Ø (G), ASME B1.20.1 pipe OD (NPT).
// ---------------------------------------------------------------------------------------------------------------
export interface Thread extends SizeRow { od: number; sys: "PG" | "M" | "G" | "N" }
const t = (sys: Thread["sys"], list: [string, string, number][]): Thread[] => list.map(([label, token, od]) => ({ label, token, od, sys }));
export const PG = t("PG", [["PG 7", "PG07", 12.5], ["PG 9", "PG09", 15.2], ["PG 11", "PG11", 18.6], ["PG 13.5", "PG13", 20.4], ["PG 16", "PG16", 22.5],
  ["PG 21", "PG21", 28.3], ["PG 29", "PG29", 37.0], ["PG 36", "PG36", 47.0], ["PG 42", "PG42", 54.0], ["PG 48", "PG48", 59.3]]);
export const METRIC = t("M", [["M12×1.5", "M12", 12], ["M16×1.5", "M16", 16], ["M20×1.5", "M20", 20], ["M25×1.5", "M25", 25], ["M32×1.5", "M32", 32],
  ["M40×1.5", "M40", 40], ["M50×1.5", "M50", 50], ["M63×1.5", "M63", 63], ["M80", "M80", 80]]); // M80 pitch: to confirm (Ketan)
export const BSP = t("G", [["G 3/8", "G38", 16.662], ["G 1/2", "G12", 20.955], ["G 3/4", "G34", 26.441], ["G 1", "G1", 33.249], ["G 1¼", "G114", 41.91], ["G 1½", "G112", 47.803]]);
export const NPT = t("N", [["3/8 NPT", "N38", 17.145], ["1/2 NPT", "N12", 21.336], ["3/4 NPT", "N34", 26.67], ["1 NPT", "N1", 33.401], ["1¼ NPT", "N114", 42.164], ["1½ NPT", "N112", 48.26]]);
export const THREADS: Thread[] = [...PG, ...METRIC, ...BSP, ...NPT];

// ---------------------------------------------------------------------------------------------------------------
// Facts repeated on many pages
// ---------------------------------------------------------------------------------------------------------------
const TOL = <M>±0.05 mm</M>;
const DOCS = <>EN 10204 3.1 mill certificate, certificate of conformity and final inspection report with every batch; PPAP Level 3 on request&nbsp;· <a className="link" href={P.quality}>Quality</a></>;
const VOL = "From a few thousand pieces to millions a year";
export const FINISH = "Natural, or plated in our plant: nickel, tin or zinc";
const PLATED = FINISH + "; silver or chrome on request";
const PLATED_NI_SN = "Natural, or plated in our plant: nickel or tin; silver or chrome on request";
export const GLAND_BRASS = <>Brass CuZn39Pb3 (<M>CW614N</M>); lead-free on request</>;

// Related cards
const C = {
  turned: { href: P.category, img: "turned", name: "Brass turned components", sub: "Ø5–100 mm" },
  forged: { href: P.forged, img: "tee", name: "Forged brass components", sub: "25 g – 1.0 kg" },
  fittings: { href: P.fittings, img: "adaptor", name: "Brass fittings", sub: "BSP · NPT" },
  inserts: { href: P.inserts, img: "insert", name: "Moulding inserts", sub: "Knurled, threaded" },
  terminals: { href: P.terminals, img: "terminal", name: "Electrical terminals & connectors", sub: "From M2" },
  stamping: { href: P.stamping, img: "earthtag", name: "Metal stamping parts", sub: "Washers, tags" },
  capabilities: { href: P.capabilities, img: "spindle", name: "Capabilities", sub: "Processes & machines" },
  bspChart: { href: P.bsp, img: "prof-bsp", name: "BSP thread chart", sub: "ISO 228-1" },
  nptChart: { href: P.npt, img: "prof-npt", name: "NPT thread chart", sub: "ASME B1.20.1" },
  glands: { href: P.glands, img: "gland", name: "Brass cable glands", sub: "PG · metric" },
  lockNuts: { href: P.lockNuts, img: "locknut", name: "Lock nuts", sub: "Standard and EMC" },
  earthTags: { href: P.earthTags, img: "earthtag", name: "Earth tags", sub: "PG and metric" },
  adapters: { href: P.adapters, img: "reducer", name: "Reducers, enlargers & adapters", sub: "Change the entry thread" },
  stopPlugs: { href: P.stopPlugs, img: "stopplug", name: "Stop plugs", sub: "Close unused entries" },
} satisfies Record<string, Card>;

// ---------------------------------------------------------------------------------------------------------------
// Product groups made to the customer's drawing (template: GroupPage)
// ---------------------------------------------------------------------------------------------------------------
export interface Group {
  crumb: string;            // last breadcrumb item
  h1: string;
  lead: string;
  img: string;              // line drawing in /img/la/l/
  facts: KvRow[];
  typesH2: string;
  types: string[];
  photos: [file: string, caption: string][];   // 1 photo: beside the types list; 2+: an "Examples" gallery
  specTitle?: string;
  spec?: KvRow[];
  faqH2: string;
  faq: FaqItem[];
  related: Card[];
  cta: [title: string, text: string];
}

export const GROUPS = {
  fittings: {
    crumb: "Brass fittings", h1: "Brass fittings", img: "adaptor",
    lead: "Fittings made to your drawing or sample: hot-forged or turned from bar, then drilled and threaded.",
    facts: [
      ["Process", "Hot-forged and machined, or turned from bar"],
      ["Size range", <>Bar <M>Ø5–100 mm</M>&nbsp;· forged bodies <M>25&nbsp;g&nbsp;–&nbsp;1.0&nbsp;kg</M></>],
      ["Tolerance", TOL],
      ["Threads", <M>BSP (ISO 228-1)&nbsp;· BSPT&nbsp;· NPT&nbsp;· M&nbsp;· UNC/UNF</M>],
      ["Material", <><M>CW617N</M> (forging), <M>CW614N</M>; DZR and lead-free on request</>],
      ["Finish", PLATED], ["Documents", DOCS], ["Volumes", VOL],
    ],
    typesH2: "Fittings we make",
    types: ["Pipe fittings: adaptors, nipples, couplings, tees, elbows", "Hose-barb fittings", "Compression fittings",
      "Pneumatic and airline fittings", "Hydraulic fittings", "Automotive fittings"],
    photos: [["Brass-Fittings.webp", "Brass fittings"]],
    specTitle: "How fittings are made",
    spec: [
      ["Forged, then machined", "Bodies with side branches (tees, elbows, crosses) are hot-forged near net shape, then drilled and threaded: less material and fewer operations than bar."],
      ["Turned from bar", "Straight connectors, adaptors, nipples and hose barbs are turned on CNC lathes or cam automats."],
    ],
    faqH2: "Buying brass fittings from AirGrip",
    faq: [
      ["Can you make fittings for drinking water?", "Yes, in dezincification-resistant (DZR) or lead-free brass on request. Approvals such as WRAS, DVGW or NSF/ANSI 61 belong to your finished product; tell us which your drawing calls up."],
      ["Which threads can you cut?", <>BSP parallel and taper, NPT, metric and UNC/UNF; parallel threads gauged GO / NO-GO. See the <a className="link" href={P.bsp}>BSP</a> and <a className="link" href={P.npt}>NPT</a> charts.</>],
    ],
    related: [C.forged, C.turned, C.bspChart, C.nptChart],
    cta: ["Send a fitting drawing or sample", "Include the thread standard, material (DZR or lead-free if needed) and any pressure-test requirement."],
  },

  forged: {
    crumb: "Forged brass components", h1: "Forged brass components", img: "tee",
    lead: "Hot-forged brass blanks from 25 g to 1.0 kg, CNC-machined to your drawing. Forging first saves material and machining time on parts with branches, flanges or large heads.",
    facts: [
      ["Process", "Hot forging, then CNC turning, drilling and threading"],
      ["Weight range", <M>25&nbsp;g&nbsp;–&nbsp;1.0&nbsp;kg</M>],
      ["Tolerance", <>{TOL} on machined features</>],
      ["Threads", <M>M&nbsp;· BSP/BSPT&nbsp;· NPT&nbsp;· UNC/UNF</M>],
      ["Material", <><M>CW617N</M> (CuZn40Pb2, forging brass); DZR on request</>],
      ["Finish", "Shot-blasted, natural or bright; or plated in our plant: nickel, tin or zinc; silver or chrome on request"],
      ["Documents", DOCS], ["Volumes", VOL],
    ],
    typesH2: "Forged parts we make",
    types: ["Valve and fitting bodies", "Tees, elbows and manifolds", "Forged automotive components", "Flanged and branched bodies, machined to drawing"],
    photos: [],
    specTitle: "When to forge",
    spec: [
      ["Forge", "Parts with a large flange, side branches or a big head compared with the body: forging puts material only where it is needed."],
      ["Turn from bar", <>Parts of mostly one diameter: <a className="link" href={P.category}>brass turned components</a>.</>],
    ],
    faqH2: "Buying forgings from AirGrip",
    faq: [["Is a forged part cheaper than one machined from bar?", "Forging adds a die but cuts material and machining time, so for branched or flanged parts in volume it is usually cheaper. If both routes make sense, the quote shows both."]],
    related: [C.fittings, C.turned, C.capabilities, { href: P.grades, img: "bush", name: "Brass grade equivalents", sub: "CW617N · CZ122" }],
    cta: ["Send the drawing of your forged part", "Include the annual volume: it decides whether a forging die pays off."],
  },

  inserts: {
    crumb: "Moulding inserts", h1: "Brass moulding inserts", img: "insert",
    lead: "Threaded brass inserts for moulding into plastic parts, made to your drawing: knurled for torque, grooved for pull-out resistance and held to close tolerance so plastic can't flash into the thread.",
    facts: [
      ["Shapes", "Round knurled · hexagonal · square"],
      ["Knurl", "Diamond · straight · unidirectional"],
      ["Diameter", <M>Ø5–38 mm</M>],
      ["Tolerance", TOL],
      ["Threads", <><M>M&nbsp;· UNC/UNF&nbsp;· BA&nbsp;· BSW</M>, gauged GO / NO-GO</>],
      ["Material", <>Free-cutting brass <M>CW614N</M> (IS 319 Type I)</>],
      ["Finish", PLATED_NI_SN], ["Documents", DOCS], ["Volumes", VOL],
    ],
    typesH2: "Insert types",
    types: ["Mould-in threaded inserts", "Press-in inserts", "Flanged inserts", "Insulator inserts", "Inserts for electrofusion couplings", "Inserts for PE and PP pipe fittings"],
    photos: [["Injection-moulding-inserts.webp", "Brass moulding inserts"]],
    specTitle: "Design features",
    spec: [
      ["Pull-out resistance", "A deep groove between knurls locks the insert into the plastic."],
      ["No flash", "The bore after the thread is held to close tolerance so molten plastic can't enter the thread."],
      ["Used in", "Moulded plastic parts, PE and PP pipe, electrofusion couplings, instrumentation, electrical and automotive parts."],
    ],
    faqH2: "Choosing an insert",
    faq: [
      ["Which knurl should I choose?", "Diamond knurl for combined torque and pull-out resistance, straight knurl where torque matters most, unidirectional for specific press-in designs. Send the drawing and we'll advise."],
      ["Can you match an existing insert?", "Yes. Send a sample or drawing; we match thread, knurl and dimensions."],
    ],
    related: [C.terminals, C.turned, { href: P.fasteners, img: "fastener", name: "Special brass fasteners", sub: "Studs, nuts, anchors" },
      { href: P.grades, img: "bush", name: "Brass grade equivalents", sub: "CW614N · IS 319" }],
    cta: ["Send your insert drawing or a sample", "Include the thread, knurl type and the plastic it is moulded into."],
  },

  terminals: {
    crumb: "Electrical terminals & connectors", h1: "Brass electrical terminals & connectors", img: "terminal",
    lead: "Terminal blocks, connectors, earth blocks and neutral links for wiring and panel boards, made to your drawing for switchgear, MCB and RCD makers.",
    facts: [
      ["Process", "Cut from extruded brass profile, then milled, drilled and tapped"],
      ["Size range", <>From <M>M2</M> thread; current rating to your drawing</>],
      ["Tolerance", TOL],
      ["Threads", <M>M&nbsp;· UNC/UNF&nbsp;· BA&nbsp;· BSW</M>],
      ["Material", <>Brass <M>CW614N</M> (IS 319 Type I)</>],
      ["Finish", PLATED_NI_SN], ["Documents", DOCS], ["Volumes", VOL],
    ],
    typesH2: "Terminal parts we make",
    types: ["Terminal blocks", "Terminal connectors", "Earth blocks", "Neutral links", "Switchgear components", "MCB and RCD terminals"],
    photos: [],
    specTitle: "Where they are used",
    spec: [["Equipment", "Wiring and panel boards; miniature circuit breakers (MCB), residual-current devices (RCD), circuit breakers and switchgear."]],
    faqH2: "Buying terminals from AirGrip",
    faq: [["Can you size a terminal to a current rating?", "Tell us the rating and the mating cable or busbar; we work to your drawing or propose one for your approval."]],
    related: [C.inserts, { ...C.earthTags, sub: "For cable glands" }, C.glands, C.turned],
    cta: ["Send your terminal drawing", "Include the current rating, plating and the mating cable or busbar."],
  },

  fasteners: {
    crumb: "Special fasteners", h1: "Special brass fasteners", img: "fastener",
    lead: "Fasteners that standard catalogues don't cover, made to your drawing: battery-terminal fasteners, screws and bolts, anchors, studs, nuts and washers.",
    facts: [
      ["Process", "Turned and threaded in-house; washers stamped"],
      ["Size range", <>Within the turning range <M>Ø5–100 mm</M></>],
      ["Tolerance", TOL],
      ["Threads", <><M>M&nbsp;· UNC/UNF&nbsp;· BA&nbsp;· BSW</M>&nbsp;· special threads to drawing</>],
      ["Heads", "Countersunk, pan, cheese, round, hex, square; slotted or other drives to drawing"],
      ["Material", <>Brass <M>CW614N</M>; others on request</>],
      ["Finish", PLATED], ["Documents", DOCS], ["Volumes", VOL],
    ],
    typesH2: "Fasteners we make",
    types: ["Automotive battery-terminal fasteners and kits", "Machine screws", "Hex bolts", "Brass anchors", "Studs", "Nuts", "Washers"],
    photos: [["Automotive-Battery-Fasteners.webp", "Automotive battery fasteners"], ["Brass-Anchore.webp", "Brass anchors"], ["Nut-Fasteners.webp", "Nuts"]],
    faqH2: "Buying special fasteners from AirGrip",
    faq: [
      ["Do you make battery-terminal kits?", "Yes: battery-terminal fasteners in brass, to your drawing, packed as kits if required."],
      ["Do you make standard screws and bolts?", "Yes, in brass, to your drawing or sample, with the head and drive you need. For off-the-shelf sizes a catalogue supplier is usually cheaper."],
    ],
    related: [C.turned, C.inserts, C.terminals, C.stamping],
    cta: ["Send your fastener drawing or sample", "Include the thread, plating and, for kits, the parts per kit."],
  },

  stamping: {
    crumb: "Metal stamping parts", h1: "Brass, copper and steel stampings", img: "earthtag",
    lead: "Parts pressed from brass, copper and steel strip to your drawing or sample: electrical stampings, earth tags, fuse and switch parts, crimp pins and washers.",
    facts: [
      ["Process", "Pressed in our plant"],
      ["Thickness", "To your drawing"],
      ["Tolerance", <>{TOL} on punched features</>],
      ["Material", "Brass · copper · steel"],
      ["Finish", PLATED_NI_SN], ["Documents", DOCS], ["Volumes", VOL],
    ],
    typesH2: "Stampings we make",
    types: ["Electrical stamping parts", "Earth tags", "Fuse parts", "Switch parts", "Female crimp pins", "Washers"],
    photos: [],
    faqH2: "Buying stampings from AirGrip",
    faq: [["Can you combine stamping with turning?", <>Yes: stamped parts can be assembled with turned or threaded parts as a sub-assembly. Earth tags for cable glands: <a className="link" href={P.earthTags}>earth tags</a>.</>]],
    related: [{ ...C.earthTags, sub: "For cable glands" }, C.terminals, { href: P.fasteners, img: "fastener", name: "Special fasteners", sub: "Washers, nuts" }, C.capabilities],
    cta: ["Send your stamping drawing", "Include the material, strip thickness and plating."],
  },
} satisfies Record<string, Group>;

// ---------------------------------------------------------------------------------------------------------------
// Cable glands with a size table (template: GlandPage). The pressure screw has its own page (pages/PressureScrew).
// "" in a size row = not yet confirmed: shown as "—" ("dimensions with your quote").
// ---------------------------------------------------------------------------------------------------------------
export interface Gland {
  name: string;             // "Clamping-jaw cable gland"
  code: string;             // AG-CJ
  lead: string;
  use: string;
  art: string;              // drawing: /img/la/l/<art>.svg and dimension key /img/la/<art>-key.svg
  photo: string;
  figNote: string;
  key: ReactNode;           // dimension key caption
  cols: string[];
  pg: string[][];           // per PG size (in PG order): one value per column
  metric: string[][];       // per metric size (in METRIC order)
}
const none = (n: number, rows: number) => Array.from({ length: rows }, () => Array<string>(n).fill(""));

export const GLANDS = {
  clampingJaw: {
    name: "Clamping-jaw cable gland", code: "AG-CJ",
    lead: "A cable gland with clamping jaws that grip the cable for traction relief.",
    use: "Distribution boxes and control cabinets, moving machine parts, automation and plant engineering, where the cable must be held against pull-out.",
    art: "gland-cj", photo: "01-Cable-Gland-With-Clamping-Jaw.webp", figNote: "Clamping-jaw gland in half-section, with end view.",
    key: <><M>L</M> overall length&nbsp;· <M>GL</M> thread length&nbsp;· <M>D</M> cable passage&nbsp;· <M>T</M> entry thread</>,
    cols: ["L", "GL", "D"],
    pg: [["15.0", "5.5", "8.0"], ["16.0", "6.0", "10.5"], ["17.5", "6.0", "12.0"], ["19.0", "7.5", "14.5"], ["19.0", "7.5", "17.5"],
      ["", "", ""], ["", "", ""], ["26.0", "9.0", "36.0"], ["28.0", "10.0", "46.0"], ["28.0", "10.0", "52.0"]],
    metric: none(3, 9),
  },
  strainRelief: {
    name: "Strain-relief cable gland", code: "AG-SR",
    lead: "A cable gland with bending protection, giving strain and traction relief for flexible cables.",
    use: "Flexible cables on moving machine parts, automation and control cabinets, where the cable needs bending protection at the entry.",
    art: "gland-sr", photo: "strain-relief-cable-gland.webp", figNote: "Strain-relief gland in half-section, with end view.",
    key: <><M>L</M> overall length&nbsp;· <M>GL</M> thread length&nbsp;· <M>D1, D2</M> cable passage&nbsp;· <M>T</M> entry thread</>,
    cols: ["L", "GL", "D1", "D2"],
    pg: [["", "", "", ""], ["21.5", "6.0", "12.5", "10.0"], ["22.5", "6.0", "15.0", "11.6"], ["24.0", "6.5", "17.0", "13.6"], ["24.0", "6.5", "18.5", "15.6"],
      ["25.0", "7.5", "23.5", "21.0"], ["30.5", "8.0", "32.0", "30.0"], ["32.0", "9.0", "37.0", "35.0"], ["", "", "", ""], ["", "", "", ""]],
    metric: none(4, 9),
  },
} satisfies Record<string, Gland>;

// ---------------------------------------------------------------------------------------------------------------
// Gland accessories (template: AccessoryPage). Lock nuts have their own page (pages/LockNuts).
// ---------------------------------------------------------------------------------------------------------------
interface AccessoryBase {
  name: string;             // breadcrumb and image alt, e.g. "Stop plugs"
  h1: string;
  code: string;             // eyebrow, e.g. "AG-SP"
  img: string;              // drawing in /img/la/l/
  photo?: string;
  lead: string;
  facts: KvRow[];
  related: Card[];
}
/** One size table per thread system (stop plugs, earth tags). `heads` adds the head-type switch (stop plugs). */
export interface TabsAccessory extends AccessoryBase { kind: "tabs"; item: string; col?: string; systems: { tab: string; sizes: Thread[] }[]; heads?: boolean }
/** Several parts, each with a short description and its own size tables or pair picker. */
export interface PartsAccessory extends AccessoryBase {
  kind: "parts"; h2: string; intro: string; twoColumns: boolean;
  parts: { id: string; title: string; photo: string; text: string; sizes?: { prefix: string; code: string; item: string; systems: { tab: string; sizes: Thread[] }[] }; pair?: { code: string; what: string; entry: string; gland: string } }[];
  notes: ReactNode;
}
export type Accessory = TabsAccessory | PartsAccessory;

const accRelated = (self: string) => [C.glands, C.lockNuts, C.earthTags, C.adapters, C.stopPlugs].filter((c) => c.href !== self).slice(0, 4);
const RANGE = "PG 7–48 · M12–M80";
const INCH = 'BSP and NPT 3/8–1½"';

export const ACCESSORIES = {
  stopPlugs: {
    kind: "tabs", heads: true, name: "Stop plugs", item: "Stop plug", h1: "Brass stop plugs for cable glands", code: "AG-SP", img: "stopplug", photo: "04-Stop-Plug-01.webp",
    lead: "Stop plugs (blanking plugs) close unused cable entries in enclosures, temporarily or permanently.",
    facts: [
      ["Threads", <><M>{RANGE}</M>&nbsp;· <M>{INCH}</M></>],
      ["Material", GLAND_BRASS], ["Finish", FINISH],
      ["Head", "Slotted dome or hex head"],
      ["Part code", <><Code>AG-SP-[size]-[finish]</Code> slotted dome&nbsp;· <Code>AG-SH-[size]-[finish]</Code> hex head</>],
    ],
    systems: [{ tab: "PG", sizes: PG }, { tab: "Metric", sizes: METRIC }, { tab: "BSP", sizes: BSP }, { tab: "NPT", sizes: NPT }],
    related: accRelated(P.stopPlugs),
  },
  earthTags: {
    kind: "tabs", name: "Earth tags", item: "Earth tag", h1: "Brass earth tags for cable glands", code: "AG-ET", img: "earthtag", photo: "12-Earthing-Tag.webp",
    lead: "Stamped from brass strip and sized to the gland thread: PG 7–48 and M12–M80.",
    facts: [
      ["For gland thread", <M>{RANGE}</M>],
      ["Material", "Brass strip"], ["Finish", FINISH],
      ["Process", <>Stamped from brass strip&nbsp;· <a className="link" href={P.stamping}>metal stamping</a></>],
      ["Part code", <Code>AG-ET-[size]-[finish]</Code>],
    ],
    col: "For gland thread",
    systems: [{ tab: "PG", sizes: PG }, { tab: "Metric", sizes: METRIC }],
    related: accRelated(P.earthTags),
  },
  adapters: {
    kind: "parts", twoColumns: false, name: "Reducers, enlargers & adapters", h1: "Brass reducers, enlargers & adapters", code: "AG-RD · AG-EN · AG-AD", img: "reducer",
    lead: "Change the size or thread system of an enclosure entry, so a gland fits without re-machining the enclosure.",
    facts: [
      ["Threads", <><M>{RANGE}</M>&nbsp;· <M>{INCH}</M>; pairs on request</>],
      ["Material", GLAND_BRASS], ["Finish", FINISH],
    ],
    h2: "Three ways to change an entry thread",
    intro: "Each part joins two threads: the enclosure entry and the gland. Pick both; the part code records the pair.",
    parts: [
      { id: "reducers", title: "Reducers", photo: "05-Reducer.webp", text: "Step a larger enclosure entry down to a smaller gland thread, without re-machining the enclosure.",
        pair: { code: "AG-RD", what: "Reducer", entry: "PG21", gland: "PG16" } },
      { id: "enlargers", title: "Enlargers", photo: "07-Enlarger-01.webp", text: "Take a smaller enclosure entry up to a larger gland thread.",
        pair: { code: "AG-EN", what: "Enlarger", entry: "PG16", gland: "PG21" } },
      { id: "adapters", title: "Adapters", photo: "06-Adapter.webp", text: "Convert an entry from one thread system to another, e.g. PG to metric, or NPT to metric.",
        pair: { code: "AG-AD", what: "Adapter", entry: "PG16", gland: "M20" } },
    ],
    notes: <>
      <p className="tbl-note" style={{ marginTop: "var(--s-8)" }}>Any conversion within the accessory range on request.</p>
      <p className="tbl-note">Thread data: <a className="link" href={P.pg}>PG</a>&nbsp;· <a className="link" href={P.metric}>metric</a>&nbsp;· <a className="link" href={P.bsp}>BSP</a>&nbsp;· <a className="link" href={P.npt}>NPT</a> charts.</p>
    </>,
    related: accRelated(P.adapters),
  },
  conduit: {
    kind: "parts", twoColumns: true, name: "Conduit gland parts", h1: "Brass conduit gland parts", code: "AG-MB · AG-CN", img: "malebush", photo: "09-Brass-Male-Bush.webp",
    lead: "Male bushes and conduit gland nuts for cable and conduit entries into enclosures.",
    facts: [
      ["Threads", <M>{RANGE}</M>],
      ["Material", GLAND_BRASS], ["Finish", FINISH],
      ["Part code", <><Code>AG-MB-[size]-[finish]</Code>&nbsp;· <Code>AG-CN-[size]-[finish]</Code></>],
    ],
    h2: "Sizes and part codes",
    intro: "Add sizes to your quote; finish is chosen in the quote form.",
    parts: [
      { id: "male-bush", title: "Male bushes", photo: "09-Brass-Male-Bush.webp", text: "Protect the cable from sharp edges where it enters trunking, panels, machines or housings, indoors or outdoors. For unarmoured cable.",
        sizes: { prefix: "b", code: "AG-MB", item: "Male bush", systems: [{ tab: "PG", sizes: PG }, { tab: "Metric", sizes: METRIC }] } },
      { id: "conduit-nut", title: "Conduit gland nuts", photo: "11-Conduit-Gland-Nut-01.webp", text: "Brass nuts for conduit glands, PG 7–48 and M12–M80.",
        sizes: { prefix: "c", code: "AG-CN", item: "Conduit gland nut", systems: [{ tab: "PG", sizes: PG }, { tab: "Metric", sizes: METRIC }] } },
    ],
    notes: <p className="tbl-note" style={{ marginTop: "var(--s-6)" }}>Dimensions with your quote.</p>,
    related: accRelated(P.conduit),
  },
} satisfies Record<string, Accessory>;

// ---------------------------------------------------------------------------------------------------------------
// Technical charts (template: ChartPage). The PG chart has its own page (pages/PgChart).
// Column kinds: s = first column (sticky, mono) · n = number · c = code (mono, left) · t = text
// ---------------------------------------------------------------------------------------------------------------
export interface Chart {
  h1: string;
  std: string;              // eyebrow
  lead: string;
  facts: KvRow[];
  fig?: string;             // thread-profile drawing in /img/la/
  tableH2?: string;
  headers: string[];
  kinds: string;
  rows: string[][];
  note: ReactNode;
  cta: [title: string, text: string, href: string, button: string];
}

export const CHARTS = {
  metric: {
    h1: "Metric cable gland thread chart", std: "EN 60423", fig: "prof-metric", tableH2: "Metric thread sizes",
    lead: "Metric threads with 1.5 mm pitch are the default for new cable entries in Europe, for glands, accessories and many turned parts.",
    facts: [["Pitch", <M>1.5 mm</M>], ["Flank angle", <M>60°</M>], ["Sizes", <M>M12 – M63</M>]],
    headers: ["Size", "Outside Ø d", "Pitch P", "Tap drill Ø"], kinds: "snnn",
    rows: [12, 16, 20, 25, 32, 40, 50, 63].map((d) => [`M${d}×1.5`, d.toFixed(2), "1.5", (d - 1.5).toFixed(1)]),
    note: <p className="tbl-note">Tap drill = d − P. AirGrip glands and accessories also come in M80.</p>,
    cta: ["Metric glands and accessories", "Glands, lock nuts, stop plugs and adapters in metric threads.", P.glands, "See cable glands"],
  },
  bsp: {
    h1: "BSP thread chart", std: "ISO 228-1", fig: "prof-bsp", tableH2: "BSP thread sizes",
    lead: "British Standard Pipe parallel threads (G) for fittings, inserts and gland accessories. Pressure-tight joints seal on a washer or O-ring, not on the thread.",
    facts: [["Flank angle", <M>55°</M>], ["Form", "Whitworth, parallel"], ["Sizes", <M>G 1/8 – G 5</M>]],
    headers: ["Size", "Threads / inch", "Pitch P", "Major Ø d", "Minor Ø d1", "Through-hole Ø"], kinds: "snnnnn",
    rows: [
      ["G 1/8", "28", "0.907", "9.728", "8.566", "—"], ["G 1/4", "19", "1.337", "13.157", "11.445", "13.4"],
      ["G 3/8", "19", "1.337", "16.662", "14.950", "17.0"], ["G 1/2", "14", "1.814", "20.955", "18.631", "21.3"],
      ["G 5/8", "14", "1.814", "22.911", "20.587", "23.25"], ["G 3/4", "14", "1.814", "26.441", "24.117", "26.8"],
      ["G 1", "11", "2.309", "33.249", "30.291", "33.7"], ["G 1 1/8", "11", "2.309", "37.897", "34.939", "38.3"],
      ["G 1 1/4", "11", "2.309", "41.910", "38.952", "42.3"], ["G 1 1/2", "11", "2.309", "47.803", "44.845", "48.1"],
      ["G 2", "11", "2.309", "59.614", "56.656", "60.1"], ["G 2 1/4", "11", "2.309", "65.710", "62.752", "66.2"],
      ["G 2 1/2", "11", "2.309", "75.184", "72.226", "75.7"], ["G 3", "11", "2.309", "87.884", "84.926", "88.4"],
      ["G 4", "11", "2.309", "113.030", "110.072", "113.7"], ["G 5", "11", "2.309", "138.430", "135.472", "139.1"],
    ],
    note: <p className="tbl-note">Values to ISO 228-1. Through-hole: recommended clearance hole. G 4 and G 5 are reference only: above our Ø100 mm turning range.</p>,
    cta: ["BSP fittings and accessories", "Fittings, inserts and gland accessories with BSP threads.", P.fittings, "See brass fittings"],
  },
  npt: {
    h1: "NPT thread chart", std: "ASME B1.20.1", fig: "prof-npt", tableH2: "NPT thread sizes",
    lead: "American National Pipe Taper threads for fittings and gland accessories sold into North America. The 1:16 taper seals with thread sealant.",
    facts: [["Flank angle", <M>60°</M>], ["Taper", <><M>1:16</M> on diameter</>], ["Sizes", <M>1/8 – 2"</M>]],
    headers: ["Size", "Threads / inch", "Pitch P", "Pipe OD", "Pitch Ø E0", "Hand-tight L1", "Effective L2"], kinds: "snnnnnn",
    rows: [
      ["1/8 NPT", "27", "0.941", "10.29", "9.23", "4.10", "6.70"], ["1/4 NPT", "18", "1.411", "13.72", "12.13", "5.79", "10.21"],
      ["3/8 NPT", "18", "1.411", "17.14", "15.55", "6.10", "10.36"], ["1/2 NPT", "14", "1.814", "21.34", "19.26", "8.13", "13.56"],
      ["3/4 NPT", "14", "1.814", "26.67", "24.58", "8.61", "13.86"], ["1 NPT", "11.5", "2.209", "33.40", "30.83", "10.16", "17.34"],
      ["1 1/4 NPT", "11.5", "2.209", "42.16", "39.55", "10.67", "17.95"], ["1 1/2 NPT", "11.5", "2.209", "48.26", "45.62", "10.67", "18.38"],
      ["2 NPT", "11.5", "2.209", "60.32", "57.63", "11.07", "19.22"],
    ],
    note: <p className="tbl-note">All values in mm, converted from ASME B1.20.1 (inch). E0 = pitch diameter at the small end of the external thread.</p>,
    cta: ["NPT fittings and accessories", "Fittings and gland accessories in NPT, 3/8 to 1½ inch.", P.fittings, "See brass fittings"],
  },
  grades: {
    h1: "Brass grade equivalents", std: "EN · BS · UNS · IS",
    lead: "Nearest equivalents between European, British, American and Indian brass designations, with copper and lead content and the use each grade is chosen for.",
    facts: [["Standard at AirGrip", <M>CW614N&nbsp;· CW617N</M>], ["On request", "DZR and lead-free grades"]],
    headers: ["EN no.", "EN designation", "Cu %", "Pb %", "BS", "UNS", "IS", "Typical use", "AirGrip"], kinds: "scnnccctt",
    rows: [
      ["CW614N", "CuZn39Pb3", "57.0–59.0", "2.5–3.5", "CZ121Pb3", "C38500", "IS 319 Type I", "Free-cutting: turned parts, glands, inserts, terminals", "Standard"],
      ["CW617N", "CuZn40Pb2", "57.0–59.0", "1.6–2.5", "CZ122", "C37700", "—", "Hot forging: fittings, valve bodies", "Standard"],
      ["CW603N", "CuZn36Pb3", "60.0–62.0", "2.5–3.5", "CZ124", "C36000", "—", "Free-cutting, higher copper", "—"],
      ["CW602N", "CuZn36Pb2As", "61.0–63.0", "1.7–2.8", "CZ132", "C35330", "—", "Dezincification-resistant (DZR): drinking-water fittings", "On request"],
      ["CW511L", "CuZn38As", "61.5–63.5", "≤ 0.2", "—", "—", "—", "Low-lead DZR: drinking water, lead-free markets", "On request"],
      ["CW724R", "CuZn21Si3P", "75.0–77.0", "≤ 0.10", "—", "C69300", "—", "Lead-free, high strength", "On request"],
      ["CW508L", "CuZn37", "62.0–64.0", "≤ 0.1", "CZ108", "C27200", "—", "Cold forming, stamping", "—"],
      ["CW509L", "CuZn40", "59.5–61.5", "≤ 0.3", "CZ109", "C28000", "—", "Low-lead hot forming", "—"],
      ["CW717R", "CuZn38Sn1As", "59.0–62.0", "≤ 0.2", "CZ112", "C46400", "—", "Naval brass: marine parts", "—"],
    ],
    note: <p className="tbl-note">Nearest equivalents; always check the specification your drawing calls up. Cu and Pb are composition limits from EN 12164 / 12165 / 12163. "—" in the AirGrip column = ask us.</p>,
    cta: ["Need a specific grade?", "Tell us the grade on your drawing; we confirm availability with the quote.", P.rfq, "Request a quote"],
  },
} satisfies Record<string, Chart>;
