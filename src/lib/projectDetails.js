import resumeData from "../data/resumeData";

// One merged shape for the hero fronts, grid cards, and modal, so the modal's
// highlights come from the same resumeData the PDF is built from.
// A project on the resume takes its role, stack, dates, and highlights from
// there; one that isn't (the WIP projects) can carry its own in projects.js.
export function projectDetails(project, resume = resumeData) {
  const r = resume.projects.find((p) => p.name === project.title);
  // Resume tech lines lead with a descriptive subtitle ("… Engine  ·  TypeScript, …").
  const stack = r?.tech ? r.tech.split(/\s{2}·\s{2}/).pop() : (project.stack ?? null);
  // Cards show only the first sentence; the modal's Overview shows all of it.
  const summary = (project.description ?? "").split(/(?<=\.)\s+/)[0];
  // Cards use the project's optimized cover if it has one; otherwise the first
  // screenshot (images[0] is usually the logo, which crops badly on a card).
  const cover = project.cover ?? project.images.find((src) => !/logo/i.test(src)) ?? project.images[0];
  // Page screenshots read best cropped from the top; art like a GIF can opt into "center".
  const coverPosition = project.coverPosition ?? "top";
  return {
    ...project, summary, cover, coverPosition, stack,
    highlights: r?.bullets ?? project.highlights ?? [],
    role: r?.role ?? project.role ?? null,
    dates: r?.dates ?? project.dates ?? null,
  };
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
