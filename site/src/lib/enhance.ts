// Behaviour for the static page markup (ported from the design's inline scripts). These only toggle attributes and
// classes on elements the page component renders once and never re-renders, so they are safe next to React.

function tabs(root: ParentNode) {
  root.querySelectorAll<HTMLElement>("[role=tablist]").forEach((list) => {
    const ts = [...list.querySelectorAll<HTMLElement>("[role=tab]")];
    const sel = (t: HTMLElement, focus: boolean) => {
      ts.forEach((x) => {
        const on = x === t;
        x.setAttribute("aria-selected", String(on));
        x.tabIndex = on ? 0 : -1;
        const p = document.getElementById(x.getAttribute("aria-controls") || "");
        if (p) p.hidden = !on;
      });
      if (focus) t.focus();
      dispatchEvent(new Event("resize"));
    };
    ts.forEach((t, i) => {
      t.addEventListener("click", () => sel(t, false));
      t.addEventListener("keydown", (e) => {
        if (e.key === "ArrowRight" || e.key === "ArrowLeft") sel(ts[(i + (e.key === "ArrowRight" ? 1 : ts.length - 1)) % ts.length], true);
      });
    });
  });
}

function scrollSpy(selector: string, margin: string, firstAt: number) {
  // only in-page links (#section); other links in the strip (e.g. to the quote form) are not spied on
  const links = [...document.querySelectorAll<HTMLAnchorElement>(selector)].filter((l) => /^#[\w-]+$/.test(l.getAttribute("href") || ""));
  if (!links.length || !("IntersectionObserver" in window)) return;
  const io = new IntersectionObserver((es) => es.forEach((e) => {
    if (e.isIntersecting) links.forEach((l) => l.classList.toggle("on", l.getAttribute("href") === "#" + e.target.id));
  }), { rootMargin: margin });
  links.forEach((l) => { const t = document.querySelector(l.getAttribute("href") || ""); if (t) io.observe(t); });
  addEventListener("scroll", () => {
    const first = document.querySelector(links[0].getAttribute("href") || "");
    if (first && first.getBoundingClientRect().top > innerHeight * firstAt) links.forEach((l, i) => l.classList.toggle("on", i === 0));
  }, { passive: true });
}

/** Quality page route card: the active row is the one nearest the viewport centre. */
function routeCard() {
  const rows = [...document.querySelectorAll<HTMLElement>(".rc tbody tr")];
  if (!rows.length) return;
  const states = [...document.querySelectorAll<HTMLElement>(".route__dwg .st")];
  const cap = document.querySelector<HTMLElement>("[data-cap]");
  let ticking = false;
  const pick = () => {
    ticking = false;
    const mid = innerHeight * (innerWidth < 1024 ? 0.62 : 0.5);
    let best = rows[0], bd = Infinity;
    rows.forEach((r) => { const b = r.getBoundingClientRect(); const d = Math.abs((b.top + b.bottom) / 2 - mid); if (d < bd) { bd = d; best = r; } });
    rows.forEach((r) => r.classList.toggle("on", r === best));
    states.forEach((s) => s.classList.toggle("on", s.dataset.s === best.dataset.s));
    if (cap) cap.textContent = best.dataset.c || "";
  };
  addEventListener("scroll", () => { if (!ticking) { ticking = true; requestAnimationFrame(pick); } }, { passive: true });
  pick();
}

/** Wide tables show a fade at the right edge while there is more to scroll. */
function tableCue() {
  const tbls = [...document.querySelectorAll<HTMLElement>(".tbl")];
  const cue = () => tbls.forEach((t) => {
    const wide = t.scrollWidth - t.clientWidth > 4;
    t.classList.toggle("can-scroll", wide && t.scrollWidth - t.clientWidth - t.scrollLeft > 4);
    // a table wider than the screen must be scrollable with the keyboard too
    if (wide) { t.tabIndex = 0; t.setAttribute("role", "region"); t.setAttribute("aria-label", t.querySelector("caption")?.textContent?.trim() || "Table, scrolls sideways"); }
    else if (t.getAttribute("role") === "region") { t.removeAttribute("tabindex"); t.removeAttribute("role"); t.removeAttribute("aria-label"); }
  });
  tbls.forEach((t) => t.addEventListener("scroll", cue, { passive: true }));
  addEventListener("resize", cue);
  cue();
}

// Each enhancer runs on its own: an error in one must never take the page down (an error thrown in a React effect
// would unmount the whole pre-rendered page).
export function enhance() {
  const run = (name: string, fn: () => void) => { try { fn(); } catch (e) { console.warn(`enhance ${name} skipped`, e); } };
  run("tabs", () => tabs(document));
  run("subnav", () => scrollSpy(".subnav a", "-40% 0px -55% 0px", 0.4));
  run("toc", () => scrollSpy(".toc a", "-30% 0px -65% 0px", 0.3));
  run("route card", routeCard);
  run("dimkey", () => { if (matchMedia("(max-width: 959px)").matches) document.querySelectorAll("details.dimkey").forEach((d) => d.removeAttribute("open")); });
  run("table cue", tableCue);
}
