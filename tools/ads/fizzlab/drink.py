# FIZZ.LAB YUZU — concept drink spot. Cycles, real-scale can, condensation,
# Poly Haven scanned limes/lemons (CC0) and a studio HDRI.
import bpy, bmesh, math, random, sys, os
from mathutils import Vector
D = os.path.dirname(os.path.abspath(__file__)); A = os.path.join(D, '..', 'assets')
random.seed(11)
bpy.ops.wm.read_factory_settings(use_empty=True)
sc = bpy.context.scene
FR = 120; sc.frame_start, sc.frame_end = 1, FR; sc.render.fps = 24
RES = {'540': (960, 540), '1080': (1920, 1080), '4k': (3840, 2160)}
res = next((a.split('=')[1] for a in sys.argv if a.startswith('--res=')), '1080')
sc.render.resolution_x, sc.render.resolution_y = RES[res]
ENGINE = 'CYCLES' if '--cycles' in sys.argv else 'BLENDER_EEVEE_NEXT'
sc.render.engine = ENGINE; cy = sc.cycles
if ENGINE != 'CYCLES':
    ee = sc.eevee; ee.taa_render_samples = 64; ee.use_raytracing = True
    ee.ray_tracing_options.resolution_scale = '1'; ee.use_shadows = True; ee.use_volumetric_shadows = False
    ee.fast_gi_method = 'GLOBAL_ILLUMINATION'
cy.device = 'CPU'; cy.samples = 48 if res == '540' else 96; cy.use_denoising = True; cy.denoiser = 'OPENIMAGEDENOISE'
cy.max_bounces = 8; cy.transmission_bounces = 8; cy.glossy_bounces = 4; cy.caustics_reflective = False; cy.caustics_refractive = False
sc.render.use_motion_blur = True; sc.render.motion_blur_shutter = 0.4
sc.view_settings.view_transform = 'AgX'; sc.view_settings.look = 'AgX - Medium High Contrast'

def new_mat(name):
    m = bpy.data.materials.new(name); m.use_nodes = True
    return m, m.node_tree.nodes, m.node_tree.links, m.node_tree.nodes['Principled BSDF']

# ---- world: studio HDRI for light and reflections only; camera sees a coloured sweep
w = bpy.data.worlds.new('W'); sc.world = w; w.use_nodes = True
n, l = w.node_tree.nodes, w.node_tree.links
env = n.new('ShaderNodeTexEnvironment'); env.image = bpy.data.images.load(os.path.join(A, 'studio_small_09', 'studio_small_09_2k.hdr'))
mpw = n.new('ShaderNodeMapping'); tcw = n.new('ShaderNodeTexCoord'); mpw.inputs['Rotation'].default_value[2] = math.radians(70)
l.new(tcw.outputs['Generated'], mpw.inputs['Vector']); l.new(mpw.outputs['Vector'], env.inputs['Vector'])
l.new(env.outputs['Color'], n['Background'].inputs['Color']); n['Background'].inputs['Strength'].default_value = 1.4

# ---- backdrop: curved sweep, radial gradient lime → deep green
bpy.ops.mesh.primitive_plane_add(size=2, location=(0, 0.35, 0.06)); bd = bpy.context.object
bd.rotation_euler[0] = math.radians(90); bd.scale = (0.9, 0.5, 1)
m, nn, ll, p = new_mat('Backdrop'); nn.remove(p)
em = nn.new('ShaderNodeEmission'); tco = nn.new('ShaderNodeTexCoord'); gr = nn.new('ShaderNodeTexGradient'); gr.gradient_type = 'SPHERICAL'
mpn = nn.new('ShaderNodeMapping'); mpn.inputs['Location'].default_value = (-0.5, -0.45, 0); mpn.inputs['Scale'].default_value = (1.1, 1.6, 1)
cr = nn.new('ShaderNodeValToRGB')
cr.color_ramp.elements[0].color = (0.004, 0.03, 0.02, 1); cr.color_ramp.elements[1].color = (0.45, 0.62, 0.02, 1); cr.color_ramp.elements[1].position = 0.85
ll.new(tco.outputs['UV'], mpn.inputs['Vector']); ll.new(mpn.outputs['Vector'], gr.inputs['Vector']); ll.new(gr.outputs['Fac'], cr.inputs['Fac'])
ll.new(cr.outputs['Color'], em.inputs['Color']); em.inputs['Strength'].default_value = 1.0
ll.new(em.outputs[0], nn['Material Output'].inputs['Surface']); bd.data.materials.append(m)
bd.visible_shadow = False; bd.visible_glossy = True

# ---- the can: a revolved real 12 oz profile (metres)
prof = [(0.0, 0.0055), (0.018, 0.0035), (0.0245, 0.0), (0.0285, 0.0018), (0.0331, 0.0115), (0.0331, 0.1000),
        (0.0318, 0.1060), (0.0290, 0.1130), (0.0272, 0.1172), (0.0272, 0.1205), (0.0268, 0.1222), (0.0258, 0.1210),
        (0.0254, 0.1180), (0.0, 0.1180)]
me = bpy.data.meshes.new('CanProfile'); bm = bmesh.new()
vs = [bm.verts.new((r, 0, z)) for r, z in prof]
for a, b in zip(vs, vs[1:]): bm.edges.new((a, b))
bm.to_mesh(me); bm.free()
can = bpy.data.objects.new('Can', me); sc.collection.objects.link(can)
scw = can.modifiers.new('Rev', 'SCREW'); scw.steps = 160; scw.render_steps = 160; scw.use_merge_vertices = True; scw.use_smooth_shade = True
can.modifiers.new('Sub', 'SUBSURF').render_levels = 1
m, nn, ll, p = new_mat('Can')
# cylindrical label UVs from object space
tco = nn.new('ShaderNodeTexCoord'); sep = nn.new('ShaderNodeSeparateXYZ'); ll.new(tco.outputs['Object'], sep.inputs[0])
at = nn.new('ShaderNodeMath'); at.operation = 'ARCTAN2'; ll.new(sep.outputs['Y'], at.inputs[0]); ll.new(sep.outputs['X'], at.inputs[1])
uu = nn.new('ShaderNodeMath'); uu.operation = 'MULTIPLY_ADD'; uu.inputs[1].default_value = 1 / (2 * math.pi); uu.inputs[2].default_value = 0.5; ll.new(at.outputs[0], uu.inputs[0])
vv = nn.new('ShaderNodeMapRange'); vv.inputs['From Min'].default_value = 0.0125; vv.inputs['From Max'].default_value = 0.0995; ll.new(sep.outputs['Z'], vv.inputs['Value'])
cmb = nn.new('ShaderNodeCombineXYZ'); ll.new(uu.outputs[0], cmb.inputs['X']); ll.new(vv.outputs['Result'], cmb.inputs['Y'])
lab = nn.new('ShaderNodeTexImage'); lab.image = bpy.data.images.load(os.path.join(D, 'label.png')); lab.interpolation = 'Cubic'
ll.new(cmb.outputs[0], lab.inputs['Vector'])
mask = nn.new('ShaderNodeMath'); mask.operation = 'COMPARE'; mask.inputs[1].default_value = 0.5; mask.inputs[2].default_value = 0.4999
ll.new(vv.outputs['Result'], mask.inputs[0])   # 1 inside label band (0..1), 0 outside
mixc = nn.new('ShaderNodeMix'); mixc.data_type = 'RGBA'; mixc.inputs['A'].default_value = (0.78, 0.79, 0.8, 1)
ll.new(mask.outputs[0], mixc.inputs['Factor']); ll.new(lab.outputs['Color'], mixc.inputs['B'])
ll.new(mixc.outputs['Result'], p.inputs['Base Color'])
mr = nn.new('ShaderNodeMapRange'); mr.inputs['To Min'].default_value = 1.0; mr.inputs['To Max'].default_value = 0.25
ll.new(mask.outputs[0], mr.inputs['Value']); ll.new(mr.outputs['Result'], p.inputs['Metallic'])
rr = nn.new('ShaderNodeMapRange'); rr.inputs['To Min'].default_value = 0.18; rr.inputs['To Max'].default_value = 0.32
ll.new(mask.outputs[0], rr.inputs['Value']); ll.new(rr.outputs['Result'], p.inputs['Roughness'])
p.inputs['Coat Weight'].default_value = 0.5; p.inputs['Coat Roughness'].default_value = 0.08
can.data.materials.append(m)

# ring-pull tab
bpy.ops.mesh.primitive_torus_add(major_radius=0.0085, minor_radius=0.0012, location=(0.006, 0, 0.1186))
tab = bpy.context.object; tab.scale = (1.35, 1, 0.35); tab.parent = can
am, nn, ll, p = new_mat('Alu'); p.inputs['Base Color'].default_value = (0.8, 0.81, 0.82, 1); p.inputs['Metallic'].default_value = 1; p.inputs['Roughness'].default_value = 0.2
tab.data.materials.append(am)

# condensation: one mesh of thousands of flattened droplets on the label band
dm, nn, ll, p = new_mat('Water')
p.inputs['Base Color'].default_value = (1, 1, 1, 1); p.inputs['Roughness'].default_value = 0.02
p.inputs['Transmission Weight'].default_value = 1.0; p.inputs['IOR'].default_value = 1.33
bm = bmesh.new()
for i in range(900):
    a = random.uniform(0, 2 * math.pi); z = random.uniform(0.014, 0.098)
    r = random.choice((0.0005, 0.0008, 0.0011, 0.0015, 0.002)) * random.uniform(0.8, 1.2)
    if r > 0.001 and random.random() < 0.5: r *= 0.6
    ret = bmesh.ops.create_uvsphere(bm, u_segments=10, v_segments=6, radius=r)
    nrm = Vector((math.cos(a), math.sin(a), 0)); pos = nrm * 0.0331
    for v in ret['verts']:
        co = v.co.copy(); co.z *= 1.15                      # drops sag slightly
        d = co.dot(nrm); co -= nrm * d; co += nrm * max(d, -r * 0.2) * 0.45   # flatten onto the wall
        v.co = co + pos + Vector((0, 0, z))
drops = bpy.data.meshes.new('Drops'); bm.to_mesh(drops); bm.free()
do = bpy.data.objects.new('Drops', drops); sc.collection.objects.link(do); do.parent = can; do.data.materials.append(dm)
for poly in drops.polygons: poly.use_smooth = True

can.rotation_euler = (math.radians(4), math.radians(-6), math.radians(-30))
can.keyframe_insert('rotation_euler', index=2, frame=1)
can.rotation_euler[2] = math.radians(30); can.keyframe_insert('rotation_euler', index=2, frame=FR)
can.location = (0, 0, -0.058)

# ---- ice: rounded clear cubes
im, nn, ll, p = new_mat('Ice')
p.inputs['Transmission Weight'].default_value = 1; p.inputs['IOR'].default_value = 1.31; p.inputs['Roughness'].default_value = 0.08
nz = nn.new('ShaderNodeTexNoise'); nz.inputs['Scale'].default_value = 300; bp = nn.new('ShaderNodeBump'); bp.inputs['Strength'].default_value = 0.08
ll.new(nz.outputs['Fac'], bp.inputs['Height']); ll.new(bp.outputs['Normal'], p.inputs['Normal'])

def import_gltf(name):
    folder = os.path.join(A, name); f = [x for x in os.listdir(folder) if x.endswith('.gltf')][0]
    before = set(bpy.data.objects); bpy.ops.import_scene.gltf(filepath=os.path.join(folder, f))
    objs = [o for o in bpy.data.objects if o not in before and o.type == 'MESH']
    return objs

props = []
lime = import_gltf('food_lime_01')[0]; lemon = import_gltf('lemon')[0]
for src in (lime, lemon):
    dims = max(src.dimensions); src.scale = [s * (0.06 / dims) for s in src.scale]   # ~6 cm fruit
    src.location = (10, 10, 10)
spots = [(-0.085, -0.03, 0.03, lime), (0.09, -0.02, -0.02, lemon), (-0.07, 0.03, -0.045, lemon),
         (0.075, 0.035, 0.06, lime), (-0.11, 0.06, 0.08, lime), (0.12, 0.05, -0.07, lime)]
for x, y, z, src in spots:
    o = src.copy(); o.data = src.data; sc.collection.objects.link(o); o.location = (x, y, z); props.append(o)
for x, y, z in ((-0.045, -0.05, -0.05), (0.05, -0.055, 0.075), (0.035, -0.06, -0.075), (-0.06, -0.06, 0.08)):
    bpy.ops.mesh.primitive_cube_add(size=0.022, location=(x, y, z)); c = bpy.context.object
    bv = c.modifiers.new('B', 'BEVEL'); bv.width = 0.004; bv.segments = 4; c.data.materials.append(im)
    bpy.ops.object.shade_smooth(); props.append(c)
for o in props:
    o.rotation_euler = [random.uniform(0, 6.28) for _ in range(3)]
    for k, f in enumerate((1, FR // 2, FR)):
        o.rotation_euler[2] += random.uniform(0.15, 0.35) * (1 if k else 0)
        o.location.z += (0.004 if k == 1 else (-0.004 if k == 2 else 0))
        o.keyframe_insert('rotation_euler', frame=f); o.keyframe_insert('location', index=2, frame=f)

# ---- key light accents + camera
def area(loc, rot, size, power, col=(1, 1, 1)):
    L = bpy.data.lights.new('A', 'AREA'); L.size = size; L.energy = power; L.color = col
    o = bpy.data.objects.new('A', L); o.location = loc; o.rotation_euler = rot; sc.collection.objects.link(o)
area((-0.35, -0.3, 0.25), (math.radians(65), 0, math.radians(-50)), 0.25, 18, (1, 0.97, 0.9))
area((0.3, 0.12, 0.12), (math.radians(80), 0, math.radians(110)), 0.06, 14, (0.85, 1, 0.6))   # lime rim
cam = bpy.data.objects.new('Cam', bpy.data.cameras.new('Cam')); sc.collection.objects.link(cam); sc.camera = cam
cam.data.lens = 85; cam.rotation_euler = (math.radians(90), 0, 0)
cam.location = (0, -0.82, 0.0); cam.keyframe_insert('location', index=1, frame=1)
cam.location = (0, -0.74, 0.0); cam.keyframe_insert('location', index=1, frame=FR)
cam.data.dof.use_dof = True; cam.data.dof.focus_object = can; cam.data.dof.aperture_fstop = 4.0

sc.render.image_settings.file_format = 'PNG'
sc.render.filepath = os.path.join(D, f'frames_{res}', 'f_')
if '--still' in sys.argv:
    sc.frame_set(60); sc.render.filepath = os.path.join(D, f'still_{res}.png'); bpy.ops.render.render(write_still=True)
else:
    bpy.ops.render.render(animation=True)
