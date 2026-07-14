"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Container } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";
import { NAV_LINKS, SITE_NAME } from "@/lib/constants";
import { cn } from "@/lib/utils";

/**
 * A thin paper band: compact nameplate left, section links right. Always
 * solid (one canvas, no transparent-at-top tricks). Mobile menu is a plain
 * word — "Menu"/"Close" — not an icon.
 */
export function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();

  const isActive = (href: string) =>
    href === "/solutions" ? pathname.startsWith("/solutions") : pathname === href;

  return (
    <header className="fixed inset-x-0 top-0 z-50 border-b border-rule bg-paper">
      <Container size="wide">
        <nav aria-label="Main navigation" className="flex h-14 items-center justify-between">
          <Link
            href="/"
            className="flex items-center gap-2.5 font-sans text-base font-bold leading-none text-ink"
          >
            {/* The mark, inverted — see public/logo.svg. */}
            <Image
              src="/logo.svg"
              alt=""
              width={24}
              height={24}
              priority
              className="-scale-y-100"
            />
            {SITE_NAME}
          </Link>

          <div className="hidden items-center gap-6 md:flex">
            {NAV_LINKS.map((link) => (
              <Link
                key={link.href}
                href={link.href}
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
            <Button href="/contact" size="sm">
              Book a 30-minute call
            </Button>
          </div>

          <button
            type="button"
            className="cursor-pointer font-sans text-sm font-bold text-ink md:hidden"
            aria-expanded={isOpen}
            onClick={() => setIsOpen(!isOpen)}
          >
            {isOpen ? "Close" : "Menu"}
          </button>
        </nav>
      </Container>

      {isOpen && (
        <div className="border-t border-rule bg-paper md:hidden">
          <Container size="wide">
            <div className="flex flex-col gap-1 py-3">
              {NAV_LINKS.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() => setIsOpen(false)}
                  className={cn(
                    "py-2 font-sans text-sm font-bold",
                    isActive(link.href) ? "text-accent" : "text-ink-soft"
                  )}
                >
                  {link.label}
                </Link>
              ))}
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
