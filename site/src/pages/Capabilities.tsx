// Page markup, first converted from design/capabilities.html (frozen); edit here.

import "../styles/pages.css";
import "./css/Capabilities.css";

export default function Capabilities() {
  return (
    <>
      <main id="main">{" "}
      <section className="phead">{" "}
      <div className="wrap">{" "}
      <ol className="crumbs" aria-label="Breadcrumb"><li><a href="/">Home</a></li><li aria-current="page">Capabilities</li></ol>{" "}
      <div className="phead__row">{" "}
      <div><h1>How we make brass parts</h1><p className="lead">Rod comes from approved mills. Forging, turning, stamping, secondary operations, plating and packing happen in our plant in Jamnagar; material tests (composition, strength) go to an outside lab.</p></div>{" "}
      <div></div>{" "}
      </div>{" "}
      </div>{" "}
      </section>{" "}
      <nav className="subnav m-only" aria-label="On this page"><div className="wrap"><a href="#processes">Processes</a><a href="#machines">Machines</a><a href="#range">Range</a><a href="#threads">Threads</a><a href="#finishing">Plating</a><a href="#packing">Packing</a></div></nav>{" "}
      <div className="wrap" style={{"paddingBlock": "var(--s-8)"}}>{" "}
      <div className="with-toc">{" "}
      <nav className="toc" aria-label="On this page"><span className="eyebrow">On this page</span>{" "}
      <ol><li><a className="on" href="#processes">Processes</a></li><li><a href="#machines">Machine park</a></li><li><a href="#range">Range &amp; accuracy</a></li><li><a href="#threads">Threads</a></li><li><a href="#finishing">Plating &amp; finishing</a></li><li><a href="#packing">Packing &amp; dispatch</a></li></ol>{" "}
      <a className="btn btn--sm" style={{"marginTop": "var(--s-6)"}} href="/rfq/">Send a drawing</a>{" "}
      </nav>{" "}
      <div>{" "}
      <section className="sec" id="processes">{" "}
      <h2>Processes</h2>{" "}
      <p className="lead">Each part is routed to the process that gives the lowest cost at its volume.</p>{" "}
      <p className="muted" style={{"maxWidth": "68ch", "marginBottom": "var(--s-6)"}}>Design for cost: with each quote we suggest where cost can come out, such as forging instead of machining from bar, a special bar profile to cut operations, or relaxing non-critical dimensions. You approve every change.</p>{" "}
      <div className="proc">{" "}
      <article><div className="pic"><img src="/img/la/t/turned.svg" alt="" loading="lazy" /></div><h3>CNC turning</h3><p>Complex profiles and multiple features in one set-up. Used for samples, short and medium runs, and parts that change often.</p><span className="mono">Ø5–100 mm · ±0.05 mm</span></article>{" "}
      <article><div className="pic"><img src="/img/la/t/spindle.svg" alt="" loading="lazy" /></div><h3>Cam-automat turning</h3><p>Bar-fed cam-operated automats for long runs of small and medium parts at the lowest piece price.</p><span className="tagl">bar-fed</span></article>{" "}
      <article><div className="pic"><img src="/img/la/t/tee.svg" alt="" loading="lazy" /></div><h3>Hot forging</h3><p>Near-net brass forgings for bodies, tees and manifolds, then machined to finish. Less material and fewer operations than machining from bar.</p><span className="mono">25 g – 1.0 kg</span><span className="tagl">shot-blasted · natural · bright</span></article>{" "}
      <article><div className="pic"><img src="/img/la/t/connector.svg" alt="" loading="lazy" /></div><h3>Special-purpose machines</h3><p>Single-operation machines, built in-house with our own fixtures, for turning, drilling, threading and milling on large batches of repeat parts. They take manual handling, and with it errors, out of repeat jobs.</p><span className="tagl">drill · tap · mill · slot</span></article>{" "}
      <article><div className="pic"><img src="/img/la/t/earthtag.svg" alt="" loading="lazy" /></div><h3>Stamping</h3><p>Earth tags, washers, fuse and switch parts and other electrical parts pressed from brass, copper and steel strip.</p><span className="mono">±0.05 mm on punched features</span></article>{" "}
      <article><div className="pic"><img src="/img/la/t/insert.svg" alt="" loading="lazy" /></div><h3>Secondary operations</h3><p>Knurling, broaching, marking and sub-assembly, such as fitting seals into glands before packing.</p><span className="tagl">knurl · broach · mark</span></article>{" "}
      </div>{" "}
      </section>{" "}
      <section className="sec" id="machines">{" "}
      <h2>Machine park</h2>{" "}
      <p className="lead" style={{"marginBottom": "var(--s-5)"}}>66 machines: 12 CNC lathes, 20 cam automats, 21 special-purpose machines built in-house, 10 drilling machines and 3 presses.</p>{" "}
      <div className="tbl"><table className="spec stack-m">
      <thead><tr><th className="stick">Machine type</th><th className="n">Qty</th><th>Bar or part range</th><th>Notes</th></tr></thead>
      <tbody>
      <tr><td className="stick" data-l="Machine type">CNC lathes</td><td className="n" data-l="Qty">12</td><td data-l="Bar or part range">Ø5–100 mm bar</td><td data-l="Notes">Samples to medium runs; cross-holes and flats in a second operation</td></tr>
      <tr><td className="stick" data-l="Machine type">Cam-operated automats</td><td className="n" data-l="Qty">20</td><td data-l="Bar or part range">Small and medium parts</td><td data-l="Notes">Bar-fed, long runs</td></tr>
      <tr><td className="stick" data-l="Machine type">Special-purpose machines</td><td className="n" data-l="Qty">21</td><td data-l="Bar or part range">—</td><td data-l="Notes">Built in-house: turning, drilling, threading, milling</td></tr>
      <tr><td className="stick" data-l="Machine type">Drilling machines</td><td className="n" data-l="Qty">10</td><td data-l="Bar or part range">—</td><td data-l="Notes">Drilling and tapping</td></tr>
      <tr><td className="stick" data-l="Machine type">Presses</td><td className="n" data-l="Qty">3</td><td data-l="Bar or part range">—</td><td data-l="Notes">—</td></tr>
      </tbody>
      </table></div>{" "}
      </section>{" "}
      <section className="sec" id="range">{" "}
      <h2>Range &amp; accuracy</h2>{" "}
      <div className="tbl"><table className="spec stack-m">
      <thead><tr><th className="stick">Process</th><th>Parameter</th><th className="n">Value</th></tr></thead>
      <tbody>
      <tr><td className="stick" data-l="Process">Turning</td><td data-l="Parameter">Bar diameter</td><td className="n" data-l="Value">Ø5–100 mm</td></tr>
      <tr><td className="stick" data-l="Process">Turning</td><td data-l="Parameter">Part length</td><td className="n" data-l="Value">≤ 100 mm</td></tr>
      <tr><td className="stick" data-l="Process">Turning</td><td data-l="Parameter">Diameter tolerance</td><td className="n" data-l="Value">±0.05 mm</td></tr>
      <tr><td className="stick" data-l="Process">Turning</td><td data-l="Parameter">Run-out</td><td className="n" data-l="Value">0.05 mm</td></tr>
      <tr><td className="stick" data-l="Process">Forging</td><td data-l="Parameter">Part weight</td><td className="n" data-l="Value">25 g – 1.0 kg</td></tr>
      <tr><td className="stick" data-l="Process">Stamping</td><td data-l="Parameter">Punched features</td><td className="n" data-l="Value">±0.05 mm</td></tr>
      <tr><td className="stick" data-l="Process">All</td><td data-l="Parameter">General tolerance</td><td className="n" data-l="Value">ISO 2768-m unless the drawing states otherwise</td></tr>
      </tbody>
      </table></div>{" "}
      <p className="tbl-note">Materials: CW614N and CW617N as standard; on request low-lead DZR CW511L, lead-free CW724R and DZR CW602N.{" "}<a className="link" href="/resources/brass-grade-equivalents/">Grade details</a></p>{" "}
      </section>{" "}
      <section className="sec" id="threads">{" "}
      <h2>Threads</h2>{" "}
      <div className="tbl"><table className="spec stack-m">
      <thead><tr><th className="stick">System</th><th>Standard</th><th>Typical use</th><th>Chart</th></tr></thead>
      <tbody>
      <tr><td className="stick mono" data-l="System">M</td><td data-l="Standard">ISO 261 · EN 60423 (glands)</td><td data-l="Typical use">Turned parts, metric cable glands</td><td data-l="Chart"><a className="link small" href="/resources/metric-cable-gland-thread-chart/">Chart</a></td></tr>
      <tr><td className="stick mono" data-l="System">PG</td><td data-l="Standard">DIN 40430</td><td data-l="Typical use">Cable glands and accessories</td><td data-l="Chart"><a className="link small" href="/resources/pg-thread-chart/">Chart</a></td></tr>
      <tr><td className="stick mono" data-l="System">G (BSP)</td><td data-l="Standard">ISO 228-1</td><td data-l="Typical use">Fittings, gland accessories, inserts</td><td data-l="Chart"><a className="link small" href="/resources/bsp-thread-chart/">Chart</a></td></tr>
      <tr><td className="stick mono" data-l="System">R / Rc (BSPT)</td><td data-l="Standard">ISO 7-1</td><td data-l="Typical use">Tapered pipe fittings</td><td className="ondata" data-l="Chart">—</td></tr>
      <tr><td className="stick mono" data-l="System">NPT</td><td data-l="Standard">ASME B1.20.1</td><td data-l="Typical use">Fittings for North America</td><td data-l="Chart"><a className="link small" href="/resources/npt-thread-chart/">Chart</a></td></tr>
      <tr><td className="stick mono" data-l="System">UNC / UNF</td><td data-l="Standard">ASME B1.1</td><td data-l="Typical use">Inch fasteners and turned parts</td><td className="ondata" data-l="Chart">—</td></tr>
      <tr><td className="stick mono" data-l="System">BA / BSW</td><td data-l="Standard">BS 57 / BS 84</td><td data-l="Typical use">Older British equipment</td><td className="ondata" data-l="Chart">—</td></tr>
      </tbody>
      </table></div>{" "}
      <p className="tbl-note">Special and customer-specific threads made to drawing. Parallel threads gauged GO / NO-GO.</p>{" "}
      </section>{" "}
      <section className="sec" id="finishing">{" "}
      <h2>Plating &amp; finishing</h2>{" "}
      <div className="cols">{" "}
      <dl className="kv"><dt>Nickel</dt><dd>Corrosion resistance and appearance</dd><dt>Tin</dt><dd>Electrical contact parts, solderability</dd><dt>Zinc</dt><dd>Low-cost corrosion protection</dd><dt>Silver</dt><dd>High-conductivity electrical contacts, on request</dd><dt>Chrome</dt><dd>Decorative and wear-resistant surfaces, on request</dd><dt>Natural</dt><dd>Bright-machined, shot-blasted (forgings)</dd></dl>{" "}
      <p className="muted">Nickel, tin and zinc plating is done in our plant; silver and chrome on request. Thickness is measured per lot and recorded on the route card. State the thickness you need in µm in the quote request.</p>{" "}
      </div>{" "}
      </section>{" "}
      <section className="sec" id="packing">{" "}
      <h2>Packing &amp; dispatch</h2>{" "}
      <p className="lead">Packed to your specification, with traceable labels (label contents:{" "}<a className="link" href="/quality/#checks">see Quality</a>).</p>{" "}
      <ul className="bullets"><li><span>Single-piece packing</span></li><li><span>Small parts in pouches</span></li><li><span>Bubble or foam bags</span></li><li><span>Blister packs</span></li><li><span>Export cartons, strapped and labelled</span></li></ul>{" "}
      <p className="tbl-note" style={{"marginTop": "var(--s-5)"}}>Pieces per bag, carton weight and pallet type to your specification. Shipping terms:{" "}<a className="link" href="/exports/">Ordering &amp; shipping</a>.</p>{" "}
      </section>{" "}
      </div>{" "}
      </div>{" "}
      </div>{" "}
      <section className="band band--sheet">{" "}
      <div className="wrap"><div className="cta"><div><h2>Check a part against these ranges</h2><p>Send the drawing; if it's outside our range, the reply says so.</p></div><div className="acts"><a className="btn" href="/rfq/">Send a drawing{" "}<span className="arr" aria-hidden="true">→</span></a></div></div></div>{" "}
      </section>{" "}
      </main>
    </>
  );
}
