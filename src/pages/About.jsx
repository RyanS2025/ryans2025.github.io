import StarField from "../components/StarField";
import PageHero from "../components/PageHero";
import { stripEmphasis } from "../utils/emphasis";
import { useResume } from "../hooks/useResume";
import resumeData from "../data/resumeData";

function Timeline({ items }) {
  return items.map((item) => (
    <div key={item.key} className="relative border-l border-line pl-5 pb-6 last:pb-0">
      <span className="absolute -left-[4px] top-1.5 w-[7px] h-[7px] rounded-full bg-amber shadow-[0_0_8px_#fbbf24]" />
      <p className="font-mono text-xs text-amber">{item.when}</p>
      <h4 className="mt-1 font-semibold text-ink">{item.title}</h4>
      <p className="text-sm text-mute">{item.sub}</p>
      <p className="mt-1.5 text-sm leading-relaxed text-mute/80">{item.note}</p>
    </div>
  ));
}

export default function About() {
  const { openResume } = useResume();

  // Everything below is derived from resumeData so the page and the PDF can't
  // drift apart.
  const skills = resumeData.skills.flatMap((group) => group.items);

  const education = resumeData.education.map((edu) => ({
    key: edu.school,
    when: edu.dates,
    title: edu.school,
    sub: edu.degree,
    note: `Courses: ${edu.coursework.join(", ")}`,
  }));

  // One list now. The resume no longer has a separate Leadership & Activities
  // section — Oasis and the Diwali Festival sit in `experience` alongside the
  // paid jobs, already ordered by start date, so this just mirrors it.
  const experience = resumeData.experience.map((exp) => ({
    key: exp.company,
    when: exp.dates,
    title: exp.company,
    sub: exp.title,
    // Bullets carry **emphasis** markers for the PDF; this page renders
    // them as plain text, so the markers have to come off.
    note: stripEmphasis(exp.bullets[0]),
  }));

  return (
    <>
      <PageHero>
        <div className="md:flex items-center gap-10">
          <img
            src="/images/RyanSinhaHeadshot.jpeg"
            alt="Ryan Sinha"
            className="w-44 h-44 rounded-full object-cover mb-6 md:mb-0 border border-amber/60 shadow-[0_0_40px_-8px_rgba(251,191,36,.45)]"
          />
          <div>
            <h1 className="text-4xl md:text-5xl font-semibold tracking-tight text-ink mb-4">About me<span className="text-amber">.</span></h1>
            <p className="max-w-2xl text-lg font-light leading-relaxed text-[#c9ccd4]">
              I'm Ryan, a second-year Computer Science and Business Administration student at Northeastern University.
              Originally from West Orange, New Jersey, I'm passionate about web development and love building tools that make people's lives easier.
              Through Oasis at Northeastern I lead the developer teams behind Lost and Hound and Backyard, and I mentor first-year students
              building their very first computer science project. I'm looking forward to my first co-op experience.
            </p>
          </div>
        </div>
      </PageHero>

      <div className="relative">
        <StarField />
        <section className="relative z-10 max-w-5xl mx-auto px-6 pb-24">
          <div className="flex items-end justify-between border-b border-line pb-3">
            <h2 className="text-3xl font-semibold tracking-tight text-ink">Resume</h2>
            <button onClick={openResume} className="text-sm text-amber hover:text-ink transition-colors cursor-pointer">
              Download Resume →
            </button>
          </div>

          <div className="grid md:grid-cols-2 gap-12 mt-8">
            <div>
              <h3 className="font-mono text-[11px] font-medium tracking-[.14em] uppercase text-amber mb-5">Education</h3>
              <Timeline items={education} />

              <h3 className="font-mono text-[11px] font-medium tracking-[.14em] uppercase text-amber mt-10 mb-4">Skills</h3>
              <div className="flex flex-wrap gap-2">
                {skills.map((s) => (
                  <span key={s} className="text-[13px] px-3 py-1.5 rounded-lg bg-white/[.04] border border-line text-[#c9ccd4] whitespace-nowrap">
                    {s}
                  </span>
                ))}
              </div>
            </div>

            <div>
              <h3 className="font-mono text-[11px] font-medium tracking-[.14em] uppercase text-amber mb-5">Leadership &amp; Experience</h3>
              <Timeline items={experience} />
            </div>
          </div>
        </section>
      </div>
    </>
  );
}
