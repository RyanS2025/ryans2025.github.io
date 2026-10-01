import { useCallback, useEffect, useRef, useState } from "react";
import { litCount, nodeYs, progressAt, railPath, sectionTriggers } from "../lib/rail";
import { clamp } from "../lib/flight";

/**
 * The modal's reading-progress rail: a dotted trajectory with an amber glow
 * drawn along it as you scroll, and one node per section that lights when
 * that section's heading crosses 30% of the view (see lib/rail).
 *
 * `scrollRef` is the scrolling body; sections inside it carry `data-msec`.
 * Scroll updates write straight to the SVG and node attributes.
 */
export default function ProgressRail({ scrollRef, sections }) {
  const railRef = useRef(null), trackRef = useRef(null), glowRef = useRef(null), pctRef = useRef(null);
  const nodeRefs = useRef([]);
  const geo = useRef({ L: 0, fracs: [], triggers: [] });
  const [ys, setYs] = useState([]);

  const update = useCallback(() => {
    const sc = scrollRef.current, g = geo.current;
    if (!sc || !g.L) return;
    const max = sc.scrollHeight - sc.clientHeight;
    glowRef.current.style.strokeDashoffset = g.L * (1 - progressAt(g.triggers, g.fracs, sc.scrollTop, max));
    const lit = litCount(g.triggers, sc.scrollTop, max);
    nodeRefs.current.forEach((el, i) => { if (!el) return; if (i < lit) el.dataset.lit = ""; else delete el.dataset.lit; });
    pctRef.current.textContent = `${Math.round((max > 0 ? clamp(sc.scrollTop / max) : 1) * 100)}%`;
  }, [scrollRef]);

  const build = useCallback(() => {
    const rail = railRef.current, sc = scrollRef.current;
    if (!rail || !sc) return;
    const y = nodeYs(sections.length, 48, rail.clientHeight - 56);
    const d = railPath(y, rail.clientWidth / 2);
    trackRef.current.setAttribute("d", d);
    glowRef.current.setAttribute("d", d);
    const glow = glowRef.current, L = glow.getTotalLength();
    glow.style.strokeDasharray = L;
    // Where along the curved path each node sits, so a node lights exactly as the glow reaches it.
    const fracs = y.map((target) => {
      let lo = 0, hi = L;
      for (let k = 0; k < 24; k++) { const m = (lo + hi) / 2; if (glow.getPointAtLength(m).y < target) lo = m; else hi = m; }
      return L ? hi / L : 1;
    });
    const tops = [...sc.querySelectorAll("[data-msec]")].map((el) => el.offsetTop);
    geo.current = { L, fracs, triggers: sectionTriggers(tops, sc.scrollHeight - sc.clientHeight, sc.clientHeight * 0.3) };
    setYs((prev) => (prev.length === y.length && prev.every((v, i) => v === y[i]) ? prev : y));
    update();
  }, [scrollRef, sections.length, update]);

  useEffect(() => {
    const sc = scrollRef.current;
    // ResizeObserver fires once on observe, which is the first build.
    const ro = new ResizeObserver(build);
    ro.observe(sc);
    ro.observe(railRef.current);
    // Images change section offsets as they load.
    sc.addEventListener("load", build, true);
    sc.addEventListener("scroll", update, { passive: true });
    return () => {
      ro.disconnect();
      sc.removeEventListener("load", build, true);
      sc.removeEventListener("scroll", update);
    };
  }, [scrollRef, build, update]);

  // Nodes mount after the first build sets their positions; light them right away.
  useEffect(update, [ys, update]);

  const jump = (i) => scrollRef.current.scrollTo({ top: geo.current.triggers[i] + 1, behavior: "smooth" });

  return (
    <div ref={railRef} className="relative border-r border-line">
      <svg aria-hidden="true" className="absolute inset-0 w-full h-full overflow-visible">
        <path ref={trackRef} fill="none" stroke="rgba(255,255,255,.12)" strokeWidth="1.5" strokeDasharray="3 6" />
        <path ref={glowRef} fill="none" stroke="#fbbf24" strokeWidth="1.5" style={{ filter: "drop-shadow(0 0 4px rgba(251,191,36,.8))" }} />
      </svg>
      {ys.map((y, i) => (
        <button
          key={sections[i].id}
          ref={(el) => { nodeRefs.current[i] = el; }}
          type="button"
          aria-label={`Jump to ${sections[i].label}`}
          onClick={() => jump(i)}
          style={{ top: y }}
          className="group absolute left-1/2 z-[2] -ml-1.5 -mt-1.5 w-3 h-3 rounded-full border-2 border-amber bg-[#0d1120] cursor-pointer
            transition-[background-color,box-shadow,scale] duration-300 hover:scale-130
            data-[lit]:bg-amber data-[lit]:shadow-[0_0_14px_#fbbf24] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-amber"
        >
          <span className="absolute left-5.5 top-1/2 -translate-y-1/2 whitespace-nowrap font-mono text-[10.5px] font-medium tracking-[.1em] uppercase text-amber
            bg-[rgba(10,12,22,.92)] px-2 py-1 rounded-[5px] border border-amber/25 opacity-0 pointer-events-none transition-opacity duration-200
            group-hover:opacity-100 group-focus-visible:opacity-100 max-md:hidden">
            {sections[i].label}
          </span>
        </button>
      ))}
      <div ref={pctRef} className="absolute inset-x-0 bottom-3.5 text-center font-mono text-[10px] text-mute">0%</div>
    </div>
  );
}
