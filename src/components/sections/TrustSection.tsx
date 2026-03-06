"use client";

import { Container } from "@/components/ui/Container";
import { FadeIn } from "@/components/ui/SectionHeading";
import { TRUSTED_BY } from "@/lib/constants";

export function TrustSection() {
  return (
    <section className="py-12 md:py-14 border-y border-border-light">
      <Container size="wide">
        <FadeIn>
          <div className="flex flex-col items-center gap-4 md:flex-row md:justify-center md:gap-10">
            <p className="text-[11px] font-bold uppercase tracking-widest text-text-muted shrink-0 whitespace-nowrap">
              Trusted by
            </p>

            {/* vertical rule — desktop only */}
            <div className="hidden md:block w-px h-6 bg-border shrink-0" />

            <div className="flex flex-col items-center gap-2 sm:flex-row sm:flex-wrap sm:justify-center sm:gap-x-2 sm:gap-y-3">
              {TRUSTED_BY.map((org, i) => (
                <div key={org.name} className="flex items-center gap-2">
                  {i > 0 && (
                    <span className="hidden sm:block w-1 h-1 rounded-full bg-border shrink-0" />
                  )}
                  <a
                      href={org.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-sm font-semibold text-text-muted hover:text-text-primary transition-colors duration-200"
                    >
                      {org.name}
                    </a>
                </div>
              ))}
            </div>
          </div>
        </FadeIn>
      </Container>
    </section>
  );
}
