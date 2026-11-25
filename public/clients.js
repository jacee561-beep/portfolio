/* Client pages: one shelf per client with what was delivered for them (piece count, formats, runtime,
   kinds of work), every number derived from the manifest so it never goes stale.
   Helpers ($, esc, ar, paintAR, pack, posterImg, durSec, durTC, timecode, wirePieces) come from common.js.
   Each shelf has its own anchor (#client-<slug>) so one client's page can be sent as a link. */

const SKIP = new Set(["Self-Directed", "Private Client"]);   // not clients
const MIN = 5;                                                 // smaller sets stay in the main index

const byClient = new Map();
REELS.forEach((r) => {
  if (SKIP.has(r.client)) return;
  if (!byClient.has(r.client)) byClient.set(r.client, []);
  byClient.get(r.client).push(r);
});
const ordered = [...byClient.entries()].filter(([, l]) => l.length >= MIN).sort((a, b) => b[1].length - a[1].length);
const slug = (s) => "client-" + s.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");
const CAT = new Map(CATEGORIES.map((c) => [c.id, c.label]));
const pieces = ordered.reduce((n, [, l]) => n + l.length, 0);

$("#count").textContent = `${ordered.length} clients, ${pieces} delivered pieces. Hover to preview, click to watch.`;
$("#jump").innerHTML = ordered.map(([client, list]) =>
  `<a class="chip" href="#${slug(client)}">${esc(client)} <i>${list.length}</i></a>`).join("");

function facts(list) {
  const v = list.filter((r) => (r.w && r.h ? r.h > r.w : r.orientation !== "landscape")).length;
  const secs = list.reduce((s, r) => s + durSec(r.dur || "0:00"), 0);
  const mins = Math.round(secs / 60);
  const fmt = [v && `${v} vertical`, list.length - v && `${list.length - v} landscape`].filter(Boolean).join(", ");
  const cats = [...new Set(list.map((r) => r.category))];
  return { fmt, run: mins >= 1 ? `${mins} min of finished video` : `${Math.round(secs)} s of finished video`, cats };
}

const FIRST = 5;
const tile = (r, i) => `
  <article class="tile" data-pack="${i}" data-ar="${ar(r)}" data-id="${r.id}" data-cat="${r.category}">
    <div class="media" data-ar="${ar(r)}">
      ${posterImg(r)}
      <span class="safe" aria-hidden="true"></span>
      ${r.dur ? `<span class="burn">${esc(durTC(r.dur))}</span>` : ""}
      <span class="play" aria-hidden="true"></span>
    </div>
    <div class="tile-m"><span class="tile-c"><b>${esc(r.title)}</b></span></div>
  </article>`;
const cols = (w) => (w >= 1100 ? 5 : w >= 760 ? 3 : 2);

function fill(shelf, list, all) {
  const t = $(".tiles", shelf);
  t.innerHTML = (all ? list : list.slice(0, FIRST)).map(tile).join("");
  paintAR(t);
  pack(t, cols, 0.18);
}

const wrap = $("#groups");
wrap.innerHTML = ordered.map(([client, list]) => {
  const f = facts(list);
  return `
  <div class="shelf" id="${slug(client)}">
    <div class="group-head rv">
      <h2>${esc(client)}</h2>
      <span>${list.length} piece${list.length === 1 ? "" : "s"}</span>
    </div>
    <p class="case-line">${esc(f.fmt)} · ${esc(f.run)}</p>
    <div class="case-cats">${f.cats.map((c) => `<span class="chip" data-cat="${c}">${esc(CAT.get(c) || c)}</span>`).join("")}</div>
    <div class="tiles"></div>
    ${list.length > FIRST ? `<button type="button" class="more-btn shelf-more" aria-expanded="false">Show all ${list.length}</button>` : ""}
  </div>`;
}).join("");

ordered.forEach(([client, list]) => {
  const shelf = document.getElementById(slug(client));
  fill(shelf, list, false);
  const btn = $(".shelf-more", shelf);
  if (btn) btn.addEventListener("click", () => {
    const open = btn.getAttribute("aria-expanded") !== "true";
    fill(shelf, list, open);
    btn.setAttribute("aria-expanded", String(open));
    btn.textContent = open ? "Show fewer" : `Show all ${list.length}`;
    if (!open) shelf.scrollIntoView({ block: "start" });
  });
});

const byId = new Map(ordered.flatMap(([, l]) => l).map((r) => [r.id, r]));
wirePieces(wrap, ".tile", (id) => byId.get(id));
