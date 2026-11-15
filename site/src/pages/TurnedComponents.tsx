// Page markup, first converted from design/category.html (frozen); edit here.

import "../styles/pages.css";
import "./css/TurnedComponents.css";
import { Plate } from "../components/blocks";

export default function TurnedComponents() {
  return (
    <>
      <main id="main">{" "}
      <section className="band--tight" style={{"paddingTop": "var(--s-6)"}}>{" "}
      <div className="wrap">{" "}
      <ol className="crumbs" aria-label="Breadcrumb"><li><a href="/">Home</a></li><li><a href="/products/">Products</a></li><li aria-current="page">Brass turned components</li></ol>{" "}
      <div className="chead">{" "}
      <div>{" "}
      <h1>Brass turned components, made to drawing</h1>{" "}
      <p className="lead">Precision CNC and cam-automat turned brass parts, made in Jamnagar, India, from brass bar to your drawing: bushes, pins, spacers, nozzles, inserts and connector bodies. CNC for complex parts and short runs; cam automats and special-purpose machines for long runs.</p>{" "}
      <div className="prod__cta"><a className="btn" href="/rfq/">Send a drawing{" "}<span className="arr" aria-hidden="true">→</span></a><a className="btn btn--ghost" href="#process">Which process?</a></div>{" "}
      <div style={{ marginTop: "var(--s-6)" }}><Plate drawing={<div className="sheet3" style={{ marginTop: 0 }}><div style={{"gridTemplateColumns": "1fr"}}><img src="/img/la/l/turned.svg" alt="Drawing of a turned brass shaft with threaded spigot, groove, collar and knurl" /></div></div>} photos={[["02-Product-We-Manufactur.webp", "Brass turned parts"]]} /></div>{" "}
      </div>{" "}
      <dl className="kv">{" "}
      <dt>Diameter</dt><dd className="mono">Ø5–100 mm</dd>{" "}
      <dt>Length</dt><dd className="mono">≤ 100 mm</dd>{" "}
      <dt>Tolerance</dt><dd><span className="mono">±0.05 mm</span>, run-out{" "}<span className="mono">0.05</span>. Fits tighter than ±0.05 mm: send the drawing; the quote says whether we can hold them.</dd>{" "}
      <dt>Material</dt><dd><span className="mono">CW614N</span>,{" "}<span className="mono">CW617N</span>; lead-free and DZR on request</dd>{" "}
      <dt>Threads</dt><dd className="mono">M · BSP/BSPT · NPT · UNC/UNF · PG · BA · BSW</dd>{" "}
      <dt>Finish</dt><dd>Natural, or plated in our plant: nickel, tin or zinc; silver or chrome on request</dd>{" "}
      <dt>Gen. tolerance</dt><dd><span className="mono">ISO 2768-m</span>{" "}unless the drawing states otherwise · parallel threads gauged GO / NO-GO</dd>{" "}
      </dl>{" "}
      </div>{" "}
      </div>{" "}
      </section>{" "}
      <nav className="subnav" aria-label="On this page"><div className="wrap"><a className="on" href="#parts">Typical parts</a><a href="#process">Which machine</a><a href="#materials">Materials</a><a href="#faq">Questions</a></div></nav>{" "}
      <section className="band" id="parts">{" "}
      <div className="wrap">{" "}
      <div className="open"><div><h2>Typical turned parts</h2></div><p>Representative shapes, drawn as half-sections or exterior views (not to a common scale).</p></div>{" "}
      <div className="gal">{" "}
      <figure><div className="photo"><picture><source media="(max-width: 559px)" srcSet="/img/la/t/connector.svg" /><img src="/img/la/connector.svg" alt="Connector body drawing" loading="lazy" /></picture></div><figcaption>Connector body<span className="mono">Ø18 · M10 · knurled · bore Ø6</span></figcaption></figure>{" "}
      <figure><div className="photo"><picture><source media="(max-width: 559px)" srcSet="/img/la/t/nozzle.svg" /><img src="/img/la/nozzle.svg" alt="Hose nozzle drawing" loading="lazy" /></picture></div><figcaption>Hose nozzle<span className="mono">G 3/8 · hex · triple barb</span></figcaption></figure>{" "}
      <figure><div className="photo"><picture><source media="(max-width: 559px)" srcSet="/img/la/t/bush.svg" /><img src="/img/la/bush.svg" alt="Flanged bush drawing" loading="lazy" /></picture></div><figcaption>Flanged bush<span className="mono">Ø30 flange · bore Ø13</span></figcaption></figure>{" "}
      <figure><div className="photo"><picture><source media="(max-width: 559px)" srcSet="/img/la/t/housing.svg" /><img src="/img/la/housing.svg" alt="Sensor housing drawing" loading="lazy" /></picture></div><figcaption>Sensor housing<span className="mono">Ø26 · M18×1.5 · knurled</span></figcaption></figure>{" "}
      <figure><div className="photo"><picture><source media="(max-width: 559px)" srcSet="/img/la/t/spindle.svg" /><img src="/img/la/spindle.svg" alt="Valve spindle drawing" loading="lazy" /></picture></div><figcaption>Valve spindle<span className="mono">Ø8 · M6 · L 64</span></figcaption></figure>{" "}
      <figure><div className="photo"><picture><source media="(max-width: 559px)" srcSet="/img/la/t/spacer.svg" /><img src="/img/la/spacer.svg" alt="Hex spacer drawing" loading="lazy" /></picture></div><figcaption>Hex spacer<span className="mono">AF 10 · M5 · L 25</span></figcaption></figure>{" "}
      </div>{" "}
      </div>{" "}
      </section>{" "}
      <section className="band band--sheet" id="process">{" "}
      <div className="wrap">{" "}
      <div className="open"><div><h2>Which machine makes your part</h2></div><p>We choose the process that gives the lowest cost at your volume, and explain the choice in the quote.</p></div>{" "}
      <div className="tbl"><table className="spec stack-m">
      <thead><tr><th className="stick">Process</th><th>Best for</th><th>Range</th><th>Runs</th><th>Notes</th></tr></thead>
      <tbody>
      <tr><td className="stick" data-l="Process"><b>CNC turning</b></td><td data-l="Best for">Complex profiles, several features in one set-up, frequent changeovers</td><td className="c mono" data-l="Range">Ø5–100 mm</td><td data-l="Runs">Samples to medium volume</td><td data-l="Notes">Cross-holes and flats in a second operation</td></tr>
      <tr><td className="stick" data-l="Process"><b>Cam automats</b></td><td data-l="Best for">Simple to medium parts in long runs</td><td className="c" data-l="Range">Small to medium bar</td><td data-l="Runs">High volume</td><td data-l="Notes">Lowest piece price once tooled</td></tr>
      <tr><td className="stick" data-l="Process"><b>Special-purpose machines</b></td><td data-l="Best for">Single operations on large batches: drilling, threading, slotting</td><td className="c" data-l="Range">—</td><td data-l="Runs">High volume</td><td data-l="Notes">Built in-house</td></tr>
      <tr><td className="stick" data-l="Process"><b>Forging, then machining</b></td><td data-l="Best for">Bodies with side branches or large flanges</td><td className="c mono" data-l="Range">25 g – 1.0 kg</td><td data-l="Runs">Medium to high</td><td data-l="Notes">Uses less material than bar</td></tr>
      </tbody>
      </table></div>{" "}
      <div style={{"marginTop": "var(--s-8)", "maxWidth": "72ch"}}>{" "}
      <p><a className="more" href="/capabilities/">All processes &amp; machines{" "}<span aria-hidden="true">→</span></a></p>{" "}
      </div>{" "}
      </div>{" "}
      </section>{" "}
      <section className="band" id="materials">{" "}
      <div className="wrap side">{" "}
      <div className="sh"><h2>Brass grades we machine</h2><p>Rod is bought from approved mills with a test certificate for every heat, and checked on arrival.</p></div>{" "}
      <div className="sb">{" "}
      <div className="tbl"><table className="spec stack-m">
      <thead><tr><th className="stick">EN grade</th><th>Designation</th><th>Character</th><th>Typical use</th><th>Supply</th></tr></thead>
      <tbody>
      <tr><td className="stick mono" data-l="EN grade">CW614N</td><td className="mono" data-l="Designation">CuZn39Pb3</td><td data-l="Character">Free-cutting, best machinability</td><td data-l="Typical use">Turned parts, cable glands, inserts</td><td data-l="Supply">Standard</td></tr>
      <tr><td className="stick mono" data-l="EN grade">CW617N</td><td className="mono" data-l="Designation">CuZn40Pb2</td><td data-l="Character">Hot-forging brass</td><td data-l="Typical use">Forged bodies, fittings</td><td data-l="Supply">Standard</td></tr>
      <tr><td className="stick mono" data-l="EN grade">CW602N</td><td className="mono" data-l="Designation">CuZn36Pb2As</td><td data-l="Character">Dezincification-resistant (DZR)</td><td data-l="Typical use">Drinking-water fittings</td><td data-l="Supply">On request</td></tr>
      <tr><td className="stick mono" data-l="EN grade">CW511L</td><td className="mono" data-l="Designation">CuZn38As</td><td data-l="Character">Low-lead, DZR</td><td data-l="Typical use">Drinking-water, lead-free markets</td><td data-l="Supply">On request</td></tr>
      <tr><td className="stick mono" data-l="EN grade">CW724R</td><td className="mono" data-l="Designation">CuZn21Si3P</td><td data-l="Character">Lead-free, high strength</td><td data-l="Typical use">Lead-free turned parts</td><td data-l="Supply">On request</td></tr>
      </tbody>
      </table></div>{" "}
      <p className="tbl-note">Indian, British and US equivalents:{" "}<a className="link" href="/resources/brass-grade-equivalents/">brass grade equivalents</a>.</p>{" "}
      </div>{" "}
      </div>{" "}
      </section>{" "}
      <section className="band band--sheet" id="faq">{" "}
      <div className="wrap side">{" "}
      <div className="sh"><h2>Buying turned brass parts from AirGrip</h2></div>{" "}
      <div className="sb faq">{" "}
      <details open><summary>What do you need for a quote?</summary><div>A drawing (PDF is fine; STEP helps), the material, finish, quantity per order and expected annual volume. If you only have a sample, send it and we'll work from it.</div></details>{" "}
      <details><summary>Which documents come with a batch?</summary><div>EN 10204 3.1 mill certificate, certificate of conformity and final inspection report with every batch; PPAP Level 3 on request. Full list:{" "}<a className="link" href="/quality/#documents">Quality</a>.</div></details>{" "}
      <p className="tbl-note">Samples, lead times, NDA and delivery terms:{" "}<a className="link" href="/exports/">Ordering &amp; shipping</a>.</p>{" "}
      </div>{" "}
      </div>{" "}
      </section>{" "}
      <section className="band">{" "}
      <div className="wrap">{" "}
      <div className="open"><div><h2 className="sub">Related</h2></div></div>{" "}
      <div className="rel">{" "}
      <a href="/products/brass-forged-components/"><div className="photo"><picture><source media="(max-width: 559px)" srcSet="/img/la/t/forgedtee.svg" /><img src="/img/la/forgedtee.svg" alt="" loading="lazy" /></picture></div><b>Forged brass components</b><span>25 g – 1.0 kg</span></a>{" "}
      <a href="/products/brass-fittings/"><div className="photo"><picture><source media="(max-width: 559px)" srcSet="/img/la/t/elbow.svg" /><img src="/img/la/elbow.svg" alt="" loading="lazy" /></picture></div><b>Brass fittings</b><span>BSP · NPT</span></a>{" "}
      <a href="/products/brass-moulding-inserts/"><div className="photo"><picture><source media="(max-width: 559px)" srcSet="/img/la/t/insert.svg" /><img src="/img/la/insert.svg" alt="" loading="lazy" /></picture></div><b>Moulding inserts</b><span>Knurled, threaded</span></a>{" "}
      <a href="/products/brass-electrical-terminals/"><div className="photo"><picture><source media="(max-width: 559px)" srcSet="/img/la/t/terminal.svg" /><img src="/img/la/terminal.svg" alt="" loading="lazy" /></picture></div><b>Electrical terminals &amp; connectors</b><span>Made to drawing</span></a>{" "}
      </div>{" "}
      <div className="cta" style={{"marginTop": "var(--s-8)"}}>{" "}
      <div><h2>Have a turned part to quote?</h2><p>Send the drawing with quantities. You get price, lead time and any cost-saving suggestions in the quote.</p></div>{" "}
      <div className="acts"><a className="btn" href="/rfq/">Send a drawing{" "}<span className="arr" aria-hidden="true">→</span></a></div>{" "}
      </div>{" "}
      </div>{" "}
      </section>{" "}
      </main>
    </>
  );
}
