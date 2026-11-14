// Minimal headless-Chrome driver over the DevTools protocol (Node 22 has WebSocket built in). Used by the check tools.
import { spawn } from "node:child_process";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";

const CHROME = process.env.CHROME || "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome";

export async function launch() {
  const prof = fs.mkdtempSync(path.join(os.tmpdir(), "agcdp-"));
  const port = 9500 + Math.floor(Math.random() * 400);
  const chrome = spawn(CHROME, ["--headless=new", "--disable-gpu", `--remote-debugging-port=${port}`, `--user-data-dir=${prof}`, "about:blank"], { stdio: "ignore" });
  let ws;
  for (let i = 0; i < 60 && !ws; i++) {
    await new Promise((r) => setTimeout(r, 200));
    try {
      const page = (await (await fetch(`http://127.0.0.1:${port}/json/list`)).json()).find((t) => t.type === "page");
      if (page) ws = new WebSocket(page.webSocketDebuggerUrl);
    } catch { /* starting */ }
  }
  await new Promise((r) => ws.addEventListener("open", r, { once: true }));
  let id = 0;
  const pending = new Map();
  const events = [];
  ws.addEventListener("message", (m) => {
    const d = JSON.parse(m.data);
    if (d.id && pending.has(d.id)) { pending.get(d.id)(d); pending.delete(d.id); } else if (d.method) events.push(d);
  });
  const send = (method, params = {}) => new Promise((r) => { const i = ++id; pending.set(i, r); ws.send(JSON.stringify({ id: i, method, params })); });
  const evalJs = async (expr) => {
    const r = await send("Runtime.evaluate", { expression: expr, returnByValue: true, awaitPromise: true });
    if (r.result?.exceptionDetails) throw new Error(r.result.exceptionDetails.exception?.description || "eval failed: " + expr.slice(0, 80));
    return r.result?.result?.value;
  };
  const wait = (ms) => new Promise((r) => setTimeout(r, ms));
  async function load(url, width = 1440) {
    await send("Emulation.setDeviceMetricsOverride", { width, height: 900, deviceScaleFactor: 1, mobile: width < 500 });
    await send("Page.navigate", { url });
    await waitLoad();
  }
  async function waitLoad() {
    for (let i = 0; i < 80; i++) { await wait(100); try { if (await evalJs("document.readyState === 'complete'")) break; } catch { /* navigating */ } }
    await wait(500);
  }
  async function until(expr, ms = 4000) {
    for (let t = 0; t < ms; t += 100) { try { if (await evalJs(expr)) return true; } catch { /* navigating */ } await wait(100); }
    return false;
  }
  async function setFiles(selector, files) {
    const r = await send("Runtime.evaluate", { expression: `document.querySelector(${JSON.stringify(selector)})` });
    await send("DOM.enable");
    await send("DOM.setFileInputFiles", { files, objectId: r.result.result.objectId });
  }
  await send("Page.enable");
  await send("Runtime.enable");
  const errors = () => events.filter((e) => e.method === "Runtime.exceptionThrown" || (e.method === "Runtime.consoleAPICalled" && e.params.type === "error"))
    .map((e) => e.params.exceptionDetails?.exception?.description || e.params.args?.map((a) => a.value ?? a.description).join(" "));
  const close = () => { ws.close(); chrome.kill(); };
  return { send, evalJs, load, waitLoad, until, setFiles, events, errors, wait, close };
}

// Helpers injected into pages: set a React-controlled field and fire the event React listens to.
export const DOM_HELPERS = `
  window.$ = (s) => document.querySelector(s);
  window.$$ = (s) => [...document.querySelectorAll(s)];
  window.setVal = (el, v) => { el = typeof el === 'string' ? $(el) : el; const p = Object.getPrototypeOf(el);
    Object.getOwnPropertyDescriptor(p, 'value').set.call(el, v); el.dispatchEvent(new Event(el.tagName === 'SELECT' ? 'change' : 'input', { bubbles: true })); };
  window.btn = (text, root = document) => [...root.querySelectorAll('button')].find(b => b.textContent.trim().startsWith(text));
  true`;
