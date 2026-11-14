// Generated from design/accessory.html by tools/convert.py. Do not edit; change the design and re-run.

import "../styles/pages.css";
import "./css/LockNuts.css";
import { AddQ } from "../components/AddQ";
import { FamilyProvider } from "../components/Family";
import { FamilySwitch } from "../components/Family";
import { PartCode } from "../components/Family";

export default function LockNuts() {
  return (
    <FamilyProvider id="accessory">
      <main>{" "}
      <section className="band--tight" style={{"paddingTop": "var(--s-6)"}}>{" "}
      <div className="wrap">{" "}
      <ol className="crumbs" aria-label="Breadcrumb"><li><a href="/">Home</a></li><li><a href="/products/">Products</a></li><li><a href="/products/brass-cable-glands/">Brass cable glands</a></li><li aria-current="page">Lock nuts</li></ol>{" "}
      <div className="prod" style={{"marginTop": "var(--s-5)"}}>{" "}
      <figure className="prod__fig" style={{"margin": "0"}}>{" "}
      <div className="sheet"><div className="frame"><img src="/img/la/l/locknut.svg" alt="Drawing of a brass lock nut: side section and end view showing the hexagon and internal thread" width="240" height="160" /></div></div>{" "}
      <p className="tbl-note">Illustrative drawing, not to size.</p>{" "}
      <div className="prod__thumbs">{" "}
      <div className="photo"><img src="/img/08-Brass-Lock-Nut.webp" alt="Brass lock nuts" width="462" height="330" /></div>{" "}
      <div className="photo"><img src="/img/08-EMC-Lock-Nut.webp" alt="EMC lock nut" /></div>{" "}
      </div>{" "}
      </figure>{" "}
      <div className="prod__info">{" "}
      <span className="eyebrow">Gland accessories ·{" "}<span className="mono" style={{"letterSpacing": "0"}}>AG-LN · AG-LE</span></span>{" "}
      <h1>Brass lock nuts for cable glands</h1>{" "}
      <p className="lead">Lock nuts fasten cable glands and accessories to an enclosure wall, gland plate or equipment housing. Available as standard brass lock nuts and as EMC lock nuts.</p>{" "}
      <dl className="kv">{" "}
      <dt>Threads</dt><dd><span className="mono">PG 7–48 · M12–M80</span>{" "}·{" "}<span className="mono">BSP and NPT 3/8–1½"</span></dd>{" "}
      <dt>Material</dt><dd>Brass CuZn39Pb3 (<span className="mono">CW614N</span>); lead-free on request</dd>{" "}
      <dt>Finish</dt><dd>Natural, or plated in our plant: nickel, tin or zinc</dd>{" "}
      <dt>Part code</dt><dd><span className="mono nw">AG-LN-[size]-[finish]</span>{" "}· EMC{" "}<span className="mono nw">AG-LE-[size]-[finish]</span></dd>{" "}
      <dt>Other sizes</dt><dd>Other sizes and conversions on request</dd>{" "}
      </dl>{" "}
      <div className="prod__cta"><a className="btn" href="#sizes">Choose sizes{" "}<span className="arr" aria-hidden="true">↓</span></a></div>{" "}
      </div>{" "}
      </div>{" "}
      </div>{" "}
      </section>{" "}
      <section className="band band--sheet" id="types">{" "}
      <div className="wrap side">{" "}
      <div className="sh"><h2>Standard or EMC</h2><p>Two types; choose one above the size table.</p></div>{" "}
      <div className="sb">{" "}
      <div className="types">{" "}
      <div><h3>Standard lock nut</h3><p>Plain hexagon lock nut that clamps the gland against the enclosure wall.</p><p className="mono" style={{"marginTop": "var(--s-3)", "color": "var(--ink)"}}>AG-LN-[size]-[finish]</p></div>{" "}
      <div><h3>EMC lock nut</h3><p>Lock nut for installations that need electrical contact between gland and enclosure.</p><p className="mono" style={{"marginTop": "var(--s-3)", "color": "var(--ink)"}}>AG-LE-[size]-[finish]</p></div>{" "}
      </div>{" "}
      </div>{" "}
      </div>{" "}
      </section>{" "}
      <section className="band" id="sizes">{" "}
      <div className="wrap side">{" "}
      <div className="sh"><h2>Sizes and part codes</h2><p>Add sizes to your quote; finish is chosen in the quote form.</p></div><div className="sb">{" "}
      <div className="acc-ctl"><FamilySwitch id="accessory" />{" "}<div className="seg" role="tablist" aria-label="Thread system" style={{"marginBottom": "0"}}>{" "}
      <button role="tab" id="t1" aria-selected="true" aria-controls="p1">PG</button><button role="tab" id="t2" aria-selected="false" aria-controls="p2" tabIndex={-1}>Metric</button><button role="tab" id="t3" aria-selected="false" aria-controls="p3" tabIndex={-1}>BSP</button><button role="tab" id="t4" aria-selected="false" aria-controls="p4" tabIndex={-1}>NPT</button>{" "}
      </div></div>{" "}
      <div role="tabpanel" id="p1" aria-labelledby="t1"><div className="tbl"><table className="spec">
      <thead><tr><th className="stick">Part code</th><th className="n">Thread</th></tr></thead>
      <tbody>
      <tr><td className="stick"><PartCode code="AG-LN-PG07" /><AddQ code="AG-LN-PG07" label="Lock nut PG 7" /></td><td className="n">PG 7</td></tr>
      <tr><td className="stick"><PartCode code="AG-LN-PG09" /><AddQ code="AG-LN-PG09" label="Lock nut PG 9" /></td><td className="n">PG 9</td></tr>
      <tr><td className="stick"><PartCode code="AG-LN-PG11" /><AddQ code="AG-LN-PG11" label="Lock nut PG 11" /></td><td className="n">PG 11</td></tr>
      <tr><td className="stick"><PartCode code="AG-LN-PG13" /><AddQ code="AG-LN-PG13" label="Lock nut PG 13.5" /></td><td className="n">PG 13.5</td></tr>
      <tr><td className="stick"><PartCode code="AG-LN-PG16" /><AddQ code="AG-LN-PG16" label="Lock nut PG 16" /></td><td className="n">PG 16</td></tr>
      <tr><td className="stick"><PartCode code="AG-LN-PG21" /><AddQ code="AG-LN-PG21" label="Lock nut PG 21" /></td><td className="n">PG 21</td></tr>
      <tr><td className="stick"><PartCode code="AG-LN-PG29" /><AddQ code="AG-LN-PG29" label="Lock nut PG 29" /></td><td className="n">PG 29</td></tr>
      <tr><td className="stick"><PartCode code="AG-LN-PG36" /><AddQ code="AG-LN-PG36" label="Lock nut PG 36" /></td><td className="n">PG 36</td></tr>
      <tr><td className="stick"><PartCode code="AG-LN-PG42" /><AddQ code="AG-LN-PG42" label="Lock nut PG 42" /></td><td className="n">PG 42</td></tr>
      <tr><td className="stick"><PartCode code="AG-LN-PG48" /><AddQ code="AG-LN-PG48" label="Lock nut PG 48" /></td><td className="n">PG 48</td></tr>
      </tbody></table></div></div>{" "}
      <div role="tabpanel" id="p2" aria-labelledby="t2" hidden><div className="tbl"><table className="spec">
      <thead><tr><th className="stick">Part code</th><th className="n">Thread</th></tr></thead>
      <tbody>
      <tr><td className="stick"><PartCode code="AG-LN-M12" /><AddQ code="AG-LN-M12" label="Lock nut M12×1.5" /></td><td className="n">M12×1.5</td></tr>
      <tr><td className="stick"><PartCode code="AG-LN-M16" /><AddQ code="AG-LN-M16" label="Lock nut M16×1.5" /></td><td className="n">M16×1.5</td></tr>
      <tr><td className="stick"><PartCode code="AG-LN-M20" /><AddQ code="AG-LN-M20" label="Lock nut M20×1.5" /></td><td className="n">M20×1.5</td></tr>
      <tr><td className="stick"><PartCode code="AG-LN-M25" /><AddQ code="AG-LN-M25" label="Lock nut M25×1.5" /></td><td className="n">M25×1.5</td></tr>
      <tr><td className="stick"><PartCode code="AG-LN-M32" /><AddQ code="AG-LN-M32" label="Lock nut M32×1.5" /></td><td className="n">M32×1.5</td></tr>
      <tr><td className="stick"><PartCode code="AG-LN-M40" /><AddQ code="AG-LN-M40" label="Lock nut M40×1.5" /></td><td className="n">M40×1.5</td></tr>
      <tr><td className="stick"><PartCode code="AG-LN-M50" /><AddQ code="AG-LN-M50" label="Lock nut M50×1.5" /></td><td className="n">M50×1.5</td></tr>
      <tr><td className="stick"><PartCode code="AG-LN-M63" /><AddQ code="AG-LN-M63" label="Lock nut M63×1.5" /></td><td className="n">M63×1.5</td></tr>
      <tr><td className="stick"><PartCode code="AG-LN-M80" /><AddQ code="AG-LN-M80" label="Lock nut M80" /></td><td className="n">M80</td></tr>
      </tbody></table></div></div>{" "}
      <div role="tabpanel" id="p3" aria-labelledby="t3" hidden><div className="tbl"><table className="spec">
      <thead><tr><th className="stick">Part code</th><th className="n">Thread</th></tr></thead>
      <tbody>
      <tr><td className="stick"><PartCode code="AG-LN-G38" /><AddQ code="AG-LN-G38" label="Lock nut G 3/8" /></td><td className="n">G 3/8</td></tr>
      <tr><td className="stick"><PartCode code="AG-LN-G12" /><AddQ code="AG-LN-G12" label="Lock nut G 1/2" /></td><td className="n">G 1/2</td></tr>
      <tr><td className="stick"><PartCode code="AG-LN-G34" /><AddQ code="AG-LN-G34" label="Lock nut G 3/4" /></td><td className="n">G 3/4</td></tr>
      <tr><td className="stick"><PartCode code="AG-LN-G1" /><AddQ code="AG-LN-G1" label="Lock nut G 1" /></td><td className="n">G 1</td></tr>
      <tr><td className="stick"><PartCode code="AG-LN-G114" /><AddQ code="AG-LN-G114" label="Lock nut G 1 1/4" /></td><td className="n">G 1¼</td></tr>
      <tr><td className="stick"><PartCode code="AG-LN-G112" /><AddQ code="AG-LN-G112" label="Lock nut G 1 1/2" /></td><td className="n">G 1½</td></tr>
      </tbody></table></div></div>{" "}
      <div role="tabpanel" id="p4" aria-labelledby="t4" hidden><div className="tbl"><table className="spec">
      <thead><tr><th className="stick">Part code</th><th className="n">Thread</th></tr></thead>
      <tbody>
      <tr><td className="stick"><PartCode code="AG-LN-N38" /><AddQ code="AG-LN-N38" label="Lock nut 3/8 NPT" /></td><td className="n">3/8 NPT</td></tr>
      <tr><td className="stick"><PartCode code="AG-LN-N12" /><AddQ code="AG-LN-N12" label="Lock nut 1/2 NPT" /></td><td className="n">1/2 NPT</td></tr>
      <tr><td className="stick"><PartCode code="AG-LN-N34" /><AddQ code="AG-LN-N34" label="Lock nut 3/4 NPT" /></td><td className="n">3/4 NPT</td></tr>
      <tr><td className="stick"><PartCode code="AG-LN-N1" /><AddQ code="AG-LN-N1" label="Lock nut 1 NPT" /></td><td className="n">1 NPT</td></tr>
      <tr><td className="stick"><PartCode code="AG-LN-N114" /><AddQ code="AG-LN-N114" label="Lock nut 1 1/4 NPT" /></td><td className="n">1¼ NPT</td></tr>
      <tr><td className="stick"><PartCode code="AG-LN-N112" /><AddQ code="AG-LN-N112" label="Lock nut 1 1/2 NPT" /></td><td className="n">1½ NPT</td></tr>
      </tbody></table></div></div>{" "}
      <p className="tbl-note">PG to DIN 40430; metric to EN 60423; BSP to ISO 228-1; NPT to ASME B1.20.1. Leaded brass under RoHS Annex III exemption 6(c); EN 10204 3.1 mill certificate with every batch.</p>{" "}
      </div></div>{" "}
      </section>{" "}
      <section className="band band--sheet">{" "}
      <div className="wrap">{" "}
      <div className="open"><div><h2 className="sub">Used with</h2></div></div>{" "}
      <div className="rel">{" "}
      <a href="/products/brass-cable-glands/"><div className="photo"><picture><source media="(max-width: 559px)" srcSet="/img/la/t/gland.svg" /><img src="/img/la/gland.svg" alt="" loading="lazy" /></picture></div><b>Brass cable glands</b><span><span className="mono nw">AG-CJ · AG-SR · AG-PS</span></span></a>{" "}
      <a href="/products/brass-cable-glands/earth-tags/"><div className="photo"><picture><source media="(max-width: 559px)" srcSet="/img/la/t/earthtag.svg" /><img src="/img/la/earthtag.svg" alt="" loading="lazy" /></picture></div><b>Earth tags</b><span><span className="mono nw">AG-ET</span></span></a>{" "}
      <a href="/products/brass-cable-glands/thread-adapters/"><div className="photo"><picture><source media="(max-width: 559px)" srcSet="/img/la/t/reducer.svg" /><img src="/img/la/reducer.svg" alt="" loading="lazy" /></picture></div><b>Reducers, enlargers &amp; adapters</b><span>Change the entry thread</span></a>{" "}
      <a href="/products/brass-cable-glands/stop-plugs/"><div className="photo"><picture><source media="(max-width: 559px)" srcSet="/img/la/t/stopplug.svg" /><img src="/img/la/stopplug.svg" alt="" loading="lazy" /></picture></div><b>Stop plugs</b><span><span className="mono nw">AG-SP · AG-SH</span></span></a>{" "}
      </div>{" "}
      </div>{" "}
      </section>{" "}
      </main>
    </FamilyProvider>
  );
}
