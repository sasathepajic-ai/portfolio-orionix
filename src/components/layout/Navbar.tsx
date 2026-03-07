"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X, ChevronDown, ArrowRight } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { Container } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";
import { ThemeToggle } from "@/components/ui/ThemeToggle";
import { NAV_LINKS, SOLUTIONS, SITE_NAME } from "@/lib/constants";
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
  const [solutionsHovered, setSolutionsHovered] = useState(false);
  const [mobileSolutionsOpen, setMobileSolutionsOpen] = useState(false);
  const [hoveredNav, setHoveredNav] = useState<string | null>(null);
  const pathname = usePathname();

  useEffect(() => {
    const onScroll = () => setHasScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Close mobile solutions sub-menu when mobile menu closes
  const handleMobileClose = () => {
    setIsOpen(false);
    setMobileSolutionsOpen(false);
  };

  // Close mobile sub-menu when the main menu closes via hamburger
  const handleMenuToggle = () => {
    if (isOpen) setMobileSolutionsOpen(false);
    setIsOpen(!isOpen);
  };

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
              const isActive =
                link.href === "/solutions"
                  ? pathname.startsWith("/solutions")
                  : pathname === link.href;

              if (link.label === "Solutions") {
                return (
                  <div
                    key={link.href}
                    className="relative"
                    onMouseEnter={() => { setSolutionsHovered(true); setHoveredNav(link.href); }}
                    onMouseLeave={() => { setSolutionsHovered(false); setHoveredNav(null); }}
                  >
                    {hoveredNav === link.href && (
                      <motion.span
                        layoutId="nav-hover-pill"
                        className="absolute inset-0 rounded-lg bg-bg-alt/60"
                        initial={false}
                        transition={{ type: "spring" as const, stiffness: 400, damping: 38 }}
                      />
                    )}
                    <Link
                      href={link.href}
                      className={cn(
                        "relative z-10 flex items-center gap-1 px-4 py-2 text-sm font-medium rounded-lg transition-colors",
                        isActive
                          ? "text-text-primary"
                          : "text-text-secondary hover:text-text-primary"
                      )}
                    >
                      {link.label}
                      <ChevronDown
                        className={cn(
                          "w-3 h-3 transition-transform duration-200",
                          solutionsHovered && "rotate-180"
                        )}
                      />
                      {isActive && (
                        <motion.span
                          layoutId="nav-active-dot"
                          className="absolute bottom-0.5 left-1/2 -translate-x-1/2 w-1 h-1 rounded-full bg-accent"
                          transition={{ type: "spring", stiffness: 380, damping: 30 }}
                        />
                      )}
                    </Link>

                    <AnimatePresence>
                      {solutionsHovered && (
                        <motion.div
                          initial={{ opacity: 0, y: -6 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: -6 }}
                          transition={{ duration: 0.14, ease: "easeOut" }}
                          className="absolute top-full left-1/2 -translate-x-1/2 pt-2 z-50 w-64"
                        >
                          <div
                            className="rounded-xl border border-border-light p-1.5"
                            style={{
                              background: "var(--color-bg)",
                              boxShadow:
                                "0 8px 32px rgba(14,28,42,0.12), 0 2px 8px rgba(14,28,42,0.06)",
                            }}
                          >
                            {SOLUTIONS.map((solution) => (
                              <Link
                                key={solution.slug}
                                href={`/solutions/${solution.slug}`}
                                className={cn(
                                  "flex items-center justify-between px-3 py-2.5 rounded-lg text-sm transition-colors group/item",
                                  pathname === `/solutions/${solution.slug}`
                                    ? "text-text-primary bg-bg-alt"
                                    : "text-text-secondary hover:text-text-primary hover:bg-bg-alt/60"
                                )}
                              >
                                <span>{solution.title}</span>
                                <ArrowRight className="w-3 h-3 opacity-0 -translate-x-1 group-hover/item:opacity-40 group-hover/item:translate-x-0 transition-all duration-150" />
                              </Link>
                            ))}
                            <div className="mt-1 pt-1 border-t border-border-light">
                              <Link
                                href="/solutions"
                                className="flex items-center px-3 py-2 rounded-lg text-xs font-bold tracking-wider text-accent hover:bg-bg-alt/60 transition-colors"
                              >
                                View all solutions
                              </Link>
                            </div>
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                );
              }

              return (
                <div
                  key={link.href}
                  className="relative"
                  onMouseEnter={() => setHoveredNav(link.href)}
                  onMouseLeave={() => setHoveredNav(null)}
                >
                  {hoveredNav === link.href && (
                    <motion.span
                      layoutId="nav-hover-pill"
                      className="absolute inset-0 rounded-lg bg-bg-alt/60"
                      initial={false}
                      transition={{ type: "spring" as const, stiffness: 400, damping: 38 }}
                    />
                  )}
                  <Link
                    href={link.href}
                    className={cn(
                      "relative z-10 inline-flex items-center px-4 py-2 text-sm font-medium rounded-lg transition-colors",
                      isActive
                        ? "text-text-primary"
                        : "text-text-secondary hover:text-text-primary"
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
                </div>
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
            <motion.button
              className="p-2 rounded-lg text-text-secondary hover:text-text-primary hover:bg-bg-alt transition-colors"
              onClick={() => handleMenuToggle()}
              aria-label={isOpen ? "Close menu" : "Open menu"}
              aria-expanded={isOpen}
              whileTap={{ scale: 0.90 }}
              whileHover={{ scale: 1.08 }}
              transition={{ type: "spring" as const, stiffness: 400, damping: 17 }}
            >
              <AnimatePresence mode="wait" initial={false}>
                {isOpen ? (
                  <motion.span
                    key="close"
                    initial={{ rotate: -45, opacity: 0 }}
                    animate={{ rotate: 0, opacity: 1 }}
                    exit={{ rotate: 45, opacity: 0 }}
                    transition={{ duration: 0.15 }}
                    style={{ display: "flex" }}
                  >
                    <X className="w-5 h-5" />
                  </motion.span>
                ) : (
                  <motion.span
                    key="open"
                    initial={{ rotate: 45, opacity: 0 }}
                    animate={{ rotate: 0, opacity: 1 }}
                    exit={{ rotate: -45, opacity: 0 }}
                    transition={{ duration: 0.15 }}
                    style={{ display: "flex" }}
                  >
                    <Menu className="w-5 h-5" />
                  </motion.span>
                )}
              </AnimatePresence>
            </motion.button>
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
                {NAV_LINKS.map((link) => {
                  const isActive =
                    link.href === "/solutions"
                      ? pathname.startsWith("/solutions")
                      : pathname === link.href;

                  if (link.label === "Solutions") {
                    return (
                      <div key={link.href}>
                        <button
                          onClick={() => setMobileSolutionsOpen(!mobileSolutionsOpen)}
                          className={cn(
                            "w-full flex items-center justify-between px-4 py-3 text-sm font-medium rounded-lg transition-colors",
                            isActive
                              ? "text-text-primary bg-bg-alt"
                              : "text-text-secondary hover:text-text-primary hover:bg-bg-alt/60"
                          )}
                        >
                          Solutions
                          <ChevronDown
                            className={cn(
                              "w-4 h-4 transition-transform duration-200",
                              mobileSolutionsOpen && "rotate-180"
                            )}
                          />
                        </button>
                        <AnimatePresence>
                          {mobileSolutionsOpen && (
                            <motion.div
                              initial={{ opacity: 0, height: 0 }}
                              animate={{ opacity: 1, height: "auto" }}
                              exit={{ opacity: 0, height: 0 }}
                              transition={{ duration: 0.18, ease: "easeInOut" }}
                              className="overflow-hidden"
                            >
                              <div className="pl-4 pb-1 mt-0.5 flex flex-col gap-0.5">
                                {SOLUTIONS.map((solution) => (
                                  <Link
                                    key={solution.slug}
                                    href={`/solutions/${solution.slug}`}
                                    onClick={() => handleMobileClose()}
                                    className={cn(
                                      "flex items-center px-4 py-2.5 text-sm rounded-lg transition-colors",
                                      pathname === `/solutions/${solution.slug}`
                                        ? "text-text-primary bg-bg-alt"
                                        : "text-text-muted hover:text-text-primary hover:bg-bg-alt/60"
                                    )}
                                  >
                                    {solution.title}
                                  </Link>
                                ))}
                                <Link
                                  href="/solutions"
                                  onClick={() => handleMobileClose()}
                                  className="px-4 py-2 text-xs font-bold tracking-wider text-accent hover:bg-bg-alt/60 rounded-lg transition-colors"
                                >
                                  All Solutions
                                </Link>
                              </div>
                            </motion.div>
                          )}
                        </AnimatePresence>
                      </div>
                    );
                  }

                  return (
                    <Link
                      key={link.href}
                      href={link.href}
                      onClick={() => handleMobileClose()}
                      className={cn(
                        "px-4 py-3 text-sm font-medium rounded-lg transition-colors",
                        isActive
                          ? "text-text-primary bg-bg-alt"
                          : "text-text-secondary hover:text-text-primary hover:bg-bg-alt/60"
                      )}
                    >
                      {link.label}
                    </Link>
                  );
                })}
                <div className="pt-2 px-1 pb-1">
                  <Button
                    href="/contact"
                    variant="primary"
                    size="md"
                    className="w-full"
                    onClick={() => handleMobileClose()}
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
