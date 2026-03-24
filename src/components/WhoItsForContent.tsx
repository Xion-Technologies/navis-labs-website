import FadeIn from "@/components/FadeIn";
import { Link } from "react-router-dom";

/* ────────────────────────────────────────────
   Audience data
   ──────────────────────────────────────────── */

const audiences = [
  {
    id: "founders",
    headline: "You Have the Idea. We Make It Real.",
    body: "You have a breakthrough idea but need to test it in the market quickly. We turn your vision into reality in days, not months. Our try-before-you-commit model means you can validate your concept without burning through your runway.",
    cta: "Start With a Free Prototype",
    ctaHref: "/contact",
    accent: "teal" as const,
    icon: (
      <svg viewBox="0 0 48 48" fill="none" className="h-full w-full" aria-hidden="true">
        {/* Lightbulb / idea */}
        <circle cx="24" cy="18" r="10" stroke="currentColor" strokeWidth="1.5" opacity="0.15" fill="currentColor" />
        <path d="M20 32h8m-6 4h4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
        <path d="M18 24.5c-1.5-1.5-2.5-3.5-2.5-6a8.5 8.5 0 1117 0c0 2.5-1 4.5-2.5 6-.8.8-1.5 2-1.5 3.5h-10c0-1.5-.7-2.7-1.5-3.5z" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round" />
        {/* Sparkles */}
        <path d="M36 8l1 3 3 1-3 1-1 3-1-3-3-1 3-1 1-3z" fill="currentColor" opacity="0.5" />
        <path d="M10 12l.7 2 2 .7-2 .7-.7 2-.7-2-2-.7 2-.7.7-2z" fill="currentColor" opacity="0.35" />
      </svg>
    ),
  },
  {
    id: "scaling",
    headline: "Technology That Moves at Your Pace.",
    body: "Your company is growing fast and you need reliable tech solutions that keep up. We deliver production-ready tools built specifically for you \u2014 without the long wait and excessive fees of traditional agencies. Every single dollar you spend will be worth it.",
    cta: "Talk to Our Team",
    ctaHref: "/contact",
    accent: "indigo" as const,
    icon: (
      <svg viewBox="0 0 48 48" fill="none" className="h-full w-full" aria-hidden="true">
        {/* Upward chart / growth */}
        <rect x="6" y="34" width="6" height="8" rx="1" fill="currentColor" opacity="0.15" stroke="currentColor" strokeWidth="1.5" />
        <rect x="16" y="26" width="6" height="16" rx="1" fill="currentColor" opacity="0.15" stroke="currentColor" strokeWidth="1.5" />
        <rect x="26" y="18" width="6" height="24" rx="1" fill="currentColor" opacity="0.15" stroke="currentColor" strokeWidth="1.5" />
        <rect x="36" y="8" width="6" height="34" rx="1" fill="currentColor" opacity="0.15" stroke="currentColor" strokeWidth="1.5" />
        {/* Arrow */}
        <path d="M8 30l12-12 6 6 14-14" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
        <path d="M34 10h6v6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    ),
  },
  {
    id: "ai-teams",
    headline: "Your AI Navigators Are Here.",
    body: "You know AI is reshaping your industry, but you need a development partner who\u2019s obsessed with staying at the edge of emerging technology and can execute your specific use cases. We speak your language and navigate you to the right toolstack and process for your operations.",
    cta: "Explore AI Solutions",
    ctaHref: "/services#ai-integration",
    accent: "teal" as const,
    icon: (
      <svg viewBox="0 0 48 48" fill="none" className="h-full w-full" aria-hidden="true">
        {/* Brain / AI */}
        <circle cx="24" cy="24" r="14" stroke="currentColor" strokeWidth="1.5" opacity="0.15" fill="currentColor" />
        {/* Neural network nodes */}
        <circle cx="24" cy="16" r="2.5" fill="currentColor" />
        <circle cx="16" cy="24" r="2.5" fill="currentColor" />
        <circle cx="32" cy="24" r="2.5" fill="currentColor" />
        <circle cx="20" cy="32" r="2.5" fill="currentColor" />
        <circle cx="28" cy="32" r="2.5" fill="currentColor" />
        <circle cx="24" cy="24" r="2" fill="currentColor" opacity="0.6" />
        {/* Connections */}
        <path d="M24 16v6M16 24h6M26 24h6M24 26l-4 6M24 26l4 6M20 32h8" stroke="currentColor" strokeWidth="1" opacity="0.5" />
        {/* Outer sparks */}
        <path d="M38 10l1 2.5 2.5 1-2.5 1-1 2.5-1-2.5-2.5-1 2.5-1 1-2.5z" fill="currentColor" opacity="0.4" />
        <path d="M8 34l.7 2 2 .7-2 .7-.7 2-.7-2-2-.7 2-.7.7-2z" fill="currentColor" opacity="0.3" />
      </svg>
    ),
  },
];

/* ────────────────────────────────────────────
   Component
   ──────────────────────────────────────────── */

export default function WhoItsForContent() {
  return (
    <>
      {/* ─── Hero ─── */}
      <section className="relative overflow-hidden pt-32 pb-20 sm:pt-40 sm:pb-28">
        <div className="absolute -top-32 -right-32 h-96 w-96 rounded-full bg-teal/10 blur-[120px]" />
        <div className="absolute -bottom-32 -left-32 h-96 w-96 rounded-full bg-indigo/10 blur-[120px]" />

        <div className="relative mx-auto max-w-7xl px-6 lg:px-8">
          <FadeIn className="mx-auto max-w-3xl text-center">
            <h1 className="text-4xl font-extrabold tracking-tight text-white sm:text-5xl lg:text-6xl">
              Built for Teams That{" "}
              <span className="bg-gradient-to-r from-teal to-indigo bg-clip-text text-transparent">
                Move Fast
              </span>
            </h1>
            <p className="mt-6 text-base leading-relaxed text-neutral-dark sm:text-lg lg:text-xl">
              We serve visionary founders, scaling businesses, and AI
              forward-thinking teams who need to validate ideas fast — without
              the steep overhead of traditional development.
            </p>
          </FadeIn>
        </div>
      </section>

      {/* ─── Audience Sections ─── */}
      <section className="relative py-8 sm:py-16">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          {audiences.map((aud, i) => {
            const isReversed = i % 2 === 1;
            const isTeal = aud.accent === "teal";

            return (
              <FadeIn
                key={aud.id}
                direction={isReversed ? "right" : "left"}
                delay={i * 80}
              >
                <div
                  className={`flex flex-col items-center gap-10 py-16 sm:py-24 lg:gap-20 ${
                    isReversed ? "lg:flex-row-reverse" : "lg:flex-row"
                  } ${i > 0 ? "border-t border-white/[0.04]" : ""}`}
                >
                  {/* ── Illustration side ── */}
                  <div className="flex flex-1 items-center justify-center">
                    <div className="relative">
                      {/* Glow background */}
                      <div
                        className={`absolute inset-0 rounded-full blur-[60px] ${
                          isTeal ? "bg-teal/10" : "bg-indigo/10"
                        }`}
                      />
                      {/* Icon container */}
                      <div
                        className={`relative flex h-48 w-48 items-center justify-center rounded-3xl border p-10 sm:h-56 sm:w-56 sm:p-12 ${
                          isTeal
                            ? "border-teal/15 bg-teal/[0.04] text-teal"
                            : "border-indigo/15 bg-indigo/[0.04] text-indigo"
                        }`}
                      >
                        {aud.icon}
                      </div>
                      {/* Corner accent dots */}
                      <div
                        className={`absolute -top-2 -right-2 h-4 w-4 rounded-full ${
                          isTeal ? "bg-teal/30" : "bg-indigo/30"
                        }`}
                      />
                      <div
                        className={`absolute -bottom-2 -left-2 h-3 w-3 rounded-full ${
                          isTeal ? "bg-teal/20" : "bg-indigo/20"
                        }`}
                      />
                    </div>
                  </div>

                  {/* ── Text side ── */}
                  <div className="flex-1 text-center lg:text-left">
                    {/* Audience label */}
                    <p
                      className={`text-xs font-bold uppercase tracking-[0.2em] ${
                        isTeal ? "text-teal/70" : "text-indigo/70"
                      }`}
                    >
                      {i === 0
                        ? "Visionary Founders"
                        : i === 1
                          ? "Scaling Businesses"
                          : "AI Forward-Thinking Teams"}
                    </p>

                    {/* Headline */}
                    <h2 className="mt-4 text-3xl font-extrabold tracking-tight text-white sm:text-4xl">
                      {aud.headline}
                    </h2>

                    {/* Body */}
                    <p className="mt-5 text-base leading-relaxed text-neutral-dark sm:text-lg">
                      {aud.body}
                    </p>

                    {/* CTA */}
                    <div className="mt-8">
                      <Link
                        to={aud.ctaHref}
                        className={`inline-flex items-center gap-2 rounded-full px-7 py-3.5 text-sm font-semibold transition-all ${
                          isTeal
                            ? "bg-teal text-navy hover:bg-teal-dark hover:shadow-[0_0_24px_rgba(0,212,170,0.3)]"
                            : "bg-indigo text-white hover:bg-indigo/90 hover:shadow-[0_0_24px_rgba(99,102,241,0.3)]"
                        }`}
                      >
                        {aud.cta}
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
                    </div>
                  </div>
                </div>
              </FadeIn>
            );
          })}
        </div>
      </section>

      {/* ─── Bottom CTA ─── */}
      <section className="relative overflow-hidden py-20 sm:py-28">
        <div className="absolute inset-0 bg-gradient-to-r from-teal/[0.04] via-indigo/[0.06] to-teal/[0.04]" />
        <div className="absolute inset-0 border-y border-white/[0.04]" />

        <div className="relative mx-auto max-w-3xl px-6 text-center lg:px-8">
          <FadeIn>
            <h2 className="text-2xl font-extrabold text-white sm:text-3xl lg:text-4xl">
              Not Sure Where You Fit?
            </h2>
            <p className="mt-4 text-base leading-relaxed text-neutral-dark sm:text-lg">
              Every project starts with a conversation. Let&rsquo;s talk about
              your goals and figure out the best path forward — together.
            </p>
            <div className="mt-8">
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
            </div>
          </FadeIn>
        </div>
      </section>
    </>
  );
}
