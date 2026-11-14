// Generated from design/rfq-thanks.html by tools/convert.py. Do not edit; change the design and re-run.

import "../styles/pages.css";
import { ThanksDetails } from "../components/ThanksDetails";

export default function RfqThanks() {
  return (
    <>
      <main>{" "}
      <section className="band">{" "}
      <div className="wrap side">{" "}
      <div className="sh"><span className="eyebrow eyebrow--brass">Request received</span></div>{" "}
      <div className="sb">{" "}
      <h1 style={{"maxWidth": "20ch"}}>Thank you. We'll reply within two working days.</h1>{" "}
      <p className="lead" style={{"marginTop": "var(--s-4)"}}>Your request has gone to Shree Shah and our team. You'll get price, MOQ and lead time by email, or questions if anything on the drawing needs clarifying. We work Saturday to Thursday (IST).</p>{" "}<ThanksDetails />{" "}<div className="prod__cta" style={{"marginTop": "var(--s-7)"}}><a className="btn btn--ghost" href="/rfq/">Send another drawing</a><a className="btn btn--ghost" href="/">Back to home</a></div>{" "}
      </div>{" "}
      </div>{" "}
      </section>{" "}
      </main>
    </>
  );
}
