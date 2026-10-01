# Deep Field Makeover Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Rebuild ryansinha.dev as the approved "Deep Field" design. The space theme builds on Ryan's Milky Way photo. On the homepage, scrolling flies through project modal fronts, and View work runs an autopilot through them. The project modal gets a scroll progress rail, the resume modal is available site-wide, and every subpage is restyled.

**Architecture:**
- All motion math lives in pure functions in `src/lib/`, unit-tested with Vitest.
- React components apply that math straight to DOM styles from framer-motion scroll events, so scrolling never re-renders the tree.
- Data comes from `projects.js` merged with `resumeData.js` through one `projectDetails()` function.

**Tech Stack:** React 19, Vite 7, Tailwind CSS v4 (`@theme`), framer-motion 12, react-router-dom 7, Vitest 5 (new), GitHub Pages via `gh-pages`.

**Spec:** `docs/superpowers/specs/2026-09-30-deep-field-makeover-design.md`

**Reference implementation:** `.superpowers/brainstorm/18652-1790807535/content/deep-field-v3.html` is the approved, browser-verified preview. Where a task says "port from preview", the vanilla JS there is the behavioral source of truth, and the numbers in this plan match it.

## Global Constraints

- Colors:
  - `space #05060a`
  - `ink #EDEEF2`
  - `mute #8b8f9c`
  - `line rgba(255,255,255,.09)`
  - `amber #fbbf24`
  - `glass rgba(15,20,35,.66)`
  - Status green `#4ade80` ("Active" pill only)
- Fonts: Geist (body and display) and Geist Mono (eyebrows, HUD, rail labels).
- Never use `HeroBackdrop2.png`. The only backdrop is Ryan's Milky Way photo, converted to `HeroBackdrop.webp`.
- No `backdrop-filter` on any element transformed per frame. Departing cards stack below arriving ones and are transparent before they pass 1.9× scale.
- Animate only `transform` and `opacity` per frame. Scroll values are never stored in React state.
- Leave `ResumeTemplate.jsx` and `printResume.js` untouched. ResumeModal keeps its confetti, ding, and download behavior.
- Leave the Formspree form ID `meervdlq`, the `/contact` prefill flow, the `index.html` SPA redirect script, `public/404.html`, and `CNAME` untouched.
- Every phase leaves `npm run lint`, `npm test`, and `npm run build` passing.

## Review Focus

1. **Modal content shorter than the modal** (a project with no highlights and one image, so nothing can scroll). Expected: the rail shows fully lit at 100% and never divides by zero. Pinned by a test in Task 3.
2. **Modal with only one section.** Expected: the single node renders at the top with no NaN coordinates. Pinned by a test in Task 3.
3. **Visitor scrolls during the View work autopilot.** Expected: the flight stops immediately and the nav returns to normal. Pinned by a browser check in Task 11.
4. **Opening the modal mid-fly-through, then closing it.** Expected: scroll position preserved, the fronts in the same pose, focus returned to the clicked card. Pinned by a browser check in Task 11.
5. **Narrow screens (<800px).** Expected: centered lanes, so no card is pushed off-screen. Pinned by a test in Task 2 (`narrow` puts x at 0 for every t).

---

## File Map

| File | Status | Responsibility |
|---|---|---|
| `package.json` | modify | add `vitest`, `test` script |
| `eslint.config.js` | modify | stop flagging `motion` (used as `<motion.div>`) |
| `index.html` | modify | load Geist Mono |
| `src/index.css` | modify | `@theme` tokens, base background |
| `src/App.css` | delete | unused Vite template leftover |
| `public/images/HeroBackdrop.webp` | create | optimized Milky Way backdrop |
| `src/lib/flight.js` (+ `.test.js`) | create | hero and front pose math |
| `src/lib/rail.js` (+ `.test.js`) | create | progress rail math |
| `src/lib/projectDetails.js` (+ `.test.js`) | create | merge project and resume data, modal sections, featured sort |
| `src/context/resumeContext.js` | create | `createContext` only |
| `src/context/ResumeProvider.jsx` | create | resume modal state, download handlers |
| `src/hooks/useResume.js` | create | `useResume()` |
| `src/components/ResumeModal.jsx` | modify | portal-safe styling, close-chip contrast |
| `src/components/Navbar.jsx`, `Footer.jsx` | modify | new nav and footer |
| `src/components/home/WarpField.jsx` | create | warp starfield canvas |
| `src/hooks/useAutopilot.js` | create | eased window scroll with input-cancel |
| `src/components/home/ProjectFront.jsx` | create | mini-modal card |
| `src/components/ProjectCard.jsx` | create | grid card (Home and Projects) |
| `src/components/home/DeepFieldHero.jsx` | create | sticky stage, fronts, HUD, title |
| `src/components/ProgressRail.jsx` | create | rail SVG and nodes |
| `src/components/ProjectModal.jsx` | rewrite | sections, rail, open-from-origin |
| `src/components/PageHero.jsx` | create | shared subpage hero |
| `src/pages/*.jsx`, `src/App.jsx` | modify | adopt the new components and tokens |

---

### Task 1: Foundation (tooling, tokens, fonts, assets)

**Files:**
- Modify: `package.json`, `eslint.config.js`, `index.html`, `src/index.css`
- Delete: `src/App.css`
- Create: `public/images/HeroBackdrop.webp`

**Interfaces:**
- Produces:
  - Tailwind color utilities `bg-space`, `text-ink`, `text-mute`, `border-line`, `text-amber`, `bg-amber`
  - Font utility `font-mono` (Geist Mono)
  - `npm test`

- [ ] **Step 1:** Run `npm i -D vitest@5.0.3`. Add the script `"test": "vitest run"` to `package.json`.
- [ ] **Step 2:** In `eslint.config.js`, change the rule to `'no-unused-vars': ['error', { varsIgnorePattern: '^([A-Z_]|motion$)' }]`.
  - ESLint core doesn't count `<motion.div>` as a use of `motion`.
- [ ] **Step 3:** In `index.html`, change the font link `family=` to `Geist:wght@300;400;500;600;700&family=Geist+Mono:wght@400;500`.
- [ ] **Step 4:** Replace `src/index.css` with:

```css
@import "tailwindcss";

@theme {
  --color-space: #05060a;
  --color-ink: #EDEEF2;
  --color-mute: #8b8f9c;
  --color-line: rgba(255, 255, 255, 0.09);
  --color-amber: #fbbf24;
  --color-glass: rgba(15, 20, 35, 0.66);
  --font-sans: "Geist", ui-sans-serif, system-ui, sans-serif;
  --font-mono: "Geist Mono", ui-monospace, monospace;
}

html { background-color: var(--color-space); }
body { -webkit-font-smoothing: antialiased; }
::selection { background: rgba(251, 191, 36, 0.3); }
```

- [ ] **Step 5:** Run `cwebp -q 72 -resize 2000 0 public/images/HeroBackdrop.png -o public/images/HeroBackdrop.webp`.
  - Confirm the output is ≤ 350KB.
- [ ] **Step 6:** Delete `src/App.css` (confirmed unused: nothing imports it).
- [ ] **Step 7:** Run `npm run build`. Expect a pass; the existing pages still render because `gray-*` classes still exist.
- [ ] **Step 8:** Commit: `chore: tooling, design tokens, fonts, optimized backdrop`.

### Task 2: `lib/flight.js`, the fly-through math

**Files:**
- Create: `src/lib/flight.js`
- Test: `src/lib/flight.test.js`

**Interfaces:**
- Produces:
  - `clamp(v, a=0, b=1)`
  - `easeOutCubic(k)`
  - `easeInOutCubic(k)`
  - `FLIGHT` (constants)
  - `localTime(p, i) → number`
  - `frontPose(t, i, narrow) → { scale, x, y, opacity, z, live, phase }`, where x is in vw and y in vh
  - `focusIndex(p, count) → number` (−1 when no card is arriving or holding)
  - `heroScene(p) → { skyScale, skyRotate, titleOpacity, titleScale, titleInteractive, hintOpacity, hudVisible }`
  - `autopilotDuration(remaining, total) → ms`

- [ ] **Step 1: Write the failing tests** (`src/lib/flight.test.js`):

```js
import { describe, it, expect } from "vitest";
import { localTime, frontPose, focusIndex, heroScene, autopilotDuration, FLIGHT } from "./flight";

describe("localTime", () => {
  it("is 0 before a card's window and 1 after it", () => {
    expect(localTime(0, 0)).toBe(0);
    expect(localTime(FLIGHT.start + FLIGHT.win, 0)).toBe(1);
    expect(localTime(FLIGHT.start + FLIGHT.step + FLIGHT.win / 2, 1)).toBeCloseTo(0.5);
  });
});

describe("frontPose", () => {
  it("is invisible outside its window", () => {
    expect(frontPose(0, 0).opacity).toBe(0);
    expect(frontPose(1, 0).opacity).toBe(0);
  });
  it("reaches full size at the end of the approach and holds clickable", () => {
    const p = frontPose(FLIGHT.approachEnd, 0);
    expect(p.scale).toBeCloseTo(1);
    expect(p.opacity).toBe(1);
    expect(frontPose(0.5, 0)).toMatchObject({ phase: "hold", live: true, opacity: 1 });
  });
  it("never shows a card bigger than 1.9x (the black-box flicker guard)", () => {
    for (let t = 0; t <= 1; t += 0.001) {
      const p = frontPose(t, 0);
      if (p.scale > 1.9) expect(p.opacity).toBe(0);
    }
  });
  it("puts a departing card below an arriving one", () => {
    expect(frontPose(0.9, 0).z).toBeLessThan(frontPose(0.1, 1).z);
  });
  it("alternates lanes on wide screens and centers them on narrow screens", () => {
    expect(frontPose(0.5, 0).x).toBeLessThan(0);
    expect(frontPose(0.5, 1).x).toBeGreaterThan(0);
    for (let t = 0; t <= 1; t += 0.01) expect(frontPose(t, 1, true).x).toBe(0);
  });
  it("is not clickable while approaching or departing", () => {
    expect(frontPose(0.1, 0).live).toBe(false);
    expect(frontPose(0.9, 0).live).toBe(false);
  });
});

describe("focusIndex", () => {
  it("names the holding card", () => {
    const p = FLIGHT.start + FLIGHT.step + FLIGHT.win * 0.5;
    expect(focusIndex(p, 4)).toBe(1);
  });
  it("names the arriving card during a handoff", () => {
    const p = FLIGHT.start + FLIGHT.step + FLIGHT.win * 0.1; // card 0 departing, card 1 arriving
    expect(focusIndex(p, 4)).toBe(1);
  });
  it("is -1 before the first card", () => {
    expect(focusIndex(0, 4)).toBe(-1);
  });
});

describe("heroScene", () => {
  it("shows the title at rest and hides it once the flight starts", () => {
    expect(heroScene(0)).toMatchObject({ titleOpacity: 1, titleInteractive: true, hudVisible: false });
    expect(heroScene(0.1)).toMatchObject({ titleOpacity: 0, titleInteractive: false, hudVisible: true });
    expect(heroScene(0.99).hudVisible).toBe(false);
  });
});

describe("autopilotDuration", () => {
  it("is about 3.2s for the full hero and scales down with distance", () => {
    expect(autopilotDuration(1000, 1000)).toBe(3200);
    expect(autopilotDuration(500, 1000)).toBe(2050);
    expect(autopilotDuration(0, 1000)).toBe(900);
  });
});
```

- [ ] **Step 2:** Run `npm test`. Expected: FAIL, "Failed to resolve import ./flight".
- [ ] **Step 3: Implement** `src/lib/flight.js`:

```js
// Scroll-driven math for the Deep Field hero. Pure functions so the motion
// can be tested without a browser; numbers match the approved preview.
export const FLIGHT = {
  start: 0.1, step: 0.215, win: 0.27,   // card i flies during [start + i*step, + win] of hero progress
  approachEnd: 0.35, holdEnd: 0.68,      // phases within a card's own 0..1 time
  liveFrom: 0.3, liveTo: 0.72,           // clickable window
  lane: 15, laneY: 2,                    // vw / vh offsets, alternating sides
};

export const clamp = (v, a = 0, b = 1) => Math.min(b, Math.max(a, v));
export const easeOutCubic = (k) => 1 - Math.pow(1 - k, 3);
export const easeInOutCubic = (k) => (k < 0.5 ? 4 * k * k * k : 1 - Math.pow(-2 * k + 2, 3) / 2);

export const localTime = (p, i) => clamp((p - (FLIGHT.start + i * FLIGHT.step)) / FLIGHT.win);

export function frontPose(t, i, narrow = false) {
  const X = narrow ? 0 : i % 2 ? FLIGHT.lane : -FLIGHT.lane;
  const Y = i % 2 ? -FLIGHT.laneY : FLIGHT.laneY;
  const live = t > FLIGHT.liveFrom && t < FLIGHT.liveTo;
  if (t <= 0) return { scale: 0.05, x: 0, y: 0, opacity: 0, z: 3, live: false, phase: "waiting" };
  if (t >= 1) return { scale: 1, x: 0, y: 0, opacity: 0, z: 1, live: false, phase: "gone" };
  if (t < FLIGHT.approachEnd) {
    const k = easeOutCubic(t / FLIGHT.approachEnd);
    return { scale: 0.05 + 0.95 * k, x: X * k, y: Y * k, opacity: clamp(t / 0.12), z: 3, live, phase: "approach" };
  }
  if (t < FLIGHT.holdEnd) {
    const k = (t - FLIGHT.approachEnd) / (FLIGHT.holdEnd - FLIGHT.approachEnd);
    return { scale: 1 + k * 0.08, x: X + Math.sign(X) * k * 1.5, y: Y, opacity: 1, z: 3, live, phase: "hold" };
  }
  // Departing: fully transparent by k = 0.5 (about 1.73x) so a huge layer never covers the scene,
  // and z sits below the arriving card.
  const k = (t - FLIGHT.holdEnd) / (1 - FLIGHT.holdEnd);
  const sx = X === 0 ? 0 : (X + Math.sign(X) * 1.5) * (1 + k * 1.8);
  return { scale: 1.08 + k * k * 2.6, x: sx, y: Y * (1 + k * 3), opacity: Math.pow(1 - clamp(k / 0.5), 2), z: 1, live, phase: "depart" };
}

export function focusIndex(p, count) {
  let focus = -1;
  for (let i = 0; i < count; i++) {
    const t = localTime(p, i);
    if (t > 0 && t < FLIGHT.holdEnd) focus = i;
  }
  return focus;
}

export function heroScene(p) {
  return {
    skyScale: 1 + p * 0.45,
    skyRotate: p * 6,
    titleOpacity: 1 - clamp(p / 0.07),
    titleScale: 1 + p * 4,
    titleInteractive: p <= 0.04,
    hintOpacity: 1 - clamp(p / 0.03),
    hudVisible: p > 0.08 && p < 0.98,
  };
}

export const autopilotDuration = (remaining, total) => 900 + 2300 * clamp(total > 0 ? remaining / total : 0);
```

- [ ] **Step 4:** Run `npm test`. Expected: PASS (all flight tests).
- [ ] **Step 5:** Commit: `feat: fly-through motion math with tests`.

### Task 3: `lib/rail.js`, the progress rail math

**Files:**
- Create: `src/lib/rail.js`
- Test: `src/lib/rail.test.js`

**Interfaces:**
- Produces:
  - `nodeYs(count, top, bottom) → number[]`
  - `railPath(ys, cx, startY=14, sway=13) → string` (SVG `d`)
  - `sectionTriggers(sectionTops, maxScroll, lineOffset) → number[]` (scrollTop at which each node lights)
  - `progressAt(triggers, fracs, scrollTop, maxScroll) → number` (0..1 fraction of path length)
  - `litCount(triggers, scrollTop, maxScroll) → number`

- [ ] **Step 1: Write the failing tests** (`src/lib/rail.test.js`):

```js
import { describe, it, expect } from "vitest";
import { nodeYs, railPath, sectionTriggers, progressAt, litCount } from "./rail";

describe("nodeYs", () => {
  it("spaces nodes evenly between top and bottom", () => {
    expect(nodeYs(3, 0, 100)).toEqual([0, 50, 100]);
  });
  it("handles a single node without NaN", () => {
    expect(nodeYs(1, 48, 500)).toEqual([48]);
  });
});

describe("railPath", () => {
  it("starts above the first node and passes through every node", () => {
    const d = railPath([50, 150], 32);
    expect(d.startsWith("M 32 14 L 32 50")).toBe(true);
    expect(d.endsWith("32 150")).toBe(true);
  });
});

describe("sectionTriggers", () => {
  it("lights a section when its heading crosses the line", () => {
    expect(sectionTriggers([300, 700], 2000, 200)).toEqual([100, 500]);
  });
  it("spreads trailing sections that can't reach the line across the remaining scroll", () => {
    // max scroll 600: sections at 900 and 1100 can't reach the line (offset 200)
    const t = sectionTriggers([300, 900, 1100], 600, 200);
    expect(t[0]).toBe(100);
    expect(t[1]).toBeCloseTo(350);
    expect(t[2]).toBe(600);
  });
  it("is strictly increasing", () => {
    const t = sectionTriggers([0, 10, 20, 2000, 2100], 800, 300);
    for (let i = 1; i < t.length; i++) expect(t[i]).toBeGreaterThanOrEqual(t[i - 1]);
    expect(t.at(-1)).toBe(800);
  });
});

describe("progressAt / litCount", () => {
  const triggers = [100, 500], fracs = [0.2, 1];
  it("interpolates between knots", () => {
    expect(progressAt(triggers, fracs, 0, 1000)).toBe(0);
    expect(progressAt(triggers, fracs, 100, 1000)).toBeCloseTo(0.2);
    expect(progressAt(triggers, fracs, 300, 1000)).toBeCloseTo(0.6);
    expect(progressAt(triggers, fracs, 900, 1000)).toBe(1);
  });
  it("counts lit nodes", () => {
    expect(litCount(triggers, 0, 1000)).toBe(0);
    expect(litCount(triggers, 100, 1000)).toBe(1);
    expect(litCount(triggers, 999, 1000)).toBe(2);
  });
  it("treats non-scrollable content as fully read", () => {
    expect(progressAt([0, 0], fracs, 0, 0)).toBe(1);
    expect(litCount([0, 0], 0, 0)).toBe(2);
  });
});
```

- [ ] **Step 2:** Run `npm test`. Expected: FAIL (rail module missing).
- [ ] **Step 3: Implement** `src/lib/rail.js`:

```js
// Math for the modal's progress rail (the Mission Log trajectory, reused).
// Nodes are evenly spaced on the rail; the glow reaches node i when section
// i's heading crosses `lineOffset` px into the scroll view.
const lerp = (a, b, t) => a + (b - a) * t;

export function nodeYs(count, top, bottom) {
  if (count <= 1) return count === 1 ? [top] : [];
  return Array.from({ length: count }, (_, i) => top + ((bottom - top) * i) / (count - 1));
}

export function railPath(ys, cx, startY = 14, sway = 13) {
  if (!ys.length) return "";
  let d = `M ${cx} ${startY} L ${cx} ${ys[0]}`;
  for (let i = 1; i < ys.length; i++) {
    const h = ys[i] - ys[i - 1], s = i % 2 ? sway : -sway;
    d += ` C ${cx + s} ${ys[i - 1] + h * 0.35}, ${cx + s} ${ys[i] - h * 0.35}, ${cx} ${ys[i]}`;
  }
  return d;
}

export function sectionTriggers(sectionTops, maxScroll, lineOffset) {
  const max = Math.max(0, maxScroll);
  const at = sectionTops.map((top) => Math.min(max, Math.max(0, top - lineOffset)));
  // Sections that can never reach the line would all light at the very bottom;
  // share out the remaining scroll so each lights in turn and the last lands at max.
  const k = at.findIndex((v) => v >= max - 1);
  if (k >= 0) {
    const from = k > 0 ? at[k - 1] : 0, n = at.length;
    for (let i = k; i < n; i++) at[i] = from + ((max - from) * (i - k + 1)) / (n - k);
  }
  for (let i = 1; i < at.length; i++) at[i] = Math.max(at[i], at[i - 1]);
  return at;
}

export function progressAt(triggers, fracs, scrollTop, maxScroll) {
  if (maxScroll <= 0) return 1;
  const knots = [[0, 0], ...triggers.map((s, i) => [s, fracs[i]])];
  for (let i = 1; i < knots.length; i++) {
    if (scrollTop <= knots[i][0]) {
      const [s0, f0] = knots[i - 1], [s1, f1] = knots[i];
      return s1 > s0 ? lerp(f0, f1, (scrollTop - s0) / (s1 - s0)) : f1;
    }
  }
  return knots[knots.length - 1][1];
}

export function litCount(triggers, scrollTop, maxScroll) {
  if (maxScroll <= 0) return triggers.length;
  return triggers.filter((s) => scrollTop >= s - 1).length;
}
```

- [ ] **Step 4:** Run `npm test`. Expected: PASS.
- [ ] **Step 5:** Commit: `feat: progress rail math with tests`.

### Task 4: `lib/projectDetails.js`, data merge, modal sections, featured sort

**Files:**
- Create: `src/lib/projectDetails.js`
- Test: `src/lib/projectDetails.test.js`

**Interfaces:**
- Produces:
  - `projectDetails(project, resume=resumeData) → project & { highlights: string[], role, stack, dates }`
  - `modalSections(details) → {id, label}[]`
  - `sortProjects(list) → project[]` (the existing tier sort: comingSoon, active, featured, then rest; newest first within a tier)

- [ ] **Step 1: Write the failing tests:**

```js
import { describe, it, expect } from "vitest";
import projects from "../data/projects";
import { projectDetails, modalSections, sortProjects } from "./projectDetails";

const bySlug = (s) => projects.find((p) => p.slug === s);

describe("projectDetails", () => {
  it("pulls resume bullets with ** markers intact", () => {
    const d = projectDetails(bySlug("lost-and-hound"));
    expect(d.highlights).toHaveLength(5);
    expect(d.highlights[0]).toContain("**130+ users**");
    expect(d.role).toBe("Founder & Project Lead");
  });
  it("leaves projects that aren't on the resume without highlights", () => {
    const d = projectDetails(bySlug("wnba-reference"));
    expect(d.highlights).toEqual([]);
    expect(d.role).toBeNull();
  });
  it("drops the descriptive prefix from BBAL Sim's tech line", () => {
    expect(projectDetails(bySlug("bbal-sim")).stack).toBe("TypeScript, React, Dexie.js (IndexedDB), Web Workers, Vite");
  });
});

describe("modalSections", () => {
  it("includes only sections with data", () => {
    const ids = (s) => modalSections(projectDetails(bySlug(s))).map((x) => x.id);
    expect(ids("lost-and-hound")).toEqual(["overview", "highlights", "gallery", "stack", "links"]);
    expect(ids("wnba-reference")).toEqual(["overview", "gallery", "links"]);
    expect(ids("backyard")).toEqual(["overview", "highlights", "stack", "links"]); // one image: no gallery
  });
});

describe("sortProjects", () => {
  it("puts active projects first, newest first", () => {
    expect(sortProjects(projects).map((p) => p.slug).slice(0, 2)).toEqual(["backyard", "lost-and-hound"]);
  });
});
```

- [ ] **Step 2:** Run `npm test`. Expected: FAIL.
- [ ] **Step 3: Implement:**

```js
import resumeData from "../data/resumeData";

// One merged shape for the hero fronts, grid cards, and modal, so the modal's
// highlights come from the same resumeData the PDF is built from.
export function projectDetails(project, resume = resumeData) {
  const r = resume.projects.find((p) => p.name === project.title);
  // BBAL Sim's tech line leads with a descriptive subtitle ("… Engine  ·  TypeScript, …").
  const stack = r?.tech ? r.tech.split(/\s{2}·\s{2}/).pop() : null;
  return { ...project, highlights: r?.bullets ?? [], role: r?.role ?? null, stack, dates: r?.dates ?? null };
}

export function modalSections(d) {
  return [
    d.description && { id: "overview", label: "Overview" },
    d.highlights.length > 0 && { id: "highlights", label: "Highlights" },
    d.images.length > 1 && { id: "gallery", label: "Gallery" }, // a single image is already the hero
    (d.role || d.stack || d.dates) && { id: "stack", label: "Stack & role" },
    { id: "links", label: "Links" },
  ].filter(Boolean);
}

const tier = (p) => (p.comingSoon ? 0 : p.active ? 1 : p.featured ? 2 : 3);
export const sortProjects = (list) =>
  [...list].sort((a, b) => tier(a) - tier(b) || b.date.localeCompare(a.date));
```

- [ ] **Step 4:** Run `npm test`. Expected: PASS.
- [ ] **Step 5:** Commit: `feat: merged project details and modal sections`.

### Task 5: Site-wide resume modal

**Files:**
- Create: `src/context/resumeContext.js`, `src/context/ResumeProvider.jsx`, `src/hooks/useResume.js`
- Modify: `src/components/ResumeModal.jsx`, `src/App.jsx`, `src/pages/About.jsx`

**Interfaces:**
- Produces: `useResume() → { openResume: () => void }`. The provider wraps the router content inside `App`.

- [ ] **Step 1:** Create `resumeContext.js` containing `export const ResumeContext = createContext({ openResume: () => {} });`.
  - It lives in its own file because of react-refresh's only-export-components rule.
- [ ] **Step 2:** Create `useResume.js` containing `export const useResume = () => useContext(ResumeContext);`.
- [ ] **Step 3:** Create `ResumeProvider.jsx`:
  - Move `RESUME_PDF`, `RESUME_PNG`, `downloadResume`, and `downloadResumePdf` verbatim from `About.jsx`.
  - Hold `open` state and expose `openResume`.
  - Render `<AnimatePresence>{open && <ResumeModal …/>}</AnimatePresence>` through `createPortal(…, document.body)`.
- [ ] **Step 4:** Restyle `ResumeModal.jsx`:
  - Only change the close button: `bg-[rgba(15,20,35,.85)] text-white border-white/20`. It sits over the white resume image and was invisible there.
  - Keep everything else, including confetti and the ding.
- [ ] **Step 5:** In `App.jsx`, wrap the layout in `<ResumeProvider>`. In `About.jsx`, delete the moved handlers and modal render, and call `openResume` from "Download Resume →".
- [ ] **Step 6:** Run `npm run lint && npm run build`, then commit: `feat: site-wide resume modal`.

### Task 6: Navbar and footer

**Files:**
- Modify: `src/components/Navbar.jsx`, `src/components/Footer.jsx`

**Interfaces:**
- Consumes:
  - `useResume()`
  - `document.getElementById("work")` (present only on Home)
  - `document.body.dataset.autopilot` (set by `useAutopilot`, Task 7)

- [ ] **Step 1: Navbar**
  - Full-width fixed bar, `h-16`, `px-7`.
  - Left: `Ryan Sinha` plus an amber `.`, linking to `/`.
  - Right: About, Projects, Blog, Contact, and a Resume `<button>` that calls `openResume`, plus GitHub and LinkedIn icons using the existing URLs.
  - Active route in `text-ink`; other links `text-mute hover:text-ink`.
  - Solid state, in a passive scroll listener throttled with rAF that calls `setSolid` only when the value changes:

```js
const work = document.getElementById("work");
const next = document.body.dataset.autopilot !== "1" &&
  (work ? window.scrollY + nav.offsetHeight > work.offsetTop : window.scrollY > 8);
```

  - Solid classes: `bg-space/70 backdrop-blur-[14px] border-b border-line`. Transparent: `border-transparent`. Transition: `transition-[background-color,border-color] duration-300`.
  - Re-run the check when the pathname changes.
  - Mobile: keep the hamburger behavior, restyled with the same tokens. The menu panel is `bg-space/95`.
- [ ] **Step 2: Footer**
  - `border-t border-line`, `max-w-6xl` row.
  - Left: "Get in touch →" (`text-3xl font-semibold tracking-tight hover:text-amber`) linking to `/contact`.
  - Right: social icons, then `© {year} Ryan Sinha` in `text-mute`.
- [ ] **Step 3:** Remove `-mt-16` from every page hero. The nav is now `fixed`, so it takes up no space in the layout.
- [ ] **Step 4:** Run `npm run lint && npm run build`, then commit: `feat: new navbar and footer`.

### Task 7: WarpField and autopilot hook

**Files:**
- Create: `src/components/home/WarpField.jsx`, `src/hooks/useAutopilot.js`

**Interfaces:**
- Produces:
  - `<WarpField idle={boolean} />`: a canvas that fills its positioned parent. `idle` slows stars to drift (modal open).
  - `useAutopilot() → { flyTo(targetY, durationMs, onArrive) }`. Sets `document.body.dataset.autopilot = "1"` while flying. Any `wheel`, `touchstart`, or `keydown` cancels the flight without calling `onArrive`.

- [ ] **Step 1: WarpField** (port `drawWarp` from the preview)
  - 520 stars `{x,y,z}`.
  - Each frame: `vel = lerp(vel, |scrollY − lastY|, .15)`; `speed = idle ? .0003 : .0009 + min(vel,60) * .00045`.
  - Draw each star as a streak from its projection at the previous z to the current one, with `f = max(w,h) * .25`, `lineWidth (1−z)*1.6+.2`, and alpha `clamp((1−z)*1.2)`.
  - Respawn at `z = 1` when `z ≤ .02`.
  - Device pixel ratio capped at 2. Resize with `ResizeObserver`.
  - Pause the rAF loop when an IntersectionObserver reports the canvas off-screen, or when `document.hidden` is true.
  - With `useReducedMotion()`, draw a single static frame (speed 0).
- [ ] **Step 2: useAutopilot**
  - `flyTo` captures `from = scrollY` and starts the timer at `performance.now()`.
  - Each rAF frame: `scrollTo(0, from + (targetY − from) * easeInOutCubic(k))`.
  - Cancel listeners are `{ passive: true }` and are removed when the flight ends.
  - Clear the dataset flag in every exit path.
  - Unmounting cancels any flight in progress.
- [ ] **Step 3:** Run `npm run lint && npm run build`, then commit: `feat: warp starfield and autopilot`.

### Task 8: Homepage (hero, fronts, cards, View work)

**Files:**
- Create: `src/components/home/ProjectFront.jsx`, `src/components/ProjectCard.jsx`, `src/components/home/DeepFieldHero.jsx`
- Modify: `src/pages/Home.jsx`

**Interfaces:**
- Consumes:
  - `frontPose`, `focusIndex`, `heroScene`, `localTime`, `autopilotDuration` (Task 2)
  - `projectDetails`, `sortProjects` (Task 4)
  - `useAutopilot` (Task 7)
  - `useResume` (Task 5)
- Produces:
  - `<ProjectFront project onOpen(el) ref />` (`forwardRef`; the hero writes its style)
  - `<ProjectCard project onOpen(el) index />`
  - `<DeepFieldHero projects onOpen(project, el) onViewWork />`
  - Home owns the `selected = { project, origin: DOMRect }` state and renders `ProjectModal` (Task 9)

- [ ] **Step 1: ProjectFront**
  - A `<button>`, `absolute left-1/2 top-1/2`, `w-[min(500px,40vw)] max-md:w-[84vw]`, `rounded-[22px]`, `border border-white/[.13]`.
  - Background `linear-gradient(rgba(18,23,40,.94), rgba(12,16,30,.94))`. **No backdrop blur** (Global Constraints).
  - Content: screenshot (`h-[220px]` with `p-3.5`, `object-cover object-top`, `rounded-[10px]`), title, Active pill, `description` (first sentence only), tags in amber chips, and `OPEN ↗` in mono at the bottom right.
  - Starts at `opacity:0` with `pointer-events:none`. The hero toggles a `data-live` attribute, and the `data-[live]:pointer-events-auto` class enables clicks.
  - Hover ring: `hover:shadow-[0_0_0_1px_rgba(251,191,36,.55),0_0_60px_-6px_rgba(251,191,36,.45)]`.
  - `in-data-[autopilot]:pointer-events-none!`.
- [ ] **Step 2: ProjectCard**
  - The grid card from the preview's `.proj`: image `aspect-video object-cover object-top`, then title, pill, one-liner, tags.
  - Hover: lift 6px, amber border at 35%, image `scale(1.04)`.
  - Reveal: starts `opacity-0 translate-y-7` and becomes visible when its grid gets `data-in` (IntersectionObserver in Home), with `transition-delay: calc(index * 90ms + 120ms)`.
- [ ] **Step 3: DeepFieldHero**
  - `<section ref={hero} className="relative" style={{height: reduced ? "100vh" : "620vh"}}>` containing a sticky `h-screen overflow-hidden` stage.
  - Stage contents:
    - `<img src="/images/HeroBackdrop.webp" fetchpriority="high">` at `-5%` inset, `w-[110%] h-[110%] max-w-none opacity-75`
    - `<WarpField idle={modalOpen}/>`
    - Vignette `radial-gradient(ellipse at center, transparent 30%, rgba(5,6,10,.85) 100%)`
    - Fronts
    - Title block (eyebrow, h1, pitch, buttons in a `flex items-center gap-3` row)
    - Hint
    - HUD
  - Drive everything from `const { scrollYProgress } = useScroll({ target: hero, offset: ["start start", "end end"] })`, via `useMotionValueEvent(scrollYProgress, "change", apply)` plus one `apply(scrollYProgress.get())` on mount and on resize. `apply(p)` writes styles through refs:
    - `heroScene(p)` sets the sky transform, title opacity and transform, and title `pointerEvents`
    - each front gets `frontPose(localTime(p,i), i, innerWidth < 800)`, applied as `transform: translate(-50%,-50%) translate(${x}vw,${y}vh) scale(${scale})`, plus `opacity`, `zIndex`, and `dataset.live`
    - the HUD label uses `focusIndex`, via a `setHud` state update only when the index changes
  - With reduced motion: no fronts, no transforms, hero is one screen.
  - Preload front images with `<link rel="preload" as="image">` (via `useEffect`, creating link tags).
- [ ] **Step 4: Home**
  - `featured = sortProjects(projects.filter(p => p.featured)).map(projectDetails)`.
  - Render `<DeepFieldHero>`, then `<section id="work">` (h2 "Featured work." plus the `ProjectCard` grid), then Featured posts restyled (list rows: title, excerpt, date in mono), then a "View all posts →" link.
  - **View work:**
    1. `onViewWork` computes `to = hero.offsetTop + hero.offsetHeight − innerHeight`.
    2. If `scrollY ≥ to`, or with reduced motion, go straight to landing. Otherwise call `flyTo(to, autopilotDuration(to − scrollY, hero.offsetHeight − innerHeight), land)`.
    3. `land`: show the veil (a fixed `bg-space` div at `z-[8000]`, `transition-opacity duration-[350ms]`, portaled to the body). After 360ms: remove `data-in` from the grid, `scrollTo(0, work.offsetTop)`, then on the next frame re-add `data-in` and hide the veil.
- [ ] **Step 5:** Run `npm run lint && npm run build`, then commit: `feat: Deep Field homepage`.

### Task 9: Project modal with progress rail

**Files:**
- Create: `src/components/ProgressRail.jsx`
- Rewrite: `src/components/ProjectModal.jsx`

**Interfaces:**
- Consumes:
  - `nodeYs`, `railPath`, `sectionTriggers`, `progressAt`, `litCount` (Task 3)
  - `modalSections` (Task 4)
  - `renderEmphasis` (`src/utils/emphasis.jsx`)
- Produces:
  - `<ProjectModal project={details} origin={DOMRect|null} onClose />` (rendered by Home and Projects inside `AnimatePresence`, keyed by slug)
  - `<ProgressRail scrollRef sectionRefs sections />`

- [ ] **Step 1: ProgressRail**
  - A `w-16 max-md:w-10 border-r border-line relative` column containing an absolute SVG with two paths:
    - track: `stroke white/12`, `dasharray 3 6`
    - glow: `stroke amber`, `drop-shadow(0 0 4px rgba(251,191,36,.8))`
  - Plus node buttons and a `%` readout.
  - `build()` (on mount, on `ResizeObserver` of the scroll body, and on every image `load` inside it):
    - compute `ys = nodeYs(n, 48, H − 56)`
    - set `d = railPath(ys, W/2)`
    - measure `L = glow.getTotalLength()`
    - compute `fracs` by binary search on `getPointAtLength(m).y` reaching each `y`
    - compute `triggers = sectionTriggers(sectionRefs.map(el => el.offsetTop), max, clientHeight * .3)`
  - `update()` on scroll (passive): sets `strokeDashoffset = L * (1 − progressAt(...))`, sets the lit class on the first `litCount(...)` nodes (via `data-lit`, not state), and sets the `%` text.
  - Clicking node `i` calls `scroll.scrollTo({ top: triggers[i] + 1, behavior: "smooth" })`.
  - Nodes are `<button aria-label={"Jump to " + label}>`, with the label tooltip shown on `hover` and `focus-visible` only.
- [ ] **Step 2: ProjectModal**
  - Portaled to the body.
  - Backdrop: `fixed inset-0 z-[9000] bg-black/60 backdrop-blur-[22px]`, fading in.
  - Panel: `grid grid-cols-[64px_1fr] max-md:grid-cols-[40px_1fr]`, `w-[min(800px,calc(100vw-32px))] h-[min(86vh,900px)] rounded-[26px] border border-white/[.12]`, glass background `blur(40px) saturate(150%)` (static element, so the blur is allowed).
  - Open animation from `origin`: `initial={{ x: dx, y: dy, scaleX: origin.width/w, scaleY: origin.height/h, opacity: .4 }}` → `animate={{ x:0, y:0, scaleX:1, scaleY:1, opacity:1 }}` with `transition={{ duration:.55, ease:[.2,.9,.2,1] }}`. Exit: `opacity 0, scale .96`.
  - Body (`overflow-y-auto overscroll-contain`, scrollbar hidden):
    - carousel (`h-[340px]`, arrows and dots when there's more than one image, state reset by keying the modal on slug, so there's no setState in an effect)
    - title, pill, tags
    - then one `<section ref>` per `modalSections(project)`, with headings `0N / Label` in mono amber:
      - overview
      - highlights (`<li>` with an amber glowing dot and `renderEmphasis(b)`)
      - gallery (2 columns; clicking sets the carousel index and scrolls to the top)
      - stack (`<dl>` rows ROLE / STACK / DATES, only when present)
      - links: the existing GitHub, Request access (`/contact` with the same `state.message` text), and Website buttons
  - Behavior:
    - `document.body.style.overflow = "hidden"` while open, restored on unmount
    - Esc closes; ← and → change images
    - `role="dialog" aria-modal="true" aria-labelledby`
    - focus the close button on open
    - Tab cycles within the panel
    - on close, focus returns to `origin`'s element (Home passes it; store the element, not only the rect)
- [ ] **Step 3:** Run `npm run lint && npm run build`, then commit: `feat: project modal with progress rail`.

### Task 10: Subpages

**Files:**
- Create: `src/components/PageHero.jsx`
- Modify: `src/pages/About.jsx`, `Projects.jsx`, `Blog.jsx`, `BlogPost.jsx`, `Contact.jsx`, `src/App.jsx` (404)

**Interfaces:**
- Produces: `<PageHero title subtitle back={{to,label}} />`.

- [ ] **Step 1: PageHero**
  - `relative overflow-hidden` with `HeroBackdrop.webp` at `opacity-50` and a slow parallax (`useScroll` on the window, `scale 1 → 1.08` over the first 600px, via `useTransform` on a `motion.img`).
  - Bottom fade `from-space`.
  - Content `max-w-5xl px-6 pt-36 pb-20`: optional back link (`text-mute`), then h1 (`text-4xl font-semibold tracking-tight` with an amber `.`), then subtitle in `text-mute`.
- [ ] **Step 2:** Replace the duplicated hero block on About, Projects, Blog, BlogPost (including the not-found branch), Contact, and the 404 route with `PageHero`.
- [ ] **Step 3:** Restyle onto the tokens:
  - `gray-950` → `space`
  - `gray-900` cards → `bg-white/[.03] border-line rounded-2xl`, with hover lift and an amber border at 35%
  - `text-gray-400/500` → `text-mute`
  - `text-amber-400` → `text-amber`
  - Eyebrows and dates → `font-mono`
- [ ] **Step 4:** Projects: use `sortProjects`, `ProjectCard`, `projectDetails`, and the new `ProjectModal` with origin; keep the filter chips (active chip `bg-amber text-space`).
- [ ] **Step 5:** Contact: inputs `bg-white/[.03] border-line focus:border-amber`. Keep the Formspree logic and prefill exactly.
- [ ] **Step 6:** Remove the now-unused `-mt-16`, `bg-gray-*`, and old shadow classes. Delete nothing in `ResumeTemplate.jsx` or `printResume.js`.
- [ ] **Step 7:** Run `npm run lint && npm test && npm run build`, then commit: `feat: restyle subpages onto Deep Field system`.

### Task 11: Verification

- [ ] **Step 1:** `npm run lint && npm test && npm run build`: all pass, with zero lint errors (including the 4 that exist today).
- [ ] **Step 2:** Run `npm run dev` and, with Playwright, run the spec §13 checks:
  1. Hero buttons have equal height (`getBoundingClientRect().height` matches) and identical padding.
  2. 400-step hero scan: no visible front wider than 80vw; a departing front never has a higher z-index than an arriving one.
  3. The HUD label equals the title of the most opaque visible front.
  4. Click View work, then sample every frame: the nav is never solid while `data-autopilot="1"`; the final `scrollY` equals `#work.offsetTop`.
  5. Start the autopilot, dispatch a `wheel` event after 500ms: the flight stops (scrollY stable over the next 300ms) and `data-autopilot` is cleared.
  6. Scroll to card 2's hold, click it, close with Esc: `scrollY` unchanged, `document.activeElement` is that front.
  7. Open the Lost and Hound modal and scroll it 0 → 100%: lit pattern goes `00000` → `11111` in order. WNBA Reference shows 3 nodes.
  8. Resume opens from the nav, the hero, and About. The close button is visible (screenshot).
  9. With `emulateMedia({ reducedMotion: "reduce" })`: hero height = viewport; no fronts rendered; View work jumps to `#work`.
  10. Mobile viewport 390×844: no horizontal scroll (`scrollWidth === clientWidth`); fronts centered.
  11. Every route renders (`/`, `/about`, `/projects`, `/blog`, `/blog/building-lost-and-hound`, `/contact`, `/nope`) with no console errors.
- [ ] **Step 3:** Lighthouse on `/` (production preview, `npm run preview`): performance ≥ 90, accessibility ≥ 95. Fix anything below the bar.
- [ ] **Step 4:** Final whole-branch review, then hand off. Deploy (`npm run deploy`) only when Ryan says so.
