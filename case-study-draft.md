# Case Study: Pragmatic Labs AI Website

---

## Overview

**Project:** Marketing website for Pragmatic Labs AI  
**URL:** [pragmaticlabs.ai](https://pragmaticlabs.ai)  
**Stack:** Next.js 16 · React 19 · TypeScript · Tailwind CSS v4 · Framer Motion  
**Role:** Full-stack design & development  

---

## The Challenge

Pragmatic Labs AI offers AI consulting services — assistants, workflow automation, business intelligence, and strategy — to mid-sized businesses. The challenge wasn't building a generic agency site. It was communicating a specific kind of credibility: technically rigorous, but approachable enough that non-technical buyers would immediately trust and engage with the work.

The site needed to feel sharp and considered without relying on the vague visual language that dominates "AI company" design — no generic gradient blobs, no overused neural-network grid patterns. The design had to earn attention by being specific.

Three goals shaped every decision:

1. **Make the value immediately legible.** A visitor should understand what the company does and why it matters within the first five seconds — without a wall of text.
2. **Use motion purposefully.** Animation should add clarity and weight, not decorate an otherwise flat layout.
3. **Hold up technically.** The site would be seen by technical decision-makers who'd look at the source. It needed to reflect the same standard as the work itself.

---

## Design Direction

The visual identity started with a deliberate departure from cold, sterile "tech blue" palettes. The base is a warm off-white (`#f9f8f5`) with subtle paper-like undertones, paired with a deep charcoal-black (`#0a0c10`) for text and a single, strong accent — a muted terracotta red (`#cc493c`). The system also carries a muted slate blue used for secondary text and supporting UI.

This pairing communicates precision without coldness. The warmth prevents the site from reading as generic SaaS; the typographic tightness (letter-spacing down to −0.038em on display headings, line-heights as low as 1.06) keeps it feeling high-craft.

All color, typography, shadow, and radius values are defined as CSS custom properties in a single `design-tokens.css` file. Tailwind v4's `@theme inline` layer bridges those tokens into utility classes so nothing is ever hardcoded twice — a color change in the token file propagates everywhere without touching a component.

Dark mode is implemented via a `.dark` class strategy on the `<html>` element, re-declaring every token at a darker scale in the same file. Components never branch on theme — they read tokens and the tokens do the work.

---

## The 3D Atom Hero

The most significant technical piece is the animated background on the homepage — a 3D atom visualization rendered entirely on an HTML `<canvas>` element, without WebGL.

### Why custom canvas?

Off-the-shelf WebGL libraries would have pulled in significant bundle weight for something that amounts to a subtle background element. The visual needed to be lightweight, instantly readable, and deferrable — conditions where a raw Canvas 2D renderer with `requestAnimationFrame` was the right call.

### Orbital geometry

The atom has six orbital rings arranged as a regular hexagon in 3D space. Each ring shares the same inclination (62°, chosen to give clear elliptical depth without collapsing to a line), and they're spaced evenly by π/N around the Y axis. Because a ring at longitude L and L+π is visually identical, N evenly-spaced steps across the half-circle produce N distinct planes with equal angular separation — like a regular polygon projected in 3D.

All rings rotate at the same speed (`lonSpeed: 0.032`), so the whole structure spins as a rigid body rather than a chaotic cloud. One electron per ring orbits at `elSpeed: 0.45`, with each electron's starting phase offset to distribute them evenly.

```ts
const ORBITS: OrbitConfig[] = Array.from({ length: ORBIT_COUNT }, (_, k) => ({
  radiusFrac:  0.38,
  inclination: Math.PI / 2.9,
  lonBase:     k * (Math.PI / ORBIT_COUNT),
  lonSpeed:    0.032,
  elSpeed:     0.45,
  electrons: [{ phase: k * (2 * Math.PI / ORBIT_COUNT), r: 2.2, colorKey: EL_COLORS[k % 3] }],
  lineOpacity: 0.11,
}));
```

### Perspective projection

A custom `project()` function handles the 3D-to-2D math: a point at angle θ on a ring is first placed in the ring's local plane, then rotated around X by the inclination, then rotated around Y for the current longitude, then perspective-divided against a field-of-view scalar.

```ts
function project(theta, radius, inclination, longitude, cx, cy, fov) {
  const x0 = radius * Math.cos(theta);
  const y0 = radius * Math.sin(theta);
  const y1 =  y0 * Math.cos(inclination);
  const z1 =  y0 * Math.sin(inclination);
  const x2 =  x0 * Math.cos(longitude) + z1 * Math.sin(longitude);
  const z2 = -x0 * Math.sin(longitude) + z1 * Math.cos(longitude);
  const p  = fov / (fov + z2 * 0.35);
  return [cx + x2 * p, cy + y1 * p, z2];
}
```

The returned Z coordinate is used for depth-based scaling — electrons closer to the viewer appear slightly larger and brighter.

### Per-segment fading

Rather than drawing each orbital ring as a single stroke, the ring is subdivided into 100 segments per frame. Each segment is alpha-faded based on its distance from the canvas center — segments near the center fade out, segments near the outer edge fade in. This uses a smoothstep curve (`frac² * (3 - 2 * frac)`) rather than a linear falloff, producing a soft and natural vignette where the rings seem to emerge from darkness toward the viewer.

### Scroll-speed interaction

Scrolling the page applies a speed impulse to the animation. The impulse is proportional to the pixel delta per scroll event, capped at 8×. A passive scroll listener accumulates the impulse into a `speedRef` value; the frame loop decays that value back toward 1× with a half-life of about 0.6 seconds using exponential decay. The result is that scrolling "spins up" the atom, and it gracefully slows when the user stops — without any jarring transitions.

```ts
function onScroll() {
  const dy = Math.abs(window.scrollY - lastScrollY.current);
  const impulse = Math.min(dy * 0.08, 7.0);
  speedRef.current = Math.min(speedRef.current + impulse, 8.0);
}

// In frame():
speedRef.current = 1 + (speedRef.current - 1) * Math.exp(-dt * 1.15);
vtRef.current += dt * speedRef.current;
```

### Theme awareness

The atom reads the active color palette in each frame by checking whether the `<html>` element carries the `.dark` class. This is monitored by a `MutationObserver` that updates a local `dark` flag when the class changes. No rerenders, no state — the canvas just draws with the right colors in the next frame.

Two palettes define the RGB components for ring lines and electron dots for light and dark modes. The atom transitions seamlessly when the user switches the theme toggle, because the observer keeps the flag current and the canvas reads it continuously.

---

## Animation System

Every section transition uses Framer Motion `FadeIn` and `StaggerContainer` / `StaggerItem` components built in-house. The components are thin wrappers around `motion.div` with `whileInView` + `viewport: { once: true }` — content animates in once when it enters the viewport and stays visible, rather than animating repeatedly on scroll. Delays stagger list items by 0.08s increments.

The homepage headline carries an animated SVG underline under "real work" — a `<motion.path>` that draws itself via `pathLength` on mount while also applying a subtle organic wave animation that keeps it alive after the initial draw.

---

## Architecture

The site uses Next.js 16's App Router. Each route has a layout-level `page.tsx` that handles metadata and a separate `*Content.tsx` client component that owns the interactive UI. This separation keeps route files clean and allows metadata to be server-rendered while animations remain client-side.

Solution detail pages (`/solutions/[slug]`) are statically generated at build time from a typed `SOLUTION_DETAILS` record — no database, no API, no runtime fetching. Page-level metadata is generated from the same data structure via a shared `seo.ts` utility.

All theming, typography, and spacing decisions flow from the design-token file outward. No hardcoded colors appear in component files.

---

## Performance Notes

- The Canvas animation is the most CPU-intensive piece. It cleans up fully on component unmount — `cancelAnimationFrame`, `removeEventListener`, and `ResizeObserver`/`MutationObserver` disconnect calls are all handled in the `useEffect` cleanup.
- Device pixel ratio is capped at 2× to avoid excess pixel fill on high-DPI screens.
- The canvas is `aria-hidden` and pointer-events-none — it's decorative, incurs no accessibility cost, and never intercepts user interaction.
- Framer Motion animations use `viewport: { once: true }`, so the browser isn't tracking scroll position for animation on every element throughout the session.

---

## Outcome

The site launched as the public face of Pragmatic Labs AI. It communicates a specific positioning — practical, rigorous, human — through both its copy and its design. The technical implementation reflects the same standards the company holds itself to in the AI systems it builds for clients: nothing unnecessarily complex, no dependencies pulled in without a reason, and performance treated as a feature rather than an afterthought.

---

*This file is a draft — copy what you need and delete the file.*
