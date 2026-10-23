"use client";

import { useEffect, useRef, useState } from "react";
import { nav, profile } from "@/lib/data";
import { Icon } from "./Icons";
import { isSoundEnabled, setSoundEnabled, initSound, playClick } from "@/lib/sound";

export default function Nav() {
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState("");
  const [soundOn, setSoundOn] = useState(false);
  const wipeRef = useRef(null);

  const handleNavClick = () => {
    setOpen(false);
    const wipeEl = wipeRef.current;
    if (wipeEl) {
      wipeEl.classList.remove("go");
      void wipeEl.offsetWidth;
      wipeEl.classList.add("go");
    }
  };

  const handleToggleSound = () => {
    const next = !soundOn;
    setSoundEnabled(next);
    setSoundOn(next);
  };

  useEffect(() => {
    initSound();
    setSoundOn(isSoundEnabled());
    const onSfxChange = (e) => setSoundOn(e.detail);
    window.addEventListener("akaza-sfx-change", onSfxChange);
    return () => window.removeEventListener("akaza-sfx-change", onSfxChange);
  }, []);

  useEffect(() => {
    const els = nav.map(([id]) => document.getElementById(id)).filter(Boolean);
    const io = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          if (e.isIntersecting) setActive(e.target.id);
        }
      },
      { rootMargin: "-45% 0px -50% 0px" }
    );
    els.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, []);

  return (
    <>
      <header className="nav">
        <div className="wrap nav-in">
          <a href="#top" className="logo" onClick={handleNavClick}>
            {profile.handle.toUpperCase()}
          </a>
          <button
            className="nav-toggle"
            aria-label={open ? "Close menu" : "Open menu"}
            aria-expanded={open}
            onClick={() => setOpen((v) => !v)}
          >
            <Icon name={open ? "close" : "menu"} size={26} />
          </button>
          <nav className={`nav-links ${open ? "open" : ""}`}>
            {nav.map(([id, label]) => (
              <a
                key={id}
                href={`#${id}`}
                className={active === id ? "active" : ""}
                onClick={handleNavClick}
              >
                {label}
              </a>
            ))}
            <a
              href={profile.resume || "/Kushagra_Singh_Tomar_Resume.pdf"}
              target="_blank"
              rel="noopener noreferrer"
              className="nav-resume"
              onClick={handleNavClick}
            >
              RESUME ↗
            </a>
            <button
              type="button"
              className="nav-sfx-btn"
              onClick={handleToggleSound}
              aria-label={soundOn ? "Mute sound effects" : "Turn on sound effects"}
              title={soundOn ? "Sound Effects: ON (Click to mute)" : "Sound Effects: OFF (Click to turn on)"}
            >
              {soundOn ? "🔊 SFX: ON" : "🔇 SFX: OFF"}
            </button>
          </nav>
        </div>
      </header>
      <div ref={wipeRef} className="wipe" aria-hidden="true">
        <i className="wipe-a" />
        <i className="wipe-b" />
        <span
          className="wipe-mark"
          onAnimationEnd={() => {
            wipeRef.current?.classList.remove("go");
          }}
        >
          AKAZA
        </span>
        <svg className="wipe-line" viewBox="0 0 220 24" preserveAspectRatio="none" aria-hidden="true">
          <path d="M4 16 C 60 4, 160 26, 216 8" fill="none" stroke="#fff" strokeWidth="3" strokeLinecap="round" />
        </svg>
      </div>
    </>
  );
}
