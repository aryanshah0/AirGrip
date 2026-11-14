// Code-family switch on the stop-plug (slotted dome AG-SP / hex head AG-SH) and lock-nut (standard AG-LN / EMC AG-LE)
// pages. The switch rewrites every part code and "+ Add" label in the size tables.
import { createContext, useContext, useState, type ReactNode } from "react";

interface Option { value: string; text: string; prefix: string; name: string }
interface FamilyDef { label: string; rx: RegExp; nameRx: RegExp; options: Option[]; marginBottom?: string; wrap: "seg-row" | "acc-ctl" }

const FAMILIES: Record<string, FamilyDef> = {
  "stop-plugs": {
    label: "Head", rx: /^AG-S[PH]-/, nameRx: /^(Hex-head )?Stop plug/, wrap: "seg-row",
    options: [
      { value: "AG-SP", text: "Slotted dome", prefix: "AG-SP-", name: "Stop plug" },
      { value: "AG-SH", text: "Hex head", prefix: "AG-SH-", name: "Hex-head stop plug" },
    ],
  },
  accessory: {
    label: "Lock nut type", rx: /^AG-L[NE]-/, nameRx: /^(EMC )?Lock nut/, wrap: "acc-ctl", marginBottom: "0",
    options: [
      { value: "LN", text: "Standard · AG-LN", prefix: "AG-LN-", name: "Lock nut" },
      { value: "LE", text: "EMC · AG-LE", prefix: "AG-LE-", name: "EMC lock nut" },
    ],
  },
};

interface Ctx { id: string; sel: number; set: (i: number) => void; code: (c: string) => string; label: (l: string) => string }
const FamilyCtx = createContext<Ctx | null>(null);
export const useFamily = () => useContext(FamilyCtx);

export function FamilyProvider({ id, children }: { id: string; children: ReactNode }) {
  const def = FAMILIES[id];
  const [sel, set] = useState(0);
  const o = def.options[sel];
  const value: Ctx = {
    id, sel, set,
    code: (c) => (def.rx.test(c) ? c.replace(def.rx, o.prefix) : c),
    label: (l) => l.replace(def.nameRx, o.name),
  };
  return <FamilyCtx.Provider value={value}>{children}</FamilyCtx.Provider>;
}

export function FamilySwitch({ id }: { id: string }) {
  const ctx = useFamily();
  const def = FAMILIES[id];
  if (!ctx) return null;
  const seg = (
    <div className="seg" role="radiogroup" aria-label={def.label} style={def.marginBottom !== undefined ? { marginBottom: def.marginBottom } : undefined}>
      {def.options.map((o, i) => (
        <button key={o.value} type="button" role="radio" aria-checked={ctx.sel === i} {...(def.wrap === "acc-ctl" ? { "aria-selected": ctx.sel === i } : {})}
          {...(def.wrap === "acc-ctl" ? { "data-t": o.value } : { "data-fam": o.value })} onClick={() => ctx.set(i)}>{o.text}</button>
      ))}
    </div>
  );
  return seg; // the surrounding .seg-row / .acc-ctl markup stays in the page
}

/** A part code that follows the family switch. */
export function PartCode({ code }: { code: string }) {
  const ctx = useFamily();
  return <span className="mono nw">{ctx ? ctx.code(code) : code}</span>;
}
