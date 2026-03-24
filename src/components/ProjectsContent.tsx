import { useState } from "react";
import FadeIn from "@/components/FadeIn";

/* ────────────────────────────────────────────
   Data
   ──────────────────────────────────────────── */

const projects = [
  {
    id: "erp-system",
    title: "ERP System",
    desc: "End-to-end enterprise resource planning solution designed for operational efficiency and real-time business intelligence.",
    tags: ["ERP", "Full-Stack", "System Integration"],
    color: "teal" as const,
    // Abstract pattern placeholder per project
    pattern: (
      <svg viewBox="0 0 400 240" fill="none" className="h-full w-full" aria-hidden="true">
        <rect width="400" height="240" fill="url(#erp-grad)" />
        <defs>
          <linearGradient id="erp-grad" x1="0" y1="0" x2="400" y2="240">
            <stop offset="0%" stopColor="#00D4AA" stopOpacity="0.12" />
            <stop offset="100%" stopColor="#6366F1" stopOpacity="0.08" />
          </linearGradient>
        </defs>
        {/* Grid pattern */}
        {Array.from({ length: 6 }).map((_, i) => (
          <line key={`h${i}`} x1="0" y1={i * 48} x2="400" y2={i * 48} stroke="#00D4AA" strokeOpacity="0.08" strokeWidth="1" />
        ))}
        {Array.from({ length: 9 }).map((_, i) => (
          <line key={`v${i}`} x1={i * 50} y1="0" x2={i * 50} y2="240" stroke="#00D4AA" strokeOpacity="0.08" strokeWidth="1" />
        ))}
        {/* Abstract blocks */}
        <rect x="50" y="48" width="100" height="64" rx="8" fill="#00D4AA" fillOpacity="0.1" stroke="#00D4AA" strokeOpacity="0.2" strokeWidth="1" />
        <rect x="170" y="80" width="80" height="48" rx="8" fill="#6366F1" fillOpacity="0.1" stroke="#6366F1" strokeOpacity="0.2" strokeWidth="1" />
        <rect x="270" y="48" width="80" height="80" rx="8" fill="#00D4AA" fillOpacity="0.08" stroke="#00D4AA" strokeOpacity="0.15" strokeWidth="1" />
        <rect x="100" y="140" width="120" height="48" rx="8" fill="#6366F1" fillOpacity="0.08" stroke="#6366F1" strokeOpacity="0.15" strokeWidth="1" />
        {/* Connectors */}
        <path d="M150 112v28M210 128v12M310 128v24" stroke="#00D4AA" strokeOpacity="0.2" strokeWidth="1.5" strokeDasharray="4 4" />
        <circle cx="150" cy="112" r="3" fill="#00D4AA" fillOpacity="0.3" />
        <circle cx="210" cy="128" r="3" fill="#6366F1" fillOpacity="0.3" />
        <circle cx="310" cy="128" r="3" fill="#00D4AA" fillOpacity="0.3" />
      </svg>
    ),
  },
  {
    id: "jkq-aicb",
    title: "JKQ AICB",
    desc: "AI-powered platform leveraging intelligent automation for streamlined business processes.",
    tags: ["AI Integration", "Automation"],
    color: "indigo" as const,
    pattern: (
      <svg viewBox="0 0 400 240" fill="none" className="h-full w-full" aria-hidden="true">
        <rect width="400" height="240" fill="url(#ai-grad)" />
        <defs>
          <linearGradient id="ai-grad" x1="0" y1="0" x2="400" y2="240">
            <stop offset="0%" stopColor="#6366F1" stopOpacity="0.12" />
            <stop offset="100%" stopColor="#00D4AA" stopOpacity="0.06" />
          </linearGradient>
        </defs>
        {/* Neural network */}
        <circle cx="80" cy="80" r="12" fill="#6366F1" fillOpacity="0.15" stroke="#6366F1" strokeOpacity="0.3" strokeWidth="1" />
        <circle cx="80" cy="160" r="12" fill="#6366F1" fillOpacity="0.15" stroke="#6366F1" strokeOpacity="0.3" strokeWidth="1" />
        <circle cx="200" cy="60" r="14" fill="#6366F1" fillOpacity="0.12" stroke="#6366F1" strokeOpacity="0.25" strokeWidth="1" />
        <circle cx="200" cy="120" r="14" fill="#00D4AA" fillOpacity="0.12" stroke="#00D4AA" strokeOpacity="0.25" strokeWidth="1" />
        <circle cx="200" cy="180" r="14" fill="#6366F1" fillOpacity="0.12" stroke="#6366F1" strokeOpacity="0.25" strokeWidth="1" />
        <circle cx="320" cy="90" r="12" fill="#00D4AA" fillOpacity="0.15" stroke="#00D4AA" strokeOpacity="0.3" strokeWidth="1" />
        <circle cx="320" cy="150" r="12" fill="#00D4AA" fillOpacity="0.15" stroke="#00D4AA" strokeOpacity="0.3" strokeWidth="1" />
        {/* Lines */}
        <path d="M92 80l94-20M92 80l94 40M92 80l94 100M92 160l94-100M92 160l94-40M92 160l94 20" stroke="#6366F1" strokeOpacity="0.12" strokeWidth="1" />
        <path d="M214 60l94 30M214 60l94 90M214 120l94-30M214 120l94 30M214 180l94-90M214 180l94-30" stroke="#00D4AA" strokeOpacity="0.12" strokeWidth="1" />
        {/* Pulses */}
        <circle cx="200" cy="120" r="24" fill="none" stroke="#00D4AA" strokeOpacity="0.1" strokeWidth="1" />
        <circle cx="200" cy="120" r="36" fill="none" stroke="#00D4AA" strokeOpacity="0.05" strokeWidth="1" />
      </svg>
    ),
  },
  {
    id: "laundromat-service",
    title: "Laundromat Service",
    desc: "Digital service platform modernizing laundromat operations with automated scheduling and customer management.",
    tags: ["Custom Development", "Booking"],
    color: "teal" as const,
    pattern: (
      <svg viewBox="0 0 400 240" fill="none" className="h-full w-full" aria-hidden="true">
        <rect width="400" height="240" fill="url(#laundry-grad)" />
        <defs>
          <linearGradient id="laundry-grad" x1="0" y1="0" x2="400" y2="240">
            <stop offset="0%" stopColor="#00D4AA" stopOpacity="0.1" />
            <stop offset="100%" stopColor="#6366F1" stopOpacity="0.08" />
          </linearGradient>
        </defs>
        {/* Calendar grid */}
        <rect x="60" y="40" width="280" height="160" rx="12" fill="none" stroke="#00D4AA" strokeOpacity="0.15" strokeWidth="1.5" />
        <line x1="60" y1="80" x2="340" y2="80" stroke="#00D4AA" strokeOpacity="0.1" strokeWidth="1" />
        {Array.from({ length: 6 }).map((_, i) => (
          <line key={i} x1={100 + i * 40} y1="40" x2={100 + i * 40} y2="200" stroke="#00D4AA" strokeOpacity="0.06" strokeWidth="1" />
        ))}
        {/* Time slots */}
        <rect x="105" y="90" width="30" height="20" rx="4" fill="#00D4AA" fillOpacity="0.15" />
        <rect x="185" y="90" width="30" height="20" rx="4" fill="#6366F1" fillOpacity="0.15" />
        <rect x="145" y="120" width="30" height="20" rx="4" fill="#00D4AA" fillOpacity="0.12" />
        <rect x="265" y="120" width="30" height="20" rx="4" fill="#6366F1" fillOpacity="0.12" />
        <rect x="225" y="150" width="30" height="20" rx="4" fill="#00D4AA" fillOpacity="0.1" />
        <rect x="105" y="150" width="30" height="20" rx="4" fill="#6366F1" fillOpacity="0.1" />
        {/* Header dots */}
        {Array.from({ length: 7 }).map((_, i) => (
          <circle key={i} cx={80 + i * 40} cy="60" r="4" fill="#00D4AA" fillOpacity="0.2" />
        ))}
      </svg>
    ),
  },
  {
    id: "booking-system",
    title: "Booking System",
    desc: "Scalable reservation and booking engine built for high availability and seamless user experience.",
    tags: ["Custom Development", "SaaS"],
    color: "indigo" as const,
    pattern: (
      <svg viewBox="0 0 400 240" fill="none" className="h-full w-full" aria-hidden="true">
        <rect width="400" height="240" fill="url(#booking-grad)" />
        <defs>
          <linearGradient id="booking-grad" x1="0" y1="0" x2="400" y2="240">
            <stop offset="0%" stopColor="#6366F1" stopOpacity="0.1" />
            <stop offset="100%" stopColor="#00D4AA" stopOpacity="0.08" />
          </linearGradient>
        </defs>
        {/* Dashboard mockup */}
        <rect x="40" y="30" width="320" height="180" rx="12" fill="none" stroke="#6366F1" strokeOpacity="0.15" strokeWidth="1.5" />
        {/* Top bar */}
        <rect x="40" y="30" width="320" height="36" rx="12" fill="#6366F1" fillOpacity="0.06" />
        <circle cx="60" cy="48" r="5" fill="#6366F1" fillOpacity="0.2" />
        <circle cx="78" cy="48" r="5" fill="#00D4AA" fillOpacity="0.2" />
        <circle cx="96" cy="48" r="5" fill="#6366F1" fillOpacity="0.12" />
        {/* Sidebar */}
        <rect x="40" y="66" width="70" height="144" fill="#6366F1" fillOpacity="0.04" />
        <rect x="52" y="80" width="46" height="8" rx="4" fill="#6366F1" fillOpacity="0.12" />
        <rect x="52" y="98" width="46" height="8" rx="4" fill="#6366F1" fillOpacity="0.08" />
        <rect x="52" y="116" width="46" height="8" rx="4" fill="#6366F1" fillOpacity="0.08" />
        <rect x="52" y="134" width="46" height="8" rx="4" fill="#00D4AA" fillOpacity="0.15" />
        {/* Content cards */}
        <rect x="124" y="80" width="105" height="56" rx="8" fill="#6366F1" fillOpacity="0.06" stroke="#6366F1" strokeOpacity="0.12" strokeWidth="1" />
        <rect x="241" y="80" width="105" height="56" rx="8" fill="#00D4AA" fillOpacity="0.06" stroke="#00D4AA" strokeOpacity="0.12" strokeWidth="1" />
        <rect x="124" y="148" width="222" height="48" rx="8" fill="#6366F1" fillOpacity="0.04" stroke="#6366F1" strokeOpacity="0.08" strokeWidth="1" />
      </svg>
    ),
  },
];

const allTags = Array.from(new Set(projects.flatMap((p) => p.tags)));

/* ────────────────────────────────────────────
   Component
   ──────────────────────────────────────────── */

export default function ProjectsContent() {
  const [activeTag, setActiveTag] = useState<string | null>(null);

  const filtered = activeTag
    ? projects.filter((p) => p.tags.includes(activeTag))
    : projects;

  return (
    <>
      {/* ─── Hero ─── */}
      <section className="relative overflow-hidden pt-32 pb-20 sm:pt-40 sm:pb-28">
        <div className="absolute -top-32 -right-32 h-96 w-96 rounded-full bg-teal/10 blur-[120px]" />
        <div className="absolute -bottom-32 -left-32 h-96 w-96 rounded-full bg-indigo/10 blur-[120px]" />

        <div className="relative mx-auto max-w-7xl px-6 lg:px-8">
          <FadeIn className="mx-auto max-w-3xl text-center">
            <h1 className="text-4xl font-extrabold tracking-tight text-white sm:text-5xl lg:text-6xl">
              Transforming Industries With{" "}
              <span className="bg-gradient-to-r from-teal to-indigo bg-clip-text text-transparent">
                Solutions That Deliver
              </span>
            </h1>
            <p className="mt-6 text-base leading-relaxed text-neutral-dark sm:text-lg lg:text-xl">
              Real systems. Real impact. Here&rsquo;s what we&rsquo;ve built.
            </p>
          </FadeIn>
        </div>
      </section>

      {/* ─── Filter + Grid ─── */}
      <section className="relative py-16 sm:py-24">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          {/* Tag filters */}
          <FadeIn>
            <div className="mb-12 flex flex-wrap items-center justify-center gap-3">
              <button
                onClick={() => setActiveTag(null)}
                className={`rounded-full px-5 py-2 text-xs font-semibold uppercase tracking-wider transition-all ${
                  activeTag === null
                    ? "bg-teal text-navy shadow-[0_0_16px_rgba(0,212,170,0.2)]"
                    : "border border-white/[0.08] bg-white/[0.02] text-neutral-dark hover:border-teal/20 hover:text-white"
                }`}
              >
                All
              </button>
              {allTags.map((tag) => (
                <button
                  key={tag}
                  onClick={() => setActiveTag(tag === activeTag ? null : tag)}
                  className={`rounded-full px-5 py-2 text-xs font-semibold uppercase tracking-wider transition-all ${
                    activeTag === tag
                      ? "bg-teal text-navy shadow-[0_0_16px_rgba(0,212,170,0.2)]"
                      : "border border-white/[0.08] bg-white/[0.02] text-neutral-dark hover:border-teal/20 hover:text-white"
                  }`}
                >
                  {tag}
                </button>
              ))}
            </div>
          </FadeIn>

          {/* Project grid */}
          <div className="grid gap-8 sm:grid-cols-2">
            {filtered.map((project, i) => {
              const isTeal = project.color === "teal";
              return (
                <FadeIn key={project.id} delay={i * 120}>
                  <div className="group relative overflow-hidden rounded-2xl border border-white/[0.06] bg-white/[0.02] transition-all duration-300 hover:border-teal/20 hover:shadow-[0_0_40px_rgba(0,212,170,0.06)]">
                    {/* Image / Pattern area */}
                    <div className="relative h-52 overflow-hidden sm:h-60">
                      <div className="h-full w-full transition-transform duration-500 group-hover:scale-105">
                        {project.pattern}
                      </div>
                      {/* Hover overlay */}
                      <div className="absolute inset-0 flex items-center justify-center bg-navy/70 opacity-0 backdrop-blur-sm transition-opacity duration-300 group-hover:opacity-100">
                        <span className="flex items-center gap-2 rounded-full border border-teal/30 bg-teal/10 px-6 py-2.5 text-sm font-semibold text-teal">
                          View Project
                          <svg viewBox="0 0 20 20" fill="currentColor" className="h-4 w-4" aria-hidden="true">
                            <path fillRule="evenodd" d="M3 10a.75.75 0 01.75-.75h10.638L10.23 5.29a.75.75 0 111.04-1.08l5.5 5.25a.75.75 0 010 1.08l-5.5 5.25a.75.75 0 11-1.04-1.08l4.158-3.96H3.75A.75.75 0 013 10z" clipRule="evenodd" />
                          </svg>
                        </span>
                      </div>
                    </div>

                    {/* Content */}
                    <div className="p-6 sm:p-8">
                      <h2 className="text-xl font-bold text-white sm:text-2xl">
                        {project.title}
                      </h2>
                      <p className="mt-3 text-sm leading-relaxed text-neutral-dark sm:text-base">
                        {project.desc}
                      </p>

                      {/* Tags */}
                      <div className="mt-5 flex flex-wrap gap-2">
                        {project.tags.map((tag) => (
                          <span
                            key={tag}
                            className={`rounded-full px-3 py-1 text-[11px] font-semibold uppercase tracking-wider ${
                              isTeal
                                ? "bg-teal/10 text-teal/80"
                                : "bg-indigo/10 text-indigo/80"
                            }`}
                          >
                            {tag}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                </FadeIn>
              );
            })}
          </div>

          {/* Placeholder for future projects */}
          <FadeIn delay={600}>
            <div className="mt-8 flex items-center justify-center rounded-2xl border border-dashed border-white/[0.08] py-16 text-center">
              <div>
                <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full border border-white/[0.08] bg-white/[0.02]">
                  <svg viewBox="0 0 24 24" fill="none" className="h-6 w-6 text-neutral-dark" aria-hidden="true">
                    <path d="M12 4.5v15m7.5-7.5h-15" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </div>
                <p className="mt-4 text-sm text-neutral-dark">
                  More projects coming soon
                </p>
              </div>
            </div>
          </FadeIn>
        </div>
      </section>
    </>
  );
}
