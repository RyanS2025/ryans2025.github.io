// The Open source section on the Projects page.
//
// `upstream`: pull requests merged into projects I don't own. Diffstats and
// merge dates are GitHub's; each summary condenses that PR's description.
// `skills`: Claude Code skills I wrote and use on my own repos.
//
// Text may use **bold** (renderEmphasis) and `code` spans.

export const upstream = [
  {
    project: "Subconscious CLI",
    repo: "subconscious-systems/subconscious",
    url: "https://github.com/subconscious-systems/subconscious",
    blurb: "The command-line client for Subconscious: log in once, then run coding agents like Claude Code and OpenCode through the Subconscious gateway.",
    prs: [
      {
        number: 96,
        title: "fix(upgrade): use semver precedence when comparing versions",
        merged: "October 5, 2026",
        additions: 133,
        deletions: 38,
        summary:
          "`subc upgrade` told users on a prerelease build they were **already up to date** and never installed the release. " +
          "I moved it onto the shared semver comparator, and an unparseable version now installs instead of being skipped.",
      },
      {
        number: 97,
        title: "fix(update-check): order prerelease identifiers by ASCII",
        merged: "October 5, 2026",
        additions: 8,
        deletions: 1,
        summary:
          "Prerelease tags were compared with `localeCompare`, so the order **depended on the machine's locale**. " +
          "They now use the ASCII order the semver spec requires. Found while reviewing my own #96.",
      },
      {
        number: 98,
        title: "fix(config): stop redacting token budget settings",
        merged: "October 5, 2026",
        additions: 73,
        deletions: 4,
        summary:
          "`subc config` masked six numeric token budgets as if they were secrets. Budgets now print, while " +
          "**an API key pasted onto a budget line stays redacted**.",
      },
    ],
  },
];

export const skills = [
  {
    name: "/new-repo",
    summary:
      "Turns a project idea into a GitHub repo that's ready for a team and for Claude. CI is **green on the first push**, and every decision Claude made on its own is flagged for review.",
    points: [
      "Fills a 12-row project profile first (scope, stack, sensitive data, license) and asks at most one round of questions",
      "Writes `CLAUDE.md`, ADRs, and a roadmap whose boxes need evidence, plus a threat model and legal drafts when the idea calls for them",
      "Copies in CI, PR-title checks, auto-merge, Dependabot, and `/ship` and `/new-adr` project skills from tested templates",
      "Checks everything locally and waits for green CI before it locks down `main`",
    ],
    example: { label: "Used to scaffold Lorikeet", href: "https://github.com/mahirmugdho/lorikeet/pull/1" },
  },
  {
    name: "/onboard-repo",
    summary:
      "Gets you up to speed on an unfamiliar codebase without changing it. **Every claim comes with a file and line** you can open.",
    points: [
      "Reads the README, manifests, and recent history before any guessing",
      "Maps the repo with three parallel subagents: entry points, data and state, and build and conventions",
      "Checks the two most important claims by hand, then has a fresh subagent audit the rest",
      "Traces one real flow end to end and finishes with a question to check you understood",
    ],
    example: null,
  },
];
