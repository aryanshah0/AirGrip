// Product group made to the customer's drawing (fittings, forgings, inserts, terminals, fasteners, stampings).
// Content: GROUPS in src/data/products.tsx.
import "../styles/pages.css";
import "./datasheet.css";
import { Arr, Bands, Crumbs, Faq, Kv, Pic, Plate, Related } from "../components/blocks";
import type { Group } from "../data/products";
import { P } from "../site";

export function GroupPage({ g }: { g: Group }) {
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
              <div style={{ marginTop: "var(--s-6)" }}><Plate drawing={<div className="sheet1" style={{ marginTop: 0 }}><div><img src={`/img/la/l/${g.img}.svg`} alt={`Drawing of a typical part: ${g.crumb.toLowerCase()}`} /></div></div>} photos={g.photos} /></div>
            </div>
            <Kv rows={g.facts} />
          </div>
        </div>
      </section>
      <Bands sections={[
        <div className="wrap">
          <div className="open"><div><h2>{g.galleryH2}</h2></div><p>Representative shapes, drawn as half-sections or exterior views (not to a common scale).</p></div>
          <div className={"gal" + (g.gallery.length % 3 === 0 ? " gal--3" : "")}>
            {g.gallery.map(([img, name, spec]) => <figure key={img}><div className="photo"><Pic name={img} alt={`${name} drawing`} /></div><figcaption>{name}<span className="mono">{spec}</span></figcaption></figure>)}
          </div>
        </div>,
        <div className="wrap side">
          <div className="sh">
            <h2>{g.typesH2}</h2>
            <p>Made to your drawing or sample.</p>
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
