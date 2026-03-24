import { useState } from "react";
import FadeIn from "@/components/FadeIn";

/* ────────────────────────────────────────────
   Data
   ──────────────────────────────────────────── */

const solutions = [
  {
    id: "erp",
    cardTitle: "Unified Business Operations",
    short: "A centralized platform that connects inventory, sales, finance, operations, and supply chain in one place.",
    full: "Managing a business across disconnected systems creates chaos. Our custom ERP solutions consolidate your operations into a single source of truth. We build scalable, modular systems that grow with your business.",
    capabilities: [
      "End-to-end procurement tracking with supplier and SKU management",
      "Multi-stakeholder coordination for importers and freight forwarders",
      "Shelf-level warehouse tracking and distribution management",
      "Real-time inventory indexing with quote generation",
      "Comprehensive sales order workflow from quote to fulfillment",
      "Vendor-to-customer delivery execution and tracking",
    ],
    impact: [
      "Reduce operational overhead by 30–50%",
      "Real-time visibility across all business functions",
      "Eliminate manual data entry and reporting errors",
    ],
    icon: (
      <svg viewBox="0 0 24 24" fill="none" className="h-7 w-7" aria-hidden="true">
        <path d="M3.75 6A2.25 2.25 0 016 3.75h2.25A2.25 2.25 0 0110.5 6v2.25a2.25 2.25 0 01-2.25 2.25H6a2.25 2.25 0 01-2.25-2.25V6zM3.75 15.75A2.25 2.25 0 016 13.5h2.25a2.25 2.25 0 012.25 2.25V18a2.25 2.25 0 01-2.25 2.25H6A2.25 2.25 0 013.75 18v-2.25zM13.5 6a2.25 2.25 0 012.25-2.25H18A2.25 2.25 0 0120.25 6v2.25A2.25 2.25 0 0118 10.5h-2.25a2.25 2.25 0 01-2.25-2.25V6zM13.5 15.75a2.25 2.25 0 012.25-2.25H18a2.25 2.25 0 012.25 2.25V18A2.25 2.25 0 0118 20.25h-2.25a2.25 2.25 0 01-2.25-2.25v-2.25z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    ),
  },
  {
    id: "booking",
    cardTitle: "Scheduling Made Effortless",
    short: "A two-sided booking platform for vendors and customers — browse, book, and pay online.",
    full: "Generic booking tools force you to adapt to their limitations. We build custom scheduling systems that match your exact service model.",
    capabilities: [
      "Real-time availability and calendar management",
      "Multi-service and multi-location booking",
      "Integrated payment processing (Stripe, PayPal)",
      "Automated email and SMS reminders",
      "Customer self-service portal",
      "Resource and staff scheduling optimization",
    ],
    impact: [
      "Reduce no-shows by 40%+ with automated reminders",
      "24/7 self-service availability",
      "Eliminate double-bookings and scheduling conflicts",
    ],
    icon: (
      <svg viewBox="0 0 24 24" fill="none" className="h-7 w-7" aria-hidden="true">
        <path d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 012.25-2.25h13.5A2.25 2.25 0 0121 7.5v11.25m-18 0A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75m-18 0v-7.5A2.25 2.25 0 015.25 9h13.5A2.25 2.25 0 0121 11.25v7.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    ),
  },
  {
    id: "data-management",
    cardTitle: "Your Data, Organized",
    short: "Digitize and centralize your data through OCR scanning, structured management, and robust validation.",
    full: "Data scattered across spreadsheets, databases, and third-party tools is data you can\u2019t leverage. We architect systems that consolidate, normalize, and structure your information for maximum usability.",
    capabilities: [
      "Data warehouse architecture and ETL pipelines",
      "Real-time data synchronization and validation",
      "Custom reporting and analytics dashboards",
      "Data governance and access control",
      "API integrations for data ingestion",
    ],
    impact: [
      "Reduce reporting time from days to minutes",
      "Automated validation for data accuracy",
      "Centralized analytics to unlock insights",
    ],
    icon: (
      <svg viewBox="0 0 24 24" fill="none" className="h-7 w-7" aria-hidden="true">
        <path d="M20.25 6.375c0 2.278-3.694 4.125-8.25 4.125S3.75 8.653 3.75 6.375m16.5 0c0-2.278-3.694-4.125-8.25-4.125S3.75 4.097 3.75 6.375m16.5 0v11.25c0 2.278-3.694 4.125-8.25 4.125s-8.25-1.847-8.25-4.125V6.375m16.5 0v3.75m-16.5-3.75v3.75m16.5 0v3.75C20.25 16.153 16.556 18 12 18s-8.25-1.847-8.25-4.125v-3.75m16.5 0c0 2.278-3.694 4.125-8.25 4.125s-8.25-1.847-8.25-4.125" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    ),
  },
  {
    id: "ai-chatbot",
    cardTitle: "Intelligent Conversations at Scale",
    short: "A customizable AI chatbot that learns your business and serves your customers 24/7.",
    full: "Your team shouldn\u2019t waste time answering the same questions repeatedly. Our enterprise AI chatbots leverage natural language processing and machine learning to handle customer inquiries, internal support, and more.",
    capabilities: [
      "Natural language understanding and generation",
      "Multi-channel deployment",
      "Custom knowledge base training and updates",
      "Sentiment analysis and escalation routing",
      "Seamless human handoff when needed",
      "Integration with CRM and ticketing systems",
    ],
    impact: [
      "Resolve 60–80% of inquiries instantly",
      "24/7 support across all time zones",
      "Reduce support costs by up to 70%",
    ],
    icon: (
      <svg viewBox="0 0 24 24" fill="none" className="h-7 w-7" aria-hidden="true">
        <path d="M7.5 8.25h9m-9 3H12m-9.75 1.51c0 1.6 1.123 2.994 2.707 3.227 1.129.166 2.27.293 3.423.379.35.026.67.21.865.501L12 21l2.755-4.133a1.14 1.14 0 01.865-.501 48.172 48.172 0 003.423-.379c1.584-.233 2.707-1.626 2.707-3.228V6.741c0-1.602-1.123-2.995-2.707-3.228A48.394 48.394 0 0012 3c-2.392 0-4.744.175-7.043.513C3.373 3.746 2.25 5.14 2.25 6.741v6.018z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    ),
  },
  {
    id: "support-modules",
    cardTitle: "Modular Building Blocks",
    short: "Production-ready, plug-and-play modules to extend your existing systems.",
    full: "Not every challenge requires a complete rebuild. Our support modules are production-ready components designed to enhance your existing infrastructure.",
    capabilities: [
      "User authentication and authorization (OAuth, SSO)",
      "Email and SMS notification systems",
      "Payment processing and subscription billing",
      "File upload and document management",
      "Audit logs and activity tracking",
    ],
    impact: [
      "Reduce build time by 50%+ for common features",
      "Proven security patterns out of the box",
      "Focus resources on unique business logic",
    ],
    icon: (
      <svg viewBox="0 0 24 24" fill="none" className="h-7 w-7" aria-hidden="true">
        <path d="M14.25 6.087c0-.355.186-.676.401-.959.221-.29.349-.634.349-1.003 0-1.036-1.007-1.875-2.25-1.875s-2.25.84-2.25 1.875c0 .369.128.713.349 1.003.215.283.401.604.401.959v0a.64.64 0 01-.657.643 48.491 48.491 0 01-4.163-.3c-1.584-.233-2.707-1.626-2.707-3.228V6.741c0-1.602 1.123-2.995 2.707-3.228A48.394 48.394 0 0112 3c2.392 0 4.744.175 7.043.513 1.584.233 2.707 1.626 2.707 3.228V6.087z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
        <path d="M9.75 17.065v0a.64.64 0 00.657-.643c0-.355-.186-.676-.401-.959a1.647 1.647 0 01-.349-1.003c0-1.035 1.007-1.875 2.25-1.875s2.25.84 2.25 1.875c0 .369-.128.713-.349 1.003-.215.283-.401.604-.401.959v0c0 .357.288.642.643.657a48.491 48.491 0 004.163-.3c1.584-.233 2.707-1.626 2.707-3.228v-.318c0-1.602-1.123-2.995-2.707-3.228A48.394 48.394 0 0012 9c-2.392 0-4.744.175-7.043.513C3.373 9.746 2.25 11.14 2.25 12.741v.318c0 1.602 1.123 2.995 2.707 3.228a48.491 48.491 0 004.163.3z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    ),
  },
  {
    id: "custom-system",
    cardTitle: "Built for Your Vision",
    short: "Completely bespoke systems for challenges too specific for off-the-shelf solutions.",
    full: "Some problems are too specific, too complex, or too innovative for existing solutions. This is where we excel. Custom system development means starting from first principles.",
    capabilities: [
      "Full-stack custom application development",
      "Domain-specific system architecture",
      "Custom API design and integration",
      "Scalable microservices architecture",
      "Security hardening and compliance",
    ],
    impact: [
      "Own your competitive advantage — no vendor dependencies",
      "Build exactly what you envision without limitations",
      "Evolve your system as your business changes",
    ],
    icon: (
      <svg viewBox="0 0 24 24" fill="none" className="h-7 w-7" aria-hidden="true">
        <path d="M9.813 15.904L9 18.75l-.813-2.846a4.5 4.5 0 00-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 003.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 003.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 00-3.09 3.09zM18.259 8.715L18 9.75l-.259-1.035a3.375 3.375 0 00-2.455-2.456L14.25 6l1.036-.259a3.375 3.375 0 002.455-2.456L18 2.25l.259 1.035a3.375 3.375 0 002.455 2.456L21.75 6l-1.036.259a3.375 3.375 0 00-2.455 2.456zM16.894 20.567L16.5 21.75l-.394-1.183a2.25 2.25 0 00-1.423-1.423L13.5 18.75l1.183-.394a2.25 2.25 0 001.423-1.423l.394-1.183.394 1.183a2.25 2.25 0 001.423 1.423l1.183.394-1.183.394a2.25 2.25 0 00-1.423 1.423z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    ),
  },
];

/* ────────────────────────────────────────────
   Sub-components
   ──────────────────────────────────────────── */

function CheckIcon({ className = "text-teal" }: { className?: string }) {
  return (
    <svg viewBox="0 0 20 20" fill="currentColor" className={`h-5 w-5 shrink-0 ${className}`} aria-hidden="true">
      <path fillRule="evenodd" d="M16.704 4.153a.75.75 0 01.143 1.052l-8 10.5a.75.75 0 01-1.127.075l-4.5-4.5a.75.75 0 011.06-1.06l3.894 3.893 7.48-9.817a.75.75 0 011.05-.143z" clipRule="evenodd" />
    </svg>
  );
}

function ImpactIcon() {
  return (
    <svg viewBox="0 0 20 20" fill="currentColor" className="h-5 w-5 shrink-0 text-indigo" aria-hidden="true">
      <path fillRule="evenodd" d="M10.868 2.884c-.321-.772-1.415-.772-1.736 0l-1.83 4.401-4.753.381c-.833.067-1.171 1.107-.536 1.651l3.62 3.102-1.106 4.637c-.194.813.691 1.456 1.405 1.02L10 15.591l4.069 2.485c.713.436 1.598-.207 1.404-1.02l-1.106-4.637 3.62-3.102c.635-.544.297-1.584-.536-1.65l-4.752-.382-1.831-4.401z" clipRule="evenodd" />
    </svg>
  );
}

function SolutionCard({ solution, index }: { solution: (typeof solutions)[number]; index: number }) {
  const [expanded, setExpanded] = useState(false);

  return (
    <FadeIn delay={index * 100}>
      <div
        className={`group relative rounded-2xl border transition-all duration-300 ${
          expanded
            ? "border-teal/25 bg-white/[0.04] shadow-[0_0_40px_rgba(0,212,170,0.06)]"
            : "border-white/[0.06] bg-white/[0.02] hover:border-teal/15 hover:bg-white/[0.03]"
        }`}
      >
        {/* ── Collapsed Card ── */}
        <button
          onClick={() => setExpanded(!expanded)}
          className="flex w-full items-start gap-4 p-6 text-left sm:p-8"
          aria-expanded={expanded}
          aria-controls={`${solution.id}-details`}
        >
          {/* Icon */}
          <div className={`flex h-14 w-14 shrink-0 items-center justify-center rounded-xl transition-colors ${
            expanded ? "bg-teal/15 text-teal" : "bg-teal/10 text-teal"
          }`}>
            {solution.icon}
          </div>

          {/* Text */}
          <div className="flex-1">
            <h2 id={`${solution.id}-title`} className="text-lg font-bold text-white sm:text-xl">
              {solution.cardTitle}
            </h2>
            <p className="mt-2 text-sm leading-relaxed text-neutral-dark sm:text-base">
              {solution.short}
            </p>
          </div>

          {/* Expand chevron */}
          <svg
            viewBox="0 0 20 20"
            fill="currentColor"
            className={`h-5 w-5 shrink-0 text-neutral-dark transition-transform duration-300 ${
              expanded ? "rotate-180" : ""
            }`}
            aria-hidden="true"
          >
            <path fillRule="evenodd" d="M5.23 7.21a.75.75 0 011.06.02L10 11.168l3.71-3.938a.75.75 0 111.08 1.04l-4.25 4.5a.75.75 0 01-1.08 0l-4.25-4.5a.75.75 0 01.02-1.06z" clipRule="evenodd" />
          </svg>
        </button>

        {/* ── Expanded Content ── */}
        <div
          id={`${solution.id}-details`}
          role="region"
          aria-labelledby={`${solution.id}-title`}
          className={`overflow-hidden transition-all duration-300 ${
            expanded ? "max-h-[1200px] opacity-100" : "max-h-0 opacity-0"
          }`}
        >
          <div className="border-t border-white/[0.06] px-6 pb-8 pt-6 sm:px-8">
            {/* Full description */}
            <p className="text-sm leading-relaxed text-neutral-dark sm:text-base">
              {solution.full}
            </p>

            {/* Two-column: Capabilities + Impact */}
            <div className="mt-8 grid gap-8 lg:grid-cols-[1fr_auto]">
              {/* Capabilities */}
              <div>
                <h4 className="text-xs font-bold uppercase tracking-[0.2em] text-teal/70">
                  Key Capabilities
                </h4>
                <ul className="mt-4 space-y-3">
                  {solution.capabilities.map((cap) => (
                    <li key={cap} className="flex items-start gap-3">
                      <CheckIcon />
                      <span className="text-sm leading-relaxed text-neutral-dark">
                        {cap}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Impact */}
              <div className="lg:w-72">
                <h4 className="text-xs font-bold uppercase tracking-[0.2em] text-indigo/70">
                  Impact
                </h4>
                <div className="mt-4 space-y-3">
                  {solution.impact.map((imp) => (
                    <div
                      key={imp}
                      className="flex items-start gap-3 rounded-xl border border-indigo/10 bg-indigo/[0.04] px-4 py-3"
                    >
                      <ImpactIcon />
                      <span className="text-sm leading-relaxed text-neutral-light">
                        {imp}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </FadeIn>
  );
}

/* ────────────────────────────────────────────
   Main Component
   ──────────────────────────────────────────── */

export default function SolutionsContent() {
  return (
    <>
      {/* ─── Hero ─── */}
      <section className="relative overflow-hidden pt-32 pb-20 sm:pt-40 sm:pb-28">
        <div className="absolute -top-32 -right-32 h-96 w-96 rounded-full bg-teal/10 blur-[120px]" />
        <div className="absolute -bottom-32 -left-32 h-96 w-96 rounded-full bg-indigo/10 blur-[120px]" />

        <div className="relative mx-auto max-w-7xl px-6 lg:px-8">
          <FadeIn className="mx-auto max-w-3xl text-center">
            <h1 className="text-4xl font-extrabold tracking-tight text-white sm:text-5xl lg:text-6xl">
              Solutions Built for{" "}
              <span className="bg-gradient-to-r from-teal to-indigo bg-clip-text text-transparent">
                Real Business Challenges
              </span>
            </h1>
            <p className="mt-6 text-base leading-relaxed text-neutral-dark sm:text-lg lg:text-xl">
              From enterprise resource planning to AI-powered chatbots, we build
              custom solutions that address your specific challenges with
              precision and scale.
            </p>
          </FadeIn>
        </div>
      </section>

      {/* ─── Solution Cards ─── */}
      <section className="relative py-16 sm:py-24">
        <div className="mx-auto max-w-5xl px-6 lg:px-8">
          <div className="space-y-6">
            {solutions.map((sol, i) => (
              <SolutionCard key={sol.id} solution={sol} index={i} />
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
