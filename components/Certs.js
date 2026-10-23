"use client";

import { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import Reveal from "./Reveal";
import SectionHead from "./SectionHead";
import { Icon } from "./Icons";
import { certs } from "@/lib/data";

export default function Certs() {
  const [sel, setSel] = useState(null);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (!sel) return;
    const onKey = (e) => e.key === "Escape" && setSel(null);
    window.addEventListener("keydown", onKey);
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = prev;
    };
  }, [sel]);

  const modalContent = sel ? (
    <div className="lb" role="dialog" aria-modal="true" aria-label={sel.title} onClick={() => setSel(null)}>
      <div className="lb-box" onClick={(e) => e.stopPropagation()}>
        <button type="button" className="lb-close" onClick={() => setSel(null)} aria-label="Close">
          <Icon name="close" />
        </button>
        <img src={sel.img} alt={`${sel.title} certificate`} />
        <div className="lb-cap">
          <strong>{sel.title}</strong>
          <span>
            {sel.issuer}
            {sel.date ? ` | ${sel.date}` : ""}
          </span>
          {sel.detail ? <span>{sel.detail}</span> : null}
          {sel.href ? (
            <a className="btn sm" href={sel.href} target="_blank" rel="noopener noreferrer">
              Verify badge <Icon name="arrow" size={16} />
            </a>
          ) : null}
        </div>
      </div>
    </div>
  ) : null;

  return (
    <section id="certs" className="sec">
      <div className="wrap">
        <SectionHead
          kicker="LEVEL UPS"
          title="POWER-UPS"
          sub="Tap a card to see the real certificate."
        />

        <div className="cert-grid">
          {certs.map((c, i) => {
            const clickable = !!c.img;
            const Inner = (
              <>
                <div className="cert-thumb">
                  {c.img ? (
                    <img src={c.img} alt={`${c.title} certificate`} loading="lazy" />
                  ) : (
                    <div className="cert-ph">
                      <Icon name="award" size={42} />
                    </div>
                  )}
                </div>
                <div className="cert-body">
                  <h3>{c.title}</h3>
                  <p className="cert-issuer">{c.issuer}</p>
                  {c.date ? <p className="cert-date">{c.date}</p> : null}
                </div>
              </>
            );
            return (
              <Reveal key={c.title} delay={(i % 3) * 70}>
                {clickable ? (
                  <button
                    type="button"
                    className={`panel cert ${i % 2 ? "blue" : ""}`}
                    onClick={() => setSel(c)}
                    data-hot
                  >
                    {Inner}
                  </button>
                ) : (
                  <div className={`panel cert static ${i % 2 ? "blue" : ""}`}>{Inner}</div>
                )}
              </Reveal>
            );
          })}
        </div>
      </div>

      {mounted && modalContent ? createPortal(modalContent, document.body) : null}
    </section>
  );
}
