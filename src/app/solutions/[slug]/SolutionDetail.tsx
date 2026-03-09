"use client";

import Link from "next/link";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { FadeIn } from "@/components/ui/SectionHeading";
import { CTASection } from "@/components/sections/CTASection";
import { Button } from "@/components/ui/Button";
import { SOLUTIONS } from "@/lib/constants";
import { SOLUTION_DETAILS } from "@/lib/solutionDetails";
import { motion } from "framer-motion";

const MotionLink = motion(Link);
const springNav = { type: "spring" as const, stiffness: 440, damping: 30 };

type SolutionProps = {
  title: string;
  slug: string;
  description: string;
  features: readonly string[];
};

interface Props {
  solution: SolutionProps;
}

export function SolutionDetail({ solution }: Props) {
  const otherSolutions = SOLUTIONS.filter((s) => s.slug !== solution.slug);
  const detail = SOLUTION_DETAILS[solution.slug];

  return (
    <>
      {/* Hero */}
      <section className="relative pt-32 pb-20 md:pt-40 md:pb-24 overflow-hidden">
        <svg
          className="absolute top-20 right-8 opacity-[0.07] pointer-events-none"
          width="160"
          height="160"
          viewBox="0 0 160 160"
          fill="none"
          aria-hidden
        >
          {[0, 1, 2, 3, 4, 5, 6].map((row) =>
            [0, 1, 2, 3, 4, 5, 6].map((col) => (
              <circle
                key={`${row}-${col}`}
                cx={col * 22 + 11}
                cy={row * 22 + 11}
                r="2"
                fill="var(--color-accent)"
              />
            ))
          )}
        </svg>

        <Container>
          <FadeIn>
            <MotionLink
              href="/solutions"
              className="inline-flex items-center gap-2 text-sm text-text-muted hover:text-text-primary transition-colors mb-8 group"
              whileHover={{ x: -2 }}
              whileTap={{ scale: 0.97 }}
              transition={springNav}
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              Back to Solutions
            </MotionLink>

            <h1
              className="font-bold text-text-primary tracking-tight mb-6"
              style={{
                fontSize: "clamp(2.2rem, 5vw, 3.5rem)",
                lineHeight: 1.1,
                letterSpacing: "-0.03em",
              }}
            >
              {solution.title}
            </h1>

            <p
              className="text-text-secondary leading-relaxed max-w-[60ch] text-md md:text-lg"
            >
              {solution.description}
            </p>

            <div className="mt-8">
              <Button href="/contact" variant="primary" size="lg">
                Get Started
                <ArrowRight className="ml-2 w-4 h-4" />
              </Button>
            </div>
          </FadeIn>
        </Container>
      </section>

      {/* Expanded content */}
      {detail && (
        <section className="py-20 md:py-28" style={{ background: "var(--color-bg-alt)" }}>
          <Container>
            <div className="max-w-[72ch]">

              {/* Overview */}
              <FadeIn>
                <div className="mb-14">
                  <h2 className="text-xs font-bold uppercase tracking-widest text-text-muted mb-5">
                    What it is
                  </h2>
                  {detail.overview.map((para, i) => (
                    <p
                      key={i}
                      className={`text-text-secondary leading-relaxed${i > 0 ? " mt-4" : ""}`}
                    >
                      {para}
                    </p>
                  ))}
                </div>
              </FadeIn>

              {/* How It Works */}
              <FadeIn delay={0.06}>
                <div className="mb-14 pt-10 border-t border-border-light">
                  <h2 className="text-xs font-bold uppercase tracking-widest text-text-muted mb-5">
                    How it works
                  </h2>
                  {detail.howItWorks.map((para, i) => (
                    <p
                      key={i}
                      className={`text-text-secondary leading-relaxed${i > 0 ? " mt-4" : ""}`}
                    >
                      {para}
                    </p>
                  ))}
                </div>
              </FadeIn>

              {/* Use Cases */}
              <FadeIn delay={0.1}>
                <div className="mb-14 pt-10 border-t border-border-light">
                  <h2 className="text-xs font-bold uppercase tracking-widest text-text-muted mb-5">
                    Where it fits
                  </h2>
                  <ul className="space-y-3">
                    {detail.useCases.map((item) => (
                      <li
                        key={item}
                        className="flex items-start gap-3 text-sm text-text-secondary leading-relaxed"
                      >
                        <span
                          className="shrink-0 mt-1.75 w-1.5 h-1.5 rounded-full bg-text-muted"
                        />
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
              </FadeIn>

              {/* Benefits */}
              <FadeIn delay={0.14}>
                <div className="pt-10 border-t border-border-light">
                  <h2 className="text-xs font-bold uppercase tracking-widest text-text-muted mb-5">
                    What changes
                  </h2>
                  <ul className="space-y-3">
                    {detail.benefits.map((item) => (
                      <li
                        key={item}
                        className="flex items-start gap-3 text-sm text-text-secondary leading-relaxed"
                      >
                        <span
                          className="shrink-0 mt-1.75 w-1.5 h-1.5 rounded-full"
                          style={{ background: "var(--color-accent)" }}
                        />
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
              </FadeIn>

            </div>
          </Container>
        </section>
      )}

      {/* Other solutions */}
      <section className="py-20 md:py-24">
        <Container>
          <FadeIn>
            <h2 className="text-xs font-bold text-text-muted uppercase tracking-widest mb-6">
              Explore more solutions
            </h2>
          </FadeIn>
          <FadeIn delay={0.05}>
            <div className="flex flex-wrap gap-3">
              {otherSolutions.map((sol) => (
                <MotionLink
                  key={sol.slug}
                  href={`/solutions/${sol.slug}`}
                  className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full border border-border-light text-sm font-medium text-text-secondary hover:text-text-primary hover:border-accent/40 transition-colors group/sol"
                  whileHover={{ y: -2 }}
                  whileTap={{ scale: 0.97 }}
                  transition={springNav}
                >
                  {sol.title}
                  <ArrowRight className="w-3 h-3 opacity-40 group-hover/sol:translate-x-0.5 group-hover/sol:opacity-70 transition-all duration-150" />
                </MotionLink>
              ))}
            </div>
          </FadeIn>
        </Container>
      </section>

      <CTASection />
    </>
  );
}

