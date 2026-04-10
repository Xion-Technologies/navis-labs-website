import { Link } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import FadeIn from "@/components/FadeIn";
import type { CaseStudy } from "@/data/caseStudies";

interface CaseStudyTemplateProps {
  caseStudy: CaseStudy;
}

export default function CaseStudyTemplate({ caseStudy }: CaseStudyTemplateProps) {
  const accentClasses =
    caseStudy.accent === "teal"
      ? {
          badge: "bg-teal/10 text-teal border-teal/30",
          title: "from-teal to-indigo",
          chip: "bg-teal/10 text-teal/90 border-teal/20",
        }
      : {
          badge: "bg-indigo/10 text-indigo border-indigo/30",
          title: "from-indigo to-teal",
          chip: "bg-indigo/10 text-indigo/90 border-indigo/20",
        };

  const canonical = `https://navislabs.com/case-studies/${caseStudy.slug}`;

  return (
    <>
      <Helmet>
        <title>{`${caseStudy.title} | Navis Labs`}</title>
        <meta name="description" content={caseStudy.summary} />
        <meta property="og:title" content={`${caseStudy.title} | Navis Labs`} />
        <meta property="og:description" content={caseStudy.summary} />
        <meta property="og:url" content={canonical} />
        <meta property="og:image" content="/og-image.png" />
        <meta name="twitter:card" content="summary_large_image" />
        <link rel="canonical" href={canonical} />
      </Helmet>

      <article className="relative overflow-hidden pb-20 sm:pb-28">
        <section className="relative overflow-hidden pt-32 pb-16 sm:pt-40 sm:pb-20">
          <div className="absolute -top-32 -right-32 h-96 w-96 rounded-full bg-teal/10 blur-[120px]" />
          <div className="absolute -bottom-32 -left-32 h-96 w-96 rounded-full bg-indigo/10 blur-[120px]" />

          <div className="relative mx-auto max-w-4xl px-6 lg:px-8">
            <FadeIn>
              <Link
                to="/projects"
                className="inline-flex items-center gap-2 text-sm font-semibold text-neutral-dark transition-colors hover:text-white"
              >
                <span aria-hidden="true">←</span>
                Back to Projects
              </Link>
              <div className="mt-8">
                <span
                  className={`inline-flex items-center rounded-full border px-3 py-1 text-xs font-semibold uppercase tracking-[0.14em] ${accentClasses.badge}`}
                >
                  {caseStudy.industry}
                </span>
                <h1
                  className={`mt-5 bg-gradient-to-r ${accentClasses.title} bg-clip-text text-3xl font-extrabold tracking-tight text-transparent sm:text-4xl lg:text-5xl`}
                >
                  {caseStudy.title}
                </h1>
                <p className="mt-6 text-base leading-relaxed text-neutral-dark sm:text-lg">
                  {caseStudy.summary}
                </p>
              </div>
            </FadeIn>
          </div>
        </section>

        <section className="relative">
          <div className="mx-auto max-w-4xl px-6 lg:px-8">
            <FadeIn>
              <div className="rounded-2xl border border-white/[0.08] bg-white/[0.02] p-6 sm:p-8">
                <h2 className="text-sm font-bold uppercase tracking-[0.14em] text-white/80">
                  Client Overview
                </h2>
                <dl className="mt-5 grid gap-4 sm:grid-cols-2">
                  {Object.entries(caseStudy.clientOverview).map(([key, value]) => (
                    <div key={key} className="rounded-xl border border-white/[0.06] bg-white/[0.01] p-4">
                      <dt className="text-xs font-semibold uppercase tracking-[0.1em] text-neutral-dark">
                        {key}
                      </dt>
                      <dd className="mt-2 text-sm leading-relaxed text-white/90">{value}</dd>
                    </div>
                  ))}
                </dl>
              </div>
            </FadeIn>

            <FadeIn delay={90}>
              <section className="mt-10 rounded-2xl border border-white/[0.08] bg-white/[0.02] p-6 sm:p-8">
                <h2 className="text-2xl font-bold text-white">The Challenge</h2>
                <div className="mt-4 space-y-4">
                  {caseStudy.challenge.paragraphs.map((paragraph) => (
                    <p key={paragraph} className="text-sm leading-relaxed text-neutral-dark sm:text-base">
                      {paragraph}
                    </p>
                  ))}
                </div>
                <ul className="mt-6 space-y-3">
                  {caseStudy.challenge.bullets.map((item) => (
                    <li key={item} className="flex items-start gap-3 text-sm text-white/90 sm:text-base">
                      <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-teal/90" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </section>
            </FadeIn>

            <FadeIn delay={140}>
              <section className="mt-10 rounded-2xl border border-white/[0.08] bg-white/[0.02] p-6 sm:p-8">
                <h2 className="text-2xl font-bold text-white">Our Approach</h2>
                <div className="mt-4 space-y-4">
                  {caseStudy.approach.paragraphs.map((paragraph) => (
                    <p key={paragraph} className="text-sm leading-relaxed text-neutral-dark sm:text-base">
                      {paragraph}
                    </p>
                  ))}
                </div>
                <ul className="mt-6 space-y-3">
                  {caseStudy.approach.bullets.map((item) => (
                    <li key={item} className="flex items-start gap-3 text-sm text-white/90 sm:text-base">
                      <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-indigo/90" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </section>
            </FadeIn>

            <FadeIn delay={180}>
              <section className="mt-10 rounded-2xl border border-white/[0.08] bg-white/[0.02] p-6 sm:p-8">
                <h2 className="text-2xl font-bold text-white">The Results</h2>
                <ul className="mt-5 space-y-3">
                  {caseStudy.results.map((item) => (
                    <li key={item} className="flex items-start gap-3 text-sm text-white/90 sm:text-base">
                      <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-teal/90" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </section>
            </FadeIn>

            <FadeIn delay={220}>
              <section className="mt-10 rounded-2xl border border-white/[0.08] bg-white/[0.02] p-6 sm:p-8">
                <h2 className="text-2xl font-bold text-white">Why It Matters</h2>
                <div className="mt-4 space-y-4">
                  {caseStudy.whyItMatters.map((paragraph) => (
                    <p key={paragraph} className="text-sm leading-relaxed text-neutral-dark sm:text-base">
                      {paragraph}
                    </p>
                  ))}
                </div>
              </section>
            </FadeIn>

            <FadeIn delay={260}>
              <section className="mt-10 rounded-2xl border border-white/[0.08] bg-white/[0.02] p-6 sm:p-8">
                <h2 className="text-2xl font-bold text-white">Technologies Used</h2>
                <div className="mt-5 flex flex-wrap gap-2">
                  {caseStudy.technologies.map((tech) => (
                    <span
                      key={tech}
                      className={`rounded-full border px-3 py-1 text-[11px] font-semibold uppercase tracking-wider ${accentClasses.chip}`}
                    >
                      {tech}
                    </span>
                  ))}
                </div>
                <p className="mt-6 text-xs italic text-neutral-dark">{caseStudy.anonymizedNote}</p>
              </section>
            </FadeIn>
          </div>
        </section>
      </article>
    </>
  );
}
