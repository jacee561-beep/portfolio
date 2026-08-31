/* ============================================================
   Jacob Gonzales — jacobgonzales.tv
   Everything editable lives in assets/site-config.js.
   ============================================================ */

const $ = (s, r = document) => r.querySelector(s);
const $$ = (s, r = document) => [...r.querySelectorAll(s)];
const esc = (s) => String(s ?? "").replace(/[&<>"]/g,
  (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" }[c]));

/* Reduced motion is read LIVE — a user can change it mid-session. */
const mq = matchMedia("(prefers-reduced-motion: reduce)");
let reduced = mq.matches;
mq.addEventListener("change", (e) => { reduced = e.matches; if (reduced) releasePreview(); });

if (DRAFT) document.body.dataset.draft = "1";

/* ---------- derived data ---------- */
const CAT_LABEL = {
  podcast: "Podcast",
  motion: "Motion",
  nonprofit: "Nonprofit & Events",
  corporate: "Corporate",
  social: "Branded Social",
  interviews: "Interviews",
};
const CAT_ORDER = ["podcast", "motion", "nonprofit", "corporate", "social", "interviews"];

const COUNTS = REELS.reduce((m, r) => (m[r.category] = (m[r.category] || 0) + 1, m), {});
const CLIENT_VOLUME = REELS.reduce((m, r) => (m[r.client] = (m[r.client] || 0) + 1, m), {});
const CLIENTS = Object.keys(CLIENT_VOLUME);
const clientsIn = (cat) => new Set(REELS.filter((r) => r.category === cat).map((r) => r.client)).size;
const ar = (r) => (r.w && r.h ? `${r.w}/${r.h}` : r.orientation === "landscape" ? "16/9" : "9/16");
const roleOf = (r) => r.role || (SITE.defaultRoles && SITE.defaultRoles[r.category]) || null;

/* Curated nine: the reel if it exists, the motion/brand-led showcase, then
   top up so every discipline is represented. Volume-ranking buries the
   strongest material, which is why this is hand-picked, not sorted. */
const SHOWCASE = [
  "cryptorubik-orb", "vaporwave-collage", "tht-plane-intro",
  "polo-recap-ae", "cryptorubik-spot", "sparked-logo",
];
function curatedNine() {
  const byId = new Map(REELS.map((r) => [r.id, r]));
  const out = [];
  if (SITE.reel && SITE.reel.id && byId.has(SITE.reel.id)) out.push(byId.get(SITE.reel.id));
  SHOWCASE.forEach((id) => { const r = byId.get(id); if (r && !out.includes(r)) out.push(r); });
  ["nonprofit", "corporate", "interviews", "social", "podcast"].forEach((cat) => {
    if (out.length >= 9) return;
    const pick = REELS.find((r) => r.category === cat && !out.includes(r));
    if (pick) out.push(pick);
  });
  return out.slice(0, 9);
}

/* ---------- the pooled hover preview ----------
   ONE <video> for the whole page. The old build created a player per card,
   set preload="auto", and never cancelled the download on mouseleave. */
const preview = Object.assign(document.createElement("video"), {
  muted: true, loop: true, playsInline: true, preload: "metadata",
});
preview.setAttribute("disableremoteplayback", "");
preview.setAttribute("disablepictureinpicture", "");
let armed = null, armTimer = 0;

function releasePreview() {
  clearTimeout(armTimer);
  if (!armed) return;
  armed.classList.remove("playing");
  armed = null;
  preview.pause();
  preview.removeAttribute("src");
  preview.load();              // cancels any in-flight download
  if (preview.parentNode) preview.parentNode.removeChild(preview);
}

function armPreview(host, id) {
  if (reduced || !PREVIEWS) return;
  clearTimeout(armTimer);
  armTimer = setTimeout(() => {
    releasePreview();
    const box = $(".media", host) || $(".card-media", host);
    if (!box) return;
    preview.src = `assets/preview/${id}.mp4`;
    box.appendChild(preview);
    armed = host;
    preview.play().then(() => host.classList.add("playing")).catch(() => releasePreview());
  }, 220);
}

/* ---------- status strip ---------- */
(function strip() {
  const bits = [];
  if (SITE.available === false && SITE.availableFrom) bits.push(`Booking from ${SITE.availableFrom}`);
  else if (SITE.availableFrom) bits.push(`Available from ${SITE.availableFrom}`);
  if (SITE.region) bits.push(SITE.region);
  if (SITE.turnaround) bits.push(`Typical turnaround ${SITE.turnaround}`);

  const box = $("#stripIn");
  if (SITE.available === false) box.parentElement.setAttribute("data-booking", "");
  box.innerHTML =
    `<i></i>` +
    bits.map((b) => `<s>${esc(b)}</s>`).join(`<s>·</s>`) +
    (bits.length ? `<s>·</s>` : "") +
    `<a href="mailto:${esc(SITE.email)}">${esc(SITE.email)}</a>`;
})();

/* ---------- hero frames ---------- */
(function heroFrames() {
  const picks = curatedNine().filter((r) => r.orientation === "landscape").slice(0, 3);
  while (picks.length < 3) {
    const extra = curatedNine().find((r) => !picks.includes(r));
    if (!extra) break;
    picks.push(extra);
  }
  $("#heroFrames").innerHTML = picks.map((r, i) => `
    <figure class="frame">
      <div class="media" style="--ar:${ar(r)}">
        <img src="assets/posters/${r.id}.jpg" alt="${esc(r.title)}"
             width="${r.w || 1920}" height="${r.h || 1080}"
             ${i === 0 ? 'fetchpriority="high"' : 'loading="lazy"'} decoding="async" />
      </div>
      <figcaption>${esc(r.client)} · ${esc(CAT_LABEL[r.category] || r.category)}</figcaption>
    </figure>`).join("");

  if (picks[0]) {
    const l = document.createElement("link");
    l.rel = "preload"; l.as = "image";
    l.href = `assets/posters/${picks[0].id}.jpg`;
    l.setAttribute("fetchpriority", "high");
    document.head.appendChild(l);
  }
})();

/* ---------- contents band ---------- */
(function contents() {
  const cells = CAT_ORDER.map((c) =>
    `<a href="#index" data-cat="${c}"><span>${esc(CAT_LABEL[c])}</span><b>${COUNTS[c] || 0}</b></a>`);
  const photos = typeof PHOTOS !== "undefined" ? PHOTOS.length : 0;
  if (photos) cells.push(`<a href="photography.html"><span>Photography</span><b>${photos}</b></a>`);
  $("#contents").innerHTML = cells.join("");
  $$("#contents a[data-cat]").forEach((a) =>
    a.addEventListener("click", () => setFilter(a.dataset.cat)));
})();

/* ---------- ledger rules ---------- */
$("#ledgerWork").textContent = "9 selected";
$("#ledgerComm").textContent = `${CAT_ORDER.length} disciplines`;
$("#ledgerIndex").textContent = `${REELS.length} pieces`;
$("#ledgerClients").textContent = `${CLIENTS.length} clients`;
$("#ledgerStudio").textContent = "About";
$("#ledgerDives").textContent = "Deep dives";

/* ---------- slate ---------- */
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

/* ---------- 01 selected work ---------- */
(function plates() {
  const nine = curatedNine();
  const score = ["a1", "a2", "", "", "", "c", "a1", "a2", ""];
  $("#plates").innerHTML = nine.map((r, i) => `
    <article class="plate ${score[i] || ""}" data-id="${r.id}">
      <div class="media" style="--ar:${ar(r)}">
        <img src="assets/posters/${r.id}.jpg" alt="${esc(r.title)}"
             width="${r.w || 1920}" height="${r.h || 1080}" loading="lazy" decoding="async" />
      </div>
      <h3 class="plate-t">${esc(r.title)}</h3>
      <p class="plate-b">${esc(r.blurb || "")}</p>
      ${slate(r)}
    </article>`).join("");
})();

/* ---------- 02 commission rows ---------- */
(function commission() {
  const NAMES = {
    podcast: "Podcast package",
    motion: "Motion graphics & titles",
    nonprofit: "Nonprofit & event film",
    corporate: "Corporate & brand film",
    social: "Branded social / verticals",
    interviews: "Interviews & panels",
  };
  const DESC = {
    podcast: "Multi-camera recording through to episode and clip delivery.",
    motion: "Logo animation, title systems, lower thirds and show packaging.",
    nonprofit: "Event coverage, recap films and testimonial pieces.",
    corporate: "Brand film, explainers and executive interviews.",
    social: "Vertical cutdowns with captions, built for the feed.",
    interviews: "Gala, panel and red-carpet interview coverage.",
  };
  const FIELDS = [
    ["included", "What's included"],
    ["turnaround", "Turnaround"],
    ["needFromYou", "What I need from you"],
  ];

  $("#comm").innerHTML = CAT_ORDER.map((cat, i) => {
    const cfg = (SITE.commission && SITE.commission[cat]) || {};
    const strip = REELS.filter((r) => r.category === cat).slice(0, 4);
    const terms = FIELDS.map(([key, label]) => {
      const val = cfg[key];
      const body = val
        ? esc(val)
        : `<span class="todo">${esc(label)} — one line</span>`;
      if (!val && !DRAFT) return "";
      return `<div><dt>${label}</dt><dd>${body}</dd></div>`;
    }).filter(Boolean).join("");

    return `
    <details id="c-${cat}">
      <summary>
        <span class="comm-n">${String(i + 1).padStart(2, "0")}</span>
        <span class="comm-name">${esc(NAMES[cat])}</span>
        <span class="comm-d">${esc(DESC[cat])}</span>
        <span class="comm-proof">${COUNTS[cat]} pieces · ${clientsIn(cat)} clients</span>
        <span class="comm-x" aria-hidden="true">+</span>
      </summary>
      <div class="comm-body">
        ${terms ? `<dl class="comm-terms">${terms}</dl>` : ""}
        <div class="comm-strip">
          ${strip.map((r) => `
            <div class="media" style="--ar:${ar(r)}">
              <img src="assets/posters/${r.id}.jpg" alt="${esc(r.title)}"
                   width="${r.w || 1920}" height="${r.h || 1080}" loading="lazy" decoding="async" />
            </div>`).join("")}
        </div>
        <a class="btn-text" href="#index" data-cat="${cat}">See all ${COUNTS[cat]} in the index →</a>
      </div>
    </details>`;
  }).join("");

  $$("#comm a[data-cat]").forEach((a) =>
    a.addEventListener("click", () => setFilter(a.dataset.cat)));

  // deep link: /#c-nonprofit opens that row
  if (location.hash.startsWith("#c-")) {
    const d = $(location.hash);
    if (d) { d.open = true; setTimeout(() => d.scrollIntoView({ block: "center" }), 60); }
  }
})();

/* ---------- 03 the index ---------- */
const PAGE = 24;
let filter = "all";
let query = "";
let view = (() => {
  try { return localStorage.getItem("jg.index.view") || "list"; } catch (e) { return "list"; }
})();
let shown = PAGE;

const idxMain = $("#idxMain");
const idxSide = $("#idxSide");
const moreWrap = $("#moreWrap");

function matching() {
  const q = query.trim().toLowerCase();
  return REELS.filter((r) => {
    if (filter !== "all" && r.category !== filter) return false;
    if (!q) return true;
    return (r.client + " " + r.title).toLowerCase().includes(q);
  });
}

function buildChips() {
  const items = [["all", `All ${REELS.length}`]].concat(
    CAT_ORDER.filter((c) => COUNTS[c]).map((c) => [c, `${CAT_LABEL[c]} ${COUNTS[c]}`]));
  $("#chips").innerHTML = items.map(([id, label]) =>
    `<button type="button" class="chip${id === filter ? " on" : ""}" data-f="${id}"
       aria-pressed="${id === filter}">${esc(label)}</button>`).join("");
  $$("#chips .chip").forEach((b) =>
    b.addEventListener("click", () => setFilter(b.dataset.f)));
}

function setFilter(cat) {
  filter = cat;
  shown = PAGE;
  buildChips();
  renderIndex();
  const sec = $("#index");
  if (sec) sec.scrollIntoView({ behavior: reduced ? "auto" : "smooth", block: "start" });
}

function setView(v) {
  view = v;
  try { localStorage.setItem("jg.index.view", v); } catch (e) { /* private mode */ }
  $$("#viewToggle button").forEach((b) => b.classList.toggle("on", b.dataset.view === v));
  shown = PAGE;
  renderIndex();
}

function rowHTML(r, i) {
  const role = roleOf(r);
  return `<a class="row" href="#" data-id="${r.id}">
    <span class="row-n">${String(i + 1).padStart(3, "0")}</span>
    <span class="row-c">${esc(r.client)}</span>
    <span class="row-t">${esc(r.title)}</span>
    <span class="row-d">${esc(CAT_LABEL[r.category] || r.category)}</span>
    <span class="row-y">${esc(r.dur || "")}</span>
    ${role ? `<span class="sr-only">${esc(role)}</span>` : ""}
  </a>`;
}

function tileHTML(r) {
  return `<article class="tile" data-id="${r.id}">
    <div class="media" style="--ar:${ar(r)}">
      <img src="assets/posters/${r.id}.jpg" alt="${esc(r.title)}"
           width="${r.w || 1920}" height="${r.h || 1080}" loading="lazy" decoding="async" />
    </div>
    <div class="tile-m"><span class="tile-c">${esc(r.client)}</span><span>${esc(r.dur || "")}</span></div>
  </article>`;
}

function renderIndex() {
  const list = matching();
  $("#idxCount").textContent = `${list.length} of ${REELS.length}`;

  if (view === "list") {
    idxMain.className = "idx-rows";
    idxMain.innerHTML = list.map(rowHTML).join("");
    idxSide.setAttribute("aria-hidden", "true");
    idxSide.innerHTML = `<div class="pin"><div class="pin-empty">Hover a row</div></div>`;
    moreWrap.hidden = true;
  } else {
    idxMain.className = "tiles";
    idxMain.innerHTML = list.slice(0, shown).map(tileHTML).join("");
    idxSide.innerHTML = "";
    moreWrap.hidden = shown >= list.length;
    if (!moreWrap.hidden) {
      $("#moreBtn").textContent = `Load more (${list.length - shown} left)`;
    }
  }
}

/* one delegated listener for the whole index, both views */
idxMain.addEventListener("pointerover", (e) => {
  if (e.pointerType !== "mouse") return;
  const host = e.target.closest(".row, .tile");
  if (!host) return;
  const r = REELS.find((x) => x.id === host.dataset.id);
  if (!r) return;
  if (view === "list") {
    idxSide.innerHTML = `
      <div class="pin">
        <div class="media" style="--ar:${ar(r)}">
          <img src="assets/posters/${r.id}.jpg" alt="" decoding="async" />
        </div>
        <p class="pin-meta">${esc(r.client)} — ${esc(r.title)}</p>
      </div>`;
    armPreview($(".pin", idxSide), r.id);
  } else {
    armPreview(host, r.id);
  }
});
idxMain.addEventListener("pointerleave", releasePreview);

idxMain.addEventListener("click", (e) => {
  const host = e.target.closest(".row, .tile");
  if (!host) return;
  e.preventDefault();
  const r = REELS.find((x) => x.id === host.dataset.id);
  if (r) openLB(r);
});

$("#idxSearch").addEventListener("input", (() => {
  let t = 0;
  return (e) => {
    clearTimeout(t);
    t = setTimeout(() => { query = e.target.value; shown = PAGE; renderIndex(); }, 120);
  };
})());

$$("#viewToggle button").forEach((b) =>
  b.addEventListener("click", () => setView(b.dataset.view)));
$("#moreBtn").addEventListener("click", () => { shown += PAGE; renderIndex(); });

buildChips();
/* Force grid on real phones only. innerWidth can be 0 in a hidden/offscreen
   frame — treating that as mobile would persist "grid" for a desktop user. */
const narrow = innerWidth > 0 && innerWidth < 760;
if (narrow) { view = "grid"; }
$$("#viewToggle button").forEach((b) => b.classList.toggle("on", b.dataset.view === view));
renderIndex();

/* ---------- 04 client ledger ---------- */
(function roster() {
  $("#roster").innerHTML = CLIENTS.slice().sort((a, b) => a.localeCompare(b)).map((c) => {
    const n = CLIENT_VOLUME[c];
    return `<a href="#index" data-client="${esc(c)}">
      <b>${esc(c)}</b>
      <span>${n}${n >= 8 ? '<em>Ongoing</em>' : ""}</span>
    </a>`;
  }).join("");
  $$("#roster a").forEach((a) => a.addEventListener("click", () => {
    filter = "all";
    query = a.dataset.client;
    $("#idxSearch").value = a.dataset.client;
    shown = PAGE;
    buildChips();
    renderIndex();
  }));
})();

/* ---------- 05/06/07 gated sections ---------- */
function blank(el, label, ask) {
  if (!el) return;
  el.innerHTML = `<b>${esc(label)}</b><p>${ask}</p>`;
}

(function gated() {
  // testimonials
  const qs = SITE.testimonials || [];
  if (qs.length) {
    $("#says").hidden = false;
    $("#ledgerSays").textContent = `${qs.length} quote${qs.length > 1 ? "s" : ""}`;
    $("#quotes").innerHTML = qs.map((q) => `
      <figure class="quote">
        <blockquote>${esc(q.quote)}</blockquote>
        <figcaption>${esc(q.name)}${q.role ? " · " + esc(q.role) : ""}${q.org ? " · " + esc(q.org) : ""}</figcaption>
      </figure>`).join("");
  } else if (DRAFT) {
    $("#says").hidden = false;
    $("#ledgerSays").textContent = "empty";
    blank($("#blankQuotes"), "Placeholder — testimonials",
      `The single highest-value thing on this page. Four emails would fill it:
       NRG Podcast, Literacy Coalition, CEO Discovery, Children's Harbor.
       Add to <code>SITE.testimonials</code> in <code>assets/site-config.js</code> as
       <code>{quote, name, role, org}</code>, quote under 240 characters.
       <b style="color:inherit;display:inline">One quote renders correctly on its own — do not wait for three.</b>`);
  }

  // terms
  const t = SITE.terms || {};
  const LABELS = {
    process: "How a project runs", turnaround: "Turnaround",
    revisions: "Revisions included", usage: "Usage & licensing",
    payment: "Payment terms", backup: "Backup & redundancy",
    insurance: "Insurance & travel",
  };
  const filled = Object.keys(LABELS).filter((k) => t[k]);
  if (filled.length) {
    $("#terms").hidden = false;
    $("#ledgerTerms").textContent = `${filled.length} of 7`;
    $("#termsList").innerHTML = filled.map((k) =>
      `<div><dt>${LABELS[k]}</dt><dd>${esc(t[k])}</dd></div>`).join("");
    if (SITE.budgetLine) {
      $("#budgetLine").hidden = false;
      $("#budgetLine").textContent = SITE.budgetLine;
    }
  } else if (DRAFT) {
    $("#terms").hidden = false;
    $("#ledgerTerms").textContent = "empty";
    blank($("#blankTerms"), "Placeholder — working with me",
      `Seven plain answers in <code>SITE.terms</code>: process, turnaround, revisions,
       usage, payment, backup, insurance. Each row appears on its own, so filling in
       three of seven still looks deliberate. <code>SITE.budgetLine</code> is one honest
       sentence with your number — a stated floor filters out people who were never
       going to pay. Leave it null rather than guess.`);
  }

  // case studies
  const cs = SITE.caseStudies || [];
  if (cs.length) {
    $("#cases").hidden = false;
    $("#ledgerCases").textContent = `${cs.length} stud${cs.length > 1 ? "ies" : "y"}`;
    const byId = new Map(REELS.map((r) => [r.id, r]));
    $("#caseList").innerHTML = cs.map((c) => {
      const r = byId.get(c.pieceId);
      return `
      <div class="case-media">${r ? `
        <div class="media" style="--ar:${ar(r)}">
          <img src="assets/posters/${r.id}.jpg" alt="${esc(c.client)}" loading="lazy" decoding="async" />
        </div>` : ""}</div>
      <div class="case-body">
        <dl class="case-meta">
          <div><dt>Client</dt><dd>${esc(c.client)}</dd></div>
          <div><dt>Sector</dt><dd>${esc(c.sector)}</dd></div>
          <div><dt>Services</dt><dd>${esc(c.services)}</dd></div>
          <div><dt>Duration</dt><dd>${esc(c.duration)}</dd></div>
        </dl>
        <h4>Challenge</h4><p>${esc(c.challenge)}</p>
        <h4>Approach</h4><p>${esc(c.approach)}</p>
        ${c.outcome ? `<h4>Outcome</h4><p>${esc(c.outcome)}</p>` : ""}
      </div>`;
    }).join("");
  } else if (DRAFT) {
    $("#cases").hidden = false;
    $("#ledgerCases").textContent = "empty";
    blank($("#blankCases"), "Placeholder — case studies",
      `Write <b style="color:inherit;display:inline">two, not six</b> — one podcast retainer,
       one nonprofit film. Add to <code>SITE.caseStudies</code>:
       <code>{client, sector, services, duration, challenge, approach, outcome, pieceId}</code>.
       60–90 words each. The outcome needs one real number you collected — if you don't
       have one, leave the field out rather than inventing it.`);
  }

  // reel
  if (!(SITE.reel && SITE.reel.id) && DRAFT) {
    blank($("#blankReel"), "Placeholder — showreel",
      `60–90 seconds, strongest shot first, no build-up and no title card.
       Drop <code>assets/video/reel.mp4</code> and <code>assets/posters/reel.jpg</code>,
       then set <code>SITE.reel.id = "reel"</code>. It becomes the first piece here —
       inside the grid, click to play. It is never an autoplaying hero.`);
  }
})();

/* ---------- 08 fact box ---------- */
(function facts() {
  const f = SITE.facts || {};
  const rows = [
    ["Based", f.based], ["Works as", f.worksAs], ["Cameras", f.cameras],
    ["Edit", f.edit], ["Delivers", f.delivers], ["Turnaround", SITE.turnaround],
  ].filter(([, v]) => v);
  $("#facts").innerHTML = rows.map(([k, v]) =>
    `<div><dt>${k}</dt><dd>${esc(v)}</dd></div>`).join("");
})();

/* ---------- 09 deep dives ---------- */
(function dives() {
  const shows = new Set(REELS.filter((r) => r.category === "podcast").map((r) => r.client)).size;
  const pods = REELS.filter((r) => r.category === "podcast").slice(0, 4);
  const photos = typeof PHOTOS !== "undefined" ? PHOTOS : [];
  const sessions = new Set(photos.map((p) => p.client || p.session)).size;

  const tiles = (items, dir) => items.map((p) => `
    <div class="media" style="--ar:${p.w && p.h ? p.w + "/" + p.h : "1/1"}">
      <img src="assets/${dir}/${p.id}.jpg" alt="" loading="lazy" decoding="async" />
    </div>`).join("");

  $("#diveList").innerHTML = `
    <a class="dive" href="podcasts.html">
      <div class="dive-grid">${tiles(pods, "posters")}</div>
      <h3>Podcasts</h3>
      <p>${COUNTS.podcast} pieces across ${shows} shows.</p>
      <span class="btn-text">Open the catalogue →</span>
    </a>
    <a class="dive" href="photography.html">
      <div class="dive-grid">${tiles(photos.slice(0, 4), "photos")}</div>
      <h3>Photography</h3>
      <p>${photos.length} photographs across ${sessions} sessions.</p>
      <span class="btn-text">Open the gallery →</span>
    </a>`;
})();

/* ---------- 10 contact ---------- */
(function contact() {
  $("#mailtoPlain").href = `mailto:${SITE.email}`;
  $("#mailtoPlain").textContent = SITE.email;
  if (SITE.replyTime) { $("#replyTime").hidden = false; $("#replyTime").textContent = SITE.replyTime; }

  $("#ftrContact").innerHTML =
    `<a href="mailto:${esc(SITE.email)}">${esc(SITE.email)}</a>` +
    (SITE.instagram ? `<a href="${esc(SITE.instagram)}" rel="noopener">Instagram</a>` : "") +
    `<span class="mono">© ${new Date().getFullYear()}</span>`;

  const send = $("#briefSend");
  const compose = () => {
    const what = $("#bWhat").value, when = $("#bWhen").value, budget = $("#bBudget").value;
    const lines = [
      `What: ${what}`, `When: ${when}`, `Budget: ${budget}`,
      `From: ${$("#bName").value || "(name)"}`, "",
      $("#bMsg").value || "",
    ];
    const body = encodeURIComponent(lines.join("\n").slice(0, 1200));
    send.href = `mailto:${SITE.email}?subject=${encodeURIComponent("New project — " + what)}&body=${body}`;
  };
  $$("#brief select, #brief input, #brief textarea").forEach((el) => {
    el.addEventListener("input", compose);
    el.addEventListener("change", compose);
  });
  compose();
})();

/* ---------- 11 off the clock ---------- */
(function otc() {
  const bits = [`<span class="mono">Off the clock</span>`];
  if (SITE.instagram) bits.push(`<a class="btn-text" href="${esc(SITE.instagram)}" rel="noopener">Instagram →</a>`);
  if (SITE.music) bits.push(`<a class="btn-text" href="${esc(SITE.music)}" rel="noopener">Music →</a>`);
  bits.push(`<p>Shooting, editing and producing music when nobody is paying me to.</p>`);
  $("#otc").innerHTML = bits.join("");
})();

/* ---------- lightbox — native <dialog> ---------- */
const lb = $("#lb");
function openLB(r) {
  releasePreview();
  const isPhoto = !r.category;
  $("#lbMedia").innerHTML = isPhoto
    ? `<img src="assets/photos/${r.id}.jpg" alt="${esc(r.title)}" />`
    : `<video src="assets/video/${r.id}.mp4" controls autoplay playsinline
         poster="assets/posters/${r.id}.jpg"></video>`;
  $("#lbMeta").innerHTML =
    `<h3>${esc(r.title)}</h3><p>${esc(r.client)}${r.blurb ? " — " + esc(r.blurb) : ""}</p>` + slate(r);
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
lb.addEventListener("close", teardown);
lb.addEventListener("cancel", teardown);          // Esc
$("#lbX").addEventListener("click", closeLB);
lb.addEventListener("click", (e) => { if (e.target === lb) closeLB(); });
document.addEventListener("keydown", (e) => { if (e.key === "Escape" && lb.open) closeLB(); });

/* plates open the lightbox too */
$("#plates").addEventListener("click", (e) => {
  const host = e.target.closest(".plate");
  if (!host) return;
  const r = REELS.find((x) => x.id === host.dataset.id);
  if (r) openLB(r);
});
$("#plates").addEventListener("pointerover", (e) => {
  if (e.pointerType !== "mouse") return;
  const host = e.target.closest(".plate");
  if (host) armPreview(host, host.dataset.id);
});
$("#plates").addEventListener("pointerleave", releasePreview);

/* ---------- draft banner ---------- */
if (DRAFT) {
  const missing = [];
  if (!(SITE.reel && SITE.reel.id)) missing.push("reel");
  if (!(SITE.testimonials || []).length) missing.push("testimonials");
  if (!(SITE.caseStudies || []).length) missing.push("case studies");
  if (!Object.values(SITE.terms || {}).some(Boolean)) missing.push("terms");
  if (!SITE.budgetLine) missing.push("budget line");
  if (!SITE.availableFrom) missing.push("availability");
  const noRole = REELS.filter((r) => !roleOf(r)).length;

  const bar = document.createElement("div");
  bar.className = "draft-bar";
  bar.textContent = `DRAFT — still to fill: ${missing.join(", ")}`
    + (noRole ? ` · role missing on ${noRole}/${REELS.length} pieces` : "")
    + " · edit assets/site-config.js";
  document.body.appendChild(bar);
}
