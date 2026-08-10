# Jacob Gonzales — portfolio site

Context for any Claude Code session, on any machine. Read this first.

**Owner:** Jacob Gonzales (Khanna House Studios) — videographer, photographer, editor, motion
designer. **He is not a developer.** Keep explanations plain, prefer things that just work, and
verify changes by actually running them rather than assuming.

**What this is:** a plain static site — no build step, no framework, no npm. Open `index.html`
or serve the folder and it runs.

---

## Working on this from a different PC

The repo is the source of truth. Clone it, edit, push — the host redeploys automatically
(see `GO-LIVE.md`).

```bash
git clone <repo-url>
cd portfolio
python -m http.server 8901      # then open http://localhost:8901
```

Everything needed to add work is described below, so a fresh session doesn't need the original
conversation.

---

## Structure

| Path | Purpose |
|---|---|
| `index.html` | Homepage — hero, filterable work grid, about, personal, contact |
| `podcasts.html` + `podcasts.js` | Podcast catalogue, grouped by show |
| `photography.html` + `photos.js` | Photo sessions, grouped by client |
| `styles.css` | Entire design system (CSS custom properties at the top) |
| `script.js` | Homepage behaviour |
| `assets/manifest.js` | **Video catalogue — `REELS` + `CATEGORIES` arrays** |
| `assets/photos-manifest.js` | **Photo catalogue — `PHOTOS` array** |
| `assets/video/<id>.mp4` | One file per entry, filename = `id` |
| `assets/posters/<id>.jpg` | Thumbnail per video, filename = `id` |
| `assets/photos/<id>.jpg` | Photos |
| `assets/jacob-headshot.jpg` | About-section portrait |

Current scale: **151 videos across 6 categories, 34 photos across 7 sessions.**

---

## Adding video work

1. Compress the source (see recipe below) to `assets/video/<id>.mp4`.
2. Grab a poster frame to `assets/posters/<id>.jpg`.
3. Add an entry to the `REELS` array in `assets/manifest.js`:

```js
{
  id: "my-new-clip",        // must match both filenames exactly
  category: "podcast",       // podcast | corporate | nonprofit | interviews | motion | social
  client: "Client Name",
  title: "What it's called",
  blurb: "One line about it.",
  orientation: "portrait"    // portrait or landscape — drives card aspect ratio
},
```

Nothing else to update — counts, filters, the marquee and the podcast page all derive from
this array at runtime.

### Compression recipe (match this exactly so the library stays consistent)

720p, CRF 30, mono audio. Gets ~75% off the file size with no visible quality loss at card or
lightbox size. **Keep every file under 20 MB** — Cloudflare Pages rejects anything over 25 MB.

```bash
ffmpeg -y -i "SOURCE.mp4" \
  -vf "scale='if(gt(iw,ih),-2,720)':'if(gt(iw,ih),720,-2)'" \
  -c:v libx264 -preset slow -crf 30 -profile:v main -pix_fmt yuv420p \
  -c:a aac -b:a 96k -ac 1 -movflags +faststart \
  "assets/video/<id>.mp4"

# poster frame (pick a timestamp inside the clip's length)
ffmpeg -y -ss 2 -i "assets/video/<id>.mp4" -frames:v 1 -q:v 3 "assets/posters/<id>.jpg"
```

The `scale` expression keeps portrait clips 720 wide and landscape clips 720 tall, so both
orientations come out right without branching.

Photos: `-vf "scale='min(1600,iw)':-2" -q:v 3`.

---

## Curation rules — what belongs here

Learned the hard way across several passes. **Only finished, delivered work.**

**Include:** exports from folders named `EXPORT` / `EXPORTS` / `REELS` / `FINAL` / `RENDERED` /
`Reel …`. Generally small (under ~300 MB before compression) — those are the cut-down
deliverables.

**Exclude:**
- Raw camera footage — `RAW FOOTAGE/`, `VIDEO/`, `PROXIES/`, `ProxyMedia/`, bare `C0123.MP4`
  card files, multi-GB full-episode renders with no short cut available.
- **Purchased stock and templates** — anything matching `*-20XX-XX-XX-XX-XX-XX-utc*` (Envato
  Elements naming), or living under `Stock Footage/`, `ENVATO TEMPLATES/`, `Help/`, `Tutorial`,
  `(Footage)/`, `Assets/` inside a template pack. **These are not his work.**
- Near-duplicate draft variants — CEO Discovery has dozens of `Option 1 / Option 2 / _V02 / FIX`
  cuts of the same piece. Pick one clean final.
- The same asset duplicated in several folders (365 Wellness lower-thirds exist in three places).

**Do not publish without asking:** the `ITE SOCIAL MEDIA CONTEST` folder is middle/high-school
students' own submitted videos with Jacob's logo added — not his creative work, and it puts
minors' faces on a public site. It was deliberately left out.

Source archives live on his external drives (`F:` ~22 TB, `K:` ~3.7 TB) and his Desktop —
**those are studio drives, not scratch space; don't propose repurposing them.**

---

## Design system

Defined as CSS custom properties at the top of `styles.css`.

- Background `#08080a`, panels `#131317`, accent `#ff5436`
- Display type: weight 900, tight negative letter-spacing, `clamp()` for fluid sizing
- Radius `14px`, easing `cubic-bezier(0.22, 1, 0.36, 1)`

Motion already implemented: preloader, rotating hero video, staggered headline reveal, client
marquee, IntersectionObserver scroll reveals, count-up stats, magnetic buttons, scroll-progress
bar, auto-hiding header, **hover-to-play video previews on cards**, scale-in lightbox, film grain,
mobile burger menu. All of it is gated behind `prefers-reduced-motion`.

The homepage grid paginates 18 at a time — rendering all 151 cards at once was too heavy.

---

## Gotchas

- **Cache busting.** CSS/JS are referenced with `?v=2`. If you edit `styles.css` or any `.js`,
  bump it to `?v=3` in every HTML file that references it, or browsers serve a stale copy.
- **Local preview caching.** Python's `http.server` plus most browsers cache the HTML *document*
  itself, so `?v=` on sub-resources won't help you see edits. Hard-reload, or load
  `index.html?bust=N` with a new N.
- **File locks on Windows.** If a video is playing in a browser tab, you can't delete or replace
  that file — stop the preview server first. This bit us during a bulk re-encode.
- Every `REELS` entry needs **both** `assets/video/<id>.mp4` and `assets/posters/<id>.jpg`, or
  the card renders with a broken thumbnail.

---

## Still open

- **Flyers / graphic design.** Real design files exist on the archive drives but only as
  editable `.psd` / `.ai` (e.g. `TITHING TREE/logos/wild earth allies.psd`). They can't be
  rendered to web images without Photoshop/Illustrator. Also unclear which are Jacob's own
  designs versus client-supplied logos — **ask him** rather than guessing at authorship.
- **Music production.** He produces music; `index.html` has a styled placeholder card for it.
  No confirmed tracks sourced yet.
- **More footage.** He has said repeatedly there's a lot left unreviewed, including on a second
  PC at home.
