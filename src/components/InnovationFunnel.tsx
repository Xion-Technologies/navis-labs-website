import { useEffect, useRef } from "react";
import { useAnimationGate } from "@/hooks/useAnimationGate";

const techJargon = [
  // Consumer AI products
  "ChatGPT", "Claude", "Gemini", "Copilot", "Midjourney",
  "Perplexity", "Grok", "Siri AI", "Alexa AI", "Cortana",
  "Google Bard", "Meta AI", "Samsung Gauss", "Apple Intelligence",
  // AI dev tools & platforms
  "Cursor AI", "Replit AI", "Vercel v0", "GitHub Copilot",
  "Tabnine", "Codeium", "Devin AI", "Bolt.new", "Lovable",
  // Models & labs
  "GPT-4o", "GPT-5", "Claude 3.5", "Llama 3", "Mistral",
  "Gemma", "Phi-3", "Command R+", "Stable Diffusion", "DALL·E 3",
  "Sora", "Runway ML", "ElevenLabs", "Whisper", "Synthesia",
  // Frameworks & infra
  "LangChain", "AutoGPT", "CrewAI", "OpenAI API", "Hugging Face",
  "TensorFlow", "PyTorch", "Keras", "ONNX", "MLflow",
  "Pinecone", "Weaviate", "Chroma DB", "Supabase AI",
  // Concepts & buzzwords
  "RAG", "Vector DB", "Fine-tuning", "Prompt Eng.", "Embeddings",
  "Neural Nets", "Transformers", "Multi-modal", "LLM", "AI Agents",
  "Machine Learning", "NLP", "Computer Vision", "Deep Learning",
  "Reinforcement Learning", "Diffusion Models", "Tokenization",
  "Few-shot Learning", "Zero-shot", "Chain of Thought",
  "Retrieval Augmented", "Semantic Search", "Knowledge Graphs",
  "Edge AI", "Federated Learning", "Model Distillation",
  // Enterprise & workflow AI
  "Zapier AI", "Make.com AI", "Notion AI", "Jasper AI",
  "Copy.ai", "Descript", "Otter.ai", "Grammarly AI",
  "Salesforce Einstein", "HubSpot AI", "Zendesk AI",
  "Power Automate AI", "UiPath", "Automation Anywhere",
  // Cloud & data
  "AWS Bedrock", "Azure OpenAI", "Google Vertex AI",
  "Snowflake Cortex", "Databricks AI", "BigQuery ML",
  // Technical jargon & concepts
  "API Gateway", "Microservices", "Containerization", "Kubernetes",
  "CI/CD Pipeline", "Docker", "Serverless", "Edge Computing",
  "Load Balancing", "Auto-scaling", "WebSockets", "GraphQL",
  "REST API", "OAuth 2.0", "JWT Tokens", "SSL/TLS",
  "Data Pipeline", "ETL Process", "Data Lake", "Data Warehouse",
  "Caching Layer", "Redis", "Message Queue", "Event-Driven",
  "Monorepo", "Git Workflow", "Agile Sprints", "DevOps",
  "Infrastructure as Code", "Terraform", "Ansible",
  "Unit Testing", "Integration Testing", "Load Testing",
  "Code Review", "Technical Debt", "Refactoring",
  "Database Sharding", "Replication", "Indexing",
  "SQL vs NoSQL", "Schema Migration", "ORM",
  "Latency Optimization", "CDN", "DNS Routing",
  "Observability", "Logging", "Monitoring", "Alerting",
  "Rollback Strategy", "Blue-Green Deploy", "Canary Release",
  "Rate Limiting", "Throttling", "Circuit Breaker",
  "Encryption at Rest", "Encryption in Transit", "Pen Testing",
  "Compliance", "SOC 2", "GDPR", "HIPAA",
  "Horizontal Scaling", "Vertical Scaling", "Fault Tolerance",
  "Disaster Recovery", "Backup Strategy", "Uptime SLA",
];

const businessOutputs = [
  "24/7 Customer Support Bot",
  "Automated Invoice Processing",
  "Smart Lead Qualification",
  "Instant Report Generation",
  "Intelligent Scheduling Assistant",
  "Predictive Sales Dashboard",
  "Auto Email Drafting & Replies",
  "Document Search & Summarizer",
  "Employee Onboarding Copilot",
  "Inventory Demand Forecasting",
  "Auto Contract Review & Flagging",
  "Expense Report Automation",
  "Meeting Notes & Action Items",
  "HR Policy Q&A Assistant",
  "Auto Data Entry & Validation",
  "Compliance Checklist Automation",
  "Vendor Comparison & Scoring",
  "Auto Follow-Up Sequences",
  "Payroll Processing Assistant",
  "Leave & Attendance Tracker",
  "RFP Response Generator",
  "Auto Ticket Routing & Triage",
  "KPI Dashboard Builder",
  "Procurement Workflow Engine",
  "Client Intake Form Processor",
];

export default function InnovationFunnel() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animRef = useRef<number>(0);
  const wrapperRef = useRef<HTMLDivElement>(null);
  const { shouldAnimate } = useAnimationGate(wrapperRef, { rootMargin: "160px 0px" });

  useEffect(() => {
    if (!shouldAnimate) return;
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d")!;
    if (!ctx) return;

    // Hi-DPI support
    const dpr = Math.min(window.devicePixelRatio || 1, window.innerWidth <= 1024 ? 1.3 : 1.7);
    const W = 520;
    const H = 570;
    canvas.width = W * dpr;
    canvas.height = H * dpr;
    canvas.style.width = `${W}px`;
    canvas.style.height = `${H}px`;
    ctx.scale(dpr, dpr);

    // Funnel geometry — more vertical breathing room
    const funnelTopY = 160;
    const funnelBottomY = 340;
    const funnelTopHalfW = 200;
    const funnelBottomHalfW = 44;
    const funnelCx = W / 2;
    const spoutBottom = 410;

    // Falling tech words
    interface FallingWord {
      text: string;
      x: number;
      y: number;
      speed: number;
      opacity: number;
      size: number;
    }

    const fallingWords: FallingWord[] = [];
    let spawnTimer = 0;

    function spawnWord() {
      const text = techJargon[Math.floor(Math.random() * techJargon.length)];
      fallingWords.push({
        text,
        x: funnelCx + (Math.random() - 0.5) * funnelTopHalfW * 1.8,
        y: -10 - Math.random() * 60,
        speed: 0.4 + Math.random() * 0.6,
        opacity: 0.25 + Math.random() * 0.4,
        size: 10 + Math.random() * 3,
      });
    }

    // Output words cycling
    let outputIndex = 0;
    let outputTimer = 0;
    let outputOpacity = 0;
    let outputY = spoutBottom + 45;
    let outputPhase: "enter" | "hold" | "exit" = "enter";

    let previousTs = 0;
    let lowQuality = false;
    function draw(ts: number) {
      if (previousTs > 0) {
        lowQuality = ts - previousTs > 20;
      }
      previousTs = ts;
      ctx.clearRect(0, 0, W, H);

      // --- Draw funnel shape ---
      ctx.beginPath();
      ctx.moveTo(funnelCx - funnelTopHalfW, funnelTopY);
      ctx.lineTo(funnelCx + funnelTopHalfW, funnelTopY);
      ctx.lineTo(funnelCx + funnelBottomHalfW, funnelBottomY);
      ctx.lineTo(funnelCx - funnelBottomHalfW, funnelBottomY);
      ctx.closePath();
      const funnelGrad = ctx.createLinearGradient(0, funnelTopY, 0, funnelBottomY);
      funnelGrad.addColorStop(0, "rgba(0, 212, 170, 0.05)");
      funnelGrad.addColorStop(0.6, "rgba(99, 102, 241, 0.06)");
      funnelGrad.addColorStop(1, "rgba(99, 102, 241, 0.08)");
      ctx.fillStyle = funnelGrad;
      ctx.fill();
      ctx.strokeStyle = "rgba(0, 212, 170, 0.12)";
      ctx.lineWidth = 1;
      ctx.stroke();

      // Spout
      ctx.beginPath();
      ctx.moveTo(funnelCx - funnelBottomHalfW, funnelBottomY);
      ctx.lineTo(funnelCx + funnelBottomHalfW, funnelBottomY);
      ctx.lineTo(funnelCx + funnelBottomHalfW, spoutBottom);
      ctx.lineTo(funnelCx - funnelBottomHalfW, spoutBottom);
      ctx.closePath();
      ctx.fillStyle = "rgba(99, 102, 241, 0.05)";
      ctx.fill();
      ctx.strokeStyle = "rgba(99, 102, 241, 0.12)";
      ctx.stroke();

      // Inner glow at convergence
      if (!lowQuality) {
        const glowGrad = ctx.createRadialGradient(
          funnelCx, funnelBottomY, 0,
          funnelCx, funnelBottomY, 70
        );
        glowGrad.addColorStop(0, "rgba(0, 212, 170, 0.15)");
        glowGrad.addColorStop(1, "rgba(0, 212, 170, 0)");
        ctx.fillStyle = glowGrad;
        ctx.fillRect(funnelCx - 70, funnelBottomY - 35, 140, 70);
      }

      // --- Spawn & update falling words ---
      spawnTimer++;
      if (spawnTimer > (lowQuality ? 28 : 22)) {
        spawnWord();
        spawnTimer = 0;
      }

      for (let i = fallingWords.length - 1; i >= 0; i--) {
        const w = fallingWords[i];
        w.y += w.speed;

        // Converge horizontally as word enters funnel
        if (w.y > funnelTopY) {
          const targetX = funnelCx;
          w.x += (targetX - w.x) * 0.025;
          w.opacity = Math.max(w.opacity - 0.004, 0);
          w.size = Math.max(w.size - 0.04, 7);
        }

        // Remove when past funnel bottom
        if (w.y > funnelBottomY - 10) {
          fallingWords.splice(i, 1);
          continue;
        }

        // Draw word
        ctx.font = `${Math.round(w.size)}px "Inter", system-ui, sans-serif`;
        ctx.fillStyle = `rgba(0, 212, 170, ${w.opacity})`;
        ctx.textAlign = "center";
        ctx.fillText(w.text, w.x, w.y);
      }

      // --- Output words ---
      outputTimer++;

      if (outputPhase === "enter") {
        outputOpacity = Math.min(outputOpacity + 0.02, 1);
        outputY = Math.max(outputY - 0.25, spoutBottom + 55);
        if (outputOpacity >= 1 && outputTimer > 35) {
          outputPhase = "hold";
          outputTimer = 0;
        }
      } else if (outputPhase === "hold") {
        if (outputTimer > 100) {
          outputPhase = "exit";
          outputTimer = 0;
        }
      } else if (outputPhase === "exit") {
        outputOpacity = Math.max(outputOpacity - 0.025, 0);
        outputY -= 0.15;
        if (outputOpacity <= 0) {
          outputIndex = (outputIndex + 1) % businessOutputs.length;
          outputPhase = "enter";
          outputTimer = 0;
          outputY = spoutBottom + 70;
        }
      }

      // --- Draw liquid glass capsule for output ---
      const outText = businessOutputs[outputIndex];
      ctx.font = 'bold 13px "Inter", system-ui, sans-serif';
      const textWidth = ctx.measureText(outText).width;
      const capsuleW = textWidth + 40;
      const capsuleH = 36;
      const capsuleX = funnelCx - capsuleW / 2;
      const capsuleY = outputY - capsuleH / 2 - 2;
      const capsuleR = capsuleH / 2;

      // Helper: draw capsule path
      function drawCapsulePath() {
        ctx.beginPath();
        ctx.moveTo(capsuleX + capsuleR, capsuleY);
        ctx.lineTo(capsuleX + capsuleW - capsuleR, capsuleY);
        ctx.arcTo(capsuleX + capsuleW, capsuleY, capsuleX + capsuleW, capsuleY + capsuleR, capsuleR);
        ctx.arcTo(capsuleX + capsuleW, capsuleY + capsuleH, capsuleX + capsuleW - capsuleR, capsuleY + capsuleH, capsuleR);
        ctx.lineTo(capsuleX + capsuleR, capsuleY + capsuleH);
        ctx.arcTo(capsuleX, capsuleY + capsuleH, capsuleX, capsuleY + capsuleR, capsuleR);
        ctx.arcTo(capsuleX, capsuleY, capsuleX + capsuleR, capsuleY, capsuleR);
        ctx.closePath();
      }

      // Use opacity-baked colors instead of globalAlpha so nothing else is affected
      const opa = outputOpacity;

      // Glass fill
      ctx.save();
      drawCapsulePath();
      const glassFill = ctx.createLinearGradient(0, capsuleY, 0, capsuleY + capsuleH);
      glassFill.addColorStop(0, `rgba(0, 212, 170, ${0.1 * opa})`);
      glassFill.addColorStop(0.4, `rgba(30, 58, 95, ${0.55 * opa})`);
      glassFill.addColorStop(1, `rgba(30, 58, 95, ${0.4 * opa})`);
      ctx.fillStyle = glassFill;
      ctx.fill();

      // Glass border
      drawCapsulePath();
      ctx.strokeStyle = `rgba(0, 212, 170, ${0.2 * opa})`;
      ctx.lineWidth = 1;
      ctx.stroke();

      // Top highlight
      ctx.beginPath();
      ctx.moveTo(capsuleX + capsuleR + 6, capsuleY + 1.5);
      ctx.lineTo(capsuleX + capsuleW - capsuleR - 6, capsuleY + 1.5);
      ctx.strokeStyle = `rgba(255, 255, 255, ${0.07 * opa})`;
      ctx.lineWidth = 0.5;
      ctx.stroke();
      ctx.restore();

      // Text inside capsule
      ctx.font = 'bold 13px "Inter", system-ui, sans-serif';
      ctx.fillStyle = `rgba(241, 245, 249, ${0.95 * opa})`;
      ctx.textAlign = "center";
      ctx.textBaseline = "middle";
      ctx.fillText(outText, funnelCx, outputY);
      ctx.textBaseline = "alphabetic";

      // Small teal dot dripping from spout
      const dripY = spoutBottom + 4 + ((Date.now() / 25) % 18);
      const dripOpacity = 1 - ((dripY - spoutBottom - 4) / 18);
      ctx.beginPath();
      ctx.arc(funnelCx, dripY, 2.5, 0, Math.PI * 2);
      ctx.fillStyle = `rgba(0, 212, 170, ${dripOpacity * 0.5})`;
      ctx.fill();

      // --- Label: bottom ---
      ctx.font = '600 10px "Inter", system-ui, sans-serif';
      ctx.fillStyle = "rgba(99, 102, 241, 0.45)";
      ctx.textAlign = "center";
      ctx.fillText("AI TOOLS YOU CAN ACTUALLY USE", funnelCx, spoutBottom + 95);

      animRef.current = requestAnimationFrame(draw);
    }

    // Initial seed — spread across the falling zone
    for (let i = 0; i < 10; i++) {
      spawnWord();
      fallingWords[fallingWords.length - 1].y = Math.random() * funnelTopY;
    }

    animRef.current = requestAnimationFrame(draw);

    return () => cancelAnimationFrame(animRef.current);
  }, [shouldAnimate]);

  return (
    <div ref={wrapperRef} className="flex items-center justify-center">
      <canvas
        ref={canvasRef}
        className="max-w-full"
        style={{ width: 520, height: 570 }}
        aria-label="Animated funnel showing AI tech buzzwords being transformed into practical business solutions"
        role="img"
      />
    </div>
  );
}
