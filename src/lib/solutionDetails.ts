export interface SolutionDetailContent {
  overview: string[];
  howItWorks: string[];
  useCases: string[];
  benefits: string[];
  /** A single editorial pull-line — the tool's argument in one sentence, in
      our own voice (not a client quote). Set between the body and the close. */
  pullQuote: string;
}

export const SOLUTION_DETAILS: Record<string, SolutionDetailContent> = {
  "ai-assistants": {
    overview: [
      "Most internal knowledge lives in places nobody searches: PDFs from two years ago, email threads from a finished project, an onboarding doc that was rewritten and then forgotten. An AI assistant built on your organization's content makes that knowledge findable — not with a search bar, but with a direct conversation.",
      "The difference from a general-purpose chatbot is specificity. It answers based on what your business actually knows, not what the internet guesses. When someone asks about your returns policy, your escalation process, or how a particular approval works, the assistant draws from your documentation — not a plausible-sounding fabrication.",
    ],
    howItWorks: [
      "We audit the content you already have — policies, SOPs, ticketing history, training materials — and structure it into a private knowledge base. The model is configured and tested against real questions your team asks. We refine it until the answers are accurate, complete, and trustworthy.",
      "Deployment is through whatever interface creates the least friction: a chat window in your intranet, a Slack integration, an embedded view in your support or operations tool. The goal is access with zero extra steps. When content changes, the knowledge base updates — so the assistant stays current without ongoing maintenance work.",
    ],
    useCases: [
      "Customer-facing teams who spend time tracking down product specs, policy details, or troubleshooting steps before they can respond",
      "HR and People Ops drowning in the same onboarding and benefits questions that come from every new hire",
      "Operations staff who need compliance requirements or vendor procedures but don't know which system to check",
      "Technical teams who depend on long-tenured colleagues to recall how specific processes work — knowledge that doesn't survive turnover",
      "Sales teams who interrupt subject-matter experts every time they need to build a proposal or answer a specific customer question",
      "Any team where the answer to 'where is that documented?' is a shrug or a long Slack thread",
    ],
    benefits: [
      "Institutional knowledge becomes accessible to everyone, not just the people who've been around long enough to know where to look",
      "New team members answer their own questions from day one, reducing onboarding time and dependency on senior colleagues",
      "Experienced people get fewer interruptions — which matters when they spend a meaningful portion of their week fielding questions they've answered a hundred times",
      "Answers are consistent across teams, closing the gap between what policy says and what actually gets communicated",
      "When the assistant can't answer something, you learn what's missing from your documentation — knowledge gaps become visible instead of invisible",
      "Institutional knowledge that lives in people's heads gets captured in a system that survives turnover",
    ],
    pullQuote:
      "It answers from what your business actually knows — and says so plainly when the answer isn't there yet.",
  },

  "workflow-automation": {
    overview: [
      "Most workflows weren't designed to be manual. They became manual gradually — tools changed, the team grew, and the original process was never revisited. The result is usually someone doing repetitive, error-prone work they know could be handled automatically. They're right.",
      "AI-powered automation differs from rule-based scripting because it can interpret unstructured input. It reads a document and understands what kind of document it is. It evaluates a submission and decides where it should go based on what it contains, not which checkbox was ticked. The logic is learned from examples, not hardcoded — so it handles variation the way a person would.",
    ],
    howItWorks: [
      "We start by watching your current process: what arrives, what happens to it, where decisions are made, and where things stall. Most bottlenecks identify themselves within a few conversations. From there we decide what gets automated, what requires a human in the loop, and what the exceptions look like — because knowing where automation shouldn't apply is as important as knowing where it should.",
      "We build incrementally. The highest-volume, most repetitive step gets automated first. You validate it with real cases. We adjust. By the time the full workflow is running automatically, each piece has been tested in production, not just in a demo. The result is a system your team trusts because they watched it prove itself.",
    ],
    useCases: [
      "Incoming documents — invoices, contracts, applications — that currently require someone to open, read, extract fields, and route them by hand",
      "Approval chains where the right approver depends on dollar amount, department, or content type, and the wrong routing creates delays",
      "Customer onboarding flows that require collecting, validating, and moving submitted documents through multiple internal steps",
      "Recurring reports that someone builds by pulling data from multiple systems and assembling it manually on a schedule",
      "Support or service request triage — classifying incoming tickets by type, urgency, and team before anyone reads them",
      "Internal compliance workflows requiring documentation to be generated, reviewed, and filed on a regular cadence",
    ],
    benefits: [
      "Hours spent on data entry, document routing, and status-chasing redirect to work that actually requires judgment",
      "Processing errors from manual handling — missed fields, wrong recipients, lost documents — drop substantially",
      "Turnaround times for approvals and document processing become predictable instead of dependent on who's available",
      "One person or a small team can manage significantly higher volume without the queue growing",
      "You can see where every item is, how long it's been sitting there, and whether something is stuck — which isn't possible in a manual process",
      "Compliance becomes easier because the system records what happened, in what order, and according to which rule",
    ],
    pullQuote:
      "We automate the step that repeats and route the judgment calls to a person — knowing where automation shouldn't apply is half the work.",
  },

  "business-intelligence": {
    overview: [
      "The problem with most business data isn't quantity. There's usually more than anyone can process. The problem is that the answers are locked in formats that require manual effort to interpret — reports assembled by hand, metrics spread across five tools, questions that require filing an analyst request to get answered.",
      "AI-powered intelligence changes the economics of that. It connects to your existing sources, monitors them continuously, and surfaces what's worth paying attention to — without someone having to run a query every time a question comes up. The goal isn't a better dashboard. It's making the data actually useful to the people who need it.",
    ],
    howItWorks: [
      "We connect to your data where it lives — your CRM, operations platform, databases, spreadsheets, whatever the sources are. The architecture is built to pull everything into a common layer where it can be analyzed together, which means cross-system questions get real answers instead of partial ones.",
      "On top of that we configure natural language query interfaces and automated detection. Your team can ask questions conversationally — 'how did our close rate change in the northeast last month?' — and get a direct answer. Threshold alerts and anomaly detection run in the background, so nothing important goes unnoticed between review cycles.",
    ],
    useCases: [
      "Finance teams who spend the first days of every month assembling a report that could generate itself",
      "Operations leaders who want to know when a metric goes outside its expected range, not after it's already a problem",
      "Sales managers tracking pipeline health across a team without exporting and cross-referencing spreadsheets",
      "Product owners who need to understand feature usage and drop-off without a dedicated data analyst on the team",
      "Executives who need a reliable, current view of the business they can actually trust — not a summary someone built by hand",
      "Customer success teams identifying at-risk accounts from activity patterns before the customer raises a concern",
    ],
    benefits: [
      "Routine reporting that consumes analyst time gets handled automatically — the output arrives, the assembly work disappears",
      "Decision-relevant information reaches people earlier, when there's still time to act on it rather than react to it",
      "The distance between 'I have a question' and 'I have an answer' collapses for most standard business queries",
      "Data quality problems surface through inconsistency rather than going undetected until they affect a real decision",
      "Everyone works from the same version of the numbers — not a spreadsheet someone exported last Tuesday",
      "Teams that previously depended on specialists for every insight develop the ability to answer their own questions",
    ],
    pullQuote:
      "The goal was never a better dashboard. It's the shortest honest path from a question to an answer you can trust.",
  },

  "ai-strategy": {
    overview: [
      "AI strategy isn't about finding the most sophisticated application of the technology. It's about finding the right one — the opportunity with enough impact to justify the investment, that your team can actually execute, and that doesn't require replacing everything you already have.",
      "Most organizations that stall on AI aren't lacking ambition or interest. They're lacking a clear starting point. The strategy work we do removes that uncertainty — identifying where the leverage is, what's realistically achievable given your current setup, and what the first concrete step actually looks like.",
    ],
    howItWorks: [
      "We spend time with the people who run your operations. We want to understand where workflows are slow, where decisions are made on inadequate information, where data exists but goes unused, and where good intentions turn into blocked projects. The output isn't a framework or a maturity model — it's a specific, prioritized list of opportunities sorted by impact and feasibility for your situation.",
      "From there, we evaluate the realistic approaches: build versus buy, which vendors are credible in your context, what your data infrastructure can support. The roadmap sequences initiatives so early wins build the internal confidence needed for harder projects. Governance gets built in from the start, because how you manage AI systems long-term matters as much as how you build them.",
    ],
    useCases: [
      "Leadership teams who want to make informed AI investment decisions before committing significant budget or vendor relationships",
      "Companies that have run internal pilots with mixed results and need an honest read on what went wrong and what to do differently",
      "Businesses in regulated sectors that need to understand the compliance and liability implications before moving forward",
      "Teams that know AI is relevant to their work but struggle to build internal alignment around where to start",
      "Organizations preparing a business case for AI investment who need rigorous, independent analysis to support it",
      "Growth-stage companies figuring out where AI reduces the operational overhead that comes with scaling",
    ],
    benefits: [
      "Investment goes toward opportunities with a clear return, not the ones that made for the best demo",
      "The decision-making process for AI adoption becomes structured and defensible rather than reactive or driven by whoever scheduled the meeting",
      "Work is sequenced from what's achievable early, which builds internal confidence before the higher-risk initiatives",
      "Vendor and technology evaluation becomes systematic instead of dependent on who got there first",
      "The strategy accounts for your team's actual capacity — not an idealized version of it",
      "Leadership and technical teams develop shared language around AI, which makes every subsequent conversation more productive",
    ],
    pullQuote:
      "The right project isn't the most sophisticated one — it's the one worth doing, and sometimes the honest answer is not yet.",
  },
};
