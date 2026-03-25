import { useEffect, useRef } from "react";

export default function MaintenanceGraphic() {
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

    // Layout
    const scrX = 160;
    const scrY = 20;
    const scrW = 200;
    const scrH = 180;

    // Client position (left of screen)
    const clientX = 70;
    const clientY = scrY + scrH / 2 + 10;

    // Navis member (slides in from right)
    const navisRestX = W + 40; // offscreen right
    const navisTargetX = W - 70;
    const navisY = scrY + scrH / 2 + 10;

    // Animation phases
    const totalCycle = 600;
    const phase1End = 100;  // client alone with system
    const phase2End = 220;  // speech bubbles appear
    const phase3End = 340;  // navis slides in
    const phase4End = 500;  // enhancement happens
    // 500-600: hold enhanced state then reset

    // Speech bubble messages
    const bubbles = [
      "I want to add a new feature!",
      "I want to add a new AI tool!",
    ];

    function drawPersonIcon(
      x: number, y: number, color: string, opacity: number, bobOff: number, scale = 1
    ) {
      const bob = Math.sin(frame * 0.03 + bobOff) * 1.5;
      const cy = y + bob;
      const rgba = color.replace(")", `,${opacity})`).replace("rgb", "rgba");
      const r = 8 * scale;

      ctx.beginPath();
      ctx.arc(x, cy - r, r, 0, Math.PI * 2);
      ctx.fillStyle = rgba;
      ctx.fill();

      ctx.beginPath();
      const bw = 12 * scale;
      ctx.moveTo(x - bw, cy + 10 * scale);
      ctx.quadraticCurveTo(x - bw, cy + 2 * scale, x - 4 * scale, cy + 2 * scale);
      ctx.lineTo(x + 4 * scale, cy + 2 * scale);
      ctx.quadraticCurveTo(x + bw, cy + 2 * scale, x + bw, cy + 10 * scale);
      ctx.lineTo(x + bw, cy + 16 * scale);
      ctx.quadraticCurveTo(x + bw, cy + 19 * scale, x + 9 * scale, cy + 19 * scale);
      ctx.lineTo(x - 9 * scale, cy + 19 * scale);
      ctx.quadraticCurveTo(x - bw, cy + 19 * scale, x - bw, cy + 16 * scale);
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

    function drawBubble(x: number, y: number, text: string, alpha: number, tailDir: "left" | "right", color: string) {
      if (alpha < 0.01) return;
      ctx.globalAlpha = alpha;

      ctx.font = '500 8px "Inter", sans-serif';
      const lines = wrapText(text, 110);
      const lineH = 12;
      const bw = 120;
      const bh = lines.length * lineH + 12;
      const bx = x - bw / 2;
      const by = y - bh;

      // Shadow
      ctx.fillStyle = `rgba(0, 0, 0, 0.15)`;
      ctx.beginPath();
      ctx.roundRect(bx + 2, by + 2, bw, bh, 8);
      ctx.fill();

      // Bubble bg
      ctx.fillStyle = color === "teal"
        ? "rgba(0, 212, 170, 0.12)"
        : "rgba(99, 102, 241, 0.12)";
      ctx.beginPath();
      ctx.roundRect(bx, by, bw, bh, 8);
      ctx.fill();
      ctx.strokeStyle = color === "teal"
        ? "rgba(0, 212, 170, 0.3)"
        : "rgba(99, 102, 241, 0.3)";
      ctx.lineWidth = 1;
      ctx.stroke();

      // Tail
      const tailX = tailDir === "left" ? bx + 16 : bx + bw - 16;
      ctx.fillStyle = color === "teal"
        ? "rgba(0, 212, 170, 0.12)"
        : "rgba(99, 102, 241, 0.12)";
      ctx.beginPath();
      ctx.moveTo(tailX - 5, by + bh);
      ctx.lineTo(tailX, by + bh + 8);
      ctx.lineTo(tailX + 5, by + bh);
      ctx.fill();

      // Text
      ctx.fillStyle = color === "teal"
        ? "rgba(0, 212, 170, 0.9)"
        : "rgba(99, 102, 241, 0.9)";
      ctx.textAlign = "left";
      lines.forEach((line, li) => {
        ctx.fillText(line, bx + 8, by + 14 + li * lineH);
      });

      ctx.globalAlpha = 1;
    }

    function wrapText(text: string, maxW: number): string[] {
      const words = text.split(" ");
      const lines: string[] = [];
      let current = "";
      ctx.font = '500 8px "Inter", sans-serif';
      for (const word of words) {
        const test = current ? current + " " + word : word;
        if (ctx.measureText(test).width > maxW && current) {
          lines.push(current);
          current = word;
        } else {
          current = test;
        }
      }
      if (current) lines.push(current);
      return lines;
    }

    // Enhancement particles
    interface EnhParticle {
      birth: number;
      startX: number;
      startY: number;
      endX: number;
      endY: number;
      type: "code" | "ai" | "gear";
    }
    const enhParticles: EnhParticle[] = [];

    function draw() {
      ctx.clearRect(0, 0, W, H);
      frame++;
      const cycleFrame = frame % totalCycle;
      const t = cycleFrame / totalCycle;

      // ─── Phase calculations ───
      // Bubble 1 alpha
      const bubble1Alpha = cycleFrame < phase1End ? 0
        : cycleFrame < phase1End + 40 ? (cycleFrame - phase1End) / 40
        : cycleFrame < phase4End ? 1
        : cycleFrame < phase4End + 30 ? 1 - (cycleFrame - phase4End) / 30 : 0;

      // Bubble 2 alpha (appears 60 frames after bubble 1)
      const b2Start = phase1End + 60;
      const bubble2Alpha = cycleFrame < b2Start ? 0
        : cycleFrame < b2Start + 40 ? (cycleFrame - b2Start) / 40
        : cycleFrame < phase4End ? 1
        : cycleFrame < phase4End + 30 ? 1 - (cycleFrame - phase4End) / 30 : 0;

      // Navis slide-in (stays permanently once in)
      const slideStart = phase2End;
      const slideT = Math.max(0, Math.min(1, (cycleFrame - slideStart) / 80));
      const slideEase = slideT < 0.5 ? 2 * slideT * slideT : 1 - Math.pow(-2 * slideT + 2, 2) / 2;
      const navisX = navisRestX + (navisTargetX - navisRestX) * slideEase;
      const navisVisible = cycleFrame >= slideStart;

      // Enhancement progress
      const enhStart = phase3End;
      const enhP = Math.max(0, Math.min(1, (cycleFrame - enhStart) / 120));

      // Spawn enhancement particles
      if (cycleFrame > enhStart && cycleFrame < phase4End && cycleFrame % 6 === 0 && navisVisible) {
        enhParticles.push({
          birth: frame,
          startX: navisX,
          startY: navisY - 10,
          endX: scrX + 20 + Math.random() * (scrW - 40),
          endY: scrY + 30 + Math.random() * (scrH - 50),
          type: ["code", "ai", "gear"][Math.floor(Math.random() * 3)] as "code" | "ai" | "gear",
        });
      }

      // ─── Connection line client → screen ───
      ctx.strokeStyle = "rgba(99, 102, 241, 0.08)";
      ctx.lineWidth = 1;
      ctx.setLineDash([3, 4]);
      ctx.beginPath();
      ctx.moveTo(clientX + 16, clientY);
      ctx.lineTo(scrX, scrY + scrH / 2 + 10);
      ctx.stroke();
      ctx.setLineDash([]);

      // ─── Connection line navis → screen ───
      if (navisVisible && slideEase > 0.3) {
        ctx.globalAlpha = slideEase;
        ctx.strokeStyle = "rgba(0, 212, 170, 0.08)";
        ctx.lineWidth = 1;
        ctx.setLineDash([3, 4]);
        ctx.beginPath();
        ctx.moveTo(navisX - 16, navisY);
        ctx.lineTo(scrX + scrW, scrY + scrH / 2 + 10);
        ctx.stroke();
        ctx.setLineDash([]);
        ctx.globalAlpha = 1;
      }

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

      // Screen body
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

      // Existing modules
      const existingModules = [
        { y: 0, h: 20, label: "Dashboard", color: "rgba(0, 212, 170," },
        { y: 24, h: 30, label: "Processes", color: "rgba(99, 102, 241," },
        { y: 58, h: 30, label: "Reports", color: "rgba(0, 212, 170," },
        { y: 92, h: 24, label: "Settings", color: "rgba(99, 102, 241," },
      ];

      existingModules.forEach((mod) => {
        ctx.fillStyle = "rgba(255, 255, 255, 0.9)";
        ctx.beginPath();
        ctx.roundRect(sx, sy + mod.y, sw, mod.h, 3);
        ctx.fill();
        ctx.strokeStyle = mod.color + "0.15)";
        ctx.beginPath();
        ctx.roundRect(sx, sy + mod.y, sw, mod.h, 3);
        ctx.stroke();

        // Content placeholder
        ctx.fillStyle = mod.color + "0.1)";
        ctx.beginPath();
        ctx.roundRect(sx + 4, sy + mod.y + 5, sw * 0.5, 6, 2);
        ctx.fill();
        if (mod.h > 22) {
          ctx.beginPath();
          ctx.roundRect(sx + 4, sy + mod.y + 15, sw * 0.7, 5, 2);
          ctx.fill();
        }

        ctx.font = '600 7px "Inter", sans-serif';
        ctx.fillStyle = mod.color + "0.5)";
        ctx.textAlign = "right";
        ctx.fillText(mod.label, sx + sw - 4, sy + mod.y + mod.h - 4);
        ctx.textAlign = "left";
      });

      // New modules appearing with enhancement
      if (enhP > 0.1) {
        const newModules = [
          { y: 120, h: 24, label: "New Feature", color: "rgba(0, 212, 170," },
          { y: 148, h: 24, label: "AI Tools", color: "rgba(99, 102, 241," },
        ];

        newModules.forEach((mod, mi) => {
          const modP = Math.max(0, Math.min(1, (enhP - 0.2 - mi * 0.2) / 0.3));
          if (modP <= 0) return;

          ctx.globalAlpha = modP;

          // Glow
          ctx.fillStyle = mod.color + "0.06)";
          ctx.beginPath();
          ctx.roundRect(sx - 2, sy + mod.y - 2, sw + 4, mod.h + 4, 5);
          ctx.fill();

          // Module
          ctx.fillStyle = "rgba(255, 255, 255, 0.95)";
          ctx.beginPath();
          ctx.roundRect(sx, sy + mod.y, sw * Math.min(modP * 1.5, 1), mod.h, 3);
          ctx.fill();
          ctx.strokeStyle = mod.color + "0.3)";
          ctx.lineWidth = 1.5;
          ctx.beginPath();
          ctx.roundRect(sx, sy + mod.y, sw, mod.h, 3);
          ctx.stroke();

          // Accent bar
          ctx.fillStyle = mod.color + "0.25)";
          ctx.beginPath();
          ctx.roundRect(sx, sy + mod.y, sw * modP, 2.5, [3, 3, 0, 0]);
          ctx.fill();

          // Content
          if (modP > 0.5) {
            ctx.fillStyle = mod.color + "0.15)";
            ctx.beginPath();
            ctx.roundRect(sx + 4, sy + mod.y + 7, sw * 0.5, 6, 2);
            ctx.fill();
          }

          // Label with "NEW" badge
          ctx.font = '700 7px "Inter", sans-serif';
          ctx.fillStyle = mod.color + "0.8)";
          ctx.textAlign = "right";
          ctx.fillText(mod.label, sx + sw - 4, sy + mod.y + mod.h - 5);

          // NEW badge
          const badgeW = 22;
          ctx.fillStyle = mod.color + "0.2)";
          ctx.beginPath();
          ctx.roundRect(sx + 4, sy + mod.y + mod.h - 13, badgeW, 10, 3);
          ctx.fill();
          ctx.font = '700 5px "Inter", sans-serif';
          ctx.fillStyle = mod.color + "0.9)";
          ctx.textAlign = "left";
          ctx.fillText("NEW", sx + 8, sy + mod.y + mod.h - 5.5);

          ctx.textAlign = "left";
          ctx.globalAlpha = 1;
        });
      }

      ctx.restore(); // end screen clip

      // ─── Enhancement particles ───
      for (let pi = enhParticles.length - 1; pi >= 0; pi--) {
        const p = enhParticles[pi];
        const age = frame - p.birth;
        const life = 45;
        if (age > life) { enhParticles.splice(pi, 1); continue; }

        const pt = age / life;
        const ease = pt < 0.5 ? 2 * pt * pt : 1 - Math.pow(-2 * pt + 2, 2) / 2;
        const alpha = pt < 0.15 ? pt / 0.15 : pt > 0.8 ? (1 - pt) / 0.2 : 1;

        const px = p.startX + (p.endX - p.startX) * ease;
        const py = p.startY + (p.endY - p.startY) * ease;

        ctx.globalAlpha = alpha * 0.8;
        if (p.type === "code") {
          ctx.font = '700 7px "SF Mono", monospace';
          ctx.fillStyle = "rgba(0, 212, 170, 0.8)";
          ctx.textAlign = "center";
          ctx.fillText("</>", px, py + 3);
          ctx.textAlign = "left";
        } else if (p.type === "ai") {
          ctx.fillStyle = "rgba(99, 102, 241, 0.7)";
          ctx.beginPath();
          ctx.arc(px, py, 3.5, 0, Math.PI * 2);
          ctx.fill();
          ctx.font = '700 5px "Inter", sans-serif';
          ctx.fillStyle = "rgba(255, 255, 255, 0.7)";
          ctx.textAlign = "center";
          ctx.fillText("AI", px, py + 2);
          ctx.textAlign = "left";
        } else {
          // Gear
          ctx.strokeStyle = "rgba(0, 212, 170, 0.6)";
          ctx.lineWidth = 1;
          ctx.beginPath();
          ctx.arc(px, py, 3, 0, Math.PI * 2);
          ctx.stroke();
          ctx.beginPath();
          ctx.arc(px, py, 1.5, 0, Math.PI * 2);
          ctx.fillStyle = "rgba(0, 212, 170, 0.4)";
          ctx.fill();
        }
        ctx.globalAlpha = 1;
      }

      // ─── Client person icon ───
      drawPersonIcon(clientX, clientY, "rgb(99, 102, 241)", 0.5, 0, 1.1);
      ctx.font = '700 9px "Inter", sans-serif';
      ctx.fillStyle = "rgba(99, 102, 241, 0.5)";
      ctx.textAlign = "center";
      ctx.fillText("CLIENT", clientX, clientY + 36);
      ctx.textAlign = "left";

      // ─── Client speech bubbles ───
      const bubbleX = clientX + 10;
      drawBubble(bubbleX, clientY - 30, bubbles[0], bubble1Alpha, "left", "indigo");
      drawBubble(bubbleX + 10, clientY - 70, bubbles[1], bubble2Alpha, "left", "indigo");

      // ─── Navis member (slides in) ───
      if (navisVisible) {
        ctx.globalAlpha = slideEase;
        drawPersonIcon(navisX, navisY, "rgb(0, 212, 170)", 0.55, 2, 1.1);
        ctx.font = '700 9px "Inter", sans-serif';
        ctx.fillStyle = `rgba(0, 212, 170, ${0.5 * slideEase})`;
        ctx.textAlign = "center";
        ctx.fillText("NAVIS", navisX, navisY + 36);
        ctx.textAlign = "left";
        ctx.globalAlpha = 1;

        // Navis speech bubble after slide-in
        if (slideEase > 0.8 && cycleFrame < phase4End) {
          const navisBubbleAlpha = Math.min(1, (slideEase - 0.8) / 0.2);
          drawBubble(navisX - 10, navisY - 30, "We've got you! Let's enhance your system.", navisBubbleAlpha, "right", "teal");
        }
      }

      // ─── Bottom label (pill badge, centered below screen) ───
      const labelY = scrY + scrH + 38;
      const labelText = enhP > 0.5 ? "CONTINUOUS ENHANCEMENT" : "ONGOING MAINTENANCE & SUPPORT";
      ctx.font = '700 10px "Inter", system-ui, sans-serif';
      const labelW = ctx.measureText(labelText).width + 28;
      const labelX = scrX + scrW / 2 - labelW / 2;

      // Pill background
      const pillColor = enhP > 0.5 ? "rgba(0, 212, 170," : "rgba(148, 163, 184,";
      ctx.fillStyle = pillColor + "0.08)";
      ctx.beginPath();
      ctx.roundRect(labelX, labelY, labelW, 26, 13);
      ctx.fill();
      ctx.strokeStyle = pillColor + "0.2)";
      ctx.lineWidth = 1;
      ctx.beginPath();
      ctx.roundRect(labelX, labelY, labelW, 26, 13);
      ctx.stroke();

      // Text
      ctx.fillStyle = pillColor + (enhP > 0.5 ? "0.7)" : "0.5)");
      ctx.textAlign = "center";
      ctx.fillText(labelText, scrX + scrW / 2, labelY + 17);
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
        aria-label="Animated graphic showing ongoing maintenance where the client requests features and Navis enhances the system"
        role="img"
      />
    </div>
  );
}
