"use client";

import { Container } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";
import { FadeIn } from "@/components/ui/SectionHeading";
import { ArrowRight, Sparkles } from "lucide-react";
import { motion } from "framer-motion";

export function Hero() {
  return (
    <section className="relative min-h-screen flex items-center overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 pointer-events-none select-none overflow-hidden hidden lg:block" aria-hidden="true">


        {/* Dotted Circles as true dots */}
        {[
          {
            key: 'A',
            numDots: 160,
            r: 95,
            blur: 7,
            width: 500,
            height: 500,
            left: -165,
            top: -300,
            rotate: 360,
            duration: 200,
            dotRadius: 1.1,
            color: 'rgba(204,73,60,0.10)',
            color2: 'rgba(230,105,72,0.38)',
            dotRadius2: 0.3
          },
          {
            key: 'B',
            numDots: 200,
            r: 95,
            blur: 9,
            width: 1250,
            height: 1250,
            left: 'calc(68vw - 600px)',
            top: 'calc(50vh - 10vw + 500px)',
            rotate: -360,
            duration: 350,
            dotRadius: 1.1,
            color: 'rgba(204,73,60,0.09)',
            color2: 'rgba(230,105,72,0.35)',
            dotRadius2: 0.3
          },
          {
            key: 'C',
            numDots: 240,
            r: 95,
            blur: 7,
            width: 1500,
            height: 1500,
            left: 'calc(82vw - 200px)',
            top: 'calc(22vh - 5vw + 100px)',
            rotate: 360,
            duration: 500,
            dotRadius: 1.1,
            color: 'rgba(204,73,60,0.09)',
            color2: 'rgba(230,105,72,0.35)',
            dotRadius2: 0.3
          }
        ].map(({ key, numDots, r, blur, width, height, left, top, rotate, duration, dotRadius, color, color2, dotRadius2 }) => (
          <motion.svg
            key={key}
            viewBox="0 0 200 200"
            style={{ position: "absolute", width, height, left, top, overflow: "visible" }}
            animate={{ rotate }}
            transition={{ duration, repeat: Infinity, ease: "linear" }}
          >
            {/* Blurred dots */}
            <g style={{ filter: `blur(${blur}px)` }}>
              {Array.from({ length: numDots }).map((_, i) => {
                const angle = (2 * Math.PI * i) / numDots;
                const cx = 100 + r * Math.cos(angle);
                const cy = 100 + r * Math.sin(angle);
                return <circle key={i} cx={cx} cy={cy} r={dotRadius} fill={color} />;
              })}
            </g>
            {/* Sharp dots */}
            {Array.from({ length: numDots }).map((_, i) => {
              const angle = (2 * Math.PI * i) / numDots;
              const cx = 100 + r * Math.cos(angle);
              const cy = 100 + r * Math.sin(angle);
              return <circle key={i} cx={cx} cy={cy} r={dotRadius2} fill={color2} />;
            })}
          </motion.svg>
        ))}

      </div>

      <Container size="wide" className="relative pt-28 md:pt-36 pb-20">
        <div className="flex flex-col items-center text-center">
            <FadeIn delay={0.08}>
              <div
                className="inline-flex items-center gap-2 rounded-full px-4 py-1.5 mb-8"
                style={{
                  background: "var(--color-ui-badge-bg)",
                  border: "1px solid var(--color-ui-badge-border)",
                }}
              >
                <Sparkles className="w-3.5 h-3.5 text-accent" />
                <span className="text-[11px] font-bold uppercase tracking-widest text-text-secondary">
                  Practical AI for Business
                </span>
              </div>
            </FadeIn>

            <FadeIn delay={0.16}>
              <h1
                className="font-bold text-text-primary tracking-tight mb-6"
                style={{ fontSize: "clamp(2.75rem, 5vw, 4.5rem)", lineHeight: 1.06, letterSpacing: "-0.038em" }}
              >
                AI built for{" "}
                <span className="relative inline-block">
                  real work
                  <svg
                    aria-hidden="true"
                    viewBox="0 0 220 14"
                    preserveAspectRatio="none"
                    className="absolute -bottom-0.5 left-0 w-full"
                    style={{ height: "11px" }}
                  >
                    <motion.path
                      d="M3 10 Q60 3 110 9 Q162 15 217 7"
                      stroke="var(--color-accent)"
                      strokeWidth="3.5"
                      fill="none"
                      strokeLinecap="round"
                      initial={{ pathLength: 0, opacity: 0 }}
                      animate={{
                        pathLength: 1,
                        opacity: 1,
                        d: [
                          "M3 10 Q60 3 110 9 Q162 15 217 7",
                          "M3 9 Q60 14 110 8 Q162 3 217 10",
                          "M3 11 Q60 4 110 10 Q162 14 217 8",
                          "M3 10 Q60 3 110 9 Q162 15 217 7",
                        ],
                      }}
                      transition={{
                        pathLength: { duration: 0.7, delay: 0.55, ease: "easeInOut" },
                        opacity: { duration: 0.4, delay: 0.55 },
                        d: { duration: 4, repeat: Infinity, ease: "easeInOut", delay: 1.3, repeatType: "loop" as const },
                      }}
                    />
                  </svg>
                </span>
                .
              </h1>
            </FadeIn>

            <FadeIn delay={0.24}>
              <p className="text-lg md:text-xl text-text-secondary leading-[1.7] mb-10 max-w-[50ch] mx-auto text-pretty">
                Most AI tools ask your team to change how they work. We build tools that
                fit the way your team already operates — using your data, inside your systems.
              </p>
            </FadeIn>

            <FadeIn delay={0.32}>
              <div className="flex flex-col sm:flex-row gap-3 mb-12 justify-center">
                <Button href="/contact" variant="primary" size="xl">
                  Talk to Us
                  <ArrowRight className="ml-2 w-4 h-4 transition-transform duration-200 group-hover:translate-x-1" />
                </Button>
                <Button href="/solutions" variant="outline" size="xl">
                  Explore Solutions
                </Button>
              </div>
            </FadeIn>

            <motion.div
              className="grid grid-cols-3 gap-0 pt-8 border-t border-border-light w-full max-w-xl mx-auto text-center"
              initial="hidden"
              animate="visible"
              variants={{
                hidden: {},
                visible: { transition: { staggerChildren: 0.1, delayChildren: 0.44 } },
              }}
            >
              {[
                { value: "3+", label: "Organizations" },
                { value: "4", label: "Solutions" },
                { value: "Zero", label: "New complexity" },
              ].map((stat, i) => (
                <motion.div
                  key={stat.label}
                  className={`flex flex-col items-center justify-center px-2 ${i > 0 ? "border-l border-border" : ""}`}
                  variants={{
                    hidden: { opacity: 0, y: 10 },
                    visible: { opacity: 1, y: 0, transition: { duration: 0.4, ease: [0.21, 0.47, 0.32, 0.98] } },
                  }}
                >
                  <p className="text-[1.625rem] font-bold text-text-primary leading-none mb-1">
                    {stat.value}
                  </p>
                  <p className="text-xs font-medium text-text-muted">{stat.label}</p>
                </motion.div>
              ))}
            </motion.div>
        </div>
      </Container>
    </section>
  );
}

