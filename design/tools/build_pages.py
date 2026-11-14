#!/usr/bin/env python3
"""Generate the product-group, gland, accessory and technical-chart pages from one content source.

Yardstick (docs/CONTENT-REVIEW-2.md): each page shows what its buyer needs, in the right amount. The old site is a
source of facts only; items not consistent with confirmed processes are held back as owner questions (section 10).
Nothing unconfirmed is shown on a page; pending items live in docs/. Run from the design folder:
    python3 tools/build_pages.py
In the React build, the content dicts below become the data files for the same templates.
"""
import html, os
OUT = os.path.join(os.path.dirname(__file__), "..")
E = html.escape

def head(title, desc, current="products", extra_css=""):
    return f'''<!doctype html>
<html lang="en-IN">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>{title}</title>
<meta name="description" content="{E(desc)}">
<link rel="preconnect" href="https://fonts.googleapis.com"><link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Archivo:wdth,wght@75..125,400..700&family=IBM+Plex+Mono:wght@400;500&display=swap">
<link rel="stylesheet" href="tokens.css"><link rel="stylesheet" href="pages.css">
<style>
  .gal .photo, .rel .photo {{ background: #fff; }}
  .types2 {{ display: grid; grid-template-columns: repeat(2, minmax(0,1fr)); gap: 0 var(--s-6); border-top: 1px solid var(--ink-line); padding: 0; margin: 0; }}
  .types2 li {{ list-style: none; padding: 11px 0; border-bottom: var(--hair); font-size: var(--t-15); }}
  @media (max-width: 559px) {{ .types2 {{ grid-template-columns: 1fr; }} }}
  .chead {{ display: grid; grid-template-columns: repeat(12, minmax(0,1fr)); column-gap: var(--gutter); row-gap: var(--s-6); align-items: start; margin-top: var(--s-5); }}
  .chead > :first-child {{ grid-column: 1 / span 7; }} .chead > :nth-child(2) {{ grid-column: 9 / span 4; }}
  .chead h1 {{ margin: 0 0 var(--s-4); }} .chead .lead {{ margin-bottom: var(--s-6); }}
  .sheet1 {{ margin-top: var(--s-6); background: var(--card); border: 1px solid var(--ink-line); padding: 10px; }}
  .sheet1 > div {{ border: var(--hair); }} .sheet1 img {{ width: 100%; height: auto; }}
  @media (max-width: 959px) {{ .chead > * {{ grid-column: 1 / -1 !important; }} }}
  figure.one {{ margin: 0; max-width: 420px; }} figure.one .photo {{ aspect-ratio: 4/3; border: var(--hair); background: #fff; }}
  figure.one img {{ width: 100%; height: 100%; object-fit: cover; }} figure.one figcaption {{ margin-top: var(--s-2); font-size: var(--t-14); }}
  #sizes .sb .tbl {{ max-width: 560px; }}
  .gal--3 {{ grid-template-columns: repeat(3, minmax(0,1fr)); }}
  @media (max-width: 959px) {{ .gal--3 {{ grid-template-columns: 1fr 1fr; }} }}
  @media (max-width: 559px) {{ .gal--one {{ grid-template-columns: minmax(0, 1fr); }} }}
  .part + .part {{ margin-top: var(--s-9); padding-top: var(--s-8); border-top: var(--hair-strong); }}
  .part__head {{ display: grid; grid-template-columns: 200px minmax(0,1fr); gap: var(--s-6); align-items: start; margin-bottom: var(--s-6); }}
  .part__head .photo {{ border: var(--hair); background: #fff; aspect-ratio: 4/3; }}
  .part__head .photo img {{ width: 100%; height: 100%; object-fit: contain; }}
  @media (max-width: 559px) {{ .part__head {{ grid-template-columns: 1fr; }} .part__head .photo {{ max-width: 200px; }} }}
{extra_css}</style>
</head>
<body>
<div data-part="header" data-current="{current}"></div>
<main>
'''

TABS_JS = '''<script>
  document.querySelectorAll('[role=tablist]').forEach(list => {
    const tabs = [...list.querySelectorAll('[role=tab]')];
    function sel(t, f) { tabs.forEach(x => { const on = x === t; x.setAttribute('aria-selected', on); x.tabIndex = on ? 0 : -1; document.getElementById(x.getAttribute('aria-controls')).hidden = !on; }); if (f) t.focus(); dispatchEvent(new Event('resize')); }
    tabs.forEach((t, i) => { t.addEventListener('click', () => sel(t)); t.addEventListener('keydown', e => { if (e.key === 'ArrowRight' || e.key === 'ArrowLeft') sel(tabs[(i + (e.key === 'ArrowRight' ? 1 : tabs.length - 1)) % tabs.length], true); }); });
  });
</script>
'''

def foot(js=""):
    return f'''</main>
<div data-part="footer"></div>
<script src="partials.js"></script>
{js}</body>
</html>
'''

def crumbs(items):
    li = "".join(f'<li><a href="{h}">{E(t)}</a></li>' for t, h in items[:-1])
    return f'<ol class="crumbs" aria-label="Breadcrumb"><li><a href="home.html">Home</a></li>{li}<li aria-current="page">{E(items[-1][0])}</li></ol>'

def kv(rows):
    return '<dl class="kv">' + "".join(f"<dt>{k}</dt><dd>{v}</dd>" for k, v in rows) + "</dl>"

def pic(name, alt=""):
    return (f'<picture><source media="(max-width: 559px)" srcset="img/la/t/{name}.svg">'
            f'<img src="img/la/{name}.svg" alt="{E(alt)}" loading="lazy"></picture>')

def related(items):
    cards = "".join(f'<a href="{h}"><div class="photo">{pic(img)}</div><b>{n}</b><span>{s}</span></a>' for h, img, n, s in items)
    return f'<div class="rel">{cards}</div>'

def faq(items):
    return '<div class="faq">' + "".join(
        f'<details{" open" if i == 0 else ""}><summary>{E(q)}</summary><div>{a}</div></details>' for i, (q, a) in enumerate(items)) + "</div>"

def alternate(secs):
    secs = [x for x in secs if x]
    return "\n".join(f'<section class="band{" band--sheet" if i % 2 == 0 else ""}">{x}</section>' for i, x in enumerate(secs))

FIN = "Natural, or plated in our plant: nickel, tin or zinc"
SHARED_TERMS = '<p class="tbl-note">Lead times, MOQ, NDA and delivery terms: <a class="link" href="exports.html">Ordering &amp; shipping</a>.</p>'
TOL = '<span class="mono">±0.05 mm</span>'
DOCS = 'EN 10204 3.1 mill certificate, certificate of conformity and final inspection report with every batch; PPAP Level 3 on request · <a class="link" href="quality.html">Quality</a>'
VOL = "From a few thousand pieces to millions a year"
PLATED = "Natural, or plated in our plant: nickel, tin or zinc; silver or chrome on request"
PLATED2 = "Natural, or plated in our plant: nickel or tin; silver or chrome on request"

# =====================================================================================
# 1. PRODUCT GROUPS (made to drawing): the same rows on every page, as on Brass turned components
# =====================================================================================
GROUPS = [
 dict(file="fittings.html", types_h2="Fittings we make", faq_h2="Buying brass fittings from AirGrip", cta=("Send a fitting drawing or sample", "Include the thread standard, material (DZR or lead-free if needed) and any pressure-test requirement."), key="Brass fittings", img="adaptor",
  title="Custom Brass Fittings Manufacturer, BSP &amp; NPT | AirGrip, Jamnagar",
  desc="Custom brass fittings made to drawing in Jamnagar: pipe, hose-barb, compression, pneumatic, hydraulic and automotive fittings. Forged or turned, BSP and NPT threads, plated in our plant.",
  h1="Brass fittings",
  lead="Fittings made to your drawing or sample: hot-forged or turned from bar, then drilled and threaded.",
  facts=[("Process", "Hot-forged and machined, or turned from bar"),
         ("Size range", 'Bar <span class="mono">Ø5–100 mm</span> · forged bodies <span class="mono">25&nbsp;g&nbsp;–&nbsp;1.0&nbsp;kg</span>'),
         ("Tolerance", TOL),
         ("Threads", '<span class="mono">BSP (ISO 228-1) · BSPT · NPT · M · UNC/UNF</span>'),
         ("Material", '<span class="mono">CW617N</span> (forging), <span class="mono">CW614N</span>; DZR and lead-free on request'),
         ("Finish", PLATED),
         ("Documents", DOCS), ("Volumes", VOL)],
  types=["Pipe fittings: adaptors, nipples, couplings, tees, elbows", "Hose-barb fittings", "Compression fittings",
         "Pneumatic and airline fittings", "Hydraulic fittings", "Automotive fittings"],
  photos=[("Brass-Fittings.webp", "Brass fittings")],
  spec_title="How fittings are made",
  spec=[("Forged, then machined", "Bodies with side branches (tees, elbows, crosses) are hot-forged near net shape, then drilled and threaded: less material and fewer operations than bar."),
        ("Turned from bar", "Straight connectors, adaptors, nipples and hose barbs are turned on CNC lathes or cam automats.")],
  faq=[("Can you make fittings for drinking water?", "Yes, in dezincification-resistant (DZR) or lead-free brass on request. Approvals such as WRAS, DVGW or NSF/ANSI 61 belong to your finished product; tell us which your drawing calls up."),
       ("Which threads can you cut?", 'BSP parallel and taper, NPT, metric and UNC/UNF; parallel threads gauged GO / NO-GO. See the <a class="link" href="bsp-chart.html">BSP</a> and <a class="link" href="npt-chart.html">NPT</a> charts.')],
  related=[("forged.html", "tee", "Forged brass components", "25 g – 1.0 kg"), ("category.html", "turned", "Brass turned components", "Ø5–100 mm"),
           ("bsp-chart.html", "prof-bsp", "BSP thread chart", "ISO 228-1"), ("npt-chart.html", "prof-npt", "NPT thread chart", "ASME B1.20.1")]),

 dict(file="forged.html", types_h2="Forged parts we make", faq_h2="Buying forgings from AirGrip", cta=("Send the drawing of your forged part", "Include the annual volume: it decides whether a forging die pays off."), key="Forged brass components", img="tee",
  title="Brass Forging Manufacturer India: Forged &amp; Machined Brass Components | AirGrip",
  desc="Hot-forged brass components 25 g – 1.0 kg, machined to drawing in Jamnagar: valve and fitting bodies, tees, manifolds and forged automotive parts. Shot-blasted, natural or bright, or plated in our plant.",
  h1="Forged brass components",
  lead="Hot-forged brass blanks from 25 g to 1.0 kg, CNC-machined to your drawing. Forging first saves material and machining time on parts with branches, flanges or large heads.",
  facts=[("Process", "Hot forging, then CNC turning, drilling and threading"),
         ("Weight range", '<span class="mono">25&nbsp;g&nbsp;–&nbsp;1.0&nbsp;kg</span>'),
         ("Tolerance", f"{TOL} on machined features"),
         ("Threads", '<span class="mono">M · BSP/BSPT · NPT · UNC/UNF</span>'),
         ("Material", '<span class="mono">CW617N</span> (CuZn40Pb2, forging brass); DZR on request'),
         ("Finish", "Shot-blasted, natural or bright; or plated in our plant: nickel, tin or zinc; silver or chrome on request"),
         ("Documents", DOCS), ("Volumes", VOL)],
  types=["Valve and fitting bodies", "Tees, elbows and manifolds", "Forged automotive components", "Flanged and branched bodies, machined to drawing"],
  photos=[],
  spec_title="When to forge",
  spec=[("Forge", "Parts with a large flange, side branches or a big head compared with the body: forging puts material only where it is needed."),
        ("Turn from bar", 'Parts of mostly one diameter: <a class="link" href="category.html">brass turned components</a>.')],
  faq=[("Is a forged part cheaper than one machined from bar?", "Forging adds a die but cuts material and machining time, so for branched or flanged parts in volume it is usually cheaper. If both routes make sense, the quote shows both.")],
  related=[("fittings.html", "adaptor", "Brass fittings", "BSP · NPT"), ("category.html", "turned", "Brass turned components", "Ø5–100 mm"),
           ("capabilities.html", "spindle", "Capabilities", "Processes &amp; machines"), ("grades.html", "bush", "Brass grade equivalents", "CW617N · CZ122")]),

 dict(file="inserts.html", types_h2="Insert types", faq_h2="Choosing an insert", cta=("Send your insert drawing or a sample", "Include the thread, knurl type and the plastic it is moulded into."), key="Moulding inserts", img="insert",
  title="Brass Moulding Inserts Manufacturer: Knurled &amp; Threaded Inserts | AirGrip",
  desc="Brass inserts for plastic moulding: round knurled, hexagonal and square, diamond, straight or unidirectional knurl, deep groove for pull-out resistance, Ø5–38 mm. For moulded parts, PE/PP pipe and electrofusion couplings.",
  h1="Brass moulding inserts",
  lead="Threaded brass inserts for moulding into plastic parts, made to your drawing: knurled for torque, grooved for pull-out resistance and held to close tolerance so plastic can't flash into the thread.",
  facts=[("Shapes", "Round knurled · hexagonal · square"),
         ("Knurl", "Diamond · straight · unidirectional"),
         ("Diameter", '<span class="mono">Ø5–38 mm</span>'),
         ("Tolerance", TOL),
         ("Threads", '<span class="mono">M · UNC/UNF · BA · BSW</span>, gauged GO / NO-GO'),
         ("Material", 'Free-cutting brass <span class="mono">CW614N</span> (IS 319 Type I)'),
         ("Finish", PLATED2),
         ("Documents", DOCS), ("Volumes", VOL)],
  types=["Mould-in threaded inserts", "Press-in inserts", "Flanged inserts", "Insulator inserts", "Inserts for electrofusion couplings", "Inserts for PE and PP pipe fittings"],
  photos=[("Injection-moulding-inserts.webp", "Brass moulding inserts")],
  spec_title="Design features",
  spec=[("Pull-out resistance", "A deep groove between knurls locks the insert into the plastic."),
        ("No flash", "The bore after the thread is held to close tolerance so molten plastic can't enter the thread."),
        ("Used in", "Moulded plastic parts, PE and PP pipe, electrofusion couplings, instrumentation, electrical and automotive parts.")],
  faq=[("Which knurl should I choose?", "Diamond knurl for combined torque and pull-out resistance, straight knurl where torque matters most, unidirectional for specific press-in designs. Send the drawing and we'll advise."),
       ("Can you match an existing insert?", "Yes. Send a sample or drawing; we match thread, knurl and dimensions.")],
  related=[("terminals.html", "terminal", "Electrical terminals &amp; connectors", "From M2"), ("category.html", "turned", "Brass turned components", "Ø5–100 mm"),
           ("fasteners.html", "fastener", "Special brass fasteners", "Studs, nuts, anchors"), ("grades.html", "bush", "Brass grade equivalents", "CW614N · IS 319")]),

 dict(file="terminals.html", types_h2="Terminal parts we make", faq_h2="Buying terminals from AirGrip", cta=("Send your terminal drawing", "Include the current rating, plating and the mating cable or busbar."), key="Electrical terminals &amp; connectors", img="terminal",
  title="Brass Terminal Blocks, Connectors, Earth Blocks &amp; Neutral Links | AirGrip",
  desc="Brass terminal blocks and connectors, earth blocks and neutral links made to drawing for MCB, RCD, circuit-breaker and switchgear makers. From M2; natural or plated in our plant: nickel or tin; silver or chrome on request.",
  h1="Brass electrical terminals &amp; connectors",
  lead="Terminal blocks, connectors, earth blocks and neutral links for wiring and panel boards, made to your drawing for switchgear, MCB and RCD makers.",
  facts=[("Process", "Cut from extruded brass profile, then milled, drilled and tapped"),
         ("Size range", 'From <span class="mono">M2</span> thread; current rating to your drawing'),
         ("Tolerance", TOL),
         ("Threads", '<span class="mono">M · UNC/UNF · BA · BSW</span>'),
         ("Material", 'Brass <span class="mono">CW614N</span> (IS 319 Type I)'),
         ("Finish", PLATED2),
         ("Documents", DOCS), ("Volumes", VOL)],
  types=["Terminal blocks", "Terminal connectors", "Earth blocks", "Neutral links", "Switchgear components", "MCB and RCD terminals"],
  photos=[],
  spec_title="Where they are used",
  spec=[("Equipment", "Wiring and panel boards; miniature circuit breakers (MCB), residual-current devices (RCD), circuit breakers and switchgear.")],
  faq=[("Can you size a terminal to a current rating?", "Tell us the rating and the mating cable or busbar; we work to your drawing or propose one for your approval.")],
  related=[("inserts.html", "insert", "Moulding inserts", "Knurled, threaded"), ("earth-tags.html", "earthtag", "Earth tags", "For cable glands"),
           ("glands.html", "gland", "Brass cable glands", "PG · metric"), ("category.html", "turned", "Brass turned components", "Ø5–100 mm")]),

 dict(file="fasteners.html", types_h2="Fasteners we make", faq_h2="Buying special fasteners from AirGrip", cta=("Send your fastener drawing or sample", "Include the thread, plating and, for kits, the parts per kit."), key="Special fasteners", img="fastener",
  title="Special Brass Fasteners: Screws, Bolts, Battery Terminal Fasteners, Studs | AirGrip",
  desc="Special brass fasteners made to drawing: battery-terminal fasteners and kits, machine screws, hex bolts, anchors, studs, nuts and washers. Metric, UNC/UNF, BA and BSW threads.",
  h1="Special brass fasteners",
  lead="Fasteners that standard catalogues don't cover, made to your drawing: battery-terminal fasteners, screws and bolts, anchors, studs, nuts and washers.",
  facts=[("Process", "Turned and threaded in-house; washers stamped"),
         ("Size range", 'Within the turning range <span class="mono">Ø5–100 mm</span>'),
         ("Tolerance", TOL),
         ("Threads", '<span class="mono">M · UNC/UNF · BA · BSW</span> · special threads to drawing'),
         ("Heads", "Countersunk, pan, cheese, round, hex, square; slotted or other drives to drawing"),
         ("Material", 'Brass <span class="mono">CW614N</span>; others on request'),
         ("Finish", PLATED), ("Documents", DOCS), ("Volumes", VOL)],
  types=["Automotive battery-terminal fasteners and kits", "Machine screws", "Hex bolts", "Brass anchors", "Studs", "Nuts", "Washers"],
  photos=[("Automotive-Battery-Fasteners.webp", "Automotive battery fasteners"), ("Brass-Anchore.webp", "Brass anchors"),
          ("Nut-Fasteners.webp", "Nuts")],
  spec_title="", spec=[],
  faq=[("Do you make battery-terminal kits?", "Yes: battery-terminal fasteners in brass, to your drawing, packed as kits if required."),
       ("Do you make standard screws and bolts?", "Yes, in brass, to your drawing or sample, with the head and drive you need. For off-the-shelf sizes a catalogue supplier is usually cheaper.")],
  related=[("category.html", "turned", "Brass turned components", "Ø5–100 mm"), ("inserts.html", "insert", "Moulding inserts", "Knurled, threaded"),
           ("terminals.html", "terminal", "Electrical terminals &amp; connectors", "From M2"), ("stamping.html", "earthtag", "Metal stamping parts", "Washers, tags")]),

 dict(file="stamping.html", types_h2="Stampings we make", faq_h2="Buying stampings from AirGrip", cta=("Send your stamping drawing", "Include the material, strip thickness and plating."), key="Metal stamping parts", img="earthtag",
  title="Brass, Copper &amp; Steel Stamping Parts: Electrical Stampings | AirGrip",
  desc="Brass, copper and steel sheet-metal stampings to drawing: electrical stampings, earth tags, fuse and switch parts, crimp pins and washers, pressed and plated in our plant.",
  h1="Brass, copper and steel stampings",
  lead="Parts pressed from brass, copper and steel strip to your drawing or sample: electrical stampings, earth tags, fuse and switch parts, crimp pins and washers.",
  facts=[("Process", "Pressed in our plant"),
         ("Thickness", "To your drawing"),
         ("Tolerance", f'{TOL} on punched features'),
         ("Material", "Brass · copper · steel"),
         ("Finish", PLATED2),
         ("Documents", DOCS), ("Volumes", VOL)],
  types=["Electrical stamping parts", "Earth tags", "Fuse parts", "Switch parts", "Female crimp pins", "Washers"],
  photos=[],
  spec_title="", spec=[],
  faq=[("Can you combine stamping with turning?", 'Yes: stamped parts can be assembled with turned or threaded parts as a sub-assembly. Earth tags for cable glands: <a class="link" href="earth-tags.html">earth tags</a>.')],
  related=[("earth-tags.html", "earthtag", "Earth tags", "For cable glands"), ("terminals.html", "terminal", "Electrical terminals &amp; connectors", "From M2"),
           ("fasteners.html", "fastener", "Special fasteners", "Washers, nuts"), ("capabilities.html", "spindle", "Capabilities", "Processes &amp; machines")]),
]

def group_page(d):
    photos = ""; side_photo = ""
    if len(d["photos"]) == 1:
        f, c = d["photos"][0]
        side_photo = f'<figure class="one" style="margin-top:var(--s-6)"><div class="photo"><img src="img/{f}" alt="{E(c)}" loading="lazy"></div><figcaption>{E(c)}</figcaption></figure>'
    elif d["photos"]:
        n = len(d["photos"]); gcls = "gal gal--one" if n == 1 else ("gal gal--3" if n == 3 else "gal")
        note = d.get("photo_note", "Current photos; replaced after the photo shoot.")
        if n == 1:
            f, c = d["photos"][0]
            photos = (f'<div class="wrap side"><div class="sh"><h2 class="sub">Example</h2></div>'
                      f'<div class="sb"><figure class="one"><div class="photo"><img src="img/{f}" alt="{E(c)}" loading="lazy"></div><figcaption>{E(c)}</figcaption></figure></div></div>')
        else:
          photos = ('<div class="wrap"><div class="open"><div><h2 class="sub">Examples</h2></div>'
                  '</div>'
                  f'<div class="{gcls}">' +
                  "".join(f'<figure><div class="photo"><img src="img/{f}" alt="{E(c)}" loading="lazy"></div><figcaption>{E(c)}</figcaption></figure>' for f, c in d["photos"]) +
                  '</div></div>')
    spec = f'<div class="wrap side"><div class="sh"><h2>{d["spec_title"]}</h2></div><div class="sb">{kv(d["spec"])}</div></div>' if d["spec"] else ""
    note = ""
    types = (f'<div class="wrap side"><div class="sh"><h2>{d["types_h2"]}</h2><p>Made to your drawing or sample.</p>{side_photo}</div>'
             f'<div class="sb"><ul class="types2">{"".join(f"<li>{E(t)}</li>" for t in d["types"])}</ul>{note}</div></div>')
    faqs = f'<div class="wrap side"><div class="sh"><h2>{d["faq_h2"]}</h2></div><div class="sb">{faq(d["faq"])}{SHARED_TERMS}</div></div>'
    rel = (f'<div class="wrap"><div class="open"><div><h2 class="sub">Related</h2></div></div>{related(d["related"])}'
           f'<div class="cta" style="margin-top:var(--s-8)"><div><h2>{d["cta"][0]}</h2><p>{d["cta"][1]}</p></div>'
           '<div class="acts"><a class="btn" href="rfq.html">Request a quote <span class="arr" aria-hidden="true">→</span></a></div></div></div>')
    body = f'''<section class="band--tight" style="padding-top:var(--s-6)">
  <div class="wrap">
    {crumbs([("Products", "products.html"), (html.unescape(d["key"]), "")])}
    <div class="chead">
      <div>
        <h1>{d["h1"]}</h1>
        <p class="lead">{d["lead"]}</p>
        <div class="prod__cta"><a class="btn" href="rfq.html">Send a drawing <span class="arr" aria-hidden="true">→</span></a></div>
        <div class="sheet1"><div><img src="img/la/l/{d["img"]}.svg" alt="Drawing of a typical part"></div></div>
      </div>
      {kv(d["facts"])}
    </div>
  </div>
</section>
{alternate([types, spec, photos, faqs, rel])}
'''
    open(os.path.join(OUT, d["file"]), "w").write(head(d["title"], d["desc"]) + body + foot())

# =====================================================================================
# 2. GLANDS (same depth as the pressure-screw datasheet; rod sizes held back there too)
# =====================================================================================
JAC = ""
PGC = {"PG 7": "PG07", "PG 9": "PG09", "PG 11": "PG11", "PG 13.5": "PG13", "PG 16": "PG16", "PG 21": "PG21", "PG 29": "PG29", "PG 36": "PG36", "PG 42": "PG42", "PG 48": "PG48"}
SIZES_NOTE = ""

def gland_page(file, code, name, lead, use, cols, rows_pg, rows_m, note_pg, note_m, photo, shot, fig_note, key, art="gland"):
    th = "".join(f'<th class="n">{c}</th>' for c in cols)
    def tr(r):
        size = r[0]; tok = PGC.get(size, size.replace("×1.5", ""))
        if not any(r[1:]):
            cells = "".join('<td class="n ondata">—</td>' for _ in r[1:])
        else:
            cells = "".join(f'<td class="n">{v if v else "—"}</td>' for v in r[1:])
        return (f'<tr><td class="stick"><span class="mono">{code}-{tok}</span><button class="addq" data-code="{code}-{tok}" '
                f'data-label="{name} {size}">+ Add</button></td><td class="n">{size}</td>{cells}</tr>')
    body = f'''<section class="band--tight" style="padding-top:var(--s-6)">
  <div class="wrap">
    {crumbs([("Products", "products.html"), ("Brass cable glands", "glands.html"), (name, "")])}
    <div class="prod" style="margin-top:var(--s-5)">
      <figure class="prod__fig" style="margin:0">
        <div class="sheet"><div class="frame"><img src="img/la/l/{art}.svg" alt="{E(name)}: half-section and end view" style="width:100%;height:auto"></div></div>
        <p class="tbl-note">{fig_note}</p>
        <div class="prod__thumbs"><div class="photo"><img src="img/{photo}" alt="{E(name)}, photo"></div></div>
      </figure>
      <div class="prod__info">
        {JAC}
        <span class="eyebrow">Brass cable glands · <span class="mono" style="letter-spacing:0">{code}</span></span>
        <h1>{name.replace("cable gland", "brass cable gland")}</h1>
        <p class="lead">{lead}</p>
        {kv([("Entry thread", "PG to DIN 40430, metric to EN 60423"),
             ("Material", 'Brass CuZn39Pb3 (<span class="mono">CW614N</span>); lead-free on request'),
             ("Finish", FIN),
             ("Seal", "EPDM"),
             ("Ingress", "IP54"),
             ("Spare parts", "Dome cap nuts and seal inserts on request"),
             ("Part code", f'<span class="mono">{code}-[size]-[finish]</span>, e.g. <span class="mono">{code}-PG09-NI</span>')])}
        <div class="prod__cta"><a class="btn" href="#sizes">Choose sizes <span class="arr" aria-hidden="true">↓</span></a></div>
      </div>
    </div>
  </div>
</section>
<section class="band" id="sizes"><div class="wrap">
  <div class="open"><div><h2>Sizes and part codes</h2></div><p>All values in mm. Add sizes to your quote and send them in one request.</p></div>
  <div class="dims"><details class="dimkey" open><summary>Dimension key</summary><figure><div class="frame"><img src="img/la/{art}-key.svg" alt="Dimension key" style="width:100%;height:auto"></div><figcaption>{key}</figcaption></figure></details><div>
  <div class="seg" role="tablist" aria-label="Thread system"><button role="tab" id="t-pg" aria-selected="true" aria-controls="p-pg">PG · DIN 40430</button><button role="tab" id="t-m" aria-selected="false" aria-controls="p-m" tabindex="-1">Metric</button></div>
  <div role="tabpanel" id="p-pg" aria-labelledby="t-pg">{note_pg}<div class="tbl"><table class="spec"><thead><tr><th class="stick">Part code</th><th class="n">Thread</th>{th}</tr></thead><tbody>{"".join(tr(r) for r in rows_pg)}</tbody></table></div></div>
  <div role="tabpanel" id="p-m" aria-labelledby="t-m" hidden>{note_m}<div class="tbl"><table class="spec"><thead><tr><th class="stick">Part code</th><th class="n">Thread</th>{th}</tr></thead><tbody>{"".join(tr(r) for r in rows_m)}</tbody></table></div></div>
  <p class="tbl-note">Dimensions for reference; the drawing supplied with your quote governs. — = dimensions with your quote · cable clamping ranges with your quote · finish suffix <span class="mono">-N · -NI · -SN · -ZN</span> · thread data: <a class="link" href="resource.html">PG chart</a>, <a class="link" href="metric-chart.html">metric chart</a>.</p>{SIZES_NOTE}
  </div></div>
</div></section>
<section class="band band--sheet"><div class="wrap side"><div class="sh"><h2>Material &amp; compliance</h2></div><div class="sb">{kv([
  ("Used in", use),
  ("RoHS", "Leaded brass is covered by Annex III exemption 6(c)"),
  ("REACH", "Statement on request"),
  ("Hazardous areas", "Not certified for hazardous (Ex / ATEX) areas"),
  ("Material data", '<a class="link" href="grades.html">Brass grade equivalents</a>')])}</div></div></section>
<section class="band"><div class="wrap"><div class="open"><div><h2 class="sub">Used with</h2></div></div>{related([("accessory.html","locknut","Lock nuts","Standard and EMC"),("thread-adapters.html","reducer","Reducers, enlargers &amp; adapters","Change the entry thread"),("earth-tags.html","earthtag","Earth tags","PG and metric"),("stop-plugs.html","stopplug","Stop plugs","Close unused entries")])}</div></section>
'''
    open(os.path.join(OUT, file), "w").write(head(f"{name.replace('cable gland', 'Brass Cable Gland')}, PG &amp; Metric | AirGrip", f"{name}: brass cable gland in PG and metric threads, CW614N brass, natural or plated in our plant. Sizes and part codes.") + body + foot(TABS_JS))

RN = '<p class="rnote">{}</p>'
gland_page("clamping-jaw.html", "AG-CJ", "Clamping-jaw cable gland",
  "A cable gland with clamping jaws that grip the cable for traction relief.",
  "Distribution boxes and control cabinets, moving machine parts, automation and plant engineering, where the cable must be held against pull-out.",
  ["L", "GL", "D"],
  [("PG 7","15.0","5.5","8.0"),("PG 9","16.0","6.0","10.5"),("PG 11","17.5","6.0","12.0"),("PG 13.5","19.0","7.5","14.5"),("PG 16","19.0","7.5","17.5"),
   ("PG 21","","",""),("PG 29","","",""),("PG 36","26.0","9.0","36.0"),("PG 42","28.0","10.0","46.0"),("PG 48","28.0","10.0","52.0")],
  [(m,"","","") for m in ["M12×1.5","M16×1.5","M20×1.5","M25×1.5","M32×1.5","M40×1.5","M50×1.5","M63×1.5","M80"]],
  "",
  "",
  "01-Cable-Gland-With-Clamping-Jaw.webp", "A2", "Clamping-jaw gland in half-section, with end view.",
  '<span class="mono">L</span> overall length · <span class="mono">GL</span> thread length · <span class="mono">D</span> cable passage · <span class="mono">T</span> entry thread', art="gland-cj")
gland_page("favorit.html", "AG-SR", "Strain-relief cable gland",
  "A cable gland with bending protection, giving strain and traction relief for flexible cables.",
  "Flexible cables on moving machine parts, automation and control cabinets, where the cable needs bending protection at the entry.",
  ["L", "GL", "D1", "D2"],
  [("PG 7","","","",""),("PG 9","21.5","6.0","12.5","10.0"),("PG 11","22.5","6.0","15.0","11.6"),("PG 13.5","24.0","6.5","17.0","13.6"),("PG 16","24.0","6.5","18.5","15.6"),
   ("PG 21","25.0","7.5","23.5","21.0"),("PG 29","30.5","8.0","32.0","30.0"),("PG 36","32.0","9.0","37.0","35.0"),("PG 42","","","",""),("PG 48","","","","")],
  [("M12×1.5","","","",""),("M16×1.5","","","",""),("M20×1.5","","","",""),("M25×1.5","","","",""),("M32×1.5","","","",""),
   ("M40×1.5","","","",""),("M50×1.5","","","",""),("M63×1.5","","","",""),("M80","","","","")],
  "",
  "",
  "strain-relief-cable-gland.webp", "A4", "Strain-relief gland in half-section, with end view.",
  '<span class="mono">L</span> overall length · <span class="mono">GL</span> thread length · <span class="mono">D1, D2</span> cable passage · <span class="mono">T</span> entry thread', art="gland-sr")

# =====================================================================================
# 3. ACCESSORIES: lock nuts (accessory.html, hand-made) + stop plugs, earth tags, thread adapters, conduit gland parts
# =====================================================================================
PG = [("PG 7","PG07"),("PG 9","PG09"),("PG 11","PG11"),("PG 13.5","PG13"),("PG 16","PG16"),("PG 21","PG21"),("PG 29","PG29"),("PG 36","PG36"),("PG 42","PG42"),("PG 48","PG48")]
MM = [(f"M{x}×1.5", f"M{x}") for x in [12,16,20,25,32,40,50,63]] + [("M80", "M80")]   # M80 pitch to confirm (Ketan)
G = [("G 3/8","G38"),("G 1/2","G12"),("G 3/4","G34"),("G 1","G1"),("G 1¼","G114"),("G 1½","G112")]
N = [("3/8 NPT","N38"),("1/2 NPT","N12"),("3/4 NPT","N34"),("1 NPT","N1"),("1¼ NPT","N114"),("1½ NPT","N112")]
PAIR_CSS = """  .pair { display: flex; flex-wrap: wrap; gap: var(--s-4); align-items: flex-end; margin-top: var(--s-4); }
  .pair .addq { min-height: 48px; margin: 0; padding: 0 var(--s-5); }
  .pair label { display: grid; gap: 4px; font-size: var(--t-13); font-weight: 600; }
  .pair select { min-width: 150px; }
  .pair__code { font-size: var(--t-13); color: var(--ink-3); line-height: 48px; }
  .parts2 { display: grid; grid-template-columns: repeat(2, minmax(0,1fr)); gap: var(--s-8) var(--gutter); }
  .parts2 .part + .part { margin-top: 0; padding-top: 0; border-top: 0; }
  .parts2 .part__head { grid-template-columns: 140px minmax(0,1fr); }
  @media (min-width: 960px) { .parts2 .part__head { min-height: 168px; } }
  .parts2 .tbl { max-width: none !important; }
  @media (max-width: 959px) { .parts2 { grid-template-columns: 1fr; } .parts2 .part + .part { margin-top: var(--s-8); padding-top: var(--s-7); border-top: var(--hair-strong); } }
"""
MAT = 'Brass CuZn39Pb3 (<span class="mono">CW614N</span>); lead-free on request'

def size_tabs(prefix, code, label, systems, col="Thread"):
    tabs = "".join(f'<button role="tab" id="{prefix}t{i}" aria-selected="{str(i==0).lower()}" aria-controls="{prefix}p{i}"{"" if i==0 else " tabindex=\"-1\""}>{s}</button>' for i, (s, _) in enumerate(systems))
    panels = ""
    for i, (s, items) in enumerate(systems):
        rows = "".join(f'<tr><td class="stick"><span class="mono">{code}-{t}</span><button class="addq" data-code="{code}-{t}" data-label="{label} {disp}">+ Add</button></td><td class="n">{disp}</td></tr>' for disp, t in items)
        panels += f'<div role="tabpanel" id="{prefix}p{i}" aria-labelledby="{prefix}t{i}"{" hidden" if i else ""}><div class="tbl"><table class="spec"><thead><tr><th class="stick">Part code</th><th class="n">{col}</th></tr></thead><tbody>{rows}</tbody></table></div></div>'
    return f'<div class="seg" role="tablist" aria-label="Thread system">{tabs}</div>{panels}'

def acc_shell(file, title, desc, name, code, img, photo, lead, facts, main, related_items, js="", h1=None, shot="A6"):
    body = f'''<section class="band--tight" style="padding-top:var(--s-6)"><div class="wrap">
  {crumbs([("Products", "products.html"), ("Brass cable glands", "glands.html"), (name, "")])}
  <div class="prod" style="margin-top:var(--s-5)">
    <figure class="prod__fig" style="margin:0"><div class="sheet"><div class="frame"><img src="img/la/l/{img}.svg" alt="{E(name)} drawing" style="width:100%;height:auto"></div></div>
      <p class="tbl-note">Illustrative drawing, not to size.</p>
      {(f'<div class="prod__thumbs"><div class="photo"><img src="img/{photo}" alt="{E(name)}, photo"></div></div>') if photo else ""}</figure>
    <div class="prod__info"><span class="eyebrow">Gland accessories · <span class="mono" style="letter-spacing:0">{code}</span></span><h1>{h1 or E(name)}</h1><p class="lead">{lead}</p>{kv(facts)}
      <div class="prod__cta"><a class="btn" href="#sizes">Choose sizes <span class="arr" aria-hidden="true">↓</span></a></div></div>
  </div></div></section>
{main}
<section class="band band--sheet"><div class="wrap"><div class="open"><div><h2 class="sub">Used with</h2></div></div>{related(related_items)}</div></section>
'''
    open(os.path.join(OUT, file), "w").write(head(title, desc, extra_css=PAIR_CSS) + body + foot(TABS_JS + js))

REL_ALL = [("glands.html","gland","Brass cable glands","PG · metric"),("accessory.html","locknut","Lock nuts","Standard and EMC"),
           ("earth-tags.html","earthtag","Earth tags","PG and metric"),("thread-adapters.html","reducer","Reducers, enlargers &amp; adapters","Change the entry thread"),
           ("stop-plugs.html","stopplug","Stop plugs","Close unused entries")]
def rel_except(f): return [x for x in REL_ALL if x[0] != f][:4]

def simple_acc(file, title, desc, name, code, img, photo, lead, systems, extra_facts=(), h1=None, shot="A6", mat=None, rohs=True, col="Thread", tlabel="Threads", heads=None):
    rng = '<span class="mono">PG 7–48 · M12–M80</span>' + (' · <span class="mono">BSP and NPT 3/8–1½"</span>' if any(s == "BSP" for s, _ in systems) else "")
    facts = [(tlabel, rng), ("Material", mat or MAT), ("Finish", FIN), *extra_facts,
             ("Part code", f'<span class="mono">{code}-[size]-[finish]</span>')]
    main = (f'<section class="band" id="sizes"><div class="wrap side"><div class="sh"><h2>Sizes and part codes</h2><p>Add sizes to your quote; finish is chosen in the quote form.</p></div><div class="sb">'
            + (('<div class="seg-row"><span class="seg-k">Head</span><div class="seg" role="radiogroup" aria-label="Head">' + "".join(f'<button type="button" role="radio" aria-checked="{str(i==0).lower()}" data-fam="{fam}">{lab}</button>' for i, (lab, fam) in enumerate(heads)) + '</div></div>') if heads else "") +
            f'{size_tabs("s", code, name[:-1], systems, col)}<p class="tbl-note">Dimensions with your quote.</p>{SIZES_NOTE}</div></div></section>')
    js = ""
    if heads:
        facts[-1] = ("Part code", " · ".join(f'<span class="mono">{fam}-[size]-[finish]</span> {lab.lower()}' for lab, fam in heads))
        js = """<script>
  document.addEventListener('click', e => { const b = e.target.closest('[data-fam]'); if (!b) return;
    document.querySelectorAll('[data-fam]').forEach(x => x.setAttribute('aria-checked', x === b));
    document.querySelectorAll('#sizes .addq').forEach(q => { q.dataset.code = q.dataset.code.replace(/^AG-S[PH]-/, b.dataset.fam + '-'); q.dataset.label = q.dataset.label.replace(/^(Hex-head )?Stop plug/, b.dataset.fam === 'AG-SH' ? 'Hex-head stop plug' : 'Stop plug');
      const m = q.parentElement.querySelector('.mono'); if (m) m.textContent = q.dataset.code;
      const on = window.AGBasket && AGBasket.has(q.dataset.code); q.textContent = on ? '✓ Added' : '+ Add'; q.setAttribute('aria-pressed', !!on); }); });
</script>
"""
    acc_shell(file, title, desc, name, code, img, photo, lead, facts, main, rel_except(file), h1=h1, shot=shot, js=js)

simple_acc("stop-plugs.html", "Brass Stop Plugs for Cable Glands: PG, Metric, BSP &amp; NPT | AirGrip",
  "Brass stop (blanking) plugs to close unused cable entries in enclosures, PG, metric, BSP and NPT, natural or plated in our plant.",
  "Stop plugs", "AG-SP", "stopplug", "04-Stop-Plug-01.webp",
  "Stop plugs (blanking plugs) close unused cable entries in enclosures, temporarily or permanently.",
  [("PG", PG), ("Metric", MM), ("BSP", G), ("NPT", N)],
  [("Head", "Slotted dome or hex head")], h1="Brass stop plugs for cable glands", shot="A7", heads=[("Slotted dome", "AG-SP"), ("Hex head", "AG-SH")])
simple_acc("earth-tags.html", "Brass Earth Tags for Cable Glands: PG &amp; Metric | AirGrip",
  "Brass earth tags for cable glands, PG and metric sizes, natural or plated in our plant.",
  "Earth tags", "AG-ET", "earthtag", "12-Earthing-Tag.webp",
  'Stamped from brass strip and sized to the gland thread: PG 7–48 and M12–M80.',
  [("PG", PG), ("Metric", MM)], [("Process", 'Stamped from brass strip · <a class="link" href="stamping.html">metal stamping</a>')], h1="Brass earth tags for cable glands", shot="A9",
  mat="Brass strip", rohs=False, col="For gland thread", tlabel="For gland thread")

def part(pid, title, photo, text):
    return (f'<div class="part" id="{pid}"><div class="part__head"><div class="photo"><img src="img/{photo}" alt="Brass {E(title).lower()}" loading="lazy"></div>'
            f'<div><h2 class="h3" style="margin:0 0 var(--s-3)">{title}</h2><p>{text}</p></div></div>')
THREADS = [d for d, _ in PG] + [d for d, _ in MM] + [d for d, _ in G] + [d for d, _ in N]
# outside Ø (mm) per thread: DIN 40430, EN 60423 nominal, ISO 228-1 major Ø, ASME B1.20.1 pipe OD
OD = dict(zip([d for d, _ in PG], [12.5, 15.2, 18.6, 20.4, 22.5, 28.3, 37.0, 47.0, 54.0, 59.3]))
OD.update({d: float(t[1:]) for d, t in MM})
OD.update(dict(zip([d for d, _ in G], [16.662, 20.955, 26.441, 33.249, 41.910, 47.803])))
OD.update(dict(zip([d for d, _ in N], [17.145, 21.336, 26.670, 33.401, 42.164, 48.260])))
SYS = {d: k for k, lst in (("PG", PG), ("M", MM), ("G", G), ("N", N)) for d, _ in lst}
TOK = dict(PG + MM + G + N)
def addline(code, what, de, dg):
    opt = lambda sel: "".join(f'<option value="{TOK[t]}" data-od="{OD[t]}" data-sys="{SYS[t]}"{" selected" if t == sel else ""}>{t}</option>' for t in THREADS)
    return (f'<div class="pair" data-code="{code}" data-what="{what}">'
            f'<label>Enclosure entry<select class="input" data-e>{opt(de)}</select></label>'
            f'<label>Gland thread<select class="input" data-g>{opt(dg)}</select></label>'
            f'<button type="button" class="btn btn--sm btn--ghost addq" data-code="{code}" data-label="{what}">+ Add</button>'
            f'<span class="mono pair__code" data-c></span></div>'
            f'<p class="tbl-note">Code: <span class="mono">{code}-[entry][gland]-[finish]</span>, one quote line per pair. Finish is chosen in the quote form. Dimensions with your quote.</p></div>')
PAIR_JS = """<script>
  document.querySelectorAll('.pair').forEach(p => {
    const e = p.querySelector('[data-e]'), g = p.querySelector('[data-g]'), b = p.querySelector('.addq'), c = p.querySelector('[data-c]');
    const lbl = s => s.options[s.selectedIndex].text;
    const kind = p.dataset.code.slice(-2);   // RD reducer (entry larger), EN enlarger (entry smaller), AD adapter (other thread system)
    function ok(o) { const a = e.options[e.selectedIndex]; const d = +o.dataset.od - +a.dataset.od;
      return kind === 'RD' ? d < 0 : kind === 'EN' ? d > 0 : o.dataset.sys !== a.dataset.sys; }
    function filter() { [...g.options].forEach(o => { o.disabled = o.hidden = !ok(o); }); if (g.options[g.selectedIndex].disabled) { const f = [...g.options].find(o => !o.disabled); if (f) g.value = f.value; } }
    function upd() { const code = p.dataset.code + '-' + e.value + g.value; b.dataset.code = code; b.dataset.label = p.dataset.what + ' ' + lbl(e) + ' to ' + lbl(g); c.textContent = code;
      const on = window.AGBasket && AGBasket.has(code); b.textContent = on ? '✓ Added' : '+ Add'; b.setAttribute('aria-pressed', !!on); b.setAttribute('aria-label', (on ? 'Remove ' : 'Add ') + b.dataset.label + (on ? ' from quote' : ' to quote')); }
    e.addEventListener('change', () => { filter(); upd(); }); g.addEventListener('change', upd); document.addEventListener('basket', upd); filter(); upd();
  });
</script>
"""
ta_main = ('<section class="band" id="sizes"><div class="wrap">'
  '<div class="open"><div><h2>Three ways to change an entry thread</h2></div><p>Each part joins two threads: the enclosure entry and the gland. Pick both; the part code records the pair.</p></div>'
  + part("reducers", "Reducers", "05-Reducer.webp", "Step a larger enclosure entry down to a smaller gland thread, without re-machining the enclosure.") + addline("AG-RD", "Reducer", "PG 21", "PG 16")
  + part("enlargers", "Enlargers", "07-Enlarger-01.webp", "Take a smaller enclosure entry up to a larger gland thread.") + addline("AG-EN", "Enlarger", "PG 16", "PG 21")
  + part("adapters", "Adapters", "06-Adapter.webp", "Convert an entry from one thread system to another, e.g. PG to metric, or NPT to metric.") + addline("AG-AD", "Adapter", "PG 16", "M20×1.5")
  + '<p class="tbl-note" style="margin-top:var(--s-8)">Any conversion within the accessory range on request.</p>'
  '<p class="tbl-note">Thread data: <a class="link" href="resource.html">PG</a> · <a class="link" href="metric-chart.html">metric</a> · <a class="link" href="bsp-chart.html">BSP</a> · <a class="link" href="npt-chart.html">NPT</a> charts.</p>'
  '</div></section>')
acc_shell("thread-adapters.html", "Brass Cable Gland Reducers, Enlargers &amp; Adapters: PG, Metric, BSP, NPT | AirGrip",
  "Brass reducers, enlargers and thread adapters for cable gland entries: PG to metric, NPT to metric and size changes, natural or plated in our plant.",
  "Reducers, enlargers & adapters", "AG-RD · AG-EN · AG-AD", "reducer", None,
  "Change the size or thread system of an enclosure entry, so a gland fits without re-machining the enclosure.",
  [("Threads", '<span class="mono">PG 7–48 · M12–M80</span> · <span class="mono">BSP and NPT 3/8–1½"</span>; pairs on request'), ("Material", MAT), ("Finish", FIN)],
  ta_main, rel_except("thread-adapters.html"), js=PAIR_JS, h1="Brass reducers, enlargers &amp; adapters", shot="A6")

cp_main = ('<section class="band" id="sizes"><div class="wrap">'
  '<div class="open"><div><h2>Sizes and part codes</h2></div><p>Add sizes to your quote; finish is chosen in the quote form.</p></div><div class="parts2">'
  + part("male-bush", "Male bushes", "09-Brass-Male-Bush.webp", 'Protect the cable from sharp edges where it enters trunking, panels, machines or housings, indoors or outdoors. For unarmoured cable.')
  + size_tabs("b", "AG-MB", "Male bush", [("PG", PG), ("Metric", MM)]) + '</div>'
  + part("conduit-nut", "Conduit gland nuts", "11-Conduit-Gland-Nut-01.webp", 'Brass nuts for conduit glands, PG 7–48 and M12–M80.')
  + size_tabs("c", "AG-CN", "Conduit gland nut", [("PG", PG), ("Metric", MM)]) + '</div></div>'
  + f'<p class="tbl-note" style="margin-top:var(--s-6)">Dimensions with your quote.</p>{SIZES_NOTE}'
  '</div></section>')
acc_shell("conduit-parts.html", "Brass Conduit Gland Parts: Male Bushes &amp; Conduit Nuts | AirGrip",
  "Brass male bushes and conduit gland nuts, PG and metric, natural or plated in our plant.",
  "Conduit gland parts", "AG-MB · AG-CN", "malebush", "09-Brass-Male-Bush.webp",
  "Male bushes and conduit gland nuts for cable and conduit entries into enclosures.",
  [("Threads", '<span class="mono">PG 7–48 · M12–M80</span>'), ("Material", MAT), ("Finish", FIN), ("Part code", '<span class="mono">AG-MB-[size]-[finish]</span> · <span class="mono">AG-CN-[size]-[finish]</span>')],
  cp_main, rel_except("conduit-parts.html"), h1="Brass conduit gland parts", shot="A8")

# =====================================================================================
# 4. TECHNICAL CHARTS
# =====================================================================================
def chart_page(file, title, desc, h1, std, lead, facts, headers, rows, note, back, kinds=None, fig=None, tbl_h2=None):
    kinds = kinds or "s" + "n" * (len(headers) - 1)   # s = sticky code, n = number, c = code (mono, left), t = text
    assert len(kinds) == len(headers)
    cls = {"s": "stick mono", "n": "n", "c": "mono c", "t": ""}
    th = "".join(f'<th class="{"stick" if k=="s" else ("n" if k=="n" else "")}">{h}</th>' for h, k in zip(headers, kinds))
    tr = "".join("<tr>" + "".join(f'<td class="{cls[k]}">{v}</td>' for v, k in zip(r, kinds)) + "</tr>" for r in rows)
    body = f'''<section class="phead" style="padding-bottom:var(--s-7)"><div class="wrap">
  {crumbs([("Resources", "resources.html"), (h1, "")])}
  {(f'<div class="rhead"><div><span class="eyebrow" style="display:block">{std}</span><h1>{h1}</h1><p class="lead">{lead}</p>{kv(facts)}</div><figure><div class="frame"><img src="img/la/{fig}.svg" alt="{E(std)} thread profile" style="width:100%;height:auto"></div></figure></div>') if fig else (f'<div class="phead__row"><div><span class="eyebrow" style="display:block;margin-top:var(--s-5)">{std}</span><h1>{h1}</h1><p class="lead">{lead}</p></div><div>{kv(facts)}</div></div>')}
</div></section>
<section class="band"><div class="wrap">{(f'<div class="open"><div><h2>{tbl_h2}</h2></div><p>All values in mm unless stated.</p></div>') if tbl_h2 else ""}<div class="tbl"><table class="spec stack-m"><thead><tr>{th}</tr></thead><tbody>{tr}</tbody></table></div>{note}</div></section>
<section class="band band--sheet"><div class="wrap"><div class="cta"><div><h2>{back[0]}</h2><p>{back[1]}</p></div><div class="acts"><a class="btn" href="{back[2]}">{back[3]} <span class="arr" aria-hidden="true">→</span></a></div></div></div></section>
'''
    RH = """  .rhead { display: grid; grid-template-columns: repeat(12, minmax(0,1fr)); column-gap: var(--gutter); row-gap: var(--s-6); align-items: start; margin-top: var(--s-5); }
  .rhead > :first-child { grid-column: 1 / span 7; } .rhead .kv { margin-top: var(--s-5); }
  .rhead > figure { grid-column: 9 / span 4; margin: 0; background: var(--card); border: 1px solid var(--ink-line); padding: 10px; }
  .rhead > figure .frame { border: var(--hair); padding: var(--s-3); }
  @media (max-width: 959px) { .rhead > * { grid-column: 1 / -1 !important; } .rhead > figure { max-width: 420px; } }
"""
    open(os.path.join(OUT, file), "w").write(head(title, desc, current="resources", extra_css=RH) + body + foot())

chart_page("metric-chart.html", "Metric Cable Gland Thread Chart (EN 60423): M12–M63×1.5 | AirGrip",
  "Metric cable gland threads to EN 60423: M12×1.5 to M63×1.5, outside diameter, pitch and tap drill.",
  "Metric cable gland thread chart", "EN 60423", "Metric threads with 1.5 mm pitch are the default for new cable entries in Europe, for glands, accessories and many turned parts.",
  [("Pitch", '<span class="mono">1.5 mm</span>'), ("Flank angle", '<span class="mono">60°</span>'), ("Sizes", '<span class="mono">M12 – M63</span>')],
  ["Size", "Outside Ø d", "Pitch P", "Tap drill Ø"],
  [(f"M{d}×1.5", f"{d:.2f}", "1.5", f"{d-1.5:.1f}") for d in [12,16,20,25,32,40,50,63]],
  '<p class="tbl-note">Tap drill = d − P. AirGrip glands and accessories also come in M80.</p>',
  ("Metric glands and accessories", "Glands, lock nuts, stop plugs and adapters in metric threads.", "glands.html", "See cable glands"), fig="prof-metric", tbl_h2="Metric thread sizes")

BSP = [("G 1/8",28,0.907,9.728,8.566,"—"),("G 1/4",19,1.337,13.157,11.445,"13.4"),("G 3/8",19,1.337,16.662,14.950,"17.0"),("G 1/2",14,1.814,20.955,18.631,"21.3"),
       ("G 5/8",14,1.814,22.911,20.587,"23.25"),("G 3/4",14,1.814,26.441,24.117,"26.8"),("G 1",11,2.309,33.249,30.291,"33.7"),("G 1 1/8",11,2.309,37.897,34.939,"38.3"),
       ("G 1 1/4",11,2.309,41.910,38.952,"42.3"),("G 1 1/2",11,2.309,47.803,44.845,"48.1"),("G 2",11,2.309,59.614,56.656,"60.1"),("G 2 1/4",11,2.309,65.710,62.752,"66.2"),
       ("G 2 1/2",11,2.309,75.184,72.226,"75.7"),("G 3",11,2.309,87.884,84.926,"88.4"),("G 4",11,2.309,113.030,110.072,"113.7"),("G 5",11,2.309,138.430,135.472,"139.1")]
chart_page("bsp-chart.html", "BSP Thread Chart (ISO 228-1): G 1/8 – G 5 Dimensions | AirGrip",
  "BSP parallel (G) thread dimensions to ISO 228-1: G 1/8 to G 5, threads per inch, pitch, major and minor diameter.",
  "BSP thread chart", "ISO 228-1", "British Standard Pipe parallel threads (G) for fittings, inserts and gland accessories. Pressure-tight joints seal on a washer or O-ring, not on the thread.",
  [("Flank angle", '<span class="mono">55°</span>'), ("Form", "Whitworth, parallel"), ("Sizes", '<span class="mono">G 1/8 – G 5</span>')],
  ["Size", "Threads / inch", "Pitch P", "Major Ø d", "Minor Ø d1", "Through-hole Ø"],
  [(s, str(t), f"{p:.3f}", f"{d:.3f}", f"{d1:.3f}", h) for s, t, p, d, d1, h in BSP],
  '<p class="tbl-note">Values to ISO 228-1. Through-hole: recommended clearance hole. G 4 and G 5 are reference only: above our Ø100 mm turning range.</p>',
  ("BSP fittings and accessories", "Fittings, inserts and gland accessories with BSP threads.", "fittings.html", "See brass fittings"), fig="prof-bsp", tbl_h2="BSP thread sizes")

# ASME B1.20.1 (inch): pipe OD, TPI, E0 pitch Ø at pipe end, L1 hand-tight engagement, L2 effective thread length
NPT = [("1/8",0.405,27,0.36351,0.1615,0.2639),("1/4",0.540,18,0.47739,0.2278,0.4018),("3/8",0.675,18,0.61201,0.240,0.4078),
       ("1/2",0.840,14,0.75843,0.320,0.5337),("3/4",1.050,14,0.96768,0.339,0.5457),("1",1.315,11.5,1.21363,0.400,0.6828),
       ("1 1/4",1.660,11.5,1.55713,0.420,0.7068),("1 1/2",1.900,11.5,1.79609,0.420,0.7235),("2",2.375,11.5,2.26902,0.436,0.7565)]
mm = lambda x: f"{x*25.4:.2f}"
chart_page("npt-chart.html", "NPT Thread Chart (ASME B1.20.1): 1/8 – 2 inch | AirGrip",
  "NPT taper pipe thread dimensions to ASME B1.20.1: 1/8 to 2 inch, threads per inch, pitch, pipe OD, pitch diameter E0, hand-tight engagement L1 and effective thread length L2 in mm.",
  "NPT thread chart", "ASME B1.20.1", "American National Pipe Taper threads for fittings and gland accessories sold into North America. The 1:16 taper seals with thread sealant.",
  [("Flank angle", '<span class="mono">60°</span>'), ("Taper", '<span class="mono">1:16</span> on diameter'), ("Sizes", '<span class="mono">1/8 – 2"</span>')],
  ["Size", "Threads / inch", "Pitch P", "Pipe OD", "Pitch Ø E0", "Hand-tight L1", "Effective L2"],
  [(f"{s} NPT", f"{t:g}", f"{25.4/t:.3f}", mm(od), mm(e0), mm(l1), mm(l2)) for s, od, t, e0, l1, l2 in NPT],
  '<p class="tbl-note">All values in mm, converted from ASME B1.20.1 (inch). E0 = pitch diameter at the small end of the external thread.</p>',
  ("NPT fittings and accessories", "Fittings and gland accessories in NPT, 3/8 to 1½ inch.", "fittings.html", "See brass fittings"), fig="prof-npt", tbl_h2="NPT thread sizes")

chart_page("grades.html", "Brass Grade Equivalents: CW614N, CW617N, CZ121, C38500, IS 319 | AirGrip",
  "Brass grade equivalents across EN, BS, UNS and IS standards, with copper and lead content and typical use: free-cutting, forging, DZR and lead-free brass.",
  "Brass grade equivalents", "EN · BS · UNS · IS", "Nearest equivalents between European, British, American and Indian brass designations, with copper and lead content and the use each grade is chosen for.",
  [("Standard at AirGrip", '<span class="mono">CW614N · CW617N</span>'), ("On request", "DZR and lead-free grades")],
  ["EN no.", "EN designation", "Cu %", "Pb %", "BS", "UNS", "IS", "Typical use", "AirGrip"],
  [("CW614N","CuZn39Pb3","57.0–59.0","2.5–3.5","CZ121Pb3","C38500","IS 319 Type I","Free-cutting: turned parts, glands, inserts, terminals","Standard"),
   ("CW617N","CuZn40Pb2","57.0–59.0","1.6–2.5","CZ122","C37700","—","Hot forging: fittings, valve bodies","Standard"),
   ("CW603N","CuZn36Pb3","60.0–62.0","2.5–3.5","CZ124","C36000","—","Free-cutting, higher copper","—"),
   ("CW602N","CuZn36Pb2As","61.0–63.0","1.7–2.8","CZ132","C35330","—","Dezincification-resistant (DZR): drinking-water fittings","On request"),
   ("CW511L","CuZn38As","61.5–63.5","≤ 0.2","—","—","—","Low-lead DZR: drinking water, lead-free markets","On request"),
   ("CW724R","CuZn21Si3P","75.0–77.0","≤ 0.10","—","C69300","—","Lead-free, high strength","On request"),
   ("CW508L","CuZn37","62.0–64.0","≤ 0.1","CZ108","C27200","—","Cold forming, stamping","—"),
   ("CW509L","CuZn40","59.5–61.5","≤ 0.3","CZ109","C28000","—","Low-lead hot forming","—"),
   ("CW717R","CuZn38Sn1As","59.0–62.0","≤ 0.2","CZ112","C46400","—","Naval brass: marine parts","—")],
  '<p class="tbl-note">Nearest equivalents; always check the specification your drawing calls up. Cu and Pb are composition limits from EN 12164 / 12165 / 12163. "—" in the AirGrip column = ask us.</p>',
  ("Need a specific grade?", "Tell us the grade on your drawing; we confirm availability with the quote.", "rfq.html", "Request a quote"),
  kinds="scnnccctt")

for g in GROUPS: group_page(g)
for _f in [x["file"] for x in GROUPS] + ["clamping-jaw.html", "favorit.html", "stop-plugs.html", "earth-tags.html", "thread-adapters.html", "conduit-parts.html", "metric-chart.html", "bsp-chart.html", "npt-chart.html", "grades.html"]:
    _p = os.path.join(OUT, _f); _s = open(_p).read(); open(_p, "w").write(_s.replace(" · ", "\u00a0· ").replace('<span class="mono">AG-', '<span class="mono nw">AG-'))
print("generated", len(GROUPS) + 2 + 4 + 4, "pages")
