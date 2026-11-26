// Home page quick quote. Required fields use the browser's own validation, as in
// the design. "Sign my NDA first" switches the upload off. Sends to the form endpoint, then opens the thank-you page.
import { useEffect, useRef, useState, type FormEvent } from "react";
import { P } from "../site";
import { SENT_KEY, SendError, batchProblem, fileProblem, newRef, onPageRestore, sendForm, type SentSummary } from "../lib/forms";
import { track } from "../lib/analytics";

export function QuickQuote() {
  const [files, setFiles] = useState<File[]>([]);
  const [nda, setNda] = useState(false);
  const [msg, setMsg] = useState("");
  const [busy, setBusy] = useState(false);
  const refId = useRef("");
  useEffect(() => onPageRestore(() => setBusy(false)), []);

  let okN = 0, okBytes = 0;
  const problems = files.map((f) => {
    const p = fileProblem(f) || batchProblem(okN, okBytes, f);
    if (!p) { okN++; okBytes += f.size; }
    return [f, p] as const;
  }).filter(([, p]) => p);

  async function submit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const fd = new FormData(e.currentTarget);
    const v = (k: string) => String(fd.get(k) || "").trim();
    if (!nda && problems.length) { setMsg(problems.map(([f, p]) => `${f.name}: ${p}`).join(" ")); return; }
    const ref = (refId.current ||= newRef()); // kept if the buyer retries after a failed send
    const send = nda ? [] : files;
    setBusy(true);
    setMsg("");
    try {
      await sendForm("rfq-quick", { ref, name: v("n"), company: v("c"), email: v("e"), country: v("co"), phone: v("ph"), qty_order: v("qo"), qty_year: v("qy"), nda, consent: true }, send);
      const sent: SentSummary = { ref, items: [], files: send.map((f) => ({ name: f.name, qo: v("qo"), qy: v("qy") })), parts: [], nda, email: v("e"), quick: { qo: v("qo"), qy: v("qy") } };
      try { sessionStorage.setItem(SENT_KEY, JSON.stringify(sent)); } catch { /* thank-you page shows the generic text */ }
      await track("rfq_submit", { form: "home", files: send.length, nda });
      location.href = import.meta.env.BASE_URL + P.thanks.slice(1);
    } catch (x) {
      track("form_send_failed", { form: "home", reason: x instanceof SendError ? x.message.slice(0, 90) : "network" });
      setMsg(x instanceof SendError ? x.message : "Could not send. Please email sales@airgrip.in.");
      setBusy(false);
    }
  }

  return (
    <form aria-label="Quick quote request" onSubmit={submit}>
      <div className="field"><label htmlFor="n">Name<span className="req">*</span></label><input className="input" id="n" name="n" autoComplete="name" required /></div>
      <div className="field"><label htmlFor="c">Company<span className="req">*</span></label><input className="input" id="c" name="c" autoComplete="organization" required /></div>
      <div className="field full"><label htmlFor="e">Work email<span className="req">*</span></label><input className="input" id="e" name="e" type="email" autoComplete="email" required /></div>
      <div className="field"><label htmlFor="ph">Phone / WhatsApp</label><input className="input" id="ph" name="ph" type="tel" autoComplete="tel" /></div>
      <div className="field"><label htmlFor="co">Country<span className="req">*</span></label><input className="input" id="co" name="co" autoComplete="country-name" required /></div>
      <div className="field full"><span className="lbl" id="dl">Drawing</span>
        <label className="drop" aria-labelledby="dl" style={nda ? { opacity: 0.45 } : undefined}><input type="file" multiple accept=".pdf,.dwg,.dxf,.step,.stp,.igs,.iges,.jpg,.jpeg,.png" disabled={nda}
          onChange={(e) => { setFiles([...(e.target.files || [])]); setMsg(""); }} /><b>{files.length && !nda ? files.map((f) => f.name).join(", ") : "Choose files or drop them here"}</b><span className="hint">PDF · DWG · DXF · STEP · IGES · JPG · PNG · max&nbsp;20&nbsp;MB&nbsp;each</span></label>
      </div>
      <div className="field"><label htmlFor="qo">Qty per order</label><input className="input" id="qo" name="qo" inputMode="numeric" placeholder="e.g. 5,000" /></div>
      <div className="field"><label htmlFor="qy">Qty per year</label><input className="input" id="qy" name="qy" inputMode="numeric" placeholder="e.g. 60,000" /></div>
      <label className="check full"><input type="checkbox" id="hnda" checked={nda} onChange={(e) => setNda(e.target.checked)} /><span>Sign my NDA before I share drawings</span></label>
      <label className="check full"><input type="checkbox" required /><span>I agree that AirGrip may store these details to answer this request (<a className="link" href={P.privacy}>privacy policy</a>).<span className="req">*</span></span></label>
      {msg && <p className="err full" role="alert" style={{ margin: 0 }}>{msg}</p>}
      <div className="full end"><a className="link small" href={P.rfq}>Full form: material, finish, part codes, quantities per drawing</a><button className="btn btn--brass" disabled={busy}>{busy ? "Sending…" : "Send request"} <span className="arr" aria-hidden="true">→</span></button></div>
    </form>
  );
}
