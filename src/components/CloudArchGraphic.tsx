import { useEffect, useRef } from "react";

export default function CloudArchGraphic() {
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

    // Cloud shape
    const cloudY = 140;

    function drawCloud(x: number, y: number, scale: number, opacity: number) {
      ctx.save();
      ctx.translate(x, y);
      ctx.scale(scale, scale);
      ctx.beginPath();
      // Cloud shape built from arcs
      ctx.arc(0, 0, 45, Math.PI * 0.9, Math.PI * 1.85);
      ctx.arc(35, -22, 30, Math.PI * 1.2, Math.PI * 1.9);
      ctx.arc(65, -5, 25, Math.PI * 1.35, Math.PI * 0.5);
      ctx.arc(55, 18, 18, 0, Math.PI * 0.3);
      ctx.arc(20, 22, 20, Math.PI * 0.05, Math.PI * 0.85);
      ctx.arc(-20, 18, 20, Math.PI * 0.15, Math.PI * 0.95);
      ctx.closePath();
      ctx.strokeStyle = `rgba(0, 212, 170, ${0.3 * opacity})`;
      ctx.lineWidth = 1.5;
      ctx.stroke();
      ctx.fillStyle = `rgba(0, 212, 170, ${0.03 * opacity})`;
      ctx.fill();
      ctx.restore();
    }

    // Server rack drawing
    const serverBaseY = 340;
    const serverW = 60;
    const serverH = 18;
    const serverGap = 4;
    const serverStackH = serverH * 3 + serverGap * 2;
    const serversPerRack = 3;

    interface ServerRack {
      x: number;
      baseCount: number;
    }

    const racks: ServerRack[] = [
      { x: cx - 100, baseCount: 3 },
      { x: cx, baseCount: 3 },
      { x: cx + 100, baseCount: 3 },
    ];

    // Scaling animation: servers count breathes between 3 and 5
    const scaleBreathDuration = 360; // 6s at 60fps

    // Floating particles
    interface Particle {
      x: number;
      y: number;
      speed: number;
      opacity: number;
      size: number;
    }

    const particles: Particle[] = [];
    let particleTimer = 0;

    function spawnParticle() {
      const rackIdx = Math.floor(Math.random() * 3);
      const rack = racks[rackIdx];
      particles.push({
        x: rack.x + (Math.random() - 0.5) * serverW * 0.6,
        y: serverBaseY - 10,
        speed: 0.4 + Math.random() * 0.5,
        opacity: 0.3 + Math.random() * 0.3,
        size: 1.5 + Math.random() * 1.5,
      });
    }

    // Seed particles
    for (let i = 0; i < 15; i++) {
      spawnParticle();
      particles[particles.length - 1].y = serverBaseY - Math.random() * (serverBaseY - cloudY - 40);
    }

    // Shield
    const shieldX = W - 75;
    const shieldY = 130;

    function drawShield(x: number, y: number, pulsePhase: number) {
      const pulse = 0.2 + Math.sin(pulsePhase) * 0.08;
      ctx.save();
      ctx.translate(x, y);

      // Shield shape
      ctx.beginPath();
      ctx.moveTo(0, -18);
      ctx.quadraticCurveTo(20, -14, 20, -4);
      ctx.quadraticCurveTo(20, 10, 0, 22);
      ctx.quadraticCurveTo(-20, 10, -20, -4);
      ctx.quadraticCurveTo(-20, -14, 0, -18);
      ctx.closePath();
      ctx.fillStyle = `rgba(0, 212, 170, ${0.06 + pulse * 0.1})`;
      ctx.fill();
      ctx.strokeStyle = `rgba(0, 212, 170, ${pulse})`;
      ctx.lineWidth = 1;
      ctx.stroke();

      // Checkmark inside
      ctx.beginPath();
      ctx.moveTo(-6, 2);
      ctx.lineTo(-1, 7);
      ctx.lineTo(8, -5);
      ctx.strokeStyle = `rgba(0, 212, 170, ${pulse + 0.15})`;
      ctx.lineWidth = 1.5;
      ctx.lineCap = "round";
      ctx.lineJoin = "round";
      ctx.stroke();

      ctx.restore();
    }

    let frame = 0;

    function drawServerUnit(x: number, y: number, opacity: number) {
      const bx = x - serverW / 2;
      const by = y;

      ctx.beginPath();
      ctx.roundRect(bx, by, serverW, serverH, 3);
      ctx.fillStyle = `rgba(30, 58, 95, ${0.45 * opacity})`;
      ctx.fill();
      ctx.strokeStyle = `rgba(148, 163, 184, ${0.15 * opacity})`;
      ctx.lineWidth = 0.8;
      ctx.stroke();

      // LED dot
      ctx.beginPath();
      ctx.arc(bx + 8, by + serverH / 2, 2, 0, Math.PI * 2);
      ctx.fillStyle = `rgba(0, 212, 170, ${0.5 * opacity})`;
      ctx.fill();

      // Vent lines
      for (let i = 0; i < 3; i++) {
        ctx.beginPath();
        ctx.moveTo(bx + 20 + i * 10, by + 5);
        ctx.lineTo(bx + 20 + i * 10, by + serverH - 5);
        ctx.strokeStyle = `rgba(148, 163, 184, ${0.08 * opacity})`;
        ctx.lineWidth = 0.5;
        ctx.stroke();
      }
    }

    function draw() {
      ctx.clearRect(0, 0, W, H);
      frame++;

      // Scaling breath: 3 -> 4 -> 5 -> 4 -> 3
      const breathT = (frame % scaleBreathDuration) / scaleBreathDuration;
      let extraServers: number;
      if (breathT < 0.25) {
        extraServers = breathT / 0.25 * 1; // 0 -> 1
      } else if (breathT < 0.5) {
        extraServers = 1 + (breathT - 0.25) / 0.25 * 1; // 1 -> 2
      } else if (breathT < 0.75) {
        extraServers = 2 - (breathT - 0.5) / 0.25 * 1; // 2 -> 1
      } else {
        extraServers = 1 - (breathT - 0.75) / 0.25 * 1; // 1 -> 0
      }

      const totalServers = 3 + Math.round(extraServers);

      // Draw cloud
      drawCloud(cx - 20, cloudY, 1.3, 1);

      // Cloud inner glow
      const cloudGlow = ctx.createRadialGradient(cx, cloudY, 20, cx, cloudY, 90);
      cloudGlow.addColorStop(0, "rgba(0, 212, 170, 0.06)");
      cloudGlow.addColorStop(1, "rgba(0, 212, 170, 0)");
      ctx.fillStyle = cloudGlow;
      ctx.fillRect(cx - 90, cloudY - 60, 180, 120);

      // Particles floating from servers to cloud
      particleTimer++;
      if (particleTimer > 6) {
        spawnParticle();
        particleTimer = 0;
      }

      for (let i = particles.length - 1; i >= 0; i--) {
        const p = particles[i];
        p.y -= p.speed;
        // Gentle drift toward center
        p.x += (cx - p.x) * 0.003;

        if (p.y < cloudY - 20) {
          particles.splice(i, 1);
          continue;
        }

        // Fade near cloud
        let pOpacity = p.opacity;
        if (p.y < cloudY + 30) {
          pOpacity *= (p.y - cloudY + 20) / 50;
        }

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(0, 212, 170, ${Math.max(0, pOpacity)})`;
        ctx.fill();
      }

      // Draw server racks
      for (const rack of racks) {
        for (let s = 0; s < totalServers; s++) {
          const serverY = serverBaseY + s * (serverH + serverGap);
          // Extra servers fade in/out
          let opacity = 1;
          if (s >= 3) {
            const fractional = extraServers - (s - 3);
            opacity = Math.max(0, Math.min(1, fractional));
          }
          if (opacity > 0) {
            drawServerUnit(rack.x, serverY, opacity);
          }
        }
      }

      // Connection lines from racks to cloud
      for (const rack of racks) {
        ctx.beginPath();
        ctx.moveTo(rack.x, serverBaseY - 5);
        ctx.lineTo(rack.x, cloudY + 40);
        ctx.strokeStyle = "rgba(0, 212, 170, 0.06)";
        ctx.lineWidth = 0.8;
        ctx.setLineDash([4, 4]);
        ctx.stroke();
        ctx.setLineDash([]);
      }

      // Shield
      drawShield(shieldX, shieldY, frame * 0.03);

      // Bottom label
      ctx.font = '600 10px "Inter", system-ui, sans-serif';
      ctx.letterSpacing = "2px";
      ctx.fillStyle = "rgba(99, 102, 241, 0.45)";
      ctx.textAlign = "center";
      ctx.fillText("INFINITE SCALE", cx, H - 50);

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
        aria-label="Animated graphic showing cloud infrastructure with auto-scaling servers"
        role="img"
      />
    </div>
  );
}
