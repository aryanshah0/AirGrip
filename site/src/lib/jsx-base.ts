// JSX runtime for the dev copy on GitHub Pages only (vite.config.ts uses it when AG_BASE is set; the production
// build uses React's runtime). The site lives in a sub-folder there, so root-relative URLs in href, src, srcSet,
// action and poster get the folder in front: "/products/" → "/AirGrip/products/". Other strings are untouched.
import * as runtime from "react/jsx-runtime";
import * as devRuntime from "react/jsx-dev-runtime";

const BASE = import.meta.env.BASE_URL; // "/AirGrip/"

export const withBase = (u: string) => (u.startsWith("/") && !u.startsWith("//") ? BASE + u.slice(1) : u);
const KEYS = ["href", "src", "action", "poster"];

function fix(props: Record<string, unknown> | null) {
  if (!props) return props;
  let out = props;
  for (const k of KEYS) {
    const v = props[k];
    if (typeof v === "string" && v !== withBase(v)) out = { ...out, [k]: withBase(v) };
  }
  const s = props.srcSet;
  if (typeof s === "string") out = { ...out, srcSet: s.split(",").map((p) => p.trim().replace(/^\S+/, withBase)).join(", ") };
  return out;
}

type Jsx = (type: unknown, props: Record<string, unknown>, ...rest: unknown[]) => unknown;
const wrap = (f: Jsx): Jsx => (type, props, ...rest) => f(type, fix(props) as Record<string, unknown>, ...rest);

export const Fragment = runtime.Fragment;
export const jsx = wrap(runtime.jsx as unknown as Jsx);
export const jsxs = wrap(runtime.jsxs as unknown as Jsx);
export const jsxDEV = wrap(devRuntime.jsxDEV as unknown as Jsx);
