import { useContext } from "react";
import { ResumeContext } from "../context/resumeContext";

/** `openResume()` shows the resume modal from anywhere: nav, homepage hero, About. */
export const useResume = () => useContext(ResumeContext);
