import { Container } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";
import { Folio, Headline, Kicker } from "@/components/ui/print";

const NEXT_STEPS = [
  "A 30-minute call — no slides, no sales process.",
  "A plain assessment of where AI will and won't help.",
  "If it's a fit, we scope a costed pilot. If not, we say so.",
] as const;

/**
 * Closing call to action — a full-bleed paper-shade band. The tone shift sets
 * it apart from the page; no top border needed.
 */
export function CTASection() {
  return (
    <section className="bg-paper-shade py-16 md:py-24">
      <Container size="wide">
        <div className="grid grid-cols-1 items-start gap-10 lg:grid-cols-[7fr_5fr] lg:gap-16">
          <div>
            <Kicker className="mb-3">Get started</Kicker>
            <Headline as="h2">Have a process worth fixing?</Headline>
            <p className="mt-4 max-w-[52ch] font-serif text-lg leading-relaxed text-ink-soft">
              Tell us what&apos;s slowing your team down. In a 30-minute call,
              we&apos;ll give you a straight read on whether AI is the right fix.
            </p>
            <div className="mt-7 flex flex-col gap-3 sm:flex-row">
              <Button href="/contact" size="lg">
                Book a 30-minute call
              </Button>
              <Button href="/solutions" variant="outline" size="lg">
                See what we build
              </Button>
            </div>
          </div>

          <div>
            <Folio>What happens next</Folio>
            <ol className="mt-4 space-y-4">
              {NEXT_STEPS.map((step, i) => (
                <li key={step} className="flex gap-3">
                  <span aria-hidden="true" className="font-sans text-[13px] font-bold leading-6 text-accent">
                    {i + 1}.
                  </span>
                  <p className="font-serif text-[15px] leading-relaxed text-ink">{step}</p>
                </li>
              ))}
            </ol>
            <p className="mt-5 font-sans text-[13px] text-ink-faint">
              No commitment. We respond within one business day.
            </p>
          </div>
        </div>
      </Container>
    </section>
  );
}
