import { useEffect, useRef } from "react";
import { useAnimationGate } from "@/hooks/useAnimationGate";

/**
 * A convex perspective grid that bulges toward the viewer,
 * tilts gyroscopically on mouse/scroll. Fades at edges.
 */
export default function ConcaveGrid() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const rafRef = useRef<number>(0);
  const sizeRef = useRef({ w: 0, h: 0 });

  const currentTilt = useRef({ x: 0, y: 0 });
  const targetTilt = useRef({ x: 0, y: 0 });
  const mouseRef = useRef({ x: 0.5, y: 0.5 });
  const scrollRef = useRef(0);
  const containerRectRef = useRef<DOMRect | null>(null);
  const scrollPendingRef = useRef(false);
  const latestScrollYRef = useRef(0);
  const { shouldAnimate } = useAnimationGate(containerRef, { rootMargin: "240px 0px" });

  useEffect(() => {
    const container = containerRef.current;
    const canvas = canvasRef.current;
    if (!canvas || !container) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    if (!shouldAnimate) return;

    const viewportW = window.innerWidth;
    const dprCap = viewportW <= 768 ? 1.2 : viewportW <= 1024 ? 1.4 : 1.75;
    const dpr = Math.min(window.devicePixelRatio || 1, dprCap);
    let previousTs = 0;
    let segments = 48;

    function resize() {
      const rect = container!.getBoundingClientRect();
      const w = rect.width;
      const h = rect.height;
      canvas!.width = w * dpr;
      canvas!.height = h * dpr;
      canvas!.style.width = `${w}px`;
      canvas!.style.height = `${h}px`;
      sizeRef.current = { w, h };
      containerRectRef.current = container!.getBoundingClientRect();
    }

    function project(
      x: number,
      y: number,
      z: number,
      cx: number,
      cy: number,
      tiltX: number,
      tiltY: number
    ): [number, number, number] {
      const cosX = Math.cos(tiltY);
      const sinX = Math.sin(tiltY);
      const y1 = y * cosX - z * sinX;
      const z1 = y * sinX + z * cosX;

      const cosY = Math.cos(tiltX);
      const sinY = Math.sin(tiltX);
      const x1 = x * cosY + z1 * sinY;
      const z2 = -x * sinY + z1 * cosY;

      const fov = 700;
      const depth = fov + z2;
      if (depth <= 0) return [0, 0, -1];
      const scale = fov / depth;

      return [cx + x1 * scale, cy + y1 * scale, depth];
    }

    function draw(ts: number) {
      if (!ctx || !canvas) return;
      const { w, h } = sizeRef.current;
      if (previousTs > 0) {
        const frameDelta = ts - previousTs;
        segments = frameDelta > 20 ? 30 : 48;
      }
      previousTs = ts;

      if (w === 0) {
        rafRef.current = requestAnimationFrame(draw);
        return;
      }

      const lerp = 0.045;
      currentTilt.current.x +=
        (targetTilt.current.x - currentTilt.current.x) * lerp;
      currentTilt.current.y +=
        (targetTilt.current.y - currentTilt.current.y) * lerp;

      const mx = mouseRef.current.x - 0.5;
      const my = mouseRef.current.y - 0.5;
      const scrollTilt = scrollRef.current * 0.0003;

      targetTilt.current.x = mx * 0.5;
      targetTilt.current.y = my * 0.4 + scrollTilt;

      const tiltX = currentTilt.current.x;
      const tiltY = currentTilt.current.y;

      ctx.clearRect(0, 0, canvas.width, canvas.height);
      ctx.save();
      ctx.scale(dpr, dpr);

      const cx = w / 2;
      const cy = h / 2;

      // Grid sized to fill the whole hero section
      // Use larger spacing for bigger cells, more lines to cover full area
      const cellSize = 80;
      const gridCountX = Math.ceil(w / cellSize) + 6; // extra lines past edges
      const gridCountY = Math.ceil(h / cellSize) + 6;
      const halfX = Math.floor(gridCountX / 2);
      const halfY = Math.floor(gridCountY / 2);
      const gridHalfW = halfX * cellSize;
      const gridHalfH = halfY * cellSize;
      const gridDiag = Math.sqrt(gridHalfW * gridHalfW + gridHalfH * gridHalfH);

      const gridZ = 350; // base Z depth
      const convexStrength = 250; // positive = bulge toward viewer (convex)

      // Radial fade — covers the whole viewport with gentle edge fade
      const fadeGrad = ctx.createRadialGradient(
        cx, cy, Math.min(w, h) * 0.05,
        cx, cy, Math.max(w, h) * 0.58
      );
      fadeGrad.addColorStop(0, "rgba(255,255,255,1)");
      fadeGrad.addColorStop(0.45, "rgba(255,255,255,0.8)");
      fadeGrad.addColorStop(0.7, "rgba(255,255,255,0.45)");
      fadeGrad.addColorStop(0.9, "rgba(255,255,255,0.12)");
      fadeGrad.addColorStop(1, "rgba(255,255,255,0)");

      ctx.globalCompositeOperation = "source-over";

      const baseAlpha = 0.16;
      // Draw horizontal lines
      for (let i = -halfY; i <= halfY; i++) {
        const yOff = i * cellSize;
        const distRatio = Math.abs(i) / halfY;
        const lineAlpha = baseAlpha * (1 - distRatio * 0.5);

        ctx.strokeStyle = `rgba(148, 163, 184, ${lineAlpha})`;
        ctx.lineWidth = 0.75;
        ctx.beginPath();

        for (let s = 0; s <= segments; s++) {
          const t = s / segments;
          const xOff = -gridHalfW + t * gridHalfW * 2;

          // Convex: center bulges toward viewer (positive Z offset at center)
          const distFromCenter =
            Math.sqrt(xOff * xOff + yOff * yOff) / gridDiag;
          const curvature = convexStrength * (1 - distFromCenter * distFromCenter);

          const [px, py, depth] = project(
            xOff, yOff, gridZ - curvature,
            cx, cy, tiltX, tiltY
          );
          if (depth <= 0) continue;

          if (s === 0) ctx.moveTo(px, py);
          else ctx.lineTo(px, py);
        }
        ctx.stroke();
      }

      // Draw vertical lines
      for (let i = -halfX; i <= halfX; i++) {
        const xOff = i * cellSize;
        const distRatio = Math.abs(i) / halfX;
        const lineAlpha = baseAlpha * (1 - distRatio * 0.5);

        ctx.strokeStyle = `rgba(148, 163, 184, ${lineAlpha})`;
        ctx.lineWidth = 0.75;
        ctx.beginPath();

        for (let s = 0; s <= segments; s++) {
          const t = s / segments;
          const yOff = -gridHalfH + t * gridHalfH * 2;

          const distFromCenter =
            Math.sqrt(xOff * xOff + yOff * yOff) / gridDiag;
          const curvature = convexStrength * (1 - distFromCenter * distFromCenter);

          const [px, py, depth] = project(
            xOff, yOff, gridZ - curvature,
            cx, cy, tiltX, tiltY
          );
          if (depth <= 0) continue;

          if (s === 0) ctx.moveTo(px, py);
          else ctx.lineTo(px, py);
        }
        ctx.stroke();
      }

      // Radial fade via compositing
      ctx.globalCompositeOperation = "destination-in";
      ctx.fillStyle = fadeGrad;
      ctx.fillRect(0, 0, w, h);

      ctx.restore();
      rafRef.current = requestAnimationFrame(draw);
    }

    function onMouseMove(e: MouseEvent) {
      const rect = containerRectRef.current ?? container!.getBoundingClientRect();
      mouseRef.current = {
        x: (e.clientX - rect.left) / rect.width,
        y: (e.clientY - rect.top) / rect.height,
      };
    }

    function onMouseLeave() {
      mouseRef.current = { x: 0.5, y: 0.5 };
    }

    function onScroll() {
      latestScrollYRef.current = window.scrollY;
      if (scrollPendingRef.current) return;
      scrollPendingRef.current = true;
      requestAnimationFrame(() => {
        scrollRef.current = latestScrollYRef.current;
        scrollPendingRef.current = false;
      });
    }

    window.addEventListener("mousemove", onMouseMove, { passive: true });
    document.addEventListener("mouseleave", onMouseLeave);
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", resize, { passive: true });

    resize();
    rafRef.current = requestAnimationFrame(draw);

    return () => {
      cancelAnimationFrame(rafRef.current);
      window.removeEventListener("mousemove", onMouseMove);
      document.removeEventListener("mouseleave", onMouseLeave);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", resize);
    };
  }, [shouldAnimate]);

  return (
    <div
      ref={containerRef}
      className="pointer-events-none absolute inset-0 z-0"
    >
      <canvas
        ref={canvasRef}
        className="absolute inset-0"
        aria-hidden="true"
      />
    </div>
  );
}
