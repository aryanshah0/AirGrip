// Small building blocks shared by the page templates (and by hand-written pages): breadcrumbs, key-value lists,
// FAQs, "Related" cards, size tables with thread-system tabs. Change one here and every page that uses it follows.
import { Fragment, type ReactNode } from "react";
import { AddQ } from "./AddQ";
import { PartCode } from "./Family";

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

export interface Card { href: string; img: string; name: string; sub: string }
export function Related({ items }: { items: Card[] }) {
  return (
    <div className="rel">
      {items.map((c) => <a key={c.href} href={c.href}><div className="photo"><Pic name={c.img} /></div><b>{c.name}</b><span>{c.sub}</span></a>)}
    </div>
  );
}

/** Sections that alternate between the sheet colour and plain, starting with the sheet colour. */
export function Bands({ sections }: { sections: (ReactNode | false | null | undefined)[] }) {
  return <>{sections.filter(Boolean).map((s, i) => <section key={i} className={i % 2 === 0 ? "band band--sheet" : "band"}>{s}</section>)}</>;
}

export interface SizeRow { label: string; token: string }
export interface SizeSystem { tab: string; sizes: SizeRow[] }
/** Thread-system tabs with one size table each: part code + "+ Add" per size. `prefix` keeps tab ids unique. */
export function SizeTabs({ prefix, code, name, systems, col = "Thread" }: { prefix: string; code: string; name: string; systems: SizeSystem[]; col?: string }) {
  return (
    <>
      <div className="seg" role="tablist" aria-label="Thread system">
        {systems.map((s, i) => (
          <button key={s.tab} role="tab" id={`${prefix}t${i}`} aria-selected={i === 0} aria-controls={`${prefix}p${i}`} tabIndex={i === 0 ? undefined : -1}>{s.tab}</button>
        ))}
      </div>
      {systems.map((s, i) => (
        <div key={s.tab} role="tabpanel" id={`${prefix}p${i}`} aria-labelledby={`${prefix}t${i}`} hidden={i > 0 || undefined}>
          <div className="tbl"><table className="spec">
            <thead><tr><th className="stick">Part code</th><th className="n">{col}</th></tr></thead>
            <tbody>
              {s.sizes.map((z) => (
                <tr key={z.token}>
                  <td className="stick"><PartCode code={`${code}-${z.token}`} /><AddQ code={`${code}-${z.token}`} label={`${name} ${z.label}`} /></td>
                  <td className="n">{z.label}</td>
                </tr>
              ))}
            </tbody>
          </table></div>
        </div>
      ))}
    </>
  );
}
