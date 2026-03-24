import FadeIn from "@/components/FadeIn";

const summaryItems = [
  {
    title: "3-Day Prototype",
    desc: "Idea to working system in days, not months.",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" className="h-5 w-5" aria-hidden="true">
        <path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    ),
  },
  {
    title: "Try Before You Commit",
    desc: "Zero risk. See it before you spend.",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" className="h-5 w-5" aria-hidden="true">
        <path d="M9 12l2 2 4-4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
        <path d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" stroke="currentColor" strokeWidth="1.5" />
      </svg>
    ),
  },
  {
    title: "Truly Custom",
    desc: "Engineered around your workflows and goals.",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" className="h-5 w-5" aria-hidden="true">
        <path d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
      </svg>
    ),
  },
  {
    title: "AI Navigators",
    desc: "We stay at the edge so you don\u2019t have to.",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" className="h-5 w-5" aria-hidden="true">
        <path d="M12 2l3 7h7l-5.5 4.5 2 7L12 16l-6.5 4.5 2-7L2 9h7l3-7z" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round" />
      </svg>
    ),
  },
  {
    title: "E2E Partnership",
    desc: "Your co-builder from start to scale.",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" className="h-5 w-5" aria-hidden="true">
        <path d="M16 21v-2a4 4 0 00-4-4H6a4 4 0 00-4 4v2" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
        <circle cx="9" cy="7" r="4" stroke="currentColor" strokeWidth="1.5" />
        <path d="M22 21v-2a4 4 0 00-3-3.87M16 3.13a4 4 0 010 7.75" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
      </svg>
    ),
  },
];

export default function USPSummaryStrip() {
  return (
    <section className="relative">
      {/* Glass background strip */}
      <div className="absolute inset-0 border-y border-white/[0.04] bg-white/[0.02] backdrop-blur-sm" />

      <div className="relative mx-auto max-w-7xl px-6 py-12 lg:px-8 lg:py-16">
        <FadeIn>
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-5 lg:gap-4">
            {summaryItems.map((item, i) => (
              <div
                key={item.title}
                className="group flex items-start gap-3 rounded-xl border border-white/[0.04] bg-white/[0.02] p-4 transition-all duration-300 hover:border-teal/20 hover:bg-white/[0.04]"
              >
                {/* Icon */}
                <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-teal/10 text-teal transition-colors group-hover:bg-teal/15">
                  {item.icon}
                </div>

                {/* Text */}
                <div className="min-w-0">
                  <p className="text-sm font-semibold leading-tight text-white">
                    {item.title}
                  </p>
                  <p className="mt-1 text-xs leading-snug text-neutral-dark">
                    {item.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </FadeIn>
      </div>
    </section>
  );
}
