import { Container } from "@/components/ui/Container";
import { Deck, Headline, Kicker } from "@/components/ui/print";
import { Reveal } from "@/components/ui/Reveal";
import { Fragment } from "react";

const RECORD = [
  {
    sold: "Months of planning before anything ships",
    ships: "A working tool within weeks of kickoff",
  },
  {
    sold: "Software that needs weeks of training to use",
    ships: "Interfaces your team picks up on day one",
  },
  {
    sold: "Large commitments before you see results",
    ships: "One scoped pilot with clear, measurable output",
  },
  {
    sold: "Vendor ecosystems that keep expanding",
    ships: "Your stack, your accounts — no platform dependence",
  },
  {
    sold: "Delivery dates that keep moving out",
    ships: "A schedule measured in weeks",
  },
] as const;

/**
 * How we work — a centered comparison, and the page's one emphasis band: the
 * single focal moment in the paper rhythm. Hairline rules only (dimmed type,
 * still 1px), so it stays a table rather than a boxed panel.
 *
 * It is built on the `band` / `band-ink` role pair rather than on ink/paper,
 * because the two themes want opposite things here. In light it is what it
 * always was — solid ink carrying cream type, an inversion. In dark, inverting
 * would put a bright cream slab in the middle of a night page, so the band
 * instead becomes a raised warm surface and the type stays cream. Both keep
 * the same job (this section steps forward) and both clear WCAG AA: full type
 * is ~14.8:1 on ink / ~12.5:1 on the raised surface, and the dimmed "common
 * approach" column ~6:1 / ~5.5:1.
 */
export function TheRecord() {
  return (
    <section className="bg-band py-20 text-band-ink md:py-28">
      <Container size="default">
        <Reveal>
          <div className="mx-auto mb-10 max-w-2xl text-center md:mb-12">
            <Kicker className="mb-3 text-band-ink/70">How we work</Kicker>
            <Headline as="h2" className="text-band-ink">
              Built to hold up in daily use
            </Headline>
            <Deck className="mx-auto mt-4 max-w-[52ch] text-band-ink/80">
              Most AI projects impress in the sales meeting and stall once a
              team is relying on them. We aim for the opposite.
            </Deck>
          </div>
        </Reveal>

        <Reveal>
          <div className="mx-auto grid max-w-3xl grid-cols-2 border-t border-band-ink/20">
            <p className="py-3 pr-6 font-sans text-[13px] font-bold text-band-ink/60">
              Common approach
            </p>
            <p className="py-3 pl-6 font-sans text-[13px] font-bold text-band-ink">
              How we work
            </p>
            {RECORD.map((row) => (
              <Fragment key={row.sold}>
                <p className="border-t border-band-ink/20 py-4 pr-6 font-serif text-[15px] leading-relaxed text-band-ink/60">
                  {row.sold}
                </p>
                <p className="border-t border-band-ink/20 py-4 pl-6 font-serif text-[15px] leading-relaxed text-band-ink">
                  {row.ships}
                </p>
              </Fragment>
            ))}
          </div>
        </Reveal>
      </Container>
    </section>
  );
}
