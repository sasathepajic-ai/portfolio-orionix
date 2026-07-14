import Link from "next/link";
import { Container } from "@/components/ui/Container";
import { Folio, Headline, Kicker } from "@/components/ui/print";
import { WeekByWeek } from "@/components/sections/WeekByWeek";
import { CTASection } from "@/components/sections/CTASection";
import { SOLUTIONS } from "@/lib/constants";
import { cn } from "@/lib/utils";

/**
 * The index of the four tools: the promise, then what it actually is.
 * Server component; no animation.
 */
export function SolutionsContent() {
  return (
    <>
      <section className="pt-28 md:pt-32">
        <Container size="wide">
          <Kicker className="mb-4">What we build</Kicker>
          <h1 className="max-w-[18ch] font-serif text-[clamp(2.4rem,5vw,4rem)] font-medium leading-[1.05] text-ink">
            Four tools. Nothing you don&apos;t need.
          </h1>
          <p className="mt-5 max-w-[56ch] font-serif text-lg leading-relaxed text-ink-soft md:text-xl">
            Each one is scoped to a specific problem — not a platform, not a
            suite. We build the piece your situation actually calls for, and
            only that.
          </p>
        </Container>
      </section>

      <section className="pt-8 pb-4 md:pt-12">
        <Container size="wide">
          {SOLUTIONS.map((solution, i) => (
            <article
              key={solution.slug}
              className={cn(
                "grid grid-cols-1 gap-6 py-10 md:py-14 lg:grid-cols-[5fr_6fr] lg:gap-14",
                i > 0 && "border-t border-rule"
              )}
            >
              <div>
                <Folio>{solution.title}</Folio>
                <Headline as="h2" size="lg" className="mt-2 max-w-[20ch]">
                  {solution.outcome}
                </Headline>
              </div>

              <div>
                <p className="max-w-[54ch] font-serif text-[17px] leading-relaxed text-ink-soft">
                  {solution.description}
                </p>
                <ul className="mt-6 space-y-2">
                  {solution.features.map((feature) => (
                    <li key={feature} className="flex items-baseline gap-3">
                      <span aria-hidden="true" className="text-ink-faint">—</span>
                      <span className="font-serif text-[15px] leading-relaxed text-ink-soft">
                        {feature}
                      </span>
                    </li>
                  ))}
                </ul>
                <p className="mt-6">
                  <Link
                    href={`/solutions/${solution.slug}`}
                    className="press-link font-sans text-sm font-bold"
                  >
                    See how it works →
                  </Link>
                </p>
              </div>
            </article>
          ))}
        </Container>
      </section>

      <WeekByWeek />
      <CTASection />
    </>
  );
}
