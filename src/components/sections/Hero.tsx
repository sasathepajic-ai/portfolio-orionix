"use client";

import { Container } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";
import { FadeIn } from "@/components/ui/SectionHeading";
import { ArrowRight, CheckCircle2, Lightbulb, Sparkles, TrendingUp } from "lucide-react";
import { motion } from "framer-motion";

const metrics = [
  { label: "Decision Speed", delta: "+34%", width: "34%", color: "var(--color-teal)" },
  { label: "Manual Workload", delta: "−61%", width: "61%", color: "var(--color-accent)" },
  { label: "Data Visibility", delta: "+89%", width: "89%", color: "var(--color-blue-muted)" },
];

function InsightCard() {
  return (
    <div className="relative py-10 px-4">
      {/* Top floating chip */}
      <motion.div
        initial={{ opacity: 0, x: 10, y: -6 }}
        animate={{ opacity: 1, x: 0, y: 0 }}
        transition={{ duration: 0.55, delay: 1.3, ease: [0.21, 0.47, 0.32, 0.98] }}
        className="absolute -top-2 right-2 z-20 flex items-center gap-2.5 rounded-2xl bg-bg-card border border-border-light px-3.5 py-2.5"
        style={{ boxShadow: "var(--shadow-md)" }}
      >
        <div className="w-7 h-7 rounded-lg bg-accent/10 flex items-center justify-center shrink-0">
          <TrendingUp className="w-3.5 h-3.5 text-accent" />
        </div>
        <div>
          <p className="text-xs font-bold text-text-primary leading-none mb-0.5">AI strategy live</p>
          <p className="text-[11px] text-text-muted">2 new use cases shipped</p>
        </div>
      </motion.div>

      {/* Main dashboard card */}
      <motion.div
        initial={{ opacity: 0, y: 28 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.75, delay: 0.5, ease: [0.21, 0.47, 0.32, 0.98] }}
        className="relative w-full rounded-2xl overflow-hidden"
        style={{
          background: "var(--color-navy)",
          boxShadow: "0 0 0 1px rgba(255,255,255,0.07)",
        }}
      >
        <div className="p-6">
          {/* Window chrome */}
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-1.5">
              <div className="w-2.5 h-2.5 rounded-full" style={{ background: "rgba(255,255,255,0.16)" }} />
              <div className="w-2.5 h-2.5 rounded-full" style={{ background: "rgba(255,255,255,0.16)" }} />
              <div className="w-2.5 h-2.5 rounded-full" style={{ background: "rgba(255,255,255,0.16)" }} />
            </div>
            <div className="flex items-center gap-1.5">
              <span className="inline-block w-1.5 h-1.5 rounded-full bg-teal" />
              <span
                className="text-[10px] font-semibold uppercase tracking-widest"
                style={{ color: "rgba(255,255,255,0.3)" }}
              >
                Live
              </span>
            </div>
          </div>

          <p
            className="text-[10px] font-bold uppercase tracking-widest mb-5"
            style={{ color: "rgba(255,255,255,0.28)" }}
          >
            Ops Intelligence
          </p>

          {/* Metrics */}
          <div className="space-y-4 mb-6">
            {metrics.map((m, i) => (
              <div key={m.label}>
                <div className="flex items-center justify-between mb-1.5">
                  <span className="text-xs" style={{ color: "rgba(255,255,255,0.44)" }}>
                    {m.label}
                  </span>
                  <span className="text-xs font-bold text-white">{m.delta}</span>
                </div>
                <div
                  className="h-1.5 rounded-full overflow-hidden"
                  style={{ background: "rgba(255,255,255,0.07)" }}
                >
                  <motion.div
                    className="h-full rounded-full"
                    style={{ background: m.color }}
                    initial={{ width: 0 }}
                    animate={{ width: m.width }}
                    transition={{ duration: 0.9, delay: 0.9 + i * 0.15, ease: "easeOut" }}
                  />
                </div>
              </div>
            ))}
          </div>

          {/* Insight box */}
          <div
            className="rounded-xl p-4"
            style={{
              background: "rgba(255,255,255,0.05)",
              border: "1px solid rgba(255,255,255,0.07)",
            }}
          >
            <div className="flex items-start gap-3">
              <div
                className="w-7 h-7 rounded-lg flex items-center justify-center shrink-0"
                style={{ background: "rgba(224,123,60,0.2)" }}
              >
                <Lightbulb className="w-3.5 h-3.5 text-accent" />
              </div>
              <div>
                <p className="text-xs font-bold text-white mb-1">Today&apos;s Insight</p>
                <p
                  className="text-[11px] leading-relaxed"
                  style={{ color: "rgba(255,255,255,0.44)" }}
                >
                  Automating weekly report compilation could save your team 6 hours per
                  week.
                </p>
              </div>
            </div>
          </div>
        </div>
      </motion.div>

      {/* Bottom floating chip */}
      <motion.div
        initial={{ opacity: 0, x: -10, y: 6 }}
        animate={{ opacity: 1, x: 0, y: 0 }}
        transition={{ duration: 0.55, delay: 1.5, ease: [0.21, 0.47, 0.32, 0.98] }}
        className="absolute -bottom-2 -left-2 z-20 flex items-center gap-2.5 rounded-2xl bg-bg-card border border-border-light px-3.5 py-2.5"
        style={{ boxShadow: "var(--shadow-md)" }}
      >
        <div className="w-7 h-7 rounded-lg bg-teal/10 flex items-center justify-center shrink-0">
          <CheckCircle2 className="w-3.5 h-3.5 text-teal" />
        </div>
        <div>
          <p className="text-xs font-bold text-text-primary leading-none mb-0.5">
            3 workflows automated
          </p>
          <p className="text-[11px] text-text-muted">Deployed last week</p>
        </div>
      </motion.div>
    </div>
  );
}

export function Hero() {
  return (
    <section className="relative min-h-screen flex items-center overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 pointer-events-none select-none" aria-hidden="true">
        <div
          className="absolute inset-0 opacity-[0.038]"
          style={{
            backgroundImage:
              "radial-gradient(var(--color-dot-grid) 1.2px, transparent 1.2px)",
            backgroundSize: "26px 26px",
          }}
        />

      </div>

      <Container size="wide" className="relative pt-28 md:pt-36 pb-20">
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_420px] gap-12 lg:gap-20 items-center">
          {/* Left: text content */}
          <div>
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
                      animate={{ pathLength: 1, opacity: 1 }}
                      transition={{ duration: 0.7, delay: 0.55, ease: "easeInOut" }}
                    />
                  </svg>
                </span>
                .
              </h1>
            </FadeIn>

            <FadeIn delay={0.24}>
              <p className="text-lg md:text-xl text-text-secondary leading-[1.7] mb-10 max-w-[50ch] text-pretty">
                Pragmatic Labs AI helps businesses turn complex artificial intelligence
                into practical tools that solve real operational problems.
              </p>
            </FadeIn>

            <FadeIn delay={0.32}>
              <div className="flex flex-col sm:flex-row gap-3 mb-12">
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
              className="flex items-stretch pt-8 border-t border-border-light"
              initial="hidden"
              animate="visible"
              variants={{
                hidden: {},
                visible: { transition: { staggerChildren: 0.1, delayChildren: 0.44 } },
              }}
            >
              {[
                { value: "3+", label: "Organizations" },
                { value: "4", label: "Core solutions" },
                { value: "Zero", label: "Complexity added" },
              ].map((stat, i) => (
                <motion.div
                  key={stat.label}
                  className={`flex-1 ${i > 0 ? "pl-1.5 sm:pl-6 border-l border-border" : "pr-3 sm:pr-6"}`}
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

          {/* Right: visual card — desktop only */}
          <div className="hidden lg:block">
            <InsightCard />
          </div>
        </div>
      </Container>
    </section>
  );
}

