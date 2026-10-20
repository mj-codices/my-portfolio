"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion, type Variants } from "framer-motion";
import { INTRO_SEEN_KEY } from "./brandIntroKey";

// ---------------------------
// BrandIntro
// ---------------------------
// Opening title card: "MICHAEL J. WHITE" rises in letter by letter over black,
// a coral rule draws on, then the black splits open (top half up, bottom half
// down) to reveal the page underneath — wherever the visitor is scrolled to.
//
// - Plays once per tab session (sessionStorage). The inline script in
//   layout.tsx marks <html data-intro-seen> before first paint on repeat
//   loads, so the overlay never flashes (see .brand-intro in globals.css).
// - Fixed over everything and never scrolls the page, so a refresh mid-page
//   reveals that same spot.
// - Any click, tap, wheel, or key press skips straight to the reveal.
// - Reduced motion: skipped entirely.
// - Failsafe: if JavaScript never runs, a CSS animation clears it after ~3s.
// ---------------------------


const NAME = "MICHAEL J. WHITE";
const HOLD_MS = 1550; // title is fully built by ~0.9s, then a calm ~0.6s beat
const SPLIT_S = 0.75;
const easeInOut = [0.65, 0, 0.35, 1] as const;
const easeOut = [0.16, 1, 0.3, 1] as const;

const nameVariants: Variants = {
  hidden: {},
  shown: { transition: { staggerChildren: 0.03 } },
};
const letterVariants: Variants = {
  hidden: { y: "110%" },
  shown: { y: "0%", transition: { duration: 0.45, ease: easeOut } },
};

type Phase = "intro" | "split" | "done";

export default function BrandIntro() {
  const [phase, setPhase] = useState<Phase>("intro");
  // True once React has hydrated and taken over the timing
  const [live, setLive] = useState(false);

  useEffect(() => {
    let seen = false;
    try {
      seen = sessionStorage.getItem(INTRO_SEEN_KEY) === "1";
      sessionStorage.setItem(INTRO_SEEN_KEY, "1");
    } catch {
      // Storage blocked (private mode etc.) — just play it
    }
    const reduceMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;
    if (seen || reduceMotion) {
      setPhase("done");
      return;
    }

    setLive(true);
    const skip = () => setPhase((p) => (p === "intro" ? "split" : p));
    const timer = window.setTimeout(skip, HOLD_MS);
    const events = ["pointerdown", "wheel", "touchstart", "keydown"] as const;
    events.forEach((e) => window.addEventListener(e, skip, { passive: true }));
    return () => {
      window.clearTimeout(timer);
      events.forEach((e) => window.removeEventListener(e, skip));
    };
  }, []);

  if (phase === "done") return null;

  const splitting = phase === "split";
  const half = "absolute inset-x-0 h-[50.5%] bg-black";

  return (
    <div
      // `is-live` (added after hydration) cancels the CSS failsafe
      className={`brand-intro fixed inset-0 z-[200] ${live ? "is-live" : ""}`}
      style={{ pointerEvents: splitting ? "none" : "auto" }}
      aria-hidden="true"
    >
      {/* The two halves of the black card */}
      <motion.div
        className={`${half} top-0`}
        initial={false}
        animate={{ y: splitting ? "-100%" : "0%" }}
        transition={{ duration: SPLIT_S, delay: 0.12, ease: easeInOut }}
        onAnimationComplete={() => splitting && setPhase("done")}
      />
      <motion.div
        className={`${half} bottom-0`}
        initial={false}
        animate={{ y: splitting ? "100%" : "0%" }}
        transition={{ duration: SPLIT_S, delay: 0.12, ease: easeInOut }}
      />

      {/* Title block */}
      <AnimatePresence>
        {!splitting && (
          <motion.div
            key="title"
            className="absolute inset-0 flex flex-col items-center justify-center gap-3 desk:gap-4 px-6"
            exit={{ opacity: 0, transition: { duration: 0.25 } }}
          >
            <motion.div
              className="flex overflow-hidden whitespace-nowrap font-bold uppercase text-[#f2f2f2] text-[clamp(1.6rem,7.5vw,4rem)] tracking-[0.08em] leading-[1.15]"
              variants={nameVariants}
              initial="hidden"
              animate="shown"
            >
              {[...NAME].map((ch, i) => (
                <motion.span
                  key={i}
                  className="inline-block"
                  variants={letterVariants}
                >
                  {ch === " " ? " " : ch}
                </motion.span>
              ))}
            </motion.div>

            <motion.div
              className="h-[2px] w-28 desk:w-40 bg-[#ff5757] origin-center"
              initial={{ scaleX: 0 }}
              animate={{ scaleX: 1 }}
              transition={{ duration: 0.5, delay: 0.3, ease: easeInOut }}
            />

            <motion.div
              className="text-[#8f8f8f] text-[11px] desk:text-sm tracking-[0.35em] uppercase"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.4, delay: 0.5 }}
            >
              Front-end developer
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
