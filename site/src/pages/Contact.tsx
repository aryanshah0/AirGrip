
import "../styles/pages.css";
import "./css/Contact.css";
import { ContactForm } from "../components/ContactForm";
import { srcSet } from "../lib/img";

export default function Contact() {
  return (
    <>
      <main id="main">{" "}
      <section className="phead" style={{"paddingBottom": "var(--s-7)"}}>{" "}
      <div className="wrap">{" "}
      <ol className="crumbs" aria-label="Breadcrumb"><li><a href="/">Home</a></li><li aria-current="page">Contact</li></ol>{" "}
      <h1>Contact AirGrip</h1>{" "}
      <p className="lead">For quotes, the fastest route is the{" "}<a className="link" href="/rfq/">quote form</a>{" "}with your drawing attached. For anything else, call, message or write.</p>{" "}
      </div>{" "}
      </section>{" "}
      <section className="band" style={{"paddingTop": "var(--s-7)"}}>{" "}
      <div className="wrap ct">{" "}
      <div className="ct__l">{" "}
      <div className="channels">{" "}
      <div className="ch"><span className="k">Phone / WhatsApp</span><span className="v mono">+91 93166 15007</span><span className="acts2"><a className="btn btn--sm" href="tel:+919316615007">Call</a><a className="btn btn--ghost btn--sm" href="https://wa.me/919316615007">WhatsApp</a></span></div>{" "}
      <a href="mailto:sales@airgrip.in"><span className="k">Email</span><span className="v mono">sales@airgrip.in</span><span className="go">Write →</span></a>{" "}
      <div className="ch"><span className="k">Hours</span><span className="v" style={{"fontSize": "var(--t-18)"}}>Sat–Thu, 09:30–18:30 IST<br /><span className="muted small" style={{"fontWeight": "400"}}>Germany and Central Europe 05:00–14:00 CET · UK 04:00–13:00 GMT (one hour later in summer in both) · Friday closed</span></span><span></span></div>{" "}
      <div className="ch"><span className="k">Address</span><address className="v" style={{"fontStyle": "normal", "fontSize": "var(--t-18)", "lineHeight": "1.45"}}>AirGrip<br />Plot No. 3966 &amp; 3967, Road No. U<br />GIDC Phase-III, Dared<br />Jamnagar 361004, Gujarat, India</address><span></span></div>{" "}
      </div>{" "}
      <div className="ch" style={{"display": "grid", "gap": "var(--s-4)", "padding": "var(--s-4) 0", "borderBottom": "var(--hair)"}}><span className="k" style={{"fontSize": "var(--t-13)", "fontWeight": "600", "fontVariationSettings": "'wdth' 82", "letterSpacing": ".06em", "textTransform": "uppercase", "color": "var(--ink-3)"}}>Plant visits</span><span>Audits and visits welcome. Tell us your dates and we'll arrange the visit.</span></div>{" "}
      <div className="photo map"><img src="/img/airgrip-plant-jamnagar.webp" {...srcSet("airgrip-plant-jamnagar.webp")} alt="AirGrip plant, GIDC Phase-III, Dared, Jamnagar" loading="lazy" /></div>{" "}
      <p style={{"marginTop": "var(--s-3)"}}><a className="link small" href="https://www.google.com/maps?cid=1982484181116058778">Open in Google Maps</a></p>{" "}
      </div>{" "}
      <div className="ct__r">{" "}
      <div className="person" style={{"marginBottom": "var(--s-5)"}}><div><b>Shree Shah</b><span>Marketing Director · quotes, samples, export orders and supplier audits</span></div></div>{" "}<ContactForm />{" "}</div>{" "}
      </div>{" "}
      </section>{" "}
      </main>
    </>
  );
}
