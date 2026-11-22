#!/usr/bin/env python3
"""Generate AirGrip line-art part drawings (half-section, ISO 128 conventions) as standalone SVGs.

Interim imagery until the photo shoot. Run:  python3 tools/lineart.py
  img/la/<name>.svg    full drawing with dimensions (use at >= 220 px wide)
  img/la/t/<name>.svg  thumbnail: same geometry, no lettering (use below 220 px)

Axisymmetric parts are described left→right as segments (length_mm, outer_radius_mm, flags):
  flags: thread, knurl, hex (side view across corners; edge line at r/2), cham, barb
bore: list of (x_from_mm, x_to_mm, radius_mm, {"thread":1})
Dimensions: overall length below; one Ø on a ROUND segment (dia=(segment_index, label)); never on a hex.
AF is only dimensioned in an end view (end=True). Thread callouts use leaders (threads=[(segment_index, label)]).
Drawings are NOT to a common scale: each fills its frame.
"""
import math, os

INK, INK3, BRASS, TINT = "#262B33", "#5F656E", "#B8862F", "#F1E4C6"
W, H = 240, 160
BASE = os.path.join(os.path.dirname(__file__), "..", "img", "la")
os.makedirs(os.path.join(BASE, "t"), exist_ok=True)

def head(title):
    return f'''<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 {W} {H}" role="img" aria-label="{title}">
<title>{title}</title>
<defs>
<pattern id="h" width="5" height="5" patternUnits="userSpaceOnUse" patternTransform="rotate(45)"><line x1="0" y1="0" x2="0" y2="5" stroke="{BRASS}" stroke-width=".8"/></pattern>
<pattern id="h2" width="7" height="7" patternUnits="userSpaceOnUse" patternTransform="rotate(-45)"><line x1="0" y1="0" x2="0" y2="7" stroke="{BRASS}" stroke-width=".8"/></pattern>
<pattern id="k" width="5" height="5" patternUnits="userSpaceOnUse" patternTransform="rotate(30)"><path d="M0 0V5M0 0H5" stroke="{INK}" stroke-width=".45" fill="none"/></pattern>
<pattern id="s" width="4" height="4" patternUnits="userSpaceOnUse" patternTransform="rotate(-45)"><line x1="0" y1="0" x2="0" y2="4" stroke="{INK3}" stroke-width=".5"/></pattern>
<marker id="a" viewBox="0 0 10 10" refX="10" refY="5" markerWidth="5" markerHeight="5" orient="auto-start-reverse"><path d="M0 1.5L10 5L0 8.5z" fill="{INK3}"/></marker>
</defs>
<rect width="{W}" height="{H}" fill="#fff"/>
<g fill="none" stroke-linejoin="round" stroke-linecap="round">
'''
TAIL = "</g></svg>\n"
def O(d, w=1.2): return f'<path d="{d}" stroke="{INK}" stroke-width="{w}"/>\n'
def T(d):  return f'<path d="{d}" stroke="{INK}" stroke-width=".6"/>\n'
def HID(d):return f'<path d="{d}" stroke="{INK}" stroke-width=".6" stroke-dasharray="3 2"/>\n'
def C(d):  return f'<path d="{d}" stroke="{BRASS}" stroke-width=".7" stroke-dasharray="10 2 1.5 2"/>\n'
def DIM(d): return f'<path d="{d}" stroke="{INK3}" stroke-width=".5"/>\n'
def DL(d):  return f'<path d="{d}" stroke="{INK3}" stroke-width=".5" marker-start="url(#a)" marker-end="url(#a)"/>\n'
def LEAD(d):return f'<path d="{d}" stroke="{INK3}" stroke-width=".5" marker-start="url(#a)"/>\n'
def TXT(x, y, s, anchor="middle", rot=False, bg=False):
    tr = f' transform="rotate(-90 {x:.1f} {y:.1f})"' if rot else ""
    out = ""
    if bg:
        w = len(s) * 5.9 + 4
        out += (f'<rect x="{x-6:.1f}" y="{y-w/2:.1f}" width="9" height="{w:.1f}" fill="#fff" stroke="none"/>' if rot
                else f'<rect x="{x-w/2:.1f}" y="{y-8:.1f}" width="{w:.1f}" height="10" fill="#fff" stroke="none"/>')
    return out + f'<text x="{x:.1f}" y="{y:.1f}" text-anchor="{anchor}"{tr} font-family="IBM Plex Mono, ui-monospace, monospace" font-size="9.5" fill="{INK}" stroke="none">{s}</text>\n'

def large(title, body):
    """Large-display variant (heroes, ~500-700 px wide): hairline strokes that don't scale up,
    half-size lettering and finer hatching, so it matches the inline hero drawing on the home page."""
    import re as _re
    b = _re.sub(r'stroke-width="([0-9.]+)"', lambda m: f'stroke-width="{float(m.group(1)) * 1.3:.2f}" vector-effect="non-scaling-stroke"', body)
    b = _re.sub(r'font-size="([0-9.]+)"', lambda m: f'font-size="{float(m.group(1)) * .5:.2f}"', b)
    h = head(title)
    h = _re.sub(r'(<pattern[^>]*>.*?stroke-width=")([0-9.]+)(")', lambda m: m.group(1) + f'{float(m.group(2)) * .5:.2f}' + m.group(3), h, flags=_re.S)
    h = h.replace('markerWidth="5" markerHeight="5"', 'markerWidth="4" markerHeight="4"')
    return h + b + TAIL

def write(name, title, body, thumb_body=None):
    open(os.path.join(BASE, name + ".svg"), "w").write(head(title) + body + TAIL)
    open(os.path.join(BASE, "t", name + ".svg"), "w").write(head(title) + (thumb_body if thumb_body is not None else body) + TAIL)
    os.makedirs(os.path.join(BASE, "l"), exist_ok=True)
    open(os.path.join(BASE, "l", name + ".svg"), "w").write(large(title, body))

def turned(name, title, segs, bore=None, end=False, len_label=None, dia=None, threads=(), section=True, extra=None):
    def build(thumb):
        L = sum(s[0] for s in segs); R = max(s[1] for s in segs)
        if end:
            sc = min((200 if thumb else 180) / (L + 2 * R + 8), (62 if thumb else 48) / R)
            x0 = (W - (L * sc + 26 + 2 * R * sc)) / 2; cy = 80 if thumb else 76
        else:
            sc = min((210 if thumb else 168) / L, (64 if thumb else 50) / R)
            x0 = (W - L * sc) / 2 - (0 if thumb else 8); cy = 80 if thumb else 82
        X = lambda mm: x0 + mm * sc
        o = ""
        # outer profile points (mm)
        pts = []; x = 0; edges = []      # edges: (x_mm, r_mm) visible lines in the view half
        for i, (l, r, f) in enumerate(segs):
            c = min(r * .12, l * .2, 1.2) if f.get("cham") else 0
            pts += [(x, r - c), (x + c, r)] if c else [(x, r)]
            if c: edges.append((x + c, r))
            if f.get("barb"):
                pts += [(x + l * .75, r), (x + l, r * .78)]; edges.append((x + l * .75, r))
            else:
                pts += [(x + l - c, r)]
                if c: pts += [(x + l, r - c)]; edges.append((x + l - c, r))
            if i < len(segs) - 1:
                edges.append((x + l, max(r, segs[i + 1][1])))
            x += l
        up = [(X(a), cy - b * sc) for a, b in pts]; lo = [(X(a), cy + b * sc) for a, b in pts]
        def inner_r(xm):
            for a, b, r, f in (bore or []):
                if a <= xm < b or (xm == L and b == L and a < b): return r
            return 0
        bps = sorted({0, L} | {v for a, b, r, f in (bore or []) for v in (a, b)}, reverse=True)
        ipts = []
        for x2, x1 in zip(bps, bps[1:]):
            r = inner_r((x1 + x2) / 2); ipts += [(X(x2), cy - r * sc), (X(x1), cy - r * sc)]
        sect = "M" + " L".join(f"{p[0]:.1f} {p[1]:.1f}" for p in up) + " L" + " L".join(f"{p[0]:.1f} {p[1]:.1f}" for p in ipts) + "Z"
        # outline of the section: outer profile + end faces + bore; never a line along the axis (ISO 128)
        r_end = inner_r(L - 1e-9); stroke = "M" + " L".join(f"{p[0]:.1f} {p[1]:.1f}" for p in up) + f" L{X(L):.1f} {cy - r_end*sc:.1f}"
        for x2, x1 in zip(bps, bps[1:]):
            r = inner_r((x1 + x2) / 2)
            if r > 0: stroke += f" L{X(x2):.1f} {cy - r*sc:.1f} L{X(x1):.1f} {cy - r*sc:.1f}"
            else:     stroke += f" L{X(x2):.1f} {cy:.1f} M{X(x1):.1f} {cy:.1f}"
        stroke += f" L{X(0):.1f} {cy - pts[0][1]*sc:.1f}"
        if section:
            o += f'<path d="{sect}" fill="{TINT}" stroke="none"/><path d="{sect}" fill="url(#h)" stroke="none"/>' + O(stroke)
        else:   # exterior view: mirror the view half upward, no hatching
            o += O(f"M{X(0):.1f} {cy:.1f} L" + " L".join(f"{p[0]:.1f} {p[1]:.1f}" for p in up) + f" L{X(L):.1f} {cy:.1f}")
        o += O(f"M{X(0):.1f} {cy:.1f} L" + " L".join(f"{p[0]:.1f} {p[1]:.1f}" for p in lo) + f" L{X(L):.1f} {cy:.1f}")
        for ex_, er in edges:                                     # shoulder / chamfer edges in the view half(s)
            o += O(f"M{X(ex_):.1f} {cy:.1f}V{cy + er * sc:.1f}", .9)
            if not section: o += O(f"M{X(ex_):.1f} {cy:.1f}V{cy - er * sc:.1f}", .9)
        x = 0
        for (l, r, f) in segs:
            if f.get("thread"):
                rr = r * .88
                o += T(f"M{X(x)+1.5:.1f} {cy - rr*sc:.1f}H{X(x+l)-1.5:.1f}M{X(x)+1.5:.1f} {cy + rr*sc:.1f}H{X(x+l)-1.5:.1f}")
            if f.get("knurl"):
                o += f'<rect x="{X(x):.1f}" y="{cy:.1f}" width="{l*sc:.1f}" height="{r*sc:.1f}" fill="url(#k)" stroke="none"/>\n'
            if f.get("hex"):
                o += O(f"M{X(x):.1f} {cy + r*sc*.5:.1f}H{X(x+l):.1f}", .9)
            x += l
        if bore:
            for a, b, r, f in bore:
                o += HID(f"M{X(a):.1f} {cy + r*sc:.1f}H{X(b):.1f}")
                if f.get("thread"): o += T(f"M{X(a)+1:.1f} {cy - r*1.12*sc:.1f}H{X(b)-1:.1f}")
        if extra: o += extra(X, cy, sc)
        o += C(f"M{X(0) - 7:.1f} {cy:.1f}H{X(L) + 7:.1f}")
        ex = None
        if end:
            ex = X(L) + 26 + R * sc; hexd = any(f.get("hex") for _, _, f in segs)
            if hexd:
                p6 = " L".join(f"{ex + R*sc*math.cos(math.radians(30+60*i)):.1f} {cy + R*sc*math.sin(math.radians(30+60*i)):.1f}" for i in range(6))
                o += f'<path d="M{p6}Z" fill="{TINT}" stroke="none"/>' + O(f"M{p6}Z")
                rc = R * sc * .866
                o += f'<circle cx="{ex:.1f}" cy="{cy:.1f}" r="{rc*.97:.1f}" stroke="{INK}" stroke-width=".6"/>\n'
            else:
                o += f'<circle cx="{ex:.1f}" cy="{cy:.1f}" r="{R*sc:.1f}" fill="{TINT}" stroke="{INK}" stroke-width="1.2"/>\n'
            if bore:
                br = bore[0][2]
                o += f'<circle cx="{ex:.1f}" cy="{cy:.1f}" r="{br*sc:.1f}" fill="#fff" stroke="{INK}" stroke-width="1.2"/>\n'
                if bore[0][3].get("thread"):
                    rr = br * 1.12 * sc
                    o += T(f"M{ex + rr:.1f} {cy:.1f}A{rr:.1f} {rr:.1f} 0 1 1 {ex:.1f} {cy - rr:.1f}")
            o += C(f"M{ex - R*sc - 6:.1f} {cy:.1f}H{ex + R*sc + 6:.1f}M{ex:.1f} {cy - R*sc - 6:.1f}V{cy + R*sc + 6:.1f}")
        if thumb:
            return o
        # ---- dimensions --------------------------------------------------
        y = cy + R * sc + 14
        o += DIM(f"M{X(0):.1f} {cy + segs[0][1]*sc + 2:.1f}V{y+4:.1f}M{X(L):.1f} {cy + segs[-1][1]*sc + 2:.1f}V{y+4:.1f}")
        o += DL(f"M{X(0):.1f} {y:.1f}H{X(L):.1f}") + TXT((X(0) + X(L)) / 2, y - 3, len_label or f"{L:g}", bg=True)
        if end:
            hexd = any(f.get("hex") for _, _, f in segs); f0 = R * sc * (0.866 if hexd else 1)
            o += DIM(f"M{ex - f0:.1f} {cy + 4:.1f}V{y+4:.1f}M{ex + f0:.1f} {cy + 4:.1f}V{y+4:.1f}")
            o += DL(f"M{ex - f0:.1f} {y:.1f}H{ex + f0:.1f}") + TXT(ex, y - 3, (f"AF {2*R*.866:.0f}" if hexd else f"Ø{2*R:g}"), bg=True)
        elif dia is not False:
            idx = dia[0] if dia else max((i for i, s in enumerate(segs) if not s[2].get("hex")), key=lambda i: segs[i][1])
            r = segs[idx][1]; x_a = sum(s[0] for s in segs[:idx]); x_b = x_a + segs[idx][0]
            lab = dia[1] if dia else f"Ø{2*r:g}"
            if all(s[1] < r for s in segs[idx + 1:]):            # nothing bigger to the right → outside dimension
                xr = X(L) + 12
                o += DIM(f"M{X(x_b)+1.5:.1f} {cy - r*sc:.1f}H{xr+4:.1f}M{X(x_b)+1.5:.1f} {cy + r*sc:.1f}H{xr+4:.1f}")
                o += DL(f"M{xr:.1f} {cy - r*sc:.1f}V{cy + r*sc:.1f}") + TXT(xr + 10, cy, lab, rot=True)
            else:                                                    # dimension across the segment itself
                xm = X((x_a + x_b) / 2)
                o += DL(f"M{xm:.1f} {cy - r*sc:.1f}V{cy + r*sc:.1f}") + TXT(xm - 4, cy + r * sc * .55, lab, rot=True, bg=True)
        for idx, lab in threads:
            r = segs[idx][1]; xm = X(sum(s[0] for s in segs[:idx]) + segs[idx][0] * .5)
            yt = max(cy - R * sc - 12, 12)
            o += LEAD(f"M{xm:.1f} {cy - r*sc:.1f}L{xm - 10:.1f} {yt:.1f}H{xm - 14 - len(lab)*5.9:.1f}")
            o += TXT(xm - 12, yt - 3, lab, anchor="end")
        return o
    write(name, title, build(False), build(True))

H_ = {"hex": 1, "cham": 1}
# ---- product-group pictures & typical turned parts (varied shapes) -------
turned("turned", "Brass turned shaft with groove and threaded spigot", [(10, 6, {"thread":1,"cham":1}), (3, 5, {}), (22, 9, {"cham":1}), (5, 12, {"cham":1}), (14, 8, {"knurl":1,"cham":1})], bore=[(40, 54, 4, {})], len_label="54", dia=(3, "Ø24"), threads=[(0, "M12")])
turned("connector", "Connector body", [(8, 5, {"thread":1,"cham":1}), (16, 7, {"knurl":1}), (6, 9, {"cham":1})], bore=[(0, 30, 3, {})], len_label="30", dia=(2, "Ø18"), threads=[(0, "M10")])
turned("nozzle", "Hose nozzle", [(10, 8, {"thread":1,"cham":1}), (6, 11, H_), (6, 5, {"barb":1}), (6, 5, {"barb":1}), (6, 5, {"barb":1})], bore=[(0, 34, 3, {})], len_label="34", dia=(3, "Ø10"), threads=[(0, "G 3/8")])
turned("bush", "Flanged bush", [(4, 15, {"cham":1}), (18, 11, {"cham":1})], bore=[(0, 22, 6.5, {})], len_label="22", dia=(0, "Ø30"))
turned("pin", "Terminal pin", [(3, 3.2, {"cham":1}), (22, 2, {"cham":1}), (6, 3, {"thread":1,"cham":1})], len_label="31", dia=(1, "Ø4"), threads=[(2, "M6")], section=False)
turned("housing", "Sensor housing", [(14, 9, {"thread":1,"cham":1}), (6, 13, {"cham":1}), (22, 11, {"knurl":1,"cham":1})], bore=[(0, 42, 7, {})], len_label="42", dia=(1, "Ø26"), threads=[(0, "M18×1.5")])
turned("spindle", "Valve spindle", [(8, 3, {"thread":1,"cham":1}), (40, 4, {}), (6, 6, {"cham":1}), (10, 3.5, {"cham":1})], len_label="64", dia=(1, "Ø8"), threads=[(0, "M6")], section=False)
turned("spacer", "Hex spacer", [(25, 5.8, H_)], bore=[(0, 25, 2.5, {"thread":1})], len_label="25", end=True)
turned("adaptor", "Hex thread adaptor", [(12, 10.5, {"thread":1,"cham":1}), (8, 13.9, H_), (12, 10.5, {"thread":1,"cham":1})], bore=[(0, 32, 6, {})], len_label="32", dia=False, threads=[(0, "G 1/2")])
turned("insert", "Knurled moulding insert", [(2, 4, {"cham":1}), (5, 4.4, {"knurl":1}), (2, 3.4, {}), (5, 4.4, {"knurl":1}), (1, 4, {"cham":1})], bore=[(0, 15, 1.8, {"thread":1})], len_label="15", dia=(1, "Ø8.8"))
turned("fastener", "Brass stud, threaded both ends", [(12, 4, {"thread":1,"cham":1}), (14, 4, {}), (12, 4, {"thread":1,"cham":1})], len_label="38", dia=False, threads=[(2, "M8")], section=False)
# attack round 2026-11-15: product-group heroes that read as the real part (fasteners, forged, fittings, stamping)
turned("hexbolt", "Brass hex bolt: hex head, plain shank, M8 thread, end view across flats", [(5.3, 7.5, H_), (12, 4, {"cham":1}), (18, 4, {"thread":1,"cham":1})], len_label="35", end=True, threads=[(2, "M8")], section=False)
# ---- accessories (side + end view) -------------------------------------------
turned("locknut", "Brass lock nut", [(5, 13.9, H_)], bore=[(0, 5, 10, {"thread":1})], len_label="5", end=True)
turned("reducer", "Cable gland reducer", [(3, 16, {"cham":1}), (10, 12, {"thread":1,"cham":1})], bore=[(0, 13, 7.5, {"thread":1})], len_label="13", end=True)
turned("adapter", "Cable gland adapter", [(4, 13.9, H_), (10, 10, {"thread":1,"cham":1})], bore=[(0, 14, 8, {"thread":1})], len_label="14", end=True)
turned("enlarger", "Cable gland enlarger", [(10, 13, {"cham":1}), (8, 8, {"thread":1,"cham":1})], bore=[(0, 10, 10, {"thread":1}), (10, 18, 5, {})], len_label="18", end=True)
def _bush_fillet(X, cy, sc):
    x0, y0, r = X(0), cy - 7 * sc, 1.6 * sc          # rounded edge where the cable enters (flange side)
    return (f'<path d="M{x0-.8:.1f} {y0+.8:.1f}L{x0-.8:.1f} {y0-r:.1f}A{r:.1f} {r:.1f} 0 0 0 {x0+r:.1f} {y0+.8:.1f}Z" fill="#fff" stroke="none"/>'
            + O(f"M{x0:.1f} {y0-r:.1f}A{r:.1f} {r:.1f} 0 0 0 {x0+r:.1f} {y0:.1f}"))
turned("malebush", "Male bush: hex flange, threaded spigot, rounded cable entry", [(4, 13.9, H_), (12, 10, {"thread":1,"cham":1})], bore=[(0, 16, 7, {})], len_label="16", end=True, extra=_bush_fillet)
turned("conduitnut", "Conduit gland nut", [(8, 13.9, H_)], bore=[(0, 8, 10, {"thread":1})], len_label="8", end=True)

# ---- hand-drawn parts --------------------------------------------------------
tee_body = f'''
<path fill-rule="evenodd" d="M40 62H100V28H140V62H200V102H40Z M40 74H112V28H128V74H200V90H40Z" fill="{TINT}" stroke="none"/>
<path fill-rule="evenodd" d="M40 62H100V28H140V62H200V102H40Z M40 74H112V28H128V74H200V90H40Z" fill="url(#h)" stroke="none"/>
{O("M40 62H100V28M140 28V62H200M40 102H200M40 74H112V28M128 28V74H200M40 90H200M40 62V74M40 90V102M200 62V74M200 90V102M100 28H112M128 28H140")}
{T("M40 66H60M40 98H60M180 66H200M180 98H200M104 28V46M136 28V46")}
{C("M30 82H210M120 18V112")}'''
write("tee", "Forged brass tee, section", tee_body + DIM("M40 106V124M200 106V124") + DL("M40 120H200") + TXT(120, 117, "L", bg=True)
      + LEAD("M136 34L156 16H186") + TXT(160, 13, "G 1/2", anchor="start"), tee_body)
ft_body = f'''
<path fill-rule="evenodd" d="M40 64H80V52H98L102 24H138L142 52H160V64H200V100H160V112H80V100H40Z M40 72H110V24H130V72H200V92H40Z" fill="{TINT}" stroke="none"/>
<path fill-rule="evenodd" d="M40 64H80V52H98L102 24H138L142 52H160V64H200V100H160V112H80V100H40Z M40 72H110V24H130V72H200V92H40Z" fill="url(#h)" stroke="none"/>
{O("M40 64H80V52H98L102 24H138L142 52H160V64H200V100H160V112H80V100H40Z")}
{O("M40 72H110V24M130 24V72H200M40 92H200")}
{T("M80 58H160M80 106H160M40 68H62M40 96H62M178 68H200M178 96H200M106 24V44M134 24V44")}
{C("M30 82H210M120 14V118")}'''
write("forgedtee", "Forged brass tee in section: hex body, three threaded ports, drafted boss, parting line on the centre plane", ft_body
      + DIM("M40 104V128M200 104V128") + DL("M40 124H200") + TXT(120, 121, "L", bg=True)
      + LEAD("M134 30L156 14H186") + TXT(160, 11, "G 1/2", anchor="start")
      + LEAD("M141 46L168 40H196") + TXT(170, 37, "draft 1°", anchor="start")
      + LEAD("M206 82L214 70") + TXT(215, 67, "PL", anchor="start"), ft_body)
el_body = f'''
<path fill-rule="evenodd" d="M50 68H110V34H158V98Q158 116 140 116H50Z M50 84H126V34H142V100H50Z" fill="{TINT}" stroke="none"/>
<path fill-rule="evenodd" d="M50 68H110V34H158V98Q158 116 140 116H50Z M50 84H126V34H142V100H50Z" fill="url(#h)" stroke="none"/>
{O("M50 68H110V34M158 34V98Q158 116 140 116H50M50 84H126V34M142 34V100H50M50 68V84M50 100V116M110 34H126M142 34H158")}
{T("M50 80H72M50 104H72M122 34V56M146 34V56")}
{C("M40 92H170M134 24V126")}'''
write("elbow", "Brass 90 degree elbow fitting in section: two threaded ports", el_body
      + DIM("M50 120V138M158 120V138") + DL("M50 134H158") + TXT(104, 131, "L", bg=True)
      + LEAD("M150 40L170 24H198") + TXT(172, 21, "G 1/2", anchor="start"), el_body)
ct_body = f'''
<path fill-rule="evenodd" d="M30 56H118L128 50H152V64H134V76H152V90H128L118 84H30Z M42 70A6 6 0 1 0 54 70A6 6 0 1 0 42 70Z" fill="{TINT}" stroke="none"/>
{O("M30 56H118L128 50H152V64H134V76H152V90H128L118 84H30Z")}
<circle cx="48" cy="70" r="6" fill="#fff" stroke="{INK}" stroke-width="1.2"/>
<path d="M172 90H202V50H198V86H172Z" fill="{TINT}" stroke="none"/><path d="M172 90H202V50H198V86H172Z" fill="url(#h)" stroke="none"/>
{O("M172 90H202V50H198V86H172Z")}
{C("M22 70H160M48 58V82")}'''
write("contact", "Stamped brass contact: plan view with mounting hole and forked end; side view of the bend", ct_body
      + DIM("M30 94V114M152 94V114") + DL("M30 110H152") + TXT(91, 107, "L", bg=True)
      + LEAD("M52 65L70 40H96") + TXT(72, 37, "Ø4.2", anchor="start")
      + LEAD("M200 52L210 36H226") + TXT(212, 33, "t 0.8", anchor="start"), ct_body)
term_body = f'''
<path d="M50 62H82V76H50Z M94 62H146V76H94Z M158 62H190V76H158Z M50 96H190V110H50Z" fill="{TINT}"/>
<path d="M50 62H82V76H50Z M94 62H146V76H94Z M158 62H190V76H158Z M50 96H190V110H50Z" fill="url(#h)"/>
{O("M50 76V62H82V76M94 76V62H146V76M158 76V62H190V76M50 76H82M94 76H146M158 76H190M50 96H190V110H50V96")}
{T("M80 62V76M96 62V76M144 62V76M160 62V76")}
<path d="M77 62V56Q77 50 83 50H93Q99 50 99 56V62Z M82 62H94V82H82Z M141 62V56Q141 50 147 50H157Q163 50 163 56V62Z M146 62H158V82H146Z" fill="#fff" stroke="{INK}" stroke-width="1.2"/>
{T("M83.5 63V81M92.5 63V81M147.5 63V81M156.5 63V81M86 50V54H90V50M150 50V54H154V50")}
{C("M42 86H198M88 42V116M152 42V116")}'''
write("terminal", "Brass terminal block in section: conductor bore with two M5 clamping screws", term_body + DIM("M50 114V132M190 114V132") + DL("M50 128H190") + TXT(120, 125, "L", bg=True)
      + LEAD("M99 55L116 30H146") + TXT(118, 26, "2 × M5", anchor="start"), term_body)
tag_body = f'''
<path d="M60 80A34 34 0 1 1 128 80A34 34 0 0 1 60 80ZM122 70H186A10 10 0 0 1 186 90H122Z" fill="{TINT}"/>
{O("M94 46A34 34 0 1 0 94 114A34 34 0 0 0 125 92L128 90H186A10 10 0 0 0 186 70H128L125 68A34 34 0 0 0 94 46Z")}
<circle cx="94" cy="80" r="20" fill="#fff" stroke="{INK}" stroke-width="1.2"/><circle cx="182" cy="80" r="4.5" fill="#fff" stroke="{INK}" stroke-width="1.2"/>
{C("M50 80H200M94 36V124M182 68V92")}'''
write("earthtag", "Stamped brass earth tag", tag_body + DIM("M74 120V136M114 120V136") + DL("M74 132H114") + TXT(94, 129, "for M20", bg=True)
      + LEAD("M160 70L172 52H200") + TXT(176, 48, "t 1.0", anchor="start"), tag_body)

# stop plug: slotted dome head + threaded spigot (exterior view) and end view of the head showing the slot
cy = 76
sp_body = (O(f"M70 {cy-30}A22 30 0 0 0 48.2 {cy-4}L55 {cy-4}L55 {cy+4}L48.2 {cy+4}A22 30 0 0 0 70 {cy+30}Z")
    + O(f"M70 {cy-20}H116L119 {cy-17}V{cy+17}L116 {cy+20}H70") + O(f"M116 {cy-20}V{cy+20}", .9)
    + T(f"M72 {cy-17.6}H114M72 {cy+17.6}H114")
    + f'<circle cx="176" cy="{cy}" r="30" fill="{TINT}" stroke="{INK}" stroke-width="1.2"/>'
    + O(f"M146.3 {cy-4}H205.7M146.3 {cy+4}H205.7", .9)
    + C(f"M40 {cy}H127M140 {cy}H212M176 {cy-36}V{cy+36}"))
write("stopplug", "Stop plug: slotted dome head, threaded spigot, end view", sp_body
      + DIM(f"M48 {cy+6}V{cy+46}M119 {cy+22}V{cy+46}") + DL(f"M48 {cy+42}H119") + TXT(83.5, cy+39, "12", bg=True)
      + DIM(f"M146 {cy+4}V{cy+46}M206 {cy+4}V{cy+46}") + DL(f"M146 {cy+42}H206") + TXT(176, cy+39, "Ø24", bg=True)
      + LEAD(f"M100 {cy-20}L110 {cy-38}H128") + TXT(114, cy-41, "M20", anchor="start"), sp_body)

# dome cap nut: half-section (internal thread, dome, cable hole) + end view from the dome side
ex = 164
dn_sect = f"M36 {cy-28}H86V{cy-24}A25.9 24 0 0 1 110 {cy-9}H104A24.6 20 0 0 0 82 {cy-20}H36Z"
p6 = " L".join(f"{ex + 28*math.cos(math.radians(30+60*i)):.1f} {cy + 28*math.sin(math.radians(30+60*i)):.1f}" for i in range(6))
dn_body = (f'<path d="{dn_sect}" fill="{TINT}" stroke="none"/><path d="{dn_sect}" fill="url(#h)" stroke="none"/>' + O(dn_sect)
    + T(f"M37 {cy-22.4}H81")
    + O(f"M36 {cy}V{cy+28}H86V{cy+24}A25.9 24 0 0 0 110 {cy+9}V{cy}") + O(f"M36 {cy+14}H86M86 {cy}V{cy+24}", .9)
    + HID(f"M36 {cy+20}H82")
    + f'<path d="M{p6}Z" fill="{TINT}" stroke="{INK}" stroke-width="1.2"/>'
    + f'<circle cx="{ex}" cy="{cy}" r="24" stroke="{INK}" stroke-width=".9"/>'
    + f'<circle cx="{ex}" cy="{cy}" r="9" fill="#fff" stroke="{INK}" stroke-width="1.2"/>'
    + C(f"M28 {cy}H118M{ex-34} {cy}H{ex+34}M{ex} {cy-34}V{cy+34}"))
write("domenut", "Dome cap nut: half-section with internal thread and cable hole, end view", dn_body
      + DIM(f"M36 {cy+30}V{cy+46}M110 {cy+11}V{cy+46}") + DL(f"M36 {cy+42}H110") + TXT(73, cy+39, "16", bg=True)
      + DIM(f"M{ex-24.2:.1f} {cy+4}V{cy+46}M{ex+24.2:.1f} {cy+4}V{cy+46}") + DL(f"M{ex-24.2:.1f} {cy+42}H{ex+24.2:.1f}") + TXT(ex, cy+39, "AF 24", bg=True)
      + LEAD(f"M58 {cy-21}L66 {cy-40}H96") + TXT(70, cy-43, "M20×1.5", anchor="start"), dn_body)
# cable gland: two views (half-section + end view), from the Kompakt datasheet geometry
g = '''<g transform="translate(243 -19) scale(.66) rotate(90)">
<path d="M132 170Q106 174 104 200V252H112V200Q114 186 132 182Z" fill="#F1E4C6"/><path d="M132 170Q106 174 104 200V252H112V200Q114 186 132 182Z" fill="url(#h2)"/>
<path d="M112 225V250H104V300H116V346L120 350H130V250H126V225Z" fill="#F1E4C6"/><path d="M112 225V250H104V300H116V346L120 350H130V250H126V225Z" fill="url(#h)"/>
<path d="M114 198L132 190V225H114Z" fill="#E4E2DA"/><path d="M114 198L132 190V225H114Z" fill="url(#s)"/>
<path d="M132 170Q106 174 104 200V252H112V200Q114 186 132 182ZM112 225V250H104V300H116V346L120 350H130V250H126V225ZM114 198L132 190V225H114Z" stroke="#262B33" stroke-width="1.8"/>
<path d="M150 170H168Q194 174 196 200V300H184V346L180 350H150M150 251H196M184 300H150M196 251V300" stroke="#262B33" stroke-width="1.8"/>
<path d="M121 304V346M179 304V346" stroke="#262B33" stroke-width=".9"/>
<path d="M150 156V366" stroke="#B8862F" stroke-width="1" stroke-dasharray="14 3 2 3"/>
</g>
<path d="M221 80L203.5 110.4H168.5L151 80L168.5 49.6H203.5Z" fill="#F1E4C6" stroke="#262B33" stroke-width="1.2"/>
<circle cx="186" cy="80" r="22.4" fill="#F1E4C6" stroke="#262B33" stroke-width="1.2"/>
<path d="M205.1 80A19.1 19.1 0 1 1 186 60.9" stroke="#262B33" stroke-width=".6"/>
<circle cx="186" cy="80" r="13.2" fill="#fff" stroke="#262B33" stroke-width="1.2"/>
<path d="M144 80H228M186 38V122" stroke="#B8862F" stroke-width=".7" stroke-dasharray="10 2 1.5 2"/>
'''
write("gland", "Brass cable gland: half-section and end view", g, g)

# ---- gland family: distinct drawings per type + letter-only dimension keys -------------------------
GREY = "#E4E2DA"
def SV(content, tx, ty, sc):
    return f'<g transform="translate({tx} {ty}) scale({sc})">{content}</g>\n'
def FILL(d, pat, base=None):
    return f'<path d="{d}" fill="{base or TINT}" stroke="none"/><path d="{d}" fill="url(#{pat})" stroke="none"/>'
def hexpts(ex, ey, R):
    return " L".join(f"{ex + R*math.cos(math.radians(30+60*i)):.1f} {ey + R*math.sin(math.radians(30+60*i)):.1f}" for i in range(6))

# shared body: threaded entry spigot + hex (local coords, y up = negative, axis at 0)
BODY_SEC = "M14 -22H40V-34H70V-26H92V-15H14Z"

# clamping-jaw gland: pressure screw drives slotted clamping jaws onto the cable
CJ_CAP = "M70 -34H100V-30A22 18 0 0 1 122 -12H116L100 -26H70Z"
CJ_JAW = "M92 -24H100L114 -12.3V-11.5H126V-8H104V-13H92Z"
cj_local = (FILL(BODY_SEC, "h") + FILL(CJ_CAP, "h2") + FILL(CJ_JAW, "s", GREY)
    + O(BODY_SEC) + O(CJ_CAP) + O(CJ_JAW)
    + T("M15 -19H39M71 -28H91M104 -10.5H124")
    + O("M14 0V22H40V34H100V30A22 18 0 0 0 122 12V11.5H126V0")
    + O("M70 0V34M100 0V30M40 17H100", .9) + T("M15 19H39M122 5H126")
    + HID("M14 15H92") + C("M6 0H134"))
CJ_S, CJ_TX, GY = .9, 4, 80
def cj_end(ex):
    R = 34 * CJ_S
    out = f'<path d="M{hexpts(ex, GY, R)}Z" fill="{TINT}" stroke="{INK}" stroke-width="1.2"/>'
    out += f'<circle cx="{ex}" cy="{GY}" r="{29.4*CJ_S:.1f}" stroke="{INK}" stroke-width=".9"/>'
    out += f'<circle cx="{ex}" cy="{GY}" r="{11.5*CJ_S:.1f}" fill="{GREY}" stroke="{INK}" stroke-width="1.2"/>'
    out += "".join(T(f"M{ex + 8*CJ_S*math.cos(math.radians(a)):.1f} {GY + 8*CJ_S*math.sin(math.radians(a)):.1f}L{ex + 11.5*CJ_S*math.cos(math.radians(a)):.1f} {GY + 11.5*CJ_S*math.sin(math.radians(a)):.1f}") for a in range(0, 360, 60))
    out += f'<circle cx="{ex}" cy="{GY}" r="{8*CJ_S:.1f}" fill="#fff" stroke="{INK}" stroke-width="1.2"/>'
    return out + C(f"M{ex-R-8:.1f} {GY}H{ex+R+8:.1f}M{ex} {GY-R-8:.1f}V{GY+R+8:.1f}")
cj_body = SV(cj_local, CJ_TX, GY, CJ_S) + cj_end(178)
g = lambda x: CJ_TX + CJ_S * x          # local x -> global x
gy = lambda y: GY + CJ_S * y
write("gland-cj", "Clamping-jaw cable gland: half-section and end view; slotted jaws grip the cable",
      cj_body + LEAD(f"M{g(30):.1f} {gy(-22):.1f}L40 30H70") + TXT(44, 27, "PG 13.5", anchor="start"), cj_body)
write("gland-cj-key", "Clamping-jaw cable gland, dimension key: L, GL, D, T", cj_body
      + DIM(f"M{g(14):.1f} {gy(23):.1f}V124M{g(40):.1f} {gy(35):.1f}V124") + DL(f"M{g(14):.1f} 120H{g(40):.1f}") + TXT((g(14)+g(40))/2, 117, "GL", bg=True)
      + DIM(f"M{g(14):.1f} 126V142M{g(126):.1f} {gy(12):.1f}V142") + DL(f"M{g(14):.1f} 138H{g(126):.1f}") + TXT((g(14)+g(126))/2, 135, "L", bg=True)
      + LEAD(f"M{g(30):.1f} {gy(-22):.1f}L42 30H62") + TXT(46, 27, "T", anchor="start")
      + LEAD(f"M{g(116):.1f} {gy(-8):.1f}L124 32H136") + TXT(128, 29, "D", anchor="start"), cj_body)

# strain-relief gland: seal insert + tapered bending-protection sleeve with grooves
SR_CAP = "M70 -34H100V-30A22 12 0 0 1 122 -18H116L100 -26H70Z"
SR_SEAL = "M92 -24H100L114 -17.5V-8H92Z"
SR_SLV = "M114 -8V-16H122L190 -10V-8Z"
rr = lambda x: 16 - 6 * (x - 122) / 68
sr_local = (FILL(BODY_SEC, "h") + FILL(SR_CAP, "h2") + FILL(SR_SEAL, "s", GREY) + FILL(SR_SLV, "h")
    + O(BODY_SEC) + O(SR_CAP) + O(SR_SEAL) + O(SR_SLV)
    + T("M15 -19H39M71 -28H91")
    + O("M14 0V22H40V34H100V30A22 12 0 0 0 122 18V16L190 10V0")
    + O("M70 0V34M100 0V30M40 17H100M122 0V16", .9) + T("M15 19H39")
    + "".join(T(f"M{x} 0V{rr(x):.1f}") for x in range(130, 188, 8))
    + HID("M14 15H92M92 8H190") + C("M6 0H198"))
SR_S, SR_TX = .72, 4
def sr_end(ex):
    R = 34 * SR_S
    out = f'<path d="M{hexpts(ex, GY, R)}Z" fill="{TINT}" stroke="{INK}" stroke-width="1.2"/>'
    out += f'<circle cx="{ex}" cy="{GY}" r="{29.4*SR_S:.1f}" stroke="{INK}" stroke-width=".9"/>'
    out += f'<circle cx="{ex}" cy="{GY}" r="{16*SR_S:.1f}" fill="{TINT}" stroke="{INK}" stroke-width="1.2"/>'
    out += f'<circle cx="{ex}" cy="{GY}" r="{8*SR_S:.1f}" fill="#fff" stroke="{INK}" stroke-width="1.2"/>'
    return out + C(f"M{ex-R-8:.1f} {GY}H{ex+R+8:.1f}M{ex} {GY-R-8:.1f}V{GY+R+8:.1f}")
sr_body = SV(sr_local, SR_TX, GY, SR_S) + sr_end(196)
h = lambda x: SR_TX + SR_S * x
hy = lambda y: GY + SR_S * y
write("gland-sr", "Strain-relief cable gland: half-section and end view; tapered bending-protection sleeve",
      sr_body + LEAD(f"M{h(30):.1f} {hy(-22):.1f}L36 40H66") + TXT(40, 37, "PG 13.5", anchor="start"), sr_body)
write("gland-sr-key", "Strain-relief cable gland, dimension key: L, GL, D1, D2, T", sr_body
      + DIM(f"M{h(14):.1f} {hy(23):.1f}V120M{h(40):.1f} {hy(35):.1f}V120") + DL(f"M{h(14):.1f} 116H{h(40):.1f}") + TXT((h(14)+h(40))/2, 113, "GL", bg=True)
      + DIM(f"M{h(14):.1f} 122V140M{h(190):.1f} {hy(10):.1f}V140") + DL(f"M{h(14):.1f} 136H{h(190):.1f}") + TXT((h(14)+h(190))/2, 133, "L", bg=True)
      + LEAD(f"M{h(30):.1f} {hy(-22):.1f}L38 40H56") + TXT(42, 37, "T", anchor="start")
      + LEAD(f"M{h(104):.1f} {hy(-8):.1f}L84 40H98") + TXT(88, 37, "D1", anchor="start")
      + LEAD(f"M{h(188):.1f} {hy(-8):.1f}L146 40H160") + TXT(150, 37, "D2", anchor="start"), sr_body)

# pressure screw alone (dome cap nut with hex, internal thread, seal-compression cone, cable hole); PG 13.5 at 4 px/mm
cy, ex = 80, 168
ps_sec = f"M22 {cy-50.8}H74V{cy-44}A24 12 0 0 1 98 {cy-32}V{cy-27.2}H64L46 {cy-35.9}H22Z"
ps_body = (FILL(ps_sec, "h") + O(ps_sec) + T(f"M23 {cy-40.8}H46")
    + O(f"M22 {cy}V{cy+50.8}H74V{cy+44}A24 12 0 0 0 98 {cy+32}V{cy}") + O(f"M22 {cy+25.4}H74M74 {cy}V{cy+44}", .9)
    + HID(f"M22 {cy+35.9}H46L64 {cy+27.2}H98")
    + f'<path d="M{hexpts(ex, cy, 50.8)}Z" fill="{TINT}" stroke="{INK}" stroke-width="1.2"/>'
    + f'<circle cx="{ex}" cy="{cy}" r="44" stroke="{INK}" stroke-width=".9"/>'
    + f'<circle cx="{ex}" cy="{cy}" r="27.2" fill="#fff" stroke="{INK}" stroke-width="1.2"/>'
    + C(f"M14 {cy}H106M{ex-58} {cy}H{ex+58}M{ex} {cy-58}V{cy+58}"))
write("pscrew", "Pressure screw for a cable gland: half-section with internal thread and seal cone, end view", ps_body
      + DIM(f"M22 {cy+52}V152M98 {cy+33}V152") + DL("M22 148H98") + TXT(60, 145, "19", bg=True)
      + DIM(f"M124 {cy+26}V152M212 {cy+26}V152") + DL("M124 148H212") + TXT(168, 145, "AF 22", bg=True)
      + LEAD(f"M34 {cy-38}L42 18H70") + TXT(46, 15, "PG 13.5", anchor="start"), ps_body)
write("pscrew-key", "Pressure screw, dimension key: L, GL, D, T, AF", ps_body
      + DIM(f"M22 {cy+52}V152M98 {cy+33}V152") + DL("M22 148H98") + TXT(60, 145, "L", bg=True)
      + DIM(f"M124 {cy+26}V152M212 {cy+26}V152") + DL("M124 148H212") + TXT(168, 145, "AF", bg=True)
      + DIM(f"M46 {cy-35.9}V{cy-16}") + DL(f"M22 {cy-20}H46") + TXT(34, cy-23, "GL", bg=True)
      + DIM(f"M99 {cy-27.2}H112M99 {cy+27.2}H112") + DL(f"M108 {cy-27.2}V{cy+27.2}") + TXT(110, cy-6, "D", anchor="start")
      + LEAD(f"M34 {cy-38}L42 18H60") + TXT(46, 15, "T", anchor="start"), ps_body)

# ---- thread profiles for the chart pages (external thread in section, material below the profile) ----
def prof_fill(d):
    return FILL(d + "L232 132H8Z", "h") + O(d)
# metric ISO 60°, P = 64 px: crest flat P/8, root flat P/4, depth 5H/8
pts = []
for k in range(4):
    x0 = 8 + 64 * k
    pts += [(x0, 60), (x0 + 8, 60), (x0 + 28, 94.6), (x0 + 44, 94.6)]
pts = [(x, y) for x, y in pts if x <= 232]
met = "M" + " L".join(f"{x:.1f} {y:.1f}" for x, y in pts) + " L232 94.6"
met_body = prof_fill(met) + C("M4 146H236")
write("prof-metric", "Metric ISO thread profile: 60 degree flanks, pitch P, major diameter d, minor diameter d3", met_body
      + DIM("M12 56V28M76 56V28") + DL("M12 32H76") + TXT(44, 29, "P", bg=True)
      + f'<path d="M27 79A34 34 0 0 1 61 79" stroke="{INK3}" stroke-width=".5"/>' + TXT(44, 72, "60°")
      + LEAD("M140 60L156 40H178") + TXT(160, 37, "d", anchor="start")
      + LEAD("M172 94.6L186 116H190") + TXT(194, 119, "d3", anchor="start", bg=True), met_body)
# BSP Whitworth 55°, rounded crests and roots, P = 64 px
segs = ["M8 101A8.8 8.8 0 0 0 15.8 96.25"]
for xc in (40, 104, 168):
    xr = xc + 32
    segs.append(f"L{xc-7.8:.1f} 64.75A8.8 8.8 0 0 1 {xc+7.8:.1f} 64.75L{xr-7.8:.1f} 96.25A8.8 8.8 0 0 0 {xr+7.8:.1f} 96.25")
segs.append("L224.2 64.75A8.8 8.8 0 0 1 232 60")
bsp = "".join(segs)
bsp_body = prof_fill(bsp) + C("M4 146H236")
write("prof-bsp", "BSP Whitworth thread profile: 55 degree flanks, rounded crests and roots, pitch P, major diameter d, minor diameter d1", bsp_body
      + DIM("M40 56V28M104 56V28") + DL("M40 32H104") + TXT(72, 29, "P", bg=True)
      + f'<path d="M58.2 84.6A30 30 0 0 1 85.8 84.6" stroke="{INK3}" stroke-width=".5"/>' + TXT(72, 79, "55°")
      + LEAD("M168 60L182 40H202") + TXT(186, 37, "d", anchor="start")
      + LEAD("M136 101L150 120H154") + TXT(158, 123, "d1", anchor="start", bg=True), bsp_body)
# PG (DIN 40430) 80°, shallow: depth about 0.48 P; P = 64 px, crest and root flats 6.5 px
pts = []
for k in range(4):
    x0 = 8 + 64 * k
    pts += [(x0, 64), (x0 + 6.5, 64), (x0 + 32, 94.4), (x0 + 38.5, 94.4)]
pts = [(x, y) for x, y in pts if x <= 232]
pgp = "M" + " L".join(f"{x:.1f} {y:.1f}" for x, y in pts) + " L232 64"
pg_body = prof_fill(pgp) + C("M4 146H236")
write("prof-pg", "PG thread profile to DIN 40430: 80 degree flanks, shallow depth, pitch P, outside diameter d, core diameter d1", pg_body
      + DIM("M12 60V28M76 60V28") + DL("M12 32H76") + TXT(44, 29, "P", bg=True)
      + f'<path d="M58 84A30 30 0 0 1 98 84" stroke="{INK3}" stroke-width=".5"/>' + TXT(78, 79, "80°")
      + LEAD("M140 64L156 42H178") + TXT(160, 39, "d", anchor="start")
      + LEAD("M174 94.4L186 116H190") + TXT(194, 119, "d1", anchor="start", bg=True), pg_body)
# NPT 60°, taper (exaggerated here) rising to the right; P = 56 px, depth 0.8P
t = lambda x: -(x - 8) * 0.10
Cy, Ry = 58, 58 + 44.8
pts = [(8, Ry)]
for k in range(5):
    x0 = 8 + 56 * k
    for x, y in ((x0 + 2.1, Ry), (x0 + 25.9, Cy), (x0 + 30.1, Cy), (x0 + 53.9, Ry), (x0 + 58.1, Ry)):
        if x <= 232: pts.append((x, y))
npt = "M" + " L".join(f"{x:.1f} {y + t(x):.1f}" for x, y in pts)
npt_body = FILL(npt + "L232 136H8Z", "h") + O(npt) + C("M4 148H236") + T(f"M8 {Cy+22.4:.1f}L232 {Cy+22.4+t(232):.1f}")
write("prof-npt", "NPT taper pipe thread profile: 60 degree flanks, pitch P, taper 1:16 on diameter (exaggerated)", npt_body
      + DIM(f"M36 {Cy+t(36)-4:.1f}V22M92 {Cy+t(92)-4:.1f}V22") + DL("M36 26H92") + TXT(64, 23, "P", bg=True)
      + f'<path d="M50 {100.8-24.2+t(64):.1f}A28 28 0 0 1 78 {100.8-24.2+t(64):.1f}" stroke="{INK3}" stroke-width=".5"/>' + TXT(64, 70 + t(64), "60°")
      + DIM(f"M176 {Cy+t(176):.1f}H232") + LEAD(f"M214 {Cy+t(214)+.5:.1f}L206 20H180") + TXT(150, 17, "taper 1:16", anchor="start"), npt_body)

# ---- typical-part galleries for the made-to-drawing group pages (fresh UX review A5, 2026-11-22) ----------------
# Representative shapes of the part types each page already lists; not customer parts, not to a common scale.
# fittings
turned("hosebarb", "Hose-barb fitting: male thread, hex and three barbs, in section", [(10, 10.5, {"thread":1,"cham":1}), (7, 13, H_), (6, 5, {"barb":1}), (6, 5, {"barb":1}), (6, 5, {"barb":1})], bore=[(0, 35, 3.2, {})], len_label="35", dia=False, threads=[(0, "G 1/2")])
turned("socket", "Female socket: hex body, threaded both ends, with end view", [(26, 13, H_)], bore=[(0, 10, 10, {"thread":1}), (10, 16, 8, {}), (16, 26, 10, {"thread":1})], len_label="26", end=True)
turned("compression", "Compression fitting body: male thread, hex and compression thread, in section", [(10, 10.5, {"thread":1,"cham":1}), (7, 13, H_), (11, 9, {"thread":1,"cham":1})], bore=[(0, 18, 4, {}), (18, 28, 6, {})], len_label="28", dia=False, threads=[(0, "G 1/2"), (2, "M16×1.5")])
# forgings
turned("flanged", "Forged flanged body, machined: flange, neck, threaded spigot and through bore, in section", [(5, 17, {"cham":1}), (4, 13, {}), (16, 11, {"thread":1,"cham":1})], bore=[(0, 25, 7, {})], len_label="25", dia=(0, "Ø34"), threads=[(2, "G 3/4")])
vb_out = "M40 64H76V54H100L104 24H136L140 54H164V64H200V100H164V110H76V100H40Z"
vb_in = "M40 74H99.5A22 22 0 0 1 116 60.4V24H124V60.4A22 22 0 0 1 140.5 74H200V90H140.5A22 22 0 0 1 99.5 90H40Z"
vb_body = (f'<path fill-rule="evenodd" d="{vb_out} {vb_in}" fill="{TINT}" stroke="none"/><path fill-rule="evenodd" d="{vb_out} {vb_in}" fill="url(#h)" stroke="none"/>'
    + O("M40 74V64H76V54H100L104 24H116M124 24H136L140 54H164V64H200V74M200 90V100H164V110H76V100H40V90")
    + O("M40 74H99.5A22 22 0 0 1 116 60.4V24M124 24V60.4A22 22 0 0 1 140.5 74H200M200 90H140.5A22 22 0 0 1 99.5 90H40")
    + T("M40 70H62M40 94H62M178 70H200M178 94H200M76 59H100M140 59H164M76 105H164")
    + C("M30 82H210M120 14V118"))
write("valvebody", "Forged brass ball-valve body in section: two threaded ports, ball chamber and stem bore", vb_body
      + DIM("M40 104V128M200 104V128") + DL("M40 124H200") + TXT(120, 121, "L", bg=True)
      + LEAD("M190 72L200 50H222") + TXT(204, 47, "G 1/2", anchor="start"), vb_body)
mf_out = "M36 50H204V110H36Z"
mf_in = "M36 74H70V50H86V74H112V50H128V74H154V50H170V74H184L190 82L184 90H36Z"
mf_body = (f'<path fill-rule="evenodd" d="{mf_out} {mf_in}" fill="{TINT}" stroke="none"/><path fill-rule="evenodd" d="{mf_out} {mf_in}" fill="url(#h)" stroke="none"/>'
    + O("M36 74V50H70M86 50H112M128 50H154M170 50H204V110H36V90")
    + O("M36 74H70V50M86 50V74H112V50M128 50V74H154V50M170 50V74H184L190 82L184 90H36")
    + T("M36 70H54M36 94H54M66 50V64M90 50V64M108 50V64M132 50V64M150 50V64M174 50V64")
    + C("M28 82H198M78 40V100M120 40V100M162 40V100"))
write("manifold", "Forged brass manifold in section: blind inlet bore and three threaded outlets", mf_body
      + DIM("M36 114V134M204 114V134") + DL("M36 130H204") + TXT(120, 127, "L", bg=True)
      + LEAD("M88 54L100 30H128") + TXT(104, 27, "3 × G 1/4", anchor="start"), mf_body)
# moulding inserts
turned("pressinsert", "Press-in insert: straight knurl, lead-in chamfer, threaded bore, in section", [(2, 3.6, {"cham":1}), (12, 4.2, {"knurl":1,"cham":1})], bore=[(0, 14, 1.7, {"thread":1})], len_label="14", dia=(1, "Ø8.4"))
turned("flangedinsert", "Flanged moulding insert: flange and knurled body, threaded bore, in section", [(2, 6, {"cham":1}), (10, 4.2, {"knurl":1,"cham":1})], bore=[(0, 12, 1.7, {"thread":1})], len_label="12", dia=(0, "Ø12"))
turned("hexinsert", "Hexagonal moulding insert with a pull-out groove, with end view", [(5, 5.2, H_), (2.5, 4, {}), (5, 5.2, H_)], bore=[(0, 12.5, 2, {"thread":1})], len_label="12.5", end=True)
turned("efinsert", "Terminal insert for electrofusion couplings: pin and knurled anchor, in section", [(10, 2.4, {"cham":1}), (8, 4.5, {"knurl":1,"cham":1}), (4, 3, {"cham":1})], len_label="22", dia=(1, "Ø9"))
turned("pipeinsert", "Female threaded insert for PE and PP pipe fittings: knurled body, internal thread, in section", [(2, 14, {"cham":1}), (18, 13, {"knurl":1,"cham":1})], bore=[(0, 20, 9.5, {"thread":1})], len_label="20", dia=(0, "Ø28"))
# electrical
nl_body = (f'<rect x="30" y="66" width="180" height="28" fill="{TINT}" stroke="{INK}" stroke-width="1.2"/>'
    + "".join(f'<circle cx="{x}" cy="80" r="7" fill="#fff" stroke="{INK}" stroke-width="1.2"/>' + T(f"M{x-5} 80H{x+5}") for x in (48, 77, 106, 135, 164, 193))
    + C("M22 80H218"))
write("neutrallink", "Brass neutral link, plan view: bar with six clamping screws", nl_body
      + DIM("M30 98V120M210 98V120") + DL("M30 116H210") + TXT(120, 113, "L", bg=True)
      + LEAD("M82 74L96 46H124") + TXT(100, 43, "6 × M4", anchor="start"), nl_body)
eb_body = (f'<rect x="50" y="60" width="140" height="44" fill="{TINT}" stroke="{INK}" stroke-width="1.2"/>'
    + HID("M50 76H190M50 90H190M114 60V104M126 60V104")
    + "".join(f'<path d="M{x-8} 60V54Q{x-8} 48 {x-2} 48H{x+2}Q{x+8} 48 {x+8} 54V60Z" fill="#fff" stroke="{INK}" stroke-width="1.2"/>' + T(f"M{x-3} 48V52H{x+3}V48") for x in (80, 160))
    + C("M42 83H198M120 40V112M80 40V70M160 40V70"))
write("earthblock", "Brass earth block, front view: cable bore, two clamping screws and a mounting hole", eb_body
      + DIM("M50 108V128M190 108V128") + DL("M50 124H190") + TXT(120, 121, "L", bg=True)
      + LEAD("M168 52L180 32H206") + TXT(184, 29, "2 × M5", anchor="start"), eb_body)
# fasteners
def _slot(X, cy, sc):
    return O(f"M{X(0):.1f} {cy - .5*sc:.1f}H{X(1.4):.1f}V{cy + .5*sc:.1f}H{X(0):.1f}", .9)
turned("screw", "Slotted cheese-head machine screw, exterior view", [(4, 4.2, {"cham":1}), (18, 2.5, {"thread":1,"cham":1})], len_label="22", dia=False, threads=[(1, "M5")], section=False, extra=_slot)
turned("hexnut", "Brass hex nut, section and end view", [(6.5, 6.9, H_)], bore=[(0, 6.5, 4, {"thread":1})], len_label="6.5", end=True)
turned("washer", "Plain brass washer, section and plan view", [(2, 8, {})], bore=[(0, 2, 4.2, {})], len_label="2", end=True)
turned("anchor", "Brass anchor: knurled sleeve with internal thread, in section", [(2, 4.5, {"cham":1}), (16, 4.2, {"knurl":1}), (4, 3.6, {"cham":1})], bore=[(0, 22, 2.5, {"thread":1})], len_label="22", dia=(0, "Ø9"))
# stampings
fc_path = "M92 58L74 66V102H166V66L148 58"
fc_body = (f'<path d="{fc_path}" stroke="{INK}" stroke-width="6" fill="none"/><path d="{fc_path}" stroke="{TINT}" stroke-width="3.6" fill="none"/>'
    + C("M120 44V116"))
write("fuseclip", "Stamped brass fuse clip, side view: base and two spring arms", fc_body
      + DIM("M74 108V128M166 108V128") + DL("M74 124H166") + TXT(120, 121, "W", bg=True)
      + LEAD("M163 82L184 70H206") + TXT(188, 67, "t 0.5", anchor="start"), fc_body)
cp_body = (f'<path d="M40 72H130V92H40Z" fill="{TINT}" stroke="none"/>' + O("M40 72H130V92H40Z")
    + T("M40 82H112") + O("M130 76H142V70H196V94H142V88H130", .9)
    + f'<path d="M142 70H196V94H142Z" fill="{TINT}" stroke="none"/>' + O("M142 70H196V94H142Z")
    + T("M152 70V94M162 70V94M172 70V94M182 70V94") + C("M30 82H206"))
write("crimppin", "Stamped and rolled female crimp pin, side view: contact tube and crimp barrel", cp_body
      + DIM("M40 96V122M196 98V122") + DL("M40 118H196") + TXT(118, 115, "L", bg=True)
      + LEAD("M60 74L70 52H96") + TXT(74, 49, "slotted contact", anchor="start"), cp_body)

print("written", len(os.listdir(BASE)) - 1, "drawings + thumbnails")
