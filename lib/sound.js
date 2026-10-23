// Native Web Audio API Sound Engine - Zero dependencies, zero external audio files.
// Synthesizes low-latency, crisp micro-audio for retro/comic tactile feedback.

let audioCtx = null;
let sfxEnabled = false;

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

export function initSound() {
  if (typeof window === "undefined") return;
  try {
    const saved = localStorage.getItem("akaza_sfx");
    sfxEnabled = saved === "1";
  } catch {}

  // Global tactile click listener: automatically plays click sound on any button/interactive element
  const handleGlobalClick = (e) => {
    if (!sfxEnabled) return;
    const target = e.target;
    if (target && target.closest) {
      const interactive = target.closest("button, .btn, a, .chip, [role='button']");
      if (interactive) {
        playClick();
      }
    }
  };

  window.removeEventListener("click", handleGlobalClick, true);
  window.addEventListener("click", handleGlobalClick, true);
}

export function playClick() {
  if (!sfxEnabled) return;
  try {
    const ctx = getAudioContext();
    if (!ctx) return;
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    osc.type = "sine";
    osc.frequency.setValueAtTime(880, ctx.currentTime);
    osc.frequency.exponentialRampToValueAtTime(380, ctx.currentTime + 0.035);
    gain.gain.setValueAtTime(0.09, ctx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.035);
    osc.connect(gain);
    gain.connect(ctx.destination);
    osc.start();
    osc.stop(ctx.currentTime + 0.035);
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
