import { Link } from "react-router-dom";
import projects from "../data/projects";
import posts from "../data/posts";

export default function Home() {
  return (
    <>
      {/* Hero */}
      <section className="max-w-3xl mx-auto px-6 py-24">
        <p className="text-sm uppercase tracking-widest text-amber-400 mb-2">
          Student Developer & Designer at Northeastern University
        </p>
        <h1 className="text-4xl md:text-6xl font-bold mb-4">
          Hi, I'm <span className="text-amber-400">Ryan Sinha</span>.
        </h1>
        <p className="text-lg text-gray-400 mb-8 max-w-xl">
          I study Computer Science & Business Administration and build projects that solve real problems.
        </p>
        <div className="flex gap-3">
          <Link to="/projects"
            className="px-5 py-2.5 bg-amber-400 text-gray-950 rounded-lg font-medium">
            View projects
          </Link>
          <Link to="/about"
            className="px-5 py-2.5 border border-white/10 rounded-lg">
            About me
          </Link>
        </div>
      </section>

      {/* Featured Projects */}
      <section className="max-w-5xl mx-auto px-6 pb-20">
        <h2 className="text-2xl font-bold mb-6">Featured Work</h2>
        <div className="grid md:grid-cols-2 gap-6">
          {projects.filter((project) => project.featured).map((project) => (
            <div key={project.slug}
              className="border border-white/5 rounded-xl overflow-hidden hover:-translate-y-1 transition-transform">
              <img src={project.images[0]} alt={project.title} className="w-full h-48 object-contain bg-gray-900 p-4" />
              <div className="p-5">
                <h3 className="font-semibold text-lg">{project.title}</h3>
                <p className="text-sm text-gray-400 mt-1">{project.description}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Featured Posts */}
      <section className="max-w-5xl mx-auto px-6 pb-20">
        <h2 className="text-2xl font-bold mb-6">Featured Posts</h2>
        <div className="grid md:grid-cols-2 gap-6">
          {posts.slice(0, 2).map((post) => (
            <div key={post.slug}
              className="border border-white/5 rounded-xl overflow-hidden hover:-translate-y-1 transition-transform">
              <div className="p-5">
                <h3 className="font-semibold text-lg">{post.title}</h3>
                <p className="text-sm text-gray-400 mt-1">{post.excerpt}</p>
              </div>
            </div>
          ))}
      </div>
      </section>
    </>
  );
}