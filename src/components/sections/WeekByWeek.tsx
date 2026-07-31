import { Container } from "@/components/ui/Container";
import { Headline, Kicker } from "@/components/ui/print";
import { Reveal } from "@/components/ui/Reveal";
import { ENGAGEMENT_WEEKS } from "@/lib/engagement";

/**
 * The schedule — the engagement as an actual calendar, on a paper-shade band
 * so it reads as a distinct step in the page rhythm. Columns separated by
 * whitespace and the accent period labels, not dividers.
 */
export function WeekByWeek() {
  return (
    <section className="grain bg-paper-shade py-16 md:py-24">
      <Container size="wide">
        <Reveal>
          <div className="mb-10 max-w-2xl md:mb-12">
            <Kicker className="mb-3">The schedule</Kicker>
            <Headline as="h2">Weeks, not months — the actual calendar</Headline>
          </div>
        </Reveal>

        <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4 lg:gap-10">
          {ENGAGEMENT_WEEKS.map((w, i) => (
            <Reveal key={w.period} delay={i * 80}>
              <p className="font-sans text-[13px] font-bold text-accent">{w.period}</p>
              <h3 className="mt-1.5 font-serif text-xl font-medium text-ink">{w.title}</h3>
              <p className="mt-2 font-serif text-[15px] leading-relaxed text-ink-soft">
                {w.description}
              </p>
            </Reveal>
          ))}
        </div>
      </Container>
    </section>
  );
}
