"use client";

import Link from "next/link";
import { Container } from "@/components/ui/Container";
import { SectionHeading, StaggerContainer, StaggerItem, FadeIn } from "@/components/ui/SectionHeading";
import { SOLUTIONS } from "@/lib/constants";
import { ArrowRight } from "lucide-react";

export function SolutionsSection() {
  return (
    <section className="py-24 md:py-32 bg-bg-alt/40">
      <Container>
        <SectionHeading
            label="What We Deliver"
            title={"Practical AI solutions for every\u00a0team"}
            description="From intelligent assistants to full workflow automation, we build AI tools that integrate into how your business already works."
          />

        <StaggerContainer className="grid grid-cols-1 md:grid-cols-2 gap-x-16 gap-y-10 mb-12">
          {SOLUTIONS.map((solution, i) => (
            <StaggerItem key={solution.title}>
              <div>
                <div className="flex items-baseline gap-3 mb-2">
                  <span
                    className="shrink-0 text-[0.8rem] font-bold tabular-nums select-none"
                    style={{ color: "var(--color-text-muted)", opacity: 0.45 }}
                  >
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <h3 className="text-[1.05rem] font-bold text-text-primary">
                    {solution.title}
                  </h3>
                </div>
                <p className="text-text-secondary text-sm leading-[1.68]">
                  {solution.description}
                </p>
              </div>
            </StaggerItem>
          ))}
        </StaggerContainer>

        <FadeIn>
          <div className="flex justify-center">
            <Link
              href="/solutions"
              className="inline-flex items-center gap-2 text-[13px] font-bold uppercase tracking-wider text-accent hover:text-accent-hover transition-colors"
            >
              Learn more
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </FadeIn>
      </Container>
    </section>
  );
}
