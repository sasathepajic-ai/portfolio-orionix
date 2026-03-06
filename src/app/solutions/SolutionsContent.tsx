"use client";

import { Container } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";
import { FadeIn } from "@/components/ui/SectionHeading";
import { CTASection } from "@/components/sections/CTASection";
import { ArrowRight } from "lucide-react";

const solutions = [
  {
    title: "AI Assistants",
    description:
      "Intelligent assistants trained on your business context — helping your team find answers, surface insights, and make better decisions without leaving their workflow.",
    features: [
      "Context-aware responses trained on your data",
      "Seamless integration with existing tools",
      "Natural language interface anyone can use",
      "Continuous learning and improvement",
    ],
  },
  {
    title: "Workflow Automation",
    description:
      "Eliminate manual bottlenecks with AI-powered automation. We build intelligent systems for document processing, approvals, and data entry — freeing your team to focus on strategy.",
    features: [
      "End-to-end process automation",
      "Intelligent document processing",
      "Custom triggers and routing logic",
      "Real-time monitoring and alerts",
    ],
  },
  {
    title: "Business Intelligence",
    description:
      "Turn raw data into clear, actionable intelligence. Our AI tools detect patterns, predict trends, and surface the insights that matter — in a format that drives real decisions.",
    features: [
      "Automated trend detection",
      "Natural language data queries",
      "Custom dashboards and reports",
      "Predictive analytics and forecasting",
    ],
  },
  {
    title: "AI Strategy",
    description:
      "Not sure where to start? We help you identify the highest-impact AI opportunities, evaluate the right technologies, and build a practical roadmap that fits your business goals.",
    features: [
      "AI readiness assessment",
      "Opportunity identification and prioritization",
      "Technology evaluation and selection",
      "Implementation roadmap and governance",
    ],
  },
];

const processSteps = [
  {
    step: "01",
    title: "Discover",
    description: "We listen first. A focused conversation about your business, workflow, and challenges.",
  },
  {
    step: "02",
    title: "Design",
    description: "We map the right AI approach to your specific needs — nothing generic, nothing wasted.",
  },
  {
    step: "03",
    title: "Build",
    description: "We develop, test, and refine — delivering working tools in rapid iterations.",
  },
  {
    step: "04",
    title: "Scale",
    description: "We help you expand what works, measure impact, and grow AI adoption across your team.",
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
            <p className="text-xl text-text-secondary leading-[1.65] max-w-[55ch]">
              From intelligent assistants to full workflow automation, we build practical
              AI tools that integrate into how your business already works.
            </p>
          </FadeIn>
        </Container>
      </section>

      {/* Solutions detail */}
      <section className="pb-24 md:pb-32">
        <Container>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-x-16 gap-y-12">
            {solutions.map((solution, index) => (
              <FadeIn key={solution.title} delay={index * 0.05}>
                <div className="border-t border-border-light pt-8">
                  <h2 className="text-xl font-bold text-text-primary mb-3">
                    {solution.title}
                  </h2>
                  <p className="text-sm text-text-secondary leading-relaxed mb-5 line-clamp-3">
                    {solution.description}
                  </p>
                  <ul className="flex flex-col gap-1.5">
                    {solution.features.map((feature) => (
                      <li key={feature} className="flex items-baseline gap-2.5 text-sm text-text-secondary">
                        <span className="shrink-0 text-xs" style={{ color: "var(--color-text-primary)" }}>•</span>
                        {feature}
                      </li>
                    ))}
                  </ul>
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
                A proven process that takes you from exploration to results — fast.
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
