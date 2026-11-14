// Cookie banner: essential storage always on; Google Analytics only after opt-in (Consent Mode v2).
// Opens on first visit (not on the thank-you page) and from any [data-cookie-settings] link, e.g. the footer.
import { useEffect, useRef, useState } from "react";
import { P } from "../site";
import { CONSENT_KEY, applyConsent, getConsent, type Consent } from "../lib/analytics";

export function ConsentBanner({ autoOpen }: { autoOpen: boolean }) {
  const [open, setOpen] = useState(false);
  const [analytics, setAnalytics] = useState(false);
  const box = useRef<HTMLElement>(null);

  const show = () => { setAnalytics(getConsent() === "analytics"); setOpen(true); };
  const choose = (v: Consent) => {
    try { localStorage.setItem(CONSENT_KEY, v); } catch { /* blocked storage: choice lasts for this page */ }
    applyConsent(v);
    document.dispatchEvent(new CustomEvent("agconsent", { detail: v }));
    setOpen(false);
  };

  useEffect(() => {
    applyConsent(getConsent());
    if (autoOpen && !getConsent()) show();
    const click = (e: MouseEvent) => {
      const l = (e.target as Element | null)?.closest?.("[data-cookie-settings]");
      if (l) { e.preventDefault(); show(); }
    };
    document.addEventListener("click", click);
    return () => document.removeEventListener("click", click);
  }, [autoOpen]);

  useEffect(() => {
    document.body.classList.toggle("has-consent", open);
    if (open) box.current?.focus();
  }, [open]);

  return (
    <section ref={box} className="consent" tabIndex={-1} aria-label="Cookie settings" hidden={!open}>
      <h2>Cookies on this site</h2>
      <p>We use essential storage to run the site and keep your quote list. With your consent we also use Google Analytics to see which pages buyers use. <a className="link" href={P.privacy + "#cookies"}>Privacy policy</a></p>
      <div className="opts"><label><input type="checkbox" checked disabled readOnly /> Essential: always on</label>
        <label><input type="checkbox" checked={analytics} onChange={(e) => setAnalytics(e.target.checked)} /> Analytics (Google Analytics 4)</label></div>
      <div className="acts"><button type="button" className="btn btn--sm" onClick={() => choose("essential")}>Essential only</button><button type="button" className="btn btn--sm" onClick={() => choose("analytics")}>Accept analytics</button><button type="button" className="btn btn--sm btn--ghost" onClick={() => choose(analytics ? "analytics" : "essential")}>Save choice</button></div>
    </section>
  );
}
