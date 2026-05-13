import posts from "../data/posts";
import { Link } from "react-router-dom";
import StarField from "../components/StarField";

export default function Blog() {
  return (
    <>
      {/* Hero */}
      <section className="relative overflow-hidden -mt-16">
        <img src="/images/HeroBackdrop.png" alt="" className="absolute inset-0 w-full h-full object-cover opacity-50" />
        <div className="absolute bottom-0 left-0 w-full h-40 bg-gradient-to-t from-gray-950 to-transparent" />
        <div className="max-w-5xl mx-auto px-6 pt-32 pb-20 relative">
          <h1 className="text-3xl font-bold mb-2">Posts<span className="text-amber-400">.</span></h1>
          <p className="text-gray-400">Updates on what I'm working on.</p>
        </div>
      </section>

      {/* Stars behind content */}
      <div className="relative">
        <StarField />

        <section className="relative z-10 max-w-5xl mx-auto px-6 py-12">
          <div className="flex flex-col gap-4">
            {[...posts].sort((a, b) => b.date.localeCompare(a.date)).map((post) => (
              <Link to={`/blog/${post.slug}`} key={post.slug}
                className="block bg-gray-900 border border-white/10 rounded-xl p-5 hover:-translate-y-1 hover:shadow-lg hover:shadow-amber-400/10 transition-all">
                <div className="flex justify-between items-start">
                  <div>
                    <div className="flex items-center gap-2">
                      <h2 className="font-semibold text-lg">{post.title}</h2>
                      {post.comingSoon && (
                        <span className="text-xs bg-amber-400 text-gray-950 px-2 py-0.5 rounded-full font-semibold">Coming Soon</span>
                      )}
                    </div>
                    <p className="text-sm text-gray-400 mt-1">{post.excerpt}</p>
                  </div>
                  <span className="text-sm text-gray-500 whitespace-nowrap ml-4">{post.date}</span>
                </div>
              </Link>
            ))}
          </div>
        </section>
      </div>
    </>
  );
}