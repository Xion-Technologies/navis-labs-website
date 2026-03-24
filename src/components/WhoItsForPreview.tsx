import { Link } from "react-router-dom";
import FadeIn from "@/components/FadeIn";

const audiences = [
  {
    title: "Visionary Founders",
    desc: "Validate your concept in days, not months — without burning through your runway.",
    href: "/solutions#founders",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" className="h-7 w-7" aria-hidden="true">
        <path d="M15.59 14.37a6 6 0 01-5.84 7.38v-4.8m5.84-2.58a14.98 14.98 0 006.16-12.12A14.98 14.98 0 009.63 8.41m5.96 5.96a14.926 14.926 0 01-5.84 2.58m0 0a6 6 0 01-7.38-5.84h4.8" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    ),
    accent: "teal" as const,
  },
  {
    title: "Scaling Businesses",
    desc: "Production-ready tech that moves at your pace. Every dollar you spend will be worth it.",
    href: "/solutions#scaling",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" className="h-7 w-7" aria-hidden="true">
        <path d="M2 20h.01M7 20v-4M12 20v-8M17 20V8M22 4v16" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    ),
    accent: "indigo" as const,
  },
  {
    title: "AI Forward-Thinking Teams",
    desc: "Your AI navigators are here. We execute your specific use cases with the right toolstack.",
    href: "/solutions#ai-teams",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" className="h-7 w-7" aria-hidden="true">
        <path d="M9.75 3.104v5.714a2.25 2.25 0 01-.659 1.591L5 14.5M9.75 3.104c-.251.023-.501.05-.75.082m.75-.082a24.301 24.301 0 014.5 0m0 0v5.714a2.25 2.25 0 00.659 1.591L19 14.5m-4.75-11.396c.251.023.501.05.75.082M12 12l3 3m-3-3l-3 3m-3.75 3a3 3 0 015.568-1.548M15.75 18a3 3 0 01-5.568-1.548m11.568 1.548a3 3 0 01-5.568-1.548" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    ),
    accent: "teal" as const,
  },
];

export default function WhoItsForPreview() {
  return (
    <section className="relative py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        {/* Heading */}
        <FadeIn className="mx-auto max-w-3xl text-center">
          <h2 className="text-3xl font-extrabold tracking-tight text-white sm:text-4xl lg:text-5xl">
            Built for Teams That{" "}
            <span className="bg-gradient-to-r from-teal to-indigo bg-clip-text text-transparent">
              Move Fast
            </span>
          </h2>
        </FadeIn>

        {/* Audience cards */}
        <div className="mt-14 grid grid-cols-1 gap-6 lg:grid-cols-3">
          {audiences.map((audience, i) => {
            const isTeal = audience.accent === "teal";
            return (
              <FadeIn key={audience.title} delay={i * 120}>
                <Link
                  to={audience.href}
                  aria-label={`Learn more about solutions for ${audience.title}`}
                  className="group relative flex h-full flex-col overflow-hidden rounded-2xl border border-white/[0.05] bg-white/[0.02] p-8 transition-all duration-300 hover:-translate-y-1 hover:border-teal/25 hover:bg-white/[0.05] hover:shadow-xl hover:shadow-teal/[0.06]"
                >
                  {/* Glow accent (top-right) */}
                  <div
                    className={`absolute -top-16 -right-16 h-32 w-32 rounded-full blur-[60px] transition-opacity duration-500 group-hover:opacity-60 ${
                      isTeal ? "bg-teal/20 opacity-30" : "bg-indigo/20 opacity-30"
                    }`}
                  />

                  {/* Icon */}
                  <div
                    className={`relative flex h-14 w-14 items-center justify-center rounded-xl transition-colors duration-300 ${
                      isTeal
                        ? "bg-teal/10 text-teal group-hover:bg-teal/15"
                        : "bg-indigo/10 text-indigo group-hover:bg-indigo/15"
                    }`}
                  >
                    {audience.icon}
                  </div>

                  {/* Title */}
                  <h3
                    className={`relative mt-6 text-xl font-bold transition-colors duration-300 ${
                      isTeal
                        ? "text-white group-hover:text-teal"
                        : "text-white group-hover:text-indigo"
                    }`}
                  >
                    {audience.title}
                  </h3>

                  {/* Description */}
                  <p className="relative mt-3 flex-1 text-base leading-relaxed text-neutral-dark">
                    {audience.desc}
                  </p>

                  {/* Arrow link indicator */}
                  <div
                    className={`relative mt-6 flex items-center gap-1 text-xs font-semibold uppercase tracking-wider transition-all duration-300 group-hover:gap-2 ${
                      isTeal
                        ? "text-teal/60 group-hover:text-teal"
                        : "text-indigo/60 group-hover:text-indigo"
                    }`}
                  >
                    Learn more
                    <svg className="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2} aria-hidden="true">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M13 7l5 5m0 0l-5 5m5-5H6" />
                    </svg>
                  </div>
                </Link>
              </FadeIn>
            );
          })}
        </div>

        {/* CTA */}
        <FadeIn delay={400} className="mt-14 text-center">
          <Link
            to="/solutions"
            className="group inline-flex items-center gap-2 rounded-full border border-teal/20 bg-teal/[0.06] px-8 py-3.5 text-base font-semibold text-teal transition-all duration-300 hover:border-teal/40 hover:bg-teal/10 hover:shadow-lg hover:shadow-teal/10"
          >
            Find Your Fit
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
