# Deploying the local-clients update (Nov 22, 2026)

**Nothing here is live yet.** The changes sit on branch `local-clients-nov22` in this folder
(`C:\Users\jacee\Downloads\cluade stuff\portfolio-local-clients`, a git worktree of `portfolio-repo`).
They are not committed and not pushed. Going live needs Jacob's yes.

## The site you already have

- **Live at https://jacobgonzales.tv** (and `www.`). Fallback: https://portfolio.jacee561.workers.dev
- It is a **Cloudflare Worker named `portfolio`** that serves the static files in `public/`
  (`wrangler.jsonc`). It is not a Pages project, and no new project is needed. A second
  "jacob-gonzales-portfolio" project would only create a duplicate copy of the same site.
- Normal deploys are automatic: **push to `main` on GitHub (`jacee561-beep/portfolio`) and
  Cloudflare rebuilds in about a minute** (see `CLAUDE.md`).
- The old folder `C:\Users\jacee\Downloads\cluade stuff\portfolio\_site` is the abandoned August
  single-file site. Do not deploy it. Everything good from it is already in this repo.

## What this update changes

- Hero, page title, search description and structured data now say who it is for: businesses in
  Palm Beach County (reels, product video, 3D product renders, motion graphics, VFX, event recaps).
- New section **02 Product & 3D**: 3 product reels plus 6 stills for The Unordinary Depot
  (renders from the CAD files plus real T1 photos), linking to unordinarydepot.com.
- New section **03 For local businesses**: who it is for, 6 services (each with a real example
  that opens in the player), and How it works (shoot or send, edit, two rounds of changes).
- Contact: region line, form options for local jobs, smaller budget brackets, and an optional
  phone / text line that stays hidden until `phone` is set in `public/assets/site-config.js`.
- The 3 reels are also in the Index and in Branded Social (249 pieces). The Unordinary Depot is
  listed as his own brand, so it is not counted in the clients or the end credits.
- Cache version bumped `?v=36` to `?v=37` on all four pages.

## Check before going live (2 minutes)

```bash
cd "C:/Users/jacee/Downloads/cluade stuff/portfolio-local-clients"
python -m http.server 8901 --directory public
# open http://localhost:8901/?bust=1 and http://localhost:8901/?draft=1
```

Hosting limits, checked Nov 22:
- Cloudflare's limit is 25 MiB per file. **No file is over 20 MB.** The largest is
  `hona-collaborators.mp4` at 18.6 MiB.
- 1,122 files in `public/`. The Workers limit is 20,000.
- New media in this update: 8.6 MB in total. The three web reels are 1.0, 2.7 and 3.1 MB
  (720x1280 H.264, CRF 23, faststart). Their audio is copied untouched: the MD5 of the audio
  stream matches the originals in `outputs/marketing/reels-nov22/`. The originals are unchanged.
- Upload at the home connection's ~2 Mbps: about 40 seconds for the new files.

## Going live: option A, the normal way (auto-deploy)

Run in the worktree after Jacob says yes:

```bash
cd "C:/Users/jacee/Downloads/cluade stuff/portfolio-local-clients"
git add -A
git commit -m "Local clients: Product & 3D, services, how it works, contact"
git push -u origin local-clients-nov22        # backup of the branch, NOT live
cd "../portfolio-repo"
git fetch origin
git checkout main && git pull
git merge --no-ff local-clients-nov22
git push origin main                            # THIS is the deploy, live in ~1 min
```

Note: `portfolio-repo` currently has uncommitted ad-pipeline work in `tools/ads/` on branch
`claude/loving-dijkstra-syl32o`. It does not touch `public/`. Commit or stash it before
`git checkout main`.

## Going live: option B, direct with wrangler

This uploads only the changed files (wrangler hashes all 1,122 and sends the new ones). It is the
same tool used for the store on this PC. If its login has expired, `bunx wrangler login` opens a
browser sign-in that Jacob does himself.

```bash
cd "C:/Users/jacee/Downloads/cluade stuff/portfolio-local-clients"
bunx wrangler deploy            # reads wrangler.jsonc: worker "portfolio", assets ./public
```

If the GitHub auto-deploy is still on, the next push to `main` replaces whatever wrangler sent.
So after option B, still merge to `main` (option A), or the next push will undo this update.

Optional private look first: `bunx wrangler versions upload` uploads a version without
switching traffic to it. Cloudflare gives it a preview URL if preview URLs are on for the worker.
Promote it with `bunx wrangler versions deploy`.

## Rollback

- `bunx wrangler rollback` returns to the previous version in seconds.
- Or `git revert <merge commit>` on `main` and push.

## Domain options

1. **Keep jacobgonzales.tv** (already registered on Cloudflare since Aug 11, 2026, already
   bound). Nothing to do. This is the recommendation.
2. Free business email on the domain: Cloudflare Email Routing, `jacob@jacobgonzales.tv`
   forwarding to Gmail. It needs his Cloudflare login. Then change `email` in `site-config.js`
   (his Oct 8 call was to keep the Gmail).
3. A second domain can point at the same worker later (add it to `routes`). Only add a route
   after the domain shows Active in Cloudflare, or every deploy fails. `jacobgonzales.com` and
   `.net` are registered at IONOS. Check whether that is his own account.

## Needs Jacob's yes before it goes live

1. **The deploy itself** (option A or B above).
2. **Phone / text number:** his cell, a free Google Voice number for video work, or none.
   Do not use the horn shop line (561) 507-0280 unless he wants it to answer for both.
3. **"Two rounds of changes are included"** in How it works. Is that his policy?
4. **The three Depot reels on the portfolio.** Their posting doubts are still open
   (`outputs/marketing/reels-nov22/POSTING-KIT.md`): the "3D RENDER" chips, the Hz figures in
   reel 1, reel 2 showing the sold T1-26-0001, and the $129 launch price (the sale ends Dec 3).
5. **Footer says "Khanna House Studios · South Florida"** (his employer) on a page that now sells
   his own freelance work to local businesses. Keep it, or change it to his name and the county?
6. **Budget brackets** in the form now start at "Under $500". Fine, or different ranges?

## Before / after pictures

`C:\Users\jacee\Downloads\cluade stuff\outputs\portfolio-nov22\screens\`
- `before-desktop-full.png`, `before-phone-full.png` (the live site as it is now)
- `after-desktop-full.png`, `after-phone-full.png`
- `after-contact-demo-phone-desktop.png` / `-phone.png` (contact with a fake 555 number injected,
  to show how a real number looks; nothing on disk has a number)
- `after-contact-draft-*.png` (the `?draft=1` view with the phone placeholder)
- `*-sheet.jpg` = the same pages tiled side by side for a quick look
