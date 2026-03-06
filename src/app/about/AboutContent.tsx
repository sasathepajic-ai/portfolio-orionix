"use client";

import { Container } from "@/components/ui/Container";
import { FadeIn, StaggerContainer, StaggerItem } from "@/components/ui/SectionHeading";
import { CTASection } from "@/components/sections/CTASection";

const principles = [
  {
    title: "Practical Over Theoretical",
    description:
      "We don't get lost in what AI could hypothetically do. We focus on what it can do for your business today — grounded, tested, and ready to deploy.",
  },
  {
    title: "People at the Center",
    description:
      "Technology fails when it forgets the human. We design every solution around the people who will actually use it, ensuring real adoption and lasting impact.",
  },
  {
    title: "Speed to Value",
    description:
      "We believe in rapid, incremental wins. Start seeing results fast, build confidence, then scale. No multi-year roadmaps before seeing ROI.",
  },
];

export function AboutContent() {
  return (
    <>
      {/* Hero */}
      <section className="relative pt-36 md:pt-44 pb-24 md:pb-32 overflow-hidden">
        <div className="absolute inset-0 pointer-events-none" aria-hidden>
          <div
            className="absolute inset-0 opacity-[0.033]"
            style={{
              backgroundImage: "radial-gradient(var(--color-navy) 1.2px, transparent 1.2px)",
              backgroundSize: "26px 26px",
            }}
          />

        </div>
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
              <span style={{ color: "rgba(14,28,42,0.45)" }}>Making AI work for</span>
              <br />
              real businesses
            </h1>
          </FadeIn>
          <FadeIn delay={0.2}>
            <p className="text-xl text-text-secondary leading-[1.65] max-w-[55ch]">
              Pragmatic Labs AI was founded on a simple belief: artificial intelligence
              should be a partner, not a barrier. We bridge the gap between advanced AI
              capabilities and everyday business operations.
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
                  &ldquo;To empower businesses of all sizes by making sophisticated AI
                  technology practical, accessible, and genuinely easy to use.&rdquo;
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
                Principles, not just promises
              </h2>
            </div>
          </FadeIn>

          <StaggerContainer className="grid grid-cols-1 md:grid-cols-3 gap-10">
            {principles.map((principle, i) => {
              const accentColors = ["var(--color-accent)", "var(--color-teal)", "var(--color-navy)"];
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
                  Pragmatic Labs AI was born from a simple observation: most businesses know
                  they need AI, but the complexity of adoption holds them back. The gap between
                  what AI can do and what businesses actually experience is enormous.
                </p>
                <p>
                  We set out to close that gap. Not by dumbing things down, but by designing
                  smarter — translating advanced AI capabilities into tools that feel natural,
                  intuitive, and immediately useful.
                </p>
                <p>
                  Today, we work with organizations across industries — from education and
                  consulting to operations and HR — helping them unlock the value of AI without
                  the headaches. No hype. No jargon. Just AI that works.
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
