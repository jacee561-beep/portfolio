"""Portfolio logo intro (jacobgonzales.tv), built in the Higgsfield 'use Blender' background session.

Concept = the site's own broadcast language: SMPTE colour bars rise, fold into one bar-coloured line,
the JACOB GONZALES wordmark flips up off that line, the REC tally light blinks next to the role line.
2.6 s + 0.7 s hold at 30 fps, 1920x1080. Colours = tokens in public/styles.css. Font = Archivo Narrow 700 (site face).
Run inside Blender:  exec(open(r'<this file>').read())
"""
import bpy, math, os

HERE = r"C:\Users\jacee\Downloads\cluade stuff\portfolio-local-clients\tools\intro"
# tools/ads/archivo-narrow-700.ttf with overlapping contours merged (fontTools removeOverlaps): the raw file's G spur
# overlaps its bowl and Blender's even-odd fill punches a dark notch there.
FONT = r"C:\Users\jacee\Downloads\cluade stuff\portfolio-local-clients\tools\intro\archivo-narrow-700-merged.ttf"
FPS, END = 30, 100
W, H = 1920, 1080

def srgb(h):
    h = h.lstrip('#'); c = [int(h[i:i+2], 16) / 255 for i in (0, 2, 4)]
    return tuple(((x + 0.055) / 1.055) ** 2.4 if x > 0.04045 else x / 12.92 for x in c) + (1.0,)

BG, FG, DIM, TALLY = '#0B0B0C', '#EEEBE4', '#B4B0A8', '#FF3B30'
BARS = ['#C8C8C8', '#D6CF00', '#00C2D1', '#2FC23A', '#CC2FCC', '#D9262F', '#2B3FDB']

# ---------- clean scene ----------
bpy.ops.wm.read_factory_settings(use_empty=True)
sc = bpy.context.scene
sc.render.fps, sc.frame_start, sc.frame_end = FPS, 1, END
sc.render.resolution_x, sc.render.resolution_y = W, H
sc.render.engine = 'BLENDER_EEVEE_NEXT' if 'BLENDER_EEVEE_NEXT' in bpy.types.RenderSettings.bl_rna.properties['engine'].enum_items.keys() else 'BLENDER_EEVEE'
sc.view_settings.view_transform = 'Standard'
sc.view_settings.look = 'None'
world = bpy.data.worlds.new('W'); sc.world = world
world.use_nodes = True
world.node_tree.nodes['Background'].inputs[0].default_value = srgb(BG)
world.node_tree.nodes['Background'].inputs[1].default_value = 1.0

def emis(name, hexc, strength=1.0):
    m = bpy.data.materials.new(name); m.use_nodes = True
    nt = m.node_tree; nt.nodes.clear()
    e = nt.nodes.new('ShaderNodeEmission'); e.inputs[0].default_value = srgb(hexc); e.inputs[1].default_value = strength
    o = nt.nodes.new('ShaderNodeOutputMaterial'); nt.links.new(e.outputs[0], o.inputs[0])
    return m

def key(obj, frame, **props):
    for k, v in props.items():
        setattr(obj, k, v); obj.keyframe_insert(data_path=k, frame=frame)

def ease_all(obj, kind='EXPO'):
    ad = obj.animation_data
    if not ad or not ad.action: return
    # Blender 5 layered actions: walk every fcurve reachable
    curves = []
    try:
        curves = list(ad.action.fcurves)
    except Exception:
        for layer in ad.action.layers:
            for strip in layer.strips:
                for cb in strip.channelbags:
                    curves += list(cb.fcurves)
    for fc in curves:
        for kp in fc.keyframe_points:
            kp.interpolation = kind; kp.easing = 'EASE_OUT'

# ---------- colour bars ----------
BAR_W, BAR_H, GAP = 1.30, 6.0, 0.0
total = len(BARS) * BAR_W
x0 = -total / 2 + BAR_W / 2
LINE_Y = -0.05          # where the bars fold into one line (world Z)
bars = []
for i, hx in enumerate(BARS):
    bpy.ops.mesh.primitive_plane_add(size=1, location=(x0 + i * BAR_W, 0, 0))
    b = bpy.context.object; b.name = f'bar_{i}'
    b.rotation_euler = (math.radians(90), 0, 0)
    b.data.materials.append(emis(f'bar_{i}', hx, 1.0))
    d = i * 1.2                                  # stagger, frames
    key(b, 1,          scale=(BAR_W, 0.0001, 1), location=(x0 + i * BAR_W, 0, -4.0))
    key(b, 1 + d * 0.6,      scale=(BAR_W, 0.0001, 1), location=(x0 + i * BAR_W, 0, -4.0))
    key(b, 14 + d,     scale=(BAR_W, BAR_H, 1),  location=(x0 + i * BAR_W, 0, 0.0))
    key(b, 24,         scale=(BAR_W, BAR_H, 1),  location=(x0 + i * BAR_W, 0, 0.0))
    key(b, 38,         scale=(BAR_W, 0.07, 1),   location=(x0 + i * BAR_W, 0, LINE_Y))
    bars.append(b)

# ---------- wordmark ----------
font = bpy.data.fonts.load(FONT)
tc = bpy.data.curves.new('wordmark', 'FONT'); tc.body = 'JACOB GONZALES'; tc.font = font
tc.align_x, tc.align_y = 'CENTER', 'BOTTOM'
tc.extrude, tc.bevel_depth, tc.bevel_resolution = 0.06, 0.012, 2
tc.size = 1.0
txt = bpy.data.objects.new('wordmark', tc); sc.collection.objects.link(txt)
txt.data.materials.append(emis('fg', FG, 1.0))
bpy.context.view_layer.update()
wm_w = txt.dimensions.x
TARGET_W = total * 0.98
s = TARGET_W / wm_w
TXT_Z = LINE_Y + 0.12
# flips up off the line: starts lying flat (rot x 0 = face up), ends facing camera (rot x 90)
key(txt, 1,  scale=(s, s, s), rotation_euler=(0, 0, 0), location=(0, 0.0, TXT_Z))
key(txt, 34, scale=(s, s, s), rotation_euler=(0, 0, 0), location=(0, 0.0, TXT_Z))
key(txt, 56, scale=(s, s, s), rotation_euler=(math.radians(90), 0, 0), location=(0, 0.0, TXT_Z))
txt.hide_render = True
txt.keyframe_insert('hide_render', frame=1)
txt.hide_render = False
txt.keyframe_insert('hide_render', frame=35)

# ---------- role line + REC tally ----------
rc = bpy.data.curves.new('role', 'FONT'); rc.body = 'VIDEO EDITOR  /  MOTION  /  VFX  /  3D'; rc.font = font
rc.align_x, rc.align_y = 'CENTER', 'TOP'; rc.size = 0.30
role = bpy.data.objects.new('role', rc); sc.collection.objects.link(role)
role.rotation_euler = (math.radians(90), 0, 0)
role.data.materials.append(emis('dim', DIM, 1.0))
key(role, 1,  location=(0, 0, LINE_Y - 0.25))
key(role, 56, location=(0, 0, LINE_Y - 0.25))
key(role, 72, location=(0, 0, LINE_Y - 0.42))
rmat = role.data.materials[0]
alpha_in = rmat.node_tree.nodes['Emission'].inputs[1]
alpha_in.default_value = 0.0; alpha_in.keyframe_insert('default_value', frame=56)
alpha_in.default_value = 1.0; alpha_in.keyframe_insert('default_value', frame=72)
bpy.context.view_layer.update()
role_w = role.dimensions.x

bpy.ops.mesh.primitive_circle_add(vertices=48, radius=0.085, fill_type='NGON',
                                  location=(-role_w / 2 - 0.28, 0, LINE_Y - 0.42 - 0.13), rotation=(math.radians(90), 0, 0))
dot = bpy.context.object; dot.name = 'rec'
dmat = emis('tally', TALLY, 0.0); dot.data.materials.append(dmat)
dstr = dmat.node_tree.nodes['Emission'].inputs[1]
for f, v in [(1, 0), (64, 0), (68, 2.2), (84, 2.2), (86, 0.15), (96, 0.15), (98, 2.2), (112, 2.2), (114, 0.15), (120, 0.15)]:
    dstr.default_value = v; dstr.keyframe_insert('default_value', frame=f)

# role line + dot stay out of the render until their fade starts (a zero-strength emission still draws black)
for o, f_on in ((role, 56), (dot, 63)):
    o.hide_render = True;  o.keyframe_insert('hide_render', frame=1)
    o.hide_render = False; o.keyframe_insert('hide_render', frame=f_on)

# ---------- camera ----------
cam_d = bpy.data.cameras.new('cam'); cam_d.lens = 50
cam = bpy.data.objects.new('cam', cam_d); sc.collection.objects.link(cam); sc.camera = cam
key(cam, 1,   location=(0, -15.5, 0.25), rotation_euler=(math.radians(90), 0, 0))
key(cam, END, location=(0, -13.8, 0.25), rotation_euler=(math.radians(90), 0, 0))

for o in bars + [txt, role]:
    ease_all(o)
# camera push stays linear (sets interpolation on every curve, layered actions included) so the hold keeps moving
ease_all(cam, 'LINEAR')

sc.render.image_settings.file_format = 'PNG'
sc.render.filepath = os.path.join(HERE, 'frames', 'f_')
sc.frame_set(END)
bpy.ops.wm.save_as_mainfile(filepath=os.path.join(HERE, 'intro.blend'))
result = {'wordmark_w': wm_w, 'scale': s, 'bars_w': total, 'role_w': role_w, 'engine': sc.render.engine}
