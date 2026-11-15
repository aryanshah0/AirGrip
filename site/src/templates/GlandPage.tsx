// Cable gland datasheet with a dimension table per thread system (clamping-jaw, strain-relief).
// Content: GLANDS in src/data/products.tsx.
import "../styles/pages.css";
import "./datasheet.css";
import { AddQ } from "../components/AddQ";
import { Arr, Code, Crumbs, Kv, M, Related } from "../components/blocks";
import { PartCode } from "../components/Family";
import { FINISH, GLAND_BRASS, METRIC, PG, type Gland, type Thread } from "../data/products";
import { P } from "../site";

const RELATED = [
  { href: P.lockNuts, img: "locknut", name: "Lock nuts", sub: "Standard and EMC" },
  { href: P.adapters, img: "reducer", name: "Reducers, enlargers & adapters", sub: "Change the entry thread" },
  { href: P.earthTags, img: "earthtag", name: "Earth tags", sub: "PG and metric" },
  { href: P.stopPlugs, img: "stopplug", name: "Stop plugs", sub: "Close unused entries" },
];

function SizeTable({ g, sizes, values }: { g: Gland; sizes: Thread[]; values: string[][] }) {
  return (
    <div className="tbl"><table className="spec">
      <thead><tr><th className="stick">Part code</th><th className="n">Thread</th>{g.cols.map((c) => <th key={c} className="n">{c}</th>)}</tr></thead>
      <tbody>
        {sizes.map((s, i) => {
          const v = values[i];
          const held = v.every((x) => !x);   // a whole row not yet confirmed
          return (
            <tr key={s.token}>
              <td className="stick"><PartCode code={`${g.code}-${s.token}`} /><AddQ code={`${g.code}-${s.token}`} label={`${g.name} ${s.label}`} /></td>
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
          <Crumbs items={[["Products", P.products], ["Brass cable glands", P.glands], [g.name]]} />
          <div className="prod" style={{ marginTop: "var(--s-5)" }}>
            <figure className="prod__fig" style={{ margin: "0" }}>
              <div className="sheet"><div className="frame"><img src={`/img/la/l/${g.art}.svg`} alt={`${g.name}: half-section and end view`} style={{ width: "100%", height: "auto" }} /></div></div>
              <p className="tbl-note">{g.figNote}</p>
              <div className="prod__thumbs"><div className="photo"><img src={`/img/${g.photo}`} alt={`${g.name}, photo`} /></div></div>
            </figure>
            <div className="prod__info">
              <span className="eyebrow">Brass cable glands&nbsp;· <span className="mono" style={{ letterSpacing: "0" }}>{g.code}</span></span>
              <h1>{g.name.replace("cable gland", "brass cable gland")}</h1>
              <p className="lead">{g.lead}</p>
              <Kv rows={[
                ["Entry thread", "PG to DIN 40430, metric to EN 60423"],
                ["Material", GLAND_BRASS],
                ["Finish", FINISH],
                ["Seal", "EPDM"],
                ["Ingress", "IP54"],
                ["Spare parts", "Dome cap nuts on request"],
                ["Part code", <><Code>{g.code}-[size]-[finish]</Code>, e.g. <Code>{g.code}-PG09-NI</Code></>],
              ]} />
              <div className="prod__cta"><a className="btn" href="#sizes">Choose sizes <Arr ch="↓" /></a></div>
            </div>
          </div>
        </div>
      </section>
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
              <button role="tab" id="t-m" aria-selected="false" aria-controls="p-m" tabIndex={-1}>Metric</button>
            </div>
            <div role="tabpanel" id="p-pg" aria-labelledby="t-pg"><SizeTable g={g} sizes={PG} values={g.pg} /></div>
            <div role="tabpanel" id="p-m" aria-labelledby="t-m" hidden><SizeTable g={g} sizes={METRIC} values={g.metric} /></div>
            <p className="tbl-note">Dimensions for reference; the drawing supplied with your quote governs. — = dimensions with your quote&nbsp;· cable clamping ranges with your quote&nbsp;· finish suffix <M>-N&nbsp;· -NI&nbsp;· -SN&nbsp;· -ZN</M>&nbsp;· thread data: <a className="link" href={P.pg}>PG chart</a>, <a className="link" href={P.metric}>metric chart</a>.</p>
          </div>
        </div>
      </div></section>
      <section className="band band--sheet"><div className="wrap side">
        <div className="sh"><h2>Material &amp; compliance</h2></div>
        <div className="sb"><Kv rows={[
          ["Used in", g.use],
          ["RoHS", "Leaded brass (CW614N) is covered by RoHS Annex III exemption 6(c) (copper alloys with up to 4 % lead); lead-free CW724R on request"],
          ["REACH", "Brass contains lead, a REACH candidate-list substance, above 0.1 %; REACH Article 33 statement on request"],
          ["Hazardous areas", "Not certified for hazardous (Ex / ATEX) areas"],
          ["Material data", <a className="link" href={P.grades}>Brass grade equivalents</a>],
        ]} /></div>
      </div></section>
      <section className="band"><div className="wrap">
        <div className="open"><div><h2 className="sub">Used with</h2></div></div>
        <Related items={RELATED} />
      </div></section>
    </main>
  );
}
