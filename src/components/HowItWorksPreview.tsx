import { Link } from "react-router-dom";
import FadeIn from "@/components/FadeIn";

const steps = [
  {
    number: "01",
    title: "Discovery Meeting",
    desc: "We learn your pain points and map out the solution.",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" className="h-6 w-6" aria-hidden="true">
        <path d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
      </svg>
    ),
  },
  {
    number: "02",
    title: "3-Day Prototype",
    desc: "A working system you can see and interact with.",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" className="h-6 w-6" aria-hidden="true">
        <path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    ),
  },
  {
    number: "03",
    title: "Build & Deploy",
    desc: "Rapid development with full transparency at every stage.",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" className="h-6 w-6" aria-hidden="true">
        <path d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    ),
  },
  {
    number: "04",
    title: "Ongoing Support",
    desc: "We stay with you as your in-house tech partner.",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" className="h-6 w-6" aria-hidden="true">
        <path d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    ),
  },
];

export default function HowItWorksPreview() {
  return (
    <section className="relative py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        {/* Section heading */}
        <FadeIn className="text-center">
          <h2 className="text-3xl font-extrabold tracking-tight text-white sm:text-4xl lg:text-5xl">
            From Idea to Impact —{" "}
            <span className="bg-gradient-to-r from-teal to-indigo bg-clip-text text-transparent">
              In Days, Not Months
            </span>
          </h2>
        </FadeIn>

        {/* Desktop timeline (horizontal) */}
        <FadeIn delay={200} className="mt-16 hidden lg:block">
          <div className="relative">
            {/* Connecting line */}
            <div className="absolute top-10 left-[calc(12.5%+20px)] right-[calc(12.5%+20px)] h-px bg-gradient-to-r from-teal/40 via-indigo/30 to-teal/40" />

            <div className="grid grid-cols-4 gap-6">
              {steps.map((step, i) => (
                <div key={step.number} className="group relative flex flex-col items-center text-center">
                  {/* Number circle */}
                  <div className="relative z-10 flex h-20 w-20 items-center justify-center rounded-2xl border border-teal/20 bg-navy-mid/60 shadow-lg shadow-teal/5 backdrop-blur-sm transition-all duration-300 group-hover:border-teal/40 group-hover:shadow-teal/15">
                    <div className="text-teal">{step.icon}</div>
                  </div>

                  {/* Step number */}
                  <span className="mt-5 text-xs font-bold tracking-[0.2em] text-teal/60">
                    STEP {step.number}
                  </span>

                  {/* Title */}
                  <h3 className="mt-2 text-lg font-bold text-white">
                    {step.title}
                  </h3>

                  {/* Description */}
                  <p className="mt-2 text-sm leading-relaxed text-neutral-dark">
                    {step.desc}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </FadeIn>

        {/* Mobile/Tablet timeline (vertical) */}
        <div className="mt-12 lg:hidden">
          <div className="relative ml-4 border-l border-teal/20 pl-8 sm:ml-8 sm:pl-12">
            {steps.map((step, i) => (
              <FadeIn key={step.number} delay={i * 100}>
                <div className={`relative pb-12 ${i === steps.length - 1 ? "pb-0" : ""}`}>
                  {/* Dot on line */}
                  <div className="absolute -left-[calc(2rem+4.5px)] top-1 flex h-[9px] w-[9px] items-center justify-center rounded-full bg-teal sm:-left-[calc(3rem+4.5px)]" />

                  {/* Step number */}
                  <span className="text-xs font-bold tracking-[0.2em] text-teal/60">
                    STEP {step.number}
                  </span>

                  {/* Title */}
                  <h3 className="mt-1 text-xl font-bold text-white">
                    {step.title}
                  </h3>

                  {/* Description */}
                  <p className="mt-2 text-base leading-relaxed text-neutral-dark">
                    {step.desc}
                  </p>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>

        {/* CTA */}
        <FadeIn delay={300} className="mt-14 text-center">
          <Link
            to="/how-it-works"
            className="group inline-flex items-center gap-2 rounded-full border border-teal/20 bg-teal/[0.06] px-8 py-3.5 text-base font-semibold text-teal transition-all duration-300 hover:border-teal/40 hover:bg-teal/10 hover:shadow-lg hover:shadow-teal/10"
          >
            See the Full Process
            <svg
              className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-0.5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
              aria-hidden="true"
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M13 7l5 5m0 0l-5 5m5-5H6" />
            </svg>
          </Link>
        </FadeIn>
      </div>
    </section>
  );
}
