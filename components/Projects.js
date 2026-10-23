"use client";

import { useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import Reveal from "./Reveal";
import SectionHead from "./SectionHead";
import Tilt from "./Tilt";
import { Icon } from "./Icons";
import { projects } from "@/lib/data";

function Links({ links }) {
  if (!links || !links.length) return null;
  return (
    <div className="proj-links" onClick={(e) => e.stopPropagation()}>
      {links
        .filter((l) => l.href)
        .map((l) => (
          <a key={l.href} className="btn sm" href={l.href} target="_blank" rel="noopener noreferrer">
            {l.label} <Icon name="arrow" size={16} />
          </a>
        ))}
    </div>
  );
}

function ProjectPhotos({ project }) {
  const [hidden, setHidden] = useState({});
  const [loadedCount, setLoadedCount] = useState(0);

  useEffect(() => {
    setHidden({});
    setLoadedCount(0);
  }, [project.id]);

  const shots = [1, 2, 3];

  return (
    <div
      className="proj-photos-wrap"
      style={{
        display: loadedCount > 0 ? "block" : "none",
        marginTop: "1.5rem",
      }}
    >
      <h4 className="mini-title">FIELD PHOTOS</h4>
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
          gap: "1rem",
          marginTop: "0.8rem",
        }}
      >
        {shots.map((num) => {
          if (hidden[num]) return null;
          return (
            <img
              key={num}
              src={`/projects/${project.id}/shot-${num}.png`}
              alt={`${project.title} field photo ${num}`}
              style={{
                width: "100%",
                border: "2px solid var(--paper)",
                background: "#000",
                display: hidden[num] ? "none" : "block",
              }}
              onLoad={() => setLoadedCount((c) => c + 1)}
              onError={(e) => {
                if (!e.currentTarget.src.includes("/public/")) {
                  e.currentTarget.src = `/public/projects/${project.id}/shot-${num}.png`;
                } else {
                  setHidden((h) => ({ ...h, [num]: true }));
                }
              }}
            />
          );
        })}
      </div>
    </div>
  );
}

export default function Projects() {
  const [selected, setSelected] = useState(null);
  const [mounted, setMounted] = useState(false);
  const cfRef = useRef(null);

  useEffect(() => {
    setMounted(true);
  }, []);

  // Coverflow: 3D tilt driven by the horizontal scroller's own scrollLeft.
  // No wheel handling anywhere — vertical page scroll is never touched.
  useEffect(() => {
    const scroller = cfRef.current;
    if (!scroller) return;
    const items = Array.from(scroller.querySelectorAll(".cf-item"));
    if (!items.length) return;
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    let raf = 0;
    const update = () => {
      raf = 0;
      const mid = scroller.scrollLeft + scroller.clientWidth / 2;
      for (const it of items) {
        const c = it.offsetLeft + it.offsetWidth / 2;
        const ratio = Math.max(-1.2, Math.min(1.2, (c - mid) / scroller.clientWidth));
        if (reduced) {
          it.style.transform = "";
          continue;
        }
        const ry = (-ratio * 26).toFixed(2);
        const sc = (1 - Math.min(Math.abs(ratio), 1) * 0.1).toFixed(3);
        it.style.transform = `rotateY(${ry}deg) scale(${sc})`;
        it.style.zIndex = String(100 - Math.round(Math.abs(ratio) * 50));
      }
    };
    const onScroll = () => {
      if (!raf) raf = requestAnimationFrame(update);
    };
    update();
    scroller.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);

    // Mouse drag-to-scroll, with click suppression after a real drag so a
    // drag never opens the modal but a clean click always does.
    let down = false;
    let startX = 0;
    let startL = 0;
    let dragged = false;
    const onDown = (e) => {
      if (e.pointerType !== "mouse") return;
      down = true;
      dragged = false;
      startX = e.clientX;
      startL = scroller.scrollLeft;
    };
    const onMove = (e) => {
      if (!down) return;
      const dx = e.clientX - startX;
      if (Math.abs(dx) > 6) dragged = true;
      if (dragged) scroller.scrollLeft = startL - dx;
    };
    const onUp = () => {
      down = false;
    };
    const onClickCapture = (e) => {
      if (dragged) {
        e.stopPropagation();
        e.preventDefault();
        dragged = false;
      }
    };
    scroller.addEventListener("pointerdown", onDown);
    window.addEventListener("pointermove", onMove);
    window.addEventListener("pointerup", onUp);
    scroller.addEventListener("click", onClickCapture, true);

    return () => {
      scroller.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      scroller.removeEventListener("pointerdown", onDown);
      window.removeEventListener("pointermove", onMove);
      window.removeEventListener("pointerup", onUp);
      scroller.removeEventListener("click", onClickCapture, true);
      cancelAnimationFrame(raf);
    };
  }, []);

  // Modal keyboard and body scroll lock
  useEffect(() => {
    if (!selected) return;
    const onKey = (e) => e.key === "Escape" && setSelected(null);
    window.addEventListener("keydown", onKey);
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = prev;
    };
  }, [selected]);

  const modalContent = selected ? (
    <div
      className="lb"
      role="dialog"
      aria-modal="true"
      aria-label={selected.title}
      onClick={() => setSelected(null)}
    >
      <div
        className="panel lb-box"
        style={{
          maxWidth: "760px",
          padding: "clamp(1.5rem, 5vw, 2.5rem)",
          position: "relative",
        }}
        onClick={(e) => e.stopPropagation()}
      >
        <button
          type="button"
          className="lb-close"
          onClick={() => setSelected(null)}
          aria-label="Close modal"
        >
          <Icon name="close" />
        </button>

        <div className="proj-head" style={{ paddingRight: "3rem" }}>
          <h2
            style={{
              fontFamily: "var(--display)",
              fontSize: "clamp(2rem, 6vw, 3rem)",
              textShadow: "3px 3px 0 var(--blue)",
              lineHeight: 1.1,
            }}
          >
            {selected.title}
          </h2>
          {selected.status ? <span className="pill">{selected.status}</span> : null}
        </div>

        <p className="proj-tag" style={{ marginTop: "0.6rem" }}>
          {selected.tagline}
        </p>

        <p className="proj-desc" style={{ marginTop: "1rem" }}>
          {selected.desc}
        </p>

        {selected.points && selected.points.length ? (
          <ul className="points" style={{ marginTop: "1rem" }}>
            {selected.points.map((pt) => (
              <li key={pt}>{pt}</li>
            ))}
          </ul>
        ) : null}

        {selected.stack && selected.stack.length ? (
          <div className="chips" style={{ marginTop: "1.2rem" }}>
            {selected.stack.map((s) => (
              <span className="chip" key={s}>
                {s}
              </span>
            ))}
          </div>
        ) : null}

        <div className="proj-meta" style={{ marginTop: "1.2rem" }}>
          {selected.role ? <span>ROLE: {selected.role}</span> : null}
          {selected.period ? <span>{selected.period}</span> : null}
        </div>

        <div style={{ marginTop: "1.2rem" }}>
          <Links links={selected.links} />
        </div>

        <ProjectPhotos project={selected} />
      </div>
    </div>
  ) : null;

  return (
    <section id="projects" className="sec">
      <div className="wrap">
        <SectionHead
          kicker="THE MAIN ISSUES"
          title="MISSIONS"
          sub="Five main missions."
        />

        <div className="cf-wrap">
          <div className="cf" ref={cfRef}>
            {projects.map((p, i) => (
              <div className="cf-item" key={p.id}>
                <Tilt>
              <Reveal
                from={i % 2 === 0 ? "left" : "right"}
                delay={(i % 2) * 90}
                className={`proj-item ${i === 0 ? "feat" : ""}`}
              >
                <article
                  className={`panel proj ${i % 2 ? "blue" : ""} ${i === 0 ? "feat" : ""} ${
                    p.classified ? "classified" : ""
                  }`}
                  tabIndex={0}
                  role="button"
                  aria-haspopup="dialog"
                  aria-label={`Open mission details for ${p.title}`}
                  onClick={() => setSelected(p)}
                  onKeyDown={(e) => {
                    if (e.key === "Enter" || e.key === " ") {
                      e.preventDefault();
                      setSelected(p);
                    }
                  }}
                  style={{ cursor: "pointer" }}
                >
                  <span className="issue">ISSUE #{i + 1}</span>

                  <div className="proj-head">
                    <h3>{p.title}</h3>
                    {p.status ? <span className="pill">{p.status}</span> : null}
                  </div>
                  <p className="proj-tag">{p.tagline}</p>

                  {p.classified ? (
                    <div className="redacted" aria-label="Details are classified for now">
                      <span style={{ width: "92%" }} />
                      <span style={{ width: "76%" }} />
                      <span style={{ width: "58%" }} />
                      <div className="stamp">CLASSIFIED</div>
                    </div>
                  ) : (
                    <>
                      <p className="proj-desc">{p.desc}</p>
                      {p.points && p.points.length ? (
                        <ul className="points">
                          {p.points.map((pt) => (
                            <li key={pt}>{pt}</li>
                          ))}
                        </ul>
                      ) : null}
                    </>
                  )}

                  {p.stack && p.stack.length ? (
                    <div className="chips">
                      {p.stack.map((s) => (
                        <span className="chip" key={s}>
                          {s}
                        </span>
                      ))}
                    </div>
                  ) : null}

                  <div className="proj-meta">
                    <span>ROLE: {p.role}</span>
                    <span>{p.period}</span>
                  </div>
                  <Links links={p.links} />
                </article>
              </Reveal>
                </Tilt>
              </div>
            ))}
          </div>
          <p className="cf-hint">← DRAG / SWIPE THROUGH THE MISSIONS →</p>
        </div>
      </div>

      {mounted && modalContent ? createPortal(modalContent, document.body) : null}
    </section>
  );
}
