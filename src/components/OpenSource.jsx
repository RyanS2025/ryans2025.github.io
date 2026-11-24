import { Link } from "react-router-dom";
import { GoArrowUpRight, GoGitMerge, GoTerminal } from "react-icons/go";
import { skills, upstream } from "../data/openSource";
import { renderEmphasis } from "../utils/emphasis";

// `code` spans first, then **bold** inside the plain parts.
function Inline({ text }) {
  return text.split(/(`[^`]+`)/g).map((part, i) =>
    part.startsWith("`") ? (
      <code key={i} className="font-mono text-[.9em] px-1 py-px rounded bg-white/[.06] text-ink">{part.slice(1, -1)}</code>
    ) : (
      <span key={i}>{renderEmphasis(part)}</span>
    ),
  );
}

const Label = ({ children, className = "" }) => (
  <h3 className={`font-mono text-[11px] font-medium tracking-[.14em] uppercase text-amber ${className}`}>{children}</h3>
);

function UpstreamRepo({ project, repo, url, blurb, prs }) {
  return (
    <div className="rounded-2xl border border-line bg-white/[.03] overflow-hidden">
      <div className="px-6 pt-5 pb-4 max-sm:px-5">
        <div className="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1">
          <h4 className="text-xl font-semibold tracking-tight text-ink">{project}</h4>
          <a href={url} target="_blank" rel="noopener noreferrer"
            className="inline-flex items-center gap-1 font-mono text-xs text-mute hover:text-amber transition-colors break-all">
            {repo} <GoArrowUpRight aria-hidden="true" className="shrink-0" />
          </a>
        </div>
        <p className="mt-1.5 text-sm leading-relaxed text-mute">{blurb}</p>
      </div>

      <ul className="border-t border-line">
        {prs.map((pr) => (
          <li key={pr.number} className="border-b border-line last:border-b-0">
            <a
              href={`${url}/pull/${pr.number}`}
              target="_blank"
              rel="noopener noreferrer"
              className="group grid grid-cols-[auto_1fr] gap-x-3.5 px-6 py-4 max-sm:px-5 transition-colors hover:bg-white/[.03]
                focus-visible:outline-2 focus-visible:-outline-offset-2 focus-visible:outline-amber"
            >
              {/* GitHub's merged purple, so it reads as "merged" at a glance. */}
              <GoGitMerge aria-hidden="true" className="mt-[3px] text-[#a371f7] text-base" />
              <div className="min-w-0">
                <div className="flex flex-wrap items-baseline gap-x-3 gap-y-1">
                  <span className="font-mono text-[13.5px] text-ink group-hover:text-amber transition-colors break-words">{pr.title}</span>
                  <span className="font-mono text-xs text-mute">#{pr.number}</span>
                </div>
                <p className="mt-1.5 text-[14px] leading-relaxed text-white/60 [&_strong]:text-ink [&_strong]:font-medium">
                  <Inline text={pr.summary} />
                </p>
                <p className="mt-2 font-mono text-[11.5px] text-mute">
                  <span className="text-[#a371f7]">Merged</span> {pr.merged}
                  <span className="mx-2 text-white/20">·</span>
                  <span className="text-[#4ade80]">+{pr.additions}</span>{" "}
                  <span className="text-[#f87171]">−{pr.deletions}</span>
                </p>
              </div>
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
}

function SkillCard({ name, summary, points, example }) {
  return (
    <article className="flex flex-col rounded-2xl border border-line bg-white/[.03] px-6 pt-5 pb-6 max-sm:px-5">
      <h4 className="flex items-center gap-2.5 font-mono text-lg font-medium text-ink">
        <GoTerminal aria-hidden="true" className="text-amber" />
        {name}
      </h4>
      <p className="mt-2.5 text-[14.5px] leading-relaxed text-white/60 [&_strong]:text-ink [&_strong]:font-medium">
        <Inline text={summary} />
      </p>
      <ul className="mt-4 grid gap-2.5">
        {points.map((p) => (
          <li key={p} className="relative pl-4.5 text-[13.5px] leading-relaxed text-mute
            before:absolute before:left-0 before:top-[.6em] before:w-1.5 before:h-1.5 before:rounded-full before:bg-amber before:shadow-[0_0_8px_#fbbf24]">
            <Inline text={p} />
          </li>
        ))}
      </ul>
      <div className="mt-auto pt-5">
        {example ? (
          <a href={example.href} target="_blank" rel="noopener noreferrer"
            className="inline-flex items-center gap-1 text-sm text-amber hover:text-ink transition-colors">
            {example.label} <GoArrowUpRight aria-hidden="true" />
          </a>
        ) : (
          <Link
            to="/contact"
            state={{ message: `Hi Ryan, I'd like to see the source for your ${name} Claude Code skill. ` }}
            className="inline-flex items-center gap-1 text-sm text-amber hover:text-ink transition-colors"
          >
            Ask me for the source →
          </Link>
        )}
      </div>
    </article>
  );
}

/** Merged upstream PRs and Claude Code skills, below the Projects grid. */
export default function OpenSource() {
  const merged = upstream.reduce((n, r) => n + r.prs.length, 0);
  return (
    <section id="open-source" aria-labelledby="open-source-title" className="relative z-10 max-w-5xl mx-auto px-6 pb-24">
      <div className="border-t border-line pt-14">
        <h2 id="open-source-title" className="text-[38px] font-semibold tracking-tight text-ink">Open source</h2>
        <p className="mt-2 text-mute">
          {merged} fixes merged into other people's projects, and the Claude Code skills I wrote for starting and learning codebases.
        </p>
      </div>

      <Label className="mt-10 mb-4">Merged upstream</Label>
      <div className="grid gap-5.5">
        {upstream.map((r) => <UpstreamRepo key={r.repo} {...r} />)}
      </div>

      <Label className="mt-12 mb-4">Claude Code skills</Label>
      <div className="grid md:grid-cols-2 gap-5.5">
        {skills.map((s) => <SkillCard key={s.name} {...s} />)}
      </div>
    </section>
  );
}
