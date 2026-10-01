import { createContext } from "react";

// Lives in its own module so ResumeProvider.jsx exports only a component
// (react-refresh's only-export-components rule).
export const ResumeContext = createContext({ openResume: () => {} });
