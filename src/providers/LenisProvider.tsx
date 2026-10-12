"use client";

import { ReactNode, useEffect } from "react";
import Lenis from "lenis";

// Declare global type augmentation so TypeScript doesn't complain about window.lenis
declare global {
  interface Window {
    lenis?: Lenis;
  }
}
// Provides smooth scrolling behavior across the entire app using Lenis.
// This wraps the application and replaces the browser's default scroll behavior.
//
// Controls:
// - scroll easing and duration (feel of scrolling)
// - requestAnimationFrame loop for continuous updates
//
// Safe to modify:
// - duration / easing for different scroll feel
// Be careful:
// - removing RAF loop will break smooth scrolling entirely
//
// Reduced motion: when the OS "Reduce motion" setting is on, Lenis is skipped
// and the browser's native scrolling is used. Callers already fall back to
// native scrolling when `window.lenis` is undefined (see NavDrawer).
export default function LenisProvider({ children }: { children: ReactNode }) {
  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    // Initialize Lenis with custom scroll physics
    const lenis = new Lenis();
    window.lenis = lenis;

    // RAF loop drives Lenis updates every frame
    // Without this, Lenis will not animate scroll properly
    let rafId = 0;
    function rafLoop(time: number) {
      lenis.raf(time);
      rafId = requestAnimationFrame(rafLoop);
    }

    rafId = requestAnimationFrame(rafLoop);
    // Cleanup on unmount: stop the loop (otherwise it keeps running, and React's
    // dev double-mount leaves two loops) and tear Lenis down
    return () => {
      cancelAnimationFrame(rafId);
      lenis.destroy();
      if (window.lenis === lenis) window.lenis = undefined;
    };
  }, []);

  return <>{children}</>;
}
