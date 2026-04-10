import { useEffect, useRef } from "react";
import { useAnimationGate } from "@/hooks/useAnimationGate";

const buzzwords = [
  "ChatGPT", "Claude", "Gemini", "Copilot", "Midjourney",
  "Perplexity", "GPT-4o", "Cursor AI", "Llama 3", "Mistral",
  "DALL·E 3", "Sora", "Whisper", "Synthesia", "LangChain",
  "AutoGPT", "CrewAI", "Hugging Face", "TensorFlow", "PyTorch",
  "Pinecone", "Weaviate", "RAG", "Vector DB", "Fine-tuning",
  "Prompt Eng.", "Embeddings", "Neural Nets", "Transformers",
  "Multi-modal", "LLM", "AI Agents", "Machine Learning", "NLP",
  "Computer Vision", "Deep Learning", "Diffusion", "Tokenization",
  "Few-shot", "Zero-shot", "Chain of Thought", "Semantic Search",
  "Edge AI", "Knowledge Graphs", "Federated Learning", "MLflow",
  "Reinforcement", "Retrieval Aug.", "Model Distillation",
  "Stable Diffusion", "ElevenLabs", "Notion AI", "Zapier AI",
];

interface Particle {
  x: number;
  y: number;
  homeX: number;
  homeY: number;
  vx: number;
  vy: number;
  label: string;
  targetLabel: string;
  displayLabel: string;
  typingIndex: number;
  typingPhase: "typing" | "holding" | "erasing";
  phaseTimer: number;
  labelWidth: number;
  opacity: number;
  glowRadius: number;
}

// Dynamic count: ~1 particle per 30,000 px², clamped 18–55
function getParticleCount(w: number, h: number) {
  const area = w * h;
  return Math.min(55, Math.max(18, Math.round(area / 30000)));
}
const MOUSE_RADIUS = 200;
const MOUSE_ATTRACT = 0.00004;
const DRIFT_SPEED = 0.00006;
const HOME_PULL = 0.00002;
const DAMPING = 0.995;
const MAX_VELOCITY = 0.0006;
const EDGE_MARGIN = 0.08;
const EDGE_PUSH = 0.00004;

// Typing speeds (in frames at ~60fps)
const TYPE_SPEED = 3;       // frames per character typed
const HOLD_DURATION = 240;  // ~4 seconds hold
const ERASE_SPEED = 2;      // frames per character erased

function pickRandomLabel(exclude: string): string {
  let next = exclude;
  while (next === exclude) {
    next = buzzwords[Math.floor(Math.random() * buzzwords.length)];
  }
  return next;
}

export default function ParticleField() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const mouseRef = useRef({ x: -9999, y: -9999 });
  const particlesRef = useRef<Particle[]>([]);
  const rafRef = useRef<number>(0);
  const sizeRef = useRef({ w: 0, h: 0 });
  const containerRectRef = useRef<DOMRect | null>(null);
  const { shouldAnimate } = useAnimationGate(containerRef, { rootMargin: "200px 0px" });

  useEffect(() => {
    const container = containerRef.current;
    const canvas = canvasRef.current;
    if (!canvas || !container) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    if (!shouldAnimate) return;

    const viewportW = window.innerWidth;
    const dprCap = viewportW <= 768 ? 1.25 : viewportW <= 1024 ? 1.5 : 2;
    const dpr = Math.min(window.devicePixelRatio || 1, dprCap);
    let frameCount = 0;
    let previousTs = 0;
    let skipHeavyFrame = false;

    function resize() {
      const rect = container!.getBoundingClientRect();
      const w = rect.width;
      const h = rect.height;
      canvas!.width = w * dpr;
      canvas!.height = h * dpr;
      canvas!.style.width = `${w}px`;
      canvas!.style.height = `${h}px`;
      sizeRef.current = { w, h };
      containerRectRef.current = container!.getBoundingClientRect();
    }

    function initParticles() {
      const { w, h } = sizeRef.current;
      const count = getParticleCount(w, h);
      const particles: Particle[] = [];
      for (let i = 0; i < count; i++) {
        const label = buzzwords[Math.floor(Math.random() * buzzwords.length)];
        const x = EDGE_MARGIN + Math.random() * (1 - EDGE_MARGIN * 2);
        const y = EDGE_MARGIN + Math.random() * (1 - EDGE_MARGIN * 2);
        particles.push({
          x,
          y,
          homeX: x,
          homeY: y,
          vx: (Math.random() - 0.5) * DRIFT_SPEED,
          vy: (Math.random() - 0.5) * DRIFT_SPEED,
          label,
          targetLabel: label,
          displayLabel: label,
          typingIndex: label.length,
          typingPhase: "holding",
          // Stagger initial hold so they don't all cycle at once
          phaseTimer: Math.floor(Math.random() * HOLD_DURATION),
          labelWidth: 0,
          opacity: 0.18 + Math.random() * 0.16,
          glowRadius: 8 + Math.random() * 5,
        });
      }
      particlesRef.current = particles;
    }

    function updateTyping(p: Particle) {
      p.phaseTimer++;

      if (p.typingPhase === "holding") {
        if (p.phaseTimer >= HOLD_DURATION) {
          p.typingPhase = "erasing";
          p.phaseTimer = 0;
          p.typingIndex = p.displayLabel.length;
        }
      } else if (p.typingPhase === "erasing") {
        if (p.phaseTimer % ERASE_SPEED === 0 && p.typingIndex > 0) {
          p.typingIndex--;
          p.displayLabel = p.label.slice(0, p.typingIndex);
          p.labelWidth = 0; // reset measured width
        }
        if (p.typingIndex === 0) {
          // Pick a new word and start typing
          p.targetLabel = pickRandomLabel(p.label);
          p.label = p.targetLabel;
          p.typingPhase = "typing";
          p.phaseTimer = 0;
          p.typingIndex = 0;
          p.displayLabel = "";
        }
      } else if (p.typingPhase === "typing") {
        if (p.phaseTimer % TYPE_SPEED === 0 && p.typingIndex < p.label.length) {
          p.typingIndex++;
          p.displayLabel = p.label.slice(0, p.typingIndex);
          p.labelWidth = 0;
        }
        if (p.typingIndex >= p.label.length) {
          p.typingPhase = "holding";
          p.phaseTimer = 0;
        }
      }
    }

    function draw(ts: number) {
      if (!ctx || !canvas) return;
      const { w, h } = sizeRef.current;
      if (w === 0) {
        rafRef.current = requestAnimationFrame(draw);
        return;
      }
      if (previousTs > 0) {
        const frameDelta = ts - previousTs;
        skipHeavyFrame = frameDelta > 19;
      }
      previousTs = ts;
      frameCount++;

      ctx.clearRect(0, 0, canvas.width, canvas.height);
      ctx.save();
      ctx.scale(dpr, dpr);

      const particles = particlesRef.current;
      const mouse = mouseRef.current;

      const rect = containerRectRef.current ?? container!.getBoundingClientRect();
      const localMouseX = mouse.x - rect.left;
      const localMouseY = mouse.y - rect.top;

      for (const p of particles) {
        const px = p.x * w;
        const py = p.y * h;

        // Mouse attraction
        const dx = localMouseX - px;
        const dy = localMouseY - py;
        const dist = Math.sqrt(dx * dx + dy * dy);

        if (dist < MOUSE_RADIUS && dist > 1) {
          const strength = (1 - dist / MOUSE_RADIUS) * MOUSE_ATTRACT;
          p.vx += (dx / dist) * strength;
          p.vy += (dy / dist) * strength;
        }

        // Home pull
        p.vx += (p.homeX - p.x) * HOME_PULL;
        p.vy += (p.homeY - p.y) * HOME_PULL;

        // Edge repulsion
        if (p.x < EDGE_MARGIN) p.vx += EDGE_PUSH * (1 + (EDGE_MARGIN - p.x) * 10);
        else if (p.x > 1 - EDGE_MARGIN) p.vx -= EDGE_PUSH * (1 + (p.x - (1 - EDGE_MARGIN)) * 10);
        if (p.y < EDGE_MARGIN) p.vy += EDGE_PUSH * (1 + (EDGE_MARGIN - p.y) * 10);
        else if (p.y > 1 - EDGE_MARGIN) p.vy -= EDGE_PUSH * (1 + (p.y - (1 - EDGE_MARGIN)) * 10);

        p.vx *= DAMPING;
        p.vy *= DAMPING;

        const speed = Math.sqrt(p.vx * p.vx + p.vy * p.vy);
        if (speed > MAX_VELOCITY) {
          p.vx = (p.vx / speed) * MAX_VELOCITY;
          p.vy = (p.vy / speed) * MAX_VELOCITY;
        }

        if (!skipHeavyFrame || frameCount % 2 === 0) {
          p.vx += (Math.random() - 0.5) * 0.000008;
          p.vy += (Math.random() - 0.5) * 0.000008;
        }

        p.x += p.vx;
        p.y += p.vy;

        p.x = Math.max(0.02, Math.min(0.98, p.x));
        p.y = Math.max(0.02, Math.min(0.98, p.y));

        // Update typing animation
        if (!skipHeavyFrame || frameCount % 2 === 0) {
          updateTyping(p);
        }
      }

      // Draw particles
      ctx.textAlign = "left";
      ctx.textBaseline = "middle";

      for (const p of particles) {
        const px = p.x * w;
        const py = p.y * h;

        // Back-glow behind each dot
        if (!skipHeavyFrame) {
          const glowGrad = ctx.createRadialGradient(px, py, 0, px, py, p.glowRadius);
          glowGrad.addColorStop(0, `rgba(148, 163, 184, ${p.opacity * 0.7})`);
          glowGrad.addColorStop(0.4, `rgba(148, 163, 184, ${p.opacity * 0.25})`);
          glowGrad.addColorStop(1, "rgba(148, 163, 184, 0)");
          ctx.fillStyle = glowGrad;
          ctx.beginPath();
          ctx.arc(px, py, p.glowRadius, 0, Math.PI * 2);
          ctx.fill();
        }

        // Dot
        ctx.beginPath();
        ctx.arc(px, py, 2, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(180, 195, 210, ${p.opacity + 0.3})`;
        ctx.fill();

        // Cross-hair tick marks
        const tickLen = 4;
        const tickAlpha = p.opacity * 0.7;
        ctx.strokeStyle = `rgba(148, 163, 184, ${tickAlpha})`;
        ctx.lineWidth = 0.5;
        ctx.beginPath();
        ctx.moveTo(px - tickLen, py);
        ctx.lineTo(px - 2.5, py);
        ctx.moveTo(px + 2.5, py);
        ctx.lineTo(px + tickLen, py);
        ctx.moveTo(px, py - tickLen);
        ctx.lineTo(px, py - 2.5);
        ctx.moveTo(px, py + 2.5);
        ctx.lineTo(px, py + tickLen);
        ctx.stroke();
        ctx.lineWidth = 1;

        // Label — monospace terminal font with typing cursor
        ctx.font = "10px 'Fira Code', 'Source Code Pro', 'JetBrains Mono', 'Courier New', monospace";
        if (!p.labelWidth || p.labelWidth === 0) {
          p.labelWidth = ctx.measureText(p.displayLabel).width;
        }

        const labelAlpha = p.opacity * 0.85;

        // Subtle text backglow
        ctx.save();
        ctx.shadowColor = `rgba(148, 163, 184, ${p.opacity * 0.4})`;
        ctx.shadowBlur = 6;
        ctx.fillStyle = `rgba(180, 195, 210, ${labelAlpha})`;
        ctx.fillText(p.displayLabel, px + 8, py - 1);
        ctx.restore();

        // Blinking cursor at end of text (visible during typing/erasing)
        if (p.typingPhase !== "holding" || (p.typingPhase === "holding" && p.phaseTimer < 60)) {
          const cursorVisible = Math.floor(p.phaseTimer / 18) % 2 === 0;
          if (cursorVisible) {
            const cursorX = px + 8 + (p.labelWidth || 0) + 1;
            ctx.fillStyle = `rgba(180, 195, 210, ${labelAlpha * 0.8})`;
            ctx.fillRect(cursorX, py - 5, 1, 10);
          }
        }
      }

      ctx.restore();
      rafRef.current = requestAnimationFrame(draw);
    }

    function onMouseMove(e: MouseEvent) {
      mouseRef.current = { x: e.clientX, y: e.clientY };
    }
    function onMouseLeave() {
      mouseRef.current = { x: -9999, y: -9999 };
    }

    window.addEventListener("mousemove", onMouseMove, { passive: true });
    document.addEventListener("mouseleave", onMouseLeave);
    window.addEventListener("resize", resize, { passive: true });

    resize();
    initParticles();
    rafRef.current = requestAnimationFrame(draw);

    return () => {
      cancelAnimationFrame(rafRef.current);
      window.removeEventListener("mousemove", onMouseMove);
      document.removeEventListener("mouseleave", onMouseLeave);
      window.removeEventListener("resize", resize);
    };
  }, [shouldAnimate]);

  return (
    <div ref={containerRef} className="pointer-events-none absolute inset-0 z-0">
      <canvas
        ref={canvasRef}
        className="absolute inset-0"
        aria-hidden="true"
      />
    </div>
  );
}
