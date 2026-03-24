import { lazy, Suspense } from "react";
import FadeIn from "@/components/FadeIn";
import UseCasesShowcase, { type UseCase } from "@/components/UseCasesShowcase";

const InnovationFunnel = lazy(() => import("@/components/InnovationFunnel"));
const CustomDevGraphic = lazy(() => import("@/components/CustomDevGraphic"));
const AIIntegrationGraphic = lazy(() => import("@/components/AIIntegrationGraphic"));
const ProductDesignGraphic = lazy(() => import("@/components/ProductDesignGraphic"));
const SystemIntegrationGraphic = lazy(() => import("@/components/SystemIntegrationGraphic"));
const CloudArchGraphic = lazy(() => import("@/components/CloudArchGraphic"));

const serviceGraphics: Record<string, React.ReactNode> = {
  "innovation-lab": <Suspense fallback={null}><InnovationFunnel /></Suspense>,
  "custom-development": <Suspense fallback={null}><CustomDevGraphic /></Suspense>,
  "ai-integration": <Suspense fallback={null}><AIIntegrationGraphic /></Suspense>,
  "product-design": <Suspense fallback={null}><ProductDesignGraphic /></Suspense>,
  "system-integration": <Suspense fallback={null}><SystemIntegrationGraphic /></Suspense>,
  "cloud-architecture": <Suspense fallback={null}><CloudArchGraphic /></Suspense>,
};

const services = [
  {
    id: "innovation-lab",
    title: "Innovation Lab",
    tagline: "Your vision is our playground of possibilities.",
    desc: "Experimental projects pushing the boundaries of what\u2019s possible, leveraging today\u2019s most powerful technology to explore new frontiers. Experience AI tools you can actually use in your business.",
    items: [
      "Full access to AI consultants for ideation and R&D",
      "Full access to product team for design & development",
      "Proof-of-concept prototype",
      "Technology feasibility assessment",
      "Go/no-go development brief",
    ],
    useCases: [
      {
        tab: "AI Tool Integration",
        title: "AI Tool Integration",
        description: "We integrate industry-leading AI platforms — Claude, OpenAI, and more — directly into your existing workflows. No need to figure out which tool fits where; we handle the selection, configuration, and deployment.",
        details: [
          "Connect Claude, GPT, Gemini, and other LLMs to your business systems",
          "Custom API integrations tailored to your specific workflows",
          "Unified AI gateway so you can swap models without reworking your stack",
          "Ongoing optimization as new models and capabilities are released",
        ],
      },
      {
        tab: "AI Agent Curation",
        title: "AI Agent Curation",
        description: "We design and curate agentic processes under the Navis platform — autonomous AI agents that handle multi-step tasks, make decisions, and execute workflows on your behalf with human oversight.",
        details: [
          "Custom AI agents tailored to your operational processes",
          "Multi-step task orchestration with built-in decision logic",
          "Human-in-the-loop approval flows for critical actions",
          "Hosted and managed under the Navis platform for reliability",
        ],
      },
      {
        tab: "AI Skill Building",
        title: "AI Skill Building",
        description: "We create specialized AI skills that are trained on your business domain — turning general-purpose AI into a tool that understands your industry, terminology, and processes inside out.",
        details: [
          "Domain-specific knowledge bases built from your data and documentation",
          "Custom skills for automating repetitive business tasks",
          "Industry-trained AI that speaks your language and follows your SOPs",
          "Continuous skill refinement as your processes evolve",
        ],
      },
    ] as UseCase[],
    icon: (
      <svg viewBox="0 0 24 24" fill="none" className="h-7 w-7" aria-hidden="true">
        <path d="M9.663 17h4.674M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l.146.146A3.004 3.004 0 0118 19.5a3 3 0 01-3 3H9a3 3 0 01-3-3 3.004 3.004 0 012.536-2.864l.127-.146z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    ),
  },
  {
    id: "custom-development",
    title: "Custom Development",
    tagline: "Bespoke software, built with you in mind.",
    desc: "Software solutions engineered with precision, scalability, and performance \u2014 with you in mind every step of the way.",
    items: [
      "Full-stack web or mobile application",
      "Database architecture & schema design",
      "Admin dashboard & back-office tools",
      "Production deployment & launch support",
    ],
    useCases: [
      {
        tab: "UI/UX Design",
        title: "UI/UX Design",
        description: "We craft intuitive, pixel-perfect interfaces that your customers will love — from user research and wireframing all the way to high-fidelity prototypes and developer-ready design systems.",
        details: [
          "User research, persona mapping, and journey flows",
          "Wireframes and interactive prototypes in Figma",
          "Design system with reusable component library",
          "Developer-ready specs and handoff documentation",
        ],
      },
      {
        tab: "End to End Development",
        title: "End to End Development",
        description: "From the first line of code to production deployment — we build complete, full-stack applications engineered for scale, performance, and maintainability. You get a system that works, not a half-finished project.",
        details: [
          "Full-stack web and mobile application development",
          "Database architecture, schema design, and data modeling",
          "Admin dashboards and internal back-office tooling",
          "Production deployment, CI/CD pipelines, and launch support",
        ],
      },
      {
        tab: "Cloud Architecture",
        title: "Cloud Architecture",
        description: "Modern hosting, zero-downtime deployment, and global-standard security practices — we architect your infrastructure so your system is fast, secure, and available wherever your users are.",
        details: [
          "Cloud infrastructure on AWS, GCP, or Azure",
          "Auto-scaling, load balancing, and CDN configuration",
          "SSL, firewall hardening, and security best practices",
          "Monitoring, alerting, and disaster recovery planning",
        ],
      },
      {
        tab: "Legacy Modernization",
        title: "Legacy System Modernization",
        description: "Outdated systems slow you down and cost you more the longer you wait. We modernize your legacy infrastructure — migrating, refactoring, and integrating it into a unified, future-proof ecosystem.",
        details: [
          "Legacy codebase audit and modernization roadmap",
          "Incremental migration without business disruption",
          "API wrappers and middleware for legacy system integration",
          "Data migration with validation and zero-loss guarantees",
        ],
      },
    ] as UseCase[],
    icon: (
      <svg viewBox="0 0 24 24" fill="none" className="h-7 w-7" aria-hidden="true">
        <path d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    ),
  },
];

function CheckIcon() {
  return (
    <svg viewBox="0 0 20 20" fill="currentColor" className="h-5 w-5 shrink-0 text-teal" aria-hidden="true">
      <path fillRule="evenodd" d="M16.704 4.153a.75.75 0 01.143 1.052l-8 10.5a.75.75 0 01-1.127.075l-4.5-4.5a.75.75 0 011.06-1.06l3.894 3.893 7.48-9.817a.75.75 0 011.05-.143z" clipRule="evenodd" />
    </svg>
  );
}

export default function ServicesContent() {
  return (
    <>
      {/* ─── Hero ─── */}
      <section className="relative overflow-hidden pt-32 pb-20 sm:pt-40 sm:pb-28">
        <div className="absolute -top-32 -right-32 h-96 w-96 rounded-full bg-teal/10 blur-[120px]" />
        <div className="absolute -bottom-32 -left-32 h-96 w-96 rounded-full bg-indigo/10 blur-[120px]" />

        <div className="relative mx-auto max-w-7xl px-6 lg:px-8">
          <FadeIn className="mx-auto max-w-3xl text-center">
            <h1 className="text-4xl font-extrabold tracking-tight text-white sm:text-5xl lg:text-6xl">
              Full-Stack Expertise Meets{" "}
              <span className="bg-gradient-to-r from-teal to-indigo bg-clip-text text-transparent">
                AI-Driven Innovation
              </span>
            </h1>
            <p className="mt-6 text-base leading-relaxed text-neutral-dark sm:text-lg lg:text-xl">
              We build systems that don&rsquo;t just work for you — they
              continue to evolve and scale with you.
            </p>
          </FadeIn>
        </div>
      </section>

      {/* ─── Service Blocks ─── */}
      <section className="relative py-16 sm:py-24">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          {services.map((service, i) => {
            const isAlt = i % 2 === 1;
            const accentColor = isAlt ? "indigo" : "teal";
            const graphic = serviceGraphics[service.id];

            return (
              <div
                key={service.id}
                id={service.id}
                className={`flex scroll-mt-24 flex-col gap-10 py-16 sm:py-24 lg:flex-row lg:gap-16 ${
                  i > 0 ? "border-t border-white/[0.04]" : ""
                }`}
              >
                {/* Left: text + What You Get stacked */}
                <div className="flex-1">
                  <FadeIn direction="left">
                    <div className="flex items-center gap-4">
                      <div
                        className={`flex h-14 w-14 items-center justify-center rounded-xl ${
                          isAlt ? "bg-indigo/10 text-indigo" : "bg-teal/10 text-teal"
                        }`}
                      >
                        {service.icon}
                      </div>
                      <h2 className="text-2xl font-extrabold text-white sm:text-3xl">
                        {service.title}
                      </h2>
                    </div>
                    <p
                      className={`mt-4 text-sm font-semibold uppercase tracking-[0.15em] ${
                        isAlt ? "text-indigo" : "text-teal"
                      }`}
                    >
                      {service.tagline}
                    </p>
                    <p className="mt-4 text-base leading-relaxed text-neutral-dark sm:text-lg">
                      {service.desc}
                    </p>
                  </FadeIn>

                  <FadeIn direction="left" delay={150}>
                    <div
                      className={`mt-8 rounded-2xl border bg-white/[0.02] p-6 sm:p-8 ${
                        isAlt ? "border-indigo/15" : "border-teal/15"
                      }`}
                    >
                      <h3
                        className={`text-xs font-bold uppercase tracking-[0.2em] ${
                          isAlt ? "text-indigo/70" : "text-teal/70"
                        }`}
                      >
                        What You Get
                      </h3>
                      <ul className="mt-5 space-y-3">
                        {service.items.map((item) => (
                          <li key={item} className="flex items-start gap-3">
                            <CheckIcon />
                            <span className="text-sm leading-relaxed text-neutral-dark sm:text-base">
                              {item}
                            </span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </FadeIn>

                  {/* Use Cases */}
                  {service.useCases && (
                    <FadeIn direction="left" delay={250}>
                      <UseCasesShowcase
                        useCases={service.useCases}
                        accent={isAlt ? "indigo" : "teal"}
                      />
                    </FadeIn>
                  )}
                </div>

                {/* Right: animated graphic */}
                {graphic && (
                  <FadeIn
                    direction="right"
                    delay={200}
                    className="hidden flex-1 items-center justify-center lg:flex"
                  >
                    {graphic}
                  </FadeIn>
                )}
              </div>
            );
          })}
        </div>
      </section>
    </>
  );
}
