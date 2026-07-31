import type { CaseStudyData } from "@/components/sections/CaseStudy";

/**
 * Real engagements, told straight. One entry per cleared project.
 *
 * Rules for this file, in keeping with the rest of the site:
 * - No figure appears here that wasn't measured. Where we have outcomes but no
 *   measurements, `metric.qualitative` is true and the before/after are worded,
 *   so the section claims a change in the work rather than a number.
 * - No `quote` until there is a real, attributed, cleared one.
 * - `client` stays anonymised unless the client has agreed to be named.
 */

/**
 * An internal AI workbench for a disability services provider.
 *
 * Told as three chapters, because the arc is the point: one tool earned the
 * room for a toolkit, and the toolkit ended with us turning work down.
 *
 * `process`, `advisedAgainst` and `built` are kept filled and accurate even
 * though the narrative renders instead of them — the data has to stay true in
 * whichever mode it is displayed.
 */
export const UPREACH_WORKBENCH: CaseStudyData = {
  client:
    "A disability services provider in central Ohio, supporting adults with intellectual and developmental disabilities and autism.",

  process:
    "Planning a single accessible group outing took weeks. Flights with wheelchair assistance, roll-in-shower lodging, the nearest urgent care, a 1:3 chaperone ratio held across a full day and sensory breaks scheduled before anyone needed one — all reasoned through by hand, a phone call at a time.",

  advisedAgainst:
    "A custom hiring and candidate-screening build. We researched it instead of quoting it, found an existing CMS already did the job well, and recommended they buy that rather than pay us to rebuild it.",

  built:
    "A Travel Planner that turns a filled-in form into a costed, staffed, hour-by-hour plan; an “Upreach Advisor” grounded in the organisation’s own policies; and around them one workbench rather than a dozen products — plain-language rewriting, family communications, document drafting, tone and rewrite tools, newsletters and situational tools for hard conversations.",

  chapters: [
    {
      title: "Chapter 1 — From weeks to minutes",
      body: [
        "Planning a single accessible group outing used to take weeks. Every trip meant reasoning through the same tangle by hand: which flights offered wheelchair assistance and for how many travelers, which hotel had roll-in showers and sensory-friendly rooms, where the nearest urgent care sat relative to the park, how to hold a 1:3 chaperone ratio across a full day, when to schedule the sensory breaks and the evening reflection circle before anyone got there to need one. Getting it right meant a coordinator carrying the whole plan in their head, a phone call at a time.",
        "We built a Travel Planner that does it in minutes, not weeks. A form, not a blank page — participant count, wheelchair users, chaperone ratio, medical and behavioral notes — and the output is the plan a skilled coordinator would have spent weeks building: flight options tagged for wheelchair assistance, a sensory-friendly resort with accessible rooms, an hour-by-hour itinerary with structured breaks every two hours, and a dollar-exact budget broken out by category, per participant, before a single call gets made.",
      ],
    },
    {
      title: "Chapter 2 — From one tool to a workbench",
      body: [
        "That result bought the room for a bigger ask: an “Upreach Advisor” — a RAG-grounded assistant staff could ask directly, trained on the organization’s own policies and procedures. From there the toolkit grew into one workbench rather than a dozen separate products: plain-language rewriting, family communications, document drafting, tone and rewrite tools, newsletters, social posts, and situational tools like reframing a hard conversation or practicing one before it happens. Every tool shares conversation history, version history, and export, and every one is tuned to this provider’s own regulatory context — not a generic office.",
      ],
    },
    {
      title: "Chapter 3 — Where we said no",
      body: [
        "Upreach also asked us to build a custom hiring and candidate-screening solution. We researched it instead of quoting it, and the honest answer was that an existing CMS already did this well. We recommended they buy it rather than let us build it — and walked away from that piece of business because it was the right call for the client, not the right invoice for us.",
      ],
    },
  ],

  metric: {
    label: "Planning one accessible group outing",
    before: "Weeks of manual research, carried in one coordinator’s head.",
    after: "Minutes, from a filled-in form to a costed, staffed plan.",
    qualitative: true,
  },

  // No quote: nothing has been said on the record and cleared. Leave it out.
};
