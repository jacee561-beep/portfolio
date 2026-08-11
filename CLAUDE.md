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

Current scale: **259 videos across 6 categories, 34 photos across 7 sessions.**

### Full-drive audit — the numbers, so nobody re-scans blind

| Drive | Total video files | Verdict |
|---|---|---|
| **F: GENERAL** (22 TB) + Desktop | 9,044 | mined; >600 MB band is *all* full-length episodes |
| **H: PORTABLE1** (3.7 TB) | 1,566 | mined; large files are raw camera/multicam |
| **WD My Passport** (3.7 TB) | — | **HFS+, unreadable on Windows — see Still open** |

**Two filters caused every earlier miss — do not reuse them blindly:**
1. A **size cap** (`-size -500M` / `-600M`) hid 422 files on H: and 2,551 on F:. Most were genuinely
   raw or long-form, but it also hid the *Super Fit Champs* brand film and the whole
   *Mental Millennials 13-18* / *inSIGHT brand story* / *Julie Khanna* sets.
2. Searching only folders **named** `export|reels|final` missed work sitting in
   `STUDIO DUMP 3.26/`, `LOCATION DUMP 3.26/` and `General Storage Dump/` — archive folders that
   contain other clients' finished deliverables nested several levels down. **Always search those.**

**Long-form is represented by excerpts.** Full episodes run 20–135 min at 3–16 GB and cannot ship
(Cloudflare rejects >25 MB/file). Round 9 added 75-second excerpts titled `… (excerpt)` at 2.5–6 MB
each. To add more, use `-ss <start> -i <src> -t 75` with the standard encode flags and start well
past the cold open.

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

## Session log — 2026-08-11 (home PC, Claude Code)

Jacob had a second portfolio project going on this machine (a standalone single-file site with a
SMPTE/broadcast concept). **That one is abandoned.** Its finished pieces were merged into *this*
repo, which is now the single source of truth. Its leftover folder is
`C:\Users\jacee\Downloads\cluade stuff\portfolio\` — nothing there is needed anymore except as
an asset archive.

### 1. Seven pieces added (151 → 158)

Sourced from his D: drive, encoded with the house recipe. All are his own finished work.

| id | category | orientation | source |
|---|---|---|---|
| `cryptorubik-orb` | motion | landscape | `D:\Users\jacee\Videos\Examples\Project_5_Post_effects.mp4` |
| `cryptorubik-spot` | motion | landscape | `D:\...\Desktop\NEWPORTS\BTC.mp4` |
| `cryptorubik-market` | motion | landscape | `D:\...\Desktop\NEWPORTS\Coin.mp4` |
| `vaporwave-collage` | motion | landscape | `D:\...\Desktop\NEWPORTS\NEWPORTS.mp4` |
| `cryptorubik-cube` | motion | portrait | `D:\...\Desktop\2\PACKAGE 2 VIDEO 1 CUBE\Final cube video.mp4` |
| `vertical-caption-reel` | social | portrait | `D:\...\Desktop\ALEXANDRA REELS\3.mp4` |
| `od2a-webinar-titles` | nonprofit | landscape | `D:\...\Desktop\O2DA\OD2A INTRO.mp4` |

**Deviation from the compression recipe, on purpose:** four of these sources are square (1080x1080).
`.card-media` uses `object-fit: cover` at a fixed 9/16 or 16/9, so a 1:1 file would have ~44%
cropped off and destroy centred compositions. Those four are **pillarboxed onto a 1280x720 black
canvas** instead of scaled with the house expression. Codec settings are otherwise identical
(libx264, preset slow, CRF 30, profile main, yuv420p, AAC 96k mono, +faststart). Audio is mapped
with `-map 0:v:0 -map "0:a:0?"` because `BTC.mp4` has no audio track and a bare `-c:a aac` fails on it.

**Naming honesty — keep this:** the cryptorubik/vaporwave pieces are `client: "Self-Directed"`, not
`client: "Cryptorubik"`. Cryptorubik is a spec concept brand; listing it as a client would imply a
paying engagement that never happened. The Alexandra reel is `client: "Private Client"` — its real
client identity was never verified (the embedded mp4 title tag is a scrambled token, not a name).
**Do not invent a client name for it.**

### 2. Accent changed: orange → cyan

Jacob said he disliked the orange. `--accent` is now `#22d3ee` (was `#ff5436`), `--accent-soft`
updated to match, and the favicon SVG hex swapped in all three HTML files.

Two oranges were **hardcoded outside the token** and would have been missed — check for these if
the accent ever changes again:
- `.about-photo::after` — was an `rgba(255,84,54,.16)` wash over his face. Now a **neutral** dark
  gradient on purpose: a coloured wash over a portrait reads as a skin colour cast.
- a `radial-gradient` around line 723 of `styles.css`.

Violet (`#a78bfa`) was also trialled and looks fine — swapping is a one-line change if he prefers it.

### 3. Headshot retouched

`assets/jacob-headshot.jpg` replaced. Original preserved as
`assets/jacob-headshot-ORIGINAL-backup.jpg` — **don't delete it.**

What changed: the red yearbook backdrop is crushed to near-black, speculars on the forehead/nose
rolled off, tighter 4:5 crop with less headroom, mild vignette.

**Learned the hard way:** crushing red *globally* also desaturates skin and makes him look sallow.
The working version crushes red only in the **shadows** (`curves=r='0/0 0.14/0.035 0.30/0.25
0.55/0.55 1/1'`) and leaves midtones/highlights at identity. Also: raising contrast makes the
facial shine *worse*, not better — roll off the highlights instead.

He asked for posture/facial-hair changes. That needs generative image editing, which this
environment does not have — it was not done and should not be faked. If he still wants a
"producer" look, that's a reshoot (wardrobe, framing, softer key to kill the shine), not a retouch.

### 4. Stats no longer hardcoded

`index.html` had `data-count="151"` for "Pieces delivered", which silently went stale. It now
carries `data-auto="pieces"` and `script.js` overwrites it from `REELS.length` before the count-up
runs. Add work and it stays correct on its own.

Note `data-count="30"` for "Clients & shows" is *deliberately* a rounded-down claim with a `+`
suffix (actual distinct clients is 39) — left alone.

### 5. Y2K interaction layer (new)

Jacob asked for a Y2K feel, a custom cursor and more animation. Added at the **end** of
`styles.css` and `script.js` as a clearly-commented, purely additive block — the base design is
untouched:

- custom cursor: small dot at the pointer + a lagging ring (lerp 0.16) that grows and turns accent
  over anything clickable
- subtle scanline overlay
- RGB-split glitch on the hero headline on hover (pseudo-elements fed by `data-txt`)
- animated chrome sheen on the accent word

The whole layer **bails out entirely** on touch devices and under `prefers-reduced-motion` — it
returns early in JS and is `display:none`-d in CSS. Keep that gating if you extend it.

### 6. Cache version is now `?v=7`

Bumped several times this session. Follow the gotcha above and bump again on any CSS/JS edit.

### 7. Higgsfield CLI installed, needs Jacob to log in

He wants AI-generated assets. The MCP connector does **not** reach Claude Code sessions — only the
CLI works here. Installed globally: `npm install -g @higgsfield/cli` (v1.1.23, binary at
`C:\Users\jacee\AppData\Roaming\npm\higgsfield`).

**Blocked on him:** `higgsfield auth login` is a browser OAuth flow. Claude cannot perform account
logins or enter credentials. No credentials file exists yet. Once he runs it once, `higgsfield
generate create <model> --prompt "..." --wait` becomes usable from a session.

Standing judgement worth keeping: AI-generated footage is a bad fit for the *portfolio grid* — this
is a videographer's credibility page and his real work is stronger. Fine for ads, thumbnails, or
background plates, clearly labelled. Don't let generated work get listed as delivered client work.

## Session log — 2026-08-11 (work PC): rounds 6 & 7, 158 → 225

**The scan method that finally worked.** Every earlier pass only looked *inside folders named*
`export|reels|final|…`. That silently missed whole bodies of work sitting in differently-named
folders. The fix: scan **every** folder and filter on the files instead —

```bash
find /f /h "$DESKTOP" -type f \( -iname "*.mp4" -o -iname "*.mov" \) -size +300k -size -500M \
 | grep -v '/\._' \
 | grep -viE -e "/proxies/" -e "proxymedia" -e "/raw footage/" -e "-utc" -e "stock footage" \
             -e envato -e "/help/" -e tutorial -e "video iso files" -e "untitled cam" \
             -e "auto-save" -e "video previews"
```
Then drop anything named `Untitled NN` / `C0123.MP4` / under `private/M4ROOT/CLIP/` — those are
recorder and camera-card output. **What's left with a human-readable filename is almost always a
real deliverable.** That single heuristic surfaced ~70 pieces three prior passes had missed.

**Round 6 (F:, +26).** HONA Awards — a complete nonprofit awards-show package (show open, sponsor
reel, 13 award-category nominee films). Used `HONA FINAL/`, not the earlier `HONA WITH MUSIC/`
iteration (which has doubled `.mp4.mp4` extensions). Plus 8 Wellington Bay resident testimonials
and 2 Khanna House Studios virtual business cards.

**Round 7 (H: PORTABLE1, +41).** Uncoordinated (12 of 33 titled podcast reels), Super Fit Champs
(14 named animations for a kids' fitness brand), Tennis with Ema (4 episode reels + animated
intro/outro/2 sponsor spots), Intro to Podcasting (3), KHS Reels (2), Valentyna G Polo, Devi.

**Deliberately excluded and why — don't re-add these:**
- `Video ISO Files/Untitled CAM N` across Carlton Chandler, Oxbridge, Jammin' with Jeremy, Amanda
  Salazar, Mike Morgan — raw multicam recorder ISOs, not deliverables.
- `private/M4ROOT/CLIP/C####.MP4` (DEVI, 365 Wellness Executive) — Sony camera cards.
- Childrens Harbor / Catherine Hormats video — all `C####.MP4` card files. Their finished reels and
  photos are already in.
- `PHELPS MEDIA GROUP/PHELPS SEP 9/EXPORT/TIM DUTTA PHELPS.mp4` — **audio-only, no video stream.**
  The real cut is a 2.8 GB 18-minute episode, excluded under the no-long-form rule.

### Gotchas hit this session

- **Mac private-use characters in filenames, again.** `Would You Rather….mp4` actually ends
  `…Animals.mp4` — U+F025 is a Mac-encoded `%`. Same family as the `` folder hit
  earlier. If a file "exists" in `ls` but `os.path.exists()` says False, print `repr()` of the real
  entry from `os.listdir()` and copy the escape from that.
- **ffmpeg output isn't cp1252.** `subprocess.run(..., text=True)` crashed with
  `UnicodeDecodeError` probing one file. Always pass `encoding="utf-8", errors="replace"`.
- **Make batch scripts resumable.** Add a skip-if-output-already-exists guard so a crash at item 35
  of 42 doesn't re-encode the first 34.
- **Cloudflare 403s plain scripts.** Verifying the live site with `urllib` gets 403 from bot
  protection — send a normal browser `User-Agent`. A 404 on a brand-new asset usually just means
  the deploy is still building; the manifest count tells you which round is live.

### Repo size — watch this

~700 MB and growing. Still fine (GitHub is comfortable under 1 GB, Cloudflare's limit is per-file
at 25 MB and the largest here is 18.6 MB). But git keeps every version forever, so if this keeps
growing the move is to host video externally (Cloudflare Stream / Bunny / Mux) and keep only
posters in the repo. Don't let it drift past ~1 GB without addressing it.

## Still open

- **🟡 WD My Passport (Mac-formatted) — SOLVED, needs Jacob to run one export.** GPT partition type
  `48465300-0000-11aa-aa11-00306543ecac` = **Apple HFS+**, which is why Windows gives it no drive
  letter. **Do not assign a letter, initialise, or touch its partitions — that destroys footage.**
  **No software needs installing.** `DiskInternals Linux Reader` is already installed at
  `C:\Program Files (x86)\DiskInternals\LinuxReader\LinuxReader64.exe`, reads HFS+, and is
  **read-only by design**. It detects the drive as **"HFS+ Volume 1 (BACKUP1)", 3725.67 Gb**.
  It is GUI-only (no CLI), so the export is a manual step: open it → double-click that volume →
  select the folders worth taking → **Save** → export to `H:\FROM-MAC-DRIVE`. Then sweep that
  folder with the scan method above and encode normally.
  *(Also tried and rejected: WSL is not installed and `wsl --mount` would need admin + a reboot;
  reading `\\.\PhysicalDrive3` directly needs elevation. Disk Drill is also installed and can read
  HFS+ if Linux Reader gives trouble.)*
  **GUI-automation note:** driving Linux Reader with computer-use failed because the workstation was
  **locked** (`LockApp` running) — screenshots come back frozen and identical, and clicks silently
  do nothing. If that symptom appears, check `Get-Process LogonUI,LockApp` before assuming the app
  or the permissions are at fault.
- **Uncoordinated has ~21 more titled reels** in `H:/UNCOORDINATED/EPSIODE 1/REELS/` beyond the 12
  added — deliberately sampled to avoid one show dominating the grid. Easy to top up if he wants.
- **HONA `HONA WITH MUSIC/`** also holds ~11 per-sponsor spots (SPONSOR-DERBY, SPONSOR-FEDORA,
  SPONSOR-MAD HATTER etc.) not added. Available if the awards package should go deeper.
- **More footage generally.** Jacob keeps saying there's more. The F:/H: sweep above is now
  thorough; the main untapped source is the Mac drive.
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

### 8. Y2K visual layer + AI assets (same session, later)

Accent orange → cyan `#22d3ee`. The custom cursor that was here briefly was removed — he disliked it.
Kept: scanlines, RGB-split headline glitch, chrome sheen on the accent word.

**Higgsfield is wired up and working** (MCP at `https://mcp.higgsfield.ai/mcp`, in `.mcp.json` one level
up; CLI also installed and authed). He's on a 3-day Plus trial — ~100 credits, expires fast, then
$49/mo unless cancelled. Say "cancel auto-renewal" in a chat with the MCP connected.

Cost trap: **2K images cost 10 credits, 1K cost ~1.5.** Stay on 1K, it's plenty for web. Also the
model name silently swaps — requesting `nano_banana_2` runs `nano_banana_flash`. And a
"ran out of credits" error appeared while ~98 credits were available; don't trust it, check `balance`.

Generated assets live in `public/assets/y2k/` (source PNGs are gitignored, web copies ship):
- `bg-contact.jpg` — Y2K plate behind the contact section at 22% with a radial fade. Deliberately
  **not** in the hero: the hero rotates his real footage and that's stronger than any generated plate.
- `obj-cube/star/ring/crt.png` — alpha cutouts (generate → `remove_background`) floating in the work,
  personal and contact sections with scroll parallax (`.flo` + `data-speed`/`data-spin`, JS at the end
  of `script.js`). `.flo` takes the JS transform; the inner `<img>` runs the CSS idle drift — keep them
  separate or they fight over `transform`.

**The About photo is now AI-generated** (`assets/y2k/portrait-v4a.png`), from an Element trained on his
one real headshot. Both real versions are preserved: `jacob-headshot-ORIGINAL-backup.jpg` and
`jacob-headshot-RETOUCHED-real.jpg` — **do not delete either.**

Open issue worth solving: with only one reference photo, the more the hair/styling is pushed the more
the face drifts off him — he noticed and disliked it. The real fix is Soul training with 5-20 real
photos of him (`show_characters action=train`). His iCloud folders hold ~3,000 personal photos;
**do not sweep them** — ask him to hand over a chosen set.
