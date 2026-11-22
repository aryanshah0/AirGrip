// Share images (og:image, 1200×630) per page: the page's H1, its section, and its drawing or plant photo, in the
// layout of tools/og.html. Reads the built pages, writes public/og/<route name>.png (.jpg for photos) (committed; the build copies them
// and prerender.mjs points each page's og:image at its own file, falling back to /og.png).
// Run after changing an H1 or a route:  npm run build && node tools/make-og.mjs && npm run build
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath, pathToFileURL } from "node:url";
import { launch } from "./cdp.mjs";
import { routes } from "./routes-for-check.mjs";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const out = path.join(root, "public", "og");

// drawing (public/img/la/l/…svg) or photo (public/img/…webp) per page; pages not listed keep /og.png
const ART = {
  products: "la/l/turned.svg", category: "la/l/turned.svg", fittings: "la/l/elbow.svg", forged: "la/l/forgedtee.svg",
  inserts: "la/l/insert.svg", terminals: "la/l/terminal.svg", fasteners: "la/l/hexbolt.svg", stamping: "la/l/contact.svg",
  glands: "la/l/gland.svg", product: "la/l/pscrew.svg", "clamping-jaw": "la/l/gland-cj.svg", favorit: "la/l/gland-sr.svg",
  accessory: "la/l/locknut.svg", "thread-adapters": "la/l/reducer.svg", "stop-plugs": "la/l/stopplug.svg",
  "earth-tags": "la/l/earthtag.svg", "conduit-parts": "la/l/malebush.svg",
  capabilities: "cnc-turning-brass-nozzle.webp", quality: "brass-parts-inspection.webp",
  industries: "brass-turned-parts.webp", about: "airgrip-plant-jamnagar.webp", exports: "airgrip-plant-jamnagar.webp",
  germany: "airgrip-plant-jamnagar.webp", contact: "airgrip-plant-jamnagar.webp", rfq: "la/l/turned.svg",
  resources: "la/l/prof-metric.svg", resource: "la/l/prof-metric.svg", "metric-chart": "la/l/prof-metric.svg",
  "bsp-chart": "la/l/prof-bsp.svg", "npt-chart": "la/l/prof-npt.svg", grades: "la/l/turned.svg",
  "guide-grades": "la/l/turned.svg", "guide-lead-free": "la/l/tee.svg", "guide-bsp-npt": "la/l/prof-bsp.svg", "guide-glands": "la/l/gland.svg", "guide-cert": "brass-parts-inspection.webp",
};

const text = (s) => s.replace(/<[^>]+>/g, "").replace(/&amp;/g, "&").replace(/&nbsp;/g, " ").replace(/&#x27;|&#39;/g, "'").replace(/&quot;/g, '"').replace(/\s+/g, " ").trim();
const esc = (s) => s.replace(/&/g, "&amp;").replace(/</g, "&lt;");
const tpl = fs.readFileSync(path.join(root, "tools", "og.html"), "utf8");

const b = await launch();
fs.mkdirSync(out, { recursive: true });
let n = 0;
for (const r of routes) {
  const art = ART[r.name];
  if (!art) continue;
  const html = fs.readFileSync(path.join(root, "dist", r.path, "index.html"), "utf8");
  const h1 = text((html.match(/<h1[^>]*>([\s\S]*?)<\/h1>/) || [])[1] || r.title);
  const crumbs = [...html.matchAll(/"@type":"ListItem","position":\d+,"name":"([^"]+)"/g)].map((m) => m[1]).slice(1, -1);
  const kicker = ["AirGrip · Jamnagar, India", crumbs.join(" › ")].filter(Boolean).join("<br>");
  const photo = art.endsWith(".webp");
  const page = tpl
    .replace(/<h1>[\s\S]*?<\/h1>/, `<h1 id="h">${esc(h1)}</h1>`)
    .replace(/<div class="k">[\s\S]*?<\/div>/, `<div class="k">${kicker}</div>`)
    .replace(/<div class="r"><img src="[^"]+"/, `<div class="r${photo ? " ph" : ""}"><img src="../public/img/${art}"`)
    .replace("</style>", ".r.ph{padding:0;overflow:hidden}.r.ph img{width:100%;height:100%;object-fit:cover}</style>");
  const tmp = path.join(root, "tools", ".og-tmp.html");
  fs.writeFileSync(tmp, page);
  await b.send("Emulation.setDeviceMetricsOverride", { width: 1200, height: 630, deviceScaleFactor: 1, mobile: false });
  await b.load(pathToFileURL(tmp).href, 1200);
  // shrink the heading until it fits its column (long H1s)
  // (keep 32 px clear below the logo and keep the kicker inside the frame)
  await b.evalJs(`document.fonts.ready.then(() => { const h = document.getElementById("h"), logo = h.parentElement.querySelector("img"), k = h.parentElement.querySelector(".k"); let s = 64;
    const tight = () => h.getBoundingClientRect().top - logo.getBoundingClientRect().bottom < 32 || k.getBoundingClientRect().bottom > 574 || h.scrollWidth > h.clientWidth;
    while (s > 36 && tight()) { s -= 2; h.style.fontSize = s + "px"; } return s; })`);
  // drawings as PNG (sharp lines, small), photos as JPEG
  const shot = await b.send("Page.captureScreenshot", { format: photo ? "jpeg" : "png", ...(photo ? { quality: 82 } : {}), clip: { x: 0, y: 0, width: 1200, height: 630, scale: 1 } });
  for (const ext of [".png", ".jpg"]) fs.rmSync(path.join(out, r.name + ext), { force: true });
  fs.writeFileSync(path.join(out, r.name + (photo ? ".jpg" : ".png")), Buffer.from(shot.result.data, "base64"));
  n++;
}
fs.rmSync(path.join(root, "tools", ".og-tmp.html"), { force: true });
b.close();
console.log(`wrote ${n} share images to public/og/`);
