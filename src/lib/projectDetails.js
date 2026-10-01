import resumeData from "../data/resumeData";

// One merged shape for the hero fronts, grid cards, and modal, so the modal's
// highlights come from the same resumeData the PDF is built from.
export function projectDetails(project, resume = resumeData) {
  const r = resume.projects.find((p) => p.name === project.title);
  // BBAL Sim's tech line leads with a descriptive subtitle ("… Engine  ·  TypeScript, …").
  const stack = r?.tech ? r.tech.split(/\s{2}·\s{2}/).pop() : null;
  // Cards show only the first sentence; the modal's Overview shows all of it.
  const summary = (project.description ?? "").split(/(?<=\.)\s+/)[0];
  // images[0] is usually the project's logo; cards read better with a real screenshot.
  const cover = project.images.find((src) => !/logo/i.test(src)) ?? project.images[0];
  return { ...project, summary, cover, highlights: r?.bullets ?? [], role: r?.role ?? null, stack, dates: r?.dates ?? null };
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
