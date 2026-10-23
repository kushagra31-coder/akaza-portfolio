"use client";

import { useEffect, useRef } from "react";

const WORDS = ["ZAP!", "POW!", "BAM!", "WHAM!", "KRAK!", "BZZT!", "SPLAT!"];
const RED = "230,36,41";
const BLUE = "74,120,255";

export default function WebCanvas() {
  const ref = useRef(null);

  useEffect(() => {
    const cv = ref.current;
    if (!cv) return;
    const ctx = cv.getContext("2d");
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const coarsePointer = window.matchMedia("(pointer: coarse)").matches;
    const dpr = Math.min(window.devicePixelRatio || 1, coarsePointer ? 1 : 2);

    let w = 0;
    let h = 0;
    let raf = 0;
    let nodes = [];
    const strands = [];
    const mouse = { x: -9999, y: -9999 };
    let last = null;
    let lastAt = 0;

    const resize = () => {
      w = window.innerWidth;
      h = window.innerHeight;
      cv.width = w * dpr;
      cv.height = h * dpr;
      cv.style.width = w + "px";
      cv.style.height = h + "px";
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

      // Increased dot density: scaled for richer constellation network
      const n = Math.min(160, Math.floor((w * h) / (coarsePointer ? 24000 : 9500)));
      nodes = Array.from({ length: n }, () => ({
        x: Math.random() * w,
        y: Math.random() * h,
        vx: (Math.random() - 0.5) * 0.35,
        vy: (Math.random() - 0.5) * 0.35,
        r: 1.5 + Math.random() * 1.3,
        c: Math.random() < 0.5 ? RED : BLUE,
      }));
    };

    const draw = () => {
      ctx.clearRect(0, 0, w, h);

      for (const n of nodes) {
        if (!reduce) {
          n.x += n.vx;
          n.y += n.vy;
          if (n.x < 0 || n.x > w) n.vx *= -1;
          if (n.y < 0 || n.y > h) n.vy *= -1;
        }
      }

      ctx.lineWidth = 1;
      const len = nodes.length;

      for (let i = 0; i < len; i++) {
        const a = nodes[i];

        // Connect nearby nodes
        for (let j = i + 1; j < len; j++) {
          const b = nodes[j];
          const dx = a.x - b.x;
          const dy = a.y - b.y;
          const d = Math.hypot(dx, dy);
          if (d < 125) {
            ctx.strokeStyle = `rgba(${a.c},${(1 - d / 125) * 0.32})`;
            ctx.beginPath();
            ctx.moveTo(a.x, a.y);
            ctx.lineTo(b.x, b.y);
            ctx.stroke();
          }
        }

        // Connect to mouse cursor
        const dm = Math.hypot(a.x - mouse.x, a.y - mouse.y);
        if (dm < 200) {
          ctx.strokeStyle = `rgba(${a.c},${(1 - dm / 200) * 0.78})`;
          ctx.lineWidth = 1.4;
          ctx.beginPath();
          ctx.moveTo(a.x, a.y);
          ctx.lineTo(mouse.x, mouse.y);
          ctx.stroke();
          ctx.lineWidth = 1;
        }

        // Draw node dot
        ctx.fillStyle = `rgba(${a.c},0.85)`;
        ctx.beginPath();
        ctx.arc(a.x, a.y, a.r, 0, Math.PI * 2);
        ctx.fill();
      }

      // Click strands
      for (let i = strands.length - 1; i >= 0; i--) {
        const s = strands[i];
        s.life -= 0.012;
        if (s.life <= 0) {
          strands.splice(i, 1);
          continue;
        }
        const mx = (s.x1 + s.x2) / 2;
        const my = (s.y1 + s.y2) / 2 + 40 * s.life;
        ctx.strokeStyle = `rgba(251,244,230,${Math.min(1, s.life * 1.2)})`;
        ctx.lineWidth = 2;
        ctx.beginPath();
        ctx.moveTo(s.x1, s.y1);
        ctx.quadraticCurveTo(mx, my, s.x2, s.y2);
        ctx.stroke();
      }

      if (!reduce) raf = requestAnimationFrame(draw);
    };

    const onMove = (e) => {
      mouse.x = e.clientX;
      mouse.y = e.clientY;
      if (reduce) draw();
    };
    const onLeave = () => {
      mouse.x = -9999;
      mouse.y = -9999;
    };

    const onClick = (e) => {
      const x = e.clientX;
      const y = e.clientY;
      const now = performance.now();
      if (last && now - lastAt < 6000) {
        strands.push({ x1: last.x, y1: last.y, x2: x, y2: y, life: 1 });
        if (reduce) draw();
      }
      last = { x, y };
      lastAt = now;

      const el = document.createElement("span");
      el.className = "sfx";
      el.textContent = WORDS[Math.floor(Math.random() * WORDS.length)];
      el.style.left = x + "px";
      el.style.top = y + "px";
      el.style.setProperty("--r", `${Math.round(Math.random() * 30 - 15)}deg`);
      document.body.appendChild(el);
      setTimeout(() => el.remove(), 800);
    };

    resize();
    draw();
    window.addEventListener("resize", resize);
    window.addEventListener("pointermove", onMove, { passive: true });
    window.addEventListener("pointerleave", onLeave);
    window.addEventListener("click", onClick);
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", resize);
      window.removeEventListener("pointermove", onMove);
      window.removeEventListener("pointerleave", onLeave);
      window.removeEventListener("click", onClick);
    };
  }, []);

  return <canvas ref={ref} className="web-canvas" aria-hidden="true" />;
}
