import { Link } from "react-router-dom";
import posts from "../data/posts";
import StarField from "../components/StarField";
import PageHero from "../components/PageHero";

export default function Blog() {
  const sorted = [...posts].sort((a, b) => b.date.localeCompare(a.date));

  return (
    <>
      <PageHero title="Posts" subtitle="Updates on what I'm working on." />

      <div className="relative">
        <StarField />
        <section className="relative z-10 max-w-5xl mx-auto px-6 pb-24">
          <div className="border-t border-line">
            {sorted.map((post) => (
              <Link
                key={post.slug}
                to={`/blog/${post.slug}`}
                className="group grid md:grid-cols-[1fr_auto] gap-x-8 gap-y-1 py-7 border-b border-line transition-[padding] duration-300 hover:pl-3"
              >
                <h2 className="text-xl font-semibold tracking-tight text-ink group-hover:text-amber transition-colors flex items-center gap-2.5">
                  {post.title}
                  {post.comingSoon && <span className="text-[11px] font-semibold px-2 py-0.5 rounded-full bg-amber text-space">Coming Soon</span>}
                </h2>
                <span className="font-mono text-xs text-mute md:row-span-2 md:pt-1.5">{post.date}</span>
                <p className="text-sm leading-relaxed text-mute max-w-2xl">{post.excerpt}</p>
              </Link>
            ))}
          </div>
        </section>
      </div>
    </>
  );
}
