// Small pieces shared by the hero fronts, grid cards, and project modal.

export function StatusPill({ project }) {
  if (project.comingSoon) {
    return <span className="text-[11px] font-semibold px-2 py-0.5 rounded-full bg-amber text-space">Coming Soon</span>;
  }
  if (project.active) {
    return <span className="text-[11px] font-semibold px-2 py-0.5 rounded-full bg-[#4ade80] text-[#06130a]">Active</span>;
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
