"use client";

import { Container } from "@/components/ui/Container";
import { FadeIn, StaggerContainer, StaggerItem } from "@/components/ui/SectionHeading";

const values = [
  {
    number: "01",
    title: "People First",
    description:
      "AI should be a partner, not a barrier. We design every tool around the humans who will use it — because technology only works when people actually adopt it.",
  },
  {
    number: "02",
    title: "Real-World Focus",
    description:
      "We cut through AI hype and focus on measurable outcomes. Every solution we build solves a specific business problem — nothing more, nothing less.",
  },
  {
    number: "03",
    title: "Radical Simplicity",
    description:
      "Advanced AI doesn\u2019t have to be complicated. We translate sophisticated capabilities into tools so intuitive that anyone on your team can use them.",
  },
];

export function ValueSection() {
  return (
    <section className="py-24 md:py-32">
      <Container className="flex flex-col items-center">
        <FadeIn>
          <div className="max-w-2xl mb-16 md:mb-20 text-center">
            <span className="inline-block text-[11px] font-bold uppercase tracking-widest text-accent mb-4">
              Our Philosophy
            </span>
            <h2
              className="font-bold text-text-primary tracking-tight"
              style={{ fontSize: "clamp(1.9rem, 3.5vw, 2.75rem)", lineHeight: 1.12, letterSpacing: "-0.025em" }}
            >
              Deliver real results.
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
