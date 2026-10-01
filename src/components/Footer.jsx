import { Link } from "react-router-dom";
import { FaGithub, FaLinkedin } from "react-icons/fa";

export default function Footer() {
  return (
    <footer className="border-t border-line">
      <div className="max-w-6xl mx-auto px-7 pt-12 pb-16 flex flex-wrap items-end justify-between gap-6">
        <Link to="/contact" className="text-3xl font-semibold tracking-tight text-ink hover:text-amber transition-colors">
          Get in touch →
        </Link>
        <div className="flex items-center gap-5 text-sm text-mute">
          <a href="https://github.com/RyanS2025" target="_blank" rel="noopener noreferrer" aria-label="GitHub">
            <FaGithub className="text-xl hover:text-ink transition-colors" />
          </a>
          <a href="https://www.linkedin.com/in/ryan-sinha-306986387/" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn">
            <FaLinkedin className="text-xl hover:text-ink transition-colors" />
          </a>
          <span>© {new Date().getFullYear()} Ryan Sinha</span>
        </div>
      </div>
    </footer>
  );
}
