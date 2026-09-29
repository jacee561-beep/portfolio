/* ============================================================
   site-config.js — EVERYTHING YOU EDIT LIVES HERE.

   Jacob: this is the only file you need to touch to fill the site in.
   You do not need to understand the rest of the code.

   Anything left as null or [] simply DOES NOT APPEAR on the live site.
   Nothing ever renders as "coming soon" or an empty box to a visitor.

   To see what is still missing, open the site with ?draft=1 on the end:
       https://jacobgonzales.tv/?draft=1
   That shows every blank slot with a note saying exactly what to put in it.
   Only you see this — a normal visitor never does.
   ============================================================ */

const SITE = {

  /* ---------- the basics (already filled in) ---------- */
  name: "Jacob Gonzales",
  studio: "Khanna House Studios",
  region: "South Florida + travel",
  email: "jacee561@gmail.com",
  instagram: "https://www.instagram.com/",

  /* ---------- the status strip under the header ----------
     Each of these is one segment of the strip. A null value removes
     that segment cleanly — the strip still looks finished.

     WARNING: these are promises. "Available from March" still sitting
     there in August is worse than saying nothing at all. If you can't
     keep it current, leave them null.                                */
  availableFrom: null,      // e.g. "MARCH"  — when you can start
  available: true,          // false flips the dot and says "BOOKING FROM ..."
  turnaround: null,         // e.g. "2-3 WEEKS" — your typical turnaround
  replyTime: null,          // e.g. "I reply within one business day."

  /* ---------- the showreel ----------
     NOT an autoplaying video at the top of the page. It becomes the
     first piece inside Selected Work, click to play, like everything else.

     To add one: put reel.mp4 in assets/video/ and reel.jpg in
     assets/posters/, then set id below to "reel".

     Make it 60-90 seconds. Strongest shot first. No slow build-up,
     no title card - nobody watches past 10 seconds of branding.       */
  reel: { id: null, length: null },

  /* ---------- what clients say ----------
     THE SINGLE HIGHEST-VALUE THING ON THIS PAGE.

     Four emails would fill this: NRG Podcast, Literacy Coalition,
     CEO Discovery, Children's Harbor. Ask each for three sentences
     about what it was like working with you.

     ONE quote renders correctly on its own. Do not wait until you
     have three.

     Shape: { quote: "...", name: "...", role: "...", org: "..." }
     Keep each quote under 240 characters.                            */
  testimonials: [],

  /* ---------- case studies ----------
     Write TWO, not six. One podcast retainer, one nonprofit film.

     Shape: {
       client, sector, services, duration,
       challenge, approach, outcome,   // 60-90 words each
       pieceId                          // an id from manifest.js for the image
     }
     The outcome needs one real number you actually collected.
     If you don't have a number, leave `outcome` out — don't invent one. */
  caseStudies: [],

  /* ---------- working with me ----------
     Plain answers to the questions every client asks before booking.
     Each row appears on its own, so filling in three of seven is fine
     and still looks deliberate.                                       */
  terms: {
    process: null,     // "How a project runs" - the 3-4 steps from call to delivery
    turnaround: null,  // "Social cutdowns 3-5 business days, event recap 2 weeks..."
    revisions: null,   // "Two rounds included, further rounds billed hourly."
    usage: null,       // who owns the footage, where they may use it, for how long
    payment: null,     // "50% to book, 50% on delivery." Net 30? Deposit?
    backup: null,      // "Dual card recording, backed up to two drives same day."
    insurance: null,   // liability cover, travel radius
  },

  /* ---------- budget ----------
     One honest sentence with YOUR number, e.g.
     "Most projects land between $2,500 and $12,000 depending on shoot days."

     A stated floor filters out people who were never going to pay you.
     Leave it null rather than guess - no figure will be written for you. */
  budgetLine: null,

  /* ---------- what you can commission ----------
     The names, piece counts and thumbnails are worked out automatically
     from your manifest, so this section already looks complete.
     Only these three sentences per row are missing.                   */
  commission: {
    podcast: { included: null, turnaround: null, needFromYou: null },
    motion: { included: null, turnaround: null, needFromYou: null },
    nonprofit: { included: null, turnaround: null, needFromYou: null },
    corporate: { included: null, turnaround: null, needFromYou: null },
    social: { included: null, turnaround: null, needFromYou: null },
    interviews: { included: null, turnaround: null, needFromYou: null },
  },

  /* ---------- the fact box in the About section ---------- */
  facts: {
    based: "South Florida",
    worksAs: "Solo - shoot, edit, animate, deliver",
    cameras: null,   // e.g. "Sony FX3 / a7S III, DJI"
    edit: "Premiere Pro, After Effects, DaVinci Resolve",
    delivers: "4K, vertical cutdowns, captions, colour and audio master",
  },

  /* ---------- optional extras ----------
     All of these are off unless you fill them.                        */
  music: null,   // your own tracks only - confirm they're yours before publishing
  bts: [],       // behind-the-scenes stills: 3 landscape shots, real crew/rig moments
  logos: [],     // only real logo files you have permission to use
  press: [],     // awards, features, mentions

  /* ---------- default roles ----------
     What you actually did, per category. Used when a piece has no
     `role` of its own. A client assumes the smaller answer if you
     don't say - "edit only" when you shot and directed it.            */
  defaultRoles: {
    podcast: null,      // e.g. "Multi-cam production, edit, graphics"
    motion: null,       // e.g. "Design, animation"
    nonprofit: null,
    corporate: null,
    social: null,
    interviews: null,
  },
};

/* ------------------------------------------------------------
   Technical switches — leave these alone unless told otherwise.
   ------------------------------------------------------------ */

/* Hover previews: pointing at any piece plays it, muted, in place.
   It streams the real video file and stops the download the moment the
   pointer leaves. Set to false to turn previews off everywhere. */
const PREVIEWS = true;

/* Draft mode: ?draft=1 in the URL, or run  localStorage.jgDraft = 1
   in the browser console to keep it on. */
const DRAFT = (() => {
  try {
    return new URLSearchParams(location.search).has("draft")
      || localStorage.getItem("jgDraft") === "1";
  } catch (e) {
    return false;
  }
})();
