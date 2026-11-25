"""Drop near-duplicate R2 pieces (same client, same-looking poster within a few seconds of length) from manifest.js.
Keeps the one with the most readable title (not '<client> reel N'). Nov 25, 2026."""
import re, io, urllib.request, urllib.parse
from concurrent.futures import ThreadPoolExecutor
from pathlib import Path
from PIL import Image
P = Path(__file__).resolve().parents[1] / "public/assets/manifest.js"
s = P.read_text(encoding="utf-8"); a, b = s.index("  // ---- R2 START"), s.index("  // ---- R2 END")
head, blk = s[a:].split("\n", 1)[0], s[a:b]
items = re.findall(r"  \{\n    id: \"m-([^\"]+)\",.*?\n  \},\n", blk, re.S)
ents = re.findall(r"(  \{\n    id: \"m-([^\"]+)\",\n    category: \"\w+\",\n    client: \"([^\"]+)\",\n    title: \"([^\"]*)\".*?dur: \"(\d+):(\d+)\"\n  \},\n)", blk, re.S)
def ahash(web):
    u = "https://media.jacobgonzales.tv/p/" + urllib.parse.quote(web) + ".jpg"
    try:
        im = Image.open(io.BytesIO(urllib.request.urlopen(urllib.request.Request(u, headers={"User-Agent": "Mozilla/5.0"}), timeout=20).read())).convert("L").resize((16, 16))
        px = list(im.getdata()); m = sum(px) / len(px); return sum(1 << i for i, p in enumerate(px) if p > m)
    except Exception: return None
with ThreadPoolExecutor(16) as ex: hs = list(ex.map(lambda e: ahash(e[1]), ents))
keep, drop = [], set()
def score(e): return (0 if re.search(r" reel \d+", e[3]) else 1, len(e[3]))
for i, e in enumerate(ents):
    if i in drop or hs[i] is None: continue
    for j in range(i + 1, len(ents)):
        f = ents[j]
        if j in drop or hs[j] is None or f[2] != e[2]: continue
        d1, d2 = int(e[4]) * 60 + int(e[5]), int(f[4]) * 60 + int(f[5])
        if abs(d1 - d2) <= 3 and bin(hs[i] ^ hs[j]).count("1") <= 20:
            drop.add(j if score(e) >= score(f) else i)
            if i in drop: break
new = "".join(e[0] for k, e in enumerate(ents) if k not in drop)
P.write_text(s[:a] + head + "\n" + new + s[b:], encoding="utf-8")
print(len(ents), "->", len(ents) - len(drop), "dropped", len(drop))
for k in sorted(drop)[:15]: print("  -", ents[k][2], "|", ents[k][3])
