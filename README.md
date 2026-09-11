# ryans2025.github.io

My personal portfolio website — built with React, Tailwind CSS, and React Router, deployed on GitHub Pages.

**Live site:** [ryansinha.dev](https://ryansinha.dev)

## About

I'm Ryan Sinha, a second-year Computer Science & Business student at Northeastern University. This site showcases my projects, blog posts, and a bit about me.

## Tech Stack

- **React** — component-based UI
- **Tailwind CSS** — utility-first styling
- **React Router** — client-side routing
- **Formspree** — contact form submissions
- **GitHub Pages** — hosting & deployment

## Pages

| Page | Description |
|------|-------------|
| **Home** | Hero section with featured projects and blog posts |
| **About** | Bio, skills, and background |
| **Projects** | Filterable grid of project cards with tag chips |
| **Blog** | Articles and project write-ups |
| **Contact** | Contact form powered by Formspree |

## Getting Started

```bash
# Clone the repo
git clone https://github.com/ryans2025/ryans2025.github.io.git
cd ryans2025.github.io/my-app

# Install dependencies
npm install

# Start the dev server
npm run dev
```

Open [http://localhost:5173](http://localhost:5173) to view it locally.

## Project Structure

```
src/
├── App.jsx              # Router + layout shell
├── main.jsx             # Entry point
├── index.css            # Tailwind import
├── components/
│   ├── Navbar.jsx       # Sticky nav with mobile menu
│   └── Footer.jsx       # Social links + copyright
├── pages/
│   ├── Home.jsx
│   ├── About.jsx
│   ├── Projects.jsx
│   ├── Blog.jsx
│   └── Contact.jsx
└── data/
    ├── projects.js      # Project content (title, tags, images, etc.)
    └── posts.js         # Blog post content
```

## Deployment

The site is deployed to GitHub Pages. To deploy:

```bash
cd ryans2025.github.io/my-app
npm run build
npm run deploy
```
