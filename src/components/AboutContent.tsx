import FadeIn from "@/components/FadeIn";

const values = [
  {
    title: "Fast",
    desc: "We share the same level of obsession as our clients and match their pace. Ideas become prototypes in 3 days — not months.",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" className="h-7 w-7" aria-hidden="true">
        <path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    ),
    accent: "teal" as const,
  },
  {
    title: "Efficient",
    desc: "We save you time and money. It\u2019s not just about cutting costs — every single dollar you spend will be worth it. Clear proof-of-concept before you commit.",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" className="h-7 w-7" aria-hidden="true">
        <path d="M9 12l2 2 4-4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
        <path d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" stroke="currentColor" strokeWidth="1.5" />
      </svg>
    ),
    accent: "indigo" as const,
  },
  {
    title: "AI Navigators",
    desc: "We share today\u2019s best practices and advancements. Our shared obsession with emerging technology means you always get the latest best-fit toolstack, solution, and workflows.",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" className="h-7 w-7" aria-hidden="true">
        <path d="M12 2l3 7h7l-5.5 4.5 2 7L12 16l-6.5 4.5 2-7L2 9h7l3-7z" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round" />
      </svg>
    ),
    accent: "teal" as const,
  },
  {
    title: "Partners",
    desc: "We\u2019re your co-builders, not just vendors. Sharing peace of mind amidst the pressure of the AI race through constant connection and end-to-end partnership.",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" className="h-7 w-7" aria-hidden="true">
        <path d="M16 21v-2a4 4 0 00-4-4H6a4 4 0 00-4 4v2" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
        <circle cx="9" cy="7" r="4" stroke="currentColor" strokeWidth="1.5" />
        <path d="M22 21v-2a4 4 0 00-3-3.87M16 3.13a4 4 0 010 7.75" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
      </svg>
    ),
    accent: "indigo" as const,
  },
];

export default function AboutContent() {
  return (
    <>
      {/* ─── Hero ─── */}
      <section className="relative overflow-hidden pt-32 pb-20 sm:pt-40 sm:pb-28">
        {/* Background accents */}
        <div className="absolute -top-32 -right-32 h-96 w-96 rounded-full bg-teal/10 blur-[120px]" />
        <div className="absolute -bottom-32 -left-32 h-96 w-96 rounded-full bg-indigo/10 blur-[120px]" />

        <div className="relative mx-auto max-w-7xl px-6 lg:px-8">
          <FadeIn className="mx-auto max-w-3xl text-center">
            <h1 className="text-4xl font-extrabold tracking-tight text-white sm:text-5xl lg:text-6xl">
              We&rsquo;re Obsessed With{" "}
              <span className="bg-gradient-to-r from-teal to-indigo bg-clip-text text-transparent">
                Tech.
              </span>
            </h1>
            <p className="mt-6 text-base leading-relaxed text-neutral-dark sm:text-lg lg:text-xl">
              So you don&rsquo;t have to be. We live at the edge of emerging
              technology — exploring, refining, and evolving the tools shaping
              the future of productivity.
            </p>
          </FadeIn>
        </div>
      </section>

      {/* ─── Our Story ─── */}
      <section className="relative py-20 sm:py-28">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mx-auto max-w-3xl">
            <FadeIn>
              <span className="inline-block text-xs font-bold uppercase tracking-[0.2em] text-teal">
                Our Story
              </span>
              <h2 className="mt-3 text-3xl font-extrabold tracking-tight text-white sm:text-4xl">
                The Team Behind Navis Labs
              </h2>
            </FadeIn>

            <FadeIn delay={100}>
              <div className="mt-8 space-y-6 text-base leading-relaxed text-neutral-dark sm:text-lg">
                <p>
                  Navis Labs is a development team that&rsquo;s obsessed with
                  tech. We&rsquo;ve seen firsthand how AI and software are
                  evolving faster than ever. New models, tools, and workflows are
                  launching every single day. What worked last month may already
                  be outdated by today&rsquo;s advancements.
                </p>
                <p>
                  For founders, business owners, and fast-moving teams, keeping
                  up with this pace isn&rsquo;t just difficult — it&rsquo;s a
                  distraction from what actually matters: building the business.
                </p>
                <p>
                  That&rsquo;s where Navis comes in. Our team thrives at the
                  edge of emerging technology, so our clients don&rsquo;t have
                  to. We continuously explore, refine, and evolve the tools
                  shaping the future of productivity. Navigating businesses to
                  the best-fit AI solution quickly is simply the byproduct of
                  that obsession. We handle the complexity of modern technology —
                  so you can focus on building your company and serving your
                  customers.
                </p>
              </div>
            </FadeIn>
          </div>
        </div>
      </section>

      {/* ─── What Drives Us ─── */}
      <section className="relative py-20 sm:py-28">
        {/* Subtle background strip */}
        <div className="absolute inset-0 border-y border-white/[0.04] bg-white/[0.02]" />

        <div className="relative mx-auto max-w-7xl px-6 lg:px-8">
          <FadeIn className="mx-auto max-w-3xl text-center">
            <h2 className="text-3xl font-extrabold tracking-tight text-white sm:text-4xl lg:text-5xl">
              What{" "}
              <span className="bg-gradient-to-r from-teal to-indigo bg-clip-text text-transparent">
                Drives Us
              </span>
            </h2>
          </FadeIn>

          <div className="mt-14 grid grid-cols-1 gap-6 sm:grid-cols-2">
            {values.map((value, i) => {
              const isTeal = value.accent === "teal";
              return (
                <FadeIn key={value.title} delay={i * 100}>
                  <div className="group flex h-full flex-col rounded-2xl border border-white/[0.05] bg-white/[0.02] p-8 transition-all duration-300 hover:border-teal/25 hover:bg-white/[0.05]">
                    {/* Icon */}
                    <div
                      className={`flex h-14 w-14 items-center justify-center rounded-xl transition-colors duration-300 ${
                        isTeal
                          ? "bg-teal/10 text-teal group-hover:bg-teal/15"
                          : "bg-indigo/10 text-indigo group-hover:bg-indigo/15"
                      }`}
                    >
                      {value.icon}
                    </div>

                    {/* Title */}
                    <h3 className="mt-5 text-xl font-bold text-white">
                      {value.title}
                    </h3>

                    {/* Description */}
                    <p className="mt-3 flex-1 text-base leading-relaxed text-neutral-dark">
                      {value.desc}
                    </p>
                  </div>
                </FadeIn>
              );
            })}
          </div>
        </div>
      </section>

      {/* ─── Meet the Team ─── */}
      <section className="relative py-20 sm:py-28">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <FadeIn className="mx-auto max-w-3xl text-center">
            <span className="inline-block text-xs font-bold uppercase tracking-[0.2em] text-teal">
              The Crew
            </span>
            <h2 className="mt-3 text-3xl font-extrabold tracking-tight text-white sm:text-4xl">
              Meet the Team
            </h2>
            <p className="mt-4 text-base leading-relaxed text-neutral-dark sm:text-lg">
              A crew of navigators obsessed with charting the best course
              through modern technology for every client we serve.
            </p>
          </FadeIn>

          {/* All members in a unified layout */}
          <div className="mx-auto mt-14 max-w-3xl">
            {/* Row 1 — 3 members */}
            <div className="grid grid-cols-3 gap-y-12 gap-x-10">
              {[
                { initials: "SC", name: "Sage", title: "Head of Tech & Product" },
                { initials: "MT", name: "Matthew", title: "Head of Sales & Strategy" },
                { initials: "JL", name: "Jakob", title: "Head of Internal Operations" },
              ].map((member, i) => (
                <FadeIn key={member.name} delay={i * 80}>
                  <div className="group flex flex-col items-center text-center">
                    <div className="flex h-20 w-20 items-center justify-center rounded-full border border-teal/20 bg-navy-mid text-lg font-bold text-teal transition-all duration-300 group-hover:border-teal/40 group-hover:shadow-[0_0_24px_rgba(0,212,170,0.15)] sm:h-24 sm:w-24 sm:text-xl">
                      {member.initials}
                    </div>
                    <h3 className="mt-4 text-sm font-semibold text-white sm:text-base">
                      {member.name}
                    </h3>
                    <p className="mt-1 text-xs text-neutral-dark sm:text-sm">
                      {member.title}
                    </p>
                  </div>
                </FadeIn>
              ))}
            </div>

            {/* Row 2 — 2 members, offset to sit between columns above */}
            <div className="mt-12 grid grid-cols-2 gap-x-10 px-[calc(100%/6)]">
              {[
                { initials: "LA", name: "Luke", title: "Lead UI Designer" },
                { initials: "NV", name: "Nicolo", title: "Business Development Manager" },
              ].map((member, i) => (
                <FadeIn key={member.name} delay={300 + i * 80}>
                  <div className="group flex flex-col items-center text-center">
                    <div className="flex h-20 w-20 items-center justify-center rounded-full border border-teal/20 bg-navy-mid text-lg font-bold text-teal transition-all duration-300 group-hover:border-teal/40 group-hover:shadow-[0_0_24px_rgba(0,212,170,0.15)] sm:h-24 sm:w-24 sm:text-xl">
                      {member.initials}
                    </div>
                    <h3 className="mt-4 text-sm font-semibold text-white sm:text-base">
                      {member.name}
                    </h3>
                    <p className="mt-1 text-xs text-neutral-dark sm:text-sm">
                      {member.title}
                    </p>
                  </div>
                </FadeIn>
              ))}
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
