const projects = [
  { //Lost and Hound
    date: "2026-03-17",
    slug: "lost-and-hound",
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
    featured: true
  },
  { // BBAL Sim
    date: "2025-09-01",
    slug: "bbal-sim",
    title: "BBAL Sim",
    description: "A deep basketball general-manager simulator that runs entirely in the browser. Take over a franchise, build through the draft or trade for stars, manage egos and injuries, and chase championships — featuring skill-based simulation, a living locker room with morale and holdouts, 100-voter media awards, and full league history. No servers; every league lives in IndexedDB.",
    tags: ["React", "TypeScript", "Tailwind CSS", "Dexie.js", "Vite"],
    images: [
    "/images/NBASim/NBASimLogo.png",
    "/images/NBASim/NBASimMain.png",
    "/images/NBASim/NBASimAPI.png",
    ],
    link: "https://github.com/RyanS2025/Basketball-Season-Simulation",
    domain: null,
    featured: true
  },
  { // Backyard
    date: "2026-05-13",
    slug: "backyard",
    title: "Backyard",
    description:
      "A Ghibli-inspired campus platform for discovering clubs, reading peer reviews, tracking live events, and connecting with friends — the social layer your university never built.",
    tags: ["React", "Supabase", "Vite", "Tailwind"],
    images: [
      "/images/backyard/intro_screen_hero.gif",
    ],
    link: "https://github.com/ConnorFriedman10/Backyard",
    domain: "https://explorethebackyard.com",
    featured: true,
    active: true
  },
  // Add more...
];

export default projects;