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
