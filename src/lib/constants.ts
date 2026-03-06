export const SITE_NAME = "Pragmatic Labs AI";
export const SITE_URL = "https://pragmaticlabs.ai";
export const SITE_DESCRIPTION =
  "Pragmatic Labs AI transforms complex AI capabilities into simple, practical tools that help businesses operate smarter.";

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
    description:
      "Intelligent assistants that understand your business context and help your team work faster, answer questions, and surface insights on demand.",
    icon: "MessageSquare" as const,
  },
  {
    title: "Workflow Automation",
    description:
      "Streamline repetitive processes with AI-powered automation that reduces manual work and eliminates bottlenecks across your operations.",
    icon: "Workflow" as const,
  },
  {
    title: "Business Intelligence",
    description:
      "Turn raw data into clear, actionable insights. Our AI tools help you understand trends, spot opportunities, and make faster decisions.",
    icon: "BarChart3" as const,
  },
  {
    title: "AI Strategy",
    description:
      "Navigate the AI landscape with confidence. We help you identify the right opportunities and build a practical roadmap for adoption.",
    icon: "Lightbulb" as const,
  },
] as const;

export const IMPACT_STATS = [
  {
    metric: "Faster Decisions",
    description: "AI-powered insights delivered in real time, not days.",
  },
  {
    metric: "Less Manual Work",
    description:
      "Automate the repetitive so your team can focus on what matters.",
  },
  {
    metric: "Operational Clarity",
    description: "See the full picture with intelligent data analysis.",
  },
] as const;
