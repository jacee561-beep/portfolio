/* ============================================================
   common.js — shared by index, podcasts and photography.
   Load order on every page: (site-config) → manifest(s) → common → page.

   CSP NOTE: the live site's Content-Security-Policy (public/_headers)
   blocks inline style="" attributes, including ones written through
   innerHTML. Per-item values such as aspect ratio are therefore written
   as data-ar="16/9" in markup and applied by paintAR() through the
   CSSOM, which the policy allows.
   ============================================================ */

const $ = (s, r = document) => r.querySelector(s);
const $$ = (s, r = document) => [...r.querySelectorAll(s)];
const esc = (s) => String(s ?? "").replace(/[&<>"]/g,
  (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" }[c]));

/* Reduced motion is read LIVE — a user can change it mid-session. */
const motionMQ = matchMedia("(prefers-reduced-motion: reduce)");
let reduced = motionMQ.matches;
motionMQ.addEventListener("change", (e) => { reduced = e.matches; if (reduced) releasePreview(); });
const finePointer = matchMedia("(hover: hover) and (pointer: fine)").matches;

const CAT_LABEL = {
  podcast: "Podcast",
  motion: "Motion",
  nonprofit: "Nonprofit & Events",
  corporate: "Corporate",
  social: "Branded Social",
  interviews: "Interviews",
};

const ar = (r) => (r.w && r.h ? `${r.w}/${r.h}` : r.orientation === "landscape" ? "16/9" : "9/16");
const hasSite = typeof SITE !== "undefined";
const roleOf = (r) => r.role || (hasSite && SITE.defaultRoles && SITE.defaultRoles[r.category]) || null;

function paintAR(root = document) {
  $$("[data-ar]", root).forEach((el) => el.style.setProperty("--ar", el.dataset.ar));
}

/* Photos are served with a revision query because /assets/* is cached as
   immutable for a year (public/_headers). Bump this whenever a photo file
   is replaced in place, or returning visitors keep the old copy. */
const PHOTO_REV = 2;
const photoSrc = (id) => `assets/photos/${id}.jpg?r=${PHOTO_REV}`;

/* poster <img> with honest intrinsic size, so layout never jumps */
function posterImg(r, extra = 'loading="lazy"') {
  return `<img src="assets/posters/${r.id}.jpg" alt="${esc(r.title)}"
    width="${r.w || 1920}" height="${r.h || 1080}" ${extra} decoding="async" />`;
}

/* ---------- the pooled hover preview ----------
   ONE <video> for the whole page, playing a 5 s silent loop of the piece
   from assets/preview/ (built by tools/make_previews.py, ~70-350 KB each).
   Setting a new src cancels the previous download, and release() clears
   it outright, so sweeping the mouse across a grid never stacks up
   parallel downloads. Files are +faststart, so playback starts on the
   first few hundred KB. */
const PREVIEW_ON = typeof PREVIEWS === "undefined" ? true : PREVIEWS;
const preview = Object.assign(document.createElement("video"), {
  muted: true, loop: true, playsInline: true, preload: "none",
});
preview.setAttribute("muted", "");
preview.setAttribute("disableremoteplayback", "");
preview.setAttribute("disablepictureinpicture", "");
preview.setAttribute("aria-hidden", "true");
let armed = null, pending = null, armTimer = 0;

function releasePreview() {
  clearTimeout(armTimer);
  pending = null;
  if (!armed) return;
  armed.classList.remove("playing");
  armed = null;
  preview.pause();
  preview.removeAttribute("src");
  preview.load();              // cancels any in-flight download
  if (preview.parentNode) preview.parentNode.removeChild(preview);
}

function armPreview(host, id) {
  if (reduced || !PREVIEW_ON || !finePointer) return;
  if (armed === host || pending === host) return;
  clearTimeout(armTimer);
  pending = host;
  armTimer = setTimeout(() => {
    releasePreview();
    const box = $(".media", host);
    if (!box) return;
    preview.src = `assets/preview/${id}.mp4`;
    box.appendChild(preview);
    armed = host;
    preview.play().then(() => { if (armed === host) host.classList.add("playing"); })
      .catch(() => { if (armed === host) releasePreview(); });
  }, 240);
}

/* Wire hover-preview + click-to-open on a container, by delegation.
   `sel` finds the piece element; it must carry data-id. */
function wirePieces(container, sel, lookup) {
  if (!container) return;
  container.addEventListener("pointerover", (e) => {
    if (e.pointerType !== "mouse") return;
    const host = e.target.closest(sel);
    if (host && container.contains(host)) armPreview(host, host.dataset.id);
  });
  container.addEventListener("pointerout", (e) => {
    const host = e.target.closest(sel);
    if (host && (host === armed || host === pending) && !host.contains(e.relatedTarget)) releasePreview();
  });
  container.addEventListener("pointerleave", () => { clearTimeout(armTimer); releasePreview(); });
  container.addEventListener("click", (e) => {
    const host = e.target.closest(sel);
    if (!host) return;
    e.preventDefault();
    const r = lookup(host.dataset.id);
    if (r) openLB(r);
  });
}

/* ---------- slate: the small facts under a piece ---------- */
function slate(r) {
  const cells = [
    ["Client", r.client],
    ["Role", roleOf(r)],
    ["Year", r.year],
    ["Runtime", r.dur],
  ].filter(([, v]) => v);                        // never render an empty cell
  if (!cells.length) return "";
  return `<dl class="slate">${cells.map(([k, v]) =>
    `<div><dt>${k}</dt><dd>${esc(v)}</dd></div>`).join("")}</dl>`;
}

/* ---------- lightbox — native <dialog> ---------- */
const lb = $("#lb");
function openLB(r) {
  if (!lb) return;
  releasePreview();
  const isPhoto = !r.category;
  $("#lbMedia").innerHTML = isPhoto
    ? `<img src="${photoSrc(r.id)}" alt="${esc(r.title)}" />`
    : `<video src="assets/video/${r.id}.mp4" controls autoplay playsinline
         poster="assets/posters/${r.id}.jpg"></video>`;
  $("#lbMeta").innerHTML =
    `<h3>${esc(r.title)}</h3><p>${esc(r.client)}${r.blurb ? " — " + esc(r.blurb) : ""}</p>` +
    (isPhoto ? "" : slate(r));
  lb.showModal();
}
function teardown() {
  const v = $("#lbMedia video");
  if (v) { v.pause(); v.removeAttribute("src"); v.load(); }
  $("#lbMedia").innerHTML = "";
}
/* Do NOT rely on the "close" event alone — it does not fire in every engine
   (verified: a bare <dialog> fails to fire it in some Chromium builds), which
   would leave the video playing with audio over the page after closing.
   teardown() is idempotent, so calling it from several paths is safe. */
function closeLB() { teardown(); if (lb.open) lb.close(); }
if (lb) {
  lb.addEventListener("close", teardown);
  lb.addEventListener("cancel", teardown);          // Esc
  $("#lbX").addEventListener("click", closeLB);
  lb.addEventListener("click", (e) => { if (e.target === lb) closeLB(); });
  document.addEventListener("keydown", (e) => { if (e.key === "Escape" && lb.open) closeLB(); });
}

/* ---------- count-up: numbers run from 0 when they scroll into view ----------
   The real number is in the markup, so no-JS and reduced-motion visitors
   simply see it. */
function countUp(root = document) {
  const els = $$("[data-count]", root);
  if (reduced || !("IntersectionObserver" in window)) return;
  const io = new IntersectionObserver((entries) => {
    entries.forEach((e) => {
      if (!e.isIntersecting) return;
      io.unobserve(e.target);
      const el = e.target;
      const end = +el.dataset.count;
      const suffix = el.dataset.suffix || "";
      const t0 = performance.now(), dur = 1300;
      const step = (t) => {
        const k = Math.min(1, (t - t0) / dur);
        el.textContent = Math.round(end * (1 - Math.pow(1 - k, 3))) + suffix;
        if (k < 1) requestAnimationFrame(step);
      };
      requestAnimationFrame(step);
    });
  }, { threshold: 0.4 });
  els.forEach((el) => { el.textContent = "0" + (el.dataset.suffix || ""); io.observe(el); });
}

/* ---------- timecode ---------- */
const FPS = 30;
const pad2 = (n) => String(n).padStart(2, "0");
function timecode(sec) {
  const f = Math.floor(sec * FPS);
  return `${pad2(Math.floor(f / (3600 * FPS)))}:${pad2(Math.floor(f / (60 * FPS)) % 60)}:${pad2(Math.floor(f / FPS) % 60)}:${pad2(f % FPS)}`;
}
const durSec = (d) => String(d || "0").split(":").reduce((t, x) => t * 60 + (+x || 0), 0);
const durTC = (d) => timecode(durSec(d));

/* ---------- the room takes its colour from the footage ----------
   Every piece carries `accent` (sampled from its poster by
   tools/extract_colors.py). Pointing at a piece tints the page wash. */
const ACCENTS = new Map(typeof REELS !== "undefined" ? REELS.map((r) => [r.id, r.accent]) : []);
function setTint(r) {
  const c = r && (r.accent || ACCENTS.get(r.id));
  if (c) document.documentElement.style.setProperty("--tint", c);
}
document.addEventListener("pointerover", (e) => {
  if (e.pointerType !== "mouse") return;
  const host = e.target.closest && e.target.closest("[data-id]");
  if (host && ACCENTS.get(host.dataset.id)) setTint({ id: host.dataset.id });
});

/* ---------- masonry ----------
   Deals items into N columns, shortest column first. Mixed aspect ratios
   pack with no holes and nothing is cropped, while the first N items still
   read left to right. Items carry data-pack (order) and data-ar ("w/h").
   Re-packs itself when a breakpoint changes the column count. */
const packs = new Map();
function pack(container, colsFor, extra = 0.3) {
  if (!container) return;
  const state = { container, colsFor, extra, cols: 0 };
  packs.set(container, state);
  layPack(state, true);
}
function unpack(container) {
  packs.delete(container);
  container.classList.remove("packed");
}
function layPack(st, force) {
  const cols = st.colsFor(innerWidth);
  if (!force && cols === st.cols) return;
  st.cols = cols;
  const c = st.container;
  const items = $$("[data-pack]", c).sort((a, b) => a.dataset.pack - b.dataset.pack);
  c.textContent = "";
  c.classList.add("packed");
  const colEls = Array.from({ length: cols }, () => {
    const d = document.createElement("div");
    d.className = "mcol";
    c.appendChild(d);
    return d;
  });
  const h = new Array(cols).fill(0);
  items.forEach((el) => {
    const [w, hh] = (el.dataset.ar || "16/9").split("/").map(Number);
    const i = h.indexOf(Math.min(...h));
    colEls[i].appendChild(el);
    h[i] += Math.min(hh / w, 1.9) + st.extra;
  });
}
let packT = 0;
addEventListener("resize", () => {
  clearTimeout(packT);
  packT = setTimeout(() => packs.forEach((st, c) => {
    if (c.isConnected) layPack(st, false); else packs.delete(c);
  }), 150);
});

/* footer year on sub-pages */
$$("[data-year]").forEach((el) => { el.textContent = new Date().getFullYear(); });
