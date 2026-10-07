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
