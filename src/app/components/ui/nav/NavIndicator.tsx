// src/components/ui/nav/NavIndicator.tsx
"use client";

import { motion } from "framer-motion";
import Image from "next/image";

/**
 * Ambient Float Variants
 * * Generates an infinite, out-of-phase looping hover offset using keyframes.
 * Alternates horizontal directions based on whether the item index is even or odd (`i % 2 === 0`),
 * ensuring the list items drift independently rather than moving in lockstep.
 */
const floatVariants = {
  // Settled position while the drawer is closed (no loop running off-screen)
  rest: { x: 0, y: 0 },
  float: (i: number) => ({
    y: [0, -4, 0],
    x: [0, i % 2 === 0 ? 2 : -2, 0],
    transition: {
      duration: 3.5 + i * 0.6, // Dynamically scales duration so each tile cycles uniquely
      repeat: Infinity,
      ease: "easeInOut" as const,
    },
  }),
};

interface NavIndicatorProps {
  /** Map loop array identifier used to seed variable, out-of-phase ambient float speeds */
  index: number;
  /** Active state flag propagated from parent hover tracking loops */
  isActive: boolean;
  /** Runs the ambient float loop — only while the drawer is open */
  floating: boolean;
}

/**
 * NavIndicator Component
 * * An ultra-premium, interactive bullet indicator designed for menu layouts.
 * Combines an ambient floating animation cycle with a high-tension spring scale look.
 * On activation, an arrow pops into the center of the expanded circle.
 */
export default function NavIndicator({
  index,
  isActive,
  floating,
}: NavIndicatorProps) {
  return (
    /* Layer 1: Ambient Float Wrapper
      Consumes the 'custom' prop to pass the list index up to the dynamic variant timeline.
    */
    <motion.div
      className="relative flex items-center justify-center"
      custom={index}
      variants={floatVariants}
      animate={floating ? "float" : "rest"}
    >
      {/* Layer 2: Structural Scale & Physics Monitor
        Monitors the active boolean to cleanly scale the container background boundary (2x size snap)
        using a strict, high-stiffness spring engine to instantly command focus.
      */}
      <motion.div
        className="relative flex items-center justify-center"
        animate={{
          scale: isActive ? 2 : 1,
        }}
        transition={{
          type: "spring",
          stiffness: 620,
          damping: 26,
        }}
      >
        {/* Static Base Layer Asset */}
        <Image
          src="/ui/nav/navCircle.svg"
          width={20}
          height={20}
          alt="navigation dot indicator"
        />

        {/* Layer 3: Arrow Settle
          Centered over the circle. At rest it sits slightly small and offset
          down-left (hidden). On hover it waits for the circle to begin
          expanding, then fades in while drifting diagonally up and scaling
          into place on a soft, well-damped spring — a settle rather than a pop.
          On hover-out there is no delay: it shares the circle's spring so the
          arrow vanishes in sync with the shrink.
          NOTE: offsets are pre-scale; the parent's 2x makes 3px read as ~6px.
          NOTE: per-value transitions (opacity) don't inherit the root `delay`,
          so each value sets its own.
        */}
        <motion.div
          className="absolute inset-0 flex items-center justify-center pointer-events-none"
          initial={{ opacity: 0, scale: 0.6, x: -3, y: 3 }}
          animate={
            isActive
              ? { opacity: 1, scale: 1, x: 0, y: 0 }
              : { opacity: 0, scale: 0.6, x: -3, y: 3 }
          }
          transition={
            isActive
              ? {
                  default: {
                    type: "spring",
                    stiffness: 260,
                    damping: 24,
                    delay: 0.12,
                  },
                  opacity: { duration: 0.18, ease: "easeOut", delay: 0.12 },
                }
              : {
                  default: { type: "spring", stiffness: 620, damping: 26 },
                  opacity: { duration: 0.12, ease: "easeIn" },
                }
          }
        >
          <Image
            src="/icons/arrow.svg"
            width={8}
            height={8}
            alt=""
            aria-hidden
            className="rotate-320" // Structural turn matching your custom alignment coordinates
          />
        </motion.div>
      </motion.div>
    </motion.div>
  );
}
