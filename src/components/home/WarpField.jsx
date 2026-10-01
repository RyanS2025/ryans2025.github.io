import { useEffect, useRef } from "react";
import { useReducedMotion } from "framer-motion";
import { clamp } from "../../lib/flight";

const STAR_COUNT = 520;
const spawn = (s) => { s.x = (Math.random() - 0.5) * 2; s.y = (Math.random() - 0.5) * 2; s.z = 1; return s; };

/**
 * Stars streaming toward the viewer. Speed follows how fast the page is
 * scrolling, so the autopilot (and a fast flick) turns them into streaks.
 * `idle` slows them to a drift while a modal is open.
 */
export default function WarpField({ idle = false }) {
  const canvasRef = useRef(null);
  const idleRef = useRef(idle);
  const reduce = useReducedMotion();

  useEffect(() => { idleRef.current = idle; }, [idle]);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    const stars = Array.from({ length: STAR_COUNT }, () => ({ ...spawn({}), z: Math.random() }));
    let raf = 0, visible = true, lastY = window.scrollY, vel = 0;

    const size = () => {
      const dpr = Math.min(2, window.devicePixelRatio || 1);
      canvas.width = canvas.clientWidth * dpr;
      canvas.height = canvas.clientHeight * dpr;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };

    const draw = () => {
      const w = canvas.clientWidth, h = canvas.clientHeight, cx = w / 2, cy = h / 2, f = Math.max(w, h) * 0.25;
      vel += (Math.abs(window.scrollY - lastY) - vel) * 0.15;
      lastY = window.scrollY;
      const speed = reduce ? 0 : idleRef.current ? 0.0003 : 0.0009 + Math.min(vel, 60) * 0.00045;
      ctx.clearRect(0, 0, w, h);
      for (const s of stars) {
        const pz = s.z;
        s.z -= speed;
        if (s.z <= 0.02) { spawn(s); continue; }
        ctx.strokeStyle = `rgba(255,248,230,${clamp((1 - s.z) * 1.2)})`;
        ctx.lineWidth = (1 - s.z) * 1.6 + 0.2;
        ctx.beginPath();
        // Streak from where the star was last frame to where it is now.
        ctx.moveTo(cx + (s.x / pz) * f, cy + (s.y / pz) * f);
        ctx.lineTo(cx + (s.x / s.z) * f + 0.1, cy + (s.y / s.z) * f + 0.1);
        ctx.stroke();
      }
    };

    const loop = () => { draw(); raf = requestAnimationFrame(loop); };
    const start = () => { if (!raf && visible && !document.hidden && !reduce) raf = requestAnimationFrame(loop); };
    const stop = () => { cancelAnimationFrame(raf); raf = 0; };

    // Pause whenever nobody can see it: hero scrolled away, or tab in the background.
    const io = new IntersectionObserver(([e]) => { visible = e.isIntersecting; visible ? start() : stop(); });
    const onVisibility = () => (document.hidden ? stop() : start());
    const ro = new ResizeObserver(() => { size(); if (reduce) draw(); });

    size();
    if (reduce) draw(); else start();
    io.observe(canvas);
    ro.observe(canvas);
    document.addEventListener("visibilitychange", onVisibility);
    return () => {
      stop();
      io.disconnect();
      ro.disconnect();
      document.removeEventListener("visibilitychange", onVisibility);
    };
  }, [reduce]);

  return <canvas ref={canvasRef} aria-hidden="true" className="absolute inset-0 w-full h-full pointer-events-none" />;
}
