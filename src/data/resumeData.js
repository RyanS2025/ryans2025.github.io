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
    email: "ryan@ryansinha.dev",
    availability: "January – August 2027",
    links: [
      { label: "ryansinha.dev", href: "https://ryansinha.dev" },
      { label: "linkedin.com/in/ryansinha", href: "https://www.linkedin.com/in/ryansinha" },
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
      // Both colleges in full. At 10pt this line measures 695px against the
      // 720px of usable width; it did not fit at 10.5pt, which is part of why
      // the body size came back down.
      colleges: "Khoury College of Computer Sciences & D'Amore-McKim School of Business",
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
      // Fundamentals of Computer Science removed — not taken. CS3000 is in
      // progress, which the checklist explicitly allows.
      coursework: [
        "Algorithms and Data",
        "Object-Oriented Design",
        "Program Design and Implementation",
        "Discrete Structures",
      ],
      honors: [],
    },
  ],

  // Ordered by impact, not date: Lost and Hound is the live product with an
  // institutional partnership and leads the section.
  // TODO(ryan): bullets below are the PREVIOUS text, kept as a placeholder so
  // the layout can be measured. They get rewritten from the Strengths Reports
  // once the outstanding interview answers land.
  // Ordered by impact, not date: Lost and Hound is the live product with an
  // institutional partnership and leads the section. Every claim below is
  // either verified in the repo or supplied by Ryan; see the bullet notes.
  projects: [
    {
      name: "Lost and Hound",
      role: "Founder & Project Lead",
      link: { label: "thelostandhound.com", href: "https://thelostandhound.com" },
      tech: "React, Node.js, Express, Supabase, PostgreSQL, Google Cloud Vision, Capacitor",
      dates: "February 2026 – Present",
      bullets: [
        "Operate a live campus lost-and-found with **130+ users** across web and iOS, five months in production.",
        "Screen photo uploads via a **two-stage Cloud Vision pipeline** rejecting IDs and cards by Luhn and MRZ checks.",
        "Partnered with **Northeastern's Curry Student Center** to route handovers through their desk, enforced server-side.",
        "Built **76 REST endpoints** over 21 Postgres tables behind two-factor auth, passkeys, and moderator guards.",
        "Deployed to Railway via gated GitHub Actions, covered by **116 unit tests** and 8 Playwright end-to-end specs.",
      ],
    },
    {
      name: "Backyard",
      role: "Founding Engineer",
      link: { label: "explorethebackyard.com", href: "https://explorethebackyard.com" },
      tech: "React, Express, Supabase, PostgreSQL, Vite, Tailwind CSS",
      dates: "May 2026 – Present",
      bullets: [
        "Overhauled a stalled club-discovery platform, introducing sprint planning and code review for a **core team of 5**.",
        "Closed **four world-writable Postgres RLS policies** exposing user emails and allowing anonymous profile writes.",
        "Eliminated direct database access from the browser, routing all mutations through a **JWT-verified Express API**.",
        "Built the club onboarding wizard now used by **15 clubs**, with hashed invite tokens and atomic redemption.",
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
      // Start date is the first commit on the remote's default branch:
      //   git log origin/HEAD --reverse --format='%ad' --date=short | head -1
      dates: "October 2025 – Present",
      bullets: [
        "Engineered a sim resolving games from player matchups across **29 skills and 22 tendencies**, not overall rating.",
        "Modeled **10 personality traits** that move morale, chemistry, and shooting, escalating demands into holdouts.",
        "Simulated awards via a **100-writer press corps** with beat and market bias, so media personality moves ballots.",
        "Rebuilt a Python simulator in TypeScript, simulating a full **1,230-game season in 10 seconds** off the main thread.",
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
      dates: "September 2026 – December 2026",
      bullets: [
        "Lead two Accelerator teams of **16–18 developers** total, running sprint planning, code review, and task assignment.",
        "Mentor **first-year students** building their first computer science project, from environment setup to a working app.",
      ],
    },
    {
      company: "Tropical Smoothie Cafe",
      location: "Livingston, NJ",
      title: "Crew Member",
      dates: "March 2025 – September 2026",
      bullets: [
        "Served **150+ customers per shift** in a high-volume cafe, preparing food and drinks through peak rushes.",
        "Operated the POS and reconciled cash drawers at close, keeping daily totals accurate across 3–4 shifts a week.",
      ],
    },
    {
      company: "Guerriero Gelato",
      location: "Caldwell, NJ",
      title: "Shift Leader",
      dates: "May 2023 – July 2026",
      bullets: [
        "**Promoted to Shift Leader** in a second year, leading shifts of 3–5 staff and running closing procedures.",
        "Trained new hires on POS operation, food safety, and service standards.",
      ],
    },
    {
      company: "United Asian Voices Diwali Festival",
      location: "West Orange, NJ",
      title: "Emcee & Founding Organizer",
      // A recurring one-day festival each October, not a continuous role.
      dates: "October 2022 – October 2025",
      bullets: [
        "Co-founded and organized West Orange's annual Diwali Festival, growing it to **200+ attendees** across four years.",
        "Wrote and emceed the live program with a team of 5–6, recruiting **20+ local businesses** and performers.",
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
      items: ["React", "Node.js", "Express", "Tailwind CSS", "Material UI", "Dexie.js", "Capacitor"],
    },
    {
      category: "Tools & Platforms",
      items: [
        "Git", "GitHub Actions", "Supabase", "PostgreSQL", "Supabase Realtime",
        "Google Cloud Vision", "Playwright", "Vitest", "Docker", "Railway", "Vercel", "Vite",
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
