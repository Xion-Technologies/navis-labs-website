import { useEffect, useRef } from "react";

export default function UATGraphic() {
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

    // Central app screen position
    const scrX = 160;
    const scrY = 20;
    const scrW = 200;
    const scrH = 200;

    // Stakeholders arranged in a semicircle below the screen
    const stakeholders = [
      { label: "Client", angle: -70, dist: 145, color: "rgb(99, 102, 241)", bobOff: 0 },
      { label: "User 1", angle: -35, dist: 155, color: "rgb(0, 212, 170)", bobOff: 1.2 },
      { label: "User 2", angle: 0, dist: 160, color: "rgb(0, 212, 170)", bobOff: 2.4 },
      { label: "User 3", angle: 35, dist: 155, color: "rgb(0, 212, 170)", bobOff: 3.6 },
      { label: "Manager", angle: 70, dist: 145, color: "rgb(99, 102, 241)", bobOff: 4.8 },
    ];

    // Center point for semicircle (below screen)
    const centerX = scrX + scrW / 2;
    const centerY = scrY + scrH + 10;

    // Compute stakeholder positions
    const stakeholderPos = stakeholders.map((s) => {
      const rad = (s.angle * Math.PI) / 180;
      return {
        ...s,
        x: centerX + Math.sin(rad) * s.dist,
        y: centerY + Math.cos(rad) * s.dist * 0.55 + 20,
      };
    });

    function drawPersonIcon(
      x: number, y: number, color: string, fillOpacity: number, bobOffset: number
    ) {
      const bob = Math.sin(frame * 0.03 + bobOffset) * 1.5;
      const cy = y + bob;
      const rgba = color.replace(")", `,${fillOpacity})`).replace("rgb", "rgba");

      ctx.beginPath();
      ctx.arc(x, cy - 8, 8, 0, Math.PI * 2);
      ctx.fillStyle = rgba;
      ctx.fill();

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

    function drawDots(x: number, y: number) {
      ["rgba(255,95,87,0.7)", "rgba(255,189,46,0.7)", "rgba(39,201,63,0.7)"].forEach((c, i) => {
        ctx.beginPath();
        ctx.arc(x + 12 + i * 11, y + 10, 3, 0, Math.PI * 2);
        ctx.fillStyle = c;
        ctx.fill();
      });
    }

    // Feedback checkmarks that pulse from stakeholders to screen
    interface Check {
      fromX: number;
      fromY: number;
      birth: number;
      si: number; // stakeholder index
    }
    const checks: Check[] = [];

    // Approval state per stakeholder (cycles)
    const approvalCycle = 500;

    function draw() {
      ctx.clearRect(0, 0, W, H);
      frame++;

      const cycleT = (frame % approvalCycle) / approvalCycle;

      // Spawn check particles
      if (frame % 60 === 0) {
        const si = Math.floor((frame / 60) % stakeholderPos.length);
        const s = stakeholderPos[si];
        checks.push({ fromX: s.x, fromY: s.y, birth: frame, si });
      }

      // ─── Connection lines from stakeholders to screen ───
      stakeholderPos.forEach((s, si) => {
        const approvalT = Math.max(0, Math.min(1, (cycleT * (stakeholderPos.length + 2) - si) / 1.5));
        const targetX = scrX + scrW / 2;
        const targetY = scrY + scrH;

        // Curved connection line
        const midX = (s.x + targetX) / 2;
        const midY = Math.min(s.y, targetY) - 20;

        ctx.strokeStyle = approvalT > 0.8
          ? `rgba(0, 212, 170, ${0.15 + approvalT * 0.1})`
          : `rgba(148, 163, 184, 0.08)`;
        ctx.lineWidth = 1;
        ctx.setLineDash([3, 4]);
        ctx.beginPath();
        ctx.moveTo(s.x, s.y - 10);
        ctx.quadraticCurveTo(midX, midY, targetX, targetY);
        ctx.stroke();
        ctx.setLineDash([]);

        // Traveling dot along the line
        if (approvalT > 0.1 && approvalT < 0.95) {
          const dotT = (cycleT * 8 + si * 0.7) % 1;
          const dt = dotT;
          const dx = (1 - dt) * (1 - dt) * s.x + 2 * (1 - dt) * dt * midX + dt * dt * targetX;
          const dy = (1 - dt) * (1 - dt) * (s.y - 10) + 2 * (1 - dt) * dt * midY + dt * dt * targetY;

          ctx.beginPath();
          ctx.arc(dx, dy, 2, 0, Math.PI * 2);
          ctx.fillStyle = `rgba(0, 212, 170, ${0.6 * Math.sin(dotT * Math.PI)})`;
          ctx.fill();
        }
      });

      // ─── Central app screen ───
      // Title bar
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
      ctx.fillText("app.navislabs.com", scrX + scrW / 2 + 16, scrY + 13);
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

      // Clip screen
      ctx.save();
      ctx.beginPath();
      ctx.roundRect(scrX + 1, scrY + 21, scrW - 2, scrH - 22, [0, 0, 5, 5]);
      ctx.clip();

      const sx = scrX + 6;
      const sy = scrY + 26;
      const sw = scrW - 12;

      // Mini nav
      ctx.fillStyle = "rgba(255, 255, 255, 1)";
      ctx.beginPath();
      ctx.roundRect(sx, sy, sw, 16, 3);
      ctx.fill();
      ctx.fillStyle = "rgba(0, 180, 150, 0.7)";
      ctx.beginPath();
      ctx.roundRect(sx + 4, sy + 3, 24, 10, 2);
      ctx.fill();
      for (let n = 0; n < 3; n++) {
        ctx.fillStyle = "rgba(148, 163, 184, 0.2)";
        ctx.beginPath();
        ctx.roundRect(sx + 34 + n * 26, sy + 4, 20, 8, 2);
        ctx.fill();
      }

      // Dashboard cards
      const cardW = (sw - 12) / 3;
      const cards = [
        { val: "2,847", label: "Users", accent: "rgba(0, 212, 170," },
        { val: "384", label: "Orders", accent: "rgba(99, 102, 241," },
        { val: "$128K", label: "Revenue", accent: "rgba(251, 191, 36," },
      ];
      cards.forEach((c, i) => {
        const cx = sx + 2 + i * (cardW + 4);
        ctx.fillStyle = "rgba(255, 255, 255, 1)";
        ctx.beginPath();
        ctx.roundRect(cx, sy + 20, cardW, 32, 3);
        ctx.fill();
        ctx.strokeStyle = "rgba(226, 232, 240, 0.3)";
        ctx.stroke();
        ctx.fillStyle = c.accent + "0.15)";
        ctx.beginPath();
        ctx.roundRect(cx, sy + 20, cardW, 2, [3, 3, 0, 0]);
        ctx.fill();
        ctx.font = '700 9px "Inter", sans-serif';
        ctx.fillStyle = "rgba(15, 23, 42, 0.8)";
        ctx.fillText(c.val, cx + 6, sy + 36);
        ctx.font = '500 6px "Inter", sans-serif';
        ctx.fillStyle = "rgba(100, 116, 139, 0.5)";
        ctx.fillText(c.label, cx + 6, sy + 46);
      });

      // Table
      ctx.fillStyle = "rgba(255, 255, 255, 1)";
      ctx.beginPath();
      ctx.roundRect(sx + 2, sy + 58, sw - 4, 50, 3);
      ctx.fill();
      ctx.fillStyle = "rgba(248, 250, 252, 1)";
      ctx.beginPath();
      ctx.roundRect(sx + 2, sy + 58, sw - 4, 12, [3, 3, 0, 0]);
      ctx.fill();
      for (let r = 0; r < 3; r++) {
        ctx.strokeStyle = "rgba(226, 232, 240, 0.2)";
        ctx.beginPath();
        ctx.moveTo(sx + 4, sy + 72 + r * 12);
        ctx.lineTo(sx + sw - 6, sy + 72 + r * 12);
        ctx.stroke();
      }

      // AI chat widget
      ctx.fillStyle = "rgba(0, 212, 170, 0.08)";
      ctx.beginPath();
      ctx.roundRect(sx + 2, sy + 114, sw * 0.5, 14, 6);
      ctx.fill();
      ctx.fillStyle = "rgba(99, 102, 241, 0.06)";
      ctx.beginPath();
      ctx.roundRect(sx + sw * 0.35, sy + 132, sw * 0.6, 14, 6);
      ctx.fill();

      // Pulsing "APPROVED" overlay when cycle completes
      if (cycleT > 0.85) {
        const fadeIn = (cycleT - 0.85) / 0.15;
        ctx.fillStyle = `rgba(0, 212, 170, ${0.06 * fadeIn})`;
        ctx.fillRect(scrX, scrY + 20, scrW, scrH - 20);

        ctx.globalAlpha = fadeIn;
        // Checkmark circle
        const chkX = scrX + scrW / 2;
        const chkY = scrY + scrH / 2 + 10;
        ctx.beginPath();
        ctx.arc(chkX, chkY, 20, 0, Math.PI * 2);
        ctx.fillStyle = "rgba(0, 212, 170, 0.15)";
        ctx.fill();
        ctx.beginPath();
        ctx.arc(chkX, chkY, 14, 0, Math.PI * 2);
        ctx.fillStyle = "rgba(0, 212, 170, 0.25)";
        ctx.fill();

        // Checkmark
        ctx.strokeStyle = "rgba(0, 212, 170, 0.9)";
        ctx.lineWidth = 2.5;
        ctx.lineCap = "round";
        ctx.lineJoin = "round";
        ctx.beginPath();
        ctx.moveTo(chkX - 6, chkY);
        ctx.lineTo(chkX - 1, chkY + 5);
        ctx.lineTo(chkX + 7, chkY - 5);
        ctx.stroke();

        ctx.globalAlpha = 1;
      }

      ctx.restore(); // end screen clip

      // ─── Stakeholder person icons ───
      stakeholderPos.forEach((s, si) => {
        const approvalT = Math.max(0, Math.min(1, (cycleT * (stakeholderPos.length + 2) - si) / 1.5));
        const isApproved = approvalT > 0.9;

        // Approval glow
        if (isApproved) {
          ctx.beginPath();
          ctx.arc(s.x, s.y, 24, 0, Math.PI * 2);
          ctx.fillStyle = "rgba(0, 212, 170, 0.06)";
          ctx.fill();
        }

        drawPersonIcon(s.x, s.y, s.color, isApproved ? 0.6 : 0.35, s.bobOff);

        // Approval checkmark badge
        if (isApproved) {
          const badgeX = s.x + 12;
          const badgeY = s.y - 18;
          ctx.beginPath();
          ctx.arc(badgeX, badgeY, 6, 0, Math.PI * 2);
          ctx.fillStyle = "rgba(0, 212, 170, 0.9)";
          ctx.fill();

          ctx.strokeStyle = "rgba(10, 22, 40, 0.9)";
          ctx.lineWidth = 1.5;
          ctx.lineCap = "round";
          ctx.lineJoin = "round";
          ctx.beginPath();
          ctx.moveTo(badgeX - 3, badgeY);
          ctx.lineTo(badgeX - 0.5, badgeY + 2.5);
          ctx.lineTo(badgeX + 3, badgeY - 2);
          ctx.stroke();
        }

        // Label
        ctx.font = '500 8px "Inter", sans-serif';
        ctx.fillStyle = isApproved ? "rgba(0, 212, 170, 0.6)" : "rgba(148, 163, 184, 0.35)";
        ctx.textAlign = "center";
        ctx.fillText(s.label, s.x, s.y + 30);
        ctx.textAlign = "left";
      });

      // ─── Feedback check particles ───
      for (let ci = checks.length - 1; ci >= 0; ci--) {
        const c = checks[ci];
        const age = frame - c.birth;
        const life = 50;
        if (age > life) {
          checks.splice(ci, 1);
          continue;
        }
        const t = age / life;
        const ease = t < 0.5 ? 2 * t * t : 1 - Math.pow(-2 * t + 2, 2) / 2;
        const alpha = t < 0.15 ? t / 0.15 : t > 0.85 ? (1 - t) / 0.15 : 1;

        const s = stakeholderPos[c.si];
        const midXp = (s.x + scrX + scrW / 2) / 2;
        const midYp = Math.min(s.y, scrY + scrH) - 30;
        const dt = ease;
        const px = (1 - dt) * (1 - dt) * s.x + 2 * (1 - dt) * dt * midXp + dt * dt * (scrX + scrW / 2);
        const py = (1 - dt) * (1 - dt) * (s.y - 10) + 2 * (1 - dt) * dt * midYp + dt * dt * (scrY + scrH);

        ctx.globalAlpha = alpha;
        // Checkmark icon
        ctx.strokeStyle = "rgba(0, 212, 170, 0.8)";
        ctx.lineWidth = 1.5;
        ctx.lineCap = "round";
        ctx.beginPath();
        ctx.moveTo(px - 3, py);
        ctx.lineTo(px - 0.5, py + 2.5);
        ctx.lineTo(px + 3.5, py - 2.5);
        ctx.stroke();
        ctx.globalAlpha = 1;
      }

      // ─── Bottom label ───
      ctx.font = '600 10px "Inter", system-ui, sans-serif';
      ctx.fillStyle = "rgba(148, 163, 184, 0.35)";
      ctx.textAlign = "center";
      ctx.fillText("STAKEHOLDER ALIGNMENT & APPROVAL", W / 2, H - 12);
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
        aria-label="Animated graphic showing stakeholders reviewing and approving the system with checkmark validations"
        role="img"
      />
    </div>
  );
}
