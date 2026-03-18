import projects from "../data/projects";
import { useState } from "react";

export default function Projects() {
  const [filter, setFilter] = useState("All");
  const allTags = ["All", ...new Set(projects.flatMap((p) => p.tags))];
  const visible = filter === "All" ? projects : projects.filter((p) => p.tags.includes(filter));

  return (
    <section className="max-w-5xl mx-auto px-6 py-12">
      <h1 className="text-3xl font-bold mb-2">Projects</h1>
      <p className="text-gray-400 mb-8">Things I've built and shipped.</p>
      <div className="flex gap-2 mb-6 flex-wrap">
        {allTags.map((tag) => (
          <button key={tag} onClick={() => setFilter(tag)} className={`text-sm px-3 py-1 rounded-full border transition-colors 
          ${filter === tag
          ? "bg-amber-400 text-gray-950 border-amber-400"
          : "border-white/10 text-gray-400 hover:text-white"}`}>
        {tag}
      </button>
        ))}
      </div>
      <div className="grid md:grid-cols-2 gap-6">
        {visible.map((project) => (
          <div key={project.slug}
            className="border border-white/5 rounded-xl overflow-hidden hover:-translate-y-1 transition-transform">
            <img src={project.images[0]} alt={project.title}
              className="w-full h-48 object-contain bg-gray-900 p-4" />
            <div className="p-5">
              <div className="flex gap-2 mb-2">
                {project.tags.map((tag) => (
                  <span key={tag}
                    className="text-xs bg-white/10 px-2 py-1 rounded-full">
                    {tag}
                  </span>
                ))}
              </div>
              <h3 className="font-semibold text-lg">{project.title}</h3>
              <p className="text-sm text-gray-400 mt-1">{project.description}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}