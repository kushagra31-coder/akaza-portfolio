"use client";

import { useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import Reveal from "./Reveal";
import Tilt from "./Tilt";
import SectionHead from "./SectionHead";
import { Icon } from "./Icons";
import { achievements } from "@/lib/data";
import { playModalOpen, playModalClose } from "@/lib/sound";


function LogoTile({ a, size }) {
  const tileStyle = {
    display: "inline-flex",
    alignItems: "center",
    background: "#fff",
    border: "2px solid #0b0b0f",
    borderRadius: "10px",
    padding: "6px 10px",
    boxShadow: "3px 3px 0 #0b0b0f",
    transform: "rotate(-2deg)",
  };
  if (a.logo) {
    return (
      <span style={tileStyle}>
        <img
          src={a.logo}
          alt={a.title + " logo"}
          style={{ height: size + "px", width: "auto", maxWidth: size * 4 + "px", objectFit: "contain", display: "block" }}
        />
      </span>
    );
  }
  if (a.logoText) {
    return (
      <span
        style={{
          ...tileStyle,
          fontFamily: "var(--display)",
          fontWeight: 800,
          letterSpacing: "2px",
          color: "#0b0b0f",
          fontSize: Math.round(size * 0.55) + "px",
          lineHeight: size + "px",
        }}
      >
        {a.logoText}
      </span>
    );
  }
  return null;
}

function AchievementCard({ a, index, onSelect }) {
  const hasDetails = Boolean(
    a.details &&
      (a.details.paragraphs?.length || a.details.role || a.details.highlights?.length)
  );

  const innerContent = (
    <>
      <div className="burst" aria-hidden="true">
        <span>{a.badge || a.sfx}</span>
      </div>
      <div
        className="win-body"
        style={{
          width: "100%",
          display: "flex",
          flexDirection: "column",
          height: "100%",
        }}
      >
        {a.logo || a.logoText ? (
          <div style={{ marginBottom: "0.6rem" }}>
            <LogoTile a={a} size={32} />
          </div>
        ) : null}
        <h3>{a.title}</h3>
        <p>{a.summary || a.text}</p>
        <div
          style={{
            display: "flex",
            gap: "0.45rem",
            flexWrap: "wrap",
            alignItems: "center",
            marginTop: "0.4rem",
          }}
        >
          <span className="pill">{a.status || a.pill}</span>
          {a.date ? (
            <span
              className="pill"
              style={{
                color: "var(--paper)",
                borderColor: "rgba(251, 244, 230, 0.4)",
                background: "transparent",
              }}
            >
              {a.date}
            </span>
          ) : null}
        </div>

        {hasDetails ? (
          <span
            className="pill"
            style={{
              alignSelf: "flex-end",
              marginTop: "auto",
              paddingTop: "0.22rem",
              paddingBottom: "0.2rem",
              fontSize: "0.68rem",
              letterSpacing: "0.08em",
              color: "#000",
              background: "var(--yellow)",
              borderColor: "#000",
              fontWeight: 800,
              boxShadow: "2px 2px 0 #000",
            }}
          >
            TAP FOR DETAILS ↗
          </span>
        ) : null}
      </div>
    </>
  );

  if (hasDetails) {
    return (
      <button
        type="button"
        className={`panel win ${index % 2 ? "blue" : ""}`}
        onClick={(e) => onSelect(a, e.currentTarget)}
        aria-haspopup="dialog"
        aria-label={`View details for ${a.title}`}
        style={{
          display: "flex",
          gap: "1.1rem",
          alignItems: "flex-start",
          padding: "1.3rem",
          width: "100%",
          height: "100%",
          textAlign: "left",
          cursor: "pointer",
          background: "var(--ink-2)",
        }}
      >
        {innerContent}
      </button>
    );
  }

  return (
    <div
      className={`panel win ${index % 2 ? "blue" : ""}`}
      style={{
        display: "flex",
        gap: "1.1rem",
        alignItems: "flex-start",
        padding: "1.3rem",
        width: "100%",
        height: "100%",
      }}
    >
      {innerContent}
    </div>
  );
}

export default function Achievements() {
  const [selected, setSelected] = useState(null);
  const [mounted, setMounted] = useState(false);
  const triggerRef = useRef(null);
  const closeBtnRef = useRef(null);

  useEffect(() => {
    setMounted(true);
  }, []);

  const handleSelect = (item, triggerElement) => {
    triggerRef.current = triggerElement;
    setSelected(item);
  };

  const handleClose = () => {
    setSelected(null);
    if (triggerRef.current && typeof triggerRef.current.focus === "function") {
      triggerRef.current.focus();
    }
  };

  useEffect(() => {
    if (!selected) return;
    playModalOpen();

    // Move focus into the modal on open
    if (closeBtnRef.current) {
      closeBtnRef.current.focus();
    }

    const onKeyDown = (e) => {
      if (e.key === "Escape") {
        handleClose();
      }
    };

    window.addEventListener("keydown", onKeyDown);
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    return () => {
      playModalClose();
      window.removeEventListener("keydown", onKeyDown);
      document.body.style.overflow = prevOverflow;
    };
  }, [selected]);

  return (
    <section id="wins" className="sec">
      <div className="wrap">
        <SectionHead kicker="THE HIGHLIGHT REEL" title="HALL OF HITS" sub="Rounds cleared, stages crossed." />

        <div className="win-grid">
          {achievements.map((a, i) => (
            <Reveal key={a.id || a.title} delay={(i % 2) * 90}>
              <Tilt>
                <AchievementCard a={a} index={i} onSelect={handleSelect} />
              </Tilt>
            </Reveal>
          ))}
        </div>
      </div>

      {mounted && selected
        ? createPortal(
            <div
              className="lb"
              role="dialog"
              aria-modal="true"
              aria-labelledby="hit-modal-title"
              onClick={handleClose}
            >
              <div
                className="panel lb-box"
                style={{
                  maxWidth: "720px",
                  padding: "clamp(1.5rem, 5vw, 2.5rem)",
                  position: "relative",
                }}
                onClick={(e) => e.stopPropagation()}
              >
                <button
                  ref={closeBtnRef}
                  type="button"
                  className="lb-close"
                  onClick={handleClose}
                  aria-label="Close dialog"
                >
                  <Icon name="close" />
                </button>

                <div
                  style={{
                    display: "flex",
                    gap: "1.1rem",
                    alignItems: "flex-start",
                    paddingRight: "3rem",
                  }}
                >
                  <div
                    className="burst"
                    aria-hidden="true"
                    style={{ width: "72px", height: "72px", fontSize: "1rem" }}
                  >
                    <span>{selected.badge || selected.sfx}</span>
                  </div>
                  <div>
                    <h2
                      id="hit-modal-title"
                      style={{
                        fontFamily: "var(--display)",
                        fontSize: "clamp(1.8rem, 5.5vw, 2.6rem)",
                        textShadow: "3px 3px 0 var(--blue)",
                        lineHeight: 1.1,
                      }}
                    >
                      {selected.title}
                    </h2>
                    <div
                      style={{
                        display: "flex",
                        gap: "0.5rem",
                        flexWrap: "wrap",
                        marginTop: "0.5rem",
                      }}
                    >
                      <span className="pill">{selected.status || selected.pill}</span>
                      {selected.date ? (
                        <span
                          className="pill"
                          style={{
                            color: "var(--paper)",
                            borderColor: "rgba(251, 244, 230, 0.4)",
                            background: "transparent",
                          }}
                        >
                          {selected.date}
                        </span>
                      ) : null}
                    </div>
                    {selected.logo || selected.logoText ? (
                      <div style={{ marginTop: "0.7rem" }}>
                        <LogoTile a={selected} size={44} />
                      </div>
                    ) : null}
                  </div>
                </div>

                {selected.details?.paragraphs && selected.details.paragraphs.length ? (
                  <div style={{ marginTop: "1.4rem", display: "grid", gap: "0.7rem" }}>
                    {selected.details.paragraphs.map((p, idx) => (
                      <p key={idx} style={{ color: "#d7daee", fontSize: "1rem", lineHeight: 1.6 }}>
                        {p}
                      </p>
                    ))}
                  </div>
                ) : null}

                {selected.details?.role ? (
                  <p
                    style={{
                      marginTop: "1.1rem",
                      fontFamily: "var(--mono)",
                      fontSize: "0.85rem",
                      color: "var(--yellow)",
                    }}
                  >
                    <strong style={{ color: "var(--paper)" }}>MY ROLE:</strong> {selected.details.role}
                  </p>
                ) : null}

                {selected.details?.highlights && selected.details.highlights.length ? (
                  <div style={{ marginTop: "1.2rem" }}>
                    <h4 className="mini-title" style={{ fontSize: "1.2rem", marginBottom: "0.4rem" }}>
                      HIGHLIGHTS
                    </h4>
                    <ul className="points" style={{ marginTop: "0.4rem" }}>
                      {selected.details.highlights.map((h, idx) => (
                        <li key={idx}>{h}</li>
                      ))}
                    </ul>
                  </div>
                ) : null}

                {selected.details?.image ? (
                  <div style={{ marginTop: "1.3rem" }}>
                    <img
                      src={selected.details.image}
                      alt={`${selected.title} preview`}
                      style={{ width: "100%", border: "2px solid var(--paper)", background: "#000" }}
                    />
                  </div>
                ) : null}

                {selected.details?.links && selected.details.links.length ? (
                  <div className="proj-links" style={{ marginTop: "1.3rem" }}>
                    {selected.details.links.map((link) => (
                      <a
                        key={link.url}
                        className="btn sm"
                        href={link.url}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        {link.label} <Icon name="arrow" size={16} />
                      </a>
                    ))}
                  </div>
                ) : null}
              </div>
            </div>,
            document.body
          )
        : null}
    </section>
  );
}
