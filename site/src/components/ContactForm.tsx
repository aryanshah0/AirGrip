// Contact page form (markup from design/contact.html). Topic is preselected from links like /contact/?topic=audit.
import { useEffect, useRef, useState, type FormEvent } from "react";
import { P } from "../site";
import { EMAIL_RE, SendError, sendForm } from "../lib/forms";
import { track } from "../lib/analytics";

const TOPICS: Record<string, string> = { documents: "documents", audit: "audit", visit: "audit", order: "order" };
const RULES: [keyof Fields, string][] = [["n", "Enter your name"], ["c", "Enter your company"], ["e", "Enter a valid work email"], ["m", "Write your message"]];
interface Fields { n: string; c: string; e: string; t: string; m: string }

export function ContactForm() {
  const [f, setF] = useState<Fields>({ n: "", c: "", e: "", t: "general", m: "" });
  const [ok, setOk] = useState(false);
  const [err, setErr] = useState<Record<string, string>>({});
  const [alert, setAlert] = useState("");
  const [sendMsg, setSendMsg] = useState("");
  const [busy, setBusy] = useState(false);
  const [done, setDone] = useState(false);
  const doneRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const t = new URLSearchParams(location.search).get("topic");
    if (t && TOPICS[t]) setF((x) => ({ ...x, t: TOPICS[t] }));
  }, []);
  useEffect(() => { if (done) doneRef.current?.focus(); }, [done]);

  const bad = (k: keyof Fields, v = f[k]) => !v.trim() || (k === "e" && !EMAIL_RE.test(v));
  const set = (k: keyof Fields) => (e: { target: { value: string } }) => setF({ ...f, [k]: e.target.value });
  const blur = (k: keyof Fields) => () => { if (err[k] && !bad(k)) setErr({ ...err, [k]: "" }); };

  async function submit(e: FormEvent) {
    e.preventDefault();
    const next: Record<string, string> = {};
    RULES.forEach(([k, msg]) => { if (bad(k)) next[k] = msg; });
    if (!ok) next.cok = "Please tick to agree";
    setErr(next);
    const first = RULES.map(([k]) => k as string).concat("cok").find((k) => next[k]);
    if (first) { setAlert("Please complete the highlighted fields."); document.getElementById(first)?.focus(); return; }
    setAlert("");
    setSendMsg("");
    setBusy(true);
    try {
      await sendForm("contact", { name: f.n, company: f.c, email: f.e, topic: f.t, message: f.m, consent: true });
      track("contact_submit", { topic: f.t });
      setDone(true);
    } catch (x) {
      setSendMsg(x instanceof SendError ? x.message : "Could not send. Please email sales@airgrip.in.");
    } finally {
      setBusy(false);
    }
  }

  return (
    <>
      <form id="cform" noValidate aria-label="Contact form" hidden={done} onSubmit={submit}>
        <div className="alert" id="cerr" role="alert" hidden={!alert}>{alert || "Please complete the highlighted fields."}</div>
        <div className="field"><label htmlFor="n">Name<span className="req">*</span></label><input className="input" id="n" autoComplete="name" required aria-describedby="n-e" aria-invalid={!!err.n} value={f.n} onChange={set("n")} onBlur={blur("n")} /><span className="err" id="n-e">{err.n}</span></div>
        <div className="field"><label htmlFor="c">Company<span className="req">*</span></label><input className="input" id="c" autoComplete="organization" required aria-describedby="c-e" aria-invalid={!!err.c} value={f.c} onChange={set("c")} onBlur={blur("c")} /><span className="err" id="c-e">{err.c}</span></div>
        <div className="field"><label htmlFor="e">Work email<span className="req">*</span></label><input className="input" id="e" type="email" autoComplete="email" required aria-describedby="e-e" aria-invalid={!!err.e} value={f.e} onChange={set("e")} onBlur={blur("e")} /><span className="err" id="e-e">{err.e}</span></div>
        <div className="field"><label htmlFor="t">Topic</label><select className="select" id="t" value={f.t} onChange={set("t")}><option value="general">General question</option><option value="audit">Supplier approval, audit or plant visit</option><option value="order">Existing order</option><option value="documents">Quality documents (certificates, declarations)</option></select></div>
        <div className="field"><label htmlFor="m">Message<span className="req">*</span></label><textarea className="textarea" id="m" required aria-describedby="m-e" aria-invalid={!!err.m} value={f.m} onChange={set("m")} onBlur={blur("m")}></textarea><span className="err" id="m-e">{err.m}</span></div>
        <label className="check"><input type="checkbox" id="cok" required aria-describedby="cok-e" aria-invalid={!!err.cok} checked={ok} onChange={(e) => { setOk(e.target.checked); if (e.target.checked) setErr({ ...err, cok: "" }); }} /><span>I agree that AirGrip may store these details to answer my message (<a className="link" href={P.privacy}>privacy policy</a>). <span className="req" style={{ color: "var(--brass-deep)" }}>*</span> <span className="err" id="cok-e">{err.cok}</span></span></label>
        {sendMsg && <p className="err sendmsg" id="csendmsg" role="alert">{sendMsg}</p>}
        <div><button className="btn" type="submit" disabled={busy}>{busy ? "Sending…" : "Send message"} <span className="arr" aria-hidden="true">→</span></button></div>
      </form>
      <div ref={doneRef} className="cdone" id="cdone" role="status" tabIndex={-1} hidden={!done}>
        <span className="eyebrow eyebrow--brass">Message sent</span>
        <h2 className="h3" style={{ margin: "var(--s-3) 0" }}>Thank you. We'll reply by email.</h2>
        <p className="muted">We work Saturday to Thursday, 09:30–18:30 IST. For a quote, the <a className="link" href={P.rfq}>quote form</a> is faster.</p>
      </div>
    </>
  );
}
