import { useState, useRef, useEffect, lazy, Suspense } from "react";
import FadeIn from "@/components/FadeIn";
import { Link } from "react-router-dom";

const RequirementsGraphic = lazy(() => import("@/components/RequirementsGraphic"));
const PrototypeGraphic = lazy(() => import("@/components/PrototypeGraphic"));
const DevelopmentGraphic = lazy(() => import("@/components/DevelopmentGraphic"));
const UATGraphic = lazy(() => import("@/components/UATGraphic"));
const TrainingGraphic = lazy(() => import("@/components/TrainingGraphic"));
const MaintenanceGraphic = lazy(() => import("@/components/MaintenanceGraphic"));

const phases = [
  {
    num: 1,
    title: "Requirements Gathering",
    desc: "We start by deeply understanding your business — your pain points, bottlenecks, and goals.",
    details: [
      "Identify current pain points and operational bottlenecks",
      "Define solutions through expected outputs and success criteria",
      "Logic building and flowcharting to map out system behavior",
      "System wireframing to visualize structure and user flows",
    ],
    icon: (
      <svg viewBox="0 0 24 24" fill="none" className="h-6 w-6" aria-hidden="true">
        <path d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    ),
  },
  {
    num: 2,
    title: "Prototype Presentation",
    desc: "Within __3 DAYS__ of our discovery meeting, you see a working prototype — not a mockup, a real system. All this before signing a contract or paying for our service.",
    details: [
      "Present the execution plan alongside a reactive working prototype",
      "Outline the problem-solution framework",
      "Clear proof-of-concept so you can see your idea before committing",
      "Full alignment on vision and output before development begins",
    ],
    icon: (
      <svg viewBox="0 0 24 24" fill="none" className="h-6 w-6" aria-hidden="true">
        <path d="M3.75 3v11.25A2.25 2.25 0 006 16.5h2.25M3.75 3h-1.5m1.5 0h16.5m0 0h1.5m-1.5 0v11.25A2.25 2.25 0 0118 16.5h-2.25m-7.5 0h7.5m-7.5 0l-1 3m8.5-3l1 3m0 0l.5 1.5m-.5-1.5h-9.5m0 0l-.5 1.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    ),
  },
  {
    num: 3,
    title: "Development",
    desc: "Once aligned, rapid development begins with full transparency at every stage.",
    details: [
      "Module-based sprints for accountability and transparency",
      "Low operational expenditure, high impact rapid output",
    ],
    icon: (
      <svg viewBox="0 0 24 24" fill="none" className="h-6 w-6" aria-hidden="true">
        <path d="M17.25 6.75L22.5 12l-5.25 5.25m-10.5 0L1.5 12l5.25-5.25m7.5-3l-4.5 16.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    ),
  },
  {
    num: 4,
    title: "User Acceptance Testing",
    desc: "We collaborate directly with your stakeholders to ensure the system adapts to them — not the other way around.",
    details: [
      "Direct collaboration with all stakeholders",
      "No handoff until the system is seamless and every user is confident",
    ],
    icon: (
      <svg viewBox="0 0 24 24" fill="none" className="h-6 w-6" aria-hidden="true">
        <path d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    ),
  },
  {
    num: 5,
    title: "Training & Turnover",
    desc: "Full documentation, training, and handoff — no stones left unturned.",
    details: [
      "Full documentation and product handoff",
      "Stakeholder training sessions to ensure self-sufficiency",
    ],
    icon: (
      <svg viewBox="0 0 24 24" fill="none" className="h-6 w-6" aria-hidden="true">
        <path d="M4.26 10.147a60.438 60.438 0 00-.491 6.347A48.627 48.627 0 0112 20.904a48.627 48.627 0 018.232-4.41 60.46 60.46 0 00-.491-6.347m-15.482 0a50.57 50.57 0 00-2.658-.813A59.905 59.905 0 0112 3.493a59.902 59.902 0 0110.399 5.84c-.896.248-1.783.52-2.658.814m-15.482 0A50.697 50.697 0 0112 13.489a50.702 50.702 0 017.74-3.342" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    ),
  },
  {
    num: 6,
    title: "Maintenance",
    desc: "We come in as your in-house IT team. We focus on what we\u2019re good at, so you can focus on what you\u2019re good at.",
    details: [],
    icon: (
      <svg viewBox="0 0 24 24" fill="none" className="h-6 w-6" aria-hidden="true">
        <path d="M11.42 15.17l-5.384 3.183A2.233 2.233 0 013 16.327V7.673a2.233 2.233 0 013.036-2.026l5.384 3.183m0 6.34V8.83m0 6.34a2.25 2.25 0 003.042-2.106V8.936a2.25 2.25 0 00-3.042-2.106M21 12a9 9 0 11-18 0 9 9 0 0118 0z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    ),
  },
];

const summarySteps = [
  { label: "Discovery Meeting", icon: "💬" },
  { label: "3-Day Prototype", icon: "⚡" },
  { label: "Build & Deploy", icon: "🚀" },
  { label: "Ongoing Support", icon: "🛡️" },
];

function CheckIcon() {
  return (
    <svg viewBox="0 0 20 20" fill="currentColor" className="mt-0.5 h-4 w-4 shrink-0 text-teal" aria-hidden="true">
      <path fillRule="evenodd" d="M16.704 4.153a.75.75 0 01.143 1.052l-8 10.5a.75.75 0 01-1.127.075l-4.5-4.5a.75.75 0 011.06-1.06l3.894 3.893 7.48-9.817a.75.75 0 011.05-.143z" clipRule="evenodd" />
    </svg>
  );
}

export default function HowItWorksContent() {
  const [active, setActive] = useState(0);
  const [animating, setAnimating] = useState(false);
  const contentRef = useRef<HTMLDivElement>(null);
  const phase = phases[active];

  const switchPhase = (idx: number) => {
    if (idx === active || animating) return;
    setAnimating(true);
    if (contentRef.current) {
      contentRef.current.style.opacity = "0";
      contentRef.current.style.transform = "translateY(12px)";
    }
    setTimeout(() => {
      setActive(idx);
      requestAnimationFrame(() => {
        if (contentRef.current) {
          contentRef.current.style.opacity = "1";
          contentRef.current.style.transform = "translateY(0)";
        }
        setAnimating(false);
      });
    }, 250);
  };

  return (
    <>
      {/* ─── Hero ─── */}
      <section className="relative overflow-hidden pt-32 pb-16 sm:pt-40 sm:pb-20">
        <div className="absolute -top-32 -right-32 h-96 w-96 rounded-full bg-teal/10 blur-[120px]" />
        <div className="absolute -bottom-32 -left-32 h-96 w-96 rounded-full bg-indigo/10 blur-[120px]" />
        <div className="relative mx-auto max-w-7xl px-6 lg:px-8">
          <FadeIn className="mx-auto max-w-3xl text-center">
            <h1 className="text-4xl font-extrabold tracking-tight text-white sm:text-5xl lg:text-6xl">
              Our{" "}
              <span className="bg-gradient-to-r from-teal to-indigo bg-clip-text text-transparent">
                Process
              </span>
            </h1>
            <p className="mt-6 text-base leading-relaxed text-neutral-dark sm:text-lg lg:text-xl">
              Being fast is only the byproduct of our obsession over tech and
              finding new ways for AI to solve problems. Our proven methodology
              transforms your vision into a working solution within days.
            </p>
          </FadeIn>
        </div>
      </section>

      {/* ─── Phase Selector + Content ─── */}
      <section className="relative py-12 sm:py-20">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          {/* Phase selector bar */}
          <FadeIn>
            <div className="relative">
              {/* Progress track — behind nodes via z-0 */}
              {/* Track and progress — from center of first node to center of last node */}
              {/* With 6 evenly spaced items (justify-between), each center is at i/(n-1) of the track */}
              {/* Track inset = half a node (20px) from each edge */}
              <div
                className="absolute top-[18px] z-0 hidden h-[3px] rounded-full bg-white/[0.04] lg:block"
                style={{ left: 20, right: 20 }}
                aria-hidden="true"
              />
              <div
                className="absolute top-[18px] z-[1] hidden h-[3px] rounded-full lg:block overflow-hidden"
                style={{
                  left: 20,
                  right: 20,
                  transition: "none",
                }}
                aria-hidden="true"
              >
                <div
                  className="h-full rounded-full"
                  style={{
                    width: `${(active / (phases.length - 1)) * 100}%`,
                    background: "linear-gradient(90deg, #00D4AA 0%, #00B894 40%, #6366F1 100%)",
                    boxShadow: "0 0 12px rgba(0, 212, 170, 0.4), 0 0 24px rgba(99, 102, 241, 0.2)",
                    transition: "width 1s cubic-bezier(0.16, 1, 0.3, 1)",
                  }}
                />
              </div>

              <div className="flex flex-wrap justify-between gap-2 lg:gap-0">
                {phases.map((p, i) => {
                  const isActive = i === active;
                  const isPast = i < active;
                  return (
                    <button
                      key={p.num}
                      onClick={() => switchPhase(i)}
                      className="group relative z-10 flex flex-col items-center gap-2 focus:outline-none"
                      aria-label={`Phase ${p.num}: ${p.title}`}
                    >
                      {/* Node circle */}
                      <div
                        className={`relative flex h-10 w-10 items-center justify-center rounded-full text-xs font-bold transition-all duration-400 ${
                          isActive
                            ? "bg-teal text-navy shadow-[0_0_20px_rgba(0,212,170,0.35)] scale-110"
                            : isPast
                            ? "border border-teal/40 bg-navy text-teal ring-2 ring-navy"
                            : "border border-white/10 bg-navy text-neutral-dark ring-2 ring-navy group-hover:border-teal/25 group-hover:text-teal/70"
                        }`}
                      >
                        {String(p.num).padStart(2, "0")}
                        {isActive && (
                          <span className="absolute inset-0 rounded-full animate-[ping_2s_ease-in-out_infinite] border border-teal/30" />
                        )}
                      </div>
                      {/* Label — desktop only */}
                      <span
                        className={`hidden text-center text-[11px] font-medium leading-tight transition-colors duration-300 lg:block max-w-[100px] ${
                          isActive
                            ? "text-teal"
                            : isPast
                            ? "text-teal/50"
                            : "text-neutral-dark/50 group-hover:text-neutral-dark"
                        }`}
                      >
                        {p.title}
                      </span>
                    </button>
                  );
                })}
              </div>
            </div>
          </FadeIn>

          {/* Phase content — two-column: text left, graphic placeholder right */}
          <div
            ref={contentRef}
            className="mt-14 transition-all duration-300 ease-out"
            style={{ opacity: 1, transform: "translateY(0)" }}
          >
            <div className="flex flex-col gap-10 lg:flex-row lg:gap-16 lg:items-start">
              {/* Left: Phase details */}
              <div className="flex-1">
                <div className="flex items-center gap-4">
                  <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-teal/10 text-teal">
                    {phase.icon}
                  </div>
                  <div>
                    <span className="text-xs font-bold uppercase tracking-[0.2em] text-teal/60">
                      Phase {String(phase.num).padStart(2, "0")}
                    </span>
                    <h2 className="text-2xl font-extrabold text-white sm:text-3xl">
                      {phase.title}
                    </h2>
                  </div>
                </div>

                <p className="mt-6 text-base leading-relaxed text-neutral-dark sm:text-lg">
                  {phase.desc.split(/(__[^_]+__)/).map((part, pi) => {
                    if (part.startsWith("__") && part.endsWith("__")) {
                      const text = part.slice(2, -2);
                      return (
                        <span
                          key={pi}
                          className="inline-block rounded-md bg-teal/10 px-2 py-0.5 font-extrabold uppercase tracking-wide text-teal shadow-[0_0_16px_rgba(0,212,170,0.2)]"
                        >
                          {text}
                        </span>
                      );
                    }
                    return part;
                  })}
                </p>

                {phase.details.length > 0 && (
                  <ul className="mt-6 space-y-3">
                    {phase.details.map((d) => (
                      <li key={d} className="flex items-start gap-3 text-sm text-neutral-dark sm:text-base">
                        <CheckIcon />
                        <span>{d}</span>
                      </li>
                    ))}
                  </ul>
                )}

                {/* Nav buttons */}
                <div className="mt-8 flex items-center gap-4">
                  <button
                    onClick={() => switchPhase(Math.max(0, active - 1))}
                    disabled={active === 0}
                    className="flex h-10 w-10 items-center justify-center rounded-full border border-white/10 bg-white/[0.03] text-neutral-dark transition-all hover:border-teal/25 hover:text-teal disabled:opacity-30 disabled:cursor-not-allowed"
                    aria-label="Previous phase"
                  >
                    <svg viewBox="0 0 20 20" fill="currentColor" className="h-4 w-4">
                      <path fillRule="evenodd" d="M17 10a.75.75 0 01-.75.75H5.612l4.158 3.96a.75.75 0 11-1.04 1.08l-5.5-5.25a.75.75 0 010-1.08l5.5-5.25a.75.75 0 111.04 1.08L5.612 9.25H16.25A.75.75 0 0117 10z" clipRule="evenodd" />
                    </svg>
                  </button>
                  <button
                    onClick={() => switchPhase(Math.min(phases.length - 1, active + 1))}
                    disabled={active === phases.length - 1}
                    className="flex h-10 w-10 items-center justify-center rounded-full border border-white/10 bg-white/[0.03] text-neutral-dark transition-all hover:border-teal/25 hover:text-teal disabled:opacity-30 disabled:cursor-not-allowed"
                    aria-label="Next phase"
                  >
                    <svg viewBox="0 0 20 20" fill="currentColor" className="h-4 w-4">
                      <path fillRule="evenodd" d="M3 10a.75.75 0 01.75-.75h10.638L10.23 5.29a.75.75 0 111.04-1.08l5.5 5.25a.75.75 0 010 1.08l-5.5 5.25a.75.75 0 11-1.04-1.08l4.158-3.96H3.75A.75.75 0 013 10z" clipRule="evenodd" />
                    </svg>
                  </button>
                  <span className="text-xs text-neutral-dark/50">
                    {active + 1} / {phases.length}
                  </span>
                </div>
              </div>

              {/* Right: Graphic */}
              <div className="flex flex-1 items-center justify-center">
                {active === 0 ? (
                  <Suspense fallback={null}>
                    <RequirementsGraphic />
                  </Suspense>
                ) : active === 1 ? (
                  <Suspense fallback={null}>
                    <PrototypeGraphic />
                  </Suspense>
                ) : active === 2 ? (
                  <Suspense fallback={null}>
                    <DevelopmentGraphic />
                  </Suspense>
                ) : active === 3 ? (
                  <Suspense fallback={null}>
                    <UATGraphic />
                  </Suspense>
                ) : active === 4 ? (
                  <Suspense fallback={null}>
                    <TrainingGraphic />
                  </Suspense>
                ) : active === 5 ? (
                  <Suspense fallback={null}>
                    <MaintenanceGraphic />
                  </Suspense>
                ) : (
                  <div className="flex h-[360px] w-full items-center justify-center rounded-2xl border border-dashed border-white/[0.08] bg-white/[0.01]">
                    <div className="text-center">
                      <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-teal/[0.06] text-teal/30">
                        {phase.icon}
                      </div>
                      <p className="mt-4 text-xs font-medium uppercase tracking-widest text-neutral-dark/30">
                        Graphic — Phase {String(phase.num).padStart(2, "0")}
                      </p>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ─── Process Summary Banner ─── */}
      <section className="relative overflow-hidden py-20 sm:py-28">
        <div className="absolute inset-0 bg-gradient-to-r from-teal/[0.04] via-indigo/[0.06] to-teal/[0.04]" />
        <div className="absolute inset-0 border-y border-white/[0.04]" />

        <div className="relative mx-auto max-w-5xl px-6 lg:px-8">
          <FadeIn className="text-center">
            <h2 className="text-2xl font-extrabold text-white sm:text-3xl">
              From Idea to Impact
            </h2>
            <p className="mt-3 text-neutral-dark">
              Your journey with Navis Labs in four simple steps.
            </p>
          </FadeIn>

          <div className="mt-12 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4 lg:gap-0">
            {summarySteps.map((step, i) => (
              <FadeIn key={step.label} delay={i * 120}>
                <div className="relative flex flex-col items-center text-center">
                  {i < summarySteps.length - 1 && (
                    <div className="absolute right-0 top-8 hidden translate-x-1/2 lg:block">
                      <svg viewBox="0 0 24 12" fill="none" className="h-3 w-6 text-teal/30" aria-hidden="true">
                        <path d="M0 6h20m0 0l-4-4m4 4l-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                      </svg>
                    </div>
                  )}
                  <div className="flex h-16 w-16 items-center justify-center rounded-2xl border border-teal/20 bg-navy-mid text-2xl shadow-[0_0_24px_rgba(0,212,170,0.1)]">
                    {step.icon}
                  </div>
                  <p className="mt-4 text-sm font-semibold text-white sm:text-base">
                    {step.label}
                  </p>
                </div>
              </FadeIn>
            ))}
          </div>

          <FadeIn delay={500} className="mt-14 text-center">
            <Link
              to="/contact"
              className="inline-flex items-center gap-2 rounded-full bg-teal px-8 py-3.5 text-sm font-semibold text-navy transition-all hover:bg-teal-dark hover:shadow-[0_0_24px_rgba(0,212,170,0.3)]"
            >
              Book a Discovery Call
              <svg viewBox="0 0 20 20" fill="currentColor" className="h-4 w-4" aria-hidden="true">
                <path fillRule="evenodd" d="M3 10a.75.75 0 01.75-.75h10.638L10.23 5.29a.75.75 0 111.04-1.08l5.5 5.25a.75.75 0 010 1.08l-5.5 5.25a.75.75 0 11-1.04-1.08l4.158-3.96H3.75A.75.75 0 013 10z" clipRule="evenodd" />
              </svg>
            </Link>
          </FadeIn>
        </div>
      </section>
    </>
  );
}
