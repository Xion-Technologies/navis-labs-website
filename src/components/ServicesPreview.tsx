import { Link } from "react-router-dom";
import FadeIn from "@/components/FadeIn";
import { lazy, Suspense } from "react";

const InnovationFunnel = lazy(() => import("@/components/InnovationFunnel"));
const CustomDevGraphic = lazy(() => import("@/components/CustomDevGraphic"));

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
    graphic: <Suspense fallback={null}><InnovationFunnel /></Suspense>,
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
    graphic: <Suspense fallback={null}><CustomDevGraphic /></Suspense>,
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

export default function ServicesPreview() {
  return (
    <section className="relative py-20 sm:py-28">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        {/* Heading */}
        <FadeIn className="mx-auto max-w-3xl text-center">
          <h2 className="text-3xl font-extrabold tracking-tight text-white sm:text-4xl lg:text-5xl">
            Full-Stack Expertise Meets{" "}
            <span className="bg-gradient-to-r from-teal to-indigo bg-clip-text text-transparent">
              AI-Driven Innovation
            </span>
          </h2>
          <p className="mt-4 text-base leading-relaxed text-neutral-dark sm:text-lg">
            We build systems that don&rsquo;t just work for you — they continue
            to evolve and scale with you.
          </p>
        </FadeIn>

        {/* Service blocks */}
        {services.map((service, i) => {
          const isAlt = i % 2 === 1;
          return (
            <div
              key={service.id}
              id={service.id}
              className={`flex scroll-mt-24 flex-col items-start gap-8 lg:flex-row lg:gap-12 ${
                i === 0 ? "mt-16" : "mt-6 pt-10 border-t border-white/[0.04]"
              }`}
            >
              {/* Left: text + What You Get */}
              <div className="flex-1">
                <FadeIn direction="left">
                  <div className="flex items-center gap-3">
                    <div
                      className={`flex h-12 w-12 items-center justify-center rounded-xl ${
                        isAlt ? "bg-indigo/10 text-indigo" : "bg-teal/10 text-teal"
                      }`}
                    >
                      {service.icon}
                    </div>
                    <h3 className="text-xl font-extrabold text-white sm:text-2xl">
                      {service.title}
                    </h3>
                  </div>
                  <p
                    className={`mt-3 text-xs font-semibold uppercase tracking-[0.15em] ${
                      isAlt ? "text-indigo" : "text-teal"
                    }`}
                  >
                    {service.tagline}
                  </p>
                  <p className="mt-3 text-sm leading-relaxed text-neutral-dark sm:text-base">
                    {service.desc}
                  </p>
                </FadeIn>

                <FadeIn direction="left" delay={150}>
                  <div
                    className={`mt-6 rounded-2xl border bg-white/[0.02] p-5 sm:p-6 ${
                      isAlt ? "border-indigo/15" : "border-teal/15"
                    }`}
                  >
                    <h4
                      className={`text-xs font-bold uppercase tracking-[0.2em] ${
                        isAlt ? "text-indigo/70" : "text-teal/70"
                      }`}
                    >
                      What You Get
                    </h4>
                    <ul className="mt-4 space-y-2.5">
                      {service.items.map((item) => (
                        <li key={item} className="flex items-start gap-2.5">
                          <CheckIcon />
                          <span className="text-sm leading-relaxed text-neutral-dark">
                            {item}
                          </span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* See Use Cases button — liquid glass */}
                  <Link
                    to={`/services/${service.id}`}
                    className={`group relative mt-5 inline-flex items-center gap-2 overflow-hidden rounded-full px-6 py-2.5 text-sm font-semibold backdrop-blur-md transition-all duration-300 ${
                      isAlt
                        ? "border border-indigo/20 bg-indigo/[0.08] text-indigo shadow-[0_0_20px_rgba(99,102,241,0.06)] hover:border-indigo/35 hover:bg-indigo/[0.14] hover:shadow-[0_0_28px_rgba(99,102,241,0.12)]"
                        : "border border-teal/20 bg-teal/[0.08] text-teal shadow-[0_0_20px_rgba(0,212,170,0.06)] hover:border-teal/35 hover:bg-teal/[0.14] hover:shadow-[0_0_28px_rgba(0,212,170,0.12)]"
                    }`}
                  >
                    {/* Glass highlight */}
                    <span className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/[0.12] to-transparent" />
                    See Use Cases
                    <svg
                      className="h-3.5 w-3.5 transition-transform duration-300 group-hover:translate-x-0.5"
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

              {/* Right: animated graphic */}
              <FadeIn
                direction="right"
                delay={200}
                className="hidden flex-1 items-center justify-center lg:flex"
              >
                {service.graphic}
              </FadeIn>
            </div>
          );
        })}

        {/* CTA */}
        <FadeIn delay={300} className="mt-12 text-center">
          <Link
            to="/services"
            className="group inline-flex items-center gap-2 rounded-full border border-teal/20 bg-teal/[0.06] px-8 py-3.5 text-base font-semibold text-teal transition-all duration-300 hover:border-teal/40 hover:bg-teal/10 hover:shadow-lg hover:shadow-teal/10"
          >
            Explore All Services
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
