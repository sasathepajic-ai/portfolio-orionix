"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Container } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";
import { NAV_LINKS, SITE_NAME } from "@/lib/constants";
import { cn } from "@/lib/utils";

/**
 * Flips the canvas and remembers the choice. The DOM attribute IS the state —
 * CSS reads [data-theme] off <html> (design-tokens.css) and so does the label
 * (globals.css), so there is nothing for React to hold and nothing to get out
 * of sync. With no attribute set the page is following the OS, so that is what
 * we read to work out what "the other one" means.
 */
function toggleTheme() {
  const root = document.documentElement;
  const current =
    root.dataset.theme ??
    (window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light");
  const next = current === "dark" ? "light" : "dark";

  root.dataset.theme = next;
  try {
    localStorage.setItem("theme", next);
  } catch {
    /* Private mode or storage blocked — the flip still holds for this page,
       it just won't survive a reload. Not worth surfacing. */
  }
}

/**
 * A word, not a sun/moon icon — the same convention as the "Menu"/"Close"
 * control beside it, and it keeps the icon set at the four tool marks. It
 * names the theme it switches TO; which word shows is decided in CSS, so it
 * is correct in the first painted frame.
 */
function ThemeToggle({ className }: { className?: string }) {
  return (
    <button
      type="button"
      onClick={toggleTheme}
      className={cn(
        "cursor-pointer font-sans text-sm font-bold text-ink-soft transition-colors hover:text-ink",
        className
      )}
    >
      <span className="theme-word--to-dark">
        <span className="sr-only">Switch to </span>Dark
        <span className="sr-only"> theme</span>
      </span>
      <span className="theme-word--to-light">
        <span className="sr-only">Switch to </span>Light
        <span className="sr-only"> theme</span>
      </span>
    </button>
  );
}

/**
 * A thin paper band: compact nameplate left, section links right. Always
 * solid (one canvas per theme, no transparent-at-top tricks). Mobile menu is
 * a plain word — "Menu"/"Close" — not an icon.
 */
export function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();

  const isActive = (href: string) =>
    href === "/solutions" ? pathname.startsWith("/solutions") : pathname === href;

  /**
   * Clicking the route you are already on is a no-op for the router, so the
   * page just sits there and the link reads as broken — which is exactly what
   * "Home" does when you are halfway down the front page. Take it to the top
   * instead — and glide, because this is the one scroll on the site that is a
   * gesture rather than a navigation. It asks for that here rather than in CSS
   * so it cannot leak into the router's own scrolling, and so the motion
   * preference is actually honoured.
   */
  const handleNav = (href: string) => (event: React.MouseEvent) => {
    setIsOpen(false);
    if (pathname !== href) return;
    event.preventDefault();
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    window.scrollTo({ top: 0, behavior: reduced ? "auto" : "smooth" });
  };

  return (
    <header className="fixed inset-x-0 top-0 z-50 border-b border-rule bg-paper">
      {/* How far through the document you are — see .scroll-instrument. */}
      <span aria-hidden="true" className="scroll-instrument" />
      <Container size="wide">
        <nav aria-label="Main navigation" className="flex h-14 items-center justify-between">
          <Link
            href="/"
            onClick={handleNav("/")}
            className="flex items-center gap-2.5 font-sans text-base font-bold leading-none text-ink"
          >
            {/* The mark, inverted. Painted as a mask in currentColor rather
                than loaded as an image, so it inherits this link's ink and is
                right in both themes — see .site-mark in globals.css. */}
            <span aria-hidden="true" className="site-mark size-6 -scale-y-100" />
            {SITE_NAME}
          </Link>

          {/* lg, not md: at 768 the four links, the toggle and the button ran
              straight into the nameplate with no gap left between them. */}
          <div className="hidden items-center gap-6 lg:flex">
            {NAV_LINKS.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={handleNav(link.href)}
                className={cn(
                  "font-sans text-sm font-bold transition-colors",
                  isActive(link.href)
                    ? "text-accent underline decoration-2 underline-offset-4"
                    : "text-ink-soft hover:text-ink"
                )}
              >
                {link.label}
              </Link>
            ))}
            <ThemeToggle />
            <Button href="/contact" size="sm">
              Book a 30-minute call
            </Button>
          </div>

          <button
            type="button"
            className="cursor-pointer font-sans text-sm font-bold text-ink lg:hidden"
            aria-expanded={isOpen}
            onClick={() => setIsOpen(!isOpen)}
          >
            {isOpen ? "Close" : "Menu"}
          </button>
        </nav>
      </Container>

      {isOpen && (
        <div className="border-t border-rule bg-paper lg:hidden">
          <Container size="wide">
            <div className="flex flex-col gap-1 py-3">
              {NAV_LINKS.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={handleNav(link.href)}
                  className={cn(
                    "py-2 font-sans text-sm font-bold",
                    isActive(link.href) ? "text-accent" : "text-ink-soft"
                  )}
                >
                  {link.label}
                </Link>
              ))}
              <ThemeToggle className="py-2 text-left" />
              <div className="pt-2 pb-1">
                <Button href="/contact" size="md" className="w-full" onClick={() => setIsOpen(false)}>
                  Book a 30-minute call
                </Button>
              </div>
            </div>
          </Container>
        </div>
      )}
    </header>
  );
}
