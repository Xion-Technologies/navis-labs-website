import { useEffect, useRef, useState, useCallback } from "react";
import { useAnimationGate } from "@/hooks/useAnimationGate";

const usps = [
  {
    overline: "AI NAVIGATORS",
    headline: "Obsessed With Tech. So You Don\u2019t Have To Be.",
    body: "AI and software are evolving faster than ever. New models, tools, and workflows launch every single day. What worked last month may already be outdated. Our team thrives at the edge of emerging technology, so our clients don\u2019t have to. We share today\u2019s best practices and advancements, recommending the right toolstack, solution, and workflows for your operations. Navigating businesses to the best-fit AI solution quickly is simply the byproduct of that obsession.",
  },
  {
    overline: "FAST",
    headline: "From Idea to Working Prototype in 3 Days.",
    body: "We share the same level of obsession as our clients and match their pace. After a single discovery meeting, we deliver a functional prototype within 3 days. This isn\u2019t a mockup \u2014 it\u2019s a reactive, working system you can interact with. You visually see your idea before you decide.",
    steps: [
      "Discovery Meeting",
      "3-Day Prototype",
      "Build & Deploy",
      "Ongoing Support",
    ],
  },
  {
    overline: "EFFICIENT",
    headline: "See It Before You Spend a Dollar.",
    body: "We turn your idea into a working prototype with no contract or commitments. If you love it, we\u2019ll build it. If not, you walk away with zero risk. It\u2019s not just about saving money \u2014 every single dollar you spend will be worth it. You get a clear proof-of-concept and a full project proposal within 3 days, so you know exactly what you\u2019re investing in before you commit.",
  },
  {
    overline: "TRULY YOURS",
    headline: "Built Around You. Not the Other Way Around.",
    body: "Off-the-shelf software forces you to adapt your workflows to rigid systems. We do the opposite. Every solution is engineered around your specific workflows, pain points, and business objectives. We continuously explore, refine, and evolve the tools shaping the future of productivity \u2014 so every system we build leverages the latest and best-fit technology for your exact needs.",
  },
  {
    overline: "HERE FOR YOU",
    headline: "Your Co-Builder. From Day One to Day Done \u2014 and Beyond.",
    body: "We don\u2019t just deliver a product and disappear. We become your co-builder from ideation, through production, all the way to post-turnover maintenance. Sharing peace of mind amidst the pressure of the AI race \u2014 we are with you every step of the way through constant connection and support.",
  },
];

/* Sonar detection points — positioned around the radar */
const sonarPoints = [
  { angle: -70, dist: 0.78 },  // AI NAVIGATORS — upper area
  { angle: 15, dist: 0.55 },   // FAST — right-mid
  { angle: 55, dist: 0.85 },   // EFFICIENT — lower-right
  { angle: 140, dist: 0.62 },  // TRULY YOURS — lower-left
  { angle: 210, dist: 0.75 },  // HERE FOR YOU — upper-left
];

/* ── Sonar Canvas Visualization ── */
function SonarVisual({ activeIndex }: { activeIndex: number }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const rafRef = useRef<number>(0);
  const wrapperRef = useRef<HTMLDivElement>(null);
  const { shouldAnimate } = useAnimationGate(wrapperRef, { rootMargin: "160px 0px" });

  const state = useRef({
    sweepAngle: 0, // current radar sweep angle in radians
    // Per-point state
    points: sonarPoints.map(() => ({
      blinkPhase: 0,
      detected: false,
      detectedAt: 0, // timestamp of detection
      fadeAlpha: 0,   // smooth fade in
    })),
    prevActive: -1,
    time: 0,
  });

  // Track active index changes
  const activeRef = useRef(activeIndex);
  activeRef.current = activeIndex;

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    if (!shouldAnimate) return;

    const size = 420;
    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    canvas.width = size * dpr;
    canvas.height = size * dpr;
    canvas.style.width = `${size}px`;
    canvas.style.height = `${size}px`;

    const cx = size / 2;
    const cy = size / 2;
    const maxR = size / 2 - 15;

    // Ring radii (concentric circles)
    const rings = [0.25, 0.5, 0.75, 1.0];

    function draw() {
      if (!ctx || !canvas) return;
      const s = state.current;
      const active = activeRef.current;

      s.time += 1;

      // Sweep rotation — smooth and slow
      s.sweepAngle += 0.008;
      if (s.sweepAngle > Math.PI * 2) s.sweepAngle -= Math.PI * 2;

      // Detect new point when active changes
      if (active !== s.prevActive && active >= 0) {
        s.points[active].detected = true;
        s.points[active].detectedAt = s.time;
        s.points[active].blinkPhase = 0;
        s.prevActive = active;
      }

      // Update point states
      for (let i = 0; i < s.points.length; i++) {
        const p = s.points[i];
        if (p.detected) {
          p.blinkPhase += 0.017; // ~60bpm resting heartbeat pace
        }
        // Fade alpha — active point is bright, detected (past) points dimmer
        const targetAlpha = i === active ? 1 : p.detected ? 0.35 : 0;
        p.fadeAlpha += (targetAlpha - p.fadeAlpha) * 0.03;
      }

      ctx.clearRect(0, 0, canvas.width, canvas.height);
      ctx.save();
      ctx.scale(dpr, dpr);

      // === Background glow ===
      const bgGlow = ctx.createRadialGradient(cx, cy, 0, cx, cy, maxR);
      bgGlow.addColorStop(0, "rgba(0, 212, 170, 0.03)");
      bgGlow.addColorStop(0.5, "rgba(0, 212, 170, 0.01)");
      bgGlow.addColorStop(1, "rgba(0, 212, 170, 0)");
      ctx.fillStyle = bgGlow;
      ctx.beginPath();
      ctx.arc(cx, cy, maxR, 0, Math.PI * 2);
      ctx.fill();

      // === Concentric rings ===
      for (const ringRatio of rings) {
        const r = maxR * ringRatio;
        ctx.beginPath();
        ctx.arc(cx, cy, r, 0, Math.PI * 2);
        ctx.strokeStyle = `rgba(0, 212, 170, ${ringRatio === 1 ? 0.06 : ringRatio === 0.75 ? 0.07 : 0.08})`;
        ctx.lineWidth = 0.5;
        ctx.stroke();
      }

      // === Cross-hair axes ===
      ctx.strokeStyle = "rgba(0, 212, 170, 0.06)";
      ctx.lineWidth = 0.5;
      // Horizontal
      ctx.beginPath();
      ctx.moveTo(cx - maxR, cy);
      ctx.lineTo(cx + maxR, cy);
      ctx.stroke();
      // Vertical
      ctx.beginPath();
      ctx.moveTo(cx, cy - maxR);
      ctx.lineTo(cx, cy + maxR);
      ctx.stroke();

      // === Sweep line with trailing fade ===
      const sweepLen = maxR;

      // Trailing glow (cone behind sweep)
      const trailSpan = 0.6; // radians of trail
      const trailSteps = 30;
      for (let i = 0; i < trailSteps; i++) {
        const t = i / trailSteps;
        const angle = s.sweepAngle - t * trailSpan;
        const alpha = 0.06 * (1 - t);
        ctx.beginPath();
        ctx.moveTo(cx, cy);
        ctx.lineTo(
          cx + Math.cos(angle) * sweepLen,
          cy + Math.sin(angle) * sweepLen
        );
        ctx.strokeStyle = `rgba(0, 212, 170, ${alpha})`;
        ctx.lineWidth = 1.5;
        ctx.stroke();
      }

      // Main sweep line
      const sweepEndX = cx + Math.cos(s.sweepAngle) * sweepLen;
      const sweepEndY = cy + Math.sin(s.sweepAngle) * sweepLen;
      const sweepGrad = ctx.createLinearGradient(cx, cy, sweepEndX, sweepEndY);
      sweepGrad.addColorStop(0, "rgba(0, 212, 170, 0.5)");
      sweepGrad.addColorStop(1, "rgba(0, 212, 170, 0.05)");
      ctx.beginPath();
      ctx.moveTo(cx, cy);
      ctx.lineTo(sweepEndX, sweepEndY);
      ctx.strokeStyle = sweepGrad;
      ctx.lineWidth = 1.5;
      ctx.stroke();

      // === Center dot ===
      ctx.beginPath();
      ctx.arc(cx, cy, 3, 0, Math.PI * 2);
      ctx.fillStyle = "rgba(0, 212, 170, 0.8)";
      ctx.fill();
      ctx.beginPath();
      ctx.arc(cx, cy, 6, 0, Math.PI * 2);
      ctx.fillStyle = "rgba(0, 212, 170, 0.15)";
      ctx.fill();

      // === Detection points ===
      for (let i = 0; i < sonarPoints.length; i++) {
        const sp = sonarPoints[i];
        const p = s.points[i];
        if (p.fadeAlpha < 0.01) continue;

        const rad = (sp.angle * Math.PI) / 180;
        const px = cx + Math.cos(rad) * sp.dist * maxR;
        const py = cy + Math.sin(rad) * sp.dist * maxR;

        const isActive = i === active;
        const alpha = p.fadeAlpha;

        // Ping ripple on active point — slow heartbeat pace
        if (isActive) {
          const rippleCount = 2;
          for (let r = 0; r < rippleCount; r++) {
            const ripplePhase = (p.blinkPhase + r * 1.6) % 3.2;
            const rippleR = 5 + ripplePhase * 10;
            const rippleAlpha = Math.max(0, 0.2 * (1 - ripplePhase / 3.2));
            ctx.beginPath();
            ctx.arc(px, py, rippleR, 0, Math.PI * 2);
            ctx.strokeStyle = `rgba(0, 212, 170, ${rippleAlpha})`;
            ctx.lineWidth = 0.8;
            ctx.stroke();
          }
        }

        // Outer glow
        const glowGrad = ctx.createRadialGradient(px, py, 0, px, py, isActive ? 16 : 10);
        glowGrad.addColorStop(0, `rgba(0, 212, 170, ${0.2 * alpha})`);
        glowGrad.addColorStop(1, "rgba(0, 212, 170, 0)");
        ctx.fillStyle = glowGrad;
        ctx.beginPath();
        ctx.arc(px, py, isActive ? 16 : 10, 0, Math.PI * 2);
        ctx.fill();

        // Blink effect on active — slow heartbeat pulse
        const blinkAlpha = isActive
          ? 0.65 + Math.sin(p.blinkPhase * 1.2) * 0.35
          : alpha * 0.6;

        // Core dot
        ctx.beginPath();
        ctx.arc(px, py, isActive ? 4 : 2.5, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(0, 212, 170, ${blinkAlpha})`;
        ctx.fill();
      }

      // === Soft inner vignette to blend into glass edges ===
      const vignette = ctx.createRadialGradient(cx, cy, maxR * 0.55, cx, cy, maxR * 1.02);
      vignette.addColorStop(0, "rgba(10, 22, 40, 0)");
      vignette.addColorStop(0.7, "rgba(10, 22, 40, 0)");
      vignette.addColorStop(0.88, "rgba(10, 22, 40, 0.5)");
      vignette.addColorStop(1, "rgba(10, 22, 40, 0.85)");
      ctx.fillStyle = vignette;
      ctx.fillRect(0, 0, size, size);

      ctx.restore();
      rafRef.current = requestAnimationFrame(draw);
    }

    rafRef.current = requestAnimationFrame(draw);
    return () => cancelAnimationFrame(rafRef.current);
  }, [shouldAnimate]);

  return (
    <div ref={wrapperRef} className="relative flex items-center justify-center">
      {/* Glow behind glass container */}
      <div className="absolute h-96 w-96 rounded-full bg-teal/[0.05] blur-[120px]" />

      {/* Liquid glass container */}
      <div
        className="relative overflow-hidden rounded-[2rem] xl:rounded-[2.5rem]"
        style={{
          background: "linear-gradient(135deg, rgba(255,255,255,0.04) 0%, rgba(255,255,255,0.01) 50%, rgba(255,255,255,0.03) 100%)",
          border: "1px solid rgba(255,255,255,0.06)",
          boxShadow: "0 8px 32px rgba(0,0,0,0.3), 0 2px 8px rgba(0,0,0,0.2), inset 0 1px 0 rgba(255,255,255,0.05)",
          backdropFilter: "blur(12px)",
          WebkitBackdropFilter: "blur(12px)",
        }}
      >
        {/* Inner highlight edge — top shine */}
        <div
          className="pointer-events-none absolute inset-x-0 top-0 h-px"
          style={{ background: "linear-gradient(90deg, transparent, rgba(255,255,255,0.08) 30%, rgba(255,255,255,0.12) 50%, rgba(255,255,255,0.08) 70%, transparent)" }}
        />

        <canvas
          ref={canvasRef}
          className="relative h-[360px] w-[360px] xl:h-[420px] xl:w-[420px]"
          aria-hidden="true"
        />
      </div>
    </div>
  );
}

/* ── Step Flow (for USP 1) ── */
function StepFlow({ steps }: { steps: string[] }) {
  return (
    <div className="relative mt-6">
      <div className="flex items-center justify-center">
        {steps.map((step, i) => (
          <div key={step} className="flex items-center">
            <div className="flex flex-col items-center gap-1.5">
              <span
                className={`flex h-7 w-7 items-center justify-center rounded-full text-[10px] font-bold ${
                  i === 0
                    ? "bg-teal text-navy shadow-[0_0_12px_rgba(0,212,170,0.4)]"
                    : "border border-teal/25 bg-navy-mid text-teal/80"
                }`}
              >
                {i + 1}
              </span>
              <span className="text-[11px] font-medium text-neutral-light/70 whitespace-nowrap">
                {step}
              </span>
            </div>
            {i < steps.length - 1 && (
              <div
                className="mx-2 h-px flex-1 min-w-[24px]"
                style={{
                  background: `linear-gradient(to right, rgba(0,212,170,${0.4 - i * 0.08}), rgba(99,102,241,${0.2 + i * 0.05}))`,
                }}
                aria-hidden="true"
              />
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

/* ── Main Section ── */
export default function USPSections() {
  const [activeIndex, setActiveIndex] = useState(-1);
  const cardRefs = useRef<(HTMLDivElement | null)[]>([]);
  const sectionRef = useRef<HTMLDivElement>(null);
  const scrollRafRef = useRef(0);
  const { inViewport } = useAnimationGate(sectionRef, { rootMargin: "240px 0px" });

  const handleScroll = useCallback(() => {
    const cards = cardRefs.current.filter(Boolean) as HTMLDivElement[];
    if (cards.length === 0) return;

    const center = window.innerHeight / 2;
    let closest = -1;
    let closestDist = Infinity;

    cards.forEach((card, i) => {
      const rect = card.getBoundingClientRect();
      const cardCenter = rect.top + rect.height / 2;
      const dist = Math.abs(cardCenter - center);

      if (rect.bottom > 0 && rect.top < window.innerHeight) {
        if (dist < closestDist) {
          closestDist = dist;
          closest = i;
        }
      }
    });

    if (closest !== -1 && closestDist < window.innerHeight * 0.45) {
      setActiveIndex(closest);
    }
  }, []);

  useEffect(() => {
    const onScroll = () => {
      if (!inViewport || scrollRafRef.current) return;
      scrollRafRef.current = requestAnimationFrame(() => {
        scrollRafRef.current = 0;
        handleScroll();
      });
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    const t = setTimeout(handleScroll, 100);
    return () => {
      window.removeEventListener("scroll", onScroll);
      if (scrollRafRef.current) {
        cancelAnimationFrame(scrollRafRef.current);
      }
      clearTimeout(t);
    };
  }, [handleScroll, inViewport]);

  return (
    <section ref={sectionRef} className="relative py-20 sm:py-32">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        {/* Mobile: stacked layout */}
        <div className="lg:hidden space-y-16">
          {usps.map((usp) => (
            <div key={usp.overline}>
              <span className="text-xs font-bold uppercase tracking-[0.2em] text-teal">
                {usp.overline}
              </span>
              <h2 className="mt-3 text-3xl font-extrabold leading-tight tracking-tight text-white sm:text-4xl">
                {usp.headline}
              </h2>
              <p className="mt-4 text-base leading-relaxed text-neutral-dark">
                {usp.body}
              </p>
              {usp.steps && <StepFlow steps={usp.steps} />}
            </div>
          ))}
        </div>

        {/* Desktop: sticky sonar + scrolling cards */}
        <div className="hidden lg:flex lg:gap-16 xl:gap-24">
          <div className="w-[420px] shrink-0 xl:w-[460px]">
            <div className="sticky top-0 flex h-screen items-center justify-center">
              <SonarVisual activeIndex={Math.max(0, activeIndex)} />

              <div className="absolute bottom-[calc(50%-220px)] left-1/2 -translate-x-1/2 xl:bottom-[calc(50%-250px)]">
                <span className="rounded-full border border-teal/20 bg-teal/[0.06] px-4 py-1.5 text-xs font-bold uppercase tracking-[0.2em] text-teal transition-all duration-700 ease-out">
                  {usps[Math.max(0, activeIndex)].overline}
                </span>
              </div>
            </div>
          </div>

          <div className="flex-1">
            <div className="h-[45vh]" aria-hidden="true" />

            <div className="space-y-10">
              {usps.map((usp, i) => (
                <div
                  key={usp.overline}
                  ref={(el) => { cardRefs.current[i] = el; }}
                  className={`rounded-2xl border p-8 transition-all duration-700 ease-out xl:p-10 ${
                    i === activeIndex
                      ? "border-teal/20 bg-white/[0.03] shadow-[0_0_40px_rgba(0,212,170,0.06)]"
                      : "border-transparent bg-transparent opacity-40"
                  }`}
                >
                  <span
                    className={`text-xs font-bold uppercase tracking-[0.2em] transition-colors duration-700 ease-out ${
                      i === activeIndex ? "text-teal" : "text-neutral-dark/60"
                    }`}
                  >
                    {usp.overline}
                  </span>
                  <h2
                    className={`mt-3 text-2xl font-extrabold leading-tight tracking-tight transition-colors duration-700 ease-out xl:text-3xl ${
                      i === activeIndex ? "text-white" : "text-white/50"
                    }`}
                  >
                    {usp.headline}
                  </h2>
                  <p
                    className={`mt-4 text-base leading-relaxed transition-colors duration-700 ease-out ${
                      i === activeIndex ? "text-neutral-dark" : "text-neutral-dark/40"
                    }`}
                  >
                    {usp.body}
                  </p>
                  {usp.steps && i === activeIndex && <StepFlow steps={usp.steps} />}
                </div>
              ))}
            </div>

            <div className="h-[20vh]" aria-hidden="true" />
          </div>
        </div>
      </div>
    </section>
  );
}
