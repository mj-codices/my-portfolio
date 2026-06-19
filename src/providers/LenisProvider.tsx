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
export default function LenisProvider({ children }: { children: ReactNode }) {
  useEffect(() => {
    // Initialize Lenis with custom scroll physics
    const lenis = new Lenis();
    window.lenis = lenis;

    // RAF loop drives Lenis updates every frame
    // Without this, Lenis will not animate scroll properly
    function rafLoop(time: number) {
      lenis.raf(time);
      requestAnimationFrame(rafLoop);
    }

    requestAnimationFrame(rafLoop);
    // Cleanup on unmount to prevent memory leaks
    return () => {
      lenis.destroy();
    };
  }, []);

  return <>{children}</>;
}
