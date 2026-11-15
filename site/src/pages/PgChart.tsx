// Page markup, first converted from design/resource.html (frozen); edit here.

import "../styles/pages.css";
import "./css/PgChart.css";

export default function PgChart() {
  return (
    <>
      <main id="main">{" "}
      <section className="phead" style={{"paddingBottom": "var(--s-7)"}}>{" "}
      <div className="wrap">{" "}
      <ol className="crumbs" aria-label="Breadcrumb"><li><a href="/">Home</a></li><li><a href="/resources/">Resources</a></li><li aria-current="page">PG thread chart</li></ol>{" "}
      <div className="rhead">{" "}
      <div>{" "}
      <span className="eyebrow" style={{"display": "block"}}>DIN 40430</span><h1>PG thread chart</h1>{" "}
      <p className="lead">The PG thread (Panzergewinde) is a German conduit thread with an 80° flank angle and a shallow profile. It's still found on many cable glands, enclosures and replacement parts, although new designs mostly use metric threads to EN 60423.</p>{" "}
      <dl className="kv" style={{"marginTop": "var(--s-5)"}}>{" "}
      <dt>Standard</dt><dd>DIN 40430</dd>{" "}
      <dt>Flank angle</dt><dd className="mono">80°</dd>{" "}
      <dt>Pitches</dt><dd className="mono">1.270 · 1.411 · 1.588 mm</dd>{" "}
      <dt>Sizes</dt><dd className="mono">PG 7–48</dd>{" "}
      </dl>{" "}
      <div className="prod__cta" style={{"marginTop": "var(--s-6)"}}><a className="btn btn--ghost" href="/products/brass-cable-glands/">PG cable glands</a></div>{" "}
      </div>{" "}
      <figure>{" "}
      <div className="frame">{" "}
      <svg className="dwg draw" viewBox="0 36 330 190" role="img" aria-label="PG thread profile to DIN 40430: 80 degree included flank angle, pitch P, thread depth t, outside diameter d at the crests and core diameter d1 at the roots">{" "}
      <defs><marker id="pa" viewBox="0 0 10 10" refX="10" refY="5" markerWidth="7" markerHeight="7" orient="auto-start-reverse"><path d="M0 1.5L10 5L0 8.5z" fill="#5F656E" /></marker>{" "}
      <marker id="pd" viewBox="0 0 10 10" refX="5" refY="5" markerWidth="5" markerHeight="5"><circle cx="5" cy="5" r="4" fill="#5F656E" /></marker>{" "}
      <pattern id="ph" width="7" height="7" patternUnits="userSpaceOnUse" patternTransform="rotate(45)"><line x1="0" y1="0" x2="0" y2="7" stroke="#B8862F" strokeWidth="1.1" /></pattern></defs>{" "}
      <path id="prof" className="fill" d="M14 90Q20 86 30.35 90L74.65 143Q80 147 85.35 143L129.65 90Q135 86 140.35 90L184.65 143Q190 147 195.35 143L239.65 90Q245 86 250.35 90L294.65 143Q300 147 305.35 143L310 137.4V196H14Z" />{" "}
      <path fill="url(#ph)" d="M14 90Q20 86 30.35 90L74.65 143Q80 147 85.35 143L129.65 90Q135 86 140.35 90L184.65 143Q190 147 195.35 143L239.65 90Q245 86 250.35 90L294.65 143Q300 147 305.35 143L310 137.4V196H14Z" />{" "}
      <path className="o" d="M14 90Q20 86 30.35 90L74.65 143Q80 147 85.35 143L129.65 90Q135 86 140.35 90L184.65 143Q190 147 195.35 143L239.65 90Q245 86 250.35 90L294.65 143Q300 147 305.35 143L310 137.4" />{" "}
      <line className="c" x1="6" y1="212" x2="322" y2="212" />{" "}
      {" "}
      <path className="d" d="M25 84V52M135 84V52" /><line className="d" x1="25" y1="58" x2="135" y2="58" markerStart="url(#pa)" markerEnd="url(#pa)" /><text className="dt" x="80" y="52" textAnchor="middle">P</text>{" "}
      {" "}
      <path className="d" d="M54.3 118.7A40 40 0 0 1 105.7 118.7" /><text className="dt" x="80" y="104" textAnchor="middle">80°</text>{" "}
      {" "}
      <path className="d" d="M256 90H326M306 143H326" /><line className="d" x1="320" y1="90" x2="320" y2="143" markerStart="url(#pa)" markerEnd="url(#pa)" /><text className="dt" x="312" y="122" textAnchor="end">t</text>{" "}
      {" "}
      <path className="d" d="M245 87L262 66H286" markerStart="url(#pd)" /><text className="dt" x="266" y="62">d</text>{" "}
      <path className="d" d="M190 145L214 176H236" markerStart="url(#pd)" /><rect x="216" y="166" width="22" height="14" fill="#fff" /><text className="dt" x="218" y="177">d1</text>{" "}
      </svg>{" "}
      </div>{" "}
      <figcaption><span className="mono">d</span>{" "}outside Ø ·{" "}<span className="mono">d1</span>{" "}core Ø ·{" "}<span className="mono">P</span>{" "}pitch ·{" "}<span className="mono">t</span>{" "}thread depth = (d − d1) / 2 ≈ 0.48 P · crests and roots rounded</figcaption>{" "}
      </figure>{" "}
      </div>{" "}
      </div>{" "}
      </section>{" "}
      <section className="band" id="chart">{" "}
      <div className="wrap">{" "}
      <div className="open"><div><h2>PG thread sizes</h2></div><p>All values in mm. Through-hole is the recommended clearance hole in the enclosure wall.</p></div>{" "}
      <div className="tbl"><table className="spec">
      <thead><tr><th className="stick">Size</th><th className="n">Outside Ø{" "}<span className="s">d</span></th><th className="n">Core Ø{" "}<span className="s">d1</span></th><th className="n">Pitch{" "}<span className="s">P</span></th><th className="n">Threads / inch</th><th className="n">Through-hole</th></tr></thead>
      <tbody>
      <tr><td className="stick mono">PG 7</td><td className="n">12.50</td><td className="n">11.28</td><td className="n">1.270</td><td className="n">20</td><td className="n">12.7</td></tr>
      <tr><td className="stick mono">PG 9</td><td className="n">15.20</td><td className="n">13.86</td><td className="n">1.411</td><td className="n">18</td><td className="n">15.4</td></tr>
      <tr><td className="stick mono">PG 11</td><td className="n">18.60</td><td className="n">17.26</td><td className="n">1.411</td><td className="n">18</td><td className="n">18.8</td></tr>
      <tr><td className="stick mono">PG 13.5</td><td className="n">20.40</td><td className="n">19.06</td><td className="n">1.411</td><td className="n">18</td><td className="n">20.7</td></tr>
      <tr><td className="stick mono">PG 16</td><td className="n">22.50</td><td className="n">21.16</td><td className="n">1.411</td><td className="n">18</td><td className="n">22.8</td></tr>
      <tr><td className="stick mono">PG 21</td><td className="n">28.30</td><td className="n">26.78</td><td className="n">1.588</td><td className="n">16</td><td className="n">28.6</td></tr>
      <tr><td className="stick mono">PG 29</td><td className="n">37.00</td><td className="n">35.48</td><td className="n">1.588</td><td className="n">16</td><td className="n">37.4</td></tr>
      <tr><td className="stick mono">PG 36</td><td className="n">47.00</td><td className="n">45.48</td><td className="n">1.588</td><td className="n">16</td><td className="n">47.5</td></tr>
      <tr><td className="stick mono">PG 42</td><td className="n">54.00</td><td className="n">52.48</td><td className="n">1.588</td><td className="n">16</td><td className="n">54.5</td></tr>
      <tr><td className="stick mono">PG 48</td><td className="n">59.30</td><td className="n">57.78</td><td className="n">1.588</td><td className="n">16</td><td className="n">59.8</td></tr>
      </tbody>
      </table></div>{" "}
      <p className="tbl-note">Values to DIN 40430. Through-hole values are recommendations for the enclosure wall.{" "}</p>{" "}
      </div>{" "}
      </section>{" "}
      <section className="band band--sheet" id="pg-to-metric">{" "}
      <div className="wrap side">{" "}
      <div className="sh"><h2>Replacing PG with metric</h2><p>Common metric replacements; where a PG size falls between two metric sizes, both are given. Always check the enclosure hole and the cable clamping range.</p></div>{" "}
      <div className="sb"><div className="tbl"><table className="spec">
      <thead><tr><th className="stick">PG size</th><th className="n">PG outside Ø</th><th>Metric replacement (EN 60423)</th></tr></thead>
      <tbody>
      <tr><td className="stick mono">PG 7</td><td className="n">12.5</td><td className="mono">M12×1.5</td></tr>
      <tr><td className="stick mono">PG 9</td><td className="n">15.2</td><td className="mono">M16×1.5</td></tr>
      <tr><td className="stick mono">PG 11</td><td className="n">18.6</td><td className="mono">M20×1.5</td></tr>
      <tr><td className="stick mono">PG 13.5</td><td className="n">20.4</td><td className="mono">M20×1.5</td></tr>
      <tr><td className="stick mono">PG 16</td><td className="n">22.5</td><td className="mono">M20×1.5 or M25×1.5</td></tr>
      <tr><td className="stick mono">PG 21</td><td className="n">28.3</td><td className="mono">M25×1.5 or M32×1.5</td></tr>
      <tr><td className="stick mono">PG 29</td><td className="n">37.0</td><td className="mono">M40×1.5</td></tr>
      <tr><td className="stick mono">PG 36</td><td className="n">47.0</td><td className="mono">M50×1.5</td></tr>
      <tr><td className="stick mono">PG 42</td><td className="n">54.0</td><td className="mono">M50×1.5 or M63×1.5</td></tr>
      <tr><td className="stick mono">PG 48</td><td className="n">59.3</td><td className="mono">M63×1.5</td></tr>
      </tbody>
      </table></div>{" "}
      <p className="tbl-note">Choice depends on the enclosure hole and the gland range.{" "}<a className="link" href="/products/brass-cable-glands/thread-adapters/">Adapters and reducers</a>{" "}join PG and metric entries.</p></div>{" "}
      </div>{" "}
      </section>{" "}
      <section className="band">{" "}
      <div className="wrap side">{" "}
      <div className="sh"><h2 className="sub">More technical data</h2></div>{" "}
      <div className="sb"><p className="muted"><a className="link" href="/resources/metric-cable-gland-thread-chart/">Metric thread chart</a>{" "}(EN 60423) ·{" "}<a className="link" href="/resources/bsp-thread-chart/">BSP thread chart</a>{" "}(ISO 228-1) ·{" "}<a className="link" href="/resources/npt-thread-chart/">NPT thread chart</a>{" "}(ASME B1.20.1) ·{" "}<a className="link" href="/resources/brass-grade-equivalents/">Brass grade equivalents</a></p></div>{" "}
      </div>{" "}
      </section>{" "}
      <section className="band band--sheet">{" "}
      <div className="wrap"><div className="cta"><div><h2>Need PG glands, lock nuts or adapters?</h2><p>PG glands and accessories in brass, natural or plated.</p></div><div className="acts"><a className="btn" href="/products/brass-cable-glands/">See cable glands{" "}<span className="arr" aria-hidden="true">→</span></a><a className="btn btn--ghost" href="/rfq/">Request a quote</a></div></div></div>{" "}
      </section>{" "}
      </main>
    </>
  );
}
