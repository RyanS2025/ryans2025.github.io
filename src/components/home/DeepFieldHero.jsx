import { useCallback, useEffect, useRef, useState } from "react";
import { useMotionValueEvent, useReducedMotion, useScroll } from "framer-motion";
import WarpField from "./WarpField";
import ProjectFront from "./ProjectFront";
import { useResume } from "../../hooks/useResume";
import { focusIndex, frontPose, heroScene, localTime } from "../../lib/flight";

/**
 * The Deep Field hero: a sticky stage over Ryan's Milky Way photo. Scroll
 * progress through the 620vh section drives the sky, title, and project
 * fronts. Styles are written straight to the DOM from the scroll event (via
 * lib/flight), so scrolling never re-renders React.
 */
export default function DeepFieldHero({ heroRef, projects, onOpen, onViewWork, modalOpen }) {
  const reduce = useReducedMotion();
  const { openResume } = useResume();
  const sky = useRef(null), title = useRef(null), hint = useRef(null), hud = useRef(null);
  const fronts = useRef([]);
  const [hudIndex, setHudIndex] = useState(0);
  const { scrollYProgress } = useScroll({ target: heroRef, offset: ["start start", "end end"] });

  const apply = useCallback((p) => {
    if (reduce) return;
    const s = heroScene(p);
    sky.current.style.transform = `scale(${s.skyScale}) rotate(${s.skyRotate}deg)`;
    title.current.style.opacity = s.titleOpacity;
    title.current.style.transform = `translate(-50%,-50%) scale(${s.titleScale})`;
    title.current.style.pointerEvents = s.titleInteractive ? "auto" : "none";
    hint.current.style.opacity = s.hintOpacity;
    hud.current.style.opacity = s.hudVisible ? 1 : 0;
    const narrow = window.innerWidth < 800;
    fronts.current.forEach((el, i) => {
      if (!el) return;
      const f = frontPose(localTime(p, i), i, narrow);
      el.style.transform = `translate(-50%,-50%) translate(${f.x}vw,${f.y}vh) scale(${f.scale})`;
      el.style.opacity = f.opacity;
      el.style.zIndex = f.z;
      if (f.live) el.dataset.live = ""; else delete el.dataset.live;
    });
    const focus = focusIndex(p, projects.length);
    if (focus >= 0) setHudIndex((prev) => (prev === focus ? prev : focus));
  }, [reduce, projects.length]);

  useMotionValueEvent(scrollYProgress, "change", apply);

  useEffect(() => {
    // First paint and resizes (lanes switch to centered below 800px).
    const run = () => apply(scrollYProgress.get());
    const id = requestAnimationFrame(run);
    window.addEventListener("resize", run);
    return () => { cancelAnimationFrame(id); window.removeEventListener("resize", run); };
  }, [apply, scrollYProgress]);

  useEffect(() => {
    // Fetch every front's screenshot up front so none pops in mid-flight.
    const links = projects.map((p) => {
      const l = document.createElement("link");
      l.rel = "preload"; l.as = "image"; l.href = p.cover;
      document.head.appendChild(l);
      return l;
    });
    return () => links.forEach((l) => l.remove());
  }, [projects]);

  return (
    <section ref={heroRef} className="relative" style={{ height: reduce ? "100vh" : "620vh" }}>
      <div className="sticky top-0 h-screen overflow-hidden">
        <img
          ref={sky}
          src="/images/HeroBackdrop.webp"
          alt=""
          fetchPriority="high"
          className="absolute -left-[5%] -top-[5%] w-[110%] h-[110%] max-w-none object-cover opacity-75 will-change-transform"
        />
        <WarpField idle={modalOpen} />
        <div className="absolute inset-0 pointer-events-none bg-[radial-gradient(ellipse_at_center,transparent_30%,rgba(5,6,10,.85)_100%)]" />

        {!reduce && projects.map((p, i) => (
          <ProjectFront key={p.slug} project={p} onOpen={onOpen} ref={(el) => { fronts.current[i] = el; }} />
        ))}

        <div
          ref={title}
          className="absolute left-1/2 top-1/2 z-[4] w-[min(92vw,820px)] text-center will-change-transform"
          style={{ transform: "translate(-50%,-50%)" }}
        >
          <p className="font-mono text-xs font-medium tracking-[.18em] uppercase text-amber mb-5">
            Northeastern · CS &amp; Business
          </p>
          <h1 className="text-[clamp(56px,9vw,132px)] font-semibold tracking-[-0.045em] leading-[.92] text-ink">Ryan Sinha</h1>
          <p className="mt-5 mx-auto max-w-[520px] text-lg leading-relaxed font-light text-[#b7bac4]">
            I build full-stack products people actually use, and lead developer teams as an Oasis Accelerator Project Lead.
          </p>
          <div className="mt-8 flex items-center justify-center gap-3">
            <button
              type="button"
              onClick={onViewWork}
              className="px-5.5 py-3 rounded-full border border-transparent bg-amber text-space font-medium cursor-pointer shadow-[0_0_30px_-4px_rgba(251,191,36,.5)]
                transition-[translate,box-shadow] duration-300 hover:-translate-y-0.5 hover:shadow-[0_0_44px_0_rgba(251,191,36,.7)]
                focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-amber"
            >
              View work
            </button>
            <button
              type="button"
              onClick={openResume}
              className="px-5.5 py-3 rounded-full border border-white/20 text-ink font-medium cursor-pointer backdrop-blur-sm
                transition-colors duration-300 hover:border-white/45 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-amber"
            >
              Resume
            </button>
          </div>
        </div>

        {!reduce && (
          <p ref={hint} className="absolute bottom-10 left-1/2 -translate-x-1/2 z-[4] font-mono text-[11px] tracking-[.2em] uppercase text-mute">
            Scroll to launch ↓
          </p>
        )}

        <div
          ref={hud}
          aria-hidden="true"
          className="absolute left-7 bottom-7 z-[5] font-mono text-xs tracking-[.08em] text-mute opacity-0 transition-opacity duration-300 in-data-[autopilot]:opacity-0!"
        >
          <div>
            <b className="text-ink font-medium">{String(hudIndex + 1).padStart(2, "0")}</b> / {String(projects.length).padStart(2, "0")} ·{" "}
            {projects[hudIndex]?.title.toUpperCase()} · CLICK TO OPEN
          </div>
          <div className="flex gap-1.5 mt-2.5">
            {projects.map((p, k) => (
              <i key={p.slug} className={`w-[26px] h-0.5 transition-[background-color,box-shadow] duration-300 ${k <= hudIndex ? "bg-amber shadow-[0_0_8px_#fbbf24]" : "bg-white/15"}`} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
