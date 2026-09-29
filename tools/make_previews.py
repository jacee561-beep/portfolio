"""
make_previews.py — tiny silent loops so the work can PLAY in the grid.

The full MP4s are up to 20 MB each; a wall of those would be unusable. These
are ~5 s, 640 px tall, no audio, typically 70-350 KB — small enough that a
dozen can play at once.

Starts 2 s in so a fade-up doesn't become the whole preview.
Idempotent: skips anything already rendered, so it can be re-run any time.
"""
import re
import subprocess
import sys
from pathlib import Path

ROOT = Path(__file__).resolve().parent.parent
PUB = ROOT / "public"
VIDEO = PUB / "assets" / "video"
OUT = PUB / "assets" / "preview"
MANIFEST = PUB / "assets" / "manifest.js"

FFMPEG = Path(
    r"C:\Users\Khanna House Studios\Documents\Jerry the opus clone"
    r"\.venv\Lib\site-packages\imageio_ffmpeg\binaries\ffmpeg-win-x86_64-v7.1.exe"
)


def main():
    OUT.mkdir(parents=True, exist_ok=True)
    ids = re.findall(r'id:\s*"([^"]+)"', MANIFEST.read_text(encoding="utf-8"))
    todo = [i for i in ids if (VIDEO / f"{i}.mp4").exists()
            and not (OUT / f"{i}.mp4").exists()]
    print(f"{len(ids)} entries · {len(todo)} previews to build\n")

    done = fail = 0
    for n, pid in enumerate(todo, 1):
        src = VIDEO / f"{pid}.mp4"
        dst = OUT / f"{pid}.mp4"
        tmp = OUT / f"{pid}.part.mp4"
        r = subprocess.run(
            [str(FFMPEG), "-y", "-hide_banner", "-loglevel", "error",
             "-ss", "2", "-t", "5", "-i", str(src),
             "-an",
             "-vf", "scale=-2:640:flags=bicubic,fps=24",
             "-c:v", "libx264", "-profile:v", "main", "-crf", "30",
             "-preset", "slow", "-pix_fmt", "yuv420p", "-g", "48",
             "-movflags", "+faststart", str(tmp)],
            capture_output=True, text=True, encoding="utf-8", errors="replace")
        if r.returncode == 0 and tmp.exists() and tmp.stat().st_size > 0:
            tmp.replace(dst)
            done += 1
        else:
            # a clip shorter than 2 s has nothing past the seek — retry from 0
            r2 = subprocess.run(
                [str(FFMPEG), "-y", "-hide_banner", "-loglevel", "error",
                 "-i", str(src), "-t", "5", "-an",
                 "-vf", "scale=-2:640:flags=bicubic,fps=24",
                 "-c:v", "libx264", "-profile:v", "main", "-crf", "30",
                 "-preset", "slow", "-pix_fmt", "yuv420p", "-g", "48",
                 "-movflags", "+faststart", str(tmp)],
                capture_output=True, text=True, encoding="utf-8", errors="replace")
            if r2.returncode == 0 and tmp.exists():
                tmp.replace(dst)
                done += 1
            else:
                tmp.unlink(missing_ok=True)
                fail += 1
                print(f"   !! {pid}")
        if n % 20 == 0:
            print(f"  {n}/{len(todo)}")

    total = sum(f.stat().st_size for f in OUT.glob("*.mp4"))
    print(f"\nbuilt {done}, failed {fail}")
    print(f"{len(list(OUT.glob('*.mp4')))} previews, {total/1048576:.1f} MB total")
    if fail:
        print("failed ids above stay poster-only — the design does not depend on them")


if __name__ == "__main__":
    sys.exit(main())
