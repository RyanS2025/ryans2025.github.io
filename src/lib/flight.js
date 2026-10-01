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

// Lanes center below Tailwind's md breakpoint (where cards switch to 84vw) and on
// short landscape screens, where a side lane plus a full-height card won't fit.
export const isNarrow = (width, height) => width < 768 || height < 560;

export const autopilotDuration = (remaining, total) => 900 + 2300 * clamp(total > 0 ? remaining / total : 0);
