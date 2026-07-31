import { Container } from "@/components/ui/Container";
import { Folio, Headline, Kicker, NewsBox } from "@/components/ui/print";
import { BAND_SIZES, PressPhoto } from "@/components/ui/PressPhoto";
import { Reveal } from "@/components/ui/Reveal";
import { CTASection } from "@/components/sections/CTASection";

const STANDARDS = [
  {
    title: "Concrete over theoretical",
    description:
      "A tool that works for one real process is worth more than a roadmap for ten hypothetical ones. We earn trust by showing results early.",
  },
  {
    title: "Designed for the people in it",
    description:
      "A tool nobody uses is worse than no tool at all. We test every system against the people who will actually use it — before anything else.",
  },
  {
    title: "Ship, learn, adjust",
    description:
      "We don't wait for perfection before shipping. Honest feedback on early versions beats any big upfront plan for getting somewhere useful.",
  },
] as const;

const STORY = [
  "Pragmatic Labs AI started from a specific frustration: most AI products are built for demos, not for the people who have to use them every day. Impressive in a presentation, awkward in practice.",
  "We went in a different direction. The work begins with your team and their workflows — not with a technology looking for a problem to solve. The result is tools that fit naturally into how your business already runs.",
  "We work with organizations in education, consulting, operations, and HR. Different industries, same pattern: a specific bottleneck, a focused solution, and measurable results before anything gets scaled.",
] as const;

/**
 * About — a single editorial column. Every section shares the same left edge
 * and container, so nothing drifts; the "How we work" band is toned for rhythm.
 */
export function AboutContent() {
  return (
    <>
      {/* Hero */}
      <section className="pt-32 md:pt-40">
        <Container size="wide">
          <div className="max-w-[60ch]">
            <Kicker className="mb-4">About</Kicker>
            <h1 className="font-sans text-[clamp(2.4rem,5vw,4rem)] font-bold leading-[1.04] tracking-[-0.02em] text-ink">
              We build the tool. Then we get out of the way.
            </h1>
            <p className="mt-6 font-serif text-lg leading-relaxed text-ink-soft md:text-xl">
              Most AI is sold as transformation. We don&apos;t sell that. We
              build specific tools for specific problems — and we start by
              telling you where AI won&apos;t help.
            </p>
          </div>
        </Container>

        {/* Full-bleed band — the photo is page architecture, not an inset. */}
        <div className="mt-12 md:mt-16">
          <PressPhoto
            video={{
              mp4: "/photos/towers-loop.mp4",
              webm: "/photos/towers-loop.webm",
              poster: "/photos/towers-loop-poster.jpg",
            }}
            alt="Corporate office towers photographed from below against the sky, high cloud drifting slowly between them"
            caption="We work with organizations in education, consulting, operations, and HR — different industries, the same pattern."
            aspect="band"
            bleed
            warm
            sizes={BAND_SIZES}
            objectPosition="center 25%"
          />
        </div>
      </section>

      {/* The story — single column, left-aligned */}
      <section className="py-14 md:py-20">
        <Container size="wide">
          <div className="max-w-[65ch]">
            <Kicker className="mb-4">The story</Kicker>
            <div className="space-y-5 font-serif text-[17px] leading-relaxed text-ink-soft">
              {STORY.map((para) => (
                <p key={para}>{para}</p>
              ))}
            </div>

            <NewsBox className="mt-10">
              <Folio>Small, by design</Folio>
              <p className="mt-3 font-serif text-[16px] leading-relaxed text-ink">
                Pragmatic Labs AI is deliberately small. No account managers, no
                handoffs — the people you talk to are the people who build.
                We&apos;d rather stay the size where every client knows exactly
                who is responsible for their tool.
              </p>
            </NewsBox>
          </div>
        </Container>
      </section>

      {/* How we work — toned band */}
      <section className="grain bg-paper-shade py-14 md:py-20">
        <Container size="wide">
          <div className="mb-10 max-w-2xl md:mb-12">
            <Kicker className="mb-3">How we work</Kicker>
            <Headline as="h2">What we hold ourselves to</Headline>
          </div>

          <div className="grid max-w-3xl gap-10 md:gap-12">
            {STANDARDS.map((standard, i) => (
              <Reveal key={standard.title}>
                <article className="grid grid-cols-1 gap-2 md:grid-cols-[4rem_1fr] md:gap-8">
                  <p aria-hidden="true" className="font-serif text-2xl font-medium text-accent">
                    {String(i + 1).padStart(2, "0")}
                  </p>
                  <div className="max-w-[54ch]">
                    <Headline as="h3" size="sm">
                      {standard.title}
                    </Headline>
                    <p className="mt-2 font-serif text-[16px] leading-relaxed text-ink-soft">
                      {standard.description}
                    </p>
                  </div>
                </article>
              </Reveal>
            ))}
          </div>
        </Container>
      </section>

      <CTASection />
    </>
  );
}
