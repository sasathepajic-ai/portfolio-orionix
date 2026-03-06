"use client";

import { Container } from "@/components/ui/Container";
import { SectionHeading, StaggerContainer, StaggerItem } from "@/components/ui/SectionHeading";
import { TrendingUp, Layers, Eye } from "lucide-react";

const impacts = [
  {
    word: "Faster.",
    icon: TrendingUp,
    stat: "3× faster",
    description:
      "AI-powered insights delivered in real time so your team makes better decisions without waiting for data to catch up.",
  },
  {
    word: "Simpler.",
    icon: Layers,
    stat: "−60% manual work",
    description:
      "Automated workflows that quietly handle the repetitive, freeing your people for the work that actually requires human judgment.",
  },
  {
    word: "Clearer.",
    icon: Eye,
    stat: "Full visibility",
    description:
      "See your business with genuine clarity. AI-driven intelligence that surfaces what matters and filters out the noise.",
  },
];

export function ImpactSection() {
  return (
    <section className="py-24 md:py-32" style={{ background: "var(--color-navy)" }}>
      <Container>
        <SectionHeading
          label="Business Impact"
          title="Real outcomes, not just promises"
          description="Our clients see measurable improvements across their operations — from day-to-day efficiency to strategic decision-making."
          className="[&_h2]:text-white [&_p]:text-white/55 [&_span]:text-accent"
        />

        <div className="relative py-16">
          <div className="absolute top-0 inset-x-0 h-px" style={{ background: "linear-gradient(to right, transparent 0%, rgba(255,255,255,0.3) 35%, rgba(255,255,255,0.3) 65%, transparent 100%)" }} />
          <div className="absolute bottom-0 inset-x-0 h-px" style={{ background: "linear-gradient(to right, transparent 0%, rgba(255,255,255,0.3) 35%, rgba(255,255,255,0.3) 65%, transparent 100%)" }} />

          <StaggerContainer className="grid grid-cols-1 md:grid-cols-3 gap-10">
            {impacts.map((impact) => {
              const Icon = impact.icon;
              return (
                <StaggerItem key={impact.word}>
                  <div className="flex items-center gap-4 mb-4">
                    <p
                      className="font-bold text-white"
                      style={{ fontSize: "clamp(2rem, 3.5vw, 2.75rem)", lineHeight: 1.0, letterSpacing: "-0.03em" }}
                    >
                      {impact.word}
                    </p>
                    <Icon className="w-8 h-8 shrink-0 mt-1" style={{ color: "var(--color-teal)" }} />
                  </div>
                  <p className="text-sm leading-[1.68]" style={{ color: "rgba(255,255,255,0.5)" }}>
                    {impact.description}
                  </p>
                </StaggerItem>
              );
            })}
          </StaggerContainer>
        </div>
      </Container>
    </section>
  );
}
