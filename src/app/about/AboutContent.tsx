"use client";

import { Container } from "@/components/ui/Container";
import { FadeIn, StaggerContainer, StaggerItem } from "@/components/ui/SectionHeading";
import { CTASection } from "@/components/sections/CTASection";

const principles = [
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
];

export function AboutContent() {
  return (
    <>
      {/* Hero */}
      <section className="relative pt-36 md:pt-44 pb-24 md:pb-32 overflow-hidden">

        <Container className="relative">
          <FadeIn>
            <span className="inline-block text-xs font-bold uppercase tracking-widest text-accent mb-6">
              About Us
            </span>
          </FadeIn>
          <FadeIn delay={0.1}>
            <h1
              className="font-bold text-text-primary mb-7"
              style={{ fontSize: "clamp(2.6rem, 5vw, 4rem)", lineHeight: 1.07, letterSpacing: "-0.035em" }}
            >
              <span style={{ color: "var(--color-text-faded)" }}>Making AI work for</span>
              <br />
              real businesses
            </h1>
          </FadeIn>
          <FadeIn delay={0.2}>
            <p className="text-md md:text-lg text-text-secondary leading-[1.65] max-w-[55ch]">
              Most AI projects are sold as transformation. We build tools. Specific ones,
              for specific problems, with the expectation that they&apos;ll actually get used.
            </p>
          </FadeIn>
        </Container>
      </section>

      {/* Mission blockquote */}
      <section className="py-20 md:py-28 border-y border-border-light" style={{ background: "var(--color-bg-alt)" }}>
        <Container>
          <FadeIn>
            <div className="flex gap-8 items-start max-w-3xl">
              <div
                className="hidden sm:block shrink-0 w-1 self-stretch rounded-full"
                style={{ background: "var(--color-accent)" }}
              />
              <blockquote>
                <p
                  className="font-semibold text-text-primary leading-snug mb-6"
                  style={{ fontSize: "clamp(1.4rem, 2.5vw, 2rem)" }}
                >
                  &ldquo;Our goal is simple: make AI that teams actually adopt. Not because
                  we force it on them, but because it genuinely makes their work easier.&rdquo;
                </p>
                <footer className="text-xs font-bold uppercase tracking-widest text-text-muted">
                  — Our Mission
                </footer>
              </blockquote>
            </div>
          </FadeIn>
        </Container>
      </section>

      {/* Principles */}
      <section className="py-24 md:py-32">
        <Container>
          <FadeIn>
            <div className="max-w-2xl mb-16 md:mb-20">
              <span className="inline-block text-xs font-bold uppercase tracking-widest text-accent mb-4">
                What Guides Us
              </span>
              <h2
                className="font-bold text-text-primary tracking-tight"
                style={{ fontSize: "clamp(1.9rem, 3.5vw, 2.75rem)", lineHeight: 1.15 }}
              >
                What we hold ourselves to
              </h2>
            </div>
          </FadeIn>

          <StaggerContainer className="grid grid-cols-1 md:grid-cols-3 gap-10">
            {principles.map((principle, i) => {
              const accentColors = ["var(--color-accent)", "var(--color-teal)", "var(--color-ui-border-strong)"];
              return (
                <StaggerItem key={principle.title}>
                  <div className="py-8 md:py-0 pl-5 border-l-[3px]" style={{ borderColor: accentColors[i] }}>
                    <h3 className="text-[1.1rem] font-bold text-text-primary mb-3">{principle.title}</h3>
                    <p className="text-text-secondary leading-relaxed text-sm">{principle.description}</p>
                  </div>
                </StaggerItem>
              );
            })}
          </StaggerContainer>
        </Container>
      </section>

      {/* Story */}
      <section className="py-20 md:py-28 border-y border-border-light" style={{ background: "var(--color-bg-alt)" }}>
        <Container>
          <div className="max-w-3xl">
            <FadeIn>
              <span className="inline-block text-xs font-bold uppercase tracking-widest text-accent mb-4">
                Our Story
              </span>
              <h2
                className="font-bold text-text-primary tracking-tight mb-10"
                style={{ fontSize: "clamp(1.9rem, 3.5vw, 2.75rem)", lineHeight: 1.12, letterSpacing: "-0.025em" }}
              >
                Built from <span className="whitespace-nowrap">real-world</span> experience
              </h2>
            </FadeIn>
            <FadeIn delay={0.15}>
              <div className="space-y-6 text-text-secondary text-base md:text-lg leading-[1.78]">
                <p>
                  Pragmatic Labs AI started from a specific frustration: most AI products
                  are built for demos, not for the people who have to use them every day.
                  Impressive in a presentation, awkward in practice.
                </p>
                <p>
                  We went in a different direction. The work begins with your team and their
                  workflows — not with a technology looking for a problem to solve. The result
                  is tools that fit naturally into how your business already runs.
                </p>
                <p>
                  We work with organizations in education, consulting, operations, and HR.
                  Different industries, same pattern: a specific bottleneck, a focused
                  solution, and measurable results before anything gets scaled.
                </p>
              </div>
            </FadeIn>
          </div>
        </Container>
      </section>

      <CTASection />
    </>
  );
}
