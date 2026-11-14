// Checks the DEPLOYED site's server behaviour: https and www redirects, every old-URL 301 from dist/.htaccess,
// WordPress paths answering 410, the 404 page, security and cache headers, every sitemap URL answering 200,
// and that the PHP form sender runs (never served as source). Sends no form, so it is safe on the live site.
//   node tools/server-check.mjs                                  -> https://airgrip.co.in
//   node tools/server-check.mjs https://127.0.0.1:8443 --host airgrip.co.in --insecure   (local Apache test)
import fs from "node:fs";
import http from "node:http";
import https from "node:https";
import path from "node:path";
import { fileURLToPath } from "node:url";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const args = process.argv.slice(2);
const base = new URL(args.find((a) => /^https?:/.test(a)) || "https://airgrip.co.in");
const host = args.includes("--host") ? args[args.indexOf("--host") + 1] : base.host;
const insecure = args.includes("--insecure");

function get(url, hostHeader = host, method = "GET") {
  const u = new URL(url, base);
  const lib = u.protocol === "https:" ? https : http;
  return new Promise((resolve, reject) => {
    const req = lib.request(u, { method, headers: { Host: hostHeader }, rejectUnauthorized: !insecure, servername: hostHeader.split(":")[0] }, (res) => {
      let body = "";
      res.setEncoding("utf8");
      res.on("data", (c) => { if (body.length < 200000) body += c; });
      res.on("end", () => resolve({ status: res.statusCode, headers: res.headers, body }));
    });
    req.on("error", reject);
    req.end();
  });
}

const results = [];
const check = (name, ok, detail = "") => { results.push(ok); if (!ok) console.log(`✗ ${name}${detail ? " — " + detail : ""}`); };
const loc = (r) => r.headers.location || "";

// https and www
{
  const plain = new URL(base); plain.protocol = "http:"; plain.port = base.port === "8443" ? "8088" : "";
  const r = await get(plain.href + "about/");
  check("http -> https (301)", r.status === 301 && loc(r) === `https://${host}/about/`, `${r.status} ${loc(r)}`);
  const w = await get("/about/", "www." + host);
  check("www -> bare domain (301)", w.status === 301 && loc(w) === `https://${host}/about/`, `${w.status} ${loc(w)}`);
}

// old URLs from the generated .htaccess
const ht = fs.readFileSync(path.join(root, "dist/.htaccess"), "utf8");
const moves = [...ht.matchAll(/^RewriteRule \^([^ ]+)\/\?\$ (\/[^ ]*) \[R=301/gm)].map((m) => [m[1].replace(/\\/g, ""), m[2]]);
for (const [old, to] of moves) {
  for (const p of [`/${old}/`, `/${old}`]) {
    const r = await get(p);
    check(`${p} -> ${to}`, r.status === 301 && loc(r).replace(/^https?:\/\/[^/]+/, "") === to, `${r.status} ${loc(r)}`);
  }
}

// gone and missing
for (const p of ["/wp-admin/", "/wp-content/uploads/x.jpg", "/wp-login.php", "/xmlrpc.php", "/feed/", "/?p=12", "/index.php?page_id=5"]) {
  const r = await get(p);
  check(`${p} answers 410`, r.status === 410, String(r.status));
}
const ix = await get("/rfq/index.html");
check("/rfq/index.html -> /rfq/ (301)", ix.status === 301 && loc(ix).endsWith("/rfq/"), `${ix.status} ${loc(ix)}`);
const nf = await get("/no-such-page/");
check("unknown URL answers 404 with the site's 404 page", nf.status === 404 && /<h1/.test(nf.body) && !/Not Found<\/title>/.test(nf.body), String(nf.status));

// every page in the sitemap, and the headers on them
const sm = fs.readFileSync(path.join(root, "dist/sitemap.xml"), "utf8");
const pages = [...sm.matchAll(/<loc>([^<]+)<\/loc>/g)].map((m) => new URL(m[1]).pathname);
let firstAsset = "";
for (const p of pages) {
  const r = await get(p);
  check(`${p} answers 200`, r.status === 200 && /text\/html/.test(r.headers["content-type"] || ""), String(r.status));
  firstAsset ||= (r.body.match(/\/assets\/[^"]+\.js/) || [""])[0];
}
const home = await get("/");
for (const h of ["x-content-type-options", "referrer-policy", "x-frame-options"]) check(`header ${h} on pages`, !!home.headers[h]);
check("pages are revalidated (no-cache)", /no-cache/.test(home.headers["cache-control"] || ""), home.headers["cache-control"]);
if (firstAsset) {
  const a = await get(firstAsset);
  check("hashed assets cached for a year", a.status === 200 && /immutable/.test(a.headers["cache-control"] || ""), a.headers["cache-control"]);
}
for (const f of ["/robots.txt", "/sitemap.xml", "/og.png", "/favicon.svg"]) check(`${f} answers 200`, (await get(f)).status === 200);

// the PHP form sender runs and is never served as source
const fg = await get("/api/form.php");
check("form sender runs (GET answers 405, not source)", fg.status === 405 && !fg.body.includes("<?php"), `${fg.status} ${fg.body.slice(0, 60)}`);
const cf = await get("/api/config.php");
check("form settings are not readable", !cf.body.includes("<?php") && !cf.body.includes("data_dir"), cf.body.slice(0, 60));

const bad = results.filter((x) => !x).length;
console.log(bad ? `\n${bad} of ${results.length} server checks failed` : `all ${results.length} server checks passed (${base.origin}, ${moves.length} old URLs, ${pages.length} pages)`);
process.exit(bad ? 1 : 0);
