// Cable gland datasheet (clamping-jaw gland, strain-relief gland, pressure screw): one sequence for all three:
// hero → sizes → material & compliance → questions → used with + quote box. Content: GLANDS in src/data/products.tsx.
import "../styles/pages.css";
import "./datasheet.css";
import { AddQ } from "../components/AddQ";
import { Arr, Code, Crumbs, Faq, Kv, M, Plate, Related } from "../components/blocks";
import { PartCode } from "../components/Family";
import { METRIC, PG, type Gland, type Thread } from "../data/products";
import { P } from "../site";

const RELATED = [
  { href: P.lockNuts, img: "locknut", name: "Lock nuts", sub: "Standard and EMC" },
  { href: P.adapters, img: "reducer", name: "Reducers, enlargers & adapters", sub: "Change the entry thread" },
  { href: P.earthTags, img: "earthtag", name: "Earth tags", sub: "PG and metric" },
  { href: P.stopPlugs, img: "stopplug", name: "Stop plugs", sub: "Close unused entries" },
];

function SizeTable({ g, sizes, values, caption }: { g: Gland; sizes: Thread[]; values: string[][]; caption: string }) {
  return (
    <div className="tbl"><table className="spec">
      <caption className="sr-only">{caption}</caption>
      <thead><tr><th className="stick">Part code</th><th className="n">Thread</th>{g.cols.map((c) => <th key={c} className="n">{c}</th>)}</tr></thead>
      <tbody>
        {sizes.map((s, i) => {
          const v = values[i];
          const held = v.every((x) => !x);   // a whole row not yet confirmed
          return (
            <tr key={s.token}>
              <td className="stick"><PartCode code={`${g.code}-${s.token}`} /><AddQ code={`${g.code}-${s.token}`} label={`${g.item} ${s.label}`} /></td>
              <td className="n">{s.label}</td>
              {v.map((x, j) => <td key={j} className={held ? "n ondata" : "n"}>{x || "—"}</td>)}
            </tr>
          );
        })}
      </tbody>
    </table></div>
  );
}

export function GlandPage({ g }: { g: Gland }) {
  return (
    <main id="main">
      <section className="band--tight" style={{ paddingTop: "var(--s-6)" }}>
        <div className="wrap">
          <Crumbs items={[["Products", P.products], ["Brass cable glands", P.glands], [g.crumb]]} />
          <div className="prod" style={{ marginTop: "var(--s-5)" }}>
            <figure className="prod__fig" style={{ margin: "0" }}>
              <Plate drawing={<div className="sheet"><div className="frame"><img src={`/img/la/l/${g.art}.svg`} alt={`${g.item}: half-section and end view`} style={{ width: "100%", height: "auto" }} /></div></div>}
                photos={[[g.photo, `${g.item}, photo`]]} />
              <p className="tbl-note">{g.figNote}</p>
            </figure>
            <div className="prod__info">
              <span className="eyebrow">Brass cable glands&nbsp;· <span className="mono" style={{ letterSpacing: "0" }}>{g.code}</span></span>
              <h1>{g.h1}</h1>
              <p className="lead">{g.lead}</p>
              <Kv rows={[...g.facts, ["Part code", <><Code>{g.code}-[size]-[finish]</Code>, e.g. <Code>{g.code}-PG09-NI</Code></>]]} />
              <div className="prod__cta"><a className="btn" href="#sizes">Choose sizes <Arr ch="↓" /></a></div>
            </div>
          </div>
        </div>
      </section>
      <nav className="subnav" aria-label="On this page"><div className="wrap"><a className="on" href="#sizes">Sizes</a><a href="#material">Material &amp; compliance</a><a href="#faq">Questions</a></div></nav>
      <section className="band" id="sizes"><div className="wrap">
        <div className="open"><div><h2>Sizes and part codes</h2></div><p>All values in mm. Add sizes to your quote and send them in one request.</p></div>
        <div className="dims">
          <details className="dimkey" open>
            <summary>Dimension key</summary>
            <figure><div className="frame"><img src={`/img/la/${g.art}-key.svg`} alt="Dimension key" style={{ width: "100%", height: "auto" }} /></div><figcaption>{g.key}</figcaption></figure>
          </details>
          <div>
            <div className="seg" role="tablist" aria-label="Thread system">
              <button role="tab" id="t-pg" aria-selected="true" aria-controls="p-pg">PG&nbsp;· DIN 40430</button>
              <button role="tab" id="t-m" aria-selected="false" aria-controls="p-m" tabIndex={-1}>Metric&nbsp;· EN 60423</button>
            </div>
            <div role="tabpanel" id="p-pg" aria-labelledby="t-pg"><SizeTable g={g} sizes={PG} values={g.pg} caption={`${g.crumb}, PG sizes`} /></div>
            <div role="tabpanel" id="p-m" aria-labelledby="t-m" hidden><SizeTable g={g} sizes={METRIC} values={g.metric} caption={`${g.crumb}, metric sizes`} /></div>
            <p className="tbl-note">Values are for reference; the dimensioned drawing sent with your quote governs. Sizes marked —{g.clamping ? " and cable clamping ranges" : ""} come with that drawing. Finish suffix: <M>-N</M> natural, <M>-NI</M> nickel, <M>-SN</M> tin, <M>-ZN</M> zinc. Thread data: <a className="link" href={P.pg}>PG chart</a>, <a className="link" href={P.metric}>metric chart</a>.</p>
          </div>
        </div>
      </div></section>
      <section className="band band--sheet" id="material"><div className="wrap side">
        <div className="sh"><h2>Material &amp; compliance</h2><p>Free-cutting brass CW614N as standard. Low-lead (CW511L) and lead-free (CW724R) grades on request.</p></div>
        <div className="sb cols">
          <div>
            <Kv rows={[["Copper", <M>57.0–59.0 %</M>], ["Lead", <M>2.5–3.5 %</M>], ["Zinc", "Remainder (CW614N, EN 12164)"]]} />
            <p className="tbl-note">Equivalents: CZ121Pb3 (BS 2874)&nbsp;· C38500 (ASTM B455)&nbsp;· IS 319. <a className="link" href={P.grades}>Brass grade equivalents</a></p>
          </div>
          <div>
            <Kv rows={[
              ["RoHS", "Leaded brass (CW614N) is covered by RoHS Annex III exemption 6(c) (copper alloys with up to 4 % lead); lead-free CW724R on request"],
              ["REACH", "Brass contains lead, a REACH candidate-list substance, above 0.1 %; REACH Article 33 statement on request"],
              ["Material cert.", "EN 10204 3.1 mill certificate with every batch"],
              ["Hazardous areas", "Not certified for hazardous (Ex / ATEX) areas"],
            ]} />
            <h3 className="h4" style={{ marginTop: "var(--s-6)", marginBottom: "var(--s-3)" }}>Options</h3>
            <ul className="bullets">
              <li><span>Bulk or single-piece packing, labelled by lot</span></li>
              <li><span>Your part number on the label</span></li>
            </ul>
          </div>
        </div>
      </div></section>
      <section className="band" id="faq"><div className="wrap side">
        <div className="sh"><h2>{g.faqH2}</h2></div>
        <div className="sb">
          <Faq items={g.faq} />
          <p className="tbl-note">MOQ, lead times and delivery terms: <a className="link" href={P.exports}>Ordering &amp; shipping</a>.</p>
        </div>
      </div></section>
      <section className="band band--sheet"><div className="wrap">
        <div className="open"><div><h2 className="sub">Used with</h2></div></div>
        <Related items={RELATED} />
        <div className="cta" style={{ marginTop: "var(--s-8)" }}>
          <div><h2>Need a size or finish that isn't listed?</h2><p>Ask us. Glands are a standard range, not made to customer drawings.</p></div>
          <div className="acts"><a className="btn" href={P.rfq}>Request a quote <Arr /></a></div>
        </div>
      </div></section>
    </main>
  );
}
