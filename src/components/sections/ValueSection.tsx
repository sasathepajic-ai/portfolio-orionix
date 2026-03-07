"use client";

import { Container } from "@/components/ui/Container";
import { FadeIn, StaggerContainer, StaggerItem } from "@/components/ui/SectionHeading";

const values = [
  {
    number: "01",
    title: "Concrete over theoretical",
    description:
      "A tool that works for one real process is worth more than a roadmap for ten hypothetical ones. We earn trust by showing results early.",
  },
  {
    number: "02",
    title: "Designed for the people in it",
    description:
      "The best AI system is the one your team stops noticing — it's just how the work gets done. We build with that end in mind.",
  },
  {
    number: "03",
    title: "Short cycles, real feedback",
    description:
      "We don't wait for perfection before shipping. Honest feedback on early versions beats any big upfront plan for getting somewhere useful.",
  },
];

export function ValueSection() {
  return (
    <section className="py-24 md:py-32">
      <Container className="flex flex-col items-center">
        <FadeIn>
          <div className="max-w-2xl mb-16 md:mb-20 text-center">
            <span className="inline-block text-[11px] font-bold uppercase tracking-widest text-accent mb-4">
              How we work
            </span>
            <h2
              className="font-bold text-text-primary tracking-tight"
              style={{ fontSize: "clamp(1.9rem, 3.5vw, 2.75rem)", lineHeight: 1.12, letterSpacing: "-0.025em" }}
            >
              What good looks like to us.
            </h2>
          </div>
        </FadeIn>

        <StaggerContainer className="grid grid-cols-1 md:grid-cols-3 gap-10 w-full justify-items-center">
          {values.map((value, i) => {
            const accentColors = ["var(--color-accent)", "var(--color-teal)", "var(--color-ui-border-strong)"];
            return (
            <StaggerItem key={value.number}>
              <div
                className="py-8 md:py-0 pl-5 border-l-[3px]"
                style={{ borderColor: accentColors[i] }}
              >
                <h3 className="text-[1.2rem] font-bold text-text-primary mb-3">
                  {value.title}
                </h3>
                <p className="text-text-secondary text-sm leading-[1.68]">
                  {value.description}
                </p>
              </div>
            </StaggerItem>
          )})}
        </StaggerContainer>
      </Container>
    </section>
  );
}
