import { useParams, Link } from "react-router-dom";
import posts from "../data/posts";
import StarField from "../components/StarField";

export default function BlogPost() {
  const { slug } = useParams();
  const post = posts.find((p) => p.slug === slug);

  if (!post) {
    return (
      <section className="relative overflow-hidden">
        <img src="/images/HeroBackdrop.png" alt="" className="absolute inset-0 w-full h-full object-cover opacity-50" />
        <div className="absolute bottom-0 left-0 w-full h-40 bg-gradient-to-t from-gray-950 to-transparent" />
        <div className="max-w-3xl mx-auto px-6 pt-32 pb-20 relative">
          <h1 className="text-2xl font-bold">Post not found</h1>
          <Link to="/blog" className="text-amber-400 mt-4 inline-block">← Back to Blog</Link>
        </div>
      </section>
    );
  }

  return (
    <>
      {/* Hero */}
      <section className="relative overflow-hidden">
        <img src="/images/HeroBackdrop.png" alt="" className="absolute inset-0 w-full h-full object-cover opacity-50" />
        <div className="absolute bottom-0 left-0 w-full h-40 bg-gradient-to-t from-gray-950 to-transparent" />
        <div className="max-w-3xl mx-auto px-6 pt-32 pb-20 relative">
          <Link to="/blog" className="text-sm text-gray-400 hover:text-white transition-colors mb-4 inline-block">← Back to Blog</Link>
          <h1 className="text-3xl font-bold mb-2">{post.title}<span className="text-amber-400">.</span></h1>
          <p className="text-sm text-gray-500">{post.date}</p>
        </div>
      </section>

      {/* Stars behind content */}
      <div className="relative">
        <StarField />

        <article className="relative z-10 max-w-3xl mx-auto px-6 py-12">
          <div className="text-gray-300 leading-relaxed">{post.body}</div>
        </article>
      </div>
    </>
  );
}