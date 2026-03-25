import { Link } from "react-router-dom";

const logos = [
  { src: "/logos/anthropic.png", alt: "Anthropic", width: 130 },
  { src: "/logos/aws.png", alt: "AWS", width: 100 },
  { src: "/logos/azure.png", alt: "Microsoft Azure", width: 120 },
  { src: "/logos/cloudflare.png", alt: "Cloudflare", width: 140 },
  { src: "/logos/cursor.png", alt: "Cursor", width: 120 },
  { src: "/logos/digitalocean.png", alt: "DigitalOcean", width: 140 },
  { src: "/logos/figma.png", alt: "Figma", width: 100 },
  { src: "/logos/google.png", alt: "Google", width: 120 },
  { src: "/logos/meta.png", alt: "Meta", width: 120 },
  { src: "/logos/miro.png", alt: "Miro", width: 100 },
  { src: "/logos/openai.png", alt: "OpenAI", width: 120 },
];

export default function HeroSection() {
  return (
    <section className="relative flex min-h-screen items-center justify-center overflow-hidden">
      {/* Animated background orbs */}
      <div className="pointer-events-none absolute inset-0" aria-hidden="true">
        {/* Primary teal orb */}
        <div className="absolute top-1/4 left-1/2 h-[600px] w-[600px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-teal/[0.07] blur-[120px] animate-[float_8s_ease-in-out_infinite]" />
        {/* Secondary indigo orb */}
        <div className="absolute bottom-1/4 right-1/4 h-[500px] w-[500px] rounded-full bg-indigo/[0.08] blur-[100px] animate-[float_10s_ease-in-out_infinite_reverse]" />
        {/* Small accent orb */}
        <div className="absolute top-1/3 left-1/4 h-[300px] w-[300px] rounded-full bg-teal/[0.04] blur-[80px] animate-[float_12s_ease-in-out_infinite_2s]" />

        {/* Grid pattern overlay */}
        <div
          className="absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage: `linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)`,
            backgroundSize: "64px 64px",
          }}
        />

        {/* Radial fade at edges */}
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_0%,var(--color-navy)_75%)]" />
      </div>

      {/* Content — flex column with even spacing to fill viewport */}
      <div className="relative z-10 mx-auto flex min-h-screen w-full max-w-5xl flex-col items-center justify-center px-6 pt-24 pb-12 text-center">
        {/* Spacer to push content down from nav */}
        <div className="flex-1" />

        {/* Main content group */}
        <div>
          {/* Headline */}
          <h1 className="text-4xl leading-[1.1] font-extrabold tracking-tight text-white sm:text-5xl lg:text-[3.5rem] xl:text-[4rem]">
            We Navigate the{" "}
            <span className="bg-gradient-to-r from-teal via-teal to-indigo bg-clip-text text-transparent">
              Tech.
            </span>
            <br className="hidden sm:block" />{" "}
            You Navigate the Business.
          </h1>

          {/* Subheadline */}
          <p className="mx-auto mt-8 max-w-2xl text-base leading-relaxed text-neutral-dark sm:text-lg">
            We handle the complexity of modern technology — so you can focus on
            building your company and serving your customers.
          </p>

          {/* CTA buttons */}
          <div className="mt-10 flex flex-col items-center gap-4 sm:flex-row sm:justify-center">
            <Link
              to="/contact"
              className="group relative inline-flex items-center justify-center overflow-hidden rounded-full bg-teal px-8 py-3.5 text-base font-semibold text-navy transition-all duration-300 hover:shadow-xl hover:shadow-teal/25 active:scale-[0.98]"
            >
              <span className="relative z-10">Book a Discovery Call</span>
              <div className="absolute inset-0 bg-gradient-to-r from-teal to-teal-dark opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
            </Link>
            <Link
              to="/how-it-works"
              className="group inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.03] px-8 py-3.5 text-base font-semibold text-white backdrop-blur-sm transition-all duration-300 hover:border-teal/30 hover:bg-white/[0.06] hover:text-teal"
            >
              See How We Work
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
          </div>
        </div>

        {/* Even spacer between main content and logo carousel */}
        <div className="flex-1" />

        {/* Trust signal — infinite logo carousel */}
        <div className="flex w-full flex-col items-center gap-4 pb-4">
          <p className="text-xs font-medium uppercase tracking-widest text-neutral-dark/60">
            Our Partners
          </p>
          <div className="relative w-full max-w-5xl overflow-hidden">
            {/* Left fade */}
            <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-24 bg-gradient-to-r from-navy to-transparent" />
            {/* Right fade */}
            <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-24 bg-gradient-to-l from-navy to-transparent" />

            <div className="logo-carousel flex w-max items-center gap-20">
              {/* First set */}
              {logos.map((logo) => (
                <img
                  key={`a-${logo.alt}`}
                  src={logo.src}
                  alt={logo.alt}
                  width={logo.width}
                  height={28}
                  className="shrink-0 opacity-50 grayscale"
                />
              ))}
              {/* Duplicate set for seamless loop */}
              {logos.map((logo) => (
                <img
                  key={`b-${logo.alt}`}
                  src={logo.src}
                  alt=""
                  width={logo.width}
                  height={28}
                  className="shrink-0 opacity-50 grayscale"
                  aria-hidden="true"
                />
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Bottom gradient fade into next section */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-navy to-transparent" />
    </section>
  );
}
