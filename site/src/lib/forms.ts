// Sending the quote and contact forms. The receiving end is pluggable (CONFIG.formEndpoint): a PHP script on the
// host or a form service. Every request is multipart/form-data with a "form" field naming the form, the visible
// fields, and drawings as "files[]".
import { CONFIG } from "../site";

export const MAX_FILE_MB = 20;
export const DRAWING_TYPES = ["pdf", "dwg", "dxf", "step", "stp", "igs", "iges", "jpg", "jpeg", "png"];
export const EMAIL_RE = /^[^@\s]+@[^@\s]+\.[^@\s]+$/;

/** Per-file check: returns a message for the row, or "" when the file can be sent. */
export function fileProblem(f: File, types = DRAWING_TYPES): string {
  const ext = (f.name.split(".").pop() || "").toLowerCase();
  if (!types.includes(ext)) return `Not sent: .${ext || "?"} files are not accepted. Use ${types.filter((t) => !["stp", "igs", "jpeg"].includes(t)).map((t) => t.toUpperCase()).join(", ")}.`;
  if (f.size > MAX_FILE_MB * 1048576) return `Not sent: ${(f.size / 1048576).toFixed(1)} MB is over the ${MAX_FILE_MB} MB limit. Email large files to sales@airgrip.in.`;
  return "";
}

export class SendError extends Error {}

export async function sendForm(form: string, fields: Record<string, string | boolean | undefined>, files: File[] = []): Promise<void> {
  if (!CONFIG.formEndpoint) throw new SendError("The form is not connected yet. Please email sales@airgrip.in.");
  const fd = new FormData();
  fd.append("form", form);
  fd.append("page", location.pathname);
  Object.entries(fields).forEach(([k, v]) => { if (v !== undefined && v !== "" && v !== false) fd.append(k, v === true ? "yes" : String(v)); });
  files.forEach((f) => fd.append("files[]", f, f.name));
  let res: Response;
  try {
    res = await fetch(CONFIG.formEndpoint, { method: "POST", body: fd, headers: { Accept: "application/json" } });
  } catch {
    throw new SendError("Could not send: check your connection and try again, or email sales@airgrip.in.");
  }
  if (!res.ok) throw new SendError("Could not send just now. Please try again, or email sales@airgrip.in.");
}

/** Summary handed to the thank-you page (sessionStorage, this tab only). */
export interface SentSummary {
  items: { code: string; fin: string; qo: string; qy: string; check: boolean }[];
  files: { name: string; qo: string; qy: string }[];
  parts: { name: string; qo: string; qy: string }[];
  nda: boolean;
  email: string;
  ref: string;
  /** home quick quote: its quantities, shown when no drawing was attached */
  quick?: { qo: string; qy: string };
}
export const SENT_KEY = "ag-rfq-sent";
// RFQ-26-K7M3QX: 6 characters without look-alikes (no 0/O, 1/I/L), about 10^9 values a year, so no two buyers share one.
const REF_CHARS = "23456789ABCDEFGHJKMNPQRSTUVWXYZ";
export const newRef = () => "RFQ-" + new Date().getFullYear().toString().slice(2) + "-" +
  [...crypto.getRandomValues(new Uint8Array(6))].map((n) => REF_CHARS[n % REF_CHARS.length]).join("");
/** After a successful send the page navigates away; Back can restore it from the browser cache still "Sending…". */
export function onPageRestore(fn: () => void) {
  const h = (e: PageTransitionEvent) => { if (e.persisted) fn(); };
  addEventListener("pageshow", h);
  return () => removeEventListener("pageshow", h);
}
