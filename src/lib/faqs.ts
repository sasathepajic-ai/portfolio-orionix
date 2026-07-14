export interface FAQ {
  question: string;
  answer: string;
}

export const FAQS: FAQ[] = [
  {
    question: "Where does our data actually live?",
    answer:
      "In your systems. We build against your CRM, your docs, your Slack, your databases — we don't ask you to copy your data into a new platform we own. Anything we do process runs under your own accounts and access controls wherever that's possible, and we'll tell you plainly when a project requires moving data somewhere and why.",
  },
  {
    question: "What if AI isn't the answer for us?",
    answer:
      "We'll say so. If a spreadsheet, a form, or a five-line script already solves your problem, we tell you that in the first conversation instead of finding a reason to build something bigger. Some of our discovery calls end with a recommendation that doesn't involve us at all — that's the point of doing discovery honestly.",
  },
  {
    question: "How long until we have something working?",
    answer:
      "Weeks, not months. Most engagements produce a working first version — tested against your real cases, not a demo — within the first few weeks. We'd rather ship something narrow and prove it than spend that time on a plan for something broader.",
  },
  {
    question: "Are we locked into a platform once we start?",
    answer:
      "No. We build on the systems you already run — your CRM, your documents, your existing infrastructure — instead of migrating you to a proprietary platform. If we stopped working with you tomorrow, the tool would keep running on your stack, not ours.",
  },
  {
    question: "What does the first engagement actually look like?",
    answer:
      "A 30-minute conversation about what's slowing your team down, followed by a straightforward assessment of where AI will and won't help. If there's a fit, you get a scoped, costed pilot — one real process, tested with your team before anything scales further.",
  },
];
