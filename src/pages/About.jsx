import { useState, useCallback } from "react";
import { AnimatePresence } from "framer-motion";
import StarField from "../components/StarField";
import { stripEmphasis } from "../utils/emphasis";
import ResumeModal from "../components/ResumeModal";
import resumeData from "../data/resumeData";

const RESUME_PDF = "/RyanSinha_Resume.pdf";
const RESUME_PNG = "/RyanSinha_Resume.png";

export default function About() {
  const [showResumeModal, setShowResumeModal] = useState(false);

  // The resume is the hand-edited PDF in public/, plus a PNG rendered from it
  // for the preview and PNG download. Replace both files together.
  const openResumeModal = useCallback(() => setShowResumeModal(true), []);

  const downloadResume = useCallback(() => {
    const link = document.createElement("a");
    link.download = "RyanSinha_Resume.png";
    link.href = RESUME_PNG;
    link.click();
  }, []);

  const downloadResumePdf = useCallback(() => {
    const link = document.createElement("a");
    link.download = "RyanSinha_Resume.pdf";
    link.href = RESUME_PDF;
    link.click();
  }, []);

  // Everything below is derived from resumeData so the page and the PDF can't
  // drift apart.
  const skills = resumeData.skills.flatMap((group) => group.items);

  const education = resumeData.education.map((edu) => ({
    year: edu.dates,
    school: edu.school,
    degree: edu.degree,
    note: `Courses: ${edu.coursework.join(", ")}`,
  }));

  // One list now. The resume no longer has a separate Leadership & Activities
  // section — Oasis and the Diwali Festival sit in `experience` alongside the
  // paid jobs, already ordered by start date, so this just mirrors it.
  const experience = resumeData.experience.map((exp) => ({
    dates: exp.dates,
    role: exp.title,
    org: exp.company,
    // Bullets carry **emphasis** markers for the PDF; this page renders
    // them as plain text, so the markers have to come off.
    note: stripEmphasis(exp.bullets[0]),
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
                I'm Ryan, a second-year Computer Science and Business Administration student at Northeastern University.
                Originally from West Orange, New Jersey, I'm passionate about web development and love building tools that make people's lives easier.
                Through Oasis at Northeastern I lead the developer teams behind Lost and Hound and Backyard, and I mentor first-year students
                building their very first computer science project. I'm looking forward to my first co-op experience.
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
              onClick={openResumeModal}
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
              <h3 className="text-xl font-semibold mb-3 mt-3">Leadership & Experience</h3>
              {experience.map((exp) => (
                <div key={exp.org} className="border-l-2 border-amber-400 pl-4 mb-4">
                  <p className="text-sm text-amber-400">{exp.dates}</p>
                  <h4 className="font-semibold">{exp.org}</h4>
                  <p className="text-sm text-gray-400">{exp.role}</p>
                  <p className="text-sm text-gray-500 mt-1">{exp.note}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
      </div>

      <AnimatePresence>
        {showResumeModal && (
          <ResumeModal
            onClose={() => setShowResumeModal(false)}
            onDownload={downloadResume}
            onDownloadPdf={downloadResumePdf}
            imageSrc={RESUME_PNG}
          />
        )}
      </AnimatePresence>
    </>
  );
}