"""
build_meta.py — enrich manifest.js with the facts the new design needs.

Writes three fields onto every REELS entry:
  w, h   real poster pixel dimensions, read straight from the JPEG SOF marker
         (stdlib only — no Pillow). The design sets aspect-ratio from these so
         mixed portrait/landscape cards never crop or shift.
  dur    runtime as "M:SS", parsed from ffmpeg's stderr (no ffprobe shipped).

Also reports posters that are effectively black — frame-0 grabs off a fade-in —
so they can be re-grabbed a few seconds in.

Idempotent: safe to re-run. Only rewrites manifest.js if something changed.
"""
import json
import os
import re
import struct
import subprocess
import sys
from pathlib import Path

ROOT = Path(__file__).resolve().parent.parent
PUB = ROOT / "public"
POSTERS = PUB / "assets" / "posters"
VIDEO = PUB / "assets" / "video"
MANIFEST = PUB / "assets" / "manifest.js"

FFMPEG = Path(
    r"C:\Users\Khanna House Studios\Documents\Jerry the opus clone"
    r"\.venv\Lib\site-packages\imageio_ffmpeg\binaries\ffmpeg-win-x86_64-v7.1.exe"
)


def jpeg_size(path):
    """(width, height) from the first SOF marker. Returns None if unreadable."""
    try:
        with open(path, "rb") as f:
            if f.read(2) != b"\xff\xd8":
                return None
            while True:
                b = f.read(1)
                if not b:
                    return None
                if b != b"\xff":
                    continue
                while b == b"\xff":
                    b = f.read(1)
                marker = b[0]
                # SOF0..SOF15 carry the dimensions; skip the non-SOF ones.
                if marker in (0xC4, 0xC8, 0xCC) or not (0xC0 <= marker <= 0xCF):
                    seg = f.read(2)
                    if len(seg) < 2:
                        return None
                    f.seek(struct.unpack(">H", seg)[0] - 2, os.SEEK_CUR)
                    continue
                f.seek(3, os.SEEK_CUR)  # length(2) + precision(1)
                h, w = struct.unpack(">HH", f.read(4))
                return w, h
    except Exception:
        return None


def run_ffmpeg(args):
    return subprocess.run(
        [str(FFMPEG)] + args,
        capture_output=True,
        text=True,
        encoding="utf-8",
        errors="replace",
    )


DUR_RE = re.compile(r"Duration:\s*(\d+):(\d+):(\d+)\.(\d+)")


def duration(path):
    """Runtime as 'M:SS'. None if ffmpeg cannot read it."""
    m = DUR_RE.search(run_ffmpeg(["-hide_banner", "-i", str(path)]).stderr)
    if not m:
        return None
    hh, mm, ss = int(m.group(1)), int(m.group(2)), int(m.group(3))
    total = hh * 3600 + mm * 60 + ss
    return f"{total // 60}:{total % 60:02d}"


YAVG_RE = re.compile(r"YAVG:([\d.]+)")


def mean_luma(path):
    """Average luma 0-255. Near zero means the poster is a black frame."""
    r = run_ffmpeg(
        ["-hide_banner", "-i", str(path), "-vf", "signalstats,metadata=print",
         "-f", "null", "-"]
    )
    vals = [float(v) for v in YAVG_RE.findall(r.stderr)]
    return sum(vals) / len(vals) if vals else None


def main():
    src = MANIFEST.read_text(encoding="utf-8")
    ids = re.findall(r'id:\s*"([^"]+)"', src)
    print(f"{len(ids)} manifest entries\n")

    sizes, durs, dark = {}, {}, []

    for i, pid in enumerate(ids, 1):
        poster = POSTERS / f"{pid}.jpg"
        vid = VIDEO / f"{pid}.mp4"

        if poster.exists():
            wh = jpeg_size(poster)
            if wh:
                sizes[pid] = wh
        if vid.exists():
            d = duration(vid)
            if d:
                durs[pid] = d

        if i % 25 == 0 or i == len(ids):
            print(f"  {i}/{len(ids)}")

    # Patch the manifest: add w/h/dur right after each orientation field.
    out = src
    patched = 0
    for pid in ids:
        wh, d = sizes.get(pid), durs.get(pid)
        if not wh and not d:
            continue
        block = re.search(
            r'(\{[^{}]*id:\s*"' + re.escape(pid) + r'"[^{}]*\})', out, re.S
        )
        if not block:
            continue
        text = block.group(1)
        new = text
        # strip any previous run's fields so this stays idempotent
        new = re.sub(r',\s*w:\s*\d+,\s*h:\s*\d+', '', new)
        new = re.sub(r',\s*dur:\s*"[^"]*"', '', new)
        extra = ""
        if wh:
            extra += f", w: {wh[0]}, h: {wh[1]}"
        if d:
            extra += f', dur: "{d}"'
        new = re.sub(r'(orientation:\s*"[^"]+")', r"\1" + extra, new, count=1)
        if new != text:
            out = out.replace(text, new, 1)
            patched += 1

    if out != src:
        MANIFEST.write_text(out, encoding="utf-8")
    print(f"\npatched {patched} entries "
          f"({len(sizes)} sizes, {len(durs)} runtimes)")

    # Report black posters last so the list is easy to copy.
    print("\nchecking posters for black frames...")
    for i, pid in enumerate(ids, 1):
        p = POSTERS / f"{pid}.jpg"
        if not p.exists():
            continue
        y = mean_luma(p)
        if y is not None and y < 16.0:
            dark.append((pid, round(y, 1)))
        if i % 50 == 0:
            print(f"  {i}/{len(ids)}")

    if dark:
        print(f"\n{len(dark)} posters are effectively black — re-grab these:")
        for pid, y in sorted(dark, key=lambda x: x[1]):
            print(f"   YAVG {y:>5}  {pid}")
        (ROOT / "tools" / "dark_posters.txt").write_text(
            "\n".join(p for p, _ in dark), encoding="utf-8"
        )
        print("\nids written to tools/dark_posters.txt")
    else:
        print("\nno black posters found")


if __name__ == "__main__":
    sys.exit(main())
