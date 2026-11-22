// Page markup, first converted from design/products.html (frozen); edit here.

import "../styles/pages.css";
import "./css/Products.css";
import { srcSet } from "../lib/img";

export default function Products() {
  return (
    <>
      <main id="main">{" "}
      <section className="phead">{" "}
      <div className="wrap">{" "}
      <ol className="crumbs" aria-label="Breadcrumb"><li><a href="/">Home</a></li><li aria-current="page">Products</li></ol>{" "}
      <div className="phead__row">{" "}
      <div><h1>Brass components, made to drawing or from standard ranges</h1><p className="lead">Seven groups are made to customer drawings. Cable glands and their accessories are standard ranges with dimension tables and part codes.</p></div>{" "}
      <figure className="phero"><div className="photo"><img src="/img/brass-turned-parts.webp" {...srcSet("brass-turned-parts.webp", "(max-width: 959px) 100vw, 560px")} alt="Brass turned parts made by AirGrip: connector bodies, bushes, pins and fittings" fetchPriority="high" /></div><figcaption className="tbl-note">Turned parts made in our plant.</figcaption></figure>{" "}
      </div>{" "}
      </div>{" "}
      </section>{" "}
      <section className="band" id="custom">{" "}
      <div className="wrap">{" "}
      <div className="open"><div><span className="eyebrow eyebrow--brass">Made to your drawing</span><h2>Custom brass components</h2></div><p>Send a drawing or a sample; the quote covers material, process, price and lead time.</p></div>{" "}
      <div className="hub hub--4">{" "}
      <a href="/products/brass-turned-components/"><div className="photo"><picture><source media="(max-width: 559px)" srcSet="/img/la/t/turned.svg" /><img src="/img/la/turned.svg" alt="Drawing of a brass turned component in half-section" loading="lazy" /></picture></div><h3>Brass turned components</h3><p>Bushes, pins, spacers, nozzles and connector bodies, turned from bar on CNC lathes and cam automats.</p><span className="mono">Ø5–100 mm · ±0.05 mm</span></a>{" "}
      <a href="/products/brass-fittings/"><div className="photo"><picture><source media="(max-width: 559px)" srcSet="/img/la/t/elbow.svg" /><img src="/img/la/elbow.svg" alt="Drawing of a brass elbow fitting in section" loading="lazy" /></picture></div><h3>Brass fittings</h3><p>Pipe, hose-barb, compression, pneumatic and hydraulic fittings, forged or turned, BSP and NPT.</p><span className="mono">BSP · BSPT · NPT</span></a>{" "}
      <a href="/products/brass-forged-components/"><div className="photo"><picture><source media="(max-width: 559px)" srcSet="/img/la/t/forgedtee.svg" /><img src="/img/la/forgedtee.svg" alt="Drawing of a forged brass tee in section" loading="lazy" /></picture></div><h3>Forged brass components</h3><p>Hot-forged near-net shapes, machined to finish: valve bodies, manifolds, tees.</p><span className="mono">25 g – 1.0 kg</span></a>{" "}
      <a href="/products/brass-moulding-inserts/"><div className="photo"><picture><source media="(max-width: 559px)" srcSet="/img/la/t/insert.svg" /><img src="/img/la/insert.svg" alt="Drawing of a knurled brass moulding insert" loading="lazy" /></picture></div><h3>Moulding inserts</h3><p>Knurled, threaded inserts for moulding into plastic parts, Ø5–38 mm.</p><span className="mono">M · UNC/UNF · BA · BSW</span></a>{" "}
      <a href="/products/brass-electrical-terminals/"><div className="photo"><picture><source media="(max-width: 559px)" srcSet="/img/la/t/terminal.svg" /><img src="/img/la/terminal.svg" alt="Drawing of a brass terminal block" loading="lazy" /></picture></div><h3>Electrical terminals &amp; connectors</h3><p>Terminal blocks, connectors, earth blocks and neutral links for switchgear, MCB and RCD makers.</p><span className="mono">From M2 · ±0.05 mm</span></a>{" "}
      <a href="/products/special-fasteners/"><div className="photo"><picture><source media="(max-width: 559px)" srcSet="/img/la/t/hexbolt.svg" /><img src="/img/la/hexbolt.svg" alt="Drawing of a brass hex bolt" loading="lazy" /></picture></div><h3>Special fasteners</h3><p>Screws, bolts, studs, nuts, washers, anchors and battery-terminal fasteners to drawing.</p><span className="mono">M · UNC/UNF</span></a>{" "}
      <a href="/products/metal-stamping-parts/"><div className="photo"><picture><source media="(max-width: 559px)" srcSet="/img/la/t/contact.svg" /><img src="/img/la/contact.svg" alt="Drawing of a stamped brass contact" loading="lazy" /></picture></div><h3>Metal stamping parts</h3><p>Brass, copper and steel stampings: earth tags, fuse and switch parts, crimp pins, washers.</p><span className="mono">Brass · copper · steel</span></a>{" "}
      </div>{" "}
      </div>{" "}
      </section>{" "}
      <section className="band band--sheet">{" "}
      <div className="wrap side">{" "}
      <div className="sh"><h2>Standard ranges</h2><p>Cable glands and accessories with size tables and part codes.</p></div>{" "}
      <div className="sb">{" "}
      <div className="sl2">{" "}
      <a href="/products/brass-cable-glands/"><span className="th"><img src="/img/la/t/gland.svg" alt="" loading="lazy" /></span><span><b>Brass cable glands</b><span className="d">Clamping-jaw and strain-relief glands, pressure screws · PG and metric</span></span><span aria-hidden="true">→</span></a>{" "}
      <a href="/products/brass-cable-glands/#accessories"><span className="th"><img src="/img/la/t/locknut.svg" alt="" loading="lazy" /></span><span><b>Gland accessories</b><span className="d">Lock nuts, reducers, enlargers &amp; adapters, stop plugs, earth tags, conduit gland parts</span></span><span aria-hidden="true">→</span></a>{" "}
      </div>{" "}
      </div>{" "}
      </div>{" "}
      </section>{" "}
      <section className="band">{" "}
      <div className="wrap">{" "}
      <div className="cta">{" "}
      <div><h2>Not listed?</h2><p>Most of our output is made to customer drawings. Send the drawing: if we can turn, forge or stamp it, the quote says how.</p></div>{" "}
      <div className="acts"><a className="btn" href="/rfq/">Send a drawing{" "}<span className="arr" aria-hidden="true">→</span></a></div>{" "}
      </div>{" "}
      </div>{" "}
      </section>{" "}
      </main>
    </>
  );
}
