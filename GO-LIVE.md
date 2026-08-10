# Putting the site online

This is a plain static website — no build step, no server. You drag the folder somewhere and
it's live.

---

## ⚡ Fastest way — live in about 2 minutes

**Netlify Drop.** No account needed to start.

1. Go to **https://app.netlify.com/drop**
2. Drag the **`public` folder** onto the page.
3. Wait for the upload (~400 MB, so give it a few minutes on a slow connection).

You get a live URL immediately, something like `https://cheerful-otter-1a2b3c.netlify.app`.

Make a free account right after so you keep the URL and can rename the site to something
like `jacobgonzales.netlify.app`.

**To update later:** drag the folder onto the same page again.

> Free plan gives 100 GB of bandwidth a month. That sounds tight for a video site, but the
> videos only download when someone hovers or clicks a card — a normal visit is a few MB.
> You'd need serious traffic to hit the cap.

---

## 🔁 Better long-term — auto-updating site

Set this up once and the live site updates itself whenever the files change here. No more
dragging.

This folder is **already a git repository** with everything committed, so most of the work is done.

**Step 1 — put it on GitHub**
1. Go to **https://github.com/new**, make a **private** repo called `portfolio`.
   Do *not* tick "Add a README".
2. GitHub shows you a "push an existing repository" box. Copy the two `git remote add` /
   `git push` lines and run them in this folder — or just tell Claude Code the repo URL and
   it'll run them for you.

**Step 2 — connect Cloudflare Pages**
1. **https://dash.cloudflare.com** → **Workers & Pages** → **Create** → **Pages** →
   **Connect to Git**.
2. Pick the `portfolio` repo.
3. Build settings: leave the build command **empty**, set output directory to **`public`**.
4. **Save and Deploy.**

Done. From then on, any change that gets pushed makes the live site rebuild in about a minute.
Cloudflare's free plan has **unlimited bandwidth**, which suits a video-heavy site better than
Netlify's cap.

> One thing to know: git keeps every version of every file forever. Swapping out lots of video
> repeatedly will grow the repo permanently. Adding new clips is fine — that's just growth you'd
> have anyway.

---

## 🌐 Custom domain (jacobgonzales.com or similar)

1. Buy the domain — Cloudflare Registrar, Namecheap or Porkbun, roughly $10–15/year.
2. **Cloudflare Pages:** project → **Custom domains** → **Set up a domain**, then follow the DNS
   steps it gives you.
   **Netlify:** **Domain settings** → **Add custom domain**.
3. HTTPS is automatic and free on both.

---

## 📁 What's in this folder

| Path | What it is |
|---|---|
| `public/index.html` | Homepage — hero, work grid, about, contact |
| `public/podcasts.html` | Every podcast/talk-show reel, grouped by show |
| `public/photography.html` | Photo sessions |
| `public/styles.css` | All styling |
| `public/script.js`, `podcasts.js`, `photos.js` | Page behaviour |
| `public/assets/manifest.js` | **The video list — edit this to add/remove/reorder work** |
| `public/assets/photos-manifest.js` | The photo list |
| `public/assets/video/` · `posters/` · `photos/` | The media |
| `_headers`, `netlify.toml`, `robots.txt`, `.gitignore` | Config — leave alone |

---

## ➕ Adding new work later

Open `public/assets/manifest.js` and copy an existing block:

```js
{
  id: "my-new-clip",          // must match assets/video/my-new-clip.mp4
  category: "podcast",         // podcast | corporate | nonprofit | interviews | motion | social
  client: "Client Name",
  title: "What it's called",
  blurb: "One line about it.",
  orientation: "portrait"      // portrait or landscape
},
```

Then drop `my-new-clip.mp4` into `public/assets/video/` and a matching `my-new-clip.jpg` thumbnail into
`assets/posters/`.

**Keep each video under ~20 MB.** Cloudflare Pages rejects anything over 25 MB per file. The
current largest is 18.5 MB.

If you edit `public/styles.css` or any `.js`, bump the `?v=2` on that file's tag in the HTML to `?v=3`
so browsers pick up the change instead of serving a cached copy.
