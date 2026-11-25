"""Tidy the generated titles of the R2 pieces in manifest.js (Nov 25, 2026): title-case shouting names, drop hash /
tool tokens, and give unreadable ones '<Client> reel N'. Runs on the R2 block only."""
import re, collections
from pathlib import Path
P = Path(__file__).resolve().parents[1] / "public/assets/manifest.js"
s = P.read_text(encoding="utf-8")
a, b = s.index("// ---- R2 START"), s.index("// ---- R2 END")
blk = s[a:b]; n = collections.Counter()
SMALL = {"a", "an", "and", "the", "of", "to", "in", "on", "for", "with", "at", "is", "it", "vs"}
def tidy(client, t):
    ex = t.endswith(" (excerpt)"); t = t.replace(" (excerpt)", "")
    t = re.sub(r"\(?auphonic audio\)?|\bclip [0-9a-f]{5,}\b|\b[0-9a-f]{6,}\b|\bc\d{4,}\b|\bfor filters\b|\bbfuh\b", " ", t, flags=re.I)
    t = re.sub(r"\bep\s*(\d+)\b", r"Episode \1", t, flags=re.I)
    t = re.sub(r"\bdec\s*(\d+)\b", r"Dec \1:", t, flags=re.I)
    t = re.sub(r"\s+", " ", t).strip(" -_.:()")
    t = re.sub(r"\b(f\d|x\d+|s\d|v\d+|\d{3,}|main|compat|custom|captions?|silent|wims|yt)\b", " ", t, flags=re.I)
    t = re.sub(r"\s+", " ", t).strip(" -_.:()")
    KEEP = {"NRG", "KHS", "CEO", "HONA", "CSC", "PBCMSS", "TV", "WYBT", "ALZ", "CCH"}
    t = " ".join(w if w in KEEP else (w.capitalize() if (i == 0 or w.lower() not in SMALL) else w.lower()) if (w.isupper() and len(w) > 1) or w.islower() else w
                 for i, w in enumerate(t.split()))
    real = [w for w in t.split() if re.fullmatch(r"[A-Za-z'’]{3,}", w) and w.lower() not in {"reel", "episode", "interview", "module", "dec", "piece", "clip", "rough"}]
    if len(real) < 2: t = ""
    t = re.sub(r":\s*$", "", t)
    if len(re.sub(r"[^A-Za-z]", "", t)) < 4 or re.fullmatch(r"(piece|reel)?\s*\d*", t, re.I):
        n[client] += 1; t = f"{client} reel {n[client]}"
    return t + (" (excerpt)" if ex else "")
def rep(m):
    return f'client: {m.group(1)},\n    title: "{tidy(m.group(1).strip(chr(34)), m.group(2))}"'
blk = re.sub(r'client: ("[^"]+"),\n    title: "([^"]*)"', rep, blk)
P.write_text(s[:a] + blk + s[b:], encoding="utf-8")
t = re.findall(r'title: "([^"]*)"', blk); print(len(t)); print(t[::25])
