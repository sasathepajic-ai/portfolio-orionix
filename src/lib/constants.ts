export const SITE_NAME = "Pragmatic Labs AI";
export const SITE_URL = "https://pragmaticlabs.ai";
export const SITE_DESCRIPTION =
  "Pragmatic Labs AI builds AI assistants, automation, and analytics on the systems your team already uses — and tells you upfront where AI won't help.";

export const NAV_LINKS = [
  { label: "Home", href: "/" },
  { label: "About", href: "/about" },
  { label: "Solutions", href: "/solutions" },
  { label: "Contact", href: "/contact" },
] as const;

export const TRUSTED_BY = [
  {
    name: "The Academy of Brain Based Leadership",
    url: "https://brainleadership.com/",
  },
  { name: "CIMBA Italy", url: "https://www.cimbaitaly.com/" },
  { name: "Upreach Group, LLC", url: "https://www.upreachgroup.com/" },
] as const;

/* A documentary photo per solution — the customer's real, pre-AI world.
   Keyed by slug; rendered on each /solutions/[slug] detail page via PressPhoto.
   The caption is the line that does the messaging work: on detail pages it is
   lifted onto a paper plate over the band (`captionOnPlate`), not tucked
   underneath as grey metadata. */
export const SOLUTION_PHOTOS: Record<
  string,
  { src: string; alt: string; caption: string; objectPosition?: string }
> = {
  "ai-assistants": {
    src: "/photos/binders.jpg",
    alt: "Wooden shelves filled with rows of worn cream ring binders, one brown folder leaning out of the middle shelf",
    caption:
      "The knowledge your team already has — just not where anyone can find it.",
  },
  "workflow-automation": {
    src: "/photos/intake.jpg",
    alt: "A tall stack of wire letter trays heaped with printed forms on an office desk, a wooden pigeonhole sorting rack on the wall behind",
    caption: "Every one of these is read, keyed, and routed by hand today.",
    /* Low enough to keep the whole tray tower — the top sheet and the banded
       bundles both — inside the band. */
    objectPosition: "center 58%",
  },
  "business-intelligence": {
    src: "/photos/drawers.jpg",
    alt: "A long bank of wooden index-card drawers with brass handles, one drawer pulled open and packed with cards",
    caption:
      "The answers are already in your systems. This is about opening the right drawer.",
    objectPosition: "center 55%",
  },
  "ai-strategy": {
    src: "/photos/table.jpg",
    alt: "A long empty meeting table with a folded plan, loose papers and two mugs spread across the near end",
    caption: "Where AI earns its place as you scale — and where it doesn't.",
    objectPosition: "center 85%",
  },
};

/* The four offerings. `outcome` lines are the teaser headlines. */
export const SOLUTIONS = [
  {
    title: "AI Assistants",
    slug: "ai-assistants",
    description:
      "An assistant trained on your organization's actual content — documentation, SOPs, past decisions — so your team can find answers in seconds instead of searching through systems or asking around.",
    outcome: "Your team stops asking \"where is that documented?\"",
    features: [
      "Trained on your documents and internal knowledge",
      "Works inside tools your team already uses",
      "Plain-language interface, no training required",
      "Stays current as your content changes",
    ],
  },
  {
    title: "Workflow Automation",
    slug: "workflow-automation",
    description:
      "Repetitive processes — document intake, approvals, data entry — handled automatically. We build systems that read unstructured input and make sensible decisions without needing a person every time.",
    outcome: "The queue stops depending on who's available to clear it.",
    features: [
      "Handles variable, unstructured inputs",
      "Approval routing based on document content",
      "Exceptions escalated to humans, not dropped",
      "Full audit trail of every step",
    ],
  },
  {
    title: "Business Intelligence",
    slug: "business-intelligence",
    description:
      "Your data already contains the answers. We connect your existing sources, surface what's worth paying attention to, and let your team ask questions in plain language — without waiting on an analyst.",
    outcome: "Your team gets an answer without filing a request and waiting.",
    features: [
      "Connects to databases, CRMs, and spreadsheets",
      "Natural language queries, no SQL required",
      "Continuous anomaly detection and alerts",
      "Dashboards built around your actual metrics",
    ],
  },
  {
    title: "AI Strategy",
    slug: "ai-strategy",
    description:
      "Before committing to a platform or vendor, figure out where AI actually makes sense. We identify the highest-leverage opportunities, evaluate the real options, and build a roadmap you can act on.",
    outcome: "You know exactly where to start — and where not to bother.",
    features: [
      "Process audit to identify real leverage points",
      "Vendor and build-vs-buy evaluation",
      "Sequenced roadmap from quick wins to scale",
      "Governance framework included from day one",
    ],
  },
] as const;
