// Page markup, first converted from design/industries.html (frozen); edit here.

import "../styles/pages.css";
import "./css/Industries.css";

export default function Industries() {
  return (
    <>
      <main>{" "}
      <section className="phead">{" "}
      <div className="wrap">{" "}
      <ol className="crumbs" aria-label="Breadcrumb"><li><a href="/">Home</a></li><li aria-current="page">Industries</li></ol>{" "}
      <h1>Industries we supply</h1>{" "}
      <p className="lead">Brass is chosen for machinability, conductivity and corrosion resistance. These are the sectors where our parts are used most, with typical parts and the product groups that serve them.</p>{" "}
      </div>{" "}
      </section>{" "}
      <section className="band">{" "}
      <div className="wrap">{" "}
      <div className="tbl"><table className="spec stack-m itbl">
      <thead><tr><th className="stick">Sector</th><th>What we supply</th><th>Product groups</th></tr></thead>
      <tbody>
      <tr id="electrical"><td className="stick" data-l="Sector"><b>Electrical &amp; switchgear</b></td><td data-l="What we supply">Cable glands and accessories for panels and enclosures; terminal blocks, connectors, earth blocks and neutral links for MCB, RCD and switchgear makers.</td><td className="pg" data-l="Product groups"><a className="link" href="/products/brass-cable-glands/">Brass cable glands</a><a className="link" href="/products/brass-cable-glands/#accessories">Gland accessories</a><a className="link" href="/products/brass-electrical-terminals/">Electrical terminals &amp; connectors</a></td></tr>
      <tr id="automotive"><td className="stick" data-l="Sector"><b>Automotive</b></td><td data-l="What we supply">Battery-terminal fasteners and kits, and forged and turned parts to drawing. ISO 9001:2015 (not IATF 16949); PPAP Level 3 on request.</td><td className="pg" data-l="Product groups"><a className="link" href="/products/special-fasteners/">Special fasteners</a><a className="link" href="/products/brass-turned-components/">Brass turned components</a></td></tr>
      <tr id="plumbing"><td className="stick" data-l="Sector"><b>Plumbing &amp; sanitary</b></td><td data-l="What we supply">Fittings, adapters and valve parts. DZR or lead-free brass where drinking-water rules require it.</td><td className="pg" data-l="Product groups"><a className="link" href="/products/brass-fittings/">Brass fittings</a><a className="link" href="/products/brass-forged-components/">Forged brass components</a><a className="link" href="/products/brass-moulding-inserts/">Moulding inserts</a></td></tr>
      <tr id="hvac"><td className="stick" data-l="Sector"><b>HVAC &amp; refrigeration</b></td><td data-l="What we supply">Turned and forged parts to drawing.</td><td className="pg" data-l="Product groups"><a className="link" href="/products/brass-forged-components/">Forged brass components</a><a className="link" href="/products/brass-turned-components/">Brass turned components</a></td></tr>
      <tr id="hydraulics"><td className="stick" data-l="Sector"><b>Hydraulics &amp; pneumatics</b></td><td data-l="What we supply">Hydraulic and pneumatic fittings, turned or forged.</td><td className="pg" data-l="Product groups"><a className="link" href="/products/brass-turned-components/">Brass turned components</a><a className="link" href="/products/brass-fittings/">Brass fittings</a></td></tr>
      <tr id="moulding"><td className="stick" data-l="Sector"><b>Plastic moulding &amp; pipes</b></td><td data-l="What we supply">Threaded and knurled inserts moulded into plastic housings, PE and PP pipe fittings and electrofusion couplings.</td><td className="pg" data-l="Product groups"><a className="link" href="/products/brass-moulding-inserts/">Moulding inserts</a></td></tr>
      </tbody>
      </table></div>{" "}
      <p className="tbl-note" style={{"marginTop": "var(--s-4)"}}>Approvals such as WRAS, DVGW or NSF/ANSI 61 belong to your finished product; tell us which your drawing calls up. Our cable glands are not certified for hazardous (Ex / ATEX) areas.</p>{" "}
      <div className="cta" style={{"marginTop": "var(--s-8)"}}>{" "}
      <div><h2>Supplying a sector not listed here?</h2><p>Tell us the application with your drawing; we'll tell you whether it suits our processes.</p></div>{" "}
      <div className="acts"><a className="btn" href="/rfq/">Send a drawing{" "}<span className="arr" aria-hidden="true">→</span></a></div>{" "}
      </div>{" "}
      </div>{" "}
      </section>{" "}
      </main>
    </>
  );
}
