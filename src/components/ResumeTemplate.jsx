import { forwardRef } from "react";
import { FaGithub, FaLinkedin, FaEnvelope } from "react-icons/fa";
import resumeData from "../data/resumeData";

const ResumeTemplate = forwardRef(function ResumeTemplate(_, ref) {
  const d = resumeData;

  return (
    <div
      ref={ref}
      style={{
        width: "816px",
        height: "1056px",
        fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
        backgroundColor: "#fff",
        color: "#222",
        display: "flex",
        flexDirection: "column",
        overflow: "hidden",
      }}
    >
      {/* Header */}
      <div
        style={{
          textAlign: "center",
          padding: "32px 24px 20px",
          borderBottom: "2px solid #333",
        }}
      >
        <h1
          style={{
            fontSize: "32px",
            fontWeight: 700,
            letterSpacing: "4px",
            margin: 0,
            textTransform: "uppercase",
          }}
        >
          {d.name}
        </h1>
        <p
          style={{
            fontSize: "12px",
            letterSpacing: "2px",
            margin: "6px 0 2px",
            textTransform: "uppercase",
            color: "#555",
          }}
        >
          {d.tagline}
        </p>
        <p
          style={{
            fontSize: "12px",
            letterSpacing: "2px",
            margin: 0,
            textTransform: "uppercase",
            color: "#555",
          }}
        >
          {d.subtitle}
        </p>
      </div>

      {/* Body */}
      <div style={{ display: "flex", flex: 1 }}>
        {/* Left Column */}
        <div
          style={{
            width: "280px",
            backgroundColor: "#2d2d2d",
            color: "#e0e0e0",
            padding: "20px 18px",
            fontSize: "11px",
            lineHeight: 1.5,
          }}
        >
          {/* Contact */}
          <SectionTitle light>Contact</SectionTitle>
          <div style={{ marginBottom: "16px" }}>
            <ContactLine icon={<FaEnvelope size={13} style={{ display: "inline", verticalAlign: "middle" }} />} text={d.contact.email} />
            <ContactLine icon={<FaGithub size={13} style={{ display: "inline", verticalAlign: "middle" }} />} text={d.contact.github} />
            <ContactLine icon={<FaLinkedin size={13} style={{ display: "inline", verticalAlign: "middle" }} />} text={d.contact.linkedin} />
          </div>

          {/* Education */}
          <SectionTitle light>Education</SectionTitle>
          {d.education.map((edu, i) => (
            <div key={i} style={{ marginBottom: "14px" }}>
              <p style={{ fontWeight: 700, color: "#ccc", margin: "0 0 2px" }}>
                {edu.years}
              </p>
              <p
                style={{
                  fontWeight: 700,
                  textTransform: "uppercase",
                  fontSize: "11px",
                  margin: "0 0 2px",
                }}
              >
                {edu.school}
              </p>
              {edu.details.map((det, j) => (
                <p key={j} style={{ margin: "0 0 2px", color: "#ccc" }}>
                  {det}
                </p>
              ))}
              <p style={{ margin: "4px 0 2px", color: "#aaa" }}>
                {edu.coursesLabel}
              </p>
              <ul style={{ margin: 0, paddingLeft: "14px", color: "#ccc" }}>
                {edu.courses.map((c, k) => (
                  <li key={k}>{c}</li>
                ))}
              </ul>
            </div>
          ))}

          {/* Skills */}
          <SectionTitle light>Skills</SectionTitle>
          <ul style={{ margin: "0 0 16px", paddingLeft: "14px", color: "#ccc" }}>
            {d.skills.map((skill) => (
              <li key={skill}>{skill}</li>
            ))}
          </ul>

          {/* Portfolio */}
          <SectionTitle light small>Portfolio – ryansinha.dev</SectionTitle>
          <ul style={{ margin: 0, paddingLeft: "14px", color: "#ccc" }}>
            {d.portfolio.bullets.map((b, i) => (
              <li key={i} style={{ marginBottom: "3px" }}>
                {b}
              </li>
            ))}
          </ul>
        </div>

        {/* Right Column */}
        <div style={{ flex: 1, padding: "20px 24px", fontSize: "11px", lineHeight: 1.55 }}>
          <SectionTitle>Work Experience</SectionTitle>
          {d.experience.map((exp, i) => (
            <div key={i} style={{ marginBottom: "16px" }}>
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "baseline",
                }}
              >
                <h3
                  style={{
                    fontSize: "13px",
                    fontWeight: 700,
                    margin: 0,
                  }}
                >
                  {exp.company}
                </h3>
                <span style={{ fontSize: "10px", color: "#666", whiteSpace: "nowrap" }}>
                  {exp.dates}
                </span>
              </div>
              <p
                style={{
                  fontStyle: "italic",
                  color: "#555",
                  margin: "2px 0 4px",
                }}
              >
                {exp.role}
              </p>
              <ul style={{ margin: 0, paddingLeft: "16px", color: "#333" }}>
                {exp.bullets.map((b, j) => (
                  <li key={j} style={{ marginBottom: "3px" }}>
                    {b}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
});

function SectionTitle({ children, light, small }) {
  return (
    <h2
      style={{
        fontSize: small ? "11px" : "14px",
        fontWeight: 700,
        textTransform: "uppercase",
        letterSpacing: small ? "1px" : "1.5px",
        borderBottom: light ? "1px solid #666" : "1px solid #333",
        paddingBottom: "4px",
        marginBottom: "10px",
        marginTop: "0",
        color: light ? "#fff" : "#222",
        whiteSpace: small ? "nowrap" : undefined,
      }}
    >
      {children}
    </h2>
  );
}

function ContactLine({ icon, text }) {
  return (
    <p style={{ margin: "0 0 6px", fontSize: "11px", lineHeight: "13px" }}>
      {icon}
      <span style={{ verticalAlign: "middle", marginLeft: "8px", position: "relative", top: "-5px" }}>{text}</span>
    </p>
  );
}

export default ResumeTemplate;
