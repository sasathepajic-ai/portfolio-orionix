"use client";

import { useId, useState } from "react";
import { Container } from "@/components/ui/Container";
import { Headline, Kicker } from "@/components/ui/print";
import { FAQS } from "@/lib/faqs";

/**
 * The FAQ as a numbered list. The accordion is the
 * `.notice-panel` CSS grid-rows animation (one of the three permitted
 * motion moments); no JS animation library.
 */
export function FAQSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);
  const baseId = useId();

  return (
    <section id="faq" className="py-14 md:py-20">
      <Container size="narrow">
        <Kicker className="mb-3">Fair questions</Kicker>
        <Headline as="h2">Questions people actually ask</Headline>

        <div className="mt-8 border-t border-rule">
          {FAQS.map((faq, i) => {
            const isOpen = openIndex === i;
            const buttonId = `${baseId}-notice-${i}-button`;
            const panelId = `${baseId}-notice-${i}-panel`;

            return (
              <div key={faq.question} className="border-b border-rule">
                <h3 className="m-0">
                  <button
                    id={buttonId}
                    type="button"
                    aria-expanded={isOpen}
                    aria-controls={panelId}
                    onClick={() => setOpenIndex(isOpen ? null : i)}
                    className="flex w-full cursor-pointer items-baseline justify-between gap-4 py-5 text-left"
                  >
                    <span className="flex items-baseline gap-4">
                      <span aria-hidden="true" className="font-sans text-[13px] font-bold text-ink-faint">
                        {i + 1}.
                      </span>
                      <span className="font-serif text-lg font-medium text-ink md:text-xl">
                        {faq.question}
                      </span>
                    </span>
                    <span aria-hidden="true" className="shrink-0 font-sans text-lg leading-none text-ink-faint">
                      {isOpen ? "−" : "+"}
                    </span>
                  </button>
                </h3>

                <div
                  id={panelId}
                  role="region"
                  aria-labelledby={buttonId}
                  className="notice-panel"
                  data-open={isOpen}
                >
                  <div>
                    <p className="max-w-[65ch] pb-6 pl-8 font-serif text-[15px] leading-relaxed text-ink-soft">
                      {faq.answer}
                    </p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </Container>
    </section>
  );
}
