"""Nov 25, 2026 review of the 365 R2 pieces (Jacob: 'figure out what's really bad to show, what's not needed').
Drops: dark / blank / black posters, screen recordings of an editor or a document, near-repeats; then caps each client
so no single client floods the grid (finals before 90 s excerpts)."""
import re, json, collections
from pathlib import Path
P = Path(__file__).resolve().parents[1] / "public/assets/manifest.js"
s = P.read_text(encoding="utf-8"); a, b = s.index("  // ---- R2 START"), s.index("  // ---- R2 END")
head = s[a:].split("\n", 1)[0]
ents = re.findall(r"(  \{\n    id: \"m-([^\"]+)\",\n    category: \"\w+\",\n    client: \"([^\"]+)\",\n    title: \"([^\"]*)\".*?\n  \},\n)", s[a:b], re.S)
BAD = {189, 192, 193, 194, 195, 198, 203, 227, 261, 328, 345, 346, 97, 108, 112, 120, 129, 130, 277, 278, 279, 14}
CAP = {"NRG Podcast": 16, "Bugsy Pest Control": 12, "Mole": 12, "HONA Awards": 10, "Coffee with Kelly": 3, "Wellington Bay": 6,
       "Dr. Shaw": 8, "PBCMSS": 6, "Dr. Ann": 10, "CEO Discovery": 6, "WYBT": 5, "inSIGHT Education": 6, "Literacy Coalition": 10,
       "Tithing Tree": 8, "Children's Services Council": 2, "People of Purpose": 5, "Dr. Jiveh": 6}
keep_idx = [i for i in range(len(ents)) if i not in BAD]
by = collections.defaultdict(list)
for i in keep_idx: by[ents[i][2]].append(i)
final = set()
for cl, idx in by.items():
    idx.sort(key=lambda i: ("(excerpt)" in ents[i][3], i))
    final.update(idx[:CAP.get(cl, 99)])
new = "".join(e[0] for i, e in enumerate(ents) if i in final)
P.write_text(s[:a] + head + "\n" + new + s[b:], encoding="utf-8")
c = collections.Counter(ents[i][2] for i in final)
print(len(ents), "->", len(final)); print(dict(c.most_common()))
