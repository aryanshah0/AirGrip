// Small building blocks shared by the page templates (and by hand-written pages): breadcrumbs, key-value lists,
// FAQs, "Related" cards, size tables with thread-system tabs. Change one here and every page that uses it follows.
import { Fragment, type ReactNode } from "react";
import { AddQ } from "./AddQ";
import { PartCode } from "./Family";
import { srcSet } from "../lib/img";

/** The hero picture of a product page: the drawing, with a Drawing | Photo switch when photos exist. Photos are shown
 *  at the same size as the drawing, so every product page treats photos the same way. */
export function Plate({ drawing, photos }: { drawing: ReactNode; photos: [file: string, alt: string][] }) {
  if (!photos.length) return <>{drawing}</>;
  return (
    <div className="plate">
      <div className="seg plate__sw" role="tablist" aria-label="View">
        <button role="tab" id="v-d" aria-selected="true" aria-controls="v-dp">Drawing</button>
        <button role="tab" id="v-p" aria-selected="false" aria-controls="v-pp" tabIndex={-1}>Photo{photos.length > 1 ? "s" : ""}</button>
      </div>
      <div role="tabpanel" id="v-dp" aria-labelledby="v-d">{drawing}</div>
      <div role="tabpanel" id="v-pp" aria-labelledby="v-p" hidden>
        <div className={"plate__ph" + (photos.length > 1 ? " is-many" : "")}>
          {photos.map(([f, alt]) => <img key={f} src={`/img/${f}`} {...srcSet(f, photos.length > 1 ? "(max-width: 559px) 50vw, 300px" : "(max-width: 559px) 100vw, 600px")} alt={alt} loading="lazy" />)}
        </div>
      </div>
    </div>
  );
}

/** Monospace run (numbers, codes, standards). */
export const M = ({ children }: { children: ReactNode }) => <span className="mono">{children}</span>;
/** Part code that must not wrap. */
export const Code = ({ children }: { children: ReactNode }) => <span className="mono nw">{children}</span>;
/** Arrow after a button label. */
export const Arr = ({ ch = "→" }: { ch?: string }) => <span className="arr" aria-hidden="true">{ch}</span>;

export type Crumb = [label: string, href?: string];
export function Crumbs({ items }: { items: Crumb[] }) {
  const last = items[items.length - 1];
  return (
    <ol className="crumbs" aria-label="Breadcrumb">
      <li><a href="/">Home</a></li>
      {items.slice(0, -1).map(([label, href]) => <li key={label}><a href={href}>{label}</a></li>)}
      <li aria-current="page">{last[0]}</li>
    </ol>
  );
}

export type KvRow = [term: ReactNode, value: ReactNode];
export function Kv({ rows }: { rows: KvRow[] }) {
  return <dl className="kv">{rows.map(([k, v], i) => <Fragment key={i}><dt>{k}</dt><dd>{v}</dd></Fragment>)}</dl>;
}

export type FaqItem = [question: string, answer: ReactNode];
/** FAQ list; the first answer is open. The build turns every .faq into FAQPage structured data. */
export function Faq({ items }: { items: FaqItem[] }) {
  return <div className="faq">{items.map(([q, a], i) => <details key={q} open={i === 0 || undefined}><summary>{q}</summary><div>{a}</div></details>)}</div>;
}

/** Line drawing with a small phone version (img/la/t/). */
export function Pic({ name, alt = "" }: { name: string; alt?: string }) {
  return (
    <picture>
      <source media="(max-width: 559px)" srcSet={`/img/la/t/${name}.svg`} />
      <img src={`/img/la/${name}.svg`} alt={alt} loading="lazy" />
    </picture>
  );
}

/** img: a line drawing; txt instead of a drawing for pages that are not a part (capabilities, data tables) */
export interface Card { href: string; img: string; txt?: string; name: string; sub: string }
export function Related({ items }: { items: Card[] }) {
  return (
    <div className="rel">
      {items.map((c) => <a key={c.href} href={c.href}>{c.txt ? <div className="photo txt"><span>{c.txt}</span></div> : <div className="photo"><Pic name={c.img} /></div>}<b>{c.name}</b><span>{c.sub}</span></a>)}
    </div>
  );
}

/** Sections that alternate between the sheet colour and plain, starting with the sheet colour. */
export function Bands({ sections }: { sections: (ReactNode | false | null | undefined)[] }) {
  return <>{sections.filter(Boolean).map((s, i) => <section key={i} className={i % 2 === 0 ? "band band--sheet" : "band"}>{s}</section>)}</>;
}

export interface SizeRow { label: string; token: string }
export interface SizeSystem { tab: string; sizes: SizeRow[] }
const STD: Record<string, string> = { PG: "DIN 40430", Metric: "EN 60423", BSP: "ISO 228-1", NPT: "ASME B1.20.1" };
/** Every thread system at once, side by side (two columns from 720 px): part code + "+ Add" per size. */
export function SizeGrid({ code, name, systems, col = "Thread", caption }: { code: string; name: string; systems: SizeSystem[]; col?: string; caption: string }) {
  return (
    <div className="sysgrid">
      {systems.map((s) => (
        <div key={s.tab}>
          <h3 className="h4">{s.tab}{STD[s.tab] && <span className="muted">&nbsp;· {STD[s.tab]}</span>}</h3>
          <div className="tbl"><table className="spec">
            <caption className="sr-only">{caption}, {s.tab} sizes</caption>
            <thead><tr><th className="stick">Part code</th><th>{col}</th></tr></thead>
            <tbody>
              {s.sizes.map((z) => (
                <tr key={z.token}>
                  <td className="stick"><PartCode code={`${code}-${z.token}`} /><AddQ code={`${code}-${z.token}`} label={`${name} ${z.label}`} /></td>
                  <td>{z.label}</td>
                </tr>
              ))}
            </tbody>
          </table></div>
        </div>
      ))}
    </div>
  );
}
