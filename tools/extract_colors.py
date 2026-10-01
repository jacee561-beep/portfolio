"""
extract_colors.py — pull each piece's real accent colour out of its own frame.

The site's colour comes from Jacob's footage, not from a brand palette I
invented. Every card carries the dominant vivid colour of the work itself, and
the page picks up the colour of whatever you are looking at.

Method: decode the poster down to 24x24 raw RGB with ffmpeg (no Pillow), then
score every pixel on saturation x a mid-tone weight. Near-black and near-white
pixels are worthless as an accent, and so is a muddy mid-grey, so the score
rewards colourfulness and punishes both ends of the luma range. Writes
`accent: "#rrggbb"` onto every manifest entry.

Idempotent — safe to re-run after posters change.
"""
import colorsys
import re
import subprocess
import sys
from pathlib import Path

ROOT = Path(__file__).resolve().parent.parent
PUB = ROOT / "public"
POSTERS = PUB / "assets" / "posters"
MANIFEST = PUB / "assets" / "manifest.js"

FFMPEG = Path(
    r"C:\Users\Khanna House Studios\Documents\Jerry the opus clone"
    r"\.venv\Lib\site-packages\imageio_ffmpeg\binaries\ffmpeg-win-x86_64-v7.1.exe"
)
N = 24  # sample grid


def sample(path):
    """N*N RGB triples straight from ffmpeg, or None."""
    r = subprocess.run(
        [str(FFMPEG), "-hide_banner", "-loglevel", "error", "-i", str(path),
         "-vf", f"scale={N}:{N}:flags=area", "-frames:v", "1",
         "-f", "rawvideo", "-pix_fmt", "rgb24", "-"],
        capture_output=True)
    b = r.stdout
    if len(b) < N * N * 3:
        return None
    return [(b[i], b[i + 1], b[i + 2]) for i in range(0, N * N * 3, 3)]


def accent_of(px):
    """The most usable vivid colour in the frame."""
    best, best_score = None, -1.0
    for (r, g, b) in px:
        h, l, s = colorsys.rgb_to_hls(r / 255, g / 255, b / 255)
        # a mid-luma pixel makes a usable accent; black and white do not
        mid = 1.0 - abs(l - 0.5) * 2.0
        score = (s ** 1.4) * (0.35 + 0.65 * mid)
        if score > best_score:
            best, best_score = (h, l, s), score
    if not best:
        return None
    h, l, s = best
    # normalise into a range that reads well on a dark page
    l = min(max(l, 0.46), 0.66)
    s = min(max(s, 0.55), 0.95)
    r, g, b = colorsys.hls_to_rgb(h, l, s)
    return "#%02x%02x%02x" % (round(r * 255), round(g * 255), round(b * 255))


def main():
    src = MANIFEST.read_text(encoding="utf-8")
    ids = re.findall(r'id:\s*"([^"]+)"', src)
    print(f"{len(ids)} entries\n")

    out, hit, miss = src, 0, 0
    for i, pid in enumerate(ids, 1):
        p = POSTERS / f"{pid}.jpg"
        if not p.exists():
            continue
        px = sample(p)
        col = accent_of(px) if px else None
        if not col:
            miss += 1
            continue
        blk = re.search(r'(\{[^{}]*id:\s*"' + re.escape(pid) + r'"[^{}]*\})', out, re.S)
        if not blk:
            continue
        t = blk.group(1)
        n = re.sub(r',\s*accent:\s*"[^"]*"', '', t)          # idempotent
        n = re.sub(r'(orientation:\s*"[^"]+")', r'\1, accent: "' + col + '"', n, count=1)
        if n != t:
            out = out.replace(t, n, 1)
            hit += 1
        if i % 50 == 0:
            print(f"  {i}/{len(ids)}")

    if out != src:
        MANIFEST.write_text(out, encoding="utf-8")
    print(f"\naccent written on {hit} entries ({miss} unreadable)")


if __name__ == "__main__":
    sys.exit(main())
