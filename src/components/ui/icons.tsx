import type { ComponentType } from "react";

/* Tool marks — one per offering, used beside the tool name on the home page.
   Geometry follows Lucide (ISC), redrawn square: the source ships rounded
   corners and round caps, and this brand has no radii anywhere. Stroked in
   currentColor, so they take the surrounding text color; never fill them.

   The package itself stays uninstalled — see CLAUDE.md. Four hand-placed
   marks do not warrant a dependency. */

const BASE = {
  viewBox: "0 0 24 24",
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 1.5,
  strokeLinecap: "square",
  strokeLinejoin: "miter",
  "aria-hidden": true,
  focusable: false,
} as const;

/** AI Assistants — a document, searched. */
function AssistantIcon({ className }: { className?: string }) {
  return (
    <svg {...BASE} className={className}>
      <path d="M4 2h10l6 6v14H4z" />
      <path d="M14 2v6h6" />
      <circle cx="11.5" cy="14.5" r="2.5" />
      <path d="m13.3 16.3 1.7 1.7" />
    </svg>
  );
}

/** Workflow Automation — one stage handing off to the next. */
function AutomationIcon({ className }: { className?: string }) {
  return (
    <svg {...BASE} className={className}>
      <rect x="3" y="3" width="8" height="8" />
      <path d="M7 11v6h6" />
      <rect x="13" y="13" width="8" height="8" />
    </svg>
  );
}

/** Business Intelligence — a reading, plotted. */
function BIIcon({ className }: { className?: string }) {
  return (
    <svg {...BASE} className={className}>
      <path d="M3 3v18h18" />
      <path d="m19 9-5 5-4-4-3 3" />
    </svg>
  );
}

/** AI Strategy — the deliverable is a checked-off list, not a framework. */
function StrategyIcon({ className }: { className?: string }) {
  return (
    <svg {...BASE} className={className}>
      <path d="M13 5h8" />
      <path d="M13 12h8" />
      <path d="M13 19h8" />
      <path d="m3 7 2 2 4-4" />
      <path d="m3 17 2 2 4-4" />
    </svg>
  );
}

/** Slug → mark. Keyed off SOLUTIONS in constants.ts. */
export const TOOL_ICONS: Record<string, ComponentType<{ className?: string }>> = {
  "ai-assistants": AssistantIcon,
  "workflow-automation": AutomationIcon,
  "business-intelligence": BIIcon,
  "ai-strategy": StrategyIcon,
};
