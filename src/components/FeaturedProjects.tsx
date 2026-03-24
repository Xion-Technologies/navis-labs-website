import { Link } from "react-router-dom";
import FadeIn from "@/components/FadeIn";

const projects = [
  {
    title: "ERP System",
    desc: "End-to-end enterprise resource planning for operational efficiency and real-time intelligence.",
    href: "/projects#erp-system",
    color: "teal" as const,
  },
  {
    title: "JKQ AICB",
    desc: "AI-powered platform leveraging intelligent automation for streamlined business processes.",
    href: "/projects#jkq-aicb",
    color: "indigo" as const,
  },
  {
    title: "Laundromat Service",
    desc: "Digital platform modernizing operations with automated scheduling and customer management.",
    href: "/projects#laundromat-service",
    color: "teal" as const,
  },
  {
    title: "Booking System",
    desc: "Scalable reservation engine built for high availability and seamless experience.",
    href: "/projects#booking-system",
    color: "indigo" as const,
  },
];

function PlaceholderImage({ title, color }: { title: string; color: "teal" | "indigo" }) {
  const isTeal = color === "teal";
  return (
    <div
      className={`flex h-full w-full items-center justify-center ${
        isTeal ? "bg-gradient-to-br from-navy-mid to-teal/10" : "bg-gradient-to-br from-navy-mid to-indigo/10"
      }`}
    >
      {/* Abstract geometric pattern */}
      <svg viewBox="0 0 200 120" fill="none" className="h-full w-full opacity-40" aria-hidden="true">
        {/* Grid dots */}
        {Array.from({ length: 5 }).map((_, row) =>
          Array.from({ length: 8 }).map((_, col) => (
            <circle
              key={`${row}-${col}`}
              cx={15 + col * 24}
              cy={15 + row * 24}
              r="1.5"
              fill="currentColor"
              className={isTeal ? "text-teal/60" : "text-indigo/60"}
            />
          ))
        )}
        {/* Accent shape */}
        <rect
          x="60"
          y="30"
          width="80"
          height="60"
          rx="8"
          stroke="currentColor"
          strokeWidth="1.5"
          className={isTeal ? "text-teal/40" : "text-indigo/40"}
        />
        <rect
          x="75"
          y="45"
          width="50"
          height="30"
          rx="4"
          fill="currentColor"
          className={isTeal ? "text-teal/15" : "text-indigo/15"}
        />
      </svg>
    </div>
  );
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
          {projects.map((project, i) => (
            <FadeIn key={project.title} delay={i * 100}>
              <Link
                to={project.href}
                aria-label={`View project: ${project.title}`}
                className="group block overflow-hidden rounded-2xl border border-white/[0.05] bg-white/[0.02] transition-all duration-300 hover:border-teal/25 hover:shadow-xl hover:shadow-teal/[0.06]"
              >
                {/* Image area */}
                <div className="relative aspect-[16/9] overflow-hidden">
                  <div className="h-full w-full transition-transform duration-500 group-hover:scale-105">
                    <PlaceholderImage title={project.title} color={project.color} />
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
                <div className="p-6">
                  <h3 className="text-lg font-bold text-white transition-colors duration-300 group-hover:text-teal">
                    {project.title}
                  </h3>
                  <p className="mt-2 text-sm leading-relaxed text-neutral-dark">
                    {project.desc}
                  </p>
                </div>
              </Link>
            </FadeIn>
          ))}
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
