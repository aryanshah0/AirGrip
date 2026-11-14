// End-to-end checks of the interactive parts of the BUILT site, as a buyer would use them.
//   VITE_FORM_ENDPOINT=/api/form npm run build && npm run preview   (preview answers /api/form with a mock)
//   node tools/flow-check.mjs [origin]
import fs from "node:fs";
import os from "node:os";
import path from "node:path";
import { DOM_HELPERS, launch } from "./cdp.mjs";

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
const OD = Object.fromEntries(JSON.parse(fs.readFileSync(new URL("../src/data/threads.json", import.meta.url), "utf8")).map((t) => [t.token, t.od]));
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
await ev("$('#rfqform button[type=submit]').click(); true");
check("valid form sends and opens the thank-you page", await b.until("location.pathname === '/rfq/thank-you/'", 6000));
await b.waitLoad(); await ev(DOM_HELPERS);
check("thank-you shows reference and email", await b.until("/^RFQ-\\d{2}-\\d{4}$/.test($('#ref').textContent) && $('#mail').textContent === 'buyer@example.com'"));
check("thank-you lists both finishes, typed code and the good drawing only", await ev("const t = $('#sent').textContent; t.includes('AG-SP-PG07-N') && t.includes('AG-SP-PG07-NI') && t.includes('AG-PS-PG09-SN') && t.includes('AB-123 rev B.pdf') && !t.includes('setup.exe') && !t.includes('huge.step')"));
check("quote list cleared after sending", await ev("JSON.parse(localStorage.getItem('ag-basket')).length === 0 && $('.basket-btn .count').hidden"));

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
await ev("$('#cform button[type=submit]').click(); true");
check("contact sends and confirms", await b.until("!$('#cdone').hidden && $('#cform').hidden"));

// --- home quick quote
await go("/");
await ev("setVal('#n', 'A'); setVal('#c', 'B'); setVal('#e', 'a@b.co'); setVal('#co', 'India'); $$('form[aria-label=\"Quick quote request\"] input[type=checkbox]')[1].click(); true");
await b.setFiles("form[aria-label='Quick quote request'] input[type=file]", [good]);
await ev("$('form[aria-label=\"Quick quote request\"] button').click(); true");
check("home quick quote sends and opens the thank-you page", await b.until("location.pathname === '/rfq/thank-you/'", 6000));

const errs = b.errors();
check("no JavaScript errors during the run", !errs.length, errs.slice(0, 3).join(" | "));
b.close();
fs.rmSync(dir, { recursive: true, force: true });
const bad2 = results.filter((r) => !r[1]).length;
console.log(bad2 ? `\n${bad2} of ${results.length} checks failed` : `\nall ${results.length} flow checks passed`);
process.exit(bad2 ? 1 : 0);
