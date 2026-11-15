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
      </main>
    </>
  );
}
