// Real-browser check of the built site against the locked design, using headless Chrome over the DevTools protocol.
//   node tools/browser-check.mjs [siteOrigin] [designOrigin]
// For every page: console errors / React hydration warnings, text of <main> equal to the design page's <main>,
// and no horizontal overflow at 390 px. Needs `npm run preview` (or any static server on dist/) and the design
// server (python3 -m http.server 5174 in ../design).
import { spawn } from "node:child_process";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";

const SITE = process.argv[2] || "http://127.0.0.1:4173";
const DESIGN = process.argv[3] || "http://127.0.0.1:5174";
const CHROME = "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome";
const { routes } = await import("./routes-for-check.mjs");

const prof = fs.mkdtempSync(path.join(os.tmpdir(), "agchk-"));
const port = 9500 + Math.floor(Math.random() * 300);
const chrome = spawn(CHROME, ["--headless=new", "--disable-gpu", `--remote-debugging-port=${port}`, `--user-data-dir=${prof}`, "about:blank"], { stdio: "ignore" });
let ws;
for (let i = 0; i < 50 && !ws; i++) {
  await new Promise((r) => setTimeout(r, 200));
  try {
    const list = await (await fetch(`http://127.0.0.1:${port}/json/list`)).json();
    const page = list.find((t) => t.type === "page");
    if (page) ws = new WebSocket(page.webSocketDebuggerUrl);
  } catch { /* not up yet */ }
}
await new Promise((r) => ws.addEventListener("open", r, { once: true }));
let id = 0;
const pending = new Map();
const events = [];
ws.addEventListener("message", (m) => {
  const d = JSON.parse(m.data);
  if (d.id && pending.has(d.id)) { pending.get(d.id)(d); pending.delete(d.id); }
  else if (d.method) events.push(d);
});
const send = (method, params = {}) => new Promise((r) => { const i = ++id; pending.set(i, r); ws.send(JSON.stringify({ id: i, method, params })); });
const evalJs = async (expr) => (await send("Runtime.evaluate", { expression: expr, returnByValue: true, awaitPromise: true })).result?.result?.value;
const PIXELS = process.argv.includes("--pixels");
async function shot() {
  const h = await evalJs("Math.ceil(document.documentElement.scrollHeight)");
  const w = await evalJs("document.documentElement.clientWidth");
  const r = await send("Page.captureScreenshot", { format: "png", captureBeyondViewport: true, clip: { x: 0, y: 0, width: w, height: Math.min(h, 16000), scale: 1 } });
  return { data: r.result.data, h };
}
const DIFF = (a, b) => `(async () => {
  const load = (d) => new Promise((r) => { const i = new Image(); i.onload = () => r(i); i.src = "data:image/png;base64," + d; });
  const [A, B] = await Promise.all([load(${JSON.stringify(a)}), load(${JSON.stringify(b)})]);
  const w = Math.min(A.width, B.width), h = Math.min(A.height, B.height);
  const c = (img) => { const k = document.createElement("canvas"); k.width = w; k.height = h; const x = k.getContext("2d"); x.drawImage(img, 0, 0); return x.getImageData(0, 0, w, h).data; };
  const da = c(A), db = c(B); let n = 0, y0 = -1, y1 = -1;
  for (let i = 0; i < da.length; i += 4) { if (Math.abs(da[i]-db[i]) + Math.abs(da[i+1]-db[i+1]) + Math.abs(da[i+2]-db[i+2]) > 48) { n++; const y = Math.floor(i / 4 / w); if (y0 < 0) y0 = y; y1 = y; } }
  return { n, pct: +(100 * n / (w * h)).toFixed(3), y0, y1, ha: A.height, hb: B.height };
})()`;
async function load(url, width) {
  await send("Emulation.setDeviceMetricsOverride", { width, height: 900, deviceScaleFactor: 1, mobile: width < 500 });
  events.length = 0;
  await send("Page.navigate", { url });
  for (let i = 0; i < 60; i++) {
    await new Promise((r) => setTimeout(r, 100));
    if (await evalJs("document.readyState === 'complete'")) break;
  }
  await new Promise((r) => setTimeout(r, 600));
}
await send("Page.enable");
await send("Runtime.enable");
await send("Log.enable");

const norm = (s) => (s || "").replace(/\s+/g, " ").trim();
const MAIN_TEXT = `(() => { const m = document.querySelector('main'); if (!m) return '';
  return m.innerText; })()`;
let fails = 0;
for (const r of routes) {
  const out = [];
  // design first (localStorage cleared per origin so the quote list / consent start empty)
  await load(`${DESIGN}/${r.name}.html`, 1440);
  await evalJs("localStorage.clear(); sessionStorage.clear()");
  await load(`${DESIGN}/${r.name}.html`, 1440);
  const dText = norm(await evalJs(MAIN_TEXT));
  const siteUrl = SITE + (r.name === "404" ? "/404.html" : r.path);
  await load(siteUrl, 1440);
  await evalJs("localStorage.clear(); sessionStorage.clear()");
  await load(siteUrl, 1440);
  const errs = events.filter((e) => (e.method === "Runtime.consoleAPICalled" && ["error", "warning"].includes(e.params.type)) || e.method === "Runtime.exceptionThrown" || (e.method === "Log.entryAdded" && e.params.entry.level === "error"))
    .map((e) => e.params.exceptionDetails?.exception?.description || e.params.args?.map((a) => a.value ?? a.description).join(" ") || e.params.entry?.text || e.method);
  const sText = norm(await evalJs(MAIN_TEXT));
  if (errs.length) out.push("console: " + errs.slice(0, 3).map((x) => String(x).slice(0, 200)).join(" | "));
  if (dText !== sText) {
    let i = 0; while (i < dText.length && dText[i] === sText[i]) i++;
    out.push(`text differs at ${i}: design «${dText.slice(Math.max(0, i - 40), i + 60)}» site «${sText.slice(Math.max(0, i - 40), i + 60)}»`);
  }
  if (PIXELS) {
    for (const w of [1440, 390]) {
      await load(`${DESIGN}/${r.name}.html`, w); await evalJs("window.scrollTo(0,0)"); const A = await shot();
      await load(siteUrl, w); await evalJs("window.scrollTo(0,0)"); const B = await shot();
      await send("Page.navigate", { url: "about:blank" }); await new Promise((res) => setTimeout(res, 200));
      const d = await evalJs(DIFF(A.data, B.data));
      if (A.h !== B.h || d.pct > 0.05) out.push(`pixels @${w}: height ${A.h} vs ${B.h}, ${d.pct}% differ (rows ${d.y0}–${d.y1})`);
    }
  }
  await load(siteUrl, 390);
  const over = await evalJs("document.documentElement.scrollWidth");
  if (over > 390) out.push(`overflow at 390: ${over}px`);
  if (out.length) { fails++; console.log(`✗ ${r.path}\n   ${out.join("\n   ")}`); }
  else console.log(`✓ ${r.path}`);
}
ws.close();
chrome.kill();
console.log(fails ? `\n${fails} page(s) with problems` : "\nall pages match the design, no console errors, no overflow at 390 px");
process.exit(fails ? 1 : 0);
