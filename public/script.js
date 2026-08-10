/* ============================================================
   Jacob Gonzales — portfolio interactions
   ============================================================ */

const $ = (s, r = document) => r.querySelector(s);
const $$ = (s, r = document) => [...r.querySelectorAll(s)];
const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

document.getElementById("yr").textContent = new Date().getFullYear();

/* ---------- preloader ---------- */
(function loader() {
  const el = $("#loader"), bar = $("#loaderBar"), pct = $("#loaderPct");
  let v = 0;
  const tick = setInterval(() => {
    v = Math.min(100, v + Math.random() * 18 + 6);
    bar.style.width = v + "%";
    pct.textContent = Math.round(v);
    if (v >= 100) {
      clearInterval(tick);
      setTimeout(() => {
        el.classList.add("done");
        document.body.classList.remove("is-locked");
        startHero();
      }, 260);
    }
  }, 110);
  document.body.classList.add("is-locked");
})();

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

/* ---------- hero video rotation ---------- */
const HERO = ["cwk-reel", "patricia-heaton", "literacy-kravis-luncheon", "ite-gala-interview1"];
let heroStarted = false;

function startHero() {
  if (heroStarted || reduced) return;
  heroStarted = true;
  const box = $("#heroMedia");
  const poster = $("#heroPoster");
  let i = 0;

  const play = (id) => {
    const v = document.createElement("video");
    v.src = `assets/video/${id}.mp4`;
    v.muted = true;
    v.playsInline = true;
    v.loop = false;
    v.preload = "auto";
    v.addEventListener("canplay", () => {
      box.appendChild(v);
      requestAnimationFrame(() => {
        v.classList.add("on");
        poster.classList.remove("on");
      });
      v.play().catch(() => {});
      // swap after 7s or when it ends, whichever first
      const next = () => {
        v.classList.remove("on");
        setTimeout(() => v.remove(), 1400);
        i = (i + 1) % HERO.length;
        play(HERO[i]);
      };
      const t = setTimeout(next, 7000);
      v.addEventListener("ended", () => { clearTimeout(t); next(); }, { once: true });
    }, { once: true });
    v.addEventListener("error", () => { i = (i + 1) % HERO.length; play(HERO[i]); }, { once: true });
  };
  play(HERO[i]);
}

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

function filtered() {
  return active === "all" ? REELS : REELS.filter((r) => r.category === active);
}

function buildFilters() {
  const box = $("#filters");
  box.innerHTML = "";
  CATEGORIES.forEach((c) => {
    const n = c.id === "all" ? REELS.length : REELS.filter((r) => r.category === c.id).length;
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
  el.className = "card" + (reel.orientation === "landscape" ? " wide" : "");
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
