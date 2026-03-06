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
      "No commitment, no pitch — just an honest conversation about your business challenges.",
  },
  {
    icon: Compass,
    title: "A clear-eyed assessment",
    description:
      "We'll tell you exactly where AI can (and can't) help, with specific, actionable recommendations.",
  },
  {
    icon: Rocket,
    title: "A practical first step",
    description:
      "Walk away with a concrete plan for your first AI win — achievable in weeks, not months.",
  },
];

export function CTASection() {
  return (
    <section
      className="py-24 md:py-32 relative overflow-hidden bg-bg dark:bg-navy"
    >


      <Container size="wide" className="relative">
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_400px] gap-12 lg:gap-20 items-center">
          {/* Left */}
          <FadeIn>
            <span className="inline-block text-[11px] font-bold uppercase tracking-widest text-accent mb-5">
              Let’s Work Together
            </span>
            <h2
              className="font-bold text-text-primary dark:text-white mb-6"
              style={{ fontSize: "clamp(2rem, 3.5vw, 3.25rem)", lineHeight: 1.1, letterSpacing: "-0.03em" }}
            >
              Ready to build practical AI{" "}
              <br className="hidden sm:block" />
              for your business?
            </h2>
            <p
              className="text-base leading-[1.7] mb-10 max-w-[52ch] text-text-secondary dark:text-white/60"
            >
              Whether you have a specific challenge or you’re just starting to explore
              what AI can do — we’d love to hear from you.
            </p>
            <div className="flex flex-col sm:flex-row gap-3">
              <Button href="/contact" variant="primary" size="lg">
                Schedule a Conversation
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
                {expectations.map((item) => {
                  const Icon = item.icon;
                  return (
                    <StaggerItem key={item.title}>
                      <div>
                        <p className="text-sm font-bold text-text-primary dark:text-white mb-0.5">{item.title}</p>
                        <p
                          className="text-xs leading-relaxed text-text-secondary dark:text-white/50"
                        >
                          {item.description}
                        </p>
                      </div>
                    </StaggerItem>
                  );
                })}
              </StaggerContainer>
              <p
                className="text-xs mt-8 text-text-muted dark:text-white/30"
              >
                No commitment required. No sales pressure.
              </p>
            </div>
          </FadeIn>
        </div>
      </Container>
    </section>
  );
}
