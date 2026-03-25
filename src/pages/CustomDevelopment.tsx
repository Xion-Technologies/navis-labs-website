import { lazy, Suspense } from "react";
import { Helmet } from "react-helmet-async";
import FadeIn from "@/components/FadeIn";
import UseCasesShowcase, { type UseCase } from "@/components/UseCasesShowcase";

const CustomDevGraphic = lazy(() => import("@/components/CustomDevGraphic"));

const useCases: UseCase[] = [
  {
    tab: "UI/UX Design",
    title: "UI/UX Design",
    description:
      "We craft intuitive, pixel-perfect interfaces that your customers will love — from user research and wireframing all the way to high-fidelity prototypes and developer-ready design systems.",
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
    description:
      "From the first line of code to production deployment — we build complete, full-stack applications engineered for scale, performance, and maintainability. You get a system that works, not a half-finished project.",
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
    description:
      "Modern hosting, zero-downtime deployment, and global-standard security practices — we architect your infrastructure so your system is fast, secure, and available wherever your users are.",
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
    description:
      "Outdated systems slow you down and cost you more the longer you wait. We modernize your legacy infrastructure — migrating, refactoring, and integrating it into a unified, future-proof ecosystem.",
    details: [
      "Legacy codebase audit and modernization roadmap",
      "Incremental migration without business disruption",
      "API wrappers and middleware for legacy system integration",
      "Data migration with validation and zero-loss guarantees",
    ],
  },
];

const items = [
  "Full-stack web or mobile application",
  "Database architecture & schema design",
  "Admin dashboard & back-office tools",
  "Production deployment & launch support",
];

function CheckIcon() {
  return (
    <svg viewBox="0 0 20 20" fill="currentColor" className="h-5 w-5 shrink-0 text-indigo" aria-hidden="true">
      <path fillRule="evenodd" d="M16.704 4.153a.75.75 0 01.143 1.052l-8 10.5a.75.75 0 01-1.127.075l-4.5-4.5a.75.75 0 011.06-1.06l3.894 3.893 7.48-9.817a.75.75 0 011.05-.143z" clipRule="evenodd" />
    </svg>
  );
}

export default function CustomDevelopmentPage() {
  return (
    <>
      <Helmet>
        <title>Custom Development | Navis Labs</title>
        <meta name="description" content="Bespoke software solutions engineered with precision, scalability, and performance — with you in mind every step of the way." />
        <meta property="og:title" content="Custom Development | Navis Labs" />
        <meta property="og:description" content="Bespoke software solutions engineered with precision, scalability, and performance — with you in mind every step of the way." />
        <meta property="og:url" content="https://navislabs.com/services/custom-development" />
        <meta property="og:image" content="/og-image.png" />
        <meta name="twitter:card" content="summary_large_image" />
        <link rel="canonical" href="https://navislabs.com/services/custom-development" />
      </Helmet>

      {/* Hero */}
      <section className="relative overflow-hidden pt-32 pb-20 sm:pt-40 sm:pb-28">
        <div className="absolute -top-32 -right-32 h-96 w-96 rounded-full bg-indigo/10 blur-[120px]" />
        <div className="absolute -bottom-32 -left-32 h-96 w-96 rounded-full bg-teal/10 blur-[120px]" />
        <div className="relative mx-auto max-w-7xl px-6 lg:px-8">
          <FadeIn className="mx-auto max-w-3xl text-center">
            <div className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-2xl bg-indigo/10 text-indigo">
              <svg viewBox="0 0 24 24" fill="none" className="h-8 w-8" aria-hidden="true">
                <path d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </div>
            <h1 className="text-4xl font-extrabold tracking-tight text-white sm:text-5xl lg:text-6xl">
              Custom{" "}
              <span className="bg-gradient-to-r from-indigo to-teal bg-clip-text text-transparent">Development</span>
            </h1>
            <p className="mt-3 text-sm font-semibold uppercase tracking-[0.15em] text-indigo">
              Bespoke software, built with you in mind.
            </p>
            <p className="mt-6 text-base leading-relaxed text-neutral-dark sm:text-lg lg:text-xl">
              Software solutions engineered with precision, scalability, and performance &mdash; with you in mind every step of the way.
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
                <div className="rounded-2xl border border-indigo/15 bg-white/[0.02] p-6 sm:p-8">
                  <h2 className="text-xs font-bold uppercase tracking-[0.2em] text-indigo/70">What You Get</h2>
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
                <UseCasesShowcase useCases={useCases} accent="indigo" />
              </FadeIn>
            </div>

            {/* Right: Animated graphic */}
            <FadeIn direction="right" delay={200} className="hidden flex-1 items-center justify-center lg:flex">
              <Suspense fallback={null}>
                <CustomDevGraphic />
              </Suspense>
            </FadeIn>
          </div>
        </div>
      </section>
    </>
  );
}
