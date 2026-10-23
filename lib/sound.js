// Native Web Audio API Sound Engine - Zero dependencies, zero external audio files.
// Synthesizes low-latency, crisp micro-audio for retro/comic tactile feedback.

let audioCtx = null;
let sfxEnabled = false;
let lastHoverTime = 0;
let lastHoverElement = null;

function getAudioContext() {
  if (typeof window === "undefined") return null;
  if (!audioCtx) {
    const AudioContextClass = window.AudioContext || window.webkitAudioContext;
    if (AudioContextClass) {
      audioCtx = new AudioContextClass();
    }
  }
  if (audioCtx && audioCtx.state === "suspended") {
    audioCtx.resume().catch(() => {});
  }
  return audioCtx;
}

export function isSoundEnabled() {
  if (typeof window === "undefined") return false;
  return sfxEnabled;
}

export function setSoundEnabled(val) {
  sfxEnabled = Boolean(val);
  if (typeof window !== "undefined") {
    try {
      localStorage.setItem("akaza_sfx", sfxEnabled ? "1" : "0");
      window.dispatchEvent(new CustomEvent("akaza-sfx-change", { detail: sfxEnabled }));
    } catch {}
  }
  if (sfxEnabled) {
    playSuccess();
  }
  return sfxEnabled;
}

export function toggleSound() {
  return setSoundEnabled(!sfxEnabled);
}

// Pentatonic scale frequencies for harmonic chip skimming
const HARMONIC_NOTES = [659.25, 783.99, 880.0, 987.77, 1174.66, 1318.51, 1567.98];

function getHashNote(text = "") {
  let hash = 0;
  for (let i = 0; i < text.length; i++) {
    hash = (hash * 31 + text.charCodeAt(i)) & 0xffff;
  }
  return HARMONIC_NOTES[Math.abs(hash) % HARMONIC_NOTES.length];
}

export function playChipHover(label = "") {
  if (!sfxEnabled) return;
  const now = performance.now();
  if (now - lastHoverTime < 35) return; // Responsible throttling
  lastHoverTime = now;

  try {
    const ctx = getAudioContext();
    if (!ctx) return;
    const t = ctx.currentTime;
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();

    const freq = getHashNote(label);
    osc.type = "sine";
    osc.frequency.setValueAtTime(freq, t);
    osc.frequency.exponentialRampToValueAtTime(freq * 1.15, t + 0.028);

    gain.gain.setValueAtTime(0.04, t);
    gain.gain.exponentialRampToValueAtTime(0.001, t + 0.028);

    osc.connect(gain);
    gain.connect(ctx.destination);
    osc.start(t);
    osc.stop(t + 0.028);
  } catch {}
}

export function playUiHover() {
  if (!sfxEnabled) return;
  const now = performance.now();
  if (now - lastHoverTime < 45) return; // Responsible throttling
  lastHoverTime = now;

  try {
    const ctx = getAudioContext();
    if (!ctx) return;
    const t = ctx.currentTime;
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();

    osc.type = "triangle";
    osc.frequency.setValueAtTime(1100, t);
    osc.frequency.exponentialRampToValueAtTime(800, t + 0.022);

    gain.gain.setValueAtTime(0.035, t);
    gain.gain.exponentialRampToValueAtTime(0.001, t + 0.022);

    osc.connect(gain);
    gain.connect(ctx.destination);
    osc.start(t);
    osc.stop(t + 0.022);
  } catch {}
}

export function playCardHover() {
  if (!sfxEnabled) return;
  const now = performance.now();
  if (now - lastHoverTime < 60) return;
  lastHoverTime = now;

  try {
    const ctx = getAudioContext();
    if (!ctx) return;
    const t = ctx.currentTime;
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();

    osc.type = "sine";
    osc.frequency.setValueAtTime(420, t);
    osc.frequency.exponentialRampToValueAtTime(320, t + 0.04);

    gain.gain.setValueAtTime(0.03, t);
    gain.gain.exponentialRampToValueAtTime(0.001, t + 0.04);

    osc.connect(gain);
    gain.connect(ctx.destination);
    osc.start(t);
    osc.stop(t + 0.04);
  } catch {}
}

export function playModalOpen() {
  if (!sfxEnabled) return;
  try {
    const ctx = getAudioContext();
    if (!ctx) return;
    const t = ctx.currentTime;
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();

    osc.type = "sine";
    osc.frequency.setValueAtTime(587.33, t);
    osc.frequency.exponentialRampToValueAtTime(880.0, t + 0.065);

    gain.gain.setValueAtTime(0.07, t);
    gain.gain.exponentialRampToValueAtTime(0.001, t + 0.065);

    osc.connect(gain);
    gain.connect(ctx.destination);
    osc.start(t);
    osc.stop(t + 0.065);
  } catch {}
}

export function playModalClose() {
  if (!sfxEnabled) return;
  try {
    const ctx = getAudioContext();
    if (!ctx) return;
    const t = ctx.currentTime;
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();

    osc.type = "sine";
    osc.frequency.setValueAtTime(659.25, t);
    osc.frequency.exponentialRampToValueAtTime(440.0, t + 0.05);

    gain.gain.setValueAtTime(0.05, t);
    gain.gain.exponentialRampToValueAtTime(0.001, t + 0.05);

    osc.connect(gain);
    gain.connect(ctx.destination);
    osc.start(t);
    osc.stop(t + 0.05);
  } catch {}
}

export function playClick() {
  if (!sfxEnabled) return;
  try {
    const ctx = getAudioContext();
    if (!ctx) return;
    const t = ctx.currentTime;
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();

    osc.type = "sine";
    osc.frequency.setValueAtTime(880, t);
    osc.frequency.exponentialRampToValueAtTime(380, t + 0.035);

    gain.gain.setValueAtTime(0.09, t);
    gain.gain.exponentialRampToValueAtTime(0.001, t + 0.035);

    osc.connect(gain);
    gain.connect(ctx.destination);
    osc.start(t);
    osc.stop(t + 0.035);
  } catch {}
}

export function playSuccess() {
  if (!sfxEnabled) return;
  try {
    const ctx = getAudioContext();
    if (!ctx) return;
    const now = ctx.currentTime;
    [523.25, 659.25, 783.99].forEach((freq, idx) => {
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = "sine";
      osc.frequency.setValueAtTime(freq, now + idx * 0.055);
      gain.gain.setValueAtTime(0.08, now + idx * 0.055);
      gain.gain.exponentialRampToValueAtTime(0.001, now + idx * 0.055 + 0.12);
      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.start(now + idx * 0.055);
      osc.stop(now + idx * 0.055 + 0.12);
    });
  } catch {}
}

let isInitialized = false;

export function initSound() {
  if (typeof window === "undefined" || isInitialized) return;
  isInitialized = true;

  try {
    const saved = localStorage.getItem("akaza_sfx");
    sfxEnabled = saved === "1";
  } catch {}

  // Unlock AudioContext on initial user gesture if suspended
  const unlockAudio = () => {
    if (audioCtx && audioCtx.state === "suspended") {
      audioCtx.resume().catch(() => {});
    }
  };
  window.addEventListener("pointerdown", unlockAudio, { passive: true });
  window.addEventListener("keydown", unlockAudio, { passive: true });

  // Global hover listener with responsible element matching
  const handleGlobalHover = (e) => {
    if (!sfxEnabled) return;
    const target = e.target;
    if (!target || !target.closest) return;

    // Skill chip hover (Arsenal skills & mission tech chips)
    const chip = target.closest(".chip");
    if (chip) {
      if (chip === lastHoverElement) return;
      lastHoverElement = chip;
      playChipHover(chip.textContent || "");
      return;
    }

    // Interactive card hover (Projects, Achievements, Certs)
    const card = target.closest(".proj-card, .hit-card, .cert-card");
    if (card) {
      if (card === lastHoverElement) return;
      lastHoverElement = card;
      playCardHover();
      return;
    }

    // General interactive elements, buttons, links, social icons
    const interactive = target.closest("button, .btn, a, .soc, [role='button'], .nav-links a");
    if (interactive) {
      if (interactive === lastHoverElement) return;
      lastHoverElement = interactive;
      playUiHover();
      return;
    }
  };

  const handlePointerOut = (e) => {
    if (!lastHoverElement) return;
    if (!e.relatedTarget || !lastHoverElement.contains(e.relatedTarget)) {
      lastHoverElement = null;
    }
  };

  // Global click listener
  const handleGlobalClick = (e) => {
    if (!sfxEnabled) return;
    const target = e.target;
    if (target && target.closest) {
      const interactive = target.closest("button, .btn, a, .chip, [role='button'], .proj-card, .hit-card, .cert-card");
      if (interactive) {
        playClick();
      }
    }
  };

  window.addEventListener("mouseover", handleGlobalHover, { passive: true });
  window.addEventListener("mouseout", handlePointerOut, { passive: true });
  window.addEventListener("click", handleGlobalClick, true);
}
