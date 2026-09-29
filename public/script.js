/* ============================================================
   Jacob Gonzales — jacobgonzales.tv
   Everything editable lives in assets/site-config.js.

   Two ideas drive this file:
   1. THE WORK PLAYS. Tiles start their preview loop when they enter
      the viewport, with a hard cap on how many run at once.
   2. THE PAGE TAKES ITS COLOUR FROM THE WORK. Every piece carries an
      accent sampled from its own frame (tools/extract_colors.py);
      hovering or centring a piece moves the page accent toward it.
   ============================================================ */

const $ = (s, r = document) => r.querySelector(s);
const $$ = (s, r = document) => [...r.querySelectorAll(s)];
const esc = (s) => String(s ?? "").replace(/[&<>"]/g,
  (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" }[c]));

const mq = matchMedia("(prefers-reduced-motion: reduce)");
let reduced = mq.matches;
mq.addEventListener("change", (e) => { reduced = e.matches; if (reduced) stopAll(); });

if (DRAFT) document.body.dataset.draft = "1";

/* ---------- data ---------- */
const CAT_LABEL = {
  podcast: "Podcast", motion: "Motion", nonprofit: "Nonprofit & Events",
  corporate: "Corporate", social: "Branded Social", interviews: "Interviews",
};
const CAT_ORDER = ["podcast", "motion", "nonprofit", "corporate", "social", "interviews"];
const COUNTS = REELS.reduce((m, r) => (m[r.category] = (m[r.category] || 0) + 1, m), {});
const CLIENT_VOLUME = REELS.reduce((m, r) => (m[r.client] = (m[r.client] || 0) + 1, m), {});
const CLIENTS = Object.keys(CLIENT_VOLUME);

const ar = (r) => (r.w && r.h ? `${r.w}/${r.h}` : r.orientation === "landscape" ? "16/9" : "9/16");
const accentOf = (r) => r.accent || "#b006e4";
const roleOf = (r) => r.role || (SITE.defaultRoles && SITE.defaultRoles[r.category]) || null;

const SHOWCASE = [
  "cryptorubik-orb", "vaporwave-collage", "tht-plane-intro",
  "polo-recap-ae", "cryptorubik-spot", "sparked-logo",
];
function featured() {
  const byId = new Map(REELS.map((r) => [r.id, r]));
  const out = [];
  if (SITE.reel && SITE.reel.id && byId.has(SITE.reel.id)) out.push(byId.get(SITE.reel.id));
  SHOWCASE.forEach((id) => { const r = byId.get(id); if (r && !out.includes(r)) out.push(r); });
  ["nonprofit", "corporate", "interviews"].forEach((c) => {
    if (out.length >= 5) return;
    const p = REELS.find((r) => r.category === c && !out.includes(r));
    if (p) out.push(p);
  });
  return out.slice(0, 5);
}

/* ---------- the live accent ----------
   One CSS custom property on :root. Everything that should pick up the
   colour of the work reads var(--accent), so this single write repaints
   the dot, the rules, the glows and the background wash together. */
let accentTimer = 0;
function setAccent(hex) {
  if (!hex) return;
  clearTimeout(accentTimer);
  accentTimer = setTimeout(() => {
    document.documentElement.style.setProperty("--accent", hex);
  }, 40);
}

/* ---------- playback pool ----------
   259 <video> elements playing at once would melt the page. Tiles ask to
   play when they enter the viewport; only MAX_LIVE run, oldest retired
   first. Everything pauses when the tab is hidden. */
const MAX_LIVE = 8;
const live = [];          // tiles currently playing, oldest first

function startTile(tile) {
  if (reduced || !PREVIEWS) return;
  if (tile.dataset.live === "1" || tile.dataset.deferred === "1") return;
  const box = $(".box", tile) || $(".card-media", tile);
  if (!box) return;

  while (live.length >= MAX_LIVE) stopTile(live[0]);

  const v = document.createElement("video");
  v.muted = true; v.loop = true; v.playsInline = true; v.preload = "auto";
  v.setAttribute("disableremoteplayback", "");
  v.setAttribute("disablepictureinpicture", "");
  v.src = `assets/preview/${tile.dataset.id}.mp4`;
  box.appendChild(v);
  tile.dataset.live = "1";
  live.push(tile);
  v.play()
    .then(() => tile.classList.add("live", "playing"))
    .catch((err) => {
      /* Chrome pauses muted, video-only media while the page is backgrounded
         ("paused to save power" AbortError), and some contexts refuse autoplay
         outright. Neither is an error worth reacting to: drop back to the
         poster, mark the tile so the sweep stops hammering it, and let the
         visibilitychange handler retry when the page is actually on screen.
         The old code destroyed the tile here, so tabbing away and back left
         dead tiles that never recovered. */
      stopTile(tile);
      if (err && (err.name === "AbortError" || err.name === "NotAllowedError")) {
        tile.dataset.deferred = "1";
      }
    });
}

function stopTile(tile) {
  if (!tile) return;
  const i = live.indexOf(tile);
  if (i >= 0) live.splice(i, 1);
  tile.dataset.live = "";
  tile.classList.remove("live", "playing");
  const v = $("video", tile);
  if (v) { v.pause(); v.removeAttribute("src"); v.load(); v.remove(); }
}
function stopAll() { [...live].forEach(stopTile); }

document.addEventListener("visibilitychange", () => {
  if (document.hidden) { stopAll(); return; }
  // back on screen: clear the power-save deferrals and try again
  $$("[data-deferred]").forEach((t) => { delete t.dataset.deferred; });
  queueSweep();
});

/* One observer for every tile on the page (cheaper than one each, and
   unobserve-free so tiles resume when scrolled back to). */
const seen = new IntersectionObserver((entries) => {
  entries.forEach((e) => {
    const t = e.target;
    if (e.isIntersecting && e.intersectionRatio >= 0.3) startTile(t);
    else if (!e.isIntersecting) stopTile(t);
  });
}, { threshold: [0, 0.3, 0.6], rootMargin: "0px 0px -5% 0px" });

/* The piece nearest the middle of the screen owns the page colour. */
const centred = new IntersectionObserver((entries) => {
  let best = null, bestRatio = 0;
  entries.forEach((e) => {
    if (e.isIntersecting && e.intersectionRatio > bestRatio) {
      bestRatio = e.intersectionRatio; best = e.target;
    }
  });
  if (best && best.dataset.accent) setAccent(best.dataset.accent);
}, { threshold: [0.5, 0.9], rootMargin: "-35% 0px -35% 0px" });

/* Scroll-driven backstop.
   IntersectionObserver is the efficient path, but it silently delivers
   nothing in some embedded/non-compositing contexts (verified: a fresh
   observer watching a tile plainly on screen fired zero callbacks). A
   portfolio whose whole idea is "the work plays" cannot depend on a single
   API behaving. This sweep computes visibility directly, throttled to one
   animation frame, and drives the same start/stop. */
const wired = new Set();
let sweepQueued = false;

function sweep() {
  sweepQueued = false;
  const vh = innerHeight;
  const want = [];
  wired.forEach((t) => {
    if (!t.isConnected) { wired.delete(t); return; }
    const r = t.getBoundingClientRect();
    if (r.bottom <= 0 || r.top >= vh || !r.height) { stopTile(t); return; }
    const vis = (Math.min(r.bottom, vh) - Math.max(r.top, 0)) / r.height;
    if (vis >= 0.3) want.push([Math.abs((r.top + r.bottom) / 2 - vh / 2), t]);
    else if (vis <= 0.05) stopTile(t);
  });
  // nearest the middle of the screen wins the limited player slots
  want.sort((a, b) => a[0] - b[0]);
  want.slice(0, MAX_LIVE).forEach(([, t]) => startTile(t));
  if (want.length) setAccent(want[0][1].dataset.accent);
}

function queueSweep() {
  if (sweepQueued) return;
  sweepQueued = true;
  requestAnimationFrame(sweep);
}
addEventListener("scroll", queueSweep, { passive: true });
addEventListener("resize", queueSweep, { passive: true });

function wire(tile) {
  tile.style.setProperty("--a", tile.dataset.accent);
  wired.add(tile);
  seen.observe(tile);
  centred.observe(tile);
  tile.addEventListener("pointerenter", (e) => {
    if (e.pointerType === "mouse") { setAccent(tile.dataset.accent); startTile(tile); }
  });
}

/* ---------- markup ---------- */
function tileHTML(r, cls = "tile") {
  return `<article class="${cls}" data-id="${r.id}" data-accent="${accentOf(r)}">
    <div class="box" style="--ar:${ar(r)}">
      <span class="playing-dot"></span>
      <img src="assets/posters/${r.id}.jpg" alt="${esc(r.title)}"
           width="${r.w || 1920}" height="${r.h || 1080}" loading="lazy" decoding="async" />
    </div>
    <div class="meta">
      <span class="meta-l">
        <span class="meta-c">${esc(r.client)}</span>
        <span class="meta-t">${esc(r.title)}</span>
      </span>
      <span class="meta-d">${esc(r.dur || "")}</span>
    </div>
  </article>`;
}

/* ---------- hero ribbon ---------- */
(function ribbon() {
  const wide = REELS.filter((r) => (r.w || 0) >= (r.h || 1));
  const pick = [];
  for (let i = 0; i < wide.length && pick.length < 14; i += Math.ceil(wide.length / 14)) {
    pick.push(wide[i]);
  }
  const one = pick.map((r) => `
    <a class="rib" data-id="${r.id}" data-accent="${accentOf(r)}" href="#work">
      <div class="box" style="--ar:16/9">
        <img src="assets/posters/${r.id}.jpg" alt="" loading="lazy" decoding="async" />
      </div>
    </a>`).join("");
  $("#ribbon").innerHTML = one + one;            // doubled so the loop is seamless
  $$("#ribbon .rib").forEach((el) => {
    el.style.setProperty("--a", el.dataset.accent);
    el.addEventListener("pointerenter", (e) => {
      if (e.pointerType === "mouse") setAccent(el.dataset.accent);
    });
  });
  const first = pick[0];
  if (first) setAccent(accentOf(first));
})();

/* ---------- the wall ---------- */
const PAGE = 36;
let filter = "all", query = "", shown = PAGE;
const wall = $("#wall"), moreWrap = $("#moreWrap");

$("#wallCount").textContent = REELS.length;

function matching() {
  const q = query.trim().toLowerCase();
  return REELS.filter((r) => {
    if (filter !== "all" && r.category !== filter) return false;
    if (!q) return true;
    return (r.client + " " + r.title).toLowerCase().includes(q);
  });
}

function chips() {
  const items = [["all", "All", REELS.length]].concat(
    CAT_ORDER.filter((c) => COUNTS[c]).map((c) => [c, CAT_LABEL[c], COUNTS[c]]));
  $("#chips").innerHTML = items.map(([id, label, n]) =>
    `<button type="button" class="chip${id === filter ? " on" : ""}" data-f="${id}"
       aria-pressed="${id === filter}">${esc(label)}<b>${n}</b></button>`).join("");
  $$("#chips .chip").forEach((b) => b.addEventListener("click", () => {
    filter = b.dataset.f; shown = PAGE; chips(); renderWall();
  }));
}

function renderWall() {
  const list = matching();
  $("#count").textContent = `${list.length} of ${REELS.length}`;
  stopAll();
  wall.innerHTML = list.slice(0, shown).map((r) => tileHTML(r)).join("");
  $$(".tile", wall).forEach(wire);
  moreWrap.hidden = shown >= list.length;
  if (!moreWrap.hidden) $("#more").textContent = `Show more (${list.length - shown} left)`;
  queueSweep();
}

$("#more").addEventListener("click", () => {
  const before = wall.children.length;
  shown += PAGE;
  renderWall();
  const next = wall.children[before];
  if (next) next.scrollIntoView({ behavior: reduced ? "auto" : "smooth", block: "center" });
});

$("#find").addEventListener("input", (() => {
  let t = 0;
  return (e) => { clearTimeout(t); t = setTimeout(() => {
    query = e.target.value; shown = PAGE; renderWall(); }, 130); };
})());

wall.addEventListener("click", (e) => {
  const t = e.target.closest(".tile");
  if (!t) return;
  const r = REELS.find((x) => x.id === t.dataset.id);
  if (r) openLB(r);
});

chips();
renderWall();

/* ---------- featured ---------- */
(function feat() {
  $("#feat").innerHTML = featured().map((r, i) => {
    const role = roleOf(r);
    return `<div class="feat-row rv">
      <div class="feat-media">${tileHTML(r)}</div>
      <div class="feat-body">
        <p class="feat-n">${String(i + 1).padStart(2, "0")} — ${esc(CAT_LABEL[r.category] || r.category)}</p>
        <h3 class="feat-t">${esc(r.title)}</h3>
        <p class="feat-b">${esc(r.blurb || "")}</p>
        <div class="feat-tags">
          <span class="tag">${esc(r.client)}</span>
          ${role ? `<span class="tag">${esc(role)}</span>` : ""}
          ${r.dur ? `<span class="tag">${esc(r.dur)}</span>` : ""}
        </div>
      </div>
    </div>`;
  }).join("");
  $$("#feat .tile").forEach(wire);
  queueSweep();
  $("#feat").addEventListener("click", (e) => {
    const t = e.target.closest(".tile");
    if (!t) return;
    const r = REELS.find((x) => x.id === t.dataset.id);
    if (r) openLB(r);
  });
})();

/* ---------- clients ---------- */
(function roster() {
  $("#clientCount").textContent = CLIENTS.length;
  $("#clientNote").textContent =
    `${REELS.length} delivered pieces. The ones marked ongoing came back for eight or more.`;
  $("#roster").innerHTML = CLIENTS.slice().sort((a, b) => a.localeCompare(b)).map((c) => {
    const n = CLIENT_VOLUME[c];
    return `<a href="#work" data-client="${esc(c)}">
      <b>${esc(c)}</b><span>${n}${n >= 8 ? "<em>●</em>" : ""}</span></a>`;
  }).join("");
  $$("#roster a").forEach((a) => a.addEventListener("click", () => {
    filter = "all"; query = a.dataset.client; $("#find").value = a.dataset.client;
    shown = PAGE; chips(); renderWall();
  }));
})();

/* ---------- gated sections ---------- */
function blank(el, label, ask) { if (el) el.innerHTML = `<b>${esc(label)}</b><p>${ask}</p>`; }

(function gated() {
  const qs = SITE.testimonials || [];
  if (qs.length) {
    $("#says").hidden = false;
    $("#quotes").innerHTML = qs.map((q) => `
      <figure class="feat-row"><div class="feat-body" style="grid-column:1/-1">
        <p class="feat-t" style="font-weight:600">“${esc(q.quote)}”</p>
        <p class="feat-n">${esc(q.name)}${q.role ? " · " + esc(q.role) : ""}${q.org ? " · " + esc(q.org) : ""}</p>
      </div></figure>`).join("");
  } else if (DRAFT) {
    $("#says").hidden = false;
    blank($("#blankQuotes"), "Placeholder — testimonials",
      `The highest-value thing missing from this page. Four emails would fill it:
       NRG Podcast, Literacy Coalition, CEO Discovery, Children's Harbor.
       Add to <code>SITE.testimonials</code> in <code>assets/site-config.js</code> as
       <code>{quote, name, role, org}</code>. One quote renders fine on its own.`);
  }

  const t = SITE.terms || {};
  const LABELS = {
    process: "How a project runs", turnaround: "Turnaround", revisions: "Revisions included",
    usage: "Usage & licensing", payment: "Payment terms", backup: "Backup & redundancy",
    insurance: "Insurance & travel",
  };
  const filled = Object.keys(LABELS).filter((k) => t[k]);
  if (filled.length) {
    $("#terms").hidden = false;
    $("#termsList").innerHTML = filled.map((k) =>
      `<div class="fact"><dt>${LABELS[k]}</dt><dd>${esc(t[k])}</dd></div>`).join("");
  } else if (DRAFT) {
    $("#terms").hidden = false;
    blank($("#blankTerms"), "Placeholder — working with me",
      `Seven plain answers in <code>SITE.terms</code>: process, turnaround, revisions,
       usage, payment, backup, insurance. Each appears on its own, so three of seven is fine.`);
  }

  if (!(SITE.reel && SITE.reel.id) && DRAFT) {
    blank($("#blankReel"), "Placeholder — showreel",
      `60–90 seconds, strongest shot first, no build-up and no title card.
       Drop <code>assets/video/reel.mp4</code> and <code>assets/posters/reel.jpg</code>,
       then set <code>SITE.reel.id = "reel"</code>. It becomes the first featured piece —
       never an autoplaying hero.`);
  }
})();

/* ---------- studio facts ---------- */
(function facts() {
  const f = SITE.facts || {};
  const rows = [
    ["Based", f.based], ["Works as", f.worksAs], ["Cameras", f.cameras],
    ["Edit", f.edit], ["Delivers", f.delivers], ["Turnaround", SITE.turnaround],
  ].filter(([, v]) => v);
  $("#facts").innerHTML = rows.map(([k, v]) =>
    `<div class="fact"><dt>${k}</dt><dd>${esc(v)}</dd></div>`).join("");
})();

/* ---------- contact ---------- */
(function contact() {
  $("#mailto").href = `mailto:${SITE.email}`;
  $("#mailto").textContent = SITE.email;
  if (SITE.replyTime) { $("#replyTime").hidden = false; $("#replyTime").textContent = SITE.replyTime; }
  if (SITE.availableFrom) {
    $("#kicker").textContent = `${SITE.region} · Available from ${SITE.availableFrom}`;
  } else if (SITE.region) {
    $("#kicker").textContent = `${SITE.region} · Available for work`;
  }
  $("#ftrContact").innerHTML =
    `<a href="mailto:${esc(SITE.email)}">${esc(SITE.email)}</a>` +
    (SITE.instagram ? `<a href="${esc(SITE.instagram)}" rel="noopener">Instagram</a>` : "") +
    `<span>© ${new Date().getFullYear()}</span>`;
})();

/* ---------- lightbox ----------
   teardown does NOT rely on the dialog "close" event — verified that it
   does not fire in every engine, which would leave audio playing. */
const lb = $("#lb");
function openLB(r) {
  stopAll();
  setAccent(accentOf(r));
  const role = roleOf(r);
  $("#lbMedia").innerHTML =
    `<video src="assets/video/${r.id}.mp4" controls autoplay playsinline
       poster="assets/posters/${r.id}.jpg"></video>`;
  $("#lbMeta").innerHTML = `
    <div><h3>${esc(r.title)}</h3><p>${esc(r.client)}${r.blurb ? " — " + esc(r.blurb) : ""}</p></div>
    <div class="lb-tags">
      <span class="tag">${esc(CAT_LABEL[r.category] || r.category)}</span>
      ${role ? `<span class="tag">${esc(role)}</span>` : ""}
      ${r.dur ? `<span class="tag">${esc(r.dur)}</span>` : ""}
    </div>`;
  lb.showModal();
}
function teardown() {
  const v = $("#lbMedia video");
  if (v) { v.pause(); v.removeAttribute("src"); v.load(); }
  $("#lbMedia").innerHTML = "";
}
function closeLB() { teardown(); if (lb.open) lb.close(); }
lb.addEventListener("close", teardown);
lb.addEventListener("cancel", teardown);
$("#lbX").addEventListener("click", closeLB);
lb.addEventListener("click", (e) => { if (e.target === lb) closeLB(); });
document.addEventListener("keydown", (e) => { if (e.key === "Escape" && lb.open) closeLB(); });

/* ---------- draft banner ---------- */
if (DRAFT) {
  const missing = [];
  if (!(SITE.reel && SITE.reel.id)) missing.push("reel");
  if (!(SITE.testimonials || []).length) missing.push("testimonials");
  if (!(SITE.caseStudies || []).length) missing.push("case studies");
  if (!Object.values(SITE.terms || {}).some(Boolean)) missing.push("terms");
  if (!SITE.availableFrom) missing.push("availability");
  if (!(SITE.facts || {}).cameras) missing.push("camera list");
  const noRole = REELS.filter((r) => !roleOf(r)).length;
  const bar = document.createElement("div");
  bar.className = "draft-bar";
  bar.textContent = `DRAFT — still to fill: ${missing.join(", ")}`
    + (noRole ? ` · role missing on ${noRole}/${REELS.length}` : "")
    + " · edit assets/site-config.js";
  document.body.appendChild(bar);
}
