export default function About() {
  const skills = ["JavaScript", "React", "Python", "HTML/CSS", "Tailwind", "Git", "SQL", "Supabase", "Node.js", "Java", "C++", "VS Code", "GitHub", "Vite", "Team Leadership", "Event Planning", "Public Speaking"];

  const education = [
  { year: "2025 – 2029", school: "Northeastern University", degree: "Computer Science & Business Administration", note: "Courses: Program Design & Implementation, Discrete Structures" },
  { year: "2021 – 2025", school: "West Orange High School", degree: "GPA 4.47, Top 10%", note: "Courses: AP Computer Science, Java, C++, Visual Basic" },
  ];

  const experience = [
  { year: "2025 – Present", role: "Crew Member", company: "Tropical Smoothie Cafe", note: "Customer service, food prep, POS operations, and daily closing procedures." },
  { year: "2023 – 2025", role: "Shift Leader", company: "Guerriero Gelato", note: "Led shifts, managed team workflow, and maintained store operations." },
  { year: "2022 – 2025", role: "Emcee / Founding Organizer", company: "United Asian Voices Diwali Festival", note: "Co-created an annual Diwali Festival in West Orange, scripted events, and promoted local businesses." },
  { year: "2021 – 2023", role: "Camp Leader", company: "West Orange Summer Enrichment", note: "Taught music to young students and supervised aftercare programs." },
  ];

  return (
    <>
      <section className="max-w-5xl mx-auto px-6 py-12">
        <div className="md:flex gap-8 mb-4">
          {/* Photo */}
          <img src="/images/RyanSinhaHeadshot.jpeg" alt="Ryan Sinha" className="w-48 h-48 rounded-full object-cover mb-6 md:mb-0" />
          {/* Bio */}
          <div>
            <h1 className="text-3xl font-bold mb-4">About Me</h1>
            <p className="text-gray-400 leading-relaxed">
              I'm Ryan, a first-year Computer Science and Business Administration student at Northeastern University.
              Originally from West Orange, New Jersey, I'm passionate about web development and love building tools that make people's lives easier.
              I'm currently focused on growing my skills through personal projects and am looking forward to my first co-op experience.
            </p>
          </div>
        </div>
      </section>

      <section className="max-w-5xl mx-auto px-6">
        <div className="flex items-center justify-between border-b border-amber-400 pb-2">
          {/* Resume */}
          <h2 className="text-3xl font-bold">Resume</h2>
          <a href="/RyanSinhaResumeWebsite.png" target="_blank" className="text-md text-amber-400 hover:text-amber-300 transition-colors"> Download Resume →</a>
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
                {skills.map((s) => (<span key={s} className="text-sm border border-amber-400 text-amber-400 px-3 py-1.5 rounded-full whitespace-nowrap"> {s} </span>))}
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
    </>
  );
}