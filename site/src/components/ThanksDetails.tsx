// Thank-you page details: reference, email and what was sent, from the summary the quote form left in sessionStorage.
import { useEffect, useState } from "react";
import { SITE } from "../site";
import { SENT_KEY, type SentSummary } from "../lib/forms";

const FIN: Record<string, string> = { N: "Natural", NI: "Nickel", SN: "Tin", ZN: "Zinc" };
const qty = (x: { qo: string; qy: string }) => [x.qo && x.qo + " / order", x.qy && x.qy + " / year"].filter(Boolean).join(", ");

export function ThanksDetails() {
  const [s, setS] = useState<SentSummary | null>(null);
  useEffect(() => {
    try { setS(JSON.parse(sessionStorage.getItem(SENT_KEY) || "null")); } catch { /* nothing to show */ }
  }, []);

  const rows = s ? [
    ...s.items.map((i, n) => <li key={"i" + n}><span className="mono">{i.check ? i.code : i.code + "-" + i.fin}</span>{i.check ? " (we will check this code)" : " · " + FIN[i.fin]}{qty(i) ? " · " + qty(i) : ""}</li>),
    ...s.files.map((d, n) => <li key={"f" + n}>{d.name}{qty(d) ? " · " + qty(d) : ""}</li>),
    ...(s.parts || []).map((x, n) => <li key={"p" + n}>{x.name}{qty(x) ? " · " + qty(x) : ""}</li>),
  ] : [];

  return (
    <dl className="kv" style={{ marginTop: "var(--s-6)", maxWidth: "560px" }}>
      <dt>Reference</dt><dd className={s?.ref ? "mono" : undefined} id="ref">{s?.ref || "In the copy we emailed you"}</dd>
      <dt>Copy sent to</dt><dd id="mail">{s?.email || "The work email you entered"}</dd>
      <dt>You sent</dt><dd id="sent">{!s ? "Your drawings and part codes" : rows.length ? <ul style={{ margin: 0, paddingLeft: "18px" }}>{rows}</ul> : s.quick ? "Your contact details" + (qty(s.quick) ? " · " + qty(s.quick) : "") + (s.nda ? " (drawings follow after the NDA)" : "")
        : "A note describing the part" + (s.nda ? " (drawings follow after the NDA)" : "")}</dd>
      <dt id="nda-t" hidden={!s?.nda}>NDA</dt><dd id="nda-d" hidden={!s?.nda}>Send us your NDA by email to {SITE.email}. We sign and return it; then reply to that email with your drawings.</dd>
      <dt>Sending a sample?</dt><dd>Courier it to Plot No. 3966 &amp; 3967, Road No. U, GIDC Phase-III, Dared, Jamnagar 361004, Gujarat, India. Mark the parcel with your company name and the reference above.</dd>
      <dt>Urgent?</dt><dd><a className="link mono" href={SITE.phoneHref}>{SITE.phone}</a> · <a className="link" href={SITE.whatsapp}>WhatsApp</a></dd>
    </dl>
  );
}
