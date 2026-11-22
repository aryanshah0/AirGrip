// Gland accessory datasheet (lock nuts, stop plugs, earth tags, reducers/enlargers/adapters, conduit gland parts).
// Content: ACCESSORIES in src/data/products.tsx.
import "../styles/pages.css";
import "./accessory.css";
import { Arr, Code, Crumbs, Kv, Plate, Related, SizeGrid } from "../components/blocks";
import { FamilyProvider, FamilySwitch } from "../components/Family";
import { PairPicker } from "../components/PairPicker";
import type { Accessory, PartsAccessory, TabsAccessory } from "../data/products";
import { P } from "../site";

/** Compliance under every accessory size list (the gland pages carry the same facts in their compliance block). */
function Compliance({ a }: { a: Accessory }) {
  return a.material === "strip"
    ? <p className="tbl-note">EN 10204 3.1 mill certificate with every batch. Strip grade and RoHS / REACH status with your quote.</p>
    : <p className="tbl-note">Leaded brass (CW614N) contains lead above 0.1 % (REACH candidate list; Article 33 statement on request) and is covered by RoHS Annex III exemption 6(c), currently valid until 30 June 2027 (Delegated Directive (EU) 2025/2364); <a className="link" href={P.guideLeadFree}>lead-free</a> CW724R on request. EN 10204 3.1 mill certificate with every batch.</p>;
}

/** Thread standards under the size lists, each linked to its chart. */
function ThreadStd({ all }: { all: boolean }) {
  return <>Thread standards: <a className="link" href={P.pg}>PG DIN 40430</a>&nbsp;· <a className="link" href={P.metric}>metric EN 60423</a>{all && <>&nbsp;· <a className="link" href={P.bsp}>BSP ISO 228-1</a>&nbsp;· <a className="link" href={P.npt}>NPT ASME B1.20.1</a></>}.</>;
}

/** Same layout as the gland pages: the drawing as a key on the left, every thread system side by side on the right. */
function TabsSizes({ a }: { a: TabsAccessory }) {
  const used = a.systems.map((s) => s.tab);
  return (
    <section className="band" id="sizes"><div className="wrap">
      <div className="open"><div><h2>Sizes and part codes</h2></div><p>Add sizes to your quote; finish is chosen in the quote form.</p></div>
      <div className="dims">
        <details className="dimkey" open>
          <summary>Drawing</summary>
          <figure><div className="frame"><img src={`/img/la/l/${a.img}.svg`} alt={`${a.name} drawing`} style={{ width: "100%", height: "auto" }} /></div><figcaption>Illustrative drawing, not to size. Dimensions come with your quote, on a dimensioned drawing.</figcaption></figure>
        </details>
        <div>
          {a.family && <div className="seg-row"><span className="seg-k">{a.family.label}</span><FamilySwitch id={a.family.id} /></div>}
          <SizeGrid code={a.code} name={a.item} systems={a.systems} col={a.col} caption={a.name} />
          <p className="tbl-note" style={{ marginTop: "var(--s-5)" }}><ThreadStd all={used.length > 2} /></p>
          <Compliance a={a} />
        </div>
      </div>
    </div></section>
  );
}

function Types({ t }: { t: NonNullable<TabsAccessory["types"]> }) {
  return (
    <section className="band band--sheet" id="types"><div className="wrap side">
      <div className="sh"><h2>{t.h2}</h2><p>{t.intro}</p></div>
      <div className="sb"><div className="types">
        {t.items.map(([h, p, c]) => <div key={h}><h3>{h}</h3><p>{p}</p><p className="mono" style={{ marginTop: "var(--s-3)", color: "var(--ink)" }}>{c}</p></div>)}
      </div></div>
    </div></section>
  );
}

function PartsSizes({ a }: { a: PartsAccessory }) {
  const parts = a.parts.map((p) => (
    <div key={p.id} className="part" id={p.id}>
      <div className="part__head">
        <div className="photo"><img src={`/img/${p.photo}`} alt={`Brass ${p.title.toLowerCase()}`} loading="lazy" /></div>
        <div><h2 className="h3" style={{ margin: "0 0 var(--s-3)" }}>{p.title}</h2><p>{p.text}</p></div>
      </div>
      {p.sizes && <SizeGrid code={p.sizes.code} name={p.sizes.item} systems={p.sizes.systems} caption={p.title} />}
      {p.pair && <>
        <PairPicker {...p.pair} />
        <p className="tbl-note">Code: <Code>{p.pair.code}-[entry][gland]-[finish]</Code>, one quote line per pair. Finish is chosen in the quote form. Dimensions with your quote.</p>
      </>}
    </div>
  ));
  return (
    <section className="band" id="sizes"><div className="wrap">
      <div className="open"><div><h2>{a.h2}</h2></div><p>{a.intro}</p></div>
      {a.twoColumns ? <div className="parts2">{parts}</div> : parts}
      {a.notes}
      <Compliance a={a} />
    </div></section>
  );
}

export function AccessoryPage({ a }: { a: Accessory }) {
  const page = (
    <main id="main">
      <section className="band--tight" style={{ paddingTop: "var(--s-6)" }}><div className="wrap">
        <Crumbs items={[["Products", P.products], ["Brass cable glands", P.glands], [a.name]]} />
        <div className="prod" style={{ marginTop: "var(--s-5)" }}>
          <figure className="prod__fig" style={{ margin: "0" }}>
            <Plate drawing={<div className="sheet"><div className="frame"><img src={`/img/la/l/${a.img}.svg`} alt={`${a.name} drawing`} style={{ width: "100%", height: "auto" }} /></div></div>} photos={a.photos} />
            <p className="tbl-note">Illustrative drawing, not to size.</p>
          </figure>
          <div className="prod__info">
            <span className="eyebrow">Gland accessories&nbsp;· <span className="mono" style={{ letterSpacing: "0" }}>{a.eyebrow ?? a.code}</span></span>
            <h1>{a.h1}</h1>
            <p className="lead">{a.lead}</p>
            <Kv rows={a.facts} />
            <div className="prod__cta"><a className="btn" href="#sizes">Choose sizes <Arr ch="↓" /></a></div>
          </div>
        </div>
      </div></section>
      {a.kind === "tabs" && a.types && <Types t={a.types} />}
      {a.kind === "tabs" ? <TabsSizes a={a} /> : <PartsSizes a={a} />}
      <section className="band band--sheet"><div className="wrap">
        <div className="open"><div><h2 className="sub">Used with</h2></div></div>
        <Related items={a.related} />
        <div className="cta" style={{ marginTop: "var(--s-8)" }}>
          <div><h2>{a.code.includes("AG-AD") ? "Need a size or conversion that isn't listed?" : "Need a size that isn't listed?"}</h2><p>{a.code.includes("AG-AD") ? "Any conversion within the accessory range on request." : "Other sizes on request; send the thread and quantity."}</p></div>
          <div className="acts"><a className="btn" href={P.rfq}>Request a quote <Arr /></a></div>
        </div>
      </div></section>
    </main>
  );
  // the stop-plug head switch rewrites every part code on the page
  return a.kind === "tabs" && a.family ? <FamilyProvider id={a.family.id}>{page}</FamilyProvider> : page;
}
