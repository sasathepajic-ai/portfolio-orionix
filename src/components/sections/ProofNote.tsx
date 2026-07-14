import { Container } from "@/components/ui/Container";
import { Folio, NewsBox } from "@/components/ui/print";
import { TRUSTED_BY } from "@/lib/constants";

/**
 * A straightforward note on where the company is today — honest about being
 * early, without making a slogan out of it.
 */
export function ProofNote() {
  return (
    <section className="py-12 md:py-16">
      <Container size="narrow">
        <NewsBox>
          <Folio>Where we are today</Folio>
          <p className="mt-3 font-serif text-lg leading-relaxed text-ink">
            We&apos;re a young company, and we&apos;d rather be straight about
            that than oversell it. A few organizations have already built with
            us —{" "}
            {TRUSTED_BY.map((org, i) => (
              <span key={org.name}>
                {i > 0 && (i === TRUSTED_BY.length - 1 ? ", and " : ", ")}
                <a href={org.url} target="_blank" rel="noopener noreferrer" className="press-link">
                  {org.name}
                </a>
              </span>
            ))}
            . We&apos;ll share their results here as they become available.
          </p>
        </NewsBox>
      </Container>
    </section>
  );
}
