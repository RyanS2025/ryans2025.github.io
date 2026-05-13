import { useState, useEffect } from "react";
import { motion } from "framer-motion";

// Scale + Fade transition (Apple-style)
const backdrop = {
    initial: { opacity: 0 },
    animate: { opacity: 1, transition: { duration: 0.2, ease: "easeOut" } },
    exit: { opacity: 0, transition: { duration: 0.2, ease: "easeIn" } },
};
const card = {
    initial: { opacity: 0, scale: 0.96 },
    animate: { opacity: 1, scale: 1, transition: { type: "spring", damping: 25, stiffness: 400 } },
    exit: { opacity: 0, scale: 0.96, transition: { duration: 0.2, ease: "easeIn" } },
};

export default function ProjectModal({ project, onClose }) {
    const [imgIndex, setImgIndex] = useState(0);
    useEffect(() => { setImgIndex(0); }, [project]);

    return (
        <motion.div
            className="fixed inset-0 bg-black/60 backdrop-blur-2xl z-[9999] flex items-center justify-center"
            onClick={onClose}
            {...backdrop}
        >
        <motion.div
            onClick={(e) => e.stopPropagation()}
            className="w-full max-w-[680px] mx-4 max-h-[85vh] overflow-hidden flex flex-col rounded-3xl border border-white/[0.12]"
            style={{
                background: "rgba(15, 20, 35, 0.65)",
                backdropFilter: "blur(40px) saturate(150%)",
                WebkitBackdropFilter: "blur(40px) saturate(150%)",
                boxShadow: "0 32px 80px rgba(0,0,0,0.55), inset 0 1px 0 rgba(255,255,255,0.06)",
            }}
            {...card}
        >

            {/* Hero Image */}
            <div className="relative h-[360px] bg-black/25 rounded-t-3xl overflow-hidden">
                <img src={project.images[imgIndex]} alt={project.title} className="w-full h-full object-contain p-6" />

                {/* Gradient fade into content */}
                <div className="absolute bottom-0 left-0 right-0 h-[120px] pointer-events-none" style={{ background: "linear-gradient(to top, rgba(15,20,35,0.65), transparent)" }} />

                {/* Close */}
                <button
                    onClick={onClose}
                    className="absolute top-4 right-4 w-8 h-8 rounded-full flex items-center justify-center text-white/50 text-sm border border-white/10 backdrop-blur-xl transition-colors hover:bg-white/[0.14] hover:text-white/80"
                    style={{ background: "rgba(255,255,255,0.08)" }}
                >
                    ✕
                </button>

                {/* Nav arrows */}
                {project.images.length > 1 && (
                    <>
                        <button
                            onClick={() => setImgIndex((imgIndex - 1 + project.images.length) % project.images.length)}
                            className="absolute left-3.5 top-1/2 -translate-y-1/2 w-[34px] h-[34px] rounded-full flex items-center justify-center text-white/40 text-base border border-white/[0.08] backdrop-blur-xl transition-all hover:bg-white/[0.12] hover:text-white/70"
                            style={{ background: "rgba(255,255,255,0.06)" }}
                        >
                            ‹
                        </button>
                        <button
                            onClick={() => setImgIndex((imgIndex + 1) % project.images.length)}
                            className="absolute right-3.5 top-1/2 -translate-y-1/2 w-[34px] h-[34px] rounded-full flex items-center justify-center text-white/40 text-base border border-white/[0.08] backdrop-blur-xl transition-all hover:bg-white/[0.12] hover:text-white/70"
                            style={{ background: "rgba(255,255,255,0.06)" }}
                        >
                            ›
                        </button>
                    </>
                )}
            </div>

            {/* Content */}
            <div className="px-8 pt-1 pb-8 relative z-10">

                {/* Title + Dots */}
                <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center gap-2">
                        <h2 className="text-[22px] font-semibold tracking-tight">{project.title}</h2>
                        {project.comingSoon && (
                            <span className="text-xs bg-amber-400 text-gray-950 px-2 py-0.5 rounded-full font-semibold">Coming Soon</span>
                        )}
                        {project.active && (
                            <span className="text-xs bg-green-400 text-gray-950 px-2 py-0.5 rounded-full font-semibold">Active</span>
                        )}
                    </div>
                    {project.images.length > 1 && (
                        <div className="flex gap-1.5 items-center">
                            {project.images.map((_, i) => (
                                <button
                                    key={i}
                                    onClick={() => setImgIndex(i)}
                                    className={`h-1.5 rounded-full transition-all duration-300 ${
                                        i === imgIndex
                                            ? "w-[18px] bg-amber-400"
                                            : "w-1.5 bg-white/15 hover:bg-white/25"
                                    }`}
                                />
                            ))}
                        </div>
                    )}
                </div>

                {/* Tags */}
                <div className="flex flex-wrap gap-1.5 mb-3.5">
                    {project.tags.map((tag) => (
                        <span key={tag} className="text-[11px] font-medium px-2.5 py-1 rounded-md bg-amber-400/[0.08] text-amber-400">
                            {tag}
                        </span>
                    ))}
                </div>

                {/* Description */}
                <p className="text-white/55 text-[13px] leading-relaxed mb-6">{project.description}</p>

                {/* Actions */}
                <div className="flex gap-2">
                    <a
                        href={project.link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex-1 flex items-center justify-center gap-2 px-5 py-2.5 rounded-[10px] bg-amber-400 text-gray-950 text-[13px] font-semibold transition-all hover:brightness-110"
                        style={{ boxShadow: "0 2px 12px rgba(251,191,35,0.2)" }}
                    >
                        View on GitHub
                    </a>
                    {project.domain && (
                        <a
                            href={project.domain}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex-1 flex items-center justify-center gap-2 px-5 py-2.5 rounded-[10px] border border-white/[0.08] text-white/55 text-[13px] font-medium transition-all hover:bg-white/10 hover:text-white/70"
                            style={{ background: "rgba(255,255,255,0.06)" }}
                        >
                            View Website
                        </a>
                    )}
                </div>

            </div>
        </motion.div>
    </motion.div>
  );
}
