import pathlib, re, subprocess, sys, tempfile, html
D = pathlib.Path(sys.argv[1] if len(sys.argv) > 1 else "/Users/aryanshah/Desktop/AirGrip/Code/design")
pages = sorted(p for p in D.glob("*.html") if not p.name.startswith("_"))
ids = {p.name: set(re.findall(r'\bid="([^"]+)"', p.read_text())) for p in pages}
js = (D / "partials.js").read_text()
probs = []
for p in pages:
    t = p.read_text()
    if t.count("<h1") != 1 and p.name not in ("index.html",): probs.append(f"{p.name}: h1 x{t.count('<h1')}")
    for tag in ("p", "section", "div", "tr", "table", "ul", "dl", "details", "main"):
        o = len(re.findall(rf"<{tag}[\s>]", t)); c = t.count(f"</{tag}>")
        if o != c: probs.append(f"{p.name}: <{tag}> {o} open / {c} close")
    for h in re.findall(r'(?:href|src|srcset)="([^"]+)"', t):
        if h.startswith(("http", "mailto:", "tel:", "data:", "#", "javascript")) or "${" in h: 
            if h.startswith("#") and len(h) > 1 and h[1:] not in ids[p.name] and h != "#cookies": probs.append(f"{p.name}: anchor {h}")
            continue
        f, _, a = h.split("?")[0].partition("#")
        if f and not (D / f).exists(): probs.append(f"{p.name}: missing {f}")
        elif a and f.endswith(".html") and a not in ids.get(f, set()) and a != "cookies": probs.append(f"{p.name}: anchor {h}")
    for i, s in enumerate(re.findall(r"<script>(.*?)</script>", t, re.S)):
        with tempfile.NamedTemporaryFile("w", suffix=".js", delete=False) as tf: tf.write(s)
        r = subprocess.run(["node", "--check", tf.name], capture_output=True, text=True)
        if r.returncode: probs.append(f"{p.name}: script {i} {r.stderr.splitlines()[-1] if r.stderr else ''}")
    for tb in re.findall(r"<table.*?</table>", t, re.S):
        hd = re.search(r"<thead>.*?</thead>", tb, re.S)
        if not hd: continue
        n = len(re.findall(r"<th[\s>]", hd.group(0)))
        for row in re.findall(r"<tr[\s>].*?</tr>", tb.split("</thead>")[-1], re.S):
            cells = re.findall(r"<t[dh](?:\s[^>]*)?>", row); span = sum(int(re.search(r'colspan="(\d+)"', c).group(1)) if "colspan" in c else 1 for c in cells)
            if span != n: probs.append(f"{p.name}: table row {span} cells vs {n} headers"); break
r = subprocess.run(["node", "--check", str(D / "partials.js")], capture_output=True, text=True)
if r.returncode: probs.append("partials.js syntax")
print(f"{len(pages)} pages;", "structure OK" if not probs else "\n".join(probs))
