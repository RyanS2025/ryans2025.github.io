# Deep Field — Portfolio Makeover Design

**Date:** 2026-09-30
**Status:** Draft, awaiting review
**Approved preview:** `.superpowers/brainstorm/18652-1790807535/content/deep-field-v3.html` (the reference for every motion number below)

## 1. Goal

Rebuild ryansinha.dev with a more polished look and smooth, purposeful motion, while keeping it **content-first** for its main audience: co-op and internship recruiters, who skim for about 30 seconds.

Success looks like:
- Name, one-line pitch, and a way to see projects are visible on first paint, with no scroll or animation gating them.
- Motion shows off Ryan's own work (project cards flying out of his Milky Way photo), not decoration for its own sake.
- Every project's full detail is one click away from the homepage.
- The site stays fast on GitHub Pages and usable with reduced motion, on phones, and by keyboard.

## 2. Decisions from brainstorming

| Decision | Chosen | Rejected, and why |
|---|---|---|
| Overall direction | Minimal, content-first, motion built from Ryan's own work | Scroll-jacked full-canvas site like perappelgren.de: hides text-heavy content from skimming recruiters, breaks trackpads, phones, and screen readers |
| Theme | Space, building on the existing Milky Way photo (`HeroBackdrop.png`, Ryan's own) and amber accent | Knicks/basketball theme; real Brunson footage (likeness and licensing) |
| Homepage concept | **Deep Field**: scroll warps through the starfield while project "modal fronts" fly out of the depth | Orbit (projects circling a sun), Mission Log (editorial timeline) |
| Project cards in the fly-through | Mini versions of the project modal that pause, can be clicked, and open the full modal | Raw screenshots |
| Modal scroll progress | Mission Log's amber trajectory line, used as a progress rail | Plain progress bar |
| "View work" button | Auto-flies through the hero in about 3s, then fades into Featured work | Instant anchor jump |
| Assets | `HeroBackdrop.png` only | `HeroBackdrop2.png` (a Project Hail Mary still, not Ryan's) is not used anywhere in the new design |

## 3. Scope

**In scope**
- New visual system (colors, type, motion rules) applied site-wide.
- Homepage rebuilt around the Deep Field hero, fly-through, and View work autopilot.
- ProjectModal rebuilt with sections and a progress rail.
- ResumeModal available site-wide (nav, homepage hero, About page).
- Navbar and Footer restyled.
- About, Projects, Blog, BlogPost, Contact, and 404 restyled onto the new system through a shared `PageHero`.
- Unit tests for the motion math.

**Out of scope**
- Content rewrites beyond the homepage pitch line.
- `ResumeTemplate.jsx` and `printResume.js`, which are tuned for the one-page Khoury PDF. The ResumeModal's behavior (confetti, ding, PNG/PDF download) is kept exactly; only its surface styling changes.
- New pages, a CMS, or analytics.
- Changes to the Formspree integration or the GitHub Pages deploy flow.

## 4. Visual system

Defined once as Tailwind v4 `@theme` tokens in `src/index.css`.

| Token | Value | Use |
|---|---|---|
| `--color-space` | `#05060a` | Page background (replaces `gray-950`) |
| `--color-ink` | `#EDEEF2` | Primary text |
| `--color-mute` | `#8b8f9c` | Secondary text |
| `--color-line` | `rgba(255,255,255,.09)` | Borders and dividers |
| `--color-amber` | `#fbbf24` | The single accent (same as today's `amber-400`, so brand continuity holds) |
| `--color-glass` | `rgba(15,20,35,.66)` | Modal surfaces (same as today's ProjectModal) |
| Status green | `#4ade80` | "Active" pill only |

**Type**
- Geist (already loaded) for everything.
- Add **Geist Mono** for eyebrows, the HUD, rail labels, and tags that read as data.
- Display name: 600 weight, `clamp(56px, 9vw, 132px)`, letter-spacing `-0.045em`.

**Surfaces**
- Glass surfaces (`backdrop-filter`) only on elements that do **not** transform every frame: modals and the nav.
- Anything animated per frame gets a near-opaque gradient instead (see §10).

**Removed**
- `StarField`'s role on the homepage (replaced by `WarpField`).
- The glowing gradient divider.
- The unused `App.css` (Vite template leftover; not imported anywhere).
- `ClickSparkle` stays as-is.

## 5. Homepage

### 5.1 Hero (first paint)
- Full-viewport sticky stage: the Milky Way photo, the `WarpField` canvas, and a radial vignette.
- Centered content:
  - Eyebrow `NORTHEASTERN · CS & BUSINESS` (mono, amber)
  - `Ryan Sinha`
  - Pitch: "I build full-stack products people actually use, and lead developer teams as an Oasis Accelerator Project Lead."
  - Two buttons: **View work** (amber, primary) and **Resume** (ghost).
- The button row uses `align-items: center` so one button's size can never stretch the other.
- A "Scroll to launch ↓" hint fades out as soon as scrolling starts.

### 5.2 Fly-through
The hero section is `620vh` tall, and its stage is sticky. Hero progress `p ∈ [0,1]` drives everything:

| Element | Behavior |
|---|---|
| Sky photo | `scale(1 + 0.45p) rotate(6p deg)`; image box is 110% so rotation never shows its edges |
| Title block | opacity `1 − p/0.07`, `scale(1 + 4p)`, not clickable once `p > 0.04` |
| Warp stars | 520 stars; speed `0.0009 + min(scrollVelocity, 60) × 0.00045`; stars draw as streaks from their previous to current projected point |
| Project fronts | Card `i` has local time `t = (p − (0.10 + 0.215i)) / 0.27`, then goes through the phases below |

Front phases:

| Phase | `t` range | Scale | Opacity | Notes |
|---|---|---|---|---|
| Approach | 0 → 0.35 | 0.05 → 1 (ease-out cubic) | fades in over the first 0.12 | Moves to its lane `X = ±15vw` (alternating), `Y = ±2vh` |
| Hold | 0.35 → 0.68 | 1 → 1.08 | 1 | Clickable (`t ∈ (0.3, 0.72)`); amber ring glow on hover |
| Depart | 0.68 → 1 | 1.08 → about 3.7 | `(1 − min(k/0.5, 1))²`, so fully gone by about 1.8× | z-index **below** the arriving card |

- **Front content** is a mini version of the modal: first screenshot, title, Active pill, one-line description, tags, and an `OPEN ↗` label.
- **HUD** (bottom-left, mono): `02 / 04 · BACKYARD · CLICK TO OPEN` plus 4 tick marks. It shows whichever card is arriving or holding, and is visible for `0.08 < p < 0.98`.
- **Order:** `projects.js` featured order (the same sort Home uses today).
- **Narrow screens (<800px):** `X = 0`, cards `84vw` wide.

### 5.3 View work autopilot
Triggered by the hero's **View work** button.
1. Animate `window` scroll from the current position to the end of the hero.
   - Duration: `900 + 2300 × (remaining distance / hero scroll length)` ms, about 3.2s from the top.
   - Easing: ease-in-out cubic.
   - The warp speeds up on its own because it follows scroll velocity.
2. During the flight, fronts can't be clicked, the HUD is hidden, and the nav stays transparent.
3. Any wheel, touch, or key input cancels the flight and returns control to the visitor.
4. On arrival, a full-screen `space`-colored cover fades in (0.35s). Behind it, the page jumps to `#work` and the nav turns solid. Then the cover fades out while the work cards fade up with a 90ms stagger.
5. If already past the hero, skip straight to step 4. With reduced motion, jump directly.

### 5.4 Below the hero
- **Featured work:** a 2-column grid of cards (screenshot, title, pill, one-liner, tags). Clicking a card opens the same modal as its front. Cards reveal on scroll, fading up with a 90ms stagger.
- **Featured posts:** kept from today's Home, restyled as a list with titles and dates.
- **Footer.**

## 6. Project modal

Replaces `ProjectModal.jsx`. It keeps the current glass look, the image carousel with arrows and dots, and the GitHub / Request access / Website actions, including the existing `/contact` prefill.

**Layout:** a `64px` progress rail on the left, and a scrolling body on the right.

Body sections render **only when their data exists**. The rail gets one node per rendered section.

| # | Section | Source |
|---|---|---|
| — | Hero carousel, title, pill, tags | `projects.js` |
| 01 | Overview | `project.description` |
| 02 | Highlights | `resumeData.projects[*].bullets` matched by name, rendered with `renderEmphasis` (bold facts). Omitted for projects that aren't on the resume (currently WNBA Reference). |
| 03 | Gallery | `project.images`, 2-column; clicking one sets the carousel and scrolls to the top |
| 04 | Stack & role | `resumeData` `role`, `tech`, `dates`; rows without data are omitted |
| 05 | Links | Existing action buttons |

**Progress rail**
- A dotted track, with an amber glowing stroke drawn over it (`stroke-dashoffset`).
- Nodes are evenly spaced. The glow reaches node `i` when section `i`'s heading crosses 30% down the scroll view.
- Trailing sections that can never reach that line split the remaining scroll evenly, so each still lights in order and the last one lights at 100%.
- Nodes are `<button>`s with `aria-label="Jump to Highlights"` and similar. They show their section name on hover or focus, never permanently, so labels can't cover body text.
- Percentage readout at the bottom.
- Rebuilt on open, on resize, and when images load.

**Open and close**
- Opening records the source element's bounding box, then animates the modal from that box to its final size (0.55s, `cubic-bezier(.2,.9,.2,1)`). This works for both hero fronts and grid cards.
- Close with the ✕ button, a backdrop click, or Esc. ← and → switch images.
- Body scroll is locked while the modal is open, and the warp slows to idle.

**Accessibility**
- `role="dialog"` with `aria-modal="true"` and `aria-labelledby` pointing to the title.
- Focus moves to the close button on open and returns to the source card on close.
- Tab is trapped inside the modal.

## 7. Resume modal (site-wide)

- New `ResumeProvider` context wraps the app and exposes `openResume()`. It owns the download handlers that currently live in `About.jsx` and renders the existing `ResumeModal`.
- Triggers:
  - Nav "Resume"
  - Homepage hero "Resume"
  - About page "Download Resume →"
- The close button sits on a dark chip (`rgba(15,20,35,.85)`) so it stays visible over the white resume image.

## 8. Navbar and footer

**Navbar**
- Full-width fixed bar, replacing today's floating pill.
- Left: `Ryan Sinha.` (amber period) linking to `/`.
- Right: About, Projects, Blog, Contact, **Resume** (opens the modal), plus GitHub and LinkedIn icons.
- Active route shown in `ink`; other links in `mute`.
- Transparent by default. Turns solid (`space` at 72% with a 14px blur and a bottom `line` border) only when page content is underneath it, and **never during autopilot**.
  - On the homepage, "content underneath" means `scrollY + navHeight > #work.offsetTop`.
  - On other pages it is solid once `scrollY > 8`.
- The existing mobile menu is restyled with the same tokens.

**Footer:** "Get in touch →" linking to `/contact`, social icons, and `© {year} Ryan Sinha`.

## 9. Other pages

- **`PageHero`:** a new shared component replacing the five copies of the backdrop hero block. Props: `title`, `subtitle`, optional `back` link. It shows the Milky Way photo at 50% opacity with a slow scroll parallax (`scale 1 → 1.08`) and a fade into `space`.
- **About:** layout unchanged; restyled with the new tokens.
- **Projects:** filter chips, then the grid. Cards share the component and modal used on the homepage.
- **Blog:** a post list in the same style as Featured posts.
- **BlogPost:** `PageHero` with a back link, and body text at `max-w-3xl`.
- **Contact:** the form restyled with the new tokens. Formspree behavior and the prefill stay untouched.
- **404:** uses `PageHero`.
- `StarField` stays behind subpage content, where it already works well.
- `PageTransition` stays as it is: fade plus a 20px lift, and scroll to top on mount.

## 10. Motion and performance rules

These rules came from bugs found while building the preview.
1. **No `backdrop-filter` on anything transformed per frame.** A scaled blur layer renders as a flickering black box.
2. **A departing element must stack below the arriving one, and be fully transparent before it grows past the viewport.**
3. **Animate only `transform` and `opacity` per frame.** Scroll-driven values go through framer-motion `useScroll`, `useTransform`, and `useMotionValueEvent`, not React state, so scrolling never re-renders the tree.
4. **Pause `WarpField`** when the hero is off-screen (IntersectionObserver) or the tab is hidden. Cap the device pixel ratio at 2.
5. **Global class names must not collide.** Preview bug: a `.sec` class for modal sections also matched the ghost button. Styling lives in Tailwind utilities on each component, and any leftover custom CSS uses component-prefixed names.
6. **Images:**
   - Convert `HeroBackdrop.png` (2.5MB, actually a JPEG) to WebP at 2000px, target 300KB or less. It's the largest image on first paint.
   - Preload the four front screenshots.
   - Use `loading="lazy"` below the fold.

## 11. Reduced motion, mobile, accessibility

- **`prefers-reduced-motion`:**
  - Hero is static (no warp motion, no sky transform).
  - The fly-through section collapses to normal height, and the fronts render as a static row of cards.
  - View work jumps straight to `#work`.
  - The modal opens with a plain fade, and the rail still tracks progress.
- **Mobile:** the fly-through keeps its full height, but cards are centered and `84vw`. Modal rail is `40px` with no hover labels. Galleries go to one column.
- **Keyboard:** fronts and cards are focusable `<button>`s. Visible amber focus rings throughout.

## 12. Architecture

```
src/
├── index.css                      # @theme tokens, font vars (Geist, Geist Mono)
├── App.jsx                        # + ResumeProvider around the layout
├── context/ResumeContext.jsx      # openResume(); owns download handlers; renders ResumeModal
├── lib/
│   ├── flight.js                  # pure: frontPose(t, i, narrow) → {scale,x,y,opacity,z,live}; heroFocus(p)
│   ├── rail.js                    # pure: buildKnots(sectionTops, maxScroll, lineOffset); progressAt(knots, scrollTop)
│   └── projectDetails.js          # pure: merges projects.js entry + matching resumeData project
├── hooks/
│   └── useAutopilot.js            # flyTo(targetY, {duration}) with input-cancel; returns {flying}
├── components/
│   ├── home/DeepFieldHero.jsx     # sticky stage, sky, title, CTAs, fronts, HUD; drives flight.js
│   ├── home/WarpField.jsx         # canvas; reads a scroll-velocity motion value; pause via IO
│   ├── home/ProjectFront.jsx      # mini-modal card
│   ├── ProjectCard.jsx            # grid card (Home + Projects)
│   ├── ProjectModal.jsx           # rebuilt: sections + ProgressRail + carousel + actions
│   ├── ProgressRail.jsx           # SVG track/glow + nodes; uses rail.js
│   ├── PageHero.jsx               # shared subpage hero
│   ├── Navbar.jsx / Footer.jsx    # restyled
│   └── ResumeModal.jsx            # unchanged behavior; close-button contrast fix
└── pages/                         # Home rebuilt; others restyled onto PageHero + tokens
```

**Data flow:** `projects.js` and `resumeData.js` go into `projectDetails()`. `DeepFieldHero`, `ProjectCard`, and `ProjectModal` all consume that one merged shape, so the modal and the resume can't drift apart.

**Motion math:** all the phase and rail math lives in `lib/`, separate from React and the DOM, so it can be unit-tested.

## 13. Testing and verification

- **Unit tests (Vitest, new dev dependency):**
  - `flight.js`: phase boundaries; depart opacity is 0 before scale reaches 1.9; depart z is below arrive z; narrow lanes are centered.
  - `rail.js`: knots increase monotonically; trailing sections that can't reach the line are spread so the last one lands exactly at max scroll; `progressAt` at 0 and max.
  - `projectDetails.js`: WNBA Reference has no highlights section; Lost and Hound gets 5 bullets with the markers intact.
- **Scripted browser checks** (Playwright, the same probes used on the preview):
  - Buttons have equal height and padding.
  - Across 400 hero steps, no visible card is wider than 80vw, and a departing card is never on top.
  - The HUD label matches the visible card.
  - The nav stays non-solid during autopilot, and autopilot lands exactly at `#work`.
  - Modal rail nodes light in order: `00000` at 0% through `11111` at 100%.
  - Reduced-motion mode has no transforms on the hero.
- **Gates before deploy:** `npm run lint`, `npm run build`, and a Lighthouse check (performance ≥ 90, accessibility ≥ 95 on the homepage).

## 14. Delivery phases

1. **Foundation:** tokens, fonts, `lib/` with tests, `ResumeProvider`, restyled Navbar and Footer, delete `App.css`, optimize the backdrop image.
2. **Homepage:** `WarpField`, `DeepFieldHero` with fronts and HUD, autopilot, Featured work and posts.
3. **Modal:** `ProjectModal` rebuild with `ProgressRail`, open-from-source animation, accessibility.
4. **Subpages:** `PageHero`, then restyle About, Projects, Blog, BlogPost, Contact, and 404.
5. **Verification and deploy:** scripted checks, Lighthouse, `npm run deploy`.

Each phase leaves the site deployable.

## 15. Open item for Ryan

- `public/RyanSinha_Resume.png` and `RyanSinhaResume.pdf` don't match `resumeData.js`. For example, the PNG's Lost and Hound bullets begin "Drove user acquisition…", while the data says "Operate a live campus lost-and-found with 130+ users…". The modal's Highlights will come from `resumeData.js`. If that's the current version, re-export the PNG and PDF before launch so the resume modal matches.
