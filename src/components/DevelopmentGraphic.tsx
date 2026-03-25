import { useEffect, useRef } from "react";

export default function DevelopmentGraphic() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animRef = useRef<number>(0);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d")!;
    if (!ctx) return;

    const dpr = window.devicePixelRatio || 1;
    const W = 520;
    const H = 400;
    canvas.width = W * dpr;
    canvas.height = H * dpr;
    canvas.style.width = `${W}px`;
    canvas.style.height = `${H}px`;
    ctx.scale(dpr, dpr);

    let frame = 0;

    // Team members positioned around the screen
    const team = [
      { x: 46, y: 80, color: "rgba(0, 212, 170,", rgb: "rgb(0, 212, 170)", bobOffset: 0 },
      { x: 46, y: 180, color: "rgba(99, 102, 241,", rgb: "rgb(99, 102, 241)", bobOffset: 1.5 },
      { x: 46, y: 280, color: "rgba(0, 212, 170,", rgb: "rgb(0, 212, 170)", bobOffset: 3 },
      { x: 474, y: 130, color: "rgba(99, 102, 241,", rgb: "rgb(99, 102, 241)", bobOffset: 4.5 },
      { x: 474, y: 230, color: "rgba(0, 212, 170,", rgb: "rgb(0, 212, 170)", bobOffset: 6 },
    ];

    function drawPersonIcon(
      x: number, y: number, color: string, fillOpacity: number, bobOffset: number
    ) {
      const bob = Math.sin(frame * 0.03 + bobOffset) * 2;
      const cy = y + bob;
      const rgba = color.replace(")", `,${fillOpacity})`).replace("rgb", "rgba");

      // Head
      ctx.beginPath();
      ctx.arc(x, cy - 8, 8, 0, Math.PI * 2);
      ctx.fillStyle = rgba;
      ctx.fill();

      // Body
      ctx.beginPath();
      ctx.moveTo(x - 12, cy + 10);
      ctx.quadraticCurveTo(x - 12, cy + 2, x - 4, cy + 2);
      ctx.lineTo(x + 4, cy + 2);
      ctx.quadraticCurveTo(x + 12, cy + 2, x + 12, cy + 10);
      ctx.lineTo(x + 12, cy + 16);
      ctx.quadraticCurveTo(x + 12, cy + 19, x + 9, cy + 19);
      ctx.lineTo(x - 9, cy + 19);
      ctx.quadraticCurveTo(x - 12, cy + 19, x - 12, cy + 16);
      ctx.closePath();
      ctx.fill();
    }

    // Contribution particles
    interface Particle {
      fromX: number;
      fromY: number;
      toX: number;
      toY: number;
      birth: number;
      life: number;
      type: "code" | "design" | "data";
      memberIdx: number;
    }
    const particles: Particle[] = [];
    const types: Array<"code" | "design" | "data"> = ["code", "design", "data"];

    // Screen build progress modules
    const modules = [
      { label: "Auth System", y: 0, h: 22, built: 0 },
      { label: "Dashboard", y: 26, h: 50, built: 0 },
      { label: "API Layer", y: 80, h: 30, built: 0 },
      { label: "Data Tables", y: 114, h: 46, built: 0 },
      { label: "AI Module", y: 164, h: 36, built: 0 },
      { label: "Settings", y: 204, h: 26, built: 0 },
    ];

    // Screen area
    const scrX = 130;
    const scrY = 40;
    const scrW = 260;
    const scrH = 310;

    function spawnParticle() {
      const mi = Math.floor(Math.random() * team.length);
      const m = team[mi];
      // Target a random point inside the screen
      const tx = scrX + 20 + Math.random() * (scrW - 40);
      const ty = scrY + 30 + Math.random() * (scrH - 50);
      particles.push({
        fromX: m.x,
        fromY: m.y,
        toX: tx,
        toY: ty,
        birth: frame,
        life: 50 + Math.random() * 30,
        type: types[Math.floor(Math.random() * types.length)],
        memberIdx: mi,
      });
    }

    function drawDots(x: number, y: number) {
      ["rgba(255,95,87,0.7)", "rgba(255,189,46,0.7)", "rgba(39,201,63,0.7)"].forEach((c, i) => {
        ctx.beginPath();
        ctx.arc(x + 12 + i * 11, y + 10, 3, 0, Math.PI * 2);
        ctx.fillStyle = c;
        ctx.fill();
      });
    }

    function draw() {
      ctx.clearRect(0, 0, W, H);
      frame++;

      // Spawn particles periodically
      if (frame % 8 === 0) spawnParticle();

      // Overall build progress (cycles)
      const cycleLen = 600;
      const cycleT = (frame % cycleLen) / cycleLen;

      // Update module build progress
      modules.forEach((m, i) => {
        const targetP = Math.max(0, Math.min(1, (cycleT * (modules.length + 2) - i) / 1.5));
        m.built += (targetP - m.built) * 0.04;
      });

      // ─── Team member person icons ───
      team.forEach((m, mi) => {
        // Pulse glow when contributing
        const hasActive = particles.some(
          (p) => p.memberIdx === mi && frame - p.birth < p.life * 0.5
        );
        if (hasActive) {
          ctx.beginPath();
          ctx.arc(m.x, m.y, 22, 0, Math.PI * 2);
          ctx.fillStyle = m.color + "0.08)";
          ctx.fill();
        }

        drawPersonIcon(m.x, m.y, m.rgb, hasActive ? 0.6 : 0.35, m.bobOffset);
      });

      // ─── Contribution particles (flying toward screen) ───
      for (let pi = particles.length - 1; pi >= 0; pi--) {
        const p = particles[pi];
        const age = frame - p.birth;
        if (age > p.life) {
          particles.splice(pi, 1);
          continue;
        }
        const t = age / p.life;
        const ease = t < 0.5 ? 2 * t * t : 1 - Math.pow(-2 * t + 2, 2) / 2;

        const px = p.fromX + (p.toX - p.fromX) * ease;
        const py = p.fromY + (p.toY - p.fromY) * ease;
        const alpha = t < 0.2 ? t / 0.2 : t > 0.8 ? (1 - t) / 0.2 : 1;

        const m = team[p.memberIdx];

        // Trail
        if (t > 0.1 && t < 0.9) {
          const prevT = Math.max(0, t - 0.06);
          const prevEase = prevT < 0.5 ? 2 * prevT * prevT : 1 - Math.pow(-2 * prevT + 2, 2) / 2;
          const prevX = p.fromX + (p.toX - p.fromX) * prevEase;
          const prevY = p.fromY + (p.toY - p.fromY) * prevEase;
          ctx.strokeStyle = m.color + `${0.15 * alpha})`;
          ctx.lineWidth = 1;
          ctx.beginPath();
          ctx.moveTo(prevX, prevY);
          ctx.lineTo(px, py);
          ctx.stroke();
        }

        // Particle icon
        ctx.globalAlpha = alpha * 0.9;
        if (p.type === "code") {
          // Code brackets < >
          ctx.font = '700 8px "SF Mono", monospace';
          ctx.fillStyle = m.color + "0.8)";
          ctx.textAlign = "center";
          ctx.fillText("</>", px, py + 3);
          ctx.textAlign = "left";
        } else if (p.type === "design") {
          // Design diamond
          ctx.fillStyle = m.color + "0.7)";
          ctx.save();
          ctx.translate(px, py);
          ctx.rotate(Math.PI / 4);
          ctx.fillRect(-3, -3, 6, 6);
          ctx.restore();
        } else {
          // Data dot
          ctx.beginPath();
          ctx.arc(px, py, 3, 0, Math.PI * 2);
          ctx.fillStyle = m.color + "0.7)";
          ctx.fill();
        }
        ctx.globalAlpha = 1;
      }

      // ─── Central screen (web app being built) ───
      // Title bar
      ctx.fillStyle = "rgba(240, 243, 247, 0.95)";
      ctx.beginPath();
      ctx.roundRect(scrX, scrY, scrW, 20, [6, 6, 0, 0]);
      ctx.fill();
      drawDots(scrX, scrY);

      // URL bar
      ctx.fillStyle = "rgba(255, 255, 255, 0.9)";
      ctx.beginPath();
      ctx.roundRect(scrX + 48, scrY + 3, scrW - 58, 14, 3);
      ctx.fill();
      ctx.font = '7px "Inter", sans-serif';
      ctx.fillStyle = "rgba(100, 116, 139, 0.45)";
      ctx.textAlign = "center";
      ctx.fillText("🔒 app.navislabs.com", scrX + scrW / 2 + 16, scrY + 13);
      ctx.textAlign = "left";

      // Screen body (light mode)
      ctx.fillStyle = "rgba(249, 250, 252, 0.97)";
      ctx.beginPath();
      ctx.roundRect(scrX, scrY + 20, scrW, scrH - 20, [0, 0, 6, 6]);
      ctx.fill();
      ctx.strokeStyle = "rgba(203, 213, 225, 0.35)";
      ctx.lineWidth = 1;
      ctx.beginPath();
      ctx.roundRect(scrX, scrY, scrW, scrH, 6);
      ctx.stroke();

      // Clip screen content
      ctx.save();
      ctx.beginPath();
      ctx.roundRect(scrX + 1, scrY + 21, scrW - 2, scrH - 22, [0, 0, 5, 5]);
      ctx.clip();

      const cx = scrX + 8;
      const cy = scrY + 26;
      const cw = scrW - 16;

      // Draw modules as they build
      modules.forEach((mod, mi) => {
        const p = mod.built;
        if (p < 0.01) return;

        const my = cy + mod.y;
        const isTeal = mi % 2 === 0;

        // Module container
        ctx.globalAlpha = p;
        ctx.fillStyle = "rgba(255, 255, 255, 1)";
        ctx.beginPath();
        ctx.roundRect(cx, my, cw * Math.min(p * 1.3, 1), mod.h, 4);
        ctx.fill();
        ctx.strokeStyle = isTeal ? "rgba(0, 212, 170, 0.15)" : "rgba(99, 102, 241, 0.12)";
        ctx.beginPath();
        ctx.roundRect(cx, my, cw, mod.h, 4);
        ctx.stroke();

        // Progress bar at top of module
        const barW = cw * Math.min(p, 1);
        ctx.fillStyle = isTeal ? "rgba(0, 212, 170, 0.2)" : "rgba(99, 102, 241, 0.15)";
        ctx.beginPath();
        ctx.roundRect(cx, my, barW, 3, [4, 4, 0, 0]);
        ctx.fill();

        // Module inner content (appears after 40% built)
        if (p > 0.4) {
          const innerAlpha = (p - 0.4) / 0.6;
          ctx.globalAlpha = innerAlpha;

          if (mod.label === "Auth System") {
            // Login form placeholder
            ctx.fillStyle = "rgba(148, 163, 184, 0.12)";
            ctx.beginPath();
            ctx.roundRect(cx + cw / 2 - 40, my + 7, 80, 10, 2);
            ctx.fill();
          } else if (mod.label === "Dashboard") {
            // Mini stat cards
            const miniW = (cw - 20) / 3;
            for (let s = 0; s < 3; s++) {
              ctx.fillStyle = s === 0 ? "rgba(0, 212, 170, 0.08)" : s === 1 ? "rgba(99, 102, 241, 0.08)" : "rgba(251, 191, 36, 0.06)";
              ctx.beginPath();
              ctx.roundRect(cx + 4 + s * (miniW + 4), my + 6, miniW, 18, 3);
              ctx.fill();
              ctx.strokeStyle = "rgba(226, 232, 240, 0.3)";
              ctx.stroke();
            }
            // Chart area
            ctx.fillStyle = "rgba(248, 250, 252, 0.8)";
            ctx.beginPath();
            ctx.roundRect(cx + 4, my + 28, cw - 8, 18, 3);
            ctx.fill();
            // Mini bars
            for (let b = 0; b < 8; b++) {
              const bh = 4 + Math.random() * 10;
              ctx.fillStyle = b % 2 === 0 ? "rgba(0, 212, 170, 0.35)" : "rgba(99, 102, 241, 0.25)";
              ctx.fillRect(cx + 8 + b * 28, my + 46 - bh, 20, bh);
            }
          } else if (mod.label === "API Layer") {
            // Endpoint lines
            for (let e = 0; e < 3; e++) {
              ctx.fillStyle = "rgba(148, 163, 184, 0.08)";
              ctx.beginPath();
              ctx.roundRect(cx + 4, my + 6 + e * 8, cw - 8, 6, 2);
              ctx.fill();
              // Method badge
              ctx.fillStyle = e === 0 ? "rgba(0, 180, 150, 0.15)" : e === 1 ? "rgba(99, 102, 241, 0.12)" : "rgba(251, 191, 36, 0.1)";
              ctx.beginPath();
              ctx.roundRect(cx + 6, my + 6 + e * 8, 18, 6, 2);
              ctx.fill();
            }
          } else if (mod.label === "Data Tables") {
            // Table header
            ctx.fillStyle = "rgba(248, 250, 252, 1)";
            ctx.beginPath();
            ctx.roundRect(cx + 4, my + 5, cw - 8, 10, [3, 3, 0, 0]);
            ctx.fill();
            // Rows
            for (let r = 0; r < 3; r++) {
              ctx.strokeStyle = "rgba(226, 232, 240, 0.2)";
              ctx.beginPath();
              ctx.moveTo(cx + 4, my + 17 + r * 10);
              ctx.lineTo(cx + cw - 4, my + 17 + r * 10);
              ctx.stroke();
            }
          } else if (mod.label === "AI Module") {
            // Chat bubbles
            ctx.fillStyle = "rgba(0, 212, 170, 0.1)";
            ctx.beginPath();
            ctx.roundRect(cx + 6, my + 6, cw * 0.5, 12, 6);
            ctx.fill();
            ctx.fillStyle = "rgba(99, 102, 241, 0.08)";
            ctx.beginPath();
            ctx.roundRect(cx + cw * 0.35, my + 20, cw * 0.58, 12, 6);
            ctx.fill();
          } else if (mod.label === "Settings") {
            // Toggle rows
            for (let t = 0; t < 2; t++) {
              ctx.fillStyle = "rgba(148, 163, 184, 0.1)";
              ctx.beginPath();
              ctx.roundRect(cx + 4, my + 5 + t * 10, cw * 0.5, 8, 2);
              ctx.fill();
              ctx.fillStyle = t === 0 ? "rgba(0, 212, 170, 0.3)" : "rgba(148, 163, 184, 0.15)";
              ctx.beginPath();
              ctx.roundRect(cx + cw - 24, my + 5 + t * 10, 18, 8, 4);
              ctx.fill();
            }
          }
        }

        // Module label
        ctx.globalAlpha = p * 0.6;
        ctx.font = '600 7px "Inter", sans-serif';
        ctx.fillStyle = isTeal ? "rgba(0, 180, 150, 0.7)" : "rgba(99, 102, 241, 0.6)";
        ctx.textAlign = "right";
        ctx.fillText(mod.label, cx + cw - 6, my + mod.h - 4);
        ctx.textAlign = "left";

        ctx.globalAlpha = 1;
      });

      ctx.restore(); // end screen clip

      // ─── Sprint progress indicator ───
      const sprintY = scrY + scrH + 16;
      const sprintW = scrW;
      const totalBuilt = modules.reduce((s, m) => s + m.built, 0) / modules.length;

      ctx.font = '600 8px "Inter", sans-serif';
      ctx.fillStyle = "rgba(148, 163, 184, 0.4)";
      ctx.textAlign = "center";
      ctx.fillText(`SPRINT PROGRESS — ${Math.round(totalBuilt * 100)}%`, scrX + scrW / 2, sprintY);

      // Progress bar
      ctx.fillStyle = "rgba(30, 58, 95, 0.3)";
      ctx.beginPath();
      ctx.roundRect(scrX, sprintY + 6, sprintW, 4, 2);
      ctx.fill();
      const progGrad = ctx.createLinearGradient(scrX, 0, scrX + sprintW * totalBuilt, 0);
      progGrad.addColorStop(0, "rgba(0, 212, 170, 0.6)");
      progGrad.addColorStop(1, "rgba(99, 102, 241, 0.5)");
      ctx.fillStyle = progGrad;
      ctx.beginPath();
      ctx.roundRect(scrX, sprintY + 6, sprintW * totalBuilt, 4, 2);
      ctx.fill();
      // Glow on progress tip
      if (totalBuilt > 0.05 && totalBuilt < 0.98) {
        const tipX = scrX + sprintW * totalBuilt;
        const glow = ctx.createRadialGradient(tipX, sprintY + 8, 0, tipX, sprintY + 8, 10);
        glow.addColorStop(0, "rgba(0, 212, 170, 0.3)");
        glow.addColorStop(1, "rgba(0, 212, 170, 0)");
        ctx.fillStyle = glow;
        ctx.fillRect(tipX - 10, sprintY, 20, 16);
      }
      ctx.textAlign = "left";

      // ─── Connection lines from team to screen (subtle) ───
      team.forEach((m) => {
        const targetX = m.x < W / 2 ? scrX : scrX + scrW;
        const targetY = Math.max(scrY + 30, Math.min(scrY + scrH - 10, m.y));

        ctx.strokeStyle = m.color + "0.06)";
        ctx.lineWidth = 1;
        ctx.setLineDash([2, 4]);
        ctx.beginPath();
        ctx.moveTo(m.x + (m.x < W / 2 ? 16 : -16), m.y);
        ctx.quadraticCurveTo(
          (m.x + targetX) / 2,
          m.y,
          targetX,
          targetY
        );
        ctx.stroke();
        ctx.setLineDash([]);
      });

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
        style={{ width: 520, height: 400 }}
        aria-label="Animated graphic showing the Navis Labs team collaboratively building a web application through rapid sprint development"
        role="img"
      />
    </div>
  );
}
