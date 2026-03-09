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
      "Decisions that used to take hours of analysis happen in minutes. Not because the bar is lower — because the right information is already there.",
  },
  {
    word: "Simpler.",
    icon: Layers,
    stat: "−60% manual work",
    description:
      "Repetitive tasks that eat up afternoons don't need a person to manage them. Your team stays focused on the work that actually requires one.",
  },
  {
    word: "Clearer.",
    icon: Eye,
    stat: "Full visibility",
    description:
      "Instead of finding out what happened last month, you know what's happening now. The signal reaches you before it becomes a problem.",
  },
];

export function ImpactSection() {
  return (
    <section className="py-24 md:py-32 bg-bg-alt dark:bg-navy">
      <Container>
        <SectionHeading
          label="What changes"
          title="The improvements that stick"
          description="The kind of improvements that show up in how your team spends their day, not just in end-of-quarter slides."
          className="dark:[&_h2]:text-white dark:[&_p]:text-white/55"
        />

        <div className="relative py-16">
          <div className="absolute top-0 inset-x-0 h-px" style={{ background: "linear-gradient(to right, transparent 0%, var(--color-border) 35%, var(--color-border) 65%, transparent 100%)" }} />
          <div className="absolute bottom-0 inset-x-0 h-px" style={{ background: "linear-gradient(to right, transparent 0%, var(--color-border) 35%, var(--color-border) 65%, transparent 100%)" }} />

          <StaggerContainer className="grid grid-cols-1 md:grid-cols-3 gap-10 items-center text-center md:items-start md:text-left">
            {impacts.map((impact) => {
              const Icon = impact.icon;
              return (
                <StaggerItem key={impact.word}>
                  <div className="flex flex-col items-center text-center md:items-start md:text-left">
                    <div className="flex items-center gap-4 mb-4">
                      <p
                        className="font-bold text-text-primary dark:text-white text-xl md:text-2xl"
                        style={{lineHeight: 1.0, letterSpacing: "-0.03em" }}
                      >
                        {impact.word}
                      </p>
                      <Icon className="w-6 h-6 shrink-0 mt-1 hidden md:inline" style={{ color: "var(--color-teal)" }} />
                    </div>
                    <p className="text-sm leading-[1.68] text-text-secondary dark:text-white/50">
                      {impact.description}
                    </p>
                  </div>
                </StaggerItem>
              );
            })}
          </StaggerContainer>
        </div>
      </Container>
    </section>
  );
}
