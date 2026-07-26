import Link from "next/link";
import { Container } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";
import { Folio } from "@/components/ui/print";
import { BAND_SOLUTION_SIZES, PressPhoto } from "@/components/ui/PressPhoto";
import { WeekByWeek } from "@/components/sections/WeekByWeek";
import { CTASection } from "@/components/sections/CTASection";
import { SOLUTIONS, SOLUTION_PHOTOS } from "@/lib/constants";
import { SOLUTION_DETAILS } from "@/lib/solutionDetails";

type SolutionProps = {
  title: string;
  slug: string;
  description: string;
  features: readonly string[];
};

interface Props {
  solution: SolutionProps;
}

const NAV = [
  { id: "what-it-is", label: "What it is" },
  { id: "how-it-works", label: "How it works" },
  { id: "where-it-fits", label: "Where it fits" },
  { id: "what-changes", label: "What changes" },
] as const;

/**
 * A tool page: headline lead, then the long-form body with an
 * "In this section" sticky contents column. Server component; no animation.
 */
export function SolutionDetail({ solution }: Props) {
  const otherSolutions = SOLUTIONS.filter((s) => s.slug !== solution.slug);
  const detail = SOLUTION_DETAILS[solution.slug];
  const photo = SOLUTION_PHOTOS[solution.slug];

  return (
    <>
      <section className="pt-28 md:pt-32">
        <Container size="wide">
          <p className="mb-6">
            <Link href="/solutions" className="press-link font-sans text-sm font-bold">
              ← All solutions
            </Link>
          </p>
          <div className="max-w-[60ch]">
            <h1 className="font-serif text-[clamp(2.4rem,5vw,4rem)] font-medium leading-[1.05] text-ink">
              {solution.title}
            </h1>
            <p className="mt-5 font-serif text-lg leading-relaxed text-ink-soft md:text-xl">
              {solution.description}
            </p>
            <div className="mt-7">
              <Button href="/contact" size="lg">
                Book a 30-minute call
              </Button>
            </div>
          </div>
        </Container>
      </section>

      {/* The customer's world — a contained documentary band that sits in the
          same content column as the headline above and the body below, so every
          edge lines up. Its caption falls directly beneath it in that column.
          The tool's own argument is no longer set over the picture; it lands as
          a pull-line after the body instead. */}
      {photo && (
        <section className="pt-12 md:pt-16">
          <Container size="wide">
            <PressPhoto
              src={photo.src}
              alt={photo.alt}
              caption={photo.caption}
              aspect="band-solution"
              sizes={BAND_SOLUTION_SIZES}
              objectPosition={photo.objectPosition}
            />
          </Container>
        </section>
      )}

      {detail && (
        <section className="py-10 md:py-14">
          <Container size="wide">
            <div className="grid grid-cols-1 gap-10 lg:grid-cols-[200px_1fr] lg:gap-16">
              <nav aria-label="In this section" className="lg:sticky lg:top-24 lg:self-start">
                <Folio className="mb-3">In this section</Folio>
                <ul className="flex flex-col gap-2 border-l border-rule pl-4">
                  {NAV.map((item) => (
                    <li key={item.id}>
                      <a
                        href={`#${item.id}`}
                        className="font-sans text-sm text-ink-soft transition-colors hover:text-accent"
                      >
                        {item.label}
                      </a>
                    </li>
                  ))}
                </ul>
              </nav>

              <div className="max-w-[68ch]">
                <section id="what-it-is" className="scroll-mt-24">
                  <Folio as="h2" className="mb-4">1. What it is</Folio>
                  <div className="space-y-4 font-serif text-[17px] leading-relaxed text-ink-soft">
                    {detail.overview.map((para, i) => (
                      <p key={i}>{para}</p>
                    ))}
                  </div>
                </section>

                <section id="how-it-works" className="mt-14 scroll-mt-24">
                  <Folio as="h2" className="mb-4">2. How it works</Folio>
                  <div className="space-y-4 font-serif text-[17px] leading-relaxed text-ink-soft">
                    {detail.howItWorks.map((para, i) => (
                      <p key={i}>{para}</p>
                    ))}
                  </div>
                </section>

                <section id="where-it-fits" className="mt-14 scroll-mt-24">
                  <Folio as="h2" className="mb-4">3. Where it fits</Folio>
                  <ul className="space-y-3">
                    {detail.useCases.map((item) => (
                      <li key={item} className="flex items-baseline gap-3">
                        <span aria-hidden="true" className="text-ink-faint">—</span>
                        <span className="font-serif text-[16px] leading-relaxed text-ink-soft">
                          {item}
                        </span>
                      </li>
                    ))}
                  </ul>
                </section>

                <section id="what-changes" className="mt-14 scroll-mt-24">
                  <Folio as="h2" className="mb-4">4. What changes</Folio>
                  <ul className="space-y-3">
                    {detail.benefits.map((item) => (
                      <li key={item} className="flex items-baseline gap-3">
                        <span aria-hidden="true" className="font-bold text-accent">—</span>
                        <span className="font-serif text-[16px] leading-relaxed text-ink-soft">
                          {item}
                        </span>
                      </li>
                    ))}
                  </ul>
                </section>

                {/* The tool's argument in one line — our own voice, not a
                    client quote. A quiet italic coda closing the body, set
                    apart by whitespace and weight, not a band. */}
                {detail.pullQuote && (
                  <p className="mt-12 max-w-[46ch] font-serif text-xl italic leading-snug text-ink">
                    {detail.pullQuote}
                  </p>
                )}
              </div>
            </div>
          </Container>
        </section>
      )}

      <section className="py-10 md:py-12">
        <Container size="wide">
          <Folio className="mb-3">More tools</Folio>
          <p className="flex flex-col gap-2 sm:flex-row sm:flex-wrap sm:gap-x-8">
            {otherSolutions.map((sol) => (
              <Link
                key={sol.slug}
                href={`/solutions/${sol.slug}`}
                className="press-link font-sans text-sm font-bold"
              >
                {sol.title} →
              </Link>
            ))}
          </p>
        </Container>
      </section>

      <WeekByWeek />
      <CTASection />
    </>
  );
}
