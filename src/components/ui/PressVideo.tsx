"use client";

import {
  useCallback,
  useEffect,
  useRef,
  useState,
  useSyncExternalStore,
} from "react";

export interface PressVideoSources {
  /** H.264 MP4 — the universal source. Required. */
  mp4: string;
  /** VP9 WebM, offered first where supported: roughly half the weight. */
  webm?: string;
  /** First frame of the loop, so nothing shifts when playback starts. */
  poster: string;
}

const REDUCED_QUERY = "(prefers-reduced-motion: reduce)";

function subscribeToReducedMotion(onChange: () => void) {
  const mq = window.matchMedia(REDUCED_QUERY);
  mq.addEventListener("change", onChange);
  return () => mq.removeEventListener("change", onChange);
}

/**
 * Read the motion preference without ever setting state from an effect, and
 * without assuming `window` exists during the server render.
 */
function useReducedMotion() {
  return useSyncExternalStore(
    subscribeToReducedMotion,
    () => window.matchMedia(REDUCED_QUERY).matches,
    () => false,
  );
}

/**
 * A silent, looping band inside a `.press-photo` frame.
 *
 * Three things this has to get right, none of which a bare
 * `<video autoplay loop>` does:
 *
 * 1. `prefers-reduced-motion` cannot be honoured in CSS, because autoplay is a
 *    markup attribute. The decision is made here, and re-made if the reader
 *    changes the setting while the page is open.
 * 2. An indefinitely looping film needs a way to stop it (WCAG 2.2.2). The
 *    control is a word, matching the site's other toggles, and it rides a paper
 *    plate so it never sits directly on the picture.
 * 3. Playing a film nobody is looking at wastes battery, so it runs only while
 *    it is on screen.
 *
 * `playing` is driven by the element's own play/pause events rather than pushed
 * from effects, so the label can never disagree with what the video is doing —
 * including when a browser refuses autoplay outright.
 */
export function PressVideo({
  sources,
  alt,
  objectPosition,
}: {
  sources: PressVideoSources;
  alt: string;
  objectPosition?: string;
}) {
  const ref = useRef<HTMLVideoElement>(null);
  const [playing, setPlaying] = useState(false);
  const reduced = useReducedMotion();

  /* Once the reader touches the control, their choice outranks the observer —
     otherwise scrolling away and back would silently undo it. */
  const overridden = useRef(false);

  useEffect(() => {
    const v = ref.current;
    if (!v) return;

    if (reduced) {
      v.pause();
      return;
    }

    const io = new IntersectionObserver(
      ([entry]) => {
        if (overridden.current) return;
        if (entry.isIntersecting) void v.play().catch(() => {});
        else v.pause();
      },
      { threshold: 0.15 },
    );
    io.observe(v);
    return () => io.disconnect();
  }, [reduced]);

  const toggle = useCallback(() => {
    const v = ref.current;
    if (!v) return;
    overridden.current = true;
    if (v.paused) void v.play().catch(() => {});
    else v.pause();
  }, []);

  return (
    <>
      <video
        ref={ref}
        aria-label={alt}
        poster={sources.poster}
        muted
        loop
        playsInline
        preload="metadata"
        tabIndex={-1}
        onPlay={() => setPlaying(true)}
        onPause={() => setPlaying(false)}
        className="absolute inset-0 h-full w-full object-cover"
        style={objectPosition ? { objectPosition } : undefined}
      >
        {sources.webm && <source src={sources.webm} type="video/webm" />}
        <source src={sources.mp4} type="video/mp4" />
      </video>

      <button
        type="button"
        onClick={toggle}
        aria-label={
          playing ? "Pause the looping film" : "Play the looping film"
        }
        className="absolute bottom-3 right-3 z-10 border border-rule bg-paper px-3 py-1.5 font-sans text-[12px] font-bold text-ink-soft transition-colors hover:text-accent focus-visible:text-accent md:bottom-4 md:right-4"
      >
        {playing ? "Pause" : "Play"}
      </button>
    </>
  );
}
