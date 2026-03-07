"use client";

import { Container } from "@/components/ui/Container";
import { FadeIn } from "@/components/ui/SectionHeading";
import { Link } from "lucide-react";
import { TRUSTED_BY } from "@/lib/constants";

export function TrustSection() {
  return (
    <section className="py-12 md:py-14 border-y border-border-light">
      <Container size="wide">
        <FadeIn>
          <div className="flex flex-col items-center gap-5 md:flex-row md:justify-center md:gap-10">
            <p className="text-[11px] font-bold uppercase tracking-widest text-text-muted shrink-0 whitespace-nowrap">
              Trusted by
            </p>

            <Link className="w-3.5 h-3.5 text-text-muted shrink-0" aria-hidden />

            <div className="flex flex-col items-center gap-3 sm:flex-row sm:flex-wrap sm:justify-center sm:gap-x-5 sm:gap-y-3">
              {TRUSTED_BY.map((org) => (
                <a
                  key={org.name}
                  href={org.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1 text-[0.875rem] font-bold text-text-primary hover:text-accent transition-colors duration-200"
                >
                  {org.name}
                </a>
              ))}
            </div>
          </div>
        </FadeIn>
      </Container>
    </section>
  );
}
