import { useEffect, useRef } from "react";

export default function SystemIntegrationGraphic() {
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

    const teal = "#00D4AA";
    const indigo = "#6366F1";
    const neutral = "#94A3B8";
    const white = "#F1F5F9";
    const navyMid = "#1E3A5F";

    // System boxes
    const systemLabels = ["ERP", "CRM", "Payment", "Inventory", "Analytics"];
    const boxW = 90;
    const boxH = 42;

    // Positions in a loose pentagon
    const basePositions = [
      { x: cx, y: cy - 145 },           // top
      { x: cx + 155, y: cy - 35 },      // top-right
      { x: cx + 95, y: cy + 125 },      // bottom-right
      { x: cx - 95, y: cy + 125 },      // bottom-left
      { x: cx - 155, y: cy - 35 },      // top-left
    ];

    interface SystemBox {
      label: string;
      bx: number;
      by: number;
      floatOffsetX: number;
      floatOffsetY: number;
      floatSpeedX: number;
      floatSpeedY: number;
      floatPhaseX: number;
      floatPhaseY: number;
    }

    const systems: SystemBox[] = systemLabels.map((label, i) => ({
      label,
      bx: basePositions[i].x,
      by: basePositions[i].y,
      floatOffsetX: 0,
      floatOffsetY: 0,
      floatSpeedX: 0.008 + Math.random() * 0.006,
      floatSpeedY: 0.01 + Math.random() * 0.006,
      floatPhaseX: Math.random() * Math.PI * 2,
      floatPhaseY: Math.random() * Math.PI * 2,
    }));

    // Connections: pairs of indices
    const connections = [
      [0, 1], [1, 2], [2, 3], [3, 4], [4, 0], // outer ring
      [0, 2], [0, 3], [1, 3], [1, 4], [2, 4],  // cross connections
    ];

    // Animation state
    let frame = 0;
    const connectionDrawDelay = 50; // frames between each connection appearing
    const allConnectedFrame = connections.length * connectionDrawDelay;

    // Traveling dots
    interface TravelDot {
      connIndex: number;
      t: number;
      speed: number;
      forward: boolean;
    }

    const travelDots: TravelDot[] = [];
    let dotSpawnTimer = 0;

    function hexToRgb(hex: string): [number, number, number] {
      const r = parseInt(hex.slice(1, 3), 16);
      const g = parseInt(hex.slice(3, 5), 16);
      const b = parseInt(hex.slice(5, 7), 16);
      return [r, g, b];
    }

    function getSystemPos(index: number): { x: number; y: number } {
      const s = systems[index];
      return {
        x: s.bx + s.floatOffsetX,
        y: s.by + s.floatOffsetY,
      };
    }

    function draw() {
      ctx.clearRect(0, 0, W, H);
      frame++;

      // Update float offsets
      for (const s of systems) {
        s.floatPhaseX += s.floatSpeedX;
        s.floatPhaseY += s.floatSpeedY;
        s.floatOffsetX = Math.sin(s.floatPhaseX) * 4;
        s.floatOffsetY = Math.cos(s.floatPhaseY) * 3;
      }

      // Draw connections that have appeared
      const connectionsShown = Math.min(connections.length, Math.floor(frame / connectionDrawDelay));

      for (let i = 0; i < connectionsShown; i++) {
        const [a, b] = connections[i];
        const posA = getSystemPos(a);
        const posB = getSystemPos(b);

        // Fade in effect
        const appearFrame = i * connectionDrawDelay;
        const fadeProgress = Math.min(1, (frame - appearFrame) / 30);

        ctx.beginPath();
        ctx.moveTo(posA.x, posA.y);
        ctx.lineTo(posB.x, posB.y);
        ctx.strokeStyle = `rgba(0, 212, 170, ${0.12 * fadeProgress})`;
        ctx.lineWidth = 1;
        ctx.stroke();
      }

      // Central hub appears once all connected
      if (frame > allConnectedFrame) {
        const hubFade = Math.min(1, (frame - allConnectedFrame) / 60);
        const hubPulse = Math.sin(frame * 0.04) * 0.06;

        // Hub glow
        const hubGlow = ctx.createRadialGradient(cx, cy, 0, cx, cy, 35);
        hubGlow.addColorStop(0, `rgba(0, 212, 170, ${(0.18 + hubPulse) * hubFade})`);
        hubGlow.addColorStop(0.6, `rgba(0, 212, 170, ${0.05 * hubFade})`);
        hubGlow.addColorStop(1, "rgba(0, 212, 170, 0)");
        ctx.fillStyle = hubGlow;
        ctx.fillRect(cx - 35, cy - 35, 70, 70);

        // Hub dot
        ctx.beginPath();
        ctx.arc(cx, cy, 6, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(0, 212, 170, ${0.5 * hubFade})`;
        ctx.fill();
        ctx.strokeStyle = `rgba(0, 212, 170, ${0.3 * hubFade})`;
        ctx.lineWidth = 1;
        ctx.stroke();
      }

      // Spawn traveling dots
      if (connectionsShown > 0) {
        dotSpawnTimer++;
        if (dotSpawnTimer > 20) {
          const ci = Math.floor(Math.random() * connectionsShown);
          travelDots.push({
            connIndex: ci,
            t: 0,
            speed: 0.008 + Math.random() * 0.006,
            forward: Math.random() > 0.5,
          });
          dotSpawnTimer = 0;
        }
      }

      // Update and draw traveling dots
      for (let i = travelDots.length - 1; i >= 0; i--) {
        const dot = travelDots[i];
        dot.t += dot.speed;
        if (dot.t > 1) {
          travelDots.splice(i, 1);
          continue;
        }

        const [a, b] = connections[dot.connIndex];
        const posA = getSystemPos(a);
        const posB = getSystemPos(b);
        const progress = dot.forward ? dot.t : 1 - dot.t;

        const dx = posA.x + (posB.x - posA.x) * progress;
        const dy = posA.y + (posB.y - posA.y) * progress;
        const dotOpacity = dot.t < 0.1 ? dot.t / 0.1 : dot.t > 0.9 ? (1 - dot.t) / 0.1 : 1;

        const dotGlow = ctx.createRadialGradient(dx, dy, 0, dx, dy, 6);
        dotGlow.addColorStop(0, `rgba(0, 212, 170, ${0.6 * dotOpacity})`);
        dotGlow.addColorStop(1, `rgba(0, 212, 170, 0)`);
        ctx.fillStyle = dotGlow;
        ctx.fillRect(dx - 6, dy - 6, 12, 12);

        ctx.beginPath();
        ctx.arc(dx, dy, 2, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(0, 212, 170, ${0.8 * dotOpacity})`;
        ctx.fill();
      }

      // Draw system boxes
      for (let i = 0; i < systems.length; i++) {
        const pos = getSystemPos(i);
        const bx = pos.x - boxW / 2;
        const by = pos.y - boxH / 2;

        // Box
        ctx.beginPath();
        ctx.roundRect(bx, by, boxW, boxH, 8);
        ctx.fillStyle = "rgba(30, 58, 95, 0.4)";
        ctx.fill();
        ctx.strokeStyle = "rgba(148, 163, 184, 0.15)";
        ctx.lineWidth = 1;
        ctx.stroke();

        // Label
        ctx.font = '600 12px "Inter", system-ui, sans-serif';
        ctx.fillStyle = "rgba(241, 245, 249, 0.7)";
        ctx.textAlign = "center";
        ctx.textBaseline = "middle";
        ctx.fillText(systems[i].label, pos.x, pos.y);
        ctx.textBaseline = "alphabetic";
      }

      // Bottom label
      ctx.font = '600 10px "Inter", system-ui, sans-serif';
      ctx.letterSpacing = "2px";
      ctx.fillStyle = "rgba(99, 102, 241, 0.45)";
      ctx.textAlign = "center";
      ctx.fillText("UNIFIED ECOSYSTEM", cx, H - 50);

      // Loop the animation: reset after full cycle + viewing time
      if (frame > allConnectedFrame + 400) {
        frame = 0;
        travelDots.length = 0;
      }

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
        aria-label="Animated graphic showing disconnected systems forming a unified network"
        role="img"
      />
    </div>
  );
}
