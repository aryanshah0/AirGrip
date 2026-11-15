// Prints tools/profile/profile.html (the company profile, confirmed facts only) to public/downloads/airgrip-company-profile.pdf
// with headless Chrome. Run after changing the profile:  node tools/make-profile.mjs
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath, pathToFileURL } from "node:url";
import { launch } from "./cdp.mjs";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const src = path.join(root, "tools", "profile", "profile.html");
const out = path.join(root, "public", "downloads", "airgrip-company-profile.pdf");
const b = await launch();
await b.load(pathToFileURL(src).href, 1000);
await b.evalJs("document.fonts.ready.then(() => true)");
const r = await b.send("Page.printToPDF", { printBackground: true, preferCSSPageSize: true, displayHeaderFooter: false });
fs.mkdirSync(path.dirname(out), { recursive: true });
fs.writeFileSync(out, Buffer.from(r.result.data, "base64"));
b.close();
console.log("wrote", path.relative(root, out), Math.round(fs.statSync(out).size / 1024) + " KB");
