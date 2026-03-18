import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { FaGithub, FaLinkedin } from "react-icons/fa";

const links = [
  { to: "/", label: "Home" },
  { to: "/about", label: "About" },
  { to: "/projects", label: "Projects" },
  { to: "/blog", label: "Blog" },
  { to: "/contact", label: "Contact" },
];

export default function Navbar() {
  const { pathname } = useLocation();
  const [open, setOpen] = useState(false);

  return (
    <nav className="sticky top-4 z-50 max-w-4xl w-full mx-auto px-4">
      <div className="backdrop-blur-md bg-gray-950/60 border border-white/10 rounded-full px-8 h-14 flex items-center w-full">
        {/* Left — Logo */}
        <Link to="/" className="text-lg font-bold tracking-tight text-amber-400">
          Ryan Sinha
        </Link>

        {/* Center — Links */}
        <div className="hidden md:flex gap-6 flex-1 justify-center">
          {links.map((l) => (
            <Link
              key={l.to}
              to={l.to}
              className={`text-sm transition-colors ${pathname === l.to ? "text-amber-400" : "text-gray-400 hover:text-white"}`}
            >
              {l.label}
            </Link>
          ))}
        </div>

        {/* Right — Socials */}
        <div className="hidden md:flex gap-4">
          <a href="https://github.com/RyanS2025" target="_blank" rel="noopener noreferrer">
            <FaGithub className="text-lg text-gray-400 hover:text-white transition-colors" />
          </a>
          <a href="https://linkedin.com/in/yourlinkedin" target="_blank" rel="noopener noreferrer">
            <FaLinkedin className="text-lg text-gray-400 hover:text-white transition-colors" />
          </a>
        </div>

        {/* Mobile hamburger */}
        <button className="md:hidden ml-auto" onClick={() => setOpen(!open)}>
          ☰
        </button>
      </div>

      {/* Menu for Mobile */}
      {open && (
        <div className="md:hidden mt-2 backdrop-blur-md bg-gray-950/60 border border-white/10 rounded-2xl px-6 py-4 flex flex-col gap-3">
          {links.map((l) => (
            <Link key={l.to} to={l.to} onClick={() => setOpen(false)}
              className="text-sm text-gray-300"
            >
              {l.label}
            </Link>
          ))}
          <div className="flex gap-4 pt-2 border-t border-white/10">
            <a href="https://github.com/RyanS2025" target="_blank" rel="noopener noreferrer">
              <FaGithub className="text-lg text-gray-400 hover:text-white transition-colors" />
            </a>
            <a href="https://www.linkedin.com/in/ryan-sinha-306986387/" target="_blank" rel="noopener noreferrer">
              <FaLinkedin className="text-lg text-gray-400 hover:text-white transition-colors" />
            </a>
          </div>
        </div>
      )}
    </nav>
  );
}