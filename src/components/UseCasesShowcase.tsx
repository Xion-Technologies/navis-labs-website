import { useState, useEffect, useRef, useCallback } from "react";

export interface UseCase {
  tab: string;
  title: string;
  description: string;
  details: string[];
}

interface Props {
  useCases: UseCase[];
  accent?: "teal" | "indigo";
}

export default function UseCasesShowcase({ useCases, accent = "teal" }: Props) {
  const [active, setActive] = useState(0);
  const [fading, setFading] = useState(false);
  const [paused, setPaused] = useState(false);
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  const isTeal = accent === "teal";

  const switchTo = useCallback(
    (idx: number) => {
      if (idx === active) return;
      setFading(true);
      setTimeout(() => {
        setActive(idx);
        setFading(false);
      }, 250);
    },
    [active]
  );

  // Auto-cycle every 6s unless paused
  useEffect(() => {
    if (paused) return;
    timerRef.current = setTimeout(() => {
      const next = (active + 1) % useCases.length;
      switchTo(next);
    }, 6000);
    return () => {
      if (timerRef.current) clearTimeout(timerRef.current);
    };
  }, [active, paused, useCases.length, switchTo]);

  // Respect prefers-reduced-motion
  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    if (mq.matches) setPaused(true);
  }, []);

  const handleTabClick = (idx: number) => {
    setPaused(true);
    switchTo(idx);
  };

  const current = useCases[active];

  // Accent color tokens
  const accentRgb = isTeal ? "0, 212, 170" : "99, 102, 241";
  const accentText = isTeal ? "text-teal" : "text-indigo";
  const accentBg = isTeal ? "bg-teal" : "bg-indigo";

  return (
    <div
      ref={containerRef}
      className="mt-8"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
    >
      {/* Section label */}
      <h4
        className={`text-xs font-bold uppercase tracking-[0.2em] ${
          isTeal ? "text-teal/50" : "text-indigo/50"
        }`}
      >
        Use Cases
      </h4>

      {/* Tab bar */}
      <div className="mt-4 flex gap-2 overflow-x-auto pb-1 scrollbar-none">
        {useCases.map((uc, i) => {
          const isActive = i === active;
          return (
            <button
              key={uc.tab}
              onClick={() => handleTabClick(i)}
              className={`relative shrink-0 rounded-full px-4 py-2 text-xs font-semibold backdrop-blur-md transition-all duration-300 sm:text-sm ${
                isActive
                  ? `border text-white shadow-[0_0_20px_rgba(${accentRgb},0.12)]`
                  : "border border-white/[0.06] bg-white/[0.03] text-neutral-dark/70 hover:border-white/[0.12] hover:bg-white/[0.06] hover:text-white"
              }`}
              style={
                isActive
                  ? {
                      borderColor: `rgba(${accentRgb}, 0.3)`,
                      background: `rgba(${accentRgb}, 0.12)`,
                    }
                  : undefined
              }
            >
              {/* Glass highlight on active */}
              {isActive && (
                <span className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/[0.15] to-transparent" />
              )}
              {uc.tab}
            </button>
          );
        })}
      </div>

      {/* Content panel */}
      <div
        className="relative mt-4 overflow-hidden rounded-2xl border backdrop-blur-md transition-all duration-300"
        style={{
          borderColor: `rgba(${accentRgb}, 0.12)`,
          background: `rgba(${accentRgb}, 0.04)`,
        }}
      >
        {/* Top glass highlight */}
        <span
          className="pointer-events-none absolute inset-x-0 top-0 h-px"
          style={{
            background: `linear-gradient(to right, transparent, rgba(255,255,255,0.06), transparent)`,
          }}
        />

        <div
          className={`p-5 sm:p-6 transition-all duration-250 ${
            fading ? "opacity-0 translate-y-1" : "opacity-100 translate-y-0"
          }`}
        >
          {/* Title */}
          <h5 className={`text-base font-bold sm:text-lg ${accentText}`}>
            {current.title}
          </h5>

          {/* Description */}
          <p className="mt-2 text-sm leading-relaxed text-neutral-dark">
            {current.description}
          </p>

          {/* Detail bullets */}
          {current.details.length > 0 && (
            <ul className="mt-4 space-y-2">
              {current.details.map((detail) => (
                <li key={detail} className="flex items-start gap-2.5">
                  <span
                    className={`mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full ${accentBg}`}
                    style={{ opacity: 0.6 }}
                  />
                  <span className="text-xs leading-relaxed text-neutral-dark/80 sm:text-sm">
                    {detail}
                  </span>
                </li>
              ))}
            </ul>
          )}
        </div>

        {/* Progress bar at bottom */}
        <div className="h-0.5 w-full overflow-hidden bg-white/[0.04]">
          <div
            className="h-full transition-all"
            style={{
              width: paused ? `${((active + 1) / useCases.length) * 100}%` : "0%",
              background: `rgba(${accentRgb}, 0.3)`,
              ...(paused
                ? { transition: "width 0.3s ease" }
                : {
                    animation: `usecase-progress 6s linear`,
                    width: "100%",
                  }),
            }}
          />
        </div>
      </div>

      {/* Step indicators */}
      <div className="mt-3 flex justify-center gap-1.5">
        {useCases.map((_, i) => (
          <button
            key={i}
            onClick={() => handleTabClick(i)}
            aria-label={`Go to use case ${i + 1}`}
            className={`h-1 rounded-full transition-all duration-300 ${
              i === active
                ? `w-6 ${accentBg} opacity-60`
                : "w-1.5 bg-white/[0.15] hover:bg-white/[0.25]"
            }`}
          />
        ))}
      </div>
    </div>
  );
}
