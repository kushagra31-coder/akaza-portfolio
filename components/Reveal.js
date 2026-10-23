"use client";

import { useEffect, useRef } from "react";

let revealObserver;

export default function Reveal({ as: Tag = "div", delay = 0, className = "", from = "up", children, ...rest }) {
  const ref = useRef(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (!revealObserver) {
      revealObserver = new IntersectionObserver(
        (entries) => {
          for (const entry of entries) {
            if (entry.isIntersecting) {
              entry.target.classList.add("in");
              revealObserver.unobserve(entry.target);
            }
          }
        },
        { threshold: 0.12, rootMargin: "0px 0px -6% 0px" }
      );
    }
    revealObserver.observe(el);
    return () => {
      if (revealObserver) {
        revealObserver.unobserve(el);
      }
    };
  }, []);

  const dirClass = from === "left" ? "from-left" : from === "right" ? "from-right" : "";
  const fullClass = ["rv", dirClass, className].filter(Boolean).join(" ");

  return (
    <Tag
      ref={ref}
      className={fullClass}
      style={{ transitionDelay: `${delay}ms` }}
      {...rest}
    >
      {children}
    </Tag>
  );
}
