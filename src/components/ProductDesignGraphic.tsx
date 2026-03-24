import { useEffect, useRef } from "react";

export default function ProductDesignGraphic() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animRef = useRef<number>(0);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d")!;
    if (!ctx) return;

    const dpr = window.devicePixelRatio || 1;
    const W = 520;
    const H = 570;
    canvas.width = W * dpr;
    canvas.height = H * dpr;
    canvas.style.width = `${W}px`;
    canvas.style.height = `${H}px`;
    ctx.scale(dpr, dpr);

    const cx = W / 2;
    const teal = "#00D4AA";
    const indigo = "#6366F1";
    const neutral = "#94A3B8";
    const white = "#F1F5F9";
    const navyMid = "#1E3A5F";

    // Device frame
    const deviceW = 220;
    const deviceH = 360;
    const deviceX = cx - deviceW / 2;
    const deviceY = 120;
    const deviceR = 20;
    const screenPad = 12;
    const screenX = deviceX + screenPad;
    const screenY = deviceY + screenPad + 20; // 20 for top bezel area
    const screenW = deviceW - screenPad * 2;
    const screenH = deviceH - screenPad * 2 - 30;

    // Crossfade timing
    const cycleDuration = 180; // 3s at 60fps
    const fadeDuration = 40;
    let frame = 0;

    function drawRoundedRect(x: number, y: number, w: number, h: number, r: number) {
      ctx.beginPath();
      ctx.roundRect(x, y, w, h, r);
    }

    // Wireframe elements (State A)
    function drawWireframe(opacity: number) {
      const o = opacity;
      ctx.setLineDash([3, 3]);

      // Header bar
      drawRoundedRect(screenX + 10, screenY + 10, screenW - 20, 24, 4);
      ctx.strokeStyle = `rgba(148, 163, 184, ${0.35 * o})`;
      ctx.lineWidth = 1;
      ctx.stroke();

      // Avatar circle
      ctx.beginPath();
      ctx.arc(screenX + 26, screenY + 56, 12, 0, Math.PI * 2);
      ctx.strokeStyle = `rgba(148, 163, 184, ${0.3 * o})`;
      ctx.stroke();

      // Text lines next to avatar
      for (let i = 0; i < 2; i++) {
        drawRoundedRect(screenX + 46, screenY + 48 + i * 12, screenW - 66, 6, 2);
        ctx.strokeStyle = `rgba(148, 163, 184, ${0.25 * o})`;
        ctx.stroke();
      }

      // Content cards (wireframe boxes)
      for (let i = 0; i < 3; i++) {
        drawRoundedRect(screenX + 10, screenY + 85 + i * 52, screenW - 20, 42, 4);
        ctx.strokeStyle = `rgba(148, 163, 184, ${0.3 * o})`;
        ctx.stroke();

        // Inner line placeholder
        drawRoundedRect(screenX + 18, screenY + 95 + i * 52, (screenW - 44) * 0.6, 5, 2);
        ctx.strokeStyle = `rgba(148, 163, 184, ${0.2 * o})`;
        ctx.stroke();

        drawRoundedRect(screenX + 18, screenY + 106 + i * 52, (screenW - 44) * 0.4, 5, 2);
        ctx.strokeStyle = `rgba(148, 163, 184, ${0.2 * o})`;
        ctx.stroke();
      }

      // Button outline
      drawRoundedRect(screenX + screenW / 2 - 40, screenY + screenH - 40, 80, 28, 14);
      ctx.strokeStyle = `rgba(148, 163, 184, ${0.35 * o})`;
      ctx.stroke();

      ctx.setLineDash([]);
    }

    // Polished elements (State B)
    function drawPolished(opacity: number) {
      const o = opacity;

      // Header bar - filled
      drawRoundedRect(screenX + 10, screenY + 10, screenW - 20, 24, 4);
      ctx.fillStyle = `rgba(99, 102, 241, ${0.15 * o})`;
      ctx.fill();
      ctx.strokeStyle = `rgba(99, 102, 241, ${0.25 * o})`;
      ctx.lineWidth = 1;
      ctx.stroke();

      // Header text placeholder
      drawRoundedRect(screenX + 20, screenY + 18, 60, 8, 3);
      ctx.fillStyle = `rgba(241, 245, 249, ${0.3 * o})`;
      ctx.fill();

      // Avatar circle - filled
      ctx.beginPath();
      ctx.arc(screenX + 26, screenY + 56, 12, 0, Math.PI * 2);
      ctx.fillStyle = `rgba(0, 212, 170, ${0.2 * o})`;
      ctx.fill();
      ctx.strokeStyle = `rgba(0, 212, 170, ${0.3 * o})`;
      ctx.stroke();

      // Text lines next to avatar - filled
      drawRoundedRect(screenX + 46, screenY + 48, screenW - 66, 6, 2);
      ctx.fillStyle = `rgba(241, 245, 249, ${0.2 * o})`;
      ctx.fill();

      drawRoundedRect(screenX + 46, screenY + 60, (screenW - 66) * 0.7, 6, 2);
      ctx.fillStyle = `rgba(148, 163, 184, ${0.15 * o})`;
      ctx.fill();

      // Content cards - filled with teal accents
      for (let i = 0; i < 3; i++) {
        drawRoundedRect(screenX + 10, screenY + 85 + i * 52, screenW - 20, 42, 4);
        ctx.fillStyle = `rgba(30, 58, 95, ${0.35 * o})`;
        ctx.fill();
        ctx.strokeStyle = `rgba(0, 212, 170, ${0.12 * o})`;
        ctx.stroke();

        // Accent bar on left
        drawRoundedRect(screenX + 12, screenY + 89 + i * 52, 3, 34, 1.5);
        ctx.fillStyle = `rgba(0, 212, 170, ${0.4 * o})`;
        ctx.fill();

        // Title line
        drawRoundedRect(screenX + 22, screenY + 95 + i * 52, (screenW - 44) * 0.6, 5, 2);
        ctx.fillStyle = `rgba(241, 245, 249, ${0.25 * o})`;
        ctx.fill();

        // Subtitle line
        drawRoundedRect(screenX + 22, screenY + 106 + i * 52, (screenW - 44) * 0.4, 5, 2);
        ctx.fillStyle = `rgba(148, 163, 184, ${0.15 * o})`;
        ctx.fill();
      }

      // Button - filled teal
      drawRoundedRect(screenX + screenW / 2 - 40, screenY + screenH - 40, 80, 28, 14);
      ctx.fillStyle = `rgba(0, 212, 170, ${0.2 * o})`;
      ctx.fill();
      ctx.strokeStyle = `rgba(0, 212, 170, ${0.35 * o})`;
      ctx.stroke();

      // Button text
      drawRoundedRect(screenX + screenW / 2 - 20, screenY + screenH - 30, 40, 6, 2);
      ctx.fillStyle = `rgba(241, 245, 249, ${0.35 * o})`;
      ctx.fill();
    }

    function draw() {
      ctx.clearRect(0, 0, W, H);
      frame++;

      const totalCycle = cycleDuration * 2;
      const t = frame % totalCycle;

      // Calculate opacities for crossfade
      let wireframeOpacity: number;
      let polishedOpacity: number;

      if (t < cycleDuration - fadeDuration) {
        // Showing wireframe
        wireframeOpacity = 1;
        polishedOpacity = 0;
      } else if (t < cycleDuration + fadeDuration) {
        // Crossfading wireframe -> polished
        const fadeT = (t - (cycleDuration - fadeDuration)) / (fadeDuration * 2);
        wireframeOpacity = 1 - fadeT;
        polishedOpacity = fadeT;
      } else if (t < totalCycle - fadeDuration) {
        // Showing polished
        wireframeOpacity = 0;
        polishedOpacity = 1;
      } else {
        // Crossfading polished -> wireframe
        const fadeT = (t - (totalCycle - fadeDuration)) / (fadeDuration * 2);
        wireframeOpacity = fadeT;
        polishedOpacity = 1 - fadeT;
      }

      // Top label
      ctx.font = '600 10px "Inter", system-ui, sans-serif';
      ctx.letterSpacing = "2px";
      ctx.fillStyle = "rgba(148, 163, 184, 0.45)";
      ctx.textAlign = "center";
      ctx.fillText("FROM CONCEPT", cx, deviceY - 20);

      // Device frame
      drawRoundedRect(deviceX, deviceY, deviceW, deviceH, deviceR);
      ctx.fillStyle = "rgba(10, 22, 40, 0.6)";
      ctx.fill();
      ctx.strokeStyle = "rgba(148, 163, 184, 0.15)";
      ctx.lineWidth = 1.5;
      ctx.stroke();

      // Top bezel notch
      drawRoundedRect(cx - 30, deviceY + 6, 60, 6, 3);
      ctx.fillStyle = "rgba(148, 163, 184, 0.1)";
      ctx.fill();

      // Screen area background
      drawRoundedRect(screenX, screenY, screenW, screenH, 4);
      ctx.fillStyle = "rgba(10, 22, 40, 0.4)";
      ctx.fill();

      // Draw both states with their opacities
      if (wireframeOpacity > 0) drawWireframe(wireframeOpacity);
      if (polishedOpacity > 0) drawPolished(polishedOpacity);

      // State indicator dots
      const dotY = deviceY + deviceH + 30;
      const wireActive = wireframeOpacity > polishedOpacity;

      ctx.beginPath();
      ctx.arc(cx - 12, dotY, 4, 0, Math.PI * 2);
      ctx.fillStyle = wireActive ? "rgba(148, 163, 184, 0.5)" : "rgba(148, 163, 184, 0.15)";
      ctx.fill();

      ctx.beginPath();
      ctx.arc(cx + 12, dotY, 4, 0, Math.PI * 2);
      ctx.fillStyle = !wireActive ? "rgba(0, 212, 170, 0.5)" : "rgba(0, 212, 170, 0.15)";
      ctx.fill();

      // Bottom label
      ctx.font = '600 10px "Inter", system-ui, sans-serif';
      ctx.fillStyle = "rgba(99, 102, 241, 0.45)";
      ctx.textAlign = "center";
      ctx.fillText("TO PIXEL-PERFECT", cx, dotY + 30);

      animRef.current = requestAnimationFrame(draw);
    }

    animRef.current = requestAnimationFrame(draw);
    return () => cancelAnimationFrame(animRef.current);
  }, []);

  return (
    <div className="flex items-center justify-center">
      <canvas
        ref={canvasRef}
        className="max-w-full"
        style={{ width: 520, height: 570 }}
        aria-label="Animated graphic showing a wireframe morphing into a polished UI design"
        role="img"
      />
    </div>
  );
}
