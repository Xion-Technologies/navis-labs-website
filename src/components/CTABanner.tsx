import { Link } from "react-router-dom";
import FadeIn from "@/components/FadeIn";

export default function CTABanner() {
  return (
    <section className="relative overflow-hidden py-28 sm:py-36">
      {/* Background gradient mesh */}
      <div className="absolute inset-0 bg-gradient-to-br from-teal/[0.08] via-navy-mid/50 to-indigo/[0.08]" />

      {/* Radial glow — center */}
      <div className="absolute top-1/2 left-1/2 h-[500px] w-[700px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-teal/[0.07] blur-[120px]" />

      {/* Accent orbs */}
      <div className="absolute -top-20 -left-20 h-64 w-64 rounded-full bg-teal/10 blur-[100px] animate-[float_8s_ease-in-out_infinite]" />
      <div className="absolute -bottom-20 -right-20 h-64 w-64 rounded-full bg-indigo/10 blur-[100px] animate-[float_10s_ease-in-out_infinite_reverse]" />

      {/* Subtle border lines */}
      <div className="absolute inset-0 border-y border-white/[0.06]" />

      {/* Content */}
      <div className="relative mx-auto max-w-3xl px-6 text-center lg:px-8">
        <FadeIn>
          <h2 className="text-3xl font-extrabold tracking-tight text-white sm:text-4xl lg:text-5xl">
            Ready to See Your Idea{" "}
            <span className="bg-gradient-to-r from-teal to-indigo bg-clip-text text-transparent">
              Come to Life?
            </span>
          </h2>

          <p className="mx-auto mt-6 max-w-xl text-base leading-relaxed text-neutral-dark sm:text-lg">
            Your prototype is 3 days away. Let&rsquo;s start with a discovery
            meeting.
          </p>

          <div className="mt-10">
            <Link
              to="/contact"
              className="group inline-flex items-center gap-2 rounded-full bg-teal px-8 py-4 text-base font-bold text-navy shadow-lg shadow-teal/20 transition-all duration-300 hover:bg-teal-dark hover:shadow-xl hover:shadow-teal/30 sm:text-lg"
            >
              Book a Discovery Call
              <svg
                className="h-5 w-5 transition-transform duration-300 group-hover:translate-x-0.5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2.5}
                aria-hidden="true"
              >
                <path strokeLinecap="round" strokeLinejoin="round" d="M13 7l5 5m0 0l-5 5m5-5H6" />
              </svg>
            </Link>
          </div>
        </FadeIn>
      </div>
    </section>
  );
}
