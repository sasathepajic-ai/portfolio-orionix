import type { ComponentType, CSSProperties } from "react";

/* Tool schematics — one small flat illustration per offering, sitting directly
   on the section band beside each row in the home "What we build" section (no
   plate, no border — a frame would pull attention from the text).

   One vocabulary across all four: solid flat blocks, not line diagrams. Paper
   slips with ink outlines for the human side, solid accent green for the
   machine/result, a deep-accent block offset +6,+6 behind a shape as a flat
   shadow (no gradient, no glow), paper reversed out for detail on green.
   Square corners, 2px stroke, drawn on a shared 0 0 180 140 grid, integer
   coordinates only.

   Each says one thing: a question answered from your sources; a worklist
   being cleared item by item; the answer as a bar chart; the options on the
   table with one worth doing and one we advise against (the one legitimate
   use of refusal-red outside error states — it draws the refusal itself).

   Decorative: every one is aria-hidden, and the idea each draws is already in
   the row's outcome, description and feature copy, so screen readers lose
   nothing. */

const SCHEM_BASE = {
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 2,
  strokeLinecap: "square",
  strokeLinejoin: "miter",
  "aria-hidden": true,
  focusable: false,
} as const;

/* A quiet, in-view loop gives each drawing a sign of life instead of sitting
   dead-still. Class hooks below are animated in globals.css — reduced-motion
   gated, and only once the row has scrolled in. `stagger` sets the phase offset
   for the breathing bars. */
const stagger = (n: number): CSSProperties => ({ "--d": n }) as CSSProperties;

/** AI Assistants — a question answered from your own documents. */
function AssistantSchematic({ className }: { className?: string }) {
  return (
    <svg {...SCHEM_BASE} viewBox="0 0 180 140" className={className}>
      {/* the question — bubble and tail as one closed outline */}
      <path d="M16 14h76v34H39L26 60V48H16z" className="fill-paper" />
      <path d="M28 26h52M28 36h34" />
      {/* the answer, lifted off a deep-accent shadow */}
      <rect x="58" y="66" width="108" height="58" className="fill-accent-deep stroke-accent-deep" />
      <rect x="52" y="60" width="108" height="58" className="fill-accent stroke-accent" />
      <path d="M64 74h84M64 86h84M64 98h56" className="stroke-paper" />
      {/* a cursor at the end of the answer — blinks, as if still being written */}
      <path d="M126 98v-6" className="stroke-paper schem-caret" />
      {/* the source it drew from — a small doc with a folded corner, set an
          equal 8 units in from the card's right and bottom edges */}
      <path d="M138 94h9l5 5v11h-14z" className="stroke-paper" />
      <path d="M147 94v5h5" className="stroke-paper" />
    </svg>
  );
}

/** Workflow Automation — a worklist being cleared, item by item. */
function AutomationSchematic({ className }: { className?: string }) {
  return (
    <svg {...SCHEM_BASE} viewBox="0 0 180 140" className={className}>
      {/* the worklist panel, lifted off a deep-accent shadow */}
      <rect x="32" y="30" width="124" height="86" className="fill-accent-deep stroke-accent-deep" />
      <rect x="26" y="24" width="124" height="86" className="fill-paper" />
      {/* done, done — and the one it's on now */}
      <rect x="40" y="36" width="14" height="14" className="fill-accent stroke-accent" />
      <path d="M43 43l3 3 6-6" className="stroke-paper" />
      <rect x="40" y="60" width="14" height="14" className="fill-accent stroke-accent" />
      <path d="M43 67l3 3 6-6" className="stroke-paper" />
      {/* the one it's on now — pulses, the item being worked */}
      <rect x="40" y="84" width="14" height="14" className="stroke-accent schem-work" />
      <path d="M62 43h74M62 67h74M62 91h74" />
    </svg>
  );
}

/** Business Intelligence — the answer, as plainly as a bar chart. */
function BISchematic({ className }: { className?: string }) {
  return (
    <svg {...SCHEM_BASE} viewBox="0 0 180 140" className={className}>
      {/* the graph panel, lifted off a deep-accent shadow */}
      <rect x="32" y="30" width="124" height="86" className="fill-accent-deep stroke-accent-deep" />
      <rect x="26" y="24" width="124" height="86" className="fill-paper" />
      {/* the answer — bars climbing to the one that matters, breathing softly */}
      <rect x="38" y="76" width="16" height="20" className="fill-accent stroke-accent schem-bar" style={stagger(0)} />
      <rect x="66" y="64" width="16" height="32" className="fill-accent stroke-accent schem-bar" style={stagger(1)} />
      <rect x="94" y="50" width="16" height="46" className="fill-accent stroke-accent schem-bar" style={stagger(2)} />
      <rect x="122" y="36" width="16" height="60" className="fill-accent-deep stroke-accent-deep schem-bar" style={stagger(3)} />
      <path d="M34 96h108" />
    </svg>
  );
}

/** AI Strategy — the options on the table: what's worth doing, what isn't. */
function StrategySchematic({ className }: { className?: string }) {
  return (
    <svg {...SCHEM_BASE} viewBox="0 0 180 140" className={className}>
      {/* the option board, lifted off a deep-accent shadow */}
      <rect x="32" y="30" width="124" height="86" className="fill-accent-deep stroke-accent-deep" />
      <rect x="26" y="24" width="124" height="86" className="fill-paper" />
      {/* six candidates: the one worth doing, the one we advise against */}
      <rect x="40" y="37" width="24" height="24" className="fill-accent stroke-accent" />
      <path d="M45 49l5 5 9-10" className="stroke-paper schem-chosen" />
      <rect x="76" y="37" width="24" height="24" />
      <rect x="112" y="37" width="24" height="24" />
      <rect x="40" y="73" width="24" height="24" />
      <rect x="76" y="73" width="24" height="24" />
      <rect x="112" y="73" width="24" height="24" />
      <path d="M119 80l10 10M129 80l-10 10" className="stroke-refusal-red" />
    </svg>
  );
}

/** Slug → schematic. Keyed off SOLUTIONS in constants.ts, like TOOL_ICONS. */
export const TOOL_SCHEMATICS: Record<string, ComponentType<{ className?: string }>> = {
  "ai-assistants": AssistantSchematic,
  "workflow-automation": AutomationSchematic,
  "business-intelligence": BISchematic,
  "ai-strategy": StrategySchematic,
};
