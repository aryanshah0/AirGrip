// Page markup, first converted from design/home.html (frozen); edit here.

import "./css/Home.css";
import { QuickQuote } from "../components/QuickQuote";

export default function Home() {
  return (
    <>
      <main id="main">{" "}
      {" "}
      <section className="hero">{" "}
      <div className="wrap">{" "}
      <span className="eyebrow">Brass component manufacturer · Jamnagar, India · since 1988</span>{" "}
      <h1 className="display">Brass components, made to your drawing.</h1>{" "}
      <div className="hero__body">{" "}
      <div className="hero__copy">{" "}
      <p className="lead">Turned, forged, stamped and plated in our plant in Jamnagar, in runs from a few thousand pieces to millions a year. We also make a standard range of brass cable glands and accessories.</p>{" "}
      <div className="hero__cta">{" "}
      <a className="btn" href="/rfq/">Send a drawing{" "}<span className="arr" aria-hidden="true">→</span></a>{" "}
      <a className="btn btn--ghost" href="/products/">Products</a>{" "}
      </div>{" "}
      <div className="cert-line">{" "}
      <span><b>ISO 9001:2015</b>{" "}· PPAP Level 3 on request · 3.1 mill certificates</span>{" "}
      </div>{" "}
      </div>{" "}
      <figure className="hero__sheet" style={{"margin": "0"}}>{" "}
      <span className="zone" style={{"top": "0", "left": "30%"}}>1</span><span className="zone" style={{"top": "0", "left": "55%"}}>2</span><span className="zone" style={{"top": "0", "left": "80%"}}>3</span>{" "}
      <span className="zone" style={{"left": "7px", "top": "28%"}}>A</span><span className="zone" style={{"left": "7px", "top": "60%"}}>B</span>{" "}
      <div className="frame">{" "}
      <svg className="dwg draw dwg-full" viewBox="20 40 620 400" role="img" aria-labelledby="dT">{" "}
      <title id="dT">Half-section drawing of a brass hex-collar adapter: thread M20×1.5-6g, body Ø22 ±0.05, bore Ø13 ±0.05, overall length 38, hex AF 24.</title>{" "}
      <defs>{" "}
      <pattern id="hatch" width="7" height="7" patternUnits="userSpaceOnUse" patternTransform="rotate(45)"><line x1="0" y1="0" x2="0" y2="7" stroke="#B8862F" strokeWidth="1.1" /></pattern>{" "}
      <pattern id="knurl" width="8" height="8" patternUnits="userSpaceOnUse" patternTransform="rotate(30)"><path d="M0 0V8M0 0H8" stroke="#262B33" strokeWidth=".6" fill="none" /></pattern>{" "}
      <marker id="ar" viewBox="0 0 10 10" refX="10" refY="5" markerWidth="7" markerHeight="7" orient="auto-start-reverse"><path d="M0 1.5L10 5L0 8.5z" fill="#5F656E" /></marker>{" "}
      <marker id="dot" viewBox="0 0 10 10" refX="5" refY="5" markerWidth="5" markerHeight="5"><circle cx="5" cy="5" r="4" fill="#5F656E" /></marker>{" "}
      <clipPath id="kc"><rect x="432" y="236" width="48" height="108" /></clipPath>{" "}
      </defs>{" "}
      <line className="c" x1="88" y1="235" x2="516" y2="235" />{" "}
      <path className="fill" d="M110 170V145L120 135H222V145H232V102L238 96H306L312 102V125H402V135H420V125H482L492 135V170Z" />{" "}
      <path fill="url(#hatch)" d="M110 170V145L120 135H222V145H232V102L238 96H306L312 102V125H402V135H420V125H482L492 135V170Z" />{" "}
      <path className="o" d="M110 170V145L120 135H222V145H232V102L238 96H306L312 102V125H402V135H420V125H482L492 135V170Z" />{" "}
      <line className="t" x1="120" y1="143" x2="222" y2="143" />{" "}
      <path className="o" d="M110 235V325L120 335H222V325H232V368L238 374H306L312 368V345H402V335H420V345H482L492 335V235" />{" "}
      <path className="o" d="M120 235V335M482 235V345M232 304H312M222 235V335M232 235V368M312 235V368M402 235V345M420 235V345" />{" "}
      <line className="t" x1="120" y1="327" x2="222" y2="327" />{" "}
      <line className="h" x1="110" y1="300" x2="492" y2="300" />{" "}
      <rect clipPath="url(#kc)" x="432" y="236" width="48" height="108" fill="url(#knurl)" />{" "}
      <path className="d" d="M110 340V430M492 350V430" />{" "}
      <line className="d" x1="110" y1="422" x2="492" y2="422" markerStart="url(#ar)" markerEnd="url(#ar)" />{" "}
      <text className="dt" x="301" y="415" textAnchor="middle">38</text>{" "}
      <line className="d" x1="360" y1="125" x2="360" y2="345" markerStart="url(#ar)" markerEnd="url(#ar)" />{" "}
      <rect x="341" y="250" width="14" height="74" fill="#fff" /><text className="dt" transform="translate(352 287) rotate(-90)" textAnchor="middle">Ø22 ±0.05</text>{" "}
      <path className="d" d="M232 92V56M312 92V56" />{" "}
      <line className="d" x1="232" y1="64" x2="312" y2="64" markerStart="url(#ar)" markerEnd="url(#ar)" />{" "}
      <text className="dt" x="272" y="57" textAnchor="middle">8</text>{" "}
      <path className="d" d="M150 135L120 84H40" markerStart="url(#ar)" /><text className="dt" x="40" y="78">M20×1.5-6g</text>{" "}
      <path className="d" d="M452 170L508 104H612" markerStart="url(#ar)" /><text className="dt" x="510" y="98">Ø13 ±0.05</text>{" "}
      <path className="d" d="M268 340L222 396H130" markerStart="url(#dot)" /><text className="dt" x="130" y="390">AF 24</text>{" "}
      <path className="d" d="M462 320L520 386H630" markerStart="url(#dot)" /><text className="dt" x="522" y="380">RGE 0.8 DIN 82</text><text className="dl" x="522" y="394" style={{"fontFamily": "var(--font-sans)", "fontSize": "10px", "fill": "#5F656E"}}>knurled after turning</text>{" "}
      <path className="d" d="M318 113L324 125L336 101H370" /><text className="dt" x="340" y="96">Ra 1.6</text>{" "}
      </svg>{" "}
      <svg className="dwg dwg-m" viewBox="80 80 470 330" role="img" aria-label="Simplified half-section of the adapter: Ø22 ±0.05, length 38, thread M20×1.5">{" "}
      <defs><pattern id="hatchm" width="9" height="9" patternUnits="userSpaceOnUse" patternTransform="rotate(45)"><line x1="0" y1="0" x2="0" y2="9" stroke="#B8862F" strokeWidth="1.3" /></pattern>{" "}
      <marker id="arm" viewBox="0 0 10 10" refX="10" refY="5" markerWidth="8" markerHeight="8" orient="auto-start-reverse"><path d="M0 1.5L10 5L0 8.5z" fill="#5F656E" /></marker></defs>{" "}
      <line className="c" x1="96" y1="235" x2="506" y2="235" />{" "}
      <path className="fill" d="M110 170V145L120 135H222V145H232V102L238 96H306L312 102V125H402V135H420V125H482L492 135V170Z" />{" "}
      <path fill="url(#hatchm)" d="M110 170V145L120 135H222V145H232V102L238 96H306L312 102V125H402V135H420V125H482L492 135V170Z" />{" "}
      <path className="o" d="M110 170V145L120 135H222V145H232V102L238 96H306L312 102V125H402V135H420V125H482L492 135V170Z" />{" "}
      <path className="o" d="M110 235V325L120 335H222V325H232V368L238 374H306L312 368V345H402V335H420V345H482L492 335V235M120 235V335M482 235V345M222 235V335M232 235V368M312 235V368M402 235V345M420 235V345" />{" "}
      <path className="d" d="M110 340V404M492 350V404" /><line className="d" x1="110" y1="396" x2="492" y2="396" markerStart="url(#arm)" markerEnd="url(#arm)" />{" "}
      <text className="dt" x="400" y="390" textAnchor="middle" style={{"fontSize": "22px"}}>38</text>{" "}
      <line className="d" x1="360" y1="125" x2="360" y2="345" markerStart="url(#arm)" markerEnd="url(#arm)" />{" "}
      <rect x="330" y="240" width="24" height="100" fill="#fff" /><text className="dt" transform="translate(350 290) rotate(-90)" textAnchor="middle" style={{"fontSize": "20px"}}>Ø22 ±0.05</text>{" "}
      <path className="d" d="M150 135L130 104H96" markerStart="url(#arm)" /><text className="dt" x="96" y="96" style={{"fontSize": "22px"}}>M20×1.5-6g</text>{" "}
      </svg>{" "}
      <div className="tblock" aria-label="Title block">{" "}
      <div className="span2"><span className="k">Title</span><span className="v">Hex-collar adapter</span></div>{" "}
      <div className="m-span2"><span className="k">Drawing no.</span><span className="v">AG-EX-0417</span></div>{" "}
      <div className="m-hide"><span className="k">Rev.</span><span className="v">B</span></div>{" "}
      <div className="span2"><span className="k">Material</span><span className="v">CuZn39Pb3 · CW614N</span></div>{" "}
      <div className="m-hide"><span className="k">Scale</span><span className="v">2:1</span></div>{" "}
      <div className="m-hide"><span className="k">Units</span><span className="v">mm</span></div>{" "}
      <div className="m-hide"><span className="k">Gen. tol.</span><span className="v">ISO 2768-m</span></div>{" "}
      <div className="m-hide"><span className="k">Finish</span><span className="v">Ni-plated</span></div>{" "}
      <div className="m-hide"><span className="k">Projection</span><svg width="34" height="14" viewBox="0 0 34 14" aria-label="First-angle projection"><path d="M1 3L13 1V13L1 11Z" fill="none" stroke="#262B33" /><circle cx="25" cy="7" r="6" fill="none" stroke="#262B33" /><circle cx="25" cy="7" r="4" fill="none" stroke="#262B33" /></svg></div>{" "}
      <div className="m-hide"><span className="k">Sheet</span><span className="v">1 / 1</span></div>{" "}
      <div className="span2 m-hide" style={{"borderBottom": "0"}}><span className="k">Drawn · checked</span><span className="v">Example · not a customer part</span></div>{" "}
      <div className="m-hide" style={{"borderBottom": "0"}}><span className="k">Date</span><span className="v">2026-11</span></div>{" "}
      <div className="m-hide" style={{"borderBottom": "0"}}><span className="k">Doc. type</span><span className="v">Part drawing</span></div>{" "}
      </div>{" "}
      </div>{" "}
      </figure>{" "}
      </div>{" "}
      <dl className="strip strip--4" aria-label="Key figures">{" "}
      <div><dt>In business</dt><dd>Since 1988<small>Jamnagar, Gujarat</small></dd></div>{" "}
      <div><dt>Exports</dt><dd>40+ countries<small>25 % of output</small></dd></div>{" "}
      <div><dt>Machines</dt><dd>66<small>CNC lathes, cam automats, special-purpose machines, drilling machines, presses</small></dd></div>{" "}
      <div><dt>Samples</dt><dd>2–3 weeks<small>typical</small></dd></div>{" "}
      </dl>{" "}
      </div>{" "}
      </section>{" "}
      {" "}
      <section className="band" id="products">{" "}
      <div className="wrap">{" "}
      <div className="open">{" "}
      <div><span className="eyebrow eyebrow--brass">Products</span><h2>What we make</h2></div>{" "}
      <p>Most of what we ship is made to customer drawings. Cable glands and their accessories are a standard range with part codes and size tables.</p>{" "}
      </div>{" "}
      <ol className="bom">{" "}
      <li><a href="/products/brass-turned-components/"><span className="nm"><b>Brass turned components</b><span>Bushes, pins, spacers, nozzles, connector bodies</span></span><span className="photo th"><img src="/img/la/t/turned.svg" alt="" width="96" height="72" loading="lazy" /></span><span className="go" aria-hidden="true">→</span></a></li>{" "}
      <li><a href="/products/brass-fittings/"><span className="nm"><b>Brass fittings</b><span>Forged or turned fittings with BSP and NPT threads</span></span><span className="photo th"><img src="/img/la/t/elbow.svg" alt="" width="96" height="72" loading="lazy" /></span><span className="go" aria-hidden="true">→</span></a></li>{" "}
      <li><a href="/products/brass-forged-components/"><span className="nm"><b>Forged brass components</b><span>Hot-forged, then machined: bodies, tees, valve parts</span></span><span className="photo th"><img src="/img/la/t/forgedtee.svg" alt="" width="96" height="72" loading="lazy" /></span><span className="go" aria-hidden="true">→</span></a></li>{" "}
      <li><a href="/products/brass-moulding-inserts/"><span className="nm"><b>Moulding inserts</b><span>Knurled, threaded inserts for moulding into plastic</span></span><span className="photo th"><img src="/img/la/t/insert.svg" alt="" width="96" height="72" loading="lazy" /></span><span className="go" aria-hidden="true">→</span></a></li>{" "}
      <li><a href="/products/brass-electrical-terminals/"><span className="nm"><b>Electrical terminals &amp; connectors</b><span>Terminal blocks, connectors, earth blocks, neutral links</span></span><span className="photo th"><img src="/img/la/t/terminal.svg" alt="" width="96" height="72" loading="lazy" /></span><span className="go" aria-hidden="true">→</span></a></li>{" "}
      <li><a href="/products/special-fasteners/"><span className="nm"><b>Special fasteners</b><span>Screws, bolts, studs, nuts, battery-terminal fasteners</span></span><span className="photo th"><img src="/img/la/t/hexbolt.svg" alt="" width="96" height="72" loading="lazy" /></span><span className="go" aria-hidden="true">→</span></a></li>{" "}
      <li><a href="/products/metal-stamping-parts/"><span className="nm"><b>Metal stamping parts</b><span>Brass, copper and steel stampings, earth tags, washers</span></span><span className="photo th"><img src="/img/la/t/contact.svg" alt="" width="96" height="72" loading="lazy" /></span><span className="go" aria-hidden="true">→</span></a></li>{" "}
      <li><a href="/products/brass-cable-glands/"><span className="nm"><b>Brass cable glands &amp; accessories</b><span>Two gland types and pressure screws in PG and metric, with accessories</span></span><span className="photo th"><img src="/img/la/t/gland.svg" alt="" width="96" height="72" loading="lazy" /></span><span className="go" aria-hidden="true">→</span></a></li>{" "}
      </ol>{" "}
      <div className="bom__foot"><a className="more" href="/products/">All products{" "}<span aria-hidden="true">→</span></a></div>{" "}
      </div>{" "}
      </section>{" "}
      {" "}
      <section className="band band--sheet proof" id="plant">{" "}
      <div className="wrap">{" "}
      <div className="open">{" "}
      <div><span className="eyebrow eyebrow--brass">Jamnagar, Gujarat · since 1988</span><h2>Our plant in Jamnagar's brass cluster</h2></div>{" "}
      <p>Founded in 1988 by Ketan Shah: turning, forging, stamping and plating on one site.</p>{" "}
      </div>{" "}
      <dl className="strip strip--4" aria-label="Ranges">{" "}
      <div><dt>CNC turning</dt><dd><span className="mono">Ø5–100 mm</span><small>bar diameter</small></dd></div>{" "}
      <div><dt>Tolerance</dt><dd><span className="mono">±0.05 mm</span><small>all processes</small></dd></div>{" "}
      <div><dt>Hot forging</dt><dd><span className="mono">25 g – 1.0 kg</span><small>forged, then machined</small></dd></div>{" "}
      <div><dt>Plating</dt><dd>Nickel · tin · zinc<small>in our plant; silver and chrome on request</small></dd></div>{" "}
      </dl>{" "}
      <div className="plant">{" "}
      <div className="plant__media">{" "}
      <div className="photo"><img src="/img/01-Airgrip-Group-01.webp" alt="AirGrip plant at GIDC Phase-III, Dared, Jamnagar" loading="lazy" /></div>{" "}
      </div>{" "}
      <div className="plant__txt">{" "}
      <p><b>ISO 9001:2015 certified.</b>{" "}The rod's heat number is carried on every inspection record and carton label, so each part traces back to the bar it was cut from.</p>{" "}
      <dl className="kv proof__line">{" "}
      <dt>Supplying</dt><dd>Electrical and switchgear, automotive, plumbing, HVAC, hydraulics, plastic moulding ·{" "}<a className="link" href="/industries/">industries</a></dd>{" "}
      </dl>{" "}
      <div className="proof__links">{" "}
      <a className="more" href="/capabilities/">Capabilities{" "}<span aria-hidden="true">→</span></a>{" "}
      <a className="more" href="/quality/">Quality &amp; documents{" "}<span aria-hidden="true">→</span></a>{" "}
      <a className="more" href="/about/">About AirGrip{" "}<span aria-hidden="true">→</span></a>{" "}
      </div>{" "}
      </div>{" "}
      </div>{" "}
      </div>{" "}
      </section>{" "}
      {" "}
      <section className="band dark" id="rfq">{" "}
      <div className="wrap">{" "}
      <div className="rfq">{" "}
      <div className="rfq__l">{" "}
      <span className="eyebrow">Request a quote</span>{" "}
      <h2>Send a drawing. We reply within two working days.</h2>{" "}
      <p>Include the quantity per order and per year. You get a price, MOQ and lead time, or our questions on the drawing. If a small design change would make the part cheaper to make, the quote says so.</p>{" "}
      <p className="rline">Typical: samples 2–3 weeks · production 4–6 weeks · MOQ per part</p>{" "}
      <p className="small" style={{"marginTop": "var(--s-2)"}}><a className="link" style={{"color": "var(--on-dark)"}} href="/exports/">Ordering &amp; shipping</a></p>{" "}
      <a className="btn btn--brass rfq__mbtn" href="/rfq/" style={{"display": "none", "marginTop": "var(--s-5)"}}>Send a drawing{" "}<span className="arr" aria-hidden="true">→</span></a>{" "}
      </div>{" "}
      <div className="rfq__r">{" "}<QuickQuote />{" "}</div>{" "}
      </div>{" "}
      </div>{" "}
      </section>{" "}
      </main>
    </>
  );
}
