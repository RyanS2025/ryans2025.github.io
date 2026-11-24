// Single-column resume following the Northeastern Khoury co-op checklist.
// Section order is fixed by that checklist:
//   Header -> Education -> Technical Skills -> Projects -> Experience
//
// There is no separate Leadership & Activities section. The checklist's
// Experience section explicitly covers unpaid work, so Oasis and the Diwali
// Festival live in `experience` alongside the paid jobs, ordered by start date.
//
// Text matches public/RyanSinhaResume.pdf word for word; only the ** anchors
// are added, and they mark exactly the runs the PDF sets in bold.

const resumeData = {
  name: "Ryan Sinha",

  contact: {
    location: "Boston, MA",
    phone: "(862) 321-7078",
    email: "ryansinha@gmail.com",
    availability: "January – August 2027",
    links: [
      { label: "ryansinha.dev", href: "https://ryansinha.dev" },
      { label: "linkedin.com/in/ryan-sinha-306986387", href: "https://www.linkedin.com/in/ryan-sinha-306986387" },
      { label: "github.com/RyanS2025", href: "https://github.com/RyanS2025" },
    ],
  },

  // Optional — the Summary section renders only when this is non-empty.
  summary: "",

  education: [
    {
      school: "Northeastern University",
      colleges: "Khoury College of Computer Sciences",
      location: "Boston, MA",
      // Names the major, so there is no separate "Major:" line.
      degree: "Candidate for a Bachelor of Science in Computer Science and Business Administration",
      gpa: "GPA: 3.80/4.0",
      dates: "September 2025 – Present",
      gradDate: "Expected May 2029",
      // The PDF marks in-progress courses with an asterisk; spelled out here
      // because the About page shows this list without the PDF's footnote.
      coursework: [
        "Algorithms & Data (in progress)",
        "Computer Systems (in progress)",
        "Introduction to Databases",
        "Program Design & Implementation 1 & 2",
        "Discrete Structures",
        "Financial Accounting & Reporting",
      ],
      honors: ["Dean's List (Fall 2025, Spring 2026)"],
    },
  ],

  // Ordered by impact, not date: Lost and Hound is the live product with an
  // institutional partnership and leads the section.
  //
  // `tech` is "Subtitle  ·  stack" (the PDF prints a " | " there).
  // projectDetails() keeps only the part after the dot for the modal's STACK row.
  projects: [
    {
      name: "Lost and Hound",
      role: "Founder & Project Lead",
      link: { label: "thelostandhound.com", href: "https://thelostandhound.com" },
      tech: "Campus Lost-and-Found Platform (Web + iOS)  ·  React, Express, PostgreSQL, Capacitor",
      dates: "February 2026 – Present",
      bullets: [
        "Launched a web and App Store iOS app, growing to **150+ users** and leading development as the team scaled to **10 engineers**.",
        "Pitched Curry Student Center leadership and delivered a pilot-ready staff system for item inventory, pickup logging, and automated student emails.",
        "Secured the API with a requireAuth → require2FA → role-guard middleware chain, row-level security, and tiered rate limiting.",
        "Built a real-time layer for the live feed, direct messaging, and moderator dashboards, with Google Maps integration.",
        "Automated screening of all user-uploaded photos using Google Cloud Vision.",
        "Created a moderator console with queues, tickets, live stats, and an infrastructure cost tracker for spend projection.",
      ],
    },
    {
      name: "Backyard",
      role: "Founding Engineer",
      link: { label: "explorethebackyard.com", href: "https://explorethebackyard.com" },
      tech: "Campus Club Discovery Platform  ·  React, Express, PostgreSQL",
      dates: "May 2026 – Present",
      bullets: [
        "Found and patched 4 world-writable Postgres RLS policies that exposed user emails and admin endpoints.",
        "Eliminated direct browser database access with a JWT-verified Express API and mass-assignment allowlists.",
        "On an 8-engineer team, designed core auth (login, signup, reset, email), the club calendar, and search.",
        "Built a content moderation pipeline with profanity filtering and Cloud Vision SafeSearch image scanning.",
        "Redesigned all 9 pages with light/dark mode and mobile layouts verified at 360 px wide in both themes.",
        "Added preloading and caching, making calendar loads **7× faster** (658 → 89 ms) and opening club pages in 31 ms.",
        "Led outreach and built an onboarding wizard, signing **15+ student clubs** through hashed invite links.",
      ],
    },
    {
      name: "BBAL Sim",
      role: "Solo Developer",
      link: {
        label: "github.com/RyanS2025/Basketball-Season-Simulation",
        href: "https://github.com/RyanS2025/Basketball-Season-Simulation",
      },
      tech: "Basketball League Simulation Engine  ·  TypeScript, Python",
      dates: "October 2025 – August 2026",
      bullets: [
        "Rebuilt a Python simulator in TypeScript, running a **1,230-game season in 10 seconds** off the main thread.",
        "Modeled game outcomes from player matchups across 29 skills and 22 tendencies instead of single overall ratings.",
        "Added 10 personality traits and a 100-writer simulated press corps to drive realistic award voting.",
      ],
    },
  ],

  // Reverse chronological by start date. Paid and unpaid together — the
  // checklist's Experience section covers both.
  experience: [
    {
      company: "Oasis at Northeastern",
      location: "Boston, MA",
      title: "Accelerator Project Lead & Mentor",
      dates: "September 2026 – Present",
      bullets: [
        "Lead 2 accelerator teams totaling **18–20 developers**, running sprint planning, code review, and task allocation.",
        "Mentor 4 first-year students through full-stack development, taking a project from setup to deployment.",
      ],
    },
    {
      // The PDF leads this line with the title ("Shift Leader — Guerriero
      // Gelato; Tropical Smoothie Cafe"); the fields keep the usual shape.
      company: "Guerriero Gelato; Tropical Smoothie Cafe",
      location: "NJ (Seasonal)",
      title: "Shift Leader",
      dates: "May 2023 – August 2026",
      bullets: [
        "Promoted to Shift Leader, managing teams of 3–5 staff and serving 150+ customers per shift.",
      ],
    },
    {
      company: "United Asian Voices Diwali Festival",
      location: "West Orange, NJ",
      title: "Co-Founder & Emcee",
      // A recurring one-day festival each October, not a continuous role.
      dates: "October 2022 – October 2025",
      bullets: [
        "Co-founded a local festival, growing attendance to **200+** guests with 20+ partner organizations.",
      ],
    },
  ],

  // Languages are ordered best-to-least, per the checklist; the order is
  // Ryan's own assessment of his proficiency.
  skills: [
    {
      category: "Languages",
      items: ["Python", "Java", "JavaScript", "TypeScript", "SQL", "HTML", "CSS"],
    },
    {
      category: "Frameworks & Libraries",
      items: ["React", "Node.js", "Express", "Tailwind CSS", "Material UI", "Framer Motion", "Capacitor (iOS)"],
    },
    {
      category: "Tools & Platforms",
      items: [
        "Git", "GitHub Actions", "Docker", "PostgreSQL", "Supabase", "Railway", "Vercel", "Vite",
        "Playwright", "Vitest", "Google Cloud Vision", "Google Maps API", "OneSignal",
      ],
    },
  ],

  // Not on the PDF any more; kept for ResumeTemplate, which renders it only
  // when present. Empty so the template and PDF agree.
  interests: "",
};

export default resumeData;
