import { Link } from "react-router-dom";
import { motion, useReducedMotion, useScroll, useTransform } from "framer-motion";

/**
 * Shared subpage header over the Milky Way photo, with a slow push-in as the
 * page scrolls. Pass `title`/`subtitle`, or `children` for a custom layout
 * (About uses the headshot + bio).
 */
export default function PageHero({ title, subtitle, back, children, narrow = false }) {
  const reduce = useReducedMotion();
  const { scrollY } = useScroll();
  const scale = useTransform(scrollY, [0, 600], [1, reduce ? 1 : 1.08]);

  return (
    <section className="relative overflow-hidden">
      <motion.img
        src="/images/HeroBackdrop.webp"
        alt=""
        style={{ scale }}
        className="absolute inset-0 w-full h-full object-cover opacity-50"
      />
      <div className="absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-space to-transparent" />
      <div className={`relative mx-auto px-6 pt-36 pb-20 ${narrow ? "max-w-3xl" : "max-w-5xl"}`}>
        {back && (
          <Link to={back.to} className="inline-block mb-5 text-sm text-mute hover:text-ink transition-colors">← {back.label}</Link>
        )}
        {children ?? (
          <>
            <h1 className="text-4xl md:text-5xl font-semibold tracking-tight text-ink">{title}<span className="text-amber">.</span></h1>
            {subtitle && <p className="mt-3 text-mute">{subtitle}</p>}
          </>
        )}
      </div>
    </section>
  );
}
