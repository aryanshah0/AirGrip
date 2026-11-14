// Accessibility scan of every page with axe-core (WCAG 2.0/2.1/2.2 A and AA rules), at desktop and phone width,
// with the cookie banner closed (it is checked on its own, open, on the home page).
//   node tools/a11y-check.mjs [origin]
import fs from "node:fs";
import { createRequire } from "node:module";
import { launch } from "./cdp.mjs";
import { routes } from "./routes-for-check.mjs";

const O = process.argv[2] || "http://127.0.0.1:4173";
const AXE = fs.readFileSync(createRequire(import.meta.url).resolve("axe-core/axe.min.js"), "utf8");
const TAGS = ["wcag2a", "wcag2aa", "wcag21a", "wcag21aa", "wcag22aa"];
const b = await launch();
const found = new Map(); // rule -> { impact, help, where: Set }

async function scan(path, width, label = "") {
  await b.load(O + path, width);
  await b.evalJs(AXE + ";true");
  const v = await b.evalJs(`axe.run(document, { runOnly: ${JSON.stringify(TAGS)}, resultTypes: ['violations'] }).then(r => r.violations.map(x => ({ id: x.id, impact: x.impact, help: x.help, nodes: x.nodes.map(n => n.target.join(' ')).slice(0, 3) })))`);
  for (const x of v) {
    const f = found.get(x.id) || { impact: x.impact, help: x.help, where: new Set() };
    f.where.add(`${path} @${width}${label}: ${x.nodes.join(" | ")}`);
    found.set(x.id, f);
  }
}

await b.load(O + "/");
await b.evalJs("localStorage.clear(); true");
await scan("/", 1440, " (cookie banner open)");
await b.evalJs("localStorage.setItem('ag-consent', 'essential'); true");
for (const r of routes) for (const w of [1440, 390]) await scan(r.path, w);
b.close();

if (!found.size) console.log(`axe: no WCAG A/AA violations on ${routes.length} pages (desktop and phone)`);
for (const [id, f] of found) {
  console.log(`\n✗ ${id} (${f.impact}): ${f.help} — ${f.where.size} page/width(s)`);
  [...f.where].slice(0, 6).forEach((w) => console.log("   " + w));
}
process.exit(found.size ? 1 : 0);
