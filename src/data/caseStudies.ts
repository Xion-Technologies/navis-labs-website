export type CaseStudyAccent = "teal" | "indigo";

export interface CaseStudy {
  slug: string;
  title: string;
  industry: string;
  summary: string;
  cardDescription: string;
  image?: string;
  tags: string[];
  accent: CaseStudyAccent;
  clientOverview: Record<string, string>;
  challenge: {
    paragraphs: string[];
    bullets: string[];
  };
  approach: {
    paragraphs: string[];
    bullets: string[];
  };
  results: string[];
  whyItMatters: string[];
  technologies: string[];
  anonymizedNote: string;
}

export const caseStudies: CaseStudy[] = [
  {
    slug: "hospital-ai-chatbot",
    title:
      "Bridging the Healthcare Gap: An AI-Powered Patient Assistant That Transformed Access for a Rural Municipality",
    industry: "Healthcare",
    summary:
      "A municipal hospital serving a rural population used an AI assistant to improve patient access, reduce frontline bottlenecks, and increase confidence in local care.",
    cardDescription:
      "An AI patient assistant helped a rural municipal hospital reduce inquiry overload and improve local patient retention.",
    image: "/case-studies/hospital-ai-chatbot.png",
    tags: ["Healthcare", "Conversational AI", "Patient Experience"],
    accent: "teal",
    clientOverview: {
      Industry: "Healthcare",
      Setting: "Municipal hospital serving ~120,000 residents",
      Location: "Rural developing city",
    },
    challenge: {
      paragraphs: [
        "As the only hospital in a developing city of approximately 120,000 residents, the client faced high demand with limited administrative and clinical capacity.",
        "Patients were often unable to get timely answers about available care, so many traveled over an hour to larger neighboring facilities.",
        "This reduced local trust and revenue while slowing the hospital's ability to establish itself as a modern and credible provider.",
      ],
      bullets: [
        "Staffing limitations overwhelmed phone and front-desk support.",
        "Low awareness of available local specialties led residents to look elsewhere.",
        "Patient attrition to other municipalities weakened community confidence.",
        "The hospital needed to signal modernization and stronger patient experience.",
      ],
    },
    approach: {
      paragraphs: [
        "We designed and implemented a conversational AI patient assistant that feels approachable, human, and clear for first-time chatbot users.",
        "Discovery sessions with administrators and frontline staff identified high-frequency inquiries covering general information and specialty availability.",
        "The assistant was integrated into the website and made mobile-friendly so patients could access support wherever they already were.",
      ],
      bullets: [
        "Natural language conversations with follow-up handling and empathetic responses.",
        "Comprehensive knowledge base covering departments, services, scheduling, and FAQs.",
        "24/7 information access to remove staffing-hour bottlenecks.",
        "Multilingual-ready architecture for future expansion.",
        "Graceful escalation to human staff with context handoff.",
      ],
    },
    results: [
      "Estimated 60-70% reduction in routine phone inquiries.",
      "Round-the-clock access to hospital information for patients.",
      "Projected increase in local patient retention for specialty services.",
      "Stronger perception of the hospital as a modern, tech-forward institution.",
      "A foundation for scheduling integration, pre-screening, and post-visit workflows.",
    ],
    whyItMatters: [
      "In underserved regions, unanswered questions become barriers to care.",
      "The AI assistant gave the hospital always-on patient presence without requiring immediate staffing expansion.",
      "The project demonstrates how practical modernization can strengthen trust and access in rural healthcare systems.",
    ],
    technologies: [
      "Conversational AI",
      "Natural Language Processing",
      "Knowledge Base Architecture",
      "Web Integration",
      "Mobile-Responsive Design",
    ],
    anonymizedNote:
      "This case study has been anonymized to protect client confidentiality.",
  },
  {
    slug: "insurance-ai-chatbot",
    title:
      "Modernizing a Legacy Insurance Leader: Reintroducing a Multi-Hundred-Million-Dollar Non-Life Insurer to the Digital Age with AI",
    industry: "Non-Life Insurance",
    summary:
      "A top-tier insurer modernized customer education and lead handling with an always-on AI assistant, while laying the groundwork for broader digital transformation.",
    cardDescription:
      "A client-facing insurance chatbot reduced hotline load and improved plan discovery for a legacy national insurer.",
    image: "/case-studies/insurance-ai-chatbot.png",
    tags: ["Insurance", "Conversational AI", "Digital Transformation"],
    accent: "indigo",
    clientOverview: {
      Industry: "Non-Life Insurance",
      "Client Type": "Top-tier national provider",
      Scale:
        "Approximately $445M USD in total assets and among regional leaders by net premiums written",
    },
    challenge: {
      paragraphs: [
        "The client had a strong legacy brand and large product portfolio, but its customer experience had not kept pace with digital buying behavior.",
        "Prospective buyers struggled to compare plans without guided support, and routine service inquiries saturated the hotline.",
        "Internal growth also exposed onboarding bottlenecks that repeatedly pulled senior staff away from core work.",
      ],
      bullets: [
        "Call center overload from repetitive, low-complexity questions.",
        "Slow plan discovery for prospects evaluating coverage options.",
        "Lead leakage due to drop-off during early decision stages.",
        "Need to modernize carefully without damaging trusted brand tone.",
      ],
    },
    approach: {
      paragraphs: [
        "We defined a phased modernization strategy centered on a public chatbot first, then an internal onboarding assistant in phase two.",
        "Cross-functional discovery with marketing, service, and operations teams shaped the content model, tone, and escalation logic.",
        "The first release focused on plan education and FAQ support to deliver fast value with low organizational risk.",
      ],
      bullets: [
        "Guided plan introduction and comparison in plain language.",
        "24/7 FAQ resolution for eligibility, claims, terms, and payments.",
        "Brand-aligned conversational voice tuned for credibility and clarity.",
        "Seamless live-agent escalation with preserved context.",
        "Website-native deployment as a persistent digital touchpoint.",
      ],
    },
    results: [
      "Estimated 50-70% reduction in routine hotline inquiries.",
      "Improved lead retention and conversion during plan discovery.",
      "Always-on plan exploration outside normal business hours.",
      "Stronger public signal of modernization for a legacy insurer.",
      "Operational base for future quote, policy, and renewal self-service flows.",
    ],
    whyItMatters: [
      "Digital transformation in insurance is as much cultural as technical.",
      "A focused use case protected trust while reducing pressure on human support teams.",
      "The rollout extended a legacy brand into modern channels without replacing core service relationships.",
    ],
    technologies: [
      "Conversational AI",
      "Natural Language Processing",
      "Knowledge Base Architecture",
      "Web Integration",
      "Live Agent Handoff",
      "Brand Voice Tuning",
    ],
    anonymizedNote:
      "This case study has been anonymized to protect client confidentiality.",
  },
  {
    slug: "enterprise-erp-overhaul",
    title:
      "From Legacy to Leading: A Full ERP Overhaul That Brought a 50-Year-Old Hospitality Distributor Into the Modern Era",
    industry: "Retail & Distribution",
    summary:
      "A nationwide hospitality distributor replaced a fragile legacy FoxPro stack with a modern custom ERP, improving speed, governance, and scalability.",
    cardDescription:
      "A full ERP rebuild modernized operations, access control, and accountability for a nationwide hospitality distributor.",
    image: "/case-studies/enterprise-erp-overhaul.png",
    tags: ["ERP", "Legacy Modernization", "Operations"],
    accent: "teal",
    clientOverview: {
      Industry: "Retail & Distribution (Hospitality / Foodservice Supply)",
      "Client Type": "Nationwide hospitality and foodservice distributor",
      Scale:
        "50+ years in operation, 1,000+ employees across retail and distribution functions",
    },
    challenge: {
      paragraphs: [
        "The client relied on a legacy FoxPro system that had become unstable, slow, and hard to use for daily operations.",
        "Employees depended on undocumented workarounds, and new-hire onboarding was prolonged by a confusing interface.",
        "Weak permissions and limited validation created avoidable risk, rework, and poor auditability across core workflows.",
      ],
      bullets: [
        "Frequent lag and crashes reduced operational productivity.",
        "Steep training curves blocked workforce scaling.",
        "Minimal access control exposed unrelated and sensitive modules.",
        "Lack of checkpoint validation allowed errors to propagate.",
      ],
    },
    approach: {
      paragraphs: [
        "We treated this as an operational overhaul, not just a software migration, beginning with deep process mapping across departments.",
        "Discovery surfaced process issues hidden by legacy permissiveness, which informed both system design and workflow redesign.",
        "We delivered a custom ERP spanning sales, inventory, purchasing, finance, HR, and reporting with governance built in by default.",
      ],
      bullets: [
        "End-to-end integrated operations suite replacing siloed handoffs.",
        "Modern, responsive interface optimized for frontline productivity.",
        "Hierarchical RBAC with approval chains for sensitive actions.",
        "Validation checkpoints embedded throughout critical workflows.",
        "Full audit trail for user action traceability and diagnostics.",
      ],
    },
    results: [
      "Significantly faster day-to-day operations with fewer interruptions.",
      "Dramatically reduced onboarding and training time for new hires.",
      "Cleaner role-scoped experiences with lower accidental-change risk.",
      "Improved governance through approvals, validation, and accountability.",
      "Real-time leadership visibility across key business functions.",
      "A scalable platform foundation for future analytics and automation.",
    ],
    whyItMatters: [
      "Long-lived businesses often delay replacing systems that still 'mostly work,' even when friction compounds every year.",
      "The project shows that modernization succeeds when technology and process redesign move together.",
      "The new ERP preserved institutional strengths while enabling speed and control expected of modern operators.",
    ],
    technologies: [
      "Custom ERP Development",
      "Role-Based Access Control",
      "Approval Workflow Engine",
      "Process Validation Framework",
      "Audit Logging",
      "Modern Web Interface Design",
      "Legacy System Migration",
    ],
    anonymizedNote:
      "This case study has been anonymized to protect client confidentiality.",
  },
  {
    slug: "legal-knowledge-platform",
    title:
      "Building a Legal Knowledge Engine: The Custom Document Platform Behind a Tenured Legal Practice's Digital Transformation",
    industry: "Legal Services",
    summary:
      "A boutique legal practice transformed scattered archives into an intelligent, client-centered knowledge platform with OCR and AI-assisted drafting.",
    cardDescription:
      "A custom legal platform centralized matter history, enabled intelligent retrieval, and accelerated contract drafting.",
    image: "/case-studies/legal-knowledge-platform.png",
    tags: ["Legal Tech", "Knowledge Management", "AI Drafting"],
    accent: "indigo",
    clientOverview: {
      Industry: "Legal Services",
      "Client Type": "Boutique legal practice and advisory consultancy",
      Scale:
        "Senior tenured attorney with a team of practicing lawyers and consulting responsibilities",
    },
    challenge: {
      paragraphs: [
        "Years of legal work had produced a large document corpus spread across folders, drives, emails, and physical archives.",
        "The firm lacked a context-aware system that connected documents to clients, matters, versions, and related artifacts.",
        "Attorneys spent excessive time on retrieval and first-pass drafting instead of high-value legal analysis and strategy.",
      ],
      bullets: [
        "Document chaos and slow retrieval of critical files.",
        "Weak client and matter history tracking.",
        "Manual drafting overhead for repeat contract types.",
        "Knowledge concentrated in individuals instead of firm systems.",
      ],
    },
    approach: {
      paragraphs: [
        "We approached the engagement as a knowledge architecture initiative first, then a platform build.",
        "Discovery sessions mapped how lawyers naturally organize work by client, matter, document type, and lifecycle stage.",
        "The resulting platform combines repository structure, intelligent retrieval, and AI-supported drafting in one workflow.",
      ],
      bullets: [
        "Client- and matter-centered repository as a single source of truth.",
        "OCR pipeline for searchable scanned and legacy documents.",
        "Smart tagging and indexing for metadata-rich retrieval.",
        "Contextual search and relationship mapping between related documents.",
        "AI-assisted first-pass contract drafting for faster legal production.",
      ],
    },
    results: [
      "Centralized, searchable document corpus replacing fragmented storage.",
      "Intelligent retrieval that surfaces relevant content without exact filename recall.",
      "More attorney time shifted to review, negotiation, and client strategy.",
      "Stronger advisory output enabled by accessible institutional knowledge.",
      "Audit-ready matter timelines and cleaner team handoffs.",
      "Platform foundation ready for deeper analytics and workflow automation.",
    ],
    whyItMatters: [
      "Legal firms generate expertise continuously, but value is lost when prior work is not discoverable.",
      "Connecting repository structure, retrieval intelligence, and drafting acceleration turns historical work into a repeatable competitive asset.",
      "The approach is replicable for boutique and mid-sized firms seeking scale without sacrificing legal quality.",
    ],
    technologies: [
      "Custom Legal Management Platform",
      "Client & Matter-Based Repository",
      "Optical Character Recognition",
      "Smart Tagging & Indexing",
      "Contextual Retrieval",
      "AI-Powered Contract Drafting",
      "Knowledge Graph Architecture",
    ],
    anonymizedNote:
      "This case study has been anonymized to protect client confidentiality.",
  },
];

export function getCaseStudyBySlug(slug: string): CaseStudy | undefined {
  return caseStudies.find((study) => study.slug === slug);
}
