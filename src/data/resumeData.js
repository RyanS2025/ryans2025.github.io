// Single-column resume following the Northeastern Khoury co-op checklist.
// Section order: Education -> Skills -> Projects -> Experience ->
// Leadership & Activities -> Interests.
// [BRACKETED] values are placeholders Ryan needs to fill in.

const resumeData = {
  name: "Ryan Sinha",

  contact: {
    location: "Boston, MA",
    phone: "(862) 321-7078",
    email: "ryan@ryansinha.dev",
    availability: "January – May 2027",
    links: [
      { label: "ryansinha.dev", href: "https://ryansinha.dev" },
      { label: "linkedin.com/in/ryansinha", href: "https://www.linkedin.com/in/ryansinha" },
      { label: "github.com/RyanS2025", href: "https://github.com/RyanS2025" },
    ],
  },

  // Optional — the Summary section renders only when this is non-empty.
  // Left off deliberately: the page is full, and Harvard marks this section
  // optional. Bullets showing real work beat a paragraph claiming it. Put a
  // sentence here only if you cut something else to make room.
  summary: "",

  education: [
    {
      school: "Northeastern University",
      location: "Boston, MA",
      degree: "Candidate for Bachelor of Science",
      major: "Major: Computer Science and Business Administration",
      concentration: "Khoury College of Computer Sciences & D'Amore-McKim School of Business",
      gradDate: "Expected May 2029",
      gpa: "GPA: 3.80/4.0",
      coursework: [
        "Program Design and Implementation",
        "Discrete Structures",
        "Fundamentals of Computer Science",
        "Object-Oriented Design",
      ],
      honors: [],
    },
    // West Orange High School (GPA 4.47, Top 10%, AP CS A) was removed once
    // the Oasis and Backyard entries filled the page. Standard practice is to
    // drop high school after freshman year, and the NEU GPA now carries the
    // academic signal. Restore it here if a role specifically asks.
  ],

  // Reverse chronological by start date.
  projects: [
    {
      name: "Backyard",
      role: "Project Lead & Lead Engineer",
      link: { label: "explorethebackyard.com", href: "https://explorethebackyard.com" },
      tech: "React, Supabase, Vite, Tailwind CSS",
      dates: "May 2026 – Present",
      bullets: [
        "Direct a team of 5 student developers building a campus club-discovery and events platform, taking it into production.",
        "Hardened authentication and account security across the platform's user accounts.",
        "Rebuilt and stabilized the existing codebase to make it release-ready.",
        "Built the club outreach wizard, onboarding 15+ campus clubs alongside 600+ seeded through scraping.",
      ],
    },
    {
      name: "Lost and Hound",
      role: "Founder & Project Lead",
      link: { label: "thelostandhound.com", href: "https://thelostandhound.com" },
      tech: "React, Node.js, Express, Supabase, Vite",
      dates: "March 2026 – Present",
      bullets: [
        "Built a full-stack campus platform for reporting and recovering lost items, with an interactive map and real-time messaging.",
        "Designed the Postgres schema and Supabase row-level security policies keeping contact details private and item reports searchable.",
        "Shipped an admin moderation dashboard and deployed to a custom domain, onboarding 100+ users across campus.",
        "Secured a November 2026 staff beta with Northeastern's Curry Student Center, ahead of a planned Spring 2027 campus launch.",
      ],
    },
    {
      name: "Personal Portfolio",
      role: "Developer",
      link: { label: "ryansinha.dev", href: "https://ryansinha.dev" },
      tech: "React, Tailwind CSS, React Router, Vite, Framer Motion",
      dates: "March 2026 – Present",
      bullets: [
        "Implemented a data-driven resume generator that renders this document and exports it as a text-based PDF.",
      ],
    },
    {
      name: "BBAL Sim",
      role: "Solo Developer",
      link: { label: "github.com/RyanS2025/RSinhaBBALSim", href: "https://github.com/RyanS2025/RSinhaBBALSim" },
      tech: "React, TypeScript, Tailwind CSS, Dexie.js, Vite",
      dates: "September 2025 – Present",
      bullets: [
        "Built a client-side basketball GM simulator driven by individual player matchups rather than overall ratings.",
        "Engineered a self-sustaining 30-team CPU league with an 82-game season, playoffs, draft lottery, and free agency.",
        "Implemented a locker-room morale system where unhappy stars demand trades, go public, and hold out.",
      ],
    },
  ],

  experience: [
    {
      company: "Tropical Smoothie Cafe",
      location: "Livingston, NJ",
      title: "Crew Member",
      dates: "March 2025 – September 2026",
      bullets: [
        "Served 150+ customers per shift in a high-volume cafe, preparing food and smoothies to order through peak rushes.",
        "Operated the POS system and reconciled cash drawers at close, maintaining accurate daily totals across 3–4 shifts per week.",
      ],
    },
    {
      company: "Guerriero Gelato",
      location: "Caldwell, NJ",
      title: "Shift Leader",
      dates: "May 2023 – July 2026",
      bullets: [
        "Led shifts of 3–5 staff, assigning stations, managing workflow, and running closing procedures.",
        "Trained new hires on POS operation, food safety, and service standards.",
      ],
    },
  ],

  leadership: [
    {
      organization: "Oasis at Northeastern",
      location: "Boston, MA",
      // Two distinct roles: Accelerator is the program that staffs standout
      // projects with dev teams; mentoring is separate and aimed at beginners.
      role: "Accelerator Project Lead & Project Mentor",
      dates: "September 2026 – December 2026",
      bullets: [
        "Lead developer teams for Lost and Hound and Backyard through Accelerator, Oasis's program for standout projects.",
        "Mentor first-year students through building their first computer science project, from environment setup to a working application.",
      ],
    },
    {
      organization: "United Asian Voices Diwali Festival",
      location: "West Orange, NJ",
      role: "Emcee & Founding Organizer",
      // Year-only on purpose: this is a recurring annual event, not a
      // continuous role. The deviation from Month Year – Month Year elsewhere
      // is a deliberate choice, not an oversight.
      dates: "2022 – 2025",
      bullets: [
        "Co-founded and organized West Orange's annual Diwali Festival, growing it to 200+ attendees across four years.",
        "Wrote and emceed the live program with a team of 5–6 students, and recruited 20+ local businesses and performers as participants.",
      ],
    },
    // West Orange Summer Enrichment (Camp Leader, June 2021 – June 2023) was
    // removed to fit one page once the Khoury checklist additions landed. It
    // predates college and was the weakest entry alongside Oasis.
  ],

  skills: [
    {
      category: "Languages",
      items: ["Python", "Java", "JavaScript", "TypeScript", "SQL", "HTML", "CSS"],
    },
    {
      category: "Frameworks & Libraries",
      // C++ and Flask removed: nothing on the page backs them since BBAL Sim
      // replaced the Flask simulator and the high-school coursework came out.
      items: ["React", "Node.js", "Express", "Tailwind CSS", "React Router"],
    },
    {
      category: "Tools & Platforms",
      items: ["Git", "GitHub", "Supabase", "PostgreSQL", "Vite", "IndexedDB", "REST APIs", "GitHub Pages"],
    },
  ],

  // One or two lines with brief context, not a bare list. Renders only when
  // non-empty. Written without first person to match the rest of the resume.
  interests:
    "Sports analytics and statistics, which drive BBAL Sim's simulation engine; solo programming projects; and music, played and taught.",
};

export default resumeData;
