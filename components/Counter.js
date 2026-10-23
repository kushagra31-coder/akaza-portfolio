"use client";

import { useEffect, useRef, useState } from "react";

function monthsSince(iso) {
  const s = new Date(iso);
  const n = new Date();
  return Math.max(1, (n.getFullYear() - s.getFullYear()) * 12 + (n.getMonth() - s.getMonth()));
}

export default function Counter({ to = 0, since, suffix = "", label }) {
  const ref = useRef(null);
  const [value, setValue] = useState(0);

  useEffect(() => {
    const target = since ? monthsSince(since) : to;
    const el = ref.current;
    if (!el) return;
    let raf = 0;
    const run = () => {
      const t0 = performance.now();
      const step = (t) => {
        const p = Math.min(1, (t - t0) / 1200);
        setValue(Math.round(target * (1 - Math.pow(1 - p, 3))));
        if (p < 1) raf = requestAnimationFrame(step);
      };
      raf = requestAnimationFrame(step);
    };
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          io.disconnect();
          run();
        }
      },
      { threshold: 0.4 }
    );
    io.observe(el);
    return () => {
      io.disconnect();
      cancelAnimationFrame(raf);
    };
  }, [to, since]);

  return (
    <div ref={ref} className="stat panel">
      <div className="stat-n">
        {value}
        {suffix}
      </div>
      <div className="stat-l">{label}</div>
    </div>
  );
}
