// Portfolio content manifest — edit this to add/remove/reorder work.
const REELS = [
  // ---- Podcast & Talk Show ----
  {
    id: "nrg-manifold-highlight",
    category: "podcast",
    client: "NRG Podcast",
    title: "Manifold — Highlight Reel",
    blurb: "Auto-captioned, speaker-tracked highlight cut from the Manifold episode.",
    orientation: "portrait", accent: "#ecbc65", w: 1080, h: 1920, dur: "0:51"
  },
  {
    id: "nrg-manifold-reel",
    category: "podcast",
    client: "NRG Podcast",
    title: "Manifold — Speaker Reel",
    blurb: "Multi-camera speaker tracking with animated captions.",
    orientation: "portrait", accent: "#e57106", w: 1080, h: 1920, dur: "0:32"
  },
  {
    id: "nrg-ep7",
    category: "podcast",
    client: "NRG Podcast",
    title: "Episode 7 — Reel Cut",
    blurb: "Story-driven highlight pulled from a 90-minute episode.",
    orientation: "portrait", accent: "#e56806", w: 1080, h: 1920, dur: "0:57"
  },
  {
    id: "nrg-ep8",
    category: "podcast",
    client: "NRG Podcast",
    title: "Episode 8 — Reel Cut",
    blurb: "Full-length highlight reel with clean pacing and captions.",
    orientation: "portrait", accent: "#33a7b8", w: 1080, h: 1920, dur: "1:33"
  },
  {
    id: "nrg-ep9",
    category: "podcast",
    client: "NRG Podcast",
    title: "Episode 9 — Reel Cut",
    blurb: "Two-speaker episode, cut for the strongest story beat.",
    orientation: "portrait", accent: "#e55106", w: 1080, h: 1920, dur: "0:58"
  },
  {
    id: "nrg-ep10",
    category: "podcast",
    client: "NRG Podcast",
    title: "Episode 10 — Reel Cut",
    blurb: "Sentence-aligned highlight clip, ready for social.",
    orientation: "portrait", accent: "#b66a35", w: 1080, h: 1920, dur: "1:06"
  },
  {
    id: "nrg-ep11",
    category: "podcast",
    client: "NRG Podcast",
    title: "Episode 11 — Reel Cut",
    blurb: "Punch-in zooms timed to the speaker's cadence.",
    orientation: "portrait", accent: "#e6b86b", w: 1080, h: 1920, dur: "0:44"
  },
  {
    id: "cwk-intro",
    category: "podcast",
    client: "Coffee with Kelly",
    title: "Show Open",
    blurb: "Title sequence and intro package for the show.",
    orientation: "landscape", accent: "#f4ac5d", w: 1920, h: 1080, dur: "0:13"
  },
  {
    id: "cwk-reel",
    category: "podcast",
    client: "Coffee with Kelly",
    title: "Episode Highlight",
    blurb: "Landscape highlight cut for cross-platform posting.",
    orientation: "landscape", accent: "#5606e5", w: 1920, h: 1080, dur: "0:32"
  },
  {
    id: "eqb2b-ep2",
    category: "podcast",
    client: "EQB2B",
    title: "Episode 2 — Reel Cut",
    blurb: "Branded podcast highlight reel with logo treatment.",
    orientation: "portrait", accent: "#b65035", w: 1080, h: 1920, dur: "0:58"
  },
  {
    id: "dr-shaw-1",
    category: "podcast",
    client: "Dr. Shaw",
    title: "Show Reel",
    blurb: "Interview-style talk segment cut for social.",
    orientation: "portrait", accent: "#568dfb", w: 1080, h: 1920, dur: "0:43"
  },
  {
    id: "wjm-pizza",
    category: "podcast",
    client: "We Just Met",
    title: "Pizza Date — Reel Cut",
    blurb: "Dating-show episode highlight, cut for pacing and punchlines.",
    orientation: "portrait", accent: "#e59a06", w: 1080, h: 1920, dur: "0:52"
  },

  // ---- Corporate & Brand ----
  {
    id: "ceod-what-is-ceod",
    category: "corporate",
    client: "CEO Discovery",
    title: "What Is CEOD",
    blurb: "Corporate explainer piece for a private-equity talent platform.",
    orientation: "portrait", accent: "#6f94e2", w: 1080, h: 1920, dur: "0:57"
  },

  // ---- Nonprofit & Events ----
  {
    id: "sojourners-denise",
    category: "nonprofit",
    client: "Sojourners",
    title: "Testimonial Reel — Denise Williams",
    blurb: "Personal-story testimonial cut for a nonprofit fundraising campaign.",
    orientation: "portrait", accent: "#e2085c", w: 1080, h: 1920, dur: "0:54"
  },
  {
    id: "childrens-harbor-reel1",
    category: "nonprofit",
    client: "Children's Harbor",
    title: "Harbor Classic — Event Reel",
    blurb: "Golf-classic fundraiser highlight reel.",
    orientation: "portrait", accent: "#2d9ebd", w: 1080, h: 1920, dur: "1:03"
  },
  {
    id: "cch-golf-reel1",
    category: "nonprofit",
    client: "Clinics Can Help",
    title: "Golf Tournament — Reel 1",
    blurb: "4K event coverage cut down into a shareable highlight.",
    orientation: "portrait", accent: "#cd931d", w: 1080, h: 1920, dur: "0:35"
  },
  {
    id: "literacy-coalition-recap",
    category: "nonprofit",
    client: "Literacy Coalition",
    title: "Author Talk Series — Recap",
    blurb: "Event recap for a nonprofit speaker series.",
    orientation: "portrait", accent: "#3544b6", w: 720, h: 1280, dur: "1:00"
  },
  {
    id: "od2a-webinar-titles",
    category: "nonprofit",
    client: "OD2A Webinar Series",
    title: "Webinar Title System",
    blurb: "Per-organisation intro and lower-third package for a three-part public-health webinar series.",
    orientation: "landscape", accent: "#56ccfb", w: 1280, h: 720, dur: "1:02"
  },

  // ---- Interviews ----
  {
    id: "patricia-heaton",
    category: "interviews",
    client: "ITE Gala",
    title: "Patricia Heaton — Interview",
    blurb: "Red-carpet-style interview coverage from a gala event.",
    orientation: "landscape", accent: "#0672e5", w: 1920, h: 1080, dur: "0:25"
  },
  {
    id: "ite-gala-interview1",
    category: "interviews",
    client: "ITE Gala",
    title: "Guest Interview",
    blurb: "4K multi-cam interview coverage from a nonprofit gala.",
    orientation: "landscape", accent: "#e53406", w: 1920, h: 1080, dur: "1:12"
  },

  // ---- Motion Graphics & Animation ----
  {
    id: "insight-logo-animation",
    category: "motion",
    client: "Insight",
    title: "Logo Animation",
    blurb: "Custom brand logo reveal animation.",
    orientation: "landscape", accent: "#56fbe8", w: 1920, h: 1080, dur: "0:05"
  },
  {
    id: "khs-logo-intro",
    category: "motion",
    client: "Khanna House Studios",
    title: "Studio Logo Bumper",
    blurb: "Motion logo bumper used to open his own studio's work.",
    orientation: "landscape", accent: "#b63535", w: 1920, h: 1080, dur: "0:01"
  },
  {
    id: "polo-recap-ae",
    category: "motion",
    client: "Polo Media Day",
    title: "Recap Graphic",
    blurb: "After Effects motion graphic built for an event recap sequence.",
    orientation: "landscape", accent: "#b68b35", w: 1920, h: 1080, dur: "0:02"
  },
  {
    id: "wellness-lower-third",
    hide: true,  // weak on its own — kept on disk, hidden from the site
    category: "motion",
    client: "365 Wellness",
    title: "Lower Third — Consulting",
    blurb: "Animated lower-third graphic package for a medical explainer series.",
    orientation: "landscape", accent: "#1af928", w: 1920, h: 1080, dur: "0:12"
  },
  {
    id: "jacob-gonzales-sting",
    category: "motion",
    client: "Self-Directed",
    title: "Jacob Gonzales — Logo Sting",
    blurb: "My own ident: SMPTE bars rise, fold into one line and the 3D wordmark flips up off it. Built and animated in Blender.",
    orientation: "landscape", accent: "#00C2D1", w: 1920, h: 1080, dur: "0:03"
  },
  {
    id: "cryptorubik-orb",
    category: "motion",
    client: "Self-Directed",
    title: "Cryptorubik — Orb",
    blurb: "Spec concept spot: iridescent 3D orb, glitch transitions, and an animated brand mark.",
    orientation: "landscape", accent: "#2a06e9", w: 720, h: 720, dur: "0:08"
  },
  {
    id: "cryptorubik-spot",
    category: "motion",
    client: "Self-Directed",
    title: "Cryptorubik — Concept Spot",
    blurb: "Spec piece built around a Y2K interface pastiche, halftone selector and live price counter.",
    orientation: "landscape", accent: "#f8a947", w: 720, h: 720, dur: "0:10"
  },
  {
    id: "cryptorubik-market",
    category: "motion",
    client: "Self-Directed",
    title: "Cryptorubik — Market",
    blurb: "Spec animated market chart built on a curved CRT with scanlines and bloom.",
    orientation: "landscape", accent: "#e4167c", w: 704, h: 688, dur: "0:06"
  },
  {
    id: "vaporwave-collage",
    category: "motion",
    client: "Self-Directed",
    title: "Vaporwave Collage",
    blurb: "Spec piece mixing 3D objects and cut-out collage over scanline plates.",
    orientation: "landscape", accent: "#b006e4", w: 720, h: 720, dur: "0:08"
  },
  {
    id: "cryptorubik-cube",
    category: "motion",
    client: "Self-Directed",
    title: "Cryptorubik — Cube",
    blurb: "Spec 3D piece modelled and animated in Blender, finished in After Effects.",
    orientation: "portrait", accent: "#e56006", w: 720, h: 1280, dur: "0:06"
  },

  // ---- Branded Social ----
  {
    id: "dr-ann-1",
    category: "social",
    client: "Dr. Ann",
    title: "Social Short",
    blurb: "Vertical branded short with motion captions.",
    orientation: "portrait", accent: "#e53b06", w: 1080, h: 1920, dur: "0:16"
  },
  {
    id: "dr-ann-2",
    category: "social",
    client: "Dr. Ann",
    title: "Social Short II",
    blurb: "Vertical branded short, alternate cut.",
    orientation: "portrait", accent: "#06e5be", w: 1080, h: 1920, dur: "0:16"
  },
  {
    id: "wellness-reel2",
    category: "social",
    client: "365 Wellness",
    title: "Branded Reel",
    blurb: "Vertical social reel for a medical wellness brand.",
    orientation: "portrait", accent: "#56cffb", w: 720, h: 1280, dur: "1:07"
  },
  {
    id: "vertical-caption-reel",
    category: "social",
    client: "Private Client",
    title: "Vertical Reel — Animated Captions",
    blurb: "Hook-first vertical cut with word-by-word animated captions, from a fourteen-reel run.",
    orientation: "portrait", accent: "#f2d25e", w: 720, h: 1280, dur: "0:55"
  },

  // ==== Product reels for my own product line (The Unordinary Depot, 3D-printed train horns) ====
  // Own brand, not a client: listed in NOT_CLIENTS in script.js so it stays out of the credits.
  {
    id: "depot-reel-t1",
    category: "social",
    client: "The Unordinary Depot",
    title: "T1 Train Horn — Product Reel",
    blurb: "My own product line. Launch reel for a 3D-printed train horn: real blast in sync, product photos, price card.",
    role: "Edit, motion graphics, product photos",
    year: "2026",
    orientation: "portrait", accent: "#c2301f", w: 720, h: 1280, dur: "0:19"
  },
  {
    id: "depot-reel-bells",
    category: "social",
    client: "The Unordinary Depot",
    title: "Bells 1, 2, 3 — Product Reel",
    blurb: "My own product line. Three horn bells side by side: 3D renders from the CAD files, each over its own recording.",
    role: "Edit, motion graphics, 3D renders",
    year: "2026",
    orientation: "portrait", accent: "#c2301f", w: 720, h: 1280, dur: "0:19"
  },
  {
    id: "depot-reel-brand",
    category: "social",
    client: "The Unordinary Depot",
    title: "Printed in Lake Worth — Brand Reel",
    blurb: "My own product line. Brand reel: product photos and a 3D render cut to real blasts.",
    role: "Edit, motion graphics, product photos",
    year: "2026",
    orientation: "portrait", accent: "#c2301f", w: 720, h: 1280, dur: "0:20"
  },

  // ==== Additional catalog (full drive scan) ====
{
    id: "nrg-ep1-hazel",
    category: "podcast",
    client: "NRG Podcast",
    title: "Episode 1 (Hazel) — Reel Cut",
    blurb: "Highlight reel cut from the Hazel episode.",
    orientation: "portrait", accent: "#fbfb56", w: 1080, h: 1920, dur: "0:42"
  },
  {
    id: "nrg-ep2-mike",
    category: "podcast",
    client: "NRG Podcast",
    title: "Episode 2 (Mike) — Reel Cut",
    blurb: "Highlight reel cut from the Mike episode.",
    orientation: "portrait", accent: "#e59506", w: 1080, h: 1920, dur: "0:43"
  },
  {
    id: "nrg-ep4-mathilde",
    category: "podcast",
    client: "NRG Podcast",
    title: "Episode 4 (Mathilde) — Reel Cut",
    blurb: "Highlight reel cut from the Mathilde episode.",
    orientation: "portrait", accent: "#cf721c", w: 1080, h: 1920, dur: "0:52"
  },
  {
    id: "nrg-ep5-scott",
    category: "podcast",
    client: "NRG Podcast",
    title: "Episode 5 (Scott) — Reel Cut",
    blurb: "Highlight reel cut from the Scott episode.",
    orientation: "portrait", accent: "#cb6720", w: 1080, h: 1920, dur: "0:58"
  },
  {
    id: "nrg-ep6-tony",
    category: "podcast",
    client: "NRG Podcast",
    title: "Episode 6 (Tony) — Reel Cut",
    blurb: "Highlight reel cut from the Tony episode.",
    orientation: "portrait", accent: "#fbfb56", w: 1080, h: 1920, dur: "0:51"
  },
  {
    id: "nrg-ep7-b",
    category: "podcast",
    client: "NRG Podcast",
    title: "Episode 7 — Reel Cut II",
    blurb: "A second highlight pulled from the same episode.",
    orientation: "portrait", accent: "#d26c19", w: 1080, h: 1920, dur: "0:36"
  },
  {
    id: "nrg-ep8-b",
    category: "podcast",
    client: "NRG Podcast",
    title: "Episode 8 — Reel Cut II",
    blurb: "A second highlight pulled from the same episode.",
    orientation: "portrait", accent: "#bf6d2b", w: 1080, h: 1920, dur: "0:37"
  },
  {
    id: "nrg-ep9-b",
    category: "podcast",
    client: "NRG Podcast",
    title: "Episode 9 — Reel Cut II",
    blurb: "A second highlight pulled from the same episode.",
    orientation: "portrait", accent: "#dd520e", w: 1080, h: 1920, dur: "0:37"
  },
  {
    id: "nrg-ep10-b",
    category: "podcast",
    client: "NRG Podcast",
    title: "Episode 10 — Reel Cut II",
    blurb: "A second highlight pulled from the same episode.",
    orientation: "portrait", accent: "#dd670e", w: 1080, h: 1920, dur: "1:06"
  },
  {
    id: "nrg-ep11-b",
    category: "podcast",
    client: "NRG Podcast",
    title: "Episode 11 — Reel Cut II",
    blurb: "A second highlight pulled from the same episode.",
    orientation: "portrait", accent: "#b64f35", w: 1080, h: 1920, dur: "0:28"
  },
  {
    id: "cwk-solo-1",
    category: "podcast",
    client: "Coffee with Kelly",
    title: "Solo — You Cannot Grow and Stay Comfortable",
    blurb: "Solo-format episode segment cut for social.",
    orientation: "portrait", accent: "#d0775b", w: 1080, h: 1920, dur: "0:29"
  },
  {
    id: "cwk-solo-2",
    category: "podcast",
    client: "Coffee with Kelly",
    title: "Solo — Courage Shows Up After You Act",
    blurb: "Solo-format episode segment cut for social.",
    orientation: "portrait", accent: "#ce7558", w: 1080, h: 1920, dur: "0:48"
  },
  {
    id: "cwk-solo-3",
    category: "podcast",
    client: "Coffee with Kelly",
    title: "Solo — AI Isn't Your Biggest Problem",
    blurb: "Solo-format episode segment cut for social.",
    orientation: "portrait", accent: "#d44a17", w: 1080, h: 1920, dur: "1:04"
  },
  {
    id: "cwk-debbie-1",
    category: "podcast",
    client: "Coffee with Kelly",
    title: "Guest Episode — Debbie, Clip 1",
    blurb: "Guest-episode highlight cut for social.",
    orientation: "portrait", accent: "#fbc756", w: 1080, h: 1920, dur: "0:54"
  },
  {
    id: "cwk-debbie-2",
    category: "podcast",
    client: "Coffee with Kelly",
    title: "Guest Episode — Debbie, Clip 2",
    blurb: "Guest-episode highlight cut for social.",
    orientation: "portrait", accent: "#fbfb56", w: 1080, h: 1920, dur: "0:33"
  },
  {
    id: "cwk-debbie-3",
    category: "podcast",
    client: "Coffee with Kelly",
    title: "Guest Episode — Debbie, Clip 3",
    blurb: "Guest-episode highlight cut for social.",
    orientation: "portrait", accent: "#dc4e0e", w: 1080, h: 1920, dur: "0:45"
  },
  {
    id: "cwk-ep1-5-a",
    category: "podcast",
    client: "Coffee with Kelly",
    title: "Episode 1.5 — Reel 1",
    blurb: "Episode highlight reel cut for social.",
    orientation: "portrait", accent: "#d07e5d", w: 1080, h: 1920, dur: "0:42"
  },
  {
    id: "cwk-ep1-5-b",
    category: "podcast",
    client: "Coffee with Kelly",
    title: "Episode 1.5 — Reel 2",
    blurb: "Episode highlight reel cut for social.",
    orientation: "portrait", accent: "#fbfb56", w: 1080, h: 1920, dur: "0:37"
  },
  {
    id: "cwk-ep2-a",
    category: "podcast",
    client: "Coffee with Kelly",
    title: "Episode 2 — Reel 1",
    blurb: "Episode highlight reel cut for social.",
    orientation: "portrait", accent: "#e50680", w: 1080, h: 1920, dur: "0:52"
  },
  {
    id: "cwk-ep2-b",
    category: "podcast",
    client: "Coffee with Kelly",
    title: "Episode 2 — Reel 2",
    blurb: "Episode highlight reel cut for social.",
    orientation: "portrait", accent: "#e50681", w: 1080, h: 1920, dur: "0:52"
  },
  {
    id: "cwk-ep3-a",
    category: "podcast",
    client: "Coffee with Kelly",
    title: "Episode 3 — Reel 1",
    blurb: "Episode highlight reel cut for social.",
    orientation: "portrait", accent: "#b66335", w: 1080, h: 1920, dur: "0:36"
  },
  {
    id: "cwk-ep3-b",
    category: "podcast",
    client: "Coffee with Kelly",
    title: "Episode 3 — Reel 2",
    blurb: "Episode highlight reel cut for social.",
    orientation: "portrait", accent: "#b65f35", w: 1080, h: 1920, dur: "0:52"
  },
  {
    id: "cwk-ep5-a",
    category: "podcast",
    client: "Coffee with Kelly",
    title: "Episode 5 — Reel 1",
    blurb: "Episode highlight reel cut for social.",
    orientation: "portrait", accent: "#d88679", w: 1080, h: 1920, dur: "0:54"
  },
  {
    id: "cwk-ep5-b",
    category: "podcast",
    client: "Coffee with Kelly",
    title: "Episode 5 — Reel 2",
    blurb: "Episode highlight reel cut for social.",
    orientation: "portrait", accent: "#eb6568", w: 1080, h: 1920, dur: "0:51"
  },
  {
    id: "cwk-ep6-a",
    category: "podcast",
    client: "Coffee with Kelly",
    title: "Episode 6 — Clip 1",
    blurb: "Episode highlight reel cut for social.",
    orientation: "portrait", accent: "#e50682", w: 1080, h: 1920, dur: "0:42"
  },
  {
    id: "cwk-ep6-b",
    category: "podcast",
    client: "Coffee with Kelly",
    title: "Episode 6 — Clip 2",
    blurb: "Episode highlight reel cut for social.",
    orientation: "portrait", accent: "#fb56fb", w: 1080, h: 1920, dur: "0:37"
  },
  {
    id: "cwk-ep6-c",
    category: "podcast",
    client: "Coffee with Kelly",
    title: "Episode 6 — Clip 3",
    blurb: "Episode highlight reel cut for social.",
    orientation: "portrait", accent: "#3e06e5", w: 1080, h: 1920, dur: "0:40"
  },
  {
    id: "cwk-promo",
    category: "podcast",
    client: "Coffee with Kelly",
    title: "Show Promo Teaser",
    blurb: "Teaser cut used to promote the show.",
    orientation: "portrait", accent: "#ba5c30", w: 1080, h: 1920, dur: "0:24"
  },
  {
    id: "eqb2b-ep2-b",
    category: "podcast",
    client: "EQB2B",
    title: "Episode 2 — Reel Cut II",
    blurb: "Branded podcast highlight reel with logo treatment.",
    orientation: "portrait", accent: "#c96246", w: 1080, h: 1920, dur: "0:53"
  },
  {
    id: "eqb2b-ep2-c",
    category: "podcast",
    client: "EQB2B",
    title: "Episode 2 — Reel Cut III",
    blurb: "Branded podcast highlight reel with logo treatment.",
    orientation: "portrait", accent: "#d4876c", w: 1080, h: 1920, dur: "0:53"
  },
  {
    id: "eqb2b-ep3-a",
    category: "podcast",
    client: "EQB2B",
    title: "Episode 3 — Clip 1",
    blurb: "Podcast episode highlight cut for social.",
    orientation: "portrait", accent: "#b84e33", w: 1080, h: 1920, dur: "0:53"
  },
  {
    id: "eqb2b-ep3-b",
    category: "podcast",
    client: "EQB2B",
    title: "Episode 3 — Clip 2",
    blurb: "Podcast episode highlight cut for social.",
    orientation: "portrait", accent: "#ce6d1c", w: 1080, h: 1920, dur: "0:38"
  },
  {
    id: "eqb2b-ep4-a",
    category: "podcast",
    client: "EQB2B",
    title: "Episode 4 — Clip 1",
    blurb: "Podcast episode highlight cut for social.",
    orientation: "portrait", accent: "#2642c5", w: 1080, h: 1920, dur: "0:42"
  },
  {
    id: "eqb2b-ep4-b",
    category: "podcast",
    client: "EQB2B",
    title: "Episode 4 — Clip 2",
    blurb: "Podcast episode highlight cut for social.",
    orientation: "portrait", accent: "#bf5838", w: 1080, h: 1920, dur: "0:43"
  },
  {
    id: "wjm-sep25",
    category: "podcast",
    client: "We Just Met",
    title: "Sep 25th Episode — Reel",
    blurb: "Dating-show episode highlight, cut for pacing and punchlines.",
    orientation: "portrait", accent: "#b64b35", w: 1080, h: 1920, dur: "0:31"
  },
  {
    id: "wjm-jan14",
    category: "podcast",
    client: "We Just Met",
    title: "Jan 14th Episode — Reel",
    blurb: "Dating-show episode highlight, cut for pacing and punchlines.",
    orientation: "portrait", accent: "#d52415", w: 1080, h: 1920, dur: "1:25"
  },
  {
    id: "mm-29-1",
    category: "podcast",
    client: "Mental Millennials",
    title: "Episode 29 — Clip 1",
    blurb: "Podcast episode highlight cut for social.",
    orientation: "portrait", accent: "#e50675", w: 1080, h: 1920, dur: "0:41"
  },
  {
    id: "mm-29-2",
    category: "podcast",
    client: "Mental Millennials",
    title: "Episode 29 — Clip 2",
    blurb: "Podcast episode highlight cut for social.",
    orientation: "portrait", accent: "#b66335", w: 1080, h: 1920, dur: "0:20"
  },
  {
    id: "mm-28-1",
    category: "podcast",
    client: "Mental Millennials",
    title: "Episode 28 — Clip 1",
    blurb: "Podcast episode highlight cut for social.",
    orientation: "portrait", accent: "#b66435", w: 1080, h: 1920, dur: "0:47"
  },
  {
    id: "mm-28-2",
    category: "podcast",
    client: "Mental Millennials",
    title: "Episode 28 — Clip 2",
    blurb: "Podcast episode highlight cut for social.",
    orientation: "portrait", accent: "#b65f35", w: 1080, h: 1920, dur: "0:45"
  },
  {
    id: "mark-shoot-reel",
    category: "podcast",
    client: "Mark",
    title: "Interview Reel",
    blurb: "Interview-format highlight reel cut for social.",
    orientation: "portrait", accent: "#e5062a", w: 1080, h: 1920, dur: "0:26"
  },
  {
    id: "ceod-relationships",
    category: "corporate",
    client: "CEO Discovery",
    title: "Building Relationships Before They're Needed",
    blurb: "Corporate explainer piece for a private-equity talent platform.",
    orientation: "landscape", accent: "#d98b77", w: 1920, h: 1080, dur: "0:44"
  },
  {
    id: "ceod-value-prop",
    category: "corporate",
    client: "CEO Discovery",
    title: "Value Proposition of CEOD",
    blurb: "Corporate explainer piece for a private-equity talent platform.",
    orientation: "landscape", accent: "#e6886b", w: 1920, h: 1080, dur: "0:54"
  },
  {
    id: "phelps-reel-1",
    category: "corporate",
    client: "Phelps Media Group",
    title: "Equestrian PR — Reel 1",
    blurb: "PR/brand reel for an equestrian media agency.",
    orientation: "portrait", accent: "#d16d19", w: 1080, h: 1920, dur: "0:47"
  },
  {
    id: "phelps-reel-2",
    category: "corporate",
    client: "Phelps Media Group",
    title: "Equestrian PR — Reel 2",
    blurb: "PR/brand reel for an equestrian media agency.",
    orientation: "portrait", accent: "#b66c35", w: 1080, h: 1920, dur: "0:40"
  },
  {
    id: "phelps-reel-3",
    category: "corporate",
    client: "Phelps Media Group",
    title: "Equestrian PR — Reel 3",
    blurb: "PR/brand reel for an equestrian media agency.",
    orientation: "portrait", accent: "#d57816", w: 1080, h: 1920, dur: "0:48"
  },
  {
    id: "sparked-rethink",
    category: "corporate",
    client: "Sparked",
    title: "Campaign Spot — Rethink Fund",
    blurb: "30-second branded campaign spot.",
    orientation: "landscape", accent: "#da9777", w: 1920, h: 1080, dur: "0:34"
  },
  {
    id: "sparked-how-it-works",
    category: "corporate",
    client: "Sparked",
    title: "Campaign Spot — How It Works",
    blurb: "30-second branded campaign spot.",
    orientation: "landscape", accent: "#3be199", w: 1920, h: 1080, dur: "0:46"
  },
  {
    id: "sparked-thank-you",
    category: "corporate",
    client: "Sparked",
    title: "Campaign Spot — Thank You",
    blurb: "30-second branded campaign spot.",
    orientation: "landscape", accent: "#d89879", w: 1920, h: 1080, dur: "0:45"
  },
  {
    id: "sparked-school-leaders",
    category: "corporate",
    client: "Sparked",
    title: "Campaign Spot — School Leaders",
    blurb: "60-second branded campaign spot.",
    orientation: "landscape", accent: "#bb5930", w: 1920, h: 1080, dur: "1:07"
  },
  {
    id: "wybt-promo",
    category: "corporate",
    client: "WYBT",
    title: "Program Promo",
    blurb: "35-second promo cut for a wellness program.",
    orientation: "landscape", accent: "#e53c06", w: 1920, h: 1080, dur: "0:35"
  },
  {
    id: "sparked-logo",
    category: "motion",
    client: "Sparked",
    title: "Logo Animation",
    blurb: "Custom brand logo reveal animation.",
    orientation: "landscape", accent: "#c4b827", w: 1920, h: 1080, dur: "0:04"
  },
  {
    id: "csc-intro",
    category: "motion",
    client: "Children's Services Council",
    title: "Show Intro Package",
    blurb: "Animated title sequence for an episodic series.",
    orientation: "landscape", accent: "#d8a179", w: 1920, h: 1080, dur: "0:07"
  },
  {
    id: "tht-card-animation",
    category: "motion",
    client: "Travel Hacker Teddy",
    title: "Card Reveal Animation",
    blurb: "Custom motion graphic built for a social reel.",
    orientation: "portrait", accent: "#062ae5", w: 1080, h: 1920, dur: "0:08"
  },
  {
    id: "sojourners-gail",
    category: "nonprofit",
    client: "Sojourners",
    title: "Testimonial Reel — Gail Forrester",
    blurb: "Personal-story testimonial cut for a nonprofit fundraising campaign.",
    orientation: "portrait", accent: "#e50661", w: 1080, h: 1920, dur: "1:12"
  },
  {
    id: "sojourners-katrina",
    category: "nonprofit",
    client: "Sojourners",
    title: "Testimonial Reel — Katrina Long Robinson",
    blurb: "Personal-story testimonial cut for a nonprofit fundraising campaign.",
    orientation: "portrait", accent: "#de590d", w: 1080, h: 1920, dur: "0:46"
  },
  {
    id: "sojourners-myiah",
    category: "nonprofit",
    client: "Sojourners",
    title: "Testimonial Reel — Myiah White",
    blurb: "Personal-story testimonial cut for a nonprofit fundraising campaign.",
    orientation: "portrait", accent: "#e5065d", w: 1080, h: 1920, dur: "0:35"
  },
  {
    id: "sojourners-sheila",
    category: "nonprofit",
    client: "Sojourners",
    title: "Testimonial Reel — Sheila Palacios",
    blurb: "Personal-story testimonial cut for a nonprofit fundraising campaign.",
    orientation: "portrait", accent: "#e53906", w: 1080, h: 1920, dur: "0:53"
  },
  {
    id: "sojourners-linda",
    category: "nonprofit",
    client: "Sojourners",
    title: "Testimonial Reel — Linda Long",
    blurb: "Personal-story testimonial cut for a nonprofit fundraising campaign.",
    orientation: "portrait", accent: "#b66535", w: 1080, h: 1920, dur: "1:42"
  },
  {
    id: "sojourners-onething",
    category: "nonprofit",
    client: "Sojourners",
    title: "Testimonial Reel — One Thing",
    blurb: "Personal-story testimonial cut for a nonprofit fundraising campaign.",
    orientation: "portrait", accent: "#fb56bc", w: 720, h: 1280, dur: "2:09"
  },
  {
    id: "childrens-harbor-reel2",
    category: "nonprofit",
    client: "Children's Harbor",
    title: "Harbor Classic — Event Reel 2",
    blurb: "Golf-classic fundraiser highlight reel.",
    orientation: "portrait", accent: "#9379d8", w: 1080, h: 1920, dur: "1:43"
  },
  {
    id: "literacy-kravis-luncheon",
    category: "nonprofit",
    client: "Literacy Coalition",
    title: "Kravis Luncheon Recap",
    blurb: "Event recap for a nonprofit fundraising luncheon.",
    orientation: "landscape", accent: "#4b29c1", w: 1920, h: 1080, dur: "1:27"
  },
  {
    id: "tithing-tree-reel1",
    category: "nonprofit",
    client: "Tithing Tree",
    title: "Reel — Future In Our Hands",
    blurb: "Nonprofit fundraising campaign reel.",
    orientation: "portrait", accent: "#d68473", w: 1080, h: 1920, dur: "0:22"
  },
  {
    id: "tithing-tree-reel2",
    category: "nonprofit",
    client: "Tithing Tree",
    title: "Reel — Rediscovering Our Power",
    blurb: "Nonprofit fundraising campaign reel.",
    orientation: "portrait", accent: "#ebcc1e", w: 1080, h: 1920, dur: "0:33"
  },
  {
    id: "promisefund-event",
    category: "nonprofit",
    client: "Promisefund",
    title: "Gala — Event Video",
    blurb: "Compiled highlight video from a nonprofit gala.",
    orientation: "landscape", accent: "#e506d7", w: 1920, h: 1080, dur: "1:01"
  },
  {
    id: "promisefund-c433",
    category: "nonprofit",
    client: "Promisefund",
    title: "Gala — Moment 1",
    blurb: "Event-coverage moment from a nonprofit gala.",
    orientation: "landscape", accent: "#6b5ff1", w: 1920, h: 1080, dur: "0:13"
  },
  {
    id: "promisefund-c437",
    category: "nonprofit",
    client: "Promisefund",
    title: "Gala — Moment 2",
    blurb: "Event-coverage moment from a nonprofit gala.",
    orientation: "landscape", accent: "#a8fb56", w: 1920, h: 1080, dur: "0:18"
  },
  {
    id: "cch-crib-donation",
    category: "nonprofit",
    client: "Clinics Can Help",
    title: "Crib Donation Event",
    blurb: "Nonprofit event-coverage video.",
    orientation: "landscape", accent: "#5668fb", w: 1920, h: 1080, dur: "1:25"
  },
  {
    id: "cch-hot-day-crib",
    category: "nonprofit",
    client: "Clinics Can Help",
    title: "Hot Day Crib Drive",
    blurb: "Nonprofit event-coverage video.",
    orientation: "landscape", accent: "#fbfb56", w: 1280, h: 720, dur: "0:56"
  },
  {
    id: "sixtysecs-teresa",
    category: "nonprofit",
    client: "60 Seconds",
    title: "Testimonial — Teresa Bairos",
    blurb: "Short-form testimonial interview.",
    orientation: "portrait", accent: "#ed5977", w: 1080, h: 1920, dur: "0:24"
  },
  {
    id: "sixtysecs-kayla",
    category: "nonprofit",
    client: "60 Seconds",
    title: "Testimonial — Kayla Irby",
    blurb: "Short-form testimonial interview.",
    orientation: "portrait", accent: "#fbfb56", w: 1080, h: 1920, dur: "0:28"
  },
  {
    id: "sixtysecs-suzanne",
    category: "nonprofit",
    client: "60 Seconds",
    title: "Testimonial — Suzanne Spencer, Ed.D.",
    blurb: "Short-form testimonial interview.",
    orientation: "portrait", accent: "#d88779", w: 1080, h: 1920, dur: "0:29"
  },
  {
    id: "sixtysecs-samiyah",
    category: "nonprofit",
    client: "60 Seconds",
    title: "Testimonial — Samiyah",
    blurb: "Short-form testimonial interview.",
    orientation: "portrait", accent: "#e30726", w: 1080, h: 1920, dur: "0:30"
  },
  {
    id: "sixtysecs-lara",
    category: "nonprofit",
    client: "60 Seconds",
    title: "Testimonial — Lara Pinheiro",
    blurb: "Short-form testimonial interview.",
    orientation: "portrait", accent: "#c64925", w: 1080, h: 1920, dur: "0:30"
  },
  {
    id: "hona-recap",
    category: "nonprofit",
    client: "HONA",
    title: "Event Recap Reel",
    blurb: "Nonprofit event-coverage highlight reel.",
    orientation: "portrait", accent: "#e56706", w: 1080, h: 1920, dur: "0:36"
  },
  {
    id: "people-of-purpose-recap",
    category: "nonprofit",
    client: "People of Purpose",
    title: "Walk In My Shoes — Event Recap",
    blurb: "Nonprofit fundraising-event recap video.",
    orientation: "landscape", accent: "#e1220a", w: 1920, h: 1080, dur: "1:46"
  },
  {
    id: "gift-gathering-recap",
    category: "nonprofit",
    client: "Gift Gathering 2025",
    title: "Event Recap",
    blurb: "Nonprofit event-coverage recap video.",
    orientation: "landscape", accent: "#e54006", w: 1920, h: 1080, dur: "1:15"
  },
  {
    id: "ite-gala-interview2",
    category: "interviews",
    client: "ITE Gala",
    title: "Guest Interview II",
    blurb: "4K multi-cam interview coverage from a nonprofit gala.",
    orientation: "landscape", accent: "#e5ce06", w: 1920, h: 1080, dur: "0:28"
  },
  {
    id: "ite-gala-interview3",
    category: "interviews",
    client: "ITE Gala",
    title: "Guest Interview III",
    blurb: "4K multi-cam interview coverage from a nonprofit gala.",
    orientation: "landscape", accent: "#d0e506", w: 1920, h: 1080, dur: "0:45"
  },
  {
    id: "adrian-rmante",
    category: "interviews",
    client: "Adrian R'Mante",
    title: "Podcast Interview",
    blurb: "Interview segment cut for social.",
    orientation: "portrait", accent: "#db620f", w: 1080, h: 1920, dur: "5:09"
  },
  {
    id: "dr-ann-3-intro1",
    category: "social",
    client: "Dr. Ann",
    title: "Intro Series — Part 1",
    blurb: "Vertical branded intro segment.",
    orientation: "portrait", accent: "#d98777", w: 1080, h: 1920, dur: "0:07"
  },
  {
    id: "dr-ann-3-intro2",
    category: "social",
    client: "Dr. Ann",
    title: "Intro Series — Part 2",
    blurb: "Vertical branded intro segment.",
    orientation: "portrait", accent: "#f5785c", w: 1080, h: 1920, dur: "0:04"
  },
  {
    id: "dr-ann-2-clip1",
    category: "social",
    client: "Dr. Ann",
    title: "Social Short III",
    blurb: "Vertical branded short with motion captions.",
    orientation: "portrait", accent: "#d88779", w: 1080, h: 1920, dur: "0:19"
  },
  {
    id: "dr-ann-2-clip2",
    category: "social",
    client: "Dr. Ann",
    title: "Social Short IV",
    blurb: "Vertical branded short with motion captions.",
    orientation: "portrait", accent: "#d88f79", w: 1080, h: 1920, dur: "0:15"
  },
  {
    id: "dr-ann-greyshirt",
    category: "social",
    client: "Dr. Ann",
    title: "Social Short V",
    blurb: "Vertical branded short with motion captions.",
    orientation: "portrait", accent: "#d88b78", w: 1080, h: 1920, dur: "0:39"
  },
  {
    id: "dr-shaw-2",
    category: "social",
    client: "Dr. Shaw",
    title: "Show Reel II",
    blurb: "Interview-style talk segment cut for social.",
    orientation: "portrait", accent: "#5691fb", w: 1080, h: 1920, dur: "0:38"
  },
  {
    id: "dr-shaw-3",
    category: "social",
    client: "Dr. Shaw",
    title: "Show Reel III",
    blurb: "Interview-style talk segment cut for social.",
    orientation: "portrait", accent: "#5695fb", w: 1080, h: 1920, dur: "0:52"
  },
  {
    id: "dr-shaw-reels-4",
    category: "social",
    client: "Dr. Shaw",
    title: "Social Reel",
    blurb: "Vertical branded social reel.",
    orientation: "portrait", accent: "#d7777a", w: 1080, h: 1920, dur: "1:04"
  },
  {
    id: "dr-shaw-reels-6",
    category: "social",
    client: "Dr. Shaw",
    title: "Social Reel II",
    blurb: "Vertical branded social reel.",
    orientation: "portrait", accent: "#fb56fb", w: 1080, h: 1920, dur: "0:35"
  },
  {
    id: "wellness-reel3",
    category: "social",
    client: "365 Wellness",
    title: "Branded Reel II",
    blurb: "Vertical social reel for a medical wellness brand.",
    orientation: "portrait", accent: "#fb8d56", w: 1080, h: 1920, dur: "0:42"
  },
  {
    id: "wellness-walkin",
    category: "social",
    client: "365 Wellness",
    title: "Office Walkthrough",
    blurb: "Branded walkthrough video for a medical wellness brand.",
    orientation: "landscape", accent: "#1e4dcd", w: 1920, h: 1080, dur: "0:51"
  },
  {
    id: "elite-interview",
    category: "social",
    client: "Elite Oral Surgery",
    title: "Patient Interview",
    blurb: "Branded interview clip for a dental/medical practice.",
    orientation: "landscape", accent: "#799bd8", w: 1920, h: 1080, dur: "0:06"
  },
  {
    id: "elite-c0155",
    category: "social",
    client: "Elite Oral Surgery",
    title: "Practice Feature",
    blurb: "Branded feature clip for a dental/medical practice.",
    orientation: "landscape", accent: "#cb894d", w: 1920, h: 1080, dur: "0:07"
  },
  {
    id: "elite-broll-1",
    category: "social",
    client: "Elite Oral Surgery",
    title: "Office B-Roll",
    blurb: "Color-corrected office b-roll for a dental/medical practice.",
    orientation: "landscape", accent: "#b68435", w: 1920, h: 1080, dur: "0:01"
  },
  {
    id: "elite-room-broll",
    category: "social",
    client: "Elite Oral Surgery",
    title: "Room B-Roll",
    blurb: "Color-corrected office b-roll for a dental/medical practice.",
    orientation: "landscape", accent: "#cc8b50", w: 1920, h: 1080, dur: "0:07"
  },
  {
    id: "jenilee-reel1",
    category: "social",
    client: "Jenilee Lash",
    title: "Branded Reel",
    blurb: "Vertical branded social reel for a beauty business.",
    orientation: "portrait", accent: "#dc9274", w: 1080, h: 1920, dur: "0:51"
  },
  {
    id: "jenilee-reel2",
    category: "social",
    client: "Jenilee Lash",
    title: "Branded Reel II",
    blurb: "Vertical branded social reel for a beauty business.",
    orientation: "portrait", accent: "#d0795e", w: 1080, h: 1920, dur: "0:51"
  },


  // ==== Animation / motion graphics (round 3) ====
  {
    id: "ceod-logo",
    hide: true,  // weak on its own — kept on disk, hidden from the site
    category: "motion",
    client: "CEO Discovery",
    title: "Logo Animation",
    blurb: "Custom brand logo animation.",
    orientation: "portrait", accent: "#56fbfb", w: 1080, h: 1920, dur: "0:04"
  },
  {
    id: "csc-outro",
    category: "motion",
    client: "Children's Services Council",
    title: "Show Outro Package",
    blurb: "Animated outro graphic for an episodic series.",
    orientation: "landscape", accent: "#fb56ae", w: 1280, h: 720, dur: "0:09"
  },
  {
    id: "dk-intro",
    category: "motion",
    client: "Dwayne Kerrigan",
    title: "Podcast Intro Animation",
    blurb: "Animated title sequence for a podcast.",
    orientation: "landscape", accent: "#b63575", w: 1184, h: 688, dur: "0:36"
  },
  {
    id: "dk-outro",
    category: "motion",
    client: "Dwayne Kerrigan",
    title: "Podcast Outro Animation",
    blurb: "Animated outro graphic for a podcast.",
    orientation: "landscape", accent: "#e50675", w: 1184, h: 688, dur: "1:08"
  },
  {
    id: "eqb2b-ep3-intro",
    category: "motion",
    client: "EQB2B",
    title: "Episode 3 Intro Animation",
    blurb: "Animated episode-intro package for a podcast.",
    orientation: "landscape", accent: "#fbdf56", w: 1920, h: 1080, dur: "1:58"
  },
  {
    id: "eqb2b-comp",
    hide: true,  // weak on its own — kept on disk, hidden from the site
    category: "motion",
    client: "EQB2B",
    title: "Title Comp Render",
    blurb: "After Effects title-comp render for a podcast intro.",
    orientation: "landscape", accent: "#fbdf56", w: 1920, h: 1080, dur: "2:37"
  },
  {
    id: "khs-intro-loop",
    category: "motion",
    client: "Khanna House Studios",
    title: "Studio Intro Loop",
    blurb: "Motion intro loop for his own studio brand.",
    orientation: "landscape", accent: "#c74f3f", w: 1920, h: 1080, dur: "1:02"
  },
  {
    id: "insight-ite-intro",
    category: "motion",
    client: "Insight",
    title: "ITE Program Intro",
    blurb: "Animated title sequence for a nonprofit program.",
    orientation: "landscape", accent: "#b63535", w: 1280, h: 720, dur: "0:25"
  },
  {
    id: "ite-brand-intro-prerender",
    category: "motion",
    client: "inSIGHT Education",
    title: "Brand Intro Animation",
    blurb: "After Effects intro animation for a nonprofit brand.",
    orientation: "landscape", accent: "#d87979", w: 1280, h: 720, dur: "0:08"
  },
  {
    id: "polo-recap-ae-2",
    hide: true,  // weak on its own — kept on disk, hidden from the site
    category: "motion",
    client: "Polo Media Day",
    title: "Recap Graphic II",
    blurb: "After Effects motion graphic built for an event recap sequence.",
    orientation: "landscape", accent: "#b66a35", w: 1920, h: 1080, dur: "0:03"
  },
  {
    id: "rtdb-logo-intro",
    category: "motion",
    client: "RTDB",
    title: "Logo Intro Animation",
    blurb: "Animated logo intro for a podcast.",
    orientation: "landscape", accent: "#fb566f", w: 1280, h: 720, dur: "0:09"
  },
  {
    id: "sparked-notification",
    hide: true,  // weak on its own — kept on disk, hidden from the site
    category: "motion",
    client: "Sparked",
    title: "Notification Animation",
    blurb: "Short UI-notification motion graphic.",
    orientation: "landscape", accent: "#e606ac", w: 1920, h: 1080, dur: "0:02"
  },
  {
    id: "sparked-spark-mark",
    hide: true,  // weak on its own — kept on disk, hidden from the site
    category: "motion",
    client: "Sparked",
    title: "Spark Mark Animation",
    blurb: "Short animated brand mark.",
    orientation: "landscape", accent: "#0859e3", w: 1920, h: 1080, dur: "0:02"
  },
  {
    id: "sparked-logo-sting",
    category: "motion",
    client: "Sparked",
    title: "Logo Sting",
    blurb: "Short animated logo sting.",
    orientation: "landscape", accent: "#b63535", w: 1280, h: 720, dur: "0:04"
  },
  {
    id: "sparked-outro",
    category: "motion",
    client: "Sparked",
    title: "Campaign Outro",
    blurb: "Animated outro graphic for a branded campaign.",
    orientation: "landscape", accent: "#d89179", w: 1920, h: 1080, dur: "0:07"
  },
  {
    id: "nrg-intro",
    category: "motion",
    client: "NRG Podcast",
    title: "Podcast Intro Animation",
    blurb: "Animated title sequence for the podcast.",
    orientation: "landscape", accent: "#adb635", w: 1920, h: 1080, dur: "0:08"
  },
  {
    id: "tht-logo-intro",
    category: "motion",
    client: "Travel Hacker Teddy",
    title: "Logo Intro",
    blurb: "Animated logo intro.",
    orientation: "landscape", accent: "#56fbfb", w: 1280, h: 720, dur: "0:04"
  },
  {
    id: "tht-plane-intro",
    category: "motion",
    client: "Travel Hacker Teddy",
    title: "3D Plane Intro",
    blurb: "3D animated intro sequence.",
    orientation: "landscape", accent: "#1625d5", w: 1920, h: 1080, dur: "0:04"
  },
  {
    id: "tht-blue-intro",
    category: "motion",
    client: "Travel Hacker Teddy",
    title: "Brand Intro",
    blurb: "Animated brand intro sequence.",
    orientation: "landscape", accent: "#0b8bf5", w: 1920, h: 1080, dur: "0:04"
  },
  {
    id: "tht-card-animation-2",
    category: "motion",
    client: "Travel Hacker Teddy",
    title: "Card Reveal Animation II",
    blurb: "Custom motion graphic built for a social reel.",
    orientation: "portrait", accent: "#062ae5", w: 1080, h: 1920, dur: "0:08"
  },
  {
    id: "gygo-podcast-intro",
    category: "motion",
    client: "GYGO Podcast",
    title: "Podcast Intro Animation",
    blurb: "Animated title sequence for a podcast.",
    orientation: "landscape", accent: "#56fbe8", w: 1920, h: 1080, dur: "1:10"
  },
  {
    id: "wellness-lt-vitals",
    hide: true,  // weak on its own — kept on disk, hidden from the site
    category: "motion",
    client: "365 Wellness",
    title: "Lower Third — Vitals",
    blurb: "Animated lower-third graphic from a medical explainer series.",
    orientation: "landscape", accent: "#3535b6", w: 1920, h: 1080, dur: "0:06"
  },
  {
    id: "wellness-lt-xray",
    hide: true,  // weak on its own — kept on disk, hidden from the site
    category: "motion",
    client: "365 Wellness",
    title: "Lower Third — X-Ray",
    blurb: "Animated lower-third graphic from a medical explainer series.",
    orientation: "landscape", accent: "#0606e5", w: 1920, h: 1080, dur: "0:06"
  },
  {
    id: "wellness-lt-ecg",
    hide: true,  // weak on its own — kept on disk, hidden from the site
    category: "motion",
    client: "365 Wellness",
    title: "Lower Third — ECG",
    blurb: "Animated lower-third graphic from a medical explainer series.",
    orientation: "landscape", accent: "#0606e5", w: 1920, h: 1080, dur: "0:06"
  },
  {
    id: "wellness-lt-bloodwork",
    hide: true,  // weak on its own — kept on disk, hidden from the site
    category: "motion",
    client: "365 Wellness",
    title: "Lower Third — Bloodwork",
    blurb: "Animated lower-third graphic from a medical explainer series.",
    orientation: "landscape", accent: "#0606e5", w: 1920, h: 1080, dur: "0:06"
  },
  {
    id: "wellness-lt-physical",
    hide: true,  // weak on its own — kept on disk, hidden from the site
    category: "motion",
    client: "365 Wellness",
    title: "Lower Third — Physical Exam",
    blurb: "Animated lower-third graphic from a medical explainer series.",
    orientation: "landscape", accent: "#0606e5", w: 1920, h: 1080, dur: "0:06"
  },
  {
    id: "wellness-lt-text",
    category: "motion",
    client: "365 Wellness",
    title: "Lower Third — Title Card",
    blurb: "Animated lower-third title card graphic.",
    orientation: "landscape", accent: "#bc3636", w: 1164, h: 476, dur: "0:02"
  },
  {
    id: "wellness-walkin-outro",
    hide: true,  // weak on its own — kept on disk, hidden from the site
    category: "motion",
    client: "365 Wellness",
    title: "Walkthrough Outro",
    blurb: "Animated outro graphic for a medical explainer video.",
    orientation: "landscape", accent: "#0853e2", w: 1920, h: 1080, dur: "0:10"
  },

  // ==== Round 6: HONA awards package, Wellington Bay testimonials, virtual cards ====
  {
    id: "hona-open",
    category: "nonprofit",
    client: "HONA Awards",
    title: "Awards Show Open",
    blurb: "Title sequence opening a nonprofit awards ceremony.",
    orientation: "landscape", accent: "#087fe2", w: 1280, h: 720, dur: "4:47"
  },
  {
    id: "hona-generic",
    category: "nonprofit",
    client: "HONA Awards",
    title: "Ceremony Package",
    blurb: "Generic award segment built for the live ceremony.",
    orientation: "landscape", accent: "#087fe2", w: 1280, h: 720, dur: "4:47"
  },
  {
    id: "hona-sponsors",
    category: "nonprofit",
    client: "HONA Awards",
    title: "Sponsor Reel",
    blurb: "Sponsor recognition reel played during the ceremony.",
    orientation: "landscape", accent: "#2ca6fa", w: 1280, h: 720, dur: "2:44"
  },
  {
    id: "hona-lifetime",
    category: "nonprofit",
    client: "HONA Awards",
    title: "Lifetime Achievement — Nominees",
    blurb: "Nominee package for the Lifetime Achievement award.",
    orientation: "landscape", accent: "#2ca6fa", w: 1280, h: 720, dur: "1:48"
  },
  {
    id: "hona-community-hero",
    category: "nonprofit",
    client: "HONA Awards",
    title: "Community Hero — Nominees",
    blurb: "Nominee package for the Community Hero award.",
    orientation: "landscape", accent: "#2ba2fa", w: 1280, h: 720, dur: "1:49"
  },
  {
    id: "hona-executive",
    category: "nonprofit",
    client: "HONA Awards",
    title: "Executive of the Year — Nominees",
    blurb: "Nominee package for the Executive of the Year award.",
    orientation: "landscape", accent: "#2ba0fa", w: 1280, h: 720, dur: "2:05"
  },
  {
    id: "hona-mvp",
    category: "nonprofit",
    client: "HONA Awards",
    title: "MVP of the Year — Nominees",
    blurb: "Nominee package for the MVP of the Year award.",
    orientation: "landscape", accent: "#2da7fa", w: 1280, h: 720, dur: "2:04"
  },
  {
    id: "hona-professional",
    category: "nonprofit",
    client: "HONA Awards",
    title: "Professional of the Year — Nominees",
    blurb: "Nominee package for the Professional of the Year award.",
    orientation: "landscape", accent: "#2ba0fa", w: 1280, h: 720, dur: "1:54"
  },
  {
    id: "hona-volunteer",
    category: "nonprofit",
    client: "HONA Awards",
    title: "Volunteer of the Year — Nominees",
    blurb: "Nominee package for the Volunteer of the Year award.",
    orientation: "landscape", accent: "#2ba0fa", w: 1280, h: 720, dur: "2:04"
  },
  {
    id: "hona-education",
    category: "nonprofit",
    client: "HONA Awards",
    title: "Education Impact — Nominees",
    blurb: "Nominee package for the Education Impact award.",
    orientation: "landscape", accent: "#2da7fa", w: 1280, h: 720, dur: "2:21"
  },
  {
    id: "hona-innovation",
    category: "nonprofit",
    client: "HONA Awards",
    title: "Innovation — Nominees",
    blurb: "Nominee package for the Innovation award.",
    orientation: "landscape", accent: "#2ba0fa", w: 1280, h: 720, dur: "2:11"
  },
  {
    id: "hona-health",
    category: "nonprofit",
    client: "HONA Awards",
    title: "Health & Wellness Impact — Nominees",
    blurb: "Nominee package for the Health and Wellness Impact award.",
    orientation: "landscape", accent: "#2da7fa", w: 1280, h: 720, dur: "2:02"
  },
  {
    id: "hona-arts",
    category: "nonprofit",
    client: "HONA Awards",
    title: "Arts & Culture Impact — Nominees",
    blurb: "Nominee package for the Arts and Culture Impact award.",
    orientation: "landscape", accent: "#2da7fa", w: 1280, h: 720, dur: "2:03"
  },
  {
    id: "hona-environment",
    category: "nonprofit",
    client: "HONA Awards",
    title: "Environment & Animal Welfare — Nominees",
    blurb: "Nominee package for the Environment and Animal Welfare Impact award.",
    orientation: "landscape", accent: "#2ba2fa", w: 1280, h: 720, dur: "2:02"
  },
  {
    id: "hona-family",
    category: "nonprofit",
    client: "HONA Awards",
    title: "Family Services Impact — Nominees",
    blurb: "Nominee package for the Family Services Impact award.",
    orientation: "landscape", accent: "#2aa1fa", w: 1280, h: 720, dur: "2:04"
  },
  {
    id: "hona-collaborators",
    category: "nonprofit",
    client: "HONA Awards",
    title: "Community Collaborators — Nominees",
    blurb: "Nominee package for the Community Collaborators award.",
    orientation: "landscape", accent: "#2da7fa", w: 1280, h: 720, dur: "4:28"
  },
  {
    id: "wb-artie",
    category: "corporate",
    client: "Wellington Bay",
    title: "Testimonial — Artie Lynnworth",
    blurb: "Resident testimonial film for a senior living community.",
    orientation: "landscape", accent: "#ca5649", w: 1280, h: 720, dur: "2:46"
  },
  {
    id: "wb-carol",
    category: "corporate",
    client: "Wellington Bay",
    title: "Testimonial — Carol Phillips",
    blurb: "Resident testimonial film for a senior living community.",
    orientation: "landscape", accent: "#9635b6", w: 1280, h: 720, dur: "2:16"
  },
  {
    id: "wb-jan",
    category: "corporate",
    client: "Wellington Bay",
    title: "Testimonial — Jan Newlands",
    blurb: "Resident testimonial film for a senior living community.",
    orientation: "landscape", accent: "#d7b573", w: 1280, h: 720, dur: "1:52"
  },
  {
    id: "wb-jeff",
    category: "corporate",
    client: "Wellington Bay",
    title: "Testimonial — Jeff Sigman",
    blurb: "Resident testimonial film for a senior living community.",
    orientation: "landscape", accent: "#d78e75", w: 1280, h: 720, dur: "1:48"
  },
  {
    id: "wb-judie",
    category: "corporate",
    client: "Wellington Bay",
    title: "Testimonial — Judie Eieibold",
    blurb: "Resident testimonial film for a senior living community.",
    orientation: "landscape", accent: "#b6354a", w: 1280, h: 720, dur: "1:57"
  },
  {
    id: "wb-myra-david",
    category: "corporate",
    client: "Wellington Bay",
    title: "Testimonial — Myra & David",
    blurb: "Resident testimonial film for a senior living community.",
    orientation: "landscape", accent: "#b65d35", w: 1280, h: 720, dur: "2:34"
  },
  {
    id: "wb-rita",
    category: "corporate",
    client: "Wellington Bay",
    title: "Testimonial — Rita",
    blurb: "Resident testimonial film for a senior living community.",
    orientation: "landscape", accent: "#b66935", w: 1280, h: 720, dur: "2:15"
  },
  {
    id: "wb-tony",
    category: "corporate",
    client: "Wellington Bay",
    title: "Testimonial — Tony",
    blurb: "Resident testimonial film for a senior living community.",
    orientation: "landscape", accent: "#d16c62", w: 1280, h: 720, dur: "1:44"
  },
  {
    id: "khs-virtual-card",
    category: "corporate",
    client: "Khanna House Studios",
    title: "Virtual Business Card",
    blurb: "Digital business card format produced for his own studio.",
    orientation: "landscape", accent: "#e50606", w: 1280, h: 720, dur: "0:34"
  },
  {
    id: "virtual-card-demo",
    hide: true,  // weak on its own — kept on disk, hidden from the site
    category: "corporate",
    client: "Khanna House Studios",
    title: "Virtual Business Card — Demo",
    blurb: "Full-length demo of the digital business card product.",
    orientation: "landscape", accent: "#e53706", w: 1280, h: 720, dur: "0:34"
  },

  // ==== Round 7: H: PORTABLE1 — Uncoordinated, Super Fit Champs, Tennis with Ema, KHS ====
  {
    id: "uncoordinated-name-pronunciation-struggles",
    category: "podcast",
    client: "Uncoordinated",
    title: "Name Pronunciation Struggles",
    blurb: "Episode reel cut for social from a comedy/lifestyle podcast.",
    orientation: "portrait", accent: "#32b93b", w: 720, h: 1280, dur: "0:25"
  },
  {
    id: "uncoordinated-roller-coaster-experience",
    category: "podcast",
    client: "Uncoordinated",
    title: "Roller Coaster Experience",
    blurb: "Episode reel cut for social from a comedy/lifestyle podcast.",
    orientation: "portrait", accent: "#35b639", w: 720, h: 1280, dur: "0:24"
  },
  {
    id: "uncoordinated-first-skydive",
    category: "podcast",
    client: "Uncoordinated",
    title: "First Skydive",
    blurb: "Episode reel cut for social from a comedy/lifestyle podcast.",
    orientation: "portrait", accent: "#27c431", w: 720, h: 1280, dur: "0:22"
  },
  {
    id: "uncoordinated-almost-made-the-team",
    category: "podcast",
    client: "Uncoordinated",
    title: "Almost Made the Team",
    blurb: "Episode reel cut for social from a comedy/lifestyle podcast.",
    orientation: "portrait", accent: "#d37517", w: 720, h: 1280, dur: "0:21"
  },
  {
    id: "uncoordinated-healing-after-heartbreak",
    category: "podcast",
    client: "Uncoordinated",
    title: "Healing After Heartbreak",
    blurb: "Episode reel cut for social from a comedy/lifestyle podcast.",
    orientation: "portrait", accent: "#d51624", w: 720, h: 1280, dur: "0:37"
  },
  {
    id: "uncoordinated-the-gym-routine-that-works",
    category: "podcast",
    client: "Uncoordinated",
    title: "The Gym Routine That Works",
    blurb: "Episode reel cut for social from a comedy/lifestyle podcast.",
    orientation: "portrait", accent: "#ec9264", w: 720, h: 1280, dur: "0:25"
  },
  {
    id: "uncoordinated-live-freestyle-session",
    category: "podcast",
    client: "Uncoordinated",
    title: "Live Freestyle Session",
    blurb: "Episode reel cut for social from a comedy/lifestyle podcast.",
    orientation: "portrait", accent: "#da6b11", w: 720, h: 1280, dur: "0:26"
  },
  {
    id: "uncoordinated-ten-years-of-friendship",
    category: "podcast",
    client: "Uncoordinated",
    title: "Ten Years of Friendship",
    blurb: "Episode reel cut for social from a comedy/lifestyle podcast.",
    orientation: "portrait", accent: "#1bd027", w: 720, h: 1280, dur: "0:15"
  },
  {
    id: "uncoordinated-inside-the-hustle",
    category: "podcast",
    client: "Uncoordinated",
    title: "Inside the Hustle",
    blurb: "Episode reel cut for social from a comedy/lifestyle podcast.",
    orientation: "portrait", accent: "#ea9a67", w: 720, h: 1280, dur: "0:25"
  },
  {
    id: "uncoordinated-influencing-vs-a-full-time-job",
    category: "podcast",
    client: "Uncoordinated",
    title: "Influencing vs. a Full-Time Job",
    blurb: "Episode reel cut for social from a comedy/lifestyle podcast.",
    orientation: "portrait", accent: "#1dce2a", w: 720, h: 1280, dur: "0:18"
  },
  {
    id: "uncoordinated-warm-showers-changed-my-life",
    category: "podcast",
    client: "Uncoordinated",
    title: "Warm Showers Changed My Life",
    blurb: "Episode reel cut for social from a comedy/lifestyle podcast.",
    orientation: "portrait", accent: "#eb9b66", w: 720, h: 1280, dur: "0:14"
  },
  {
    id: "uncoordinated-would-you-rather",
    category: "podcast",
    client: "Uncoordinated",
    title: "Would You Rather",
    blurb: "Episode reel cut for social from a comedy/lifestyle podcast.",
    orientation: "portrait", accent: "#b66a35", w: 720, h: 1280, dur: "0:15"
  },
  {
    id: "super-fit-champs-be-a-fitness-star",
    category: "motion",
    client: "Super Fit Champs",
    title: "Be a Fitness Star",
    blurb: "Animated segment for a children's fitness brand.",
    orientation: "landscape", accent: "#e50621", w: 1148, h: 618, dur: "0:07"
  },
  {
    id: "super-fit-champs-every-step-counts",
    category: "motion",
    client: "Super Fit Champs",
    title: "Every Step Counts",
    blurb: "Animated segment for a children's fitness brand.",
    orientation: "landscape", accent: "#e5061d", w: 1140, h: 618, dur: "0:07"
  },
  {
    id: "super-fit-champs-stay-fit-stay-happy",
    category: "motion",
    client: "Super Fit Champs",
    title: "Stay Fit, Stay Happy",
    blurb: "Animated segment for a children's fitness brand.",
    orientation: "landscape", accent: "#e5061d", w: 1140, h: 618, dur: "0:07"
  },
  {
    id: "super-fit-champs-move-to-the-beat",
    category: "motion",
    client: "Super Fit Champs",
    title: "Move to the Beat",
    blurb: "Animated segment for a children's fitness brand.",
    orientation: "landscape", accent: "#e5061d", w: 1140, h: 618, dur: "0:07"
  },
  {
    id: "super-fit-champs-let-s-get-active",
    category: "motion",
    client: "Super Fit Champs",
    title: "Let's Get Active",
    blurb: "Animated segment for a children's fitness brand.",
    orientation: "landscape", accent: "#e5061b", w: 1138, h: 644, dur: "0:07"
  },
  {
    id: "super-fit-champs-fitness-is-fun",
    category: "motion",
    client: "Super Fit Champs",
    title: "Fitness Is Fun",
    blurb: "Animated segment for a children's fitness brand.",
    orientation: "landscape", accent: "#fb566f", w: 1140, h: 642, dur: "0:07"
  },
  {
    id: "super-fit-champs-strong-bodies-strong-minds",
    category: "motion",
    client: "Super Fit Champs",
    title: "Strong Bodies, Strong Minds",
    blurb: "Animated segment for a children's fitness brand.",
    orientation: "landscape", accent: "#ef6275", w: 1138, h: 618, dur: "0:07"
  },
  {
    id: "super-fit-champs-smile-and-jump",
    category: "motion",
    client: "Super Fit Champs",
    title: "Smile and Jump",
    blurb: "Animated segment for a children's fitness brand.",
    orientation: "landscape", accent: "#d54f16", w: 1140, h: 626, dur: "0:07"
  },
  {
    id: "super-fit-champs-exercise-is-fun",
    category: "motion",
    client: "Super Fit Champs",
    title: "Exercise Is Fun",
    blurb: "Animated segment for a children's fitness brand.",
    orientation: "landscape", accent: "#da1130", w: 1140, h: 656, dur: "0:07"
  },
  {
    id: "super-fit-champs-stretch-and-move",
    category: "motion",
    client: "Super Fit Champs",
    title: "Stretch and Move",
    blurb: "Animated segment for a children's fitness brand.",
    orientation: "landscape", accent: "#db0f2c", w: 1140, h: 618, dur: "0:07"
  },
  {
    id: "super-fit-champs-energy-up-fun-up",
    category: "motion",
    client: "Super Fit Champs",
    title: "Energy Up, Fun Up",
    blurb: "Animated segment for a children's fitness brand.",
    orientation: "landscape", accent: "#fb566b", w: 1140, h: 662, dur: "0:07"
  },
  {
    id: "super-fit-champs-feel-the-power",
    category: "motion",
    client: "Super Fit Champs",
    title: "Feel the Power",
    blurb: "Animated segment for a children's fitness brand.",
    orientation: "landscape", accent: "#d81315", w: 1140, h: 618, dur: "0:07"
  },
  {
    id: "super-fit-champs-run-jump-play",
    category: "motion",
    client: "Super Fit Champs",
    title: "Run, Jump, Play",
    blurb: "Animated segment for a children's fitness brand.",
    orientation: "landscape", accent: "#fb565a", w: 1140, h: 650, dur: "0:07"
  },
  {
    id: "super-fit-champs-coach-b",
    category: "motion",
    client: "Super Fit Champs",
    title: "Coach B",
    blurb: "Animated segment for a children's fitness brand.",
    orientation: "portrait", accent: "#56c1fb", w: 720, h: 720, dur: "0:12"
  },
  {
    id: "tennis-with-ema-episode-reel-1",
    category: "podcast",
    client: "Tennis with Ema",
    title: "Episode Reel 1",
    blurb: "Highlight reel cut from a tennis podcast episode.",
    orientation: "portrait", accent: "#e50606", w: 720, h: 1280, dur: "0:32"
  },
  {
    id: "tennis-with-ema-episode-reel-2",
    category: "podcast",
    client: "Tennis with Ema",
    title: "Episode Reel 2",
    blurb: "Highlight reel cut from a tennis podcast episode.",
    orientation: "portrait", accent: "#be652c", w: 720, h: 1280, dur: "0:32"
  },
  {
    id: "tennis-with-ema-episode-2-reel-1",
    category: "podcast",
    client: "Tennis with Ema",
    title: "Episode 2 — Reel 1",
    blurb: "Highlight reel cut from a tennis podcast episode.",
    orientation: "portrait", accent: "#56d1fb", w: 720, h: 1280, dur: "0:45"
  },
  {
    id: "tennis-with-ema-episode-2-reel-2",
    category: "podcast",
    client: "Tennis with Ema",
    title: "Episode 2 — Reel 2",
    blurb: "Highlight reel cut from a tennis podcast episode.",
    orientation: "portrait", accent: "#b64535", w: 720, h: 1280, dur: "0:26"
  },
  {
    id: "tennis-with-ema-podcast-intro",
    category: "motion",
    client: "Tennis with Ema",
    title: "Podcast Intro",
    blurb: "Animated title sequence for the show.",
    orientation: "landscape", accent: "#d0fb56", w: 1280, h: 720, dur: "0:35"
  },
  {
    id: "tennis-with-ema-podcast-outro",
    category: "motion",
    client: "Tennis with Ema",
    title: "Podcast Outro",
    blurb: "Animated outro graphic for the show.",
    orientation: "landscape", accent: "#56dcfb", w: 1280, h: 720, dur: "0:10"
  },
  {
    id: "tennis-with-ema-lucky-in-love-sponsor-spot",
    category: "motion",
    client: "Tennis with Ema",
    title: "Lucky in Love — Sponsor Spot",
    blurb: "Animated sponsor advert cut for the show.",
    orientation: "landscape", accent: "#f1cb48", w: 1280, h: 720, dur: "0:29"
  },
  {
    id: "tennis-with-ema-match-set-sponsor-spot",
    category: "motion",
    client: "Tennis with Ema",
    title: "Match Set — Sponsor Spot",
    blurb: "Animated sponsor advert cut for the show.",
    orientation: "landscape", accent: "#79bdd8", w: 1280, h: 720, dur: "0:20"
  },
  {
    id: "khanna-house-studios-studio-welcome",
    category: "corporate",
    client: "Khanna House Studios",
    title: "Studio Welcome",
    blurb: "Brand introduction film for his own studio.",
    orientation: "landscape", accent: "#06e582", w: 1280, h: 720, dur: "1:10"
  },
  {
    id: "khanna-house-studios-faq-reel",
    category: "corporate",
    client: "Khanna House Studios",
    title: "FAQ Reel",
    blurb: "Short-form FAQ explainer for his own studio.",
    orientation: "landscape", accent: "#b65535", w: 1280, h: 720, dur: "1:03"
  },
  {
    id: "intro-to-podcasting-episode-1",
    category: "corporate",
    client: "Intro to Podcasting",
    title: "Episode 1",
    blurb: "Educational episode from a podcasting how-to series.",
    orientation: "landscape", accent: "#e50617", w: 1280, h: 720, dur: "3:32"
  },
  {
    id: "intro-to-podcasting-episode-3",
    category: "corporate",
    client: "Intro to Podcasting",
    title: "Episode 3",
    blurb: "Educational episode from a podcasting how-to series.",
    orientation: "landscape", accent: "#e50615", w: 1280, h: 720, dur: "2:34"
  },
  {
    id: "intro-to-podcasting-episode-4",
    category: "corporate",
    client: "Intro to Podcasting",
    title: "Episode 4",
    blurb: "Educational episode from a podcasting how-to series.",
    orientation: "landscape", accent: "#e50619", w: 1280, h: 720, dur: "3:49"
  },
  {
    id: "valentyna-g-polo-sundays",
    category: "nonprofit",
    client: "Valentyna G",
    title: "Polo Sundays",
    blurb: "Event film covering a polo Sunday.",
    orientation: "landscape", accent: "#9fb635", w: 1280, h: 720, dur: "0:59"
  },
  {
    id: "devi-kodak-jeep-reel",
    category: "social",
    client: "Devi",
    title: "Kodak Jeep Reel",
    blurb: "Branded social reel.",
    orientation: "portrait", accent: "#56a3fa", w: 352, h: 672, dur: "0:20"
  },

  // ==== Round 8: deliverables hidden in DUMP archive folders ====
  {
    id: "mm-ep13-reel1",
    category: "podcast",
    client: "Mental Millennials",
    title: "Episode 13 — Reel 1",
    blurb: "Episode highlight reel cut for social.",
    orientation: "portrait", accent: "#e50606", w: 720, h: 1280, dur: "0:54"
  },
  {
    id: "mm-ep13-reel2",
    category: "podcast",
    client: "Mental Millennials",
    title: "Episode 13 — Reel 2",
    blurb: "Episode highlight reel cut for social.",
    orientation: "portrait", accent: "#de500c", w: 720, h: 1280, dur: "1:26"
  },
  {
    id: "mm-ep14-reel1",
    category: "podcast",
    client: "Mental Millennials",
    title: "Episode 14 — Reel 1",
    blurb: "Episode highlight reel cut for social.",
    orientation: "portrait", accent: "#b66235", w: 720, h: 1280, dur: "0:36"
  },
  {
    id: "mm-ep14-reel2",
    category: "podcast",
    client: "Mental Millennials",
    title: "Episode 14 — Reel 2",
    blurb: "Episode highlight reel cut for social.",
    orientation: "portrait", accent: "#c327a4", w: 720, h: 1280, dur: "0:51"
  },
  {
    id: "mm-ep16-reel1",
    category: "podcast",
    client: "Mental Millennials",
    title: "Episode 16 — Reel 1",
    blurb: "Episode highlight reel cut for social.",
    orientation: "portrait", accent: "#e0320a", w: 720, h: 1280, dur: "0:37"
  },
  {
    id: "mm-ep16-reel2",
    category: "podcast",
    client: "Mental Millennials",
    title: "Episode 16 — Reel 2",
    blurb: "Episode highlight reel cut for social.",
    orientation: "portrait", accent: "#e52c06", w: 720, h: 1280, dur: "0:42"
  },
  {
    id: "mm-ep17-reel1",
    category: "podcast",
    client: "Mental Millennials",
    title: "Episode 17 — Reel 1",
    blurb: "Episode highlight reel cut for social.",
    orientation: "portrait", accent: "#e54a06", w: 720, h: 1280, dur: "0:37"
  },
  {
    id: "mm-ep17-reel2",
    category: "podcast",
    client: "Mental Millennials",
    title: "Episode 17 — Reel 2",
    blurb: "Episode highlight reel cut for social.",
    orientation: "portrait", accent: "#f1a060", w: 720, h: 1280, dur: "0:32"
  },
  {
    id: "mm-ep18-reel1",
    category: "podcast",
    client: "Mental Millennials",
    title: "Episode 18 — Reel 1",
    blurb: "Episode highlight reel cut for social.",
    orientation: "portrait", accent: "#f09061", w: 720, h: 1280, dur: "0:37"
  },
  {
    id: "mm-ep18-reel2",
    category: "podcast",
    client: "Mental Millennials",
    title: "Episode 18 — Reel 2",
    blurb: "Episode highlight reel cut for social.",
    orientation: "portrait", accent: "#e53906", w: 720, h: 1280, dur: "0:34"
  },
  {
    id: "insight-brand-story",
    category: "nonprofit",
    client: "inSIGHT Education",
    title: "Brand Story Film",
    blurb: "Long-form brand story film for a nonprofit.",
    orientation: "landscape", accent: "#b63535", w: 1280, h: 720, dur: "5:17"
  },
  {
    id: "insight-brand-outro",
    category: "motion",
    client: "inSIGHT Education",
    title: "Brand Story — Outro",
    blurb: "Animated outro from the brand story film.",
    orientation: "landscape", accent: "#35a9b6", w: 1280, h: 720, dur: "1:55"
  },
  {
    id: "insight-names-not-numbers",
    category: "nonprofit",
    client: "inSIGHT Education",
    title: "Names Not Numbers",
    blurb: "Segment from a Holocaust-education nonprofit campaign.",
    orientation: "landscape", accent: "#b68335", w: 1280, h: 720, dur: "0:26"
  },
  {
    id: "insight-nnn-clip-3",
    category: "nonprofit",
    client: "inSIGHT Education",
    title: "Names Not Numbers — Clip 3",
    blurb: "Segment from a Holocaust-education nonprofit campaign.",
    orientation: "landscape", accent: "#ee7e62", w: 1280, h: 720, dur: "0:19"
  },
  {
    id: "khs-story-board",
    category: "corporate",
    client: "Khanna House Studios",
    title: "Story Board",
    blurb: "Vertical brand piece for his own studio.",
    orientation: "portrait", accent: "#672ac0", w: 720, h: 1280, dur: "0:59"
  },

  // ==== Round 8b: Julie Khanna reels ====
  {
    id: "julie-khanna-reel-1",
    category: "social",
    client: "Julie Khanna",
    title: "Event Reel 1",
    blurb: "Vertical event reel cut for social.",
    orientation: "portrait", accent: "#56fbfb", w: 720, h: 1280, dur: "2:25"
  },
  {
    id: "julie-khanna-reel-2",
    category: "social",
    client: "Julie Khanna",
    title: "Event Reel 2",
    blurb: "Vertical event reel cut for social.",
    orientation: "portrait", accent: "#de460c", w: 720, h: 1280, dur: "1:02"
  },
  {
    id: "julie-khanna-reel-red",
    category: "social",
    client: "Julie Khanna",
    title: "Reel of the Red",
    blurb: "Vertical event reel cut for social.",
    orientation: "portrait", accent: "#efbf2e", w: 720, h: 1280, dur: "0:53"
  },

  // ==== Round 9: excerpts from flagship long-form episodes ====
  {
    id: "nrg-manifold-episode",
    category: "podcast",
    client: "NRG Podcast",
    title: "Manifold — Full Episode (excerpt)",
    blurb: "Excerpt from the full 1h48m multi-camera episode.",
    orientation: "landscape", accent: "#efbc61", w: 1280, h: 720, dur: "1:15"
  },
  {
    id: "cwk-ep6-episode",
    category: "podcast",
    client: "Coffee with Kelly",
    title: "Episode 6 — Full Show (excerpt)",
    blurb: "Excerpt from the full 31-minute episode.",
    orientation: "landscape", accent: "#b66335", w: 1280, h: 720, dur: "1:15"
  },
  {
    id: "sojourners-podcast-episode",
    category: "podcast",
    client: "Sojourners",
    title: "Podcast — Full Episode (excerpt)",
    blurb: "Excerpt from the full 35-minute episode.",
    orientation: "landscape", accent: "#b6356f", w: 1280, h: 720, dur: "1:15"
  },
  {
    id: "kerrigan-podcast-episode",
    category: "podcast",
    client: "Dwayne Kerrigan",
    title: "Podcast — Full Episode (excerpt)",
    blurb: "Excerpt from a 2h13m multi-camera episode.",
    orientation: "landscape", accent: "#e50606", w: 1280, h: 720, dur: "1:15"
  },
  {
    id: "eqb2b-ep4-episode",
    category: "podcast",
    client: "EQB2B",
    title: "Episode 4 — Full Show (excerpt)",
    blurb: "Excerpt from the full 52-minute branded episode.",
    orientation: "landscape", accent: "#2406e5", w: 1280, h: 720, dur: "1:15"
  },
  {
    id: "csc-episode",
    category: "nonprofit",
    client: "Children's Services Council",
    title: "Episode — Full Show (excerpt)",
    blurb: "Excerpt from a 30-minute nonprofit episode.",
    orientation: "landscape", accent: "#c66e25", w: 1280, h: 720, dur: "1:15"
  },
  {
    id: "wjm-gale-episode",
    category: "podcast",
    client: "We Just Met",
    title: "Gale — Full Episode (excerpt)",
    blurb: "Excerpt from the full 48-minute dating-show episode.",
    orientation: "landscape", accent: "#e54c06", w: 1280, h: 720, dur: "1:15"
  },
  {
    id: "piper-laine-episode",
    category: "podcast",
    client: "Piper Laine",
    title: "Podcast — Full Episode (excerpt)",
    blurb: "Excerpt from the full 30-minute episode.",
    orientation: "landscape", accent: "#e5a706", w: 1280, h: 720, dur: "1:15"
  },
  {
    id: "tennis-ema-full-episode",
    category: "podcast",
    client: "Tennis with Ema",
    title: "The Emazing Podcast — Full Show (excerpt)",
    blurb: "Excerpt from the full 41-minute episode.",
    orientation: "landscape", accent: "#d26619", w: 1280, h: 720, dur: "1:15"
  },
  {
    id: "super-fit-champs-film",
    category: "corporate",
    client: "Super Fit Champs",
    title: "Brand Film (excerpt)",
    blurb: "Excerpt from the finished 21-minute brand film.",
    orientation: "landscape", accent: "#cdcb1e", w: 1280, h: 720, dur: "1:15"
  },
  {
    id: "phelps-tim-dutta-film",
    category: "corporate",
    client: "Phelps Media Group",
    title: "Tim Dutta — Feature Film (excerpt)",
    blurb: "Excerpt from a long-form equestrian feature.",
    orientation: "landscape", accent: "#06e50e", w: 1280, h: 720, dur: "1:15"
  },
  {
    id: "adrian-rmante-episode",
    category: "podcast",
    client: "Adrian R'Mante",
    title: "Podcast — Full Episode (excerpt)",
    blurb: "Excerpt from a full-length interview episode.",
    orientation: "landscape", accent: "#b65c35", w: 1280, h: 720, dur: "1:15"
  },
  {
    id: "rtdb-ep8-episode",
    category: "podcast",
    client: "RTDB",
    title: "Episode 8 — Full Show (excerpt)",
    blurb: "Excerpt from a full-length episode.",
    orientation: "landscape", accent: "#2a6dc1", w: 1280, h: 720, dur: "1:15"
  },
  {
    id: "zoey-30f30-episode",
    category: "podcast",
    client: "Zoey Nguyen",
    title: "30 for 30 — Episode 1 (excerpt)",
    blurb: "Excerpt from the full 31-minute episode.",
    orientation: "landscape", accent: "#b66b35", w: 1280, h: 720, dur: "1:15"
  },
  {
    id: "mm-full-episode",
    category: "podcast",
    client: "Mental Millennials",
    title: "Episode 29 — Full Show (excerpt)",
    blurb: "Excerpt from a full-length episode.",
    orientation: "landscape", accent: "#7506e5", w: 1280, h: 720, dur: "1:15"
  },
  {
    id: "elite-protocol-episode",
    category: "podcast",
    client: "Elite Protocol",
    title: "Episode 1 — Full Show (excerpt)",
    blurb: "Excerpt from a full-length episode.",
    orientation: "landscape", accent: "#d88279", w: 1280, h: 720, dur: "1:15"
  },
  // ---- R2 START (Nov 25, 2026 studio-PC pieces; tools/add_r2_pieces.py) ----
  {
    id: "m-001-the-nrg-pod-ep8-reel-13",
    category: "podcast",
    client: "NRG Podcast",
    title: "NRG Podcast reel 1",
    blurb: "",
    role: "Edit", year: "2026",
    orientation: "portrait", accent: "#937475", w: 720, h: 1280, dur: "0:52"
  },
  {
    id: "m-002-the-nrg-pod-ep8-reel-09",
    category: "podcast",
    client: "NRG Podcast",
    title: "NRG Podcast reel 2",
    blurb: "",
    role: "Edit", year: "2026",
    orientation: "portrait", accent: "#996c68", w: 720, h: 1280, dur: "0:37"
  },
  {
    id: "m-003-the-nrg-pod-ep8-reel-07",
    category: "podcast",
    client: "NRG Podcast",
    title: "NRG Podcast reel 3",
    blurb: "",
    role: "Edit", year: "2026",
    orientation: "portrait", accent: "#9d7573", w: 720, h: 1280, dur: "0:34"
  },
  {
    id: "m-004-the-nrg-pod-clip-c53e6b",
    category: "podcast",
    client: "NRG Podcast",
    title: "NRG Podcast reel 4",
    blurb: "",
    role: "Edit", year: "2026",
    orientation: "portrait", accent: "#a46140", w: 720, h: 1280, dur: "0:36"
  },
  {
    id: "m-005-the-nrg-pod-clip-982ffd",
    category: "podcast",
    client: "NRG Podcast",
    title: "NRG Podcast reel 5",
    blurb: "",
    role: "Edit", year: "2026",
    orientation: "portrait", accent: "#b06534", w: 720, h: 1280, dur: "0:58"
  },
  {
    id: "m-006-the-nrg-pod-clip-f96a74",
    category: "podcast",
    client: "NRG Podcast",
    title: "NRG Podcast reel 6",
    blurb: "",
    role: "Edit", year: "2026",
    orientation: "portrait", accent: "#ae6436", w: 720, h: 1280, dur: "0:46"
  },
  {
    id: "m-007-the-nrg-pod-clip-9045c5",
    category: "podcast",
    client: "NRG Podcast",
    title: "NRG Podcast reel 7",
    blurb: "",
    role: "Edit", year: "2026",
    orientation: "portrait", accent: "#7c534c", w: 720, h: 1280, dur: "0:46"
  },
  {
    id: "m-008-the-nrg-pod-clip-a080a2",
    category: "podcast",
    client: "NRG Podcast",
    title: "NRG Podcast reel 8",
    blurb: "",
    role: "Edit", year: "2026",
    orientation: "portrait", accent: "#a15d39", w: 720, h: 1280, dur: "1:05"
  },
  {
    id: "m-009-the-nrg-pod-clip-a21283",
    category: "podcast",
    client: "NRG Podcast",
    title: "NRG Podcast reel 9",
    blurb: "",
    role: "Edit", year: "2026",
    orientation: "portrait", accent: "#854e42", w: 720, h: 1280, dur: "0:33"
  },
  {
    id: "m-010-the-nrg-pod-strip-down-and-just-start-swimming-because-we-wo",
    category: "podcast",
    client: "NRG Podcast",
    title: "Strip Down and Just Start Swimming Because We Would Be Fol",
    blurb: "",
    role: "Edit", year: "2026",
    orientation: "portrait", accent: "#9d6447", w: 720, h: 1280, dur: "0:37"
  },
  {
    id: "m-011-the-nrg-pod-clip-cb9f8c",
    category: "podcast",
    client: "NRG Podcast",
    title: "NRG Podcast reel 10",
    blurb: "",
    role: "Edit", year: "2026",
    orientation: "portrait", accent: "#a17474", w: 720, h: 1280, dur: "0:47"
  },
  {
    id: "m-012-the-nrg-pod-clip-884bdb",
    category: "podcast",
    client: "NRG Podcast",
    title: "NRG Podcast reel 11",
    blurb: "",
    role: "Edit", year: "2026",
    orientation: "portrait", accent: "#a0716d", w: 720, h: 1280, dur: "0:56"
  },
  {
    id: "m-013-the-nrg-pod-i-played-one-song-for-3-hours-on-live-radio-45f7",
    category: "podcast",
    client: "NRG Podcast",
    title: "I Played One Song for 3 Hours on Live Radio",
    blurb: "",
    role: "Edit", year: "2026",
    orientation: "portrait", accent: "#8a8488", w: 720, h: 1280, dur: "1:33"
  },
  {
    id: "m-014-the-nrg-pod-reel-3-tony",
    category: "podcast",
    client: "NRG Podcast",
    title: "NRG Podcast reel 12",
    blurb: "",
    role: "Edit", year: "2026",
    orientation: "portrait", accent: "#9c5928", w: 720, h: 1280, dur: "0:38"
  },
  {
    id: "m-016-the-nrg-pod-reel-2-tony",
    category: "podcast",
    client: "NRG Podcast",
    title: "NRG Podcast reel 14",
    blurb: "",
    role: "Edit", year: "2026",
    orientation: "portrait", accent: "#93532a", w: 720, h: 1280, dur: "0:40"
  },
  {
    id: "m-020-the-nrg-pod-reel-4-play-wherever-you-are-teamwork",
    category: "podcast",
    client: "NRG Podcast",
    title: "Reel 4 Play Wherever You Are (teamwork",
    blurb: "",
    role: "Edit", year: "2026",
    orientation: "portrait", accent: "#af8776", w: 720, h: 1280, dur: "0:58"
  },
  {
    id: "m-109-bugsy-bugsy-dec-16-what-brought-the-formosan-termites",
    category: "social",
    client: "Bugsy Pest Control",
    title: "Dec 16: What Brought The Formosan Termites",
    blurb: "",
    role: "Edit", year: "2026",
    orientation: "portrait", accent: "#536288", w: 720, h: 1280, dur: "1:06"
  },
  {
    id: "m-111-bugsy-bugsy-dec-11-three-companies-five-minutes",
    category: "social",
    client: "Bugsy Pest Control",
    title: "Dec 11: Three Companies Five Minutes",
    blurb: "",
    role: "Edit", year: "2026",
    orientation: "portrait", accent: "#654644", w: 720, h: 1280, dur: "0:48"
  },
  {
    id: "m-113-bugsy-bugsy-dec-18-sealed-up-to-wazoo-still-getting-rats",
    category: "social",
    client: "Bugsy Pest Control",
    title: "Dec 18: Sealed Up To Wazoo Still Getting Rats",
    blurb: "",
    role: "Edit", year: "2026",
    orientation: "portrait", accent: "#ac8b93", w: 720, h: 1280, dur: "0:25"
  },
  {
    id: "m-115-bugsy-bugsy-dec-17-im-not-david-blaine-its-just-biology",
    category: "social",
    client: "Bugsy Pest Control",
    title: "Dec 17: Im Not David Blaine Its Just Biology",
    blurb: "",
    role: "Edit", year: "2026",
    orientation: "portrait", accent: "#a4705d", w: 720, h: 1280, dur: "0:47"
  },
  {
    id: "m-117-bugsy-bugsy-dec-12-the-best-rat-bait",
    category: "social",
    client: "Bugsy Pest Control",
    title: "Dec 12: The Best Rat Bait",
    blurb: "",
    role: "Edit", year: "2026",
    orientation: "portrait", accent: "#796069", w: 720, h: 1280, dur: "0:44"
  },
  {
    id: "m-119-bugsy-bugsy-dec-07-rats-hug-walls",
    category: "social",
    client: "Bugsy Pest Control",
    title: "Dec 07: Rats Hug Walls",
    blurb: "",
    role: "Edit", year: "2026",
    orientation: "portrait", accent: "#643a28", w: 720, h: 1280, dur: "0:37"
  },
  {
    id: "m-121-bugsy-bugsy-dec-04-why-the-rats-picked-this-house",
    category: "social",
    client: "Bugsy Pest Control",
    title: "Dec 04: Why The Rats Picked This House",
    blurb: "",
    role: "Edit", year: "2026",
    orientation: "portrait", accent: "#7d7979", w: 720, h: 1280, dur: "0:40"
  },
  {
    id: "m-123-bugsy-bugsy-dec-15-the-vent-cap-a-plumber-can-pop-off",
    category: "social",
    client: "Bugsy Pest Control",
    title: "Dec 15: The Vent Cap A Plumber Can Pop Off",
    blurb: "",
    role: "Edit", year: "2026",
    orientation: "portrait", accent: "#9a916f", w: 720, h: 1280, dur: "0:20"
  },
  {
    id: "m-125-bugsy-bugsy-dec-14-the-rub-marks-rats-leave-behind",
    category: "social",
    client: "Bugsy Pest Control",
    title: "Dec 14: The Rub Marks Rats Leave Behind",
    blurb: "",
    role: "Edit", year: "2026",
    orientation: "portrait", accent: "#abafb2", w: 720, h: 1280, dur: "0:38"
  },
  {
    id: "m-127-bugsy-bugsy-dec-13-the-sewer-trifecta",
    category: "social",
    client: "Bugsy Pest Control",
    title: "Dec 13: The Sewer Trifecta",
    blurb: "",
    role: "Edit", year: "2026",
    orientation: "portrait", accent: "#51653d", w: 720, h: 1280, dur: "0:32"
  },
  {
    id: "m-129-bugsy-bugsy-dec-10-a-big-headed-ant-trail-on-the-wall",
    category: "social",
    client: "Bugsy Pest Control",
    title: "Dec 10: A Big Headed Ant Trail On The Wall",
    blurb: "",
    role: "Edit", year: "2026",
    orientation: "portrait", accent: "#8b8997", w: 720, h: 1280, dur: "0:29"
  },
  {
    id: "m-131-bugsy-bugsy-dec-09-a-one-way-door-for-rats",
    category: "social",
    client: "Bugsy Pest Control",
    title: "Dec 09: A One Way Door For Rats",
    blurb: "",
    role: "Edit", year: "2026",
    orientation: "portrait", accent: "#9b9389", w: 720, h: 1280, dur: "0:30"
  },
  {
    id: "m-179-coffee-with-kelly-2-edits-1",
    category: "podcast",
    client: "Coffee with Kelly",
    title: "Coffee with Kelly reel 2",
    blurb: "",
    role: "Edit", year: "2026",
    orientation: "portrait", accent: "#c01a58", w: 720, h: 1280, dur: "1:13"
  },
  {
    id: "m-181-coffee-with-kelly-cwk-ep-1-5-cam-a-take-2",
    category: "podcast",
    client: "Coffee with Kelly",
    title: "Coffee with Kelly reel 4",
    blurb: "",
    role: "Edit", year: "2025",
    orientation: "landscape", accent: "#362b26", w: 1280, h: 720, dur: "5:07"
  },
  {
    id: "m-184-coffee-with-kelly-cwk-ep-1-5-cam-a",
    category: "podcast",
    client: "Coffee with Kelly",
    title: "Coffee with Kelly reel 5 (excerpt)",
    blurb: "Excerpt from a longer piece.",
    role: "Edit", year: "2025",
    orientation: "landscape", accent: "#352a25", w: 1280, h: 720, dur: "1:30"
  },
  {
    id: "m-187-mole-mole-reel-3-mole-to-the-table-9x16",
    category: "social",
    client: "Mole",
    title: "Reel 3 to the Table",
    blurb: "",
    role: "Edit", year: "2026",
    orientation: "portrait", accent: "#e0720c", w: 720, h: 1280, dur: "0:30"
  },
  {
    id: "m-188-mole-mole-reel-1-behind-the-flavor-9x16",
    category: "social",
    client: "Mole",
    title: "Reel 1 Behind the Flavor",
    blurb: "",
    role: "Edit", year: "2026",
    orientation: "portrait", accent: "#a35008", w: 720, h: 1280, dur: "0:30"
  },
  {
    id: "m-189-mole-mole-reel-06-v3",
    category: "social",
    client: "Mole",
    title: "Mole reel 1",
    blurb: "",
    role: "Edit", year: "2026",
    orientation: "portrait", accent: "#6b4c33", w: 720, h: 1280, dur: "0:21"
  },
  {
    id: "m-190-mole-mole-reel-05-v3",
    category: "social",
    client: "Mole",
    title: "Mole reel 2",
    blurb: "",
    role: "Edit", year: "2026",
    orientation: "portrait", accent: "#966f15", w: 720, h: 1280, dur: "0:21"
  },
  {
    id: "m-191-mole-mole-reel-04-v3",
    category: "social",
    client: "Mole",
    title: "Mole reel 3",
    blurb: "",
    role: "Edit", year: "2026",
    orientation: "portrait", accent: "#a55237", w: 720, h: 1280, dur: "0:20"
  },
  {
    id: "m-192-mole-mole-reel-01-v3",
    category: "social",
    client: "Mole",
    title: "Mole reel 4",
    blurb: "",
    role: "Edit", year: "2026",
    orientation: "portrait", accent: "#b47a45", w: 720, h: 1280, dur: "0:21"
  },
  {
    id: "m-193-mole-mole-media-dinner-recap-v1-master-1080p",
    category: "social",
    client: "Mole",
    title: "Media Dinner Recap",
    blurb: "",
    role: "Edit", year: "2026",
    orientation: "landscape", accent: "#634031", w: 1280, h: 720, dur: "1:34"
  },
  {
    id: "m-194-mole-mole-bar-reel-v3-polished-9x16",
    category: "social",
    client: "Mole",
    title: "Mole reel 5",
    blurb: "",
    role: "Edit", year: "2026",
    orientation: "portrait", accent: "#a55d36", w: 720, h: 1280, dur: "0:30"
  },
  {
    id: "m-195-mole-mole-bar-reel-v2-steady-sharp-9x16",
    category: "social",
    client: "Mole",
    title: "Bar Reel (steady + Sharp",
    blurb: "",
    role: "Edit", year: "2026",
    orientation: "portrait", accent: "#b66b2b", w: 720, h: 1280, dur: "0:30"
  },
  {
    id: "m-196-mole-mole-bar-reel-remotion-9x16",
    category: "social",
    client: "Mole",
    title: "Mole reel 6",
    blurb: "",
    role: "Edit", year: "2026",
    orientation: "portrait", accent: "#cb8337", w: 720, h: 1280, dur: "0:30"
  },
  {
    id: "m-197-mole-mole-reel-2-good-drinks-brighter-nights-9x16",
    category: "social",
    client: "Mole",
    title: "Reel 2 Good Drinks Brighter Nights",
    blurb: "",
    role: "Edit", year: "2026",
    orientation: "portrait", accent: "#d0931c", w: 720, h: 1280, dur: "0:13"
  },
  {
    id: "m-199-mole-mole-food-reel-v3-2d-menu-example-edit-9x16",
    category: "social",
    client: "Mole",
    title: "Food Reel 2d Menu (Example",
    blurb: "",
    role: "Edit", year: "2026",
    orientation: "portrait", accent: "#a45c14", w: 720, h: 1280, dur: "0:30"
  },
  {
    id: "m-228-dr-jiveh-detail-2-confidence-phone-vertical-new",
    category: "social",
    client: "Dr. Jiveh",
    title: "Dr. Jiveh reel 1",
    blurb: "",
    role: "Edit", year: "2026",
    orientation: "portrait", accent: "#615d60", w: 720, h: 1280, dur: "0:52"
  },
  {
    id: "m-229-dr-jiveh-detail-4-office-culture-phone-vertical-new",
    category: "social",
    client: "Dr. Jiveh",
    title: "4 Office Culture",
    blurb: "",
    role: "Edit", year: "2026",
    orientation: "portrait", accent: "#754552", w: 720, h: 1280, dur: "1:04"
  },
  {
    id: "m-230-dr-jiveh-detail-3-plans-change-phone-vertical-new",
    category: "social",
    client: "Dr. Jiveh",
    title: "3 Plans Change",
    blurb: "",
    role: "Edit", year: "2026",
    orientation: "portrait", accent: "#483f41", w: 720, h: 1280, dur: "0:53"
  },
  {
    id: "m-231-dr-jiveh-detail-r4-w-b10",
    category: "social",
    client: "Dr. Jiveh",
    title: "Dr. Jiveh reel 2",
    blurb: "",
    role: "Edit", year: "2026",
    orientation: "landscape", accent: "#504e5d", w: 1280, h: 720, dur: "1:04"
  },
  {
    id: "m-232-dr-jiveh-detail-r2-w-b8",
    category: "social",
    client: "Dr. Jiveh",
    title: "Dr. Jiveh reel 3",
    blurb: "",
    role: "Edit", year: "2026",
    orientation: "landscape", accent: "#594b49", w: 1280, h: 720, dur: "0:52"
  },
  {
    id: "m-233-dr-jiveh-detail-r3-w-b6",
    category: "social",
    client: "Dr. Jiveh",
    title: "Dr. Jiveh reel 4",
    blurb: "",
    role: "Edit", year: "2026",
    orientation: "landscape", accent: "#423e40", w: 1280, h: 720, dur: "0:53"
  },
  {
    id: "m-236-literacy-coalition-litco-brandstory-v02",
    category: "nonprofit",
    client: "Literacy Coalition",
    title: "Litco Brandstory",
    blurb: "",
    role: "Edit", year: "2026",
    orientation: "landscape", accent: "#7f675a", w: 1280, h: 720, dur: "2:52"
  },
  {
    id: "m-237-literacy-coalition-fairways-golf-reel-3-v04",
    category: "nonprofit",
    client: "Literacy Coalition",
    title: "Fairways Golf Reel 3",
    blurb: "",
    role: "Edit", year: "2026",
    orientation: "portrait", accent: "#67ac56", w: 720, h: 1280, dur: "0:44"
  },
  {
    id: "m-239-literacy-coalition-early-literacy-reel-5-v02",
    category: "nonprofit",
    client: "Literacy Coalition",
    title: "Literacy Coalition reel 1",
    blurb: "",
    role: "Edit", year: "2026",
    orientation: "portrait", accent: "#ab8e60", w: 720, h: 1280, dur: "0:39"
  },
  {
    id: "m-240-literacy-coalition-americorps-reel-2-v02",
    category: "nonprofit",
    client: "Literacy Coalition",
    title: "Literacy Coalition reel 2",
    blurb: "",
    role: "Edit", year: "2026",
    orientation: "portrait", accent: "#84353a", w: 720, h: 1280, dur: "0:41"
  },
  {
    id: "m-241-literacy-coalition-read-with-me-reel-six",
    category: "nonprofit",
    client: "Literacy Coalition",
    title: "Read with Me Reel Six",
    blurb: "",
    role: "Edit", year: "2026",
    orientation: "portrait", accent: "#4a3d46", w: 720, h: 1280, dur: "0:40"
  },
  {
    id: "m-243-literacy-coalition-building-better-readers-reel-1",
    category: "nonprofit",
    client: "Literacy Coalition",
    title: "Building Better Readers Reel 1",
    blurb: "",
    role: "Edit", year: "2026",
    orientation: "portrait", accent: "#919b92", w: 720, h: 1280, dur: "0:55"
  },
  {
    id: "m-244-literacy-coalition-for-cap",
    category: "nonprofit",
    client: "Literacy Coalition",
    title: "Literacy Coalition reel 4",
    blurb: "",
    role: "Edit", year: "2026",
    orientation: "landscape", accent: "#5f3abe", w: 1280, h: 720, dur: "0:32"
  },
  {
    id: "m-245-literacy-coalition-litco-brandstory-statistics-v02",
    category: "nonprofit",
    client: "Literacy Coalition",
    title: "Litco Brandstory Statistics",
    blurb: "",
    role: "Edit", year: "2026",
    orientation: "landscape", accent: "#5c5a59", w: 1280, h: 720, dur: "3:15"
  },
  {
    id: "m-247-literacy-coalition-for-cap3",
    category: "nonprofit",
    client: "Literacy Coalition",
    title: "Literacy Coalition reel 5",
    blurb: "",
    role: "Edit", year: "2026",
    orientation: "landscape", accent: "#5e37b6", w: 1280, h: 720, dur: "0:14"
  },
  {
    id: "m-248-literacy-coalition-for-cap1",
    category: "nonprofit",
    client: "Literacy Coalition",
    title: "Literacy Coalition reel 6",
    blurb: "",
    role: "Edit", year: "2026",
    orientation: "landscape", accent: "#786c5f", w: 1280, h: 720, dur: "0:12"
  },
  {
    id: "m-259-wellington-bay-mod-8-1-final-fix",
    category: "corporate",
    client: "Wellington Bay",
    title: "Wellington Bay reel 1",
    blurb: "",
    role: "Edit", year: "2026",
    orientation: "landscape", accent: "#494349", w: 1280, h: 720, dur: "2:44"
  },
  {
    id: "m-261-wellington-bay-mod-0-1-finl",
    category: "corporate",
    client: "Wellington Bay",
    title: "Wellington Bay reel 3",
    blurb: "",
    role: "Edit", year: "2026",
    orientation: "landscape", accent: "#50494b", w: 1280, h: 720, dur: "4:33"
  },
  {
    id: "m-266-wellington-bay-tht-promorev",
    category: "corporate",
    client: "Wellington Bay",
    title: "Tht PROMOrev",
    blurb: "",
    role: "Edit", year: "2026",
    orientation: "portrait", accent: "#907270", w: 720, h: 1280, dur: "0:28"
  },
  {
    id: "m-267-wellington-bay-promo-reel",
    category: "corporate",
    client: "Wellington Bay",
    title: "Wellington Bay reel 5",
    blurb: "",
    role: "Edit", year: "2026",
    orientation: "portrait", accent: "#947672", w: 720, h: 1280, dur: "0:34"
  },
  {
    id: "m-271-wellington-bay-module-2-2-choosing-the-right-credit-card",
    category: "corporate",
    client: "Wellington Bay",
    title: "Module 2.2 Choosing the Right Credit Card (2)",
    blurb: "",
    role: "Edit", year: "2025",
    orientation: "landscape", accent: "#8c6a5d", w: 1280, h: 720, dur: "3:58"
  },
  {
    id: "m-276-wellington-bay-module-2-1-what-you-need-to-know-about-credit",
    category: "corporate",
    client: "Wellington Bay",
    title: "Module 2.1 What You Need to Know About Credit Cards",
    blurb: "",
    role: "Edit", year: "2025",
    orientation: "landscape", accent: "#8c695d", w: 1280, h: 720, dur: "3:54"
  },
  {
    id: "m-277-hona-2026-hona-2026-recap-final-v6c-4k",
    category: "nonprofit",
    client: "HONA Awards",
    title: "HONA Awards reel 1",
    blurb: "",
    role: "Edit", year: "2026",
    orientation: "landscape", accent: "#817a73", w: 1280, h: 720, dur: "1:36"
  },
  {
    id: "m-278-hona-2026-ite-nominee",
    category: "nonprofit",
    client: "HONA Awards",
    title: "Ite Nominee",
    blurb: "",
    role: "Edit", year: "2026",
    orientation: "landscape", accent: "#8f604b", w: 1280, h: 720, dur: "1:32"
  },
  {
    id: "m-279-hona-2026-people-of-purpose-nominee",
    category: "nonprofit",
    client: "HONA Awards",
    title: "People of Purpose Nominee",
    blurb: "",
    role: "Edit", year: "2026",
    orientation: "landscape", accent: "#9a735e", w: 1280, h: 720, dur: "1:06"
  },
  {
    id: "m-280-hona-2026-ithink-sponsor",
    category: "nonprofit",
    client: "HONA Awards",
    title: "Ithink Sponsor",
    blurb: "",
    role: "Edit", year: "2026",
    orientation: "landscape", accent: "#86585f", w: 1280, h: 720, dur: "0:58"
  },
  {
    id: "m-281-hona-2026-safe-exit-initiative",
    category: "nonprofit",
    client: "HONA Awards",
    title: "Safe Exit Initiative",
    blurb: "",
    role: "Edit", year: "2026",
    orientation: "landscape", accent: "#a97f6d", w: 1280, h: 720, dur: "1:20"
  },
  {
    id: "m-282-hona-2026-pcs-foundation-nominee",
    category: "nonprofit",
    client: "HONA Awards",
    title: "Pcs Foundation Nominee",
    blurb: "",
    role: "Edit", year: "2026",
    orientation: "landscape", accent: "#a26856", w: 1280, h: 720, dur: "1:16"
  },
  {
    id: "m-283-hona-2026-cpsfl-nominee",
    category: "nonprofit",
    client: "HONA Awards",
    title: "Cpsfl Nominee",
    blurb: "",
    role: "Edit", year: "2026",
    orientation: "landscape", accent: "#9f7760", w: 1280, h: 720, dur: "0:47"
  },
  {
    id: "m-284-hona-2026-health-wellness-winner",
    category: "nonprofit",
    client: "HONA Awards",
    title: "Health & Wellness Winner",
    blurb: "",
    role: "Edit", year: "2026",
    orientation: "landscape", accent: "#9e705a", w: 1280, h: 720, dur: "1:04"
  },
  {
    id: "m-285-hona-2026-education-impact-winner",
    category: "nonprofit",
    client: "HONA Awards",
    title: "Education Impact Winner",
    blurb: "",
    role: "Edit", year: "2026",
    orientation: "landscape", accent: "#9e7e6b", w: 1280, h: 720, dur: "1:18"
  },
  {
    id: "m-286-hona-2026-arts-culture-impact-winner",
    category: "nonprofit",
    client: "HONA Awards",
    title: "Arts & Culture Impact Winner",
    blurb: "",
    role: "Edit", year: "2026",
    orientation: "landscape", accent: "#91403e", w: 1280, h: 720, dur: "1:09"
  },
  {
    id: "m-296-insight-interview-8-export",
    category: "interviews",
    client: "inSIGHT Education",
    title: "inSIGHT Education reel 1",
    blurb: "",
    role: "Edit", year: "2025",
    orientation: "landscape", accent: "#7a744d", w: 1280, h: 720, dur: "0:28"
  },
  {
    id: "m-297-insight-interview-7-export",
    category: "interviews",
    client: "inSIGHT Education",
    title: "inSIGHT Education reel 2",
    blurb: "",
    role: "Edit", year: "2025",
    orientation: "landscape", accent: "#6d5d41", w: 1280, h: 720, dur: "0:56"
  },
  {
    id: "m-298-insight-interview-6-export",
    category: "interviews",
    client: "inSIGHT Education",
    title: "inSIGHT Education reel 3",
    blurb: "",
    role: "Edit", year: "2025",
    orientation: "landscape", accent: "#605c3b", w: 1280, h: 720, dur: "2:36"
  },
  {
    id: "m-299-insight-interview-4-export",
    category: "interviews",
    client: "inSIGHT Education",
    title: "inSIGHT Education reel 4",
    blurb: "",
    role: "Edit", year: "2025",
    orientation: "landscape", accent: "#6e7949", w: 1280, h: 720, dur: "1:48"
  },
  {
    id: "m-300-insight-interview-3-export",
    category: "interviews",
    client: "inSIGHT Education",
    title: "inSIGHT Education reel 5",
    blurb: "",
    role: "Edit", year: "2025",
    orientation: "landscape", accent: "#696b43", w: 1280, h: 720, dur: "2:32"
  },
  {
    id: "m-301-insight-interview-2-export",
    category: "interviews",
    client: "inSIGHT Education",
    title: "inSIGHT Education reel 6",
    blurb: "",
    role: "Edit", year: "2025",
    orientation: "landscape", accent: "#74774a", w: 1280, h: 720, dur: "0:45"
  },
  {
    id: "m-308-tithing-tree-tithing-tree-pt-2-final",
    category: "corporate",
    client: "Tithing Tree",
    title: "Tithing Tree reel 1",
    blurb: "",
    role: "Edit", year: "2025",
    orientation: "landscape", accent: "#4c4c26", w: 1280, h: 720, dur: "1:50"
  },
  {
    id: "m-309-tithing-tree-business-partner-focused-v01",
    category: "corporate",
    client: "Tithing Tree",
    title: "Business & Partner Focused",
    blurb: "",
    role: "Edit", year: "2026",
    orientation: "landscape", accent: "#797230", w: 1280, h: 720, dur: "1:21"
  },
  {
    id: "m-311-tithing-tree-reel-1-collaborate-for-planetary-change2",
    category: "corporate",
    client: "Tithing Tree",
    title: "Reel 1 Collaborate for Planetary Change2",
    blurb: "",
    role: "Edit", year: "2026",
    orientation: "portrait", accent: "#687c1b", w: 720, h: 1280, dur: "0:25"
  },
  {
    id: "m-312-tithing-tree-reel-2-harness-the-power",
    category: "corporate",
    client: "Tithing Tree",
    title: "Reel 2 Harness The Power",
    blurb: "",
    role: "Edit", year: "2026",
    orientation: "portrait", accent: "#bd9778", w: 720, h: 1280, dur: "0:31"
  },
  {
    id: "m-313-tithing-tree-vertical-video-seller-assists-customer-in-groce",
    category: "corporate",
    client: "Tithing Tree",
    title: "Video Seller Assists Customer in Grocery 12 17 04 39 25 Utc",
    blurb: "",
    role: "Edit", year: "2026",
    orientation: "portrait", accent: "#9b7152", w: 720, h: 1280, dur: "0:20"
  },
  {
    id: "m-314-tithing-tree-reel-2-unity-in-action",
    category: "corporate",
    client: "Tithing Tree",
    title: "Reel 2 Unity in Action",
    blurb: "",
    role: "Edit", year: "2026",
    orientation: "portrait", accent: "#836f44", w: 720, h: 1280, dur: "0:45"
  },
  {
    id: "m-315-tithing-tree-reel-1-be-the-change",
    category: "corporate",
    client: "Tithing Tree",
    title: "Reel 1 Be The Change",
    blurb: "",
    role: "Edit", year: "2026",
    orientation: "portrait", accent: "#4f4f2c", w: 720, h: 1280, dur: "0:43"
  },
  {
    id: "m-316-tithing-tree-tithing-tree-pt-2-reel",
    category: "corporate",
    client: "Tithing Tree",
    title: "Tithing Tree reel 2",
    blurb: "",
    role: "Edit", year: "2026",
    orientation: "portrait", accent: "#8b735f", w: 720, h: 1280, dur: "0:45"
  },
  {
    id: "m-328-pbcmss-sbrit-reel-2-education-without-judgment-final",
    category: "nonprofit",
    client: "PBCMSS",
    title: "Reel 2 Education Without Judgment",
    blurb: "",
    role: "Edit", year: "2026",
    orientation: "portrait", accent: "#889fad", w: 720, h: 1280, dur: "1:00"
  },
  {
    id: "m-329-pbcmss-sbrit-reel-1-schools-can-help-final",
    category: "nonprofit",
    client: "PBCMSS",
    title: "Reel 1 Schools Can Help",
    blurb: "",
    role: "Edit", year: "2026",
    orientation: "portrait", accent: "#8b9d99", w: 720, h: 1280, dur: "0:44"
  },
  {
    id: "m-330-pbcmss-sbrit-reel-3-training-lowers-stigma",
    category: "nonprofit",
    client: "PBCMSS",
    title: "Reel 3 Training Lowers Stigma (2)",
    blurb: "",
    role: "Edit", year: "2026",
    orientation: "portrait", accent: "#093855", w: 720, h: 1280, dur: "0:39"
  },
  {
    id: "m-331-pbcmss-sbrit-reel-2-stigma-starts-at-the-front-desk",
    category: "nonprofit",
    client: "PBCMSS",
    title: "Reel 2 Stigma Starts At The Front Desk (2)",
    blurb: "",
    role: "Edit", year: "2026",
    orientation: "portrait", accent: "#768782", w: 720, h: 1280, dur: "0:46"
  },
  {
    id: "m-332-pbcmss-sbrit-reel-1-stigma-is-measurable",
    category: "nonprofit",
    client: "PBCMSS",
    title: "Reel 1 Stigma Is Measurable (2)",
    blurb: "",
    role: "Edit", year: "2026",
    orientation: "portrait", accent: "#0453f5", w: 720, h: 1280, dur: "0:44"
  },
  {
    id: "m-333-pbcmss-sbrit-reel-3-fear-of-the-unknown",
    category: "nonprofit",
    client: "PBCMSS",
    title: "Reel 3 Fear Of The Unknown (2)",
    blurb: "",
    role: "Edit", year: "2026",
    orientation: "portrait", accent: "#0c63f4", w: 720, h: 1280, dur: "0:52"
  },
  {
    id: "m-336-we-just-met-2",
    category: "podcast",
    client: "We Just Met",
    title: "We Just Met reel 1",
    blurb: "",
    role: "Edit", year: "2025",
    orientation: "portrait", accent: "#7d583d", w: 720, h: 1280, dur: "0:45"
  },
  {
    id: "m-341-khs-showcase-nonprofit-and-pr-khs-showcase-v6-with-sound",
    category: "nonprofit",
    client: "Khanna House Studios",
    title: "KHS Showcase With Sound (2)",
    blurb: "",
    role: "Edit", year: "2026",
    orientation: "landscape", accent: "#b78a7b", w: 1280, h: 720, dur: "1:00"
  },
  {
    id: "m-352-dr-ann-10",
    category: "social",
    client: "Dr. Ann",
    title: "Dr. Ann reel 1",
    blurb: "",
    role: "Edit", year: "2026",
    orientation: "portrait", accent: "#a37459", w: 720, h: 1280, dur: "0:36"
  },
  {
    id: "m-353-dr-ann-9",
    category: "social",
    client: "Dr. Ann",
    title: "Dr. Ann reel 2",
    blurb: "",
    role: "Edit", year: "2026",
    orientation: "portrait", accent: "#a2745b", w: 720, h: 1280, dur: "0:42"
  },
  {
    id: "m-355-dr-ann-7",
    category: "social",
    client: "Dr. Ann",
    title: "Dr. Ann reel 4",
    blurb: "",
    role: "Edit", year: "2026",
    orientation: "portrait", accent: "#af8168", w: 720, h: 1280, dur: "0:31"
  },
  {
    id: "m-356-dr-ann-6",
    category: "social",
    client: "Dr. Ann",
    title: "Dr. Ann reel 5",
    blurb: "",
    role: "Edit", year: "2026",
    orientation: "portrait", accent: "#aa7e65", w: 720, h: 1280, dur: "0:54"
  },
  {
    id: "m-357-dr-ann-5",
    category: "social",
    client: "Dr. Ann",
    title: "Dr. Ann reel 6",
    blurb: "",
    role: "Edit", year: "2026",
    orientation: "portrait", accent: "#a07258", w: 720, h: 1280, dur: "1:01"
  },
  {
    id: "m-358-dr-ann-4",
    category: "social",
    client: "Dr. Ann",
    title: "Dr. Ann reel 7",
    blurb: "",
    role: "Edit", year: "2026",
    orientation: "portrait", accent: "#9c715a", w: 720, h: 1280, dur: "1:06"
  },
  {
    id: "m-359-dr-ann-3",
    category: "social",
    client: "Dr. Ann",
    title: "Dr. Ann reel 8",
    blurb: "",
    role: "Edit", year: "2026",
    orientation: "portrait", accent: "#a1745b", w: 720, h: 1280, dur: "1:25"
  },
  {
    id: "m-361-dr-ann-1",
    category: "social",
    client: "Dr. Ann",
    title: "Dr. Ann reel 10",
    blurb: "",
    role: "Edit", year: "2026",
    orientation: "portrait", accent: "#a3765b", w: 720, h: 1280, dur: "0:49"
  },
  {
    id: "m-362-dr-ann-04",
    category: "social",
    client: "Dr. Ann",
    title: "Dr. Ann reel 11",
    blurb: "",
    role: "Edit", year: "2026",
    orientation: "portrait", accent: "#966c60", w: 720, h: 1280, dur: "0:24"
  },
  {
    id: "m-363-dr-ann-03",
    category: "social",
    client: "Dr. Ann",
    title: "Dr. Ann reel 12",
    blurb: "",
    role: "Edit", year: "2026",
    orientation: "portrait", accent: "#a66b58", w: 720, h: 1280, dur: "0:23"
  },
  {
    id: "m-366-sojourners-sheila-palacios-for-capcut",
    category: "interviews",
    client: "Sojourners",
    title: "Sheila Palacios",
    blurb: "",
    role: "Edit", year: "2026",
    orientation: "portrait", accent: "#786159", w: 606, h: 1080, dur: "1:08"
  },
  {
    id: "m-367-sojourners-linda-long-for-cap-cut",
    category: "interviews",
    client: "Sojourners",
    title: "Linda Long",
    blurb: "",
    role: "Edit", year: "2026",
    orientation: "portrait", accent: "#ab8e77", w: 606, h: 1080, dur: "1:44"
  },
  {
    id: "m-368-cattle-car-vid-bear-witness-v3d-hope-1080p",
    category: "nonprofit",
    client: "Cattle Car Project",
    title: "Bear Witness Hope",
    blurb: "",
    role: "Edit", year: "2026",
    orientation: "landscape", accent: "#42424b", w: 1280, h: 720, dur: "3:52"
  },
  {
    id: "m-375-ceo-discovery-for-cap-3",
    category: "corporate",
    client: "CEO Discovery",
    title: "CEO Discovery reel 1",
    blurb: "",
    role: "Edit", year: "2026",
    orientation: "landscape", accent: "#48363f", w: 1280, h: 720, dur: "0:37"
  },
  {
    id: "m-377-ceo-discovery-for-cap",
    category: "corporate",
    client: "CEO Discovery",
    title: "CEO Discovery reel 3",
    blurb: "",
    role: "Edit", year: "2026",
    orientation: "landscape", accent: "#9f7b75", w: 1280, h: 720, dur: "0:38"
  },
  {
    id: "m-378-ceo-discovery-option-2-v03",
    category: "corporate",
    client: "CEO Discovery",
    title: "CEO Discovery reel 4",
    blurb: "",
    role: "Edit", year: "2026",
    orientation: "portrait", accent: "#a56f5c", w: 720, h: 1280, dur: "1:19"
  },
  {
    id: "m-379-ceo-discovery-option-1-v03",
    category: "corporate",
    client: "CEO Discovery",
    title: "CEO Discovery reel 5",
    blurb: "",
    role: "Edit", year: "2026",
    orientation: "landscape", accent: "#715356", w: 1280, h: 720, dur: "0:34"
  },
  {
    id: "m-380-ceo-discovery-why-employed-executives-join-ceod-fix",
    category: "corporate",
    client: "CEO Discovery",
    title: "Why Employed Executives Join Ceod",
    blurb: "",
    role: "Edit", year: "2026",
    orientation: "landscape", accent: "#403940", w: 1280, h: 720, dur: "0:49"
  },
  {
    id: "m-381-ceo-discovery-deal-due-diligence",
    category: "corporate",
    client: "CEO Discovery",
    title: "Deal Due Diligence",
    blurb: "",
    role: "Edit", year: "2026",
    orientation: "landscape", accent: "#39303e", w: 1280, h: 720, dur: "1:19"
  },
  {
    id: "m-386-whole-you-before-two-wybt-promo-1-v02",
    category: "social",
    client: "WYBT",
    title: "WYBT reel 1",
    blurb: "",
    role: "Edit", year: "2026",
    orientation: "landscape", accent: "#903e66", w: 1280, h: 720, dur: "2:12"
  },
  {
    id: "m-387-whole-you-before-two-promo-4-v1",
    category: "social",
    client: "WYBT",
    title: "WYBT reel 2",
    blurb: "",
    role: "Edit", year: "2026",
    orientation: "landscape", accent: "#765b5e", w: 1280, h: 720, dur: "2:04"
  },
  {
    id: "m-388-whole-you-before-two-wybt-promo-4",
    category: "social",
    client: "WYBT",
    title: "WYBT reel 3",
    blurb: "",
    role: "Edit", year: "2026",
    orientation: "landscape", accent: "#ab5d66", w: 1280, h: 720, dur: "0:50"
  },
  {
    id: "m-389-whole-you-before-two-promo-2-35-sec-v1",
    category: "social",
    client: "WYBT",
    title: "Promo 2 35 Sec",
    blurb: "",
    role: "Edit", year: "2026",
    orientation: "landscape", accent: "#7c6469", w: 1280, h: 720, dur: "0:36"
  },
  {
    id: "m-390-whole-you-before-two-week-8",
    category: "social",
    client: "WYBT",
    title: "WYBT reel 4",
    blurb: "",
    role: "Edit", year: "2026",
    orientation: "landscape", accent: "#7f6769", w: 1280, h: 720, dur: "0:52"
  },
  {
    id: "m-400-dr-shaw-reels-14-rev",
    category: "social",
    client: "Dr. Shaw",
    title: "Dr. Shaw reel 1",
    blurb: "",
    role: "Edit", year: "2026",
    orientation: "portrait", accent: "#6e4c51", w: 720, h: 1280, dur: "0:30"
  },
  {
    id: "m-402-dr-shaw-reels-13",
    category: "social",
    client: "Dr. Shaw",
    title: "Dr. Shaw reel 3",
    blurb: "",
    role: "Edit", year: "2026",
    orientation: "portrait", accent: "#6d4c52", w: 720, h: 1280, dur: "1:16"
  },
  {
    id: "m-404-dr-shaw-reels-11",
    category: "social",
    client: "Dr. Shaw",
    title: "Dr. Shaw reel 5",
    blurb: "",
    role: "Edit", year: "2026",
    orientation: "portrait", accent: "#694b50", w: 720, h: 1280, dur: "0:46"
  },
  {
    id: "m-409-dr-shaw-reels-3",
    category: "social",
    client: "Dr. Shaw",
    title: "Dr. Shaw reel 10",
    blurb: "",
    role: "Edit", year: "2026",
    orientation: "portrait", accent: "#64474d", w: 720, h: 1280, dur: "0:50"
  },
  {
    id: "m-410-dr-shaw-reels-2",
    category: "social",
    client: "Dr. Shaw",
    title: "Dr. Shaw reel 11",
    blurb: "",
    role: "Edit", year: "2026",
    orientation: "portrait", accent: "#704e53", w: 720, h: 1280, dur: "0:55"
  },
  {
    id: "m-411-dr-shaw-reels-1",
    category: "social",
    client: "Dr. Shaw",
    title: "Dr. Shaw reel 12",
    blurb: "",
    role: "Edit", year: "2026",
    orientation: "portrait", accent: "#65464a", w: 720, h: 1280, dur: "1:12"
  },
  {
    id: "m-412-dr-shaw-15",
    category: "social",
    client: "Dr. Shaw",
    title: "Dr. Shaw reel 13",
    blurb: "",
    role: "Edit", year: "2025",
    orientation: "portrait", accent: "#a78287", w: 720, h: 1280, dur: "0:27"
  },
  {
    id: "m-413-dr-shaw-11",
    category: "social",
    client: "Dr. Shaw",
    title: "Dr. Shaw reel 14",
    blurb: "",
    role: "Edit", year: "2025",
    orientation: "portrait", accent: "#a98387", w: 720, h: 1280, dur: "1:25"
  },
  {
    id: "m-421-yvania-yvania-module9-1080p-final",
    category: "corporate",
    client: "Yvania",
    title: "Yvania reel 1 (excerpt)",
    blurb: "Excerpt from a longer piece.",
    role: "Edit", year: "2026",
    orientation: "landscape", accent: "#60514b", w: 1280, h: 720, dur: "1:30"
  },
  {
    id: "m-440-childrens-services-council-csc-ep-2-revised",
    category: "podcast",
    client: "Children's Services Council",
    title: "Children's Services Council reel 1 (excerpt)",
    blurb: "Excerpt from a longer piece.",
    role: "Edit", year: "2026",
    orientation: "landscape", accent: "#683f3d", w: 1280, h: 720, dur: "1:30"
  },
  {
    id: "m-442-childrens-services-council-csc-ep-2",
    category: "podcast",
    client: "Children's Services Council",
    title: "Children's Services Council reel 3 (excerpt)",
    blurb: "Excerpt from a longer piece.",
    role: "Edit", year: "2025",
    orientation: "landscape", accent: "#8e8583", w: 1280, h: 720, dur: "1:30"
  },
  {
    id: "m-445-people-of-purpose-wims-2026-recap-v3-9x16",
    category: "nonprofit",
    client: "People of Purpose",
    title: "People of Purpose reel 1",
    blurb: "",
    role: "Edit", year: "2026",
    orientation: "portrait", accent: "#675b4a", w: 720, h: 1280, dur: "0:49"
  },
  {
    id: "m-446-people-of-purpose-wims-2026-recap-v3-16x9",
    category: "nonprofit",
    client: "People of Purpose",
    title: "People of Purpose reel 2",
    blurb: "",
    role: "Edit", year: "2026",
    orientation: "landscape", accent: "#5d4a3a", w: 1280, h: 720, dur: "0:49"
  },
  {
    id: "m-447-people-of-purpose-wims-2026-recap-v2",
    category: "nonprofit",
    client: "People of Purpose",
    title: "People of Purpose reel 3",
    blurb: "",
    role: "Edit", year: "2026",
    orientation: "landscape", accent: "#a8a694", w: 1280, h: 720, dur: "1:24"
  },
  {
    id: "m-448-people-of-purpose-pop-mute-slideshow-video",
    category: "nonprofit",
    client: "People of Purpose",
    title: "Pop Mute Slideshow Video (excerpt)",
    blurb: "Excerpt from a longer piece.",
    role: "Edit", year: "2025",
    orientation: "landscape", accent: "#7f6353", w: 1280, h: 720, dur: "1:30"
  },
  {
    id: "m-450-people-of-purpose-william-slideshow",
    category: "nonprofit",
    client: "People of Purpose",
    title: "William Slideshow (excerpt)",
    blurb: "Excerpt from a longer piece.",
    role: "Edit", year: "2025",
    orientation: "landscape", accent: "#807174", w: 1280, h: 720, dur: "1:30"
  },
  {
    id: "m-453-cch-crib-donation-video-cch-crib-donation",
    category: "nonprofit",
    client: "Clinics Can Help",
    title: "CCH Crib Donation",
    blurb: "",
    role: "Edit", year: "2026",
    orientation: "landscape", accent: "#82837b", w: 1280, h: 720, dur: "1:26"
  },
  {
    id: "m-455-365-wellness-reel-6-walk-in-edits",
    category: "social",
    client: "365 Wellness",
    title: "365 Wellness reel 1",
    blurb: "",
    role: "Edit", year: "2025",
    orientation: "portrait", accent: "#565a74", w: 720, h: 1280, dur: "0:28"
  },
  {
    id: "m-458-365-wellness-reel-4-captioned",
    category: "social",
    client: "365 Wellness",
    title: "365 Wellness reel 4",
    blurb: "",
    role: "Edit", year: "2025",
    orientation: "portrait", accent: "#9f765e", w: 720, h: 1280, dur: "1:14"
  },
  {
    id: "m-459-365-wellness-reel-1-captioned",
    category: "social",
    client: "365 Wellness",
    title: "365 Wellness reel 5",
    blurb: "",
    role: "Edit", year: "2025",
    orientation: "portrait", accent: "#9a654e", w: 720, h: 1280, dur: "0:58"
  },
  {
    id: "m-462-alz-recap-alz-recap-v3-master-1080p",
    category: "nonprofit",
    client: "Alzheimer's Walk",
    title: "ALZ Recap (2)",
    blurb: "",
    role: "Edit", year: "2026",
    orientation: "landscape", accent: "#825a76", w: 1280, h: 720, dur: "0:35"
  },
  {
    id: "m-463-alz-recap-alz-recap-v1-1080p",
    category: "nonprofit",
    client: "Alzheimer's Walk",
    title: "ALZ Recap (3)",
    blurb: "",
    role: "Edit", year: "2026",
    orientation: "landscape", accent: "#421d24", w: 1280, h: 720, dur: "0:40"
  },
  {
    id: "m-464-michele-poole-finishing-drag-show-final-part-3-of-3",
    category: "nonprofit",
    client: "Michele Poole",
    title: "Drag Show Part 3 of 3 (excerpt)",
    blurb: "Excerpt from a longer piece.",
    role: "Edit", year: "2026",
    orientation: "landscape", accent: "#6d4739", w: 480, h: 270, dur: "1:30"
  },
  {
    id: "m-465-michele-poole-finishing-drag-show-final-part-2-of-3",
    category: "nonprofit",
    client: "Michele Poole",
    title: "Drag Show Part 2 of 3 (excerpt)",
    blurb: "Excerpt from a longer piece.",
    role: "Edit", year: "2026",
    orientation: "landscape", accent: "#775a56", w: 480, h: 270, dur: "1:30"
  },
  {
    id: "m-466-michele-poole-finishing-drag-show-final-part-1-of-3",
    category: "nonprofit",
    client: "Michele Poole",
    title: "Drag Show Part 1 of 3 (excerpt)",
    blurb: "Excerpt from a longer piece.",
    role: "Edit", year: "2026",
    orientation: "landscape", accent: "#70533d", w: 480, h: 270, dur: "1:30"
  },
  {
    id: "m-467-sparked-jenel-for-parents-60sec-v01",
    category: "corporate",
    client: "Sparked",
    title: "For Parents 60sec",
    blurb: "",
    role: "Edit", year: "2026",
    orientation: "landscape", accent: "#5c6453", w: 1280, h: 720, dur: "1:24"
  },
  {
    id: "m-468-sparked-jenel-brand-story-v01-final",
    category: "corporate",
    client: "Sparked",
    title: "Brand Story",
    blurb: "",
    role: "Edit", year: "2026",
    orientation: "landscape", accent: "#a3a194", w: 1280, h: 720, dur: "2:57"
  },
  {
    id: "m-469-sparked-jenel-example-2",
    category: "corporate",
    client: "Sparked",
    title: "Sparked reel 1",
    blurb: "",
    role: "Edit", year: "2026",
    orientation: "landscape", accent: "#9f7760", w: 1280, h: 720, dur: "0:13"
  },
  {
    id: "m-470-clinics-can-help-cch-golf-reel-2",
    category: "nonprofit",
    client: "Clinics Can Help",
    title: "CCH Golf Reel 2",
    blurb: "",
    role: "Edit", year: "2025",
    orientation: "portrait", accent: "#845c47", w: 720, h: 1280, dur: "0:32"
  },
  {
    id: "m-471-clinics-can-help-luz-martinez-award-final-4k",
    category: "nonprofit",
    client: "Clinics Can Help",
    title: "Luz Martinez Award",
    blurb: "",
    role: "Edit", year: "2026",
    orientation: "landscape", accent: "#977960", w: 1280, h: 720, dur: "2:49"
  },
  {
    id: "m-472-clinics-can-help-cch-cribs-2026-v3",
    category: "nonprofit",
    client: "Clinics Can Help",
    title: "CCH Cribs",
    blurb: "",
    role: "Edit", year: "2026",
    orientation: "landscape", accent: "#9c9282", w: 1280, h: 720, dur: "2:36"
  },
  {
    id: "m-473-mark-final-comp-1",
    category: "social",
    client: "Mark",
    title: "Mark reel 1",
    blurb: "",
    role: "Edit", year: "2026",
    orientation: "landscape", accent: "#050606", w: 1280, h: 720, dur: "1:00"
  },
  {
    id: "m-474-mark-02-gym-floor-talking-neon-lights",
    category: "social",
    client: "Mark",
    title: "02 Gym Floor Talking Neon Lights (excerpt)",
    blurb: "Excerpt from a longer piece.",
    role: "Edit", year: "2026",
    orientation: "landscape", accent: "#bc4247", w: 1280, h: 720, dur: "1:30"
  },
  {
    id: "m-478-masterclass-unprecedented-masterclass-with-music",
    category: "corporate",
    client: "Unprecedented Masterclass",
    title: "With Music (excerpt)",
    blurb: "Excerpt from a longer piece.",
    role: "Edit", year: "2026",
    orientation: "landscape", accent: "#735d51", w: 1280, h: 720, dur: "1:30"
  },
  {
    id: "m-480-masterclass-masterclass-be-unprecedented-v2-1080p",
    category: "corporate",
    client: "Unprecedented Masterclass",
    title: "Unprecedented Masterclass reel 2 (excerpt)",
    blurb: "Excerpt from a longer piece.",
    role: "Edit", year: "2026",
    orientation: "landscape", accent: "#68554b", w: 1280, h: 720, dur: "1:30"
  },
  {
    id: "m-481-masterclass-masterclass-be-unprecedented-1080p-auphonic-audi",
    category: "corporate",
    client: "Unprecedented Masterclass",
    title: "Unprecedented Masterclass reel 3 (excerpt)",
    blurb: "Excerpt from a longer piece.",
    role: "Edit", year: "2026",
    orientation: "landscape", accent: "#645147", w: 1280, h: 720, dur: "1:30"
  },
  {
    id: "m-482-60-secs-samiyah-5",
    category: "interviews",
    client: "60 Seconds",
    title: "60 Seconds reel 1",
    blurb: "",
    role: "Edit", year: "2026",
    orientation: "portrait", accent: "#cc3437", w: 720, h: 1280, dur: "0:30"
  },
  {
    id: "m-483-60-secs-suzanne-spencer-ed-d-4",
    category: "interviews",
    client: "60 Seconds",
    title: "60 Seconds reel 2",
    blurb: "",
    role: "Edit", year: "2026",
    orientation: "portrait", accent: "#a77b69", w: 720, h: 1280, dur: "0:30"
  },
  {
    id: "m-484-60-secs-lara-pinheiro-3",
    category: "interviews",
    client: "60 Seconds",
    title: "Lara Pinheiro 3",
    blurb: "",
    role: "Edit", year: "2026",
    orientation: "portrait", accent: "#7a646a", w: 720, h: 1280, dur: "0:31"
  },
  {
    id: "m-485-60-secs-kayla-irby-1",
    category: "interviews",
    client: "60 Seconds",
    title: "Kayla Irby 1",
    blurb: "",
    role: "Edit", year: "2026",
    orientation: "portrait", accent: "#a97861", w: 720, h: 1280, dur: "0:28"
  },
  {
    id: "m-486-60-secs-teresa-bairos-2",
    category: "interviews",
    client: "60 Seconds",
    title: "Teresa Bairos 2",
    blurb: "",
    role: "Edit", year: "2026",
    orientation: "portrait", accent: "#ea616d", w: 720, h: 1280, dur: "0:24"
  },
  {
    id: "m-489-jenilee-lash-1",
    category: "social",
    client: "Jenilee Lash",
    title: "Jenilee Lash reel 1",
    blurb: "",
    role: "Edit", year: "2026",
    orientation: "portrait", accent: "#8a5943", w: 720, h: 1280, dur: "0:54"
  },
  {
    id: "m-490-promisefund-beginning-speeches",
    category: "nonprofit",
    client: "Promisefund",
    title: "Beginning Speeches",
    blurb: "",
    role: "Edit", year: "2026",
    orientation: "landscape", accent: "#5f4450", w: 1280, h: 720, dur: "2:44"
  },
  {
    id: "m-491-promisefund-light-room",
    category: "nonprofit",
    client: "Promisefund",
    title: "Light Room (excerpt)",
    blurb: "Excerpt from a longer piece.",
    role: "Edit", year: "2026",
    orientation: "landscape", accent: "#9736b3", w: 1280, h: 720, dur: "1:30"
  },
  {
    id: "m-492-childrens-harbor-harbor-classic-v1",
    category: "nonprofit",
    client: "Children's Harbor",
    title: "Children's Harbor reel 1",
    blurb: "",
    role: "Edit", year: "2025",
    orientation: "landscape", accent: "#6a918f", w: 1280, h: 720, dur: "2:45"
  },
  {
    id: "m-493-julie-digital-bus-card-example-virtual-business-card-example",
    category: "motion",
    client: "Khanna House Studios",
    title: "Virtual Business Card Example Full",
    blurb: "",
    role: "Edit", year: "2025",
    orientation: "landscape", accent: "#4a3f3f", w: 1280, h: 720, dur: "0:35"
  },
  {
    id: "m-495-faby-diallo-0224-2",
    category: "social",
    client: "Faby Diallo",
    title: "Faby Diallo reel 1 (excerpt)",
    blurb: "Excerpt from a longer piece.",
    role: "Edit", year: "2025",
    orientation: "landscape", accent: "#4f5661", w: 1280, h: 720, dur: "1:30"
  },
  {
    id: "m-496-elite-c01555",
    category: "social",
    client: "Elite Oral Surgery",
    title: "Elite Oral Surgery reel 1",
    blurb: "",
    role: "Edit", year: "2025",
    orientation: "landscape", accent: "#a3845b", w: 1280, h: 720, dur: "0:39"
  },
  {
    id: "m-497-cch-hot-day-crib-cch-crib-2",
    category: "nonprofit",
    client: "Clinics Can Help",
    title: "CCH Crib 2",
    blurb: "",
    role: "Edit", year: "2026",
    orientation: "landscape", accent: "#736e7a", w: 1280, h: 720, dur: "0:57"
  },
  // ---- R2 END ----
];

const CATEGORIES = [
  { id: "all", label: "All Work" },
  { id: "podcast", label: "Podcast & Talk Show" },
  { id: "corporate", label: "Corporate & Brand" },
  { id: "nonprofit", label: "Nonprofit & Events" },
  { id: "interviews", label: "Interviews" },
  { id: "motion", label: "Motion Graphics" },
  { id: "social", label: "Branded Social" }
];
