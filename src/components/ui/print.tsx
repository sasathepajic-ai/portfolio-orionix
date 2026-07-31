import type { ElementType, ReactNode } from "react";
import { cn } from "@/lib/utils";

/* The workshop kit. Kickers/labels are Inter bold, sentence case,
   NORMAL tracking — never letterspaced, never uppercase, never mono.
   Minimal by default: separate with tone and whitespace, not lines. */

/** Hairline divider — 1px, light. Use only where a table or list genuinely needs one. */
export function Rule({ className }: { className?: string }) {
  return <div aria-hidden="true" className={cn("border-t border-rule", className)} />;
}

/** Kicker — the accent-green label above a headline. Sentence case. */
export function Kicker({ children, className }: { children: ReactNode; className?: string }) {
  return <p className={cn("font-sans text-sm font-bold text-accent", className)}>{children}</p>;
}

/** Folio — a small bold label. Set `as="h2"` etc. when it heads content. */
export function Folio({
  children,
  className,
  as: Component = "p",
}: {
  children: ReactNode;
  className?: string;
  as?: ElementType;
}) {
  return (
    <Component className={cn("font-sans text-[13px] font-bold text-ink-soft", className)}>
      {children}
    </Component>
  );
}

const HEADLINE_SIZE = {
  xl: "text-[clamp(2.5rem,5.5vw,4.5rem)] leading-[1.03] tracking-[-0.02em]",
  lg: "text-[clamp(1.9rem,3.2vw,2.75rem)] leading-[1.1] tracking-[-0.015em]",
  md: "text-[clamp(1.4rem,2.2vw,1.75rem)] leading-[1.2]",
  sm: "text-[clamp(1.15rem,1.6vw,1.35rem)] leading-[1.25]",
} as const;

/* Big titles are the grotesk; sub-heads stay the slab.
   The split is the point of the pairing — a modern sans announcing, a
   traditional serif doing the reading — so it is drawn by size rather than
   applied everywhere. `md`/`sm` are closer to text than to display, and read
   better staying with the body face.
   Only 400 and 700 of the sans are self-hosted, so display weight is 700;
   asking for 500 would fall back to 400 or be synthesised. */
const HEADLINE_FAMILY = {
  xl: "font-sans font-bold",
  lg: "font-sans font-bold",
  md: "font-serif font-medium",
  sm: "font-serif font-medium",
} as const;

/** Headline — grotesk bold at display sizes, slab medium below. Pick the level with `as`. */
export function Headline({
  as: Component = "h2",
  size = "lg",
  children,
  className,
}: {
  as?: ElementType;
  size?: keyof typeof HEADLINE_SIZE;
  children: ReactNode;
  className?: string;
}) {
  return (
    <Component
      className={cn(
        "text-ink",
        HEADLINE_FAMILY[size],
        HEADLINE_SIZE[size],
        className
      )}
    >
      {children}
    </Component>
  );
}

/** Deck — the standfirst under a headline. */
export function Deck({ children, className }: { children: ReactNode; className?: string }) {
  return (
    <p className={cn("font-serif text-lg leading-normal text-ink-soft md:text-xl", className)}>
      {children}
    </p>
  );
}

/** NewsBox — a soft card grouped by tone, not a border. */
export function NewsBox({
  children,
  className,
  as: Component = "div",
}: {
  children: ReactNode;
  className?: string;
  as?: ElementType;
}) {
  return (
    <Component className={cn("register-marks bg-paper-shade p-6 md:p-8", className)}>
      {children}
    </Component>
  );
}

/** Caption — figure/photo caption text. */
export function Caption({ children, className }: { children: ReactNode; className?: string }) {
  return (
    <figcaption className={cn("font-sans text-[13px] leading-snug text-ink-faint", className)}>
      {children}
    </figcaption>
  );
}
