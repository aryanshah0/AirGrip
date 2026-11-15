// "+ Add" button on datasheet size tables: toggles a part code in the quote list.
import { basket, useBasket } from "../lib/basket";
import { useFamily } from "./Family";

export function AddQ({ code, label, className = "addq" }: { code: string; label: string; className?: string }) {
  const fam = useFamily();
  const c = fam ? fam.code(code) : code;
  const l = fam ? fam.label(label) : label;
  const on = useBasket().some((i) => i.code === c);
  return (
    <button type="button" className={className} aria-pressed={on} aria-label={on ? `Added: ${l} (press to remove from quote)` : `Add ${l} to quote`}
      onClick={() => (on ? basket.remove(c) : basket.add(c, l))}>
      {on ? "✓ Added" : "+ Add"}
    </button>
  );
}
