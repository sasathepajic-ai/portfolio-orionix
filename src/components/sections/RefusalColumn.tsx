import { Container } from "@/components/ui/Container";
import { Deck, Headline, NewsBox } from "@/components/ui/print";
import { REFUSALS } from "@/lib/refusals";

/**
 * Where we recommend against AI — the differentiator, stated plainly rather
 * than as a manifesto.
 */
export function RefusalColumn() {
  return (
    <section id="refusals" className="py-12 md:py-16">
      <Container size="narrow">
        <div className="mb-6">
          <Headline as="h2" size="md">
            What we&apos;ll advise against
          </Headline>
          <Deck className="mt-3">
            Part of the job is pointing you to the simpler fix when there is
            one. A few things we regularly recommend against:
          </Deck>
        </div>
        <NewsBox>
          <ul>
            {REFUSALS.map((r) => (
              <li
                key={r.item}
                className="border-b border-rule py-4 first:pt-0 last:border-b-0 last:pb-0"
              >
                <p className="font-serif text-lg leading-normal">
                  <strong className="font-medium text-ink">{r.item}</strong>{" "}
                  <span className="text-ink-soft">— {r.reason}</span>
                </p>
              </li>
            ))}
          </ul>
        </NewsBox>
      </Container>
    </section>
  );
}
