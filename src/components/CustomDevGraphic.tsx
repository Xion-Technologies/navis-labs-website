import { useEffect, useRef } from "react";

const codeLines = [
  "from flask import Flask, jsonify",
  "from models import db, User, Order",
  "import openai, redis, stripe",
  "",
  "app = Flask(__name__)",
  "cache = redis.Redis(host='localhost')",
  "",
  "@app.route('/api/dashboard')",
  "def dashboard():",
  "    users = User.query.count()",
  "    orders = Order.query.filter_by(",
  "        status='active'",
  "    ).all()",
  "    revenue = sum(o.total for o in orders)",
  "    return jsonify({",
  "        'users': users,",
  "        'orders': len(orders),",
  "        'revenue': revenue",
  "    })",
  "",
  "@app.route('/api/ai/summarize')",
  "def ai_summarize():",
  "    data = request.get_json()",
  "    resp = openai.chat.completions.create(",
  "        model='gpt-4o',",
  "        messages=[{",
  "            'role': 'user',",
  "            'content': data['text']",
  "        }]",
  "    )",
  "    return jsonify(resp.choices[0])",
  "",
  "@app.route('/api/payments')",
  "def create_payment():",
  "    session = stripe.checkout.create(",
  "        line_items=[{",
  "            'price': request.args['plan'],",
  "            'quantity': 1",
  "        }],",
  "        mode='subscription'",
  "    )",
  "    return jsonify({'url': session.url})",
  "",
  "if __name__ == '__main__':",
  "    db.create_all()",
  "    app.run(debug=True)",
];

export default function CustomDevGraphic() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animRef = useRef<number>(0);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d")!;
    if (!ctx) return;

    const dpr = window.devicePixelRatio || 1;
    const W = 520;
    const H = 620;
    canvas.width = W * dpr;
    canvas.height = H * dpr;
    canvas.style.width = `${W}px`;
    canvas.style.height = `${H}px`;
    ctx.scale(dpr, dpr);

    // Landscape stacked layout
    const pad = 14;
    const winW = W - pad * 2;
    const termH = 210;
    const webH = 260;
    const termY = 24;
    const gap = 70;
    const webY = termY + termH + gap;

    let frame = 0;
    let typedChars = 0;
    const totalChars = codeLines.reduce((s, l) => s + l.length + 1, 0);

    const keywords = ["from", "import", "def", "return", "if", "for", "class", "as"];

    function getWordAt(line: string, idx: number): string {
      let s = idx;
      while (s > 0 && /\w/.test(line[s - 1])) s--;
      let e = idx;
      while (e < line.length && /\w/.test(line[e])) e++;
      return line.slice(s, e);
    }
    function isInStr(line: string, idx: number): boolean {
      let a = false, b = false;
      for (let i = 0; i < idx; i++) {
        if (line[i] === "'" && !b) a = !a;
        if (line[i] === '"' && !a) b = !b;
      }
      return a || b;
    }
    function charColor(line: string, c: number): string {
      const t = line.trimStart();
      if (t.startsWith("@")) return "rgba(0, 212, 170, 0.85)";
      if (t.startsWith("#")) return "rgba(148, 163, 184, 0.4)";
      if (isInStr(line, c)) return "rgba(0, 212, 170, 0.7)";
      if (keywords.includes(getWordAt(line, c))) return "rgba(99, 102, 241, 0.9)";
      if (/\d/.test(line[c]) && !/\w/.test(line[c - 1] || "")) return "rgba(251, 191, 36, 0.8)";
      if ("(){}[],:=.".includes(line[c])) return "rgba(148, 163, 184, 0.5)";
      return "rgba(241, 245, 249, 0.65)";
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
      frame++;
      typedChars += 1.6;

      // ═══════════════════════════════════════
      // TERMINAL (landscape, top)
      // ═══════════════════════════════════════
      // Title bar
      ctx.fillStyle = "rgba(30, 58, 95, 0.6)";
      ctx.beginPath();
      ctx.roundRect(pad, termY, winW, 22, [6, 6, 0, 0]);
      ctx.fill();
      drawDots(pad, termY);
      ctx.font = '500 8px "Inter", monospace';
      ctx.fillStyle = "rgba(148, 163, 184, 0.55)";
      ctx.textAlign = "center";
      ctx.fillText("app.py — Python 3.12", pad + winW / 2, termY + 14);
      ctx.textAlign = "left";

      // Body
      ctx.fillStyle = "rgba(10, 22, 40, 0.85)";
      ctx.beginPath();
      ctx.roundRect(pad, termY + 22, winW, termH - 22, [0, 0, 6, 6]);
      ctx.fill();
      ctx.strokeStyle = "rgba(30, 58, 95, 0.35)";
      ctx.lineWidth = 1;
      ctx.beginPath();
      ctx.roundRect(pad, termY, winW, termH, 6);
      ctx.stroke();

      // Clip & draw code
      ctx.save();
      ctx.beginPath();
      ctx.roundRect(pad + 1, termY + 23, winW - 2, termH - 24, [0, 0, 5, 5]);
      ctx.clip();

      const lh = 13;
      const cy0 = termY + 36;
      const maxL = Math.floor((termH - 36) / lh);
      let drawn = 0;
      let scrollL = 0;
      let t = 0;
      for (let l = 0; l < codeLines.length; l++) {
        t += codeLines[l].length + 1;
        if (t < typedChars - maxL * 25) scrollL = Math.max(0, l - maxL + 4);
      }

      for (let l = 0; l < codeLines.length; l++) {
        const line = codeLines[l];
        const dy = cy0 + (l - scrollL) * lh;
        if (dy < termY + 24 || dy > termY + termH - 4) { drawn += line.length + 1; continue; }

        // Line number
        ctx.font = '9px "SF Mono", "Fira Code", monospace';
        ctx.fillStyle = "rgba(148, 163, 184, 0.18)";
        ctx.textAlign = "right";
        ctx.fillText(String(l + 1), pad + 22, dy);
        ctx.textAlign = "left";

        // Characters
        let cx = pad + 30;
        for (let c = 0; c < line.length; c++) {
          if (drawn + c >= typedChars) break;
          ctx.font = '9px "SF Mono", "Fira Code", monospace';
          ctx.fillStyle = charColor(line, c);
          ctx.fillText(line[c], cx, dy);
          cx += ctx.measureText(line[c]).width;
        }

        // Cursor
        const typed = Math.min(line.length, Math.max(0, typedChars - drawn));
        if (typedChars >= drawn && typedChars < drawn + line.length + 1 && frame % 60 < 30) {
          let curX = pad + 30;
          for (let c = 0; c < typed; c++) curX += ctx.measureText(line[c]).width;
          ctx.fillStyle = "rgba(0, 212, 170, 0.8)";
          ctx.fillRect(curX, dy - 9, 1.5, 12);
        }
        drawn += line.length + 1;
      }
      ctx.restore();

      if (typedChars > totalChars + 180) { typedChars = 0; frame = 0; }

      // ═══════════════════════════════════════
      // WEB BROWSER (landscape, bottom, light mode)
      // ═══════════════════════════════════════
      const progress = Math.min(typedChars / totalChars, 1);

      // Title bar
      ctx.fillStyle = "rgba(240, 243, 247, 0.95)";
      ctx.beginPath();
      ctx.roundRect(pad, webY, winW, 22, [6, 6, 0, 0]);
      ctx.fill();
      drawDots(pad, webY);

      // URL bar
      ctx.fillStyle = "rgba(255, 255, 255, 0.9)";
      ctx.beginPath();
      ctx.roundRect(pad + 56, webY + 4, winW - 68, 14, 3);
      ctx.fill();
      ctx.font = '7px "Inter", sans-serif';
      ctx.fillStyle = "rgba(100, 116, 139, 0.5)";
      ctx.textAlign = "center";
      ctx.fillText("🔒 app.navislabs.com/dashboard", pad + winW / 2 + 20, webY + 14);
      ctx.textAlign = "left";

      // Body
      ctx.fillStyle = "rgba(249, 250, 252, 0.97)";
      ctx.beginPath();
      ctx.roundRect(pad, webY + 22, winW, webH - 22, [0, 0, 6, 6]);
      ctx.fill();
      ctx.strokeStyle = "rgba(203, 213, 225, 0.35)";
      ctx.lineWidth = 1;
      ctx.beginPath();
      ctx.roundRect(pad, webY, winW, webH, 6);
      ctx.stroke();

      // Clip web content
      ctx.save();
      ctx.beginPath();
      ctx.roundRect(pad + 1, webY + 23, winW - 2, webH - 24, [0, 0, 5, 5]);
      ctx.clip();

      const wx = pad + 8;
      const wy = webY + 28;
      const ww = winW - 16;

      // ── Navbar (grows in) ──
      const navP = Math.min(progress * 4, 1);
      if (navP > 0) {
        ctx.globalAlpha = navP;
        ctx.fillStyle = "rgba(255, 255, 255, 1)";
        ctx.beginPath();
        ctx.roundRect(wx, wy, ww * navP, 28, 4);
        ctx.fill();
        ctx.strokeStyle = "rgba(226, 232, 240, 0.6)";
        ctx.stroke();

        if (navP > 0.5) {
          const np = (navP - 0.5) * 2;
          ctx.globalAlpha = np;
          // Logo
          ctx.fillStyle = "rgba(0, 180, 150, 0.8)";
          ctx.beginPath();
          ctx.roundRect(wx + 8, wy + 7, 40, 14, 3);
          ctx.fill();
          // Nav items
          for (let n = 0; n < 4; n++) {
            ctx.fillStyle = "rgba(100, 116, 139, 0.3)";
            ctx.beginPath();
            ctx.roundRect(wx + 60 + n * 44, wy + 9, 34, 10, 2);
            ctx.fill();
          }
          // CTA
          ctx.fillStyle = "rgba(0, 212, 170, 0.7)";
          ctx.beginPath();
          ctx.roundRect(wx + ww - 62, wy + 6, 54, 16, 4);
          ctx.fill();
        }
        ctx.globalAlpha = 1;
      }

      // ── Sidebar (slides in) ──
      const sideP = Math.max(0, Math.min((progress - 0.15) * 4, 1));
      const sideW = 80;
      if (sideP > 0) {
        ctx.globalAlpha = sideP;
        ctx.fillStyle = "rgba(248, 250, 252, 1)";
        ctx.fillRect(wx, wy + 32, sideW * sideP, webH - 64);
        ctx.strokeStyle = "rgba(226, 232, 240, 0.4)";
        ctx.strokeRect(wx, wy + 32, sideW, webH - 64);

        if (sideP > 0.5) {
          const sp = (sideP - 0.5) * 2;
          ctx.globalAlpha = sp;
          const items = ["Dashboard", "Orders", "Users", "Analytics", "Payments", "Settings"];
          items.forEach((item, i) => {
            const iy = wy + 40 + i * 24;
            if (i === 0) {
              ctx.fillStyle = "rgba(0, 212, 170, 0.1)";
              ctx.beginPath();
              ctx.roundRect(wx + 4, iy, sideW - 8, 20, 3);
              ctx.fill();
            }
            ctx.font = '7px "Inter", sans-serif';
            ctx.fillStyle = i === 0 ? "rgba(0, 170, 140, 0.9)" : "rgba(100, 116, 139, 0.5)";
            ctx.fillText(item, wx + 12, iy + 13);
          });
          ctx.globalAlpha = 1;
        }
        ctx.globalAlpha = 1;
      }

      // ── Main content area ──
      const mainX = wx + sideW + 8;
      const mainW = ww - sideW - 16;
      const mainY = wy + 36;

      // Stat cards (3 across)
      const cardsP = Math.max(0, Math.min((progress - 0.3) * 3.5, 1));
      if (cardsP > 0) {
        const cardW = (mainW - 12) / 3;
        const stats = [
          { label: "Total Users", val: "2,847", color: "rgba(0, 212, 170, 0.15)", accent: "rgba(0, 180, 150, 0.8)" },
          { label: "Active Orders", val: "384", color: "rgba(99, 102, 241, 0.12)", accent: "rgba(99, 102, 241, 0.8)" },
          { label: "Revenue", val: "$128.4K", color: "rgba(251, 191, 36, 0.1)", accent: "rgba(202, 138, 4, 0.8)" },
        ];
        stats.forEach((s, i) => {
          const cp = Math.max(0, Math.min((cardsP - i * 0.2) / 0.6, 1));
          if (cp <= 0) return;
          ctx.globalAlpha = cp;
          const cx = mainX + i * (cardW + 6);

          ctx.fillStyle = "rgba(255, 255, 255, 1)";
          ctx.beginPath();
          ctx.roundRect(cx, mainY, cardW, 48, 5);
          ctx.fill();
          ctx.strokeStyle = "rgba(226, 232, 240, 0.5)";
          ctx.stroke();

          // Top accent line
          ctx.fillStyle = s.color;
          ctx.beginPath();
          ctx.roundRect(cx, mainY, cardW, 3, [5, 5, 0, 0]);
          ctx.fill();

          ctx.font = '600 11px "Inter", sans-serif';
          ctx.fillStyle = "rgba(15, 23, 42, 0.85)";
          ctx.fillText(s.val, cx + 10, mainY + 24);
          ctx.font = '500 7px "Inter", sans-serif';
          ctx.fillStyle = "rgba(100, 116, 139, 0.6)";
          ctx.fillText(s.label, cx + 10, mainY + 38);
        });
        ctx.globalAlpha = 1;
      }

      // Chart area
      const chartP = Math.max(0, Math.min((progress - 0.5) * 3, 1));
      if (chartP > 0) {
        ctx.globalAlpha = chartP;
        const chartY = mainY + 56;
        const chartH = 70;

        ctx.fillStyle = "rgba(255, 255, 255, 1)";
        ctx.beginPath();
        ctx.roundRect(mainX, chartY, mainW, chartH, 5);
        ctx.fill();
        ctx.strokeStyle = "rgba(226, 232, 240, 0.5)";
        ctx.stroke();

        ctx.font = '600 7px "Inter", sans-serif';
        ctx.fillStyle = "rgba(15, 23, 42, 0.6)";
        ctx.fillText("Revenue Overview", mainX + 10, chartY + 14);

        // Bar chart
        const bars = [0.4, 0.65, 0.5, 0.8, 0.6, 0.9, 0.75, 0.85, 0.7, 0.95];
        const barW = (mainW - 30) / bars.length;
        bars.forEach((v, i) => {
          const bp = Math.max(0, Math.min((chartP - i * 0.05) / 0.5, 1));
          const bh = (chartH - 30) * v * bp;
          const bx = mainX + 10 + i * barW;
          const by = chartY + chartH - 10 - bh;
          ctx.fillStyle = i % 2 === 0 ? "rgba(0, 212, 170, 0.5)" : "rgba(99, 102, 241, 0.4)";
          ctx.beginPath();
          ctx.roundRect(bx, by, barW - 4, bh, [2, 2, 0, 0]);
          ctx.fill();
        });
        ctx.globalAlpha = 1;
      }

      // Table
      const tableP = Math.max(0, Math.min((progress - 0.7) * 3, 1));
      if (tableP > 0) {
        ctx.globalAlpha = tableP;
        const tblY = mainY + 134;

        ctx.fillStyle = "rgba(255, 255, 255, 1)";
        ctx.beginPath();
        ctx.roundRect(mainX, tblY, mainW, 68, 5);
        ctx.fill();
        ctx.strokeStyle = "rgba(226, 232, 240, 0.5)";
        ctx.stroke();

        // Header row
        ctx.fillStyle = "rgba(248, 250, 252, 1)";
        ctx.beginPath();
        ctx.roundRect(mainX, tblY, mainW, 16, [5, 5, 0, 0]);
        ctx.fill();

        const cols = ["Order #", "Customer", "Status", "Amount"];
        cols.forEach((col, i) => {
          ctx.font = '600 6px "Inter", sans-serif';
          ctx.fillStyle = "rgba(71, 85, 105, 0.7)";
          ctx.fillText(col, mainX + 8 + i * (mainW / 4), tblY + 11);
        });

        // Data rows
        for (let r = 0; r < 3; r++) {
          const ry = tblY + 20 + r * 16;
          ctx.strokeStyle = "rgba(226, 232, 240, 0.3)";
          ctx.beginPath();
          ctx.moveTo(mainX + 4, ry);
          ctx.lineTo(mainX + mainW - 4, ry);
          ctx.stroke();

          ctx.font = '500 6px "Inter", sans-serif';
          ctx.fillStyle = "rgba(71, 85, 105, 0.5)";
          ctx.fillText(`#${1042 + r}`, mainX + 8, ry + 11);
          ctx.fillText(["Acme Corp", "Globex", "Initech"][r], mainX + 8 + mainW / 4, ry + 11);

          // Status badge
          const statuses = ["Active", "Pending", "Complete"];
          const statusColors = ["rgba(0,180,150,", "rgba(202,138,4,", "rgba(99,102,241,"];
          ctx.fillStyle = statusColors[r] + "0.1)";
          ctx.beginPath();
          ctx.roundRect(mainX + 8 + (mainW / 4) * 2, ry + 3, 30, 10, 3);
          ctx.fill();
          ctx.font = '500 5px "Inter", sans-serif';
          ctx.fillStyle = statusColors[r] + "0.9)";
          ctx.fillText(statuses[r], mainX + 12 + (mainW / 4) * 2, ry + 10);

          ctx.font = '500 6px "Inter", sans-serif';
          ctx.fillStyle = "rgba(15, 23, 42, 0.7)";
          ctx.fillText(["$2,400", "$890", "$5,200"][r], mainX + 8 + (mainW / 4) * 3, ry + 11);
        }
        ctx.globalAlpha = 1;
      }

      ctx.restore(); // end web clip

      // ─── Labels ───
      ctx.font = '600 10px "Inter", system-ui, sans-serif';
      ctx.fillStyle = "rgba(148, 163, 184, 0.4)";
      ctx.textAlign = "center";
      ctx.fillText("BACKEND CODE", pad + winW / 2, termY + termH + 16);
      ctx.fillStyle = "rgba(99, 102, 241, 0.4)";
      ctx.fillText("YOUR PRODUCT", pad + winW / 2, webY + webH + 16);

      // ─── Animated flowing line between windows ───
      const lineX = pad + winW / 2;
      const lineY1 = termY + termH + 18;
      const lineY2 = webY - 6;
      const lineLen = lineY2 - lineY1;

      // Static gradient line
      const lineGrad = ctx.createLinearGradient(0, lineY1, 0, lineY2);
      lineGrad.addColorStop(0, "rgba(0, 212, 170, 0.15)");
      lineGrad.addColorStop(0.5, "rgba(0, 212, 170, 0.25)");
      lineGrad.addColorStop(1, "rgba(99, 102, 241, 0.15)");
      ctx.strokeStyle = lineGrad;
      ctx.lineWidth = 1.5;
      ctx.beginPath();
      ctx.moveTo(lineX, lineY1);
      ctx.lineTo(lineX, lineY2);
      ctx.stroke();

      // Traveling dots (3 dots flowing downward)
      for (let d = 0; d < 3; d++) {
        const dotSpeed = 0.012;
        const dotOffset = d / 3;
        const dotT = ((frame * dotSpeed + dotOffset) % 1);
        const dotY = lineY1 + dotT * lineLen;
        const dotOpacity = Math.sin(dotT * Math.PI);

        // Glow
        const dotGlow = ctx.createRadialGradient(lineX, dotY, 0, lineX, dotY, 8);
        dotGlow.addColorStop(0, `rgba(0, 212, 170, ${0.3 * dotOpacity})`);
        dotGlow.addColorStop(1, "rgba(0, 212, 170, 0)");
        ctx.fillStyle = dotGlow;
        ctx.fillRect(lineX - 8, dotY - 8, 16, 16);

        // Core dot
        ctx.beginPath();
        ctx.arc(lineX, dotY, 2.5, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(0, 212, 170, ${0.8 * dotOpacity})`;
        ctx.fill();
      }

      // Arrow head at bottom
      ctx.fillStyle = "rgba(0, 212, 170, 0.35)";
      ctx.beginPath();
      ctx.moveTo(lineX, lineY2 + 2);
      ctx.lineTo(lineX - 4, lineY2 - 5);
      ctx.lineTo(lineX + 4, lineY2 - 5);
      ctx.fill();

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
        style={{ width: 520, height: 620 }}
        aria-label="Animated graphic showing Python code being typed in a terminal while a web application dashboard builds in real-time"
        role="img"
      />
    </div>
  );
}
