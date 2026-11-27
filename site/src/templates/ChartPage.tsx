// Technical reference chart (metric, BSP, NPT threads; brass grade equivalents). Content: CHARTS in src/data/products.tsx.
// On phones the table stacks into cards; each cell carries its column name in data-l.
import "../styles/pages.css";
import "./chart.css";
import { Arr, Crumbs, Faq, Kv } from "../components/blocks";
import type { Chart } from "../data/products";
import { P } from "../site";

const TH = { s: "stick", n: "n", c: undefined, t: undefined } as Record<string, string | undefined>;
const TD = { s: "stick mono", n: "n", c: "mono c", t: undefined } as Record<string, string | undefined>;

export function ChartPage({ c }: { c: Chart }) {
  const kinds = [...c.kinds];
  return (
    <main id="main">
      <section className="phead" style={{ paddingBottom: "var(--s-7)" }}><div className="wrap">
        <Crumbs items={[["Resources", P.resources], [c.h1]]} />
        {c.fig ? (
          <div className="rhead">
            <div><span className="eyebrow" style={{ display: "block" }}>{c.std}</span><h1>{c.h1}</h1><p className="lead">{c.lead}</p><Kv rows={c.facts} /></div>
            <figure><div className="frame"><img src={`/img/la/${c.fig}.svg`} alt={`${c.std} thread profile`} style={{ width: "100%", height: "auto" }} /></div></figure>
          </div>
        ) : (
          <div className="phead__row">
            <div><span className="eyebrow" style={{ display: "block", marginTop: "var(--s-5)" }}>{c.std}</span><h1>{c.h1}</h1><p className="lead">{c.lead}</p></div>
            <div><Kv rows={c.facts} /></div>
          </div>
        )}
      </div></section>
      <section className="band"><div className="wrap">
        {c.tableH2 && <div className="open"><div><h2>{c.tableH2}</h2></div><p>All values in mm unless stated.</p></div>}
        <div className="tbl"><table className="spec stack-m">
          <thead><tr>{c.headers.map((h, i) => <th key={h} className={TH[kinds[i]]}>{h}</th>)}</tr></thead>
          <tbody>{c.rows.map((r) => <tr key={r[0]}>{r.map((v, i) => <td key={i} className={TD[kinds[i]]} data-l={c.headers[i]}>{v}</td>)}</tr>)}</tbody>
        </table></div>
        {c.note}
      </div></section>
      {c.faq && <section className="band band--sheet"><div className="wrap side">
        <div className="sh"><h2>Questions</h2></div>
        <div className="sb"><Faq items={c.faq} /></div>
      </div></section>}
      <section className={c.faq ? "band" : "band band--sheet"}><div className="wrap"><div className="cta">
        <div><h2>{c.cta[0]}</h2><p>{c.cta[1]}</p></div>
        <div className="acts"><a className="btn" href={c.cta[2]}>{c.cta[3]} <Arr /></a></div>
      </div></div></section>
    </main>
  );
}
