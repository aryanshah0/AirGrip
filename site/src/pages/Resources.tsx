// Page markup, first converted from design/resources.html (frozen); edit here.

import "../styles/pages.css";
import "./css/Resources.css";

export default function Resources() {
  return (
    <>
      <main id="main">{" "}
      <section className="phead">{" "}
      <div className="wrap">{" "}
      <ol className="crumbs" aria-label="Breadcrumb"><li><a href="/">Home</a></li><li aria-current="page">Resources</li></ol>{" "}
      <h1>Technical resources</h1>{" "}
      <p className="lead">Technical data for engineers and buyers. Free to use and print.</p>{" "}
      </div>{" "}
      </section>{" "}
      <section className="band" id="threads">{" "}
      <div className="wrap">{" "}
      <div className="res">{" "}
      <a href="/resources/pg-thread-chart/"><span className="mono">DIN 40430</span><b>PG thread chart</b><p>PG 7–48: outside and core Ø, pitch, through-hole, and PG → metric replacement.</p></a>{" "}
      <a href="/resources/metric-cable-gland-thread-chart/"><span className="mono">EN 60423</span><b>Metric thread chart</b><p>M12×1.5 – M63×1.5: outside Ø, pitch and tap drill.</p></a>{" "}
      <a href="/resources/bsp-thread-chart/"><span className="mono">ISO 228-1</span><b>BSP thread chart</b><p>G 1/8 – G 5: threads per inch, pitch, major and minor Ø.</p></a>{" "}
      <a href="/resources/npt-thread-chart/"><span className="mono">ASME B1.20.1</span><b>NPT thread chart</b><p>1/8 – 2 inch: threads per inch, pitch, pipe OD, pitch Ø and thread lengths.</p></a>{" "}
      <a href="/resources/brass-grade-equivalents/"><span className="mono">EN · BS · UNS · IS</span><b>Brass grade equivalents</b><p>CW614N, CW617N, DZR and lead-free grades with nearest equivalents and typical use.</p></a>{" "}
      <a href="/contact/?topic=documents"><span className="mono">CoC · REACH</span><b>Documents on request</b><p>Certificates and the REACH statement: ask and we send them.</p></a>{" "}
      </div>{" "}
      </div>{" "}
      </section>{" "}
      <section className="band band--sheet" id="guides">{" "}
      <div className="wrap">{" "}
      <div className="open"><div><h2>Buyer guides</h2></div><p>Short answers to common buyer questions, with the data behind them.</p></div>{" "}
      <div className="res">{" "}
      <a href="/resources/guides/cable-gland-selection/"><span className="mono">EN 60423 · IEC 60529</span><b>How to select a cable gland</b><p>Entry thread, hole size, cable diameter, IP rating and material, step by step.</p></a>{" "}
      <a href="/resources/guides/bsp-vs-npt/"><span className="mono">55° · 60°</span><b>BSP vs NPT threads</b><p>Angle, pitch, taper and sealing; why they don't mix and how to tell them apart.</p></a>{" "}
      <a href="/resources/guides/cw614n-vs-cw617n/"><span className="mono">CuZn39Pb3 · CuZn40Pb2</span><b>CW614N vs CW617N</b><p>Free-cutting or forging brass: composition, uses and equivalents.</p></a>{" "}
      <a href="/resources/guides/lead-free-dzr-brass/"><span className="mono">CW511L · CW724R</span><b>Lead-free and DZR brass</b><p>Dezincification, lead rules for drinking water and RoHS, and the grades that meet them.</p></a>{" "}
      <a href="/resources/guides/en-10204-3-1-certificate/"><span className="mono">2.1 · 2.2 · 3.1 · 3.2</span><b>EN 10204 3.1 certificates</b><p>The four document types, 3.1 vs 3.2, how to read a mill certificate and what it covers for a finished part.</p></a>{" "}
      </div>{" "}
      </div>{" "}
      </section>{" "}
      </main>
    </>
  );
}
