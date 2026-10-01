import { describe, it, expect } from "vitest";
import { localTime, frontPose, focusIndex, heroScene, autopilotDuration, isNarrow, FLIGHT } from "./flight";

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

describe("isNarrow", () => {
  it("centers lanes on phones in portrait, at the same 768px breakpoint the card width uses", () => {
    expect(isNarrow(390, 844)).toBe(true);
    expect(isNarrow(767, 1000)).toBe(true);
    expect(isNarrow(768, 1000)).toBe(false);
  });
  it("centers lanes on short landscape screens so a card can't run off-screen", () => {
    expect(isNarrow(844, 390)).toBe(true);
    expect(isNarrow(1440, 860)).toBe(false);
  });
});
