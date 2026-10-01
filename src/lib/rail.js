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
