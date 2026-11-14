// GA4 with Consent Mode v2. Nothing loads unless a measurement ID is configured AND the visitor accepts analytics.
// Consent is stored as localStorage 'ag-consent' = 'analytics' | 'essential' (set by the cookie banner).
import { CONFIG } from "../site";

type Gtag = (...args: unknown[]) => void;
declare global { interface Window { dataLayer?: unknown[]; gtag?: Gtag } }

export const CONSENT_KEY = "ag-consent";
export type Consent = "analytics" | "essential";

export function getConsent(): Consent | null {
  try { const v = localStorage.getItem(CONSENT_KEY); return v === "analytics" || v === "essential" ? v : null; } catch { return null; }
}

let loaded = false;
function gtag(...args: unknown[]) {
  window.dataLayer = window.dataLayer || [];
  // gtag.js expects the arguments object itself
  // eslint-disable-next-line prefer-rest-params
  window.dataLayer.push(arguments);
  void args;
}

/** Call once on page load and again whenever the visitor changes their choice. */
export function applyConsent(c: Consent | null) {
  if (!CONFIG.gaId || typeof window === "undefined") return;
  if (!window.gtag) {
    window.gtag = gtag as Gtag;
    gtag("consent", "default", { ad_storage: "denied", ad_user_data: "denied", ad_personalization: "denied", analytics_storage: "denied" });
  }
  if (c !== "analytics") {
    gtag("consent", "update", { analytics_storage: "denied" });
    // consent withdrawn: delete the _ga cookies Google Analytics set (on this host and the parent domain)
    document.cookie.split(";").map((x) => x.split("=")[0].trim()).filter((n) => /^_ga(_|$)/.test(n)).forEach((n) => {
      for (const d of ["", "; domain=" + location.hostname, "; domain=." + location.hostname.replace(/^www\./, "")])
        document.cookie = n + "=; expires=Thu, 01 Jan 1970 00:00:00 GMT; path=/" + d;
    });
    return;
  }
  gtag("consent", "update", { analytics_storage: "granted" });
  if (!loaded) {
    loaded = true;
    gtag("js", new Date());
    gtag("config", CONFIG.gaId, { anonymize_ip: true });
    const s = document.createElement("script");
    s.async = true;
    s.src = `https://www.googletagmanager.com/gtag/js?id=${encodeURIComponent(CONFIG.gaId)}`;
    document.head.appendChild(s);
  }
}

/** Conversion and interaction events (SEO-PLAN §3). Dropped silently without consent. */
export function track(name: string, params: Record<string, unknown> = {}) {
  if (typeof window === "undefined" || !CONFIG.gaId || getConsent() !== "analytics" || !window.gtag) return;
  window.gtag("event", name, params);
}

/** Clicks on phone, WhatsApp, email and PDF links are tracked from one listener. */
export function trackLinks() {
  document.addEventListener("click", (e) => {
    const a = (e.target as Element | null)?.closest?.("a");
    if (!a) return;
    const href = a.getAttribute("href") || "";
    if (href.startsWith("tel:")) track("tel_click");
    else if (href.startsWith("mailto:")) track("mailto_click");
    else if (href.includes("wa.me/")) track("whatsapp_click");
    else if (/\.pdf($|\?)/i.test(href)) track("pdf_download", { file_name: href.split("/").pop() });
  });
}
