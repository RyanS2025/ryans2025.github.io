import { useCallback, useEffect, useRef } from "react";
import { easeInOutCubic } from "../lib/flight";

const CANCEL_EVENTS = ["wheel", "touchstart", "keydown"];

/**
 * Scrolls the window to `targetY` over `durationMs` with an ease-in-out, so
 * every scroll-driven animation on the way plays as if the visitor scrolled.
 * Any wheel, touch, or key input hands control back immediately and skips
 * `onArrive`. While flying, `document.body.dataset.autopilot` is "1" so the
 * nav and the hero's cards can stand down.
 */
export function useAutopilot() {
  const flight = useRef(null);

  const end = useCallback(() => {
    const f = flight.current;
    if (!f) return;
    cancelAnimationFrame(f.raf);
    CANCEL_EVENTS.forEach((ev) => window.removeEventListener(ev, f.cancel));
    delete document.body.dataset.autopilot;
    flight.current = null;
  }, []);

  const flyTo = useCallback((targetY, durationMs, onArrive) => {
    end();
    const from = window.scrollY, t0 = performance.now();
    const f = { raf: 0, cancel: () => end() };
    flight.current = f;
    document.body.dataset.autopilot = "1";
    CANCEL_EVENTS.forEach((ev) => window.addEventListener(ev, f.cancel, { passive: true }));
    const step = (now) => {
      if (flight.current !== f) return;
      const k = Math.min(1, (now - t0) / durationMs);
      window.scrollTo(0, from + (targetY - from) * easeInOutCubic(k));
      if (k < 1) { f.raf = requestAnimationFrame(step); return; }
      end();
      onArrive?.();
    };
    f.raf = requestAnimationFrame(step);
  }, [end]);

  useEffect(() => end, [end]);
  return { flyTo };
}
