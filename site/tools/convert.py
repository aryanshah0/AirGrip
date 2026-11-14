#!/usr/bin/env python3
"""Convert the locked design pages (../design/*.html) into React page components.

The design is the source of truth. This script turns each page's markup into TSX mechanically, so the
built site matches the design exactly. Interactive parts are swapped for React components:
  - "+ Add" buttons            -> <AddQ code label />
  - part codes next to them    -> <PartCode code />   (follows the stop-plug / lock-nut family switch)
  - family switches            -> <FamilySwitch id />  (page wrapped in <FamilyProvider id>)
  - thread-pair pickers        -> <PairPicker ... />
  - forms and live details     -> slot components written by hand in src/components/
Re-run after the design changes:  npm run convert
"""
import html
import json
import pathlib
import re

SITE = pathlib.Path(__file__).resolve().parent.parent
DESIGN = SITE.parent / "design"
PAGES = SITE / "src" / "pages"
SLOTS = SITE / "tools" / "slots"

# design file -> (route, component name)
ROUTES = {
    "home": ("/", "Home"),
    "products": ("/products/", "Products"),
    "category": ("/products/brass-turned-components/", "TurnedComponents"),
    "fittings": ("/products/brass-fittings/", "Fittings"),
    "forged": ("/products/brass-forged-components/", "Forged"),
    "inserts": ("/products/brass-moulding-inserts/", "Inserts"),
    "terminals": ("/products/brass-electrical-terminals/", "Terminals"),
    "fasteners": ("/products/special-fasteners/", "Fasteners"),
    "stamping": ("/products/metal-stamping-parts/", "Stamping"),
    "glands": ("/products/brass-cable-glands/", "Glands"),
    "product": ("/products/brass-cable-glands/pressure-screw/", "PressureScrew"),
    "clamping-jaw": ("/products/brass-cable-glands/clamping-jaw-cable-gland/", "ClampingJaw"),
    "favorit": ("/products/brass-cable-glands/strain-relief-cable-gland/", "StrainRelief"),
    "accessory": ("/products/brass-cable-glands/lock-nuts/", "LockNuts"),
    "thread-adapters": ("/products/brass-cable-glands/thread-adapters/", "ThreadAdapters"),
    "stop-plugs": ("/products/brass-cable-glands/stop-plugs/", "StopPlugs"),
    "earth-tags": ("/products/brass-cable-glands/earth-tags/", "EarthTags"),
    "conduit-parts": ("/products/brass-cable-glands/conduit-gland-parts/", "ConduitParts"),
    "capabilities": ("/capabilities/", "Capabilities"),
    "quality": ("/quality/", "Quality"),
    "industries": ("/industries/", "Industries"),
    "about": ("/about/", "About"),
    "exports": ("/exports/", "Exports"),
    "contact": ("/contact/", "Contact"),
    "rfq": ("/rfq/", "Rfq"),
    "rfq-thanks": ("/rfq/thank-you/", "RfqThanks"),
    "resources": ("/resources/", "Resources"),
    "resource": ("/resources/pg-thread-chart/", "PgChart"),
    "metric-chart": ("/resources/metric-cable-gland-thread-chart/", "MetricChart"),
    "bsp-chart": ("/resources/bsp-thread-chart/", "BspChart"),
    "npt-chart": ("/resources/npt-thread-chart/", "NptChart"),
    "grades": ("/resources/brass-grade-equivalents/", "Grades"),
    "privacy": ("/privacy-policy/", "Privacy"),
    "404": ("/404", "NotFound"),
}
NOINDEX = {"rfq-thanks", "404"}
FAMILY_PAGES = {"stop-plugs", "accessory"}

# elements replaced by hand-written components: (page, regex for the opening tag, component, also remove sibling id)
SLOT_RULES = [
    ("home", r'<form[^>]*aria-label="Quick quote request"[^>]*>', "QuickQuote"),
    ("rfq", r'<form id="rfqform"[^>]*>', "RfqForm"),
    ("contact", r'<form id="cform"[^>]*>', "ContactForm"),
    ("contact", r'<div class="cdone" id="cdone"[^>]*>', None),          # rendered inside ContactForm
    ("rfq-thanks", r'<dl class="kv"[^>]*>(?=\s*<dt>Reference)', "ThanksDetails"),
]


def route_of(href: str) -> str:
    """Map a design link (foo.html#x?y) to the site URL."""
    if re.match(r"^(https?:|mailto:|tel:|#|data:|javascript:)", href) or "${" in href:
        return href
    m = re.match(r"^([\w-]+)\.html(\?[^#]*)?(#.*)?$", href)
    if not m:
        if href.startswith("img/"):
            return "/" + href
        return href
    name, q, frag = m.group(1), m.group(2) or "", m.group(3) or ""
    if name not in ROUTES:
        raise SystemExit(f"unknown link target {href}")
    return ROUTES[name][0] + q + frag


ATTR_MAP = {
    "class": "className", "for": "htmlFor", "tabindex": "tabIndex", "colspan": "colSpan", "rowspan": "rowSpan",
    "srcset": "srcSet", "autocomplete": "autoComplete", "inputmode": "inputMode", "maxlength": "maxLength",
    "minlength": "minLength", "readonly": "readOnly", "crossorigin": "crossOrigin", "fetchpriority": "fetchPriority",
    "novalidate": "noValidate", "enctype": "encType", "datetime": "dateTime", "autofocus": "autoFocus",
    "spellcheck": "spellCheck", "referrerpolicy": "referrerPolicy", "enterkeyhint": "enterKeyHint",
    "xlink:href": "xlinkHref", "xml:space": "xmlSpace", "xmlns:xlink": "xmlnsXlink", "allowfullscreen": "allowFullScreen",
    "accesskey": "accessKey", "contenteditable": "contentEditable", "playsinline": "playsInline",
}
NUMERIC = {"tabIndex", "colSpan", "rowSpan", "rows", "cols", "maxLength", "minLength", "start", "size"}
VOID = {"area", "base", "br", "col", "embed", "hr", "img", "input", "link", "meta", "source", "track", "wbr"}
WS_DROP = {"table", "thead", "tbody", "tfoot", "tr", "colgroup", "select", "optgroup"}
DROP_ATTR = {"onsubmit", "onclick", "onchange", "oninput"}


def jsx_attr_name(n: str) -> str:
    if n in ATTR_MAP:
        return ATTR_MAP[n]
    if n.startswith(("data-", "aria-")):
        return n
    if "-" in n:
        a, *rest = n.split("-")
        return a + "".join(p[:1].upper() + p[1:] for p in rest)
    return n


def style_obj(s: str) -> str:
    out = []
    for decl in re.split(r";(?![^(]*\))", s):
        if ":" not in decl:
            continue
        k, v = decl.split(":", 1)
        k, v = k.strip(), html.unescape(v.strip())
        if not k:
            continue
        key = k if k.startswith("--") else re.sub(r"-([a-z])", lambda m: m.group(1).upper(), k.lower())
        if key.startswith("Webkit") or key.startswith("Moz"):
            pass
        out.append(f"{json.dumps(key)}: {json.dumps(v)}")
    return "{{" + ", ".join(out) + "}}"


ATTR_RE = re.compile(r'([^\s=/>]+)(?:\s*=\s*("([^"]*)"|\'([^\']*)\'|([^\s>]+)))?')


def parse_attrs(s: str):
    attrs = []
    for m in ATTR_RE.finditer(s):
        name = m.group(1)
        if m.group(2) is None:
            attrs.append((name, None))
        else:
            v = m.group(3) if m.group(3) is not None else m.group(4) if m.group(4) is not None else m.group(5)
            attrs.append((name, v))
    return attrs


def jsx_attrs(tag: str, attrs, ctx) -> str:
    parts = []
    for name, val in attrs:
        low = name if ":" in name or any(c.isupper() for c in name) else name.lower()
        if low in DROP_ATTR:
            continue
        if low == "selected" and tag == "option":
            continue  # handled through the select's defaultValue
        if low == "style":
            parts.append(f"style={style_obj(val or '')}")
            continue
        jn = jsx_attr_name(low)
        if low in ("href", "src", "action") and val is not None:
            val = route_of(val)
        if low == "srcset" and val:
            val = ", ".join(("/" + p.strip()) if p.strip().startswith("img/") else p.strip() for p in val.split(","))
        if low == "value" and tag in ("input", "textarea"):
            jn = "defaultValue"
        if low == "checked" and tag == "input":
            jn = "defaultChecked"
        if val is None:
            parts.append(jn)
        elif jn in NUMERIC and re.fullmatch(r"-?\d+", val):
            parts.append(f"{jn}={{{val}}}")
        else:
            parts.append(f'{jn}="{val}"')
    return (" " + " ".join(parts)) if parts else ""


def text_jsx(t: str, parent: str) -> str:
    if not t.strip():
        if parent in WS_DROP:
            return "\n" if "\n" in t else ""
        return '{" "}' + ("\n" if "\n" in t else "")
    lead = t[:1].isspace()
    trail = t[-1:].isspace()
    body = re.sub(r"\s+", " ", t.strip())
    body = body.replace("{", "\u0000").replace("}", "\u0001")
    body = body.replace("\u0000", '{"{"}').replace("\u0001", '{"}"}').replace(">", "&gt;")
    return ('{" "}' if lead else "") + body + ('{" "}' if trail else "")


TOKEN_RE = re.compile(r"<!--.*?-->|<(/?)([a-zA-Z][\w:.-]*)((?:\s+[^\s=>/]+(?:\s*=\s*(?:\"[^\"]*\"|'[^']*'|[^\s>]+))?)*)\s*(/?)>", re.S)


def to_jsx(src: str, ctx: dict) -> str:
    out, stack, pos = [], [], 0
    select_stack = []  # [index into out of the select's opening tag, default value]
    for m in TOKEN_RE.finditer(src):
        if m.start() > pos:
            parent = stack[-1] if stack else ""
            if parent == "textarea":
                pass
            else:
                out.append(text_jsx(src[pos:m.start()], parent))
        pos = m.end()
        tok = m.group(0)
        if tok.startswith("<!--"):
            continue
        closing, tag, attr_s, selfclose = m.group(1), m.group(2), m.group(3), m.group(4)
        tl = tag.lower() if tag.lower() in VOID or not any(c.isupper() for c in tag) else tag
        if closing:
            if stack and stack[-1] == tl:
                stack.pop()
            if tl == "select" and select_stack:
                i, dv = select_stack.pop()
                if dv is not None:
                    out[i] = out[i][:-1] + f' defaultValue="{dv}">'
            out.append(f"</{tag}>")
            continue
        attrs = parse_attrs(attr_s)
        if tl == "option" and select_stack:
            d = dict((k.lower(), v) for k, v in attrs)
            if "selected" in d:
                optval = d.get("value")
                if optval is None:
                    nxt = src[m.end():src.find("</option>", m.end())]
                    optval = html.unescape(nxt).strip()
                select_stack[-1][1] = optval
        a = jsx_attrs(tl, attrs, ctx)
        if tl in VOID or selfclose:
            out.append(f"<{tag}{a} />")
            continue
        out.append(f"<{tag}{a}>")
        stack.append(tl)
        if tl == "select":
            select_stack.append([len(out) - 1, None])
    if pos < len(src):
        out.append(text_jsx(src[pos:], stack[-1] if stack else ""))
    s = "".join(out)
    s = re.sub(r"\n{3,}", "\n\n", s)
    return s


def element_span(src: str, start: int):
    """Return (start, end) of the element whose opening tag starts at `start` (depth counting)."""
    m = re.match(r"<([a-zA-Z][\w-]*)", src[start:])
    tag = m.group(1)
    depth, i = 0, start
    pat = re.compile(rf"<(/?){tag}\b[^>]*>", re.S)
    for t in pat.finditer(src, start):
        depth += -1 if t.group(1) else 1
        if depth == 0:
            return start, t.end()
    raise SystemExit("unbalanced " + tag)


def label_cells(src: str) -> str:
    """Bake the mobile card labels (data-l) into stacked tables, as partials.js did at runtime."""
    def fix(tm):
        t = tm.group(0)
        head = re.search(r"<thead>(.*?)</thead>", t, re.S)
        if not head:
            return t
        labels = [re.sub(r"<[^>]+>", "", h).strip() for h in re.findall(r"<th[^>]*>(.*?)</th>", head.group(1), re.S)]
        labels = [html.unescape(x) for x in labels]

        def row(rm):
            cells, i = [], 0
            def cell(cm):
                nonlocal i
                lab = labels[i] if i < len(labels) else ""
                i += 1
                if not lab or "data-l=" in cm.group(0):
                    return cm.group(0)
                return cm.group(0)[:-1] + f' data-l="{html.escape(lab, quote=True)}">'
            return re.sub(r"<td\b[^>]*>", cell, rm.group(0))
        body_start = t.find("</thead>")
        return t[:body_start] + re.sub(r"<tr\b[^>]*>.*?</tr>", row, t[body_start:], flags=re.S)
    return re.sub(r'<table class="[^"]*\bstack-m\b[^"]*"[^>]*>.*?</table>', fix, src, flags=re.S)


def convert(name: str, threads_out: dict):
    path = DESIGN / f"{name}.html"
    src = path.read_text()
    route, comp = ROUTES[name]
    title = html.unescape(re.search(r"<title>(.*?)</title>", src, re.S).group(1).strip())
    dm = re.search(r'<meta name="description" content="([^"]*)"', src)
    desc = html.unescape(dm.group(1)) if dm else ""
    nav = (re.search(r'data-part="header" data-current="([^"]*)"', src) or [None, ""])[1]
    bm = re.search(r'<body class="([^"]*)"', src)
    body_class = bm.group(1) if bm else ""
    uses_pages_css = 'href="pages.css"' in src
    styles = "\n".join(re.findall(r"<style>(.*?)</style>", src.split("</head>")[0], re.S)).strip()
    styles = re.sub(r"url\((['\"]?)img/", r"url(\1/img/", styles)

    body = re.split(r'<div data-part="header"[^>]*></div>', src, maxsplit=1)[1]
    body = body.split('<div data-part="footer"></div>', 1)[0]
    body = re.sub(r"<script>.*?</script>", "", body, flags=re.S)
    body = re.sub(r"<script[^>]*src=[^>]*></script>", "", body)
    body = label_cells(body)

    imports = set()
    # slots
    for page, rx, slot in SLOT_RULES:
        if page != name:
            continue
        m = re.search(rx, body)
        if not m:
            raise SystemExit(f"slot not found {name} {rx}")
        a, b = element_span(body, m.start())
        SLOTS.mkdir(parents=True, exist_ok=True)
        (SLOTS / f"{name}-{slot or 'removed'}.jsx.txt").write_text(to_jsx(body[a:b], {}))
        body = body[:a] + (f"@@{slot}@@" if slot else "") + body[b:]
        if slot:
            imports.add(slot)

    # pair pickers
    def pair(m):
        a, b = element_span(body_ref[0], m.start())
        block = body_ref[0][a:b]
        code = re.search(r'data-code="([^"]+)"', block).group(1)
        what = re.search(r'data-what="([^"]+)"', block).group(1)
        sels = re.findall(r"<select[^>]*>(.*?)</select>", block, re.S)
        opts = re.findall(r'<option value="([^"]+)" data-od="([^"]+)" data-sys="([^"]+)"( selected)?>([^<]+)</option>', sels[0])
        threads_out["threads"] = [{"token": v, "od": float(od), "sys": sy, "label": html.unescape(lab)} for v, od, sy, _, lab in opts]
        e = next(o[0] for o in re.findall(r'<option value="([^"]+)"[^>]*?( selected)', sels[0]) if o[1])
        g = next(o[0] for o in re.findall(r'<option value="([^"]+)"[^>]*?( selected)', sels[1]) if o[1])
        return a, b, f'@@PairPicker code="{code}" what="{what}" entry="{e}" gland="{g}"@@'
    body_ref = [body]
    while True:
        m = re.search(r'<div class="pair"', body_ref[0])
        if not m:
            break
        a, b, rep = pair(m)
        body_ref[0] = body_ref[0][:a] + rep + body_ref[0][b:]
        imports.add("PairPicker")
    body = body_ref[0]

    # family switch
    if name in FAMILY_PAGES:
        m = re.search(r'<div class="seg" role="radiogroup"', body)
        a, b = element_span(body, m.start())
        body = body[:a] + f'@@FamilySwitch id="{name}"@@' + body[b:]
        imports.update({"FamilySwitch", "FamilyProvider"})

    # part code + add button pairs, then lone add buttons
    def codeadd(m):
        imports.update({"PartCode", "AddQ"})
        return f'@@PartCode code="{m.group(1)}"@@@@AddQ code="{m.group(3)}" label="{m.group(4)}"@@'
    body = re.sub(r'<span class="mono nw">(AG-[^<]+)</span>(\s*)<button class="addq" data-code="([^"]+)" data-label="([^"]+)">\+ Add</button>',
                  codeadd, body)

    def addq(m):
        imports.add("AddQ")
        return f'@@AddQ code="{m.group(1)}" label="{m.group(2)}"@@'
    body = re.sub(r'<button[^>]*class="addq"[^>]*data-code="([^"]+)" data-label="([^"]+)"[^>]*>\+ Add</button>', addq, body)
    if "addq" in body:
        raise SystemExit(f"unconverted add button in {name}")

    jsx = to_jsx(body.strip(), {})
    # placeholders -> components (placeholders survive to_jsx as text)
    jsx = re.sub(r"@@(\w+)((?: [\w-]+=\"[^\"]*\")*)@@", lambda m: f"<{m.group(1)}{m.group(2)} />", jsx)
    indent = "\n".join("      " + ln if ln.strip() else "" for ln in jsx.strip().splitlines())
    inner = f"    <>\n{indent}\n    </>"
    if name in FAMILY_PAGES:
        inner = f'    <FamilyProvider id="{name}">\n{indent}\n    </FamilyProvider>'

    lines = ["// Generated from design/" + f"{name}.html by tools/convert.py. Do not edit; change the design and re-run.\n"]
    if uses_pages_css:
        lines.append('import "../styles/pages.css";')
    if styles:
        css_dir = PAGES / "css"
        css_dir.mkdir(exist_ok=True)
        (css_dir / f"{comp}.css").write_text("/* Generated from design/" + f"{name}.html */\n" + styles + "\n")
        lines.append(f'import "./css/{comp}.css";')
    for imp in sorted(imports):
        mod = "Family" if imp in ("FamilySwitch", "FamilyProvider", "PartCode") else imp
        lines.append(f'import {{ {imp} }} from "../components/{mod}";')
    lines.append("")
    lines.append(f"export default function {comp}() {{\n  return (\n{inner}\n  );\n}}\n")
    (PAGES / f"{comp}.tsx").write_text("\n".join(lines))
    return {"name": name, "path": route, "component": comp, "title": title, "description": desc, "nav": nav,
            "bodyClass": body_class, "noindex": name in NOINDEX}


def main():
    PAGES.mkdir(parents=True, exist_ok=True)
    threads = {}
    meta = [convert(n, threads) for n in ROUTES]
    (SITE / "src" / "data").mkdir(exist_ok=True)
    (SITE / "src" / "data" / "threads.json").write_text(json.dumps(threads.get("threads", []), indent=1) + "\n")
    lines = ["// Generated by tools/convert.py. Route table: URL, page module and <head> data per page.",
             'import type { RouteDef } from "./lib/types";', "", "export const routes: RouteDef[] = ["]
    for r in meta:
        lines.append("  { " + ", ".join([
            f'name: {json.dumps(r["name"])}', f'path: {json.dumps(r["path"])}', f'title: {json.dumps(r["title"], ensure_ascii=False)}',
            f'description: {json.dumps(r["description"], ensure_ascii=False)}', f'nav: {json.dumps(r["nav"])}',
            f'bodyClass: {json.dumps(r["bodyClass"])}', f'noindex: {json.dumps(r["noindex"])}', f'file: "src/pages/{r["component"]}.tsx"',
            f'load: () => import("./pages/{r["component"]}")']) + " },")
    lines.append("];\n")
    (SITE / "src" / "routes.gen.ts").write_text("\n".join(lines))
    (SITE / "tools" / "routes-for-check.mjs").write_text("// Generated by tools/convert.py\nexport const routes = " + json.dumps([{"name": r["name"], "path": r["path"]} for r in meta], indent=1) + ";\n")
    print(f"converted {len(meta)} pages")


if __name__ == "__main__":
    main()
