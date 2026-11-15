// Gland accessory datasheet (stop plugs, earth tags, reducers/enlargers/adapters, conduit gland parts).
// Content: ACCESSORIES in src/data/products.tsx.
import "../styles/pages.css";
import "./accessory.css";
import { Arr, Code, Crumbs, Kv, Related, SizeTabs } from "../components/blocks";
import { FamilyProvider, FamilySwitch } from "../components/Family";
import { PairPicker } from "../components/PairPicker";
import type { Accessory, PartsAccessory, TabsAccessory } from "../data/products";
import { P } from "../site";

function TabsSizes({ a }: { a: TabsAccessory }) {
  return (
    <section className="band" id="sizes"><div className="wrap side">
      <div className="sh"><h2>Sizes and part codes</h2><p>Add sizes to your quote; finish is chosen in the quote form.</p></div>
      <div className="sb">
        {a.heads && <div className="seg-row"><span className="seg-k">Head</span><FamilySwitch id="stop-plugs" /></div>}
        <SizeTabs prefix="s" code={a.code} name={a.item} systems={a.systems} col={a.col} />
        <p className="tbl-note">Dimensions with your quote.</p>
      </div>
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
      {p.sizes && <SizeTabs prefix={p.sizes.prefix} code={p.sizes.code} name={p.sizes.item} systems={p.sizes.systems} />}
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
            <div className="sheet"><div className="frame"><img src={`/img/la/l/${a.img}.svg`} alt={`${a.name} drawing`} style={{ width: "100%", height: "auto" }} /></div></div>
            <p className="tbl-note">Illustrative drawing, not to size.</p>
            {a.photo && <div className="prod__thumbs"><div className="photo"><img src={`/img/${a.photo}`} alt={`${a.name}, photo`} /></div></div>}
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
      {a.kind === "tabs" ? <TabsSizes a={a} /> : <PartsSizes a={a} />}
      <section className="band band--sheet"><div className="wrap">
        <div className="open"><div><h2 className="sub">Used with</h2></div></div>
        <Related items={a.related} />
      </div></section>
    </main>
  );
  // the stop-plug head switch rewrites every part code on the page
  return a.kind === "tabs" && a.heads ? <FamilyProvider id="stop-plugs">{page}</FamilyProvider> : page;
}
