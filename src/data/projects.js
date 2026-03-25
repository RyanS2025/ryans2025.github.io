const projects = [
  { //Lost and Hound
    slug: "lost-and-hound",
    title: "Lost and Hound",
    description:
      "A campus platform for reporting and reuniting lost and found items, featuring an interactive map and real-time messaging.",
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
    link: "https://github.com/RyanS2025/Lost-and-Hound/tree/main",
    featured: true
  },
  { // WNBA Reference
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
    featured: true
  },
  { // Basketball-Sim
    slug: "basketball-simulation",
    title: "NBA Season Simulator",
    description: "Inspired by NBA 2K's MyLeague, a basketball simulation platform that allows users to simulate player stats for single games or full seasons, and search for real NBA player statistics. Features a web interface built with Flask, and custom simulation logic for basketball performance.",
    tags: ["Python", "Flask", "Simulation", "nba_api"],
    images: [
    "/images/NBASim/NBASimLogo.png",
    "/images/NBASim/NBASimMain.png",
    "/images/NBASim/NBASimAPI.png",
    ],
    link: "https://github.com/RyanS2025/NBA-Season-Simulation",
    featured: false
  },
  // Add more...
];

export default projects;