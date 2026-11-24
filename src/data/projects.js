const projects = [
  { //Lost and Hound
    date: "2026-03-17",
    slug: "lost-and-hound",
    cover: "/images/covers/lost-and-hound.webp", // small WebP for cards; full screenshots stay in images
    title: "Lost and Hound",
    description:
      "A campus platform for reporting and reuniting lost and found items, featuring an interactive map and real-time messaging. For client purposes, the repository is private. Please reach out for access to view.",
    tags: ["React", "Node.js", "Express", "Supabase", "Vite"],
    images: [
      "/images/lost-and-hound/LostandHoundLogo.png",
      "/images/lost-and-hound/LostandHoundLogin.png",
      "/images/lost-and-hound/LostandHoundFeed.png",
      "/images/lost-and-hound/LostandHoundMap.png",
      "/images/lost-and-hound/LostandHoundMessages.png",
      "/images/lost-and-hound/LostandHoundSettings.png",
      "/images/lost-and-hound/LostandHoundModeration.png",
      "/images/lost-and-hound/LostandHound404.png",
    ],
    link: null,
    domain: "https://thelostandhound.com",
    featured: true,
    active: true
  },
  { // WNBA Reference
    date: "2026-03-25",
    slug: "wnba-reference",
    cover: "/images/covers/wnba-reference.webp", // small WebP for cards; full screenshots stay in images
    title: "WNBA Reference",
    description:
      "A full-stack WNBA stat tracker featuring 180+ players with searchable/sortable stats, team pages with rosters, shooting splits, and a dark glassmorphism UI with team-colored accents and ESPN headshots.",
    tags: ["React", "Vite", "Tailwind CSS", "Express", "ESPN Data"],
    images: [
      "/images/wnba-reference/WNBALogo.png",
      "/images/wnba-reference/WNBARefHero.png",
      "/images/wnba-reference/WNBARefDashboard.png",
      "/images/wnba-reference/WNBARefTeams.png",
      "/images/wnba-reference/WNBARefTeamDetail.png",
      "/images/wnba-reference/WNBARefPlayers.png",
      "/images/wnba-reference/WNBARefPlayerDetail.png",
    ],
    link: "https://github.com/RyanS2025/WNBA-Reference",
    domain: null,
  },
  { // BBAL Sim
    date: "2025-09-01",
    slug: "bbal-sim",
    cover: "/images/covers/bbal-sim.webp", // small WebP for cards; full screenshots stay in images
    title: "BBAL Sim",
    description: "A deep basketball general-manager simulator that runs entirely in the browser. Take over a franchise, build through the draft or trade for stars, manage egos and injuries, and chase championships — featuring skill-based simulation, a living locker room with morale and holdouts, 100-voter media awards, and full league history. No servers; every league lives in IndexedDB.",
    tags: ["React", "TypeScript", "Tailwind CSS", "Dexie.js", "Vite"],
    images: [
      "/images/NBASim/BBALSimHome.webp",
      "/images/NBASim/BBALSimDashboard.webp",
      "/images/NBASim/BBALSimRoster.webp",
      "/images/NBASim/BBALSimPlayers.webp",
      "/images/NBASim/BBALSimStandings.webp",
      "/images/NBASim/BBALSimAwards.webp",
      "/images/NBASim/BBALSimCoaching.webp",
    ],
    link: "https://github.com/RyanS2025/Basketball-Season-Simulation",
    domain: "https://basketball-season-simulation.vercel.app/",
    featured: true,
    active: true
  },
  { // Backyard
    date: "2026-05-13",
    slug: "backyard",
    coverPosition: "center", // 4:3 GIF in 16:9 cards: a top crop pushes the art high
    title: "Backyard",
    description:
      "A Ghibli-inspired campus platform for discovering clubs, reading peer reviews, tracking live events, and connecting with friends — the social layer your university never built.",
    tags: ["React", "Supabase", "Vite", "Tailwind"],
    images: [
      "/images/backyard/intro_screen_hero.gif",
      "/images/backyard/BackyardClubs.webp",
      "/images/backyard/BackyardSearch.webp",
      "/images/backyard/BackyardCategories.webp",
      "/images/backyard/BackyardClubPage.webp",
    ],
    link: "https://github.com/RyanS2025/Backyard",
    domain: "https://explorethebackyard.com",
    featured: true,
    active: true
  },

  // Work in progress. These aren't on the resume, so each carries its own
  // role, stack, dates, and highlights (projectDetails falls back to them).
  { // HuskyExchange: Oasis Fall 2026, group 14
    date: "2026-10-04",
    slug: "husky-exchange",
    cover: "/images/covers/husky-exchange.webp",
    title: "HuskyExchange",
    description:
      "A Northeastern-only marketplace for textbooks, furniture, and dorm gear, built by the four first-year students I mentor through Oasis at Northeastern. " +
      "I lead the project: I designed the product and its architecture, wrote the plan the team builds from, and guide each developer through their lane. " +
      "Students sign up with a verified @northeastern.edu email, list an item in under a minute with a photo from their phone, and meet on campus to pay in person, so the app never touches money.",
    tags: ["React", "Supabase", "Vite", "Mentorship"],
    images: [
      "/images/husky-exchange/HuskyExchange-home.webp",
      "/images/husky-exchange/HuskyExchange-feed-filters.webp",
      "/images/husky-exchange/HuskyExchange-hotdeals.webp",
      "/images/husky-exchange/HuskyExchange-orders.webp",
      "/images/husky-exchange/HuskyExchange-signin.webp",
    ],
    link: "https://github.com/Oasis-NEU/f26-group-14",
    domain: null,
    wip: true,
    role: "Mentor & Project Lead (Oasis, Fall 2026)",
    stack: "React 19, Vite, React Router 7, Supabase (Postgres, Auth, Storage, RLS)",
    dates: "October 2026 – Present",
    highlights: [
      "Mentor and lead a team of **4 first-year students** through their first full-stack project, from setup to deployment.",
      "Designed the product and its architecture: a **React + Supabase app with row-level security** and no custom server, with each decision recorded in an ADR.",
      "Wrote the **project plan** the team builds from: task IDs, a lane for each developer, and a workstream log per person.",
      "Set up a shared **Claude Code workflow** for the team, with a project CLAUDE.md, a subagent per developer, and written review and test requirements.",
      "Merged the team's first feature set into main (sign-in, Sell, Feed, listing pages, Settings), then added **security audit tasks** to the plan as the app grew.",
      "Shipped so far: **verified @northeastern.edu sign-up**, listings with photos and meetup spots on all 14 NEU campuses, filters, and seller pages.",
    ],
  },
  { // Ghost Aquarium
    date: "2026-11-14",
    slug: "ghost-aquarium",
    cover: "/images/covers/ghost-aquarium.webp",
    coverPosition: "center",
    title: "Ghost Aquarium",
    description:
      "ASCII fish that swim in mid-air: an ESP32-S3 desk aquarium that uses the Pepper's Ghost illusion. " +
      "A small color OLED hides face-up in a 3D-printed base, and a clear sheet at 45° reflects it toward you, so schools of fish, swaying seaweed, and rising bubbles seem to float inside an empty box. " +
      "The simulation and renderer are tested C++ that already runs on a simulated ESP32. The physical build starts now.",
    tags: ["C++", "ESP32", "PlatformIO", "3D Printing"],
    images: [
      "/images/ghost-aquarium/GhostAquariumDemo.webp",
      "/images/ghost-aquarium/GhostAquariumWokwi.webp",
      "/images/ghost-aquarium/GhostAquariumEnclosure.webp",
    ],
    link: "https://github.com/RyanS2025/ghost-aquarium",
    domain: null,
    featured: true, // took WNBA Reference's Home slot: solo, real engineering, and a live visual
    wip: true,
    role: "Solo Developer",
    stack: "C++17, ESP32-S3, LovyanGFX, PlatformIO, Unity, Wokwi, GitHub Actions, CAD + 3D printing",
    dates: "November 2026 – Present",
    highlights: [
      "Wrote the simulation and renderer as **hardware-free C++ libraries**, unit-tested on a laptop and in CI on every push.",
      "The real firmware already **boots on a simulated ESP32-S3** in Wokwi, with one command that checks it reports frame stats.",
      "Fish steer with wander, schooling, wall, and depth forces on a **fixed 60 Hz timestep**, deterministic for a given seed. They turn around with an animated flip, never a bent body.",
      "Each frame is built off-screen and pushed whole: **under 90 draw ops and a ~13 ms push**, so nothing flickers or tears.",
      "Added **banded DMA rendering**, which rasterizes the next band while the panel receives the last one, for **17% more fps** in simulation.",
      "Built a **browser tuning prototype** that matches the device pixel for pixel and exports tuned values as C++.",
      "Designed to run 24/7: a task watchdog, no heap allocation per frame, hardware mirroring for the reflector, and a 1 px drift against OLED burn-in.",
    ],
  },
  { // Lorikeet
    date: "2026-11-20",
    slug: "lorikeet",
    cover: "/images/covers/lorikeet.svg",
    coverPosition: "center",
    title: "Lorikeet",
    description:
      "A projector and a webcam turn any wall or table into a game you play with sticky notes. " +
      "Computer vision finds each note and maps it into projector space, and games use the notes either as solid platforms for physics puzzles or as touch-style inputs for strategy and tower-defense games. " +
      "I'm building it with a teammate, and I own the computer vision.",
    tags: ["Python", "OpenCV", "Computer Vision", "pygame"],
    images: ["/images/covers/lorikeet.svg"],
    link: "https://github.com/mahirmugdho/lorikeet",
    domain: null,
    wip: true,
    role: "Co-Developer (Computer Vision)",
    stack: "Python 3.13, OpenCV, pygame-ce, pymunk, uv, ruff, pyright, pytest",
    dates: "November 2026 – Present",
    highlights: [
      "Own the **computer vision lane**: camera capture, projector calibration, and sticky-note detection.",
      "Wrote the calibration core, a **homography** that maps camera pixels to projector pixels, the only coordinate space games see.",
      "Scaffolded the repo with my **/new-repo Claude Code skill**: toolchain, CI, 7 ADRs, a threat model, privacy notes, and a phased roadmap in one reviewed PR.",
      "Detects notes by **color rather than ML**, aiming for under 150 ms between moving a note and seeing the game react.",
      "Privacy by design: camera frames stay in memory on the laptop and are never saved or sent.",
    ],
  },
];

export default projects;