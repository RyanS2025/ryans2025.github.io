// Single-column resume following the Northeastern Khoury co-op checklist.
// Section order is fixed by that checklist:
//   Header -> Education -> Computer Knowledge -> Projects -> Experience -> Interests
//
// There is no separate Leadership & Activities section. The checklist's
// Experience section explicitly covers unpaid work, so Oasis and the Diwali
// Festival live in `experience` alongside the paid jobs, ordered by start date.
// Merging them reclaimed a section heading and its rule — roughly two lines —
// which is what pays for the 11pt body.

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
  // Left off deliberately: the page is full and Harvard marks it optional.
  summary: "",

  education: [
    {
      // Rendered as three lines, not one field per line. `school` and
      // `colleges` share line 1; `degree` and `gpa` share line 2. Giving each
      // its own line cost four lines for what reads fine as two.
      school: "Northeastern University",
      colleges: "Khoury College of Computer Sciences",
      location: "Boston, MA",
      // Names the major, so there is no separate "Major:" line.
      degree: "Candidate for a Bachelor of Science in Computer Science and Business Administration",
      gpa: "GPA: 3.80/4.0",
      // Full month names to match every other date on the page. The expected
      // graduation date sits on the coursework line instead of here: measured
      // at 10pt, the degree (513px) plus "September 2025 – Present (Expected
      // May 2029)" (290px) needs 815px of the 720px available and wrapped.
      dates: "September 2025 – Present",
      gradDate: "Expected May 2029",
      // In-progress courses are marked, which the checklist explicitly allows.
      coursework: [
        "Algorithms & Data (in progress)",
        "Computer Systems (in progress)",
        "Introduction to Databases",
        "Program Design & Implementation 1 & 2",
        "Discrete Structures",
        "Financial Accounting & Reporting",
        "Profit Analysis for Managerial Advising (in progress)",
      ],
      honors: ["Dean's List (Fall 2025, Spring 2026)"],
    },
  ],

  // Ordered by impact, not date: Lost and Hound is the live product with an
  // institutional partnership and leads the section. Bullet text matches
  // public/RyanSinhaResume.pdf word for word; only the ** anchors are added.
  projects: [
    {
      name: "Lost and Hound",
      role: "Founder & Project Lead",
      link: { label: "thelostandhound.com", href: "https://thelostandhound.com" },
      tech: "React, Node.js, Express, Supabase, PostgreSQL, Google Cloud Vision, Capacitor",
      dates: "February 2026 – Present",
      bullets: [
        "Drove user acquisition and retention to **150+ users** for a campus platform serving Northeastern's Student Center with a Capacitor iOS app.",
        "Pitched and partnered with **Student Center senior leadership** to unify peer reporting and maximize student engagement.",
        "Built **real-time layer** for live feed, direct messaging, moderator dashboards, and Google Maps integration.",
        "Enhanced engagement using keyword search, category filters, and **importance ranking** for high-priority items.",
        "Automated photo screening across **all user uploads** using Google Cloud Vision.",
        "Secured API with a **requireAuth → require2FA → role-guard** middleware chain, RLS, and tiered rate limiting.",
        "Created **moderator console** with queues, tickets, live stats, and an infrastructure cost tracker for spend projection.",
      ],
    },
    {
      name: "Backyard",
      role: "Founding Engineer",
      link: { label: "explorethebackyard.com", href: "https://explorethebackyard.com" },
      tech: "React, Express, Supabase, PostgreSQL, Vite, Tailwind CSS",
      dates: "May 2026 – Present",
      bullets: [
        "Centralized **campus club discovery** and event marketing to boost student onboarding and active engagement.",
        "Designed core **authentication system** (login, signup, reset, transactional email), club calendar, and search.",
        "Built a full-stack **content moderation system** featuring profanity filtering and Cloud Vision SafeSearch image scanning.",
        "Identified and patched **four world-writable Postgres RLS policies** exposing emails and administrative endpoints.",
        "Eliminated direct browser DB access using a **JWT-verified Express API** and standardized mass-assignment allowlists.",
        "Spearheaded marketing outreach and onboarding wizard, acquiring **15+ student clubs** via hashed invite links.",
      ],
    },
    {
      name: "BBAL Sim",
      // "Solo Developer" keeps the title line parallel with the other two
      // projects and, measured at 10pt, keeps it to one line (479px of the
      // 566px available). The descriptive subtitle moved to the italic line
      // below, which had room for it (683px of 720px).
      role: "Solo Developer",
      link: {
        label: "github.com/RyanS2025/NBA-Season-Simulation",
        href: "https://github.com/RyanS2025/NBA-Season-Simulation",
      },
      tech: "Basketball League Simulation Engine  ·  TypeScript, React, Dexie.js (IndexedDB), Web Workers, Vite",
      dates: "October 2025 – August 2026",
      bullets: [
        "Rebuilt Python simulator in TypeScript, enabling a **1,230-game season simulation in 10s** off main thread.",
        "Engineered game outcomes using player matchups across **29 skills and 22 tendencies** instead of single ratings.",
        "Integrated **10 personality traits** and a **100-writer press corps** dynamic to drive realistic award voting.",
      ],
    },
  ],

  // Reverse chronological by start date. Paid and unpaid together — the
  // checklist's Experience section covers both.
  experience: [
    {
      company: "Oasis at Northeastern",
      location: "Boston, MA",
      title: "Accelerator Project Lead & Project Mentor",
      dates: "September 2026 – Present",
      bullets: [
        "Lead two Accelerator teams totaling **18–20 developers**, directing sprint planning, code review, and task allocation.",
        "Mentor **3 first-year students** through full-stack software development, taking a project from setup to deployment.",
      ],
    },
    {
      // The resume merges both seasonal jobs into one entry.
      company: "Guerriero Gelato & Tropical Smoothie Cafe",
      location: "Caldwell, NJ; Livingston, NJ",
      title: "Retail & Food Service (Seasonal)",
      dates: "May 2023 – August 2026",
      bullets: [
        "**Promoted to Shift Leader**, managing teams of 3–5 staff and serving 150+ customers per shift during peak hours.",
      ],
    },
    {
      company: "United Asian Voices Diwali Festival",
      location: "West Orange, NJ",
      title: "Emcee & Founding Organizer",
      // A recurring one-day festival each October, not a continuous role.
      dates: "October 2022 – October 2025",
      bullets: [
        "Co-founded local festival, growing attendance to **200+ guests** and recruiting **20+ partner organizations**.",
      ],
    },
  ],

  // Rendered under the heading "Computer Knowledge" per the checklist.
  // Languages are ordered best-to-least as the checklist requires; the order
  // below is Ryan's own assessment of his proficiency.
  skills: [
    {
      category: "Languages",
      items: ["Python", "Java", "JavaScript", "TypeScript", "SQL", "HTML", "CSS"],
    },
    {
      category: "Frameworks & Libraries",
      items: ["React 19", "Node.js", "Express 5", "Tailwind CSS", "Material UI", "Framer Motion", "Capacitor"],
    },
    {
      category: "Tools & Platforms",
      items: [
        "Git", "GitHub Actions", "Supabase", "PostgreSQL", "Google Maps API", "Google Cloud Vision",
        "OneSignal", "Playwright", "Vitest", "Docker", "Railway", "Vercel", "Vite",
        "Mobile iOS Development", "Start-Up Marketing",
      ],
    },
  ],

  // A short list, not a sentence. Programming and BBAL Sim deliberately left
  // out — they are already the Projects section, and Interests should show
  // something the rest of the page does not.
  interests:
    "Jazz trumpet  ·  Playing basketball  ·  Sports analytics  ·  New York sports teams",
};

export default resumeData;
