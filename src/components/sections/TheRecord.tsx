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
 * How we work — a centered comparison. Header and table both centered as one
 * column; hairline rules only, so it reads clean rather than boxed.
 */
export function TheRecord() {
  return (
    <section className="py-16 md:py-24">
      <Container size="default">
        <Reveal>
          <div className="mx-auto mb-10 max-w-2xl text-center md:mb-12">
            <Kicker className="mb-3">How we work</Kicker>
            <Headline as="h2">Built to hold up in daily use</Headline>
            <Deck className="mx-auto mt-4 max-w-[52ch]">
              Most AI projects impress in the sales meeting and stall once a
              team is relying on them. We aim for the opposite.
            </Deck>
          </div>
        </Reveal>

        <Reveal>
          <div className="mx-auto grid max-w-3xl grid-cols-2 border-t border-rule">
            <p className="py-3 pr-6 font-sans text-[13px] font-bold text-ink-faint">
              Common approach
            </p>
            <p className="py-3 pl-6 font-sans text-[13px] font-bold text-ink">
              How we work
            </p>
            {RECORD.map((row) => (
              <Fragment key={row.sold}>
                <p className="border-t border-rule py-4 pr-6 font-serif text-[15px] leading-relaxed text-ink-faint">
                  {row.sold}
                </p>
                <p className="border-t border-rule py-4 pl-6 font-serif text-[15px] leading-relaxed text-ink">
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
