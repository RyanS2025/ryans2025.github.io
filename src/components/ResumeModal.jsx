import { useRef, useState } from "react";
import { motion } from "framer-motion";
import confetti from "canvas-confetti";

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

function playDing() {
  const ctx = new (window.AudioContext || window.webkitAudioContext)();

  const osc = ctx.createOscillator();
  const gain = ctx.createGain();
  osc.connect(gain);
  gain.connect(ctx.destination);
  osc.type = "sine";
  osc.frequency.setValueAtTime(1568, ctx.currentTime);
  gain.gain.setValueAtTime(0.25, ctx.currentTime);
  gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 1.0);
  osc.start(ctx.currentTime);
  osc.stop(ctx.currentTime + 1.0);
}

function celebrate(el) {
  playDing();
  const rect = el.getBoundingClientRect();
  confetti({
    particleCount: 80,
    spread: 70,
    origin: {
      x: (rect.left + rect.width / 2) / window.innerWidth,
      y: (rect.top + rect.height / 2) / window.innerHeight,
    },
    colors: ["#fbbf24", "#4ade80", "#ffffff"],
    zIndex: 10000,
  });
}

export default function ResumeModal({ onClose, onDownload, onDownloadPdf, imageSrc, pdfSrc }) {
  const [pngDone, setPngDone] = useState(false);
  const [pdfDone, setPdfDone] = useState(false);
  const pngBtnRef = useRef(null);
  const pdfBtnRef = useRef(null);

  const handleDownload = async () => {
    if (pngDone) return;
    await onDownload();
    setPngDone(true);
    celebrate(pngBtnRef.current);
    setTimeout(onClose, 900);
  };

  // The modal stays open after a PDF download so the PNG is still reachable.
  const handleDownloadPdf = async () => {
    await onDownloadPdf();
    setPdfDone(true);
    celebrate(pdfBtnRef.current);
  };
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
        {/* Resume Image */}
        {/* Only the image scrolls, so the actions below stay reachable on short screens. */}
        <div className="relative bg-black/25 rounded-t-3xl overflow-hidden min-h-0 flex flex-col">
          <div className="overflow-y-auto min-h-0">
            <img
              src={imageSrc}
              alt="Ryan Sinha Resume"
              className="w-full object-contain p-6"
            />
          </div>

          <div
            className="absolute bottom-0 left-0 right-0 h-[120px] pointer-events-none"
            style={{ background: "linear-gradient(to top, rgba(15,20,35,0.65), transparent)" }}
          />

          {/* Close */}
          <button
            onClick={onClose}
            aria-label="Close resume"
            // Dark chip: this sits over the white resume image, where a translucent white button disappears.
            className="absolute top-4 right-4 w-8 h-8 rounded-full flex items-center justify-center text-white text-sm border border-white/20 bg-[rgba(15,20,35,0.85)] transition-colors hover:bg-[rgba(15,20,35,1)]"
          >
            ✕
          </button>
        </div>

        {/* Actions */}
        <div className="px-8 pt-4 pb-8 relative z-10 flex gap-2 shrink-0">
          {/* A real link to the PDF, so the opened tab has a shareable URL. */}
          <a
            href={pdfSrc}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-center gap-2 px-4 py-2.5 rounded-[10px] border border-white/[0.08] text-white/55 text-[13px] font-medium transition-all hover:bg-white/10 hover:text-white/70 cursor-pointer"
            style={{ background: "rgba(255,255,255,0.06)" }}
          >
            Enlarge
          </a>
          <button
            ref={pngBtnRef}
            onClick={handleDownload}
            className={`flex items-center justify-center gap-2 px-4 py-2.5 rounded-[10px] border border-white/[0.08] text-[13px] font-medium transition-all cursor-pointer ${pngDone ? "text-green-400" : "text-white/55 hover:bg-white/10 hover:text-white/70"}`}
            style={{ background: "rgba(255,255,255,0.06)" }}
          >
            {pngDone ? "✓ PNG" : "PNG"}
          </button>
          <button
            ref={pdfBtnRef}
            onClick={handleDownloadPdf}
            className={`flex-1 flex items-center justify-center gap-2 px-5 py-2.5 rounded-[10px] text-gray-950 text-[13px] font-semibold transition-all duration-300 cursor-pointer ${pdfDone ? "bg-green-400" : "bg-amber-400 hover:brightness-110"}`}
            style={{ boxShadow: pdfDone ? "0 2px 12px rgba(74,222,128,0.3)" : "0 2px 12px rgba(251,191,35,0.2)" }}
          >
            {pdfDone ? "✓ PDF Downloaded" : "Download PDF"}
          </button>
        </div>
      </motion.div>
    </motion.div>
  );
}
