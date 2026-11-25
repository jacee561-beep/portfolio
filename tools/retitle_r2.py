"""One-pass retitle of the R2 block from manifest-new.csv originals (title_of from add_r2_pieces + tidy from fix_r2_titles),
then numbers any repeated title. Usage: python tools/retitle_r2.py <manifest-new.csv>"""
import csv, re, collections, sys
from pathlib import Path
T = Path(__file__).resolve().parent
rows = {r["web_name"]: r for r in csv.DictReader(open(sys.argv[1], encoding="utf-8"))}
ns = {"__file__": str(T / "add_r2_pieces.py"), "__name__": "x"}
exec(compile(open(T / "add_r2_pieces.py", encoding="utf-8").read().split("rows = list(csv.DictReader")[0], "add", "exec"), ns)
fs = {"__file__": str(T / "fix_r2_titles.py"), "__name__": "x"}
src = open(T / "fix_r2_titles.py", encoding="utf-8").read().split("def rep(m):")[0].replace("blk = s[a:b]; n = collections.Counter()", "n = collections.Counter()")
exec(compile(src, "fix", "exec"), fs)
P = T.parent / "public/assets/manifest.js"; s = P.read_text(encoding="utf-8")
a, b = s.index("// ---- R2 START"), s.index("// ---- R2 END"); blk = s[a:b]
seen = collections.Counter()
def rep(m):
    r = rows[m.group(1)]; cl, _ = ns["MAP"].get(r["client"], (r["client"].title(), "social"))
    t = fs["tidy"](cl, ns["title_of"](r["orig_file"], cl) + (" (excerpt)" if r["excerpt"].lower() == "yes" else "")).replace('"', "'")
    seen[t] += 1
    if seen[t] > 1: t = t.replace(" (excerpt)", "") + f" ({seen[t]})" + (" (excerpt)" if "(excerpt)" in t else "")
    return m.group(0).split('title: "')[0] + 'title: "' + t + '"'
blk = re.sub(r'id: "m-([^"]+)",\n    category: "\w+",\n    client: "[^"]+",\n    title: "[^"]*"', rep, blk)
P.write_text(s[:a] + blk + s[b:], encoding="utf-8")
t = re.findall(r'title: "([^"]*)"', blk); c = collections.Counter(t)
print(len(t), "dups", sum(v - 1 for v in c.values() if v > 1)); print(t[::25])
