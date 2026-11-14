#!/usr/bin/env python3
"""Launch guard: lists everything in the pages that must not reach the live site.

Blocks launch on: review notes (.rnote), TBC chips (.tbc), wording-to-confirm underlines (.vfy), photo placeholders (.ph),
references to the old site, question numbers, and the words TBC / "to confirm" in visible text.
Usage:  python3 tools/check_launch.py [dir]      (report, exit 1 if anything is found; default dir = design/;
        the site build runs it on site/dist, every pre-rendered page)
In the React build this runs on the pre-rendered HTML in CI; the build fails until the report is empty.
"""
import glob, html, os, re, sys

ROOT = sys.argv[1] if len(sys.argv) > 1 else os.path.join(os.path.dirname(__file__), "..")
SKIP = {"review.html", "_la.html", "_frame.html"}
CLASSES = {"rnote": "review note", "tbc": "TBC chip", "vfy": "wording to confirm", "ph": "photo placeholder"}
TEXT = [
    (r"previous (catalogue|site|datasheet|technical library)|old site", "old-site reference"),
    (r"\bquestions? [A-C]?\d+(\.\d+)?\b|\(Q\d+\)|\b[BC]\d{1,2}\b\)", "question number"),
    (r"\bTBC\b", "TBC in text"),
    (r"\bto confirm\b", '"to confirm" in text'),
]

def visible(s):
    s = re.sub(r"<(script|style)\b.*?</\1>", "", s, flags=re.S)
    return html.unescape(re.sub(r"<[^>]+>", " ", s))

def main():
    total = 0
    for path in sorted(glob.glob(os.path.join(ROOT, "**", "*.html"), recursive=True)):
        name = os.path.relpath(path, ROOT)
        if name in SKIP or any(part.startswith("_") for part in name.split(os.sep)):
            continue
        src = open(path, encoding="utf-8").read()
        found = {}
        for cls, label in CLASSES.items():
            n = len(re.findall(rf'class="[^"]*\b{cls}\b[^"]*"', src))
            if n: found[label] = n
        metas = " ".join(re.findall(r'<meta name="description" content="([^"]*)"', src))
        text = visible(src) + " " + html.unescape(metas)
        for pat, label in TEXT:
            n = len(re.findall(pat, text, flags=re.I))
            if n: found[label] = found.get(label, 0) + n
        if found:
            total += sum(found.values())
            print(f"{name:40} " + " · ".join(f"{k} {v}" for k, v in found.items()))
    # shared header, mega menu, mobile nav and footer are injected by partials.js on every page
    jp = os.path.join(ROOT, "partials.js")
    js = open(jp, encoding="utf-8").read() if os.path.exists(jp) else ""
    found = {}
    for cls, label in CLASSES.items():
        n = len(re.findall(rf'class="[^"]*\b{cls}\b[^"]*"', js))
        if n: found[label] = n
    for pat, label in TEXT:
        n = len(re.findall(pat, visible(js), flags=re.I))
        if n: found[label] = found.get(label, 0) + n
    if found:
        total += sum(found.values())
        print(f"{'partials.js':22} " + " · ".join(f"{k} {v}" for k, v in found.items()))
    print(f"\n{total} launch blockers" if total else "clean: nothing internal left in the pages")
    return 1 if total else 0

if __name__ == "__main__":
    sys.exit(main())
