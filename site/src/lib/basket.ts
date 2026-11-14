// Quote list ("basket"): part codes the buyer added from datasheets. Kept in localStorage so it survives page loads.
// Items are part codes WITHOUT the finish; the finish (one or more per code) is chosen on the quote form.
import { useSyncExternalStore } from "react";
import { track } from "./analytics";

export interface BasketItem { code: string; label: string }

const KEY = "ag-basket";
const listeners = new Set<() => void>();
let cache: BasketItem[] | null = null;
const EMPTY: BasketItem[] = [];

function read(): BasketItem[] {
  if (typeof window === "undefined") return EMPTY;
  if (cache) return cache;
  try {
    const v = JSON.parse(localStorage.getItem(KEY) || "[]");
    cache = Array.isArray(v) ? v.filter((i) => i && typeof i.code === "string") : [];
  } catch {
    cache = [];
  }
  return cache!;
}
function write(v: BasketItem[]) {
  cache = v;
  try { localStorage.setItem(KEY, JSON.stringify(v)); } catch { /* storage full or blocked: keep in memory */ }
  listeners.forEach((l) => l());
}

if (typeof window !== "undefined") {
  window.addEventListener("storage", (e) => { if (e.key === KEY) { cache = null; listeners.forEach((l) => l()); } });
}

export const basket = {
  items: read,
  has: (code: string) => read().some((i) => i.code === code),
  add(code: string, label: string) {
    if (basket.has(code)) return;
    write([...read(), { code, label }]);
    track("basket_add", { item_id: code });
  },
  remove(code: string) { write(read().filter((i) => i.code !== code)); },
  clear() { write([]); },
  subscribe(l: () => void) { listeners.add(l); return () => { listeners.delete(l); }; },
};

/** Live quote list for components. Server render and first client render see an empty list (no hydration mismatch). */
export function useBasket(): BasketItem[] {
  return useSyncExternalStore(basket.subscribe, read, () => EMPTY);
}
