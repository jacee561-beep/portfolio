const $ = (s, r = document) => r.querySelector(s);
const $$ = (s, r = document) => [...r.querySelectorAll(s)];

$("#yr").textContent = new Date().getFullYear();

(function header() {
  const burger = $("#burger"), nav = $("#nav"), prog = $("#prog");
  const onScroll = () => {
    const y = window.scrollY;
    const h = document.documentElement.scrollHeight - window.innerHeight;
    prog.style.width = (h > 0 ? (y / h) * 100 : 0) + "%";
  };
  window.addEventListener("scroll", onScroll, { passive: true });
  onScroll();
  burger.addEventListener("click", () => { burger.classList.toggle("x"); nav.classList.toggle("open"); });
})();

const sessions = new Map();
PHOTOS.forEach((p) => {
  if (!sessions.has(p.client)) sessions.set(p.client, []);
  sessions.get(p.client).push(p);
});

$("#count").textContent = `${PHOTOS.length} photos across ${sessions.size} sessions — click any frame to enlarge.`;

const wrap = $("#groups");

[...sessions.entries()].forEach(([client, list]) => {
  const g = document.createElement("div");
  g.className = "group rv";
  g.innerHTML = `
    <div class="group-head">
      <h2>${client}</h2>
      <span>${list[0].title}</span>
    </div>
    <div class="grid"></div>`;
  const grid = $(".grid", g);
  list.forEach((photo) => {
    const el = document.createElement("article");
    el.className = "card photo-card";
    el.innerHTML = `
      <div class="card-media">
        <img loading="lazy" src="assets/photos/${photo.id}.jpg" alt="${photo.title}" />
      </div>`;
    el.addEventListener("click", () => openLB(photo));
    grid.appendChild(el);
  });
  wrap.appendChild(g);
});

const lb = $("#lb"), lbImg = $("#lbImg");
function openLB(photo) {
  lbImg.src = `assets/photos/${photo.id}.jpg`;
  $("#lbClient").textContent = photo.client;
  $("#lbTitle").textContent = photo.title;
  lb.classList.add("open");
  document.body.classList.add("is-locked");
}
function closeLB() {
  lb.classList.remove("open");
  document.body.classList.remove("is-locked");
  setTimeout(() => lbImg.removeAttribute("src"), 400);
}
$("#lbX").addEventListener("click", closeLB);
lb.addEventListener("click", (e) => { if (e.target === lb) closeLB(); });
document.addEventListener("keydown", (e) => { if (e.key === "Escape") closeLB(); });

const io = new IntersectionObserver(
  (es) => es.forEach((e) => { if (e.isIntersecting) { e.target.classList.add("in"); io.unobserve(e.target); } }),
  { threshold: 0.06, rootMargin: "0px 0px -5% 0px" }
);
$$(".rv").forEach((el) => io.observe(el));
