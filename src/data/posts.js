const posts = [
  {
    slug: "building-lost-and-hound",
    title: "Building Lost and Hound",
    date: "2026-03-17",
    featured: true,
    excerpt:
      "How our team built a campus lost-and-found platform with React, Supabase, and an interactive map.",
    body: `Lost and Hound started as a group project to solve a real problem at Northeastern — items go missing every day across campus, and there's no central place to connect owners with the people who find them.

We built a React + Vite frontend paired with a Node.js/Express backend, using Supabase for auth and data storage. The app lets users report lost or found items, browse a live feed of listings, and pin sightings on an interactive Google Maps view across all Northeastern campuses.

One of the trickier pieces was the MapPinPicker component, which lets users drop a pin to mark exactly where they found or lost an item — whether that's Snell Library, ISEC, or Marino. We also added real-time messaging so finders and owners can coordinate pickups directly in the app, plus automatic listing expiry so the feed stays current and doesn't fill up with resolved posts.

Key things I learned: wiring up Supabase auth with a custom AuthContext and two-factor authentication, managing location data across Northeastern's global campuses, and the value of a clean API utility layer (our apiFetch wrapper saved us a ton of repetitive fetch boilerplate).`,
  },
  {
    slug: "scraping-wnba-stats",
    title: "Building My Own WNBA Database from Scratch",
    date: "2026-03-25",
    featured: true,
    excerpt:
      "How I scraped ESPN and Basketball Reference to build a complete 2025 WNBA player database with 180+ players, headshots, and 20+ stat categories.",
    body: `I wanted to build a WNBA stat tracker as a portfolio project, but quickly learned that getting WNBA data isn't as easy as it sounds. There's no free, open API with everything you need — so I had to get creative.

My first attempt was the balldontlie API, which works great for NBA data but has a very limited free tier for WNBA — no standings, no detailed stats. Next I tried hitting stats.wnba.com directly from my Express server, but every request got blocked. The WNBA stats API checks headers and refuses server-side requests.

The breakthrough was realizing I could use the browser as my scraping tool. ESPN's stats page at espn.com/wnba/stats/player loads all the data into the DOM — I just needed to extract it. I wrote a small console script that grabs every player row from the table, pulls their name, team, and all per-game stats, and copies the result as JSON to the clipboard. One paste into a file and I had 104 qualified players.

But that was only players who met ESPN's minimum games threshold. To get everyone — the rookies who played 3 games, the mid-season trades, the injury returns — I added \`qualified/false\` to the ESPN URL. That gave me 117 players. Still not complete.

For the full picture, I turned to Basketball Reference. Their 2025 per-game stats page has every single player who appeared in a game, no minimums. The table wasn't in a standard \`<table>\` tag that my first script expected, so I had to dig through 27 tables on the page to find the right one (table index 26, with 246 rows). The data included stats ESPN didn't surface: offensive rebounds, 2-point shooting splits, games started, and personal fouls.

The trickiest part was handling players who played for multiple teams. Basketball Reference lists them three ways: a "TOT" row with combined stats, plus individual rows for each team. I wrote logic to use the TOT stats but assign the player to their most recent team based on which team-specific row had the most games played.

For headshots, ESPN uses a predictable URL pattern: \`espn.com/i/headshots/wnba/players/full/{espn_id}.png\`. I grabbed ESPN player IDs by scraping the href attributes from player name links on the stats page — each link contains \`/id/3149391/\` or similar. A quick console script extracted all 117 IDs in seconds. Players from Basketball Reference who weren't on ESPN's qualified list just show their initials as a fallback.

The final dataset: 182 players, 20+ stat categories each, ESPN headshot URLs for 115 of them, all served as static JSON from an Express server. No API keys, no rate limits, no authentication — just clean local data that loads instantly.

Tools and techniques that made this work:
- Browser DevTools console as a scraping environment (bypasses server-side blocking)
- \`copy()\` function in Chrome to pipe JSON straight to clipboard
- Tab-separated text parsing for Basketball Reference data
- Name-matching to merge ESPN IDs with Basketball Reference stats
- Static JSON files instead of live API calls for reliability and speed

The whole data collection process took about two hours across a few sessions. Not glamorous, but the result is a complete, self-contained database that powers every page of the app — no external dependencies at runtime.`,
  },
  // Add more...
];
export default posts;