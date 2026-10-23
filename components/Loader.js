"use client";

import { useEffect, useState } from "react";

export default function Loader() {
  const [phase, setPhase] = useState("on"); // on -> out -> gone

  useEffect(() => {
    let seen = false;
    try {
      seen = sessionStorage.getItem("akaza-intro") === "1";
    } catch {}
    const t1 = setTimeout(() => setPhase("out"), seen ? 0 : 1900);
    const t2 = setTimeout(() => {
      setPhase("gone");
      try {
        sessionStorage.setItem("akaza-intro", "1");
      } catch {}
    }, seen ? 60 : 2650);
    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
    };
  }, []);

  if (phase === "gone") return null;

  return (
    <div className={`loader ${phase === "out" ? "out" : ""}`} aria-hidden="true">
      <div className="loader-wipe a" />
      <div className="loader-wipe b" />
      <div className="loader-inner">
        <span className="caption">ISSUE #01</span>
        <div className="loader-title glitch" data-text="AKAZA">
          AKAZA
        </div>
        <div className="loader-sub">LOADING THE MULTIVERSE...</div>
        <div className="loader-bar">
          <span />
        </div>
      </div>
    </div>
  );
}
