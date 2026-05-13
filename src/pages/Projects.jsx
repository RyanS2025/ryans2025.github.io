import projects from "../data/projects";
import { useState } from "react";
import { AnimatePresence } from "framer-motion";
import ProjectModal from "../components/ProjectModal";
import StarField from "../components/StarField";

export default function Projects() {
  const [filter, setFilter] = useState("All");
  const allTags = ["All", ...new Set(projects.flatMap((p) => p.tags))];
  const sorted = [...projects].sort((a, b) => {
    const tier = (p) => {
      if (p.comingSoon) return 0;
      if (p.active) return 1;
      if (p.featured) return 2;
      return 3;
    };
    const tierDiff = tier(a) - tier(b);
    if (tierDiff !== 0) return tierDiff;
    return b.date.localeCompare(a.date);
  });
  const visible = filter === "All" ? sorted : sorted.filter((p) => p.tags.includes(filter));
  const [selected, setSelected] = useState(null);

  return (
    <>
      {/* Hero */}
      <section className="relative overflow-hidden -mt-16">
        <img src="/images/HeroBackdrop.png" alt="" className="absolute inset-0 w-full h-full object-cover opacity-50" />
        <div className="absolute bottom-0 left-0 w-full h-40 bg-gradient-to-t from-gray-950 to-transparent" />
        <div className="max-w-5xl mx-auto px-6 pt-32 pb-20 relative">
          <h1 className="text-3xl font-bold mb-2">Projects<span className="text-amber-400">.</span></h1>
          <p className="text-gray-400">Things I've built and shipped.</p>
        </div>
      </section>

      {/* Stars behind content */}
      <div className="relative">
        <StarField />

        <section className="relative z-10 max-w-5xl mx-auto px-6 py-12">
          {/* Filter tags */}
          <div className="flex gap-2 mb-6 flex-wrap">
            {allTags.map((tag) => (
              <button key={tag} onClick={() => setFilter(tag)}
                className={`text-sm px-3 py-1 rounded-full border transition-colors
                  ${filter === tag
                    ? "bg-amber-400 text-gray-950 border-amber-400"
                    : "border-white/10 text-gray-400 hover:text-white"}`}>
                {tag}
              </button>
            ))}
          </div>

          {/* Project grid */}
          <div className="grid md:grid-cols-2 gap-6">
            {visible.map((project) => (
              <div key={project.slug} onClick={() => setSelected(project)}
                className="cursor-pointer bg-gray-900 border border-white/10 rounded-xl overflow-hidden hover:-translate-y-1 hover:shadow-lg hover:shadow-amber-400/10 transition-all">
                <img src={project.images[0]} alt={project.title}
                  className="w-full h-48 object-contain bg-gray-800 p-4" />
                <div className="p-5">
                  <div className="flex gap-2 mb-2">
                    {project.tags.map((tag) => (
                      <span key={tag} className="text-xs bg-gray-800 px-2 py-1 rounded-full">{tag}</span>
                    ))}
                  </div>
                  <div className="flex items-center gap-2">
                    <h3 className="font-semibold text-lg">{project.title}</h3>
                    {project.comingSoon && (
                      <span className="text-xs bg-amber-400 text-gray-950 px-2 py-0.5 rounded-full font-semibold">Coming Soon</span>
                    )}
                    {project.active && (
                      <span className="text-xs bg-green-400 text-gray-950 px-2 py-0.5 rounded-full font-semibold">Active</span>
                    )}
                  </div>
                  <p className="text-sm text-gray-400 mt-1">{project.description}</p>
                </div>
              </div>
            ))}
          </div>

          <AnimatePresence>
            {selected && <ProjectModal key={selected.slug} project={selected} onClose={() => setSelected(null)} />}
          </AnimatePresence>
        </section>
      </div>
    </>
  );
}