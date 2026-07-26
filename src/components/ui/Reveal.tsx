"use client";

import { useEffect, useRef, type ReactNode } from "react";
import { cn } from "@/lib/utils";

interface RevealProps {
  children: ReactNode;
  className?: string;
  /** Stagger delay in ms for the entrance. */
  delay?: number;
}

/**
 * Wraps children in a one-time fade + rise as they scroll into view. A single
 * IntersectionObserver toggles the `.is-visible` class imperatively (no React
 * state, no animation library).
 *
 * Robustness: the CSS hidden baseline is gated on `html.js` (added here on
 * mount) AND on prefers-reduced-motion: no-preference. So no-JS, reduced-motion
 * and print renders show every section fully — nothing is ever stranded at
 * opacity 0 (the bug this guards against was whole sections rendering blank in
 * a full-page capture). Elements already on screen at mount reveal in the same
 * tick the `.js` class lands, so the fold never flashes; and a timeout backstops
 * any render where the observer never fires (off-screen full-page screenshots,
 * background tabs).
 */
export function Reveal({ children, className, delay = 0 }: RevealProps) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Enable the CSS hidden→reveal transition only now that JS is running.
    // Before this class exists, `.reveal` renders fully visible.
    document.documentElement.classList.add("js");

    const el = ref.current;
    if (!el) return;

    const reveal = () => el.classList.add("is-visible");

    // Already on screen at mount (or no observer support)? Reveal immediately,
    // in the same tick `.js` is added, so above-the-fold content never flashes
    // from visible to hidden and back.
    const rect = el.getBoundingClientRect();
    const inView = rect.top < window.innerHeight && rect.bottom > 0;
    if (inView || typeof IntersectionObserver === "undefined") {
      reveal();
      return;
    }

    const io = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            reveal();
            io.disconnect();
            break;
          }
        }
      },
      { threshold: 0.15, rootMargin: "0px 0px -8% 0px" },
    );
    io.observe(el);

    // Backstop: never leave content hidden if the observer is never triggered
    // (e.g. a full-page render that paints without scrolling).
    const fallback = window.setTimeout(reveal, 1600);

    return () => {
      io.disconnect();
      window.clearTimeout(fallback);
    };
  }, []);

  return (
    <div
      ref={ref}
      className={cn("reveal", className)}
      style={delay ? { transitionDelay: `${delay}ms` } : undefined}
    >
      {children}
    </div>
  );
}
