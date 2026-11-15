// Page markup, first converted from design/404.html (frozen); edit here.

import "../styles/pages.css";
import "./css/NotFound.css";

export default function NotFound() {
  return (
    <>
      <main id="main">{" "}
      <section className="band">{" "}
      <div className="wrap nf">{" "}
      <div>{" "}
      <span className="eyebrow eyebrow--brass">Error 404</span>{" "}
      <h1 style={{"marginBlock": "var(--s-3) var(--s-4)"}}>This page isn't on the drawing</h1>{" "}
      <p className="lead">This page may have moved. Try one of these:</p>{" "}
      <ul className="rlist" style={{"marginTop": "var(--s-6)", "maxWidth": "520px"}}>{" "}
      <li className="pair"><a className="link" href="/products/">Products</a><span className="mono">/products/</span></li>{" "}
      <li className="pair"><a className="link" href="/products/brass-cable-glands/">Cable glands</a><span className="mono">/products/brass-cable-glands/</span></li>{" "}
      <li className="pair"><a className="link" href="/resources/">Thread charts &amp; resources</a><span className="mono">/resources/</span></li>{" "}
      <li className="pair"><a className="link" href="/rfq/">Request a quote</a><span className="mono">/rfq/</span></li>{" "}
      <li className="pair"><a className="link" href="/contact/">Contact</a><span className="mono">/contact/</span></li>{" "}
      <li className="pair"><span>Call</span><a className="mono link" href="tel:+919316615007">+91 93166 15007</a></li>{" "}
      </ul>{" "}
      </div>{" "}
      <figure aria-hidden="true"><div className="frame">{" "}
      <svg className="dwg" viewBox="0 0 300 200">{" "}
      <line className="c" x1="20" y1="100" x2="280" y2="100" />{" "}
      <path className="h" d="M60 100V74L68 66H140V54H200V66H232L240 74V100M60 100V126L68 134H140V146H200V134H232L240 126V100" />{" "}
      <rect className="t" x="150" y="164" width="140" height="32" /><path className="t" d="M150 176H290" />{" "}
      <text className="dn" x="156" y="173" style={{"fontSize": "9px"}}>DRG NO.</text><text className="dt" x="156" y="191" style={{"fontSize": "11px"}}>404 · NOT FOUND</text>{" "}
      </svg>{" "}
      </div></figure>{" "}
      </div>{" "}
      </section>{" "}
      </main>
    </>
  );
}
