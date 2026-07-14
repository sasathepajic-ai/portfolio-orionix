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
  band: "h-[clamp(15rem,32vw,26rem)] mx-auto max-w-[1600px]",
} as const;

/** Bands never need more pixels than their cap. */
export const BAND_SIZES = "(min-width: 1600px) 1600px, 100vw";

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
}: PressPhotoProps) {
  const hasFile = src ? existsSync(path.join(process.cwd(), "public", src)) : false;

  return (
    <figure className={className}>
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
      {/* On a full-bleed band the caption returns to the page grid — it is what
          ties the band back to the column of type. */}
      {hasFile &&
        caption &&
        (bleed ? (
          <Container size="wide">
            <Caption className="mt-3">{caption}</Caption>
          </Container>
        ) : (
          <Caption className="mt-3">{caption}</Caption>
        ))}
    </figure>
  );
}
