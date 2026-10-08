/* ============================================================
   Jacob Gonzales — jacobgonzales.tv
   Everything editable lives in assets/site-config.js.
   Shared helpers ($, esc, previews, lightbox, count-up, timecode, masonry) are in
   common.js, which loads first.
   ============================================================ */

if (DRAFT) document.body.dataset.draft = "1";

/* ---------- derived data ---------- */
const CAT_ORDER = ["podcast", "motion", "nonprofit", "corporate", "social", "interviews"];

const COUNTS = REELS.reduce((m, r) => (m[r.category] = (m[r.category] || 0) + 1, m), {});
const CLIENT_VOLUME = REELS.reduce((m, r) => (m[r.client] = (m[r.client] || 0) + 1, m), {});
const CLIENTS = Object.keys(CLIENT_VOLUME);
const clientsIn = (cat) => new Set(REELS.filter((r) => r.category === cat).map((r) => r.client)).size;
const BY_ID = new Map(REELS.map((r) => [r.id, r]));
const find = (id) => BY_ID.get(id);
/* Not clients: his own spec work, his own studio, and an unnamed one-off. */
const NOT_CLIENTS = new Set(["Self-Directed", "Khanna House Studios", "Private Client"]);
const REAL_CLIENTS = CLIENTS.filter((c) => !NOT_CLIENTS.has(c));
const PHOTO_COUNT = typeof PHOTOS !== "undefined" ? PHOTOS.length : 0;

/* Curated nine: the reel if it exists, the motion/brand-led showcase, then
   top up so every discipline is represented. Volume-ranking buries the
   strongest material, which is why this is hand-picked, not sorted. */
const SHOWCASE = [
  "cryptorubik-orb", "vaporwave-collage", "tht-plane-intro",
  "polo-recap-ae", "cryptorubik-spot", "sparked-logo",
];
function curatedNine() {
  const out = [];
  if (SITE.reel && SITE.reel.id && BY_ID.has(SITE.reel.id)) out.push(find(SITE.reel.id));
  SHOWCASE.forEach((id) => { const r = find(id); if (r && !out.includes(r)) out.push(r); });
  ["nonprofit", "corporate", "interviews", "social", "podcast"].forEach((cat) => {
    if (out.length >= 9) return;
    const pick = REELS.find((r) => r.category === cat && !out.includes(r));
    if (pick) out.push(pick);
  });
  return out.slice(0, 9);
}

/* ---------- hero: status pill ---------- */
(function status() {
  const box = $("#status");
  const bits = [];
  if (SITE.available === false) {
    box.setAttribute("data-booking", "");
    bits.push(SITE.availableFrom ? `Booking from ${SITE.availableFrom}` : "Fully booked");
  } else {
    bits.push(SITE.availableFrom ? `Available from ${SITE.availableFrom}` : "Available for projects");
  }
  if (SITE.region) bits.push(SITE.region);
  if (SITE.turnaround) bits.push(`Turnaround ${SITE.turnaround}`);
  box.innerHTML = `<i></i>` + bits.map((b) => `<span>${esc(b)}</span>`).join(`<s>/</s>`);
})();

/* ---------- hero: stats ---------- */
(function heroStats() {
  // Clients are rounded DOWN to the nearest 5 with a "+", on purpose:
  // a few names in the manifest are the same client spelled two ways.
  const clients = Math.floor(REAL_CLIENTS.length / 5) * 5;
  const stats = [
    ["Pieces delivered", REELS.length, ""],
    ["Clients & shows", clients, "+"],
    ["Photographs", PHOTO_COUNT, ""],
  ].filter(([, n]) => n);
  $("#heroStats").innerHTML = stats.map(([k, n, suf]) =>
    `<div><dt>${k}</dt><dd data-count="${n}" data-suffix="${suf}">${n}${suf}</dd></div>`).join("");
})();

/* ---------- hero: the program monitor ----------
   A bin of five clips under a viewer. Pick one and it loads into the
   viewer; point at the viewer and it plays (the pooled preview), with the
   timecode running off the video itself. Nothing plays on its own. */
const MONITOR_BIN = ["cryptorubik-orb", "hona-open", "tht-plane-intro", "patricia-heaton", "vaporwave-collage"];
(function monitor() {
  const picks = MONITOR_BIN.map(find).filter(Boolean);
  curatedNine().forEach((r) => { if (picks.length < 5 && !picks.includes(r)) picks.push(r); });
  const screen = $("#monScreen"), media = $("#monMedia"), name = $("#monName"), tcEl = $("#monTc");
  const bin = $("#monBin");

  bin.innerHTML = picks.map((r, i) => `
    <button type="button" data-id="${r.id}" data-cat="${r.category}" data-n="${String(i + 1).padStart(2, "0")}"
            aria-label="Load ${esc(r.title)} — ${esc(r.client)}">
      <span class="media">${posterImg(r, 'loading="lazy"', "thumb")}</span>
    </button>`).join("");

  function load(r, first) {
    releasePreview();
    screen.dataset.id = r.id;
    // the accessible name must contain the visible hint text
    screen.setAttribute("aria-label", `${$(".mon-hint").textContent}: ${r.title} — ${r.client}`);
    media.innerHTML = posterImg(r, first ? 'fetchpriority="high"' : "", "full");
    name.textContent = `${r.client} — ${r.title}`;
    tcEl.textContent = "00:00:00:00";
    $$("button", bin).forEach((b) => b.classList.toggle("on", b.dataset.id === r.id));
    setTint(r);
  }
  if (!finePointer) $(".mon-hint").textContent = "Tap to watch";
  load(picks[0], true);
  bin.addEventListener("click", (e) => {
    const b = e.target.closest("button");
    if (b) load(find(b.dataset.id));
  });
  bin.addEventListener("pointerover", (e) => {
    const b = e.target.closest("button");
    if (b && e.pointerType === "mouse") load(find(b.dataset.id));
  });
  screen.addEventListener("pointerenter", (e) => { if (e.pointerType === "mouse") armPreview(screen, screen.dataset.id); });
  screen.addEventListener("pointerleave", releasePreview);
  screen.addEventListener("click", () => { const r = find(screen.dataset.id); if (r) openLB(r); });
  // burn the preview's own timecode into the monitor while it plays
  preview.addEventListener("timeupdate", () => {
    if (armed === screen) tcEl.textContent = timecode(preview.currentTime);
  });
})();

/* ---------- 35mm strip ---------- */
const RIBBON = [
  "cryptorubik-orb", "hona-open", "promisefund-event", "tht-plane-intro",
  "vaporwave-collage", "dk-intro", "super-fit-champs-energy-up-fun-up",
  "literacy-kravis-luncheon", "cryptorubik-spot", "hona-lifetime",
  "wellness-lt-text", "patricia-heaton", "tennis-with-ema-podcast-outro",
  "khanna-house-studios-studio-welcome", "cryptorubik-market", "promisefund-c433",
];
(function strip35() {
  const items = RIBBON.map(find).filter(Boolean);
  // edge numbers like real stock: a key code that counts up frame by frame
  const one = items.map((r, i) => `
    <div class="tape-item" data-id="${r.id}" title="${esc(r.client)} — ${esc(r.title)}">
      <div class="media" data-ar="${ar(r)}">${posterImg(r, 'loading="lazy"', "thumb")}</div>
      <span class="edge" aria-hidden="true">KJ 26 ${String(4410 + i * 16).padStart(4, "0")} ▸ ${i + 1}</span>
    </div>`).join("");
  const track = $("#ribbon");
  track.innerHTML = one + one;                 // twice, so the loop is seamless
  $$(".tape-item", track).slice(items.length).forEach((el) => el.setAttribute("aria-hidden", "true"));
  paintAR(track);
  wirePieces(track, ".tape-item", find);
})();

/* ---------- colour bars ----------
   Real SMPTE order, left to right: white, yellow, cyan, green, magenta,
   red, blue. Each discipline owns one bar. */
const BAR_ORDER = ["photo", "social", "podcast", "nonprofit", "motion", "interviews", "corporate"];
(function bars() {
  const cell = (c) => {
    if (c === "photo") return PHOTO_COUNT
      ? `<a href="photography.html" data-cat="photo"><span>Photography</span><b data-count="${PHOTO_COUNT}">${PHOTO_COUNT}</b></a>` : "";
    return `<a href="#index" data-cat="${c}"><span>${esc(CAT_LABEL[c])}</span><b data-count="${COUNTS[c] || 0}">${COUNTS[c] || 0}</b></a>`;
  };
  $("#contents").innerHTML = BAR_ORDER.map(cell).join("");
  $$("#contents a[data-cat]").forEach((a) => {
    if (a.dataset.cat !== "photo") a.addEventListener("click", () => setFilter(a.dataset.cat));
  });
})();

/* ---------- ledger rules ---------- */
$("#ledgerWork").textContent = "9 selected";
$("#ledgerComm").textContent = `${CAT_ORDER.length} disciplines`;
$("#ledgerIndex").textContent = `${REELS.length} pieces`;
$("#ledgerClients").textContent = `${CLIENTS.length} names`;
$("#ledgerStudio").textContent = "About";
$("#ledgerDives").textContent = "Deep dives";

/* ---------- 01 selected work ---------- */
(function plates() {
  /* A masonry of three columns (two on tablets, one on phones). Every piece
     keeps its true aspect ratio and the columns pack with no holes. The old
     fixed slot score left big empty gaps beside verticals. */
  const box = $("#plates");
  box.innerHTML = curatedNine().map((r, i) => `
    <article class="plate rv" data-pack="${i}" data-id="${r.id}" data-cat="${r.category}" data-ar="${ar(r)}">
      <div class="media" data-ar="${ar(r)}">
        ${posterImg(r)}
        <span class="safe" aria-hidden="true"></span>
        <span class="tag">${esc(CAT_LABEL[r.category] || r.category)}</span>
        ${r.dur ? `<span class="burn">${esc(durTC(r.dur))}</span>` : ""}
        <span class="play" aria-hidden="true"></span>
      </div>
      <h3 class="plate-t">${esc(r.title)}</h3>
      <p class="plate-b">${esc(r.blurb || "")}</p>
      ${slate(r)}
    </article>`).join("");
  paintAR(box);
  pack(box, (w) => (w >= 1100 ? 3 : w >= 600 ? 2 : 1), 0.42);
  wirePieces(box, ".plate", find);
})();

/* ---------- device mockups ----------
   Each loop loads and plays only while it's on screen, and pauses when
   it scrolls away. Reduced motion: posters only. Click opens the piece. */
(function screens() {
  const figs = $$(".scr");
  figs.forEach((f) => f.addEventListener("click", () => { const r = find(f.dataset.id); if (r) openLB(r); }));
  if (reduced || !("IntersectionObserver" in window)) return;
  const io = new IntersectionObserver((entries) => entries.forEach((e) => {
    const v = $("video", e.target);
    if (e.isIntersecting) {
      if (!v.src) v.src = v.dataset.src;
      v.play().catch(() => {});
    } else v.pause();
  }), { threshold: 0.35 });
  figs.forEach((f) => io.observe(f));
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

  const box = $("#comm");
  box.innerHTML = CAT_ORDER.map((cat, i) => {
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
    <details id="c-${cat}" class="rv" data-cat="${cat}">
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
            <div class="tile-lite" data-id="${r.id}">
              <div class="media" data-ar="${ar(r)}">${posterImg(r)}<span class="safe" aria-hidden="true"></span><span class="play" aria-hidden="true"></span></div>
            </div>`).join("")}
        </div>
        <a class="btn-text" href="#index" data-cat="${cat}">See all ${COUNTS[cat]} in the index →</a>
      </div>
    </details>`;
  }).join("");
  paintAR(box);
  $$(".comm-strip", box).forEach((s) => wirePieces(s, ".tile-lite", find));

  $$("#comm a[data-cat]").forEach((a) =>
    a.addEventListener("click", () => setFilter(a.dataset.cat)));

  // deep link: /#c-nonprofit opens that row
  if (location.hash.startsWith("#c-")) {
    const d = $(location.hash);
    if (d) { d.open = true; setTimeout(() => d.scrollIntoView({ block: "center" }), 60); }
  }
})();

/* ---------- 03 the index ---------- */
const PAGE = 24;      // tiles per page
const PAGE_LIST = 60; // rows per page — 259 at once made the page 22 screens
let filter = "all";
let query = "";
/* Grid is the default: thumbnails sell footage better than a table.
   (New storage key, so visitors who once saw list-by-default get grid.) */
const VIEW_KEY = "jg.index.view2";
let view = (() => {
  try { return localStorage.getItem(VIEW_KEY) || "grid"; } catch (e) { return "grid"; }
})();
let shown = PAGE_LIST;

const idxMain = $("#idxMain");
const idxSide = $("#idxSide");
const moreWrap = $("#moreWrap");

/* "All" with no search deals the categories out in turn, so the first page
   shows the range instead of seven near-identical podcast verticals. */
const MIX_ORDER = ["motion", "nonprofit", "podcast", "corporate", "social", "interviews"];
const MIXED = (() => {
  const lanes = MIX_ORDER.map((c) => REELS.filter((r) => r.category === c));
  REELS.forEach((r) => { if (!MIX_ORDER.includes(r.category)) lanes.push([r]); });
  const out = [];
  for (let i = 0; out.length < REELS.length; i++) lanes.forEach((l) => { if (l[i]) out.push(l[i]); });
  return out;
})();

function matching() {
  const q = query.trim().toLowerCase();
  if (filter === "all" && !q) return MIXED;
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
    `<button type="button" class="chip${id === filter ? " on" : ""}" data-f="${id}" data-cat="${id}"
       aria-pressed="${id === filter}">${esc(label)}</button>`).join("");
  $$("#chips .chip").forEach((b) =>
    b.addEventListener("click", () => setFilter(b.dataset.f)));
}

function setFilter(cat) {
  filter = cat;
  shown = view === "list" ? PAGE_LIST : PAGE;
  buildChips();
  renderIndex();
  const sec = $("#index");
  if (sec) sec.scrollIntoView({ behavior: reduced ? "auto" : "smooth", block: "start" });
}

function setView(v) {
  view = v;
  try { localStorage.setItem(VIEW_KEY, v); } catch (e) { /* private mode */ }
  $$("#viewToggle button").forEach((b) => b.classList.toggle("on", b.dataset.view === v));
  shown = v === "list" ? PAGE_LIST : PAGE;
  renderIndex();
}

function rowHTML(r, i) {
  const role = roleOf(r);
  return `<a class="row" href="#" data-id="${r.id}" data-cat="${r.category}">
    <span class="row-n">${String(i + 1).padStart(3, "0")}</span>
    <span class="row-c">${esc(r.client)}</span>
    <span class="row-t">${esc(r.title)}</span>
    <span class="row-d"><i class="dot"></i>${esc(CAT_LABEL[r.category] || r.category)}</span>
    <span class="row-y">${esc(r.dur || "")}</span>
    ${role ? `<span class="sr-only">${esc(role)}</span>` : ""}
  </a>`;
}

function tileHTML(r, i) {
  return `<article class="tile" data-pack="${i}" data-ar="${ar(r)}" data-id="${r.id}" data-cat="${r.category}">
    <div class="media" data-ar="${ar(r)}">
      ${posterImg(r)}
      <span class="safe" aria-hidden="true"></span>
      ${r.dur ? `<span class="burn">${esc(durTC(r.dur))}</span>` : ""}
      <span class="play" aria-hidden="true"></span>
    </div>
    <div class="tile-m"><span class="tile-c"><i class="dot"></i><b>${esc(r.client)}</b></span><span>${esc(CAT_LABEL[r.category] || "")}</span></div>
  </article>`;
}

function renderIndex() {
  const list = matching();
  $("#idxCount").textContent = `${list.length} of ${REELS.length}`;

  if (view === "list") {
    unpack(idxMain);
    idxMain.className = "idx-rows";
    idxMain.innerHTML = list.slice(0, shown).map(rowHTML).join("");
    idxSide.setAttribute("aria-hidden", "true");
    idxSide.innerHTML = `<div class="pin"><div class="pin-empty">No signal<br />Point at a row</div></div>`;
    moreWrap.hidden = shown >= list.length;
    if (!moreWrap.hidden) {
      $("#moreBtn").textContent = `Show more (${list.length - shown} left)`;
    }
  } else {
    idxMain.className = "tiles";
    idxMain.innerHTML = list.slice(0, shown).map(tileHTML).join("");
    paintAR(idxMain);
    pack(idxMain, (w) => (w >= 1280 ? 5 : w >= 1000 ? 4 : w >= 700 ? 3 : 2), 0.16);
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
  const r = find(host.dataset.id);
  if (!r) return;
  if (view === "list") {
    const pin = $(".pin", idxSide);
    if (pin && pin.dataset.id === r.id) return;
    releasePreview();
    idxSide.innerHTML = `
      <div class="pin" data-id="${r.id}" data-cat="${r.category}">
        <div class="media" data-ar="${ar(r)}">
          <img src="${posterSrc(r.id)}" alt="" decoding="async" />
        </div>
        <p class="pin-meta">${esc(r.client)} — ${esc(r.title)}</p>
      </div>`;
    paintAR(idxSide);
    armPreview($(".pin", idxSide), r.id);
  } else {
    armPreview(host, r.id);
  }
});
idxMain.addEventListener("pointerout", (e) => {
  if (view !== "grid") return;
  const host = e.target.closest(".tile");
  if (host && !host.contains(e.relatedTarget)) releasePreview();
});
idxMain.addEventListener("pointerleave", releasePreview);

idxMain.addEventListener("click", (e) => {
  const host = e.target.closest(".row, .tile");
  if (!host) return;
  e.preventDefault();
  const r = find(host.dataset.id);
  if (r) openLB(r);
});

$("#idxSearch").addEventListener("input", (() => {
  let t = 0;
  return (e) => {
    clearTimeout(t);
    t = setTimeout(() => { query = e.target.value; shown = view === "list" ? PAGE_LIST : PAGE; renderIndex(); }, 120);
  };
})());

$$("#viewToggle button").forEach((b) =>
  b.addEventListener("click", () => setView(b.dataset.view)));
$("#moreBtn").addEventListener("click", () => { shown += view === "list" ? PAGE_LIST : PAGE; renderIndex(); });

buildChips();
/* Force grid on real phones only. innerWidth can be 0 in a hidden/offscreen
   frame — treating that as mobile would persist "grid" for a desktop user. */
const narrow = innerWidth > 0 && innerWidth < 760;
if (narrow) { view = "grid"; }
shown = view === "list" ? PAGE_LIST : PAGE;   // page size must match the view
$$("#viewToggle button").forEach((b) => b.classList.toggle("on", b.dataset.view === view));
renderIndex();

/* ---------- 04 clients: end credits + roster ---------- */
(function clients() {
  /* Credits are grouped by what was made for them, biggest first,
     the way a real crawl groups departments. */
  const HEAD = {
    podcast: "Podcast production", motion: "Motion graphics", nonprofit: "Nonprofit & event film",
    corporate: "Corporate & brand film", social: "Branded social", interviews: "Interviews",
  };
  const mainCat = (c) => {
    const n = {};
    REELS.filter((r) => r.client === c).forEach((r) => { n[r.category] = (n[r.category] || 0) + 1; });
    return Object.keys(n).sort((a, b) => n[b] - n[a])[0];
  };
  const groups = {};
  REAL_CLIENTS.forEach((c) => { (groups[mainCat(c)] = groups[mainCat(c)] || []).push(c); });
  const crawl = CAT_ORDER.filter((c) => groups[c]).map((c) => `
    <p class="cr-head">${esc(HEAD[c])}</p>
    <dl>${groups[c].sort((a, b) => CLIENT_VOLUME[b] - CLIENT_VOLUME[a]).map((name) => `
      <div><dt>${CLIENT_VOLUME[name]} piece${CLIENT_VOLUME[name] === 1 ? "" : "s"}</dt><dd>${esc(name)}</dd></div>`).join("")}
    </dl>`).join("");
  $("#credits").innerHTML = crawl + crawl;     // twice, so the roll loops

  $("#roster").innerHTML = CLIENTS.slice().sort((a, b) => a.localeCompare(b)).map((c) => {
    const n = CLIENT_VOLUME[c];
    return `<a href="#index" data-client="${esc(c)}">
      <b>${esc(c)}</b>
      <span>${n >= 8 ? "<em>Ongoing</em>" : ""}<i>${n}</i></span>
    </a>`;
  }).join("");
  /* 51 pills is two screens on a phone: fold to three rows behind a button */
  const roster = $("#roster"), more = $("#rosterMore");
  roster.classList.add("folded");
  more.hidden = false;
  more.textContent = `Show all ${CLIENTS.length} clients`;
  more.addEventListener("click", () => {
    const folded = roster.classList.toggle("folded");
    more.textContent = folded ? `Show all ${CLIENTS.length} clients` : "Show fewer";
    more.setAttribute("aria-expanded", String(!folded));
  });

  $$("#roster a").forEach((a) => a.addEventListener("click", () => {
    filter = "all";
    query = a.dataset.client;
    $("#idxSearch").value = a.dataset.client;
    shown = view === "list" ? PAGE_LIST : PAGE;
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
      <figure class="quote rv">
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
       <strong>One quote renders correctly on its own — do not wait for three.</strong>`);
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
    $("#caseList").innerHTML = cs.map((c) => {
      const r = find(c.pieceId);
      return `
      <div class="case-media">${r ? `
        <div class="media" data-ar="${ar(r)}">
          <img src="${posterSrc(r.id)}" alt="${esc(c.client)}" loading="lazy" decoding="async" />
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
    paintAR($("#caseList"));
  } else if (DRAFT) {
    $("#cases").hidden = false;
    $("#ledgerCases").textContent = "empty";
    blank($("#blankCases"), "Placeholder — case studies",
      `Write <strong>two, not six</strong> — one podcast retainer,
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
    <div class="media" data-ar="${dir === "photos" ? "4/5" : ar(p)}">
      <img src="${dir === "photos" ? photoSrc(p.id) : posterSrc(p.id)}" alt="" loading="lazy" decoding="async" />
    </div>`).join("");

  const box = $("#diveList");
  box.innerHTML = `
    <a class="dive rv" href="podcasts.html" data-cat="podcast">
      <div class="dive-grid">${tiles(pods, "posters")}</div>
      <h3>Podcasts</h3>
      <p>${COUNTS.podcast} pieces across ${shows} shows.</p>
      <span class="btn-text">Open the catalogue →</span>
    </a>
    <a class="dive rv" href="photography.html" data-cat="photo">
      <div class="dive-grid">${tiles(photos.slice(0, 4), "photos")}</div>
      <h3>Photography</h3>
      <p>${photos.length} photographs across ${sessions} sessions.</p>
      <span class="btn-text">Open the gallery →</span>
    </a>`;
  paintAR(box);
})();

/* ---------- 10 contact ---------- */
(function contact() {
  $("#mailtoPlain").href = `mailto:${SITE.email}`;
  $("#mailtoPlain").textContent = SITE.email;
  if (SITE.replyTime) { $("#replyTime").hidden = false; $("#replyTime").textContent = SITE.replyTime; }

  $("#ftrContact").innerHTML =
    `<a href="mailto:${esc(SITE.email)}">${esc(SITE.email)}</a>` +
    (SITE.instagram ? `<a href="${esc(SITE.instagram)}" target="_blank" rel="noopener">Instagram</a>` : "") +
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
  // Enter in a field must not submit the form (the CSP blocks form posts anyway)
  $("#brief").addEventListener("submit", (e) => { e.preventDefault(); compose(); send.click(); });
  compose();

  // the slate is dated today, like a real one
  const d = new Date();
  $("#slateDate").textContent = `${pad2(d.getMonth() + 1)}.${pad2(d.getDate())}.${String(d.getFullYear()).slice(2)}`;
})();

/* ---------- header timecode ----------
   The page is treated as one long timeline the length of everything
   delivered. Scrolling scrubs through it. */
(function headerTC() {
  const total = REELS.reduce((t, r) => t + durSec(r.dur), 0);
  const el = $("#hdrTc"), of = $("#hdrTcOf");
  if (!el) return;
  of.textContent = `/ ${timecode(total)} delivered`;
  let ticking = false;
  const draw = () => {
    ticking = false;
    const max = document.documentElement.scrollHeight - innerHeight;
    el.textContent = timecode(total * (max > 0 ? Math.min(1, scrollY / max) : 0));
  };
  addEventListener("scroll", () => { if (!ticking) { ticking = true; requestAnimationFrame(draw); } }, { passive: true });
  draw();
})();

/* ---------- 11 off the clock ---------- */
(function otc() {
  const bits = [`<span class="mono">Off the clock</span>`];
  if (SITE.instagram) bits.push(`<a class="btn-text" href="${esc(SITE.instagram)}" target="_blank" rel="noopener">Instagram →</a>`);
  if (SITE.music) bits.push(`<a class="btn-text" href="${esc(SITE.music)}" rel="noopener">Music →</a>`);
  bits.push(`<p>Shooting, editing and producing music when nobody is paying me to.</p>`);
  $("#otc").innerHTML = bits.join("");
})();

/* ---------- scroll reveals + count-ups ---------- */
$$(".sec-head, .contents-in, .idx-bar, .roster, .studio-copy").forEach((el) => el.classList.add("rv"));
countUp();

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
