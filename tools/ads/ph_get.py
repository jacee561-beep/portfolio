"""ph_get.py ASSET [res] — download a Poly Haven model (glTF + textures) or HDRI into assets/."""
import json, os, sys, urllib.request
opener = urllib.request.build_opener(); opener.addheaders = [('User-Agent', 'Mozilla/5.0 (portfolio render pipeline)')]
urllib.request.install_opener(opener)
a = sys.argv[1]; res = sys.argv[2] if len(sys.argv) > 2 else '2k'
out = os.path.join(os.path.dirname(os.path.abspath(__file__)), 'assets', a); os.makedirs(out, exist_ok=True)
files = json.load(urllib.request.urlopen(f'https://api.polyhaven.com/files/{a}'))
def get(url, path):
    os.makedirs(os.path.dirname(path), exist_ok=True)
    if not os.path.exists(path): urllib.request.urlretrieve(url, path)
if 'hdri' in files:
    f = files['hdri'][res]['hdr']; get(f['url'], os.path.join(out, f'{a}_{res}.hdr'))
else:
    g = files['gltf'][res]['gltf']; get(g['url'], os.path.join(out, os.path.basename(g['url'])))
    for rel, inc in g.get('include', {}).items(): get(inc['url'], os.path.join(out, rel))
print('ok', a, sum(os.path.getsize(os.path.join(dp, fn)) for dp, _, fs in os.walk(out) for fn in fs) // 1024, 'KB')
