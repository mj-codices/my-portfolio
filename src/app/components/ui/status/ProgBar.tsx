"use client";

import { motion, useScroll, useSpring, useTransform } from "framer-motion";

/**
 * ProgBar
 * A vertical progress bar that reflects scroll progress.
 * Includes smooth spring animation and gradient background.
 */
export default function ProgBar() {
  // Track overall page scroll progress (0 to 1)
  const { scrollYProgress } = useScroll();

  // Smooth out scroll progress for nicer animation
  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 20,
  });

  // Transform scroll progress into a gradient background
  // (currently a static gradient, but could be dynamic)
  const gradientBg = useTransform(
    smoothProgress,
    (v) =>
      `linear-gradient(
        to bottom,
        #FF6F61
      )`,
  );

  return (
    <div className="fixed right-8 bottom-1/3 -translate-y-20 w-[.5rem] h-28 bg-white/3 rounded-lg backdrop-blur-md overflow-hidden z-50 border border-white/4 overflow-hidden">
      {/* Decorative top mask for visual softness */}
      <div className="top-mask absolute w-[10rem] h-[10rem] top-[-.95rem] left-2 rotate-350 opacity-53" />

      {/* Scroll-progress indicator */}
      <motion.div
        className="rounded w-full h-full origin-top"
        style={{
          scaleY: smoothProgress, // Scale vertically based on scroll
          backgroundImage: gradientBg, // Gradient fill
        }}
      />
    </div>
  );
}
