/* ============================================================
   Jacob Gonzales — portfolio interactions
   ============================================================ */

const $ = (s, r = document) => r.querySelector(s);
const $$ = (s, r = document) => [...r.querySelectorAll(s)];
const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

document.getElementById("yr").textContent = new Date().getFullYear();

/* Preloader removed — the site now paints immediately. */

/* ---------- header ---------- */
(function header() {
  const hdr = $("#hdr"), burger = $("#burger"), nav = $("#nav"), prog = $("#prog");
  let last = 0;
  const onScroll = () => {
    const y = window.scrollY;
    hdr.classList.toggle("solid", y > 40);
    if (!nav.classList.contains("open")) {
      hdr.classList.toggle("hide", y > last && y > 340);
    }
    last = y;
    const h = document.documentElement.scrollHeight - window.innerHeight;
    prog.style.width = (h > 0 ? (y / h) * 100 : 0) + "%";
  };
  window.addEventListener("scroll", onScroll, { passive: true });
  onScroll();

  burger.addEventListener("click", () => {
    burger.classList.toggle("x");
    nav.classList.toggle("open");
  });
  $$("#nav a").forEach((a) =>
    a.addEventListener("click", () => {
      burger.classList.remove("x");
      nav.classList.remove("open");
    })
  );
})();

/* Hero highlight-reel rotation removed — the hero is a single still image.
   The work itself carries the page; an auto-playing reel up top competed
   with the grid and was the first thing a visitor had to sit through. */

/* ---------- marquee ---------- */
(function marquee() {
  const clients = [...new Set(REELS.map((r) => r.client))];
  const row = clients.map((c) => `<span>${c}</span>`).join("");
  $("#marquee").innerHTML = row + row;
})();

/* ---------- work grid ---------- */
const PAGE = 18;
let active = "all";
let shown = PAGE;

const grid = $("#grid");
const moreBtn = $("#moreBtn");

$("#workCount").textContent = REELS.length;

/* Keep the "Pieces delivered" stat in sync with the manifest so it can't go
   stale when work is added. (It was hardcoded at 151 and drifted.) */
const piecesStat = $('[data-count][data-auto="pieces"]');
if (piecesStat) piecesStat.dataset.count = REELS.length;

/* ============================================================
   Two-tier filtering.
   A visitor could not tell the creative work from the corporate
   work. The top tier splits those; the category chips below then
   only count and offer categories inside the chosen group.
   ============================================================ */
const GROUPS = [
  { id: "all",        label: "Everything",             cats: null },
  { id: "creative",   label: "Creative &amp; Motion",      cats: ["motion", "social"] },
  { id: "commercial", label: "Client &amp; Commercial",    cats: ["podcast", "corporate", "nonprofit", "interviews"] },
];
let group = "all";
const inGroup = (r) => {
  const g = GROUPS.find((x) => x.id === group);
  return !g || !g.cats ? true : g.cats.includes(r.category);
};

/* ============================================================
   Grid ordering — by VISUAL IMPACT, not by volume.

   A prospective client scrolls a few rows and leaves. Previously
   the sort favoured clients with the most pieces, which meant 92
   talking-head podcast reels outranked the VFX and design work.
   That buries the strongest material.

   Order now:
     1. SHOWCASE — hand-picked openers, rendered as large cards
     2. impact tier (see below), lowest number first
     3. within a tier, a client's work stays contiguous
   ============================================================ */

/* Rendered double-width at the top of the grid. */
const SHOWCASE = [
  "cryptorubik-orb",
  "vaporwave-collage",
  "tht-plane-intro",
  "polo-recap-ae",
  "cryptorubik-spot",
  "sparked-logo",
];

/* Tier 1 — design/VFX/3D led. The work that makes someone stop scrolling. */
const TIER1 = new Set([
  ...SHOWCASE,
  "cryptorubik-market", "cryptorubik-cube",
  "tht-logo-intro", "tht-blue-intro", "tht-card-animation", "tht-card-animation-2",
  "sparked-spark-mark", "sparked-notification", "sparked-logo-sting", "sparked-outro",
  "polo-recap-ae-2", "insight-logo-animation", "insight-ite-intro",
  "ite-brand-intro-prerender", "insight-brand-outro",
  "khs-logo-intro", "khs-intro-loop", "ceod-logo", "rtdb-logo-intro",
  "csc-intro", "csc-outro", "eqb2b-comp", "eqb2b-ep3-intro",
  "dk-intro", "dk-outro", "nrg-intro", "gygo-podcast-intro",
  "od2a-webinar-titles",
  "tennis-with-ema-podcast-intro", "tennis-with-ema-podcast-outro",
  "tennis-with-ema-lucky-in-love-sponsor-spot", "tennis-with-ema-match-set-sponsor-spot",
]);

/* Tier 2 — polished branded/produced pieces. */
const TIER2 = new Set([
  "sparked-rethink", "sparked-how-it-works", "sparked-thank-you", "sparked-school-leaders",
  "hona-open", "hona-generic", "hona-sponsors",
  "childrens-harbor-reel1", "childrens-harbor-reel2", "cch-golf-reel1",
  "literacy-coalition-recap", "literacy-kravis-luncheon", "hona-recap",
  "people-of-purpose-recap", "gift-gathering-recap", "promisefund-event",
  "insight-brand-story", "insight-names-not-numbers", "insight-nnn-clip-3",
  "wybt-promo", "patricia-heaton", "super-fit-champs-film",
  "vertical-caption-reel", "devi-kodak-jeep-reel",
  "julie-khanna-reel-1", "julie-khanna-reel-2", "julie-khanna-reel-red",
  "jenilee-reel1", "jenilee-reel2",
  "tithing-tree-reel1", "tithing-tree-reel2", "valentyna-g-polo-sundays",
]);

/* Tier 4 — least visually distinctive: repetitive utility graphics,
   near-identical award packages, plain talking-head cuts, long-form excerpts. */
const isTier4 = (r) =>
  /lower third/i.test(r.title) ||
  /nominees/i.test(r.title) ||
  /\(excerpt\)/i.test(r.title) ||
  /b-roll/i.test(r.title) ||
  r.id.startsWith("elite-");

function impactOf(r) {
  if (TIER1.has(r.id)) return 1;
  if (TIER2.has(r.id)) return 2;
  if (isTier4(r)) return 4;
  if (r.category === "motion" || r.category === "social") return 2;
  if (r.category === "podcast") return 3.5;   // the 90+ talking-head cuts sit low
  return 3;
}

const CLIENT_VOLUME = REELS.reduce((m, r) => (m[r.client] = (m[r.client] || 0) + 1, m), {});
const MANIFEST_POS = new Map(REELS.map((r, i) => [r.id, i]));

function orderReels(list) {
  const showcaseRank = (id) => {
    const i = SHOWCASE.indexOf(id);
    return i < 0 ? Number.MAX_SAFE_INTEGER : i;
  };
  return list.slice().sort((a, b) => {
    const sa = showcaseRank(a.id), sb = showcaseRank(b.id);
    if (sa !== sb) return sa - sb;                          // showcase openers, in listed order
    const ia = impactOf(a), ib = impactOf(b);
    if (ia !== ib) return ia - ib;                          // strongest work first
    const va = CLIENT_VOLUME[a.client], vb = CLIENT_VOLUME[b.client];
    if (va !== vb) return vb - va;                          // bigger bodies of work first
    if (a.client !== b.client) return a.client.localeCompare(b.client);
    return MANIFEST_POS.get(a.id) - MANIFEST_POS.get(b.id); // stable within a client
  });
}

function filtered() {
  const pool = REELS.filter(inGroup);
  const base = active === "all" ? pool : pool.filter((r) => r.category === active);
  return orderReels(base);
}

function buildGroups() {
  const box = document.getElementById("groups");
  if (!box) return;
  box.innerHTML = "";
  GROUPS.forEach((g) => {
    const n = g.cats ? REELS.filter((r) => g.cats.includes(r.category)).length : REELS.length;
    const b = document.createElement("button");
    b.className = "g-btn" + (g.id === group ? " on" : "");
    b.innerHTML = g.label + "<b>" + n + "</b>";
    b.addEventListener("click", () => {
      if (group === g.id) return;
      group = g.id;
      active = "all";
      shown = PAGE;
      buildGroups();
      buildFilters();
      renderGrid(true);
    });
    box.appendChild(b);
  });
}

function buildFilters() {
  const box = $("#filters");
  box.innerHTML = "";
  CATEGORIES.forEach((c) => {
    const pool = REELS.filter(inGroup);
    const n = c.id === "all" ? pool.length : pool.filter((r) => r.category === c.id).length;
    if (!n) return;
    const b = document.createElement("button");
    b.className = "f-btn" + (c.id === active ? " on" : "");
    b.innerHTML = `${c.label}<b>${n}</b>`;
    b.addEventListener("click", () => {
      if (active === c.id) return;
      active = c.id;
      shown = PAGE;
      buildFilters();
      renderGrid(true);
    });
    box.appendChild(b);
  });
}

function card(reel, idx) {
  const el = document.createElement("article");
  // Showcase pieces render double-width, but only in the unfiltered view —
  // inside a category the grid should stay an even rhythm.
  const feat = active === "all" && SHOWCASE.includes(reel.id);
  el.className = "card"
    + (reel.orientation === "landscape" ? " wide" : "")
    + (feat ? " feat" : "");
  el.style.animation = `cardIn .65s cubic-bezier(.22,1,.36,1) ${Math.min(idx, 12) * 0.035}s both`;
  el.innerHTML = `
    <div class="card-media">
      <img loading="lazy" src="assets/posters/${reel.id}.jpg" alt="${reel.title}" />
      <span class="card-tag">${labelOf(reel.category)}</span>
      <span class="card-play">
        <svg viewBox="0 0 24 24" fill="currentColor"><path d="M8 5v14l11-7z"/></svg>
      </span>
    </div>
    <div class="card-body">
      <p class="card-client">${reel.client}</p>
      <h3 class="card-title">${reel.title}</h3>
      <p class="card-blurb">${reel.blurb}</p>
    </div>`;

  // hover-to-preview
  let vid = null, timer = null;
  const enter = () => {
    if (reduced) return;
    timer = setTimeout(() => {
      if (vid) return;
      vid = document.createElement("video");
      vid.src = `assets/video/${reel.id}.mp4`;
      vid.muted = true;
      vid.loop = true;
      vid.playsInline = true;
      vid.preload = "auto";
      $(".card-media", el).appendChild(vid);
      vid.play().then(() => el.classList.add("playing")).catch(() => {});
    }, 190);
  };
  const leave = () => {
    clearTimeout(timer);
    el.classList.remove("playing");
    if (vid) { const v = vid; vid = null; setTimeout(() => v.remove(), 450); }
  };
  el.addEventListener("mouseenter", enter);
  el.addEventListener("mouseleave", leave);
  el.addEventListener("click", () => { leave(); openLB(reel); });
  return el;
}

function labelOf(id) {
  const c = CATEGORIES.find((x) => x.id === id);
  return c ? c.label.replace(" & ", " / ") : id;
}

function renderGrid(reset) {
  const list = filtered();
  if (reset) grid.innerHTML = "";
  const start = reset ? 0 : grid.children.length;
  list.slice(start, shown).forEach((r, i) => grid.appendChild(card(r, i)));
  moreBtn.parentElement.style.display = shown >= list.length ? "none" : "flex";
  moreBtn.textContent = `Load more work (${Math.max(0, list.length - shown)} left)`;
}

moreBtn.addEventListener("click", () => {
  shown += PAGE;
  renderGrid(false);
});

buildGroups();
buildFilters();
renderGrid(true);

/* card entry keyframes (injected so CSS file stays tidy) */
const kf = document.createElement("style");
kf.textContent = `@keyframes cardIn{from{opacity:0;transform:translateY(26px) scale(.98)}to{opacity:1;transform:none}}`;
document.head.appendChild(kf);

/* ---------- lightbox ---------- */
const lb = $("#lb"), lbVideo = $("#lbVideo");

function openLB(reel) {
  lb.classList.toggle("wide", reel.orientation === "landscape");
  lbVideo.src = `assets/video/${reel.id}.mp4`;
  $("#lbClient").textContent = reel.client;
  $("#lbTitle").textContent = reel.title;
  lb.classList.add("open");
  document.body.classList.add("is-locked");
  lbVideo.play().catch(() => {});
}
function closeLB() {
  lb.classList.remove("open");
  document.body.classList.remove("is-locked");
  lbVideo.pause();
  setTimeout(() => { lbVideo.removeAttribute("src"); lbVideo.load(); }, 400);
}
$("#lbX").addEventListener("click", closeLB);
lb.addEventListener("click", (e) => { if (e.target === lb) closeLB(); });
document.addEventListener("keydown", (e) => { if (e.key === "Escape") closeLB(); });

/* ---------- scroll reveal ---------- */
const io = new IntersectionObserver(
  (entries) => entries.forEach((e) => { if (e.isIntersecting) { e.target.classList.add("in"); io.unobserve(e.target); } }),
  { threshold: 0.12, rootMargin: "0px 0px -8% 0px" }
);
$$(".rv").forEach((el) => io.observe(el));

/* ---------- count-up numbers ---------- */
function countTo(el, target, suffix = "") {
  const dur = 1500, t0 = performance.now();
  const step = (t) => {
    const p = Math.min(1, (t - t0) / dur);
    const eased = 1 - Math.pow(1 - p, 3);
    el.textContent = Math.round(target * eased) + suffix;
    if (p < 1) requestAnimationFrame(step);
  };
  requestAnimationFrame(step);
}

const statIO = new IntersectionObserver(
  (entries) => entries.forEach((e) => {
    if (!e.isIntersecting) return;
    const el = e.target;
    countTo(el, +el.dataset.count, el.dataset.suffix || "");
    statIO.unobserve(el);
  }),
  { threshold: 0.6 }
);
$$("[data-count]").forEach((el) => statIO.observe(el));

/* hero mini-stats */
setTimeout(() => {
  countTo($("#mStat1"), REELS.length);
  countTo($("#mStat2"), new Set(REELS.map((r) => r.client)).size, "+");
}, 1200);

/* ---------- magnetic buttons ---------- */
if (!reduced && window.matchMedia("(pointer: fine)").matches) {
  $$("[data-magnetic]").forEach((el) => {
    el.addEventListener("mousemove", (e) => {
      const r = el.getBoundingClientRect();
      const x = e.clientX - r.left, y = e.clientY - r.top;
      el.style.setProperty("--bx", x + "px");
      el.style.setProperty("--by", y + "px");
      el.style.transform = `translate(${(x - r.width / 2) * 0.14}px, ${(y - r.height / 2) * 0.22}px)`;
    });
    el.addEventListener("mouseleave", () => { el.style.transform = ""; });
  });
  // ripple origin for all buttons
  $$(".btn").forEach((el) => {
    el.addEventListener("mouseenter", (e) => {
      const r = el.getBoundingClientRect();
      el.style.setProperty("--bx", e.clientX - r.left + "px");
      el.style.setProperty("--by", e.clientY - r.top + "px");
    });
  });
}

/* ---------- nav active state ---------- */
(function navSpy() {
  const links = $$('#nav a[href^="#"]');
  const secs = links.map((a) => $(a.getAttribute("href"))).filter(Boolean);
  if (!secs.length) return;
  const spy = new IntersectionObserver(
    (entries) => entries.forEach((e) => {
      if (!e.isIntersecting) return;
      links.forEach((a) => a.classList.toggle("on", a.getAttribute("href") === "#" + e.target.id));
    }),
    { threshold: 0.4 }
  );
  secs.forEach((s) => spy.observe(s));
})();

/* ============================================================
   Y2K layer — custom cursor + glitch wiring.
   Bails out entirely on touch devices and reduced-motion.
   ============================================================ */
(function () {
  const fine = window.matchMedia("(hover: hover) and (pointer: fine)").matches;
  const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  if (!fine || reduced) return;

  /* --- scanline overlay --- */
  const scan = document.createElement("div");
  scan.className = "scan";
  document.body.appendChild(scan);

})();

/* ============================================================
   Floating Y2K objects — scroll parallax.
   Each .flo drifts at its own data-speed as it passes through
   the viewport, and rotates slightly with scroll. Idle motion
   lives on the inner <img> in CSS.
   ============================================================ */
(function () {
  if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
  if (window.innerWidth < 820) return;

  const flo = [...document.querySelectorAll(".flo")];
  if (!flo.length) return;

  let ticking = false;

  function place() {
    const vh = window.innerHeight;
    for (const el of flo) {
      const r = el.parentElement.getBoundingClientRect();
      // -1 (section below viewport) .. 1 (section above viewport)
      const progress = (vh / 2 - (r.top + r.height / 2)) / (vh / 2 + r.height / 2);
      const speed = parseFloat(el.dataset.speed || "0.3");
      const spin = parseFloat(el.dataset.spin || "18");
      el.style.transform =
        `translate3d(0, ${(progress * 100 * speed).toFixed(2)}px, 0) rotate(${(progress * spin).toFixed(2)}deg)`;
    }
    ticking = false;
  }

  addEventListener("scroll", () => {
    if (!ticking) { ticking = true; requestAnimationFrame(place); }
  }, { passive: true });
  addEventListener("resize", () => {
    if (!ticking) { ticking = true; requestAnimationFrame(place); }
  }, { passive: true });
  place();
})();

/* Showreel block removed. */
