export interface Refusal {
  item: string;
  reason: string;
}

/**
 * Where we recommend against AI. Standing positions, not claimed engagements —
 * never rewrite these to imply client stories that don't exist.
 */
export const REFUSALS: Refusal[] = [
  {
    item: "A chatbot for a small team",
    reason: "A shared document and a good saved search often do the same job.",
  },
  {
    item: "A broad AI strategy before a first working tool",
    reason: "A roadmap means more once there's a real pilot behind it.",
  },
  {
    item: "Replacing systems that already work",
    reason: "We build on your current stack rather than around a migration.",
  },
  {
    item: "Automating a process no one has written down",
    reason: "It's worth mapping the process first; automation comes after.",
  },
];
