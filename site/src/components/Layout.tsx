// Shared header (Products mega menu, mobile nav), footer, WhatsApp button, sticky quote bar and cookie banner.
// Markup and behaviour are ported 1:1 from design/partials.js.
import { useEffect, useRef, useState, type ReactNode } from "react";
import { P, SITE } from "../site";
import { useBasket } from "../lib/basket";
import { ConsentBanner } from "./Consent";

const Chev = () => (
  <svg className="chev" viewBox="0 0 10 10" aria-hidden="true"><path d="M1.5 3.5L5 7l3.5-3.5" fill="none" stroke="currentColor" strokeWidth="1.4" /></svg>
);

function Mega({ open }: { open: boolean }) {
  return (
    <div className={"mega" + (open ? " open" : "")} id="mega-products" role="region" aria-label="Products">
      <div className="wrap mega__in">
        <div>
          <p className="mh"><a href={P.products + "#custom"}>Made to your drawing</a></p>
          <ul>
            <li><a href={P.category}>Brass turned components</a></li>
            <li><a href={P.fittings}>Brass fittings</a></li>
            <li><a href={P.forged}>Forged brass components</a></li>
            <li><a href={P.inserts}>Moulding inserts</a></li>
            <li><a href={P.terminals}>Electrical terminals &amp; connectors</a></li>
            <li><a href={P.fasteners}>Special fasteners</a></li>
            <li><a href={P.stamping}>Metal stamping parts</a></li>
          </ul>
        </div>
        <div>
          <p className="mh"><a href={P.glands}>Brass cable glands</a></p>
          <ul>
            <li><a href={P.clampingJaw}>Clamping-jaw gland</a></li>
            <li><a href={P.strainRelief}>Strain-relief gland</a></li>
            <li><a href={P.pressureScrew}>Pressure screws</a></li>
          </ul>
          <p className="mh" style={{ marginTop: "var(--s-5)" }}><a href={P.resources}>Technical data</a></p>
          <ul>
            <li><a href={P.pg}>PG thread chart</a></li>
            <li><a href={P.metric}>Metric thread chart</a></li>
            <li><a href={P.bsp}>BSP thread chart</a></li>
            <li><a href={P.npt}>NPT thread chart</a></li>
            <li><a href={P.grades}>Brass grade equivalents</a></li>
          </ul>
        </div>
        <div>
          <p className="mh"><a href={P.glands + "#accessories"}>Gland accessories</a></p>
          <ul>
            <li><a href={P.lockNuts}>Lock nuts</a></li>
            <li><a href={P.adapters}>Reducers, enlargers &amp; adapters</a></li>
            <li><a href={P.stopPlugs}>Stop plugs</a></li>
            <li><a href={P.earthTags}>Earth tags</a></li>
            <li><a href={P.conduit}>Conduit gland parts</a></li>
          </ul>
        </div>
        <div className="mega__aside">
          <span className="eyebrow eyebrow--brass">Not listed?</span>
          <p>Most of what we make is to customer drawings. Send yours for a quote.</p>
          <a className="btn btn--sm" href={P.rfq}>Send a drawing <span className="arr" aria-hidden="true">→</span></a>
          <p style={{ margin: "var(--s-4) 0 0" }}><a className="link" href={P.products}>All products</a></p>
        </div>
      </div>
    </div>
  );
}

function Header({ nav }: { nav: string }) {
  const items = useBasket();
  const [mega, setMega] = useState(false);
  const [mnav, setMnav] = useState(false);
  const btn = useRef<HTMLButtonElement>(null);
  const cur = (k: string) => (k === nav ? { "aria-current": "page" as const } : {});

  useEffect(() => {
    if (!mega) return;
    const key = (e: KeyboardEvent) => { if (e.key === "Escape") { setMega(false); btn.current?.focus(); } };
    const click = (e: MouseEvent) => {
      const panel = document.getElementById("mega-products");
      const t = e.target as Node;
      if (!panel?.contains(t) && !btn.current?.contains(t)) setMega(false);
    };
    document.addEventListener("keydown", key);
    document.addEventListener("click", click);
    return () => { document.removeEventListener("keydown", key); document.removeEventListener("click", click); };
  }, [mega]);

  return (
    <header className="hdr">
      <div className="wrap hdr__bar">
        <a className="brand" href={P.home}><img src="/img/logo.svg" alt="AirGrip, home" width="70" height="52" /></a>
        <nav className="nav" aria-label="Main">
          <button type="button" ref={btn} aria-expanded={mega} aria-controls="mega-products" {...(nav === "products" ? { "aria-current": "page" as const } : {})} onClick={() => setMega(!mega)}>Products <Chev /></button>
          <a href={P.capabilities} {...cur("capabilities")}>Capabilities</a>
          <a href={P.quality} {...cur("quality")}>Quality</a>
          <a href={P.exports} {...cur("exports")}>Ordering &amp; shipping</a>
          <a href={P.resources} {...cur("resources")}>Resources</a>
          <a href={P.about} {...cur("about")}>About</a>
          <a href={P.contact} {...cur("contact")}>Contact</a>
        </nav>
        <div className="hdr__end">
          <a className="hdr__tel" href={SITE.phoneHref}>{SITE.phone}</a>
          <a className="btn btn--sm basket-btn" href={P.rfq}><span className="hide-s">Request a quote</span><span className="show-s">Quote</span><span className="count" hidden={!items.length}>{items.length}</span></a>
          <button className="btn btn--ghost btn--sm hdr__menu" type="button" aria-expanded={mnav} aria-controls="mnav" onClick={() => setMnav(!mnav)}>{mnav ? "Close" : "Menu"}</button>
        </div>
      </div>
      <Mega open={mega} />
      <nav className="mnav" id="mnav" aria-label="Mobile" hidden={!mnav}>
        <div className="wrap">
          <details><summary>Products</summary>
            <ul>
              <li><a href={P.products}>All products</a></li>
              <li><a href={P.category}>Brass turned components</a></li>
              <li><a href={P.fittings}>Brass fittings</a></li>
              <li><a href={P.forged}>Forged brass components</a></li>
              <li><a href={P.inserts}>Moulding inserts</a></li>
              <li><a href={P.terminals}>Electrical terminals &amp; connectors</a></li>
              <li><a href={P.fasteners}>Special fasteners</a></li>
              <li><a href={P.stamping}>Metal stamping parts</a></li>
              <li><a href={P.glands}>Brass cable glands &amp; accessories</a></li>
            </ul>
          </details>
          <a href={P.capabilities}>Capabilities</a><a href={P.quality}>Quality</a><a href={P.exports}>Ordering &amp; shipping</a>
          <a href={P.resources}>Resources</a><a href={P.about}>About</a><a href={P.contact}>Contact</a>
          <div className="mnav__c"><a href={SITE.phoneHref}>Call {SITE.phone}</a><a href={SITE.whatsapp}>WhatsApp</a><a href={"mailto:" + SITE.email}>{SITE.email}</a></div>
        </div>
      </nav>
    </header>
  );
}

function Footer() {
  return (
    <footer className="ftr">
      <div className="wrap">
        <div className="ftr__grid">
          <div>
            <a className="brand brand--ftr" href={P.home}><img src="/img/logo.svg" alt="AirGrip" width="108" height="80" /></a>
            <address>Plot No. 3966 &amp; 3967, Road No. U, GIDC Phase-III<br />Dared, Jamnagar 361004, Gujarat, India<br />
              <a className="mono" href={SITE.phoneHref}>{SITE.phone}</a> · <a href={"mailto:" + SITE.email}>{SITE.email}</a><br />
              <span className="muted">{SITE.hours}</span></address>
          </div>
          <div><p className="fh">Products</p><ul><li><a href={P.category}>Brass turned components</a></li><li><a href={P.fittings}>Brass fittings</a></li><li><a href={P.forged}>Forged brass components</a></li><li><a href={P.inserts}>Moulding inserts</a></li><li><a href={P.terminals}>Electrical terminals &amp; connectors</a></li><li><a href={P.fasteners}>Special fasteners</a></li><li><a href={P.stamping}>Metal stamping parts</a></li><li><a href={P.glands}>Brass cable glands &amp; accessories</a></li></ul></div>
          <div><p className="fh">Capabilities</p><ul><li><a href={P.capabilities}>Processes &amp; machines</a></li><li><a href={P.capabilities + "#range"}>Range &amp; accuracy</a></li><li><a href={P.capabilities + "#finishing"}>Plating &amp; finishing</a></li><li><a href={P.quality}>Quality</a></li></ul></div>
          <div><p className="fh">Resources</p><ul><li><a href={P.resources}>All resources</a></li><li><a href={P.pg}>PG thread chart</a></li><li><a href={P.metric}>Metric thread chart</a></li><li><a href={P.bsp}>BSP thread chart</a></li><li><a href={P.npt}>NPT thread chart</a></li><li><a href={P.grades}>Brass grade equivalents</a></li></ul></div>
          <div><p className="fh">Company</p><ul><li><a href={P.about}>About AirGrip</a></li><li><a href={P.industries}>Industries</a></li><li><a href={P.exports}>Ordering &amp; shipping</a></li><li><a href={P.contact}>Contact</a></li><li><a href={P.rfq}>Request a quote</a></li></ul></div>
        </div>
        <div className="ftr__base">
          <span>© 2026 AirGrip</span>
          <span>ISO 9001:2015 certified</span><span><a href={P.privacy}>Privacy policy</a> · <a href="#cookies" data-cookie-settings="">Cookie settings</a></span>
        </div>
      </div>
    </footer>
  );
}

function WhatsApp() {
  const ref = useRef<HTMLAnchorElement>(null);
  const [away, setAway] = useState(false);
  useEffect(() => {
    let overFooter = false, inField = false;
    const upd = () => setAway(overFooter || inField);
    const fi = (e: FocusEvent) => { if ((e.target as Element).matches?.("input,select,textarea")) { inField = true; upd(); } };
    const fo = () => { inField = false; upd(); };
    document.addEventListener("focusin", fi);
    document.addEventListener("focusout", fo);
    const ft = document.querySelector(".ftr");
    let io: IntersectionObserver | undefined;
    if (ft && "IntersectionObserver" in window) {
      io = new IntersectionObserver(([e]) => { overFooter = e.isIntersecting; upd(); }, { rootMargin: "0px 0px -40px 0px" });
      io.observe(ft);
    }
    return () => { document.removeEventListener("focusin", fi); document.removeEventListener("focusout", fo); io?.disconnect(); };
  }, []);
  return (
    <a ref={ref} className={"wa" + (away ? " away" : "")} href={SITE.whatsapp} aria-label="Chat on WhatsApp"><svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M12 2a10 10 0 0 0-8.6 15.1L2 22l5-1.3A10 10 0 1 0 12 2Zm0 18.2a8.2 8.2 0 0 1-4.2-1.2l-.3-.2-3 .8.8-2.9-.2-.3A8.2 8.2 0 1 1 12 20.2Zm4.5-6.1c-.2-.1-1.5-.7-1.7-.8-.2-.1-.4-.1-.6.1l-.8 1c-.1.2-.3.2-.5.1a6.7 6.7 0 0 1-3.3-2.9c-.2-.4.2-.4.7-1.3.1-.2 0-.3 0-.4l-.8-1.8c-.2-.5-.4-.4-.6-.4h-.5a1 1 0 0 0-.7.3 3 3 0 0 0-.9 2.2 5.2 5.2 0 0 0 1.1 2.7 11.8 11.8 0 0 0 4.5 4c1.7.7 2.4.8 3.2.6.5-.1 1.5-.6 1.7-1.2.2-.6.2-1.1.2-1.2-.1-.1-.3-.2-.5-.3Z" /></svg><span className="wa__t">WhatsApp</span></a>
  );
}

/** Sticky "n items in your quote" bar, shown on pages that have + Add buttons. */
function QuoteBar() {
  const items = useBasket();
  const n = items.length;
  useEffect(() => { document.body.classList.toggle("has-qbar", n > 0); }, [n]);
  const codes = n ? "· " + items.slice(0, 3).map((i) => i.code).join(", ") + (n > 3 ? " …" : "") : "";
  return (
    <div className={"qbar" + (n ? " on" : "")} role="status">
      <div className="wrap"><span><b>{n}</b> <span>{n === 1 ? "item" : "items"}</span> in your quote <span className="qcodes">{codes}</span></span><a className="btn btn--sm" href={P.rfq}>Review &amp; send <span className="arr" aria-hidden="true">→</span></a></div>
    </div>
  );
}

export function Layout({ nav, quoteBar, consent, children }: { nav: string; quoteBar: boolean; consent: boolean; children: ReactNode }) {
  return (
    <>
      <Header nav={nav} />
      {children}
      <Footer />
      <WhatsApp />
      {quoteBar && <QuoteBar />}
      <ConsentBanner autoOpen={consent} />
    </>
  );
}
