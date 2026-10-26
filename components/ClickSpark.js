"use client";

import { useEffect } from "react";

const TARGETS = ".btn, .proj-item, .panel.win";
const COLORS = ["#e62429", "#4a78ff", "#ffd426", "#fbf4e6"];
const BITS = 12;
const LIFE_MS = 650;

export default function ClickSpark() {
  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    let live = 0;
    const onClick = (e) => {
      if (!e.target.closest || !e.target.closest(TARGETS)) return;
      if (live >= 3) return;
      const burst = document.createElement("span");
      burst.className = "click-spark";
      burst.style.left = e.clientX + "px";
      burst.style.top = e.clientY + "px";
      burst.setAttribute("aria-hidden", "true");
      for (let i = 0; i < BITS; i++) {
        const bit = document.createElement("i");
        const angle = (360 / BITS) * i + (Math.random() * 16 - 8);
        const dist = 36 + Math.random() * 30;
        bit.style.setProperty("--a", angle + "deg");
        bit.style.setProperty("--d", dist + "px");
        bit.style.background = COLORS[i % COLORS.length];
        if (i % 3 === 0) bit.className = "dot";
        burst.appendChild(bit);
      }
      document.body.appendChild(burst);
      live += 1;
      window.setTimeout(() => {
        burst.remove();
        live -= 1;
      }, LIFE_MS);
    };
    document.addEventListener("click", onClick, { passive: true });
    return () => document.removeEventListener("click", onClick);
  }, []);
  return null;
}
