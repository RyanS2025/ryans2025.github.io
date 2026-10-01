import { useMemo, useState } from "react";
import { AnimatePresence } from "framer-motion";
import projects from "../data/projects";
import StarField from "../components/StarField";
import PageHero from "../components/PageHero";
import ProjectCard from "../components/ProjectCard";
import ProjectModal from "../components/ProjectModal";
import { projectDetails, sortProjects } from "../lib/projectDetails";

export default function Projects() {
  const all = useMemo(() => sortProjects(projects).map((p) => projectDetails(p)), []);
  const allTags = useMemo(() => ["All", ...new Set(projects.flatMap((p) => p.tags))], []);
  const [filter, setFilter] = useState("All");
  const [selected, setSelected] = useState(null); // { project, el }
  const visible = filter === "All" ? all : all.filter((p) => p.tags.includes(filter));

  return (
    <>
      <PageHero title="Projects" subtitle="Things I've built and shipped." />

      <div className="relative">
        <StarField />
        <section className="relative z-10 max-w-5xl mx-auto px-6 pb-24">
          <div className="flex gap-2 mb-7 flex-wrap">
            {allTags.map((tag) => (
              <button
                key={tag}
                onClick={() => setFilter(tag)}
                aria-pressed={filter === tag}
                className={`text-sm px-3.5 py-1.5 rounded-full border transition-colors cursor-pointer ${
                  filter === tag ? "bg-amber text-space border-amber font-medium" : "border-line text-mute hover:text-ink hover:border-white/25"
                }`}
              >
                {tag}
              </button>
            ))}
          </div>

          <div className="grid md:grid-cols-2 gap-5.5">
            {visible.map((p, i) => (
              <ProjectCard key={p.slug} project={p} index={i} onOpen={(project, el) => setSelected({ project, el })} />
            ))}
          </div>
        </section>
      </div>

      <AnimatePresence>
        {selected && (
          <ProjectModal key={selected.project.slug} project={selected.project} origin={selected.el} onClose={() => setSelected(null)} />
        )}
      </AnimatePresence>
    </>
  );
}
