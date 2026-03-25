import { lazy, Suspense } from "react";
import { Helmet } from "react-helmet-async";
import FadeIn from "@/components/FadeIn";
import UseCasesShowcase, { type UseCase } from "@/components/UseCasesShowcase";

const InnovationFunnel = lazy(() => import("@/components/InnovationFunnel"));

const useCases: UseCase[] = [
  {
    tab: "AI Tool Integration",
    title: "AI Tool Integration",
    description:
      "We integrate industry-leading AI platforms — Claude, OpenAI, and more — directly into your existing workflows. No need to figure out which tool fits where; we handle the selection, configuration, and deployment.",
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
    description:
      "We design and curate agentic processes under the Navis platform — autonomous AI agents that handle multi-step tasks, make decisions, and execute workflows on your behalf with human oversight.",
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
    description:
      "We create specialized AI skills that are trained on your business domain — turning general-purpose AI into a tool that understands your industry, terminology, and processes inside out.",
    details: [
      "Domain-specific knowledge bases built from your data and documentation",
      "Custom skills for automating repetitive business tasks",
      "Industry-trained AI that speaks your language and follows your SOPs",
      "Continuous skill refinement as your processes evolve",
    ],
  },
];

const items = [
  "Full access to AI consultants for ideation and R&D",
  "Full access to product team for design & development",
  "Proof-of-concept prototype",
  "Technology feasibility assessment",
  "Go/no-go development brief",
];

function CheckIcon() {
  return (
    <svg viewBox="0 0 20 20" fill="currentColor" className="h-5 w-5 shrink-0 text-teal" aria-hidden="true">
      <path fillRule="evenodd" d="M16.704 4.153a.75.75 0 01.143 1.052l-8 10.5a.75.75 0 01-1.127.075l-4.5-4.5a.75.75 0 011.06-1.06l3.894 3.893 7.48-9.817a.75.75 0 011.05-.143z" clipRule="evenodd" />
    </svg>
  );
}

export default function InnovationLabPage() {
  return (
    <>
      <Helmet>
        <title>Innovation Lab | Navis Labs</title>
        <meta name="description" content="Experimental projects pushing the boundaries of what's possible. Experience AI tools you can actually use in your business." />
        <meta property="og:title" content="Innovation Lab | Navis Labs" />
        <meta property="og:description" content="Experimental projects pushing the boundaries of what's possible. Experience AI tools you can actually use in your business." />
        <meta property="og:url" content="https://navislabs.com/services/innovation-lab" />
        <meta property="og:image" content="/og-image.png" />
        <meta name="twitter:card" content="summary_large_image" />
        <link rel="canonical" href="https://navislabs.com/services/innovation-lab" />
      </Helmet>

      {/* Hero */}
      <section className="relative overflow-hidden pt-32 pb-20 sm:pt-40 sm:pb-28">
        <div className="absolute -top-32 -right-32 h-96 w-96 rounded-full bg-teal/10 blur-[120px]" />
        <div className="absolute -bottom-32 -left-32 h-96 w-96 rounded-full bg-indigo/10 blur-[120px]" />
        <div className="relative mx-auto max-w-7xl px-6 lg:px-8">
          <FadeIn className="mx-auto max-w-3xl text-center">
            <div className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-2xl bg-teal/10 text-teal">
              <svg viewBox="0 0 24 24" fill="none" className="h-8 w-8" aria-hidden="true">
                <path d="M9.663 17h4.674M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l.146.146A3.004 3.004 0 0118 19.5a3 3 0 01-3 3H9a3 3 0 01-3-3 3.004 3.004 0 012.536-2.864l.127-.146z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </div>
            <h1 className="text-4xl font-extrabold tracking-tight text-white sm:text-5xl lg:text-6xl">
              Innovation{" "}
              <span className="bg-gradient-to-r from-teal to-indigo bg-clip-text text-transparent">Lab</span>
            </h1>
            <p className="mt-3 text-sm font-semibold uppercase tracking-[0.15em] text-teal">
              Your vision is our playground of possibilities.
            </p>
            <p className="mt-6 text-base leading-relaxed text-neutral-dark sm:text-lg lg:text-xl">
              Experimental projects pushing the boundaries of what&rsquo;s possible, leveraging today&rsquo;s most powerful technology to explore new frontiers. Experience AI tools you can actually use in your business.
            </p>
          </FadeIn>
        </div>
      </section>

      {/* Content */}
      <section className="relative py-16 sm:py-24">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="flex flex-col gap-10 lg:flex-row lg:gap-16">
            {/* Left: What You Get + Use Cases */}
            <div className="flex-1">
              <FadeIn direction="left">
                <div className="rounded-2xl border border-teal/15 bg-white/[0.02] p-6 sm:p-8">
                  <h2 className="text-xs font-bold uppercase tracking-[0.2em] text-teal/70">What You Get</h2>
                  <ul className="mt-5 space-y-3">
                    {items.map((item) => (
                      <li key={item} className="flex items-start gap-3">
                        <CheckIcon />
                        <span className="text-sm leading-relaxed text-neutral-dark sm:text-base">{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </FadeIn>

              <FadeIn direction="left" delay={150}>
                <UseCasesShowcase useCases={useCases} accent="teal" />
              </FadeIn>
            </div>

            {/* Right: Animated graphic */}
            <FadeIn direction="right" delay={200} className="hidden flex-1 items-center justify-center lg:flex">
              <Suspense fallback={null}>
                <InnovationFunnel />
              </Suspense>
            </FadeIn>
          </div>
        </div>
      </section>
    </>
  );
}
