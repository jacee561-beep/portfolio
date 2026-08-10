# Jacob Gonzales — portfolio site

Context for any Claude Code session, on any machine. Read this first.

---

## 🟢 STATUS — the site is LIVE

**https://newportfoilio.jacee561.workers.dev**

Deployed on Cloudflare Workers (static assets) from this repo. Verified working in production:
all three pages render, posters and the headshot load, video streams and plays (720x1280),
no console errors.

**Deployment is automatic.** Push to `main` and Cloudflare rebuilds in about a minute. You do
not drag folders or touch the dashboard.

```bash
git add -A
git commit -m "what changed"
git push
```

Repo: **https://github.com/jacee561-beep/portfolio** (private, branch `main`)

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
git clone https://github.com/jacee561-beep/portfolio.git
cd portfolio
python -m http.server 8901 --directory public   # then open http://localhost:8901
```

**Layout note:** everything that gets published lives in **`public/`**. The repo root holds only
docs and host config. This is deliberate — Cloudflare's deploy treats the assets directory as the
web root, and when that was the repo root it tried to upload the 416 MB `.git` folder as a static
asset and failed. `wrangler.jsonc` pins the assets directory to `./public`; don't point it at `.`.

Everything needed to add work is described below, so a fresh session doesn't need the original
conversation.

---

## Structure

| Path | Purpose |
|---|---|
| `public/index.html` | Homepage — hero, filterable work grid, about, personal, contact |
| `public/podcasts.html` + `podcasts.js` | Podcast catalogue, grouped by show |
| `public/photography.html` + `photos.js` | Photo sessions, grouped by client |
| `public/styles.css` | Entire design system (CSS custom properties at the top) |
| `public/script.js` | Homepage behaviour |
| `public/assets/manifest.js` | **Video catalogue — `REELS` + `CATEGORIES` arrays** |
| `public/assets/photos-manifest.js` | **Photo catalogue — `PHOTOS` array** |
| `public/assets/video/<id>.mp4` | One file per entry, filename = `id` |
| `public/assets/posters/<id>.jpg` | Thumbnail per video, filename = `id` |
| `public/assets/photos/<id>.jpg` | Photos |
| `public/assets/jacob-headshot.jpg` | About-section portrait |

Current scale: **151 videos across 6 categories, 34 photos across 7 sessions.**

---

## Adding video work

1. Compress the source (see recipe below) to `public/assets/video/<id>.mp4`.
2. Grab a poster frame to `public/assets/posters/<id>.jpg`.
3. Add an entry to the `REELS` array in `public/assets/manifest.js`:

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
  "public/assets/video/<id>.mp4"

# poster frame (pick a timestamp inside the clip's length)
ffmpeg -y -ss 2 -i "public/assets/video/<id>.mp4" -frames:v 1 -q:v 3 "public/assets/posters/<id>.jpg"
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

Defined as CSS custom properties at the top of `public/styles.css`.

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

- **Cache busting.** CSS/JS are referenced with `?v=2`. If you edit `public/styles.css` or any `.js`,
  bump it to `?v=3` in every HTML file that references it, or browsers serve a stale copy.
- **Local preview caching.** Python's `http.server` plus most browsers cache the HTML *document*
  itself, so `?v=` on sub-resources won't help you see edits. Hard-reload, or load
  `index.html?bust=N` with a new N.
- **File locks on Windows.** If a video is playing in a browser tab, you can't delete or replace
  that file — stop the preview server first. This bit us during a bulk re-encode.
- Every `REELS` entry needs **both** `public/assets/video/<id>.mp4` and `public/assets/posters/<id>.jpg`, or
  the card renders with a broken thumbnail.

---

## Still open

- **More footage — this is the active task.** Jacob is picking this up on his **home PC**. He has
  said repeatedly there is a lot left unreviewed. Scan that machine's drives using the curation
  rules above, compress with the recipe above, add to `public/assets/manifest.js`, push.
- **Flyers / graphic design.** Real design files exist on the work-PC archive drives but only as
  editable `.psd` / `.ai` (e.g. `TITHING TREE/logos/wild earth allies.psd`). They can't be
  rendered to web images without Photoshop/Illustrator. Also unclear which are Jacob's own
  designs versus client-supplied logos — **ask him** rather than guessing at authorship.
- **Music production.** He produces music; `public/index.html` has a styled placeholder card for it.
  No confirmed tracks sourced yet. A folder called `KIANA` on the work PC had Version 1-5 mp3/wav
  files but he was not sure they were his own productions — confirm before publishing anything.
- **Contact email** is his personal `jacee561@gmail.com`. If he ever wants a business address,
  it's in `public/index.html` (contact section) and the footer.

---

## Picking this up on the home PC — first session checklist

1. `git clone https://github.com/jacee561-beep/portfolio.git && cd portfolio`
2. Check ffmpeg exists: `ffmpeg -version`. If missing: `winget install ffmpeg`
   (on the work PC it was borrowed from the Toat Studio venv at
   `Jerry the opus clone/.venv/Lib/site-packages/imageio_ffmpeg/binaries/`).
3. Preview locally: `python -m http.server 8901 --directory public`
4. Find candidate work on that machine's drives — see **Curation rules** above. The search that
   worked well was: video files whose path matches
   `/(export|exports|final|reel|reels|highlight|promo|recap|render|rendered)/i`,
   minus the exclusions listed.
5. Compress → poster → add manifest entry → verify locally → commit → push. Live in ~1 minute.

**Jacob is not a developer.** Don't hand him terminal steps unless there's no alternative, don't
assume he'll interpret an error log, and verify changes by actually loading the page rather than
asserting they work.
