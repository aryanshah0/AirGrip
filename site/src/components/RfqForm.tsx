// Full quote form:
//  - one part code can be quoted in several finishes ("+ another finish" adds a line for the same code)
//  - drawings are checked per file (type, 20 MB) and a rejected file says why on its own row
// Catalogue lines, quantities, parts and text fields are kept in sessionStorage while the visitor browses.
import { useEffect, useRef, useState, type FormEvent, type ReactNode } from "react";
import { P, SITE } from "../site";
import { basket, useBasket } from "../lib/basket";
import { SENT_KEY, SendError, batchProblem, fileProblem, newRef, onPageRestore, sendForm, type SentSummary } from "../lib/forms";
import { track } from "../lib/analytics";

const SKEY = "ag-rfq";
const SCHEME = /^AG-[A-Z]{2}-[A-Z0-9]+$/;                       // basket codes without finish
const TYPED = /^(AG-[A-Z]{2}-[A-Z0-9]+)(?:-(N|NI|SN|ZN))?$/;     // typed codes, optional finish suffix
const FINISHES: [string, string][] = [["N", "Natural"], ["NI", "Nickel"], ["SN", "Tin"], ["ZN", "Zinc"]];

interface Line { id: string; fin: string; qo: string; qy: string }
interface Draw { id: string; file: File; name: string; size: number; qo: string; qy: string; problem: string }
interface Part { id: string; name: string; qo: string; qy: string }
type Fields = Record<string, string | boolean>;
// fields kept for the session (the privacy tick is not: it is given fresh each time)
const KEEP = ["mat", "fin", "tol", "pl", "due", "inc", "dest", "fpd", "msg", "nm", "co", "em", "ph", "ct", "doc1", "doc3", "nda"];
const kept = (x: Fields) => Object.fromEntries(Object.entries(x).filter(([k]) => KEEP.includes(k)));

let seq = 0;
const uid = (p: string) => p + Date.now().toString(36) + (++seq);

function Qty({ v, set }: { v: { qo: string; qy: string }; set: (k: "qo" | "qy", val: string) => void }) {
  return (
    <>
      <label>Qty / order<input inputMode="numeric" value={v.qo} placeholder="e.g. 5,000" onChange={(e) => set("qo", e.target.value)} /></label>
      <label>Qty / year<input inputMode="numeric" value={v.qy} placeholder="e.g. 60,000" onChange={(e) => set("qy", e.target.value)} /></label>
    </>
  );
}

export function RfqForm() {
  const items = useBasket();
  const [lines, setLines] = useState<Record<string, Line[]>>({});
  const [draws, setDraws] = useState<Draw[]>([]);
  const [parts, setParts] = useState<Part[]>([{ id: "p1", name: "", qo: "", qy: "" }]);
  const [fields, setFields] = useState<Fields>({});
  const [reattach, setReattach] = useState<{ name: string; qo: string; qy: string }[]>([]);
  const ref = useRef("");
  const [err, setErr] = useState<Record<string, string>>({});
  const [probs, setProbs] = useState<[string, string][]>([]);
  // codes carried in the link from the quote bar when the browser blocks storage (/rfq/?codes=AG-SP-PG07,…)
  useEffect(() => {
    const c = new URLSearchParams(location.search).get("codes");
    if (c) c.split(",").map((x) => x.trim().toUpperCase()).filter((x) => /^AG-[A-Z]{2}-[A-Z0-9]+$/.test(x)).forEach((x) => basket.add(x, "From the quote list"));
  }, []);
  const [sendMsg, setSendMsg] = useState("");
  const [busy, setBusy] = useState(false);
  const [code, setCode] = useState("");
  const loaded = useRef(false);
  const errBox = useRef<HTMLDivElement>(null);
  const pcRef = useRef<HTMLInputElement>(null);
  const lastPart = useRef<string | null>(null);

  // restore the session after the first render (the pre-rendered page is the empty form)
  useEffect(() => {
    try {
      const s = JSON.parse(sessionStorage.getItem(SKEY) || "{}");
      if (s.lines) {
        // older sessions stored one line per code: { fin, qo, qy }
        const l: Record<string, Line[]> = {};
        Object.entries(s.lines).forEach(([c, v]) => { l[c] = Array.isArray(v) ? (v as Line[]) : [{ id: uid("l"), ...(v as Omit<Line, "id">) }]; });
        setLines(l);
      }
      if (s.fields) setFields(kept(s.fields));
      if (Array.isArray(s.parts) && s.parts.length) setParts(s.parts);
      if (Array.isArray(s.draws) && s.draws.length) setReattach(s.draws.map((d: { name: string; qo?: string; qy?: string }) => ({ name: d.name, qo: d.qo || "", qy: d.qy || "" })));
    } catch { /* fresh form */ }
    loaded.current = true;
    return onPageRestore(() => setBusy(false));
  }, []);
  useEffect(() => {
    if (!loaded.current) return;
    try { sessionStorage.setItem(SKEY, JSON.stringify({ lines, fields: kept(fields), parts, draws: draws.length ? draws.map((d) => ({ name: d.name, size: d.size, qo: d.qo, qy: d.qy })) : reattach })); } catch { /* storage blocked */ }
  }, [lines, fields, parts, draws, reattach]);
  useEffect(() => { if (lastPart.current) { document.getElementById("pn-" + lastPart.current)?.focus(); lastPart.current = null; } }, [parts]);

  const linesOf = (c: string): Line[] => lines[c]?.length ? lines[c] : [{ id: c, fin: "N", qo: "", qy: "" }];
  const setLine = (c: string, id: string, patch: Partial<Line>) => setLines((L) => ({ ...L, [c]: linesOf(c).map((x) => (x.id === id ? { ...x, ...patch } : x)) }));
  const addFinish = (c: string) => {
    const cur = linesOf(c);
    const free = FINISHES.find(([f]) => !cur.some((x) => x.fin === f));
    setLines((L) => ({ ...L, [c]: [...cur, { id: uid("l"), fin: free ? free[0] : "N", qo: "", qy: "" }] }));
  };
  const removeLine = (c: string, id: string) => {
    const rest = linesOf(c).filter((x) => x.id !== id);
    if (!rest.length) { setLines((L) => { const n = { ...L }; delete n[c]; return n; }); basket.remove(c); }
    else setLines((L) => ({ ...L, [c]: rest }));
  };

  const f = (k: string) => (fields[k] as string) ?? "";
  // the optional technical fields start folded; they open when one already holds a value (e.g. a restored draft)
  const DEFAULTS = ["", "As per drawing / standard", "As per drawing", "Not sure"];
  const reqUsed = ["mat", "fin", "tol", "pl", "due", "inc", "dest", "fpd"].some((k) => !DEFAULTS.includes(f(k)));
  // open it when a value appears; never close it in code (the buyer may have opened it by hand)
  const reqBox = useRef<HTMLDetailsElement>(null);
  useEffect(() => { if (reqUsed && reqBox.current && !reqBox.current.open) reqBox.current.open = true; }, [reqUsed]);
  const setF = (k: string, v: string | boolean) => setFields((x) => ({ ...x, [k]: v }));
  const nda = !!fields.nda;
  const okDraws = draws.filter((d) => !d.problem);
  const sendFiles = nda ? [] : okDraws;
  // part names stay visible (and are sent) once typed, even after a code or drawing is added
  const partsShown = (items.length === 0 && (draws.length === 0 || nda)) || parts.some((x) => x.name.trim());
  const catalogueOnly = !draws.length && items.length > 0;

  function addCode() {
    const raw = code.trim();
    if (!raw) return;
    const v = raw.toUpperCase().replace(/\s+/g, "");
    const m = v.match(TYPED);
    if (m) {
      if (m[2]) setLines((L) => ({ ...L, [m[1]]: [{ ...linesOf(m[1])[0], fin: m[2] }, ...linesOf(m[1]).slice(1)] }));
      basket.add(m[1], "Added by code");
    } else basket.add(raw, "Code as typed");
    setCode("");
    pcRef.current?.focus();
  }

  function addFiles(list: FileList | null) {
    if (!list) return;
    // copy now: the FileList is live and is emptied when the input is reset right after this call
    // limits per request (count, total size) apply on top of the per-file checks
    let n = draws.filter((d) => !d.problem).length, bytes = draws.filter((d) => !d.problem).reduce((a, d) => a + d.size, 0);
    const added = [...list].map((x) => {
      const was = reattach.find((r) => r.name === x.name); // same drawing attached before leaving the page: keep its quantities
      const problem = fileProblem(x) || batchProblem(n, bytes, x);
      if (!problem) { n++; bytes += x.size; }
      return { id: uid("d"), file: x, name: x.name, size: x.size, qo: was?.qo || "", qy: was?.qy || "", problem };
    });
    setDraws((d) => [...d, ...added]);
    setReattach([]);
  }

  async function submit(e: FormEvent) {
    e.preventDefault();
    const p: [string, string][] = [];
    const next: Record<string, string> = {};
    const namedParts = partsShown ? parts.filter((x) => x.name.trim()) : [];
    const empty = !sendFiles.length && !items.length && !namedParts.length && !f("msg").trim();
    if (empty) p.push([partsShown ? "pn-" + parts[0].id : nda ? "msg" : "files", "Add a drawing, a part code, or a part name with quantities"]);
    ([["nm", "Enter your name"], ["co", "Enter your company"], ["em", "Enter a valid work email"], ["ct", "Enter your country"]] as const).forEach(([id, msg]) => {
      const v = f(id).trim();
      if (!v || (id === "em" && !/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(v))) { next[id] = msg; p.push([id, msg]); }
    });
    if (!fields.ok) { next.ok = "Please tick to agree"; p.push(["ok", "Please tick to agree to the privacy terms"]); }
    setErr(next);
    setProbs(p);
    setSendMsg("");
    if (p.length) {
      requestAnimationFrame(() => { errBox.current?.scrollIntoView({ block: "center" }); document.getElementById(p[0][0])?.focus({ preventScroll: true }); });
      return;
    }

    ref.current ||= newRef(); // one reference per request: a retry after a failed send keeps it
    const q = (x: { qo: string; qy: string }) => [x.qo && x.qo + " / order", x.qy && x.qy + " / year"].filter(Boolean).join(" · ");
    const sentItems = items.flatMap((i) => SCHEME.test(i.code)
      ? linesOf(i.code).map((l) => ({ code: i.code, fin: l.fin, qo: l.qo, qy: l.qy, check: false }))
      : [{ code: i.code, fin: "", qo: linesOf(i.code)[0].qo, qy: linesOf(i.code)[0].qy, check: true }]);
    const payload: Record<string, string | boolean> = {
      ref: ref.current,
      items: sentItems.map((x) => [x.check ? x.code + " (code as typed)" : `${x.code}-${x.fin}`, q(x)].filter(Boolean).join(" · ")).join("\n"),
      drawings: sendFiles.map((d) => [d.name, q(d)].filter(Boolean).join(" · ")).join("\n"),
      parts: namedParts.map((x) => [x.name, q(x)].filter(Boolean).join(" · ")).join("\n"),
      material: f("mat"), finish: catalogueOnly ? "" : f("fin"), tolerance: catalogueOnly ? "" : f("tol"), plating_thickness: f("pl"),
      samples_by: f("due"), incoterm: f("inc"), destination: f("dest"), first_delivery: f("fpd"), notes: f("msg"),
      name: f("nm"), company: f("co"), email: f("em"), phone: f("ph"), country: f("ct"),
      ppap_level3: !!fields.doc1, reach_statement: !!fields.doc3, nda, consent: true,
    };
    setBusy(true);
    try {
      await sendForm("rfq", payload, sendFiles.map((d) => d.file));
    } catch (x) {
      track("form_send_failed", { form: "rfq", reason: x instanceof SendError ? x.message.slice(0, 90) : "network" });
      setSendMsg(x instanceof SendError ? x.message : "Could not send. Please email " + SITE.email + ".");
      setBusy(false);
      return;
    }
    const sent: SentSummary = {
      ref: ref.current, nda, email: f("em").trim(),
      items: sentItems, files: sendFiles.map((d) => ({ name: d.name, qo: d.qo, qy: d.qy })), parts: namedParts.map((x) => ({ name: x.name, qo: x.qo, qy: x.qy })),
    };
    await track("rfq_submit", { form: "rfq", items: sentItems.length, files: sendFiles.length, nda });
    try { sessionStorage.setItem(SENT_KEY, JSON.stringify(sent)); sessionStorage.removeItem(SKEY); } catch { /* ignore */ }
    loaded.current = false;
    basket.clear();
    location.href = import.meta.env.BASE_URL + P.thanks.slice(1);
  }

  const input = (id: string, extra: Record<string, unknown> = {}) => ({
    id, value: f(id), onChange: (e: { target: { value: string } }) => setF(id, e.target.value),
    onBlur: () => { if (err[id] && f(id).trim()) setErr((x) => ({ ...x, [id]: "" })); }, ...(err[id] !== undefined ? { "aria-invalid": !!err[id] } : {}), ...extra,
  });
  const check = (id: string) => ({ id, checked: !!fields[id], onChange: (e: { target: { checked: boolean } }) => setF(id, e.target.checked) });

  const catalogue: ReactNode = (
    <fieldset id="catalogue" key="catalogue">
      <legend>Catalogue items <span className="muted">{items.length ? `· ${items.length}` : ""}</span></legend>
      <div className="items" id="citems">
        {items.map((i) => {
          const ok = SCHEME.test(i.code);
          const ls = linesOf(i.code);
          return ls.map((l, n) => (
            <div className="item" key={i.code + l.id}>
              <div className="what"><b>{ok ? `${i.code}-${l.fin}` : i.code}</b><span>{ok ? (n === 0 ? i.label : "Same part, another finish") : <span className="chk">We'll check this code</span>}</span>
                {ok && n === ls.length - 1 && ls.length < FINISHES.length && <button type="button" className="linkbtn" onClick={() => addFinish(i.code)}>+ another finish</button>}</div>
              {ok ? <label>Finish<select value={l.fin} onChange={(e) => setLine(i.code, l.id, { fin: e.target.value })}>{FINISHES.map(([v, t]) => <option key={v} value={v}>{t}</option>)}</select></label> : <span></span>}
              <Qty v={l} set={(k, v) => setLine(i.code, l.id, { [k]: v })} />
              <button type="button" aria-label={`Remove ${ok ? i.code + "-" + l.fin : i.code}`} onClick={() => removeLine(i.code, l.id)}>×</button>
            </div>
          ));
        })}
      </div>
      <label htmlFor="pc" className="small" style={{ display: "block", marginTop: "var(--s-3)", fontWeight: "600" }}>Know the part code? Type it here</label><div className="addcode" style={{ marginTop: "6px" }}><input ref={pcRef} id="pc" className="input" placeholder="AG-PS-PG09-NI" autoComplete="off" value={code} onChange={(e) => setCode(e.target.value)} onKeyDown={(e) => { if (e.key === "Enter") { e.preventDefault(); addCode(); } }} /><button type="button" className="btn btn--ghost btn--sm" id="pcadd" onClick={addCode}>+ Add part code</button></div>
      <p className="tbl-note">Or add sizes from any datasheet, e.g. <a className="link" href={P.pressureScrew}>pressure screws</a>.</p>
    </fieldset>
  );

  const drawings: ReactNode = (
    <fieldset id="drawings" key="drawings" className={nda ? "is-off" : undefined}>
      <legend>Drawings <span className="muted">one row per file</span></legend>
      <label className="check" style={{ marginBottom: "var(--s-3)" }}><input type="checkbox" {...check("nda")} /><span>Sign my NDA before I share drawings</span></label>
      <p className="tbl-note" id="nda-note" hidden={!nda} style={{ margin: "0 0 var(--s-3)" }}>NDA requested: the upload is switched off and no files will be sent. List the parts and quantities below; send us your NDA by email to {SITE.email}. We sign and return it; then reply to that email with your drawings.<span>{nda && draws.length ? ` Your ${draws.length} chosen file${draws.length > 1 ? "s are" : " is"} kept here and will not be sent unless you untick this box.` : ""}</span></p>
      <p className="tbl-note" id="reattach" hidden={!reattach.length} style={{ margin: "0 0 var(--s-3)" }}>{reattach.length ? "Please attach your drawings again (files are not kept when you leave this page): " + reattach.map((r) => r.name).join(", ") + "." : ""}</p>
      <div className="sheet"><div className="frame">
        <label className="area" htmlFor="files">
          <input type="file" id="files" multiple accept=".pdf,.dwg,.dxf,.step,.stp,.igs,.iges,.jpg,.png" disabled={nda} onChange={(e) => { addFiles(e.target.files); e.target.value = ""; }} />
          <span><span className="big"><span className="no-touch">Drop drawings here, or choose files</span><span className="touch">Choose drawing files</span></span> <span className="hint">PDF · DWG · DXF · STEP · IGES · photos of samples · max&nbsp;20&nbsp;MB each</span></span>
        </label>
      </div></div>
      {draws.length > 0 && <p className="tbl-note" style={{ margin: "var(--s-3) 0 0" }}>Add quantities per drawing. We take the drawing number and revision from the file.</p>}
      <div className={"items" + (nda ? " is-held" : "")} id="ditems" style={{ marginTop: "var(--s-3)" }}>
        {draws.map((d) => (
          <div className="item" key={d.id}>
            <div className="what"><b>{d.name}</b><span>{d.size < 104858 ? "< 0.1" : (d.size / 1048576).toFixed(1)} MB</span></div><span></span>
            <Qty v={d} set={(k, v) => setDraws((x) => x.map((y) => (y.id === d.id ? { ...y, [k]: v } : y)))} />
            <button type="button" aria-label={`Remove ${d.name}`} onClick={() => setDraws((x) => x.filter((y) => y.id !== d.id))}>×</button>
            {d.problem && <span className="item-e fmsg" role="alert">{d.problem}</span>}
          </div>
        ))}
      </div>
    </fieldset>
  );

  return (
    <form id="rfqform" noValidate aria-label="Request for quote" onSubmit={submit}>
      <div ref={errBox} className="alert" id="err" role="alert" hidden={!probs.length}>
        {(probs.length ? <>Please fix the following:<ul>{probs.map(([id, msg], i) => <li key={i}><a href={"#" + id} onClick={(ev) => { ev.preventDefault(); const el = document.getElementById(id); el?.scrollIntoView({ block: "center" }); el?.focus({ preventScroll: true }); }}>{msg}</a></li>)}</ul></> : "Please complete the highlighted fields.")}
      </div>

      {items.length ? [catalogue, drawings] : [drawings, catalogue]}

      <fieldset id="parts" hidden={!partsShown}>
        <legend>Parts and quantities <span className="muted">if you are not attaching drawings or part codes</span></legend>
        <div className="items" id="pitems">
          {parts.map((x) => (
            <div className="item" key={x.id}>
              <label className="what">Part name or number<input className="pname" id={"pn-" + x.id} value={x.name} placeholder="e.g. Hex adapter, drawing AB-123" onChange={(e) => setParts((ps) => ps.map((y) => (y.id === x.id ? { ...y, name: e.target.value } : y)))} /></label><span></span>
              <Qty v={x} set={(k, v) => setParts((ps) => ps.map((y) => (y.id === x.id ? { ...y, [k]: v } : y)))} />
              {parts.length > 1 ? <button type="button" aria-label={`Remove part ${x.name}`} onClick={() => setParts((ps) => ps.filter((y) => y.id !== x.id))}>×</button> : <span></span>}
            </div>
          ))}
        </div>
        <button type="button" className="btn btn--ghost btn--sm addpart" id="addpart" onClick={() => { const id = uid("p"); lastPart.current = id; setParts((ps) => [...ps, { id, name: "", qo: "", qy: "" }]); }}>+ another part</button>
      </fieldset>

      <details className="rq-more" ref={reqBox}>
        <summary><span className="lg">Technical details</span> <span className="muted">optional · material, finish, tolerance, plating, dates, Incoterm</span></summary>
      <fieldset>
        <legend className="sr-only">Technical details</legend>
        <div className="tbf">
          <div className="cell s2"><label htmlFor="mat">Material</label><select {...input("mat")} value={f("mat") || "As per drawing / standard"}><option>As per drawing / standard</option><option>CW614N · CuZn39Pb3 (free-cutting)</option><option>CW617N · CuZn40Pb2 (forging)</option><option>Low-lead / lead-free · CW511L / CW724R</option><option>DZR · CW602N</option><option>Other / not sure</option></select></div>
          <div className="cell dwg-only" hidden={catalogueOnly}><label htmlFor="fin">Finish for drawn parts</label><select {...input("fin")} value={f("fin") || "As per drawing"}><option>As per drawing</option><option>Natural</option><option>Nickel</option><option>Tin</option><option>Zinc</option><option>Silver (on request)</option><option>Chrome (on request)</option></select></div>
          <div className="cell dwg-only" hidden={catalogueOnly}><label htmlFor="tol">General tolerance</label><input {...input("tol")} className="m" placeholder="As per drawing" /></div>
          <div className="cell"><label htmlFor="pl">Plating thickness</label><input {...input("pl")} placeholder="µm, as on your drawing" /></div>
          <div className="cell"><label htmlFor="due">Samples needed by</label><input {...input("due")} type="date" /></div>
          <div className="cell s2"><label htmlFor="inc">Incoterm</label><select {...input("inc")} value={f("inc") || "Not sure"}><option>Not sure</option><option>EXW Jamnagar</option><option>FOB Indian port</option><option>CIF / CFR</option><option>Delivered (India)</option></select></div>
          <div className="cell s2"><label htmlFor="dest">Destination port or city</label><input {...input("dest")} placeholder="e.g. Hamburg, or Pune" /></div>
          <div className={"cell s2 fpd-cell" + (catalogueOnly ? " s4" : "")}><label htmlFor="fpd">First production delivery wanted</label><input {...input("fpd")} type="date" /></div>
        </div>
      </fieldset>
      </details>

      <fieldset>
        <legend>Notes <span className="muted">optional</span></legend>
        <div className="tbf">
          <div className="cell s4"><label htmlFor="msg" className="sr-only">Notes</label><textarea {...input("msg")} placeholder="Application, critical dimensions, packing, anything else we should know"></textarea></div>
        </div>
      </fieldset>

      <fieldset>
        <legend>Your details</legend>
        <div className="tbf">
          <div className="cell s2"><label htmlFor="nm">Name <span className="req">*</span></label><input {...input("nm")} autoComplete="name" required aria-describedby="nm-e" /><span className="ferr" id="nm-e">{err.nm}</span></div>
          <div className="cell s2"><label htmlFor="co">Company <span className="req">*</span></label><input {...input("co")} autoComplete="organization" required aria-describedby="co-e" /><span className="ferr" id="co-e">{err.co}</span></div>
          <div className="cell s2"><label htmlFor="em">Work email <span className="req">*</span></label><input {...input("em")} type="email" autoComplete="email" required aria-describedby="em-e" /><span className="ferr" id="em-e">{err.em}</span></div>
          <div className="cell"><label htmlFor="ph">Phone / WhatsApp</label><input {...input("ph")} type="tel" className="m" autoComplete="tel" /></div>
          <div className="cell"><label htmlFor="ct">Country <span className="req">*</span></label><input {...input("ct")} autoComplete="country-name" required aria-describedby="ct-e" /><span className="ferr" id="ct-e">{err.ct}</span></div>
        </div>
      </fieldset>

      <div className="stack">
        <fieldset style={{ marginBottom: "var(--s-3)" }}><legend style={{ fontSize: "var(--t-14)", fontWeight: "600", marginBottom: "6px" }}>Documents required</legend>
          <div style={{ display: "flex", flexWrap: "wrap", gap: "8px 20px" }}>
            <label className="check"><input type="checkbox" {...check("doc1")} /><span>PPAP Level 3</span></label>
            <label className="check"><input type="checkbox" {...check("doc3")} /><span>REACH statement</span></label>
          </div>
          <p className="tbl-note" style={{ marginTop: "6px" }}>EN 10204 3.1 mill certificate and certificate of conformity come with every batch.</p></fieldset>
        <label className="check"><input type="checkbox" id="ok" aria-describedby="ok-e" aria-invalid={!!err.ok} checked={!!fields.ok} onChange={(e) => { setF("ok", e.target.checked); if (e.target.checked) setErr((x) => ({ ...x, ok: "" })); }} /><span>I agree that AirGrip may store these details to answer this request (<a className="link" href={P.privacy}>privacy policy</a>). <span className="req" style={{ color: "var(--brass-deep)" }}>*</span> <span className="ferr err" id="ok-e">{err.ok}</span></span></label>
      </div>
      {sendMsg && <p className="err sendmsg" id="sendmsg" role="alert">{sendMsg}</p>}
      <div className="formend"><span className="small muted">Reply within two working days · Sat–Thu, IST</span><button className="btn btn--brass" type="submit" disabled={busy}>{busy ? "Sending…" : "Send request"} <span className="arr" aria-hidden="true">→</span></button></div>
    </form>
  );
}
