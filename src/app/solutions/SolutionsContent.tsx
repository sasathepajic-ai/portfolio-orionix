"use client";

import Link from "next/link";
import { Container } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";
import { FadeIn } from "@/components/ui/SectionHeading";
import { CTASection } from "@/components/sections/CTASection";
import { ArrowRight } from "lucide-react";
import { SOLUTIONS } from "@/lib/constants";

const processSteps = [
  {
    step: "01",
    title: "Discover",
    description: "We ask a lot of questions before writing a single line of code. What's the actual bottleneck? What breaks when volume doubles?",
  },
  {
    step: "02",
    title: "Design",
    description: "We figure out the minimum solution that creates the most impact. Nothing gets built unless it truly needs to be.",
  },
  {
    step: "03",
    title: "Build",
    description: "You see working software early. We ship in short cycles and adjust based on what your team actually does with it.",
  },
  {
    step: "04",
    title: "Scale",
    description: "Once something works, we help you expand it — to other teams, other processes, more users.",
  },
];

export function SolutionsContent() {
  return (
    <>
      {/* Hero */}
      <section className="relative pt-36 md:pt-44 pb-24 md:pb-32 overflow-hidden">
        <div className="absolute inset-0 pointer-events-none" aria-hidden>
          <div
            className="absolute inset-0 opacity-[0.033]"
            style={{
              backgroundImage: "radial-gradient(var(--color-dot-grid) 1.2px, transparent 1.2px)",
              backgroundSize: "26px 26px",
            }}
          />

        </div>
        <Container className="relative">
          <FadeIn>
            <span className="inline-block text-xs font-bold uppercase tracking-widest text-accent mb-6">
              Solutions
            </span>
          </FadeIn>
          <FadeIn delay={0.1}>
            <h1
              className="font-bold text-text-primary mb-7"
              style={{ fontSize: "clamp(2.6rem, 5vw, 4rem)", lineHeight: 1.07, letterSpacing: "-0.035em" }}
            >
              AI that solves problems,
              <br className="hidden sm:block" />
              <span style={{ color: "var(--color-text-faded)" }}> not creates them</span>
            </h1>
          </FadeIn>
          <FadeIn delay={0.2}>
            <p className="text-md md:text-lg text-text-secondary leading-[1.65] max-w-[55ch]">
              Each solution we offer is scoped to a specific problem. Not a platform,
              not a suite — just the right tool for what you&apos;re actually dealing with.
            </p>
          </FadeIn>
        </Container>
      </section>

      {/* Solutions detail */}
      <section className="pb-24 md:pb-32">
        <Container>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-x-16 gap-y-12">
            {SOLUTIONS.map((solution, index) => (
              <FadeIn key={solution.title} delay={index * 0.05}>
                <div className="border-t border-border-light pt-8">
                  <h2 className="text-xl font-bold text-text-primary mb-3">
                    {solution.title}
                  </h2>
                  <p className="text-sm text-text-secondary leading-relaxed mb-5 line-clamp-3">
                    {solution.description}
                  </p>
                  <ul className="flex flex-col gap-1.5 mb-5">
                    {solution.features.map((feature) => (
                      <li key={feature} className="flex items-baseline gap-2.5 text-sm text-text-secondary">
                        <span className="shrink-0 text-xs" style={{ color: "var(--color-text-primary)" }}>•</span>
                        {feature}
                      </li>
                    ))}
                  </ul>
                  <Link
                    href={`/solutions/${solution.slug}`}
                    className="inline-flex items-center gap-1.5 text-sm font-medium text-accent hover:text-accent-hover transition-colors group/link"
                  >
                    Learn more
                    <ArrowRight className="w-3.5 h-3.5 group-hover/link:translate-x-0.5 transition-transform duration-150" />
                  </Link>
                </div>
              </FadeIn>
            ))}
          </div>
          <div className="mt-10 flex justify-center">
            <Button href="/contact" variant="secondary" size="lg" className="group/btn">
              Get Started
              <ArrowRight className="ml-2 w-4 h-4 transition-transform duration-200 group-hover/btn:translate-x-1" />
            </Button>
          </div>
        </Container>
      </section>

      {/* Process */}
      <section className="relative py-24 md:py-32 border-y border-border-light overflow-hidden" style={{ background: "var(--color-bg-alt)" }}>
        {/* Corner dot-grid decorations */}
        <svg className="absolute top-6 right-6 opacity-[0.12] pointer-events-none" width="72" height="72" viewBox="0 0 72 72" fill="none" aria-hidden>
          {[0,1,2,3,4,5].map(row => [0,1,2,3,4,5].map(col => (
            <circle key={`${row}-${col}`} cx={col * 14 + 7} cy={row * 14 + 7} r="2" fill="var(--color-accent)" />
          )))}
        </svg>
        <svg className="absolute bottom-6 left-6 opacity-[0.12] pointer-events-none" width="72" height="72" viewBox="0 0 72 72" fill="none" aria-hidden>
          {[0,1,2,3,4,5].map(row => [0,1,2,3,4,5].map(col => (
            <circle key={`${row}-${col}`} cx={col * 14 + 7} cy={row * 14 + 7} r="2" fill="var(--color-accent)" />
          )))}
        </svg>

        <Container>
          <FadeIn>
            <div className="max-w-2xl mx-auto text-center mb-16 md:mb-20">
              <span className="inline-block text-xs font-bold uppercase tracking-widest text-accent mb-4">
                Our Process
              </span>
              <h2
                className="font-bold text-text-primary tracking-tight mb-4"
                style={{ fontSize: "clamp(1.9rem, 3.5vw, 2.75rem)", lineHeight: 1.15 }}
              >
                From conversation to impact
              </h2>
              <p className="text-text-secondary leading-relaxed max-w-[65ch]">
                We don&apos;t start with a framework. We start by understanding what&apos;s actually slowing you down.
              </p>
            </div>
          </FadeIn>

          {/* Mobile: simple vertical list */}
          <div className="md:hidden max-w-md mx-auto space-y-8">
            {processSteps.map((phase) => (
              <FadeIn key={phase.step}>
                <div className="flex items-start gap-4">
                  <div className="relative shrink-0">
                    <div className="absolute rounded-full border border-dashed" style={{ inset: "-6px", borderColor: "var(--color-accent)", opacity: 0.28 }} />
                    <div className="w-11 h-11 rounded-full flex items-center justify-center font-bold text-sm select-none" style={{ background: "var(--color-bg-card)", border: "1.5px solid var(--color-border)", color: "var(--color-accent)" }}>
                      {phase.step}
                    </div>
                  </div>
                  <div className="min-w-0 pt-1">
                    <h3 className="text-base font-bold text-text-primary mb-1">{phase.title}</h3>
                    <p className="text-sm text-text-secondary leading-relaxed">{phase.description}</p>
                  </div>
                </div>
              </FadeIn>
            ))}
          </div>

          {/* Desktop: Zigzag layout */}
          <div className="hidden md:block max-w-2xl mx-auto">
            {processSteps.map((phase, i) => {
              const isLeft = i % 2 === 0;
              return (
                <div key={phase.step}>
                  <FadeIn>
                    <div className="grid grid-cols-2 gap-8 items-center">
                      {isLeft ? (
                        <>
                          <div className="flex items-center gap-4 sm:gap-5">
                            {/* Circle */}
                            <div className="relative shrink-0">
                              <div
                                className="absolute rounded-full border border-dashed"
                                style={{ inset: "-8px", borderColor: "var(--color-accent)", opacity: 0.28 }}
                              />
                              <div
                                className="w-14 h-14 rounded-full flex items-center justify-center font-bold text-sm select-none"
                                style={{
                                  background: "var(--color-bg-card)",
                                  border: "1.5px solid var(--color-border)",
                                  color: "var(--color-accent)",
                                  boxShadow: "0 4px 20px rgba(0,0,0,0.18), 0 0 0 1px var(--color-border)",
                                }}
                              >
                                {phase.step}
                              </div>
                            </div>
                            <div className="min-w-0">
                              <h3 className="text-base font-bold text-text-primary mb-1.5">{phase.title}</h3>
                              <p className="text-sm text-text-secondary leading-relaxed">{phase.description}</p>
                            </div>
                          </div>
                          {/* Empty cell */}
                          <div />
                        </>
                      ) : (
                        <>
                          {/* Empty cell */}
                          <div />
                          <div className="flex items-center gap-4 sm:gap-5">
                            {/* Circle */}
                            <div className="relative shrink-0">
                              <div
                                className="absolute rounded-full border border-dashed"
                                style={{ inset: "-8px", borderColor: "var(--color-accent)", opacity: 0.28 }}
                              />
                              <div
                                className="w-14 h-14 rounded-full flex items-center justify-center font-bold text-sm select-none"
                                style={{
                                  background: "var(--color-bg-card)",
                                  border: "1.5px solid var(--color-border)",
                                  color: "var(--color-accent)",
                                  boxShadow: "0 4px 20px rgba(0,0,0,0.18), 0 0 0 1px var(--color-border)",
                                }}
                              >
                                {phase.step}
                              </div>
                            </div>
                            <div className="min-w-0">
                              <h3 className="text-base font-bold text-text-primary mb-1.5">{phase.title}</h3>
                              <p className="text-sm text-text-secondary leading-relaxed">{phase.description}</p>
                            </div>
                          </div>
                        </>
                      )}
                    </div>
                  </FadeIn>

                  {/* Dot connector */}
                  {i < processSteps.length - 1 && (
                    <div className="flex justify-center py-2" aria-hidden>
                      <svg width="520" height="68" viewBox="0 0 520 68" fill="none" className="w-full h-auto overflow-visible">
                        {isLeft ? (
                          <>
                            <path
                              d="M 130 6 C 130 52, 390 16, 390 62"
                              stroke="var(--color-border)"
                              strokeWidth="1.5"
                              strokeDasharray="6 5"
                            />
                            <circle cx="130" cy="6" r="3.5" fill="var(--color-accent)" opacity="0.5" />
                            <circle cx="390" cy="62" r="3.5" fill="var(--color-accent)" opacity="0.5" />
                          </>
                        ) : (
                          <>
                            <path
                              d="M 390 6 C 390 52, 130 16, 130 62"
                              stroke="var(--color-border)"
                              strokeWidth="1.5"
                              strokeDasharray="6 5"
                            />
                            <circle cx="390" cy="6" r="3.5" fill="var(--color-accent)" opacity="0.5" />
                            <circle cx="130" cy="62" r="3.5" fill="var(--color-accent)" opacity="0.5" />
                          </>
                        )}
                      </svg>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </Container>
      </section>

      <CTASection />
    </>
  );
}
