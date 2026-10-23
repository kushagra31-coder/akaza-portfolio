"use client";

import { useEffect, useRef } from "react";

export default function Cursor() {
  const dot = useRef(null);
  const ring = useRef(null);

  useEffect(() => {
    if (!window.matchMedia("(pointer: fine)").matches) return;
    document.documentElement.classList.add("has-cursor");
    let x = -100;
    let y = -100;
    let rx = -100;
    let ry = -100;
    let raf = 0;

    const move = (e) => {
      x = e.clientX;
      y = e.clientY;
      if (dot.current) dot.current.style.transform = `translate(${x}px, ${y}px)`;
      const t = e.target;
      if (ring.current && t && t.closest) {
        ring.current.classList.toggle("hot", !!t.closest("a, button, .chip, .soc, [data-hot], [role='button']"));
      }
    };
    const loop = () => {
      rx += (x - rx) * 0.18;
      ry += (y - ry) * 0.18;
      if (ring.current) ring.current.style.transform = `translate(${rx}px, ${ry}px)`;
      raf = requestAnimationFrame(loop);
    };
    window.addEventListener("pointermove", move, { passive: true });
    loop();
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("pointermove", move);
      document.documentElement.classList.remove("has-cursor");
    };
  }, []);

  return (
    <>
      <div ref={ring} className="cur-ring" aria-hidden="true" />
      <div ref={dot} className="cur-dot" aria-hidden="true" />
    </>
  );
}
