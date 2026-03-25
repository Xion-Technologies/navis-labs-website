import { useEffect, useRef } from "react";

export default function TrainingGraphic() {
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

    // Layout: symmetric — Navis left, screen center, client team right
    const scrW = 200;
    const scrH = 190;
    const scrX = (W - scrW) / 2; // centered
    const scrY = 30;

    const navisX = 55;
    const navisY = scrY + scrH / 2 + 10; // vertically centered with screen

    // Client team members (right side, vertically centered & aligned)
    const teamX = W - 55;
    const teamStartY = scrY + 30;
    const teamSpacing = 50;
    const clientTeam = [
      { x: teamX, y: teamStartY, bobOff: 0 },
      { x: teamX, y: teamStartY + teamSpacing, bobOff: 1.5 },
      { x: teamX, y: teamStartY + teamSpacing * 2, bobOff: 3 },
      { x: teamX, y: teamStartY + teamSpacing * 3, bobOff: 4.5 },
    ];

    // Training steps that cycle
    const steps = [
      { label: "Dashboard Overview", highlight: 0 },
      { label: "Process Management", highlight: 1 },
      { label: "AI Chat Tools", highlight: 2 },
      { label: "Reports & Analytics", highlight: 3 },
    ];
    const stepDuration = 150;
    const totalCycle = steps.length * stepDuration;

    // Knowledge transfer particles
    interface KnowParticle {
      birth: number;
      targetIdx: number;
    }
    const knowParticles: KnowParticle[] = [];

    function drawPersonIcon(
      x: number, y: number, color: string, opacity: number, bobOff: number, scale = 1
    ) {
      const bob = Math.sin(frame * 0.03 + bobOff) * 1.5;
      const cy = y + bob;
      const rgba = color.replace(")", `,${opacity})`).replace("rgb", "rgba");
      const r = 8 * scale;
      const bw = 12 * scale;
      const bh = 19 * scale;

      ctx.beginPath();
      ctx.arc(x, cy - r, r, 0, Math.PI * 2);
      ctx.fillStyle = rgba;
      ctx.fill();

      ctx.beginPath();
      ctx.moveTo(x - bw, cy + (10 * scale));
      ctx.quadraticCurveTo(x - bw, cy + (2 * scale), x - (4 * scale), cy + (2 * scale));
      ctx.lineTo(x + (4 * scale), cy + (2 * scale));
      ctx.quadraticCurveTo(x + bw, cy + (2 * scale), x + bw, cy + (10 * scale));
      ctx.lineTo(x + bw, cy + (16 * scale));
      ctx.quadraticCurveTo(x + bw, cy + bh, x + (9 * scale), cy + bh);
      ctx.lineTo(x - (9 * scale), cy + bh);
      ctx.quadraticCurveTo(x - bw, cy + bh, x - bw, cy + (16 * scale));
      ctx.closePath();
      ctx.fill();
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

      const cycleT = (frame % totalCycle) / totalCycle;
      const activeStep = Math.floor(cycleT * steps.length);
      const stepT = (cycleT * steps.length) % 1;

      // Spawn knowledge particles
      if (frame % 20 === 0) {
        const ti = Math.floor(Math.random() * clientTeam.length);
        knowParticles.push({ birth: frame, targetIdx: ti });
      }

      // ─── Navis guide (larger, teal, with pointer) ───
      drawPersonIcon(navisX, navisY, "rgb(0, 212, 170)", 0.55, 0, 1.2);

      // "NAVIS" label below
      ctx.font = '700 9px "Inter", sans-serif';
      ctx.fillStyle = "rgba(0, 212, 170, 0.6)";
      ctx.textAlign = "center";
      ctx.fillText("NAVIS GUIDE", navisX, navisY + 38);
      ctx.textAlign = "left";

      // Pointer arm from navis toward screen (animated)
      const pointerAngle = -0.3 + Math.sin(frame * 0.02) * 0.15;
      const armEndX = navisX + Math.cos(pointerAngle) * 60;
      const armEndY = navisY - 10 + Math.sin(pointerAngle) * 20;

      ctx.strokeStyle = "rgba(0, 212, 170, 0.25)";
      ctx.lineWidth = 2;
      ctx.lineCap = "round";
      ctx.beginPath();
      ctx.moveTo(navisX + 14, navisY - 2);
      ctx.quadraticCurveTo(navisX + 35, navisY - 15 + Math.sin(frame * 0.02) * 5, armEndX, armEndY);
      ctx.stroke();

      // Pointer dot
      ctx.beginPath();
      ctx.arc(armEndX, armEndY, 3, 0, Math.PI * 2);
      ctx.fillStyle = "rgba(0, 212, 170, 0.5)";
      ctx.fill();

      // ─── Guidance line from Navis to screen ───
      ctx.strokeStyle = "rgba(0, 212, 170, 0.08)";
      ctx.lineWidth = 1;
      ctx.setLineDash([3, 4]);
      ctx.beginPath();
      ctx.moveTo(navisX + 16, navisY);
      ctx.lineTo(scrX, scrY + scrH / 2);
      ctx.stroke();
      ctx.setLineDash([]);

      // ─── Central system screen ───
      ctx.fillStyle = "rgba(240, 243, 247, 0.95)";
      ctx.beginPath();
      ctx.roundRect(scrX, scrY, scrW, 20, [6, 6, 0, 0]);
      ctx.fill();
      drawDots(scrX, scrY);

      ctx.fillStyle = "rgba(255, 255, 255, 0.9)";
      ctx.beginPath();
      ctx.roundRect(scrX + 48, scrY + 3, scrW - 58, 14, 3);
      ctx.fill();
      ctx.font = '7px "Inter", sans-serif';
      ctx.fillStyle = "rgba(100, 116, 139, 0.45)";
      ctx.textAlign = "center";
      ctx.fillText("app.client-system.com", scrX + scrW / 2 + 16, scrY + 13);
      ctx.textAlign = "left";

      ctx.fillStyle = "rgba(249, 250, 252, 0.97)";
      ctx.beginPath();
      ctx.roundRect(scrX, scrY + 20, scrW, scrH - 20, [0, 0, 6, 6]);
      ctx.fill();
      ctx.strokeStyle = "rgba(203, 213, 225, 0.35)";
      ctx.lineWidth = 1;
      ctx.beginPath();
      ctx.roundRect(scrX, scrY, scrW, scrH, 6);
      ctx.stroke();

      // Clip screen
      ctx.save();
      ctx.beginPath();
      ctx.roundRect(scrX + 1, scrY + 21, scrW - 2, scrH - 22, [0, 0, 5, 5]);
      ctx.clip();

      const sx = scrX + 6;
      const sy = scrY + 26;
      const sw = scrW - 12;

      // Screen sections that highlight sequentially
      const sections = [
        { y: 0, h: 38, label: "Dashboard", color: "rgba(0, 212, 170," },
        { y: 42, h: 38, label: "Processes", color: "rgba(99, 102, 241," },
        { y: 84, h: 38, label: "AI Tools", color: "rgba(0, 212, 170," },
        { y: 126, h: 34, label: "Reports", color: "rgba(99, 102, 241," },
      ];

      sections.forEach((sec, si) => {
        const isActive = si === activeStep;
        const secY = sy + sec.y;

        // Section background
        ctx.fillStyle = isActive ? sec.color + "0.08)" : "rgba(255, 255, 255, 0.8)";
        ctx.beginPath();
        ctx.roundRect(sx, secY, sw, sec.h, 3);
        ctx.fill();

        // Highlight border
        if (isActive) {
          ctx.strokeStyle = sec.color + "0.3)";
          ctx.lineWidth = 1.5;
          ctx.beginPath();
          ctx.roundRect(sx, secY, sw, sec.h, 3);
          ctx.stroke();

          // Pulsing glow
          const pulse = 0.05 + Math.sin(frame * 0.08) * 0.03;
          ctx.fillStyle = sec.color + `${pulse})`;
          ctx.beginPath();
          ctx.roundRect(sx - 2, secY - 2, sw + 4, sec.h + 4, 5);
          ctx.fill();
        } else {
          ctx.strokeStyle = "rgba(226, 232, 240, 0.25)";
          ctx.lineWidth = 0.5;
          ctx.beginPath();
          ctx.roundRect(sx, secY, sw, sec.h, 3);
          ctx.stroke();
        }

        // Section content placeholder lines
        ctx.fillStyle = isActive ? sec.color + "0.2)" : "rgba(148, 163, 184, 0.1)";
        ctx.beginPath();
        ctx.roundRect(sx + 6, secY + 6, sw * 0.4, 8, 2);
        ctx.fill();
        ctx.beginPath();
        ctx.roundRect(sx + 6, secY + 18, sw * 0.7, 6, 2);
        ctx.fill();
        if (sec.h > 34) {
          ctx.beginPath();
          ctx.roundRect(sx + 6, secY + 28, sw * 0.5, 6, 2);
          ctx.fill();
        }

        // Section label
        ctx.font = isActive ? '700 8px "Inter", sans-serif' : '500 8px "Inter", sans-serif';
        ctx.fillStyle = isActive ? sec.color + "0.8)" : "rgba(148, 163, 184, 0.35)";
        ctx.textAlign = "right";
        ctx.fillText(sec.label, sx + sw - 6, secY + sec.h - 5);
        ctx.textAlign = "left";
      });

      ctx.restore(); // end screen clip

      // ─── Training step indicator below screen ───
      const indY = scrY + scrH + 16;
      ctx.font = '700 9px "Inter", sans-serif';
      ctx.fillStyle = "rgba(0, 212, 170, 0.6)";
      ctx.textAlign = "center";
      ctx.fillText(`TRAINING: ${steps[activeStep].label.toUpperCase()}`, scrX + scrW / 2, indY);

      // Step dots
      steps.forEach((_, si) => {
        const dotX = scrX + scrW / 2 - (steps.length * 8) / 2 + si * 12 + 4;
        const dotY = indY + 12;
        ctx.beginPath();
        ctx.arc(dotX, dotY, si === activeStep ? 3.5 : 2, 0, Math.PI * 2);
        ctx.fillStyle = si === activeStep
          ? "rgba(0, 212, 170, 0.8)"
          : si < activeStep
            ? "rgba(0, 212, 170, 0.3)"
            : "rgba(148, 163, 184, 0.2)";
        ctx.fill();
      });
      ctx.textAlign = "left";

      // ─── Knowledge transfer lines from screen to client team ───
      clientTeam.forEach((ct, ci) => {
        const fromX = scrX + scrW;
        const fromY = scrY + 40 + ci * 40;

        ctx.strokeStyle = "rgba(99, 102, 241, 0.06)";
        ctx.lineWidth = 1;
        ctx.setLineDash([2, 4]);
        ctx.beginPath();
        ctx.moveTo(fromX, fromY);
        ctx.quadraticCurveTo((fromX + ct.x) / 2, (fromY + ct.y) / 2 - 15, ct.x - 16, ct.y);
        ctx.stroke();
        ctx.setLineDash([]);
      });

      // ─── Knowledge particles (screen → client team) ───
      for (let pi = knowParticles.length - 1; pi >= 0; pi--) {
        const kp = knowParticles[pi];
        const age = frame - kp.birth;
        const life = 60;
        if (age > life) {
          knowParticles.splice(pi, 1);
          continue;
        }
        const t = age / life;
        const ease = t < 0.5 ? 2 * t * t : 1 - Math.pow(-2 * t + 2, 2) / 2;
        const alpha = t < 0.15 ? t / 0.15 : t > 0.8 ? (1 - t) / 0.2 : 1;

        const ct = clientTeam[kp.targetIdx];
        const fromX = scrX + scrW;
        const fromY = scrY + 40 + kp.targetIdx * 40;
        const midPX = (fromX + ct.x) / 2;
        const midPY = (fromY + ct.y) / 2 - 15;

        const px = (1 - ease) * (1 - ease) * fromX + 2 * (1 - ease) * ease * midPX + ease * ease * (ct.x - 16);
        const py = (1 - ease) * (1 - ease) * fromY + 2 * (1 - ease) * ease * midPY + ease * ease * ct.y;

        ctx.globalAlpha = alpha * 0.8;

        // Book / document icon
        ctx.fillStyle = "rgba(99, 102, 241, 0.7)";
        ctx.beginPath();
        ctx.roundRect(px - 3, py - 3, 6, 7, 1);
        ctx.fill();
        ctx.strokeStyle = "rgba(255, 255, 255, 0.4)";
        ctx.lineWidth = 0.5;
        ctx.beginPath();
        ctx.moveTo(px - 1, py - 1);
        ctx.lineTo(px + 1, py - 1);
        ctx.moveTo(px - 1, py + 1);
        ctx.lineTo(px + 2, py + 1);
        ctx.stroke();

        ctx.globalAlpha = 1;
      }

      // ─── Client team person icons ───
      clientTeam.forEach((ct, ci) => {
        const isLearning = Math.floor(cycleT * clientTeam.length * 2) % clientTeam.length === ci;

        if (isLearning) {
          ctx.beginPath();
          ctx.arc(ct.x, ct.y, 22, 0, Math.PI * 2);
          ctx.fillStyle = "rgba(99, 102, 241, 0.06)";
          ctx.fill();
        }

        drawPersonIcon(ct.x, ct.y, "rgb(99, 102, 241)", isLearning ? 0.5 : 0.3, ct.bobOff);

        // Progress ring around each team member
        const memberProgress = Math.max(0, Math.min(1, cycleT * 1.3 - ci * 0.1));
        if (memberProgress > 0) {
          ctx.strokeStyle = `rgba(0, 212, 170, ${0.3 * memberProgress})`;
          ctx.lineWidth = 2;
          ctx.beginPath();
          ctx.arc(ct.x, ct.y + 2, 20, -Math.PI / 2, -Math.PI / 2 + Math.PI * 2 * memberProgress);
          ctx.stroke();
        }

        // Completion check when progress ring is full
        if (memberProgress > 0.95) {
          const bx = ct.x + 14;
          const by = ct.y - 16;
          ctx.beginPath();
          ctx.arc(bx, by, 5, 0, Math.PI * 2);
          ctx.fillStyle = "rgba(0, 212, 170, 0.85)";
          ctx.fill();
          ctx.strokeStyle = "rgba(10, 22, 40, 0.9)";
          ctx.lineWidth = 1.2;
          ctx.lineCap = "round";
          ctx.lineJoin = "round";
          ctx.beginPath();
          ctx.moveTo(bx - 2.5, by);
          ctx.lineTo(bx - 0.5, by + 2);
          ctx.lineTo(bx + 2.5, by - 1.5);
          ctx.stroke();
        }
      });

      // ─── "YOUR TEAM" label ───
      ctx.font = '700 9px "Inter", sans-serif';
      ctx.fillStyle = "rgba(99, 102, 241, 0.5)";
      ctx.textAlign = "center";
      ctx.fillText("YOUR TEAM", teamX, scrY + scrH / 2 + 135);
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
        style={{ width: 520, height: 400 }}
        aria-label="Animated graphic showing the Navis team guiding and training the client's team on their new system"
        role="img"
      />
    </div>
  );
}
