import Link from "next/link";
import { Container } from "@/components/ui/Container";
import { Folio } from "@/components/ui/print";
import { NAV_LINKS, SITE_NAME, SOLUTIONS } from "@/lib/constants";

/**
 * The footer — plain credits. Sits on the base paper canvas below the
 * paper-shade CTA band, so the tone step separates it; no divider needed.
 */
export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer role="contentinfo">
      <Container size="wide" className="py-14 md:py-16">
        <div className="grid grid-cols-1 gap-10 md:grid-cols-12 md:gap-8">
          <div className="md:col-span-6">
            <Link href="/" className="flex items-center gap-3 font-sans text-lg font-bold text-ink">
              {/* The mark, inverted — painted in currentColor so it holds in
                  both themes. See .site-mark in globals.css. */}
              <span aria-hidden="true" className="site-mark size-7 -scale-y-100" />
              {SITE_NAME}
            </Link>
            <p className="mt-4 max-w-sm font-serif text-[15px] leading-relaxed text-ink-soft">
              We build AI tools on the systems your team already runs — and
              tell you where AI won&apos;t help.
            </p>
            <p className="mt-5 max-w-sm font-sans text-[13px] leading-snug text-ink-faint">
              Practical AI for real business problems.
            </p>
          </div>

          <div className="md:col-span-3">
            <Folio className="mb-4">Pages</Folio>
            <ul className="space-y-2.5">
              {NAV_LINKS.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="font-serif text-[15px] text-ink-soft transition-colors hover:text-accent"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div className="md:col-span-3">
            <Folio className="mb-4">Tools</Folio>
            <ul className="space-y-2.5">
              {SOLUTIONS.map((s) => (
                <li key={s.slug}>
                  <Link
                    href={`/solutions/${s.slug}`}
                    className="font-serif text-[15px] text-ink-soft transition-colors hover:text-accent"
                  >
                    {s.title}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="mt-12 flex flex-col items-start justify-between gap-2 sm:flex-row sm:items-center">
          <p className="font-sans text-[13px] text-ink-faint">
            © {currentYear} {SITE_NAME}. All rights reserved.
          </p>
          <p className="font-sans text-[13px] text-ink-faint">
            Questions? We usually reply within one business day.
          </p>
        </div>
      </Container>
    </footer>
  );
}
