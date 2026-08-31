const $ = (s, r = document) => r.querySelector(s);
const $$ = (s, r = document) => [...r.querySelectorAll(s)];
const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

const yr = $("#yr"); if (yr) yr.textContent = new Date().getFullYear();

/* header: static in the new design — no burger, no progress bar. */

const pods = REELS.filter((r) => r.category === "podcast");
const shows = new Map();
pods.forEach((r) => {
  if (!shows.has(r.client)) shows.set(r.client, []);
  shows.get(r.client).push(r);
});

$("#count").textContent = `${pods.length} reels across ${shows.size} shows — click any card to play.`;

const wrap = $("#groups");

[...shows.entries()]
  .sort((a, b) => b[1].length - a[1].length)
  .forEach(([client, list]) => {
    const g = document.createElement("div");
    g.className = "group rv";
    g.innerHTML = `
      <div class="group-head">
        <h2>${client}</h2>
        <span>${list.length} reel${list.length === 1 ? "" : "s"}</span>
      </div>
      <div class="grid"></div>`;
    const grid = $(".grid", g);
    list.forEach((reel, i) => grid.appendChild(card(reel, i)));
    wrap.appendChild(g);
  });

function card(reel, idx) {
  const el = document.createElement("article");
  el.className = "card" + (reel.orientation === "landscape" ? " wide" : "");
  el.innerHTML = `
    <div class="card-media">
      <img loading="lazy" src="assets/posters/${reel.id}.jpg" alt="${reel.title}" />
      <span class="card-play"><svg viewBox="0 0 24 24" fill="currentColor"><path d="M8 5v14l11-7z"/></svg></span>
    </div>
    <div class="card-body">
      <h3 class="card-title">${reel.title}</h3>
      <p class="card-blurb">${reel.blurb}</p>
    </div>`;

  let vid = null, timer = null;
  el.addEventListener("mouseenter", () => {
    if (reduced) return;
    timer = setTimeout(() => {
      if (vid) return;
      vid = document.createElement("video");
      vid.src = `assets/video/${reel.id}.mp4`;
      vid.muted = true; vid.loop = true; vid.playsInline = true; vid.preload = "auto";
      $(".card-media", el).appendChild(vid);
      vid.play().then(() => el.classList.add("playing")).catch(() => {});
    }, 190);
  });
  const leave = () => {
    clearTimeout(timer);
    el.classList.remove("playing");
    if (vid) { const v = vid; vid = null; setTimeout(() => v.remove(), 450); }
  };
  el.addEventListener("mouseleave", leave);
  el.addEventListener("click", () => { leave(); openLB(reel); });
  return el;
}

/* lightbox */
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

/* reveal */
const io = new IntersectionObserver(
  (es) => es.forEach((e) => { if (e.isIntersecting) { e.target.classList.add("in"); io.unobserve(e.target); } }),
  { threshold: 0.06, rootMargin: "0px 0px -5% 0px" }
);
$$(".rv").forEach((el) => io.observe(el));
