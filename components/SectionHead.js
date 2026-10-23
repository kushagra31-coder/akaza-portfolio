"use client";

import { useEffect, useRef } from "react";
import Reveal from "./Reveal";

export default function SectionHead({ kicker, title, sub }) {
  const ghostRef = useRef(null);

  // Parallax: the ghost headline drifts slower than the page scroll,
  // giving the layered depth of a printed panel behind the title.
  useEffect(() => {
    const el = ghostRef.current;
    if (!el) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    let raf = 0;
    const update = () => {
      raf = 0;
      const host = el.parentElement;
      if (!host) return;
      const r = host.getBoundingClientRect();
      const off = (r.top + r.height / 2 - window.innerHeight / 2) * -0.05;
      el.style.transform = "translateY(" + off.toFixed(1) + "px)";
    };
    const onScroll = () => {
      if (!raf) raf = requestAnimationFrame(update);
    };
    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      cancelAnimationFrame(raf);
    };
  }, []);

  return (
    <Reveal className="sec-head">
      <span ref={ghostRef} className="ghost" aria-hidden="true">
        {title}
      </span>
      <span className="caption">{kicker}</span>
      <h2 className="sec-title glitch" data-text={title}>
        {title}
      </h2>
      {sub ? <p className="sec-sub">{sub}</p> : null}
    </Reveal>
  );
}
