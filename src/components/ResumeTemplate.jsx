import { forwardRef, useEffect, useRef } from "react";
import resumeData from "../data/resumeData";

// US Letter at 96 DPI. The page is a fixed box so html2canvas and the print
// iframe both produce exactly one 8.5x11 page.
const PAGE_WIDTH = 816;
const PAGE_HEIGHT = 1056;
const PAGE_MARGIN = 48; // 0.5 inch

// Must be a system stack — the print iframe has no access to the parent
// document's @font-face rules, so a webfont would silently fall back there.
const FONT_STACK = "Arial, Helvetica, sans-serif";
const BODY_SIZE = "10.5px";
const LINE_HEIGHT = 1.28;

const ResumeTemplate = forwardRef(function ResumeTemplate(_, ref) {
  const d = resumeData;
  const contentRef = useRef(null);

  // Two things that fail silently otherwise: the page clips anything past
  // 1056px (a whole section can vanish from the PDF), and unfilled [X]
  // placeholders would publish to the live About page as-is.
  useEffect(() => {
    const height = contentRef.current?.scrollHeight ?? 0;
    if (height > PAGE_HEIGHT) {
      console.warn(
        `[ResumeTemplate] Content is ${height}px tall but the page is ${PAGE_HEIGHT}px. ` +
          `${height - PAGE_HEIGHT}px will be clipped — trim resumeData.js (drop the summary, ` +
          `a project, or a bullet) until this warning goes away.`
      );
    }

    const placeholders = (JSON.stringify(d).match(/\[[A-Z][A-Z\s–-]*\]/g) ?? []).length;
    if (placeholders > 0) {
      console.warn(
        `[ResumeTemplate] ${placeholders} unfilled placeholder(s) in resumeData.js ` +
          `(e.g. [X], [GPA], [PHONE]). Fill these in before applying anywhere or deploying.`
      );
    }
  }, [d]);

  const contactParts = [
    d.contact.location,
    d.contact.phone,
    d.contact.email,
  ].filter(Boolean);

  return (
    <div
      ref={ref}
      style={{
        width: `${PAGE_WIDTH}px`,
        height: `${PAGE_HEIGHT}px`,
        fontFamily: FONT_STACK,
        backgroundColor: "#fff",
        color: "#000",
        overflow: "hidden",
      }}
    >
      <div
        ref={contentRef}
        style={{
          padding: `${PAGE_MARGIN}px`,
          fontSize: BODY_SIZE,
          lineHeight: LINE_HEIGHT,
        }}
      >
        {/* Header */}
        <header style={{ textAlign: "center", marginBottom: "10px" }}>
          <h1
            style={{
              fontSize: "26px",
              fontWeight: 700,
              letterSpacing: "1.5px",
              textTransform: "uppercase",
              margin: "0 0 6px",
            }}
          >
            {d.name}
          </h1>
          <p style={{ fontSize: "10px", margin: 0 }}>
            {contactParts.join("  •  ")}
          </p>
          <p style={{ fontSize: "10px", margin: "2px 0 0" }}>
            {d.contact.links.map((link, i) => (
              <span key={link.href}>
                {i > 0 && "  •  "}
                <PlainLink href={link.href}>{link.label}</PlainLink>
              </span>
            ))}
          </p>
        </header>

        {/* Summary — optional, renders only when written */}
        {d.summary && (
          <Section title="Summary">
            <p style={{ margin: 0 }}>{d.summary}</p>
          </Section>
        )}

        {/* Education */}
        <Section title="Education">
          {d.education.map((edu) => (
            <Entry
              key={edu.school}
              title={edu.school}
              titleRight={edu.location}
              subtitle={edu.degree}
              subtitleRight={edu.gradDate}
            >
              {edu.concentration && <Detail>{edu.concentration}</Detail>}
              {edu.gpa && <Detail>{edu.gpa}</Detail>}
              {edu.coursework?.length > 0 && (
                <Detail>
                  <strong>Relevant Coursework:</strong> {edu.coursework.join(", ")}
                </Detail>
              )}
              {edu.honors?.length > 0 && (
                <Detail>
                  <strong>Honors:</strong> {edu.honors.join(", ")}
                </Detail>
              )}
            </Entry>
          ))}
        </Section>

        {/* Projects */}
        <Section title="Projects">
          {d.projects.map((proj) => (
            <Entry
              key={proj.name}
              title={
                <>
                  {proj.name}
                  {proj.link && (
                    <span style={{ fontWeight: 400 }}>
                      {"  |  "}
                      <PlainLink href={proj.link.href}>{proj.link.label}</PlainLink>
                    </span>
                  )}
                </>
              }
              titleRight={proj.dates}
              subtitle={proj.tech}
            >
              <Bullets items={proj.bullets} />
            </Entry>
          ))}
        </Section>

        {/* Leadership & Activities sits above Experience: the Harvard
            template advises promoting it when the activities are more
            relevant to the role, and leading a dev team beats food service
            for a software co-op. */}
        <Section title="Leadership & Activities">
          {d.leadership.map((act) => (
            <Entry
              key={act.organization}
              title={act.organization}
              titleRight={act.location}
              subtitle={act.role}
              subtitleRight={act.dates}
            >
              <Bullets items={act.bullets} />
            </Entry>
          ))}
        </Section>

        {/* Experience */}
        <Section title="Experience">
          {d.experience.map((exp) => (
            <Entry
              key={exp.company}
              title={exp.company}
              titleRight={exp.location}
              subtitle={exp.title}
              subtitleRight={exp.dates}
            >
              <Bullets items={exp.bullets} />
            </Entry>
          ))}
        </Section>

        {/* Skills */}
        <Section title="Skills" last>
          {d.skills.map((group) => (
            <Detail key={group.category}>
              <strong>{group.category}:</strong> {group.items.join(", ")}
            </Detail>
          ))}
        </Section>
      </div>
    </div>
  );
});

function Section({ title, children, last }) {
  return (
    <section style={{ marginBottom: last ? 0 : "9px" }}>
      <h2
        style={{
          fontSize: "11.5px",
          fontWeight: 700,
          textTransform: "uppercase",
          letterSpacing: "1px",
          lineHeight: 1.25,
          margin: 0,
        }}
      >
        {title}
      </h2>
      {/* The rule is its own block rather than a border-bottom on the h2:
          html2canvas positions a border tight against the glyphs instead of
          below the line box, so in the PNG it cut through the text. */}
      <div style={{ height: "1px", backgroundColor: "#000", margin: "6px 0 4px" }} />
      {children}
    </section>
  );
}

// The four-corner header every Harvard entry shares: name/location on the
// first line, role/dates on the second.
function Entry({ title, titleRight, subtitle, subtitleRight, children }) {
  return (
    <div style={{ marginBottom: "6px" }}>
      <EntryLine left={title} right={titleRight} bold />
      {(subtitle || subtitleRight) && (
        <EntryLine left={subtitle} right={subtitleRight} italic />
      )}
      {children}
    </div>
  );
}

function EntryLine({ left, right, bold, italic }) {
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "baseline",
        gap: "12px",
      }}
    >
      <span style={{ fontWeight: bold ? 700 : 400, fontStyle: italic ? "italic" : "normal" }}>
        {left}
      </span>
      <span style={{ whiteSpace: "nowrap", fontStyle: italic ? "italic" : "normal" }}>
        {right}
      </span>
    </div>
  );
}

function Detail({ children }) {
  return <p style={{ margin: 0 }}>{children}</p>;
}

// The list marker is drawn as a real character instead of via list-style,
// because the three render paths disagree about native markers: Tailwind's
// preflight strips them on the page, html2canvas misplaces them in the PNG,
// and the print iframe draws them normally. A literal bullet looks the same
// in all three.
function Bullets({ items }) {
  return (
    <ul style={{ margin: "1px 0 0", padding: 0, listStyle: "none" }}>
      {items.map((item, i) => (
        <li key={i} style={{ display: "flex", gap: "6px", marginBottom: "1px" }}>
          <span aria-hidden="true">•</span>
          <span style={{ flex: 1 }}>{item}</span>
        </li>
      ))}
    </ul>
  );
}

// Anchors stay clickable in the exported PDF but read as plain black text.
function PlainLink({ href, children }) {
  return (
    <a href={href} style={{ color: "inherit", textDecoration: "none" }}>
      {children}
    </a>
  );
}

export default ResumeTemplate;
