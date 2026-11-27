// Build step 3: render every route to static HTML in dist/, with its <head> (title, description, canonical, Open Graph,
// JSON-LD), the page's own CSS and JS preloads, plus sitemap.xml, robots.txt and .htaccess (redirects, 404, caching).
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath, pathToFileURL } from "node:url";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const dist = path.join(root, process.env.AG_OUT || "dist"); // dist-dev for the dev copy
const ORIGIN = "https://airgrip.co.in";
// AG_BASE set = the dev copy on GitHub Pages (npm run build:dev): served from that sub-folder, kept out of search
// engines (noindex on every page, no sitemap), with a bar saying it is the dev copy. Unset = production.
const BASE = process.env.AG_BASE || "/";
const DEV = BASE !== "/";
const DEV_BAR = `<div role="note" style="background:#7a2e0e;color:#fff;font:600 13px/1.4 system-ui,sans-serif;padding:6px 16px;text-align:center">Dev copy for checking changes. Forms do not send anything. The live site is <a href="${ORIGIN}/" style="color:#fff">airgrip.co.in</a>.</div>`;
const GROUP = ["AirGrip International", "AirGrip Industrie", "Asian Brass Technocrats", "Copper Alloy Component Solutions", "Devi Metals"];

const tpl = fs.readFileSync(path.join(dist, "index.html"), "utf8");
const manifest = JSON.parse(fs.readFileSync(path.join(dist, ".vite", "manifest.json"), "utf8"));
const { render, routes } = await import(pathToFileURL(path.join(root, "dist-ssr", "entry-server.js")).href);

const esc = (s) => String(s).replace(/&/g, "&amp;").replace(/"/g, "&quot;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
const text = (h) => h.replace(/<!-- -->/g, "").replace(/<[^>]+>/g, " ").replace(/&nbsp;/g, " ").replace(/&amp;/g, "&").replace(/&lt;/g, "<").replace(/&gt;/g, ">").replace(/&quot;/g, '"').replace(/&#x27;/g, "'").replace(/\s+/g, " ").replace(/ ([,.;:)])/g, "$1").trim();

// CSS and JS a page module needs (its own chunk plus static imports), from the Vite manifest
function assetsFor(file) {
  const css = new Set(), js = new Set(), seen = new Set();
  (function walk(key) {
    if (seen.has(key)) return;
    seen.add(key);
    const m = manifest[key];
    if (!m) return;
    js.add(m.file);
    (m.css || []).forEach((c) => css.add(c));
    (m.imports || []).forEach((k) => walk(k));
  })(file);
  return { css: [...css], js: [...js] };
}
const entry = manifest["index.html"];
const entryCss = new Set(entry.css || []);
// Cascade order must match the design: tokens (entry) -> CSS shared by many pages (pages.css) -> the page's own CSS.
const usedBy = {};
Object.values(manifest).forEach((m) => (m.css || []).forEach((c) => { usedBy[c] = (usedBy[c] || 0) + 1; }));
const ordered = (list) => [...entryCss, ...list.filter((c) => !entryCss.has(c)).sort((a, b) => usedBy[b] - usedBy[a])];
const tplBase = tpl.replace(new RegExp(`<link rel="stylesheet"[^>]*href="${BASE}assets/[^"]+\\.css"[^>]*>\\n?`, "g"), "");
const font = Object.values(manifest).flatMap((m) => m.assets || []).find((a) => /archivo-latin-wdth-normal.*\.woff2$/.test(a));

const org = {
  "@type": "Organization", "@id": ORIGIN + "/#org", name: "AirGrip", url: ORIGIN + "/",
  // square raster logo: Google crops wide logos into a square thumbnail and prefers PNG/JPEG for logos
  logo: { "@type": "ImageObject", url: ORIGIN + "/img/logo-square.png", width: 600, height: 600 },
  email: "sales@airgrip.in", telephone: "+91-93166-15007", foundingDate: "1988",
  address: { "@type": "PostalAddress", streetAddress: "Plot No. 3966 & 3967, Road No. U, GIDC Phase-III, Dared", addressLocality: "Jamnagar", postalCode: "361004", addressRegion: "Gujarat", addressCountry: "IN" },
  subOrganization: GROUP.map((name) => ({ "@type": "Organization", name })),
  sameAs: ["https://www.facebook.com/airgrip02/", "https://www.linkedin.com/in/airgrip-group/"],
};
const local = {
  "@type": "LocalBusiness", "@id": ORIGIN + "/#plant", name: "AirGrip", url: ORIGIN + "/", image: [ORIGIN + "/img/logo-square.png", ORIGIN + "/img/airgrip-plant-jamnagar.webp"],
  telephone: "+91-93166-15007", email: "sales@airgrip.in", address: org.address, parentOrganization: { "@id": ORIGIN + "/#org" },
  // the Google Business Profile ("Air Grip Group of Companies") and its pin, so Google ties the site to the map listing
  hasMap: "https://www.google.com/maps?cid=1982484181116058778", geo: { "@type": "GeoCoordinates", latitude: 22.4152605, longitude: 70.050451 },
  openingHoursSpecification: [{ "@type": "OpeningHoursSpecification", dayOfWeek: ["Saturday", "Sunday", "Monday", "Tuesday", "Wednesday", "Thursday"], opens: "09:30", closes: "18:30" }],
};

function jsonLd(route, html) {
  const graph = [];
  const url = ORIGIN + route.path;
  if (["home", "about"].includes(route.name)) graph.push(org);
  if (["home", "contact"].includes(route.name)) graph.push(local);
  // buyer guides: TechArticle with the H1 and the <time> in the page header (src/templates/GuidePage.tsx)
  if (route.name.startsWith("guide-")) {
    const h1 = html.match(/<h1[^>]*>(.*?)<\/h1>/s), when = html.match(/<time[^>]*dateTime="([^"]+)"/i) || html.match(/<time[^>]*datetime="([^"]+)"/i);
    graph.push({
      "@type": "TechArticle", headline: text(h1 ? h1[1] : route.title), description: route.description, url, mainEntityOfPage: url,
      inLanguage: "en", datePublished: when?.[1], dateModified: when?.[1], image: ORIGIN + ogImage(route),
      author: { "@type": "Organization", name: "AirGrip", url: ORIGIN + "/" },
      publisher: { "@type": "Organization", name: "AirGrip", url: ORIGIN + "/", logo: { "@type": "ImageObject", url: ORIGIN + "/img/logo-square.png", width: 600, height: 600 } },
    });
  }
  const crumbs = html.match(/<ol class="crumbs"[^>]*>(.*?)<\/ol>/s);
  if (crumbs) {
    const items = [...crumbs[1].matchAll(/<li[^>]*>(.*?)<\/li>/gs)].map((m, i) => {
      const a = m[1].match(/href="([^"]+)"/);
      return { "@type": "ListItem", position: i + 1, name: text(m[1]), item: a ? ORIGIN + a[1] : url };
    });
    graph.push({ "@type": "BreadcrumbList", itemListElement: items });
  }
  const faqs = [...html.matchAll(/<details[^>]*>\s*<summary[^>]*>(.*?)<\/summary>(.*?)<\/details>/gs)]
    .filter((m) => {
      // inside a section whose class list includes "faq" (class="faq", class="sb faq", ...)
      const before = html.slice(0, m.index);
      const faqAt = Math.max(...[...before.matchAll(/class="[^"]*\bfaq\b[^"]*"/g)].map((x) => x.index), -1);
      return faqAt > before.lastIndexOf("</section>");
    });
  if (faqs.length) graph.push({ "@type": "FAQPage", mainEntity: faqs.map((m) => ({ "@type": "Question", name: text(m[1]), acceptedAnswer: { "@type": "Answer", text: text(m[2]) } })) });
  return graph.length ? `<script type="application/ld+json">${JSON.stringify({ "@context": "https://schema.org", "@graph": graph }).replace(/</g, "\\u003c")}</script>` : "";
}

// per-page share image from tools/make-og.mjs (public/og/<name>.png or .jpg), else the site-wide /og.png
const ogImage = (route) => [".png", ".jpg"].map((x) => `/og/${route.name}${x}`).find((f) => fs.existsSync(path.join(dist, f))) || "/og.png";

function head(route, html) {
  const url = ORIGIN + route.path;
  const { css, js } = assetsFor(route.file);
  const t = [
    `<title>${esc(route.title)}</title>`,
    `<meta name="description" content="${esc(route.description)}">`,
    DEV ? `<meta name="robots" content="noindex, nofollow">` : route.noindex ? `<meta name="robots" content="noindex, follow">` : `<link rel="canonical" href="${url}">`,
    `<meta property="og:type" content="website">`, `<meta property="og:site_name" content="AirGrip">`, `<meta property="og:locale" content="en_IN">`,
    `<meta property="og:title" content="${esc(route.title)}">`, `<meta property="og:description" content="${esc(route.description)}">`,
    `<meta property="og:url" content="${url}">`, `<meta property="og:image" content="${ORIGIN}${ogImage(route)}">`, `<meta property="og:image:width" content="1200">`, `<meta property="og:image:height" content="630">`,
    `<meta name="twitter:card" content="summary_large_image">`,
    font ? `<link rel="preload" href="${BASE}${font}" as="font" type="font/woff2" crossorigin>` : "",
    ...ordered(css).map((c) => `<link rel="stylesheet" href="${BASE}${c}">`),
    ...js.map((j) => `<link rel="modulepreload" href="${BASE}${j}">`),
    jsonLd(route, html),
  ];
  return t.filter(Boolean).join("\n");
}

let n = 0;
for (const route of routes) {
  const html = await render(route.path);
  const page = tplBase
    .replace("<!--head-->", head(route, html))
    .replace("<body data-bc>", (route.bodyClass ? `<body class="${route.bodyClass}">` : "<body>") + (DEV ? "\n" + DEV_BAR : ""))
    .replace("<!--app-->", html);
  const out = route.name === "404" ? path.join(dist, "404.html") : path.join(dist, route.path, "index.html");
  fs.mkdirSync(path.dirname(out), { recursive: true });
  fs.writeFileSync(out, page);
  n++;
}

// sitemap and robots
const today = new Date().toISOString().slice(0, 10);
const indexable = routes.filter((r) => !r.noindex);
fs.writeFileSync(path.join(dist, "sitemap.xml"), `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${indexable.map((r) => `  <url><loc>${ORIGIN}${r.path}</loc><lastmod>${today}</lastmod></url>`).join("\n")}\n</urlset>\n`);
fs.writeFileSync(path.join(dist, "robots.txt"), `User-agent: *\nAllow: /\n\nSitemap: ${ORIGIN}/sitemap.xml\n`);

// Apache / LiteSpeed (Hostinger): https, no www, old-site 301 map (docs/SEO-PLAN.md §5), 410 for WordPress paths, caching
const R = Object.fromEntries(routes.map((r) => [r.name, r.path]));
const MAP = [
  [["about-us", "why-us", "plant", "career"], R.about], [["market-we-serve-2"], R.industries], [["market-we-serve"], R.exports],
  [["processing-material-range-and-accuracy"], R.capabilities + "#range"], [["process-we-do-2", "process-we-do", "packaging"], R.capabilities],
  [["quality-control", "quality-assurance"], R.quality], [["cnc-turned-components-2"], R.category], [["cable-gland"], R.glands],
  [["cable-gland-with-clamping-jaws"], R["clamping-jaw"]], [["kompakt-cable-gland"], R.product], [["favorit-cable-gland"], R.favorit],
  [["cable-gland-adapters", "cable-gland-enlargers", "cable-gland-reducers"], R["thread-adapters"]],
  [["cable-gland-lock-nuts-cable-gland-locking-nuts"], R.accessory], [["stop-plug-blank-plug-stooping-plug-blanking-plug"], R["stop-plugs"]],
  [["male-bush-conduit-gland-male-bush", "conduit-gland-parts"], R["conduit-parts"]], [["earthing-tag"], R["earth-tags"]],
  [["custom-brass-fittings"], R.fittings], [["special-fasteners"], R.fasteners], [["brass-injection-molding-inserts"], R.inserts],
  [["custom-metal-stamping-parts"], R.stamping], [["electrical-terminal-blocks-connectors"], R.terminals],
  [["brass-forged-machined-components"], R.forged], [["technical-library"], R.resources], [["enquiry"], R.rfq],
];
// older static site (2009–2021, *.html); exact case, from archived crawls
const LEGACY = [
  [["products/brass-turned-parts.html", "Brass-Turned-Parts-Components.html", "cnc-turned-components-blog"], R.category],
  [["products/brass-fittings.html", "Brass-Fittings.html"], R.fittings],
  [["products/brass-forgings-parts.html", "Brass-Forgings-Forged-Parts-Components.html"], R.forged],
  [["products/brass-inserts.html", "products/threaded-inserts.html", "products/ppr-inserts.html", "products/cpvc-upvc-inserts.html", "Brass-Moulding-Inserts.html"], R.inserts],
  [["products/brass-terminal-blocks.html", "products/neutral-links.html", "products/brass-electrical-connectors.html", "Brass-Terminal-Blocks-Connectors-Neutral-Links.html", "Brass-Electrical-Wiring-Accessories.html", "Brass-Electrical-Wiring-Accessories-Image-Gallery.html"], R.terminals],
  [["products/fasteners.html", "Fasteners.html", ...["machine-screws", "hex-bolts", "hex-nuts", "studs-customized-fasteners", "washers", "wood-screws", "sheet-metal-screws", "brass-anchor", "automotive-battery-fasteners"].map((x) => `products/${x}.html`)], R.fasteners],
  [["products/metal-stamping-parts.html", "Metal-Stamping-Parts.html"], R.stamping],
  [["products/brass-cable-glands-accessories.html", "products/hutmutter-nut.html"], R.glands],
  [["products/cable-gland-clamping-jaw.html", "Cable-Gland-With-Clamping-Jaw.html"], R["clamping-jaw"]],
  [["products/kompakt-cable-gland.html", "Kompakt-Gland.html"], R.product],
  [["products/favorit-cable-gland.html", "Favorit-Gland.html"], R.favorit],
  [["products/brass-lock-nut.html", "products/emc-lock-nut.html", "Lock-Nut.html", "Emc-Lock-Nut.html"], R.accessory],
  [["products/reducer.html", "products/enlarger.html", "products/hex-adapter.html", "products/round-adapter.html", "Reducer.html", "Enlarger.html", "Hex-Adapter.html", "Round-Adapter.html"], R["thread-adapters"]],
  [["products/stop-plug.html", "Stop-Plug.html"], R["stop-plugs"]],
  [["products/brass-male-bush.html", "products/conduit-gland-nut.html", "Male-Bush.html", "Conduit-Gland.html"], R["conduit-parts"]],
  [["products/earthing-tag.html"], R["earth-tags"]],
  [["brass-specification-equivalents.html", "matrial.html"], R.grades],
  [["thread-tables.html", "techincal-library.html"], R.resources],
  [["about-us.html", "about.html", "why_airgrip.html", "competitive-edge.html", "career.html"], R.about],
  [["facilities.html", "design.html"], R.capabilities],
  [["quality.html", "iso.htm"], R.quality],
  [["global-exports.html"], R.exports],
  [["industry-we-serve.html"], R.industries],
  [["contact-us.html"], R.contact],
  [["enquiry.html"], R.rfq],
  [["products.html", "Gas-Connection-Components-Parts.html", "Quick-Connect-Disconnect-Couplings.html"], R.products],
  [["index.php", "sitemap.html", "news-and-update.html"], R.home],
];
const reEsc = (s) => s.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
const htaccess = `# Generated by scripts/prerender.mjs. Apache / LiteSpeed (Hostinger).
Options -Indexes -MultiViews
DirectorySlash On
DirectoryIndex index.html
ErrorDocument 404 /404.html
AddDefaultCharset utf-8

<IfModule mod_rewrite.c>
RewriteEngine On

# https, and the bare domain (www -> airgrip.co.in)
RewriteCond %{HTTPS} off
RewriteRule ^ https://%{HTTP_HOST}%{REQUEST_URI} [R=301,L]
RewriteCond %{HTTP_HOST} ^www\\.(.+)$ [NC]
RewriteRule ^ https://%1%{REQUEST_URI} [R=301,L]
# /about/index.html -> /about/ (THE_REQUEST: only what the visitor asked for, not the DirectoryIndex lookup)
RewriteCond %{THE_REQUEST} \\s/+(\\S*/)?index\\.html[\\s?]
RewriteRule ^(.*/)?index\\.html$ /$1 [R=301,L]

# old WordPress site: pages moved (301), platform paths gone (410)
${MAP.flatMap(([olds, to]) => olds.map((o) => `RewriteRule ^${reEsc(o)}/?$ ${to} [R=301,NE,L]`)).join("\n")}
RewriteRule ^(wp-content|wp-admin|wp-includes|wp-json)(/|$) - [G,L]
RewriteRule ^(wp-login\\.php|xmlrpc\\.php|feed/?)$ - [G,L]
# WordPress archives and feeds: the hacked old site filled these with casino spam (2026), still in Google's index
RewriteRule ^(category|tag|author|page)(/|$) - [G,L]
RewriteRule ^(19|20)[0-9][0-9](/|$) - [G,L]
RewriteRule (^|/)feed/?$ - [G,L]
RewriteRule ^(shop|goods)\\.php$ - [G,L]
RewriteRule ^(sitemap_index|wp-sitemap[^/]*|[a-z_]+-sitemap[0-9]*)\\.xml$ - [G,L]
RewriteCond %{QUERY_STRING} (^|&)(p|page_id|cat|tag)=
RewriteRule ^(index\\.php)?$ - [G,L]
# older static site: pages moved (301)
${LEGACY.flatMap(([olds, to]) => olds.map((o) => `RewriteRule ^${reEsc(o)}/?$ ${to} [R=301,NE,L]`)).join("\n")}
</IfModule>

<IfModule mod_headers.c>
Header always set X-Content-Type-Options "nosniff"
Header always set Referrer-Policy "strict-origin-when-cross-origin"
Header always set X-Frame-Options "SAMEORIGIN"
Header always set Permissions-Policy "camera=(), microphone=(), geolocation=()"
<FilesMatch "\\.html$">
Header set Cache-Control "no-cache"
</FilesMatch>
<FilesMatch "\\.(svg|webp|png|jpg|ico)$">
Header set Cache-Control "public, max-age=604800"
</FilesMatch>
</IfModule>

<IfModule mod_deflate.c>
AddOutputFilterByType DEFLATE text/html text/css text/plain text/xml text/javascript application/javascript application/json application/xml image/svg+xml
</IfModule>
`;
if (DEV) {
  // GitHub Pages: no Apache, no PHP; nothing to index
  for (const f of ["sitemap.xml", ".htaccess", "api"]) fs.rmSync(path.join(dist, f), { recursive: true, force: true });
  fs.writeFileSync(path.join(dist, "robots.txt"), "User-agent: *\nDisallow: /\n");
} else {
fs.writeFileSync(path.join(dist, ".htaccess"), htaccess);
fs.writeFileSync(path.join(dist, "assets", ".htaccess"), `# hashed file names: cache for a year\n<IfModule mod_headers.c>\nHeader set Cache-Control "public, max-age=31536000, immutable"\n</IfModule>\n`);
}
fs.rmSync(path.join(dist, "index.html.tpl"), { force: true });
// route list for the browser test tools (tools/*.mjs)
fs.writeFileSync(path.join(root, "tools", "routes-for-check.mjs"), "// Written by scripts/prerender.mjs from src/routes.ts\nexport const routes = " + JSON.stringify(routes.map((r) => ({ name: r.name, path: r.path })), null, 1) + ";\n");

console.log(`prerendered ${n} pages, sitemap with ${indexable.length} URLs, .htaccess with ${[...MAP, ...LEGACY].reduce((a, [o]) => a + o.length, 0)} redirects`);
