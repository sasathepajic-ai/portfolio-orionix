"use client";

import { Container } from "@/components/ui/Container";
import { SectionHeading, FadeIn, StaggerContainer, StaggerItem } from "@/components/ui/SectionHeading";
import { Check, Minus } from "lucide-react";

const comparisons = [
  {
    legacy: "Months of planning before anything ships",
    pragmatic: "Working tools within weeks of kickoff",
  },
  {
    legacy: "Software that requires weeks of training to use",
    pragmatic: "Interfaces your team figures out on day one",
  },
  {
    legacy: "Large commitments before you see what you're paying for",
    pragmatic: "Scoped work with clear, measurable results",
  },
  {
    legacy: "Vendor ecosystems that expand indefinitely",
    pragmatic: "Honest recommendations, no platform dependence",
  },
  {
    legacy: "Delivery plans that keep moving further out",
    pragmatic: "Incremental progress you can see and measure",
  },
];

export function WhyUsSection() {
  return (
    <section className="py-24 md:py-32">
      <Container>
        <SectionHeading
            label="Why us"
            title="Built different, on purpose"
            description="Most AI projects look good in the room where they&apos;re sold and stall in the room where they&apos;re used. We&apos;ve built enough of them to know the difference."
          />

        <div className="overflow-hidden rounded-2xl">
          <StaggerContainer className="flex flex-col gap-4 md:gap-0 md:flex-row md:items-stretch">
            {/* Left — legacy */}
            <StaggerItem className="md:w-[60%] md:shrink-0">
              <div className="h-full border border-border-light bg-bg-alt/50 p-5 md:p-10 rounded-2xl md:rounded-l-2xl md:rounded-r-none">
                <h3 className="text-[11px] font-bold uppercase tracking-widest text-text-muted mb-5 md:mb-7 justify-self-center md:justify-self-auto">
                  The usual approach
                </h3>
                <div className="space-y-2 md:space-y-5">
                  {comparisons.map((c, i) => (
                    <FadeIn key={c.legacy} delay={0.3 + i * 0.07} direction="none">
                      <div className="flex items-start gap-3">
                        <Minus className="w-3.5 h-3.5 shrink-0 mt-1" style={{color: "var(--color-accent)", opacity: 0.6 }} />
                        <p className="text-sm text-text-secondary leading-[1.65]">{c.legacy}</p>
                      </div>
                    </FadeIn>
                  ))}
                </div>
              </div>
            </StaggerItem>

            {/* Right — Pragmatic Labs AI */}
            <StaggerItem className="md:w-[60%] md:shrink-0 md:-ml-[20%] relative z-10">
              <div
                className="relative overflow-hidden h-full p-5 md:pt-10 md:pb-10 md:pl-[27%] md:pr-10 rounded-2xl md:rounded-none md:[clip-path:polygon(22%_0,100%_0,100%_100%,11%_100%)]"
                style={{ background: "#cc493c" }}
              >
                {/* Blurred decorative circles */}
                <span aria-hidden className="pointer-events-none absolute -top-10 -right-10 w-56 h-56 rounded-full opacity-40" style={{ background: "#e3725e", filter: "blur(48px)" }} />
                <span aria-hidden className="pointer-events-none absolute top-1/3 right-1/4 w-36 h-36 rounded-full opacity-30" style={{ background: "#b03330", filter: "blur(36px)" }} />
                <span aria-hidden className="pointer-events-none absolute bottom-0 left-[30%] w-48 h-48 rounded-full opacity-35" style={{ background: "#f28c6a", filter: "blur(52px)" }} />
                <span aria-hidden className="pointer-events-none absolute bottom-4 right-4 w-24 h-24 rounded-full opacity-25" style={{ background: "#7a1e1e", filter: "blur(30px)" }} />
                <h3
                  className="text-[11px] font-bold uppercase tracking-widest mb-5 md:mb-7 justify-self-center md:justify-self-auto"
                  style={{ color: "#ffffff" }}
                >
                  Pragmatic Labs AI
                </h3>
                <div className="space-y-3 md:space-y-5">
                  {comparisons.map((c, i) => (
                    <FadeIn key={c.pragmatic} delay={0.4 + i * 0.07} direction="none">
                      <div className="flex items-start gap-3">
                        <Check className="w-3.5 h-3.5 shrink-0 mt-1" style={{ color: "#ffffff" }} />
                        <p className="text-sm leading-[1.65]" style={{ color: "#ffffff" }}>
                          {c.pragmatic}
                        </p>
                      </div>
                    </FadeIn>
                  ))}
                </div>
              </div>
            </StaggerItem>
          </StaggerContainer>
        </div>
      </Container>
    </section>
  );
}

