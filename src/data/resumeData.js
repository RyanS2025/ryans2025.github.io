// Harvard resume format: single column, sections in order
// Education -> Projects -> Experience -> Leadership & Activities -> Skills.
// [BRACKETED] values are placeholders Ryan needs to fill in with real numbers.

const resumeData = {
  name: "Ryan Sinha",

  contact: {
    location: "Boston, MA",
    phone: "(862) 321-7078",
    email: "ryan@ryansinha.dev",
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
      degree: "Candidate for BS in Computer Science and Business Administration",
      concentration: "Khoury College of Computer Sciences & D'Amore-McKim School of Business",
      gradDate: "Expected May 2029",
      gpa: "GPA: 3.80",
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

  projects: [
    {
      name: "Lost and Hound",
      link: { label: "thelostandhound.com", href: "https://thelostandhound.com" },
      tech: "React, Node.js, Express, Supabase, Vite",
      dates: "March 2026 – Present",
      bullets: [
        "Built a full-stack campus platform for reporting and recovering lost items, with an interactive map and real-time messaging.",
        "Designed the Postgres schema and Supabase row-level security policies keeping contact details private and item reports searchable.",
        "Shipped an admin moderation dashboard and deployed to a custom domain, onboarding 100+ users across campus.",
        "Partnering with Northeastern's Curry Student Center on a November 2026 staff beta ahead of a planned Spring 2027 campus launch.",
      ],
    },
    {
      name: "Backyard",
      link: { label: "explorethebackyard.com", href: "https://explorethebackyard.com" },
      tech: "React, Supabase, Vite, Tailwind CSS",
      dates: "May 2026 – Present",
      bullets: [
        "Direct a team of student developers as project lead and lead engineer, taking a campus club-discovery and events platform into production.",
        "Administered authentication and account security, and refactored the existing codebase to stabilize it for release.",
        "Built the club outreach wizard that onboards campus clubs onto the platform.",
      ],
    },
    {
      name: "NBA Season Simulator",
      link: { label: "github.com/RyanS2025/NBA-Season-Simulation", href: "https://github.com/RyanS2025/NBA-Season-Simulation" },
      tech: "Python, Flask, nba_api",
      dates: "September 2025",
      bullets: [
        "Wrote a simulation engine that models individual player performance to project box scores for single games or full 82-game seasons.",
        "Integrated the nba_api library to pull real player statistics as simulation inputs, exposed through a Flask interface with a searchable player lookup.",
      ],
    },
    {
      name: "Personal Portfolio",
      link: { label: "ryansinha.dev", href: "https://ryansinha.dev" },
      tech: "React, Tailwind CSS, React Router, Vite, Framer Motion",
      dates: "March 2026 – Present",
      bullets: [
        "Built and deployed a personal site featuring project case studies, a blog, and a contact form, served from a custom domain on GitHub Pages.",
        "Implemented a data-driven resume generator that renders this document from a single source of truth and exports it as a text-based PDF.",
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
        "Resolved customer issues on the floor and handled cash reconciliation with zero drawer discrepancies.",
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
        "Lead the developer teams for Lost and Hound and Backyard through Accelerator, the Oasis program that staffs standout student projects.",
        "Mentor first-year students through building their first computer science project, from environment setup to a working application.",
      ],
    },
    {
      organization: "United Asian Voices Diwali Festival",
      location: "West Orange, NJ",
      role: "Emcee & Founding Organizer",
      dates: "2022 – 2025",
      bullets: [
        "Co-founded and organized West Orange's annual Diwali Festival, growing it to 200+ attendees across four years.",
        "Wrote and emceed the live program with a team of 5–6 students, and recruited 20+ local businesses and performers as participants.",
      ],
    },
    {
      organization: "West Orange Summer Enrichment",
      location: "West Orange, NJ",
      role: "Camp Leader",
      dates: "June 2021 – June 2023",
      bullets: [
        "Taught instrumental music to 20+ students ages 8–14, adapting lesson plans to a wide range of skill levels.",
        "Supervised the aftercare program and organized daily activities for groups of 10–15 children.",
      ],
    },
  ],

  skills: [
    {
      category: "Languages",
      items: ["Python", "Java", "JavaScript", "C++", "SQL", "HTML", "CSS"],
    },
    {
      category: "Frameworks & Libraries",
      items: ["React", "Node.js", "Express", "Flask", "Tailwind CSS", "React Router"],
    },
    {
      category: "Tools & Platforms",
      items: ["Git", "GitHub", "Supabase", "PostgreSQL", "Vite", "REST APIs", "GitHub Pages"],
    },
  ],
};

export default resumeData;
