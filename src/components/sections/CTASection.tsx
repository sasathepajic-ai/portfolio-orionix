"use client";

import { Container } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";
import { FadeIn, StaggerContainer, StaggerItem } from "@/components/ui/SectionHeading";
import { ArrowRight, Calendar, Compass, Rocket } from "lucide-react";

const expectations = [
  {
    icon: Calendar,
    title: "A 30-minute discovery call",
    description:
      "No slides, no sales process. We ask about your workflows and tell you honestly what AI can and can't do.",
  },
  {
    icon: Compass,
    title: "A straightforward assessment",
    description:
      "We identify where you'll see real results — and tell you plainly where you won't.",
  },
  {
    icon: Rocket,
    title: "A first step you can take this month",
    description:
      "If there's a fit, you walk away with a concrete pilot — scoped, costed, and achievable.",
  },
];

export function CTASection() {
  return (
    <section
      className="py-24 md:py-32 relative overflow-hidden bg-bg dark:bg-navy"
    >


      <Container size="wide" className="relative">
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_400px] gap-12 lg:gap-20 items-center">
          <FadeIn>
            <div className="flex flex-col items-center text-center lg:items-start lg:text-left">
              <span className="inline-block text-[11px] font-bold uppercase tracking-widest text-accent mb-5">
                Get in touch
              </span>
              <h2
                className="font-bold text-text-primary dark:text-white mb-6"
                style={{ fontSize: "clamp(2rem, 3.5vw, 3.25rem)", lineHeight: 1.1, letterSpacing: "-0.03em" }}
              >
                Have a process{" "}
                <br className="hidden sm:block" />
                worth fixing?
              </h2>
              <p
                className="text-base leading-[1.7] mb-10 max-w-[52ch] text-text-secondary dark:text-white/60"
              >
                We don&apos;t need a polished brief or a vendor evaluation. Just tell us what&apos;s
                slowing your team down and we&apos;ll take it from there.
              </p>
              <div className="flex flex-col sm:flex-row gap-3">
                <Button href="/contact" variant="primary" size="lg">
                  Start a Conversation
                  <ArrowRight className="ml-2 w-4 h-4 transition-transform duration-200 group-hover:translate-x-1" />
                </Button>
                <Button
                  href="/solutions"
                  variant="ghost"
                  size="lg"
                  className="text-text-secondary hover:text-text-primary dark:text-white/70 dark:hover:text-white dark:hover:bg-white/8"
                >
                  View Solutions
                </Button>
              </div>
            </div>
          </FadeIn>

          {/* Right: What to expect */}
          <FadeIn delay={0.2}>
            <div className="pl-5 border-l-2" style={{ borderColor: "var(--color-teal)" }}>
              <p
                className="text-[11px] font-bold uppercase tracking-widest mb-6 text-text-muted dark:text-white/30"
              >
                What to expect
              </p>
              <StaggerContainer className="space-y-5">
                {expectations.map((item) => (
                  <StaggerItem key={item.title}>
                    <div>
                      <p className="text-sm font-bold text-text-primary dark:text-white mb-0.5">{item.title}</p>
                      <p className="text-xs leading-relaxed text-text-secondary dark:text-white/50">
                        {item.description}
                      </p>
                    </div>
                  </StaggerItem>
                ))}
              </StaggerContainer>
              <p className="text-xs mt-8 text-text-muted dark:text-white/30">
                No commitment required. No sales pressure.
              </p>
            </div>
          </FadeIn>
        </div>
      </Container>
    </section>
  );
}
