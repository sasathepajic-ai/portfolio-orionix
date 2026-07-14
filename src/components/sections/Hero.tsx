import Image from "next/image";
import { Container } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";
import { Kicker } from "@/components/ui/print";

/**
 * The opening: a clear statement of what the company does, beside an abstract
 * particle field carrying the shared photo grade, its left edge dissolving deep
 * into the paper (.press-photo--hero) so the image reads as part of the page
 * rather than a boxed photo set beside it.
 */
export function Hero() {
  return (
    <section className="pt-32 md:pt-40">
      <Container size="wide">
        <div className="grid grid-cols-1 items-center gap-10 pb-16 md:pb-24 lg:grid-cols-[6fr_5fr] lg:gap-8">
          <div>
            <Kicker className="mb-4">
              Practical AI for teams that run on spreadsheets, inboxes, and deadlines
            </Kicker>
            <h1 className="font-serif text-[clamp(2.5rem,5.5vw,4.25rem)] font-medium leading-[1.06] text-ink">
              AI that fits the way your team already works.
            </h1>
            <p className="mt-6 max-w-[52ch] font-serif text-lg leading-relaxed text-ink-soft md:text-xl">
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

          <div className="press-photo press-photo--hero press-photo--develop relative aspect-[4/3] w-full lg:aspect-square">
            <Image
              src="/photos/particles.jpg"
              alt=""
              fill
              priority
              sizes="(min-width: 1024px) 45vw, 100vw"
              className="object-cover"
            />
          </div>
        </div>
      </Container>
    </section>
  );
}
