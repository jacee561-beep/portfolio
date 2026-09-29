/* Podcast catalogue — every podcast piece in the manifest, grouped by show.
   Helpers ($, esc, ar, paintAR, wirePieces, openLB) come from common.js. */

const pods = REELS.filter((r) => r.category === "podcast");
const shows = new Map();
pods.forEach((r) => {
  if (!shows.has(r.client)) shows.set(r.client, []);
  shows.get(r.client).push(r);
});
const ordered = [...shows.entries()].sort((a, b) => b[1].length - a[1].length);
const slug = (s) => "show-" + s.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");

$("#count").textContent = `${pods.length} reels across ${shows.size} shows. Hover to preview, click to watch.`;

$("#jump").innerHTML = ordered.map(([client, list]) =>
  `<a class="chip" data-cat="podcast" href="#${slug(client)}">${esc(client)} <i>${list.length}</i></a>`).join("");

const wrap = $("#groups");
wrap.innerHTML = ordered.map(([client, list]) => `
  <div class="shelf" id="${slug(client)}">
    <div class="group-head rv">
      <h2>${esc(client)}</h2>
      <span>${list.length} reel${list.length === 1 ? "" : "s"}</span>
    </div>
    <div class="tiles">
      ${list.map((r, i) => `
        <article class="tile" data-pack="${i}" data-ar="${ar(r)}" data-id="${r.id}" data-cat="podcast">
          <div class="media" data-ar="${ar(r)}">
            ${posterImg(r)}
            <span class="play" aria-hidden="true"></span>
          </div>
          <div class="tile-m"><span class="tile-c"><b>${esc(r.title)}</b></span><span>${esc(r.dur || "")}</span></div>
        </article>`).join("")}
    </div>
  </div>`).join("");
paintAR(wrap);
$$(".shelf .tiles", wrap).forEach((t) => pack(t, (w) => (w >= 1100 ? 5 : w >= 760 ? 3 : 2), 0.18));

const byId = new Map(pods.map((r) => [r.id, r]));
wirePieces(wrap, ".tile", (id) => byId.get(id));
