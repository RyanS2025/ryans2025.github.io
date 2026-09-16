/**
 * Bullet text in resumeData.js marks its standout fact with **double
 * asterisks**. A recruiter skims before reading, so the bold is what has to
 * carry an entry on its own.
 *
 * Two consumers, two needs: ResumeTemplate renders JSX, while the About page
 * drops the same strings into plain text nodes. Keeping both helpers here
 * means neither can forget the other exists — the markers leaked onto the live
 * About page the first time this shipped.
 */

/** Renders **marked** spans as <strong>, leaving the rest as text. */
export function renderEmphasis(text) {
  if (typeof text !== "string") return text;
  return text.split(/(\*\*[^*]+\*\*)/g).map((part, i) =>
    part.startsWith("**") && part.endsWith("**") ? (
      <strong key={i}>{part.slice(2, -2)}</strong>
    ) : (
      part
    )
  );
}

/** Drops the markers for consumers that need a plain string, not JSX. */
export function stripEmphasis(text) {
  return typeof text === "string" ? text.replace(/\*\*([^*]+)\*\*/g, "$1") : text;
}
