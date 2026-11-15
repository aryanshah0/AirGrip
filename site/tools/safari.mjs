// Same API as cdp.mjs (launch() -> evalJs, load, waitLoad, until, setFiles, errors, close), driving real Safari
// through safaridriver (WebDriver). Needs Safari > Settings > Developer > "Allow remote automation".
//   BROWSER=safari node tools/flow-check.mjs
import { spawn } from "node:child_process";

export async function launch() {
  const port = 4600 + Math.floor(Math.random() * 300);
  const driver = spawn("/usr/bin/safaridriver", ["-p", String(port)], { stdio: "ignore" });
  const W = `http://127.0.0.1:${port}`;
  const wait = (ms) => new Promise((r) => setTimeout(r, ms));
  let sid;
  for (let i = 0; i < 50 && !sid; i++) {
    await wait(200);
    try {
      const r = await (await fetch(W + "/session", { method: "POST", body: JSON.stringify({ capabilities: { alwaysMatch: { browserName: "safari" } } }) })).json();
      if (r.value?.error) throw new Error(r.value.message);
      sid = r.value.sessionId;
    } catch (e) { if (/remote automation|session not created/i.test(String(e))) { driver.kill(); throw e; } }
  }
  const S = `${W}/session/${sid}`;
  const call = async (method, p, body) => {
    const r = await (await fetch(S + p, { method, body: body && JSON.stringify(body) })).json();
    if (r.value?.error) throw new Error(`${r.value.error}: ${r.value.message}`);
    return r.value;
  };
  // Direct eval inside the injected function: statements allowed, last value returned, promises awaited.
  const evalJs = async (expr) => {
    const r = await call("POST", "/execute/async", {
      script: "const cb = arguments[arguments.length - 1]; const src = arguments[0];" +
        "Promise.resolve().then(() => eval(src)).then((v) => cb({ v: v === undefined ? null : v }), (e) => cb({ e: String(e && e.stack || e) }));",
      args: [expr],
    });
    if (r?.e) throw new Error(r.e);
    return r?.v;
  };
  const errs = [];
  const COLLECT = `if (!window.__agErr) { window.__agErr = []; addEventListener('error', (e) => __agErr.push(String(e.message)));
    addEventListener('unhandledrejection', (e) => __agErr.push('unhandled: ' + e.reason)); const ce = console.error;
    console.error = (...a) => { __agErr.push(a.map(String).join(' ')); ce.apply(console, a); }; } true`;
  const harvest = async () => { try { errs.push(...((await evalJs("window.__agErr || []")) || [])); await evalJs("window.__agErr = []; true"); } catch { /* page gone */ } };
  async function waitLoad() {
    for (let i = 0; i < 80; i++) { await wait(100); try { if (await evalJs("document.readyState === 'complete'")) break; } catch { /* navigating */ } }
    await wait(500);
    try { await evalJs(COLLECT); } catch { /* ignore */ }
  }
  let lastWidth = 0;
  async function load(url, width = 1440) {
    await harvest();
    if (width !== lastWidth) { await call("POST", "/window/rect", { width, height: 900 }); lastWidth = width; }
    await call("POST", "/url", { url });
    await waitLoad();
  }
  async function until(expr, ms = 4000) {
    for (let t = 0; t < ms; t += 150) { try { if (await evalJs(expr)) return true; } catch { /* navigating */ } await wait(150); }
    return false;
  }
  async function setFiles(selector, files) {
    const el = await call("POST", "/element", { using: "css selector", value: selector });
    const id = Object.values(el)[0];
    await call("POST", `/element/${id}/value`, { text: files.join("\n") });
  }
  // a real key press (WebDriver actions): "Tab", "Escape"; shift for Shift+key
  const WD_KEYS = { Tab: "\uE004", Escape: "\uE00C", Enter: "\uE007" };
  async function press(key, shift = false) {
    const k = WD_KEYS[key] || key, S_ = "\uE008";
    const seq = [...(shift ? [{ type: "keyDown", value: S_ }] : []), { type: "keyDown", value: k }, { type: "keyUp", value: k }, ...(shift ? [{ type: "keyUp", value: S_ }] : [])];
    await call("POST", "/actions", { actions: [{ type: "key", id: "kb", actions: seq }] });
    await call("DELETE", "/actions");
  }
  const errors = () => errs.slice();
  const close = async () => { await harvest(); try { await call("DELETE", ""); } catch { /* closed */ } driver.kill(); };
  return { evalJs, load, waitLoad, until, setFiles, press, errors, wait, close, async finish() { await harvest(); } };
}
