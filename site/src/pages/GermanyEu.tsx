// Brass components for buyers in Germany and the EU: the export facts an EU purchaser and supplier-quality
// engineer check before an RFQ, in one place. Only confirmed facts (REQUIREMENTS §9–§13); English only.
import "../styles/pages.css";
import "./css/Exports.css";
import { Arr, Crumbs, Faq, Kv, M, Pic } from "../components/blocks";
import { P, SITE } from "../site";

export default function GermanyEu() {
  return (
    <main id="main">
      <section className="phead">
        <div className="wrap">
          <Crumbs items={[["Ordering & shipping", P.exports], ["Germany & EU"]]} />
          <h1>Brass components for buyers in Germany and the EU</h1>
          <p className="lead">Turned, forged and stamped brass parts made to your drawing in Jamnagar, India, and a standard range of brass cable glands and accessories. Germany is one of our key export markets; about 25 % of our output is exported, to more than 40 countries.</p>
          <dl className="strip" style={{ marginTop: "var(--s-7)" }}>
            <div><dt>Quality system</dt><dd>ISO 9001:2015<small>not IATF 16949</small></dd></div>
            <div><dt>With every batch</dt><dd>EN 10204 3.1<small>plus CoC and inspection report</small></dd></div>
            <div><dt>Quote reply</dt><dd>2 working days<small>Sat–Thu, IST</small></dd></div>
            <div><dt>Samples</dt><dd>2–3 weeks<small>free; you pay the courier</small></dd></div>
          </dl>
        </div>
      </section>
      <section className="band band--sheet"><div className="wrap">
        <div className="open"><div><h2>What we make for you</h2></div><p>Made to your drawing, or from the standard gland range. Natural, or plated in our plant: nickel, tin or zinc; silver or chrome on request.</p></div>
        <div className="hub hub--eu">
          <a href={P.category}><div className="photo"><Pic name="turned" alt="Drawing of a turned brass part" /></div><h3>Turned parts</h3><p>CNC and cam-automat turned, <M>Ø5–100 mm</M>, <M>±0.05 mm</M>; ISO 2768-m unless the drawing states otherwise.</p></a>
          <a href={P.forged}><div className="photo"><Pic name="forgedtee" alt="Drawing of a forged brass tee" /></div><h3>Forgings</h3><p>Hot-forged, then machined, <M>25 g – 1.0 kg</M>.</p></a>
          <a href={P.products}><div className="photo"><Pic name="terminal" alt="Drawing of a brass terminal block" /></div><h3>Other parts to drawing</h3><p>Fittings, moulding inserts, electrical parts, special fasteners and stampings.</p></a>
          <a href={P.glands}><div className="photo"><img src="/img/brass-cable-gland-clamping-jaw.webp" alt="Brass cable glands made in our plant" loading="lazy" /></div><h3>Cable glands</h3><p>PG (DIN 40430) and metric (EN 60423, <M>M12–M80</M>), EPDM seal, IP54, with accessories; not for Ex / ATEX areas.</p></a>
        </div>
      </div></section>
      <section className="band"><div className="wrap">
        <div className="cols2">
          <div>
            <h2 className="sub">Materials, standards and documents</h2><p className="cols2__i">What a supplier-quality engineer asks first.</p>
            <Kv rows={[
          ["Brass grades", <><M>CW614N</M> and <M>CW617N</M> as standard; on request low-lead DZR <M>CW511L</M>, lead-free <M>CW724R</M> and DZR <M>CW602N</M> · <a className="link" href={P.grades}>grade equivalents</a></>],
          ["Threads", <>Metric (ISO 261), BSP parallel (ISO 228-1) and taper (ISO 7-1), NPT (ASME B1.20.1), UNC/UNF, PG; parallel threads gauged GO / NO-GO</>],
          ["Documents with every batch", "EN 10204 3.1 mill certificate, certificate of conformity and final inspection report"],
          ["On request", "PPAP Level 3; REACH Article 33 statement (leaded brass contains lead above 0.1 %)"],
          ["RoHS", "Leaded brass is covered by RoHS Annex III exemption 6(c), currently valid until 30 June 2027 (Delegated Directive (EU) 2025/2364); lead-free CW724R on request"],
          ["Measuring and complaints", "Instruments calibrated yearly by an NABL-accredited lab; 8D report within 5 days"],
          ["Audits", <>Supplier approval and plant visits: <a className="link" href={P.contact + "?topic=visit"}>arrange a visit</a> · <a className="link" href={P.quality}>Quality</a></>],
            ]} />
          </div>
          <div>
            <h2 className="sub">Ordering and delivery to Europe</h2><p className="cols2__i">What the buyer arranges.</p>
            <Kv rows={[
          ["Drawings and NDA", "We sign your NDA before you send drawings. Tick the NDA box on the quote form."],
          ["Incoterms", <>EXW Jamnagar · FOB / CFR / CIF via Mundra or Nhava Sheva (JNPT) · air freight for samples</>],
          ["Lead times", "Samples typically 2–3 weeks; production 4–6 weeks after sample approval. Every quote confirms the lead time."],
          ["Payment and currency", "Agreed per order in the quote, including the invoice currency"],
          ["Contact hours", <>{SITE.hours}: 05:00–14:00 CET (one hour later in summer), so your mornings Monday to Thursday overlap with ours</>],
          ["Your contact", "Shree Shah, Marketing Director, for quotes and audits"],
            ]} />
          </div>
        </div>
      </div></section>
      <section className="band band--sheet"><div className="wrap side">
        <div className="sh"><h2>Questions from EU buyers</h2></div>
        <div className="sb">
          <Faq items={[
            ["Do you work to EN standards and EN material designations?", "Yes: give the EN CW grade, the ISO 2768 class and the ISO thread designations on your drawing; the quote confirms the grade and any equivalent."],
            ["Can we audit you before the first order?", <>Yes. Shree Shah arranges supplier audits and plant visits: <a className="link" href={P.contact + "?topic=visit"}>contact us</a>.</>],
            ["Do you make parts for drinking water?", "Yes, in DZR or lead-free brass on request. Approvals such as DVGW or WRAS belong to your finished product; tell us which one your drawing calls up."],
          ]} />
          <p className="tbl-note">All ordering and shipping terms: <a className="link" href={P.exports}>Ordering &amp; shipping</a>.</p>
        </div>
      </div></section>
      <section className="band"><div className="wrap"><div className="cta">
        <div><h2>Send a drawing from Germany or the EU</h2><p>Include the quantity per order and per year, your Incoterm and the destination. We reply within two working days.</p></div>
        <div className="acts"><a className="btn" href={P.rfq}>Request a quote <Arr /></a></div>
      </div></div></section>
    </main>
  );
}
