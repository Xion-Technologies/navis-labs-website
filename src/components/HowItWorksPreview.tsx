import { useEffect, useRef, useState, useCallback } from "react";
import { Link } from "react-router-dom";
import { useAnimationGate } from "@/hooks/useAnimationGate";

/* ── Node data (world coordinates) ── */
const nodes = [
  {
    label: "Discovery Meeting",
    sub: "01",
    desc: "We learn your goals, constraints, and\nvision in a focused strategy session.",
    wx: 0,
    wy: 0,
  },
  {
    label: "3-Day Prototype",
    sub: "02",
    desc: "A working prototype delivered in 72 hours\nso you can see and feel the direction.",
    wx: 500,
    wy: -360,
  },
  {
    label: "Build & Deploy",
    sub: "03",
    desc: "Full production build with CI/CD,\ntesting, and launch-ready infrastructure.",
    wx: 1050,
    wy: -160,
  },
  {
    label: "Ongoing Support",
    sub: "04",
    desc: "Continuous iteration, monitoring,\nand improvements post-launch.",
    wx: 1600,
    wy: -500,
  },
];

const links: [number, number][] = [
  [0, 1],
  [1, 2],
  [2, 3],
];

function lerp(a: number, b: number, t: number) {
  return a + (b - a) * t;
}

/* ── Background stars ── */
interface BgStar {
  x: number;
  y: number;
  r: number;
  b: number;
  tw: number;
  depth: number;
}
interface ScatterStar {
  x: number;
  y: number;
  r: number;
  b: number;
  tw: number;
}

function generateBgStars(): BgStar[] {
  const arr: BgStar[] = [];
  for (let i = 0; i < 500; i++) {
    arr.push({
      x: (Math.random() - 0.5) * 4000,
      y: (Math.random() - 0.5) * 2500,
      r: 0.2 + Math.random() * 1.5,
      b: 0.04 + Math.random() * 0.3,
      tw: 0.4 + Math.random() * 3,
      depth: 0.2 + Math.random() * 0.8,
    });
  }
  return arr;
}

function generateScatterStars(): ScatterStar[] {
  const arr: ScatterStar[] = [];
  for (let i = 0; i < 100; i++) {
    const ni = Math.floor(Math.random() * nodes.length);
    const n = nodes[ni];
    arr.push({
      x: n.wx + (Math.random() - 0.5) * 600,
      y: n.wy + (Math.random() - 0.5) * 450,
      r: 0.3 + Math.random() * 2,
      b: 0.08 + Math.random() * 0.35,
      tw: 0.8 + Math.random() * 3,
    });
  }
  return arr;
}

/* ── Camera target from scroll progress ── */
function getNodeTarget(t: number) {
  const total = nodes.length - 1;
  const idx = t * total;
  let i = Math.floor(idx);
  let frac = idx - i;
  if (i >= total) {
    i = total - 1;
    frac = 1;
  }
  if (i < 0) {
    i = 0;
    frac = 0;
  }
  const a = nodes[i];
  const b = nodes[Math.min(i + 1, nodes.length - 1)];
  return { x: lerp(a.wx, b.wx, frac), y: lerp(a.wy, b.wy, frac) };
}

function getCurrentNodeIndex(t: number) {
  const total = nodes.length - 1;
  return Math.min(Math.round(t * total), total);
}

/* ── Main Component ── */
export default function HowItWorksPreview() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const stickyRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const hintRef = useRef<HTMLSpanElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);
  const [currentNode, setCurrentNode] = useState(0);
  const [entered, setEntered] = useState(false);
  const nodeIndexRef = useRef(0);
  const scrollRafRef = useRef(0);
  const { shouldAnimate } = useAnimationGate(sectionRef, { rootMargin: "300px 0px" });

  // Mutable state for the animation loop (avoids re-renders)
  const stateRef = useRef({
    camX: 0,
    camY: 0,
    scrollT: 0,
    t: 0,
    hintGone: false,
    bgStars: null as BgStar[] | null,
    scatterStars: null as ScatterStar[] | null,
    W: 0,
    H: 0,
    dpr: 1,
    raf: 0,
  });

  /* ── Scroll progress from page scroll ── */
  const handleScroll = useCallback(() => {
    const section = sectionRef.current;
    if (!section) return;

    const rect = section.getBoundingClientRect();
    const windowH = window.innerHeight;
    // Total scrollable distance = section height minus the viewport
    const totalScroll = rect.height - windowH;
    if (totalScroll <= 0) return;

    // raw goes 0→1 as the section scrolls through
    const raw = -rect.top / totalScroll;
    const progress = Math.min(Math.max(raw, 0), 1);

    const s = stateRef.current;

    // Remap: camera reaches last node at 75% scroll, then dwells for 25%
    const cameraProgress = Math.min(progress / 0.75, 1);
    s.scrollT = cameraProgress;

    // Fade the hint after a small amount of scroll
    if (!s.hintGone && progress > 0.02) {
      s.hintGone = true;
      if (hintRef.current) hintRef.current.style.opacity = "0";
    }

    const ci = getCurrentNodeIndex(cameraProgress);
    if (ci !== nodeIndexRef.current) {
      nodeIndexRef.current = ci;
      setCurrentNode(ci);
    }
  }, []);

  // Intersection observer for section entry
  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setEntered(true);
          observer.disconnect();
        }
      },
      { threshold: 0.05 }
    );
    observer.observe(section);

    // Attach to the main page scroll
    const onScroll = () => {
      if (scrollRafRef.current) return;
      scrollRafRef.current = requestAnimationFrame(() => {
        scrollRafRef.current = 0;
        handleScroll();
      });
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    handleScroll();

    return () => {
      observer.disconnect();
      window.removeEventListener("scroll", onScroll);
      if (scrollRafRef.current) {
        cancelAnimationFrame(scrollRafRef.current);
      }
    };
  }, [handleScroll]);

  // Canvas animation loop
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    if (!shouldAnimate) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const s = stateRef.current;
    s.dpr = Math.min(window.devicePixelRatio || 1, window.innerWidth <= 1024 ? 1.3 : 1.6);
    s.bgStars = generateBgStars();
    s.scatterStars = generateScatterStars();

    function resize() {
      const r = canvas!.parentElement!.getBoundingClientRect();
      s.W = Math.round(r.width * s.dpr);
      s.H = Math.round(r.height * s.dpr);
      canvas!.width = s.W;
      canvas!.height = s.H;
      canvas!.style.width = r.width + "px";
      canvas!.style.height = r.height + "px";
    }

    function worldToScreen(wx: number, wy: number, depth?: number) {
      const d = depth || 1;
      return {
        x: (wx - s.camX * d) + s.W / 2,
        y: (wy - s.camY * d) + s.H * 0.55,
      };
    }

    /*
     * ── Volumetric nebula system ──
     * Teal (#00D4AA) → Indigo (#6366F1) palette from the heading gradient.
     * Multiple depth layers, each with several tendrils that flow independently.
     * Each tendril is 3–4 overlapping radial blobs that drift at different
     * rates, creating thick gas-like volume with visible internal flow.
     */

    // Pseudo-random but deterministic
    function hash(n: number) { return ((Math.sin(n * 127.1 + 311.7) * 43758.5453) % 1 + 1) % 1; }

    // Palette: teal core → mid-blend → indigo edge
    const TEAL  = [0, 212, 170] as const;   // #00D4AA
    const MID   = [50, 155, 200] as const;  // teal-indigo halfway
    const INDIGO = [99, 102, 241] as const; // #6366F1
    const DEEP  = [60, 50, 160] as const;   // deeper indigo
    const GLOW  = [130, 200, 230] as const; // bright highlight

    interface Tendril {
      anchorX: number; anchorY: number;
      depth: number;
      blobs: {
        offsetAngle: number; offsetDist: number; radius: number;
        driftSpeed: number; driftAmp: number; driftPhase: number;
        driftSpeed2: number; driftAmp2: number; driftPhase2: number;
        color: readonly [number, number, number]; alpha: number;
      }[];
    }

    // Build tendrils spread across the world space
    const tendrils: Tendril[] = [];

    function makeTendril(
      ax: number, ay: number, depth: number, blobCount: number,
      spread: number, baseAlpha: number, seed: number
    ) {
      const blobs: Tendril["blobs"] = [];
      const colors = [TEAL, MID, INDIGO, DEEP, GLOW];
      for (let i = 0; i < blobCount; i++) {
        const h = hash(seed + i * 17.3);
        const h2 = hash(seed + i * 31.7);
        const h3 = hash(seed + i * 53.1);
        const h4 = hash(seed + i * 79.9);
        blobs.push({
          offsetAngle: h * Math.PI * 2,
          offsetDist: spread * (0.3 + h2 * 0.7),
          radius: (0.18 + h3 * 0.35),
          driftSpeed: 0.015 + h * 0.04,
          driftAmp: 40 + h2 * 80,
          driftPhase: h3 * Math.PI * 2,
          driftSpeed2: 0.01 + h4 * 0.03,
          driftAmp2: 30 + h4 * 60,
          driftPhase2: h * Math.PI * 2 + 1.5,
          color: colors[Math.floor(h4 * colors.length)],
          alpha: baseAlpha * (0.6 + h2 * 0.4),
        });
      }
      tendrils.push({ anchorX: ax, anchorY: ay, depth, blobs });
    }

    // Layer 1: deep background volume (slow parallax, large, faint)
    makeTendril(-100, 50, 0.12, 5, 200, 0.055, 1);
    makeTendril(700, -250, 0.1, 5, 250, 0.05, 2);
    makeTendril(1400, -400, 0.12, 5, 220, 0.05, 3);

    // Layer 2: mid-depth flowing gas (visible color, moderate movement)
    makeTendril(100, -50, 0.28, 6, 180, 0.065, 10);
    makeTendril(500, -350, 0.25, 6, 200, 0.06, 11);
    makeTendril(900, -150, 0.3, 6, 190, 0.06, 12);
    makeTendril(1300, -500, 0.25, 5, 170, 0.055, 13);

    // Layer 3: foreground wisps (faster drift, smaller, brighter)
    makeTendril(200, -200, 0.45, 4, 120, 0.05, 20);
    makeTendril(600, -100, 0.5, 4, 130, 0.045, 21);
    makeTendril(1050, -300, 0.45, 4, 140, 0.05, 22);
    makeTendril(1550, -350, 0.4, 4, 110, 0.045, 23);

    /* ── Drawing functions ── */
    function drawBackground() {
      ctx!.fillStyle = "#050d18";
      ctx!.fillRect(0, 0, s.W, s.H);
    }

    function drawNebula(time: number) {
      const vmin = Math.min(s.W, s.H);

      for (const tendril of tendrils) {
        for (const blob of tendril.blobs) {
          // Each blob drifts on two independent sinusoidal axes → swirling flow
          const flowX = Math.sin(time * blob.driftSpeed + blob.driftPhase) * blob.driftAmp;
          const flowY = Math.cos(time * blob.driftSpeed2 + blob.driftPhase2) * blob.driftAmp2;

          const blobWX = tendril.anchorX + Math.cos(blob.offsetAngle) * blob.offsetDist + flowX;
          const blobWY = tendril.anchorY + Math.sin(blob.offsetAngle) * blob.offsetDist + flowY;

          const p = worldToScreen(blobWX, blobWY, tendril.depth);
          const r = blob.radius * vmin;

          // Cull
          if (p.x < -r * 1.2 || p.x > s.W + r * 1.2 || p.y < -r * 1.2 || p.y > s.H + r * 1.2) continue;

          const [cr, cg, cb] = blob.color;

          // Thick volumetric gradient — dense core that tapers slowly
          const g = ctx!.createRadialGradient(p.x, p.y, 0, p.x, p.y, r);
          g.addColorStop(0, `rgba(${cr}, ${cg}, ${cb}, ${blob.alpha})`);
          g.addColorStop(0.15, `rgba(${cr}, ${cg}, ${cb}, ${blob.alpha * 0.75})`);
          g.addColorStop(0.35, `rgba(${cr}, ${cg}, ${cb}, ${blob.alpha * 0.45})`);
          g.addColorStop(0.6, `rgba(${cr}, ${cg}, ${cb}, ${blob.alpha * 0.15})`);
          g.addColorStop(0.85, `rgba(${cr}, ${cg}, ${cb}, ${blob.alpha * 0.04})`);
          g.addColorStop(1, `rgba(${cr}, ${cg}, ${cb}, 0)`);
          ctx!.beginPath();
          ctx!.arc(p.x, p.y, r, 0, Math.PI * 2);
          ctx!.fillStyle = g;
          ctx!.fill();
        }
      }
    }

    function drawBgStars(time: number) {
      if (!s.bgStars) return;
      for (const star of s.bgStars) {
        const p = worldToScreen(star.x, star.y, star.depth);
        if (p.x < -20 || p.x > s.W + 20 || p.y < -20 || p.y > s.H + 20) continue;
        const tw = 0.5 + 0.5 * Math.sin(time * star.tw + star.x * 0.01);
        const alpha = star.b * tw;
        const r = star.r * s.dpr;
        // Small stars: simple fill. Larger stars: soft radial gradient
        if (r < 1.2) {
          ctx!.beginPath();
          ctx!.arc(p.x, p.y, r, 0, Math.PI * 2);
          ctx!.fillStyle = `rgba(180, 210, 235, ${alpha})`;
          ctx!.fill();
        } else {
          const g = ctx!.createRadialGradient(p.x, p.y, 0, p.x, p.y, r * 2.5);
          g.addColorStop(0, `rgba(200, 220, 240, ${alpha})`);
          g.addColorStop(0.4, `rgba(180, 210, 235, ${alpha * 0.3})`);
          g.addColorStop(1, "rgba(160, 200, 230, 0)");
          ctx!.beginPath();
          ctx!.arc(p.x, p.y, r * 2.5, 0, Math.PI * 2);
          ctx!.fillStyle = g;
          ctx!.fill();
        }
      }
    }

    function drawScatterStars(time: number) {
      if (!s.scatterStars) return;
      for (const star of s.scatterStars) {
        const p = worldToScreen(star.x, star.y);
        if (p.x < -40 || p.x > s.W + 40 || p.y < -40 || p.y > s.H + 40) continue;
        const tw = 0.5 + 0.5 * Math.sin(time * star.tw + star.x * 0.02);
        const alpha = star.b * tw;
        const r = star.r * s.dpr;
        if (r < 1.2) {
          ctx!.beginPath();
          ctx!.arc(p.x, p.y, r, 0, Math.PI * 2);
          ctx!.fillStyle = `rgba(200, 225, 245, ${alpha})`;
          ctx!.fill();
        } else {
          const g = ctx!.createRadialGradient(p.x, p.y, 0, p.x, p.y, r * 2.5);
          g.addColorStop(0, `rgba(210, 230, 250, ${alpha})`);
          g.addColorStop(0.4, `rgba(190, 215, 240, ${alpha * 0.3})`);
          g.addColorStop(1, "rgba(170, 200, 230, 0)");
          ctx!.beginPath();
          ctx!.arc(p.x, p.y, r * 2.5, 0, Math.PI * 2);
          ctx!.fillStyle = g;
          ctx!.fill();
        }
      }
    }

    /* ── Gaseous light streak: densely packed gradient orbs with wispy jitter ── */
    // Pre-compute deterministic jitter offsets so they don't flicker per frame
    const beamJitter: number[] = [];
    for (let i = 0; i < 600; i++) {
      beamJitter.push((Math.sin(i * 73.37) * 0.5 + Math.cos(i * 127.13) * 0.5));
    }

    function drawBeamStreak(
      ax: number, ay: number,
      bx: number, by: number,
      intensity: number
    ) {
      const dx = bx - ax;
      const dy = by - ay;
      const len = Math.sqrt(dx * dx + dy * dy);
      if (len < 1) return;

      // Perpendicular direction for wispy offset
      const nx = -dy / len;
      const ny = dx / len;

      // Dense spacing — orbs overlap heavily so no individual dots visible
      const step = 3 * s.dpr;
      const count = Math.ceil(len / step);

      /* Pass 1 — wide atmospheric fog */
      const fogR = 50 * s.dpr * intensity;
      for (let i = 0; i <= count; i++) {
        const t = i / count;
        // Perpendicular jitter for organic wispy edges
        const jIdx = i % beamJitter.length;
        const jitter = beamJitter[jIdx] * 14 * s.dpr * intensity;
        const x = ax + dx * t + nx * jitter;
        const y = ay + dy * t + ny * jitter;
        const edgeFade = Math.sin(t * Math.PI);
        const alpha = 0.02 * intensity * edgeFade;

        const g = ctx!.createRadialGradient(x, y, 0, x, y, fogR);
        g.addColorStop(0, `rgba(0, 212, 170, ${alpha})`);
        g.addColorStop(0.4, `rgba(0, 200, 175, ${alpha * 0.4})`);
        g.addColorStop(1, "rgba(0, 180, 165, 0)");
        ctx!.beginPath();
        ctx!.arc(x, y, fogR, 0, Math.PI * 2);
        ctx!.fillStyle = g;
        ctx!.fill();
      }

      /* Pass 2 — brighter inner glow, tighter */
      const glowR = 18 * s.dpr * intensity;
      for (let i = 0; i <= count; i++) {
        const t = i / count;
        const jIdx = i % beamJitter.length;
        const jitter = beamJitter[jIdx] * 5 * s.dpr * intensity;
        const x = ax + dx * t + nx * jitter;
        const y = ay + dy * t + ny * jitter;
        const edgeFade = Math.sin(t * Math.PI);
        const alpha = 0.04 * intensity * edgeFade;

        const g = ctx!.createRadialGradient(x, y, 0, x, y, glowR);
        g.addColorStop(0, `rgba(0, 225, 190, ${alpha})`);
        g.addColorStop(0.5, `rgba(0, 210, 178, ${alpha * 0.35})`);
        g.addColorStop(1, "rgba(0, 195, 165, 0)");
        ctx!.beginPath();
        ctx!.arc(x, y, glowR, 0, Math.PI * 2);
        ctx!.fillStyle = g;
        ctx!.fill();
      }
    }

    function drawBeams() {
      for (const link of links) {
        const a = nodes[link[0]];
        const b = nodes[link[1]];
        const pa = worldToScreen(a.wx, a.wy);
        const pb = worldToScreen(b.wx, b.wy);
        if (pa.x < -200 && pb.x < -200) continue;
        if (pa.x > s.W + 200 && pb.x > s.W + 200) continue;
        const midX = (pa.x + pb.x) / 2;
        const midY = (pa.y + pb.y) / 2;
        const dist = Math.sqrt((midX - s.W / 2) ** 2 + (midY - s.H / 2) ** 2);
        const maxD = Math.sqrt(s.W * s.W + s.H * s.H) / 2;
        const intensity = Math.max(0.15, 1 - dist / maxD);
        drawBeamStreak(pa.x, pa.y, pb.x, pb.y, intensity);
      }
    }

    /* ── Node glow: layered radial gradients, no strokes anywhere ── */
    function drawNode(
      cx: number, cy: number,
      size: number, brightness: number,
      time: number, idx: number
    ) {
      const pulse = 0.96 + 0.04 * Math.sin(time * 1.0 + idx * 2.2);
      const b = brightness * pulse;
      const sz = size * s.dpr;

      /* Layer 1 — wide atmospheric bloom (very large, very faint) */
      const g4 = ctx!.createRadialGradient(cx, cy, 0, cx, cy, sz * 8);
      g4.addColorStop(0, `rgba(0, 212, 170, ${0.04 * b})`);
      g4.addColorStop(0.25, `rgba(0, 190, 160, ${0.018 * b})`);
      g4.addColorStop(0.6, `rgba(10, 22, 40, ${0.008 * b})`);
      g4.addColorStop(1, "rgba(5, 13, 24, 0)");
      ctx!.beginPath();
      ctx!.arc(cx, cy, sz * 8, 0, Math.PI * 2);
      ctx!.fillStyle = g4;
      ctx!.fill();

      /* Layer 2 — mid bloom, warmer teal */
      const g3 = ctx!.createRadialGradient(cx, cy, 0, cx, cy, sz * 3.5);
      g3.addColorStop(0, `rgba(0, 220, 180, ${0.09 * b})`);
      g3.addColorStop(0.35, `rgba(0, 200, 170, ${0.035 * b})`);
      g3.addColorStop(1, "rgba(0, 160, 140, 0)");
      ctx!.beginPath();
      ctx!.arc(cx, cy, sz * 3.5, 0, Math.PI * 2);
      ctx!.fillStyle = g3;
      ctx!.fill();

      /* Layer 3 — inner warm glow */
      const g2 = ctx!.createRadialGradient(cx, cy, 0, cx, cy, sz * 1.6);
      g2.addColorStop(0, `rgba(220, 250, 245, ${0.5 * b})`);
      g2.addColorStop(0.2, `rgba(120, 230, 210, ${0.25 * b})`);
      g2.addColorStop(0.6, `rgba(0, 200, 170, ${0.08 * b})`);
      g2.addColorStop(1, "rgba(0, 180, 160, 0)");
      ctx!.beginPath();
      ctx!.arc(cx, cy, sz * 1.6, 0, Math.PI * 2);
      ctx!.fillStyle = g2;
      ctx!.fill();

      /* Layer 4 — hot white core, tiny and bright */
      const g1 = ctx!.createRadialGradient(cx, cy, 0, cx, cy, sz * 0.5);
      g1.addColorStop(0, `rgba(255, 255, 255, ${0.9 * b})`);
      g1.addColorStop(0.3, `rgba(230, 255, 250, ${0.5 * b})`);
      g1.addColorStop(1, "rgba(200, 240, 235, 0)");
      ctx!.beginPath();
      ctx!.arc(cx, cy, sz * 0.5, 0, Math.PI * 2);
      ctx!.fillStyle = g1;
      ctx!.fill();
    }

    function drawNodes(time: number) {
      for (let i = 0; i < nodes.length; i++) {
        const n = nodes[i];
        const p = worldToScreen(n.wx, n.wy);
        if (p.x < -300 || p.x > s.W + 300 || p.y < -300 || p.y > s.H + 300) continue;

        const dist = Math.sqrt((p.x - s.W / 2) ** 2 + (p.y - s.H * 0.55) ** 2);
        const maxD = Math.sqrt(s.W * s.W + s.H * s.H) / 2;
        const closeness = Math.max(0, 1 - dist / (maxD * 0.45));
        const nodeSize = 4 + closeness * 18;
        const brightness = 0.15 + closeness * 0.85;

        drawNode(p.x, p.y, nodeSize, brightness, time, i);

        /* Labels — stacked above node: step number → big gap → title */
        if (closeness > 0.1) {
          const labelAlpha = Math.min(1, (closeness - 0.1) * 2);
          const titleFs = Math.round(lerp(13, 30, closeness)) * s.dpr;
          const stepFs = Math.round(lerp(9, 13, closeness)) * s.dpr;

          /*
           * Layout (bottom-up from node center):
           *   stepY   ← step label baseline
           *   BIG GAP ← titleFs + 20px fixed minimum
           *   titleY  ← title baseline
           *   clearance
           *   [node]
           */
          const glowClearance = nodeSize * s.dpr * 3.2;
          const titleY = p.y - glowClearance;
          // Gap = full title font size + generous fixed padding
          const gap = titleFs + Math.round(20 * s.dpr);
          const stepY = titleY - gap;

          ctx!.save();
          ctx!.textAlign = "center";

          /* Step number — well above the title */
          ctx!.font = `700 ${stepFs}px "Fira Code", "Courier New", monospace`;
          ctx!.fillStyle = `rgba(0, 212, 170, ${labelAlpha * 0.75})`;
          ctx!.fillText("STEP " + n.sub, p.x, stepY);

          /* Title */
          ctx!.font = `800 ${titleFs}px "Inter", ui-sans-serif, system-ui, sans-serif`;
          ctx!.fillStyle = `rgba(241, 245, 249, ${labelAlpha})`;
          ctx!.fillText(n.label, p.x, titleY);

          /* Description — below the node */
          if (closeness > 0.3) {
            const descAlpha = Math.min(1, (closeness - 0.3) * 2.5);
            const descFs = Math.round(titleFs * 0.42);
            ctx!.font = `400 ${descFs}px "Inter", ui-sans-serif, system-ui, sans-serif`;
            ctx!.fillStyle = `rgba(148, 163, 184, ${descAlpha * 0.85})`;
            const descLines = n.desc.split("\n");
            const baseY = p.y + nodeSize * s.dpr * 3.5;
            for (let l = 0; l < descLines.length; l++) {
              ctx!.fillText(descLines[l], p.x, baseY + l * descFs * 1.6);
            }

            /* Position the CTA button below the last node's description */
            if (i === nodes.length - 1 && ctaRef.current) {
              const lastLineY = baseY + (descLines.length - 1) * descFs * 1.6;
              // Convert from canvas coords (dpr-scaled) to CSS pixels
              const cssX = p.x / s.dpr;
              const cssY = (lastLineY + descFs * 2.5) / s.dpr;
              ctaRef.current.style.left = `${cssX}px`;
              ctaRef.current.style.top = `${cssY}px`;
              ctaRef.current.style.transform = "translateX(-50%)";
            }
          }

          ctx!.restore();
        }
      }
    }

    /* ── Main loop ── */
    resize();

    let previousTs = 0;
    let lowQuality = false;

    function loop(ts: number) {
      if (previousTs > 0) {
        lowQuality = ts - previousTs > 20;
      }
      previousTs = ts;
      s.t += 0.016;
      const target = getNodeTarget(s.scrollT);
      s.camX += (target.x - s.camX) * 0.07;
      s.camY += (target.y - s.camY) * 0.07;

      drawBackground();
      if (!lowQuality) {
        drawNebula(s.t);
      }
      drawBgStars(s.t);
      drawScatterStars(s.t);
      drawBeams();
      drawNodes(s.t);
      s.raf = requestAnimationFrame(loop);
    }

    s.raf = requestAnimationFrame(loop);
    window.addEventListener("resize", resize, { passive: true });

    return () => {
      cancelAnimationFrame(s.raf);
      window.removeEventListener("resize", resize);
    };
  }, [shouldAnimate]);

  const counterText =
    String("0" + (currentNode + 1)).slice(-2) + " / 0" + nodes.length;

  return (
    <section
      ref={sectionRef}
      className="relative"
      style={{ height: "500vh" }}
    >
      {/* Sticky viewport — pins the canvas to screen while section scrolls */}
      <div
        ref={stickyRef}
        className="sticky top-0 h-screen w-full overflow-hidden"
      >
        {/* Header — matches site heading pattern */}
        <div
          className="pointer-events-none absolute top-0 right-0 left-0 z-10 px-6 pt-10 pb-8 sm:px-12 lg:px-16"
          style={{
            background:
              "linear-gradient(180deg, rgba(5,13,24,0.95) 0%, rgba(5,13,24,0.6) 60%, rgba(5,13,24,0) 100%)",
            opacity: entered ? 1 : 0,
            transform: entered ? "translateY(0)" : "translateY(-12px)",
            transition: "opacity 0.8s ease, transform 0.8s ease",
          }}
        >
          <span className="text-xs font-bold uppercase tracking-[0.2em] text-teal">
            Our Process
          </span>
          <h2 className="mt-3 text-3xl font-extrabold leading-tight tracking-tight text-white sm:text-4xl lg:text-5xl">
            From Idea to Impact —{" "}
            <span className="bg-gradient-to-r from-teal to-indigo bg-clip-text text-transparent">
              In Days, Not Months
            </span>
          </h2>
        </div>

        {/* Canvas */}
        <canvas
          ref={canvasRef}
          className="absolute inset-0 block h-full w-full"
        />

        {/* Scroll hint */}
        <span
          ref={hintRef}
          className="pointer-events-none absolute bottom-7 left-1/2 z-[11] -translate-x-1/2 text-[11px] font-bold uppercase tracking-[0.2em] text-neutral-dark/40"
          style={{
            fontFamily: "'Fira Code', 'Courier New', monospace",
            transition: "opacity 0.8s ease",
          }}
        >
          Scroll to explore
        </span>

        {/* Node counter */}
        <div
          className="pointer-events-none absolute right-6 bottom-7 z-[11] text-xs tracking-[1px] text-neutral-dark/35 sm:right-12"
          style={{
            fontFamily: "'Fira Code', 'Courier New', monospace",
            transition: "opacity 0.5s ease",
          }}
        >
          {counterText}
        </div>

        {/* CTA - positioned below step 4 description via canvas coords */}
        <div
          ref={ctaRef}
          className="absolute z-[11] transition-opacity duration-500"
          style={{
            opacity: currentNode === nodes.length - 1 ? 1 : 0,
            pointerEvents:
              currentNode === nodes.length - 1 ? "auto" : "none",
          }}
        >
          <Link
            to="/how-it-works"
            className="group inline-flex items-center gap-2 rounded-full border border-teal/20 bg-teal/[0.06] px-8 py-3.5 text-base font-semibold text-teal transition-all duration-300 hover:border-teal/40 hover:bg-teal/10 hover:shadow-lg hover:shadow-teal/10"
          >
            See the Full Process
            <svg
              className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-0.5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
              aria-hidden="true"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M13 7l5 5m0 0l-5 5m5-5H6"
              />
            </svg>
          </Link>
        </div>
      </div>
    </section>
  );
}
