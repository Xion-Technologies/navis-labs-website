import { useEffect, useState, useRef } from "react";

export default function PreHero({ onComplete }: { onComplete: () => void }) {
  const [phase, setPhase] = useState<"fade-in" | "reveal" | "scroll-away">("fade-in");
  const [scrollProgress, setScrollProgress] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);
  const hasCompleted = useRef(false);

  // Phase 1: Fade in icon (0 → 3s)
  // Phase 2: Slide left + reveal text (3s → 5s)
  useEffect(() => {
    const t1 = setTimeout(() => setPhase("reveal"), 3000);
    const t2 = setTimeout(() => setPhase("scroll-away"), 5000);
    return () => { clearTimeout(t1); clearTimeout(t2); };
  }, []);

  // Phase 3: Scroll to dismiss
  useEffect(() => {
    if (phase !== "scroll-away") return;

    let totalScroll = 0;
    const threshold = 300; // px of scroll to fully dismiss

    const handleWheel = (e: WheelEvent) => {
      e.preventDefault();
      totalScroll += Math.abs(e.deltaY);
      const progress = Math.min(totalScroll / threshold, 1);
      setScrollProgress(progress);

      if (progress >= 1 && !hasCompleted.current) {
        hasCompleted.current = true;
        onComplete();
      }
    };

    const handleTouch = (() => {
      let startY = 0;
      return {
        start: (e: TouchEvent) => { startY = e.touches[0].clientY; },
        move: (e: TouchEvent) => {
          e.preventDefault();
          const delta = startY - e.touches[0].clientY;
          if (delta > 0) {
            totalScroll += delta;
            startY = e.touches[0].clientY;
            const progress = Math.min(totalScroll / threshold, 1);
            setScrollProgress(progress);
            if (progress >= 1 && !hasCompleted.current) {
              hasCompleted.current = true;
              onComplete();
            }
          }
        },
      };
    })();

    const handleKey = (e: KeyboardEvent) => {
      if (e.key === "ArrowDown" || e.key === " ") {
        e.preventDefault();
        totalScroll += 100;
        const progress = Math.min(totalScroll / threshold, 1);
        setScrollProgress(progress);
        if (progress >= 1 && !hasCompleted.current) {
          hasCompleted.current = true;
          onComplete();
        }
      }
    };

    window.addEventListener("wheel", handleWheel, { passive: false });
    window.addEventListener("touchstart", handleTouch.start, { passive: true });
    window.addEventListener("touchmove", handleTouch.move, { passive: false });
    window.addEventListener("keydown", handleKey);

    return () => {
      window.removeEventListener("wheel", handleWheel);
      window.removeEventListener("touchstart", handleTouch.start);
      window.removeEventListener("touchmove", handleTouch.move);
      window.removeEventListener("keydown", handleKey);
    };
  }, [phase, onComplete]);

  return (
    <div
      ref={containerRef}
      className="fixed inset-0 z-[200] flex items-center justify-center bg-navy"
      style={{
        opacity: phase === "scroll-away" ? 1 - scrollProgress : 1,
        transform: phase === "scroll-away" ? `translateY(${-scrollProgress * 100}vh)` : "none",
        transition: phase === "scroll-away" ? "none" : "opacity 0.3s ease",
        pointerEvents: phase === "scroll-away" && scrollProgress >= 1 ? "none" : "auto",
      }}
    >
      {/* Subtle background glow */}
      <div className="pointer-events-none absolute inset-0" aria-hidden="true">
        <div
          className="absolute top-1/2 left-1/2 h-[500px] w-[500px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-teal/[0.04] blur-[120px]"
          style={{
            opacity: phase === "fade-in" ? 0 : 1,
            transition: "opacity 2s ease",
          }}
        />
      </div>

      {/* Logo container — uses overflow hidden to clip text logo reveal */}
      <div
        className="relative flex items-center"
        style={{
          transform:
            phase === "scroll-away"
              ? `scale(${1 - scrollProgress * 0.15})`
              : "none",
          transition: phase === "scroll-away" ? "none" : "transform 0.5s ease",
        }}
      >
        {/* Icon logo — starts centered, slides left to make room */}
        <img
          src="/logos/NL_logo_white.png"
          alt=""
          className="h-16 w-auto shrink-0 sm:h-20 lg:h-24"
          style={{
            opacity: phase === "fade-in" ? 0 : 1,
            transform:
              phase === "fade-in"
                ? "scale(0.85)"
                : "scale(1)",
            animation: phase === "fade-in" ? "preHeroFadeIn 3s ease forwards" : "none",
            transition: "transform 1s ease",
          }}
        />

        {/* Text logo — width animates from 0 to auto via max-width */}
        <div
          className="overflow-hidden"
          style={{
            maxWidth: phase === "fade-in" ? "0px" : "400px",
            opacity: phase === "fade-in" ? 0 : 1,
            transition: "max-width 1.8s cubic-bezier(0.16, 1, 0.3, 1) 0.2s, opacity 1.2s ease 0.3s",
          }}
        >
          <img
            src="/logos/NAVIS_LABS_logo_white.png"
            alt="Navis Labs"
            className="ml-4 h-8 w-auto sm:h-10 lg:h-12"
            style={{ minWidth: "200px" }}
          />
        </div>
      </div>

      {/* Scroll indicator — only shows after logo reveal */}
      {phase === "scroll-away" && scrollProgress < 0.3 && (
        <div
          className="absolute bottom-12 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
          style={{
            opacity: 1 - scrollProgress * 3,
            animation: "preHeroBounce 2s ease-in-out infinite",
          }}
        >
          <span className="text-xs font-medium tracking-widest text-neutral-dark/50 uppercase">
            Scroll to explore
          </span>
          <svg
            className="h-5 w-5 text-teal/40"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={2}
          >
            <path strokeLinecap="round" strokeLinejoin="round" d="M19 14l-7 7m0 0l-7-7m7 7V3" />
          </svg>
        </div>
      )}
    </div>
  );
}
