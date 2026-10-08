"""finish.py FRAMES_DIR OUT.mp4 "Product line" [WIDTH]
Adds the watermark (JACOB GONZALES · CONCEPT, bottom right) and a 1.5 s end card in the
site's colour-bar style, then encodes H.264 for web. Run with python3 -I."""
import sys, os, subprocess, glob
from PIL import Image, ImageDraw, ImageFont
frames, out, line = sys.argv[1], sys.argv[2], sys.argv[3]
here = os.path.dirname(os.path.abspath(__file__))
NARROW = os.path.join(here, 'archivo-narrow-700.ttf')
MONO = '/usr/share/fonts/truetype/dejavu/DejaVuSansMono.ttf'
first = sorted(glob.glob(os.path.join(frames, 'f_*.png')))[0]
W, H = Image.open(first).size
u = W / 1920

# watermark as a transparent PNG overlay (crisp at any resolution)
wm = Image.new('RGBA', (W, H), (0, 0, 0, 0)); d = ImageDraw.Draw(wm)
f = ImageFont.truetype(MONO, int(22 * u))
txt = 'JACOB GONZALES  ·  CONCEPT'
tw = d.textlength(txt, font=f)
x, y = W - tw - int(48 * u), H - int(62 * u)
d.rectangle([x - int(14 * u), y - int(10 * u), x + tw + int(14 * u), y + int(34 * u)], fill=(0, 0, 0, 90))
d.text((x, y), txt, font=f, fill=(255, 255, 255, 170))
wm.save(os.path.join(here, '_wm.png'))

# end card
card = Image.new('RGB', (W, H), '#0B0B0C'); d = ImageDraw.Draw(card)
bars = ['#C8C8C8', '#D6CF00', '#00C2D1', '#2FC23A', '#CC2FCC', '#D9262F', '#2B3FDB']
bw = W / 7
for i, c in enumerate(bars):
    d.rectangle([i * bw, H - int(14 * u), (i + 1) * bw, H], fill=c)
big = ImageFont.truetype(NARROW, int(150 * u)); sm = ImageFont.truetype(MONO, int(28 * u))
d.text((W / 2, H / 2 - int(40 * u)), 'JACOB GONZALES', font=big, fill='#EEEBE4', anchor='mm')
d.text((W / 2, H / 2 + int(80 * u)), line.upper(), font=sm, fill='#8A867F', anchor='mm')
d.text((W / 2, H / 2 + int(130 * u)), 'JACOBGONZALES.TV', font=sm, fill='#D6CF00', anchor='mm')
card.save(os.path.join(here, '_card.png'))

fps = 24
subprocess.run([
    'ffmpeg', '-v', 'error', '-y',
    '-framerate', str(fps), '-i', os.path.join(frames, 'f_%04d.png'),
    '-i', os.path.join(here, '_wm.png'),
    '-loop', '1', '-t', '1.5', '-framerate', str(fps), '-i', os.path.join(here, '_card.png'),
    '-filter_complex',
    '[0:v][1:v]overlay=0:0,format=yuv420p,setsar=1[a];'
    '[2:v]fade=t=in:st=0:d=0.3,format=yuv420p,setsar=1[b];'
    '[a][b]concat=n=2:v=1:a=0[v]',
    '-map', '[v]', '-c:v', 'libx264', '-preset', 'slow', '-crf', '20', '-pix_fmt', 'yuv420p',
    '-movflags', '+faststart', out], check=True)
print('wrote', out)
