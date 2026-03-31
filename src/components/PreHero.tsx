import { useEffect, useState, useRef } from "react";

export default function PreHero({ onComplete }: { onComplete: () => void }) {
  const [phase, setPhase] = useState<"fade-in" | "reveal" | "exit">("fade-in");
  const hasCompleted = useRef(false);

  useEffect(() => {
    // Phase 1: Icon fades in (0 → 3s)
    const t1 = setTimeout(() => setPhase("reveal"), 3000);
    // Phase 2: Text logo reveals (3s → 5s)
    // Phase 3: Auto-exit after full logo is shown (5s → 6s)
    const t2 = setTimeout(() => setPhase("exit"), 5500);
    // Phase 4: Fully dismissed (6.5s)
    const t3 = setTimeout(() => {
      if (!hasCompleted.current) {
        hasCompleted.current = true;
        onComplete();
      }
    }, 6500);
    return () => { clearTimeout(t1); clearTimeout(t2); clearTimeout(t3); };
  }, [onComplete]);

  return (
    <div
      className="fixed inset-0 z-[200] flex items-center justify-center bg-navy"
      style={{
        opacity: phase === "exit" ? 0 : 1,
        transform: phase === "exit" ? "scale(1.05)" : "none",
        transition: phase === "exit" ? "opacity 1s ease, transform 1s ease" : "opacity 0.3s ease",
        pointerEvents: phase === "exit" ? "none" : "auto",
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

      {/* Logo container */}
      <div className="relative flex items-center">
        {/* Icon logo — starts centered, slides left to make room */}
        <img
          src="/logos/NL_logo_white.png"
          alt=""
          className="h-16 w-auto shrink-0 sm:h-20 lg:h-24"
          style={{
            opacity: phase === "fade-in" ? 0 : 1,
            transform: phase === "fade-in" ? "scale(0.85)" : "scale(1)",
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
    </div>
  );
}
