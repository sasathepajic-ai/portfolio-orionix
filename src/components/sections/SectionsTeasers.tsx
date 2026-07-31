import Link from "next/link";
import { Container } from "@/components/ui/Container";
import { Folio, Headline, Kicker } from "@/components/ui/print";
import { Reveal } from "@/components/ui/Reveal";
import { TOOL_ICONS } from "@/components/ui/icons";
import { TOOL_SCHEMATICS } from "@/components/ui/schematics";
import { SOLUTIONS } from "@/lib/constants";
import { cn } from "@/lib/utils";

/**
 * The four tools as full-width rows: the promise on the left, what it actually
 * is on the right. Type only, with a hairline between rows — a list that
 * genuinely needs its divisions, not a border for decoration.
 */
export function SectionsTeasers() {
  return (
    <section id="sections" className="grain bg-paper-shade py-16 md:py-24">
      <Container size="wide">
        <Reveal>
          <div className="mb-12 max-w-2xl md:mb-16">
            <Kicker className="mb-3">What we build</Kicker>
            <Headline as="h2">
              Four tools. Nothing you don&apos;t need.
            </Headline>
          </div>
        </Reveal>

        <div className="flex flex-col">
          {SOLUTIONS.map((s, i) => {
            const Icon = TOOL_ICONS[s.slug];
            const Schematic = TOOL_SCHEMATICS[s.slug];
            /* Every other row hands the drawing to the other side, so reading
               down the four is a zig-zag rather than four identical stripes.
               The text keeps the same measure either way — it is the columns
               that swap, not just the order, so the type never reflows into a
               different width. Below md the stack is always drawing-then-text;
               alternating a single column would only look like a mistake. */
            const flipped = i % 2 === 1;
            return (
              <Reveal key={s.slug}>
                <article
                  className={cn(
                    "grid grid-cols-1 items-center gap-8 py-12 md:gap-10 md:py-16",
                    flipped
                      ? "md:grid-cols-[1fr_24rem] lg:grid-cols-[1fr_32rem]"
                      : "md:grid-cols-[24rem_1fr] lg:grid-cols-[32rem_1fr]",
                    i > 0 && "border-t border-rule",
                  )}
                >
                  {/* The promise and what it is, as one hierarchical block. */}
                  <div className={cn(flipped && "md:order-2")}>
                    <div className="flex items-center gap-2.5 text-accent">
                      {Icon && <Icon className="h-4.5 w-4.5 shrink-0" />}
                      <Folio className="text-accent">{s.title}</Folio>
                    </div>
                    <Headline as="h3" size="md" className="mt-3 max-w-[18ch]">
                      {s.outcome}
                    </Headline>
                    <p className="mt-5 max-w-[54ch] font-serif text-[16px] leading-relaxed text-ink-soft">
                      {s.description}
                    </p>
                    <ul className="mt-5 grid gap-2">
                      {s.features.slice(0, 3).map((f) => (
                        <li
                          key={f}
                          className="flex items-baseline gap-2.5 font-serif text-[15px] leading-relaxed text-ink-soft"
                        >
                          <span aria-hidden="true" className="text-accent">
                            —
                          </span>
                          {f}
                        </li>
                      ))}
                    </ul>
                    <p className="mt-6">
                      <Link
                        href={`/solutions/${s.slug}`}
                        className="press-link font-sans text-sm font-bold"
                      >
                        See how it works →
                      </Link>
                    </p>
                  </div>

                  {/* The drawing, centred in the space beside the text and set
                      larger, so each row reads as a balanced pair and the
                      figures line up down the column. */}
                  {Schematic && (
                    <div
                      className={cn(
                        "order-first flex justify-center",
                        flipped ? "md:order-1" : "md:order-0",
                      )}
                    >
                      {/* Fills its column from md up — the drawing is the
                          row's other half, so a fixed cap just left slack
                          around it. Capped only in the stacked layout, where
                          "full width" would be the whole page.

                          `align` hands the drawing's own internal margin to
                          the inside of the row, so its ink lands on the same
                          page edge the type does — left on the flipped rows,
                          right on the others. */}
                      <Schematic
                        align={flipped ? "left" : "right"}
                        className="h-auto w-full max-w-sm text-ink md:max-w-none"
                      />
                    </div>
                  )}
                </article>
              </Reveal>
            );
          })}
        </div>
      </Container>
    </section>
  );
}
