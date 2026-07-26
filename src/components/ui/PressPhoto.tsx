import type { ReactNode } from "react";
import { existsSync } from "node:fs";
import path from "node:path";
import Image from "next/image";
import { cn } from "@/lib/utils";
import { Caption } from "./print";
import { Container } from "./Container";

const ASPECT = {
  "4/3": "aspect-[4/3]",
  "3/2": "aspect-[3/2]",
  "16/10": "aspect-[16/10]",
  /* The band runs edge to edge up to 1600px — the width of our largest source.
     Past that it centers on the paper rather than upscaling into softness. */
  band: "h-[clamp(17rem,34vw,28rem)] mx-auto max-w-[1600px]",
  /* The solution-page band — smaller and less panoramic than the About band,
     at the owner's request: a contained figure that doesn't dominate the page.
     It carries no width of its own; it fills the page's content column (a wide
     Container), so its edges line up with the headline and caption instead of
     floating inset and centred. */
  "band-solution": "h-[clamp(14rem,24vw,22rem)]",
} as const;

/** Bands never need more pixels than their cap. */
export const BAND_SIZES = "(min-width: 1600px) 1600px, 100vw";
/* The solution band fills the wide Container's content box (max-w-7xl minus
   gutters ≈ 1216px), never wider. */
export const BAND_SOLUTION_SIZES = "(min-width: 1280px) 1216px, 100vw";

interface PressPhotoProps {
  /** Path under /public, e.g. "/photos/hero.jpg". */
  src?: string;
  /** Literal description of the photo. Required — captions never substitute for alt. */
  alt: string;
  /** Optional caption shown under the image once a real file exists. */
  caption?: ReactNode;
  aspect?: keyof typeof ASPECT;
  /** Set on the hero photo only: LCP priority + the one-time warm-in. */
  priority?: boolean;
  sizes?: string;
  className?: string;
  /** Near-black sources only: stronger paper lift. */
  dense?: boolean;
  /** Full-bleed usage: returns the caption to the page grid. */
  bleed?: boolean;
  /** CSS object-position for the cover crop, e.g. "center 25%". */
  objectPosition?: string;
  /**
   * Set the caption INSIDE the frame — centred, low, like a subtitle on a
   * screen — instead of leaving it as grey metadata underneath. Large Besley
   * italic on a paper plate.
   */
  subtitle?: boolean;
}

/**
 * The subtitle: the caption sits low and centred INSIDE the frame, the way a
 * subtitle sits on a screen. It rides a flat paper plate — square, 1px rule —
 * so the words never touch the photograph and legibility is guaranteed by
 * construction rather than by tuning. (A dark scrim is the usual trick; a
 * plate beats it here because it is paper-on-ink and so survives the theme
 * flip untouched, where a scrim would need a second version for the dark
 * canvas.) Centring is what keeps the frame balanced; the same line parked in
 * a corner reads lopsided.
 */
function Subtitle({ children }: { children: ReactNode }) {
  return (
    <figcaption className="absolute inset-x-0 bottom-4 z-10 flex justify-center px-4 md:bottom-8">
      <span className="max-w-184 border border-rule bg-paper px-5 py-3 text-center font-serif text-lg italic leading-snug text-ink md:px-8 md:py-5 md:text-2xl">
        {children}
      </span>
    </figcaption>
  );
}

/**
 * Server-only image wrapper. It checks at build time whether the file actually
 * exists in /public: if it does, it renders the optimized image with the warm
 * treatment (`.press-photo`) and caption; if it doesn't, it renders a clean,
 * intentional paper-shade panel instead of a broken image. Drop a file at the
 * given `src` and it appears automatically — no code change needed.
 */
export function PressPhoto({
  src,
  alt,
  caption,
  aspect = "4/3",
  priority = false,
  sizes = "(min-width: 1024px) 45vw, 100vw",
  className,
  dense = false,
  bleed = false,
  objectPosition,
  subtitle = false,
}: PressPhotoProps) {
  const hasFile = src ? existsSync(path.join(process.cwd(), "public", src)) : false;

  return (
    /* `relative` when the caption is a subtitle: it is positioned inside the frame. */
    <figure className={cn(subtitle && "relative", className)}>
      {hasFile ? (
        <div
          className={cn(
            "press-photo relative",
            priority && "press-photo--develop",
            dense && "press-photo--dense",
            ASPECT[aspect]
          )}
        >
          <Image
            src={src!}
            alt={alt}
            fill
            sizes={sizes}
            priority={priority}
            className="object-cover"
            style={objectPosition ? { objectPosition } : undefined}
          />
        </div>
      ) : (
        <div role="img" aria-label={alt} className={cn("bg-paper-shade", ASPECT[aspect])} />
      )}
      {/* Three ways a caption can sit.

          Subtitle: centred low INSIDE the frame, the way a subtitle sits on a
          screen. The line stops being metadata and becomes the thing the
          picture is saying.

          Bleed: it returns to the page grid — what ties a full-bleed band back
          to the column of type.

          Plain: grey metadata under the picture. */}
      {hasFile &&
        caption &&
        (subtitle ? (
          <Subtitle>{caption}</Subtitle>
        ) : bleed ? (
          <Container size="wide">
            <Caption className="mt-3">{caption}</Caption>
          </Container>
        ) : (
          <Caption className="mt-3">{caption}</Caption>
        ))}
    </figure>
  );
}
