"use client";

import { useEffect, useRef } from "react";

export default function ScrollBar() {
  const ref = useRef(null);

  useEffect(() => {
    const root = document.documentElement;
    let max = 0;
    let frame = 0;
    const update = () => {
      frame = 0;
      const p = max > 0 ? root.scrollTop / max : 0;
      if (ref.current) ref.current.style.setProperty("--p", p.toFixed(4));
    };
    const onScroll = () => {
      if (!frame) frame = requestAnimationFrame(update);
    };
    const measure = () => {
      max = Math.max(0, root.scrollHeight - root.clientHeight);
      onScroll();
    };
    const observer = new ResizeObserver(measure);
    observer.observe(document.body);
    measure();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", measure);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", measure);
      observer.disconnect();
      cancelAnimationFrame(frame);
    };
  }, []);

  return <div ref={ref} className="scrollbar" aria-hidden="true" />;
}
