"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { Container } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";
import { ThemeToggle } from "@/components/ui/ThemeToggle";
import { NAV_LINKS, SITE_NAME } from "@/lib/constants";
import { cn } from "@/lib/utils";

const MotionLogoLink = motion(Link);

const logoMarkVariants = {
  initial: { scaleY: -1, rotate: 0, scale: 1 },
  hover: {
    scaleY: -1,
    rotate: -12,
    scale: 1.18,
    transition: { type: "spring" as const, stiffness: 360, damping: 14 },
  },
};

const logoTextVariants = {
  initial: { x: 0, opacity: 1 },
  hover: {
    x: 3,
    transition: { type: "spring" as const, stiffness: 360, damping: 22, delay: 0.03 },
  },
};

function LogoMark() {
  return (
    <motion.div variants={logoMarkVariants} className="shrink-0">
      <Image
        src="/logo.svg"
        alt="Pragmatic Labs logo"
        width={32}
        height={32}
        className="dark:invert"
        aria-hidden
      />
    </motion.div>
  );
}

export function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [hasScrolled, setHasScrolled] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const onScroll = () => setHasScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-all duration-300",
        hasScrolled
          ? "bg-bg/90 backdrop-blur-xl border-b border-border-light"
          : "bg-transparent"
      )}
      style={hasScrolled ? { boxShadow: "0 1px 0 var(--color-border-light), 0 4px 16px rgba(14,28,42,0.04)" } : {}}
    >
      <Container size="wide">
        <motion.nav
          className="flex items-center justify-between"
          style={{ height: "68px" }}
          aria-label="Main navigation"
          initial={{ opacity: 0, y: -8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, ease: [0.21, 0.47, 0.32, 0.98] }}
        >
          {/* Logo */}
          <MotionLogoLink
            href="/"
            className="flex items-center gap-2.5"
            initial="initial"
            whileHover="hover"
            animate="initial"
          >
            <LogoMark />
            <motion.span
              variants={logoTextVariants}
              className="font-heading font-bold text-[1.05rem] text-text-primary tracking-tight"
            >
              {SITE_NAME}
            </motion.span>
          </MotionLogoLink>

          {/* Desktop nav */}
          <div className="hidden md:flex items-center gap-0.5">
            {NAV_LINKS.map((link) => {
              const isActive = pathname === link.href;
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className={cn(
                    "relative px-4 py-2 text-sm font-medium rounded-lg transition-colors",
                    isActive
                      ? "text-text-primary"
                      : "text-text-secondary hover:text-text-primary hover:bg-bg-alt/60"
                  )}
                >
                  {link.label}
                  {isActive && (
                    <motion.span
                      layoutId="nav-active-dot"
                      className="absolute bottom-0.5 left-1/2 -translate-x-1/2 w-1 h-1 rounded-full bg-accent"
                      transition={{ type: "spring", stiffness: 380, damping: 30 }}
                    />
                  )}
                </Link>
              );
            })}
          </div>

          {/* Desktop CTA */}
          <div className="hidden md:flex items-center gap-2">
            <ThemeToggle />
            <Button href="/contact" variant="primary" size="sm">
              Talk to Us
            </Button>
          </div>

          {/* Mobile controls */}
          <div className="md:hidden flex items-center gap-1">
            <ThemeToggle />
            <button
              className="p-2 rounded-lg text-text-secondary hover:text-text-primary hover:bg-bg-alt transition-colors"
              onClick={() => setIsOpen(!isOpen)}
              aria-label={isOpen ? "Close menu" : "Open menu"}
              aria-expanded={isOpen}
            >
            {isOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </motion.nav>
      </Container>

      {/* Mobile menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.22, ease: "easeInOut" }}
            className="md:hidden bg-bg/96 backdrop-blur-xl border-b border-border-light overflow-hidden"
          >
            <Container className="py-3">
              <div className="flex flex-col gap-0.5">
                {NAV_LINKS.map((link) => (
                  <Link
                    key={link.href}
                    href={link.href}
                    onClick={() => setIsOpen(false)}
                    className={cn(
                      "px-4 py-3 text-sm font-medium rounded-lg transition-colors",
                      pathname === link.href
                        ? "text-text-primary bg-bg-alt"
                        : "text-text-secondary hover:text-text-primary hover:bg-bg-alt/60"
                    )}
                  >
                    {link.label}
                  </Link>
                ))}
                <div className="pt-2 px-1 pb-1">
                  <Button
                    href="/contact"
                    variant="primary"
                    size="md"
                    className="w-full"
                    onClick={() => setIsOpen(false)}
                  >
                    Talk to Us
                  </Button>
                </div>
              </div>
            </Container>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
