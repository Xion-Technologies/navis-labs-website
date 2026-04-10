import { useState } from "react";
import { Link } from "react-router-dom";
import FadeIn from "@/components/FadeIn";
import { caseStudies } from "@/data/caseStudies";

function splitCardCopy(title: string, fallback: string) {
  const separatorIndex = title.indexOf(":");
  if (separatorIndex === -1) {
    return { heading: title, body: fallback };
  }

  const heading = title.slice(0, separatorIndex + 1).trim();
  const body = title.slice(separatorIndex + 1).trim();
  return { heading, body: body || fallback };
}

const allTags = Array.from(new Set(caseStudies.flatMap((p) => p.tags)));

/* ────────────────────────────────────────────
   Component
   ──────────────────────────────────────────── */

export default function ProjectsContent() {
  const [activeTag, setActiveTag] = useState<string | null>(null);

  const filtered = activeTag
    ? caseStudies.filter((p) => p.tags.includes(activeTag))
    : caseStudies;

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
              const isTeal = project.accent === "teal";
              const { heading, body } = splitCardCopy(project.title, project.cardDescription);
              return (
                <FadeIn key={project.slug} delay={i * 120}>
                  <Link
                    to={`/case-studies/${project.slug}`}
                    className="group relative block overflow-hidden rounded-2xl border border-white/[0.06] bg-white/[0.02] transition-all duration-300 hover:border-teal/20 hover:shadow-[0_0_40px_rgba(0,212,170,0.06)]"
                    aria-label={`Read case study: ${project.title}`}
                  >
                    <div className="relative h-52 overflow-hidden sm:h-60">
                      <div
                        className={`h-full w-full bg-gradient-to-br transition-transform duration-500 group-hover:scale-105 ${
                          isTeal
                            ? "from-navy-mid via-teal/10 to-indigo/10"
                            : "from-navy-mid via-indigo/10 to-teal/10"
                        }`}
                      />
                      <div className="absolute inset-0 flex items-center justify-center bg-navy/70 opacity-0 backdrop-blur-sm transition-opacity duration-300 group-hover:opacity-100">
                        <span className="flex items-center gap-2 rounded-full border border-teal/30 bg-teal/10 px-6 py-2.5 text-sm font-semibold text-teal">
                          Read Case Study
                          <svg viewBox="0 0 20 20" fill="currentColor" className="h-4 w-4" aria-hidden="true">
                            <path fillRule="evenodd" d="M3 10a.75.75 0 01.75-.75h10.638L10.23 5.29a.75.75 0 111.04-1.08l5.5 5.25a.75.75 0 010 1.08l-5.5 5.25a.75.75 0 11-1.04-1.08l4.158-3.96H3.75A.75.75 0 013 10z" clipRule="evenodd" />
                          </svg>
                        </span>
                      </div>
                    </div>

                    <div className="p-6 sm:p-8">
                      <h2 className="text-xl font-bold text-white sm:text-2xl">
                        {heading}
                      </h2>
                      <p className="mt-3 text-sm leading-relaxed text-neutral-dark sm:text-base">
                        {body}
                      </p>

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
                  </Link>
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
