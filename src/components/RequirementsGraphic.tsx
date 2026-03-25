import { useEffect, useRef } from "react";

export default function RequirementsGraphic() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animRef = useRef<number>(0);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d")!;
    if (!ctx) return;

    const dpr = window.devicePixelRatio || 1;
    const W = 560;
    const H = 420;
    canvas.width = W * dpr;
    canvas.height = H * dpr;
    canvas.style.width = `${W}px`;
    canvas.style.height = `${H}px`;
    ctx.scale(dpr, dpr);

    let frame = 0;
    const CYCLE = 600; // total animation cycle frames

    // ── Person icon (solid rounded avatar + shoulders) ──
    function drawPersonIcon(
      x: number,
      y: number,
      color: string,
      fillOpacity: number,
      bobOffset: number
    ) {
      const bob = Math.sin(frame * 0.03 + bobOffset) * 2;
      const cy = y + bob;

      // Head circle — solid filled
      ctx.beginPath();
      ctx.arc(x, cy - 12, 11, 0, Math.PI * 2);
      ctx.fillStyle = color.replace(")", `,${fillOpacity})`).replace("rgb", "rgba");
      ctx.fill();

      // Shoulders / body — rounded trapezoid
      ctx.beginPath();
      ctx.moveTo(x - 16, cy + 14);
      ctx.quadraticCurveTo(x - 16, cy + 2, x - 6, cy + 2);
      ctx.lineTo(x + 6, cy + 2);
      ctx.quadraticCurveTo(x + 16, cy + 2, x + 16, cy + 14);
      ctx.lineTo(x + 16, cy + 22);
      ctx.quadraticCurveTo(x + 16, cy + 26, x + 12, cy + 26);
      ctx.lineTo(x - 12, cy + 26);
      ctx.quadraticCurveTo(x - 16, cy + 26, x - 16, cy + 22);
      ctx.closePath();
      ctx.fill();
    }

    // ── Speech bubble with multi-line support ──
    function drawBubble(
      cx: number,
      cy: number,
      text: string,
      opacity: number,
      color: string,
      tailDir: "down" | "down-left" | "down-right"
    ) {
      if (opacity <= 0.01) return;
      ctx.save();
      ctx.globalAlpha = opacity;

      ctx.font = '500 10px "Inter", system-ui, sans-serif';
      const lines = text.split("\n");
      const lineWidths = lines.map((l) => ctx.measureText(l).width);
      const maxW = Math.max(...lineWidths);
      const pw = maxW + 24;
      const lineH = 14;
      const ph = lines.length * lineH + 14;
      const bx = cx - pw / 2;
      const by = cy - ph;

      // Glass background
      ctx.fillStyle = `rgba(${color}, 0.08)`;
      ctx.strokeStyle = `rgba(${color}, 0.25)`;
      ctx.lineWidth = 1;
      ctx.beginPath();
      ctx.roundRect(bx, by, pw, ph, 8);
      ctx.fill();
      ctx.stroke();

      // Tail
      const tx = tailDir === "down" ? cx : tailDir === "down-left" ? cx - 10 : cx + 10;
      ctx.beginPath();
      ctx.moveTo(tx - 5, by + ph);
      ctx.lineTo(tx, by + ph + 7);
      ctx.lineTo(tx + 5, by + ph);
      ctx.fillStyle = `rgba(${color}, 0.08)`;
      ctx.fill();

      // Text
      ctx.fillStyle = `rgba(${color}, ${0.8 * opacity})`;
      ctx.textAlign = "center";
      lines.forEach((line, i) => {
        ctx.fillText(line, cx, by + 14 + i * lineH);
      });
      ctx.textAlign = "left";
      ctx.restore();
    }

    // ── Wireframe elements ──
    const wireElements = [
      // Navbar
      { type: "rect" as const, x: 8, y: 8, w: 224, h: 20, delay: 0 },
      { type: "rect" as const, x: 14, y: 13, w: 28, h: 10, delay: 15 },
      { type: "rect" as const, x: 48, y: 13, w: 20, h: 10, delay: 25 },
      { type: "rect" as const, x: 74, y: 13, w: 20, h: 10, delay: 30 },
      { type: "rect" as const, x: 190, y: 13, w: 34, h: 10, delay: 40 },
      // Hero
      { type: "rect" as const, x: 8, y: 36, w: 224, h: 56, delay: 60 },
      { type: "line" as const, x1: 60, y1: 52, x2: 180, y2: 52, delay: 75 },
      { type: "line" as const, x1: 80, y1: 64, x2: 160, y2: 64, delay: 85 },
      { type: "rect" as const, x: 90, y: 72, w: 56, h: 14, delay: 95 },
      // Cards
      { type: "rect" as const, x: 8, y: 100, w: 70, h: 48, delay: 120 },
      { type: "rect" as const, x: 84, y: 100, w: 70, h: 48, delay: 140 },
      { type: "rect" as const, x: 160, y: 100, w: 70, h: 48, delay: 160 },
      // Card lines
      { type: "line" as const, x1: 16, y1: 116, x2: 68, y2: 116, delay: 130 },
      { type: "line" as const, x1: 16, y1: 128, x2: 56, y2: 128, delay: 135 },
      { type: "line" as const, x1: 92, y1: 116, x2: 144, y2: 116, delay: 150 },
      { type: "line" as const, x1: 92, y1: 128, x2: 132, y2: 128, delay: 155 },
      { type: "line" as const, x1: 168, y1: 116, x2: 220, y2: 116, delay: 170 },
      { type: "line" as const, x1: 168, y1: 128, x2: 208, y2: 128, delay: 175 },
      // Table
      { type: "rect" as const, x: 8, y: 158, w: 224, h: 64, delay: 200 },
      { type: "line" as const, x1: 8, y1: 172, x2: 232, y2: 172, delay: 210 },
      { type: "line" as const, x1: 8, y1: 186, x2: 232, y2: 186, delay: 220 },
      { type: "line" as const, x1: 8, y1: 200, x2: 232, y2: 200, delay: 230 },
      { type: "line" as const, x1: 70, y1: 158, x2: 70, y2: 222, delay: 215 },
      { type: "line" as const, x1: 140, y1: 158, x2: 140, y2: 222, delay: 218 },
      { type: "line" as const, x1: 190, y1: 158, x2: 190, y2: 222, delay: 222 },
    ];

    // ── Lightbulb particles that fly from meeting to wireframe ──
    interface Bulb {
      startX: number;
      startY: number;
      endX: number;
      endY: number;
      birthFrame: number;
      lifetime: number;
    }
    const bulbs: Bulb[] = [];
    const wireOriginX = 320;
    const wireOriginY = 40;

    function spawnBulb() {
      const meetingCenterX = 130;
      const meetingCenterY = 170;
      bulbs.push({
        startX: meetingCenterX + (Math.random() - 0.5) * 60,
        startY: meetingCenterY - 30 - Math.random() * 20,
        endX: wireOriginX + 10 + Math.random() * 220,
        endY: wireOriginY + 10 + Math.random() * 220,
        birthFrame: frame,
        lifetime: 80 + Math.random() * 40,
      });
    }

    function draw() {
      ctx.clearRect(0, 0, W, H);
      frame++;
      const cycleFrame = frame % CYCLE;

      // Spawn bulbs periodically
      if (frame % 35 === 0) spawnBulb();

      // ═══════════════════════════════════════════
      // LEFT SIDE — Meeting scene
      // ═══════════════════════════════════════════
      const mx = 130; // meeting center X
      const my = 210; // meeting center Y

      // Conference table
      ctx.fillStyle = "rgba(30, 58, 95, 0.35)";
      ctx.strokeStyle = "rgba(148, 163, 184, 0.12)";
      ctx.lineWidth = 1;
      ctx.beginPath();
      ctx.ellipse(mx, my + 30, 70, 18, 0, 0, Math.PI * 2);
      ctx.fill();
      ctx.stroke();

      // 4 people around the table
      // Client side (left two — indigo)
      drawPersonIcon(mx - 50, my - 20, "rgb(99, 102, 241)", 0.5, 0);
      drawPersonIcon(mx - 18, my - 28, "rgb(99, 102, 241)", 0.4, 1.5);

      // Navis side (right two — teal)
      drawPersonIcon(mx + 18, my - 28, "rgb(0, 212, 170)", 0.5, 3);
      drawPersonIcon(mx + 50, my - 20, "rgb(0, 212, 170)", 0.4, 4.5);

      // ── Speech bubbles — appear once and stay, no overlap ──
      const clientFadeFrames = 30;

      // Client bubble: top-left, fades in immediately
      const clientOpacity = Math.min(frame / clientFadeFrames, 1);
      drawBubble(
        mx - 50,
        my - 90,
        "These are my problems,\nhow can I solve them?",
        clientOpacity,
        "99, 102, 241",
        "down-right"
      );

      // Navis bubble: below client bubble on the right, fades in after 2s
      const navisDelay = 120;
      const navisOpacity = frame > navisDelay ? Math.min((frame - navisDelay) / clientFadeFrames, 1) : 0;
      drawBubble(
        mx + 50,
        my - 58,
        "We can apply these tools\nto solve your problems!",
        navisOpacity,
        "0, 212, 170",
        "down-left"
      );

      // Meeting label — pill badge, aligned with wireframe label
      const sharedLabelY = 295;
      ctx.font = '700 10px "Inter", system-ui, sans-serif';
      const meetLabelW = ctx.measureText("DISCOVERY MEETING").width + 24;
      const meetLabelX = mx - meetLabelW / 2;
      // Pill background
      ctx.fillStyle = "rgba(99, 102, 241, 0.08)";
      ctx.strokeStyle = "rgba(99, 102, 241, 0.2)";
      ctx.lineWidth = 1;
      ctx.beginPath();
      ctx.roundRect(meetLabelX, sharedLabelY, meetLabelW, 24, 12);
      ctx.fill();
      ctx.stroke();
      // Text
      ctx.fillStyle = "rgba(99, 102, 241, 0.6)";
      ctx.textAlign = "center";
      ctx.fillText("DISCOVERY MEETING", mx, sharedLabelY + 16);
      ctx.textAlign = "left";

      // ═══════════════════════════════════════════
      // CENTER — Flowing lightbulbs from meeting → wireframe
      // ═══════════════════════════════════════════
      for (let i = bulbs.length - 1; i >= 0; i--) {
        const b = bulbs[i];
        const age = frame - b.birthFrame;
        if (age > b.lifetime) {
          bulbs.splice(i, 1);
          continue;
        }
        const t = age / b.lifetime; // 0→1
        // Bezier curve from start to end
        const cpX = (b.startX + b.endX) / 2;
        const cpY = Math.min(b.startY, b.endY) - 60;
        const x = (1 - t) * (1 - t) * b.startX + 2 * (1 - t) * t * cpX + t * t * b.endX;
        const y = (1 - t) * (1 - t) * b.startY + 2 * (1 - t) * t * cpY + t * t * b.endY;

        const opacity = t < 0.1 ? t / 0.1 : t > 0.8 ? (1 - t) / 0.2 : 1;
        const size = 8 + (1 - t) * 4; // shrinks as it arrives

        // Glow
        ctx.globalAlpha = opacity * 0.15;
        const glow = ctx.createRadialGradient(x, y, 0, x, y, size * 2);
        glow.addColorStop(0, "rgba(0, 212, 170, 0.4)");
        glow.addColorStop(1, "rgba(0, 212, 170, 0)");
        ctx.fillStyle = glow;
        ctx.fillRect(x - size * 2, y - size * 2, size * 4, size * 4);

        // Bulb icon — simple filled circle with filament
        ctx.globalAlpha = opacity * 0.7;
        ctx.fillStyle = "rgba(0, 212, 170, 0.6)";
        ctx.beginPath();
        ctx.arc(x, y - 2, size * 0.4, 0, Math.PI * 2);
        ctx.fill();

        // Tiny bulb shape
        ctx.strokeStyle = "rgba(0, 212, 170, 0.5)";
        ctx.lineWidth = 1.2;
        ctx.beginPath();
        ctx.arc(x, y - 3, size * 0.35, Math.PI * 0.2, Math.PI * 0.8, true);
        ctx.lineTo(x - size * 0.15, y + size * 0.15);
        ctx.lineTo(x + size * 0.15, y + size * 0.15);
        ctx.closePath();
        ctx.stroke();

        // Impact flash when arriving
        if (t > 0.85) {
          const flashOpacity = (t - 0.85) / 0.15;
          ctx.globalAlpha = (1 - flashOpacity) * 0.3;
          ctx.beginPath();
          ctx.arc(x, y, size * (1 + flashOpacity * 2), 0, Math.PI * 2);
          ctx.fillStyle = "rgba(0, 212, 170, 0.2)";
          ctx.fill();
        }

        ctx.globalAlpha = 1;
      }

      // ═══════════════════════════════════════════
      // RIGHT SIDE — Wireframe blueprint
      // ═══════════════════════════════════════════
      const wx = wireOriginX;
      const wy = wireOriginY;
      const ww = 230;
      const wh = 240;

      // Blueprint background
      ctx.fillStyle = "rgba(10, 22, 40, 0.5)";
      ctx.beginPath();
      ctx.roundRect(wx, wy, ww, wh, 6);
      ctx.fill();
      ctx.strokeStyle = "rgba(30, 58, 95, 0.3)";
      ctx.lineWidth = 1;
      ctx.beginPath();
      ctx.roundRect(wx, wy, ww, wh, 6);
      ctx.stroke();

      // Clip
      ctx.save();
      ctx.beginPath();
      ctx.roundRect(wx + 1, wy + 1, ww - 2, wh - 2, 5);
      ctx.clip();

      // Progressive build
      const buildProgress = (frame % 500) / 500;
      const maxDelay = 230;

      for (const el of wireElements) {
        const elP = Math.max(0, Math.min(1, (buildProgress * (maxDelay + 60) - el.delay) / 40));
        if (elP <= 0) continue;

        ctx.globalAlpha = elP;
        ctx.strokeStyle = "rgba(148, 163, 184, 0.25)";
        ctx.lineWidth = 1;
        ctx.setLineDash([3, 3]);

        if (el.type === "rect") {
          const dw = el.w * Math.min(elP * 2, 1);
          const dh = el.h * Math.min(elP * 2, 1);
          ctx.beginPath();
          ctx.roundRect(wx + el.x, wy + el.y, dw, dh, 2);
          ctx.stroke();
          ctx.fillStyle = "rgba(148, 163, 184, 0.02)";
          ctx.fill();
        } else {
          const lp = Math.min(elP * 2, 1);
          ctx.beginPath();
          ctx.moveTo(wx + el.x1, wy + el.y1);
          ctx.lineTo(
            wx + el.x1 + (el.x2 - el.x1) * lp,
            wy + el.y1 + (el.y2 - el.y1) * lp
          );
          ctx.stroke();
        }

        ctx.setLineDash([]);
        ctx.globalAlpha = 1;
      }

      // Scan line
      const scanY = wy + wh * buildProgress;
      ctx.strokeStyle = `rgba(0, 212, 170, ${0.12 + Math.sin(frame * 0.1) * 0.04})`;
      ctx.lineWidth = 1;
      ctx.beginPath();
      ctx.moveTo(wx + 4, scanY);
      ctx.lineTo(wx + ww - 4, scanY);
      ctx.stroke();
      const sg = ctx.createLinearGradient(wx, scanY - 6, wx, scanY + 6);
      sg.addColorStop(0, "rgba(0, 212, 170, 0)");
      sg.addColorStop(0.5, "rgba(0, 212, 170, 0.05)");
      sg.addColorStop(1, "rgba(0, 212, 170, 0)");
      ctx.fillStyle = sg;
      ctx.fillRect(wx + 4, scanY - 6, ww - 8, 12);

      ctx.restore();

      // Wireframe label — pill badge below blueprint
      const wireLabelY = sharedLabelY;
      ctx.font = '700 10px "Inter", system-ui, sans-serif';
      const wireLabelW = ctx.measureText("SYSTEM BLUEPRINT").width + 24;
      const wireLabelX = wx + ww / 2 - wireLabelW / 2;
      // Pill background
      ctx.fillStyle = "rgba(0, 212, 170, 0.08)";
      ctx.strokeStyle = "rgba(0, 212, 170, 0.2)";
      ctx.lineWidth = 1;
      ctx.beginPath();
      ctx.roundRect(wireLabelX, wireLabelY, wireLabelW, 24, 12);
      ctx.fill();
      ctx.stroke();
      // Text
      ctx.fillStyle = "rgba(0, 212, 170, 0.6)";
      ctx.textAlign = "center";
      ctx.fillText("SYSTEM BLUEPRINT", wx + ww / 2, wireLabelY + 16);
      ctx.textAlign = "left";

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
        style={{ width: 560, height: 420 }}
        aria-label="Animated graphic showing a discovery meeting where client problems are transformed into a system wireframe blueprint"
        role="img"
      />
    </div>
  );
}
