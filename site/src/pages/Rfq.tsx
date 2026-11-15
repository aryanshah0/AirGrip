// Page markup, first converted from design/rfq.html (frozen); edit here.

import "../styles/pages.css";
import "./css/Rfq.css";
import { RfqForm } from "../components/RfqForm";

export default function Rfq() {
  return (
    <>
      <main id="main">{" "}
      <section className="phead" style={{"paddingBottom": "var(--s-7)"}}>{" "}
      <div className="wrap">{" "}
      <ol className="crumbs" aria-label="Breadcrumb"><li><a href="/">Home</a></li><li aria-current="page">Request a quote</li></ol>{" "}
      <h1>Request a quote</h1>{" "}
      <p className="lead">Add drawings, catalogue part codes, or both. Fields marked * are required; everything else helps us quote faster.</p>{" "}
      </div>{" "}
      </section>{" "}
      <section className="band" style={{"paddingTop": "var(--s-7)"}}>{" "}
      <div className="wrap rfqp">{" "}<RfqForm />{" "}<aside>{" "}
      <div>{" "}
      <span className="eyebrow">What happens next</span>{" "}
      <ol className="steps">{" "}
      <li><span className="dash"></span>Our team reviews every drawing.</li>{" "}
      <li><span className="dash"></span><span>You get price, MOQ and lead time by email.</span></li>{" "}
      <li><span className="dash"></span><span>Samples typically in 2–3 weeks, with an inspection report.</span></li>{" "}
      </ol>{" "}
      </div>{" "}
      <dl className="kv">{" "}
      <dt>Formats</dt><dd>PDF, DWG, DXF, STEP, IGES; JPG or PNG photos of samples</dd>{" "}
      <dt>NDA</dt><dd>We sign your NDA before you send drawings</dd>{" "}
      <dt>Email</dt><dd><a className="link mono" href="mailto:sales@airgrip.in">sales@airgrip.in</a></dd>{" "}
      <dt>Phone / WhatsApp</dt><dd><a className="link mono" href="tel:+919316615007">+91 93166 15007</a>{" "}· <a className="link" href="https://wa.me/919316615007">WhatsApp</a></dd>{" "}
      <dt>Physical sample</dt><dd>Courier to Plot No. 3966 &amp; 3967, Road No. U, GIDC Phase-III, Dared, Jamnagar 361004, Gujarat, India. Mark the parcel with your company name and the reference shown after you send this form.</dd>{" "}
      </dl>{" "}
      <div className="person"><div><b>Shree Shah</b><span>Marketing Director · your contact for quotes</span></div></div>{" "}
      </aside>{" "}
      </div>{" "}
      </section>{" "}
      </main>
    </>
  );
}
