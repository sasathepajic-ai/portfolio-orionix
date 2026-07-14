export interface EngagementWeek {
  period: string;
  title: string;
  description: string;
}

/**
 * The week-by-week engagement timeline. Dated and concrete on purpose —
 * "weeks, not months" as a schedule, not a slogan. Replaces any generic
 * Discover/Design/Build/Scale process; do not reintroduce one.
 */
export const ENGAGEMENT_WEEKS: EngagementWeek[] = [
  {
    period: "Week 1",
    title: "The conversation",
    description:
      "Thirty minutes on what's slowing your team down, then a plain assessment of where AI will help — and where it won't. Some of these end with us recommending a spreadsheet.",
  },
  {
    period: "Weeks 2–3",
    title: "A first working version",
    description:
      "One process, scoped and costed. Built on the systems you already run, tested against your real cases — not a demo dataset.",
  },
  {
    period: "Weeks 4–6",
    title: "Proof before scale",
    description:
      "Your team uses it. We adjust it. Nothing expands until the pilot has earned it in production.",
  },
  {
    period: "After that",
    title: "Scale what worked",
    description:
      "Other teams, other processes — each addition proven the same way. If we stopped working with you tomorrow, it all keeps running on your stack.",
  },
];
