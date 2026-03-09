"use client";

import { useEffect, useRef } from "react";
import { Container } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";
import { FadeIn } from "@/components/ui/SectionHeading";
import { ArrowRight, Sparkles } from "lucide-react";
import { motion } from "framer-motion";

// ─── 3D Atom Background ──────────────────────────────────────

interface OrbitConfig {
  radiusFrac:  number;
  inclination: number;
  lonBase:     number;
  lonSpeed:    number;
  elSpeed:     number;
  wobbleAmp:   number;
  wobbleFreq:  number;
  electrons:   { phase: number; r: number; colorKey: "accent" | "blue" | "soft" }[];
  lineOpacity: number;
}

const ORBITS: OrbitConfig[] = [
  {
    radiusFrac: 0.38, inclination: Math.PI / 5,       lonBase: 0,               lonSpeed:  0.042,
    elSpeed: 0.38, wobbleAmp: 0.20, wobbleFreq: 2.3,
    electrons: [{ phase: 0,                    r: 2.5, colorKey: "accent" },
                { phase: Math.PI,              r: 2.0, colorKey: "soft"   }],
    lineOpacity: 0.12,
  },
  {
    radiusFrac: 0.32, inclination: Math.PI * 2 / 5,   lonBase: Math.PI / 4,     lonSpeed: -0.028,
    elSpeed: 0.52, wobbleAmp: 0.15, wobbleFreq: 3.1,
    electrons: [{ phase: 1.2,                  r: 2.5, colorKey: "blue"   }],
    lineOpacity: 0.10,
  },
  {
    radiusFrac: 0.44, inclination: Math.PI * 5 / 11,  lonBase: Math.PI * 2 / 3, lonSpeed:  0.035,
    elSpeed: 0.36, wobbleAmp: 0.25, wobbleFreq: 1.8,
    electrons: [{ phase: 2.4,                  r: 2.2, colorKey: "soft"   },
                { phase: 2.4 + Math.PI * 2/3,  r: 1.8, colorKey: "blue"   }],
    lineOpacity: 0.11,
  },
  {
    radiusFrac: 0.28, inclination: Math.PI * 5 / 12,  lonBase: Math.PI,         lonSpeed: -0.055,
    elSpeed: 0.62, wobbleAmp: 0.18, wobbleFreq: 2.7,
    electrons: [{ phase: 0.8,                  r: 2.2, colorKey: "accent" }],
    lineOpacity: 0.09,
  },
  {
    radiusFrac: 0.36, inclination: Math.PI / 8,       lonBase: Math.PI * 5 / 4, lonSpeed:  0.022,
    elSpeed: 0.32, wobbleAmp: 0.22, wobbleFreq: 2.0,
    electrons: [{ phase: 3.0,                  r: 2.0, colorKey: "soft"   },
                { phase: 3.0 + Math.PI,        r: 2.2, colorKey: "accent" }],
    lineOpacity: 0.10,
  },
  {
    radiusFrac: 0.45, inclination: 2 * Math.PI / 3,   lonBase: Math.PI / 3,     lonSpeed:  0.038,
    elSpeed: 0.44, wobbleAmp: 0.16, wobbleFreq: 3.4,
    electrons: [{ phase: 1.6,                  r: 2.4, colorKey: "blue"   }],
    lineOpacity: 0.11,
  },
  {
    radiusFrac: 0.25, inclination: Math.PI * 3 / 7,   lonBase: Math.PI * 3 / 2, lonSpeed: -0.048,
    elSpeed: 0.70, wobbleAmp: 0.20, wobbleFreq: 2.5,
    electrons: [{ phase: 0.4,                  r: 1.8, colorKey: "soft"   }],
    lineOpacity: 0.08,
  },
];

// Colour palettes — RGB components used for canvas rgba() strings
const LIGHT = { r: "10,12,16",    accent: "#cc493c", blue: "#5c8cb8", sR: "71,98,120",   bg: "249,248,245" };
const DARK  = { r: "237,233,225", accent: "#d95f52", blue: "#80aed0", sR: "154,163,168", bg: "14,14,14"    };

/**
 * Project a point at parametric angle `theta` on an orbit ring to 2-D screen
 * space. Inclination tilts the orbital plane around the X axis; longitude
 * precesses it around the Y axis to produce the 3-D rotation feel.
 */
function project(
  theta:       number,
  radius:      number,
  inclination: number,
  longitude:   number,
  cx:          number,
  cy:          number,
  fov:         number,
): [number, number, number] {
  const x0 = radius * Math.cos(theta);
  const y0 = radius * Math.sin(theta);
  // tilt around X
  const y1 =  y0 * Math.cos(inclination);
  const z1 =  y0 * Math.sin(inclination);
  // precess around Y
  const x2 =  x0 * Math.cos(longitude) + z1 * Math.sin(longitude);
  const z2 = -x0 * Math.sin(longitude) + z1 * Math.cos(longitude);
  // perspective divide
  const p  = fov / (fov + z2 * 0.35);
  return [cx + x2 * p, cy + y1 * p, z2];
}

function AtomCanvas() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animRef   = useRef<number>(0);
  const t0Ref     = useRef<number>(0);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const dpr = Math.min(window.devicePixelRatio || 1, 2);

    function resize() {
      const W = window.innerWidth;
      const H = window.innerHeight;
      canvas!.width  = W * dpr;
      canvas!.height = H * dpr;
      canvas!.style.width  = W + "px";
      canvas!.style.height = H + "px";
      ctx!.setTransform(dpr, 0, 0, dpr, 0, 0);
    }
    resize();

    window.addEventListener("resize", resize);
    const ro = new ResizeObserver(resize);
    ro.observe(canvas);

    let dark = document.documentElement.classList.contains("dark");
    const mo = new MutationObserver(() => {
      dark = document.documentElement.classList.contains("dark");
    });
    mo.observe(document.documentElement, { attributes: true, attributeFilter: ["class"] });

    const N = 100; // segments per orbital ring

    function frame(ts: number) {
      if (!canvas || !ctx) return;
      if (!t0Ref.current) t0Ref.current = ts;
      const t    = (ts - t0Ref.current) / 1000;
      const W    = canvas.width  / dpr;
      const H    = canvas.height / dpr;
      const cx   = W / 2;
      const cy   = H / 2;
      const fov  = Math.max(W, H) * 1.8;
      const base = Math.max(W, H) * 0.85;

      ctx.clearRect(0, 0, W, H);

      const C = dark ? DARK : LIGHT;

      // Lines fade to invisible inside innerFade, reach full opacity at outerFade
      const innerFade = base * 0.16;
      const outerFade = base * 0.44;

      for (const o of ORBITS) {
        const lon = o.lonBase + t * o.lonSpeed;
        const R   = base * o.radiusFrac;

        // ── orbital ring — per-segment opacity fades toward center ────────
        ctx.lineWidth = 0.8;
        for (let i = 0; i < N; i++) {
          const theta0 = (i       / N) * Math.PI * 2;
          const theta1 = ((i + 1) / N) * Math.PI * 2;
          const [px0, py0] = project(theta0, R, o.inclination, lon, cx, cy, fov);
          const [px1, py1] = project(theta1, R, o.inclination, lon, cx, cy, fov);
          const mx = (px0 + px1) * 0.5 - cx;
          const my = (py0 + py1) * 0.5 - cy;
          const dist = Math.sqrt(mx * mx + my * my);
          const frac = Math.max(0, Math.min(1, (dist - innerFade) / (outerFade - innerFade)));
          const fade = frac * frac * (3 - 2 * frac); // smoothstep
          const segAlpha = o.lineOpacity * fade;
          if (segAlpha < 0.003) continue;
          ctx.beginPath();
          ctx.moveTo(px0, py0);
          ctx.lineTo(px1, py1);
          ctx.strokeStyle = `rgba(${C.r},${segAlpha.toFixed(4)})`;
          ctx.stroke();
        }

        // ── electrons ─────────────────────────────────────
        for (const el of o.electrons) {
          // non-linear motion: base orbit + harmonic wobble → organic feel
          const wobble = o.wobbleAmp * Math.sin(o.wobbleFreq * t * o.elSpeed + el.phase * 1.7);
          const angle  = t * o.elSpeed + el.phase + wobble;
          const [px, py, pz] = project(angle, R, o.inclination, lon, cx, cy, fov);

          // depth scaling: electrons closer to the viewer appear larger/brighter
          const depthT = Math.max(0, Math.min(1, (pz / base + 1) * 0.5));
          const elR    = el.r * (0.65 + 0.40 * depthT);
          const dx = px - cx, dy = py - cy;
          const distEl = Math.sqrt(dx * dx + dy * dy);
          const fracEl = Math.max(0, Math.min(1, (distEl - innerFade) / (outerFade - innerFade)));
          const fadeEl = fracEl * fracEl * (3 - 2 * fracEl);
          const alpha  = (0.28 + 0.22 * depthT) * fadeEl;

          ctx.beginPath();
          ctx.arc(px, py, elR, 0, Math.PI * 2);
          if (el.colorKey === "accent") {
            ctx.fillStyle   = C.accent;
            ctx.globalAlpha = alpha;
          } else if (el.colorKey === "blue") {
            ctx.fillStyle   = C.blue;
            ctx.globalAlpha = alpha;
          } else {
            ctx.fillStyle   = `rgba(${C.sR},${alpha.toFixed(2)})`;
            ctx.globalAlpha = 1;
          }
          ctx.fill();
          ctx.globalAlpha = 1;
        }
      }

      animRef.current = requestAnimationFrame(frame);
    }

    animRef.current = requestAnimationFrame(frame);

    return () => {
      cancelAnimationFrame(animRef.current);
      window.removeEventListener("resize", resize);
      ro.disconnect();
      mo.disconnect();
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 w-full h-full"
      aria-hidden="true"
      style={{ display: "block" }}
    />
  );
}

// ─── Hero ─────────────────────────────────────────────────────

export function Hero() {
  return (
    <section className="relative min-h-screen flex items-center overflow-hidden">
      {/* Background — 3D atom visualization */}
      <div className="absolute inset-0 pointer-events-none select-none overflow-hidden" aria-hidden="true">
        <AtomCanvas />
      </div>

      <Container size="wide" className="relative pt-28 md:pt-36 pb-20">
        <div className="flex flex-col items-center text-center">
            <FadeIn delay={0.08}>
              <div
                className="inline-flex items-center gap-2 rounded-full px-4 py-1.5 mb-8"
                style={{
                  background: "var(--color-bg-alt)",
                }}
              >
                <Sparkles className="w-3.5 h-3.5 text-accent" />
                <span className="text-[10px] md:text-[11px] font-bold uppercase tracking-widest text-text-secondary">
                  Practical AI for Business
                </span>
              </div>
            </FadeIn>

            <FadeIn delay={0.16}>
              <h1
                className="font-bold text-text-primary tracking-tight mb-6"
                style={{ fontSize: "clamp(2.25rem, 5vw, 4.5rem)", lineHeight: 1.06, letterSpacing: "-0.038em" }}
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
              <p className="text-sm md:text-lg text-text-secondary leading-[1.7] mb-10 max-w-[60ch] mx-auto text-pretty [text-align-last:center]">
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
                <Button href="/solutions" variant="outline" size="xl" className="border md:border-2" style={{ background: "var(--color-bg)" }}>
                  Explore Solutions
                </Button>
              </div>
            </FadeIn>

            <motion.div
              className="grid grid-cols-3 gap-0 pt-8 w-full max-w-xl mx-auto text-center"
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

