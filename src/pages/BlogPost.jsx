import { useParams } from "react-router-dom";
import posts from "../data/posts";
import StarField from "../components/StarField";
import PageHero from "../components/PageHero";

const back = { to: "/blog", label: "Back to Blog" };

export default function BlogPost() {
  const { slug } = useParams();
  const post = posts.find((p) => p.slug === slug);

  if (!post) return <PageHero title="Post not found" back={back} narrow />;

  // Bodies are plain strings with blank lines between paragraphs.
  const paragraphs = String(post.body ?? "").split(/\n\s*\n/).map((p) => p.trim()).filter(Boolean);

  return (
    <>
      <PageHero back={back} narrow>
        <h1 className="text-4xl md:text-5xl font-semibold tracking-tight text-ink">{post.title}<span className="text-amber">.</span></h1>
        <p className="mt-3 font-mono text-xs text-mute">{post.date}</p>
      </PageHero>

      <div className="relative">
        <StarField />
        <article className="relative z-10 max-w-3xl mx-auto px-6 pb-24 space-y-5 text-[17px] leading-[1.75] text-[#c9ccd4]">
          {paragraphs.map((p, i) => <p key={i}>{p}</p>)}
        </article>
      </div>
    </>
  );
}
