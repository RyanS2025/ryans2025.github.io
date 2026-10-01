import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { Link } from "react-router-dom";
import { AnimatePresence, useReducedMotion } from "framer-motion";
import projects from "../data/projects";
import posts from "../data/posts";
import DeepFieldHero from "../components/home/DeepFieldHero";
import ProjectCard from "../components/ProjectCard";
import ProjectModal from "../components/ProjectModal";
import { useAutopilot } from "../hooks/useAutopilot";
import { projectDetails, sortProjects } from "../lib/projectDetails";
import { autopilotDuration } from "../lib/flight";

export default function Home() {
  const featured = useMemo(() => sortProjects(projects.filter((p) => p.featured)).map((p) => projectDetails(p)), []);
  const featuredPosts = useMemo(() => posts.filter((p) => p.featured).sort((a, b) => b.date.localeCompare(a.date)), []);
  const heroRef = useRef(null), workRef = useRef(null), gridRef = useRef(null);
  const [selected, setSelected] = useState(null); // { project, el }
  const [veil, setVeil] = useState(false);
  const landing = useRef({ timer: 0, frame: 0 });
  const { flyTo } = useAutopilot();
  const reduce = useReducedMotion();

  const open = useCallback((project, el) => setSelected({ project, el }), []);

  // Cards fade up the first time the grid scrolls into view.
  useEffect(() => {
    const grid = gridRef.current;
    if (reduce) { grid.dataset.in = ""; return; }
    const io = new IntersectionObserver(([e]) => { if (e.isIntersecting) grid.dataset.in = ""; }, { threshold: 0.12 });
    io.observe(grid);
    return () => io.disconnect();
  }, [reduce]);

  // A route change can unmount Home mid-landing; never let the timers outlive it.
  useEffect(() => () => {
    clearTimeout(landing.current.timer);
    cancelAnimationFrame(landing.current.frame);
  }, []);

  // The jump from the end of the hero to the grid happens behind a fade, then
  // the cards replay their entrance so the arrival reads as one motion.
  const land = useCallback(() => {
    setVeil(true);
    clearTimeout(landing.current.timer);
    landing.current.timer = setTimeout(() => {
      const grid = gridRef.current, work = workRef.current;
      if (!grid || !work) return;
      // Snap the cards hidden with transitions off (data-reset), commit that
      // with a reflow, then re-enable and reveal over two frames, so a repeat
      // visit replays the fade-up instead of reversing mid-transition.
      grid.dataset.reset = "";
      delete grid.dataset.in;
      window.scrollTo(0, work.offsetTop);
      void grid.offsetHeight;
      landing.current.frame = requestAnimationFrame(() => {
        delete grid.dataset.reset;
        landing.current.frame = requestAnimationFrame(() => { grid.dataset.in = ""; setVeil(false); });
      });
    }, 360);
  }, []);

  const viewWork = useCallback(() => {
    const hero = heroRef.current;
    if (reduce) { window.scrollTo(0, workRef.current.offsetTop); return; }
    const to = hero.offsetTop + hero.offsetHeight - window.innerHeight;
    if (window.scrollY >= to) { land(); return; }
    flyTo(to, autopilotDuration(to - window.scrollY, hero.offsetHeight - window.innerHeight), land);
  }, [flyTo, land, reduce]);

  return (
    <>
      <DeepFieldHero heroRef={heroRef} projects={featured} onOpen={open} onViewWork={viewWork} modalOpen={!!selected} />

      <section id="work" ref={workRef} className="max-w-6xl mx-auto px-7 pt-24 pb-24">
        <h2 className="text-[38px] font-semibold tracking-tight text-ink mb-7">Featured work</h2>
        <div ref={gridRef} className="grid md:grid-cols-2 gap-5.5">
          {featured.map((p, i) => <ProjectCard key={p.slug} project={p} index={i} onOpen={open} reveal />)}
        </div>
        <Link to="/projects" className="inline-block mt-6 text-sm text-amber hover:text-ink transition-colors">View all projects →</Link>
      </section>

      <section className="max-w-6xl mx-auto px-7 pb-28">
        <h2 className="text-[38px] font-semibold tracking-tight text-ink mb-4">Featured posts</h2>
        <div className="border-t border-line">
          {featuredPosts.map((post) => (
            <Link
              key={post.slug}
              to={`/blog/${post.slug}`}
              className="group grid md:grid-cols-[1fr_auto] gap-x-8 gap-y-1 py-6 border-b border-line transition-[padding] duration-300 hover:pl-3"
            >
              <h3 className="text-xl font-semibold tracking-tight text-ink group-hover:text-amber transition-colors">{post.title}</h3>
              <span className="font-mono text-xs text-mute md:row-span-2 md:pt-1.5">{post.date}</span>
              <p className="text-sm leading-relaxed text-mute max-w-2xl">{post.excerpt}</p>
            </Link>
          ))}
        </div>
        <Link to="/blog" className="inline-block mt-6 text-sm text-amber hover:text-ink transition-colors">View all posts →</Link>
      </section>

      {createPortal(
        <div aria-hidden="true" className={`fixed inset-0 z-[8000] bg-space pointer-events-none transition-opacity duration-[350ms] ${veil ? "opacity-100" : "opacity-0"}`} />,
        document.body,
      )}

      <AnimatePresence>
        {selected && (
          <ProjectModal key={selected.project.slug} project={selected.project} origin={selected.el} onClose={() => setSelected(null)} />
        )}
      </AnimatePresence>
    </>
  );
}
