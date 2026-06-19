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
      )`
  );

  return (
    <div>
      <div className="fixed landscape-margin-prog right-8 bottom-1/3 -translate-y-20 w-[.5rem] h-28 rounded-lg backdrop-blur-md overflow-hidden z-10 overflow-hidden">
        {/* Scroll-progress indicator */}
        <motion.div
          className="rounded w-full h-full origin-top"
          style={{
            scaleY: smoothProgress, // Scale vertically based on scroll
            backgroundImage: gradientBg, // Gradient fill
          }}
        />
      </div>
      <div
        className="w-[.7rem] h-[7.23rem] fixed right-[30.5px] bottom-1/3 landscape-margin-prog -translate-y-[78.4px] rounded-lg pointer-events-none z-50"
        style={{
          /* This padding defines the thickness of your border 'crown' */
          padding: "1.2px",
          /* The gradient for the top and bottom highlights */
          background: `linear-gradient(
        150deg, 
        rgba(255,255,255,0.55) 0%, 
        rgba(255,255,255,0.02) 5%, 
        rgba(255,255,255,0.02) 95%, 
        rgba(255,255,255,0.55) 100%
      )`,
          WebkitMask:
            "linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)",
          mask: "linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)",
          WebkitMaskComposite: "xor",
          maskComposite: "exclude",
        }}
      />
    </div>
  );
}
