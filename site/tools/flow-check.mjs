// End-to-end checks of the interactive parts of the BUILT site, as a buyer would use them.
//   VITE_FORM_ENDPOINT=/api/form npm run build && npm run preview   (preview answers /api/form with a mock)
//   node tools/flow-check.mjs [origin]          (BROWSER=safari: real Safari through safaridriver)
import fs from "node:fs";
import os from "node:os";
import path from "node:path";
import { DOM_HELPERS, launch as launchChrome } from "./cdp.mjs";

const launch = process.env.BROWSER === "safari" ? (await import("./safari.mjs")).launch : launchChrome;

const O = process.argv[2] || "http://127.0.0.1:4173";
const b = await launch();
const results = [];
const check = (name, ok, detail = "") => { results.push([name, !!ok, detail]); console.log(`${ok ? "✓" : "✗"} ${name}${!ok && detail ? " — " + detail : ""}`); };
const go = async (p, w) => { await b.load(O + p, w); await b.evalJs(DOM_HELPERS); };
const ev = b.evalJs;

// test files for the drawing upload
const dir = fs.mkdtempSync(path.join(os.tmpdir(), "agfiles-"));
const good = path.join(dir, "AB-123 rev B.pdf"); fs.writeFileSync(good, "%PDF-1.4 test");
const bad = path.join(dir, "setup.exe"); fs.writeFileSync(bad, "x");
const big = path.join(dir, "huge.step"); fs.writeFileSync(big, Buffer.alloc(21 * 1048576));

// --- consent banner
await go("/");
await ev("localStorage.clear(); sessionStorage.clear(); true");
await go("/");
check("cookie banner opens on first visit", await ev("!$('.consent').hidden"));
await ev("btn('Essential only').click(); true");
check("Essential only closes it and stores the choice", await ev("$('.consent').hidden && localStorage.getItem('ag-consent') === 'essential'"));
await go("/");
check("banner stays closed on the next page", await ev("$('.consent').hidden"));
await ev("$('[data-cookie-settings]').click(); true");
check("footer Cookie settings reopens it", await ev("!$('.consent').hidden"));
await ev("btn('Essential only').click(); true");

// --- header
await ev("$('.nav button').click(); true");
check("Products opens the mega menu", await ev("$('.mega').classList.contains('open') && $('.nav button').getAttribute('aria-expanded') === 'true'"));
await ev("document.dispatchEvent(new KeyboardEvent('keydown', { key: 'Escape' })); true");
check("Escape closes the mega menu", await b.until("!$('.mega').classList.contains('open')"));
await go("/", 390);
await ev("$('.hdr__menu').click(); true");
check("phone: Menu opens the mobile nav", await ev("!$('#mnav').hidden && $('.hdr__menu').textContent === 'Close'"));

// --- stop plugs: add, head switch
await go("/products/brass-cable-glands/stop-plugs/");
await ev("$('#sizes .addq').click(); true");
check("+ Add marks the size as added", await ev("$('#sizes .addq').getAttribute('aria-pressed') === 'true' && $('#sizes .addq').textContent.includes('Added')"));
check("header count shows 1", await ev("$('.basket-btn .count').textContent === '1' && !$('.basket-btn .count').hidden"));
check("sticky quote bar appears", await ev("$('.qbar').classList.contains('on')"));
await ev("btn('Hex head').click(); true");
check("Hex head switches codes to AG-SH", await ev("$('#sizes td .mono').textContent === 'AG-SH-PG07' && $('[data-fam=\"AG-SH\"]').getAttribute('aria-checked') === 'true'"));
check("…and the hex size is not yet added", await ev("$('#sizes .addq').getAttribute('aria-pressed') === 'false'"));
await ev("$('#sizes .addq').click(); true");
check("hex stop plug added (2 items)", await ev("JSON.parse(localStorage.getItem('ag-basket')).map(i => i.code).join() === 'AG-SP-PG07,AG-SH-PG07'"));
await ev("$$('[role=tab]')[1].click(); true");
check("thread tabs switch to Metric", await ev("$$('[role=tabpanel]')[1].hidden === false && $$('[role=tabpanel]')[0].hidden === true"));

// --- lock nuts: EMC switch
await go("/products/brass-cable-glands/lock-nuts/");
await ev("btn('EMC').click(); true");
check("EMC switch rewrites codes to AG-LE", await ev("$$('td .mono').some(x => x.textContent === 'AG-LE-PG07') && !$$('td .mono').some(x => x.textContent === 'AG-LN-PG07')"));

// --- thread adapters: pair picker
await go("/products/brass-cable-glands/thread-adapters/");
await ev("setVal($('.pair select'), 'PG16'); true");
// outside Ø (mm) from the standards (DIN 40430, EN 60423, ISO 228-1, ASME B1.20.1), kept here independently of the site's data
const OD = { PG07: 12.5, PG09: 15.2, PG11: 18.6, PG13: 20.4, PG16: 22.5, PG21: 28.3, PG29: 37, PG36: 47, PG42: 54, PG48: 59.3,
  M12: 12, M16: 16, M20: 20, M25: 25, M32: 32, M40: 40, M50: 50, M63: 63, M80: 80,
  G38: 16.662, G12: 20.955, G34: 26.441, G1: 33.249, G114: 41.91, G112: 47.803, N38: 17.145, N12: 21.336, N34: 26.67, N1: 33.401, N114: 42.164, N112: 48.26 };
const glandOpts = await ev("[...$$('.pair')[0].querySelectorAll('select')[1].options].map(o => o.value)");
check("reducer: only smaller gland threads offered", glandOpts.length > 0 && glandOpts.every((t) => OD[t] < OD.PG16), glandOpts.join(","));
check("pair code updates", await ev("/^AG-RD-PG16/.test($('.pair .pair__code').textContent)"));
await ev("$('.pair .addq').click(); true");
check("pair added to the quote", await ev("JSON.parse(localStorage.getItem('ag-basket')).length === 3"));

// --- quote form
await go("/rfq/");
check("RFQ lists the 3 quote-list items first", await ev("$$('#citems .item').length === 3 && $('form').firstElementChild.nextElementSibling?.id === 'catalogue'"));
await ev("btn('+ another finish').click(); true");
check("+ another finish adds a second line for the same code", await ev("$$('#citems .item').length === 4 && $$('#citems .item b')[1].textContent === 'AG-SP-PG07-NI'"));
await ev("setVal('#pc', 'ag-ps-pg09-sn'); $('#pc').dispatchEvent(new KeyboardEvent('keydown', { key: 'Enter', bubbles: true })); true");
check("typed code with finish is added (Enter)", await b.until("$$('#citems .item b').some(x => x.textContent === 'AG-PS-PG09-SN')"));
await b.setFiles("#files", [good, bad, big]);
await b.until("$$('#ditems .item').length === 3");
check("three drawings listed, one row each", await ev("$$('#ditems .item').length === 3"));
check("bad type and oversize are rejected on their row", await ev("$$('#ditems .item .fmsg').length === 2 && /not accepted/.test($$('#ditems .item')[1].textContent) && /over the 20 MB/.test($$('#ditems .item')[2].textContent)"));
check("drawing-only fields shown when drawings are attached", await ev("!$('.dwg-only').hidden"));
await ev("$('#rfqform button[type=submit]').click(); true");
check("empty details: error summary lists 5 problems", await b.until("$$('#err li').length === 5"), await ev("$('#err').textContent"));
check("…and marks the fields invalid", await ev("$('#nm').getAttribute('aria-invalid') === 'true' && $('#nm-e').textContent.length > 0"));
await ev("setVal('#nm', 'Test Buyer'); setVal('#co', 'Test GmbH'); setVal('#em', 'buyer@example.com'); setVal('#ct', 'Germany'); $('#ok').click(); true");
await ev("setVal($$('#citems .item input')[0], '5000'); true");
// sending fails (no connection, then a server error): everything stays, the message sits above Send, retry works
await ev("window.__f = window.fetch; window.fetch = (u, o) => { sessionStorage.setItem('refs', (sessionStorage.getItem('refs') || '') + o.body.get('ref') + ' '); return Promise.reject(new TypeError('offline')); }; $('#rfqform button[type=submit]').click(); true");
check("send fails offline: message right above the Send button", await b.until("$('#sendmsg') && /try again/.test($('#sendmsg').textContent) && $('#sendmsg').nextElementSibling.classList.contains('formend')"));
check("…everything typed and attached is kept, Send works again", await ev("location.pathname === '/rfq/' && $('#nm').value === 'Test Buyer' && $$('#citems .item').length === 5 && $$('#ditems .item').length === 3 && !$('#rfqform button[type=submit]').disabled"), await ev("JSON.stringify([location.pathname, $('#nm').value, $$('#citems .item').length, $$('#ditems .item').length, $('#rfqform button[type=submit]').disabled])"));
await ev("window.fetch = (u, o) => { sessionStorage.setItem('refs', (sessionStorage.getItem('refs') || '') + o.body.get('ref') + ' '); return Promise.resolve(new Response('{}', { status: 502 })); }; $('#rfqform button[type=submit]').click(); true");
check("send fails with a server error: same message, still on the form", await b.until("/try again/.test($('#sendmsg')?.textContent || '') && location.pathname === '/rfq/' && !$('#rfqform button[type=submit]').disabled"));
check("…and the quote list is not cleared", await ev("JSON.parse(localStorage.getItem('ag-basket')).length === 4"), await ev("localStorage.getItem('ag-basket')"));
await ev("window.fetch = window.__f; $('#rfqform button[type=submit]').click(); true");
check("retry: valid form sends and opens the thank-you page", await b.until("location.pathname === '/rfq/thank-you/'", 6000));
await b.waitLoad(); await ev(DOM_HELPERS);
check("thank-you shows reference and email", await b.until("/^RFQ-\\d{2}-[2-9A-Z]{6}$/.test($('#ref').textContent) && $('#mail').textContent === 'buyer@example.com'"));
check("…the same reference as the failed attempts (a retry keeps it)", await ev("sessionStorage.getItem('refs').trim().split(' ').every((r) => r === $('#ref').textContent)"), await ev("sessionStorage.getItem('refs') + ' / ' + $('#ref').textContent"));
check("thank-you lists both finishes, typed code and the good drawing only", await ev("const t = $('#sent').textContent; t.includes('AG-SP-PG07-N') && t.includes('AG-SP-PG07-NI') && t.includes('AG-PS-PG09-SN') && t.includes('AB-123 rev B.pdf') && !t.includes('setup.exe') && !t.includes('huge.step')"));
check("quote list cleared after sending", await ev("JSON.parse(localStorage.getItem('ag-basket')).length === 0 && $('.basket-btn .count').hidden"));
await ev("history.back(); true");
check("Back to the sent form: Send button usable again (not stuck on Sending…)", await b.until("location.pathname === '/rfq/' && $('#rfqform button[type=submit]') && !$('#rfqform button[type=submit]').disabled && /Send request/.test($('#rfqform button[type=submit]').textContent)", 6000));

// --- NDA path
await go("/rfq/");
check("empty quote list: drawings come first", await ev("$('#rfqform fieldset').id === 'drawings'"));
await ev("$('#nda').click(); true");
check("NDA switches the upload off and shows parts rows", await ev("$('#files').disabled && !$('#nda-note').hidden && !$('#parts').hidden"));

// --- contact
await go("/contact/?topic=audit");
check("contact topic preselected from the link", await b.until("$('#t').value === 'audit'"));
await ev("$('#cform button[type=submit]').click(); true");
check("contact validation", await ev("!$('#cerr').hidden && $('#n').getAttribute('aria-invalid') === 'true'"));
await ev("setVal('#n', 'A'); setVal('#c', 'B'); setVal('#e', 'a@b.co'); setVal('#m', 'Hello'); $('#cok').click(); true");
await ev("window.__f = window.fetch; window.fetch = () => Promise.resolve(new Response('{}', { status: 500 })); $('#cform button[type=submit]').click(); true");
check("contact send fails: message above Send, message kept", await b.until("$('#csendmsg') && $('#csendmsg').nextElementSibling.querySelector('button[type=submit]') && $('#m').value === 'Hello' && $('#cdone').hidden"));
await ev("window.fetch = window.__f; $('#cform button[type=submit]').click(); true");
check("contact retry sends and confirms", await b.until("!$('#cdone').hidden && $('#cform').hidden"));
check("contact form is gone from the screen after sending", await b.evalJs("getComputedStyle($('#cform')).display === 'none' && $('#cdone').offsetHeight > 0"));

// --- home quick quote
await go("/");
await ev("setVal('#n', 'A'); setVal('#c', 'B'); setVal('#e', 'a@b.co'); setVal('#co', 'India'); $$('form[aria-label=\"Quick quote request\"] input[type=checkbox]')[1].click(); true");
await b.setFiles("form[aria-label='Quick quote request'] input[type=file]", [good]);
await ev("$('form[aria-label=\"Quick quote request\"] button').click(); true");
check("home quick quote sends and opens the thank-you page", await b.until("location.pathname === '/rfq/thank-you/'", 6000));

await b.finish?.();
const errs = b.errors();
check("no JavaScript errors during the run", !errs.length, errs.slice(0, 3).join(" | "));
await b.close();
fs.rmSync(dir, { recursive: true, force: true });
const bad2 = results.filter((r) => !r[1]).length;
console.log(bad2 ? `\n${bad2} of ${results.length} checks failed` : `\nall ${results.length} flow checks passed`);
process.exit(bad2 ? 1 : 0);
