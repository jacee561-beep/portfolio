// Portfolio content manifest — edit this to add/remove/reorder work.
const REELS = [
  // ---- Podcast & Talk Show ----
  {
    id: "nrg-manifold-highlight",
    category: "podcast",
    client: "NRG Podcast",
    title: "Manifold — Highlight Reel",
    blurb: "Auto-captioned, speaker-tracked highlight cut from the Manifold episode.",
    orientation: "portrait"
  },
  {
    id: "nrg-manifold-reel",
    category: "podcast",
    client: "NRG Podcast",
    title: "Manifold — Speaker Reel",
    blurb: "Multi-camera speaker tracking with animated captions.",
    orientation: "portrait"
  },
  {
    id: "nrg-ep7",
    category: "podcast",
    client: "NRG Podcast",
    title: "Episode 7 — Reel Cut",
    blurb: "Story-driven highlight pulled from a 90-minute episode.",
    orientation: "portrait"
  },
  {
    id: "nrg-ep8",
    category: "podcast",
    client: "NRG Podcast",
    title: "Episode 8 — Reel Cut",
    blurb: "Full-length highlight reel with clean pacing and captions.",
    orientation: "portrait"
  },
  {
    id: "nrg-ep9",
    category: "podcast",
    client: "NRG Podcast",
    title: "Episode 9 — Reel Cut",
    blurb: "Two-speaker episode, cut for the strongest story beat.",
    orientation: "portrait"
  },
  {
    id: "nrg-ep10",
    category: "podcast",
    client: "NRG Podcast",
    title: "Episode 10 — Reel Cut",
    blurb: "Sentence-aligned highlight clip, ready for social.",
    orientation: "portrait"
  },
  {
    id: "nrg-ep11",
    category: "podcast",
    client: "NRG Podcast",
    title: "Episode 11 — Reel Cut",
    blurb: "Punch-in zooms timed to the speaker's cadence.",
    orientation: "portrait"
  },
  {
    id: "cwk-intro",
    category: "podcast",
    client: "Coffee with Kelly",
    title: "Show Open",
    blurb: "Title sequence and intro package for the show.",
    orientation: "landscape"
  },
  {
    id: "cwk-reel",
    category: "podcast",
    client: "Coffee with Kelly",
    title: "Episode Highlight",
    blurb: "Landscape highlight cut for cross-platform posting.",
    orientation: "landscape"
  },
  {
    id: "eqb2b-ep2",
    category: "podcast",
    client: "EQB2B",
    title: "Episode 2 — Reel Cut",
    blurb: "Branded podcast highlight reel with logo treatment.",
    orientation: "portrait"
  },
  {
    id: "dr-shaw-1",
    category: "podcast",
    client: "Dr. Shaw",
    title: "Show Reel",
    blurb: "Interview-style talk segment cut for social.",
    orientation: "portrait"
  },
  {
    id: "wjm-pizza",
    category: "podcast",
    client: "We Just Met",
    title: "Pizza Date — Reel Cut",
    blurb: "Dating-show episode highlight, cut for pacing and punchlines.",
    orientation: "portrait"
  },

  // ---- Corporate & Brand ----
  {
    id: "ceod-what-is-ceod",
    category: "corporate",
    client: "CEO Discovery",
    title: "What Is CEOD",
    blurb: "Corporate explainer piece for a private-equity talent platform.",
    orientation: "portrait"
  },

  // ---- Nonprofit & Events ----
  {
    id: "sojourners-denise",
    category: "nonprofit",
    client: "Sojourners",
    title: "Testimonial Reel — Denise Williams",
    blurb: "Personal-story testimonial cut for a nonprofit fundraising campaign.",
    orientation: "portrait"
  },
  {
    id: "childrens-harbor-reel1",
    category: "nonprofit",
    client: "Children's Harbor",
    title: "Harbor Classic — Event Reel",
    blurb: "Golf-classic fundraiser highlight reel.",
    orientation: "portrait"
  },
  {
    id: "cch-golf-reel1",
    category: "nonprofit",
    client: "Clinics Can Help",
    title: "Golf Tournament — Reel 1",
    blurb: "4K event coverage cut down into a shareable highlight.",
    orientation: "portrait"
  },
  {
    id: "literacy-coalition-recap",
    category: "nonprofit",
    client: "Literacy Coalition",
    title: "Author Talk Series — Recap",
    blurb: "Event recap for a nonprofit speaker series.",
    orientation: "portrait"
  },
  {
    id: "od2a-webinar-titles",
    category: "nonprofit",
    client: "OD2A Webinar Series",
    title: "Webinar Title System",
    blurb: "Per-organisation intro and lower-third package for a three-part public-health webinar series.",
    orientation: "landscape"
  },

  // ---- Interviews ----
  {
    id: "patricia-heaton",
    category: "interviews",
    client: "ITE Gala",
    title: "Patricia Heaton — Interview",
    blurb: "Red-carpet-style interview coverage from a gala event.",
    orientation: "landscape"
  },
  {
    id: "ite-gala-interview1",
    category: "interviews",
    client: "ITE Gala",
    title: "Guest Interview",
    blurb: "4K multi-cam interview coverage from a nonprofit gala.",
    orientation: "landscape"
  },

  // ---- Motion Graphics & Animation ----
  {
    id: "insight-logo-animation",
    category: "motion",
    client: "Insight",
    title: "Logo Animation",
    blurb: "Custom brand logo reveal animation.",
    orientation: "landscape"
  },
  {
    id: "khs-logo-intro",
    category: "motion",
    client: "Khanna House Studios",
    title: "Studio Logo Bumper",
    blurb: "Motion logo bumper used to open his own studio's work.",
    orientation: "landscape"
  },
  {
    id: "polo-recap-ae",
    category: "motion",
    client: "Polo Media Day",
    title: "Recap Graphic",
    blurb: "After Effects motion graphic built for an event recap sequence.",
    orientation: "landscape"
  },
  {
    id: "wellness-lower-third",
    category: "motion",
    client: "365 Wellness",
    title: "Lower Third — Consulting",
    blurb: "Animated lower-third graphic package for a medical explainer series.",
    orientation: "landscape"
  },
  {
    id: "cryptorubik-orb",
    category: "motion",
    client: "Self-Directed",
    title: "Cryptorubik — Orb",
    blurb: "Spec concept spot: iridescent 3D orb, glitch transitions, and an animated brand mark.",
    orientation: "landscape"
  },
  {
    id: "cryptorubik-spot",
    category: "motion",
    client: "Self-Directed",
    title: "Cryptorubik — Concept Spot",
    blurb: "Spec piece built around a Y2K interface pastiche, halftone selector and live price counter.",
    orientation: "landscape"
  },
  {
    id: "cryptorubik-market",
    category: "motion",
    client: "Self-Directed",
    title: "Cryptorubik — Market",
    blurb: "Spec animated market chart built on a curved CRT with scanlines and bloom.",
    orientation: "landscape"
  },
  {
    id: "vaporwave-collage",
    category: "motion",
    client: "Self-Directed",
    title: "Vaporwave Collage",
    blurb: "Spec piece mixing 3D objects and cut-out collage over scanline plates.",
    orientation: "landscape"
  },
  {
    id: "cryptorubik-cube",
    category: "motion",
    client: "Self-Directed",
    title: "Cryptorubik — Cube",
    blurb: "Spec 3D piece modelled and animated in Blender, finished in After Effects.",
    orientation: "portrait"
  },

  // ---- Branded Social ----
  {
    id: "dr-ann-1",
    category: "social",
    client: "Dr. Ann",
    title: "Social Short",
    blurb: "Vertical branded short with motion captions.",
    orientation: "portrait"
  },
  {
    id: "dr-ann-2",
    category: "social",
    client: "Dr. Ann",
    title: "Social Short II",
    blurb: "Vertical branded short, alternate cut.",
    orientation: "portrait"
  },
  {
    id: "wellness-reel2",
    category: "social",
    client: "365 Wellness",
    title: "Branded Reel",
    blurb: "Vertical social reel for a medical wellness brand.",
    orientation: "portrait"
  },
  {
    id: "vertical-caption-reel",
    category: "social",
    client: "Private Client",
    title: "Vertical Reel — Animated Captions",
    blurb: "Hook-first vertical cut with word-by-word animated captions, from a fourteen-reel run.",
    orientation: "portrait"
  },

  // ==== Additional catalog (full drive scan) ====
{
    id: "nrg-ep1-hazel",
    category: "podcast",
    client: "NRG Podcast",
    title: "Episode 1 (Hazel) — Reel Cut",
    blurb: "Highlight reel cut from the Hazel episode.",
    orientation: "portrait"
  },
  {
    id: "nrg-ep2-mike",
    category: "podcast",
    client: "NRG Podcast",
    title: "Episode 2 (Mike) — Reel Cut",
    blurb: "Highlight reel cut from the Mike episode.",
    orientation: "portrait"
  },
  {
    id: "nrg-ep4-mathilde",
    category: "podcast",
    client: "NRG Podcast",
    title: "Episode 4 (Mathilde) — Reel Cut",
    blurb: "Highlight reel cut from the Mathilde episode.",
    orientation: "portrait"
  },
  {
    id: "nrg-ep5-scott",
    category: "podcast",
    client: "NRG Podcast",
    title: "Episode 5 (Scott) — Reel Cut",
    blurb: "Highlight reel cut from the Scott episode.",
    orientation: "portrait"
  },
  {
    id: "nrg-ep6-tony",
    category: "podcast",
    client: "NRG Podcast",
    title: "Episode 6 (Tony) — Reel Cut",
    blurb: "Highlight reel cut from the Tony episode.",
    orientation: "portrait"
  },
  {
    id: "nrg-ep7-b",
    category: "podcast",
    client: "NRG Podcast",
    title: "Episode 7 — Reel Cut II",
    blurb: "A second highlight pulled from the same episode.",
    orientation: "portrait"
  },
  {
    id: "nrg-ep8-b",
    category: "podcast",
    client: "NRG Podcast",
    title: "Episode 8 — Reel Cut II",
    blurb: "A second highlight pulled from the same episode.",
    orientation: "portrait"
  },
  {
    id: "nrg-ep9-b",
    category: "podcast",
    client: "NRG Podcast",
    title: "Episode 9 — Reel Cut II",
    blurb: "A second highlight pulled from the same episode.",
    orientation: "portrait"
  },
  {
    id: "nrg-ep10-b",
    category: "podcast",
    client: "NRG Podcast",
    title: "Episode 10 — Reel Cut II",
    blurb: "A second highlight pulled from the same episode.",
    orientation: "portrait"
  },
  {
    id: "nrg-ep11-b",
    category: "podcast",
    client: "NRG Podcast",
    title: "Episode 11 — Reel Cut II",
    blurb: "A second highlight pulled from the same episode.",
    orientation: "portrait"
  },
  {
    id: "cwk-solo-1",
    category: "podcast",
    client: "Coffee with Kelly",
    title: "Solo — You Cannot Grow and Stay Comfortable",
    blurb: "Solo-format episode segment cut for social.",
    orientation: "portrait"
  },
  {
    id: "cwk-solo-2",
    category: "podcast",
    client: "Coffee with Kelly",
    title: "Solo — Courage Shows Up After You Act",
    blurb: "Solo-format episode segment cut for social.",
    orientation: "portrait"
  },
  {
    id: "cwk-solo-3",
    category: "podcast",
    client: "Coffee with Kelly",
    title: "Solo — AI Isn't Your Biggest Problem",
    blurb: "Solo-format episode segment cut for social.",
    orientation: "portrait"
  },
  {
    id: "cwk-debbie-1",
    category: "podcast",
    client: "Coffee with Kelly",
    title: "Guest Episode — Debbie, Clip 1",
    blurb: "Guest-episode highlight cut for social.",
    orientation: "portrait"
  },
  {
    id: "cwk-debbie-2",
    category: "podcast",
    client: "Coffee with Kelly",
    title: "Guest Episode — Debbie, Clip 2",
    blurb: "Guest-episode highlight cut for social.",
    orientation: "portrait"
  },
  {
    id: "cwk-debbie-3",
    category: "podcast",
    client: "Coffee with Kelly",
    title: "Guest Episode — Debbie, Clip 3",
    blurb: "Guest-episode highlight cut for social.",
    orientation: "portrait"
  },
  {
    id: "cwk-ep1-5-a",
    category: "podcast",
    client: "Coffee with Kelly",
    title: "Episode 1.5 — Reel 1",
    blurb: "Episode highlight reel cut for social.",
    orientation: "portrait"
  },
  {
    id: "cwk-ep1-5-b",
    category: "podcast",
    client: "Coffee with Kelly",
    title: "Episode 1.5 — Reel 2",
    blurb: "Episode highlight reel cut for social.",
    orientation: "portrait"
  },
  {
    id: "cwk-ep2-a",
    category: "podcast",
    client: "Coffee with Kelly",
    title: "Episode 2 — Reel 1",
    blurb: "Episode highlight reel cut for social.",
    orientation: "portrait"
  },
  {
    id: "cwk-ep2-b",
    category: "podcast",
    client: "Coffee with Kelly",
    title: "Episode 2 — Reel 2",
    blurb: "Episode highlight reel cut for social.",
    orientation: "portrait"
  },
  {
    id: "cwk-ep3-a",
    category: "podcast",
    client: "Coffee with Kelly",
    title: "Episode 3 — Reel 1",
    blurb: "Episode highlight reel cut for social.",
    orientation: "portrait"
  },
  {
    id: "cwk-ep3-b",
    category: "podcast",
    client: "Coffee with Kelly",
    title: "Episode 3 — Reel 2",
    blurb: "Episode highlight reel cut for social.",
    orientation: "portrait"
  },
  {
    id: "cwk-ep5-a",
    category: "podcast",
    client: "Coffee with Kelly",
    title: "Episode 5 — Reel 1",
    blurb: "Episode highlight reel cut for social.",
    orientation: "portrait"
  },
  {
    id: "cwk-ep5-b",
    category: "podcast",
    client: "Coffee with Kelly",
    title: "Episode 5 — Reel 2",
    blurb: "Episode highlight reel cut for social.",
    orientation: "portrait"
  },
  {
    id: "cwk-ep6-a",
    category: "podcast",
    client: "Coffee with Kelly",
    title: "Episode 6 — Clip 1",
    blurb: "Episode highlight reel cut for social.",
    orientation: "portrait"
  },
  {
    id: "cwk-ep6-b",
    category: "podcast",
    client: "Coffee with Kelly",
    title: "Episode 6 — Clip 2",
    blurb: "Episode highlight reel cut for social.",
    orientation: "portrait"
  },
  {
    id: "cwk-ep6-c",
    category: "podcast",
    client: "Coffee with Kelly",
    title: "Episode 6 — Clip 3",
    blurb: "Episode highlight reel cut for social.",
    orientation: "portrait"
  },
  {
    id: "cwk-promo",
    category: "podcast",
    client: "Coffee with Kelly",
    title: "Show Promo Teaser",
    blurb: "Teaser cut used to promote the show.",
    orientation: "portrait"
  },
  {
    id: "eqb2b-ep2-b",
    category: "podcast",
    client: "EQB2B",
    title: "Episode 2 — Reel Cut II",
    blurb: "Branded podcast highlight reel with logo treatment.",
    orientation: "portrait"
  },
  {
    id: "eqb2b-ep2-c",
    category: "podcast",
    client: "EQB2B",
    title: "Episode 2 — Reel Cut III",
    blurb: "Branded podcast highlight reel with logo treatment.",
    orientation: "portrait"
  },
  {
    id: "eqb2b-ep3-a",
    category: "podcast",
    client: "EQB2B",
    title: "Episode 3 — Clip 1",
    blurb: "Podcast episode highlight cut for social.",
    orientation: "portrait"
  },
  {
    id: "eqb2b-ep3-b",
    category: "podcast",
    client: "EQB2B",
    title: "Episode 3 — Clip 2",
    blurb: "Podcast episode highlight cut for social.",
    orientation: "portrait"
  },
  {
    id: "eqb2b-ep4-a",
    category: "podcast",
    client: "EQB2B",
    title: "Episode 4 — Clip 1",
    blurb: "Podcast episode highlight cut for social.",
    orientation: "portrait"
  },
  {
    id: "eqb2b-ep4-b",
    category: "podcast",
    client: "EQB2B",
    title: "Episode 4 — Clip 2",
    blurb: "Podcast episode highlight cut for social.",
    orientation: "portrait"
  },
  {
    id: "wjm-sep25",
    category: "podcast",
    client: "We Just Met",
    title: "Sep 25th Episode — Reel",
    blurb: "Dating-show episode highlight, cut for pacing and punchlines.",
    orientation: "portrait"
  },
  {
    id: "wjm-jan14",
    category: "podcast",
    client: "We Just Met",
    title: "Jan 14th Episode — Reel",
    blurb: "Dating-show episode highlight, cut for pacing and punchlines.",
    orientation: "portrait"
  },
  {
    id: "mm-29-1",
    category: "podcast",
    client: "Mental Millennials",
    title: "Episode 29 — Clip 1",
    blurb: "Podcast episode highlight cut for social.",
    orientation: "portrait"
  },
  {
    id: "mm-29-2",
    category: "podcast",
    client: "Mental Millennials",
    title: "Episode 29 — Clip 2",
    blurb: "Podcast episode highlight cut for social.",
    orientation: "portrait"
  },
  {
    id: "mm-28-1",
    category: "podcast",
    client: "Mental Millennials",
    title: "Episode 28 — Clip 1",
    blurb: "Podcast episode highlight cut for social.",
    orientation: "portrait"
  },
  {
    id: "mm-28-2",
    category: "podcast",
    client: "Mental Millennials",
    title: "Episode 28 — Clip 2",
    blurb: "Podcast episode highlight cut for social.",
    orientation: "portrait"
  },
  {
    id: "mark-shoot-reel",
    category: "podcast",
    client: "Mark",
    title: "Interview Reel",
    blurb: "Interview-format highlight reel cut for social.",
    orientation: "portrait"
  },
  {
    id: "ceod-relationships",
    category: "corporate",
    client: "CEO Discovery",
    title: "Building Relationships Before They're Needed",
    blurb: "Corporate explainer piece for a private-equity talent platform.",
    orientation: "landscape"
  },
  {
    id: "ceod-value-prop",
    category: "corporate",
    client: "CEO Discovery",
    title: "Value Proposition of CEOD",
    blurb: "Corporate explainer piece for a private-equity talent platform.",
    orientation: "landscape"
  },
  {
    id: "phelps-reel-1",
    category: "corporate",
    client: "Phelps Media Group",
    title: "Equestrian PR — Reel 1",
    blurb: "PR/brand reel for an equestrian media agency.",
    orientation: "portrait"
  },
  {
    id: "phelps-reel-2",
    category: "corporate",
    client: "Phelps Media Group",
    title: "Equestrian PR — Reel 2",
    blurb: "PR/brand reel for an equestrian media agency.",
    orientation: "portrait"
  },
  {
    id: "phelps-reel-3",
    category: "corporate",
    client: "Phelps Media Group",
    title: "Equestrian PR — Reel 3",
    blurb: "PR/brand reel for an equestrian media agency.",
    orientation: "portrait"
  },
  {
    id: "sparked-rethink",
    category: "corporate",
    client: "Sparked",
    title: "Campaign Spot — Rethink Fund",
    blurb: "30-second branded campaign spot.",
    orientation: "landscape"
  },
  {
    id: "sparked-how-it-works",
    category: "corporate",
    client: "Sparked",
    title: "Campaign Spot — How It Works",
    blurb: "30-second branded campaign spot.",
    orientation: "landscape"
  },
  {
    id: "sparked-thank-you",
    category: "corporate",
    client: "Sparked",
    title: "Campaign Spot — Thank You",
    blurb: "30-second branded campaign spot.",
    orientation: "landscape"
  },
  {
    id: "sparked-school-leaders",
    category: "corporate",
    client: "Sparked",
    title: "Campaign Spot — School Leaders",
    blurb: "60-second branded campaign spot.",
    orientation: "landscape"
  },
  {
    id: "wybt-promo",
    category: "corporate",
    client: "WYBT",
    title: "Program Promo",
    blurb: "35-second promo cut for a wellness program.",
    orientation: "landscape"
  },
  {
    id: "sparked-logo",
    category: "motion",
    client: "Sparked",
    title: "Logo Animation",
    blurb: "Custom brand logo reveal animation.",
    orientation: "landscape"
  },
  {
    id: "csc-intro",
    category: "motion",
    client: "Children's Services Council",
    title: "Show Intro Package",
    blurb: "Animated title sequence for an episodic series.",
    orientation: "landscape"
  },
  {
    id: "tht-card-animation",
    category: "motion",
    client: "Travel Hacker Teddy",
    title: "Card Reveal Animation",
    blurb: "Custom motion graphic built for a social reel.",
    orientation: "portrait"
  },
  {
    id: "sojourners-gail",
    category: "nonprofit",
    client: "Sojourners",
    title: "Testimonial Reel — Gail Forrester",
    blurb: "Personal-story testimonial cut for a nonprofit fundraising campaign.",
    orientation: "portrait"
  },
  {
    id: "sojourners-katrina",
    category: "nonprofit",
    client: "Sojourners",
    title: "Testimonial Reel — Katrina Long Robinson",
    blurb: "Personal-story testimonial cut for a nonprofit fundraising campaign.",
    orientation: "portrait"
  },
  {
    id: "sojourners-myiah",
    category: "nonprofit",
    client: "Sojourners",
    title: "Testimonial Reel — Myiah White",
    blurb: "Personal-story testimonial cut for a nonprofit fundraising campaign.",
    orientation: "portrait"
  },
  {
    id: "sojourners-sheila",
    category: "nonprofit",
    client: "Sojourners",
    title: "Testimonial Reel — Sheila Palacios",
    blurb: "Personal-story testimonial cut for a nonprofit fundraising campaign.",
    orientation: "portrait"
  },
  {
    id: "sojourners-linda",
    category: "nonprofit",
    client: "Sojourners",
    title: "Testimonial Reel — Linda Long",
    blurb: "Personal-story testimonial cut for a nonprofit fundraising campaign.",
    orientation: "portrait"
  },
  {
    id: "sojourners-onething",
    category: "nonprofit",
    client: "Sojourners",
    title: "Testimonial Reel — One Thing",
    blurb: "Personal-story testimonial cut for a nonprofit fundraising campaign.",
    orientation: "portrait"
  },
  {
    id: "childrens-harbor-reel2",
    category: "nonprofit",
    client: "Children's Harbor",
    title: "Harbor Classic — Event Reel 2",
    blurb: "Golf-classic fundraiser highlight reel.",
    orientation: "portrait"
  },
  {
    id: "literacy-kravis-luncheon",
    category: "nonprofit",
    client: "Literacy Coalition",
    title: "Kravis Luncheon Recap",
    blurb: "Event recap for a nonprofit fundraising luncheon.",
    orientation: "landscape"
  },
  {
    id: "tithing-tree-reel1",
    category: "nonprofit",
    client: "Tithing Tree",
    title: "Reel — Future In Our Hands",
    blurb: "Nonprofit fundraising campaign reel.",
    orientation: "portrait"
  },
  {
    id: "tithing-tree-reel2",
    category: "nonprofit",
    client: "Tithing Tree",
    title: "Reel — Rediscovering Our Power",
    blurb: "Nonprofit fundraising campaign reel.",
    orientation: "portrait"
  },
  {
    id: "promisefund-event",
    category: "nonprofit",
    client: "Promisefund",
    title: "Gala — Event Video",
    blurb: "Compiled highlight video from a nonprofit gala.",
    orientation: "landscape"
  },
  {
    id: "promisefund-c433",
    category: "nonprofit",
    client: "Promisefund",
    title: "Gala — Moment 1",
    blurb: "Event-coverage moment from a nonprofit gala.",
    orientation: "landscape"
  },
  {
    id: "promisefund-c437",
    category: "nonprofit",
    client: "Promisefund",
    title: "Gala — Moment 2",
    blurb: "Event-coverage moment from a nonprofit gala.",
    orientation: "landscape"
  },
  {
    id: "cch-crib-donation",
    category: "nonprofit",
    client: "Clinics Can Help",
    title: "Crib Donation Event",
    blurb: "Nonprofit event-coverage video.",
    orientation: "landscape"
  },
  {
    id: "cch-hot-day-crib",
    category: "nonprofit",
    client: "Clinics Can Help",
    title: "Hot Day Crib Drive",
    blurb: "Nonprofit event-coverage video.",
    orientation: "landscape"
  },
  {
    id: "sixtysecs-teresa",
    category: "nonprofit",
    client: "60 Seconds",
    title: "Testimonial — Teresa Bairos",
    blurb: "Short-form testimonial interview.",
    orientation: "portrait"
  },
  {
    id: "sixtysecs-kayla",
    category: "nonprofit",
    client: "60 Seconds",
    title: "Testimonial — Kayla Irby",
    blurb: "Short-form testimonial interview.",
    orientation: "portrait"
  },
  {
    id: "sixtysecs-suzanne",
    category: "nonprofit",
    client: "60 Seconds",
    title: "Testimonial — Suzanne Spencer, Ed.D.",
    blurb: "Short-form testimonial interview.",
    orientation: "portrait"
  },
  {
    id: "sixtysecs-samiyah",
    category: "nonprofit",
    client: "60 Seconds",
    title: "Testimonial — Samiyah",
    blurb: "Short-form testimonial interview.",
    orientation: "portrait"
  },
  {
    id: "sixtysecs-lara",
    category: "nonprofit",
    client: "60 Seconds",
    title: "Testimonial — Lara Pinheiro",
    blurb: "Short-form testimonial interview.",
    orientation: "portrait"
  },
  {
    id: "hona-recap",
    category: "nonprofit",
    client: "HONA",
    title: "Event Recap Reel",
    blurb: "Nonprofit event-coverage highlight reel.",
    orientation: "portrait"
  },
  {
    id: "people-of-purpose-recap",
    category: "nonprofit",
    client: "People of Purpose",
    title: "Walk In My Shoes — Event Recap",
    blurb: "Nonprofit fundraising-event recap video.",
    orientation: "landscape"
  },
  {
    id: "gift-gathering-recap",
    category: "nonprofit",
    client: "Gift Gathering 2025",
    title: "Event Recap",
    blurb: "Nonprofit event-coverage recap video.",
    orientation: "landscape"
  },
  {
    id: "ite-gala-interview2",
    category: "interviews",
    client: "ITE Gala",
    title: "Guest Interview II",
    blurb: "4K multi-cam interview coverage from a nonprofit gala.",
    orientation: "landscape"
  },
  {
    id: "ite-gala-interview3",
    category: "interviews",
    client: "ITE Gala",
    title: "Guest Interview III",
    blurb: "4K multi-cam interview coverage from a nonprofit gala.",
    orientation: "landscape"
  },
  {
    id: "adrian-rmante",
    category: "interviews",
    client: "Adrian R'Mante",
    title: "Podcast Interview",
    blurb: "Interview segment cut for social.",
    orientation: "portrait"
  },
  {
    id: "dr-ann-3-intro1",
    category: "social",
    client: "Dr. Ann",
    title: "Intro Series — Part 1",
    blurb: "Vertical branded intro segment.",
    orientation: "portrait"
  },
  {
    id: "dr-ann-3-intro2",
    category: "social",
    client: "Dr. Ann",
    title: "Intro Series — Part 2",
    blurb: "Vertical branded intro segment.",
    orientation: "portrait"
  },
  {
    id: "dr-ann-2-clip1",
    category: "social",
    client: "Dr. Ann",
    title: "Social Short III",
    blurb: "Vertical branded short with motion captions.",
    orientation: "portrait"
  },
  {
    id: "dr-ann-2-clip2",
    category: "social",
    client: "Dr. Ann",
    title: "Social Short IV",
    blurb: "Vertical branded short with motion captions.",
    orientation: "portrait"
  },
  {
    id: "dr-ann-greyshirt",
    category: "social",
    client: "Dr. Ann",
    title: "Social Short V",
    blurb: "Vertical branded short with motion captions.",
    orientation: "portrait"
  },
  {
    id: "dr-shaw-2",
    category: "social",
    client: "Dr. Shaw",
    title: "Show Reel II",
    blurb: "Interview-style talk segment cut for social.",
    orientation: "portrait"
  },
  {
    id: "dr-shaw-3",
    category: "social",
    client: "Dr. Shaw",
    title: "Show Reel III",
    blurb: "Interview-style talk segment cut for social.",
    orientation: "portrait"
  },
  {
    id: "dr-shaw-reels-4",
    category: "social",
    client: "Dr. Shaw",
    title: "Social Reel",
    blurb: "Vertical branded social reel.",
    orientation: "portrait"
  },
  {
    id: "dr-shaw-reels-6",
    category: "social",
    client: "Dr. Shaw",
    title: "Social Reel II",
    blurb: "Vertical branded social reel.",
    orientation: "portrait"
  },
  {
    id: "wellness-reel3",
    category: "social",
    client: "365 Wellness",
    title: "Branded Reel II",
    blurb: "Vertical social reel for a medical wellness brand.",
    orientation: "portrait"
  },
  {
    id: "wellness-walkin",
    category: "social",
    client: "365 Wellness",
    title: "Office Walkthrough",
    blurb: "Branded walkthrough video for a medical wellness brand.",
    orientation: "landscape"
  },
  {
    id: "elite-interview",
    category: "social",
    client: "Elite Oral Surgery",
    title: "Patient Interview",
    blurb: "Branded interview clip for a dental/medical practice.",
    orientation: "landscape"
  },
  {
    id: "elite-c0155",
    category: "social",
    client: "Elite Oral Surgery",
    title: "Practice Feature",
    blurb: "Branded feature clip for a dental/medical practice.",
    orientation: "landscape"
  },
  {
    id: "elite-broll-1",
    category: "social",
    client: "Elite Oral Surgery",
    title: "Office B-Roll",
    blurb: "Color-corrected office b-roll for a dental/medical practice.",
    orientation: "landscape"
  },
  {
    id: "elite-room-broll",
    category: "social",
    client: "Elite Oral Surgery",
    title: "Room B-Roll",
    blurb: "Color-corrected office b-roll for a dental/medical practice.",
    orientation: "landscape"
  },
  {
    id: "jenilee-reel1",
    category: "social",
    client: "Jenilee Lash",
    title: "Branded Reel",
    blurb: "Vertical branded social reel for a beauty business.",
    orientation: "portrait"
  },
  {
    id: "jenilee-reel2",
    category: "social",
    client: "Jenilee Lash",
    title: "Branded Reel II",
    blurb: "Vertical branded social reel for a beauty business.",
    orientation: "portrait"
  },


  // ==== Animation / motion graphics (round 3) ====
  {
    id: "ceod-logo",
    category: "motion",
    client: "CEO Discovery",
    title: "Logo Animation",
    blurb: "Custom brand logo animation.",
    orientation: "portrait"
  },
  {
    id: "csc-outro",
    category: "motion",
    client: "Children's Services Council",
    title: "Show Outro Package",
    blurb: "Animated outro graphic for an episodic series.",
    orientation: "landscape"
  },
  {
    id: "dk-intro",
    category: "motion",
    client: "Dwayne Kerrigan",
    title: "Podcast Intro Animation",
    blurb: "Animated title sequence for a podcast.",
    orientation: "landscape"
  },
  {
    id: "dk-outro",
    category: "motion",
    client: "Dwayne Kerrigan",
    title: "Podcast Outro Animation",
    blurb: "Animated outro graphic for a podcast.",
    orientation: "landscape"
  },
  {
    id: "eqb2b-ep3-intro",
    category: "motion",
    client: "EQB2B",
    title: "Episode 3 Intro Animation",
    blurb: "Animated episode-intro package for a podcast.",
    orientation: "landscape"
  },
  {
    id: "eqb2b-comp",
    category: "motion",
    client: "EQB2B",
    title: "Title Comp Render",
    blurb: "After Effects title-comp render for a podcast intro.",
    orientation: "landscape"
  },
  {
    id: "khs-intro-loop",
    category: "motion",
    client: "Khanna House Studios",
    title: "Studio Intro Loop",
    blurb: "Motion intro loop for his own studio brand.",
    orientation: "landscape"
  },
  {
    id: "insight-ite-intro",
    category: "motion",
    client: "Insight",
    title: "ITE Program Intro",
    blurb: "Animated title sequence for a nonprofit program.",
    orientation: "landscape"
  },
  {
    id: "ite-brand-intro-prerender",
    category: "motion",
    client: "inSIGHT Education",
    title: "Brand Intro Animation",
    blurb: "After Effects intro animation for a nonprofit brand.",
    orientation: "landscape"
  },
  {
    id: "polo-recap-ae-2",
    category: "motion",
    client: "Polo Media Day",
    title: "Recap Graphic II",
    blurb: "After Effects motion graphic built for an event recap sequence.",
    orientation: "landscape"
  },
  {
    id: "rtdb-logo-intro",
    category: "motion",
    client: "RTDB",
    title: "Logo Intro Animation",
    blurb: "Animated logo intro for a podcast.",
    orientation: "landscape"
  },
  {
    id: "sparked-notification",
    category: "motion",
    client: "Sparked",
    title: "Notification Animation",
    blurb: "Short UI-notification motion graphic.",
    orientation: "landscape"
  },
  {
    id: "sparked-spark-mark",
    category: "motion",
    client: "Sparked",
    title: "Spark Mark Animation",
    blurb: "Short animated brand mark.",
    orientation: "landscape"
  },
  {
    id: "sparked-logo-sting",
    category: "motion",
    client: "Sparked",
    title: "Logo Sting",
    blurb: "Short animated logo sting.",
    orientation: "landscape"
  },
  {
    id: "sparked-outro",
    category: "motion",
    client: "Sparked",
    title: "Campaign Outro",
    blurb: "Animated outro graphic for a branded campaign.",
    orientation: "landscape"
  },
  {
    id: "nrg-intro",
    category: "motion",
    client: "NRG Podcast",
    title: "Podcast Intro Animation",
    blurb: "Animated title sequence for the podcast.",
    orientation: "landscape"
  },
  {
    id: "tht-logo-intro",
    category: "motion",
    client: "Travel Hacker Teddy",
    title: "Logo Intro",
    blurb: "Animated logo intro.",
    orientation: "landscape"
  },
  {
    id: "tht-plane-intro",
    category: "motion",
    client: "Travel Hacker Teddy",
    title: "3D Plane Intro",
    blurb: "3D animated intro sequence.",
    orientation: "landscape"
  },
  {
    id: "tht-blue-intro",
    category: "motion",
    client: "Travel Hacker Teddy",
    title: "Brand Intro",
    blurb: "Animated brand intro sequence.",
    orientation: "landscape"
  },
  {
    id: "tht-card-animation-2",
    category: "motion",
    client: "Travel Hacker Teddy",
    title: "Card Reveal Animation II",
    blurb: "Custom motion graphic built for a social reel.",
    orientation: "portrait"
  },
  {
    id: "gygo-podcast-intro",
    category: "motion",
    client: "GYGO Podcast",
    title: "Podcast Intro Animation",
    blurb: "Animated title sequence for a podcast.",
    orientation: "landscape"
  },
  {
    id: "wellness-lt-vitals",
    category: "motion",
    client: "365 Wellness",
    title: "Lower Third — Vitals",
    blurb: "Animated lower-third graphic from a medical explainer series.",
    orientation: "landscape"
  },
  {
    id: "wellness-lt-xray",
    category: "motion",
    client: "365 Wellness",
    title: "Lower Third — X-Ray",
    blurb: "Animated lower-third graphic from a medical explainer series.",
    orientation: "landscape"
  },
  {
    id: "wellness-lt-ecg",
    category: "motion",
    client: "365 Wellness",
    title: "Lower Third — ECG",
    blurb: "Animated lower-third graphic from a medical explainer series.",
    orientation: "landscape"
  },
  {
    id: "wellness-lt-bloodwork",
    category: "motion",
    client: "365 Wellness",
    title: "Lower Third — Bloodwork",
    blurb: "Animated lower-third graphic from a medical explainer series.",
    orientation: "landscape"
  },
  {
    id: "wellness-lt-physical",
    category: "motion",
    client: "365 Wellness",
    title: "Lower Third — Physical Exam",
    blurb: "Animated lower-third graphic from a medical explainer series.",
    orientation: "landscape"
  },
  {
    id: "wellness-lt-text",
    category: "motion",
    client: "365 Wellness",
    title: "Lower Third — Title Card",
    blurb: "Animated lower-third title card graphic.",
    orientation: "landscape"
  },
  {
    id: "wellness-walkin-outro",
    category: "motion",
    client: "365 Wellness",
    title: "Walkthrough Outro",
    blurb: "Animated outro graphic for a medical explainer video.",
    orientation: "landscape"
  },

  // ==== Round 6: HONA awards package, Wellington Bay testimonials, virtual cards ====
  {
    id: "hona-open",
    category: "nonprofit",
    client: "HONA Awards",
    title: "Awards Show Open",
    blurb: "Title sequence opening a nonprofit awards ceremony.",
    orientation: "landscape"
  },
  {
    id: "hona-generic",
    category: "nonprofit",
    client: "HONA Awards",
    title: "Ceremony Package",
    blurb: "Generic award segment built for the live ceremony.",
    orientation: "landscape"
  },
  {
    id: "hona-sponsors",
    category: "nonprofit",
    client: "HONA Awards",
    title: "Sponsor Reel",
    blurb: "Sponsor recognition reel played during the ceremony.",
    orientation: "landscape"
  },
  {
    id: "hona-lifetime",
    category: "nonprofit",
    client: "HONA Awards",
    title: "Lifetime Achievement — Nominees",
    blurb: "Nominee package for the Lifetime Achievement award.",
    orientation: "landscape"
  },
  {
    id: "hona-community-hero",
    category: "nonprofit",
    client: "HONA Awards",
    title: "Community Hero — Nominees",
    blurb: "Nominee package for the Community Hero award.",
    orientation: "landscape"
  },
  {
    id: "hona-executive",
    category: "nonprofit",
    client: "HONA Awards",
    title: "Executive of the Year — Nominees",
    blurb: "Nominee package for the Executive of the Year award.",
    orientation: "landscape"
  },
  {
    id: "hona-mvp",
    category: "nonprofit",
    client: "HONA Awards",
    title: "MVP of the Year — Nominees",
    blurb: "Nominee package for the MVP of the Year award.",
    orientation: "landscape"
  },
  {
    id: "hona-professional",
    category: "nonprofit",
    client: "HONA Awards",
    title: "Professional of the Year — Nominees",
    blurb: "Nominee package for the Professional of the Year award.",
    orientation: "landscape"
  },
  {
    id: "hona-volunteer",
    category: "nonprofit",
    client: "HONA Awards",
    title: "Volunteer of the Year — Nominees",
    blurb: "Nominee package for the Volunteer of the Year award.",
    orientation: "landscape"
  },
  {
    id: "hona-education",
    category: "nonprofit",
    client: "HONA Awards",
    title: "Education Impact — Nominees",
    blurb: "Nominee package for the Education Impact award.",
    orientation: "landscape"
  },
  {
    id: "hona-innovation",
    category: "nonprofit",
    client: "HONA Awards",
    title: "Innovation — Nominees",
    blurb: "Nominee package for the Innovation award.",
    orientation: "landscape"
  },
  {
    id: "hona-health",
    category: "nonprofit",
    client: "HONA Awards",
    title: "Health & Wellness Impact — Nominees",
    blurb: "Nominee package for the Health and Wellness Impact award.",
    orientation: "landscape"
  },
  {
    id: "hona-arts",
    category: "nonprofit",
    client: "HONA Awards",
    title: "Arts & Culture Impact — Nominees",
    blurb: "Nominee package for the Arts and Culture Impact award.",
    orientation: "landscape"
  },
  {
    id: "hona-environment",
    category: "nonprofit",
    client: "HONA Awards",
    title: "Environment & Animal Welfare — Nominees",
    blurb: "Nominee package for the Environment and Animal Welfare Impact award.",
    orientation: "landscape"
  },
  {
    id: "hona-family",
    category: "nonprofit",
    client: "HONA Awards",
    title: "Family Services Impact — Nominees",
    blurb: "Nominee package for the Family Services Impact award.",
    orientation: "landscape"
  },
  {
    id: "hona-collaborators",
    category: "nonprofit",
    client: "HONA Awards",
    title: "Community Collaborators — Nominees",
    blurb: "Nominee package for the Community Collaborators award.",
    orientation: "landscape"
  },
  {
    id: "wb-artie",
    category: "corporate",
    client: "Wellington Bay",
    title: "Testimonial — Artie Lynnworth",
    blurb: "Resident testimonial film for a senior living community.",
    orientation: "landscape"
  },
  {
    id: "wb-carol",
    category: "corporate",
    client: "Wellington Bay",
    title: "Testimonial — Carol Phillips",
    blurb: "Resident testimonial film for a senior living community.",
    orientation: "landscape"
  },
  {
    id: "wb-jan",
    category: "corporate",
    client: "Wellington Bay",
    title: "Testimonial — Jan Newlands",
    blurb: "Resident testimonial film for a senior living community.",
    orientation: "landscape"
  },
  {
    id: "wb-jeff",
    category: "corporate",
    client: "Wellington Bay",
    title: "Testimonial — Jeff Sigman",
    blurb: "Resident testimonial film for a senior living community.",
    orientation: "landscape"
  },
  {
    id: "wb-judie",
    category: "corporate",
    client: "Wellington Bay",
    title: "Testimonial — Judie Eieibold",
    blurb: "Resident testimonial film for a senior living community.",
    orientation: "landscape"
  },
  {
    id: "wb-myra-david",
    category: "corporate",
    client: "Wellington Bay",
    title: "Testimonial — Myra & David",
    blurb: "Resident testimonial film for a senior living community.",
    orientation: "landscape"
  },
  {
    id: "wb-rita",
    category: "corporate",
    client: "Wellington Bay",
    title: "Testimonial — Rita",
    blurb: "Resident testimonial film for a senior living community.",
    orientation: "landscape"
  },
  {
    id: "wb-tony",
    category: "corporate",
    client: "Wellington Bay",
    title: "Testimonial — Tony",
    blurb: "Resident testimonial film for a senior living community.",
    orientation: "landscape"
  },
  {
    id: "khs-virtual-card",
    category: "corporate",
    client: "Khanna House Studios",
    title: "Virtual Business Card",
    blurb: "Digital business card format produced for his own studio.",
    orientation: "landscape"
  },
  {
    id: "virtual-card-demo",
    category: "corporate",
    client: "Khanna House Studios",
    title: "Virtual Business Card — Demo",
    blurb: "Full-length demo of the digital business card product.",
    orientation: "landscape"
  },

  // ==== Round 7: H: PORTABLE1 — Uncoordinated, Super Fit Champs, Tennis with Ema, KHS ====
  {
    id: "uncoordinated-name-pronunciation-struggles",
    category: "podcast",
    client: "Uncoordinated",
    title: "Name Pronunciation Struggles",
    blurb: "Episode reel cut for social from a comedy/lifestyle podcast.",
    orientation: "portrait"
  },
  {
    id: "uncoordinated-roller-coaster-experience",
    category: "podcast",
    client: "Uncoordinated",
    title: "Roller Coaster Experience",
    blurb: "Episode reel cut for social from a comedy/lifestyle podcast.",
    orientation: "portrait"
  },
  {
    id: "uncoordinated-first-skydive",
    category: "podcast",
    client: "Uncoordinated",
    title: "First Skydive",
    blurb: "Episode reel cut for social from a comedy/lifestyle podcast.",
    orientation: "portrait"
  },
  {
    id: "uncoordinated-almost-made-the-team",
    category: "podcast",
    client: "Uncoordinated",
    title: "Almost Made the Team",
    blurb: "Episode reel cut for social from a comedy/lifestyle podcast.",
    orientation: "portrait"
  },
  {
    id: "uncoordinated-healing-after-heartbreak",
    category: "podcast",
    client: "Uncoordinated",
    title: "Healing After Heartbreak",
    blurb: "Episode reel cut for social from a comedy/lifestyle podcast.",
    orientation: "portrait"
  },
  {
    id: "uncoordinated-the-gym-routine-that-works",
    category: "podcast",
    client: "Uncoordinated",
    title: "The Gym Routine That Works",
    blurb: "Episode reel cut for social from a comedy/lifestyle podcast.",
    orientation: "portrait"
  },
  {
    id: "uncoordinated-live-freestyle-session",
    category: "podcast",
    client: "Uncoordinated",
    title: "Live Freestyle Session",
    blurb: "Episode reel cut for social from a comedy/lifestyle podcast.",
    orientation: "portrait"
  },
  {
    id: "uncoordinated-ten-years-of-friendship",
    category: "podcast",
    client: "Uncoordinated",
    title: "Ten Years of Friendship",
    blurb: "Episode reel cut for social from a comedy/lifestyle podcast.",
    orientation: "portrait"
  },
  {
    id: "uncoordinated-inside-the-hustle",
    category: "podcast",
    client: "Uncoordinated",
    title: "Inside the Hustle",
    blurb: "Episode reel cut for social from a comedy/lifestyle podcast.",
    orientation: "portrait"
  },
  {
    id: "uncoordinated-influencing-vs-a-full-time-job",
    category: "podcast",
    client: "Uncoordinated",
    title: "Influencing vs. a Full-Time Job",
    blurb: "Episode reel cut for social from a comedy/lifestyle podcast.",
    orientation: "portrait"
  },
  {
    id: "uncoordinated-warm-showers-changed-my-life",
    category: "podcast",
    client: "Uncoordinated",
    title: "Warm Showers Changed My Life",
    blurb: "Episode reel cut for social from a comedy/lifestyle podcast.",
    orientation: "portrait"
  },
  {
    id: "uncoordinated-would-you-rather",
    category: "podcast",
    client: "Uncoordinated",
    title: "Would You Rather",
    blurb: "Episode reel cut for social from a comedy/lifestyle podcast.",
    orientation: "portrait"
  },
  {
    id: "super-fit-champs-be-a-fitness-star",
    category: "motion",
    client: "Super Fit Champs",
    title: "Be a Fitness Star",
    blurb: "Animated segment for a children's fitness brand.",
    orientation: "landscape"
  },
  {
    id: "super-fit-champs-every-step-counts",
    category: "motion",
    client: "Super Fit Champs",
    title: "Every Step Counts",
    blurb: "Animated segment for a children's fitness brand.",
    orientation: "landscape"
  },
  {
    id: "super-fit-champs-stay-fit-stay-happy",
    category: "motion",
    client: "Super Fit Champs",
    title: "Stay Fit, Stay Happy",
    blurb: "Animated segment for a children's fitness brand.",
    orientation: "landscape"
  },
  {
    id: "super-fit-champs-move-to-the-beat",
    category: "motion",
    client: "Super Fit Champs",
    title: "Move to the Beat",
    blurb: "Animated segment for a children's fitness brand.",
    orientation: "landscape"
  },
  {
    id: "super-fit-champs-let-s-get-active",
    category: "motion",
    client: "Super Fit Champs",
    title: "Let's Get Active",
    blurb: "Animated segment for a children's fitness brand.",
    orientation: "landscape"
  },
  {
    id: "super-fit-champs-fitness-is-fun",
    category: "motion",
    client: "Super Fit Champs",
    title: "Fitness Is Fun",
    blurb: "Animated segment for a children's fitness brand.",
    orientation: "landscape"
  },
  {
    id: "super-fit-champs-strong-bodies-strong-minds",
    category: "motion",
    client: "Super Fit Champs",
    title: "Strong Bodies, Strong Minds",
    blurb: "Animated segment for a children's fitness brand.",
    orientation: "landscape"
  },
  {
    id: "super-fit-champs-smile-and-jump",
    category: "motion",
    client: "Super Fit Champs",
    title: "Smile and Jump",
    blurb: "Animated segment for a children's fitness brand.",
    orientation: "landscape"
  },
  {
    id: "super-fit-champs-exercise-is-fun",
    category: "motion",
    client: "Super Fit Champs",
    title: "Exercise Is Fun",
    blurb: "Animated segment for a children's fitness brand.",
    orientation: "landscape"
  },
  {
    id: "super-fit-champs-stretch-and-move",
    category: "motion",
    client: "Super Fit Champs",
    title: "Stretch and Move",
    blurb: "Animated segment for a children's fitness brand.",
    orientation: "landscape"
  },
  {
    id: "super-fit-champs-energy-up-fun-up",
    category: "motion",
    client: "Super Fit Champs",
    title: "Energy Up, Fun Up",
    blurb: "Animated segment for a children's fitness brand.",
    orientation: "landscape"
  },
  {
    id: "super-fit-champs-feel-the-power",
    category: "motion",
    client: "Super Fit Champs",
    title: "Feel the Power",
    blurb: "Animated segment for a children's fitness brand.",
    orientation: "landscape"
  },
  {
    id: "super-fit-champs-run-jump-play",
    category: "motion",
    client: "Super Fit Champs",
    title: "Run, Jump, Play",
    blurb: "Animated segment for a children's fitness brand.",
    orientation: "landscape"
  },
  {
    id: "super-fit-champs-coach-b",
    category: "motion",
    client: "Super Fit Champs",
    title: "Coach B",
    blurb: "Animated segment for a children's fitness brand.",
    orientation: "portrait"
  },
  {
    id: "tennis-with-ema-episode-reel-1",
    category: "podcast",
    client: "Tennis with Ema",
    title: "Episode Reel 1",
    blurb: "Highlight reel cut from a tennis podcast episode.",
    orientation: "portrait"
  },
  {
    id: "tennis-with-ema-episode-reel-2",
    category: "podcast",
    client: "Tennis with Ema",
    title: "Episode Reel 2",
    blurb: "Highlight reel cut from a tennis podcast episode.",
    orientation: "portrait"
  },
  {
    id: "tennis-with-ema-episode-2-reel-1",
    category: "podcast",
    client: "Tennis with Ema",
    title: "Episode 2 — Reel 1",
    blurb: "Highlight reel cut from a tennis podcast episode.",
    orientation: "portrait"
  },
  {
    id: "tennis-with-ema-episode-2-reel-2",
    category: "podcast",
    client: "Tennis with Ema",
    title: "Episode 2 — Reel 2",
    blurb: "Highlight reel cut from a tennis podcast episode.",
    orientation: "portrait"
  },
  {
    id: "tennis-with-ema-podcast-intro",
    category: "motion",
    client: "Tennis with Ema",
    title: "Podcast Intro",
    blurb: "Animated title sequence for the show.",
    orientation: "landscape"
  },
  {
    id: "tennis-with-ema-podcast-outro",
    category: "motion",
    client: "Tennis with Ema",
    title: "Podcast Outro",
    blurb: "Animated outro graphic for the show.",
    orientation: "landscape"
  },
  {
    id: "tennis-with-ema-lucky-in-love-sponsor-spot",
    category: "motion",
    client: "Tennis with Ema",
    title: "Lucky in Love — Sponsor Spot",
    blurb: "Animated sponsor advert cut for the show.",
    orientation: "landscape"
  },
  {
    id: "tennis-with-ema-match-set-sponsor-spot",
    category: "motion",
    client: "Tennis with Ema",
    title: "Match Set — Sponsor Spot",
    blurb: "Animated sponsor advert cut for the show.",
    orientation: "landscape"
  },
  {
    id: "khanna-house-studios-studio-welcome",
    category: "corporate",
    client: "Khanna House Studios",
    title: "Studio Welcome",
    blurb: "Brand introduction film for his own studio.",
    orientation: "landscape"
  },
  {
    id: "khanna-house-studios-faq-reel",
    category: "corporate",
    client: "Khanna House Studios",
    title: "FAQ Reel",
    blurb: "Short-form FAQ explainer for his own studio.",
    orientation: "landscape"
  },
  {
    id: "intro-to-podcasting-episode-1",
    category: "corporate",
    client: "Intro to Podcasting",
    title: "Episode 1",
    blurb: "Educational episode from a podcasting how-to series.",
    orientation: "landscape"
  },
  {
    id: "intro-to-podcasting-episode-3",
    category: "corporate",
    client: "Intro to Podcasting",
    title: "Episode 3",
    blurb: "Educational episode from a podcasting how-to series.",
    orientation: "landscape"
  },
  {
    id: "intro-to-podcasting-episode-4",
    category: "corporate",
    client: "Intro to Podcasting",
    title: "Episode 4",
    blurb: "Educational episode from a podcasting how-to series.",
    orientation: "landscape"
  },
  {
    id: "valentyna-g-polo-sundays",
    category: "nonprofit",
    client: "Valentyna G",
    title: "Polo Sundays",
    blurb: "Event film covering a polo Sunday.",
    orientation: "landscape"
  },
  {
    id: "devi-kodak-jeep-reel",
    category: "social",
    client: "Devi",
    title: "Kodak Jeep Reel",
    blurb: "Branded social reel.",
    orientation: "landscape"
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
