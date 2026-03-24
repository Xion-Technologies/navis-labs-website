import { useEffect, useRef, useState } from "react";

const usps = [
  {
    overline: "AI NAVIGATORS",
    headline: "Obsessed With Tech. So You Don\u2019t Have To Be.",
    body: "AI and software are evolving faster than ever. New models, tools, and workflows launch every single day. What worked last month may already be outdated. Our team thrives at the edge of emerging technology, so our clients don\u2019t have to. We share today\u2019s best practices and advancements, recommending the right toolstack, solution, and workflows for your operations. Navigating businesses to the best-fit AI solution quickly is simply the byproduct of that obsession.",
  },
  {
    overline: "FAST",
    headline: "From Idea to Working Prototype in 3 Days.",
    body: "We share the same level of obsession as our clients and match their pace. After a single discovery meeting, we deliver a functional prototype within 3 days. This isn\u2019t a mockup \u2014 it\u2019s a reactive, working system you can interact with. You visually see your idea before you decide.",
    steps: [
      "Discovery Meeting",
      "3-Day Prototype",
      "Build & Deploy",
      "Ongoing Support",
    ],
  },
  {
    overline: "EFFICIENT",
    headline: "See It Before You Spend a Dollar.",
    body: "We turn your idea into a working prototype with no contract or commitments. If you love it, we\u2019ll build it. If not, you walk away with zero risk. It\u2019s not just about saving money \u2014 every single dollar you spend will be worth it. You get a clear proof-of-concept and a full project proposal within 3 days, so you know exactly what you\u2019re investing in before you commit.",
  },
  {
    overline: "TRULY YOURS",
    headline: "Built Around You. Not the Other Way Around.",
    body: "Off-the-shelf software forces you to adapt your workflows to rigid systems. We do the opposite. Every solution is engineered around your specific workflows, pain points, and business objectives. We continuously explore, refine, and evolve the tools shaping the future of productivity \u2014 so every system we build leverages the latest and best-fit technology for your exact needs.",
  },
  {
    overline: "HERE FOR YOU",
    headline: "Your Co-Builder. From Day One to Day Done \u2014 and Beyond.",
    body: "We don\u2019t just deliver a product and disappear. We become your co-builder from ideation, through production, all the way to post-turnover maintenance. Sharing peace of mind amidst the pressure of the AI race \u2014 we are with you every step of the way through constant connection and support.",
  },
];

/* ── Orbital rings SVG (sticky left visual) ── */
function OrbitalVisual({ activeIndex }: { activeIndex: number }) {
  // Each USP maps to a node position on the rings
  const nodes = [
    { cx: 200, cy: 60, ring: 1 },   // AI NAVIGATORS — top of outer ring
    { cx: 330, cy: 150, ring: 2 },   // FAST — right of mid ring
    { cx: 280, cy: 280, ring: 3 },   // EFFICIENT — bottom-right
    { cx: 100, cy: 260, ring: 2 },   // TRULY YOURS — bottom-left
    { cx: 70, cy: 130, ring: 1 },    // HERE FOR YOU — left of outer ring
  ];

  return (
    <div className="relative flex items-center justify-center">
      {/* Glow behind orbital */}
      <div className="absolute h-80 w-80 rounded-full bg-teal/[0.08] blur-[100px]" />
      <div className="absolute h-48 w-48 rounded-full bg-indigo/[0.06] blur-[80px]" />

      <svg
        viewBox="0 0 400 400"
        fill="none"
        className="relative h-[360px] w-[360px] xl:h-[420px] xl:w-[420px]"
        aria-hidden="true"
      >
        {/* Outer ring */}
        <circle
          cx="200" cy="200" r="170"
          stroke="url(#ring-grad)"
          strokeWidth="1"
          opacity={activeIndex === 0 || activeIndex === 4 ? 0.5 : 0.15}
          className="transition-opacity duration-700"
        />
        {/* Middle ring */}
        <circle
          cx="200" cy="200" r="120"
          stroke="url(#ring-grad)"
          strokeWidth="1"
          opacity={activeIndex === 1 || activeIndex === 3 ? 0.5 : 0.15}
          className="transition-opacity duration-700"
        />
        {/* Inner ring */}
        <circle
          cx="200" cy="200" r="70"
          stroke="url(#ring-grad)"
          strokeWidth="1"
          opacity={activeIndex === 2 ? 0.5 : 0.15}
          className="transition-opacity duration-700"
        />

        {/* Center core */}
        <circle cx="200" cy="200" r="6" fill="#00D4AA" opacity="0.6" />
        <circle cx="200" cy="200" r="3" fill="#00D4AA" opacity="0.9" />

        {/* Orbital connecting lines from center to active node */}
        <line
          x1="200" y1="200"
          x2={nodes[activeIndex].cx}
          y2={nodes[activeIndex].cy}
          stroke="url(#line-grad)"
          strokeWidth="1"
          strokeDasharray="4 4"
          opacity="0.4"
          className="transition-all duration-700"
        />

        {/* Node dots */}
        {nodes.map((node, i) => (
          <g key={i}>
            {/* Pulse ring on active */}
            {i === activeIndex && (
              <circle
                cx={node.cx} cy={node.cy} r="16"
                stroke="#00D4AA"
                strokeWidth="1"
                fill="none"
                opacity="0.3"
                className="animate-[ping_2s_ease-in-out_infinite]"
              />
            )}
            {/* Outer glow */}
            <circle
              cx={node.cx} cy={node.cy}
              r={i === activeIndex ? 10 : 5}
              fill={i === activeIndex ? "#00D4AA" : "transparent"}
              stroke={i === activeIndex ? "#00D4AA" : "#94A3B8"}
              strokeWidth={i === activeIndex ? 0 : 1}
              opacity={i === activeIndex ? 0.25 : 0.3}
              className="transition-all duration-500"
            />
            {/* Core dot */}
            <circle
              cx={node.cx} cy={node.cy}
              r={i === activeIndex ? 5 : 3}
              fill={i === activeIndex ? "#00D4AA" : "#94A3B8"}
              opacity={i === activeIndex ? 1 : 0.4}
              className="transition-all duration-500"
            />
          </g>
        ))}

        {/* Gradients */}
        <defs>
          <linearGradient id="ring-grad" x1="0" y1="0" x2="400" y2="400">
            <stop offset="0%" stopColor="#00D4AA" />
            <stop offset="100%" stopColor="#6366F1" />
          </linearGradient>
          <linearGradient id="line-grad" x1="200" y1="200" x2={String(nodes[activeIndex].cx)} y2={String(nodes[activeIndex].cy)}>
            <stop offset="0%" stopColor="#00D4AA" stopOpacity="0.6" />
            <stop offset="100%" stopColor="#6366F1" stopOpacity="0.2" />
          </linearGradient>
        </defs>
      </svg>
    </div>
  );
}

/* ── Step Flow (for USP 1) ── */
function StepFlow({ steps }: { steps: string[] }) {
  return (
    <div className="relative mt-6">
      <div className="flex items-center justify-center">
        {steps.map((step, i) => (
          <div key={step} className="flex items-center">
            {/* Node + label */}
            <div className="flex flex-col items-center gap-1.5">
              <span
                className={`flex h-7 w-7 items-center justify-center rounded-full text-[10px] font-bold ${
                  i === 0
                    ? "bg-teal text-navy shadow-[0_0_12px_rgba(0,212,170,0.4)]"
                    : "border border-teal/25 bg-navy-mid text-teal/80"
                }`}
              >
                {i + 1}
              </span>
              <span className="text-[11px] font-medium text-neutral-light/70 whitespace-nowrap">
                {step}
              </span>
            </div>
            {/* Connector line */}
            {i < steps.length - 1 && (
              <div
                className="mx-2 h-px flex-1 min-w-[24px]"
                style={{
                  background: `linear-gradient(to right, rgba(0,212,170,${0.4 - i * 0.08}), rgba(99,102,241,${0.2 + i * 0.05}))`,
                }}
                aria-hidden="true"
              />
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

/* ── Main Section ── */
export default function USPSections() {
  const [activeIndex, setActiveIndex] = useState(0);
  const cardRefs = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const idx = cardRefs.current.indexOf(entry.target as HTMLDivElement);
            if (idx !== -1) setActiveIndex(idx);
          }
        });
      },
      {
        rootMargin: "-35% 0px -35% 0px",
        threshold: 0.1,
      }
    );

    cardRefs.current.forEach((ref) => {
      if (ref) observer.observe(ref);
    });

    return () => observer.disconnect();
  }, []);

  return (
    <section className="relative py-20 sm:py-32">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        {/* Mobile: stacked layout */}
        <div className="lg:hidden space-y-16">
          {usps.map((usp, i) => (
            <div key={usp.overline}>
              <span className="text-xs font-bold uppercase tracking-[0.2em] text-teal">
                {usp.overline}
              </span>
              <h2 className="mt-3 text-3xl font-extrabold leading-tight tracking-tight text-white sm:text-4xl">
                {usp.headline}
              </h2>
              <p className="mt-4 text-base leading-relaxed text-neutral-dark">
                {usp.body}
              </p>
              {usp.steps && <StepFlow steps={usp.steps} />}
            </div>
          ))}
        </div>

        {/* Desktop: sticky orbital + scrolling cards */}
        <div className="hidden lg:flex lg:gap-16 xl:gap-24">
          {/* Left — sticky orbital visual */}
          <div className="w-[420px] shrink-0 xl:w-[460px]">
            <div className="sticky top-32 flex items-center justify-center">
              <OrbitalVisual activeIndex={activeIndex} />

              {/* Active indicator label */}
              <div className="absolute -bottom-2 left-1/2 -translate-x-1/2">
                <span className="rounded-full border border-teal/20 bg-teal/[0.06] px-4 py-1.5 text-xs font-bold uppercase tracking-[0.2em] text-teal transition-all duration-500">
                  {usps[activeIndex].overline}
                </span>
              </div>
            </div>
          </div>

          {/* Right — scrolling content cards */}
          <div className="flex-1 space-y-8">
            {usps.map((usp, i) => (
              <div
                key={usp.overline}
                ref={(el) => { cardRefs.current[i] = el; }}
                className={`rounded-2xl border p-8 transition-all duration-500 xl:p-10 ${
                  i === activeIndex
                    ? "border-teal/20 bg-white/[0.03] shadow-[0_0_40px_rgba(0,212,170,0.06)]"
                    : "border-transparent bg-transparent opacity-40"
                }`}
              >
                <span
                  className={`text-xs font-bold uppercase tracking-[0.2em] transition-colors duration-500 ${
                    i === activeIndex ? "text-teal" : "text-neutral-dark/60"
                  }`}
                >
                  {usp.overline}
                </span>
                <h2
                  className={`mt-3 text-2xl font-extrabold leading-tight tracking-tight transition-colors duration-500 xl:text-3xl ${
                    i === activeIndex ? "text-white" : "text-white/50"
                  }`}
                >
                  {usp.headline}
                </h2>
                <p
                  className={`mt-4 text-base leading-relaxed transition-colors duration-500 ${
                    i === activeIndex ? "text-neutral-dark" : "text-neutral-dark/40"
                  }`}
                >
                  {usp.body}
                </p>
                {usp.steps && i === activeIndex && <StepFlow steps={usp.steps} />}
              </div>
            ))}
            {/* Bottom spacer so last card can scroll to center */}
            <div className="h-[40vh]" aria-hidden="true" />
          </div>
        </div>
      </div>
    </section>
  );
}
