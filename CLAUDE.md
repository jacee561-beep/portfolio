# Jacob Gonzales — portfolio site

Context for any Claude Code session, on any machine. Read this first.

---

## 🟢 STATUS — the site is LIVE

**https://jacobgonzales.tv**

Custom domain (apex + `www`), registered via Cloudflare Registrar 2026-08-11 and bound in
`wrangler.jsonc` under `routes` with `custom_domain: true`. Verified in production: all three
pages, posters, photos, headshot and video all HTTP 200, SSL valid, 259 manifest entries served.

**Fallback URL: `https://portfolio.jacee561.workers.dev`.** The older
`newportfoilio.jacee561.workers.dev` is **retired and 404s** — the deploy consolidated onto the
worker named `portfolio` in `wrangler.jsonc`. Don't cite the old name.

⚠️ If the `jacobgonzales.tv` zone is ever removed from the Cloudflare account, **delete the
`routes` block in `wrangler.jsonc` first** — otherwise every deploy fails and the site goes down.

`/podcasts.html` and `/photography.html` 307-redirect to `/podcasts` and `/photography`
(Cloudflare's default `html_handling`). Both forms work. The nav keeps the `.html` links on
purpose so the local `python -m http.server` preview still resolves them.

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
| `public/common.js` | Shared by all 3 pages: hover previews, lightbox, masonry, count-up, tilt |
| `public/script.js` | Homepage behaviour |
| `public/assets/site-config.js` | **Every editable fact and blank** (availability, testimonials, terms…) |
| `public/assets/manifest.js` | **Video catalogue — `REELS` + `CATEGORIES` arrays** |
| `public/assets/photos-manifest.js` | **Photo catalogue — `PHOTOS` array** |
| `public/assets/video/<id>.mp4` | One file per entry, filename = `id` |
| `public/assets/posters/<id>.jpg` | Full poster per video, filename = `id` |
| `public/assets/thumbs/<id>.webp` | Light grid thumbnail (640 px landscape / 480 px portrait). Optional — falls back to the poster |
| `public/assets/photos/<id>.jpg` | Photos |
| `public/assets/jacob-headshot.jpg` | About-section portrait |

Current scale: **259 videos in the manifest, 246 shown (13 marked `hide: true`), 28 photos across 6 sessions.**

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

## Design system — EDIT BAY (2026-10-01)

Jacob: *"make it look less AI, add unique things."* The site is now dressed like the room the work is
made in. Every colour is either a **SMPTE colour bar** or **sampled from the footage** (manifest
`accent`, applied to `--tint` when you point at a piece). No invented gradients, glass, glow orbs,
chrome objects or vaporwave grid — those were the "AI" tells and were all removed.

- Palette tokens at the top of `styles.css`: `--bar-white/yellow/cyan/green/magenta/red/blue`,
  `--tally` (REC red). One bar per discipline: photo white, social yellow, podcast cyan, nonprofit
  green, motion magenta, interviews red, corporate blue. The contents band is literally the bars,
  in true SMPTE order, with the PLUGE row under them.
- Type: Archivo **condensed** (`font-stretch: 66–75%`, weight 800, uppercase) for display — a
  broadcast lower-third feel — and JetBrains Mono for timecode and labels.
- Unique pieces: header **timecode** that scrubs through the total runtime of all 259 pieces as you
  scroll; hero **program monitor** with a 5-clip bin (`MONITOR_BIN`), burn-in TC off the preview;
  **35mm strip** with sprocket holes and amber edge codes; title-safe guides + TC burn-in on every
  thumbnail on hover; commission rows as **timeline tracks** (V1–V6); clients as an **end-credits
  roll**; contact form as a **clapperboard slate** (dated today); footer "End of reel".
- The About photo is the **real** retouched headshot (`jacob-headshot-RETOUCHED-real.jpg`), not the
  AI-generated one (`jacob-headshot.jpg`) — swap the `src` in `index.html` to go back.

**Jacob asked for each of these to go — never reintroduce:** custom cursor, RGB-split headline
glitch, preloader/intro screen, hero reel rotation, headline reveal animation, orange accent.

---

## Gotchas

- **Cache busting.** CSS/JS are referenced with `?v=34` (as of 2026-10-01). If you edit
  `public/styles.css` or any `.js`, bump it in **all three** HTML files, or browsers serve a stale copy.
- **No inline `style=""` — the live CSP blocks it.** `public/_headers` sets `style-src 'self'`, which
  silently drops every inline style attribute, *including ones written via `innerHTML`*. That broke
  every aspect ratio on the live site until 2026-09-29 (all cards fell back to 9:16). Put per-item
  values in `data-ar="16/9"` and call `paintAR()` (CSSOM is allowed). Same for inline `onclick`/
  `onsubmit` — use `addEventListener`. Test locally under the real policy (see session log below).
- **Replacing a photo in place?** `/assets/*` is cached `immutable` for a year. Bump `PHOTO_REV` in
  `common.js`, or returning visitors keep the old file.
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

### 9. Showreel, two-tier filtering, Y2K pass

**There is now a showreel** — `public/assets/video/showreel.mp4`, 24s, cut with ffmpeg from twelve
existing library clips (in-points and order in the build script; verticals pillarboxed to 1920x1080,
end card drawn with drawtext). Research was blunt about this: recruiters give a portfolio under two
minutes and expect a reel first, and there wasn't one. Rebuild it whenever the best work changes.

**Two-tier filtering** — his complaint was that a client couldn't tell the creative work from the
corporate work. `GROUPS` (Everything / Creative &amp; Motion / Client &amp; Commercial) sits above the
category chips; the chips then count and offer only categories inside the chosen group. The two
groups sum to exactly 158, so nothing is orphaned — **keep that true** if categories change.

**Résumé is finally linked** — `public/assets/files/Jacob_Gonzales_Resume.docx`, Aqua button in contact.

**Y2K pass**, from actual research into the aesthetic (chrome, Aqua gloss, bloom, starfield, blobs):
glossy Aqua-gradient buttons, chrome-gradient hero type, drifting starfield, 3D `rotateY` spin on
the floating objects. **The RGB-split headline glitch was removed — he found it cringe. Don't
reintroduce it.**

**Verification, learned the hard way:** `node --check` only parses. It shipped a temporal-dead-zone
bug that blanked the whole site. Use `scratchpad/verify.js` instead — it executes manifest.js +
script.js against a stubbed DOM and asserts group totals and asset refs. Run it before every push.

**Line endings:** the repo files are CRLF. Node patch scripts must normalise to LF, patch, then
restore CRLF, or every string match silently fails.

## Two redesigns collided — 2026-10-01

A parallel session pushed **THE WALL** (59df79d: autoplaying tile wall, colour sampled from each
poster, Bricolage Grotesque) to `main` while AFTERGLOW was being built on a branch. Jacob saw both
and chose **AFTERGLOW**. It was merged with `-s ours`, so THE WALL stays in history (revertable),
and two of its parts were kept: the 259 preview loops in `assets/preview/` (+ `tools/make_previews.py`)
and the per-piece `accent` colours in `manifest.js` (+ `tools/extract_colors.py`).
**Before any redesign, `git fetch` and check `main` hasn't moved.**

## Session log — 2026-09-29 (cloud session): AFTERGLOW redesign

Jacob: *"make it look super cool and awesome… it looks like boring black, it's lame."* The LEDGER
design (2026-08-31) had deliberately stripped all colour; he didn't like the result. Rebuilt the
look, kept every section, all content, draft mode and `site-config.js` exactly as they were.

**What changed**
- New visual system (see *Design system* above). Hero is now a two-column layout: huge expanded
  name with gradient surname, status pill, stats, and a fanned stack of three pieces
  (`HERO_STACK` in `script.js`) with a chrome star from `assets/y2k/`.
- New: moving film strip of 16 posters (`RIBBON` in `script.js`) crossed by a gradient word tape;
  discipline tiles with count-up; client-name marquee; roster folds to 3 rows behind a button;
  gradient contact panel; SVG footer wordmark (`textLength` makes it fit whatever font loads).
- **Selected Work and the index grid are masonry** (`pack()` in `common.js`): true aspect ratios,
  no holes, no cropping. The old fixed slot score left big gaps beside verticals.
- **Index defaults to grid** (thumbnails sell footage better than a table). "All" deals the
  categories out in turn (`MIXED`) so page one isn't seven NRG verticals. List view still there.
- **Hover previews are ON** (`PREVIEWS = true` in `site-config.js`). They play the 5 s silent loops in
  `assets/preview/<id>.mp4`. **New work needs one too:** run `tools/make_previews.py` (fix its
  hardcoded ffmpeg path for your machine) after adding a video.
- Podcasts + Photography pages rebuilt on `common.js`. **Their lightbox had been broken since
  LEDGER** — it used an old `<div class="lb">` that no CSS matched, so clicking a card did nothing
  visible. Now the same `<dialog>` as the homepage.

**Bugs fixed on the live site**
- CSP was blocking every inline `--ar` style → all cards were 9:16 crops live. (See Gotchas.)
- "Starta project" in the nav: a leading space inside a flex item collapses. Now `&nbsp;`.
- **7 photos were stored sideways** in the files themselves (hormats-3/4/5, wellybay-3/4/5/6).
  Rotated upright with Pillow; `PHOTOS` entries now carry `w`/`h` like `REELS` do.

**How it was verified** (cloud container, Playwright + Chromium): served `public/` with the exact
CSP from `_headers` and checked 1440 / 1024 / 880 / 390 widths — no console errors, no CSP
violations, no horizontal scroll, fonts load, filters/search/view toggle/roster/Load more work,
lightbox closes by X, Esc and backdrop with teardown, draft mode still shows 4 blanks + 18 chips,
reduced-motion shows final numbers and stops the marquees. That Chromium has **no H.264**, so hover
previews were verified by wiring (correct `src` attached on hover, released on leave), not by
watching playback — worth a real-browser look.

**Instagram confirmed (2026-10-01):** Jacob's handle is **@toast.89** —
`SITE.instagram` now points to `https://www.instagram.com/toast.89`, matching the sub-pages.

## Session log — 2026-10-07 (cloud session): cleanup, horse photos out, device mockups

**Cleanup ("organize the garbage").** Nothing was deleted from the video library.
- **15 weak posters re-grabbed** from a better frame (blank white/black/green first frames on fine
  videos): picked automatically as the frame with the most contrast + colour out of 11 samples, then
  checked by eye. Posters now load with `?r=POSTER_REV` (`common.js`) because `/assets/*` is cached
  immutable — **bump `POSTER_REV` whenever a poster is replaced in place.**
- **13 pieces hidden** with `hide: true` in `manifest.js`: the five 365 Wellness lower-thirds on
  black (`wellness-lt-*`, not `-text`), the green-screen `wellness-lower-third`, `sparked-notification`,
  `sparked-spark-mark`, `ceod-logo`, `wellness-walkin-outro`, and duplicates `polo-recap-ae-2`,
  `eqb2b-comp`, `virtual-card-demo`. `common.js` drops hidden entries before anything renders, so
  every count agrees (246). Delete the `hide: true` line to bring one back.

**Horse photos removed** at Jacob's request: the whole Catherine Hormats equestrian session
(`hormats-1…6`) is gone from `photos-manifest.js` and the repo. Don't re-add it.

**Device mockups ("On screen", under Selected Work).** Three 10 s silent loops of his real work in
device frames, `public/assets/mockups/{reels,studio,monitor}.mp4` + posters. Two made in **Remotion**
(three phones; laptop + phone), one in **HyperFrames** (broadcast monitor with an animated lower
third). Sources and render steps in `tools/mockups/`. They load and play only while on screen, pause
off screen, and are posters only under reduced motion. Click opens the original piece.

**Tooling in a cloud session** (gone when the container is reclaimed — reinstall each time):
`apt-get install ffmpeg blender` (Blender 4.0.2), `npm i remotion @remotion/cli hyperframes gsap`.
Remotion's own Chrome download (remotion.media) is blocked by the sandbox network policy; use
`npx hyperframes browser ensure` and pass that binary to Remotion with `--browser-executable`.

**2026-10-08 additions:** grid thumbnails in `assets/thumbs/` (25 MB of posters → 4 MB of WebP; desktop
homepage image weight 563 KB → 130 KB). `posterImg()` serves them with a `srcset` that still pulls the
full poster on sharp screens, and swaps to the poster if a thumb is missing — so new work works without
one, but make one for speed: PIL resize to 640 wide (landscape) / 480 wide (portrait), WebP q74.
Social link preview: `assets/share.jpg` (1200x630) via og:image on all three pages.
Podcasts page: each show opens on one row with a "Show all" button.
