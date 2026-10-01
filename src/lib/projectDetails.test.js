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
