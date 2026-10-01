import { StatusPill, TagList } from "./ProjectMeta";

/**
 * Grid card used on Home and Projects. With `reveal`, it waits hidden until
 * an ancestor gets `data-in`, then fades up on a stagger set by `index`. The
 * reveal lives on the wrapper so it never fights the button's hover lift.
 */
export default function ProjectCard({ project, onOpen, index = 0, reveal = false }) {
  return (
    <div
      style={{ "--i": index }}
      className={reveal
        // No motion-safe: here: media-query utilities are emitted after `in-*` ones with equal
        // specificity and would win, leaving cards hidden. Reduced motion is handled by the
        // parent setting data-in immediately (and transitions are off).
        ? "opacity-0 translate-y-7 transition-[opacity,translate] duration-700 ease-[cubic-bezier(.2,.8,.2,1)] motion-reduce:transition-none in-data-[reset]:transition-none in-data-[in]:opacity-100 in-data-[in]:translate-y-0 in-data-[in]:delay-[calc(var(--i)*90ms+120ms)]"
        : undefined}
    >
      <button
        type="button"
        onClick={(e) => onOpen(project, e.currentTarget)}
        className="group block w-full h-full text-left rounded-2xl overflow-hidden bg-white/[.03] border border-line cursor-pointer
          transition-[translate,border-color,box-shadow] duration-500 ease-[cubic-bezier(.2,.8,.2,1)]
          hover:-translate-y-1.5 hover:border-amber/35 hover:shadow-[0_30px_70px_-30px_rgba(251,191,36,.35)]
          focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-amber"
      >
        <div className="overflow-hidden">
          <img
            src={project.cover}
            alt={`${project.title} screenshot`}
            loading="lazy"
            style={{ objectPosition: project.coverPosition }}
            className="w-full aspect-video object-cover transition-transform duration-700 ease-[cubic-bezier(.2,.8,.2,1)] group-hover:scale-[1.04]"
          />
        </div>
        <div className="px-5.5 pt-5 pb-6">
          <h3 className="text-[21px] font-semibold tracking-tight text-ink flex items-center gap-2.5">
            {project.title} <StatusPill project={project} />
          </h3>
          <p className="text-[14.5px] leading-relaxed text-mute mt-2">{project.summary}</p>
          <TagList tags={project.tags} className="mt-3.5" />
        </div>
      </button>
    </div>
  );
}
