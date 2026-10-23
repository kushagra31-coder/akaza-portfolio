"use client";

import { useEffect, useRef, useState } from "react";
import { profile, socials } from "@/lib/data";
import { Icon } from "./Icons";

function useTypewriter(words) {
  const [i, setI] = useState(0);
  const [text, setText] = useState("");
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    const word = words[i % words.length];
    let t;
    if (!deleting && text === word) {
      t = setTimeout(() => setDeleting(true), 1500);
    } else if (deleting && text === "") {
      setDeleting(false);
      setI((n) => n + 1);
    } else {
      t = setTimeout(
        () => setText(deleting ? word.slice(0, text.length - 1) : word.slice(0, text.length + 1)),
        deleting ? 32 : 70
      );
    }
    return () => clearTimeout(t);
  }, [text, deleting, i, words]);

  return text;
}

export default function Hero() {
  const role = useTypewriter(profile.roles);
  const secRef = useRef(null);

  // If the intro loader was already seen this session it exits instantly,
  // so the hero entrance stagger should run fast too (see .hero.seen CSS).
  useEffect(() => {
    try {
      if (sessionStorage.getItem("akaza-intro") === "1") {
        secRef.current?.classList.add("seen");
      }
    } catch {}
  }, []);

  return (
    <section id="top" className="hero" ref={secRef}>
      <div className="wrap hero-grid">
        <div className="hero-copy">
          <span className="caption">ISSUE #01 // THE ORIGIN</span>
          <h1 className="hero-title glitch" data-text={profile.name.toUpperCase()}>
            {profile.name.toUpperCase().split(" ").slice(0, -1).join(" ")}
            <span className="hero-title-outline">{profile.name.toUpperCase().split(" ").pop()}</span>
          </h1>
          <p className="hero-name">aka AKAZA</p>
          <p className="hero-role">
            <span className="prompt">&gt;</span> {role}
            <span className="caret" />
          </p>
          <p className="hero-tag">{profile.tagline}</p>
          <p className="caption">● Open to Java backend internships</p>

          <div className="hero-cta">
            <a href="#projects" className="btn">
              See my missions
            </a>
            <a href="#contact" className="btn blue">
              Contact me
            </a>
            <a
              href={profile.resume || "/Kushagra_Singh_Tomar_Resume.pdf"}
              className="btn yellow"
              target="_blank"
              rel="noopener noreferrer"
            >
              Resume ↗
            </a>
          </div>

          <div className="social-row">
            {socials.map((s) => (
              <a
                key={s.key}
                className="soc"
                href={s.href}
                target={s.key === "mail" ? undefined : "_blank"}
                rel="noopener noreferrer"
                aria-label={s.label}
                title={s.label}
              >
                <Icon name={s.key} />
              </a>
            ))}
          </div>
        </div>
      </div>
      <a href="#about" className="scroll-cue" aria-label="Scroll down">
        SCROLL
      </a>
    </section>
  );
}
