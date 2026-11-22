// Buyer guide (resources/guides/…). Content: GUIDES in src/data/guides.tsx. Same building blocks as the product and
// chart pages: a short answer up top, then side-headed sections, FAQ (→ FAQPage data), Related cards and a quote CTA.
// The <time> in the header is read by the build for the TechArticle structured data.
import "../styles/pages.css";
import "./chart.css";
import "./guide.css";
import { Arr, Bands, Crumbs, Faq, Related } from "../components/blocks";
import type { Guide } from "../data/guides";
import { P } from "../site";

const date = (iso: string) => new Date(iso + "T00:00:00Z").toLocaleDateString("en-GB", { day: "numeric", month: "long", year: "numeric", timeZone: "UTC" });

export function GuidePage({ g }: { g: Guide }) {
  return (
    <main id="main">
      <section className="phead" style={{ paddingBottom: "var(--s-7)" }}><div className="wrap">
        <Crumbs items={[["Resources", P.resources], [g.crumb]]} />
        <div className="rhead">
          <div>
            <span className="eyebrow" style={{ display: "block" }}>{g.eyebrow}</span>
            <h1>{g.h1}</h1>
            <p className="lead">{g.lead}</p>
            <p className="gmeta">Updated <time dateTime={g.updated}>{date(g.updated)}</time>&nbsp;· AirGrip, Jamnagar</p>
          </div>
          <aside className="gshort" aria-labelledby="g-short">
            <h2 id="g-short" className="eyebrow eyebrow--brass">In short</h2>
            <ul className="bullets">{g.short.map((s, i) => <li key={i}><span>{s}</span></li>)}</ul>
          </aside>
        </div>
      </div></section>
      <Bands sections={[
        ...g.sections.map((s) => (
          <div className="wrap side" id={s.id}>
            <div className="sh"><h2>{s.h2}</h2>{s.sub && <p>{s.sub}</p>}</div>
            <div className="sb gbody">{s.body}</div>
          </div>
        )),
        <div className="wrap side">
          <div className="sh"><h2>Questions</h2></div>
          <div className="sb"><Faq items={g.faq} /></div>
        </div>,
        <div className="wrap">
          <div className="open"><div><h2 className="sub">Related</h2></div></div>
          <Related items={g.related} />
          <div className="cta" style={{ marginTop: "var(--s-8)" }}>
            <div><h2>{g.cta[0]}</h2><p>{g.cta[1]}</p></div>
            <div className="acts"><a className="btn" href={g.cta[2]}>{g.cta[3]} <Arr /></a></div>
          </div>
        </div>,
      ]} />
    </main>
  );
}
