import { Container } from "@/components/ui/Container";
import { Folio, NewsBox } from "@/components/ui/print";

/**
 * A plain statement of what AI does and doesn't do — the anti-hype position,
 * stated calmly.
 */
export function CorrectionsBox() {
  return (
    <section className="py-6">
      <Container size="narrow">
        <NewsBox as="aside">
          <Folio className="text-ink-soft">In plain terms</Folio>
          <p className="mt-2 font-serif text-base leading-relaxed text-ink">
            AI won&apos;t transform your business or replace your team. In
            practice, it reads documents, answers questions, routes work, and
            flags what looks unusual. Used well, that&apos;s a meaningful
            difference — and it&apos;s what we build toward.
          </p>
        </NewsBox>
      </Container>
    </section>
  );
}
