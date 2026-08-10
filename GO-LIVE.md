# Putting the site online

Everything here is a plain static website — no build step, no server. You drag the folder
somewhere and it's live.

---

## Recommended: Cloudflare Pages (free, unlimited bandwidth)

Best fit because the site is video-heavy and Cloudflare doesn't meter bandwidth on the free plan.

1. Go to **https://dash.cloudflare.com** → sign up / log in (free account).
2. Left sidebar → **Workers & Pages** → **Create** → **Pages** → **Upload assets**.
3. Give it a project name, e.g. `jacob-gonzales`.
4. Drag this **entire folder** onto the upload box. Wait for it to finish.
5. Click **Deploy site**.

You get a live URL like `https://jacob-gonzales.pages.dev`.

**To update later:** same screen → **Create new deployment** → drag the folder again.

---

## Alternative: Netlify Drop (easiest, 30 seconds)

Simplest possible, but the free plan caps bandwidth at 100 GB/month. Fine for a portfolio
unless it gets heavy traffic.

1. Go to **https://app.netlify.com/drop**
2. Drag this **entire folder** onto the page.
3. Done — you get a live URL immediately.

Make a free account afterwards to keep the URL and rename the site.

---

## Custom domain (e.g. jacobgonzales.com)

1. Buy the domain (Namecheap, Cloudflare Registrar, Porkbun — ~$10–15/year).
2. In Cloudflare Pages: your project → **Custom domains** → **Set up a domain** → follow the
   DNS steps it gives you.
   In Netlify: **Domain settings** → **Add custom domain** → same idea.
3. HTTPS is automatic and free on both.

---

## What's in this folder

| Path | What it is |
|---|---|
| `index.html` | Homepage — hero, work grid, about, contact |
| `podcasts.html` | Every podcast/talk-show reel, grouped by show |
| `photography.html` | Photo sessions |
| `styles.css` | All styling |
| `script.js`, `podcasts.js`, `photos.js` | Page behaviour |
| `assets/manifest.js` | **The video list — edit this to add/remove/reorder work** |
| `assets/photos-manifest.js` | The photo list |
| `assets/video/` | Video files |
| `assets/posters/` | Thumbnail for each video |
| `assets/photos/` | Photos |
| `_headers`, `netlify.toml`, `robots.txt` | Hosting config — leave them alone |

---

## Adding new work later

Open `assets/manifest.js` and copy an existing block:

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

Then drop `my-new-clip.mp4` into `assets/video/` and a `my-new-clip.jpg` thumbnail into
`assets/posters/`. Re-upload the folder to your host.

---

## Note on video size

Videos in `assets/video/` are compressed to 720p for fast web loading (originals live on your
archive drives). If you ever swap in a fresh file, keep it under ~20 MB or Cloudflare Pages
will reject it (25 MB per-file limit).
