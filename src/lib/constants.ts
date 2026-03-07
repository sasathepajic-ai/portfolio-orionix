export const SITE_NAME = "Pragmatic Labs AI";
export const SITE_URL = "https://pragmaticlabs.ai";
export const SITE_DESCRIPTION =
  "Pragmatic Labs AI builds practical AI tools for real business workflows — assistants, automation, intelligence, and strategy that teams actually use.";

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

export const SOLUTIONS = [
  {
    title: "AI Assistants",
    slug: "ai-assistants",
    description:
      "An assistant trained on your organization's actual content — documentation, SOPs, past decisions — so your team can find answers in seconds instead of searching through systems or asking around.",
    icon: "MessageSquare" as const,
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
    icon: "Workflow" as const,
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
    icon: "BarChart3" as const,
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
    icon: "Lightbulb" as const,
    features: [
      "Process audit to identify real leverage points",
      "Vendor and build-vs-buy evaluation",
      "Sequenced roadmap from quick wins to scale",
      "Governance framework included from day one",
    ],
  },
] as const;

export const IMPACT_STATS = [
  {
    metric: "Faster Decisions",
    description:
      "The right information reaches people when they need it — not after the moment has passed.",
  },
  {
    metric: "Less Manual Work",
    description:
      "Repetitive tasks that eat up someone's week get handled automatically, so your team focuses on work that actually requires them.",
  },
  {
    metric: "Operational Clarity",
    description:
      "Your data already has the answers. We make them visible to the people who need to act on them.",
  },
] as const;
