"use client";

import Link from "next/link";
import { Container } from "@/components/ui/Container";
import { SectionHeading, StaggerContainer, StaggerItem, FadeIn } from "@/components/ui/SectionHeading";
import { SOLUTIONS } from "@/lib/constants";
import { ArrowRight } from "lucide-react";
import { motion } from "framer-motion";

const MotionLink = motion(Link);
const springNav = { type: "spring" as const, stiffness: 440, damping: 30 };

export function SolutionsSection() {
  return (
    <section className="py-24 md:py-32 bg-bg-alt/40">
      <Container>
        <SectionHeading
            label="What we build"
            title={"Four things, done well"}
            description="We keep a tight scope deliberately. Each of these four solutions is something we've built before and know how to deliver."
          />

        <StaggerContainer className="grid grid-cols-1 md:grid-cols-2 gap-x-16 gap-y-10 mb-12">
          {SOLUTIONS.map((solution) => (
            <StaggerItem key={solution.title}>
              <MotionLink
                href={`/solutions/${solution.slug}`}
                className="block group/item"
                whileTap={{ scale: 0.985 }}
                transition={springNav}
              >
                <div className="flex items-baseline gap-3 mb-2">
                  <h3 className="text-[1.05rem] font-bold text-text-primary group-hover/item:text-accent transition-colors">
                    {solution.title}
                  </h3>
                </div>
                <p className="text-text-secondary text-sm leading-[1.68]">
                  {solution.description}
                </p>
              </MotionLink>
            </StaggerItem>
          ))}
        </StaggerContainer>

        <FadeIn>
          <div className="flex justify-center">
            <MotionLink
              href="/solutions"
              className="inline-flex items-center gap-2 text-[13px] font-bold uppercase tracking-wider text-accent hover:text-accent-hover transition-colors"
              whileTap={{ scale: 0.97 }}
              transition={springNav}
            >
              Learn more
              <ArrowRight className="w-4 h-4" />
            </MotionLink>
          </div>
        </FadeIn>
      </Container>
    </section>
  );
}
