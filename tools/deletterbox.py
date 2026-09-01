"""
deletterbox.py — find pieces whose real content sits inside black bars, and
re-grab their posters cropped to the actual content.

Why: several pieces are square or vertical content exported into a 16:9
container. The poster is 1280x720, so the site sizes the card 16:9 and the
work displays at half size inside black bars. Reading the FILE dimensions is
not the same as reading the PICTURE.

Uses ffmpeg cropdetect over a few seconds of each video, well past any fade-in.
Only acts when the detected content is meaningfully smaller than the frame
(>6% on either axis), so genuinely full-frame pieces are left alone.

Idempotent: re-running skips anything already cropped to its content.
Dry run by default; pass --apply to write posters and patch the manifest.
"""
import io
import re
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

APPLY = "--apply" in sys.argv
TOL = 0.06          # ignore bars thinner than 6% of the frame
CROP_RE = re.compile(r"crop=(\d+):(\d+):(\d+):(\d+)")
DIM_RE = re.compile(r"Video:.*?(\d{2,5})x(\d{2,5})")


def ff(args):
    return subprocess.run([str(FFMPEG)] + args, capture_output=True,
                          text=True, encoding="utf-8", errors="replace").stderr


def frame_size(path):
    m = DIM_RE.search(ff(["-hide_banner", "-i", str(path)]))
    return (int(m.group(1)), int(m.group(2))) if m else None


def content_box(path):
    """(w, h, x, y) of the real picture, or None."""
    out = ff(["-hide_banner", "-ss", "2", "-t", "4", "-i", str(path),
              "-vf", "cropdetect=24:2:0", "-f", "null", "-"])
    hits = CROP_RE.findall(out)
    if not hits:
        return None
    # take the largest detected box — a dark shot mid-clip can under-report
    boxes = [tuple(map(int, h)) for h in hits]
    return max(boxes, key=lambda b: b[0] * b[1])


def main():
    src = MANIFEST.read_text(encoding="utf-8")
    ids = re.findall(r'id:\s*"([^"]+)"', src)
    fixes = []
    skipped = []

    for i, pid in enumerate(ids, 1):
        vid = VIDEO / f"{pid}.mp4"
        if not vid.exists():
            continue
        fs = frame_size(vid)
        box = content_box(vid)
        if not fs or not box:
            continue
        fw, fh = fs
        cw, ch, cx, cy = box
        if cw <= 0 or ch <= 0:
            continue
        # Meaningful bars on either axis...
        bars = (fw - cw) / fw > TOL or (fh - ch) / fh > TOL
        # ...but REJECT tiny detections. A lower third or a logo sting is
        # artwork on black: cropdetect correctly finds only the graphic, and
        # cropping to it produces a 58x66 poster. There the black IS the
        # design, so leave those alone.
        big_enough = (cw / fw) >= 0.30 and (ch / fh) >= 0.30 and (cw * ch) / (fw * fh) >= 0.20
        if bars and big_enough:
            fixes.append((pid, fw, fh, cw, ch, cx, cy))
        elif bars:
            skipped.append((pid, fw, fh, cw, ch))
        if i % 25 == 0:
            print(f"  scanned {i}/{len(ids)}")

    print(f"\n{len(fixes)} pieces have real content inside black bars:\n")
    for pid, fw, fh, cw, ch, cx, cy in fixes:
        print(f"   {pid:<38} {fw}x{fh}  ->  {cw}x{ch}")

    if not APPLY:
        print("\n(dry run — pass --apply to re-grab posters and patch the manifest)")
        return

    out = src
    done = 0
    for pid, fw, fh, cw, ch, cx, cy in fixes:
        poster = POSTERS / f"{pid}.jpg"
        r = subprocess.run(
            [str(FFMPEG), "-y", "-hide_banner", "-ss", "2", "-i", str(VIDEO / f"{pid}.mp4"),
             "-vf", f"crop={cw}:{ch}:{cx}:{cy}", "-frames:v", "1", "-q:v", "3", str(poster)],
            capture_output=True, text=True, encoding="utf-8", errors="replace")
        if r.returncode != 0 or not poster.exists():
            print(f"   !! failed {pid}")
            continue
        # rewrite w/h and the orientation flag to match the real picture
        blk = re.search(r'(\{[^{}]*id:\s*"' + re.escape(pid) + r'"[^{}]*\})', out, re.S)
        if blk:
            t = blk.group(1)
            n = re.sub(r'w:\s*\d+,\s*h:\s*\d+', f'w: {cw}, h: {ch}', t)
            n = re.sub(r'orientation:\s*"[^"]+"',
                       f'orientation: "{"landscape" if cw >= ch else "portrait"}"', n)
            if n != t:
                out = out.replace(t, n, 1)
        done += 1

    if out != src:
        MANIFEST.write_text(out, encoding="utf-8")
    print(f"\nre-grabbed {done} posters cropped to content; manifest updated")


if __name__ == "__main__":
    main()
