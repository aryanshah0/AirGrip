// Reducer / enlarger / adapter picker: enclosure entry thread + gland thread -> part code AG-RD-PG16M20 etc.
// Only valid pairs are offered: reducer = gland thread smaller than the entry, enlarger = larger,
// adapter = a different thread system. Invalid options are not rendered at all (Safari ignores hidden <option>s).
import { useState } from "react";
import { AddQ } from "./AddQ";
import { THREADS as T, type Thread } from "../data/products";

const byToken = (t: string) => T.find((x) => x.token === t)!;

function valid(kind: string, entry: Thread, g: Thread) {
  const d = g.od - entry.od;
  return kind === "RD" ? d < 0 : kind === "EN" ? d > 0 : g.sys !== entry.sys;
}

export function PairPicker({ code, what, entry, gland }: { code: string; what: string; entry: string; gland: string }) {
  const kind = code.slice(-2);
  const [e, setE] = useState(entry);
  const [g, setG] = useState(gland);
  const E = byToken(e);
  const options = T.filter((x) => valid(kind, E, x));
  const gSel = options.some((x) => x.token === g) ? g : options[0]?.token ?? g;
  const G = byToken(gSel);
  const full = `${code}-${e}${gSel}`;
  return (
    <div className="pair" data-code={code} data-what={what}>
      <label>Enclosure entry<select className="input" value={e} onChange={(ev) => setE(ev.target.value)}>
        {T.filter((x) => T.some((y) => valid(kind, x, y))).map((x) => <option key={x.token} value={x.token}>{x.label}</option>)}
      </select></label>
      <label>Gland thread<select className="input" value={gSel} onChange={(ev) => setG(ev.target.value)}>
        {options.map((x) => <option key={x.token} value={x.token}>{x.label}</option>)}
      </select></label>
      <AddQ className="btn btn--sm btn--ghost addq" code={full} label={`${what} ${E.label} to ${G.label}`} />
      <span className="mono pair__code">{full}</span>
    </div>
  );
}
