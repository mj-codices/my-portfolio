/**
 * smoothScrollTo
 * One calm, consistent scroll for every programmatic jump (nav links, hero CTA),
 * on every device and browser.
 *
 * Cadence is modeled on the browser's native smooth scroll (what the 7th Gear
 * Tire Works site uses via `scroll-behavior: smooth`), measured in Chrome:
 * ~0.47s for 800px, ~0.75s for 2000px, ~1.1s for 4500px. Duration scales with
 * distance (so short hops don't drag and long sweeps don't rocket), and an
 * ease-in-out curve gives a soft start and a soft landing.
 *
 * - Desktop (Lenis running): handed to Lenis so the two never fight.
 * - Touch devices / no Lenis: driven frame-by-frame here, cancelled the moment
 *   the visitor scrolls, touches, or presses a key.
 * - Reduced motion: jumps instantly.
 */

export type ScrollTarget = number | "top" | "bottom" | `#${string}`;

// Breathing room above section targets so headings clear the fixed nav icon
const SECTION_OFFSET = 100;

// Duration (ms) from distance (px): 350ms base + 0.22ms per px, capped
const MIN_MS = 450;
const MAX_MS = 1400;
const durationFor = (distance: number) =>
  Math.min(MAX_MS, Math.max(MIN_MS, 350 + distance * 0.22));

// Soft start, steady middle, soft landing
const easeInOutCubic = (t: number) =>
  t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;

let cancelActive: (() => void) | null = null;

function resolveTop(target: ScrollTarget): number | null {
  const maxScroll =
    document.documentElement.scrollHeight - window.innerHeight;
  let top: number;
  if (target === "top") top = 0;
  else if (target === "bottom") top = maxScroll;
  else if (typeof target === "number") top = target;
  else {
    const el = document.querySelector(target);
    if (!el) return null;
    top = el.getBoundingClientRect().top + window.scrollY - SECTION_OFFSET;
  }
  return Math.max(0, Math.min(top, maxScroll));
}

export function smoothScrollTo(target: ScrollTarget) {
  const top = resolveTop(target);
  if (top === null) return;

  cancelActive?.();
  const start = window.scrollY;
  const distance = Math.abs(top - start);
  if (distance < 1) return;

  const reduceMotion = window.matchMedia(
    "(prefers-reduced-motion: reduce)"
  ).matches;
  const duration = durationFor(distance);

  // Desktop: let Lenis animate it (it owns the scroll position there)
  if (window.lenis) {
    window.lenis.scrollTo(top, {
      immediate: reduceMotion,
      duration: duration / 1000,
      easing: easeInOutCubic,
      force: true,
    });
    return;
  }

  // `behavior: "instant"` overrides the global `scroll-behavior: smooth`
  if (reduceMotion) {
    window.scrollTo({ top, behavior: "instant" });
    return;
  }

  // Touch devices / no Lenis: animate frame-by-frame
  let rafId = 0;
  const t0 = performance.now();
  const stop = () => {
    cancelAnimationFrame(rafId);
    window.removeEventListener("wheel", stop);
    window.removeEventListener("touchstart", stop);
    window.removeEventListener("keydown", stop);
    if (cancelActive === stop) cancelActive = null;
  };
  // The visitor taking over always wins
  window.addEventListener("wheel", stop, { passive: true });
  window.addEventListener("touchstart", stop, { passive: true });
  window.addEventListener("keydown", stop);
  cancelActive = stop;

  const step = (now: number) => {
    const t = Math.min(1, (now - t0) / duration);
    window.scrollTo({
      top: start + (top - start) * easeInOutCubic(t),
      behavior: "instant",
    });
    if (t < 1) rafId = requestAnimationFrame(step);
    else stop();
  };
  rafId = requestAnimationFrame(step);
}
