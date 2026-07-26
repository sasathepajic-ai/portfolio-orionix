import type { ReactNode } from "react";
import { Container } from "@/components/ui/Container";
import { Folio, Headline, Kicker } from "@/components/ui/print";
import { Reveal } from "@/components/ui/Reveal";

export interface CaseStudyData {
  /** Real or anonymized client, e.g. "A regional logistics firm, ~120 staff". */
  client: string;
  /** The manual process the engagement addressed. */
  process: string;
  /** What we advised the client NOT to buy, and why — the differentiator. */
  advisedAgainst: string;
  /** What we actually shipped. */
  built: string;
  /** Before/after and what it measures. Figures by default; set
      `qualitative` when before/after are worded outcomes, not measurements. */
  metric: {
    label: string;
    before: string;
    after: string;
    /** When true, before/after read as worded outcomes — rendered stacked at
        reading size, implying no number and claiming no measurement. */
    qualitative?: boolean;
  };
  /** One-line client quote. Leave out until there is a real, cleared quote. */
  quote?: { text: string; attribution: string };
  /** When true, the section frames itself as an example rather than a
      specific, cleared engagement. */
  isTemplate?: boolean;
  /** Framing note shown under the headline in template mode. Defaults to the
      unfilled-placeholder wording. */
  templateNote?: string;
}

/* TODO(team): replace this with a real engagement and pass it in —
   <CaseStudy study={REAL_STUDY} />. Nothing here is real: the figures are
   bracketed tokens, not measurements, and there is no quote. Keep it that way
   until a real one exists — not inventing proof is the whole positioning. */
export const PLACEHOLDER_CASE_STUDY: CaseStudyData = {
  client:
    "[Anonymized client — e.g. “A regional logistics firm, roughly 120 staff”]",
  process:
    "[The manual process we were asked to fix — e.g. matching inbound invoices to purchase orders by hand, one at a time]",
  advisedAgainst:
    "[What we told them not to buy, and why — e.g. we advised against a full document-AI platform. Only one workflow justified automation, so a broad license would have sat mostly unused.]",
  built:
    "[What we actually shipped — e.g. one focused tool that reads each invoice, matches it to its order, and routes only the exceptions to a person.]",
  metric: {
    label: "[What the numbers measure — e.g. staff time on the task, per week]",
    before: "[ before ]",
    after: "[ after ]",
  },
  // quote intentionally omitted — the layout shows the empty slot instead.
  isTemplate: true,
};

/* An illustrative, anonymized example — not a specific client. No invented
   figures and no quote: the before/after are worded outcomes, so nothing here
   claims a measurement we didn't take. It shows the shape of a knowledge-
   assistant engagement, including the part most agencies skip — what we'd
   advise against. */
export const KNOWLEDGE_ASSISTANT_EXAMPLE: CaseStudyData = {
  client:
    "A large enterprise with knowledge spread across wikis, shared drives, and years of support articles — none of it in one place, little of it versioned.",
  process:
    "Teams lost hours a week hunting through scattered, half-current stores. Support and sales gave different answers to the same question, because nothing was authoritative and nothing traced back to a source.",
  advisedAgainst:
    "One all-access assistant for the whole company. Most teams only need their own material — a single open bot would surface documents people shouldn't see, and make every wrong answer harder to trace back to where it came from.",
  built:
    "Team-scoped assistants, each reading only its own approved sources, every answer linked back to the document it came from, and every question and action logged so the trail holds up to review.",
  metric: {
    label: "What changes for a support rep, day to day",
    before: "The same question gets three different answers across support and sales.",
    after: "One source-backed answer, with the document it came from attached to check.",
    qualitative: true,
  },
  // no quote — this is an illustrative example, not a cleared client story.
  isTemplate: true,
  templateNote:
    "An illustrative example — a representative project, not a specific client. It shows the shape of an engagement: what we'd advise against, what we'd build, and what changes day to day. A real, cleared result replaces it once we have one.",
};

/**
 * One engagement, told straight: who it was for, the process it addressed, what
 * we advised against (the part most agencies leave out), what we built, and the
 * before/after. Purely typographic — no imagery. Prop-driven: pass a real
 * `study` to publish it; with none it renders the placeholder above, clearly
 * framed as an example so no visitor mistakes it for a real claim.
 */
export function CaseStudy({ study = PLACEHOLDER_CASE_STUDY }: { study?: CaseStudyData }) {
  const { client, advisedAgainst, built, metric, quote, isTemplate, templateNote } = study;

  const fields: { label: string; value: ReactNode }[] = [
    { label: "Who it was for", value: client },
    { label: "The process we were asked to fix", value: study.process },
    { label: "What we advised against — and why", value: advisedAgainst },
    { label: "What we built", value: built },
  ];

  return (
    <section className="py-16 md:py-24">
      <Container size="wide">
        <Reveal>
          <div className="mb-10 max-w-2xl md:mb-14">
            <Kicker className="mb-3">
              {isTemplate ? "A representative project" : "One engagement, in full"}
            </Kicker>
            <Headline as="h2">What a project actually looks like</Headline>
            {isTemplate && (
              <p className="mt-4 max-w-[54ch] font-sans text-[13px] leading-relaxed text-ink-soft">
                {templateNote ??
                  "Example layout — a real engagement replaces this before it goes live. The figures below are placeholders, not measurements, and there is no client quote yet."}
              </p>
            )}
          </div>
        </Reveal>

        <Reveal>
          <div className="grid gap-x-14 gap-y-12 md:grid-cols-[7fr_5fr]">
            {/* The narrative — "what we advised against" is the point of it. */}
            <dl className="flex flex-col gap-8">
              {fields.map((f) => (
                <div key={f.label}>
                  <dt className="font-sans text-[13px] font-bold text-ink-soft">
                    {f.label}
                  </dt>
                  <dd className="mt-2 font-serif text-[16px] leading-relaxed text-ink">
                    {f.value}
                  </dd>
                </div>
              ))}
            </dl>

            {/* The numbers, then the quote slot. */}
            <div className="flex flex-col gap-8">
              <div className="bg-paper-shade p-6 md:p-8">
                <Folio className="text-ink-soft">{metric.label}</Folio>
                {metric.qualitative ? (
                  <div className="mt-5 flex flex-col gap-4">
                    <div>
                      <p className="font-sans text-[12px] text-ink-faint">Before</p>
                      <p className="mt-1 font-serif text-lg leading-snug text-ink-soft">
                        {metric.before}
                      </p>
                    </div>
                    <span
                      aria-hidden="true"
                      className="font-serif text-xl leading-none text-ink-faint"
                    >
                      &darr;
                    </span>
                    <div>
                      <p className="font-sans text-[12px] text-ink-faint">After</p>
                      <p className="mt-1 font-serif text-lg leading-snug text-accent">
                        {metric.after}
                      </p>
                    </div>
                  </div>
                ) : (
                  <div className="mt-5 flex items-center gap-5">
                    <div>
                      <p className="font-sans text-[12px] text-ink-faint">Before</p>
                      <p className="mt-1 font-serif text-2xl leading-tight text-ink-soft md:text-3xl">
                        {metric.before}
                      </p>
                    </div>
                    <span aria-hidden="true" className="font-serif text-2xl text-ink-faint">
                      &rarr;
                    </span>
                    <div>
                      <p className="font-sans text-[12px] text-ink-faint">After</p>
                      <p className="mt-1 font-serif text-2xl leading-tight text-accent md:text-3xl">
                        {metric.after}
                      </p>
                    </div>
                  </div>
                )}
              </div>

              {quote ? (
                <blockquote>
                  <p className="font-serif text-lg italic leading-normal text-ink">
                    &ldquo;{quote.text}&rdquo;
                  </p>
                  <footer className="mt-3 font-sans text-[13px] font-bold text-ink-soft">
                    {quote.attribution}
                  </footer>
                </blockquote>
              ) : metric.qualitative ? null : (
                <p className="font-serif text-lg italic leading-normal text-ink-faint">
                  [ A one-line client quote sits here, once we have permission to
                  publish it. ]
                </p>
              )}
            </div>
          </div>
        </Reveal>
      </Container>
    </section>
  );
}
