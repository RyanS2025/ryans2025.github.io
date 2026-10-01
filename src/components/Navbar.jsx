import { useEffect, useRef, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { FaGithub, FaLinkedin } from "react-icons/fa";
import { useResume } from "../hooks/useResume";

const links = [
  { to: "/about", label: "About" },
  { to: "/projects", label: "Projects" },
  { to: "/blog", label: "Blog" },
  { to: "/contact", label: "Contact" },
];

const socials = [
  { href: "https://github.com/RyanS2025", label: "GitHub", Icon: FaGithub },
  { href: "https://www.linkedin.com/in/ryan-sinha-306986387/", label: "LinkedIn", Icon: FaLinkedin },
];

export default function Navbar() {
  const { pathname } = useLocation();
  const { openResume } = useResume();
  const [open, setOpen] = useState(false);
  const [solid, setSolid] = useState(false);
  const navRef = useRef(null);

  // Frost the bar only when page content is actually underneath it. On the
  // homepage that's once #work reaches the bar (the hero is full-bleed sky);
  // never during the View work autopilot, which would flash it over the stars.
  useEffect(() => {
    let frame = 0;
    const check = () => {
      frame = 0;
      const nav = navRef.current;
      if (!nav) return;
      const work = document.getElementById("work");
      const next = document.body.dataset.autopilot !== "1" &&
        (work ? window.scrollY + nav.offsetHeight > work.offsetTop : window.scrollY > 8);
      setSolid((prev) => (prev === next ? prev : next));
    };
    const onScroll = () => { if (!frame) frame = requestAnimationFrame(check); };
    // Route content mounts after a page transition, so re-check once it has.
    const settle = setTimeout(check, 400);
    frame = requestAnimationFrame(check);
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      cancelAnimationFrame(frame);
      clearTimeout(settle);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, [pathname]);

  const linkClass = (to) => `text-sm transition-colors ${pathname === to ? "text-ink" : "text-mute hover:text-ink"}`;

  return (
    <nav
      ref={navRef}
      className={`fixed inset-x-0 top-0 z-50 border-b transition-[background-color,border-color] duration-300 ${
        solid || open ? "bg-space/70 backdrop-blur-[14px] border-line" : "border-transparent"
      }`}
    >
      <div className="h-16 px-7 flex items-center justify-between">
        <Link to="/" className="font-semibold tracking-tight text-ink" onClick={() => setOpen(false)}>
          Ryan Sinha<span className="text-amber">.</span>
        </Link>

        <div className="hidden md:flex items-center gap-7">
          {links.map((l) => (
            <Link key={l.to} to={l.to} className={linkClass(l.to)}>{l.label}</Link>
          ))}
          <button onClick={openResume} className="text-sm text-mute hover:text-ink transition-colors cursor-pointer">
            Resume
          </button>
          <div className="flex items-center gap-4 pl-2 border-l border-line">
            {socials.map(({ href, label, Icon }) => (
              <a key={label} href={href} target="_blank" rel="noopener noreferrer" aria-label={label}>
                <Icon className="text-lg text-mute hover:text-ink transition-colors" />
              </a>
            ))}
          </div>
        </div>

        <button
          className="md:hidden text-ink text-xl"
          aria-label={open ? "Close menu" : "Open menu"}
          aria-expanded={open}
          onClick={() => setOpen(!open)}
        >
          {open ? "✕" : "☰"}
        </button>
      </div>

      {open && (
        <div className="md:hidden bg-space/95 border-t border-line px-7 py-5 flex flex-col gap-4">
          {links.map((l) => (
            <Link key={l.to} to={l.to} onClick={() => setOpen(false)} className={linkClass(l.to)}>{l.label}</Link>
          ))}
          <button onClick={() => { setOpen(false); openResume(); }} className="text-sm text-mute text-left">
            Resume
          </button>
          <div className="flex gap-4 pt-3 border-t border-line">
            {socials.map(({ href, label, Icon }) => (
              <a key={label} href={href} target="_blank" rel="noopener noreferrer" aria-label={label}>
                <Icon className="text-lg text-mute hover:text-ink transition-colors" />
              </a>
            ))}
          </div>
        </div>
      )}
    </nav>
  );
}
