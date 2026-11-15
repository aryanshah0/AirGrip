// Page markup, first converted from design/product.html (frozen); edit here.

import "../styles/pages.css";
import "./css/PressureScrew.css";
import { AddQ } from "../components/AddQ";
import { PartCode } from "../components/Family";

export default function PressureScrew() {
  return (
    <>
      <main id="main">{" "}
      <section className="band--tight" style={{"paddingTop": "var(--s-6)"}}>{" "}
      <div className="wrap">{" "}
      <ol className="crumbs" aria-label="Breadcrumb"><li><a href="/">Home</a></li><li><a href="/products/">Products</a></li><li><a href="/products/brass-cable-glands/">Brass cable glands</a></li><li aria-current="page">Pressure screws</li></ol>{" "}
      <div className="prod" style={{"marginTop": "var(--s-5)"}}>{" "}
      <figure className="prod__fig" style={{"margin": "0"}}>{" "}
      <div className="sheet"><div className="frame">{" "}
      <img src="/img/la/l/pscrew.svg" alt="Brass pressure screw: half-section and end view" width="240" height="160" style={{"width": "100%", "height": "auto"}} />{" "}
      </div></div>{" "}
      <p className="tbl-note">Pressure screw in half-section, with end view.</p>{" "}
      <div className="prod__thumbs">{" "}
      <div className="photo"><img src="/img/pressure-screw.webp" alt="Brass pressure screw" width="495" height="353" /></div>{" "}
      </div>{" "}
      </figure>{" "}
      <div className="prod__info">{" "}
      <span className="eyebrow">Brass cable glands ·{" "}<span className="mono" style={{"letterSpacing": "0"}}>AG-PS</span></span>{" "}
      <h1>Brass pressure screws for cable glands</h1>{" "}
      <p className="lead">The pressure screw is the part of a cable gland that is screwed to the gland body: it compresses the seal around the cable and holds it against pull-out.</p>{" "}
      <dl className="kv">{" "}
      <dt>Thread</dt><dd><span className="mono">PG 7–48</span>{" "}(DIN 40430) ·{" "}<span className="mono">M12–M80</span>{" "}metric</dd>{" "}
      <dt>Material</dt><dd>Brass CuZn39Pb3 (<span className="mono">CW614N</span>); lead-free on request</dd>{" "}
      <dt>Finish</dt><dd>Natural, or plated in our plant: nickel, tin or zinc</dd>{" "}
      <dt>Part code</dt><dd><span className="mono nw">AG-PS-[size]-[finish]</span>, e.g.{" "}<span className="mono nw">AG-PS-PG09-NI</span></dd>{" "}
      </dl>{" "}
      <div className="prod__cta">{" "}
      <a className="btn" href="#dimensions">Choose sizes{" "}<span className="arr" aria-hidden="true">↓</span></a>{" "}
      </div>{" "}
      </div>{" "}
      </div>{" "}
      </div>{" "}
      </section>{" "}
      <nav className="subnav" aria-label="On this page"><div className="wrap"><a className="on" href="#dimensions">Sizes</a><a href="#material">Material &amp; compliance</a><a href="#faq">Questions</a></div></nav>{" "}
      <section className="band" id="dimensions">{" "}
      <div className="wrap">{" "}
      <div className="open"><div><h2>Sizes and part codes</h2></div><p>All values in mm. Add sizes to your quote and send them in one request.</p></div>{" "}
      <div className="dims">{" "}
      <details className="dimkey" open><summary>Dimension key</summary><figure>{" "}
      <div className="frame">{" "}
      <svg className="dwg" viewBox="28 128 382 274" aria-hidden="true">{" "}
      <defs><marker id="ga" viewBox="0 0 10 10" refX="10" refY="5" markerWidth="7" markerHeight="7" orient="auto-start-reverse"><path d="M0 1.5L10 5L0 8.5z" fill="#5F656E" /></marker></defs>{" "}
      <line className="c" x1="150" y1="156" x2="150" y2="316" />{" "}
      <path className="o" d="M150 170H168Q194 174 196 200V300H104V200Q106 174 132 170H150M104 251H196" />{" "}
      <path className="h" d="M121 300V262M179 300V262M132 176V262M168 176V262M121 262H179" />{" "}
      <path className="d" d="M172 170H270M200 300H270M100 300H52M114 262H52M132 166V138M168 166V138" />{" "}
      <path className="d" d="M262 170V300M60 262V300M132 146H168M299 318H391" markerStart="url(#ga)" markerEnd="url(#ga)" />{" "}
      <path className="d" d="M216 282H179" markerEnd="url(#ga)" />{" "}
      <line className="c" x1="345" y1="166" x2="345" y2="294" /><line className="c" x1="283" y1="230" x2="407" y2="230" />{" "}
      <path className="o" d="M299 203.4L345 176.9L391 203.4V256.6L345 283.1L299 256.6Z" /><circle className="o" cx="345" cy="230" r="22" />{" "}
      <path className="d" d="M299 260V326M391 260V326" />{" "}
      <text className="dt" x="268" y="240">L</text><text className="dt" x="34" y="286">GL</text><text className="dt" x="337" y="312">AF</text><text className="dt" x="146" y="138">D</text><text className="dt" x="220" y="286">T</text>{" "}
      </svg>{" "}
      </div>{" "}
      <figcaption><span className="mono">T</span>{" "}thread (PG or metric) ·{" "}<span className="mono">AF</span>{" "}across flats ·{" "}<span className="mono">L</span>{" "}overall length ·{" "}<span className="mono">GL</span>{" "}thread length ·{" "}<span className="mono">D</span>{" "}cable passage</figcaption>{" "}
      </figure></details>{" "}
      <div>{" "}
      <div className="seg" role="tablist" aria-label="Thread system">{" "}
      <button role="tab" id="t-pg" aria-selected="true" aria-controls="p-pg">PG · DIN 40430</button>{" "}
      <button role="tab" id="t-m" aria-selected="false" aria-controls="p-m" tabIndex={-1}>Metric</button>{" "}
      </div>{" "}
      <div role="tabpanel" id="p-pg" aria-labelledby="t-pg">{" "}
      <div className="tbl"><table className="spec">
      <caption className="sr-only">Pressure screws, PG sizes</caption>
      <thead><tr><th className="stick">Part code</th><th className="n">Thread</th><th className="n"><span className="s">AF</span></th><th className="n"><span className="s">L</span></th><th className="n"><span className="s">GL</span></th><th className="n"><span className="s">D</span></th></tr></thead>
      <tbody>
      <tr><td className="stick"><PartCode code="AG-PS-PG07" /><AddQ code="AG-PS-PG07" label="Pressure screw PG 7" /></td><td className="n">PG 7</td><td className="n ondata">—</td><td className="n ondata">—</td><td className="n ondata">—</td><td className="n ondata">—</td></tr>
      <tr><td className="stick"><PartCode code="AG-PS-PG09" /><AddQ code="AG-PS-PG09" label="Pressure screw PG 9" /></td><td className="n">PG 9</td><td className="n">17.0</td><td className="n">17.0</td><td className="n">6.0</td><td className="n">10.0</td></tr>
      <tr><td className="stick"><PartCode code="AG-PS-PG11" /><AddQ code="AG-PS-PG11" label="Pressure screw PG 11" /></td><td className="n">PG 11</td><td className="n">20.0</td><td className="n">18.0</td><td className="n">6.0</td><td className="n">11.6</td></tr>
      <tr><td className="stick"><PartCode code="AG-PS-PG13" /><AddQ code="AG-PS-PG13" label="Pressure screw PG 13.5" /></td><td className="n">PG 13.5</td><td className="n">22.0</td><td className="n">19.0</td><td className="n">6.0</td><td className="n">13.6</td></tr>
      <tr><td className="stick"><PartCode code="AG-PS-PG16" /><AddQ code="AG-PS-PG16" label="Pressure screw PG 16" /></td><td className="n">PG 16</td><td className="n">24.0</td><td className="n">19.0</td><td className="n">6.0</td><td className="n">15.6</td></tr>
      <tr><td className="stick"><PartCode code="AG-PS-PG21" /><AddQ code="AG-PS-PG21" label="Pressure screw PG 21" /></td><td className="n">PG 21</td><td className="n">30.0</td><td className="n">20.0</td><td className="n">7.0</td><td className="n">21.0</td></tr>
      <tr><td className="stick"><PartCode code="AG-PS-PG29" /><AddQ code="AG-PS-PG29" label="Pressure screw PG 29" /></td><td className="n">PG 29</td><td className="n">40.0</td><td className="n">23.0</td><td className="n">8.0</td><td className="n">30.0</td></tr>
      <tr><td className="stick"><PartCode code="AG-PS-PG36" /><AddQ code="AG-PS-PG36" label="Pressure screw PG 36" /></td><td className="n">PG 36</td><td className="n ondata">—</td><td className="n ondata">—</td><td className="n ondata">—</td><td className="n ondata">—</td></tr>
      <tr><td className="stick"><PartCode code="AG-PS-PG42" /><AddQ code="AG-PS-PG42" label="Pressure screw PG 42" /></td><td className="n">PG 42</td><td className="n ondata">—</td><td className="n ondata">—</td><td className="n ondata">—</td><td className="n ondata">—</td></tr>
      <tr><td className="stick"><PartCode code="AG-PS-PG48" /><AddQ code="AG-PS-PG48" label="Pressure screw PG 48" /></td><td className="n">PG 48</td><td className="n ondata">—</td><td className="n ondata">—</td><td className="n ondata">—</td><td className="n ondata">—</td></tr>
      </tbody>
      </table></div>{" "}
      <p className="tbl-note">Dimensions for reference; the drawing supplied with your quote governs. — = dimensions with your quote. Finish suffix:{" "}<span className="mono">-N</span>{" "}natural ·{" "}<span className="mono">-NI</span>{" "}nickel ·{" "}<span className="mono">-SN</span>{" "}tin ·{" "}<span className="mono">-ZN</span>{" "}zinc.</p>{" "}
      </div>{" "}
      <div role="tabpanel" id="p-m" aria-labelledby="t-m" hidden>{" "}
      <div className="tbl"><table className="spec">
      <caption className="sr-only">Pressure screws, metric sizes</caption>
      <thead><tr><th className="stick">Part code</th><th className="n">Thread</th><th>Dimensions</th></tr></thead>
      <tbody>
      <tr><td className="stick"><PartCode code="AG-PS-M12" /><AddQ code="AG-PS-M12" label="Pressure screw M12×1.5" /></td><td className="n">M12×1.5</td><td className="n ondata">—</td></tr>
      <tr><td className="stick"><PartCode code="AG-PS-M16" /><AddQ code="AG-PS-M16" label="Pressure screw M16×1.5" /></td><td className="n">M16×1.5</td><td className="n ondata">—</td></tr>
      <tr><td className="stick"><PartCode code="AG-PS-M20" /><AddQ code="AG-PS-M20" label="Pressure screw M20×1.5" /></td><td className="n">M20×1.5</td><td className="n ondata">—</td></tr>
      <tr><td className="stick"><PartCode code="AG-PS-M25" /><AddQ code="AG-PS-M25" label="Pressure screw M25×1.5" /></td><td className="n">M25×1.5</td><td className="n ondata">—</td></tr>
      <tr><td className="stick"><PartCode code="AG-PS-M32" /><AddQ code="AG-PS-M32" label="Pressure screw M32×1.5" /></td><td className="n">M32×1.5</td><td className="n ondata">—</td></tr>
      <tr><td className="stick"><PartCode code="AG-PS-M40" /><AddQ code="AG-PS-M40" label="Pressure screw M40×1.5" /></td><td className="n">M40×1.5</td><td className="n ondata">—</td></tr>
      <tr><td className="stick"><PartCode code="AG-PS-M50" /><AddQ code="AG-PS-M50" label="Pressure screw M50×1.5" /></td><td className="n">M50×1.5</td><td className="n ondata">—</td></tr>
      <tr><td className="stick"><PartCode code="AG-PS-M63" /><AddQ code="AG-PS-M63" label="Pressure screw M63×1.5" /></td><td className="n">M63×1.5</td><td className="n ondata">—</td></tr>
      <tr><td className="stick"><PartCode code="AG-PS-M80" /><AddQ code="AG-PS-M80" label="Pressure screw M80" /></td><td className="n">M80</td><td className="n ondata">—</td></tr>
      </tbody>
      </table></div>{" "}
      <p className="tbl-note">Sizes PG 7–48 and M12–M80. Dimensions for every size come with the drawing supplied with your quote.</p>{" "}
      </div>{" "}
      </div>{" "}
      </div>{" "}
      </div>{" "}
      </section>{" "}
      <section className="band band--sheet" id="material">{" "}
      <div className="wrap side">{" "}
      <div className="sh"><h2>Material &amp; compliance</h2><p>Free-cutting brass CW614N as standard. Low-lead (CW511L) and lead-free (CW724R) grades on request.</p></div>{" "}
      <div className="sb cols">{" "}
      <div>{" "}
      <dl className="kv"><dt>Copper</dt><dd className="mono">57.0–59.0 %</dd><dt>Lead</dt><dd className="mono">2.5–3.5 %</dd><dt>Zinc</dt><dd>Remainder (CW614N, EN 12164)</dd></dl>{" "}
      <p className="tbl-note">Equivalents: CZ121Pb3 (BS 2874) · C38500 (ASTM B455) · IS 319.{" "}<a className="link" href="/resources/brass-grade-equivalents/">Brass grade equivalents</a></p>{" "}
      </div>{" "}
      <div>{" "}
      <dl className="kv">{" "}
      <dt>RoHS</dt><dd>Leaded brass is covered by Annex III exemption 6(c) (copper alloys with up to 4 % lead)</dd>{" "}
      <dt>REACH</dt><dd>Lead is a candidate-list substance; REACH statement on request</dd>{" "}
      <dt>Material cert.</dt><dd>EN 10204 3.1 mill certificate with every batch</dd>{" "}
      </dl>{" "}
      <h3 className="h4" style={{"marginTop": "var(--s-6)", "marginBottom": "var(--s-3)"}}>Options</h3>{" "}
      <ul className="bullets">{" "}
      <li><span>Threads: PG or metric</span></li>{" "}
      <li><span>Bulk or single-piece packing, labelled by lot</span></li>{" "}
      <li><span>Your part number on the label</span></li>{" "}
      </ul>{" "}
      </div>{" "}
      </div>{" "}
      </div>{" "}
      </section>{" "}
      <section className="band" id="faq">{" "}
      <div className="wrap side">{" "}
      <div className="sh"><h2>Pressure screws: questions</h2></div>{" "}
      <div className="sb faq">{" "}
      <details open><summary>Can you supply lead-free pressure screws?</summary><div>Yes, in lead-free brass on request. Say so in the quote request.</div></details>{" "}
      <p className="tbl-note">MOQ, lead times and delivery terms:{" "}<a className="link" href="/exports/">Ordering &amp; shipping</a>.</p>{" "}
      </div>{" "}
      </div>{" "}
      </section>{" "}
      </main>
    </>
  );
}
