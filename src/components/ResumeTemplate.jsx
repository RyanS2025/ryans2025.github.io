import { forwardRef, useEffect, useRef } from "react";
import resumeData from "../data/resumeData";
import { renderEmphasis } from "../utils/emphasis";

// US Letter at 96 DPI. The page is a fixed box so html2canvas and the print
// iframe both produce exactly one 8.5x11 page.
const PAGE_WIDTH = 816;
const PAGE_HEIGHT = 1056;
// 0.5 inch, the Khoury checklist floor, equal on all four sides.
const PAGE_MARGIN = 48;

// Must be a system stack — the print iframe has no access to the parent
// document's @font-face rules, so a webfont would silently fall back there.
const FONT_STACK = "Arial, Helvetica, sans-serif";
// CSS px x 0.75 = points at 96 DPI, so these map to real type sizes:
//   13.33px = 10pt body (the checklist floor)
//   14px    = 10.5pt section headings
//   21.33px = 16pt name (the checklist's suggested size)
//   12px    = 9pt contact line
//
// The checklist suggests 11pt and that was the target. Measured against the
// 1056px page at 0.5" margins: 11pt = 1268px, 10.5pt = 1040px, 10pt = 1048px
// with the current spacing. The jump from 10.5 to 11 is not the 10% the type
// size implies — fourteen bullets and three header lines cross the 708px line
// budget and wrap, so the real cost is ~34%.
//
// 10.5pt did fit, but only by starving the section rules (3px of clearance,
// which reads as a strikethrough in print) and cramming GPA, graduation and
// coursework onto one wrapped line. 10pt buys that space back. Legibility beat
// half a point: the spacing constants below are the reason for the size, not a
// consequence of it.
//
// Roughly 8px of slack remains — half a line. Anything added has to displace
// something else, and only the height warning below will catch it.
const BODY_SIZE = "13.33px";
const LINE_HEIGHT = 1.10;
const HEADING_SIZE = "14px";
// Education is four dense single-line rows with no bullets to break them up,
// so at the body's 1.10 it read as a solid block. Extra leading is scoped to
// this section only — applying it page-wide costs far more than the page has.
const EDUCATION_LINE_HEIGHT = 1.28;
const NAME_SIZE = "21.33px";
const CONTACT_SIZE = "12px";

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
        <header style={{ textAlign: "center", marginBottom: "5px" }}>
          <h1
            style={{
              fontSize: NAME_SIZE,
              fontWeight: 700,
              letterSpacing: "1.5px",
              textTransform: "uppercase",
              margin: "0 0 3px",
            }}
          >
            {d.name}
          </h1>
          <p style={{ fontSize: CONTACT_SIZE, margin: 0 }}>
            {contactParts.join("  •  ")}
          </p>
          <p style={{ fontSize: CONTACT_SIZE, margin: "1px 0 0" }}>
            {d.contact.links.map((link, i) => (
              <span key={link.href}>
                {i > 0 && "  •  "}
                <PlainLink href={link.href}>{link.label}</PlainLink>
              </span>
            ))}
          </p>
          {d.contact.availability && (
            <p style={{ fontSize: CONTACT_SIZE, fontWeight: 700, margin: "1px 0 0" }}>
              Available for Co-op: {d.contact.availability}
            </p>
          )}
        </header>

        {/* Summary — optional, renders only when written */}
        {d.summary && (
          <Section title="Summary">
            <p style={{ margin: 0 }}>{d.summary}</p>
          </Section>
        )}

        {/* Education — four lines, not one field per line:
              1. school + both colleges .......... location
              2. degree .......................... start date
              3. GPA ............................. expected graduation
              4. coursework
            No separate "Major:" line: the degree already names the major. */}
        <Section title="Education">
          <div style={{ lineHeight: EDUCATION_LINE_HEIGHT }}>
          {d.education.map((edu, i) => (
            <Entry
              key={edu.school}
              last={i === d.education.length - 1}
              title={
                <>
                  {edu.school}
                  {edu.colleges && (
                    <span style={{ fontWeight: 400 }}>{`, ${edu.colleges}`}</span>
                  )}
                </>
              }
              titleRight={edu.location}
              // GPA is not appended here. The degree alone already runs 513px
              // and the date range takes the right slot; adding "· GPA" hit the
              // 720px limit exactly and wrapped.
              subtitle={edu.degree}
              subtitleRight={edu.dates}
            >
              {/* GPA and graduation get their own line, using the same
                  left/right rule as every other entry. Stacking them onto the
                  front of the coursework line put three bold runs in a row and
                  pushed the whole thing into a wrapped block. */}
              {(edu.gpa || edu.gradDate) && (
                <EntryLine left={edu.gpa ? <strong>{edu.gpa}</strong> : null} right={edu.gradDate} />
              )}
              {edu.coursework?.length > 0 && (
                <Detail>
                  <strong>Coursework:</strong> {edu.coursework.join(", ")}
                </Detail>
              )}
              {edu.honors?.length > 0 && (
                <Detail>
                  <strong>Honors:</strong> {edu.honors.join(", ")}
                </Detail>
              )}
            </Entry>
          ))}
          </div>
        </Section>

        {/* "Computer Knowledge" is the checklist's name for this section, and
            it sits directly after Education so the keyword block is read
            before the work. */}
        <Section title="Computer Knowledge">
          {d.skills.map((group) => (
            <Detail key={group.category}>
              <strong>{group.category}:</strong> {group.items.join(", ")}
            </Detail>
          ))}
        </Section>

        {/* Projects */}
        <Section title="Projects">
          {d.projects.map((proj, i) => (
            <Entry
              key={proj.name}
              last={i === d.projects.length - 1}
              // Header reads: Name | Role | URL ......... Dates
              title={
                <>
                  {proj.name}
                  <span style={{ fontWeight: 400 }}>
                    {proj.role && `  |  ${proj.role}`}
                    {proj.link && (
                      <>
                        {"  |  "}
                        <PlainLink href={proj.link.href}>{proj.link.label}</PlainLink>
                      </>
                    )}
                  </span>
                </>
              }
              titleRight={proj.dates}
              subtitle={proj.tech}
            >
              <Bullets items={proj.bullets} />
            </Entry>
          ))}
        </Section>

        {/* Experience — paid and unpaid together. The checklist's Experience
            section explicitly covers both, so Oasis and the Diwali Festival
            sit here rather than in a separate Leadership & Activities
            section. Removing that heading and its rule reclaimed two lines. */}
        <Section title="Experience" last={!d.interests}>
          {d.experience.map((exp, i) => (
            <Entry
              key={exp.company}
              last={i === d.experience.length - 1}
              title={exp.company}
              titleRight={exp.location}
              subtitle={exp.title}
              subtitleRight={exp.dates}
            >
              <Bullets items={exp.bullets} />
            </Entry>
          ))}
        </Section>

        {/* Interests — renders only when written */}
        {d.interests && (
          <Section title="Interests" last>
            <p style={{ margin: 0 }}>{d.interests}</p>
          </Section>
        )}
      </div>
    </div>
  );
});

function Section({ title, children, last }) {
  return (
    <section style={{ marginBottom: last ? 0 : "8px" }}>
      <h2
        style={{
          fontSize: HEADING_SIZE,
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
          below the line box, so in the PNG it cut through the text.

          The margins are DELIBERATELY ASYMMETRIC (10px above, 2px below).
          Equal margins look wrong: the heading is uppercase with no
          descenders, so its ink stops well above its line box, while the
          following line's ink starts well below its own box top. With 6px on
          both sides, a pixel read of the exported PNG showed only 3px of real
          clearance above the rule against 16px below — the rule read as an
          underline on the heading rather than a divider. Shifting 4px from
          below to above evens the ink gaps out at roughly 8px and 11px at no
          cost in height. Measure the PNG, not the box model, before changing
          these. */}
      <div style={{ height: "1px", backgroundColor: "#000", margin: "10px 0 2px" }} />
      {children}
    </section>
  );
}

// The four-corner header every Harvard entry shares: name/location on the
// first line, role/dates on the second.
function Entry({ title, titleRight, subtitle, subtitleRight, children, last }) {
  return (
    // `last` drops the trailing margin: the section's own marginBottom already
    // separates the final entry from the next heading.
    //
    // Note this buys no height — the child's bottom margin was already
    // collapsing into the section's, so max(5, 8) was winning either way. It
    // is kept because the intent is now explicit rather than accidental. If
    // you are hunting for vertical space, this is not where it is.
    <div style={{ marginBottom: last ? 0 : "5px" }}>
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
          <span style={{ flex: 1 }}>{renderEmphasis(item)}</span>
        </li>
      ))}
    </ul>
  );
}

// Bullets mark their standout fact with **double asterisks**. A recruiter
// skims before reading, so the bold is what has to carry the entry on its own.
//
// Kept to at most three spans per entry on purpose: past that, everything is
// emphasised and the eye has nothing to land on, which is the same as no bold
// at all. Bold also renders WIDER than regular, so adding a span can push a
// bullet past the 708px line budget and cost a whole line — re-measure after
// editing these, do not assume the text still fits.
// Anchors stay clickable in the exported PDF but read as plain black text.
function PlainLink({ href, children }) {
  return (
    <a href={href} style={{ color: "inherit", textDecoration: "none" }}>
      {children}
    </a>
  );
}

export default ResumeTemplate;
