// Product group made to the customer's drawing (fittings, forgings, inserts, terminals, fasteners, stampings).
// Content: GROUPS in src/data/products.tsx.
import "../styles/pages.css";
import "./datasheet.css";
import type { CSSProperties } from "react";
import { Arr, Bands, Crumbs, Faq, Kv, Related } from "../components/blocks";
import type { Group } from "../data/products";
import { P } from "../site";

function Photo({ file, caption, style }: { file: string; caption: string; style?: CSSProperties }) {
  return (
    <figure className="one" style={style}>
      <div className="photo"><img src={`/img/${file}`} alt={caption} loading="lazy" /></div>
      <figcaption>{caption}</figcaption>
    </figure>
  );
}

export function GroupPage({ g }: { g: Group }) {
  const one = g.photos.length === 1 ? g.photos[0] : null;
  const many = g.photos.length > 1 ? g.photos : null;
  return (
    <main id="main">
      <section className="band--tight" style={{ paddingTop: "var(--s-6)" }}>
        <div className="wrap">
          <Crumbs items={[["Products", P.products], [g.crumb]]} />
          <div className="chead">
            <div>
              <h1>{g.h1}</h1>
              <p className="lead">{g.lead}</p>
              <div className="prod__cta"><a className="btn" href={P.rfq}>Send a drawing <Arr /></a></div>
              <div className="sheet1"><div><img src={`/img/la/l/${g.img}.svg`} alt="Drawing of a typical part" /></div></div>
            </div>
            <Kv rows={g.facts} />
          </div>
        </div>
      </section>
      <Bands sections={[
        <div className="wrap side">
          <div className="sh">
            <h2>{g.typesH2}</h2>
            <p>Made to your drawing or sample.</p>
            {one && <Photo file={one[0]} caption={one[1]} style={{ marginTop: "var(--s-6)" }} />}
          </div>
          <div className="sb"><ul className="types2">{g.types.map((x) => <li key={x}>{x}</li>)}</ul></div>
        </div>,
        g.spec?.length && (
          <div className="wrap side">
            <div className="sh"><h2>{g.specTitle}</h2></div>
            <div className="sb"><Kv rows={g.spec} /></div>
          </div>
        ),
        g.also && (
          <div className="wrap side">
            <div className="sh"><h2>{g.also.h2}</h2></div>
            <div className="sb"><Kv rows={g.also.rows} /></div>
          </div>
        ),
        many && (
          <div className="wrap">
            <div className="open"><div><h2 className="sub">Examples</h2></div></div>
            <div className={many.length === 3 ? "gal gal--3" : "gal"}>
              {many.map(([file, caption]) => (
                <figure key={file}><div className="photo"><img src={`/img/${file}`} alt={caption} loading="lazy" /></div><figcaption>{caption}</figcaption></figure>
              ))}
            </div>
          </div>
        ),
        <div className="wrap side">
          <div className="sh"><h2>{g.faqH2}</h2></div>
          <div className="sb">
            <Faq items={g.faq} />
            <p className="tbl-note">Lead times, MOQ, NDA and delivery terms: <a className="link" href={P.exports}>Ordering &amp; shipping</a>.</p>
          </div>
        </div>,
        <div className="wrap">
          <div className="open"><div><h2 className="sub">Related</h2></div></div>
          <Related items={g.related} />
          <div className="cta" style={{ marginTop: "var(--s-8)" }}>
            <div><h2>{g.cta[0]}</h2><p>{g.cta[1]}</p></div>
            <div className="acts"><a className="btn" href={P.rfq}>Request a quote <Arr /></a></div>
          </div>
        </div>,
      ]} />
    </main>
  );
}
