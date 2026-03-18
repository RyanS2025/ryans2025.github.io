import { Link } from "react-router-dom";
import { useState } from "react";
import projects from "../data/projects";
import posts from "../data/posts";
import ProjectModal from "../components/ProjectModal";

export default function Home() {
  const [selected, setSelected] = useState(null);
  return (
    <>
      {/* Hero */}
      <section className="relative overflow-hidden -mt-16">
        <img src="/images/HeroBackdrop.png" alt="" className="absolute inset-0 w-full h-full object-cover opacity-50" />
        <div className="absolute bottom-0 left-0 w-full h-40 bg-gradient-to-t from-gray-950 to-transparent" />
        <div className="max-w-5xl mx-auto px-6 pt-32 pb-48 text-center relative">
          <p className="text-sm uppercase tracking-widest text-amber-400 mb-2">
            Student Developer & Designer at Northeastern University
          </p>
          <h1 className="text-4xl md:text-6xl font-bold mb-4">
            Hi, I'm <span className="text-amber-400">Ryan Sinha</span>.
          </h1>
          <p className="text-lg text-gray-400 mb-8 max-w-xl mx-auto">
            I study Computer Science & Business Administration and build projects that solve real problems.
          </p>
          <div className="flex gap-3 justify-center">
            <Link to="/projects"
              className="px-6 py-3 bg-amber-400 text-gray-950 rounded-full font-medium hover:bg-amber-300 transition-colors">
              View projects
            </Link>
            <Link to="/about"
              className="px-6 py-3 border border-white/10 rounded-full hover:border-white/30 transition-colors">
              About me
            </Link>
          </div>
        </div>
      </section>

      {/* Featured Projects */}
      <section className="max-w-5xl mx-auto px-6 pb-20 pt-12">
        <h2 className="text-2xl font-bold mb-6">Featured Work<span className="text-amber-400">.</span></h2>
        <div className="grid md:grid-cols-2 gap-6">
          {projects.filter((project) => project.featured).map((project) => (
            <div key={project.slug} onClick={() => setSelected(project)}
              className="cursor-pointer border border-white/5 rounded-xl overflow-hidden hover:-translate-y-1 hover:shadow-lg hover:shadow-amber-400/10 transition-all">
              <img src={project.images[0]} alt={project.title} className="w-full h-48 object-contain bg-gradient-to-b from-gray-800/50 to-gray-900 p-4" />
              <div className="p-5">
                <div className="flex gap-2 mb-2">{project.tags.map((tag) => (<span key={tag} className="text-xs bg-white/10 px-2 py-1 rounded-full">{tag}</span>))}</div>
                <h3 className="font-semibold text-lg">{project.title}</h3>
                <p className="text-sm text-gray-400 mt-1">{project.description}</p>
              </div>
            </div>
          ))}
        </div>
        <Link to="/projects" className="text-amber-400 hover:text-amber-300 transition-colors text-sm mt-4 inline-block">View all projects →</Link>
        <ProjectModal project={selected} onClose={() => setSelected(null)} />
      </section>

      {/* Glow + Divider */}
      <div className="relative">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[500px] bg-amber-400/5 rounded-full blur-3xl pointer-events-none" />
        <div className="max-w-5xl mx-auto px-6">
          <div className="h-[1px] bg-gradient-to-r from-transparent via-amber-400/30 to-transparent" />
        </div>
      </div>

      {/* Featured Posts */}
      <section className="max-w-5xl mx-auto px-6 pb-20 pt-12">
        <h2 className="text-2xl font-bold mb-6">Featured Posts<span className="text-amber-400">.</span></h2>
        <div className="grid md:grid-cols-2 gap-6">
          {posts.filter((post) => post.featured).map((post) => (
            <Link to={`/blog/${post.slug}`} key={post.slug} className="block border border-white/5 rounded-xl overflow-hidden hover:-translate-y-1 hover:shadow-lg hover:shadow-amber-400/10 transition-all">
              <div className="p-5 flex justify-between items-start">
                <div>
                  <h3 className="font-semibold text-lg">{post.title}</h3>
                  <p className="text-sm text-gray-400 mt-1">{post.excerpt}</p>
                </div>
                <span className="text-sm text-gray-500 whitespace-nowrap ml-4">{post.date}</span>
              </div>
            </Link>
          ))}
        </div>
        <Link to="/blog" className="text-amber-400 hover:text-amber-300 transition-colors text-sm mt-4 inline-block">View all posts →</Link>
      </section>
    </>
  );
}