import { describe, it, expect } from "vitest";
import { existsSync } from "node:fs";
import projects from "../data/projects";
import { projectDetails, modalSections, sortProjects } from "./projectDetails";

const bySlug = (s) => projects.find((p) => p.slug === s);

describe("projectDetails", () => {
  it("pulls resume bullets with ** markers intact", () => {
    const d = projectDetails(bySlug("lost-and-hound"));
    expect(d.highlights).toHaveLength(6);
    expect(d.highlights[0]).toContain("**150+ users**");
    expect(d.role).toBe("Founder & Project Lead");
  });
  it("leaves projects that aren't on the resume without highlights", () => {
    const d = projectDetails(bySlug("wnba-reference"));
    expect(d.highlights).toEqual([]);
    expect(d.role).toBeNull();
  });
  it("summarizes a description to its first sentence for cards", () => {
    expect(projectDetails(bySlug("lost-and-hound")).summary).toBe(
      "A campus platform for reporting and reuniting lost and found items, featuring an interactive map and real-time messaging.",
    );
    expect(projectDetails({ title: "X", description: "One line only", images: [] }).summary).toBe("One line only");
  });
  it("uses a project's optimized cover when it has one", () => {
    expect(projectDetails(bySlug("lost-and-hound")).cover).toBe("/images/covers/lost-and-hound.webp");
    expect(projectDetails(bySlug("wnba-reference")).cover).toBe("/images/covers/wnba-reference.webp");
  });
  it("falls back to the first screenshot, skipping the logo", () => {
    const p = { title: "X", description: "", images: ["/a/XLogo.png", "/a/shot.png"] };
    expect(projectDetails(p).cover).toBe("/a/shot.png");
  });
  it("anchors covers to the top unless a project picks its own crop", () => {
    expect(projectDetails(bySlug("lost-and-hound")).coverPosition).toBe("top");
    expect(projectDetails(bySlug("backyard")).coverPosition).toBe("center");
  });
  it("falls back to a project's own role, stack, dates, and highlights when it isn't on the resume", () => {
    const d = projectDetails(bySlug("husky-exchange"));
    expect(d.role).toBe("Mentor & Project Lead (Oasis, Fall 2026)");
    expect(d.highlights[0]).toContain("**4 first-year students**");
    expect(d.stack).toContain("Supabase");
    expect(d.dates).toBe("October 2026 – Present");
  });
  it("lets the resume win over a project's own fields", () => {
    const d = projectDetails({ ...bySlug("backyard"), role: "Other", stack: "Other", highlights: ["other"] });
    expect(d.role).toBe("Founding Engineer");
    expect(d.stack).toBe("React, Express, PostgreSQL");
    expect(d.highlights).toHaveLength(7);
  });
  it("drops the descriptive prefix from BBAL Sim's tech line", () => {
    expect(projectDetails(bySlug("bbal-sim")).stack).toBe("TypeScript, Python");
  });
});

describe("modalSections", () => {
  it("includes only sections with data", () => {
    const ids = (s) => modalSections(projectDetails(bySlug(s))).map((x) => x.id);
    expect(ids("lost-and-hound")).toEqual(["overview", "highlights", "gallery", "stack", "links"]);
    expect(ids("wnba-reference")).toEqual(["overview", "gallery", "links"]);
    expect(ids("backyard")).toEqual(["overview", "highlights", "gallery", "stack", "links"]);
    expect(ids("husky-exchange")).toEqual(["overview", "highlights", "gallery", "stack", "links"]);
    expect(ids("lorikeet")).toEqual(["overview", "highlights", "stack", "links"]);
  });
  it("skips the gallery when the only image is already the hero", () => {
    const d = projectDetails({ title: "X", description: "Solo.", images: ["/a/shot.png"], link: "https://x" });
    expect(modalSections(d).map((x) => x.id)).not.toContain("gallery");
  });
});

describe("sortProjects", () => {
  it("puts active projects first, newest first", () => {
    expect(sortProjects(projects).map((p) => p.slug).slice(0, 2)).toEqual(["backyard", "lost-and-hound"]);
  });
  it("puts featured projects next, then everything else newest first", () => {
    expect(sortProjects(projects).map((p) => p.slug)).toEqual([
      "backyard", "lost-and-hound", "bbal-sim", "ghost-aquarium", "lorikeet", "husky-exchange", "wnba-reference",
    ]);
  });
  it("features four projects on Home, with Ghost Aquarium in place of WNBA Reference", () => {
    const featured = projects.filter((p) => p.featured).map((p) => p.slug);
    expect(featured).toHaveLength(4);
    expect(featured).toContain("ghost-aquarium");
    expect(featured).not.toContain("wnba-reference");
  });
});

describe("projects data", () => {
  // The modal indexes images[] and the card renders `cover`; a missing file is a broken tile.
  it.each(projects.map((p) => [p.slug, p]))("%s has a cover and at least one image on disk", (_, p) => {
    expect(p.images.length).toBeGreaterThan(0);
    for (const src of [p.cover, ...p.images].filter(Boolean)) expect(existsSync(`public${src}`), src).toBe(true);
  });
});
