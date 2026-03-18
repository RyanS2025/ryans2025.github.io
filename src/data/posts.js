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
  // Add more...
];
export default posts;