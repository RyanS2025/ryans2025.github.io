import { StatusPill, TagList } from "../ProjectMeta";

/**
 * A mini version of the project modal that flies out of the starfield.
 * DeepFieldHero writes its transform/opacity every frame and toggles
 * `data-live` while it holds still enough to click.
 *
 * No backdrop-filter: this element scales up to ~3.7x per frame, and a
 * blurred backdrop that size renders as a flickering black box.
 *
 * Hidden from assistive tech and the tab order: it is only on screen for a
 * slice of the scroll, and the Featured work grid below offers the same
 * projects as ordinary, always-reachable buttons.
 */
export default function ProjectFront({ project, onOpen, ref }) {
  return (
    <button
      ref={ref}
      type="button"
      tabIndex={-1}
      aria-hidden="true"
      onClick={(e) => onOpen(project, e.currentTarget)}
      style={{ background: "linear-gradient(rgba(18,23,40,.94), rgba(12,16,30,.94))", transform: "translate(-50%,-50%) scale(.05)" }}
      className="absolute left-1/2 top-1/2 z-[3] w-[min(500px,40vw)] max-md:w-[84vw] text-left rounded-[22px] overflow-hidden border border-white/[.13]
        opacity-0 pointer-events-none data-[live]:pointer-events-auto in-data-[autopilot]:pointer-events-none! cursor-pointer will-change-transform
        shadow-[0_30px_80px_-20px_rgba(0,0,0,.9)] transition-shadow duration-300
        hover:shadow-[0_0_0_1px_rgba(251,191,36,.55),0_0_60px_-6px_rgba(251,191,36,.45),0_30px_80px_-20px_rgba(0,0,0,.9)]"
    >
      <div className="h-[220px] max-md:h-[170px] bg-black/25 p-3.5">
        <img src={project.cover} alt="" fetchPriority="low" decoding="async" className="w-full h-full object-cover object-top rounded-[10px]" />
      </div>
      <div className="px-5 pt-4 pb-5">
        <h3 className="text-xl font-semibold tracking-tight text-ink flex items-center gap-2">
          {project.title} <StatusPill project={project} />
        </h3>
        <p className="text-[13.5px] leading-normal text-white/55 mt-1.5 pr-16">{project.summary}</p>
        <TagList tags={project.tags} className="mt-3" />
      </div>
      <span className="absolute right-5 bottom-5 font-mono text-[11px] tracking-[.1em] text-amber/80">OPEN ↗</span>
    </button>
  );
}
