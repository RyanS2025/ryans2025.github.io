import { useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { Link } from "react-router-dom";
import { motion, useReducedMotion } from "framer-motion";
import ProgressRail from "./ProgressRail";
import { StatusPill, TagList } from "./ProjectMeta";
import { modalSections } from "../lib/projectDetails";
import { renderEmphasis } from "../utils/emphasis";

const EASE = [0.2, 0.9, 0.2, 1];
const FOCUSABLE = 'a[href], button:not([disabled]), [tabindex]:not([tabindex="-1"])';

// Start the panel at the clicked card's box so it appears to grow out of it.
function originPose(el) {
  if (!el) return { opacity: 0, scale: 0.96 };
  const r = el.getBoundingClientRect();
  const w = Math.min(800, window.innerWidth - 32), h = Math.min(window.innerHeight * 0.86, 900);
  return {
    x: r.left + r.width / 2 - window.innerWidth / 2,
    y: r.top + r.height / 2 - window.innerHeight / 2,
    scaleX: r.width / w, scaleY: r.height / h, opacity: 0.4,
  };
}

/**
 * Full project detail. `project` is a projectDetails() shape; `origin` is the
 * element that was clicked. Parents key this by slug, which also resets the
 * carousel per project.
 */
export default function ProjectModal({ project, origin, onClose }) {
  const reduce = useReducedMotion();
  const sections = modalSections(project);
  const [img, setImg] = useState(0);
  const [initial] = useState(() => (reduce ? { opacity: 0 } : originPose(origin)));
  const scrollRef = useRef(null), panelRef = useRef(null), closeRef = useRef(null);
  const titleId = `project-${project.slug}`;
  const count = project.images.length;
  const show = (k) => setImg(((k % count) + count) % count);

  useEffect(() => {
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    closeRef.current?.focus({ preventScroll: true });
    return () => {
      document.body.style.overflow = prevOverflow;
      // Hand focus back to the card that opened us; hero fronts are hidden from AT, so skip those.
      if (origin && origin.getAttribute("aria-hidden") !== "true") origin.focus({ preventScroll: true });
    };
  }, [origin]);

  useEffect(() => {
    const onKey = (e) => {
      if (e.key === "Escape") onClose();
      else if (e.key === "ArrowRight" && count > 1) setImg((i) => (i + 1) % count);
      else if (e.key === "ArrowLeft" && count > 1) setImg((i) => (i - 1 + count) % count);
      else if (e.key === "Tab") {
        const els = [...panelRef.current.querySelectorAll(FOCUSABLE)];
        if (!els.length) return;
        const first = els[0], last = els[els.length - 1];
        // Clicking plain text drops focus to <body>; pull it back instead of tabbing into the page behind.
        if (!panelRef.current.contains(document.activeElement)) { e.preventDefault(); first.focus(); return; }
        if (e.shiftKey && document.activeElement === first) { e.preventDefault(); last.focus(); }
        else if (!e.shiftKey && document.activeElement === last) { e.preventDefault(); first.focus(); }
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [onClose, count]);

  const body = {
    overview: <p className="text-[15px] leading-relaxed text-white/60">{project.description}</p>,
    highlights: (
      <ul className="grid gap-3">
        {project.highlights.map((b) => (
          <li key={b} className="relative pl-5 text-[14.5px] leading-relaxed text-white/60 [&_strong]:text-ink [&_strong]:font-medium
            before:absolute before:left-0 before:top-[.6em] before:w-1.5 before:h-1.5 before:rounded-full before:bg-amber before:shadow-[0_0_8px_#fbbf24]">
            {renderEmphasis(b)}
          </li>
        ))}
      </ul>
    ),
    gallery: (
      <div className="grid sm:grid-cols-2 gap-3">
        {project.images.map((src, k) => (
          <button
            key={src}
            type="button"
            aria-label={`Show image ${k + 1}`}
            onClick={() => { show(k); scrollRef.current.scrollTo({ top: 0, behavior: reduce ? "auto" : "smooth" }); }}
            className="rounded-[10px] overflow-hidden border border-line hover:border-amber/50 transition-colors cursor-pointer"
          >
            <img src={src} alt="" loading="lazy" className="w-full aspect-[16/10] object-cover object-top bg-black/25" />
          </button>
        ))}
      </div>
    ),
    stack: (
      <dl className="border-t border-line font-mono text-[13px]">
        {[["ROLE", project.role], ["STACK", project.stack], ["DATES", project.dates]].filter(([, v]) => v).map(([k, v]) => (
          <div key={k} className="grid grid-cols-[100px_1fr] py-2.5 border-b border-line">
            <dt className="text-mute tracking-[.08em]">{k}</dt>
            <dd className="text-ink">{v}</dd>
          </div>
        ))}
      </dl>
    ),
    links: (
      <div className="flex gap-2.5 max-sm:flex-col">
        {project.link ? (
          <a href={project.link} target="_blank" rel="noopener noreferrer"
            className="flex-1 text-center px-5 py-3 rounded-[11px] bg-amber text-space text-sm font-semibold shadow-[0_2px_14px_rgba(251,191,36,.25)] hover:brightness-110 transition">
            View on GitHub
          </a>
        ) : (
          <Link
            to="/contact"
            state={{ message: `Hi Ryan, I'd like to request access to the ${project.title} GitHub repository. My GitHub username is: ` }}
            onClick={onClose}
            className="flex-1 text-center px-5 py-3 rounded-[11px] bg-amber text-space text-sm font-semibold shadow-[0_2px_14px_rgba(251,191,36,.25)] hover:brightness-110 transition"
          >
            Request GitHub Access
          </Link>
        )}
        {project.domain && (
          <a href={project.domain} target="_blank" rel="noopener noreferrer"
            className="flex-1 text-center px-5 py-3 rounded-[11px] border border-white/10 bg-white/[.06] text-white/70 text-sm font-semibold hover:bg-white/10 transition">
            View Website
          </a>
        )}
      </div>
    ),
  };

  return createPortal(
    <motion.div
      className="fixed inset-0 z-[9000] grid place-items-center bg-black/60 backdrop-blur-[22px]"
      onClick={onClose}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1, transition: { duration: 0.25 } }}
      exit={{ opacity: 0, transition: { duration: 0.2 } }}
    >
      <motion.div
        ref={panelRef}
        role="dialog"
        aria-modal="true"
        aria-labelledby={titleId}
        onClick={(e) => e.stopPropagation()}
        initial={initial}
        animate={{ x: 0, y: 0, scaleX: 1, scaleY: 1, scale: 1, opacity: 1, transition: { duration: reduce ? 0.2 : 0.55, ease: EASE } }}
        exit={{ opacity: 0, scale: 0.96, transition: { duration: 0.2, ease: "easeIn" } }}
        className="relative grid grid-cols-[64px_1fr] max-md:grid-cols-[40px_1fr] w-[min(800px,calc(100vw-32px))] h-[min(86vh,900px)]
          rounded-[26px] overflow-hidden border border-white/[.12] bg-glass backdrop-blur-[40px] backdrop-saturate-150
          shadow-[0_32px_80px_rgba(0,0,0,.55),inset_0_1px_0_rgba(255,255,255,.06)]"
      >
        <button
          ref={closeRef}
          type="button"
          onClick={onClose}
          aria-label="Close project"
          className="absolute top-4 right-4 z-10 w-[34px] h-[34px] rounded-full grid place-items-center text-sm text-white/60 border border-white/10
            bg-white/[.08] hover:bg-white/[.16] hover:text-white transition-colors cursor-pointer focus-visible:outline-2 focus-visible:outline-amber"
        >
          ✕
        </button>

        <ProgressRail scrollRef={scrollRef} sections={sections} />

        <div ref={scrollRef} className="relative overflow-y-auto overscroll-contain [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
          <div className="relative h-[340px] max-md:h-[220px] bg-black/25">
            <img src={project.images[img]} alt={`${project.title} screenshot ${img + 1} of ${count}`} className="w-full h-full object-contain p-6" />
            <div className="absolute inset-x-0 bottom-0 h-[110px] pointer-events-none bg-gradient-to-t from-[rgba(15,20,35,.66)] to-transparent" />
            {count > 1 && ["‹", "›"].map((glyph, d) => (
              <button
                key={glyph}
                type="button"
                aria-label={d ? "Next image" : "Previous image"}
                onClick={() => show(img + (d ? 1 : -1))}
                className={`absolute top-1/2 -translate-y-1/2 ${d ? "right-3.5" : "left-3.5"} z-[2] w-[34px] h-[34px] rounded-full grid place-items-center
                  text-white/50 border border-white/[.08] bg-white/[.06] hover:bg-white/[.14] hover:text-white transition cursor-pointer`}
              >
                {glyph}
              </button>
            ))}
          </div>

          <div className="px-8 max-md:px-5 pt-1 pb-12">
            <div className="flex items-center justify-between gap-4">
              <h2 id={titleId} className="text-[26px] font-semibold tracking-tight text-ink flex items-center gap-2.5">
                {project.title} <StatusPill project={project} />
              </h2>
              {count > 1 && (
                <div className="flex gap-1.5">
                  {project.images.map((src, k) => (
                    <button
                      key={src}
                      type="button"
                      aria-label={`Image ${k + 1}`}
                      onClick={() => show(k)}
                      className={`h-1.5 rounded-full transition-all duration-300 cursor-pointer ${k === img ? "w-[18px] bg-amber" : "w-1.5 bg-white/15 hover:bg-white/25"}`}
                    />
                  ))}
                </div>
              )}
            </div>
            <TagList tags={project.tags} className="mt-3" />

            {sections.map((s, i) => (
              <section key={s.id} data-msec className="pt-9">
                <h3 className="font-mono text-[11px] font-medium tracking-[.14em] uppercase text-amber mb-3.5">
                  {String(i + 1).padStart(2, "0")} <span className="text-mute">/</span> {s.label}
                </h3>
                {body[s.id]}
              </section>
            ))}
          </div>
        </div>
      </motion.div>
    </motion.div>,
    document.body,
  );
}
