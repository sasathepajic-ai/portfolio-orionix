"use client";

import Image from "next/image";
import Link from "next/link";
import { Container } from "@/components/ui/Container";
import { NAV_LINKS, SITE_NAME } from "@/lib/constants";

function FooterLogo() {
  return (
        <Image
          src="/logo.svg"
          alt="Pragmatic Labs logo"
          width={32}
          height={32}
          className="shrink-0"
          style={{ transform: "scaleY(-1)", filter: "invert(1)" }}
          aria-hidden
        />
    );
}

export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer style={{ background: "var(--color-navy)", borderTop: "1px solid rgba(255,255,255,0.08)" }} role="contentinfo">
      <Container size="wide" className="py-16 md:py-20">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-12 md:gap-8">
          {/* Brand */}
          <div className="md:col-span-5">
            <Link href="/" className="flex items-center gap-2.5 mb-5">
              <FooterLogo />
              <span className="font-heading font-bold text-[1.05rem] text-white tracking-tight">
                {SITE_NAME}
              </span>
            </Link>
            <p
              className="leading-relaxed max-w-sm text-sm mb-6"
              style={{ color: "rgba(255,255,255,0.48)" }}
            >
              Transforming complex AI capabilities into simple, practical tools that help
              businesses operate smarter.
            </p>
            <p
              className="text-xs font-bold uppercase tracking-widest"
              style={{ color: "rgba(255,255,255,0.18)" }}
            >
              AI built for real work.
            </p>
          </div>

          {/* Navigation */}
          <div className="md:col-span-3">
            <h3
              className="text-[11px] font-bold uppercase tracking-wider mb-5"
              style={{ color: "rgba(255,255,255,0.32)" }}
            >
              Navigation
            </h3>
            <ul className="space-y-3">
              {NAV_LINKS.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="group relative inline-block text-sm font-medium text-white/50 hover:text-white/90 transition-colors duration-200"
                  >
                    {link.label}
                    <span className="absolute -bottom-0.5 left-0 h-px w-0 bg-white/30 transition-all duration-200 group-hover:w-full" />
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div className="md:col-span-4">
            <h3
              className="text-[11px] font-bold uppercase tracking-wider mb-5"
              style={{ color: "rgba(255,255,255,0.32)" }}
            >
              Get in Touch
            </h3>
            <p
              className="text-sm leading-relaxed mb-5"
              style={{ color: "rgba(255,255,255,0.48)" }}
            >
              Ready to explore how AI can work for your business? We&apos;d love to hear
              from you.
            </p>
            <Link
              href="/contact"
              className="group inline-flex items-center text-sm font-bold text-accent hover:text-accent-hover transition-colors"
            >
              Start a conversation
              <svg
                className="ml-1.5 w-4 h-4 transition-transform duration-200 group-hover:translate-x-1"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M17 8l4 4m0 0l-4 4m4-4H3"
                />
              </svg>
            </Link>
          </div>
        </div>

        {/* Bottom bar */}
        <div
          className="mt-16 pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 border-t"
          style={{ borderColor: "rgba(255,255,255,0.08)" }}
        >
          <p className="text-xs" style={{ color: "rgba(255,255,255,0.3)" }}>
            &copy; {currentYear} {SITE_NAME}. All rights reserved.
          </p>
          <p className="text-xs" style={{ color: "rgba(255,255,255,0.2)" }}>
            Practical AI for real business work.
          </p>
        </div>
      </Container>
    </footer>
  );
}
