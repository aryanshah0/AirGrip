#!/usr/bin/env python3
"""Copy design/ into share/preview and add the preview-only noindex meta and banner."""
import pathlib, re, subprocess, sys
root = pathlib.Path("/Users/aryanshah/Desktop/AirGrip/Code")
src, dst = root / "design", root / "share/preview"
subprocess.run(["rsync", "-a", "--delete",
    "--exclude", "_*", "--exclude", "tools", "--exclude", ".git", "--exclude", "index.html",
    "--exclude", "robots.txt", "--exclude", ".nojekyll", "--exclude", "review.html", "--exclude", ".DS_Store",
    f"{src}/", f"{dst}/"], check=True)
(dst / "review.html").unlink(missing_ok=True)
META = '<meta name="robots" content="noindex, nofollow">'
BANNER = ('<div style="background:#B8862F;color:#15181E;font:600 13px/1.4 Archivo,system-ui,sans-serif;'
          'text-align:center;padding:7px 16px">Design preview for AirGrip · not the live website · '
          'forms don\'t send anything · <a href="index.html" style="color:inherit">all pages</a></div>')
n = 0
for p in sorted(dst.glob("*.html")):
    if p.name == "index.html":
        continue
    t = p.read_text()
    if META not in t:
        t = re.sub(r'(<meta charset="utf-8">)', r'\1\n' + META, t, count=1)
    if "Design preview for AirGrip" not in t:
        t, k = re.subn(r'(<body[^>]*>)', r'\1\n' + BANNER, t, count=1)
        assert k == 1, p
    assert META in t, p
    p.write_text(t); n += 1
print(n, "pages prepared")
