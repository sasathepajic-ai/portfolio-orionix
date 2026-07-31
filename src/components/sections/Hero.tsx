import Image from "next/image";
import { Button } from "@/components/ui/Button";
import { Kicker } from "@/components/ui/print";

/**
 * One screen: the records room runs the full width, and the words sit on it.
 *
 * The picture was made for this job rather than cropped into it — a plain
 * plastered wall holds the left two-thirds and the shelving stays out at the
 * right edge, so nothing is behind the headline but wall. What makes the type
 * legible is not that placement though, it is the treatment: `--backdrop`
 * pushes the whole image most of the way to the canvas colour, in opposite
 * directions per theme (see design-tokens.css). There is no scrim, no plate
 * and no gradient — the surface is uniform, so the words cannot land on a bad
 * patch of it.
 *
 * The copy starts on `--hero-inset`, the wide Container's inset written out
 * longhand, so the headline lines up with the nameplate above it and with
 * every section below.
 */
export function Hero() {
  return (
    <section className="press-photo press-photo--backdrop relative grid min-h-svh items-center">
      <Image
        src="/photos/hero-wall.jpg"
        alt="A records room: a bare plastered wall, with wooden shelving of tied paper bundles and archive boxes along the right"
        fill
        priority
        sizes="100vw"
        className="object-cover"
        style={{ objectPosition: "center 55%" }}
      />

      {/* Above the veil, which is z-index 2 on `.press-photo`. */}
      <div className="hero-panel relative z-3 px-(--hero-inset) pb-14 pt-28 lg:py-16">
        <div className="w-full max-w-xl">
          <Kicker className="mb-4">
            Practical AI for teams that run on spreadsheets, inboxes, and
            deadlines
          </Kicker>
          <h1 className="font-sans text-[clamp(2.25rem,4.4vw,3.9rem)] font-bold leading-[1.02] tracking-[-0.022em] text-ink">
            AI that fits the way your team already works.
          </h1>
          <p className="mt-6 font-serif text-lg leading-relaxed text-ink-soft">
            We build working tools for the problems where AI genuinely helps —
            and give you a straight answer about the ones where it doesn&apos;t.
          </p>
          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <Button href="/contact" size="lg">
              Book a 30-minute call
            </Button>
            <Button href="#sections" variant="outline" size="lg">
              See what we build
            </Button>
          </div>
          <p className="mt-6 font-sans text-[13px] text-ink-faint">
            No platform to migrate to · First working tool in weeks · Built on
            the systems you already run
          </p>
        </div>
      </div>
    </section>
  );
}
