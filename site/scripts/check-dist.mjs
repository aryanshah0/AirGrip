// Build step 5: checks every pre-rendered page in dist/. Fails the build on a broken internal link, anchor or
// image, a missing title / description / canonical / H1, invalid JSON-LD, or leftover template markers.
// With --launch it also fails when the site is not ready to go live (no form sender).
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const dist = path.join(root, "dist");
const launch = process.argv.includes("--launch");
const problems = [];
const pages = [];
(function walk(d) {
  for (const e of fs.readdirSync(d, { withFileTypes: true })) {
    const p = path.join(d, e.name);
    if (e.isDirectory()) walk(p);
    else if (e.name.endsWith(".html")) pages.push(p);
  }
})(dist);

const urlOf = (p) => "/" + path.relative(dist, p).replace(/index\.html$/, "").replace(/\\/g, "/");
const ids = new Map(pages.map((p) => [urlOf(p), new Set([...fs.readFileSync(p, "utf8").matchAll(/\sid="([^"]+)"/g)].map((m) => m[1]))]));
const fileFor = (u) => {
  const clean = decodeURIComponent(u.split("#")[0].split("?")[0]);
  const f = path.join(dist, clean);
  if (clean.endsWith("/")) return fs.existsSync(path.join(f, "index.html")) ? clean : null;
  return fs.existsSync(f) && fs.statSync(f).isFile() ? clean : null;
};

for (const p of pages) {
  const u = urlOf(p);
  const h = fs.readFileSync(p, "utf8");
  const bad = (m) => problems.push(`${u}: ${m}`);
  if ((h.match(/<h1[\s>]/g) || []).length !== 1) bad(`${(h.match(/<h1[\s>]/g) || []).length} H1`);
  if (!/<title>[^<]{10,}<\/title>/.test(h)) bad("no title");
  const noindex = h.includes('content="noindex');
  if (!noindex && !/<meta name="description" content="[^"]{50,}"/.test(h)) bad("no or short meta description");
  if (!noindex && !h.includes('rel="canonical"')) bad("no canonical");
  if (/<!--(app|head)-->|data-bc/.test(h)) bad("template marker left");
  for (const m of h.matchAll(/<script type="application\/ld\+json">(.*?)<\/script>/gs)) { try { JSON.parse(m[1]); } catch { bad("invalid JSON-LD"); } }
  const body = h.split("<body")[1] || "";
  for (const m of body.matchAll(/\s(?:href|src)="([^"]+)"/g)) {
    const v = m[1];
    if (/^(https?:|mailto:|tel:|data:)/.test(v)) continue;
    if (v.startsWith("#")) { if (v.length > 1 && v !== "#cookies" && !ids.get(u)?.has(v.slice(1))) bad(`missing anchor ${v}`); continue; }
    if (!v.startsWith("/")) { bad(`relative link ${v}`); continue; }
    const target = fileFor(v);
    if (!target) { bad(`broken link ${v}`); continue; }
    const frag = v.split("#")[1];
    if (frag && target.endsWith("/") && !ids.get(target)?.has(frag)) bad(`missing anchor ${v}`);
  }
  for (const m of body.matchAll(/\ssrcset="([^"]+)"/g)) for (const s of m[1].split(",")) { const f = s.trim().split(" ")[0]; if (!fileFor(f)) bad(`missing image ${f}`); }
  for (const m of h.matchAll(/<link[^>]+href="(\/[^"]+)"/g)) if (!fileFor(m[1])) bad(`missing asset ${m[1]}`);
  for (const m of h.matchAll(/<meta property="og:image" content="https:\/\/airgrip\.co\.in(\/[^"]+)"/g)) if (!fileFor(m[1])) bad(`missing OG image ${m[1]}`);
}
for (const f of ["sitemap.xml", "robots.txt", ".htaccess", "404.html"]) if (!fs.existsSync(path.join(dist, f))) problems.push(`missing ${f}`);

if (launch) {
  const { loadEnv } = await import("vite");
  const env = loadEnv("production", root, "VITE_");
  if (!env.VITE_FORM_ENDPOINT && !fs.existsSync(path.join(dist, "api/form.php"))) problems.push("launch: no form sender (dist/api/form.php missing and no VITE_FORM_ENDPOINT)");
  if (!env.VITE_GA_ID) console.warn("  note: no GA4 ID (VITE_GA_ID): the site launches without analytics");
}

if (problems.length) {
  console.error(problems.map((p) => "  " + p).join("\n") + `\n${problems.length} problem(s) in dist/`);
  process.exit(1);
}
console.log(`dist check: ${pages.length} pages OK${launch ? " · launch ready" : ""}`);
