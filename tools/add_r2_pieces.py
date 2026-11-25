"""Add the Nov 25, 2026 studio-PC pieces (on R2, served from media.jacobgonzales.tv) to public/assets/manifest.js.
Input: manifest-new.csv (from R2: web_name,id,client,orig_file,duration_s,width,height,size_mb,excerpt) +
outputs/business/creative-services/picker/shortlist_all.json (dates). Ids become "m-<web_name>" (common.js: isRemote).
Accent = average colour of the poster. Idempotent: replaces the block between the R2 markers.
    python tools/add_r2_pieces.py manifest-new.csv"""
import csv, json, re, sys, io, urllib.request
from pathlib import Path
from PIL import Image
ROOT = Path(__file__).resolve().parents[1]; MAN = ROOT / "public/assets/manifest.js"
SL = json.load(open(r"C:/Users/jacee/Downloads/cluade stuff/outputs/business/creative-services/picker/shortlist_all.json", encoding="utf-8"))
date_of = {c["id"]: c["date"] for c in SL}
# studio folder -> (client name as the site writes it, category)
MAP = {"THE NRG POD": ("NRG Podcast", "podcast"), "BUGSY": ("Bugsy Pest Control", "social"), "MOLE": ("Mole", "social"),
 "COFFEE WITH KELLY": ("Coffee with Kelly", "podcast"), "DR JIVEH DETAIL": ("Dr. Jiveh", "social"),
 "LITERACY COALITION": ("Literacy Coalition", "nonprofit"), "WELLINGTON BAY": ("Wellington Bay", "corporate"),
 "HONA 2026": ("HONA Awards", "nonprofit"), "HONA 2025": ("HONA Awards", "nonprofit"), "INSIGHT": ("inSIGHT Education", "interviews"),
 "TITHING TREE": ("Tithing Tree", "corporate"), "PBCMSS - SBRIT": ("PBCMSS", "nonprofit"), "WE JUST MET": ("We Just Met", "podcast"),
 "KHS Showcase - Nonprofit and PR": ("Khanna House Studios", "nonprofit"), "DR. ANN": ("Dr. Ann", "social"),
 "DR AMNMMMNMSNADNMANSDMANSMDNANSMDNANSMDNNMANSDM": ("Dr. Ann", "social"), "SOJOURNERS": ("Sojourners", "interviews"),
 "Cattle Car Vid": ("Cattle Car Project", "nonprofit"), "CEO DISCOVERY": ("CEO Discovery", "corporate"),
 "WHOLE YOU BEFORE TWO": ("WYBT", "social"), "DR. SHAW": ("Dr. Shaw", "social"), "DR.SHAW Reels": ("Dr. Shaw", "social"),
 "YVANIA": ("Yvania", "corporate"), "CHILDRENS SERVICES COUNCIL": ("Children's Services Council", "podcast"),
 "PEOPLE OF PURPOSE": ("People of Purpose", "nonprofit"), "CCH CRIB DONATION VIDEO": ("Clinics Can Help", "nonprofit"),
 "CCH HOT DAY CRIB": ("Clinics Can Help", "nonprofit"), "CLINICS CAN HELP": ("Clinics Can Help", "nonprofit"),
 "365 WELLNESS": ("365 Wellness", "social"), "ALZ RECAP": ("Alzheimer's Walk", "nonprofit"),
 "MICHELE POOLE FINISHING": ("Michele Poole", "nonprofit"), "SPARKED JENEL": ("Sparked", "corporate"), "MARK": ("Mark", "social"),
 "MASTERCLASS": ("Unprecedented Masterclass", "corporate"), "60 secs": ("60 Seconds", "interviews"),
 "NON PRO Event recap section": ("HONA Awards", "nonprofit"), "jenilee lash": ("Jenilee Lash", "social"),
 "PROMISEFUND": ("Promisefund", "nonprofit"), "CHILDRENS HARBOR": ("Children's Harbor", "nonprofit"),
 "JULIE DIGITAL BUS CARD EXAMPLE": ("Khanna House Studios", "motion"), "FABY DIALLO": ("Faby Diallo", "social"),
 "ELITE": ("Elite Oral Surgery", "social"), "MENTAL MILLENNIALS": ("Mental Millennials", "podcast"),
 "WealthXcelerate Launch": ("WealthXcelerate", "corporate")}
NOISE = re.compile(r"\b(v\d+[a-z]?|b\d+|final|finl|fix|new|export|for cap ?cut|for cap|edits?|revised|re|rev|1080p?|4k|2160p?|720p?|master|mobile|phone|vertical|9x16|16x9|cam a|take \d+)\b", re.I)
def title_of(orig, client):
    t = Path(orig).stem.replace("_", " ").replace("-", " ")
    t = NOISE.sub(" ", t); t = re.sub(r"\s+", " ", t).strip(" -_.")
    for w in client.split():
        if len(w) > 3: t = re.sub(re.escape(w), "", t, flags=re.I)
    t = re.sub(r"\s+", " ", t).strip(" -_.")
    if not t or t.isdigit(): t = f"Piece {t}" if t else "Reel"
    return t[:1].upper() + t[1:]
def accent(name):
    try:
        b = urllib.request.urlopen(urllib.request.Request(f"https://media.jacobgonzales.tv/p/{urllib.request.quote(name)}.jpg", headers={"User-Agent": "Mozilla/5.0"}), timeout=20).read()
        im = Image.open(io.BytesIO(b)).convert("RGB").resize((32, 32)); px = list(im.getdata())
        px.sort(key=lambda p: max(p) - min(p)); r, g, bb = [sum(c) // len(px[-200:]) for c in zip(*px[-200:])]
        return f"#{r:02x}{g:02x}{bb:02x}"
    except Exception: return "#7a7a7a"
def mmss(s): s = int(round(float(s))); return f"{s // 60}:{s % 60:02d}"
rows = list(csv.DictReader(open(sys.argv[1], encoding="utf-8")))
out = []
for r in rows:
    cl, cat = MAP.get(r["client"], (r["client"].title(), "social"))
    w, h = int(r["width"]), int(r["height"]); ex = r.get("excerpt", "no").lower() == "yes"
    t = title_of(r["orig_file"], cl) + (" (excerpt)" if ex else "")
    out.append(f'''  {{
    id: {json.dumps("m-" + r["web_name"])},
    category: "{cat}",
    client: {json.dumps(cl)},
    title: {json.dumps(t)},
    blurb: {json.dumps("Excerpt from a longer piece." if ex else "")},
    role: "Edit", year: {json.dumps((date_of.get(r["id"]) or "2026")[:4])},
    orientation: "{"portrait" if h > w else "landscape"}", accent: "{accent(r["web_name"])}", w: {w}, h: {h}, dur: "{mmss(r["duration_s"] if not ex else 90)}"
  }},''')
s = MAN.read_text(encoding="utf-8")
block = "  // ---- R2 START (Nov 25, 2026 studio-PC pieces; tools/add_r2_pieces.py) ----\n" + "\n".join(out) + "\n  // ---- R2 END ----\n"
if "R2 START" in s: s = re.sub(r"  // ---- R2 START.*?// ---- R2 END ----\n", block, s, flags=re.S)
else:
    i = s.index("];\n\nconst CATEGORIES"); s = s[:i] + block + s[i:]
MAN.write_text(s, encoding="utf-8"); print(len(out), "pieces written")
