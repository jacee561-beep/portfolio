/* Photography gallery — PHOTOS grouped by session.
   Helpers ($, esc, paintAR, wirePieces, openLB) come from common.js. */

const sessions = new Map();
PHOTOS.forEach((p) => {
  if (!sessions.has(p.client)) sessions.set(p.client, []);
  sessions.get(p.client).push(p);
});
const slug = (s) => "set-" + s.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");

$("#count").textContent = `${PHOTOS.length} photographs across ${sessions.size} sessions. Click any frame to enlarge.`;

$("#jump").innerHTML = [...sessions.entries()].map(([client, list]) =>
  `<a class="chip" data-cat="photo" href="#${slug(client)}">${esc(client)} <i>${list.length}</i></a>`).join("");

const wrap = $("#groups");
wrap.innerHTML = [...sessions.entries()].map(([client, list]) => `
  <div class="shelf" id="${slug(client)}">
    <div class="group-head rv">
      <h2>${esc(client)}</h2>
      <span>${esc(list[0].title)}</span>
    </div>
    <div class="tiles">
      ${list.map((p, i) => `
        <article class="tile photo" data-pack="${i}" data-ar="${p.w && p.h ? p.w + "/" + p.h : "4/5"}" data-id="${p.id}" data-cat="photo">
          <div class="media" data-ar="${p.w && p.h ? p.w + "/" + p.h : "4/5"}">
            <img src="${photoSrc(p.id)}" alt="${esc(p.title)} — ${esc(p.client)}" loading="lazy" decoding="async" />
          </div>
        </article>`).join("")}
    </div>
  </div>`).join("");

paintAR(wrap);
$$(".shelf .tiles", wrap).forEach((t) => pack(t, (w) => (w >= 1100 ? 4 : w >= 700 ? 3 : 2), 0.02));

const byId = new Map(PHOTOS.map((p) => [p.id, p]));
/* photos have no video, so the hover preview is skipped: wire click only */
wrap.addEventListener("click", (e) => {
  const host = e.target.closest(".tile");
  if (!host) return;
  const p = byId.get(host.dataset.id);
  if (p) openLB(p);
});
