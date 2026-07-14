import { Container } from "@/components/ui/Container";

export interface TestimonialQuote {
  quote: string;
  author: string;
  role?: string;
}

interface TestimonialProps {
  quotes?: TestimonialQuote[];
}

/**
 * Proof slot for real client quotes. Deliberately renders nothing until at
 * least one real quote is supplied — we'd rather have no testimonial
 * section than a fabricated one. Wire real quotes in by passing `quotes`.
 */
export function Testimonial({ quotes = [] }: TestimonialProps) {
  if (quotes.length === 0) return null;

  return (
    <section className="py-14 md:py-20">
      <Container size="narrow">
        <div className="flex flex-col gap-12">
          {quotes.map((item) => (
            <blockquote key={item.author} className="max-w-3xl">
              <p className="mb-4 font-serif text-xl font-medium leading-normal text-ink md:text-2xl">
                &ldquo;{item.quote}&rdquo;
              </p>
              <footer className="font-sans text-[13px] font-bold text-ink-soft">
                {item.author}
                {item.role ? ` — ${item.role}` : ""}
              </footer>
            </blockquote>
          ))}
        </div>
      </Container>
    </section>
  );
}
