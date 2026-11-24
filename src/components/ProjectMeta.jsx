// Small pieces shared by the hero fronts, grid cards, and project modal.

export function StatusPill({ project }) {
  if (project.comingSoon) {
    return <span className="text-[11px] font-semibold px-2 py-0.5 rounded-full bg-amber text-space">Coming Soon</span>;
  }
  // `active` means deployed and publicly reachable, even if development has ended.
  if (project.active) {
    return <span className="text-[11px] font-semibold px-2 py-0.5 rounded-full bg-[#4ade80] text-[#06130a]">Live</span>;
  }
  // Outlined rather than filled: still being built, not live yet.
  if (project.wip) {
    return (
      <span className="inline-flex items-center gap-1.5 text-[11px] font-semibold px-2 py-0.5 rounded-full border border-[#7dd3fc]/45 text-[#7dd3fc]">
        <span aria-hidden="true" className="w-1.5 h-1.5 rounded-full bg-[#7dd3fc] motion-safe:animate-pulse" />
        WIP
      </span>
    );
  }
  return null;
}

export function TagList({ tags, className = "" }) {
  return (
    <div className={`flex flex-wrap gap-1.5 ${className}`}>
      {tags.map((tag) => (
        <span key={tag} className="text-[11px] font-medium px-2.5 py-1 rounded-md bg-amber/[.08] text-amber">
          {tag}
        </span>
      ))}
    </div>
  );
}
