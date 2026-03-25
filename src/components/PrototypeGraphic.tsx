import { useEffect, useRef } from "react";

export default function PrototypeGraphic() {
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

    const pad = 20;
    const winW = W - pad * 2;
    const winH = H - 60;
    const winY = 30;

    // Wireframe elements (same structure as RequirementsGraphic)
    const wireElements = [
      // Navbar
      { type: "rect" as const, x: 8, y: 8, w: winW - 16, h: 28, delay: 0 },
      { type: "rect" as const, x: 16, y: 15, w: 40, h: 14, delay: 10 },
      { type: "rect" as const, x: 66, y: 15, w: 28, h: 14, delay: 20 },
      { type: "rect" as const, x: 100, y: 15, w: 28, h: 14, delay: 25 },
      { type: "rect" as const, x: 134, y: 15, w: 28, h: 14, delay: 30 },
      { type: "rect" as const, x: winW - 80, y: 14, w: 56, h: 16, delay: 35 },
      // Hero
      { type: "rect" as const, x: 8, y: 44, w: winW - 16, h: 70, delay: 50 },
      { type: "line" as const, x1: 120, y1: 62, x2: winW - 120, y2: 62, delay: 60 },
      { type: "line" as const, x1: 160, y1: 78, x2: winW - 160, y2: 78, delay: 70 },
      { type: "rect" as const, x: winW / 2 - 44, y: 88, w: 88, h: 18, delay: 80 },
      // Stats cards
      { type: "rect" as const, x: 8, y: 124, w: (winW - 32) / 3, h: 60, delay: 100 },
      { type: "rect" as const, x: 8 + (winW - 32) / 3 + 8, y: 124, w: (winW - 32) / 3, h: 60, delay: 120 },
      { type: "rect" as const, x: 8 + ((winW - 32) / 3 + 8) * 2, y: 124, w: (winW - 32) / 3, h: 60, delay: 140 },
      // Card content lines
      { type: "line" as const, x1: 20, y1: 142, x2: 100, y2: 142, delay: 110 },
      { type: "line" as const, x1: 20, y1: 156, x2: 80, y2: 156, delay: 115 },
      { type: "line" as const, x1: 20 + (winW - 32) / 3 + 8, y1: 142, x2: 100 + (winW - 32) / 3 + 8, y2: 142, delay: 130 },
      { type: "line" as const, x1: 20 + (winW - 32) / 3 + 8, y1: 156, x2: 80 + (winW - 32) / 3 + 8, y2: 156, delay: 135 },
      { type: "line" as const, x1: 20 + ((winW - 32) / 3 + 8) * 2, y1: 142, x2: 100 + ((winW - 32) / 3 + 8) * 2, y2: 142, delay: 150 },
      { type: "line" as const, x1: 20 + ((winW - 32) / 3 + 8) * 2, y1: 156, x2: 80 + ((winW - 32) / 3 + 8) * 2, y2: 156, delay: 155 },
      // Table
      { type: "rect" as const, x: 8, y: 196, w: winW - 16, h: 100, delay: 170 },
      { type: "line" as const, x1: 8, y1: 216, x2: winW - 8, y2: 216, delay: 180 },
      { type: "line" as const, x1: 8, y1: 240, x2: winW - 8, y2: 240, delay: 190 },
      { type: "line" as const, x1: 8, y1: 264, x2: winW - 8, y2: 264, delay: 200 },
      { type: "line" as const, x1: 120, y1: 196, x2: 120, y2: 296, delay: 185 },
      { type: "line" as const, x1: 260, y1: 196, x2: 260, y2: 296, delay: 188 },
      { type: "line" as const, x1: 380, y1: 196, x2: 380, y2: 296, delay: 192 },
    ];

    let frame = 0;
    // Transition: 0→1 = wireframe fully drawn, 1→2 = morphing to real UI
    const totalCycle = 600; // frames per full cycle
    const wirePhase = 200;  // frames to draw wireframe
    const holdWire = 80;    // hold wireframe
    const morphPhase = 200; // morph to real UI
    const holdReal = 120;   // hold real UI

    function easeInOut(t: number) {
      return t < 0.5 ? 2 * t * t : 1 - Math.pow(-2 * t + 2, 2) / 2;
    }

    function drawDots(x: number, y: number) {
      ["rgba(255,95,87,0.7)", "rgba(255,189,46,0.7)", "rgba(39,201,63,0.7)"].forEach((c, i) => {
        ctx.beginPath();
        ctx.arc(x + 14 + i * 13, y + 11, 3.5, 0, Math.PI * 2);
        ctx.fillStyle = c;
        ctx.fill();
      });
    }

    function draw() {
      ctx.clearRect(0, 0, W, H);
      frame = (frame + 1) % totalCycle;

      // Calculate phase
      let wireP: number; // 0-1: how drawn the wireframe is
      let morphP: number; // 0-1: how morphed to real UI

      if (frame < wirePhase) {
        wireP = frame / wirePhase;
        morphP = 0;
      } else if (frame < wirePhase + holdWire) {
        wireP = 1;
        morphP = 0;
      } else if (frame < wirePhase + holdWire + morphPhase) {
        wireP = 1;
        morphP = easeInOut((frame - wirePhase - holdWire) / morphPhase);
      } else {
        wireP = 1;
        morphP = 1;
      }

      // ─── Window Chrome ───
      // Morph title bar from dark (blueprint) to light (real app)
      const barR = 240 * morphP + 30 * (1 - morphP);
      const barG = 243 * morphP + 58 * (1 - morphP);
      const barB = 247 * morphP + 95 * (1 - morphP);
      ctx.fillStyle = `rgba(${barR}, ${barG}, ${barB}, ${0.6 + morphP * 0.35})`;
      ctx.beginPath();
      ctx.roundRect(pad, winY, winW, 22, [6, 6, 0, 0]);
      ctx.fill();
      drawDots(pad, winY);

      // URL bar
      ctx.fillStyle = morphP > 0.5
        ? `rgba(255, 255, 255, ${morphP * 0.9})`
        : `rgba(10, 22, 40, ${0.5 - morphP * 0.5})`;
      ctx.beginPath();
      ctx.roundRect(pad + 56, winY + 4, winW - 68, 14, 3);
      ctx.fill();
      ctx.font = '7px "Inter", sans-serif';
      ctx.fillStyle = morphP > 0.5
        ? `rgba(100, 116, 139, ${morphP * 0.5})`
        : `rgba(148, 163, 184, ${0.4 - morphP * 0.4})`;
      ctx.textAlign = "center";
      ctx.fillText("app.navislabs.com/dashboard", pad + winW / 2 + 20, winY + 14);
      ctx.textAlign = "left";

      // ─── Body Background ───
      const bodyR = 249 * morphP + 10 * (1 - morphP);
      const bodyG = 250 * morphP + 22 * (1 - morphP);
      const bodyB = 252 * morphP + 40 * (1 - morphP);
      ctx.fillStyle = `rgba(${bodyR}, ${bodyG}, ${bodyB}, ${0.5 + morphP * 0.47})`;
      ctx.beginPath();
      ctx.roundRect(pad, winY + 22, winW, winH - 22, [0, 0, 6, 6]);
      ctx.fill();

      // Border
      ctx.strokeStyle = morphP > 0.5
        ? `rgba(203, 213, 225, ${morphP * 0.35})`
        : `rgba(30, 58, 95, ${0.35 - morphP * 0.35})`;
      ctx.lineWidth = 1;
      ctx.beginPath();
      ctx.roundRect(pad, winY, winW, winH, 6);
      ctx.stroke();

      // Clip content
      ctx.save();
      ctx.beginPath();
      ctx.roundRect(pad + 1, winY + 23, winW - 2, winH - 24, [0, 0, 5, 5]);
      ctx.clip();

      const ox = pad; // origin x
      const oy = winY + 22; // origin y
      const sweepX = ox + winW * morphP; // absolute sweep position
      const cw = (winW - 32) / 3;

      // ─── Draw wireframe (only right of sweep) ───
      if (morphP < 1) {
        ctx.save();
        if (morphP > 0) {
          // Clip to right of sweep line
          ctx.beginPath();
          ctx.rect(sweepX, oy, winW - (sweepX - ox), winH);
          ctx.clip();
        }

        const maxDelay = 200;
        for (const el of wireElements) {
          const elP = Math.max(0, Math.min(1, (wireP * (maxDelay + 40) - el.delay) / 30));
          if (elP <= 0) continue;

          ctx.globalAlpha = elP;
          ctx.strokeStyle = "rgba(148, 163, 184, 0.3)";
          ctx.lineWidth = 1;
          ctx.setLineDash([4, 3]);

          if (el.type === "rect") {
            const dw = el.w * Math.min(elP * 1.5, 1);
            const dh = el.h * Math.min(elP * 1.5, 1);
            ctx.beginPath();
            ctx.roundRect(ox + el.x, oy + el.y, dw, dh, 2);
            ctx.stroke();
            ctx.fillStyle = "rgba(148, 163, 184, 0.02)";
            ctx.fill();
          } else {
            const lp = Math.min(elP * 1.5, 1);
            ctx.beginPath();
            ctx.moveTo(ox + el.x1, oy + el.y1);
            ctx.lineTo(
              ox + el.x1 + (el.x2 - el.x1) * lp,
              oy + el.y1 + (el.y2 - el.y1) * lp
            );
            ctx.stroke();
          }
          ctx.setLineDash([]);
        }
        ctx.globalAlpha = 1;

        // Scan line during wireframe build
        if (wireP < 1) {
          const scanY = oy + (winH - 22) * wireP;
          ctx.strokeStyle = "rgba(0, 212, 170, 0.15)";
          ctx.lineWidth = 1;
          ctx.beginPath();
          ctx.moveTo(ox + 4, scanY);
          ctx.lineTo(ox + winW - 4, scanY);
          ctx.stroke();
          const sg = ctx.createLinearGradient(0, scanY - 8, 0, scanY + 8);
          sg.addColorStop(0, "rgba(0, 212, 170, 0)");
          sg.addColorStop(0.5, "rgba(0, 212, 170, 0.06)");
          sg.addColorStop(1, "rgba(0, 212, 170, 0)");
          ctx.fillStyle = sg;
          ctx.fillRect(ox + 4, scanY - 8, winW - 8, 16);
        }
        ctx.restore();
      }

      // ─── Draw real UI (only left of sweep) ───
      if (morphP > 0) {
        ctx.save();
        if (morphP < 1) {
          // Clip to left of sweep line
          ctx.beginPath();
          ctx.rect(ox, oy, sweepX - ox, winH);
          ctx.clip();
        }

        // Light body background behind real UI elements
        ctx.fillStyle = "rgba(249, 250, 252, 0.97)";
        ctx.fillRect(ox, oy, winW, winH - 22);

        // Navbar
        ctx.globalAlpha = 1;
        ctx.fillStyle = "rgba(255, 255, 255, 1)";
        ctx.beginPath();
        ctx.roundRect(ox + 8, oy + 8, winW - 16, 28, 4);
        ctx.fill();
        ctx.strokeStyle = "rgba(226, 232, 240, 0.5)";
        ctx.stroke();
        ctx.fillStyle = "rgba(0, 180, 150, 0.8)";
        ctx.beginPath();
        ctx.roundRect(ox + 16, oy + 15, 40, 14, 3);
        ctx.fill();
        for (let n = 0; n < 4; n++) {
          ctx.fillStyle = "rgba(100, 116, 139, 0.25)";
          ctx.beginPath();
          ctx.roundRect(ox + 66 + n * 34, oy + 17, 28, 10, 2);
          ctx.fill();
        }
        ctx.fillStyle = "rgba(0, 212, 170, 0.7)";
        ctx.beginPath();
        ctx.roundRect(ox + winW - 80, oy + 14, 56, 16, 4);
        ctx.fill();

        // Hero
        ctx.fillStyle = "rgba(248, 250, 252, 1)";
        ctx.beginPath();
        ctx.roundRect(ox + 8, oy + 44, winW - 16, 70, 4);
        ctx.fill();
        const heroGrad = ctx.createLinearGradient(ox + 8, oy + 44, ox + winW - 8, oy + 44);
        heroGrad.addColorStop(0, "rgba(0, 212, 170, 0.05)");
        heroGrad.addColorStop(1, "rgba(99, 102, 241, 0.05)");
        ctx.fillStyle = heroGrad;
        ctx.fillRect(ox + 8, oy + 44, winW - 16, 70);
        ctx.font = '700 11px "Inter", sans-serif';
        ctx.fillStyle = "rgba(15, 23, 42, 0.85)";
        ctx.textAlign = "center";
        ctx.fillText("Welcome to Your Dashboard", ox + winW / 2, oy + 68);
        ctx.font = '400 8px "Inter", sans-serif';
        ctx.fillStyle = "rgba(100, 116, 139, 0.6)";
        ctx.fillText("Real-time insights for your business", ox + winW / 2, oy + 82);
        ctx.fillStyle = "rgba(0, 212, 170, 0.8)";
        ctx.beginPath();
        ctx.roundRect(ox + winW / 2 - 44, oy + 90, 88, 18, 5);
        ctx.fill();
        ctx.font = '600 7px "Inter", sans-serif';
        ctx.fillStyle = "rgba(10, 22, 40, 0.9)";
        ctx.fillText("Get Started", ox + winW / 2, oy + 102);
        ctx.textAlign = "left";

        // Stat cards
        const stats = [
          { label: "Total Users", val: "2,847", accent: "rgba(0, 212, 170," },
          { label: "Active Orders", val: "384", accent: "rgba(99, 102, 241," },
          { label: "Revenue", val: "$128.4K", accent: "rgba(251, 191, 36," },
        ];
        stats.forEach((s, i) => {
          const cx = ox + 8 + i * (cw + 8);
          ctx.fillStyle = "rgba(255, 255, 255, 1)";
          ctx.beginPath();
          ctx.roundRect(cx, oy + 124, cw, 60, 5);
          ctx.fill();
          ctx.strokeStyle = "rgba(226, 232, 240, 0.4)";
          ctx.stroke();
          ctx.fillStyle = s.accent + "0.15)";
          ctx.beginPath();
          ctx.roundRect(cx, oy + 124, cw, 3, [5, 5, 0, 0]);
          ctx.fill();
          ctx.font = '700 12px "Inter", sans-serif';
          ctx.fillStyle = "rgba(15, 23, 42, 0.85)";
          ctx.fillText(s.val, cx + 12, oy + 148);
          ctx.font = '500 7px "Inter", sans-serif';
          ctx.fillStyle = "rgba(100, 116, 139, 0.5)";
          ctx.fillText(s.label, cx + 12, oy + 164);
        });

        // Table
        ctx.fillStyle = "rgba(255, 255, 255, 1)";
        ctx.beginPath();
        ctx.roundRect(ox + 8, oy + 196, winW - 16, 100, 5);
        ctx.fill();
        ctx.strokeStyle = "rgba(226, 232, 240, 0.4)";
        ctx.stroke();
        // Header
        ctx.fillStyle = "rgba(248, 250, 252, 1)";
        ctx.beginPath();
        ctx.roundRect(ox + 8, oy + 196, winW - 16, 20, [5, 5, 0, 0]);
        ctx.fill();
        const cols = ["Order #", "Customer", "Status", "Amount"];
        cols.forEach((col, ci) => {
          ctx.font = '600 7px "Inter", sans-serif';
          ctx.fillStyle = "rgba(71, 85, 105, 0.7)";
          ctx.fillText(col, ox + 16 + ci * ((winW - 32) / 4), oy + 210);
        });
        // Rows
        const rows = [
          { id: "#1042", cust: "Acme Corp", status: "Active", amt: "$2,400", sc: "rgba(0,180,150," },
          { id: "#1043", cust: "Globex Inc", status: "Pending", amt: "$890", sc: "rgba(202,138,4," },
          { id: "#1044", cust: "Initech", status: "Complete", amt: "$5,200", sc: "rgba(99,102,241," },
        ];
        rows.forEach((r, ri) => {
          const ry = oy + 220 + ri * 24;
          ctx.strokeStyle = "rgba(226, 232, 240, 0.2)";
          ctx.beginPath();
          ctx.moveTo(ox + 12, ry);
          ctx.lineTo(ox + winW - 12, ry);
          ctx.stroke();
          ctx.font = '500 7px "Inter", sans-serif';
          ctx.fillStyle = "rgba(71, 85, 105, 0.5)";
          const colW = (winW - 32) / 4;
          ctx.fillText(r.id, ox + 16, ry + 15);
          ctx.fillText(r.cust, ox + 16 + colW, ry + 15);
          // Status badge
          ctx.fillStyle = r.sc + "0.1)";
          ctx.beginPath();
          ctx.roundRect(ox + 16 + colW * 2, ry + 6, 36, 12, 4);
          ctx.fill();
          ctx.font = '600 6px "Inter", sans-serif';
          ctx.fillStyle = r.sc + "0.9)";
          ctx.fillText(r.status, ox + 20 + colW * 2, ry + 15);
          ctx.font = '600 7px "Inter", sans-serif';
          ctx.fillStyle = "rgba(15, 23, 42, 0.7)";
          ctx.fillText(r.amt, ox + 16 + colW * 3, ry + 15);
        });

        ctx.globalAlpha = 1;
        ctx.restore(); // end real UI clip
      }

      // ─── Sweep line shimmer ───
      if (morphP > 0 && morphP < 1) {
        const grad = ctx.createLinearGradient(sweepX - 30, 0, sweepX + 30, 0);
        grad.addColorStop(0, "rgba(0, 212, 170, 0)");
        grad.addColorStop(0.5, "rgba(0, 212, 170, 0.2)");
        grad.addColorStop(1, "rgba(0, 212, 170, 0)");
        ctx.fillStyle = grad;
        ctx.fillRect(sweepX - 30, oy, 60, winH - 22);

        // Bright sweep edge
        ctx.strokeStyle = "rgba(0, 212, 170, 0.4)";
        ctx.lineWidth = 1.5;
        ctx.beginPath();
        ctx.moveTo(sweepX, oy);
        ctx.lineTo(sweepX, oy + winH - 22);
        ctx.stroke();
      }

      ctx.restore(); // end main content clip

      // ─── Labels ───
      ctx.font = '600 10px "Inter", system-ui, sans-serif';
      ctx.textAlign = "center";

      if (morphP < 0.5) {
        // Wireframe label
        ctx.fillStyle = `rgba(148, 163, 184, ${0.5 * (1 - morphP * 2)})`;
        ctx.fillText("WIREFRAME BLUEPRINT", pad + winW / 2, winY + winH + 20);
      } else {
        // Real app label
        ctx.fillStyle = `rgba(0, 212, 170, ${0.5 * (morphP - 0.5) * 2})`;
        ctx.fillText("YOUR WORKING PROTOTYPE", pad + winW / 2, winY + winH + 20);
      }
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
        aria-label="Animated graphic showing a wireframe blueprint transforming into a working prototype application"
        role="img"
      />
    </div>
  );
}
