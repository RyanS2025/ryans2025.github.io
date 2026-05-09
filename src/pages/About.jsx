import { useRef, useCallback } from "react";
import html2canvas from "html2canvas";
import StarField from "../components/StarField";
import ResumeTemplate from "../components/ResumeTemplate";
import resumeData from "../data/resumeData";

export default function About() {
  const resumeRef = useRef(null);

  const downloadResume = useCallback(async () => {
    if (!resumeRef.current) return;
    const canvas = await html2canvas(resumeRef.current, {
      scale: 2,
      useCORS: true,
      backgroundColor: "#ffffff",
    });
    const link = document.createElement("a");
    link.download = "RyanSinha_Resume.png";
    link.href = canvas.toDataURL("image/png");
    link.click();
  }, []);

  const skills = resumeData.skills;

  const education = [
  { year: "2025 – 2029", school: "Northeastern University", degree: "Computer Science & Business Administration", note: "Courses: Program Design & Implementation, Discrete Structures" },
  { year: "2021 – 2025", school: "West Orange High School", degree: "GPA 4.47, Top 10%", note: "Courses: AP Computer Science, Java, C++, Visual Basic" },
  ];

  const experience = resumeData.experience.map((exp) => ({
    year: exp.dates,
    role: exp.role,
    company: exp.company,
    note: exp.bullets[0],
  }));

  return (
    <>
      <section className="relative overflow-hidden -mt-16">
        <img
          src="/images/HeroBackdrop.png"
          alt=""
          className="absolute inset-0 w-full h-full object-cover opacity-50"
        />
        <div className="absolute bottom-0 left-0 w-full h-40 bg-gradient-to-t from-gray-950 to-transparent" />
        <section className="max-w-5xl mx-auto pt-32 pb-32 relative">
          <div className="md:flex gap-8 mb-4">
            {/* Photo */}
            <img
              src="/images/RyanSinhaHeadshot.jpeg"
              alt="Ryan Sinha"
              className="w-48 h-48 rounded-full object-cover mb-6 md:mb-0 border-2 border-amber-400"
            />
            {/* Bio */}
            <div>
              <h1 className="text-3xl font-bold mb-4">About Me<span className="text-amber-400">.</span></h1>
              <p className="text-gray-400 leading-relaxed">
                I'm Ryan, a first-year Computer Science and Business Administration student at Northeastern University.
                Originally from West Orange, New Jersey, I'm passionate about web development and love building tools that make people's lives easier.
                I'm currently focused on growing my skills through personal projects and am looking forward to my first co-op experience.
              </p>
            </div>
          </div>
        </section>
      </section>

      <div className="relative">
        <StarField />
        <section className="max-w-5xl mx-auto px-6">
          <div className="flex items-center justify-between border-b border-amber-400 pb-2">
            {/* Resume */}
            <h2 className="text-3xl font-bold">Resume</h2>
            <button
              onClick={downloadResume}
              className="text-md text-amber-400 hover:text-amber-300 transition-colors cursor-pointer"
            >
              Download Resume →
            </button>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            <div>
              {/* Education */}
              <h3 className="text-xl font-semibold mb-3 mt-3">Education</h3>
              {education.map((edu) => (
                <div key={edu.year} className="border-l-2 border-amber-400 pl-4 mb-4">
                  <p className="text-sm text-amber-400">{edu.year}</p>
                  <h4 className="font-semibold">{edu.school}</h4>
                  <p className="text-sm text-gray-400">{edu.degree}</p>
                  <p className="text-sm text-gray-500 mt-1">{edu.note}</p>
                </div>
              ))}

              {/* Skills */}
              <h3 className="text-xl font-semibold mb-3 mt-3">Skills</h3>
              <div className="flex flex-wrap gap-2">
                {skills.map((s) => (
                  <span
                    key={s}
                    className="text-sm border border-amber-400 text-amber-400 px-3 py-1.5 rounded-full whitespace-nowrap"
                  >
                    {s}
                  </span>
                ))}
              </div>
            </div>

            <div>
              {/* Experience */}
              <h3 className="text-xl font-semibold mb-3 mt-3">Experience</h3>
              {experience.map((exp) => (
                <div key={exp.year} className="border-l-2 border-amber-400 pl-4 mb-4">
                  <p className="text-sm text-amber-400">{exp.year}</p>
                  <h4 className="font-semibold">{exp.company}</h4>
                  <p className="text-sm text-gray-400">{exp.role}</p>
                  <p className="text-sm text-gray-500 mt-1">{exp.note}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
      </div>

      {/* Hidden resume for PNG capture */}
      <div
        style={{
          position: "absolute",
          left: "-9999px",
          top: 0,
        }}
        aria-hidden="true"
      >
        <ResumeTemplate ref={resumeRef} />
      </div>
    </>
  );
}