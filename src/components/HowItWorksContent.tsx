import FadeIn from "@/components/FadeIn";
import { Link } from "react-router-dom";

/* ────────────────────────────────────────────
   Phase data
   ──────────────────────────────────────────── */

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
    desc: "Within 3 days of our discovery meeting, you see a working prototype — not a mockup, a real system.",
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

/* ────────────────────────────────────────────
   Component
   ──────────────────────────────────────────── */

export default function HowItWorksContent() {
  return (
    <>
      {/* ─── Hero ─── */}
      <section className="relative overflow-hidden pt-32 pb-20 sm:pt-40 sm:pb-28">
        {/* Background glows */}
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
              We move fast because we&rsquo;re obsessed with delivering impact.
              Our proven methodology transforms your vision into a working
              solution within days.
            </p>
          </FadeIn>
        </div>
      </section>

      {/* ─── Timeline ─── */}
      <section className="relative py-16 sm:py-24">
        <div className="mx-auto max-w-4xl px-6 lg:px-8">
          {/* Vertical timeline line */}
          <div className="absolute left-[calc(50%-0.5px)] top-0 hidden h-full w-px bg-gradient-to-b from-transparent via-teal/20 to-transparent lg:block" />

          {phases.map((phase, i) => {
            const isEven = i % 2 === 1;
            return (
              <FadeIn
                key={phase.num}
                direction={isEven ? "right" : "left"}
                delay={i * 80}
              >
                <div className="relative mb-12 sm:mb-16 lg:mb-20">
                  {/* ── Mobile / Tablet: single-column with left timeline ── */}
                  <div className="flex gap-5 lg:hidden">
                    {/* Timeline spine */}
                    <div className="relative flex flex-col items-center">
                      {/* Number circle */}
                      <div className="relative z-10 flex h-12 w-12 shrink-0 items-center justify-center rounded-full border border-teal/30 bg-navy-mid text-sm font-bold text-teal">
                        {String(phase.num).padStart(2, "0")}
                      </div>
                      {/* Connecting line */}
                      {i < phases.length - 1 && (
                        <div className="mt-2 w-px flex-1 bg-gradient-to-b from-teal/25 to-transparent" />
                      )}
                    </div>

                    {/* Content card */}
                    <div className="flex-1 pb-2">
                      <div className="rounded-2xl border border-white/[0.06] bg-white/[0.02] p-5 sm:p-6">
                        <div className="flex items-center gap-3">
                          <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-teal/10 text-teal">
                            {phase.icon}
                          </div>
                          <h2 className="text-lg font-bold text-white sm:text-xl">
                            {phase.title}
                          </h2>
                        </div>
                        <p className="mt-3 text-sm leading-relaxed text-neutral-dark sm:text-base">
                          {phase.desc}
                        </p>
                        {phase.details.length > 0 && (
                          <ul className="mt-4 space-y-2">
                            {phase.details.map((d) => (
                              <li
                                key={d}
                                className="flex items-start gap-2.5 text-sm text-neutral-dark"
                              >
                                <svg
                                  viewBox="0 0 20 20"
                                  fill="currentColor"
                                  className="mt-0.5 h-4 w-4 shrink-0 text-teal"
                                  aria-hidden="true"
                                >
                                  <path
                                    fillRule="evenodd"
                                    d="M16.704 4.153a.75.75 0 01.143 1.052l-8 10.5a.75.75 0 01-1.127.075l-4.5-4.5a.75.75 0 011.06-1.06l3.894 3.893 7.48-9.817a.75.75 0 011.05-.143z"
                                    clipRule="evenodd"
                                  />
                                </svg>
                                <span>{d}</span>
                              </li>
                            ))}
                          </ul>
                        )}
                      </div>
                    </div>
                  </div>

                  {/* ── Desktop: alternating left/right with center timeline ── */}
                  <div className="hidden lg:grid lg:grid-cols-[1fr_auto_1fr] lg:gap-8">
                    {/* Left column */}
                    <div
                      className={
                        isEven ? "" : "flex items-start justify-end"
                      }
                    >
                      {!isEven && (
                        <div className="max-w-md rounded-2xl border border-white/[0.06] bg-white/[0.02] p-6 transition-colors hover:border-teal/20">
                          <div className="flex items-center gap-3">
                            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-teal/10 text-teal">
                              {phase.icon}
                            </div>
                            <h2 className="text-xl font-bold text-white">
                              {phase.title}
                            </h2>
                          </div>
                          <p className="mt-3 leading-relaxed text-neutral-dark">
                            {phase.desc}
                          </p>
                          {phase.details.length > 0 && (
                            <ul className="mt-4 space-y-2">
                              {phase.details.map((d) => (
                                <li
                                  key={d}
                                  className="flex items-start gap-2.5 text-sm text-neutral-dark"
                                >
                                  <svg
                                    viewBox="0 0 20 20"
                                    fill="currentColor"
                                    className="mt-0.5 h-4 w-4 shrink-0 text-teal"
                                    aria-hidden="true"
                                  >
                                    <path
                                      fillRule="evenodd"
                                      d="M16.704 4.153a.75.75 0 01.143 1.052l-8 10.5a.75.75 0 01-1.127.075l-4.5-4.5a.75.75 0 011.06-1.06l3.894 3.893 7.48-9.817a.75.75 0 011.05-.143z"
                                      clipRule="evenodd"
                                    />
                                  </svg>
                                  <span>{d}</span>
                                </li>
                              ))}
                            </ul>
                          )}
                        </div>
                      )}
                    </div>

                    {/* Center: number node */}
                    <div className="flex flex-col items-center">
                      <div className="relative z-10 flex h-14 w-14 items-center justify-center rounded-full border border-teal/30 bg-navy-mid text-sm font-bold text-teal shadow-[0_0_20px_rgba(0,212,170,0.15)]">
                        {String(phase.num).padStart(2, "0")}
                      </div>
                    </div>

                    {/* Right column */}
                    <div
                      className={
                        isEven ? "flex items-start" : ""
                      }
                    >
                      {isEven && (
                        <div className="max-w-md rounded-2xl border border-white/[0.06] bg-white/[0.02] p-6 transition-colors hover:border-indigo/20">
                          <div className="flex items-center gap-3">
                            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-indigo/10 text-indigo">
                              {phase.icon}
                            </div>
                            <h2 className="text-xl font-bold text-white">
                              {phase.title}
                            </h2>
                          </div>
                          <p className="mt-3 leading-relaxed text-neutral-dark">
                            {phase.desc}
                          </p>
                          {phase.details.length > 0 && (
                            <ul className="mt-4 space-y-2">
                              {phase.details.map((d) => (
                                <li
                                  key={d}
                                  className="flex items-start gap-2.5 text-sm text-neutral-dark"
                                >
                                  <svg
                                    viewBox="0 0 20 20"
                                    fill="currentColor"
                                    className="mt-0.5 h-4 w-4 shrink-0 text-indigo"
                                    aria-hidden="true"
                                  >
                                    <path
                                      fillRule="evenodd"
                                      d="M16.704 4.153a.75.75 0 01.143 1.052l-8 10.5a.75.75 0 01-1.127.075l-4.5-4.5a.75.75 0 011.06-1.06l3.894 3.893 7.48-9.817a.75.75 0 011.05-.143z"
                                      clipRule="evenodd"
                                    />
                                  </svg>
                                  <span>{d}</span>
                                </li>
                              ))}
                            </ul>
                          )}
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </FadeIn>
            );
          })}
        </div>
      </section>

      {/* ─── Process Summary Banner ─── */}
      <section className="relative overflow-hidden py-20 sm:py-28">
        {/* Background accent */}
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

          {/* Steps flow */}
          <div className="mt-12 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4 lg:gap-0">
            {summarySteps.map((step, i) => (
              <FadeIn key={step.label} delay={i * 120}>
                <div className="relative flex flex-col items-center text-center">
                  {/* Connector arrow (desktop only) */}
                  {i < summarySteps.length - 1 && (
                    <div className="absolute right-0 top-8 hidden translate-x-1/2 lg:block">
                      <svg
                        viewBox="0 0 24 12"
                        fill="none"
                        className="h-3 w-6 text-teal/30"
                        aria-hidden="true"
                      >
                        <path
                          d="M0 6h20m0 0l-4-4m4 4l-4 4"
                          stroke="currentColor"
                          strokeWidth="1.5"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                    </div>
                  )}

                  {/* Icon circle */}
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

          {/* CTA */}
          <FadeIn delay={500} className="mt-14 text-center">
            <Link
              to="/contact"
              className="inline-flex items-center gap-2 rounded-full bg-teal px-8 py-3.5 text-sm font-semibold text-navy transition-all hover:bg-teal-dark hover:shadow-[0_0_24px_rgba(0,212,170,0.3)]"
            >
              Book a Discovery Call
              <svg
                viewBox="0 0 20 20"
                fill="currentColor"
                className="h-4 w-4"
                aria-hidden="true"
              >
                <path
                  fillRule="evenodd"
                  d="M3 10a.75.75 0 01.75-.75h10.638L10.23 5.29a.75.75 0 111.04-1.08l5.5 5.25a.75.75 0 010 1.08l-5.5 5.25a.75.75 0 11-1.04-1.08l4.158-3.96H3.75A.75.75 0 013 10z"
                  clipRule="evenodd"
                />
              </svg>
            </Link>
          </FadeIn>
        </div>
      </section>
    </>
  );
}
