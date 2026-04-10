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

function CardImage({ src, alt, color }: { src?: string; alt: string; color: "teal" | "indigo" }) {
  const isTeal = color === "teal";
  const bg = isTeal
    ? "bg-gradient-to-br from-navy-mid to-teal/10"
    : "bg-gradient-to-br from-navy-mid to-indigo/10";
  if (src) {
    return (
      <div className={`flex h-full w-full items-center justify-center ${bg}`}>
        <img
          src={src}
          alt={alt}
          className="h-full w-full object-contain"
          loading="lazy"
        />
      </div>
    );
  }
  return <div className={`h-full w-full ${bg}`} />;
}

export default function FeaturedProjects() {
  return (
    <section className="relative py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        {/* Heading */}
        <FadeIn className="mx-auto max-w-3xl text-center">
          <h2 className="text-3xl font-extrabold tracking-tight text-white sm:text-4xl lg:text-5xl">
            Transforming Industries With{" "}
            <span className="bg-gradient-to-r from-teal to-indigo bg-clip-text text-transparent">
              Solutions That Deliver
            </span>
          </h2>
        </FadeIn>

        {/* Project cards grid */}
        <div className="mt-14 grid grid-cols-1 gap-6 md:grid-cols-2">
          {caseStudies.map((project, i) => {
            const { heading, body } = splitCardCopy(project.title, project.cardDescription);
            return (
              <FadeIn key={project.slug} delay={i * 100} className="h-full">
                <Link
                  to={`/case-studies/${project.slug}`}
                  aria-label={`View project: ${project.title}`}
                  className="group flex h-full flex-col overflow-hidden rounded-2xl border border-white/[0.05] bg-white/[0.02] transition-all duration-300 hover:border-teal/25 hover:shadow-xl hover:shadow-teal/[0.06]"
                >
                {/* Image area */}
                <div className="relative aspect-[16/9] overflow-hidden">
                  <div className="h-full w-full transition-transform duration-500 group-hover:scale-105">
                    <CardImage src={project.image} alt={project.title} color={project.accent} />
                  </div>

                  {/* Hover overlay */}
                  <div className="absolute inset-0 flex items-center justify-center bg-navy/70 opacity-0 backdrop-blur-sm transition-opacity duration-300 group-hover:opacity-100">
                    <span className="flex items-center gap-2 rounded-full border border-teal/30 bg-teal/10 px-5 py-2.5 text-sm font-semibold text-teal">
                      View Project
                      <svg
                        className="h-4 w-4"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                        strokeWidth={2}
                        aria-hidden="true"
                      >
                        <path strokeLinecap="round" strokeLinejoin="round" d="M13 7l5 5m0 0l-5 5m5-5H6" />
                      </svg>
                    </span>
                  </div>
                </div>

                {/* Text content */}
                  <div className="flex flex-1 flex-col p-6">
                    <h3 className="text-lg font-bold text-white transition-colors duration-300 group-hover:text-teal">
                      {heading}
                    </h3>
                    <p className="mt-2 text-sm leading-relaxed text-neutral-dark">
                      {body}
                    </p>
                  </div>
                </Link>
              </FadeIn>
            );
          })}
        </div>

        {/* CTA */}
        <FadeIn delay={500} className="mt-14 text-center">
          <Link
            to="/projects"
            className="group inline-flex items-center gap-2 rounded-full border border-teal/20 bg-teal/[0.06] px-8 py-3.5 text-base font-semibold text-teal transition-all duration-300 hover:border-teal/40 hover:bg-teal/10 hover:shadow-lg hover:shadow-teal/10"
          >
            View All Projects
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
