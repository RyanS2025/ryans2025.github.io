import { useCallback, useMemo, useState } from "react";
import { createPortal } from "react-dom";
import { AnimatePresence } from "framer-motion";
import ResumeModal from "../components/ResumeModal";
import { ResumeContext } from "./resumeContext";

// The resume is the hand-edited PDF in public/, plus a PNG rendered from it
// for the preview and PNG download. Replace both files together.
const RESUME_PDF = "/RyanSinhaResume.pdf";
const RESUME_PNG = "/RyanSinha_Resume.png";

function download(href, filename) {
  const link = document.createElement("a");
  link.download = filename;
  link.href = href;
  link.click();
}

export default function ResumeProvider({ children }) {
  const [open, setOpen] = useState(false);
  const openResume = useCallback(() => setOpen(true), []);
  const value = useMemo(() => ({ openResume }), [openResume]);

  return (
    <ResumeContext.Provider value={value}>
      {children}
      {/* Portaled so no transformed ancestor (page transitions) can offset the fixed overlay. */}
      {createPortal(
        <AnimatePresence>
          {open && (
            <ResumeModal
              onClose={() => setOpen(false)}
              onDownload={() => download(RESUME_PNG, "RyanSinha_Resume.png")}
              onDownloadPdf={() => download(RESUME_PDF, "RyanSinhaResume.pdf")}
              imageSrc={RESUME_PNG}
              pdfSrc={RESUME_PDF}
            />
          )}
        </AnimatePresence>,
        document.body,
      )}
    </ResumeContext.Provider>
  );
}
