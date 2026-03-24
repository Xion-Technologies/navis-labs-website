import { useEffect, useRef } from "react";

export default function AIIntegrationGraphic() {
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
    const cy = H / 2 - 20;
    const hexRadius = 50;
    const orbitRadius = 155;

    const teal = "#00D4AA";
    const indigo = "#6366F1";
    const white = "#F1F5F9";
    const neutralDark = "#94A3B8";

    const nodeLabels = ["CRM", "Email", "Docs", "Chat", "Data", "Sales"];
    const nodeRadius = 28;

    // Node positions
    const nodes = nodeLabels.map((label, i) => {
      const angle = (i / 6) * Math.PI * 2 - Math.PI / 2;
      return {
        label,
        x: cx + Math.cos(angle) * orbitRadius,
        y: cy + Math.sin(angle) * orbitRadius,
        angle,
      };
    });

    let activeIndex = 0;
    let cycleTimer = 0;
    const cycleInterval = 90; // frames per node
    let pulsePhase = 0;

    function hexToRgb(hex: string): [number, number, number] {
      const r = parseInt(hex.slice(1, 3), 16);
      const g = parseInt(hex.slice(3, 5), 16);
      const b = parseInt(hex.slice(5, 7), 16);
      return [r, g, b];
    }

    function drawHexagon(x: number, y: number, r: number) {
      ctx.beginPath();
      for (let i = 0; i < 6; i++) {
        const a = (i / 6) * Math.PI * 2 - Math.PI / 2;
        const px = x + Math.cos(a) * r;
        const py = y + Math.sin(a) * r;
        if (i === 0) ctx.moveTo(px, py);
        else ctx.lineTo(px, py);
      }
      ctx.closePath();
    }

    function draw() {
      ctx.clearRect(0, 0, W, H);
      cycleTimer++;
      pulsePhase += 0.04;

      // Cycle active node
      const progress = (cycleTimer % cycleInterval) / cycleInterval;
      if (cycleTimer % cycleInterval === 0) {
        activeIndex = (activeIndex + 1) % 6;
      }

      // Draw connection lines to all nodes
      for (let i = 0; i < nodes.length; i++) {
        const node = nodes[i];
        const isActive = i === activeIndex;
        const lineOpacity = isActive ? 0.35 : 0.08;

        ctx.beginPath();
        ctx.moveTo(cx, cy);
        ctx.lineTo(node.x, node.y);
        ctx.strokeStyle = isActive
          ? `rgba(0, 212, 170, ${lineOpacity})`
          : `rgba(148, 163, 184, ${lineOpacity})`;
        ctx.lineWidth = isActive ? 1.5 : 0.8;
        ctx.stroke();

        // Traveling dot on active line
        if (isActive) {
          const dotT = progress;
          const dotX = cx + (node.x - cx) * dotT;
          const dotY = cy + (node.y - cy) * dotT;
          const dotGlow = ctx.createRadialGradient(dotX, dotY, 0, dotX, dotY, 8);
          dotGlow.addColorStop(0, "rgba(0, 212, 170, 0.7)");
          dotGlow.addColorStop(1, "rgba(0, 212, 170, 0)");
          ctx.fillStyle = dotGlow;
          ctx.fillRect(dotX - 8, dotY - 8, 16, 16);

          ctx.beginPath();
          ctx.arc(dotX, dotY, 3, 0, Math.PI * 2);
          ctx.fillStyle = teal;
          ctx.fill();
        }
      }

      // Draw central hexagon glow
      const glowSize = hexRadius + 20 + Math.sin(pulsePhase) * 6;
      const glow = ctx.createRadialGradient(cx, cy, hexRadius * 0.5, cx, cy, glowSize);
      glow.addColorStop(0, "rgba(0, 212, 170, 0.12)");
      glow.addColorStop(0.6, "rgba(99, 102, 241, 0.06)");
      glow.addColorStop(1, "rgba(0, 212, 170, 0)");
      ctx.fillStyle = glow;
      ctx.fillRect(cx - glowSize, cy - glowSize, glowSize * 2, glowSize * 2);

      // Draw central hexagon
      drawHexagon(cx, cy, hexRadius);
      const hexFill = ctx.createLinearGradient(cx, cy - hexRadius, cx, cy + hexRadius);
      hexFill.addColorStop(0, "rgba(0, 212, 170, 0.08)");
      hexFill.addColorStop(1, "rgba(99, 102, 241, 0.1)");
      ctx.fillStyle = hexFill;
      ctx.fill();
      drawHexagon(cx, cy, hexRadius);
      ctx.strokeStyle = "rgba(0, 212, 170, 0.25)";
      ctx.lineWidth = 1.5;
      ctx.stroke();

      // "AI" label in center
      ctx.font = 'bold 22px "Inter", system-ui, sans-serif';
      ctx.fillStyle = white;
      ctx.textAlign = "center";
      ctx.textBaseline = "middle";
      ctx.fillText("AI", cx, cy);
      ctx.textBaseline = "alphabetic";

      // Draw outer nodes
      for (let i = 0; i < nodes.length; i++) {
        const node = nodes[i];
        const isActive = i === activeIndex;
        const nodeGlowIntensity = isActive ? 0.2 + Math.sin(pulsePhase * 2) * 0.08 : 0;
        const [tr, tg, tb] = hexToRgb(teal);

        // Node glow when active
        if (nodeGlowIntensity > 0) {
          const ng = ctx.createRadialGradient(node.x, node.y, nodeRadius * 0.5, node.x, node.y, nodeRadius + 12);
          ng.addColorStop(0, `rgba(${tr}, ${tg}, ${tb}, ${nodeGlowIntensity})`);
          ng.addColorStop(1, `rgba(${tr}, ${tg}, ${tb}, 0)`);
          ctx.fillStyle = ng;
          ctx.fillRect(node.x - nodeRadius - 12, node.y - nodeRadius - 12, (nodeRadius + 12) * 2, (nodeRadius + 12) * 2);
        }

        // Node circle
        ctx.beginPath();
        ctx.arc(node.x, node.y, nodeRadius, 0, Math.PI * 2);
        ctx.fillStyle = isActive ? "rgba(0, 212, 170, 0.1)" : "rgba(30, 58, 95, 0.4)";
        ctx.fill();
        ctx.strokeStyle = isActive ? "rgba(0, 212, 170, 0.35)" : "rgba(148, 163, 184, 0.15)";
        ctx.lineWidth = 1;
        ctx.stroke();

        // Node label
        ctx.font = '600 11px "Inter", system-ui, sans-serif';
        ctx.fillStyle = isActive ? `rgba(0, 212, 170, 0.9)` : `rgba(148, 163, 184, 0.6)`;
        ctx.textAlign = "center";
        ctx.textBaseline = "middle";
        ctx.fillText(node.label, node.x, node.y);
        ctx.textBaseline = "alphabetic";
      }

      // Bottom label
      ctx.font = '600 10px "Inter", system-ui, sans-serif';
      ctx.letterSpacing = "2px";
      ctx.fillStyle = "rgba(99, 102, 241, 0.45)";
      ctx.textAlign = "center";
      ctx.fillText("CONNECTED INTELLIGENCE", cx, H - 50);

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
        aria-label="Animated graphic showing an AI core connecting to surrounding business tools"
        role="img"
      />
    </div>
  );
}
